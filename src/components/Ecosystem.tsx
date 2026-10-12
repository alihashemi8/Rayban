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
      "نرم‌افزار و موبایل",
      "Software & Mobile",
      "توسعه اپلیکیشن‌های موبایل، وب و API؛ از وب‌سرویس‌ها تا اپ‌های کاربردی و سیستم‌های یکپارچه مدیریت.",
      "Building mobile apps, web applications and APIs; from client platforms to management systems.",
    ],
    [
      "هوش مصنوعی",
      "AI",
      "ساخت دستیارهای متنی و قابلیت‌های مبتنی بر مدل‌های زبانی، با توجه به زمینه محصول و بررسی کیفیت پاسخ‌ها.",
      "Building text assistants and language-model features, grounded in the product context and evaluated for response quality.",
    ],
    [
      "زیرساخت",
      "Infrastructure",
      "آماده‌سازی محیط اجرا، استقرار با Docker و پایش سرویس‌ها؛ برای نگهداری و به‌روزرسانی محصول.",
      "Setting up runtime environments, deploying with Docker and monitoring services to maintain and update the product.",
    ],
    [
      "تجربه کاربری",
      "Experience",
      "طراحی مسیرهای کاربر و رابط‌های خوانا و واکنش‌گرا برای موبایل و دسکتاپ؛ با توجه به بازخورد و استفاده روزمره.",
      "Designing clear workflows and readable interfaces for mobile and desktop, informed by feedback and everyday use.",
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
