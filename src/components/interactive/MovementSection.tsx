"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { FadeUp, LineReveal } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

/**
 * The 3D scene never reaches the initial bundle — it is dynamically imported,
 * client-only, and only after the section is close to the viewport AND the
 * device has earned it (wide enough, not reduced-motion, not save-data).
 */
const MovementSculpture = dynamic(() => import("./MovementSculpture"), {
  ssr: false,
  loading: () => null,
});

/** A still, CSS-only rendering of the same idea. Mobile and reduced-motion get this. */
function SculptureFallback() {
  const rows = Array.from({ length: 16 });
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 6,
      }}
    >
      {rows.map((_, i) => {
        const t = i / (rows.length - 1);
        const mid = 1 - Math.abs(t - 0.5) * 2;
        const width = 48 + Math.pow(t, 0.8) * 46;
        const shift = Math.sin(t * Math.PI * 1.6 + 0.4) * 26;
        return (
          <span
            key={i}
            style={{
              width, height: 12,
              transform: `translateX(${shift}px)`,
              borderRadius: 999,
              background: `color-mix(in srgb, var(--accent) ${18 + mid * 62}%, var(--c-teal-light))`,
            }}
          />
        );
      })}
    </div>
  );
}

export function MovementSection() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [allow3d, setAllow3d] = React.useState(false);

  // Whether this device should run WebGL at all. Re-evaluated on viewport change
  // so rotating a tablet or resizing a window switches renderer instead of
  // stranding the visitor on whichever one happened to match at mount.
  React.useEffect(() => {
    if (reduce) { setAllow3d(false); return; }

    const mq = window.matchMedia("(min-width: 901px)");
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };

    const evaluate = () => setAllow3d(mq.matches && nav.connection?.saveData !== true);
    evaluate();

    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, [reduce]);

  // Mount and run the loop only while the section is near or in the viewport.
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show3d = allow3d && inView;

  return (
    <section
      style={{
        padding: "var(--section-y) 0",
        background: "var(--bg-page-alt)",
        overflow: "hidden",
      }}
    >
      <div className="container-page">
        <div
          className="ds-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          {/* Stage */}
          <div
            ref={ref}
            style={{
              position: "relative",
              minHeight: "min(540px, 76vh)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--border-hairline)",
              background: "linear-gradient(180deg, var(--surface-tint-soft), var(--surface-card))",
              overflow: "hidden",
            }}
          >
            {show3d ? <MovementSculpture reduce={!!reduce} active={inView} /> : <SculptureFallback />}
          </div>

          {/* Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <FadeUp>
              <span className="t-label" style={{ color: "var(--text-accent)" }}>
                Movement &amp; alignment
              </span>
            </FadeUp>

            <LineReveal as="h2" className="t-h2" style={{ color: "var(--text-heading)" }}>
              Better movement starts with understanding how your body moves.
            </LineReveal>

            <FadeUp delay={0.1}>
              <p className="t-lead measure" style={{ color: "var(--text-muted)" }}>
                Your spine is a column of segments that are supposed to share the work. When one
                stops moving well, the ones around it take on more than they should — and that
                redistribution is usually where you feel it.
              </p>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="measure" style={{ color: "var(--text-muted)" }}>
                It is why the sore spot and the restricted spot are so often different places, and
                why we assess how each segment moves before we treat anything.
              </p>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
                <Link href="/about" className="btn btn-primary">
                  Explore Our Approach
                  <Icon name="arrow-right" size={18} />
                </Link>
                <Link href="/conditions" className="btn btn-secondary">
                  What we help with
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
