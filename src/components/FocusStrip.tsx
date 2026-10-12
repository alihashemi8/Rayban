import { Network, Sparkles, Layers, Code2 } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";

export default function FocusStrip({ lang }: { lang: Language }) {
  return (
    <div className="focus-strip">
      <div className="wrap">
        <span>
          {phrase(lang, "حوزه‌های تخصصی فعالیت", "CORE FOCUS AREAS")}
        </span>
        {[
          ["سامانه‌های آموزشی", "Educational platforms"],
          ["هوش مصنوعی کاربردی", "Applied AI"],
          ["وب و اپلیکیشن موبایل", "Web & mobile apps"],
          ["زیرساخت و پایگاه داده", "Data & infrastructure"],
        ].map(([fa, en], i) => (
          <div key={en}>
            {
              [
                <Network key="1" />,
                <Sparkles key="2" />,
                <Layers key="3" />,
                <Code2 key="4" />,
              ][i]
            }
            {phrase(lang, fa, en)}
          </div>
        ))}
      </div>
    </div>
  );
}
