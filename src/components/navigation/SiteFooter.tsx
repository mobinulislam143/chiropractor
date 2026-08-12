import React from "react";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { conditions } from "@/data/conditions";
import { Icon } from "@/components/core/Icon";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "#7FD4CF", marginBottom: 14 }}>
      {children}
    </div>
  );
}

function Line({ icon, children }: { icon: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", font: "var(--type-body-sm)", color: "rgba(232,241,240,.72)", padding: "4px 0" }}>
      <Icon name={icon} size={15} style={{ marginTop: 3, opacity: 0.6 }} />
      {children}
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  display: "block",
  font: "var(--type-body-sm)",
  color: "rgba(232,241,240,.72)",
  padding: "4px 0",
};

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--surface-inverse)", color: "var(--text-on-inverse)", paddingTop: "var(--section-y-tight)" }}>
      <div className="container-page">
        <div style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", paddingBottom: 56 }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.028em", color: "#fff" }}>
              {clinic.wordmark}
            </div>
            <p style={{ font: "var(--type-body-sm)", color: "rgba(232,241,240,.62)", marginTop: 12 }}>{clinic.tagline}</p>
            <div style={{ marginTop: 22 }}>
              <Link href="/book" className="btn btn-primary btn-sm">
                <Icon name="calendar-check" size={16} />
                Book Appointment
              </Link>
            </div>
          </div>

          <div>
            <Heading>Visit</Heading>
            <Line icon="map-pin">{clinic.address.full}</Line>
            <Line icon="phone">
              <a href={clinic.phone.href} style={{ color: "inherit" }}>{clinic.phone.display}</a>
            </Line>
            <div style={{ marginTop: 10 }}>
              <a href={clinic.address.directionsUrl} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, color: "#7FD4CF" }}>
                Get directions
              </a>
            </div>
          </div>

          <div>
            <Heading>Hours</Heading>
            {clinic.hours.map((h) => (
              <div key={h.days} style={{ display: "flex", justifyContent: "space-between", gap: 16, font: "var(--type-body-sm)", color: "rgba(232,241,240,.72)", padding: "4px 0" }}>
                <span>{h.days}</span>
                <span style={{ color: "rgba(232,241,240,.5)" }}>{h.time}</span>
              </div>
            ))}
          </div>

          <div>
            <Heading>Services</Heading>
            {services.slice(0, 5).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} style={linkStyle}>{s.title}</Link>
            ))}
            <Link href="/services" style={{ ...linkStyle, color: "#7FD4CF" }}>All services</Link>
          </div>

          <div>
            <Heading>Conditions</Heading>
            {conditions.slice(0, 5).map((c) => (
              <Link key={c.slug} href={`/conditions/${c.slug}`} style={linkStyle}>{c.title}</Link>
            ))}
            <Link href="/conditions" style={{ ...linkStyle, color: "#7FD4CF" }}>All conditions</Link>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.10)", padding: "22px 0 32px",
            display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between",
            font: "var(--type-meta)", color: "rgba(232,241,240,.45)",
          }}
        >
          <span>© {new Date().getFullYear()} {clinic.name}. {clinic.legal}</span>
          <span style={{ display: "flex", gap: 18 }}>
            <Link href="/about" style={{ color: "inherit" }}>About</Link>
            <Link href="/faq" style={{ color: "inherit" }}>FAQ</Link>
            <Link href="/contact" style={{ color: "inherit" }}>Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
