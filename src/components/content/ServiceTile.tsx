import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/data/services";
import { images } from "@/data/images";
import { Icon } from "@/components/core/Icon";

/**
 * The site's spine motif, reduced to a quiet watermark. Used behind services that
 * carry no photograph so the frame still says "alignment" rather than "missing".
 */
function SegmentGlyph() {
  const rows = Array.from({ length: 11 });
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 5,
        opacity: 0.5,
      }}
    >
      {rows.map((_, i) => {
        const t = i / (rows.length - 1);
        const mid = 1 - Math.abs(t - 0.5) * 2;
        return (
          <span
            key={i}
            style={{
              width: 30 + Math.pow(t, 0.8) * 30,
              height: 7,
              borderRadius: 999,
              transform: `translateX(${Math.sin(t * Math.PI * 1.6 + 0.4) * 16}px)`,
              background: `color-mix(in srgb, var(--accent) ${14 + mid * 34}%, transparent)`,
            }}
          />
        );
      })}
    </span>
  );
}

export interface ServiceTileProps {
  service: Service;
  /** Large tile — image above copy, taller frame. Used for the leading service. */
  featured?: boolean;
  sizes?: string;
}

/**
 * One service, as an editorial tile rather than a card with an icon.
 * Every service currently has a photograph. A service added without one renders a
 * typographic tile rather than a broken frame — see `imageKey` in `src/data/services.ts`.
 *
 * Deliberately static: no tilt, no image zoom, no arrow nudge. That also lets the
 * whole tile render on the server — it holds no state and needs no client bundle.
 */
export function ServiceTile({ service, featured = false, sizes }: ServiceTileProps) {
  const img = service.imageKey ? images.services[service.imageKey] : undefined;

  return (
    <Link
      href={`/services/${service.slug}`}
      style={{
        display: "flex", flexDirection: "column", height: "100%",
        textDecoration: "none",
        borderRadius: "var(--radius-2xl)", overflow: "hidden",
        background: "var(--surface-card)",
        border: "1px solid var(--border-hairline)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {img ? (
        <div
          style={{
            position: "relative",
            aspectRatio: featured ? "16 / 10" : "4 / 3",
            overflow: "hidden",
            background: "var(--surface-tint-soft)",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes ?? (featured ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 100vw, 33vw")}
            placeholder="blur"
            style={{ objectFit: "cover", objectPosition: img.position }}
          />
        </div>
      ) : (
        // No honest photograph for this service — a composed panel instead, so the
        // slot reads as a deliberate mark rather than a picture that failed to load.
        <div
          style={{
            position: "relative",
            aspectRatio: featured ? "16 / 10" : "4 / 3",
            background:
              "radial-gradient(120% 90% at 26% 12%, var(--c-teal-light) 0%, var(--surface-tint-soft) 46%, var(--surface-card) 100%)",
            display: "grid", placeItems: "center", padding: 28,
            overflow: "hidden",
          }}
        >
          <SegmentGlyph />
          <span
            style={{
              position: "relative",
              width: 60, height: 60, borderRadius: "var(--radius-pill)",
              background: "var(--surface-card)", color: "var(--text-accent)",
              display: "grid", placeItems: "center", boxShadow: "var(--shadow-md)",
            }}
          >
            <Icon name={service.icon} size={27} />
          </span>
        </div>
      )}

      <div
        style={{ padding: featured ? 32 : 24, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}
      >
        <h3
          className={featured ? "t-h3" : "t-h4"}
          style={{ color: "var(--text-heading)" }}
        >
          {service.title}
        </h3>
        <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", flex: 1 }}>
          {service.summary}
        </p>
        <span
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            paddingTop: 12, marginTop: 4, borderTop: "1px solid var(--border-hairline)",
          }}
        >
          <span style={{ font: "var(--type-meta)", color: "var(--text-subtle)" }}>{service.meta}</span>
          <Icon name="arrow-right" size={16} color="var(--text-accent)" />
        </span>
      </div>
    </Link>
  );
}
