import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM(
  '<!doctype html><html lang="fa" dir="rtl"><head><meta name="theme-color"></head><body><div id="root"></div></body></html>',
  { url: "http://localhost:4188/projects", pretendToBeVisual: true },
);
for (const key of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "Element",
  "Node",
  "SVGElement",
  "localStorage",
  "getComputedStyle",
])
  Object.defineProperty(globalThis, key, {
    value:
      key === "getComputedStyle"
        ? dom.window.getComputedStyle.bind(dom.window)
        : dom.window[key],
    configurable: true,
  });
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
const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { BrowserRouter } = await import("react-router-dom");
const { App, initialContent } = await import("../.ssr-build/entry-server.js");
const seed = structuredClone(initialContent);
seed.projects = seed.projects.filter(
  (p) => !["raein", "bokhar"].includes(p.id),
);
seed.members[0].bio = "Saved user biography";
localStorage.setItem("raiban-studio-content-v1", JSON.stringify(seed));
let root = createRoot(document.getElementById("root"));
const mount = async () => {
  await React.act(async () => {
    root.render(
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(App, {
          initialLang:
            localStorage.getItem("raiban-language") === "en" ? "en" : "fa",
          initialTheme:
            localStorage.getItem("raiban-theme") === "light" ? "light" : "dark",
        }),
      ),
    );
  });
};
const click = async (element) => {
  assert.ok(element, "Expected control must exist");
  await React.act(async () => {
    element.dispatchEvent(
      new dom.window.MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });
};
await mount();
assert.equal(document.querySelector(".scene-activate"), null);
assert.equal(
  document.querySelector(".rail-menu-toggle").getAttribute("aria-expanded"),
  "false",
);
await click(document.querySelector(".rail-menu-toggle"));
assert.equal(
  document.querySelector(".rail-menu-toggle").getAttribute("aria-expanded"),
  "true",
);
await React.act(async () => {
  document.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
  );
  document.querySelector("#main-content").dispatchEvent(
    new dom.window.Event("pointerdown", { bubbles: true }),
  );
});
assert.equal(
  document.querySelector(".rail-menu-toggle").getAttribute("aria-expanded"),
  "true",
);
await click(document.querySelector('.rail-navigation a[href="/#about"]'));
assert.equal(
  document.querySelector(".rail-menu-toggle").getAttribute("aria-expanded"),
  "true",
);
await click(document.querySelector(".rail-menu-toggle"));
assert.equal(
  document.querySelector(".rail-menu-toggle").getAttribute("aria-expanded"),
  "false",
);
assert.equal(document.querySelectorAll(".rail-navigation small").length, 0);
assert.ok(document.querySelector('a[href="/projects/raein"]'));
assert.ok(document.querySelector('a[href="/projects/bokhar"]'));
assert.equal(
  JSON.parse(localStorage.getItem("raiban-studio-content-v1")).members[0].bio,
  "Saved user biography",
);
await click(document.querySelector(".theme-button"));
assert.equal(document.documentElement.dataset.theme, "light");
assert.equal(localStorage.getItem("raiban-theme"), "light");
await click(document.querySelector(".language-button"));
assert.equal(document.documentElement.dir, "ltr");
assert.equal(document.documentElement.lang, "en");
assert.equal(
  document.querySelector(".rail-navigation").textContent.includes("Contact"),
  true,
);
const filters = [...document.querySelectorAll(".filters button")];
await click(filters.find((b) => b.textContent === "AI"));
assert.equal(document.querySelectorAll(".project-card").length, 1);
await click(filters[0]);
assert.equal(document.querySelectorAll(".project-card").length, 5);
await click(document.querySelector('a[href="/projects/raein"]'));
assert.equal(dom.window.location.pathname, "/projects/raein");
assert.ok(
  document
    .querySelector(".detail-content")
    .textContent.includes("Separate tools for teaching"),
);
await click(document.querySelector('.rail-navigation a[href="/contact"]'));
assert.equal(dom.window.location.pathname, "/contact");
assert.ok(document.querySelector('a[href="tel:+989045911122"]'));
for (const href of [
  "https://t.me/ali_hashemi8",
  "https://eitaa.com/ali_hashemi8",
  "https://rubika.ir/ali_hashemi8",
  "https://ble.ir/ali_hashemi8",
  "https://github.com/alihashemi8",
  "https://www.linkedin.com/in/alihashemi8/",
  "https://wa.me/989045911122",
])
  assert.ok(document.querySelector(`.contact-directory a[href="${href}"]`));
await click(document.querySelector(".rail-menu-toggle"));
assert.equal(
  document.querySelector(".rail-menu-toggle").getAttribute("aria-expanded"),
  "true",
);
await click(document.querySelector(".rail-menu-toggle"));
assert.equal(
  document.querySelector(".rail-menu-toggle").getAttribute("aria-expanded"),
  "false",
);
assert.equal(document.body.style.overflow, "");
for (const brand of ["rubika", "eitaa", "bale"])
  assert.ok(document.querySelector(`.messenger-mark[data-brand="${brand}"]`));
assert.ok(document.querySelector('.contact-channel[aria-disabled="true"]'));
assert.equal(document.querySelectorAll(".contact-section").length, 0);
assert.equal(document.querySelectorAll('a[href="/studio"]').length, 0);
await click(document.querySelector('.footer-links a[href="/team"]'));
assert.equal(dom.window.location.pathname, "/team");
assert.equal(document.querySelectorAll(".team-group").length, 2);
assert.ok(
  document.querySelector(".team-group").textContent.includes("Current team"),
);
assert.ok(
  document
    .querySelectorAll(".team-group")[1]
    .textContent.includes("Former collaborators"),
);
await click(document.querySelector('a[href="/team/nika-farzan"]'));
assert.equal(dom.window.location.pathname, "/team/nika-farzan");
assert.ok(
  document
    .querySelector(".member-page")
    .textContent.includes("Former collaborator"),
);
await click(document.querySelector(".site-header .brand"));
assert.equal(dom.window.location.pathname, "/");
assert.equal(document.querySelectorAll(".team-group").length, 1);
assert.equal(
  document.querySelectorAll('a[href="/team/nika-farzan"]').length,
  0,
);
assert.ok(
  document.querySelector('.floating-technology img[src="/brands/react.svg"]'),
);
assert.ok(
  document.querySelector('.floating-technology img[src="/brands/python.svg"]'),
);
await React.act(async () => root.unmount());
root = createRoot(document.getElementById("root"));
await mount();
assert.equal(document.documentElement.dataset.theme, "light");
assert.equal(document.documentElement.dir, "ltr");
await click(document.querySelector(".theme-button"));
assert.equal(document.documentElement.dataset.theme, "dark");
await click(document.querySelector(".language-button"));
assert.equal(document.documentElement.dir, "rtl");
await React.act(async () => root.unmount());
dom.window.close();
console.log(
  "DOM integration passed: button-only mobile menu dismissal, language/theme persistence, project filters, former members only in the team directory, themed messenger marks, added programming symbols, contact links and removed public admin/brief UI. Browser geometry is checked separately.",
);
