import {
  ArrowUpLeft,
  Sparkles,
  Layers,
  LayoutDashboard,
  Search,
  Check,
  BarChart3,
  Bell,
} from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
export default function ProjectVisual({
  type,
  lang,
  title,
}: {
  type: string;
  lang: Language;
  title?: string;
}) {
  if (type === "ai")
    return (
      <div className="project-art ai-art">
        <div className="ai-orbit orbit-one" />
        <div className="ai-orbit orbit-two" />
        <div className="ai-core">
          <Sparkles size={34} strokeWidth={1.2} />
        </div>
        <div className="ai-prompt">
          <Sparkles size={15} />
          <span>
            {phrase(
              lang,
              "یک ایده، هزار مسیر تازه.",
              "One idea. A thousand possibilities.",
            )}
          </span>
          <ArrowUpLeft size={17} />
        </div>
        <span className="art-coordinate">INTELLIGENCE / HUMAN CENTERED</span>
      </div>
    );
  return (
    <div
      className={`project-art ${type === "school" ? "school-art" : "business-art"}`}
    >
      <div className="mini-app">
        <aside>
          <div className="mini-brand">
            <Layers size={18} />
            <b>
              {title ||
                (type === "school"
                  ? phrase(lang, "رایبان", "Rayban")
                  : "workspace")}
            </b>
          </div>
          {[LayoutDashboard, BarChart3, Bell].map((Icon, i) => (
            <div className={`mini-nav ${i === 0 ? "selected" : ""}`} key={i}>
              <Icon size={12} />
              <span>
                {phrase(
                  lang,
                  (type === "school"
                    ? ["نمای کلی", "مسیر یادگیری", "پیام‌ها"]
                    : ["نمای کلی", "عملیات", "رویدادها"])[i],
                  (type === "school"
                    ? ["Overview", "Learning path", "Messages"]
                    : ["Overview", "Operations", "Events"])[i],
                )}
              </span>
            </div>
          ))}
        </aside>
        <div className="mini-main">
          <div className="mini-top">
            <span>{phrase(lang, "نمای کلی", "Overview")}</span>
            <Search size={12} />
          </div>
          <div className="mini-app-title">
            {phrase(
              lang,
              type === "school"
                ? "یک روز تازه، یک قدم جلوتر."
                : "یکپارچه. قابل توسعه. هوشمند.",
              type === "school"
                ? "A new day. A step forward."
                : "Connected. Scalable. Intelligent.",
            )}
          </div>
          <div className="mini-stats">
            {[
              phrase(
                lang,
                type === "school" ? "فعالیت‌ها" : "سرویس‌ها",
                type === "school" ? "Activities" : "Services",
              ),
              phrase(
                lang,
                type === "school" ? "پیشرفت" : "پایداری",
                type === "school" ? "Progress" : "Availability",
              ),
              phrase(
                lang,
                type === "school" ? "مسیرها" : "اتصال‌ها",
                type === "school" ? "Paths" : "Connections",
              ),
            ].map((t, i) => (
              <div key={t}>
                <small>{t}</small>
                <strong>
                  {
                    (type === "school"
                      ? ["۱۲", "۸۶٪", "۰۴"]
                      : ["۰۶", "۹۹٪", "۲۴"])[i]
                  }
                </strong>
                <span className="mini-line" />
              </div>
            ))}
          </div>
          <div className="mini-chart">
            <div className="chart-title">
              {phrase(
                lang,
                type === "school" ? "روند یادگیری" : "عملکرد سیستم",
                type === "school" ? "Learning activity" : "System activity",
              )}
              <span>•••</span>
            </div>
            <div className="chart-bars">
              {[35, 55, 43, 68, 59, 83, 73, 93, 84, 100, 88, 110].map(
                (h, i) => (
                  <i key={i} style={{ height: h }} />
                ),
              )}
            </div>
          </div>
          <div className="mini-bottom">
            <Check size={13} />
            {phrase(
              lang,
              "همه‌چیز در یک مسیر متصل",
              "Everything in one connected flow",
            )}
          </div>
        </div>
      </div>
      <span className="art-coordinate">
        {type === "school"
          ? "CONNECTED LEARNING / 01"
          : "SCALABLE SYSTEMS / 03"}
      </span>
    </div>
  );
}
