import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import { useStudio } from "../studio";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { ProjectCollection } from "./CardRail";
import ProjectVisual from "./ProjectVisual";

export default function Projects({ lang, full = false }: { lang: Language; full?: boolean }) {
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
              full ? "فهرست پروژه‌ها،" : "پروژه‌ها و راهکارها،",
              full ? "Project directory," : "Projects & solutions,",
            )}
            <br />
            <span>
              {phrase(
                lang,
                full ? "محصولات و مطالعات فنی." : "از تحلیل تا پیاده‌سازی.",
                full ? "products & technical studies." : "from analysis to deployment.",
              )}
            </span>
          </Heading>
          <div>
            <p>
              {phrase(
                lang,
                "توسعه سیستم‌های نرم‌افزاری و هوش مصنوعی با تمرکز بر پایداری، عملکرد بالا و پاسخ‌گویی به نیازهای عملیاتی.",
                "Developing software systems and applied AI focused on stability, high performance and operational demands.",
              )}
            </p>
            <span className="sample-note">
              {phrase(
                lang,
                "شامل سامانه‌های عملیاتی اجراشده و مطالعات تحقیق و توسعه (R&D) تیم رایبان.",
                "Including production systems and Rayban's research & development (R&D) case studies.",
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
                    ? phrase(lang, "مطالعه و تحقیق (R&D)", "R&D Study")
                    : phrase(lang, "سامانه عملیاتی", "Production")}
                </span>
                {!project.image && (
                  <span className="art-caption">
                    {phrase(lang, "پیش‌نمایش شماتیک رابط", "UI schematic preview")}
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
