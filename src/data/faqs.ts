export type Faq = { q: string; a: string };

export type FaqGroup = { title: string; items: Faq[] };

/** Grouped for the /faq page. The first group also drives the homepage preview. */
export const faqGroups: FaqGroup[] = [
  {
    title: "Your first visit",
    items: [
      {
        q: "What should I expect at my first visit?",
        a: "About fifty minutes. It starts with a conversation about your history — what you do all day, how you sleep, where the discomfort actually travels — followed by a postural, range-of-motion and gait assessment. Then we explain what we found in plain language before any treatment is discussed. Treatment usually starts the same day if it's appropriate.",
      },
      {
        q: "How long does an appointment take?",
        a: "A first visit runs about fifty minutes. Follow-up visits are typically twenty to thirty minutes, and a massage therapy appointment runs thirty to sixty minutes depending on what you book.",
      },
      {
        q: "What should I bring?",
        a: "Your insurance card and photo ID, plus any imaging or reports from another provider if you have them. If your concern is desk-related, a photo of your workstation is genuinely useful.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable clothing you can move in. We'll ask you to go through some range-of-motion movements, so avoid anything restrictive. There's no need to change into a gown.",
      },
    ],
  },
  {
    title: "Booking and logistics",
    items: [
      {
        q: "How do I schedule?",
        a: "Call the front desk during opening hours, or use the booking form on this site and we'll call you back to confirm a time — usually within one business hour.",
      },
      {
        q: "Where are you located?",
        a: "4501 McCullough Ave #107, San Antonio, TX 78212, in Julington Creek Chiropractic. There's free patient parking on site, directly in front of Suite 107.",
      },
      {
        q: "Do I need a referral?",
        a: "No. You can book directly. We're glad to coordinate with your physician if you'd like us to.",
      },
    ],
  },
  {
    title: "Care and treatment",
    items: [
      {
        q: "Does an adjustment hurt?",
        a: "No. Most patients describe it as a quick release followed by noticeably easier movement. If a technique isn't comfortable for you, we use a lower-force alternative.",
      },
      {
        q: "How many visits will I need?",
        a: "That depends on what we find, and we'll give you an honest range at the end of your assessment. You're never locked into a package.",
      },
      {
        q: "Do you work with sports-related concerns?",
        a: "Yes. Care is built around the demands of your specific activity — training volume, recent changes, and where in the movement the discomfort shows up. We're glad to coordinate with a coach or trainer.",
      },
      {
        q: "Do you treat children?",
        a: "Yes. Pediatric technique uses a fraction of the force of an adult adjustment, and we explain exactly what we're doing before we do it.",
      },
      {
        q: "Can I get a massage and an adjustment in the same visit?",
        a: "Yes. Our massage therapists work alongside the doctors, which is the main reason patients tell us their results hold longer.",
      },
    ],
  },
  {
    title: "Insurance and payment",
    items: [
      {
        q: "Do you accept insurance?",
        a: "We accept most major plans and verify your benefits before your first visit, so you know what a visit costs before you sit down rather than three weeks later in the mail. Call the front desk with your plan details and we'll check for you.",
      },
      {
        q: "What if I don't have coverage?",
        a: "Self-pay patients are welcome, with straightforward per-visit pricing. Ask the front desk when you call and they'll walk you through it.",
      },
    ],
  },
];

/** Flat list, for pages that don't need grouping. */
export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);

/** The five objections that most often block a booking. */
export const homepageFaqs: Faq[] = [
  faqGroups[0].items[0],
  faqGroups[2].items[0],
  faqGroups[3].items[0],
  faqGroups[2].items[1],
  faqGroups[1].items[2],
];
