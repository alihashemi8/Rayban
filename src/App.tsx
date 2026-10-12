import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import type { Language } from "./data";
import { phrase } from "./data";
import Header from "./components/Header";
import type { Theme } from "./components/Header";
import Footer from "./components/Footer";
import AmbientBackground from "./components/AmbientBackground";
import ScrollManager from "./components/ScrollManager";
import TeamSection, { MemberPage } from "./components/TeamSection";
import Projects from "./components/Projects";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import { StudioProvider, useStudio } from "./studio";

const AdminPage = lazy(() => import("./pages/AdminPage"));

function StudioApp({
  initialLang,
  initialTheme,
}: {
  initialLang: Language;
  initialTheme: Theme;
}) {
  const { projects, members } = useStudio();
  const [lang, setLang] = useState<Language>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useLayoutEffect(() => {
    document.documentElement.lang = initialLang;
    document.documentElement.dir = initialLang === "fa" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = initialTheme;
    delete document.documentElement.dataset.preferencesPending;
  }, [initialLang, initialTheme]);

  useEffect(() => {
    try {
      if (localStorage.getItem("raiban-theme") === "light") setTheme("light");
    } catch {
      /* Theme is optional. */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#eef3fb" : "#070e20");
    try {
      localStorage.setItem("raiban-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);

  useEffect(() => {
    try {
      if (localStorage.getItem("raiban-language") === "en") setLang("en");
    } catch {
      // Persian remains usable when storage is unavailable.
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    try {
      localStorage.setItem("raiban-language", lang);
    } catch {
      /* Storage is optional */
    }
  }, [lang]);

  useEffect(() => {
    const p = projects.find((p) => location.pathname === `/projects/${p.id}`);
    const member = members.find((m) => location.pathname === `/team/${m.id}`);
    document.title = location.pathname.startsWith("/admin")
      ? phrase(lang, "مدیریت محتوا — رایبان", "Content management — Rayban")
      : member
        ? `${lang === "fa" ? member.name : member.enName} — Rayban`
        : location.pathname === "/team"
          ? phrase(lang, "اعضای تیم — رایبان", "Team — Rayban")
          : p
            ? `${p.title[lang === "fa" ? 0 : 1]} — Rayban`
            : location.pathname === "/projects"
              ? phrase(lang, "پروژه‌ها — رایبان", "Projects — Rayban")
              : location.pathname === "/contact"
                ? phrase(lang, "ارتباط با ما — رایبان", "Contact — Rayban")
                : phrase(
                    lang,
                    "رایبان — مهندسی فردا",
                    "Rayban — Engineering tomorrow",
                  );
  }, [location.pathname, lang, projects, members]);

  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) return;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [location.pathname]);

  return (
    <div
      id="top"
      className={`app-shell${location.pathname.startsWith("/admin") ? " admin-shell" : ""}`}
    >
      <AmbientBackground />
      <a className="skip-link" href="#main-content">
        {phrase(lang, "رفتن به محتوای اصلی", "Skip to content")}
      </a>
      <ScrollManager />
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <div id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <HomePage lang={lang} theme={theme} />
              </main>
            }
          />
          <Route
            path="/admin/*"
            element={
              <Suspense
                fallback={
                  <main className="wrap section">
                    {phrase(
                      lang,
                      "در حال باز کردن ورود ادمین…",
                      "Opening admin login…",
                    )}
                  </main>
                }
              >
                <AdminPage lang={lang} />
              </Suspense>
            }
          />
          <Route path="/studio" element={<Navigate to="/admin" replace />} />
          <Route
            path="/team"
            element={
              <main>
                <TeamSection lang={lang} full />
              </main>
            }
          />
          <Route path="/team/:id" element={<MemberPage lang={lang} />} />
          <Route
            path="/projects"
            element={
              <main className="catalog-page">
                <Projects lang={lang} full />
              </main>
            }
          />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="/projects/:id" element={<ProjectDetailPage lang={lang} />} />
          <Route path="*" element={<ProjectDetailPage lang={lang} />} />
        </Routes>
      </div>
      <Footer lang={lang} />
    </div>
  );
}

export default function App({
  initialLang = "fa",
  initialTheme = "dark",
}: { initialLang?: Language; initialTheme?: Theme } = {}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <StudioProvider>
        <StudioApp initialLang={initialLang} initialTheme={initialTheme} />
      </StudioProvider>
    </LazyMotion>
  );
}
