"use client";

import React from "react";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { conditions } from "@/data/conditions";
import { testimonials } from "@/data/testimonials";
import { homepageFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { Icon } from "@/components/core/Icon";
import { EditorialImage } from "@/components/media/EditorialImage";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ServiceTile } from "@/components/content/ServiceTile";
import { ConditionTile } from "@/components/content/ConditionTile";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { FadeUp, Parallax, Stagger } from "@/components/motion/primitives";

/* ── Conditions ─────────────────────────────────────────────────────────────── */

export function ConditionsPreview() {
  const [lead, ...rest] = conditions.slice(0, 5);
  return (
    <section id="conditions" style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
      <div className="container-page">
        <SectionIntro
          eyebrow="Conditions"
          title="What we help with"
          description="If your concern isn't listed, call us — we'll tell you honestly whether chiropractic is the right route for it."
        />

        <div className="ds-cond-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 18, marginTop: 44 }}>
          <FadeUp>
            <ConditionTile condition={lead} tall sizes="(max-width: 900px) 100vw, 55vw" />
          </FadeUp>

          <Stagger stagger={0.08} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {rest.map((c) => (
              <ConditionTile key={c.slug} condition={c} sizes="(max-width: 900px) 50vw, 25vw" />
            ))}
          </Stagger>
        </div>

        <FadeUp delay={0.1}>
          <div style={{ marginTop: 32 }}>
            <Link href="/conditions" className="btn btn-secondary">
              View all conditions
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Approach ───────────────────────────────────────────────────────────────── */

export function ApproachSection() {
  return (
    <section id="approach" style={{ padding: "var(--section-y) 0" }}>
      <div className="container-page">
        <div className="ds-split" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
          <Parallax distance={26}>
            <EditorialImage
              src={images.about.primary.src}
              alt={images.about.primary.alt}
              position={images.about.primary.position}
              ratio="4 / 5"
              pattern="mask-left"
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </Parallax>

          <div>
            <SectionIntro
              eyebrow="Our approach"
              title="Three steps, every time"
              description="No guessing what happens next, and no treatment plan you didn't agree to."
            />

            <Stagger stagger={0.1} style={{ display: "grid", gap: 4, marginTop: 36 }}>
              {clinic.approach.map((a) => (
                <div
                  key={a.step}
                  style={{
                    display: "grid", gridTemplateColumns: "auto 1fr", gap: 20,
                    padding: "22px 0", borderTop: "1px solid var(--border-hairline)",
                  }}
                >
                  <span
                    style={{
                      font: "var(--type-meta)", fontWeight: 600,
                      letterSpacing: "var(--tracking-label)", color: "var(--text-accent)",
                      paddingTop: 4,
                    }}
                  >
                    {a.step}
                  </span>
                  <div>
                    <h3 className="t-h4" style={{ color: "var(--text-heading)" }}>{a.title}</h3>
                    <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", marginTop: 6 }}>{a.body}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ───────────────────────────────────────────────────────────────── */

export function ServicesPreview() {
  const featured = services.find((s) => s.featured) ?? services[0];
  const supporting = services.filter((s) => s.slug !== featured.slug).slice(0, 3);

  return (
    <section id="services" style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
      <div className="container-page">
        <SectionIntro
          eyebrow="Services"
          title="Care built around how you actually move"
          description="Every plan starts with a full postural and movement assessment — not a guess, and not a package."
        />

        <div className="ds-svc-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18, marginTop: 44 }}>
          {/* <FadeUp> */}
            <ServiceTile service={featured} featured sizes="(max-width: 900px) 100vw, 55vw" />
          {/* </FadeUp> */}

          <Stagger stagger={0.08} style={{ display: "grid", gap: 18, alignContent: "start" }}>
            {supporting.map((s) => (
              <ServiceTile key={s.slug} service={s} sizes="(max-width: 900px) 100vw, 40vw" />
            ))}
          </Stagger>
        </div>

        <FadeUp delay={0.1}>
          <div style={{ marginTop: 32 }}>
            <Link href="/services" className="btn btn-secondary">
              View all services
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Doctor ─────────────────────────────────────────────────────────────────── */

export function DoctorSection() {
  return (
    <section id="doctor" style={{ padding: "var(--section-y) 0" }}>
      <div className="container-page">
        <div className="ds-split" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
          <div>
            <SectionIntro eyebrow="Your clinician" title={clinic.doctor.name} />

            <FadeUp delay={0.08}>
              <p className="t-lead" style={{ color: "var(--text-body)", maxWidth: "var(--measure)", marginTop: 18 }}>
                {clinic.doctor.bio}
              </p>
            </FadeUp>

            <Stagger stagger={0.08} style={{ display: "grid", gap: 10, marginTop: 24 }}>
              {clinic.doctor.credentialsList.map((c) => (
                <span key={c} style={{ display: "flex", gap: 10, alignItems: "flex-start", font: "var(--type-body-sm)", color: "var(--text-body)" }}>
                  <Icon name="check" size={16} color="var(--status-success)" style={{ marginTop: 3 }} />
                  {c}
                </span>
              ))}
            </Stagger>

            <FadeUp delay={0.16}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
                <Link href="/book" className="btn btn-primary">
                  <Icon name="calendar-check" size={18} />
                  Book with {clinic.doctor.name}
                </Link>
                <Link href="/about" className="btn btn-secondary">About the clinic</Link>
              </div>
            </FadeUp>
          </div>

          <Parallax distance={30}>
            <EditorialImage
              src={images.hero.secondary.src}
              alt={images.hero.secondary.alt}
              position={images.hero.secondary.position}
              ratio="4 / 5"
              pattern="mask-right"
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ── Why choose us ──────────────────────────────────────────────────────────── */

export function WhyChooseSection() {
  return (
    <section style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
      <div className="container-page">
        <SectionIntro
          eyebrow="Why patients choose us"
          title="Four things you can check before you book"
          description="Not adjectives — specifics you can hold us to on the first visit."
        />

        <Stagger
          stagger={0.09}
          style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", marginTop: 44 }}
        >
          {clinic.whyChooseUs.map((w) => (
            <div
              key={w.title}
              style={{
                height: "100%", padding: 28,
                background: "var(--surface-card)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-sm)",
                display: "flex", flexDirection: "column", gap: 12,
              }}
            >
              <span
                style={{
                  width: 44, height: 44, borderRadius: "var(--radius-md)",
                  background: "var(--accent-quiet)", color: "var(--text-accent)",
                  display: "grid", placeItems: "center",
                }}
              >
                <Icon name={w.icon} size={21} />
              </span>
              <h3 className="t-h4" style={{ color: "var(--text-heading)" }}>{w.title}</h3>
              <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{w.body}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────────────────────── */

export function TestimonialsPreview() {
  const selected = testimonials.slice(0, 3);
  return (
    <section id="reviews" style={{ padding: "var(--section-y) 0" }}>
      <div className="container-page">
        <SectionIntro
          align="center"
          eyebrow="Reviews"
          title="What patients say"
          description={`Every review below is published on ${clinic.rating.source} under the clinic's profile.`}
        />

        <Stagger
          stagger={0.1}
          style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", marginTop: 44 }}
        >
          {selected.map((r) => (
            <figure
              key={r.name}
              style={{
                margin: 0, height: "100%", display: "flex", flexDirection: "column", gap: 18,
                padding: r.featured ? 36 : 28,
                background: r.featured ? "var(--surface-tint-soft)" : "var(--surface-card)",
                border: "1px solid " + (r.featured ? "#D8ECE9" : "var(--border-hairline)"),
                borderRadius: "var(--radius-xl)",
              }}
            >
              <div style={{ display: "flex", gap: 3 }} aria-label={`${r.rating} out of 5`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Icon key={i} name="star" size={15} color="var(--accent-warm)" />
                ))}
              </div>
              <blockquote
                style={{
                  margin: 0, flex: 1,
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: r.featured ? "clamp(19px,2vw,23px)" : 17, lineHeight: 1.45,
                  letterSpacing: "-0.018em", color: "var(--text-heading)",
                }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 38, height: 38, borderRadius: "var(--radius-pill)",
                    background: "var(--accent-quiet)", color: "var(--c-teal-ink)",
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14,
                  }}
                >
                  {r.name.trim().charAt(0)}
                </span>
                <span>
                  <span style={{ display: "block", font: "var(--type-body-sm)", fontWeight: 600, color: "var(--text-heading)" }}>{r.name}</span>
                  <span style={{ display: "block", font: "var(--type-meta)", color: "var(--text-subtle)" }}>{r.detail} · {r.source}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Stagger>

        <FadeUp delay={0.1}>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
            <Link href="/reviews" className="btn btn-secondary">
              Read all reviews
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Insurance ──────────────────────────────────────────────────────────────── */

export function InsuranceSection() {
  return (
    <section id="insurance" style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
      <div className="container-page">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <SectionIntro eyebrow="Insurance" title={clinic.insurance.heading} description={clinic.insurance.body} />

          <div style={{ display: "grid", gap: 20 }}>
            <Stagger stagger={0.05} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {clinic.insurance.accepted.map((a) => (
                <span
                  key={a}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "7px 13px", borderRadius: "var(--radius-pill)",
                    background: "var(--surface-card)", color: "var(--text-muted)",
                    border: "1px solid var(--border-hairline)",
                    font: "var(--type-meta)", fontWeight: 600,
                  }}
                >
                  <Icon name="shield-check" size={13} color="var(--text-accent)" />
                  {a}
                </span>
              ))}
            </Stagger>

            <Stagger stagger={0.08} style={{ display: "grid", gap: 14 }}>
              {clinic.insurance.notes.map((n) => (
                <div
                  key={n.title}
                  style={{
                    padding: 22, background: "var(--surface-card)",
                    border: "1px solid var(--border-hairline)",
                    borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <h3 className="t-h4" style={{ color: "var(--text-heading)" }}>{n.title}</h3>
                  <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", marginTop: 6 }}>{n.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ preview ────────────────────────────────────────────────────────────── */

export function FaqPreview() {
  return (
    <section style={{ padding: "var(--section-y) 0" }}>
      <div className="container-page">
        <div className="container-narrow">
          <SectionIntro align="center" eyebrow="Questions" title="Before you book" />
          <div style={{ marginTop: 36 }}>
            <FaqAccordion items={homepageFaqs} />
          </div>
          <FadeUp delay={0.1}>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <Link href="/faq" className="btn btn-secondary">
                All frequently asked questions
                <Icon name="arrow-right" size={18} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Location ───────────────────────────────────────────────────────────────── */

export function LocationPreview() {
  return (
    <section id="visit" style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
      <div className="container-page">
        <SectionIntro eyebrow="Visit" title={`Find us in ${clinic.neighborhood}`} />

        <div
          className="ds-location"
          style={{
            display: "grid", gridTemplateColumns: "1fr 1.15fr", marginTop: 40,
            background: "var(--surface-card)", border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ padding: "clamp(28px,4vw,48px)", display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <h3 className="t-h3" style={{ color: "var(--text-heading)" }}>{clinic.shortName}</h3>
              <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
                {clinic.address.line1}
                <br />
                {clinic.address.line2}
              </p>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {clinic.hours.map((h) => (
                <div
                  key={h.days}
                  style={{
                    display: "flex", justifyContent: "space-between", gap: 20,
                    font: "var(--type-body-sm)", color: "var(--text-body)",
                    paddingBottom: 10, borderBottom: "1px solid var(--border-hairline)",
                  }}
                >
                  <span>{h.days}</span>
                  <span style={{ color: "var(--text-muted)" }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, font: "var(--type-meta)", color: "var(--text-muted)" }}>
              <Icon name="circle-parking" size={15} style={{ marginTop: 1, opacity: 0.7 }} />
              {clinic.address.parkingNote}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto", paddingTop: 6 }}>
              <Link href="/book" className="btn btn-primary">
                <Icon name="calendar-check" size={18} />
                Book an Appointment
              </Link>
              <a href={clinic.address.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Icon name="map-pin" size={18} />
                Directions
              </a>
            </div>
          </div>

          <div style={{ position: "relative", minHeight: 380 }}>
            <EditorialImage
              src={images.interior.primary.src}
              alt={images.interior.primary.alt}
              position={images.interior.primary.position}
              ratio="auto"
              radius="0"
              pattern="mask-up"
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ position: "absolute", inset: 0, height: "100%", aspectRatio: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
