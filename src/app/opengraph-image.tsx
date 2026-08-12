import { ImageResponse } from "next/og";
import { clinic } from "@/data/clinic";

/**
 * Social share card, drawn at build time rather than shipped as a JPEG.
 *
 * It stays correct when the clinic's name, rating or neighbourhood changes in
 * `clinic.ts`, which a flat exported image would not. Same artwork backs Twitter
 * cards — see `twitter-image.tsx`.
 */
export const alt = `${clinic.name} — chiropractor in ${clinic.neighborhood}, ${clinic.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The spine motif from the favicon, as plain divs — ImageResponse lays out with
 * flexbox only, so each segment is absolutely placed to trace the S-curve rather
 * than nudged with margins, which a flex column would clip.
 */
function SpineMark() {
  const rows = Array.from({ length: 13 });
  const W = 300;
  const H = 430;
  const gap = H / rows.length;

  return (
    <div style={{ display: "flex", position: "relative", width: W, height: H }}>
      {rows.map((_, i) => {
        const t = i / (rows.length - 1);
        const mid = 1 - Math.abs(t - 0.5) * 2;
        const w = 88 + Math.pow(t, 0.8) * 92;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: i * gap,
              left: W / 2 - w / 2 + Math.sin(t * Math.PI * 1.6 + 0.4) * 46,
              width: w,
              height: 19,
              borderRadius: 999,
              background: `rgba(221,243,241,${0.3 + mid * 0.6})`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #102A2E 0%, #14555A 62%, #167C80 100%)",
          color: "#fff",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 26 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#8FC9C8",
              fontWeight: 600,
            }}
          >
            {clinic.neighborhood} · {clinic.city}, {clinic.state}
          </div>

          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2.6 }}>
            Feel Better. Move Better. Live Better.
          </div>

          <div style={{ display: "flex", fontSize: 30, color: "rgba(232,241,240,.82)", lineHeight: 1.4 }}>
            {clinic.name}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,.12)",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              {/* Drawn rather than typed. A "★" glyph sends ImageResponse off to
                  fetch a fallback font at build time, which fails without network. */}
              <div style={{ display: "flex", gap: 7 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    style={{ width: 16, height: 16, borderRadius: 4, background: "#C69C5A", transform: "rotate(45deg)" }}
                  />
                ))}
              </div>
              {clinic.rating.score} from {clinic.rating.count} {clinic.rating.source} reviews
            </div>
          </div>
        </div>

        <div style={{ display: "flex", paddingLeft: 60 }}>
          <SpineMark />
        </div>
      </div>
    ),
    size,
  );
}
