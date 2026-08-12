import type { Metadata } from "next";
import { Figtree, Schibsted_Grotesk } from "next/font/google";
import { clinic } from "@/data/clinic";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { MobileCallBar } from "@/components/navigation/MobileCallBar";
import "./globals.css";

/* Self-hosted and subset at build time — no external request, no layout shift. */
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-schibsted",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: `${clinic.name} — Chiropractor in ${clinic.neighborhood}, ${clinic.city}`,
    template: `%s · ${clinic.shortName}`,
  },
  description: clinic.tagline,
  openGraph: {
    type: "website",
    siteName: clinic.name,
    locale: "en_US",
    title: `${clinic.name} — Chiropractor in ${clinic.neighborhood}, ${clinic.city}`,
    description: clinic.tagline,
  },
  alternates: { canonical: "/" },
};

/**
 * Structured data describing the clinic. Only fields we can actually verify from
 * `clinic.ts` are emitted — no invented credentials, certifications or insurers.
 */
function ClinicJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Chiropractic",
    name: clinic.name,
    url: clinic.siteUrl,
    telephone: clinic.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.city,
      addressRegion: clinic.state,
      postalCode: clinic.address.postalCode,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating.score,
      reviewCount: clinic.rating.count,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${figtree.variable}`}>
      <head>
        {/* Entrance animations render their "before" state inline, so without JS
            the page would stay blank. Reveal everything instead. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <AnnouncementBar
          message={clinic.announcement.message}
          linkLabel={clinic.announcement.linkLabel}
          href={clinic.announcement.href}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCallBar />
        <ClinicJsonLd />
      </body>
    </html>
  );
}
