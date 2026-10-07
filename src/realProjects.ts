import type { Content, Project } from "./studio";

export const realProjects: Project[] = [
  {
    id: "raein",
    number: "01",
    title: ["رائین", "Raein"],
    category: ["پلتفرم یکپارچه مدرسه", "School platform"],
    description: [
      "یک فضای متصل برای مدرسه؛ مدیریت آموزش، حضور و غیاب، تکالیف و ارتباط خانواده‌ها، همراه با ابزارهای هوش مصنوعی.",
      "A connected school workspace for learning, attendance, assignments and family communication, with AI tools.",
    ],
    stack: ["React", "TypeScript", "Django", "PostgreSQL", "AI / RAG"],
    visual: "school",
    color: "#9f8bff",
    status: "پروژه واقعی",
    demo: false,
    features: [
      "فضاهای اختصاصی مدیر، معلم، دانش‌آموز و والدین",
      "مدیریت تکالیف، نمرات و حضور و غیاب",
      "گفت‌وگوی مدرسه و کلاس آنلاین",
      "بازیابی دانش با هوش مصنوعی و تفکیک داده مدارس",
    ],
    enFeatures: [
      "Role-based workspaces for staff, teachers, students and parents",
      "Assignments, grades and attendance",
      "School chat and online classes",
      "AI knowledge retrieval with school-scoped data",
    ],
    problem:
      "ابزارهای جداگانه برای آموزش، امور مدرسه و ارتباط با خانواده‌ها، پیگیری اطلاعات را دشوار می‌کنند.",
    enProblem:
      "Separate tools for teaching, school administration and family communication make information harder to follow.",
    solution:
      "رائین فرایندهای روزمره مدرسه را در فضای مشترکی با دسترسی متناسب با نقش هر کاربر جمع می‌کند.",
    enSolution:
      "Raein brings everyday school workflows into a shared workspace, with access tailored to each user's role.",
    architecture:
      "React / TypeScript → Django REST / WebSocket → PostgreSQL / pgvector / Redis",
    achievements:
      "پیاده‌سازی فضاهای کاری نقش‌محور\nیکپارچه‌سازی آموزش و ارتباطات مدرسه\nزیرساخت بازیابی دانش با هوش مصنوعی",
    enAchievements:
      "Role-based workspaces\nConnected learning and school communication\nAI knowledge retrieval infrastructure",
    timeline: "",
    image: "",
    contributors: {},
  },
  {
    id: "bokhar",
    number: "02",
    title: ["بخار", "Bokhar"],
    category: ["خدمات و تجارت الکترونیک", "Services & e-commerce"],
    description: [
      "پلتفرم خدمات خشکشویی و فروش آنلاین؛ از انتخاب خدمات و ثبت سفارش تا زمان‌بندی دریافت و تحویل، پرداخت و مدیریت عملیات.",
      "A laundry and e-commerce platform connecting service selection, ordering, pickup and delivery scheduling, payments and operations.",
    ],
    stack: ["React", "Django REST", "PostgreSQL", "Redis", "Celery"],
    visual: "business",
    color: "#77cde1",
    status: "پروژه واقعی",
    demo: false,
    features: [
      "کاتالوگ خدمات و محصولات و سبد خرید",
      "ثبت و پیگیری سفارش و مدیریت آدرس‌ها",
      "زمان‌بندی دریافت و تحویل سفارش",
      "کیف پول، تخفیف و ابزارهای مدیریت فروش",
    ],
    enFeatures: [
      "Service and product catalog with a shopping cart",
      "Order tracking and address management",
      "Pickup and delivery scheduling",
      "Wallet, discounts and seller operations",
    ],
    problem:
      "سفارش خدمات، هماهنگی دریافت و تحویل و مدیریت فروش به فرایندی متصل و قابل پیگیری نیاز دارد.",
    enProblem:
      "Service ordering, pickup and delivery coordination, and sales operations need a connected, traceable workflow.",
    solution:
      "بخار مسیر مشتری و عملیات کسب‌وکار را از انتخاب خدمات تا مدیریت سفارش و پرداخت به هم متصل می‌کند.",
    enSolution:
      "Bokhar connects the customer journey and business operations from service selection through order management and payment.",
    architecture: "React → Django REST → PostgreSQL / Redis / Celery",
    achievements:
      "اتصال سفارش و زمان‌بندی خدمات\nمدیریت محصولات، قیمت‌گذاری و تخفیف‌ها\nفضاهای مشتری، فروشنده و مدیریت",
    enAchievements:
      "Connected orders and service scheduling\nProducts, pricing and discount management\nCustomer, seller and administration workspaces",
    timeline: "",
    image: "",
    contributors: {},
  },
];

// Add new seed projects once, without replacing the user's existing edits.
export function mergeRealProjects(content: Content): Content {
  const missing = realProjects.filter(
    (p) => !content.projects.some((saved) => saved.id === p.id),
  );
  const available = Math.max(0, 100 - content.projects.length);
  const members = content.members.map((member) =>
    member.id === "ali-hashemi"
      ? {
          ...member,
          github: member.github || "https://github.com/alihashemi8",
          linkedin:
            member.linkedin || "https://www.linkedin.com/in/alihashemi8/",
        }
      : member,
  );
  return {
    ...content,
    members,
    projects: [...missing.slice(0, available), ...content.projects],
  };
}
