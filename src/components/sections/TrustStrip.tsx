"use client";

import React from "react";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { conditions } from "@/data/conditions";
import { Icon } from "@/components/core/Icon";
import { CountUp, Stagger } from "@/components/motion/primitives";

type Metric = { value: React.ReactNode; label: string };

const metrics: Metric[] = [
  {
    value: (
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
        <CountUp value={clinic.rating.score} decimals={1} />
        <Icon name="star" size={22} color="var(--accent-warm)" style={{ alignSelf: "center" }} />
      </span>
    ),
    label: `Average ${clinic.rating.source} rating`,
  },
  { value: <CountUp value={clinic.rating.count} />, label: `${clinic.rating.source} reviews` },
  { value: <CountUp value={services.length} />, label: "Services offered" },
  { value: <CountUp value={conditions.length} suffix="+" />, label: "Concerns we help with" },
];

/** Rating strip. Numbers count once on entry, then hold. */
export function TrustStrip() {
  return (
    <section style={{ padding: "var(--section-y-tight) 0" }}>
      <div className="container-page">
        <Stagger
          stagger={0.09}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            background: "var(--surface-card)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-sm)",
            overflow: "hidden",
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                padding: "26px 28px",
                borderLeft: i > 0 ? "1px solid var(--border-hairline)" : "none",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "clamp(30px,3.4vw,40px)", lineHeight: 1.05,
                  letterSpacing: "var(--tracking-display)", color: "var(--text-heading)",
                }}
              >
                {m.value}
              </div>
              <div style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", marginTop: 8 }}>
                {m.label}
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
