"use client";

import React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export interface Tilt3DProps {
  children: React.ReactNode;
  /** Maximum rotation in degrees at the corners. Keep under 10 — past that it reads as a gimmick. */
  max?: number;
  /** Perspective depth. Lower is a stronger, more obvious 3D. */
  perspective?: number;
  /** Pixels the card lifts toward the viewer on hover. */
  lift?: number;
  /** Renders a moving specular sheen across the surface. Off for text-heavy panels. */
  glare?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Applied to the inner transformed element rather than the tracking wrapper. */
  innerStyle?: React.CSSProperties;
}

const SPRING = { stiffness: 150, damping: 20, mass: 0.35, restDelta: 0.0005 };

/**
 * Pointer-tracked perspective tilt.
 *
 * The whole surface rotates about its own centre while children can opt into
 * parallax depth via `translateZ` (see `.tilt-layer` in globals.css). It is a
 * genuine 3D transform rather than a scale, which is what makes the card feel
 * like an object on a table instead of a picture that got bigger.
 *
 * Everything is CSS transform and opacity, so it stays on the compositor and
 * costs no layout. Under `prefers-reduced-motion` the wrapper renders flat.
 */
export function Tilt3D({
  children, max = 7, perspective = 1000, lift = 6, glare = false, className, style, innerStyle,
}: Tilt3DProps) {
  const reduce = useReducedMotion();
  const [hover, setHover] = React.useState(false);

  // Normalised pointer position, -1 → 1 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateY = useTransform(sx, [-1, 1], [-max, max]);
  const rotateX = useTransform(sy, [-1, 1], [max, -max]);

  // Sheen follows the pointer so the highlight reads as a light source, not a gradient.
  // Composed unconditionally — hooks cannot sit behind the `glare` flag.
  const glareX = useTransform(sx, [-1, 1], [18, 82]);
  const glareY = useTransform(sy, [-1, 1], [18, 82]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(38% 46% at ${x}% ${y}%, rgba(255,255,255,.85), rgba(255,255,255,0) 70%)`,
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const reset = () => {
    setHover(false);
    px.set(0);
    py.set(0);
  };

  if (reduce) {
    return <div className={className} style={{ ...style, ...innerStyle }}>{children}</div>;
  }

  return (
    <div
      className={className}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={reset}
      style={{ perspective, height: "100%", ...style }}
    >
      <motion.div
        style={{
          position: "relative",
          height: "100%",
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          ...innerStyle,
        }}
        animate={{ z: hover ? lift : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}

        {glare ? (
          <motion.span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              mixBlendMode: "soft-light",
              opacity: hover ? 1 : 0,
              transition: "opacity var(--dur-base) var(--ease-out)",
              background: glareBg,
            }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}

export interface TiltLayerProps {
  children: React.ReactNode;
  /** Pixels toward the viewer. 20–60 for content, 0 for the card surface itself. */
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Lifts its children off the tilting surface so the card gains real parallax depth. */
export function TiltLayer({ children, depth = 30, className, style }: TiltLayerProps) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}
