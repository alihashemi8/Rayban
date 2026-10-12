import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUpLeft,
  Check,
} from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import { useStudio, contributorRoles } from "../studio";
import SectionLabel from "../components/SectionLabel";
import ProjectVisual from "../components/ProjectVisual";

export default function ProjectDetailPage({ lang }: { lang: Language }) {
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
