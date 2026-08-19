import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { EditorialImage } from "@/components/media/EditorialImage";
import { ClinicMapSection } from "@/components/media/ClinicMapSection";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

export const metadata: Metadata = {
  title: "Contact & location",
  description: `${clinic.name} is at ${clinic.address.full}. Call ${clinic.phone.display}, check opening hours, or send a message.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${clinic.shortName}`,
    description: `${clinic.address.full} · ${clinic.phone.display}`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Find us in JCC Chiropractic"
        description={`We're at ${clinic.address.full}, with free patient parking directly in front of Suite 107.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={images.interior.primary}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href={clinic.phone.href} className="btn btn-primary">
            <Icon name="phone" size={18} />
            Call {clinic.phone.display}
          </a>
          <a href={clinic.address.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Icon name="map-pin" size={18} />
            Directions
          </a>
        </div>
      </PageHero>

      {/* Details */}
      <section style={{ padding: "var(--section-y-tight) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <Stagger
            stagger={0.08}
            style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}
          >
            {[
              {
                icon: "map-pin",
                title: "Address",
                lines: [clinic.address.line1, clinic.address.line2],
                action: { label: "Get directions", href: clinic.address.directionsUrl, external: true },
              },
              {
                icon: "phone",
                title: "Phone",
                lines: [clinic.phone.display, "Front desk during opening hours"],
                action: { label: `Call ${clinic.phone.display}`, href: clinic.phone.href, external: false },
              },
              {
                icon: "circle-parking",
                title: "Parking",
                lines: [clinic.address.parkingNote],
              },
            ].map((c) => (
              <div
                key={c.title}
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
                  <Icon name={c.icon} size={21} />
                </span>
                <h2 className="t-h4" style={{ color: "var(--text-heading)" }}>{c.title}</h2>
                <div style={{ flex: 1 }}>
                  {c.lines.map((l) => (
                    <p key={l} style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{l}</p>
                  ))}
                </div>
                {c.action ? (
                  <a
                    href={c.action.href}
                    {...(c.action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{ font: "var(--type-body-sm)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    {c.action.label}
                    <Icon name="arrow-right" size={15} />
                  </a>
                ) : null}
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Map */}
      <section style={{ padding: "0 0 var(--section-y)" }}>
        <div className="container-page">
          <SectionIntro
            eyebrow="Where to find us"
            title="On the map"
            description={`${clinic.address.full}. ${clinic.address.parkingNote}`}
          />
          <div style={{ marginTop: 32 }}>
            <ClinicMapSection />
          </div>
          <div style={{ marginTop: 16 }}>
            <a
              href={clinic.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Icon name="map-pin" size={18} />
              Open directions
            </a>
          </div>
        </div>
      </section>

      {/* Hours + form */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <div className="ds-split" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: "clamp(32px,5vw,72px)", alignItems: "start" }}>
            <div>
              <SectionIntro
                eyebrow="Opening hours"
                title="When we're open"
                description="Saturday appointments are available on request — call the front desk and they'll find you a time."
              />

              <Stagger stagger={0.06} style={{ display: "grid", gap: 12, marginTop: 32 }}>
                {clinic.hours.map((h) => (
                  <div
                    key={h.days}
                    style={{
                      display: "flex", justifyContent: "space-between", gap: 20,
                      font: "var(--type-body-sm)", color: "var(--text-body)",
                      paddingBottom: 12, borderBottom: "1px solid var(--border-hairline)",
                    }}
                  >
                    <span>{h.days}</span>
                    <span style={{ color: "var(--text-muted)" }}>{h.time}</span>
                  </div>
                ))}
              </Stagger>

              <FadeUp delay={0.16}>
                <div style={{ marginTop: 32 }}>
                  <EditorialImage
                    src={images.interior.secondary.src}
                    alt={images.interior.secondary.alt}
                    position={images.interior.secondary.position}
                    ratio="4 / 3"
                    pattern="mask-up"
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                </div>
              </FadeUp>
            </div>

            <div>
              <SectionIntro
                eyebrow="Send a message"
                title="Or write to us"
                description="Non-urgent questions only — for anything time-sensitive, please call the front desk."
              />
              <div style={{ marginTop: 32 }}>
                <AppointmentForm compact />
              </div>
              <FadeUp delay={0.2}>
                <p style={{ font: "var(--type-meta)", color: "var(--text-subtle)", marginTop: 20 }}>
                  Ready to book instead?{" "}
                  <Link href="/book" style={{ fontWeight: 600 }}>Request an appointment</Link>.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
