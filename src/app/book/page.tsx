import type { Metadata } from "next";
import Image from "next/image";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Icon } from "@/components/core/Icon";
import { FadeUp, WordReveal } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: `Request an appointment at ${clinic.name} in ${clinic.neighborhood}, ${clinic.city}. We'll call to confirm your time, usually within one business hour.`,
  alternates: { canonical: "/book" },
  openGraph: {
    title: `Book an appointment · ${clinic.shortName}`,
    description: "Request a time and we'll call to confirm.",
    url: "/book",
  },
};

const REASSURANCE = [
  { icon: "clock", text: "A first visit runs about fifty minutes" },
  { icon: "shield-check", text: "We verify your benefits before you arrive" },
  { icon: "check", text: "No packages and no lock-in" },
];

export default function BookPage() {
  return (
    <section style={{ padding: "clamp(28px,4vw,48px) 0 var(--section-y)" }}>
      <div className="container-page">
        <div
          className="ds-split"
          style={{
            display: "grid",
            gridTemplateColumns: ".95fr 1.05fr",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "start",
          }}
        >
          {/* Supporting photography — one image only, per the page's job. */}
          <div className="ds-book-aside" style={{ position: "sticky", top: 100 }}>
            <figure
              style={{
                position: "relative", margin: 0,
                aspectRatio: "4 / 4.4",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <Image
                src={images.lifestyle.src}
                alt={images.lifestyle.alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
                placeholder="blur"
                style={{ objectFit: "cover", objectPosition: images.lifestyle.position }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(16,42,46,.06) 40%, rgba(16,42,46,.80) 100%)",
                }}
              />
              <figcaption
                style={{
                  position: "absolute", left: 0, right: 0, bottom: 0,
                  padding: "clamp(24px,3vw,36px)",
                  display: "grid", gap: 12,
                }}
              >
                {REASSURANCE.map((r) => (
                  <span key={r.text} style={{ display: "flex", gap: 10, alignItems: "center", color: "#fff", font: "var(--type-body-sm)" }}>
                    <Icon name={r.icon} size={17} color="#7FD4CF" />
                    {r.text}
                  </span>
                ))}
              </figcaption>
            </figure>
          </div>

          {/* Form */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              <FadeUp>
                <span className="t-label" style={{ color: "var(--text-accent)" }}>Book</span>
              </FadeUp>

              <WordReveal
                as="h1"
                className="t-h1"
                text="Request an appointment"
                immediate
                delay={0.1}
                stagger={0.05}
                style={{ color: "var(--text-heading)" }}
              />

              <FadeUp delay={0.35}>
                <p className="t-lead" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
                  Takes about a minute. We&apos;ll call to confirm your time — usually within one
                  business hour during opening hours. Prefer to speak to someone now?{" "}
                  <a href={clinic.phone.href} style={{ fontWeight: 600 }}>
                    Call {clinic.phone.display}
                  </a>
                  .
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.45}>
              <AppointmentForm />
            </FadeUp>

            <FadeUp delay={0.55}>
              <div
                style={{
                  marginTop: 32, padding: 24,
                  background: "var(--surface-tint-soft)",
                  border: "1px solid #D8ECE9",
                  borderRadius: "var(--radius-xl)",
                  display: "grid", gap: 12,
                }}
              >
                <h2 className="t-h4" style={{ color: "var(--text-heading)" }}>Opening hours</h2>
                {clinic.hours.map((h) => (
                  <div
                    key={h.days}
                    style={{ display: "flex", justifyContent: "space-between", gap: 20, font: "var(--type-body-sm)", color: "var(--text-body)" }}
                  >
                    <span>{h.days}</span>
                    <span style={{ color: "var(--text-muted)" }}>{h.time}</span>
                  </div>
                ))}
                <p style={{ font: "var(--type-meta)", color: "var(--text-muted)", marginTop: 4 }}>
                  {clinic.address.full}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
