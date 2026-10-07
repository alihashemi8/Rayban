import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { randomBytes } from "node:crypto";
import { once } from "node:events";
import { createApplication } from "../server/index.mjs";

const qaRoot = resolve("qa");
await mkdir(qaRoot, { recursive: true });
const directory = await mkdtemp(resolve(qaRoot, "backend-test-"));
let app = await createApplication({
  dataDirectory: directory,
  sessionMs: 2000,
});
app.listen(0, "127.0.0.1");
await once(app, "listening");
let origin = `http://127.0.0.1:${app.address().port}`;
const password = randomBytes(24).toString("hex");
async function request(
  path,
  { method = "GET", data, cookie, csrf, revision, requestOrigin = origin } = {},
) {
  const response = await fetch(origin + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Origin: requestOrigin,
      ...(cookie ? { Cookie: cookie } : {}),
      ...(csrf ? { "X-CSRF-Token": csrf } : {}),
      ...(revision ? { "If-Match": String(revision) } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
  return { response, body: await response.json() };
}
async function close() {
  await new Promise((resolve) => app.close(resolve));
}
try {
  const session = await request("/api/admin/session");
  assert.equal(session.body.setupRequired, true);
  assert.equal(session.body.authenticated, false);
  const publicContent = await request("/api/content");
  assert.equal(publicContent.response.status, 200);
  assert.equal(
    (await fetch(origin + "/admin")).headers.get("x-robots-tag"),
    "noindex, nofollow",
  );
  assert.doesNotMatch(
    await (await fetch(origin + "/admin")).text(),
    /data-route="\/"/,
  );
  assert.match(
    await (await fetch(origin + "/projects")).text(),
    /data-route="\/projects"/,
  );
  assert.equal(
    (
      await request("/api/admin/content", {
        method: "PUT",
        data: publicContent.body.content,
      })
    ).response.status,
    401,
  );
  assert.equal(
    (
      await request("/api/admin/setup", {
        method: "POST",
        data: { username: "admin", password },
        requestOrigin: "https://attacker.invalid",
      })
    ).response.status,
    403,
  );
  assert.equal(
    (
      await request("/api/admin/setup", {
        method: "POST",
        data: { username: "admin", password: "short" },
      })
    ).response.status,
    400,
  );
  const setup = await request("/api/admin/setup", {
    method: "POST",
    data: { username: "admin", password },
  });
  assert.equal(setup.response.status, 200);
  const cookie = setup.response.headers.get("set-cookie").split(";")[0];
  assert.match(setup.response.headers.get("set-cookie"), /HttpOnly/);
  assert.match(setup.response.headers.get("set-cookie"), /SameSite=Strict/);
  const csrf = setup.body.csrfToken;
  assert.equal(
    (
      await request("/api/admin/setup", {
        method: "POST",
        data: { username: "second", password },
      })
    ).response.status,
    409,
  );
  assert.equal(
    (
      await request("/api/admin/login", {
        method: "POST",
        data: { username: "admin", password: "incorrect-long-password" },
      })
    ).response.status,
    401,
  );
  assert.equal(
    (
      await request("/api/admin/content", {
        method: "PUT",
        data: publicContent.body.content,
        cookie,
      })
    ).response.status,
    403,
  );
  assert.equal(
    (
      await request("/api/admin/content", {
        method: "PUT",
        data: { members: [], projects: [{ id: "broken" }] },
        cookie,
        csrf,
        revision: 1,
      })
    ).response.status,
    400,
  );
  const content = structuredClone(publicContent.body.content);
  content.members[0].bio = "Backend persistence test";
  content.members[0].status = "former";
  const saved = await request("/api/admin/content", {
    method: "PUT",
    data: content,
    cookie,
    csrf,
    revision: 1,
  });
  assert.equal(saved.response.status, 200);
  assert.equal(saved.body.revision, 2);
  assert.equal(
    (
      await request("/api/admin/content", {
        method: "PUT",
        data: content,
        cookie,
        csrf,
        revision: 1,
      })
    ).response.status,
    409,
  );
  assert.equal(
    (await request("/api/content")).body.content.members[0].bio,
    "Backend persistence test",
  );
  const stored = await readFile(resolve(directory, "admin.json"), "utf8");
  assert.equal(stored.includes(password), false);
  assert.equal(JSON.parse(stored).hash.length, 128);
  assert.equal(
    (
      await request("/api/admin/logout", {
        method: "POST",
        data: {},
        cookie,
        csrf,
      })
    ).response.status,
    200,
  );
  assert.equal(
    (
      await request("/api/admin/content", {
        method: "PUT",
        data: content,
        cookie,
        csrf,
        revision: 2,
      })
    ).response.status,
    401,
  );
  const login = await request("/api/admin/login", {
    method: "POST",
    data: { username: "admin", password },
  });
  assert.equal(login.response.status, 200);
  const expiredCookie = login.response.headers.get("set-cookie").split(";")[0];
  await new Promise((resolve) => setTimeout(resolve, 2100));
  assert.equal(
    (await request("/api/admin/session", { cookie: expiredCookie })).body
      .authenticated,
    false,
  );
  await close();
  app = await createApplication({ dataDirectory: directory });
  app.listen(0, "127.0.0.1");
  await once(app, "listening");
  origin = `http://127.0.0.1:${app.address().port}`;
  assert.equal((await request("/api/admin/session")).body.setupRequired, false);
  assert.equal(
    (await request("/api/content")).body.content.members[0].bio,
    "Backend persistence test",
  );
  for (let i = 0; i < 10; i++)
    await request("/api/admin/login", {
      method: "POST",
      data: { username: "admin", password: "incorrect-long-password" },
    });
  assert.equal(
    (
      await request("/api/admin/login", {
        method: "POST",
        data: { username: "admin", password },
      })
    ).response.status,
    429,
  );
  console.log(
    "Backend checks passed: setup, scrypt hash, login, HttpOnly cookie, origin/CSRF protection, validation, revision conflicts, logout, expiry, rate limit and persistence across restart.",
  );
} finally {
  await close();
  if (
    !directory.startsWith(qaRoot + sep) ||
    !directory.startsWith(resolve(qaRoot, "backend-test-"))
  )
    throw Error("Unsafe test cleanup path");
  await rm(directory, { recursive: true, force: true });
}
