import { createServer } from "node:http";
import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { randomBytes, scrypt as derive, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { initialContent, validateContent } from "../.ssr-build/entry-server.js";

const scrypt = promisify(derive);
const sessionLifetime = 8 * 60 * 60 * 1000;
const cookieName = "rayban_admin";
const json = (res, status, value, headers = {}) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  res.end(JSON.stringify(value));
};
async function optionalJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}
async function atomicJson(path, value) {
  const temporary = path + "." + randomBytes(8).toString("hex") + ".tmp";
  await writeFile(temporary, JSON.stringify(value, null, 2), { mode: 0o600 });
  await rename(temporary, path);
}
async function body(req) {
  let bytes = 0;
  const chunks = [];
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > 2_000_000)
      throw Object.assign(Error("درخواست بیش از حد بزرگ است."), {
        status: 413,
      });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw Object.assign(Error("درخواست معتبر نیست."), { status: 400 });
  }
}
function credentials(value) {
  return (
    value &&
    typeof value.username === "string" &&
    /^[a-zA-Z0-9_-]{3,50}$/.test(value.username) &&
    typeof value.password === "string" &&
    value.password.length >= 12 &&
    value.password.length <= 128
  );
}
export async function createApplication({
  dataDirectory = resolve(".data"),
  uiDirectory = resolve("dist"),
  allowedOrigins,
  sessionMs = sessionLifetime,
} = {}) {
  await mkdir(dataDirectory, { recursive: true });
  const adminFile = resolve(dataDirectory, "admin.json"),
    contentFile = resolve(dataDirectory, "content.json");
  let admin = await optionalJson(adminFile);
  let catalog = (await optionalJson(contentFile)) || {
    revision: 1,
    content: structuredClone(initialContent),
  };
  if (!validateContent(catalog.content))
    throw Error("Stored content is invalid; restore a validated backup.");
  const sessions = new Map(),
    attempts = new Map();
  let setupBusy = false,
    writing = false;
  const app = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const forwardedProtocol = req.headers["x-forwarded-proto"];
      const secure =
        process.env.RAYBAN_SECURE_COOKIE === "1" ||
        forwardedProtocol === "https";
      const cookie = (id, age) =>
        `${cookieName}=${id}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=${age}${secure ? "; Secure" : ""}`;
      const id = (req.headers.cookie || "")
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith(cookieName + "="))
        ?.slice(cookieName.length + 1);
      let session = id ? sessions.get(id) : null;
      if (session && session.expires <= Date.now()) {
        sessions.delete(id);
        session = null;
      }
      const effectiveOrigins = allowedOrigins || [
        "http://localhost:" + app.address().port,
        "http://127.0.0.1:" + app.address().port,
        "http://localhost:5188",
        "http://127.0.0.1:5188",
      ];
      if (url.pathname.startsWith("/api/")) {
        if (req.method !== "GET") {
          if (!effectiveOrigins.includes(req.headers.origin))
            return json(res, 403, { error: "مبدأ درخواست مجاز نیست." });
        }
        if (url.pathname === "/api/content" && req.method === "GET")
          return json(res, 200, catalog);
        if (url.pathname === "/api/admin/session" && req.method === "GET")
          return json(res, 200, {
            authenticated: !!session,
            setupRequired: !admin,
            ...(session
              ? { username: session.username, csrfToken: session.csrfToken }
              : {}),
          });
        if (
          ["/api/admin/login", "/api/admin/setup"].includes(url.pathname) &&
          req.method === "POST"
        ) {
          const ip = req.socket.remoteAddress;
          const recent = attempts.get(ip) || {
            count: 0,
            until: Date.now() + 15 * 60 * 1000,
          };
          if (recent.until <= Date.now()) {
            recent.count = 0;
            recent.until = Date.now() + 15 * 60 * 1000;
          }
          if (recent.count >= 10)
            return json(res, 429, {
              error: "تلاش‌های زیاد؛ چند دقیقه دیگر دوباره امتحان کنید.",
            });
          recent.count++;
          attempts.set(ip, recent);
          const data = await body(req);
          if (!credentials(data))
            return json(res, 400, {
              error:
                "نام کاربری ۳ تا ۵۰ کاراکتر و رمز عبور حداقل ۱۲ کاراکتر لازم است.",
            });
          if (url.pathname.endsWith("/setup")) {
            if (admin || setupBusy)
              return json(res, 409, {
                error: "حساب ادمین قبلاً ساخته شده است.",
              });
            if (!["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(ip))
              return json(res, 403, {
                error: "ایجاد حساب فقط از همین دستگاه مجاز است.",
              });
            setupBusy = true;
            try {
              const salt = randomBytes(32).toString("hex");
              const hash = (await scrypt(data.password, salt, 64)).toString(
                "hex",
              );
              const next = { username: data.username, salt, hash };
              await atomicJson(adminFile, next);
              admin = next;
            } finally {
              setupBusy = false;
            }
          } else {
            if (!admin)
              return json(res, 409, { error: "ابتدا حساب ادمین را بسازید." });
            const candidate = await scrypt(data.password, admin.salt, 64);
            if (
              !timingSafeEqual(candidate, Buffer.from(admin.hash, "hex")) ||
              data.username !== admin.username
            )
              return json(res, 401, {
                error: "نام کاربری یا رمز عبور نادرست است.",
              });
          }
          attempts.delete(ip);
          if (id) sessions.delete(id);
          const nextId = randomBytes(32).toString("hex"),
            csrfToken = randomBytes(32).toString("hex");
          sessions.set(nextId, {
            username: admin.username,
            csrfToken,
            expires: Date.now() + sessionMs,
          });
          return json(
            res,
            200,
            { authenticated: true, username: admin.username, csrfToken },
            { "Set-Cookie": cookie(nextId, Math.floor(sessionMs / 1000)) },
          );
        }
        if (
          url.pathname === "/api/admin/content" ||
          url.pathname === "/api/admin/logout"
        ) {
          if (!session)
            return json(res, 401, {
              error: "برای تغییر محتوا وارد حساب ادمین شوید.",
            });
          if (req.headers["x-csrf-token"] !== session.csrfToken)
            return json(res, 403, {
              error: "نشست معتبر نیست؛ دوباره وارد شوید.",
            });
          if (url.pathname.endsWith("/logout") && req.method === "POST") {
            sessions.delete(id);
            return json(
              res,
              200,
              { ok: true },
              { "Set-Cookie": cookie("", 0) },
            );
          }
          if (url.pathname.endsWith("/content") && req.method === "PUT") {
            const value = await body(req);
            if (!validateContent(value))
              return json(res, 400, {
                error: "اطلاعات اعضا یا پروژه‌ها معتبر نیست.",
              });
            if (writing || req.headers["if-match"] !== String(catalog.revision))
              return json(res, 409, {
                error:
                  "محتوا تغییر کرده است؛ صفحه را تازه کنید و دوباره ویرایش کنید.",
              });
            writing = true;
            try {
              const next = { revision: catalog.revision + 1, content: value };
              await atomicJson(contentFile, next);
              catalog = next;
              return json(res, 200, next);
            } finally {
              writing = false;
            }
          }
        }
        return json(res, 404, { error: "مسیر پیدا نشد." });
      }
      if (!["GET", "HEAD"].includes(req.method)) {
        res.writeHead(405);
        return res.end();
      }
      let path = resolve(uiDirectory, "." + decodeURIComponent(url.pathname));
      if (path !== uiDirectory && !path.startsWith(uiDirectory + sep)) {
        res.writeHead(404);
        return res.end();
      }
      let file;
      let routeFallback = false;
      try {
        file = await readFile(
          extname(path) ? path : resolve(path, "index.html"),
        );
      } catch (error) {
        if (error.code !== "ENOENT" && error.code !== "EISDIR") throw error;
        routeFallback = true;
        path = resolve(uiDirectory, "index.html");
        file = await readFile(path);
      }
      // A new client route must not briefly display the prerendered homepage.
      if (routeFallback)
        file = Buffer.from(
          file
            .toString("utf8")
            .replace(
              /<div id="root"[\s\S]*<\/div>(?=\s*<\/body>)/,
              '<div id="root"></div>',
            ),
        );
      const extension = extname(path) || ".html";
      const mime =
        {
          ".html": "text/html; charset=utf-8",
          ".js": "text/javascript",
          ".css": "text/css",
          ".woff2": "font/woff2",
          ".webp": "image/webp",
          ".svg": "image/svg+xml",
          ".png": "image/png",
        }[extension] || "application/octet-stream";
      const headers = {
        "Content-Type": mime,
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Frame-Options": "DENY",
        "Cache-Control": url.pathname.startsWith("/assets/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      };
      if (url.pathname === "/studio" || /^\/admin(?:\/|$)/.test(url.pathname))
        headers["X-Robots-Tag"] = "noindex, nofollow";
      if (
        mime.startsWith("text/") &&
        req.headers["accept-encoding"]?.includes("gzip")
      ) {
        file = gzipSync(file);
        headers["Content-Encoding"] = "gzip";
        headers.Vary = "Accept-Encoding";
      }
      res.writeHead(200, headers);
      res.end(req.method === "HEAD" ? undefined : file);
    } catch (error) {
      if (!res.headersSent)
        json(res, error.status || 500, {
          error: error.status ? error.message : "خطای سرور؛ دوباره تلاش کنید.",
        });
      else res.end();
    }
  });
  app.on("close", () => sessions.clear());
  return app;
}
if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  const args = process.argv.slice(2);
  const portIndex = args.indexOf("--port");
  const port = Number(
    portIndex === -1 ? process.env.RAYBAN_PORT || 4188 : args[portIndex + 1],
  );
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw Error("Invalid port");
  const app = await createApplication();
  app.listen(port, "127.0.0.1", () =>
    console.log(`Rayban site and admin API: http://localhost:${port}`),
  );
}
