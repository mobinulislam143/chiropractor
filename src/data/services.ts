import type { ServiceImageKey } from "./images";

export type ServiceVisitStep = { title: string; body: string };

export type Service = {
  slug: string;
  title: string;
  /** One line, used in cards and nav. */
  summary: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  meta: string;
  icon: string;
  /**
   * Every service currently carries a photograph. Kept optional so a newly added
   * service renders the composed spine-motif panel rather than a broken frame
   * until its image is wired up — see `ServiceTile`.
   */
  imageKey?: ServiceImageKey;
  relevantFor: string[];
  visit: ServiceVisitStep[];
  faqs: { q: string; a: string }[];
  /** Drives the editorial grid — one service leads each page. */
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "spinal-adjustment",
    title: "Spinal Adjustment",
    summary: "Precise, low-force adjustments that restore joint mobility.",
    intro:
      "A spinal adjustment is a controlled, low-force movement applied to a specific joint that isn't moving the way it should. The goal is straightforward: restore mobility to that segment and reduce the compensation it's forcing on everything around it.",
    meta: "20–30 min · Most plans",
    icon: "activity",
    imageKey: "spinal-adjustment",
    featured: true,
    relevantFor: [
      "Stiffness that's worst in the first hour after waking",
      "Back or neck discomfort that returns to the same spot",
      "Reduced rotation when checking a blind spot or turning to look behind you",
      "Discomfort that follows long periods of sitting",
    ],
    visit: [
      { title: "We ask before we adjust", body: "Where the discomfort travels, what makes it worse, and what you've already tried. This shapes everything that follows." },
      { title: "Movement assessment", body: "We check how the joints in the area actually move — segment by segment — rather than treating the spine as one block." },
      { title: "The adjustment", body: "A specific, low-force movement applied to the joints that aren't moving well. Most people describe a quick release followed by easier movement." },
      { title: "What comes next", body: "We tell you what we found in plain language, and give an honest range for how many visits it may take." },
    ],
    faqs: [
      { q: "Does an adjustment hurt?", a: "Most patients describe it as a quick release followed by noticeably easier movement. If a technique isn't comfortable for you, we use a lower-force alternative." },
      { q: "Is the popping sound a concern?", a: "No. That sound is gas releasing from the joint fluid, and it isn't a measure of whether the adjustment worked. Plenty of effective adjustments make no sound at all." },
      { q: "How many visits will I need?", a: "It depends on what we find. We'll give you an honest range at the end of your assessment, and you're never locked into a package." },
    ],
  },
  {
    slug: "corrective-care",
    title: "Corrective Care",
    summary: "Hands-on care for patterns that keep coming back.",
    intro:
      "Some discomfort resolves and stays resolved. Some returns to the same place every few weeks. Corrective care is for the second kind — where the aim is to address the movement pattern underneath, not only the episode in front of us.",
    meta: "30–45 min · Ongoing plan",
    icon: "hand",
    imageKey: "corrective-care",
    relevantFor: [
      "Discomfort that resolves and then returns to the same spot",
      "A pattern you've managed for months or years",
      "Wanting to understand the cause rather than manage the episode",
    ],
    visit: [
      { title: "History, in detail", body: "Recurring patterns usually have a history. We spend real time on how it started and what it responds to." },
      { title: "Assessment across regions", body: "We look above and below the painful area, since a restricted segment often loads the one next to it." },
      { title: "Combined treatment", body: "Adjustment together with soft tissue work, so the muscle holding a joint out of position is addressed in the same visit." },
      { title: "Between-visit work", body: "Usually two or three specific movements. We'd rather give you three you'll actually do than twelve you won't." },
    ],
    faqs: [
      { q: "How is this different from a single adjustment?", a: "The visit itself may look similar. The difference is scope — corrective care plans across a series of visits and puts more weight on the movement work you do between them." },
      { q: "Will I need care indefinitely?", a: "No. The aim is to reach a point where you don't need us regularly. Some patients then choose occasional maintenance visits, but that's a choice, not a requirement." },
    ],
  },
  {
    slug: "posture-mobility",
    title: "Posture & Mobility",
    summary: "Assessment and care for desk-bound necks and mid-backs.",
    intro:
      "Nine hours a day at a monitor asks something specific of your neck and mid-back. This is an assessment of how you actually hold and move through that position, and care aimed at the restrictions it creates.",
    meta: "30 min · Workstation review",
    icon: "briefcase",
    imageKey: "posture-mobility",
    relevantFor: [
      "Neck or shoulder tension that builds across a working day",
      "Mid-back stiffness after long periods seated",
      "Wanting a workstation setup reviewed alongside hands-on care",
    ],
    visit: [
      { title: "How you actually sit", body: "Not how you sit when someone's watching. We ask about monitor height, hours, breaks, and what your day genuinely looks like." },
      { title: "Postural and range assessment", body: "We measure where rotation and extension are limited, rather than describing posture in general terms." },
      { title: "Treatment", body: "Adjustment and soft tissue work directed at the segments that assessed as restricted." },
      { title: "Workstation adjustments", body: "Specific, practical changes to your setup. Usually two or three things, not a redesign." },
    ],
    faqs: [
      { q: "Can posture actually be changed?", a: "Movement habits and joint mobility can change, and both influence how you hold yourself. We focus on those rather than promising a permanently different posture." },
      { q: "Do I need to bring anything?", a: "A photo of your desk setup is genuinely useful if you have one. Otherwise nothing." },
    ],
  },
  {
    slug: "sports-chiropractic",
    title: "Sports Chiropractic",
    summary: "Care built around how your sport loads your body.",
    intro:
      "A runner's lower back and a swimmer's shoulder are different problems, even when the discomfort sits in a similar place. Sports chiropractic starts from the demands of your activity and works back from there.",
    meta: "45 min · Assessment first",
    icon: "activity",
    imageKey: "sports-chiropractic",
    relevantFor: [
      "Recurring strain that returns when training volume increases",
      "Recovery that's slower than you expect",
      "Wanting care that accounts for your specific sport",
    ],
    visit: [
      { title: "Your sport, specifically", body: "Training volume, recent changes, and where in the movement the discomfort shows up." },
      { title: "Loaded assessment", body: "We assess movement under conditions closer to how you actually use it, not only lying on a table." },
      { title: "Treatment", body: "Adjustment and soft tissue work directed at the restrictions the assessment identified." },
      { title: "Return-to-activity guidance", body: "An honest conversation about training load, including when backing off is the faster route." },
    ],
    faqs: [
      { q: "Should I stop training?", a: "Often not entirely. We'll usually talk about modifying load rather than stopping, though that depends on what we find." },
      { q: "Do you coordinate with coaches or physicians?", a: "Gladly, if you'd like us to. We're happy to be one part of a broader plan." },
    ],
  },
  {
    slug: "prenatal-chiropractic",
    title: "Prenatal Chiropractic",
    summary: "Gentle, position-adapted care during pregnancy.",
    intro:
      "Pregnancy changes load, centre of gravity and ligament laxity, often over a short window. Prenatal care here means gentle, position-adapted technique and a clear conversation about what is and isn't appropriate at each stage.",
    meta: "30 min · Position-adapted",
    icon: "baby",
    imageKey: "prenatal-chiropractic",
    relevantFor: [
      "Low back or pelvic discomfort during pregnancy",
      "Discomfort that makes sleeping position difficult",
      "Wanting care adapted to each stage rather than a standard adjustment",
    ],
    visit: [
      { title: "Stage and history", body: "Where you are in the pregnancy, how you're sleeping, and anything your obstetric provider has flagged." },
      { title: "Positioning first", body: "We set up supported positioning before any assessment, and adapt it as pregnancy progresses." },
      { title: "Gentle technique", body: "Low-force, position-adapted technique. We explain what we're doing before we do it." },
      { title: "Coordination", body: "We're glad to coordinate with your obstetric provider, and will tell you when something sits outside our scope." },
    ],
    faqs: [
      { q: "Is chiropractic care appropriate during pregnancy?", a: "Many people receive chiropractic care during pregnancy using position-adapted technique. Whether it's appropriate for you specifically is a conversation for your assessment and your obstetric provider." },
      { q: "How is the technique different?", a: "Positioning is supported and adapted to your stage, and force is substantially lower than a standard adult adjustment." },
    ],
  },
  {
    slug: "auto-injury-care",
    title: "Auto Injury Care",
    summary: "Assessment and care after a motor vehicle collision.",
    intro:
      "Discomfort after a collision often arrives days later rather than immediately. This is a careful assessment of what the collision affected, and care paced to what your body is actually ready for.",
    meta: "50 min · New patients",
    icon: "stethoscope",
    imageKey: "auto-injury-care",
    relevantFor: [
      "Neck or back discomfort following a motor vehicle collision",
      "Symptoms that appeared a day or more after the collision",
      "Reduced range of motion since the incident",
    ],
    visit: [
      { title: "What happened", body: "The mechanics of the collision matter — direction of impact, head position, whether you saw it coming." },
      { title: "Careful assessment", body: "We assess conservatively and will refer for imaging or to another provider when that's the right call." },
      { title: "Paced treatment", body: "Early care is gentler. We progress as your range of motion and comfort allow rather than on a fixed schedule." },
      { title: "Documentation", body: "We keep clear records of findings and progress, which matters if there's a claim involved." },
    ],
    faqs: [
      { q: "I felt fine at the scene. Is it worth coming in?", a: "Delayed-onset discomfort after a collision is common. An assessment is reasonable even if you felt fine initially." },
      { q: "Do you handle personal injury claims?", a: "We keep thorough documentation of our findings and your progress. Questions about the claim itself are best directed to your insurer or attorney." },
    ],
  },
  {
    slug: "maintenance-care",
    title: "Maintenance Care",
    summary: "Occasional visits for patients who are out of pain.",
    intro:
      "Some patients finish a course of care, feel well, and want to stay that way. Maintenance care is a low-frequency visit — typically monthly or less — for people who are already out of discomfort.",
    meta: "20 min · Flexible scheduling",
    icon: "heart-pulse",
    imageKey: "maintenance-care",
    relevantFor: [
      "Having completed a course of care and wanting to keep the result",
      "A physically demanding job or training schedule",
      "Preferring occasional check-ins to waiting for a flare-up",
    ],
    visit: [
      { title: "Quick check-in", body: "What's changed since last time, and whether anything has crept back." },
      { title: "Focused assessment", body: "Shorter than a full workup, directed at the areas that have historically been your pattern." },
      { title: "Adjustment as needed", body: "If nothing needs adjusting, we'll say so. A maintenance visit doesn't automatically mean treatment." },
    ],
    faqs: [
      { q: "Is maintenance care necessary?", a: "No. It's a choice some patients make once they're out of discomfort, not a requirement or a condition of care." },
      { q: "How often would I come in?", a: "Typically monthly or less. We'd rather see you at the interval that actually suits you than sell a fixed schedule." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function relatedServices(slug: string, count = 3): Service[] {
  return services.filter((s) => s.slug !== slug).slice(0, count);
}
