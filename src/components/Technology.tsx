import { useState } from "react";
import { Code2, ChevronLeft } from "lucide-react";
import type { Language } from "../data";
import { phrase, technologies } from "../data";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function Technology({ lang }: { lang: Language }) {
  const [selected, setSelected] = useState(0);
  const tech = technologies[selected];

  return (
    <section id="technology" className="section wrap technology-section">
      <Reveal>
        <SectionLabel number="05">
          {phrase(lang, "پشته فناوری", "TECHNOLOGY STACK")}
        </SectionLabel>
        <div className="section-heading">
          <h2>
            {phrase(lang, "انتخاب ابزارها،", "Technology choices,")}
            <br />
            <span>
              {phrase(lang, "بر اساس الزامات مهندسی.", "driven by engineering.")}
            </span>
          </h2>
          <p>
            {phrase(
              lang,
              "فناوری برای ما ابزار رسیدن به یک راه‌حل پایدار است؛ هر ابزار متناسب با مقیاس، بار پردازشی و نیازهای بلندمدت سیستم انتخاب می‌شود.",
              "Technology serves as the foundation for durable solutions. Every tool is chosen to fit scale, workload and long-term project viability.",
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
                <span className="signal-dot" /> PRODUCTION-READY ARCHITECTURE
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
