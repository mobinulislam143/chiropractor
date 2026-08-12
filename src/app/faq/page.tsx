import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { allFaqs, faqGroups } from "@/data/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { FadeUp } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: `What to expect at your first visit, how long appointments take, what to bring and wear, insurance, and how to schedule at ${clinic.name}.`,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ · ${clinic.shortName}`,
    description: "First visits, appointments, insurance and scheduling.",
    url: "/faq",
  },
};

/** Structured data drawn straight from the same content rendered on the page. */
function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly"
        description="The things people most often ask before booking. If yours isn't here, call the front desk — they'd rather answer it now than have you wondering."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        layout="centered"
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a href={clinic.phone.href} className="btn btn-secondary">
            <Icon name="phone" size={18} />
            {clinic.phone.display}
          </a>
        </div>
      </PageHero>

      <section style={{ padding: "0 0 var(--section-y)" }}>
        <div className="container-page">
          <div className="container-narrow" style={{ display: "grid", gap: 56 }}>
            {faqGroups.map((group, i) => (
              <div key={group.title}>
                <SectionIntro eyebrow={`0${i + 1}`} title={group.title} />
                <div style={{ marginTop: 28 }}>
                  {/* Only the first group opens on load — the rest start closed. */}
                  <FaqAccordion items={group.items} defaultOpen={i === 0 ? 0 : -1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section-y-tight) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="container-narrow" style={{ textAlign: "center" }}>
            <SectionIntro
              align="center"
              eyebrow="Still unsure"
              title="Ask us directly"
              description="The front desk can answer most questions in a two-minute call, including whether what you're describing is something we treat."
            />
            <FadeUp delay={0.14}>
              <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={clinic.phone.href} className="btn btn-primary">
                  <Icon name="phone" size={18} />
                  Call {clinic.phone.display}
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <CtaSection withImage={false} />
      <FaqJsonLd />
    </>
  );
}
