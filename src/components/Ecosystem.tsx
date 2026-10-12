import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function Ecosystem({ lang }: { lang: Language }) {
  const [active, setActive] = useState(0);
  const roles = [
    [
      "وب و موبایل",
      "Web & Mobile",
      "طراحی و پیاده‌سازی اپلیکیشن‌های پیشرفته موبایل (iOS و Android)، سامانه‌های مدرن تحت وب و وب‌سرویس‌های مقیاس‌پذیر. سیستم‌ها از منطق پیچیده کسب‌وکار تا تجربه روان کاربری، با کد تمیز، معماری ماژولار و آزمون‌های خودکار استاندارد توسعه داده می‌شوند.",
      "Engineering high-performance mobile apps (iOS & Android), modern web platforms, and scalable backend APIs. From complex business logic to fluid user experiences, every system is built with clean code, modular architecture, and automated testing.",
    ],
    [
      "هوش مصنوعی",
      "Applied AI",
      "توسعه دستیارهای هوشمند سازمانی، پایپ‌لاین‌های بازیابی دانش (RAG) و پردازش زبان طبیعی متصل به داده‌های اختصاصی. تمرکز ما بر خلق ارزش عملیاتی ملموس، امنیت و ایزولاسیون کامل داده‌ها، و سنجش پیوسته دقت و کیفیت پاسخ‌هاست.",
      "Deploying enterprise AI assistants, knowledge retrieval pipelines (RAG), and natural language processing grounded in organizational data. We prioritize measurable operational value, strict data isolation, and continuous evaluation of response precision.",
    ],
    [
      "زیرساخت ابری",
      "Cloud & DevOps",
      "معماری پایگاه‌های داده پایدار، کانتینرسازی با Docker و راه‌اندازی خطوط خودکار استقرار (CI/CD). سرویس‌ها همراه با پایش ۲۴/۷ سلامت، کشینگ چندلایه و سیاست‌های دسترسی مداوم مهندسی می‌شوند تا ترافیک بالا بدون افت کارایی مدیریت شود.",
      "Architecting reliable databases, Docker containerization, and automated CI/CD deployment pipelines. Services are engineered with 24/7 health monitoring, multi-tier caching, and high-availability failover to handle heavy workloads with uninterrupted stability.",
    ],
    [
      "تجربه کاربری",
      "Product & UX",
      "تبدیل جریان‌های کاری پیچیده به رابط‌های کاربری چشم‌نواز، شهودی و دسترس‌پذیر برای موبایل و دسکتاپ. از سیستم‌های طراحی منسجم (Design Systems) تا ریزتعامل‌های ظریف، طراحی محصول در رایبان بر مبنای کاهش اصطکاک و ارتقای سهولت کاربری شکل می‌گیرد.",
      "Transforming complex workflows into intuitive, engaging, and accessible interfaces across mobile and desktop. Guided by cohesive design systems and user-behavior insights, we craft digital products that eliminate friction and maximize usability.",
    ],
  ];

  return (
    <section className="ecosystem-section section wrap">
      <Reveal className="ecosystem-layout">
        <div className="ecosystem-copy">
          <SectionLabel number="03">
            {phrase(lang, "تخصص‌های تیم", "TEAM DISCIPLINES")}
          </SectionLabel>
          <h2>
            {phrase(lang, "تخصص‌های مکمل،", "Complementary skills,")}
            <br />
            <span>
              {phrase(lang, "برای محصولی یکپارچه.", "one unified product.")}
            </span>
          </h2>
          <p>
            {phrase(
              lang,
              "در رایبان، مهندسی بک‌اند، فرانت‌اند، اپلیکیشن‌های موبایل، زیرساخت ابری و هوش مصنوعی در یک فرایند منسجم کنار هم قرار می‌گیرند تا سامانه‌ای کامل و مطمئن تحویل داده شود.",
              "At Rayban, backend, frontend, mobile apps, cloud infrastructure and applied AI work together in a cohesive workflow to deliver complete, dependable systems.",
            )}
          </p>
          <div
            className="role-tabs"
            role="tablist"
            aria-label={phrase(lang, "تخصص‌های ساخت محصول", "Product development disciplines")}
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
            <small>{phrase(lang, "توسعه محصول", "PRODUCT DEVELOPMENT")}</small>
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
            {phrase(lang, "طراحی، توسعه و نگهداری", "DESIGN · BUILD · MAINTAIN")}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
