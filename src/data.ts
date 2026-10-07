export type Language = "fa" | "en";
export const phrase = (lang: Language, fa: string, en: string) =>
  lang === "fa" ? fa : en;
export const projects = [
  {
    id: "learning-ecosystem",
    number: "01",
    title: ["اکوسیستم یکپارچه آموزش", "Connected learning ecosystem"],
    category: ["پلتفرم آموزشی", "Education platform"],
    description: [
      "یک تجربه پیوسته برای مدیران، معلمان، دانش‌آموزان و خانواده‌ها؛ با یادگیری در مرکز همه‌چیز.",
      "A continuous experience for school leaders, teachers, students and families. Learning at the center of it all.",
    ],
    stack: ["React", "Django", "PostgreSQL"],
    visual: "school",
    color: "sage",
    features: [
      "مدیریت مدرسه و نقش‌ها",
      "مسیر یادگیری شخصی",
      "ارتباط معلم و خانواده",
      "گزارش‌های قابل فهم",
    ],
    enFeatures: [
      "School and role management",
      "Personal learning paths",
      "Teacher–family communication",
      "Meaningful reporting",
    ],
  },
  {
    id: "intelligent-assistant",
    number: "02",
    title: ["هوش مصنوعی، کنار انسان", "Intelligence alongside people"],
    category: ["سیستم‌های هوشمند", "Intelligent systems"],
    description: [
      "یک همراه هوشمند برای کشف، پرسیدن و یادگیری؛ با طراحی مسئولانه و تمرکز بر نیاز انسان.",
      "An intelligent companion for discovery, questions and learning, thoughtfully designed around people.",
    ],
    stack: ["Python", "AI / LLM", "Redis"],
    visual: "ai",
    color: "peach",
    features: [
      "گفت‌وگوی متنی",
      "پاسخ مبتنی بر زمینه",
      "دسترسی متناسب با نقش",
      "بازخورد و ارزیابی",
    ],
    enFeatures: [
      "Conversational interface",
      "Context-aware answers",
      "Role-based access",
      "Feedback and evaluation",
    ],
  },
  {
    id: "business-infrastructure",
    number: "03",
    title: ["زیرساختی برای رشد", "Infrastructure for growth"],
    category: ["نرم‌افزار کسب‌وکار", "Business software"],
    description: [
      "تبدیل فرایندهای پیچیده به ابزارهای روشن و قابل اعتماد؛ از اولین تعامل تا عملیات روزمره.",
      "Turning complex processes into clear, dependable tools, from the first interaction to everyday operations.",
    ],
    stack: ["TypeScript", "Docker", "DRF"],
    visual: "business",
    color: "lavender",
    features: [
      "داشبورد عملیاتی",
      "فرایندهای قابل توسعه",
      "رابط برنامه‌نویسی",
      "استقرار و پایش",
    ],
    enFeatures: [
      "Operational dashboard",
      "Extensible workflows",
      "API-first architecture",
      "Deployment and monitoring",
    ],
  },
] as const;
export const specialties = [
  {
    role: ["مهندسی فرانت‌اند", "Frontend engineering"],
    initial: "FE",
    skills: ["React", "TypeScript", "Design systems"],
    bio: [
      "ساخت رابط‌هایی که پیچیدگی را ساده می‌کنند؛ با توجه به جزئیات، دسترس‌پذیری و تجربه کاربر.",
      "Interfaces that make complexity simple, with care for detail, accessibility and user experience.",
    ],
    contribution: [
      "تجربه کاربری و رابط محصول",
      "Product interfaces and user experience",
    ],
  },
  {
    role: ["مهندسی بک‌اند", "Backend engineering"],
    initial: "BE",
    skills: ["Django", "PostgreSQL", "API design"],
    bio: [
      "طراحی هسته‌های قابل اعتماد و توسعه‌پذیر؛ از مدل‌سازی داده تا منطق کسب‌وکار.",
      "Dependable, extensible foundations, from data modeling to business logic.",
    ],
    contribution: ["معماری داده و سرویس‌ها", "Data architecture and services"],
  },
  {
    role: ["طراحی محصول و هوش مصنوعی", "Product design & AI"],
    initial: "AI",
    skills: ["UX research", "Python", "LLM"],
    bio: [
      "پیوند نیاز انسان و توان فناوری؛ برای تجربه‌هایی هوشمند، روشن و هدفمند.",
      "Connecting human needs with technology through intelligent, clear and purposeful experiences.",
    ],
    contribution: [
      "طراحی تجربه و سیستم‌های هوشمند",
      "Experience design and intelligent systems",
    ],
  },
];
export const technologies = [
  {
    id: "interface",
    label: ["تجربه و رابط", "Interface"],
    names: ["React", "TypeScript", "Tailwind CSS"],
    title: [
      "پیچیدگی در پشت صحنه. سادگی در تجربه.",
      "Complex behind the scenes. Simple in your hands.",
    ],
    text: [
      "رابط‌هایی منسجم، سریع و دسترس‌پذیر که در هر صفحه و هر دستگاه، حس یک محصول واحد را منتقل می‌کنند.",
      "Consistent, fast and accessible interfaces that feel like one coherent product on every screen.",
    ],
    code: [
      "const experience = {",
      '  human: "at the center",',
      '  interface: "thoughtful",',
      '  performance: "by design"',
      "};",
    ],
  },
  {
    id: "backend",
    label: ["معماری و داده", "Architecture"],
    names: ["Django", "Django REST Framework", "PostgreSQL", "Redis"],
    title: [
      "یک پایه محکم برای ایده‌های بزرگ.",
      "A solid foundation for ambitious ideas.",
    ],
    text: [
      "معماری ماژولار، داده‌های ساختاریافته و رابط‌های مشخص؛ برای سیستم‌هایی که همراه نیازهای شما رشد می‌کنند.",
      "Modular architecture, structured data and clear APIs for systems that grow with your needs.",
    ],
    code: [
      "class ConnectedSystem:",
      "    database = PostgreSQL()",
      "    cache = Redis()",
      "    api = RestFramework()",
      '    purpose = "built to grow"',
    ],
  },
  {
    id: "intelligence",
    label: ["هوش مصنوعی", "Intelligence"],
    names: ["Python", "LLM", "AI Technologies"],
    title: ["هوشمندتر، با حفظ نقش انسان.", "Smarter, with people in control."],
    text: [
      "هوش مصنوعی زمانی ارزشمند است که به پرسش درست پاسخ بدهد. ابزارهای هدفمند، ارزیابی‌پذیر و متناسب با زمینه محصول.",
      "AI is valuable when it answers the right question. Purposeful, evaluable tools grounded in the product context.",
    ],
    code: [
      "intelligence.connect({",
      "  context: learning,",
      "  guidance: human,",
      "  evaluation: continuous",
      "});",
    ],
  },
  {
    id: "cloud",
    label: ["زیرساخت و استقرار", "Infrastructure"],
    names: ["Docker", "Cloud Infrastructure", "CI / CD"],
    title: [
      "از محیط توسعه تا دنیای واقعی.",
      "From development to the real world.",
    ],
    text: [
      "استقرار قابل تکرار، پایش و نگهداری؛ چون کیفیت یک محصول با انتشار اولین نسخه تمام نمی‌شود.",
      "Repeatable deployment, monitoring and maintenance. Product quality continues long after the first release.",
    ],
    code: [
      "services:",
      "  application: scalable",
      "  deployment: reproducible",
      "  monitoring: continuous",
      "  maintenance: ongoing",
    ],
  },
];
