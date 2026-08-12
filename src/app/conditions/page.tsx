import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { conditions } from "@/data/conditions";
import { images } from "@/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ConditionTile } from "@/components/content/ConditionTile";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

export const metadata: Metadata = {
  title: "Conditions we help with",
  description: `Educational guides to back and neck discomfort, posture, mobility, sports-related concerns, auto accident recovery and headache-related tension — from ${clinic.name} in ${clinic.neighborhood}, ${clinic.city}.`,
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: `Conditions · ${clinic.shortName}`,
    description: "Plain-language guides to the concerns we most often see.",
    url: "/conditions",
  },
};

export default function ConditionsPage() {
  const [lead, second, ...rest] = conditions;

  return (
    <>
      <PageHero
        eyebrow="Conditions"
        title="What we help with"
        description="Plain-language guides to the concerns we see most. These are educational — they don't diagnose anything, and they won't tell you what's happening in your specific case. An assessment does that."
        crumbs={[{ label: "Home", href: "/" }, { label: "Conditions" }]}
        image={images.education.back}
      />

      {/* Two leading tiles */}
      <section style={{ padding: "0 0 var(--section-y-tight)" }}>
        <div className="container-page">
          <div className="grid-2" style={{ gap: 18 }}>
            <FadeUp>
              <ConditionTile condition={lead} tall sizes="(max-width: 900px) 100vw, 50vw" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <ConditionTile condition={second} tall sizes="(max-width: 900px) 100vw, 50vw" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Remaining */}
      <section style={{ padding: "var(--section-y-tight) 0 var(--section-y)" }}>
        <div className="container-page">
          <Stagger
            stagger={0.08}
            style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
          >
            {rest.map((c) => (
              <ConditionTile key={c.slug} condition={c} sizes="(max-width: 900px) 100vw, 33vw" />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Responsible-care note. Worth its own block rather than fine print. */}
      <section style={{ padding: "var(--section-y-tight) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="container-narrow" style={{ textAlign: "center" }}>
            <SectionIntro
              align="center"
              eyebrow="A note on these guides"
              title="Educational, not diagnostic"
              description="Nothing on these pages diagnoses a condition or promises an outcome. Some presentations need a physician rather than a chiropractor, and part of our job is telling you when that's the case."
            />
            <FadeUp delay={0.14}>
              <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <a href={clinic.phone.href} className="btn btn-secondary">
                  <Icon name="phone" size={18} />
                  Talk it through: {clinic.phone.display}
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <CtaSection
        variant="movement"
        title="Describe what's going on. We'll tell you honestly."
        body="Book an assessment, or call and talk to the front desk first — either is fine."
      />
    </>
  );
}
