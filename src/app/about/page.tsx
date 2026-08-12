import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { EditorialImage } from "@/components/media/EditorialImage";
import { FadeUp, Parallax, Stagger } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

export const metadata: Metadata = {
  title: "About the clinic",
  description: `${clinic.name} is a chiropractic and massage therapy clinic in ${clinic.neighborhood}, ${clinic.city}. Longer assessments, plain-language explanations, and massage therapists working alongside the doctors.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${clinic.shortName}`,
    description: clinic.tagline,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A clinic where the assessment is longer than the adjustment"
        description={`${clinic.name} is a chiropractic and massage therapy practice in ${clinic.neighborhood}. We treat adults and children, and we'd rather explain what we found than hand you a plan you didn't agree to.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={images.about.primary}
      />

      {/* Story — editorial two-image composition, offset rather than side-by-side cards. */}
      <section style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="ds-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
            <div className="ds-stack" style={{ position: "relative", paddingBottom: 72 }}>
              <EditorialImage
                src={images.about.secondary.src}
                alt={images.about.secondary.alt}
                position={images.about.secondary.position}
                ratio="4 / 4.8"
                pattern="mask-up"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
              {/* Overlapping second frame — the composition, not a second card. */}
              <div
                className="ds-stack-inset"
                style={{ position: "absolute", right: -28, bottom: 0, width: "58%", boxShadow: "var(--shadow-lg)", borderRadius: "var(--radius-2xl)" }}
              >
                <EditorialImage
                  src={images.interior.secondary.src}
                  alt={images.interior.secondary.alt}
                  position={images.interior.secondary.position}
                  ratio="4 / 3.2"
                  pattern="mask-left"
                  delay={0.18}
                  sizes="(max-width: 900px) 50vw, 25vw"
                />
              </div>
            </div>

            <div>
              <SectionIntro eyebrow="Our story" title="Built around the part most clinics rush" />
              <Stagger stagger={0.09} style={{ display: "grid", gap: 20, marginTop: 28 }}>
                <p className="t-lead" style={{ color: "var(--text-body)" }}>
                  Most people arrive having been through this before — eight minutes on a table,
                  an adjustment, a plan for twenty visits, and no clearer sense of what was
                  actually wrong.
                </p>
                <p style={{ color: "var(--text-muted)" }}>
                  We built the appointment the other way around. The first visit runs about fifty
                  minutes, and most of that is listening and assessing. What you do all day, how
                  you sleep, where the discomfort actually travels — that conversation shapes
                  everything that follows.
                </p>
                <p style={{ color: "var(--text-muted)" }}>
                  Then we tell you what we found in plain language, and give you an honest range
                  of visits. If chiropractic isn&apos;t the right route for what you&apos;re
                  describing, we say that too.
                </p>
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <div className="container-narrow" style={{ textAlign: "center" }}>
            <SectionIntro
              align="center"
              eyebrow="Philosophy"
              title="You should leave understanding your own back"
              description="Not holding a diagram of one. The aim of every visit is that you can explain what's happening to you and why the plan makes sense — because that's what makes the plan work."
            />
          </div>
        </div>
      </section>

      {/* Approach steps */}
      <section style={{ padding: "0 0 var(--section-y)" }}>
        <div className="container-page">
          <Stagger
            stagger={0.1}
            style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}
          >
            {clinic.approach.map((a) => (
              <div
                key={a.step}
                style={{
                  height: "100%", padding: 32,
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span className="t-label" style={{ color: "var(--text-accent)" }}>{a.step}</span>
                <h3 className="t-h4" style={{ color: "var(--text-heading)", marginTop: 14 }}>{a.title}</h3>
                <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", marginTop: 8 }}>{a.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Clinician */}
      <section style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="ds-split" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
            <div>
              <SectionIntro eyebrow="Your clinician" title={clinic.doctor.name} description={clinic.doctor.bio} />

              <Stagger stagger={0.08} style={{ display: "grid", gap: 10, marginTop: 26 }}>
                {clinic.doctor.credentialsList.map((c) => (
                  <span key={c} style={{ display: "flex", gap: 10, alignItems: "flex-start", font: "var(--type-body-sm)", color: "var(--text-body)" }}>
                    <Icon name="check" size={16} color="var(--status-success)" style={{ marginTop: 3 }} />
                    {c}
                  </span>
                ))}
              </Stagger>

              <FadeUp delay={0.16}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
                  {clinic.doctor.badges.map((b) => (
                    <span
                      key={b}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "6px 12px", borderRadius: "var(--radius-pill)",
                        background: "var(--surface-card)", color: "var(--text-muted)",
                        border: "1px solid var(--border-hairline)",
                        font: "var(--type-meta)", fontWeight: 600,
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>

            <Parallax distance={26}>
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

      {/* Team */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <SectionIntro
              eyebrow="The team"
              title="Who you'll actually meet"
              description="A small practice, which is why patients tend to know everyone's name by the second visit."
            />
            <Stagger stagger={0.09} style={{ display: "grid", gap: 14 }}>
              {clinic.team.map((t) => (
                <div
                  key={t.name}
                  style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "20px 24px",
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-hairline)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <span
                    style={{
                      width: 44, height: 44, borderRadius: "var(--radius-pill)",
                      background: "var(--accent-quiet)", color: "var(--c-teal-ink)",
                      display: "grid", placeItems: "center",
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
                    }}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span style={{ display: "block", font: "var(--type-body-sm)", fontWeight: 600, color: "var(--text-heading)" }}>{t.name}</span>
                    <span style={{ display: "block", font: "var(--type-meta)", color: "var(--text-subtle)" }}>{t.role}</span>
                  </span>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Environment */}
      <section style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <SectionIntro
            eyebrow="The clinic"
            title="Where you'll be treated"
            description="Free patient parking directly in front of Suite 107, and a waiting room you won't be sitting in for long."
          />
          <div className="grid-2" style={{ gap: 18, marginTop: 44 }}>
            <FadeUp>
              <EditorialImage
                src={images.interior.primary.src}
                alt={images.interior.primary.alt}
                position={images.interior.primary.position}
                ratio="4 / 3"
                pattern="mask-up"
                hoverZoom
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </FadeUp>
            <FadeUp delay={0.12}>
              <EditorialImage
                src={images.lifestyle.src}
                alt={images.lifestyle.alt}
                position={images.lifestyle.position}
                ratio="4 / 3"
                pattern="mask-right"
                hoverZoom
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </FadeUp>
          </div>

          <FadeUp delay={0.16}>
            <div style={{ marginTop: 32 }}>
              <Link href="/contact" className="btn btn-secondary">
                <Icon name="map-pin" size={18} />
                Directions and hours
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <CtaSection withImage={false} />
    </>
  );
}
