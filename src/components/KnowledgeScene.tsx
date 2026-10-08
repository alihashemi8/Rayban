import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import logoShapes from "../assets/rayban-logo-shapes.json";
import type { Theme } from "./Header";

function RaybanLogo({ theme }: { theme: Theme }) {
  const geometry = useMemo(() => {
    const contours: { outline: number[][]; holes: number[][][] }[] = logoShapes;
    const shapes = contours.map(({ outline, holes }) => {
      const shape = new THREE.Shape(
        outline.map(([x, y]) => new THREE.Vector2(x, y)),
      );
      holes.forEach((hole) =>
        shape.holes.push(
          new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))),
        ),
      );
      return shape;
    });
    const solid = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.012,
      bevelSegments: 2,
      steps: 1,
    });
    solid.translate(0, 0, -0.08);
    solid.computeVertexNormals();
    return solid;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const light = theme === "light";
  return (
    <mesh geometry={geometry} rotation={[0, -0.22, 0.15]} scale={1.25}>
      <meshStandardMaterial
        attach="material-0"
        color={light ? "#426798" : "#c4e5ff"}
        metalness={0.55}
        roughness={0.25}
        emissive={light ? "#253d65" : "#668abf"}
        emissiveIntensity={light ? 0.08 : 0.2}
      />
      <meshStandardMaterial
        attach="material-1"
        color={light ? "#203a65" : "#466ca6"}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

function NeuralCore({ reduced, theme }: { reduced: boolean; theme: Theme }) {
  const light = theme === "light";
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 140; i++) {
      const y = 1 - (i / 139) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      points.push(
        new THREE.Vector3(
          Math.cos(theta) * r,
          y,
          Math.sin(theta) * r,
        ).multiplyScalar(1.92),
      );
    }
    const connections: number[] = [];
    points.forEach((a, i) =>
      points.forEach((b, j) => {
        if (j > i && a.distanceTo(b) < 0.63)
          connections.push(...a.toArray(), ...b.toArray());
      }),
    );
    const nodes = new THREE.BufferGeometry().setFromPoints(points);
    const lines = new THREE.BufferGeometry();
    lines.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connections, 3),
    );
    const ribbons = [0, 1, 2].map((offset) => {
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 100 }, (_, i) => {
          const a = (i / 99) * Math.PI * 2;
          return new THREE.Vector3(
            Math.cos(a) * 2.5,
            Math.sin(a) * 2.5,
            Math.sin(a * 2 + offset) * 0.25,
          );
        }),
        true,
      );
      return new THREE.TubeGeometry(
        curve,
        128,
        offset === 0 ? 0.026 : 0.013,
        6,
        true,
      );
    });
    return { nodes, lines, ribbons };
  }, []);
  useEffect(
    () => () => {
      geometry.nodes.dispose();
      geometry.lines.dispose();
      geometry.ribbons.forEach((g) => g.dispose());
    },
    [geometry],
  );
  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) invalidate();
    }, 1000 / 24);
    return () => window.clearInterval(timer);
  }, [reduced, invalidate]);
  useFrame(({ clock, pointer }) => {
    if (!group.current || reduced) return;
    group.current.rotation.y =
      Math.sin(clock.elapsedTime * 0.3) * 0.32 + pointer.x * 0.12;
    group.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.18) * 0.08 + pointer.y * 0.08;
  });
  return (
    <group ref={group} rotation={[0.12, 0.2, -0.15]}>
      <RaybanLogo theme={theme} />
      <mesh>
        <sphereGeometry args={[1.82, 48, 32]} />
        <meshPhysicalMaterial
          color={light ? "#a8c6ed" : "#2044a6"}
          metalness={light ? 0.25 : 0.55}
          roughness={light ? 0.3 : 0.16}
          transparent
          opacity={light ? 0.32 : 0.22}
          clearcoat={1}
          side={THREE.FrontSide}
          iridescence={light ? 0.25 : 1}
          iridescenceIOR={1.6}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.75, 32, 24]} />
        <meshBasicMaterial
          color={light ? "#5f82bd" : "#5586ff"}
          wireframe
          transparent
          opacity={light ? 0.07 : 0.035}
        />
      </mesh>
      <points geometry={geometry.nodes}>
        <pointsMaterial
          color={light ? "#365f9e" : "#a1efff"}
          size={0.036}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
      <lineSegments geometry={geometry.lines}>
        <lineBasicMaterial
          color={light ? "#537cba" : "#4384ed"}
          transparent
          opacity={light ? 0.45 : 0.35}
        />
      </lineSegments>
      {geometry.ribbons.map((geo, i) => (
        <mesh
          key={i}
          geometry={geo}
          rotation={
            [
              [0.7, 0.2, 0.6],
              [-0.6, 0.3, -0.8],
              [0.4, 0.8, 0.1],
            ][i] as [number, number, number]
          }
        >
          <meshStandardMaterial
            color={
              light
                ? i === 1
                  ? "#7c68aa"
                  : "#486fb1"
                : i === 1
                  ? "#a39aff"
                  : "#62d9ff"
            }
            emissive={
              light
                ? i === 1
                  ? "#6a5694"
                  : "#3c619e"
                : i === 1
                  ? "#7c5eff"
                  : "#3ab7ff"
            }
            emissiveIntensity={light ? 0.2 : 2}
            metalness={0.7}
            roughness={0.22}
          />
        </mesh>
      ))}
      {[
        [-2.38, 0.8, 0.6],
        [1.9, -1.55, 0.6],
        [1.8, 1.5, -0.4],
        [-1, -2.3, -0.4],
      ].map((p, i) => (
        <mesh position={p as [number, number, number]} key={i}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial
            color={
              light
                ? i % 2
                  ? "#826bb2"
                  : "#4f78b8"
                : i % 2
                  ? "#ba9aff"
                  : "#72e3ff"
            }
          />
        </mesh>
      ))}
    </group>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="neural-still">
        <div className="neural-shell" />
        <div className="neural-ring ring-a" />
        <div className="neural-ring ring-b" />
        <img className="scene-fallback-logo" src="/raiban-logo.webp" alt="" />
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function KnowledgeScene({
  reduced,
  theme,
  onReady,
}: {
  reduced: boolean;
  theme: Theme;
  onReady: () => void;
}) {
  const light = theme === "light";
  return (
    <SceneBoundary>
      <Canvas
        onCreated={onReady}
        dpr={[1, 1.35]}
        frameloop="demand"
        camera={{ position: [0, 0, 8.6], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        aria-hidden="true"
      >
        <ambientLight intensity={light ? 2 : 1.8} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={light ? 3 : 5}
          color={light ? "#e4efff" : "#73c9ff"}
        />
        <directionalLight
          position={[-4, -2, 3]}
          intensity={light ? 2 : 4}
          color={light ? "#ccc7e9" : "#946cff"}
        />
        <NeuralCore reduced={reduced} theme={theme} />
      </Canvas>
    </SceneBoundary>
  );
}
