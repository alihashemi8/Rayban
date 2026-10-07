import { lazy, Suspense, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  LogOut,
  ArrowLeft,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import { apiRequest, setCsrfToken } from "../api";
import { useStudio, validateContent } from "../studio";
import type { Content } from "../studio";
import { mergeRealProjects } from "../realProjects";
const StudioManager = lazy(() => import("../StudioManager"));
type Session = {
  authenticated: boolean;
  setupRequired?: boolean;
  username?: string;
  csrfToken?: string;
};

export default function AdminPage({ lang }: { lang: Language }) {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [legacy, setLegacy] = useState<Content | null>(null);
  const { reload, save } = useStudio();
  const navigate = useNavigate();
  async function check() {
    setError("");
    try {
      const state = await apiRequest<Session>("/api/admin/session");
      setCsrfToken(state.csrfToken || "");
      if (state.authenticated) await reload();
      setSession(state);
    } catch {
      setError(
        phrase(
          lang,
          "سرور ورود در دسترس نیست. دوباره تلاش کنید.",
          "The admin server is unavailable. Try again.",
        ),
      );
    }
  }
  useEffect(() => {
    void check();
    try {
      const raw = localStorage.getItem("raiban-studio-content-v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (validateContent(parsed)) setLegacy(mergeRealProjects(parsed));
      }
    } catch {
      /* Local backup is optional. */
    }
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget),
      password = String(form.get("password"));
    if (session?.setupRequired && password !== form.get("confirm")) {
      setError(
        phrase(lang, "تکرار رمز یکسان نیست.", "Passwords do not match."),
      );
      setBusy(false);
      return;
    }
    try {
      const state = await apiRequest<Session>(
        session?.setupRequired ? "/api/admin/setup" : "/api/admin/login",
        {
          method: "POST",
          body: JSON.stringify({ username: form.get("username"), password }),
        },
      );
      setCsrfToken(state.csrfToken || "");
      await reload();
      setSession(state);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    setBusy(true);
    setError("");
    try {
      await apiRequest("/api/admin/logout", { method: "POST", body: "{}" });
      setCsrfToken("");
      setSession({ authenticated: false });
      navigate("/admin/login", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed.");
    } finally {
      setBusy(false);
    }
  }
  if (session?.authenticated)
    return (
      <>
        <div className="wrap admin-toolbar">
          <span>
            <LockKeyhole size={17} />
            {session.username}
          </span>
          <button className="show-all button" onClick={logout} disabled={busy}>
            <LogOut size={17} />
            {phrase(lang, "خروج", "Sign out")}
          </button>
        </div>
        {error && (
          <p role="alert" className="wrap admin-error">
            {error}
          </p>
        )}
        {legacy && (
          <aside className="wrap legacy-import">
            <p>
              {phrase(
                lang,
                "محتوای قبلی این مرورگر هنوز محفوظ است. در صورت نیاز، آن را جایگزین محتوای سرور کنید.",
                "Your earlier browser content is preserved. You can replace the server content with that backup.",
              )}
            </p>
            <button
              className="show-all button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                if (await save(legacy)) setLegacy(null);
                setBusy(false);
              }}
            >
              <Upload size={17} />
              {phrase(
                lang,
                "انتقال محتوای قبلی این مرورگر",
                "Import earlier browser content",
              )}
            </button>
          </aside>
        )}
        <Suspense
          fallback={
            <main className="wrap section">
              {phrase(lang, "در حال بارگذاری مدیریت…", "Loading manager…")}
            </main>
          }
        >
          <StudioManager lang={lang} />
        </Suspense>
      </>
    );
  return (
    <main className="wrap admin-page">
      <Link className="detail-back" to="/">
        <ArrowLeft size={17} />
        {phrase(lang, "بازگشت به سایت", "Back to website")}
      </Link>
      <section className="admin-login-card">
        <span className="admin-lock">
          <LockKeyhole size={30} />
        </span>
        <span className="mono">RAYBAN / ADMIN</span>
        <h1>
          {phrase(
            lang,
            session?.setupRequired ? "ساخت حساب ادمین" : "ورود ادمین",
            session?.setupRequired ? "Create admin account" : "Admin sign in",
          )}
        </h1>
        <p>
          {phrase(
            lang,
            session?.setupRequired
              ? "برای اولین ورود، نام کاربری و رمز عبور خودتان را تعیین کنید."
              : "برای مدیریت پروژه‌ها و اعضای تیم وارد شوید.",
            session?.setupRequired
              ? "Choose your username and password for the first admin account."
              : "Sign in to manage projects and team members.",
          )}
        </p>
        {!session && !error && (
          <p role="status">
            {phrase(lang, "در حال اتصال به سرور…", "Connecting to the server…")}
          </p>
        )}
        {session && (
          <form onSubmit={submit}>
            <label>
              {phrase(lang, "نام کاربری", "Username")}
              <input
                name="username"
                required
                dir="ltr"
                autoComplete="username"
                minLength={3}
                maxLength={50}
                pattern="[a-zA-Z0-9_-]+"
                defaultValue="admin"
              />
            </label>
            <label>
              {phrase(lang, "رمز عبور", "Password")}
              <div className="password-input">
                <input
                  name="password"
                  required
                  type={visible ? "text" : "password"}
                  dir="ltr"
                  autoComplete={
                    session.setupRequired ? "new-password" : "current-password"
                  }
                  minLength={12}
                  maxLength={128}
                />
                <button
                  type="button"
                  aria-label={phrase(
                    lang,
                    visible ? "پنهان کردن رمز" : "نمایش رمز",
                    visible ? "Hide password" : "Show password",
                  )}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </label>
            {session.setupRequired && (
              <>
                <small>
                  {phrase(
                    lang,
                    "حداقل ۱۲ کاراکتر؛ از یک رمز اختصاصی استفاده کنید.",
                    "At least 12 characters; use a unique password.",
                  )}
                </small>
                <label>
                  {phrase(lang, "تکرار رمز عبور", "Confirm password")}
                  <input
                    name="confirm"
                    required
                    type="password"
                    dir="ltr"
                    autoComplete="new-password"
                    minLength={12}
                    maxLength={128}
                  />
                </label>
              </>
            )}
            <button className="button button-dark" disabled={busy}>
              {phrase(
                lang,
                busy
                  ? "در حال بررسی…"
                  : session.setupRequired
                    ? "ساخت حساب و ورود"
                    : "ورود",
                busy
                  ? "Please wait…"
                  : session.setupRequired
                    ? "Create account and sign in"
                    : "Sign in",
              )}
            </button>
          </form>
        )}
        {error && (
          <div className="admin-error" role="alert">
            {error}
            {!session && (
              <button className="text-link" onClick={check}>
                {phrase(lang, "تلاش دوباره", "Try again")}
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
