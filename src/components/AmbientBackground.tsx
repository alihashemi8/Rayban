import { BrainCircuit, Terminal, Cpu, Binary, Braces, Workflow, CircuitBoard } from "lucide-react";
import { useLocation } from "react-router-dom";
const symbols = [
  { label: "Docker", image: "/brands/docker.svg" },
  { label: "React", image: "/brands/react.svg" },
  { label: "Python", image: "/brands/python.svg" },
  { label: "GitHub", image: "/brands/github.svg" },
  { label: "TypeScript", image: "/brands/typescript.svg" },
  { label: "AI", Icon: BrainCircuit },
  { label: "Kubernetes", image: "/brands/kubernetes.svg" },
  { label: "PostgreSQL", image: "/brands/postgresql.svg" },
  { label: "Terminal", Icon: Terminal },
  { label: "Inference", Icon: Cpu },
  { label: "Algorithms", Icon: Binary },
  { label: "API", Icon: Braces },
  { label: "Neural network", Icon: Workflow },
  { label: "Computing", Icon: CircuitBoard },
];
const snippets = [
  { file: "intelligence.ts", lines: ["const future = await", "rayban.build({", "  ideas: ∞,", "  intelligence: true", "});"], status: "FROM IDEA TO IMPACT" },
  { file: "model.py", lines: ["from torch import nn", "model = NeuralCore()", "with inference_mode():", "  output = model(ideas)"], status: "NEURAL ENGINE / ONLINE" },
  { file: "deploy.yml", lines: ["services:", "  intelligence:", "    image: rayban/core", "    replicas: 3", "    health: ready"], status: "BUILD · SHIP · SCALE" },
  { file: "pipeline.ts", lines: ["const insight = data", "  .map(understand)", "  .filter(relevant)", "  .connect(human);"], status: "HUMAN × MACHINE" },
];
export default function AmbientBackground() {
  const { pathname } = useLocation();
  const offset = pathname.startsWith("/projects")
    ? 3
    : pathname.startsWith("/team")
      ? 5
      : 1;
  const shown =
    pathname === "/"
      ? symbols
      : [...symbols, ...symbols].slice(offset, offset + 5);
  return (
    <div className="ambient-background technical-background" aria-hidden="true">
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />
      {(pathname === "/" ? snippets : snippets.slice(0, 2)).map((snippet, i) => (
        <div
          key={snippet.file}
          className="ambient-code-card"
          dir="ltr"
          style={{ top: `${pathname === "/" ? 19 + i * 23 : 28 + i * 45}%`, left: i % 2 ? "76%" : "2%", animationDelay: `-${i * 5}s` }}
        >
          <div className="ambient-code-title"><span><i /><i /><i /></span>{snippet.file}</div>
          <pre>{snippet.lines.map((line, index) => <span key={line}>{line}{index < snippet.lines.length - 1 ? "\n" : ""}</span>)}</pre>
          <small><i />{snippet.status}</small>
        </div>
      ))}
      {shown.map(({ label, image, Icon }, i) => (
        <div
          key={label}
          className={`floating-technology technology-float-${i % 3}`}
          style={{
            top: `${pathname === "/" ? 5 + i * 6.7 : 12 + i * 17}%`,
            left: i % 2 ? "82%" : "5%",
            animationDelay: `-${i * 3}s`,
          }}
        >
          {image ? (
            <img src={image} alt="" width="78" height="78" />
          ) : (
            Icon && <Icon size={78} strokeWidth={0.8} />
          )}
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
