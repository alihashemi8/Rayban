import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Layers,
  Network,
  Users,
  Code2,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
} from "lucide-react";
import { phrase } from "../data";
import type { Language } from "../data";

export type Theme = "dark" | "light";
export default function Header({
  lang,
  setLang,
  theme,
  setTheme,
}: {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const links = [
    { to: "/projects", fa: "پروژه‌ها", en: "Projects", Icon: Layers },
    { to: "/#about", fa: "درباره رایبان", en: "About", Icon: Network },
    { to: "/#team", fa: "تیم ما", en: "Team", Icon: Users },
    { to: "/#technology", fa: "فناوری‌ها", en: "Technology", Icon: Code2 },
    { to: "/contact", fa: "ارتباط با ما", en: "Contact", Icon: MessageCircle },
  ];
  return (
    <header
      className={`site-header${expanded ? " mobile-expanded" : ""}`}
    >
      <div className="header-inner">
        <div className="rail-top">
          <Link
            to="/"
            className="brand"
            aria-label={phrase(
              lang,
              "Rayban — SOFTWARE & AI — صفحه اصلی",
              "Rayban — SOFTWARE & AI — Home",
            )}
          >
            <img
              className="brand-logo"
              src="/raiban-logo.webp"
              alt=""
              width="44"
              height="44"
            />
            <span className="wordmark" dir="ltr">
              Ray<span>ban</span>
              <small>SOFTWARE & AI</small>
            </span>
          </Link>
          <button
            className="rail-menu-toggle"
            aria-expanded={expanded}
            aria-controls="rail-navigation rail-preferences"
            aria-label={phrase(
              lang,
              expanded ? "بستن فهرست" : "باز کردن فهرست",
              expanded ? "Close navigation" : "Open navigation",
            )}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={21} /> : <ChevronDown size={21} />}
          </button>
        </div>
        <div className="rail-reveal">
          <div className="rail-reveal-inner">
        <nav
          id="rail-navigation"
          className="rail-navigation"
          aria-label={phrase(lang, "ناوبری اصلی", "Main navigation")}
        >
          {links.map(({ to, fa, en, Icon }) => {
            const active = to.includes("#")
              ? location.pathname + location.hash === to
              : location.pathname === to ||
                (to === "/projects" &&
                  location.pathname.startsWith("/projects/"));
            return (
              <Link
                key={to}
                to={to}
                className={active ? "rail-active" : undefined}
                aria-current={active ? "location" : undefined}
                title={phrase(lang, fa, en)}
                aria-label={phrase(lang, fa, en)}
              >
                <Icon size={19} aria-hidden="true" />
                <span>{phrase(lang, fa, en)}</span>
              </Link>
            );
          })}
        </nav>
        <div className="header-actions" id="rail-preferences">
          <button
            className="language-button"
            onClick={() => setLang(lang === "fa" ? "en" : "fa")}
            aria-label={
              lang === "fa" ? "Switch to English" : "تغییر زبان به فارسی"
            }
          >
            {lang === "fa" ? "EN" : "فا"}
            <span>{phrase(lang, "English", "فارسی")}</span>
          </button>
          <button
            className="theme-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={phrase(
              lang,
              theme === "dark" ? "فعال کردن حالت روشن" : "فعال کردن حالت تاریک",
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
            )}
            title={phrase(
              lang,
              theme === "dark" ? "حالت روشن" : "حالت تاریک",
              theme === "dark" ? "Light mode" : "Dark mode",
            )}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            <span>
              {phrase(
                lang,
                theme === "dark" ? "حالت روشن" : "حالت تاریک",
                theme === "dark" ? "Light mode" : "Dark mode",
              )}
            </span>
          </button>
        </div>
          </div>
        </div>
      </div>
    </header>
  );
}
