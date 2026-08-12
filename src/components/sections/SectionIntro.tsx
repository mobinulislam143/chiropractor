"use client";

import React from "react";
import { FadeUp, LineReveal } from "@/components/motion/primitives";

export interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** h2 by default; pass "h1" for page-leading intros. */
  as?: "h1" | "h2";
  className?: string;
  style?: React.CSSProperties;
}

/** The standard section opener: eyebrow, masked heading, optional lead paragraph. */
export function SectionIntro({
  eyebrow, title, description, align = "left", as = "h2", className, style,
}: SectionIntroProps) {
  const centered = align === "center";
  return (
    <div
      className={className}
      style={{
        display: "flex", flexDirection: "column", gap: 14,
        textAlign: align,
        alignItems: centered ? "center" : "flex-start",
        maxWidth: centered ? 720 : 680,
        marginInline: centered ? "auto" : undefined,
        ...style,
      }}
    >
      {eyebrow ? (
        <FadeUp>
          <span className="t-label" style={{ color: "var(--text-accent)" }}>{eyebrow}</span>
        </FadeUp>
      ) : null}

      <LineReveal
        as={as}
        className={as === "h1" ? "t-h1" : "t-h2"}
        style={{ color: "var(--text-heading)" }}
      >
        {title}
      </LineReveal>

      {description ? (
        <FadeUp delay={0.1}>
          <p className="t-lead" style={{ color: "var(--text-muted)", maxWidth: "var(--measure)" }}>
            {description}
          </p>
        </FadeUp>
      ) : null}
    </div>
  );
}
