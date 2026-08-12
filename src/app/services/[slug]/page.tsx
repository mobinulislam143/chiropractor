import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clinic } from "@/data/clinic";
import { getService, relatedServices, services } from "@/data/services";
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
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: `${service.summary} ${service.title} at ${clinic.name} in ${clinic.neighborhood}, ${clinic.city}.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} · ${clinic.shortName}`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const img = service.imageKey ? images.services[service.imageKey] : undefined;
  const related = relatedServices(service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.meta}
        title={service.title}
        description={service.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        image={img}
        layout={img ? "split" : "centered"}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link href="/book" className="btn btn-primary">
            <Icon name="calendar-check" size={18} />
            Book an Appointment
          </Link>
          <a href={clinic.phone.href} className="btn btn-secondary">
            <Icon name="phone" size={18} />
            {clinic.phone.display}
          </a>
        </div>
      </PageHero>

      {/* Who it may be relevant for */}
      <section style={{ padding: "var(--section-y-tight) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <SectionIntro
              eyebrow="Who it's for"
              title="This may be relevant if"
              description="None of these confirm anything on their own — they're the patterns that most often bring people in for this."
            />
            <Stagger stagger={0.07} style={{ display: "grid", gap: 12 }}>
              {service.relevantFor.map((r) => (
                <div
                  key={r}
                  style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    padding: "18px 22px",
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-hairline)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <Icon name="check" size={17} color="var(--text-accent)" style={{ marginTop: 2 }} />
                  <span style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>{r}</span>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* What a visit involves */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <SectionIntro
            eyebrow="What to expect"
            title="What a typical visit involves"
            description="It varies with what we find, but the shape of the appointment stays the same."
          />
          <Stagger stagger={0.09} style={{ display: "grid", gap: 4, marginTop: 40 }}>
            {service.visit.map((v, i) => (
              <div
                key={v.title}
                style={{
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: 24,
                  padding: "24px 0", borderTop: "1px solid var(--border-hairline)",
                }}
              >
                <span
                  style={{
                    font: "var(--type-meta)", fontWeight: 600,
                    letterSpacing: "var(--tracking-label)", color: "var(--text-accent)", paddingTop: 4,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-h4" style={{ color: "var(--text-heading)" }}>{v.title}</h3>
                  <p style={{ color: "var(--text-muted)", marginTop: 6, maxWidth: "var(--measure)" }}>{v.body}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Supporting photograph — clinic environment, not a repeat of the hero. */}
      <section style={{ padding: "0 0 var(--section-y)" }}>
        <div className="container-page">
          <div className="ds-split" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
            <EditorialImage
              src={images.interior.secondary.src}
              alt={images.interior.secondary.alt}
              position={images.interior.secondary.position}
              ratio="16 / 11"
              pattern="mask-left"
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div>
              <SectionIntro
                eyebrow="Where you'll be"
                title="A calm room, and enough time in it"
                description="Appointments are scheduled so the assessment isn't rushed. You'll have time to ask what we found and what it means."
              />
              <FadeUp delay={0.14}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
                  <Link href="/about" className="btn btn-secondary">About the clinic</Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Find us
                    <Icon name="arrow-right" size={18} />
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "var(--section-y) 0", background: "var(--bg-page-alt)" }}>
        <div className="container-page">
          <div className="container-narrow">
            <SectionIntro align="center" eyebrow="Questions" title={`About ${service.title.toLowerCase()}`} />
            <div style={{ marginTop: 36 }}>
              <FaqAccordion items={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <div className="container-page">
          <SectionIntro eyebrow="Related" title="Other services" />
          <Stagger
            stagger={0.08}
            style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 40 }}
          >
            {related.map((s) => (
              <ServiceTile key={s.slug} service={s} sizes="(max-width: 900px) 100vw, 33vw" />
            ))}
          </Stagger>
        </div>
      </section>

      <CtaSection variant="clinic" />
    </>
  );
}
