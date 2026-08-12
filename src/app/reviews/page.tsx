import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { testimonials } from "@/data/testimonials";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Icon } from "@/components/core/Icon";
import { CountUp, FadeUp, Stagger } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "Patient reviews",
  description: `${clinic.rating.score} stars from ${clinic.rating.count} ${clinic.rating.source} reviews. Read what patients say about ${clinic.name} in ${clinic.neighborhood}, ${clinic.city}.`,
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: `Reviews · ${clinic.shortName}`,
    description: `${clinic.rating.score} stars from ${clinic.rating.count} ${clinic.rating.source} reviews.`,
    url: "/reviews",
  },
};

export default function ReviewsPage() {
  const [featured, ...rest] = testimonials;

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What patients say"
        description={`Every review on this page is published on the clinic's ${clinic.rating.source} profile, in the patient's own words. Nothing here has been written or edited by us.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
        layout="centered"
      />

      {/* Rating summary */}
      <section style={{ padding: "0 0 var(--section-y-tight)" }}>
        <div className="container-page">
          <Stagger
            stagger={0.09}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
              background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-sm)", overflow: "hidden",
            }}
          >
            {[
              {
                value: (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <CountUp value={clinic.rating.score} decimals={1} />
                    <Icon name="star" size={24} color="var(--accent-warm)" />
                  </span>
                ),
                label: `Average ${clinic.rating.source} rating`,
              },
              { value: <CountUp value={clinic.rating.count} />, label: "Total reviews" },
              { value: <CountUp value={testimonials.length} />, label: "Featured on this page" },
            ].map((m, i) => (
              <div key={m.label} style={{ padding: "28px 30px", borderLeft: i > 0 ? "1px solid var(--border-hairline)" : "none", height: "100%" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(30px,3.4vw,40px)", lineHeight: 1.05,
                    letterSpacing: "var(--tracking-display)", color: "var(--text-heading)",
                  }}
                >
                  {m.value}
                </div>
                <div style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", marginTop: 8 }}>{m.label}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Featured quote — set large, as a pull quote rather than a card. */}
      <section style={{ padding: "var(--section-y-tight) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <FadeUp>
            <figure
              style={{
                margin: 0, padding: "clamp(36px,5vw,72px)",
                background: "var(--surface-card)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-2xl)",
                boxShadow: "var(--shadow-sm)",
                maxWidth: 900, marginInline: "auto", textAlign: "center",
              }}
            >
              <div style={{ display: "flex", gap: 4, justifyContent: "center" }} aria-label={`${featured.rating} out of 5`}>
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Icon key={i} name="star" size={18} color="var(--accent-warm)" />
                ))}
              </div>
              <blockquote
                style={{
                  margin: "24px 0 0",
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: "clamp(21px,2.4vw,30px)", lineHeight: 1.4,
                  letterSpacing: "-0.022em", color: "var(--text-heading)",
                }}
              >
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 28, font: "var(--type-body-sm)", color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--text-heading)" }}>{featured.name}</strong>
                <span style={{ display: "block", font: "var(--type-meta)", color: "var(--text-subtle)", marginTop: 4 }}>
                  {featured.detail} · {featured.source}
                </span>
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </section>

      {/* Remaining reviews */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <Stagger
            stagger={0.09}
            style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}
          >
            {rest.map((r) => (
              <figure
                key={r.name}
                style={{
                  margin: 0, height: "100%", display: "flex", flexDirection: "column", gap: 18, padding: 30,
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-hairline)",
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
                    fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18, lineHeight: 1.45,
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
        </div>
      </section>

      <CtaSection
        title="See why patients keep coming back."
        body="Start with an assessment — fifty minutes, plain language, no obligation to continue care."
      />
    </>
  );
}
