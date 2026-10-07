import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render, initialContent } from "../.ssr-build/entry-server.js";
const template = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const routes = [
  { path: "/", title: "رایبان — مهندسی فردا", description: null },
  {
    path: "/projects",
    title: "پروژه‌ها — رایبان",
    description:
      "پروژه‌های نرم‌افزاری و هوش مصنوعی رایبان؛ رائین، بخار و مطالعات مفهومی.",
  },
  {
    path: "/contact",
    title: "ارتباط با ما — رایبان",
    description:
      "تماس تلفنی، ایمیل و پیام‌رسان‌های رایبان برای معرفی ایده و شروع همکاری.",
  },
  ...initialContent.projects.map((p) => ({
    path: `/projects/${p.id}`,
    title: `${p.title[0]} — Rayban`,
    description: p.description[0],
  })),
  {
    path: "/team",
    title: "اعضای تیم — Rayban",
    description:
      "اعضای فعلی و همکاران پیشین رایبان؛ تخصص‌ها، رزومه و مشارکت‌ها.",
  },
  ...initialContent.members.map((member) => ({
    path: `/team/${member.id}`,
    title: `${member.name} — Rayban`,
    description: member.bio,
  })),
];
const escape = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
for (const route of routes) {
  const directory = new URL(
    `../dist${route.path === "/" ? "" : route.path}/`,
    import.meta.url,
  );
  await mkdir(directory, { recursive: true });
  let html = template
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-route="${route.path}">${render(route.path)}</div>`,
    )
    .replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`);
  if (route.description)
    html = html.replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${escape(route.description)}$2`,
    );
  await writeFile(new URL("index.html", directory), html);
}
console.log(
  `Prerendered ${routes.length} public pages for fast first paint and crawlable content.`,
);
