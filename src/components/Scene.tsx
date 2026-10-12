import { lazy, Suspense, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Sparkles, Network } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import type { Theme } from "./Header";

const KnowledgeScene = lazy(() => import("./KnowledgeScene"));

export default function Scene({ lang, theme }: { lang: Language; theme: Theme }) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setReady(true), 1600);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    const el = document.querySelector(".knowledge-scene");
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`knowledge-scene${ready && visible && canvasReady ? " scene-live" : ""}`}
      aria-label={phrase(
        lang,
        "هسته سه‌بعدی هوش مصنوعی رایبان",
        "Rayban three-dimensional intelligence core",
      )}
    >
      <div className="scene-grid" />
      <div className="scene-kicker" dir="ltr">
        <span className="signal-dot" />
        RAYBAN INTELLIGENCE CORE<span>01 / ∞</span>
      </div>
      <div className="scene-canvas">
        {ready && visible ? (
          <Suspense
            fallback={
              <div className="neural-still">
                <div className="neural-shell" />
                <div className="neural-ring ring-a" />
                <div className="neural-ring ring-b" />
                <div className="neural-ring ring-c" />
              </div>
            }
          >
            <KnowledgeScene reduced={!!reduced} theme={theme} onReady={() => setCanvasReady(true)} />
          </Suspense>
        ) : (
          <div className="neural-still">
            <div className="neural-shell" />
            <div className="neural-ring ring-a" />
            <div className="neural-ring ring-b" />
            <div className="neural-ring ring-c" />
          </div>
        )}
      </div>
      <div className="core-emblem">
        <img src="/rayban-logo.svg" alt="" width="140" height="140" />
        <span>RAYBAN / CORE</span>
      </div>
      <div className="floating-code" dir="ltr">
        <div>
          <i />
          <i />
          <i />
          <span>intelligence.ts</span>
        </div>
        <code>
          <em>const</em> future = <b>await</b>
          <br />
          rayban.<strong>build</strong>({"{"}
          <br />
          &nbsp; ideas: <span>∞</span>,<br />
          &nbsp; intelligence: <span>true</span>
          <br />
          {"}"});
        </code>
        <small>
          <span /> FROM POSSIBILITY TO PRODUCT
        </small>
      </div>
      <div className="floating-insight" dir="ltr">
        <Sparkles size={16} />
        <div>
          <small>NEURAL ENGINE</small>
          <strong>Ideas. Connected.</strong>
        </div>
        <div className="insight-bars">
          {[12, 24, 18, 32, 23, 36, 28, 20].map((h, i) => (
            <i key={i} style={{ height: h }} />
          ))}
        </div>
      </div>
      <span className="node-label node-one">
        <span />
        {phrase(lang, "مهندسی نرم‌افزار", "Software engineering")}
        <small>&lt;/&gt;</small>
      </span>
      <span className="node-label node-two">
        <span />
        {phrase(lang, "هوش مصنوعی", "Artificial intelligence")}
        <small>AI</small>
      </span>
      <div className="ai-label">
        <Sparkles size={12} />
        {phrase(
          lang,
          "از ایده تا یک دنیای هوشمندتر",
          "From an idea to a more intelligent world",
        )}
      </div>
      <div className="scene-bottom">
        <span dir="ltr">HUMAN VISION × MACHINE INTELLIGENCE</span>
        <Network size={16} />
      </div>
    </div>
  );
}
