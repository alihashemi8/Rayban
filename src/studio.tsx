import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { projects as concepts } from "./data";
import { realProjects } from "./realProjects";
import { apiRequest } from "./api";
export type Member = {
  id: string;
  name: string;
  enName: string;
  role: string;
  enRole: string;
  bio: string;
  enBio: string;
  skills: string[];
  contributions: string;
  email: string;
  github: string;
  linkedin: string;
  demo: boolean;
  initials: string;
  status?: "current" | "former";
  collaborationPeriod?: string;
};
export type Project = {
  id: string;
  number: string;
  title: string[];
  category: string[];
  description: string[];
  stack: string[];
  visual: string;
  color: string;
  features: string[];
  enFeatures: string[];
  status: string;
  problem: string;
  enProblem?: string;
  solution: string;
  enSolution?: string;
  architecture: string;
  achievements: string;
  enAchievements?: string;
  image: string;
  timeline: string;
  contributors: Record<string, string>;
  demo: boolean;
};
export const contributorRoles = [
  "Project lead",
  "Frontend developer",
  "Backend developer",
  "UI/UX designer",
  "DevOps engineer",
  "AI contributor",
  "Tester",
];
export type Content = { members: Member[]; projects: Project[] };
export const initialContent: Content = {
  members: [
    {
      id: "ali-hashemi",
      name: "علی هاشمی",
      enName: "Ali Hashemi",
      role: "مهندس نرم‌افزار",
      enRole: "Software engineer",
      bio: "عضو تیم رایبان. اطلاعات تکمیلی رزومه به‌زودی اضافه می‌شود.",
      enBio: "Rayban team member. Full biography will be added soon.",
      skills: ["Software engineering"],
      contributions: "در انتظار تکمیل اطلاعات مشارکت‌ها",
      email: "alihashemi5553@gmail.com",
      github: "https://github.com/alihashemi8",
      linkedin: "https://www.linkedin.com/in/alihashemi8/",
      demo: false,
      initials: "AH",
    },
    {
      id: "sara-mehr",
      name: "سارا مهر",
      enName: "Sara Mehr",
      role: "مهندس فرانت‌اند",
      enRole: "Frontend engineer",
      bio: "رزومه نمایشی: ۴ سال تجربه در طراحی و توسعه رابط‌های وب. علاقه‌مند به سیستم‌های طراحی، دسترس‌پذیری و تبدیل جزئیات کوچک به تجربه‌های به‌یادماندنی.",
      enBio:
        "Fictional resume: four years designing and building web interfaces, with a focus on design systems, accessibility and thoughtful details.",
      skills: ["React", "TypeScript", "Design systems"],
      contributions:
        "نمایشی: توسعه داشبورد آموزشی، کتابخانه کامپوننت و تجربه موبایل.",
      email: "",
      github: "",
      linkedin: "",
      demo: true,
      initials: "SM",
    },
    {
      id: "armin-rad",
      name: "آرمین راد",
      enName: "Armin Rad",
      role: "مهندس بک‌اند و زیرساخت",
      enRole: "Backend & infrastructure engineer",
      bio: "رزومه نمایشی: ۵ سال تجربه در ساخت سرویس‌های وب و معماری داده. تمرکز بر APIهای قابل اعتماد، PostgreSQL و استقرار پایدار با Docker.",
      enBio:
        "Fictional resume: five years building web services and data architecture, focused on dependable APIs, PostgreSQL and Docker deployments.",
      skills: ["Django", "PostgreSQL", "Docker"],
      contributions:
        "نمایشی: معماری سرویس‌ها، طراحی پایگاه داده و فرایند استقرار.",
      email: "",
      github: "",
      linkedin: "",
      demo: true,
      initials: "AR",
    },
    {
      id: "nika-farzan",
      status: "former",
      collaborationPeriod: "همکاری نمایشی پیشین",
      name: "نیکا فرزان",
      enName: "Nika Farzan",
      role: "طراح محصول و پژوهشگر AI",
      enRole: "Product designer & AI researcher",
      bio: "رزومه نمایشی: ۳ سال تجربه در طراحی محصول و نمونه‌سازی ابزارهای هوشمند. علاقه‌مند به پیوند پژوهش کاربر، یادگیری و هوش مصنوعی مسئولانه.",
      enBio:
        "Fictional resume: three years of product design and prototyping intelligent tools, connecting user research, learning and responsible AI.",
      skills: ["Product design", "Python", "LLM"],
      contributions:
        "نمایشی: پژوهش تجربه یادگیری، طراحی تعاملات و نمونه‌سازی دستیار هوشمند.",
      email: "",
      github: "",
      linkedin: "",
      demo: true,
      initials: "NF",
    },
  ],
  projects: [
    ...realProjects,
    ...concepts.map((p, i) => ({
      ...p,
      number: String(i + 3).padStart(2, "0"),
      title: [...p.title],
      category: [...p.category],
      description: [...p.description],
      stack: [...p.stack],
      features: [...p.features],
      enFeatures: [...p.enFeatures],
      status: "طرح مفهومی",
      problem:
        "فرایندهای جدا، داده‌های پراکنده و ابزارهای ناهماهنگ، تجربه کاربر را پیچیده می‌کنند. این مطالعه مفهومی به دنبال تجربه‌ای یکپارچه است.",
      solution: p.description[0],
      architecture:
        "React / TypeScript → REST API / Django → PostgreSQL / Redis",
      achievements:
        "نمونه‌سازی تجربه متصل\nطراحی معماری ماژولار\nبررسی مسیرهای اصلی کاربر",
      image: "",
      timeline:
        "کشف مسئله | مرحله پیشنهادی\nطراحی تجربه | مرحله پیشنهادی\nتوسعه و ارزیابی | مرحله پیشنهادی",
      contributors: {
        "Frontend developer": "sara-mehr",
        "Backend developer": "armin-rad",
        "UI/UX designer": "nika-farzan",
        ...(i === 1 ? { "AI contributor": "nika-farzan" } : {}),
      },
      demo: true,
    })),
  ],
};
export function safeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return value === "";
  }
}
const texts = (value: unknown) =>
  Array.isArray(value) && value.every((v) => typeof v === "string");
export function validateContent(value: unknown): value is Content {
  if (!value || typeof value !== "object") return false;
  const c = value as Content;
  if (
    !Array.isArray(c.members) ||
    !Array.isArray(c.projects) ||
    c.members.length > 100 ||
    c.projects.length > 100
  )
    return false;
  const members = c.members.every(
    (m) =>
      m &&
      [
        "id",
        "name",
        "enName",
        "role",
        "enRole",
        "bio",
        "enBio",
        "contributions",
        "email",
        "github",
        "linkedin",
        "initials",
      ].every((k) => typeof m[k as keyof Member] === "string") &&
      texts(m.skills) &&
      (m.status === undefined ||
        m.status === "current" ||
        m.status === "former") &&
      (m.collaborationPeriod === undefined ||
        typeof m.collaborationPeriod === "string") &&
      typeof m.demo === "boolean" &&
      safeUrl(m.github) &&
      safeUrl(m.linkedin),
  );
  const projects = c.projects.every(
    (p) =>
      p &&
      [
        "id",
        "number",
        "visual",
        "color",
        "status",
        "problem",
        "solution",
        "architecture",
        "achievements",
        "image",
        "timeline",
      ].every((k) => typeof p[k as keyof Project] === "string") &&
      ["enProblem", "enSolution", "enAchievements"].every(
        (k) =>
          p[k as keyof Project] === undefined ||
          typeof p[k as keyof Project] === "string",
      ) &&
      [
        "title",
        "category",
        "description",
        "stack",
        "features",
        "enFeatures",
      ].every((k) => texts(p[k as keyof Project])) &&
      p.title.length === 2 &&
      p.category.length === 2 &&
      p.description.length === 2 &&
      typeof p.demo === "boolean" &&
      safeUrl(p.image) &&
      p.contributors &&
      typeof p.contributors === "object" &&
      !Array.isArray(p.contributors) &&
      Object.entries(p.contributors).every(
        ([role, id]) =>
          contributorRoles.includes(role) &&
          typeof id === "string" &&
          c.members.some((m) => m.id === id),
      ) &&
      /^[a-z0-9-]+$/.test(p.id),
  );
  return (
    members &&
    projects &&
    new Set(c.members.map((m) => m.id)).size === c.members.length &&
    new Set(c.projects.map((p) => p.id)).size === c.projects.length
  );
}
type StudioValue = Content & {
  save: (content: Content) => Promise<boolean>;
  reload: () => Promise<void>;
  storageError: string;
};
const StudioContext = createContext<StudioValue>({
  ...initialContent,
  save: async () => false,
  reload: async () => {},
  storageError: "",
});
export function StudioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(initialContent);
  const [revision, setRevision] = useState(1);
  const [storageError, setStorageError] = useState("");
  const reload = async () => {
    const result = await apiRequest<{ content: Content; revision: number }>(
      "/api/content",
    );
    if (!validateContent(result.content))
      throw new Error("اطلاعات سرور معتبر نیست.");
    setContent(result.content);
    setRevision(result.revision);
  };
  useEffect(() => {
    void reload().catch(() => {
      /* Static previews retain the public seed. Writes still require the API. */
    });
  }, []);
  const save = async (next: Content) => {
    if (!validateContent(next)) {
      setStorageError("اطلاعات معتبر نیست.");
      return false;
    }
    try {
      const result = await apiRequest<{ content: Content; revision: number }>(
        "/api/admin/content",
        {
          method: "PUT",
          headers: { "If-Match": String(revision) },
          body: JSON.stringify(next),
        },
      );
      setContent(result.content);
      setRevision(result.revision);
      setStorageError("");
      return true;
    } catch (error) {
      setStorageError(
        error instanceof Error ? error.message : "ذخیره روی سرور انجام نشد.",
      );
      return false;
    }
  };
  return (
    <StudioContext.Provider value={{ ...content, save, reload, storageError }}>
      {children}
    </StudioContext.Provider>
  );
}
export const useStudio = () => useContext(StudioContext);
