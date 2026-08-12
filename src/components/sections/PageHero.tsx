"use client";

import React from "react";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { EditorialImage } from "@/components/media/EditorialImage";
import { FadeUp, WordReveal } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

export interface Crumb { label: string; href?: string }

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  image?: { src: StaticImageData; alt: string; position?: string };
  /** Side-by-side copy and photograph, versus a centred type-only opener. */
  layout?: "split" | "centered";
  children?: React.ReactNode;
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
        {crumbs.map((c, i) => (
          <li key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {c.href ? (
              <Link href={c.href} style={{ font: "var(--type-meta)", color: "var(--text-muted)" }}>{c.label}</Link>
            ) : (
              <span style={{ font: "var(--type-meta)", color: "var(--text-subtle)" }} aria-current="page">{c.label}</span>
            )}
            {i < crumbs.length - 1 ? (
              <Icon name="chevron-right" size={13} color="var(--text-subtle)" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Shared opener for every inner page. Keeps hierarchy identical across routes. */
export function PageHero({
  eyebrow, title, description, crumbs, image, layout = "split", children,
}: PageHeroProps) {
  const centered = layout === "centered" || !image;

  const copy = (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: centered ? "center" : "flex-start", textAlign: centered ? "center" : "left" }}>
      {crumbs?.length ? <FadeUp><Breadcrumbs crumbs={crumbs} /></FadeUp> : null}

      {eyebrow ? (
        <FadeUp delay={0.05}>
          <span className="t-label" style={{ color: "var(--text-accent)" }}>{eyebrow}</span>
        </FadeUp>
      ) : null}

      <WordReveal
        as="h1"
        className="t-h1"
        text={title}
        immediate
        delay={0.12}
        stagger={0.045}
        style={{ color: "var(--text-heading)" }}
      />

      {description ? (
        <FadeUp delay={0.45}>
          <p className="t-lead" style={{ color: "var(--text-muted)", maxWidth: "var(--measure)" }}>
            {description}
          </p>
        </FadeUp>
      ) : null}

      {children ? <FadeUp delay={0.55}>{children}</FadeUp> : null}
    </div>
  );

  return (
    <section style={{ padding: "clamp(32px,4vw,56px) 0 clamp(40px,5vw,72px)", overflow: "hidden" }}>
      <div className="container-page">
        {centered ? (
          <div style={{ maxWidth: 760, marginInline: "auto" }}>{copy}</div>
        ) : (
          <div className="ds-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
            {copy}
            {image ? (
              <EditorialImage
                src={image.src}
                alt={image.alt}
                position={image.position}
                ratio="4 / 3.4"
                pattern="mask-up"
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
