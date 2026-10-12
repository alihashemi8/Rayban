import { Link } from "react-router-dom";
import { ArrowUpLeft, ArrowDown, Code2, Layers, Sparkles } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import type { Theme } from "./Header";
import Scene from "./Scene";

export default function Hero({ lang, theme }: { lang: Language; theme: Theme }) {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="signal-dot" />
          {phrase(
            lang,
            "استودیوی نرم‌افزار و هوش مصنوعی رایبان",
            "RAYBAN SOFTWARE & ARTIFICIAL INTELLIGENCE STUDIO",
          )}
        </div>
        <h1>
          {phrase(lang, "مهندسی نرم‌افزار.", "Software engineering.")}
          <br />
          <span>
            {phrase(lang, "سامانه‌های هوشمند.", "Intelligent systems.")}
          </span>
        </h1>
        <p className="hero-description">
          {phrase(
            lang,
            "ما در تیم رایبان، سامانه‌های نرم‌افزاری پایدار و راهکارهای هوش مصنوعی را برای مسائل واقعی کسب‌وکارها طراحی و پیاده‌سازی می‌کنیم.",
            "At Rayban, we build resilient software and applied AI solutions tailored to real-world challenges.",
          )}
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button button-dark">
            {phrase(lang, "مشاهده پروژه‌ها", "Explore our work")}
            <ArrowUpLeft size={19} />
          </a>
          <Link to="/contact" className="button button-light">
            {phrase(lang, "شروع همکاری", "Start collaborating")}
            <ArrowUpLeft size={19} aria-hidden="true" />
          </Link>
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
              "معماری استاندارد • عملکرد پایدار • کد آزموده‌شده",
              "Standard architecture • Reliable performance • Tested code",
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
          {phrase(lang, "برای مشاهده پروژه‌ها، اسکرول کنید", "Scroll to explore")}
        </a>
        <span dir="ltr">COLLABORATIVE ENGINEERING · RELIABLE SYSTEMS</span>
        <span>
          {phrase(
            lang,
            "استودیوی فناوری رایبان",
            "Rayban Technology Studio",
          )}
          <span className="tiny-square" />
        </span>
      </div>
    </section>
  );
}
