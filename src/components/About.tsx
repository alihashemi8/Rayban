import { Check } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function About({ lang }: { lang: Language }) {
  return (
    <section id="about" className="about-section">
      <div className="wrap">
        <Reveal>
          <SectionLabel number="02">
            {phrase(lang, "رویکرد مهندسی", "ENGINEERING APPROACH")}
          </SectionLabel>
          <div className="about-layout">
            <div>
              <h2>
                {phrase(lang, "تحلیل دقیق مسئله،", "Thorough problem analysis,")}
                <br />
                {phrase(lang, "معماری استاندارد،", "disciplined architecture,")}
                <br />
                <span>{phrase(lang, "پیاده‌سازی پایدار.", "resilient implementation.")}</span>
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
                  Ray<span>ban</span> / ENGINEERING STUDIO
                </span>
              </div>
            </div>
            <div className="about-body">
              <p className="large-body">
                {phrase(
                  lang,
                  "در تیم رایبان، توسعه سامانه‌های وب و اپلیکیشن‌های موبایل با درک عمیق از منطق کسب‌وکار و نیاز کاربران آغاز می‌شود. پیش از هر خط کد، معماری سرویس، مدل داده و جریان‌های اصلی سیستم را با دقت طراحی می‌کنیم.",
                  "At Rayban, web and mobile product development begins with a clear understanding of business logic and user workflows. We design service architecture, data models and core workflows before implementation.",
                )}
              </p>
              <p>
                {phrase(
                  lang,
                  "فرایند توسعه را به شکل گام‌به‌گام، آزموده‌شده و شفاف پیش می‌بریم. فناوری‌های هوش مصنوعی را نیز نه به عنوان شعار، بلکه در بخش‌هایی به کار می‌گیریم که ارزش عملیاتی ملموسی ایجاد کنند.",
                  "We follow a modular, tested and transparent development process. AI tools are incorporated not as buzzwords, but where they deliver concrete operational value.",
                )}
              </p>
              <div className="values">
                {[
                  [
                    "تحلیل و شفاف‌سازی نیازمندی‌ها",
                    "Requirements & Scoping",
                    "تعریف دقیق مسئله، اولویت‌های کاربردی و معماری فنی.",
                    "Clarifying requirements, technical priorities and operational scope.",
                  ],
                  [
                    "طراحی مهندسی و مقیاس‌پذیر",
                    "Scalable Engineering",
                    "پیاده‌سازی ماژولار و ساختاریافته برای نگهداری آسان و توسعه آتی.",
                    "Modular and structured implementations built for maintainability and future growth.",
                  ],
                  [
                    "تست، ارزیابی و بهبود مستمر",
                    "Verification & Iteration",
                    "سنجش کارایی، بازبینی امنیت و ارتقای مداوم بر پایه بازخورد عملیاتی.",
                    "Verifying performance, assessing security and refining through operational feedback.",
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
