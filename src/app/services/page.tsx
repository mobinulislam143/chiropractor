import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { images } from "@/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ServiceTile } from "@/components/content/ServiceTile";
import { EditorialImage } from "@/components/media/EditorialImage";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { Icon } from "@/components/core/Icon";

export const metadata: Metadata = {
  title: "Services",
  description: `Chiropractic services at ${clinic.name} — spinal adjustment, corrective care, posture and mobility, sports and prenatal chiropractic, auto injury and maintenance care in ${clinic.neighborhood}, ${clinic.city}.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services · ${clinic.shortName}`,
    description: "Chiropractic care built around how you actually move.",
    url: "/services",
  },
};

export default function ServicesPage() {
  // Both lead slots are photograph-led compositions, so they must be filled by
  // services that actually have one — otherwise the layout opens on an empty
  // frame. Services without a photograph fall through to the tile grid below,
  // where the spine-motif panel is a designed state rather than a gap.
  const withPhoto = services.filter((s) => s.imageKey);
  const featured = withPhoto.find((s) => s.featured) ?? withPhoto[0];
  const rest = services.filter((s) => s.slug !== featured.slug);
  const secondLead = rest.find((s) => s.imageKey) ?? rest[0];
  const others = rest.filter((s) => s.slug !== secondLead.slug);

  const featuredImg = images.services[featured.imageKey!];
  const secondImg = secondLead.imageKey ? images.services[secondLead.imageKey] : undefined;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Care built around how you actually move"
        description="Every service below starts from the same place — a real assessment, explained in plain language, before any treatment is discussed."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image={images.services["spinal-adjustment"]}
      />

      {/* Lead service, full width and image-led. */}
      <section style={{ padding: "0 0 var(--section-y-tight)" }}>
        <div className="container-page">
          <FadeUp>
            <Link
              href={`/services/${featured.slug}`}
              style={{
                display: "block", position: "relative", minHeight: 460,
                borderRadius: "var(--radius-2xl)", overflow: "hidden", textDecoration: "none",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <EditorialImage
                src={featuredImg.src}
                alt={featuredImg.alt}
                position={featuredImg.position}
                ratio="auto"
                radius="0"
                pattern="mask-up"
                hoverZoom
                sizes="(max-width: 900px) 100vw, 1200px"
                style={{ position: "absolute", inset: 0, height: "100%", aspectRatio: "auto" }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(100deg, rgba(16,42,46,.82) 0%, rgba(16,42,46,.44) 55%, rgba(16,42,46,.16) 100%)",
                }}
              />
              <div
                style={{
                  position: "relative", padding: "clamp(32px,5vw,64px)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  minHeight: 460, gap: 14, maxWidth: 640,
                }}
              >
                <span className="t-label" style={{ color: "#7FD4CF" }}>Most requested</span>
                <h2 className="t-h2" style={{ color: "#fff" }}>{featured.title}</h2>
                <p className="t-lead" style={{ color: "rgba(255,255,255,.86)" }}>{featured.summary}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 6, color: "#fff", font: "var(--type-body-sm)", fontWeight: 600 }}>
                  Read more
                  <Icon name="arrow-right" size={16} />
                </span>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Second service in an alternating split. */}
      <section style={{ padding: "var(--section-y-tight) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="ds-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
            <div>
              <SectionIntro eyebrow={secondLead.meta} title={secondLead.title} description={secondLead.intro} />
              <FadeUp delay={0.14}>
                <Link href={`/services/${secondLead.slug}`} className="btn btn-primary" style={{ marginTop: 28 }}>
                  About {secondLead.title.toLowerCase()}
                  <Icon name="arrow-right" size={18} />
                </Link>
              </FadeUp>
            </div>
            {secondImg ? (
              <EditorialImage
                src={secondImg.src}
                alt={secondImg.alt}
                position={secondImg.position}
                ratio="4 / 3.2"
                pattern="mask-right"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            ) : null}
          </div>
        </div>
      </section>

      {/* Everything else. */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <SectionIntro
            eyebrow="All services"
            title="The rest of what we offer"
            description="Not sure which fits? Call the front desk and describe what's going on — they'll point you to the right first appointment."
          />
          <Stagger
            stagger={0.08}
            style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 44 }}
          >
            {others.map((s) => (
              <ServiceTile key={s.slug} service={s} sizes="(max-width: 900px) 100vw, 33vw" />
            ))}
          </Stagger>
        </div>
      </section>

      <CtaSection
        variant="clinic"
        title="Not sure which service you need?"
        body="Book an assessment and we'll tell you — including if chiropractic isn't the right route for what you're describing."
      />
    </>
  );
}
