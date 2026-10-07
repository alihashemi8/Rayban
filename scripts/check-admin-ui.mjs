import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { randomBytes } from "node:crypto";
import { once } from "node:events";

const dom = new JSDOM(
  '<!doctype html><html lang="fa" dir="rtl"><head></head><body><div id="root"></div></body></html>',
  { url: "http://localhost:4188/admin", pretendToBeVisual: true },
);
for (const key of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLSelectElement",
  "HTMLTextAreaElement",
  "Element",
  "Node",
  "SVGElement",
  "localStorage",
  "FormData",
])
  Object.defineProperty(globalThis, key, {
    value: dom.window[key],
    configurable: true,
  });
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(
  dom.window,
);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(
  dom.window,
);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.matchMedia = () => ({
  matches: true,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
});
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
const nativeFetch = globalThis.fetch;
const { createApplication } = await import("../server/index.mjs");
const qaRoot = resolve("qa");
await mkdir(qaRoot, { recursive: true });
const directory = await mkdtemp(resolve(qaRoot, "admin-ui-test-"));
const server = await createApplication({ dataDirectory: directory });
server.listen(0, "127.0.0.1");
await once(server, "listening");
const origin = `http://127.0.0.1:${server.address().port}`;
let cookie = "";
globalThis.fetch = async (path, options = {}) => {
  const response = await nativeFetch(new URL(path, origin), {
    ...options,
    headers: {
      ...options.headers,
      Origin: origin,
      ...(cookie ? { Cookie: cookie } : {}),
    },
  });
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";")[0];
  return response;
};
const React = await import("react"),
  { createRoot } = await import("react-dom/client"),
  { BrowserRouter } = await import("react-router-dom"),
  { App } = await import("../.ssr-build/entry-server.js");
const root = createRoot(document.getElementById("root"));
const click = async (el) => {
  assert.ok(el, "Expected control");
  await React.act(async () =>
    el.dispatchEvent(
      new dom.window.MouseEvent("click", { bubbles: true, cancelable: true }),
    ),
  );
};
const wait = async (predicate) => {
  for (let i = 0; i < 100; i++) {
    await React.act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
    if (predicate()) return;
  }
  throw Error("Timed out waiting for UI state");
};
const submit = async (form) => {
  await React.act(async () =>
    form.dispatchEvent(
      new dom.window.Event("submit", { bubbles: true, cancelable: true }),
    ),
  );
};
const input = async (el, value) => {
  assert.ok(el, "Expected form input");
  await React.act(async () => {
    const prototype =
      el.tagName === "SELECT"
        ? dom.window.HTMLSelectElement.prototype
        : el.tagName === "TEXTAREA"
          ? dom.window.HTMLTextAreaElement.prototype
          : dom.window.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, "value").set.call(el, value);
    el.dispatchEvent(
      new dom.window.Event(el.tagName === "SELECT" ? "change" : "input", {
        bubbles: true,
      }),
    );
  });
};
const labelInput = (text) =>
  [...document.querySelectorAll(".editor-form label")]
    .find((label) => label.textContent.startsWith(text))
    ?.querySelector("input,select,textarea");
const password = randomBytes(24).toString("hex");
try {
  await React.act(async () =>
    root.render(
      React.createElement(BrowserRouter, null, React.createElement(App)),
    ),
  );
  await wait(() => document.querySelector(".admin-login-card form"));
  assert.equal(document.querySelectorAll(".manager").length, 0);
  document.querySelector('input[name="password"]').value = password;
  document.querySelector('input[name="confirm"]').value = password;
  await submit(document.querySelector(".admin-login-card form"));
  await wait(() => document.querySelector(".manager"));
  assert.ok(document.querySelector(".admin-toolbar"));
  await click(
    [...document.querySelectorAll(".manager-toolbar button")].find((button) =>
      button.textContent.includes("عضو جدید"),
    ),
  );
  await input(labelInput("نام فارسی"), "عضو آزمایشی بک‌اند");
  await input(labelInput("نقش *"), "مهندس آزمایشی");
  await input(labelInput("وضعیت همکاری"), "former");
  await input(
    labelInput("رزومه و معرفی"),
    "رزومه آزمایشی برای بررسی ذخیره در سرور.",
  );
  assert.equal(document.querySelector(".editor-form").checkValidity(), true);
  await submit(document.querySelector(".editor-form"));
  await wait(() =>
    [...document.querySelectorAll(".manager-list h3")].some((h) =>
      h.textContent.includes("عضو آزمایشی بک‌اند"),
    ),
  );
  const stored = (await (await nativeFetch(origin + "/api/content")).json())
    .content;
  assert.equal(
    stored.members.find((member) => member.name === "عضو آزمایشی بک‌اند")
      .status,
    "former",
  );
  const article = [...document.querySelectorAll(".manager-list article")].find(
    (a) => a.textContent.includes("عضو آزمایشی بک‌اند"),
  );
  await click(article.querySelector(".delete-button"));
  await click(article.querySelector(".delete-confirm button"));
  await wait(
    () =>
      ![...document.querySelectorAll(".manager-list h3")].some((h) =>
        h.textContent.includes("عضو آزمایشی بک‌اند"),
      ),
  );
  await click(document.querySelectorAll(".manager-tabs button")[1]);
  await click(
    [...document.querySelectorAll(".manager-toolbar button")].find((button) =>
      button.textContent.includes("پروژه جدید"),
    ),
  );
  await input(labelInput("عنوان فارسی"), "پروژه آزمایشی بک‌اند");
  await input(labelInput("دسته‌بندی فارسی"), "هوش مصنوعی");
  await input(
    labelInput("شرح پروژه"),
    "توضیحات آزمایشی برای بررسی ذخیره پروژه در سرور.",
  );
  assert.equal(document.querySelector(".editor-form").checkValidity(), true);
  await submit(document.querySelector(".editor-form"));
  await wait(() =>
    [...document.querySelectorAll(".manager-list h3")].some((h) =>
      h.textContent.includes("پروژه آزمایشی بک‌اند"),
    ),
  );
  let projectArticle = [
    ...document.querySelectorAll(".manager-list article"),
  ].find((a) => a.textContent.includes("پروژه آزمایشی بک‌اند"));
  await click(projectArticle.querySelector('button[aria-label^="ویرایش"]'));
  await input(labelInput("عنوان فارسی"), "پروژه ویرایش‌شده بک‌اند");
  await submit(document.querySelector(".editor-form"));
  await wait(() =>
    [...document.querySelectorAll(".manager-list h3")].some((h) =>
      h.textContent.includes("پروژه ویرایش‌شده بک‌اند"),
    ),
  );
  assert.ok(
    (
      await (await nativeFetch(origin + "/api/content")).json()
    ).content.projects.some((p) => p.title[0] === "پروژه ویرایش‌شده بک‌اند"),
  );
  projectArticle = [...document.querySelectorAll(".manager-list article")].find(
    (a) => a.textContent.includes("پروژه ویرایش‌شده بک‌اند"),
  );
  await click(projectArticle.querySelector(".delete-button"));
  await click(projectArticle.querySelector(".delete-confirm button"));
  await wait(
    () =>
      ![...document.querySelectorAll(".manager-list h3")].some((h) =>
        h.textContent.includes("پروژه ویرایش‌شده بک‌اند"),
      ),
  );
  await click(document.querySelector(".admin-toolbar button"));
  await wait(() => document.querySelector(".admin-login-card form"));
  assert.equal(document.querySelectorAll(".manager").length, 0);
  assert.equal(dom.window.location.pathname, "/admin/login");
  document.querySelector('input[name="password"]').value = password;
  await submit(document.querySelector(".admin-login-card form"));
  await wait(() => document.querySelector(".manager"));
  console.log(
    "Admin UI integration passed against an isolated real HTTP backend: setup, login, member creation, former status, project creation/editing, server persistence, deletion, logout and login again. The production admin account remains unconfigured.",
  );
} finally {
  await React.act(async () => root.unmount());
  dom.window.close();
  globalThis.fetch = nativeFetch;
  await new Promise((resolve) => server.close(resolve));
  if (
    !directory.startsWith(qaRoot + sep) ||
    !directory.startsWith(resolve(qaRoot, "admin-ui-test-"))
  )
    throw Error("Unsafe test cleanup path");
  await rm(directory, { recursive: true, force: true });
}
