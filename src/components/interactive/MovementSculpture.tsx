"use client";

import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * An abstract sculpture about alignment — a column of smooth forms following a
 * gentle S-curve, the way a spine actually curves. It is deliberately NOT
 * anatomical: no vertebrae, no skeleton, no medical model. Just a stack of soft
 * volumes that read as balance and articulation.
 *
 * The scene tells the clinic's story rather than decorating around it. On entry
 * the column arrives scattered and out of true, then settles into alignment over
 * about two seconds — the before and after of an assessment, abstracted. Once
 * settled, a slow wave travels down the column so it reads as articulating
 * rather than rigid, and the pointer leans it a few degrees.
 *
 * Every segment is one instance of a single geometry and material, so the whole
 * column costs ONE draw call regardless of segment count. Per-instance colour
 * rides in an instanced attribute rather than in 24 separate materials.
 */

const SEGMENTS = 24;

/** Brand palette, sampled from the design system's teal ramp. */
const TEAL = new THREE.Color("#167C80");
const TEAL_SOFT = new THREE.Color("#8FC9C8");
const TEAL_PALE = new THREE.Color("#DDF3F1");

/** Seconds the misalignment takes to resolve. Slow enough to read as deliberate. */
const SETTLE = 2.1;

type Segment = {
  /** Aligned resting position. */
  rest: THREE.Vector3;
  /** Where the segment starts — offset, rotated, out of true. */
  from: THREE.Vector3;
  fromRotation: THREE.Euler;
  scale: THREE.Vector3;
  color: THREE.Color;
  /** Phase offset so the articulation wave travels rather than pulsing in unison. */
  phase: number;
};

function buildSegments(): Segment[] {
  // Deterministic pseudo-random, so the scene composes identically every load.
  let seed = 0x5eed;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296 - 0.5;
  };

  return Array.from({ length: SEGMENTS }, (_, i) => {
    const t = i / (SEGMENTS - 1);

    // Two gentle opposing curves — the cervical/lumbar relationship, abstracted.
    const y = THREE.MathUtils.lerp(2.5, -2.5, t);
    const x = Math.sin(t * Math.PI * 1.6 + 0.4) * 0.42;
    const z = Math.cos(t * Math.PI * 1.2) * 0.14;

    // Forms broaden toward the base, the way load accumulates downward.
    const width = THREE.MathUtils.lerp(0.34, 0.66, Math.pow(t, 0.8));
    const height = THREE.MathUtils.lerp(0.15, 0.21, t);

    // Colour reads as a gradient down the column, centre-weighted to full teal.
    const mid = 1 - Math.abs(t - 0.5) * 2;
    const color = TEAL_PALE.clone()
      .lerp(TEAL_SOFT, Math.min(1, mid * 1.4))
      .lerp(TEAL, Math.pow(mid, 2) * 0.85);

    return {
      rest: new THREE.Vector3(x, y, z),
      from: new THREE.Vector3(x + rand() * 1.9, y + rand() * 0.5, z + rand() * 1.2),
      fromRotation: new THREE.Euler(rand() * 1.1, rand() * 1.1, rand() * 1.4),
      scale: new THREE.Vector3(width, height, width * 0.85),
      color,
      phase: t * Math.PI * 2.2,
    };
  });
}

/** easeOutExpo — arrives fast, settles long. Matches the site's entrance curve. */
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function Column({
  pointer,
  reduce,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
  reduce: boolean;
}) {
  const mesh = React.useRef<THREE.InstancedMesh>(null);
  const group = React.useRef<THREE.Group>(null);
  const elapsed = React.useRef(0);

  const segments = React.useMemo(buildSegments, []);

  // One rounded volume, reused for every segment.
  const geometry = React.useMemo(() => new THREE.SphereGeometry(1, 20, 14), []);
  const material = React.useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.05 }),
    [],
  );

  // Scratch objects, allocated once — nothing is created inside the frame loop.
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const scratch = React.useMemo(() => new THREE.Vector3(), []);

  // Per-instance colour, uploaded once.
  React.useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    segments.forEach((s, i) => m.setColorAt(i, s.color));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [segments]);

  React.useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    const m = mesh.current;
    const g = group.current;
    if (!m || !g) return;

    // Clamp delta so a backgrounded tab does not resume with a jolt.
    const dt = Math.min(delta, 1 / 30);
    elapsed.current += dt;

    // Reduced motion gets the settled column, held at a considered three-quarter view.
    const settle = reduce ? 1 : easeOutExpo(Math.min(elapsed.current / SETTLE, 1));
    const settled = settle > 0.999;

    // Skip the per-instance write once everything has arrived and nothing is waving.
    if (!settled || !reduce) {
      for (let i = 0; i < segments.length; i++) {
        const s = segments[i];

        scratch.lerpVectors(s.from, s.rest, settle);

        if (!reduce) {
          // Articulation wave — a few millimetres of travel, offset down the column.
          const wave = Math.sin(elapsed.current * 0.9 + s.phase);
          scratch.x += wave * 0.05 * settle;
          scratch.z += Math.cos(elapsed.current * 0.7 + s.phase) * 0.035 * settle;
        }

        dummy.position.copy(scratch);
        dummy.rotation.set(
          s.fromRotation.x * (1 - settle),
          s.fromRotation.y * (1 - settle),
          s.fromRotation.z * (1 - settle),
        );
        dummy.scale.copy(s.scale).multiplyScalar(0.35 + 0.65 * settle);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
      }
      m.instanceMatrix.needsUpdate = true;
    }

    if (reduce) {
      g.rotation.y = 0.5;
      g.rotation.x = 0.04;
      return;
    }

    // Slow idle rotation — one revolution takes roughly forty seconds.
    g.rotation.y += dt * 0.16;

    // Pointer response is intentionally small: a lean, not a look-at.
    const p = pointer.current ?? { x: 0, y: 0 };
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, p.y * 0.18, 3, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, p.x * 0.22, 3, dt);

    // Gentle float, well under the threshold where it reads as bobbing.
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.07;
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={mesh}
        args={[geometry, material, SEGMENTS]}
        frustumCulled={false}
      />
    </group>
  );
}

/**
 * A soft elliptical shadow on the floor plane. Grounds the column so it reads as
 * an object in a room rather than a sprite floating on a gradient. Cheaper by far
 * than a shadow map — one transparent plane, no extra render pass.
 */
function ContactShadow() {
  const texture = React.useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(16,42,46,.34)");
      g.addColorStop(0.55, "rgba(16,42,46,.12)");
      g.addColorStop(1, "rgba(16,42,46,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  React.useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh position={[0, -3.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4.2, 3]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

/** Scroll nudges the camera slightly, so the sculpture has depth as the page moves. */
function ScrollCamera({ progress, reduce }: { progress: React.RefObject<number>; reduce: boolean }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    if (reduce) return;
    const dt = Math.min(delta, 1 / 30);
    const p = progress.current ?? 0;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7.4 - p * 0.9, 2.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, (p - 0.5) * 0.5, 2.5, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export interface MovementSculptureProps {
  reduce?: boolean;
  /** Set false when the section leaves the viewport — stops the render loop entirely. */
  active?: boolean;
}

export default function MovementSculpture({ reduce = false, active = true }: MovementSculptureProps) {
  const pointer = React.useRef({ x: 0, y: 0 });
  const scroll = React.useRef(0);
  const wrap = React.useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    };
  };

  React.useEffect(() => {
    if (reduce) return;

    // Scroll position is read in a rAF rather than in the listener, so the
    // handler never forces layout on the scroll thread.
    let queued = false;
    const measure = () => {
      queued = false;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      scroll.current = Math.min(1, Math.max(0, 1 - (r.top + r.height / 2) / (vh + r.height / 2)));
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  return (
    <div
      ref={wrap}
      onPointerMove={onPointerMove}
      onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Canvas
        // Static frames under reduced motion; otherwise driven only while in view.
        frameloop={reduce ? "demand" : active ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 6, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#DDF3F1" />
        <Column pointer={pointer} reduce={reduce} />
        <ContactShadow />
        <ScrollCamera progress={scroll} reduce={reduce} />
      </Canvas>
    </div>
  );
}
