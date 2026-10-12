export type Language = "fa" | "en";
export const phrase = (lang: Language, fa: string, en: string) =>
  lang === "fa" ? fa : en;
export const projects = [
  {
    id: "learning-ecosystem",
    number: "01",
    title: ["پلتفرم جامع آموزش و مدارس", "Unified School Platform"],
    category: ["سامانه تحت وب و موبایل", "Web & Mobile Platform"],
    description: [
      "سامانه متمرکز برای مدیریت آموزش و مدارس، همراه با اپلیکیشن موبایل دانش‌آموزان و اولیا با دسترسی‌های چندسطحی.",
      "A centralized platform for school management and mobile companion app for students and parents with role-based access.",
    ],
    stack: ["React", "React Native", "Django", "PostgreSQL"],
    visual: "school",
    color: "sage",
    features: [
      "مدیریت چندسطحی نقش‌ها و کاربران",
      "مسیر ارزیابی و گزارش‌های پیشرفت",
      "اپلیکیشن موبایل اولیا و دانش‌آموزان",
      "داشبورد تحلیلی و کارنامه تحصیلی",
    ],
    enFeatures: [
      "Multi-level role and user management",
      "Progress tracking and evaluation paths",
      "Mobile companion app for parents & students",
      "Analytical dashboards and grade reports",
    ],
  },
  {
    id: "intelligent-assistant",
    number: "02",
    title: ["دستیار هوشمند سازمانی", "Enterprise AI Assistant"],
    category: ["سیستم‌های هوشمند و RAG", "Intelligent Systems & RAG"],
    description: [
      "دستیار خودکار مبتنی بر داده‌های سازمان برای پاسخ‌گویی به استعلامات و تسریع عملیات روزمره با تفکیک داده.",
      "An automated assistant grounded in organizational data to answer queries and streamline daily workflows with data isolation.",
    ],
    stack: ["Python", "AI / LLM", "Redis"],
    visual: "ai",
    color: "peach",
    features: [
      "جستجو و پاسخ‌گویی مبتنی بر اسناد (RAG)",
      "پاسخ‌دهی دقیق متناسب با زمینه سوال",
      "تفکیک و کنترل سطوح دسترسی به داده‌ها",
      "سیستم ارزیابی کیفیت و دقت پاسخ‌ها",
    ],
    enFeatures: [
      "Document-grounded retrieval & QA (RAG)",
      "Context-aware response generation",
      "Strict data isolation and role boundaries",
      "Quality evaluation and audit logging",
    ],
  },
  {
    id: "business-infrastructure",
    number: "03",
    title: ["سامانه عملیات کسب‌وکار", "Business Operations System"],
    category: ["نرم‌افزار جامع سازمانی", "Enterprise Software"],
    description: [
      "اتوماسیون فرایندهای سازمانی، پردازش سفارش‌ها و مدیریت انبار در قالب یک پنل یکپارچه و مقیاس‌پذیر.",
      "Automating operational workflows, order processing and inventory within a scalable, unified dashboard.",
    ],
    stack: ["TypeScript", "Docker", "DRF"],
    visual: "business",
    color: "lavender",
    features: [
      "داشبورد متمرکز عملیات و گزارش‌گیری",
      "اتوماسیون گردش کار و مدیریت وضعیت",
      "معماری سرویس‌محور و APIهای استاندارد",
      "پایش لاگ‌ها و سلامت تراکنش‌ها",
    ],
    enFeatures: [
      "Centralized operations & reporting dashboard",
      "Workflow automation and status management",
      "API-first, service-oriented architecture",
      "Transaction logs and system health tracking",
    ],
  },
] as const;
export const specialties = [
  {
    role: ["فرانت‌اند و موبایل", "Frontend & mobile"],
    initial: "FE",
    skills: ["React", "React Native", "TypeScript", "Design systems"],
    bio: [
      "توسعه رابط‌های کاربری وب و اپلیکیشن‌های موبایل با رعایت اصول معماری کامپوننت، سرعت بالا و دسترسی‌پذیری.",
      "Building web interfaces and mobile applications with clean component architecture, high performance and accessibility.",
    ],
    contribution: [
      "معماری وب و اپلیکیشن‌های موبایل",
      "Web architecture and mobile applications",
    ],
  },
  {
    role: ["مهندسی بک‌اند", "Backend engineering"],
    initial: "BE",
    skills: ["Django", "PostgreSQL", "API design"],
    bio: [
      "طراحی سرویس‌های پایدار، مدل‌سازی بهینه داده‌های رابطه‌ای و پیاده‌سازی APIهای امن و مقیاس‌پذیر.",
      "Architecting reliable services, optimizing relational data models and building secure, scalable APIs.",
    ],
    contribution: ["طراحی سرویس‌ها و معماری داده", "Data architecture and backend services"],
  },
  {
    role: ["طراحی محصول و هوش مصنوعی", "Product design & AI"],
    initial: "AI",
    skills: ["UX research", "Python", "LLM"],
    bio: [
      "پیاده‌سازی راهکارهای هوش مصنوعی کاربردی و تحلیل جریان‌های کاری برای بهبود ملموس بهره‌وری سیستم.",
      "Implementing applied AI solutions and analyzing workflows to deliver measurable productivity gains.",
    ],
    contribution: [
      "طراحی تجربه کاربر و پایپ‌لاین‌های هوش مصنوعی",
      "Experience design and applied AI pipelines",
    ],
  },
];
export const technologies = [
  {
    id: "interface",
    label: ["وب و موبایل", "Web & Mobile"],
    names: ["React", "React Native", "TypeScript", "Tailwind CSS"],
    title: [
      "رابط‌های وب و اپلیکیشن‌های موبایل",
      "Web interfaces & mobile applications",
    ],
    text: [
      "طراحی و توسعه رابط‌های کاربری وب و اپلیکیشن‌های موبایل (iOS و Android)؛ با تمرکز بر سرعت، استانداردهای طراحی و تجربه روان کاربر.",
      "Engineering responsive web interfaces and mobile applications (iOS & Android), built for performance, design standards and fluid user experiences.",
    ],
    code: [
      "interface AppConfig {",
      '  platforms: ["web", "ios", "android"];',
      '  theme: "system" | "dark" | "light";',
      '  direction: "rtl" | "ltr";',
      "  responsive: true;",
      "};",
    ],
  },
  {
    id: "backend",
    label: ["معماری و داده", "Architecture"],
    names: ["Django", "Django REST Framework", "PostgreSQL", "Redis"],
    title: [
      "معماری سرویس‌گرا و داده‌های ساختاریافته",
      "Service architecture & structured data",
    ],
    text: [
      "طراحی پایگاه‌های داده رابطه‌ای، کشینگ چندلایه و APIهای ماژولار برای سامانه‌هایی که همگام با ترافیک و نیاز کسب‌وکار مقیاس می‌شوند.",
      "Relational database design, multi-layer caching and modular APIs engineered to scale reliably with growing demand.",
    ],
    code: [
      "class ServiceConfig:",
      "    database = PostgreSQL(pool_size=20)",
      "    cache = Redis(ttl=3600)",
      "    api = RestFramework()",
      '    scaling = "horizontal"',
    ],
  },
  {
    id: "intelligence",
    label: ["هوش مصنوعی", "Intelligence"],
    names: ["Python", "LLM", "AI Technologies"],
    title: [
      "هوش مصنوعی کاربردی و بازیابی دانش",
      "Applied AI & knowledge retrieval",
    ],
    text: [
      "استفاده هدفمند از مدل‌های زبانی و پایپ‌لاین‌های RAG برای جستجوی دقیق در اسناد سازمانی با رعایت امنیت و تفکیک داده‌ها.",
      "Targeted integration of language models and RAG pipelines for precise document queries with enterprise-grade data isolation.",
    ],
    code: [
      "rag_pipeline = KnowledgeEngine(",
      "    vector_store=PgVector(),",
      '    embedding="text-embedding",',
      "    chunk_size=512,",
      "    top_k=4",
      ")",
    ],
  },
  {
    id: "cloud",
    label: ["زیرساخت و استقرار", "Infrastructure"],
    names: ["Docker", "Cloud Infrastructure", "CI / CD"],
    title: [
      "زیرساخت ابری، کانتینرسازی و استقرار مداوم",
      "Cloud infrastructure, containers & CI/CD",
    ],
    text: [
      "کانتینرسازی استاندارد با Docker، اتوماسیون تست و انتشار، و پایش پیوسته وضعیت سرورها برای حفظ حداکثر دسترس‌پذیری.",
      "Standard containerization with Docker, automated test/deploy workflows and health monitoring for maximum service uptime.",
    ],
    code: [
      "services:",
      "  application:",
      "    image: rayban/app:latest",
      "    restart: unless-stopped",
      "    healthcheck: { interval: 30s }",
    ],
  },
];
