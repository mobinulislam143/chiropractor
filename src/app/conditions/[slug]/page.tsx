import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clinic } from "@/data/clinic";
import { conditions, getCondition } from "@/data/conditions";
import { getService } from "@/data/services";
import { images } from "@/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ServiceTile } from "@/components/content/ServiceTile";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { EditorialImage } from "@/components/media/EditorialImage";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) return { title: "Not found" };

  return {
    title: condition.title,
    description: `${condition.summary} An educational guide from ${clinic.name} in ${clinic.neighborhood}, ${clinic.city}.`,
    alternates: { canonical: `/conditions/${condition.slug}` },
    openGraph: {
      title: `${condition.title} · ${clinic.shortName}`,
      description: condition.summary,
      url: `/conditions/${condition.slug}`,
    },
  };
}

export default async function ConditionDetailPage({ params }: Params) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) notFound();

  const img = images.conditions[condition.imageKey];
  const related = condition.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHero
        eyebrow="Conditions"
        title={condition.title}
        description={condition.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Conditions", href: "/conditions" }, { label: condition.title }]}
        image={img}
      />

      {/* What people describe */}
      <section style={{ padding: "var(--section-y-tight) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <SectionIntro
              eyebrow="Common experiences"
              title="What people usually describe"
              description="These are the patterns people tend to report. They aren't diagnostic criteria, and having them doesn't confirm anything on its own."
            />
            <Stagger stagger={0.07} style={{ display: "grid", gap: 12 }}>
              {condition.signs.map((s) => (
                <div
                  key={s}
                  style={{
                    display: "flex", gap: 12, alignItems: "flex-start", padding: "18px 22px",
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-hairline)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <Icon name="activity" size={17} color="var(--text-accent)" style={{ marginTop: 2 }} />
                  <span style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>{s}</span>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Educational explanation — long-form, narrow measure. */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <div className="container-narrow">
            <SectionIntro eyebrow="Understanding it" title="What's usually going on" />
            <Stagger stagger={0.08} style={{ display: "grid", gap: 20, marginTop: 32 }}>
              {condition.explanation.map((p, i) => (
                <p key={i} className="t-lead" style={{ color: "var(--text-body)" }}>{p}</p>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* How care may fit */}
      <section style={{ padding: "0 0 var(--section-y)" }}>
        <div className="container-page">
          <div className="ds-split" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
            <EditorialImage
              src={images.education.neckSecondary.src}
              alt={images.education.neckSecondary.alt}
              position={images.education.neckSecondary.position}
              ratio="4 / 4.6"
              pattern="mask-left"
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <div>
              <SectionIntro
                eyebrow="How care may fit"
                title="Where chiropractic sits in the picture"
                description="One possible part of a broader plan — not a guaranteed route, and not the right route for everyone."
              />
              <Stagger stagger={0.08} style={{ display: "grid", gap: 14, marginTop: 32 }}>
                {condition.careApproach.map((c) => (
                  <span key={c} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Icon name="check" size={17} color="var(--status-success)" style={{ marginTop: 3 }} />
                    <span style={{ color: "var(--text-body)" }}>{c}</span>
                  </span>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="container-narrow">
            <SectionIntro align="center" eyebrow="Questions" title={`About ${condition.title.toLowerCase()}`} />
            <div style={{ marginTop: 36 }}>
              <FaqAccordion items={condition.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <SectionIntro
            eyebrow="Related services"
            title="Services people book for this"
            description="Not sure which applies? An assessment sorts that out — you don't need to pick correctly in advance."
          />
          <Stagger
            stagger={0.08}
            style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 40 }}
          >
            {related.map((s) => (
              <ServiceTile key={s.slug} service={s} sizes="(max-width: 900px) 100vw, 33vw" />
            ))}
          </Stagger>

          <FadeUp delay={0.1}>
            <div style={{ marginTop: 32 }}>
              <Link href="/conditions" className="btn btn-secondary">
                <Icon name="arrow-left" size={18} />
                All conditions
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <CtaSection variant="movement" />
    </>
  );
}
