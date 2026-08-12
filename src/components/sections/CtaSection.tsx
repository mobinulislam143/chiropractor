"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { Icon } from "@/components/core/Icon";
import { FadeUp, LineReveal } from "@/components/motion/primitives";

export interface CtaSectionProps {
  title?: string;
  body?: string;
  /** Set false on pages where a large photograph would be one image too many. */
  withImage?: boolean;
  /** Which photograph backs the block. Varies by branch so the closing section
   *  doesn't become the same picture on every page. */
  variant?: "lifestyle" | "movement" | "clinic";
}

const CTA_IMAGE = {
  lifestyle: images.lifestyle,
  movement: images.education.back,
  clinic: images.interior.primary,
} as const;

/** Closing conversion block. Ends every page except /book and /contact. */
export function CtaSection({
  title = "Start with an assessment, not a commitment.",
  body = "Book online in under a minute, or call and speak to someone at the front desk today.",
  withImage = true,
  variant = "lifestyle",
}: CtaSectionProps) {
  const photo = CTA_IMAGE[variant];
  return (
    <section style={{ padding: "var(--section-y-tight) 0 var(--section-y)" }}>
      <div className="container-page">
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            background: withImage ? "var(--surface-inverse)" : "var(--surface-tint-soft)",
            border: withImage ? "none" : "1px solid #D8ECE9",
            minHeight: withImage ? 420 : undefined,
            display: "grid",
            placeItems: "center",
          }}
        >
          {withImage ? (
            <>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 900px) 100vw, 1200px"
                placeholder="blur"
                style={{ objectFit: "cover", objectPosition: photo.position }}
              />
              {/* Scrim keeps text legible without washing the photograph out. */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(16,42,46,.34) 0%, rgba(16,42,46,.72) 100%)",
                }}
              />
            </>
          ) : null}

          <div
            style={{
              position: "relative",
              padding: "clamp(40px,6vw,80px) clamp(24px,5vw,64px)",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 20, textAlign: "center",
            }}
          >
            <LineReveal
              as="h2"
              className="t-h1"
              style={{ color: withImage ? "#fff" : "var(--text-heading)", maxWidth: "18ch" }}
            >
              {title}
            </LineReveal>

            <FadeUp delay={0.1}>
              <p
                className="t-lead"
                style={{ color: withImage ? "rgba(255,255,255,.86)" : "var(--text-muted)", maxWidth: "52ch" }}
              >
                {body}
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <Link href="/book" className="btn btn-primary btn-lg">
                  <Icon name="calendar-check" size={19} />
                  Book an Appointment
                </Link>
                <a
                  href={clinic.phone.href}
                  className={withImage ? "btn btn-onaccent btn-lg" : "btn btn-secondary btn-lg"}
                >
                  <Icon name="phone" size={19} />
                  Call {clinic.phone.display}
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
