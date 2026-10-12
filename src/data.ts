export type Language = "fa" | "en";
export const phrase = (lang: Language, fa: string, en: string) =>
  lang === "fa" ? fa : en;
export const projects = [
  {
    id: "learning-ecosystem",
    number: "01",
    title: ["پلتفرم جامع آموزش و مدارس", "Unified School Platform"],
    category: ["سامانه تحت وب", "Web Platform"],
    description: [
      "سامانه متمرکز برای مدیریت آموزش، مدارس و پیگیری پیشرفت تحصیلی دانش‌آموزان با دسترسی‌های چندسطحی.",
      "A centralized platform for school management, learning workflows and student progress tracking with role-based access.",
    ],
    stack: ["React", "Django", "PostgreSQL"],
    visual: "school",
    color: "sage",
    features: [
      "مدیریت چندسطحی نقش‌ها و کاربران",
      "مسیر ارزیابی و گزارش‌های پیشرفت",
      "ارتباط هدفمند معلمان با اولیا",
      "داشبورد تحلیلی و کارنامه تحصیلی",
    ],
    enFeatures: [
      "Multi-level role and user management",
      "Progress tracking and evaluation paths",
      "Structured teacher-family communication",
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
    role: ["مهندسی فرانت‌اند", "Frontend engineering"],
    initial: "FE",
    skills: ["React", "TypeScript", "Design systems"],
    bio: [
      "توسعه رابط‌های کاربری سریع، واکنش‌گرا و دسترس‌پذیر با رعایت اصول معماری کامپوننت و عملکرد بهینه.",
      "Building fast, responsive and accessible user interfaces with clean component architecture and optimized performance.",
    ],
    contribution: [
      "معماری فرانت‌اند و سیستم‌های طراحی",
      "Frontend architecture and design systems",
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
    label: ["تجربه و رابط", "Interface"],
    names: ["React", "TypeScript", "Tailwind CSS"],
    title: [
      "رابط‌های کاربری سریع و دسترس‌پذیر",
      "Fast, accessible user interfaces",
    ],
    text: [
      "پیاده‌سازی رابط‌های یکپارچه و بهینه‌شده برای انواع نمایشگرها؛ با تمرکز بر سرعت بارگذاری، استانداردهای سئو و تجربه روان کاربر.",
      "Consistent, fast and responsive interfaces built for every screen, focused on loading speed, SEO standards and seamless UX.",
    ],
    code: [
      "interface UIConfig {",
      '  theme: "system" | "dark" | "light";',
      '  direction: "rtl" | "ltr";',
      "  responsive: true;",
      "  performance: 100;",
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
