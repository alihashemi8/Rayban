import { useRef } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
export function ProjectCollection({
  full,
  lang,
  children,
}: {
  full: boolean;
  lang: Language;
  children: ReactNode;
}) {
  return full ? (
    <div className="project-grid">{children}</div>
  ) : (
    <CardRail
      kind="project"
      lang={lang}
      label={phrase(
        lang,
        "پروژه‌ها؛ برای دیدن بقیه افقی جابه‌جا شوید",
        "Projects; swipe horizontally to explore",
      )}
    >
      {children}
    </CardRail>
  );
}

export default function CardRail({
  children,
  lang,
  kind,
  label,
}: {
  children: ReactNode;
  lang: Language;
  kind: "project" | "team";
  label: string;
}) {
  const rail = useRef<HTMLDivElement>(null);
  function scroll(next: boolean) {
    const first = rail.current?.firstElementChild;
    const distance = first ? first.getBoundingClientRect().width + 20 : 340;
    rail.current?.scrollBy({
      left: distance * (next ? 1 : -1) * (lang === "fa" ? -1 : 1),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div className={`card-rail-shell ${kind}-rail-shell`}>
      <div
        ref={rail}
        className={`${kind}-grid ${kind}-rail card-rail`}
        role="region"
        tabIndex={0}
        aria-label={label}
      >
        {children}
      </div>
      <div className="rail-overlay-controls">
        <button
          className="rail-previous"
          onClick={() => scroll(false)}
          aria-label={phrase(lang, "کارت‌های قبلی", "Previous cards")}
        >
          {lang === "fa" ? <ArrowRight size={21} /> : <ArrowLeft size={21} />}
        </button>
        <button
          className="rail-next"
          onClick={() => scroll(true)}
          aria-label={phrase(lang, "کارت‌های بعدی", "Next cards")}
        >
          {lang === "fa" ? <ArrowLeft size={21} /> : <ArrowRight size={21} />}
        </button>
      </div>
    </div>
  );
}
