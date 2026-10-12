import type { Language } from "../data";
import { phrase } from "../data";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function Journey({ lang }: { lang: Language }) {
  return (
    <section className="journey section wrap" id="journey">
      <Reveal>
        <SectionLabel number="06">
          {phrase(lang, "چرخه توسعه", "DEVELOPMENT LIFECYCLE")}
        </SectionLabel>
        <div className="section-heading">
          <h2>
            {phrase(lang, "مراحل توسعه محصول،", "Our development process,")}
            <br />
            <span>
              {phrase(lang, "از تحلیل اولیه تا استقرار پایدار.", "from initial analysis to production.")}
            </span>
          </h2>
          <p>
            {phrase(
              lang,
              "هر پروژه در رایبان طبق مراحلی شفاف و فازبندی‌شده پیش می‌رود تا کیفیت فنی، زمان‌بندی دقیق و پایداری بلندمدت سیستم تضمین شود.",
              "Every project at Rayban follows a transparent, phased workflow to ensure technical quality, predictable delivery and long-term reliability.",
            )}
          </p>
        </div>
        <div className="timeline">
          {[
            [
              "01",
              "تحلیل و شناخت مسئله",
              "Discovery & Scoping",
              "بررسی الزامات کسب‌وکار، مدل‌سازی داده و تعیین اولویت‌های فنی.",
              "Analyzing business workflows, data models and technical scope.",
            ],
            [
              "02",
              "معماری و طراحی سیستم",
              "Architecture & Design",
              "طراحی ساختار سرویس‌ها، قراردادهای API و پروتوتایپ رابط کاربری.",
              "Designing service architecture, API contracts and UI prototypes.",
            ],
            [
              "03",
              "پیاده‌سازی و تست کیفیت",
              "Build & Verification",
              "توسعه ماژولار کد، پیاده‌سازی آزمون‌های خودکار و سنجش کارایی.",
              "Modular implementation, automated testing and performance verification.",
            ],
            [
              "04",
              "استقرار و پایش مداوم",
              "Deploy & Maintain",
              "راه‌اندازی در زیرساخت ابری، مانیتورینگ سلامت سرویس و نگهداری مستمر.",
              "Cloud rollout, continuous health monitoring and ongoing maintenance.",
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
