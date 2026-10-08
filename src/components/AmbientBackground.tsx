import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  BrainCircuit,
  Terminal,
  Cpu,
  Binary,
  Braces,
  Workflow,
  CircuitBoard,
  GitBranch,
  Database,
  Cloud,
  Code2,
  Boxes,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const logos = [
  { label: "PyTorch", image: "/brands/pytorch.svg" },
  { label: "Linux", image: "/brands/linux.svg" },
  { label: "TensorFlow", image: "/brands/tensorflow.svg" },
  { label: "Tailwind CSS", image: "/brands/tailwindcss.svg" },
  { label: "HTML5", image: "/brands/html5.svg" },
  { label: "CSS", image: "/brands/css.svg" },
  { label: "Vite", image: "/brands/vite.svg" },
  { label: "Wireshark", image: "/brands/wireshark.svg" },
  { label: "React", image: "/brands/react.svg" },
  { label: "Python", image: "/brands/python.svg" },
  { label: "OpenSSL", image: "/brands/openssl.svg" },
  { label: "Keras", image: "/brands/keras.svg" },
  { label: "Docker", image: "/brands/docker.svg" },
  { label: "ONNX", image: "/brands/onnx.svg" },
  { label: "Git", image: "/brands/git.svg" },
  { label: "JavaScript", image: "/brands/javascript.svg" },
  { label: "Kubernetes", image: "/brands/kubernetes.svg" },
  { label: "Scikit-learn", image: "/brands/scikitlearn.svg" },
  { label: "Kali Linux", image: "/brands/kalilinux.svg" },
  { label: "TypeScript", image: "/brands/typescript.svg" },
  { label: "NumPy", image: "/brands/numpy.svg" },
  { label: "PostgreSQL", image: "/brands/postgresql.svg" },
  { label: "OpenVPN", image: "/brands/openvpn.svg" },
  { label: "Node.js", image: "/brands/nodedotjs.svg" },
  { label: "Jupyter", image: "/brands/jupyter.svg" },
  { label: "Pandas", image: "/brands/pandas.svg" },
  { label: "Cloudflare", image: "/brands/cloudflare.svg" },
  { label: "GitHub", image: "/brands/github.svg" },
  { label: "Nginx", image: "/brands/nginx.svg" },
  { label: "Vue.js", image: "/brands/vuedotjs.svg" },
  { label: "Cilium", image: "/brands/cilium.svg" },
  { label: "SciPy", image: "/brands/scipy.svg" },
  { label: "Ubuntu", image: "/brands/ubuntu.svg" },
  { label: "Redis", image: "/brands/redis.svg" },
  { label: "OWASP", image: "/brands/owasp.svg" },
  { label: "FastAPI", image: "/brands/fastapi.svg" },
  { label: "Grafana", image: "/brands/grafana.svg" },
  { label: "Prometheus", image: "/brands/prometheus.svg" },
  { label: "Debian", image: "/brands/debian.svg" },
  { label: "Ansible", image: "/brands/ansible.svg" },
  { label: "Vercel", image: "/brands/vercel.svg" },
  { label: "Apache Kafka", image: "/brands/apachekafka.svg" },
];
const symbols = [
  { label: "AI", Icon: BrainCircuit },
  { label: "Terminal", Icon: Terminal },
  { label: "Inference", Icon: Cpu },
  { label: "Algorithms", Icon: Binary },
  { label: "API", Icon: Braces },
  { label: "Neural network", Icon: Workflow },
  { label: "Computing", Icon: CircuitBoard },
  { label: "Git branches", Icon: GitBranch },
  { label: "Database", Icon: Database },
  { label: "Cloud", Icon: Cloud },
  { label: "Source code", Icon: Code2 },
  { label: "Containers", Icon: Boxes },
];
const snippets = [
  {
    file: "intelligence.ts",
    lines: [
      "const future = await",
      "rayban.build({",
      "  ideas: ∞,",
      "  intelligence: true",
      "});",
    ],
    status: "FROM IDEA TO IMPACT",
  },
  {
    file: "model.py",
    lines: [
      "from torch import nn",
      "model = NeuralCore()",
      "with inference_mode():",
      "  output = model(ideas)",
    ],
    status: "NEURAL ENGINE / ONLINE",
  },
  {
    file: "deploy.yml",
    lines: [
      "services:",
      "  intelligence:",
      "    image: rayban/core",
      "    replicas: 3",
      "    health: ready",
    ],
    status: "BUILD · SHIP · SCALE",
  },
  {
    file: "pipeline.ts",
    lines: [
      "const insight = data",
      "  .map(understand)",
      "  .filter(relevant)",
      "  .connect(human);",
    ],
    status: "HUMAN × MACHINE",
  },
  {
    file: "query.sql",
    lines: [
      "SELECT ideas, impact",
      "FROM possibilities",
      "WHERE meaningful = true",
      "ORDER BY tomorrow;",
    ],
    status: "QUERY / CONNECTED",
  },
  {
    file: "interface.tsx",
    lines: [
      "export const Product = () => (",
      "  <Experience",
      "    humanCentered",
      "    poweredBy={ideas}",
      "  />",
      ");",
    ],
    status: "DESIGN × ENGINEERING",
  },
  {
    file: "terminal",
    lines: [
      "$ git checkout -b tomorrow",
      "$ npm run build",
      "✓ compiled successfully",
      "$ ship --with-purpose",
    ],
    status: "BRANCH / TOMORROW",
  },
];
const placements = [
  { x: 8, y: 95 },
  { x: 31, y: 195 },
  { x: 56, y: 80 },
  { x: 88, y: 220 },
  { x: 15, y: 605 },
  { x: 68, y: 745 },
];
const bandHeight = 920;
const logosPerBand = 4;

export default function AmbientBackground() {
  const { pathname } = useLocation();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const estimatedBands = pathname === "/" ? 7 : 2;
  const [measured, setMeasured] = useState({ pathname, count: estimatedBands });
  const bands =
    measured.pathname === pathname ? measured.count : estimatedBands;

  useEffect(() => {
    const shell = backgroundRef.current?.parentElement;
    if (!shell || typeof ResizeObserver === "undefined") return;
    // Absolute decorations do not affect the observed height. Each route and
    // expanding section keeps the same density without adding page scroll space.
    const observer = new ResizeObserver(([entry]) => {
      const count = Math.max(
        1,
        Math.ceil(entry.contentRect.height / bandHeight),
      );
      setMeasured((previous) =>
        previous.pathname === pathname && previous.count === count
          ? previous
          : { pathname, count },
      );
    });
    observer.observe(shell);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      ref={backgroundRef}
      className="ambient-background technical-background"
      aria-hidden="true"
    >
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />
      {Array.from({ length: bands }, (_, band) => {
        const snippet = snippets[band % snippets.length];
        return (
          <div
            className={`ambient-band ambient-band-${band % 2}${band === 0 ? " ambient-band-first" : ""}`}
            key={band}
            style={{ top: band * bandHeight }}
          >
            <svg
              className="ambient-circuit"
              viewBox="0 0 1200 920"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0 330h108l54 54h145m-199-54v-86h92M1200 490h-128l-65-65H842m230 65v108h-78M180 920v-93l58-58h134M745 0v106l66 66h122" />
              <path
                className="circuit-dotted"
                d="M308 384h130m404 41H727M372 769h102M933 172h102"
              />
              {[
                [200, 244],
                [308, 384],
                [842, 425],
                [994, 598],
                [372, 769],
                [933, 172],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
              ))}
            </svg>
            {placements.map(({ x, y }, index) => {
              const position = {
                "--ambient-x": `${band % 2 ? 100 - x : x}%`,
                "--ambient-y": `${y}px`,
                "--ambient-turn": `${index % 2 ? 12 : -11}deg`,
                animationDelay: `-${band * 3 + index * 2}s`,
              } as CSSProperties;
              // Walk the catalogue once. Extra-long pages use abstract symbols
              // after it is exhausted instead of repeating brand marks.
              const logo =
                index % 3 !== 2
                  ? logos[band * logosPerBand + index - Math.floor(index / 3)]
                  : undefined;
              const { Icon, label } =
                symbols[(band * 2 + Math.floor(index / 3)) % symbols.length];
              return (
                <div
                  className={`floating-technology ambient-symbol-${index}`}
                  key={index}
                  style={position}
                >
                  {logo ? (
                    <img
                      src={logo.image}
                      alt=""
                      width="78"
                      height="78"
                      loading="lazy"
                    />
                  ) : (
                    <Icon size={78} strokeWidth={0.85} />
                  )}
                  <span>{logo ? logo.label : label}</span>
                </div>
              );
            })}
            <div
              className="ambient-code-card"
              dir="ltr"
              style={
                {
                  "--ambient-x": band % 2 ? "25%" : "75%",
                  "--ambient-y": "410px",
                } as CSSProperties
              }
            >
              <div className="ambient-code-title">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                {snippet.file}
              </div>
              <pre>
                {snippet.lines.map((line, index) => (
                  <span key={`${index}-${line}`}>
                    {line}
                    {index < snippet.lines.length - 1 ? "\n" : ""}
                  </span>
                ))}
              </pre>
              <small>
                <i />
                {snippet.status}
              </small>
            </div>
            <div
              className="ambient-code-glyph"
              dir="ltr"
              style={
                {
                  "--ambient-x": band % 2 ? "70%" : "32%",
                  "--ambient-y": "420px",
                } as CSSProperties
              }
            >
              <span>{["</>", "{ }", "01", "=>"][band % 4]}</span>
              <small>
                {
                  [
                    "CREATE · ITERATE",
                    "API / CONNECTED",
                    "THINK IN SYSTEMS",
                    "COMMIT · BUILD",
                  ][band % 4]
                }
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}
