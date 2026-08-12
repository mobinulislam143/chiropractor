"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { Icon } from "@/components/core/Icon";
import { EASE_ENTRANCE, WordReveal } from "@/components/motion/primitives";

const HEADLINE = ["Feel Better.", "Move Better.", "Live Better."];

/**
 * Entrance runs on a single timeline: eyebrow, then headline lines word by word,
 * then paragraph, CTAs and proof. The photograph resolves in parallel on a slower
 * curve — clip-path wipe plus a 1.04→1 settle — so the two halves of the
 * composition arrive together without moving in lockstep.
 *
 * Once settled, the image responds to the pointer by a few pixels. Nothing loops.
 */
export function Hero() {
  const reduce = useReducedMotion();

  // Pointer → spring → a small translate plus a genuine perspective rotation.
  // Travel stays under 12px and rotation under 6°, which is the difference
  // between the frame reading as an object in the room and as a gimmick.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const imgX = useTransform(sx, [-1, 1], [10, -10]);
  const imgY = useTransform(sy, [-1, 1], [8, -8]);
  const rotY = useTransform(sx, [-1, 1], [-5.5, 5.5]);
  const rotX = useTransform(sy, [-1, 1], [4.5, -4.5]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const t = (delay: number) => ({ duration: 0.7, ease: EASE_ENTRANCE, delay: reduce ? 0 : delay });

  return (
    <section style={{ padding: "clamp(36px,5vw,72px) 0 clamp(48px,6vw,88px)", overflow: "hidden" }}>
      <div className="container-page">
        <div
          className="ds-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "1.02fr .98fr",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "center",
          }}
        >
          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <motion.span
              data-reveal
              className="t-label"
              style={{ color: "var(--text-accent)", display: "block" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.05)}
            >
              {clinic.neighborhood} <span aria-hidden="true">•</span> {clinic.city}
            </motion.span>

            <h1
              className="t-display"
              style={{ color: "var(--text-heading)", display: "flex", flexDirection: "column" }}
            >
              {HEADLINE.map((line, i) => (
                <WordReveal
                  key={line}
                  text={line}
                  immediate
                  delay={reduce ? 0 : 0.18 + i * 0.14}
                  stagger={0.05}
                  style={{ display: "block" }}
                />
              ))}
            </h1>

            <motion.p
              data-reveal
              className="t-lead"
              style={{ color: "var(--text-muted)", maxWidth: "46ch" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.62)}
            >
              Personalized chiropractic care in {clinic.neighborhood}. Every visit starts with a
              real assessment — we tell you what we find in plain language, and only then talk
              about treatment.
            </motion.p>

            <motion.div
              style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.74, staggerChildren: reduce ? 0 : 0.08 }}
            >
              {[
                <Link key="book" href="/book" className="btn btn-primary btn-lg">
                  <Icon name="calendar-check" size={19} />
                  Book an Appointment
                </Link>,
                <a key="call" href={clinic.phone.href} className="btn btn-secondary btn-lg">
                  <Icon name="phone" size={19} />
                  Call {clinic.phone.display}
                </a>,
              ].map((el, i) => (
                <motion.div
                  key={i}
                  data-reveal
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={t(0.78 + i * 0.08)}
                >
                  {el}
                </motion.div>
              ))}
            </motion.div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 26px", marginTop: 2 }}>
              {[
                { icon: "star", color: "var(--accent-warm)", text: `${clinic.rating.score} ${clinic.rating.source} rating` },
                { icon: "check", color: undefined, text: `${clinic.rating.count} reviews` },
                { icon: "map-pin", color: undefined, text: `${clinic.city}, ${clinic.state}` },
              ].map((m, i) => (
                <motion.span
                  key={m.text}
                  data-reveal
                  className="t-meta"
                  style={{ display: "flex", gap: 7, alignItems: "center", color: "var(--text-subtle)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={t(0.94 + i * 0.07)}
                >
                  <Icon name={m.icon} size={14} color={m.color} />
                  {m.text}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Photograph ───────────────────────────────────────────────── */}
          <motion.div
            onPointerMove={onMove}
            onPointerLeave={() => { mx.set(0); my.set(0); }}
            style={{
              position: "relative",
              perspective: 1200,
              transformStyle: "preserve-3d",
              x: reduce ? 0 : imgX,
              y: reduce ? 0 : imgY,
              rotateX: reduce ? 0 : rotX,
              rotateY: reduce ? 0 : rotY,
            }}
          >
            <motion.figure
              data-reveal
              style={{
                margin: 0,
                position: "relative",
                aspectRatio: "4 / 4.6",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                background: "var(--surface-tint-soft)",
                boxShadow: "var(--shadow-lg)",
                transformStyle: "preserve-3d",
              }}
              initial={reduce ? undefined : { clipPath: "inset(6% 6% 6% 6% round 22px)" }}
              animate={reduce ? undefined : { clipPath: "inset(0% 0% 0% 0% round 22px)" }}
              transition={{ duration: 1.15, ease: EASE_ENTRANCE, delay: reduce ? 0 : 0.15 }}
            >
              <motion.div
                data-reveal
                style={{ position: "absolute", inset: 0 }}
                initial={reduce ? undefined : { scale: 1.04 }}
                animate={reduce ? undefined : { scale: 1 }}
                transition={{ duration: 1.4, ease: EASE_ENTRANCE, delay: reduce ? 0 : 0.15 }}
              >
                <Image
                  src={images.hero.primary.src}
                  alt={images.hero.primary.alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 48vw"
                  placeholder="blur"
                  style={{ objectFit: "cover", objectPosition: images.hero.primary.position }}
                />
              </motion.div>
            </motion.figure>

            {/* Floating proof card — anchored to the frame, never over a face. */}
            <motion.div
              data-reveal
              className="ds-hero-badge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(1.05)}
              style={{
                position: "absolute", left: -18, bottom: 28,
                background: "var(--surface-card)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-lg)",
                padding: "16px 20px",
                display: "flex", alignItems: "center", gap: 14,
                // Sits well in front of the photograph, so the two separate as
                // the frame rotates instead of moving as one flat sheet.
                transform: reduce ? undefined : "translateZ(58px)",
              }}
            >
              <span
                style={{
                  width: 42, height: 42, borderRadius: "var(--radius-pill)",
                  background: "var(--accent-quiet)", color: "var(--c-teal-ink)",
                  display: "grid", placeItems: "center",
                }}
              >
                <Icon name="calendar-check" size={20} />
              </span>
              <span>
                <span style={{ display: "block", font: "var(--type-body-sm)", fontWeight: 600, color: "var(--text-heading)" }}>
                  Most insurance accepted
                </span>
                <span style={{ display: "block", font: "var(--type-meta)", color: "var(--text-subtle)" }}>
                  Benefits checked before you arrive
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
