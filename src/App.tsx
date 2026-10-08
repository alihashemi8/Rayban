import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import {
  ArrowUpLeft,
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Layers,
  Code2,
  Network,
  Sparkles,
  Plus,
  Check,
  ChevronLeft,
} from "lucide-react";
import type { Language } from "./data";
import { phrase, technologies } from "./data";
import ProjectVisual from "./components/ProjectVisual";
import Header from "./components/Header";
import type { Theme } from "./components/Header";
import AmbientBackground from "./components/AmbientBackground";
import ContactPage from "./pages/ContactPage";
import TeamSection, { MemberPage } from "./components/TeamSection";
import { ProjectCollection } from "./components/CardRail";
const AdminPage = lazy(() => import("./pages/AdminPage"));
import { StudioProvider, useStudio, contributorRoles } from "./studio";

const KnowledgeScene = lazy(() => import("./components/KnowledgeScene"));

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="tiny-square" />
      <span>{children}</span>
      <span className="label-number" dir="ltr">
        / {number}
      </span>
    </div>
  );
}
function Scene({ lang, theme }: { lang: Language; theme: Theme }) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setReady(true), 1600);
    return () => window.clearTimeout(timer);
  }, [reduced]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    const el = document.querySelector(".knowledge-scene");
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div
      className={`knowledge-scene${ready && visible && canvasReady ? " scene-live" : ""}`}
      aria-label={phrase(
        lang,
        "هسته سه‌بعدی هوش مصنوعی رایبان",
        "Rayban three-dimensional intelligence core",
      )}
    >
      <div className="scene-grid" />
      <div className="scene-kicker" dir="ltr">
        <span className="signal-dot" />
        RAYBAN INTELLIGENCE CORE<span>01 / ∞</span>
      </div>
      <div className="scene-canvas">
        {ready && visible ? (
          <Suspense
            fallback={
              <div className="neural-still">
                <div className="neural-shell" />
                <div className="neural-ring ring-a" />
                <div className="neural-ring ring-b" />
                <div className="neural-ring ring-c" />
              </div>
            }
          >
            <KnowledgeScene reduced={!!reduced} theme={theme} onReady={() => setCanvasReady(true)} />
          </Suspense>
        ) : (
          <div className="neural-still">
            <div className="neural-shell" />
            <div className="neural-ring ring-a" />
            <div className="neural-ring ring-b" />
            <div className="neural-ring ring-c" />
          </div>
        )}
      </div>
      <div className="core-emblem">
        <img src="/rayban-logo.svg" alt="" width="140" height="140" />
        <span>RAYBAN / CORE</span>
      </div>
      <div className="floating-code" dir="ltr">
        <div>
          <i />
          <i />
          <i />
          <span>intelligence.ts</span>
        </div>
        <code>
          <em>const</em> future = <b>await</b>
          <br />
          rayban.<strong>build</strong>({"{"}
          <br />
          &nbsp; ideas: <span>∞</span>,<br />
          &nbsp; intelligence: <span>true</span>
          <br />
          {"}"});
        </code>
        <small>
          <span /> FROM POSSIBILITY TO PRODUCT
        </small>
      </div>
      <div className="floating-insight" dir="ltr">
        <Sparkles size={16} />
        <div>
          <small>NEURAL ENGINE</small>
          <strong>Ideas. Connected.</strong>
        </div>
        <div className="insight-bars">
          {[12, 24, 18, 32, 23, 36, 28, 20].map((h, i) => (
            <i key={i} style={{ height: h }} />
          ))}
        </div>
      </div>
      <span className="node-label node-one">
        <span />
        {phrase(lang, "مهندسی نرم‌افزار", "Software engineering")}
        <small>&lt;/&gt;</small>
      </span>
      <span className="node-label node-two">
        <span />
        {phrase(lang, "هوش مصنوعی", "Artificial intelligence")}
        <small>AI</small>
      </span>
      <div className="ai-label">
        <Sparkles size={12} />
        {phrase(
          lang,
          "از ایده تا یک دنیای هوشمندتر",
          "From an idea to a more intelligent world",
        )}
      </div>
      <div className="scene-bottom">
        <span dir="ltr">HUMAN VISION × MACHINE INTELLIGENCE</span>
        <Network size={16} />
      </div>
    </div>
  );
}
function Hero({ lang, theme }: { lang: Language; theme: Theme }) {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="signal-dot" />
          {phrase(
            lang,
            "استودیوی نرم‌افزار و هوش مصنوعی",
            "SOFTWARE & ARTIFICIAL INTELLIGENCE STUDIO",
          )}
        </div>
        <h1>
          {phrase(lang, "ایده‌های جسورانه.", "Bold ideas.")}
          <br />
          <span>
            {phrase(lang, "سیستم‌های هوشمند.", "Intelligent systems.")}
          </span>
        </h1>
        <p className="hero-description">
          {phrase(
            lang,
            "ما رایبان هستیم. جایی که مهندسی نرم‌افزار، طراحی و هوش مصنوعی کنار هم قرار می‌گیرند تا ایده شما به یک تجربه دیجیتال ماندگار تبدیل شود.",
            "We are Rayban. Where software engineering, design and artificial intelligence come together to turn your idea into a lasting digital experience.",
          )}
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button button-dark">
            {phrase(lang, "کاوش در پروژه‌ها", "Explore our work")}
            <ArrowUpLeft size={19} />
          </a>
          <a href="/contact" className="text-link">
            {phrase(lang, "ایده‌ای در ذهن دارید؟", "Have an idea?")}
            <ArrowUpLeft size={17} />
          </a>
        </div>
        <div className="hero-footnote">
          <div className="mini-symbols">
            <Code2 />
            <Layers />
            <Sparkles />
          </div>
          <span>
            {phrase(
              lang,
              "تفکر انسانی. مهندسی دقیق. تأثیر ماندگار.",
              "Human thinking. Precise engineering. Lasting impact.",
            )}
          </span>
        </div>
      </div>
      <Scene lang={lang} theme={theme} />
      <span className="hero-watermark" aria-hidden="true" dir="ltr">
        BEYOND THE CODE.
      </span>
      <div className="hero-bottom">
        <a href="#projects">
          <ArrowDown size={15} />
          {phrase(lang, "برای کشف بیشتر، پایین بروید", "Scroll to discover")}
        </a>
        <span dir="ltr">INDEPENDENT MINDS. CONNECTED VISION.</span>
        <span>
          {phrase(
            lang,
            "ساخته‌شده با فکر، در ایران",
            "Thoughtfully built in Iran",
          )}
          <span className="tiny-square" />
        </span>
      </div>
    </section>
  );
}
function FocusStrip({ lang }: { lang: Language }) {
  return (
    <div className="focus-strip">
      <div className="wrap">
        <span>
          {phrase(lang, "جهان‌هایی که می‌سازیم", "THE WORLDS WE BUILD")}
        </span>
        {[
          ["آموزش هوشمند", "Intelligent education"],
          ["هوش مصنوعی", "Artificial intelligence"],
          ["نرم‌افزار کسب‌وکار", "Business software"],
          ["تجربه‌های دیجیتال", "Digital experiences"],
        ].map(([fa, en], i) => (
          <div key={en}>
            {
              [
                <Network key="1" />,
                <Sparkles key="2" />,
                <Layers key="3" />,
                <Code2 key="4" />,
              ][i]
            }
            {phrase(lang, fa, en)}
          </div>
        ))}
      </div>
    </div>
  );
}
function Projects({ lang, full = false }: { lang: Language; full?: boolean }) {
  const { projects } = useStudio();
  const [filter, setFilter] = useState("all");
  const Heading = full ? "h1" : "h2";
  const CardHeading = full ? "h2" : "h3";
  const shown =
    filter === "all" ? projects : projects.filter((p) => p.visual === filter);
  return (
    <section
      id="projects"
      className={`section wrap${full ? " project-catalog" : ""}`}
    >
      <Reveal>
        <SectionLabel number="01">
          {phrase(
            lang,
            full ? "همه پروژه‌ها" : "منتخب پروژه‌ها",
            full ? "PROJECT DIRECTORY" : "SELECTED WORK",
          )}
        </SectionLabel>
        <div className="section-heading">
          <Heading>
            {phrase(
              lang,
              full ? "از ایده تا اجرا،" : "ایده‌هایی که",
              full ? "From idea to build," : "Ideas taking",
            )}
            <br />
            <span>
              {phrase(
                lang,
                full ? "پروژه‌های رایبان." : "شکل می‌گیرند.",
                full ? "work by Rayban." : "shape.",
              )}
            </span>
          </Heading>
          <div>
            <p>
              {phrase(
                lang,
                "هر پروژه، پاسخی به یک مسئله واقعی. با نگاهی فراتر از کد و توجه به انسان‌هایی که از آن استفاده می‌کنند.",
                "Every project begins with a real problem. We look beyond the code to the people who will use it.",
              )}
            </p>
            <span className="sample-note">
              {phrase(
                lang,
                "رائین و بخار، پروژه‌های واقعی ما؛ کارت‌های «طرح مفهومی» برای نمایش ایده‌ها هستند.",
                "Raein and Bokhar are real projects. Cards marked “Concept study” are design explorations.",
              )}
            </span>
          </div>
        </div>
        <div className="portfolio-toolbar">
          <div
            className="filters"
            role="group"
            aria-label={phrase(lang, "فیلتر پروژه‌ها", "Project filters")}
          >
            {[
              ["all", "همه پروژه‌ها", "All work"],
              ["school", "آموزش", "Education"],
              ["ai", "هوش مصنوعی", "AI"],
              ["business", "کسب‌وکار", "Business"],
            ].map(([id, fa, en]) => (
              <button
                key={id}
                aria-pressed={filter === id}
                className={filter === id ? "active" : ""}
                onClick={() => setFilter(id)}
              >
                {phrase(lang, fa, en)}
                {id === "all" && (
                  <span>{String(projects.length).padStart(2, "0")}</span>
                )}
              </button>
            ))}
          </div>
          {!full ? (
            <Link className="show-all button" to="/projects">
              {phrase(lang, "نمایش همه", "View all projects")}
              <ArrowUpLeft size={17} />
            </Link>
          ) : (
            <span className="mono small" dir="ltr">
              {shown.length} PROJECTS
            </span>
          )}
        </div>
      </Reveal>
      <ProjectCollection full={full} lang={lang}>
        {shown.length === 0 && (
          <div className="empty-state">
            {phrase(
              lang,
              "پروژه‌ای در این دسته وجود ندارد.",
              "No projects in this category.",
            )}
          </div>
        )}
        {shown.map((project) => (
          <Reveal key={project.id}>
            <Link className="project-card" to={`/projects/${project.id}`}>
              <div className="project-cover">
                {project.image ? (
                  <img
                    className="uploaded-cover"
                    src={project.image}
                    alt={project.title[lang === "fa" ? 0 : 1]}
                    loading="lazy"
                  />
                ) : (
                  <ProjectVisual
                    type={project.visual}
                    lang={lang}
                    title={project.title[lang === "fa" ? 0 : 1]}
                  />
                )}
                <span className="project-status">
                  <span />
                  {project.demo
                    ? phrase(lang, "طرح مفهومی", "Concept study")
                    : project.status === "پروژه واقعی"
                      ? phrase(lang, "پروژه واقعی", "Real project")
                      : project.status}
                </span>
                {!project.image && (
                  <span className="art-caption">
                    {phrase(lang, "نمای مفهومی رابط", "UI illustration")}
                  </span>
                )}
                <span className="project-open">
                  <ArrowUpLeft size={23} />
                </span>
              </div>
              <div className="project-meta">
                <span>{project.category[lang === "fa" ? 0 : 1]}</span>
                <span className="mono">/{project.number}</span>
              </div>
              <CardHeading>{project.title[lang === "fa" ? 0 : 1]}</CardHeading>
              <p>{project.description[lang === "fa" ? 0 : 1]}</p>
              <div className="tag-list" dir="ltr">
                {project.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </ProjectCollection>
    </section>
  );
}
function About({ lang }: { lang: Language }) {
  return (
    <section id="about" className="about-section">
      <div className="wrap">
        <Reveal>
          <SectionLabel number="02">
            {phrase(lang, "فلسفه ما", "OUR PHILOSOPHY")}
          </SectionLabel>
          <div className="about-layout">
            <div>
              <h2>
                {phrase(lang, "از نیاز واقعی،", "Real needs.")}
                <br />
                {phrase(lang, "تا نرم‌افزاری", "Thoughtful software.")}
                <br />
                <span>{phrase(lang, "که کار می‌کند.", "Built to work.")}</span>
              </h2>
              <div className="about-signature">
                <img
                  className="brand-logo"
                  src="/raiban-logo.webp"
                  alt=""
                  width="32"
                  height="32"
                />
                <span dir="ltr">
                  Ray<span>ban</span> / ENGINEERING TOMORROW
                </span>
              </div>
            </div>
            <div className="about-body">
              <p className="large-body">
                {phrase(
                  lang,
                  "قبل از نوشتن کد، مشخص می‌کنیم چه مسئله‌ای باید حل شود و کاربر دقیقاً به چه چیزی نیاز دارد. بعد، تجربه کاربری و معماری نرم‌افزار را با هم طراحی می‌کنیم.",
                  "Before writing code, we clarify the problem and what users need. Then we design the user experience and software architecture together.",
                )}
              </p>
              <p>
                {phrase(
                  lang,
                  "راه‌حل را مرحله‌به‌مرحله می‌سازیم، مسیرهای اصلی را بررسی می‌کنیم و با بازخورد بهترش می‌کنیم. هوش مصنوعی را هم جایی به کار می‌گیریم که واقعاً کاری را ساده‌تر یا دقیق‌تر کند.",
                  "We build in stages, check the core workflows and improve with feedback. We use AI where it can make a task simpler or more accurate.",
                )}
              </p>
              <div className="values">
                {[
                  [
                    "شناخت دقیق نیاز",
                    "Understand the need",
                    "مسئله و اولویت‌های کاربر را روشن می‌کنیم.",
                    "Clarify the problem and user priorities.",
                  ],
                  [
                    "طراحی قابل استفاده",
                    "Design for use",
                    "مسیرهای ساده و روشن برای کارهای مهم می‌سازیم.",
                    "Make the important workflows clear and simple.",
                  ],
                  [
                    "توسعه و بهبود پیوسته",
                    "Build and improve",
                    "با ارزیابی و بازخورد، قدم بعدی را انتخاب می‌کنیم.",
                    "Use evaluation and feedback to guide the next step.",
                  ],
                ].map(([fa, en, detail, enDetail]) => (
                  <div key={en}>
                    <Check size={19} aria-hidden="true" />
                    <div>
                      <h3>{phrase(lang, fa, en)}</h3>
                      <p>{phrase(lang, detail, enDetail)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Ecosystem({ lang }: { lang: Language }) {
  const [active, setActive] = useState(0);
  const roles = [
    [
      "نرم‌افزار",
      "Software",
      "از طراحی معماری تا توسعه وب و اپلیکیشن؛ محصولاتی که برای رشد ساخته می‌شوند.",
      "From architecture to web and app development. Products designed to grow.",
    ],
    [
      "هوش مصنوعی",
      "AI",
      "دستیارهای هوشمند و تجربه‌هایی که داده را به شناخت و اقدام تبدیل می‌کنند.",
      "Intelligent assistants and experiences that turn data into understanding and action.",
    ],
    [
      "زیرساخت",
      "Infrastructure",
      "سیستم‌های متصل، API و زیرساخت ابری برای توسعه پایدار یک محصول.",
      "Connected systems, APIs and cloud infrastructure for sustainable product development.",
    ],
    [
      "تجربه کاربری",
      "Experience",
      "طراحی ساده و دقیق؛ برای اینکه فناوری پیچیده، تجربه‌ای روان و انسانی بسازد.",
      "Thoughtful design that turns complex technology into a clear, human experience.",
    ],
  ];
  return (
    <section className="ecosystem-section section wrap">
      <Reveal className="ecosystem-layout">
        <div>
          <SectionLabel number="03">
            {phrase(lang, "چشم‌انداز متصل", "A CONNECTED VISION")}
          </SectionLabel>
          <h2>
            {phrase(lang, "یک اکوسیستم.", "One ecosystem.")}
            <br />
            <span>
              {phrase(lang, "فرصت‌های بی‌نهایت.", "Endless possibilities.")}
            </span>
          </h2>
          <p>
            {phrase(
              lang,
              "محصول خوب از اتصال تخصص‌ها شکل می‌گیرد. مهندسی، هوش مصنوعی، زیرساخت و طراحی را در یک مسیر مشترک کنار هم می‌گذاریم.",
              "Great products connect disciplines. We bring engineering, AI, infrastructure and design together in one shared direction.",
            )}
          </p>
          <div
            className="role-tabs"
            role="tablist"
            aria-label={phrase(lang, "نقش‌های اکوسیستم", "Ecosystem roles")}
          >
            {roles.map((r, i) => (
              <button
                id={`role-tab-${i}`}
                aria-controls="role-description"
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    e.preventDefault();
                    const next =
                      (active + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                    setActive(next);
                    document.getElementById(`role-tab-${next}`)?.focus();
                  }
                }}
                onClick={() => setActive(i)}
                className={active === i ? "active" : ""}
                key={r[1]}
              >
                {r[lang === "fa" ? 0 : 1]}
              </button>
            ))}
          </div>
          <p
            id="role-description"
            role="tabpanel"
            aria-labelledby={`role-tab-${active}`}
            className="role-description"
          >
            {roles[active][lang === "fa" ? 2 : 3]}
          </p>
        </div>
        <div className="ecosystem-map">
          <div className="map-circle circle-outer" />
          <div className="map-circle circle-inner" />
          <div className="map-lines" />
          <div className="map-center">
            <Sparkles />
            <b>{phrase(lang, "رایبان", "Rayban")}</b>
            <small>CONNECTED BY AI</small>
          </div>
          {roles.map((r, i) => (
            <button
              key={r[1]}
              className={`map-node map-node-${i} ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span className="mono">0{i + 1}</span>
              <span>{r[lang === "fa" ? 0 : 1]}</span>
              <Plus size={12} />
            </button>
          ))}
          <span className="map-caption mono">
            HUMAN CONNECTION. INTELLIGENT INFRASTRUCTURE.
          </span>
        </div>
      </Reveal>
    </section>
  );
}
function Technology({ lang }: { lang: Language }) {
  const [selected, setSelected] = useState(0);
  const tech = technologies[selected];
  return (
    <section id="technology" className="section wrap technology-section">
      <Reveal>
        <SectionLabel number="05">
          {phrase(lang, "ابزارهای ساختن فردا", "TOOLS FOR TOMORROW")}
        </SectionLabel>
        <div className="section-heading">
          <h2>
            {phrase(lang, "مهندسی،", "Engineering,")}
            <br />
            <span>
              {phrase(lang, "با انتخاب‌های آگاهانه.", "with intention.")}
            </span>
          </h2>
          <p>
            {phrase(
              lang,
              "فناوری برای ما هدف نیست؛ ابزار رسیدن به یک راه‌حل درست است. هر انتخاب، متناسب با مسئله و مسیر رشد محصول.",
              "Technology is a means to the right solution. Every choice serves the problem and the product’s growth.",
            )}
          </p>
        </div>
        <div className="technology-shell">
          <div
            className="technology-tabs"
            role="tablist"
            aria-label={phrase(
              lang,
              "گروه‌های فناوری",
              "Technology categories",
            )}
          >
            {technologies.map((t, i) => (
              <button
                role="tab"
                aria-selected={selected === i}
                id={`tech-tab-${i}`}
                aria-controls="tech-panel"
                tabIndex={selected === i ? 0 : -1}
                key={t.id}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const next =
                      (selected + (e.key === "ArrowDown" ? 1 : 3)) % 4;
                    setSelected(next);
                    document.getElementById(`tech-tab-${next}`)?.focus();
                  }
                }}
                className={selected === i ? "active" : ""}
              >
                <span className="mono">0{i + 1}</span>
                {t.label[lang === "fa" ? 0 : 1]}
                <ChevronLeft size={16} />
              </button>
            ))}
          </div>
          <div
            className="technology-content"
            id="tech-panel"
            role="tabpanel"
            aria-labelledby={`tech-tab-${selected}`}
          >
            <div>
              <Code2 className="technology-icon" />
              <h3>{tech.title[lang === "fa" ? 0 : 1]}</h3>
              <p>{tech.text[lang === "fa" ? 0 : 1]}</p>
              <div className="tech-tags" dir="ltr">
                {tech.names.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
            <div className="code-window" dir="ltr">
              <div className="code-window-top">
                <span>● ● ●</span>
                <small>{tech.id}.config</small>
              </div>
              <pre>
                <code>
                  {tech.code.map((line, i) => (
                    <span key={i}>
                      <em>{i + 1}</em>
                      {line}
                      {"\n"}
                    </span>
                  ))}
                </code>
              </pre>
              <div className="code-window-bottom">
                <span className="signal-dot" /> BUILT WITH PURPOSE
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function Journey({ lang }: { lang: Language }) {
  return (
    <section className="journey section wrap" id="journey">
      <Reveal>
        <SectionLabel number="06">
          {phrase(lang, "مسیر ساختن", "THE BUILDING JOURNEY")}
        </SectionLabel>
        <div className="section-heading">
          <h2>
            {phrase(lang, "از پرسش درست،", "From the right question,")}
            <br />
            <span>
              {phrase(lang, "تا تأثیر واقعی.", "to meaningful impact.")}
            </span>
          </h2>
          <p>
            {phrase(
              lang,
              "یک مسیر شفاف برای تبدیل مسئله به محصول. تاریخچه و نقاط عطف واقعی تیم پس از دریافت اطلاعات اضافه می‌شوند.",
              "A clear path from problem to product. The team’s actual milestones will be added when details are available.",
            )}
          </p>
        </div>
        <div className="timeline">
          {[
            [
              "01",
              "کشف و شناخت",
              "Discover",
              "با شنیدن شروع می‌کنیم؛ مسئله، آدم‌ها و فرصت‌ها.",
              "We begin by listening to the problem, people and opportunities.",
            ],
            [
              "02",
              "طراحی و معماری",
              "Design",
              "یک تجربه روشن، روی یک ساختار قابل توسعه.",
              "A clear experience on an extensible foundation.",
            ],
            [
              "03",
              "ساخت و ارزیابی",
              "Build",
              "توسعه پیوسته، بازخورد واقعی و دقت در جزئیات.",
              "Continuous development, meaningful feedback and attention to detail.",
            ],
            [
              "04",
              "انتشار و رشد",
              "Evolve",
              "هر انتشار، آغاز مرحله بعدی یادگیری است.",
              "Every release starts the next chapter of learning.",
            ],
          ].map(([n, fa, en, desc, enDesc]) => (
            <div key={n}>
              <span className="timeline-point" />
              <small className="mono">PHASE / {n}</small>
              <h3>{phrase(lang, fa, en)}</h3>
              <p>{phrase(lang, desc, enDesc)}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
function Footer({ lang }: { lang: Language }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-links">
          <Link to="/projects">{phrase(lang, "پروژه‌ها", "Projects")}</Link>
          <Link to="/team">{phrase(lang, "اعضای تیم", "Team")}</Link>
          <Link to="/#about">{phrase(lang, "درباره ما", "About")}</Link>
          <Link to="/contact">{phrase(lang, "ارتباط با ما", "Contact")}</Link>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}{" "}
            {phrase(lang, "تمام حقوق محفوظ است.", "All rights reserved.")}
          </span>
          <a href="#top">
            {phrase(lang, "بازگشت به بالا", "Back to top")}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
function Home({ lang, theme }: { lang: Language; theme: Theme }) {
  return (
    <>
      <Hero lang={lang} theme={theme} />
      <FocusStrip lang={lang} />
      <Projects lang={lang} />
      <About lang={lang} />
      <Ecosystem lang={lang} />
      <TeamSection lang={lang} />
      <Technology lang={lang} />
      <Journey lang={lang} />
    </>
  );
}
function ProjectDetail({ lang }: { lang: Language }) {
  const { projects, members } = useStudio();
  const location = useLocation();
  const project = projects.find(
    (p) => `/projects/${p.id}` === location.pathname,
  );
  const index = lang === "fa" ? 0 : 1;
  if (!project)
    return (
      <section className="wrap section not-found">
        <h1>
          {phrase(lang, "این صفحه پیدا نشد.", "This page could not be found.")}
        </h1>
        <Link className="button button-dark" to="/">
          {phrase(lang, "بازگشت به خانه", "Back home")}
          <ArrowLeft />
        </Link>
      </section>
    );
  return (
    <main className="project-detail wrap">
      <Link to="/projects" className="detail-back">
        <ArrowRight size={16} />
        {phrase(lang, "همه پروژه‌ها", "All projects")}
      </Link>
      <div className="detail-header">
        <SectionLabel number={project.number}>
          {project.category[index]}
        </SectionLabel>
        <h1>{project.title[index]}</h1>
        <p>{project.description[index]}</p>
        <span className="sample-note">
          {project.demo
            ? phrase(
                lang,
                "مطالعه مفهومی؛ معرفی محصول واقعی یا ادعای انتشار نیست.",
                "Concept study. This is not a released product or verified case study.",
              )
            : project.status === "پروژه واقعی"
              ? phrase(lang, "پروژه واقعی", "Real project")
              : project.status}
        </span>
      </div>
      <div className="detail-cover">
        {project.image ? (
          <img
            className="uploaded-cover"
            src={project.image}
            alt={project.title[lang === "fa" ? 0 : 1]}
            loading="lazy"
          />
        ) : (
          <ProjectVisual
            type={project.visual}
            lang={lang}
            title={project.title[index]}
          />
        )}
      </div>
      <div className="detail-layout">
        <aside className="detail-sidebar">
          <small>{phrase(lang, "وضعیت", "Status")}</small>
          <p>
            {project.demo
              ? phrase(lang, "طرح مفهومی", "Concept study")
              : project.status === "پروژه واقعی"
                ? phrase(lang, "پروژه واقعی", "Real project")
                : project.status}
          </p>
          <small>
            {project.demo
              ? phrase(lang, "فناوری پیشنهادی", "Proposed technology")
              : phrase(lang, "فناوری‌های پروژه", "Technology stack")}
          </small>
          <div className="tag-list" dir="ltr">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <small>{phrase(lang, "مشارکت‌کنندگان", "Contributors")}</small>
          <p>
            {Object.keys(project.contributors).length}{" "}
            {phrase(lang, "نقش تخصیص‌یافته", "assigned roles")}
          </p>
          <a href="#project-contributors" className="text-link">
            {phrase(lang, "مشاهده نقش‌ها", "View roles")}
            <ArrowDown size={14} />
          </a>
        </aside>
        <div className="detail-content">
          <SectionLabel number="01">
            {phrase(lang, "مسئله و راه‌حل", "PROBLEM & SOLUTION")}
          </SectionLabel>
          <h2>
            {phrase(
              lang,
              "از نیاز انسان، به طراحی سیستم.",
              "From human needs to system design.",
            )}
          </h2>
          <p>
            {(lang === "en" && project.enProblem
              ? project.enProblem
              : project.problem) ||
              phrase(
                lang,
                "اطلاعات مسئله در انتظار تکمیل است.",
                "Problem details are pending.",
              )}
          </p>
          <h3>
            {project.demo
              ? phrase(lang, "راه‌حل پیشنهادی", "Proposed solution")
              : phrase(lang, "راه‌حل", "Solution")}
          </h3>
          <p>
            {(lang === "en" && project.enSolution
              ? project.enSolution
              : project.solution) || project.description[index]}
          </p>
          <h3>
            {phrase(
              lang,
              project.demo ? "قابلیت‌های مورد بررسی" : "قابلیت‌های پروژه",
              project.demo
                ? "Features under consideration"
                : "Project features",
            )}
          </h3>
          <div className="feature-grid">
            {(lang === "fa" ? project.features : project.enFeatures).map(
              (f, i) => (
                <div key={f}>
                  <span className="mono">0{i + 1}</span>
                  <h4>{f}</h4>
                  <Check size={16} />
                </div>
              ),
            )}
          </div>
          <h3>
            {project.demo
              ? phrase(lang, "معماری پیشنهادی", "Proposed architecture")
              : phrase(lang, "معماری نرم‌افزار", "Software architecture")}
          </h3>
          <div className="architecture-flow" dir="ltr">
            {project.architecture
              .split(/→|\n/)
              .filter(Boolean)
              .map((line, i) => (
                <span key={i}>{line}</span>
              ))}
          </div>
          <p className="small">
            {project.demo
              ? phrase(
                  lang,
                  "معماری پیشنهادی برای این مطالعه مفهومی.",
                  "Proposed architecture for this concept study.",
                )
              : ""}
          </p>
          <h3>{phrase(lang, "دستاوردها", "Key achievements")}</h3>
          <div className="achievement-list">
            {(lang === "en" && project.enAchievements
              ? project.enAchievements
              : project.achievements
            )
              .split("\n")
              .filter(Boolean)
              .map((a, i) => (
                <p key={i}>
                  <Check size={15} />
                  {a}
                </p>
              ))}
          </div>
          <h3>{phrase(lang, "پیش‌نمایش رابط", "Interface preview")}</h3>
          <div className="detail-preview">
            {project.image ? (
              <img
                className="uploaded-cover"
                src={project.image}
                alt={project.title[lang === "fa" ? 0 : 1]}
                loading="lazy"
              />
            ) : (
              <ProjectVisual
                type={project.visual}
                lang={lang}
                title={project.title[index]}
              />
            )}
          </div>
          <p className="small">
            {project.image
              ? phrase(
                  lang,
                  "تصویر اضافه‌شده توسط تیم.",
                  "Image supplied by the team.",
                )
              : phrase(
                  lang,
                  "پیش‌نمایش طراحی‌شده برای این وب‌سایت؛ اسکرین‌شات یک محصول منتشرشده نیست.",
                  "An interface concept created for this website, not a screenshot of a released product.",
                )}
          </p>
          <h3>{phrase(lang, "مسیر توسعه", "Development timeline")}</h3>
          {!project.timeline.trim() && (
            <p className="small">
              {phrase(
                lang,
                "جزئیات زمان‌بندی پروژه در انتظار تکمیل است.",
                "Project timeline details are pending.",
              )}
            </p>
          )}
          <div className="detail-phases">
            {project.timeline
              .split("\n")
              .filter(Boolean)
              .map((s, i) => (
                <div key={i}>
                  <span className="mono">0{i + 1}</span>
                  <b>{s.split("|")[0]}</b>
                  <small>
                    {s.split("|")[1] ||
                      phrase(
                        lang,
                        "زمان‌بندی در انتظار تأیید",
                        "Dates awaiting confirmation",
                      )}
                  </small>
                </div>
              ))}
          </div>
          <h3 id="project-contributors">
            {phrase(
              lang,
              "نقش‌های مشارکت در پروژه",
              "Project contributor roles",
            )}
          </h3>
          <p>
            {phrase(
              lang,
              "هر عضو می‌تواند در چند پروژه و در چند نقش مشارکت داشته باشد. نام‌ها و مشارکت‌های واقعی پس از دریافت اطلاعات تیم اضافه می‌شوند.",
              "A member can contribute to multiple projects in multiple roles. Actual names and contributions will be added when team details are provided.",
            )}
          </p>
          <div className="contributor-list">
            {contributorRoles.map((role, i) => {
              const member = members.find(
                (m) => m.id === project.contributors[role],
              );
              return (
                <div key={role}>
                  <span>
                    {phrase(
                      lang,
                      [
                        "رهبر پروژه",
                        "توسعه‌دهنده فرانت‌اند",
                        "توسعه‌دهنده بک‌اند",
                        "طراح UI/UX",
                        "مهندس DevOps",
                        "مشارکت‌کننده هوش مصنوعی",
                        "تستر",
                      ][i],
                      role,
                    )}
                  </span>
                  <small>
                    {member ? (
                      <>
                        {lang === "fa" ? member.name : member.enName}
                        {member.demo && (
                          <span className="demo-badge">
                            {phrase(lang, "نمایشی", "Demo")}
                          </span>
                        )}
                      </>
                    ) : (
                      phrase(lang, "در انتظار معرفی", "Awaiting introduction")
                    )}
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {projects.length > 1 && (
        <div className="next-project">
          <span>{phrase(lang, "مطالعه بعدی", "NEXT CONCEPT")}</span>
          <Link
            to={`/projects/${projects[(projects.indexOf(project) + 1) % projects.length].id}`}
          >
            {
              projects[(projects.indexOf(project) + 1) % projects.length].title[
                index
              ]
            }
            <ArrowUpLeft />
          </Link>
        </div>
      )}
    </main>
  );
}
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}
function StudioApp({
  initialLang,
  initialTheme,
}: {
  initialLang: Language;
  initialTheme: Theme;
}) {
  const { projects, members } = useStudio();
  const [lang, setLang] = useState<Language>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  useLayoutEffect(() => {
    document.documentElement.lang = initialLang;
    document.documentElement.dir = initialLang === "fa" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = initialTheme;
    delete document.documentElement.dataset.preferencesPending;
  }, [initialLang, initialTheme]);
  useEffect(() => {
    try {
      if (localStorage.getItem("raiban-theme") === "light") setTheme("light");
    } catch {
      /* Theme is optional. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#eef3fb" : "#070e20");
    try {
      localStorage.setItem("raiban-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);
  useEffect(() => {
    try {
      if (localStorage.getItem("raiban-language") === "en") setLang("en");
    } catch {
      // Persian remains usable when storage is unavailable.
    }
  }, []);
  const location = useLocation();
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    try {
      localStorage.setItem("raiban-language", lang);
    } catch {
      /* Storage is optional */
    }
  }, [lang]);
  useEffect(() => {
    const p = projects.find((p) => location.pathname === `/projects/${p.id}`);
    const member = members.find((m) => location.pathname === `/team/${m.id}`);
    document.title = location.pathname.startsWith("/admin")
      ? phrase(lang, "مدیریت محتوا — رایبان", "Content management — Rayban")
      : member
        ? `${lang === "fa" ? member.name : member.enName} — Rayban`
        : location.pathname === "/team"
          ? phrase(lang, "اعضای تیم — رایبان", "Team — Rayban")
          : p
            ? `${p.title[lang === "fa" ? 0 : 1]} — Rayban`
            : location.pathname === "/projects"
              ? phrase(lang, "پروژه‌ها — رایبان", "Projects — Rayban")
              : location.pathname === "/contact"
                ? phrase(lang, "ارتباط با ما — رایبان", "Contact — Rayban")
                : phrase(
                    lang,
                    "رایبان — مهندسی فردا",
                    "Rayban — Engineering tomorrow",
                  );
  }, [location.pathname, lang, projects, members]);
  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) return;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [location.pathname]);
  return (
    <div
      id="top"
      className={`app-shell${location.pathname.startsWith("/admin") ? " admin-shell" : ""}`}
    >
      <AmbientBackground />
      <a className="skip-link" href="#main-content">
        {phrase(lang, "رفتن به محتوای اصلی", "Skip to content")}
      </a>
      <ScrollManager />
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <div id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Home lang={lang} theme={theme} />
              </main>
            }
          />
          <Route
            path="/admin/*"
            element={
              <Suspense
                fallback={
                  <main className="wrap section">
                    {phrase(
                      lang,
                      "در حال باز کردن ورود ادمین…",
                      "Opening admin login…",
                    )}
                  </main>
                }
              >
                <AdminPage lang={lang} />
              </Suspense>
            }
          />
          <Route path="/studio" element={<Navigate to="/admin" replace />} />
          <Route
            path="/team"
            element={
              <main>
                <TeamSection lang={lang} full />
              </main>
            }
          />
          <Route path="/team/:id" element={<MemberPage lang={lang} />} />
          <Route
            path="/projects"
            element={
              <main className="catalog-page">
                <Projects lang={lang} full />
              </main>
            }
          />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="/projects/:id" element={<ProjectDetail lang={lang} />} />
          <Route path="*" element={<ProjectDetail lang={lang} />} />
        </Routes>
      </div>
      <Footer lang={lang} />
    </div>
  );
}

export default function App({
  initialLang = "fa",
  initialTheme = "dark",
}: { initialLang?: Language; initialTheme?: Theme } = {}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <StudioProvider>
        <StudioApp initialLang={initialLang} initialTheme={initialTheme} />
      </StudioProvider>
    </LazyMotion>
  );
}
