"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Condition } from "@/data/conditions";
import { images } from "@/data/images";
import { Icon } from "@/components/core/Icon";
import { EASE_ENTRANCE } from "@/components/motion/primitives";
import { Tilt3D, TiltLayer } from "@/components/motion/Tilt3D";

export interface ConditionTileProps {
  condition: Condition;
  /** Tall tile with the photograph behind the copy. */
  tall?: boolean;
  sizes?: string;
}

/**
 * Photograph-led tile with the copy sitting on a scrim. Kept calm and everyday —
 * no anatomical diagrams, no distress imagery.
 */
export function ConditionTile({ condition, tall = false, sizes }: ConditionTileProps) {
  const reduce = useReducedMotion();
  const [hover, setHover] = React.useState(false);
  const img = images.conditions[condition.imageKey];

  return (
    <Tilt3D max={5} lift={12}>
    <Link
      href={`/conditions/${condition.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", display: "block", height: "100%",
        minHeight: tall ? 420 : 280,
        borderRadius: "var(--radius-2xl)", overflow: "hidden",
        textDecoration: "none",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transition: "box-shadow var(--dur-base) var(--ease-out)",
      }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        animate={{ scale: hover && !reduce ? 1.05 : 1 }}
        transition={{ duration: 0.9, ease: EASE_ENTRANCE }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes ?? "(max-width: 900px) 100vw, 33vw"}
          placeholder="blur"
          style={{ objectFit: "cover", objectPosition: img.position }}
        />
      </motion.div>

      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(16,42,46,.12) 30%, rgba(16,42,46,.78) 100%)",
        }}
      />

      <TiltLayer
        depth={34}
        style={{
          position: "relative", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          gap: 8, padding: tall ? 32 : 24,
        }}
      >
        <h3 className={tall ? "t-h3" : "t-h4"} style={{ color: "#fff" }}>{condition.title}</h3>
        <p style={{ font: "var(--type-body-sm)", color: "rgba(255,255,255,.82)", maxWidth: "34ch" }}>
          {condition.summary}
        </p>
        <span
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4,
            font: "var(--type-meta)", fontWeight: 600, color: "#fff",
          }}
        >
          Learn more
          <Icon
            name="arrow-right"
            size={15}
            style={{
              transform: hover && !reduce ? "translateX(3px)" : "none",
              transition: "transform var(--dur-base) var(--ease-out)",
            }}
          />
        </span>
      </TiltLayer>
    </Link>
    </Tilt3D>
  );
}
