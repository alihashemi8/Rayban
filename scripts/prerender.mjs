import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render, initialContent } from "../.ssr-build/entry-server.js";
const template = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const routes = [
  {
    path: "/",
    title: "استودیو نرم‌افزار و هوش مصنوعی رایبان",
    description:
      "توسعه سامانه‌های نرم‌افزاری، اپلیکیشن‌های موبایل و راهکارهای هوش مصنوعی کاربردی.",
  },
  {
    path: "/projects",
    title: "پروژه‌ها — استودیو رایبان",
    description:
      "پروژه‌های نرم‌افزاری و راهکارهای هوش مصنوعی استودیو رایبان؛ سامانه‌های عملیاتی و مطالعات تحقیق و توسعه.",
  },
  {
    path: "/contact",
    title: "ارتباط با ما — استودیو رایبان",
    description:
      "ارتباط با تیم رایبان؛ مشاوره فنی، برآورد پروژه و راه‌های ارتباطی در پیام‌رسان‌ها.",
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
      "تیم مهندسی و متخصصان استودیو رایبان؛ تخصص‌های فنی و سوابق همکاری.",
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
