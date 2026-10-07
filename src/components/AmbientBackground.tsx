import { BrainCircuit, Terminal } from "lucide-react";
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
      : [...symbols, ...symbols].slice(offset, offset + 3);
  return (
    <div className="ambient-background technical-background" aria-hidden="true">
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />
      {shown.map(({ label, image, Icon }, i) => (
        <div
          key={label}
          className={`floating-technology technology-float-${i % 3}`}
          style={{
            top: `${pathname === "/" ? 10 + i * 10 : 18 + i * 30}%`,
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
