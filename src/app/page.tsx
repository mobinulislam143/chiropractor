import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { MovementSection } from "@/components/interactive/MovementSection";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  ApproachSection,
  ConditionsPreview,
  DoctorSection,
  FaqPreview,
  InsuranceSection,
  LocationPreview,
  ServicesPreview,
  TestimonialsPreview,
  WhyChooseSection,
} from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: `Chiropractor in ${clinic.neighborhood}, ${clinic.city}`,
  description: `${clinic.tagline} Personalized assessment, chiropractic adjustment and massage therapy. ${clinic.rating.score} stars from ${clinic.rating.count} ${clinic.rating.source} reviews.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${clinic.name} — Chiropractor in ${clinic.neighborhood}`,
    description: clinic.tagline,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ConditionsPreview />
      <ApproachSection />
      <MovementSection />
      <ServicesPreview />
      <DoctorSection />
      <WhyChooseSection />
      <TestimonialsPreview />
      <InsuranceSection />
      <FaqPreview />
      <LocationPreview />
      <CtaSection />
    </>
  );
}
