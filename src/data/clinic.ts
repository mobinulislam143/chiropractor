/**
 * The clinic-specific surface of this website.
 *
 * To launch the template for a different practice, replace the files in `src/data`
 * and the photography in `src/assets`. No component hard-codes a clinic name,
 * phone number, address or review.
 */

export type Hours = { days: string; time: string };
export type ApproachStep = { step: string; title: string; body: string };

export type SpineRegion = {
  id: "cervical" | "thoracic" | "lumbar" | "sacral";
  label: string;
  range: string;
  count: number;
  width: number;
  note: string;
  treats: string[];
};

export type ClinicConfig = typeof clinic;

export const clinic = {
  name: "Alamo Heights Chiropractic Health Center",
  shortName: "Alamo Heights Chiropractic",
  wordmark: "Alamo Heights",
  tagline: "Chiropractic and massage therapy in Alamo Heights, San Antonio.",
  city: "San Antonio",
  state: "TX",
  neighborhood: "Alamo Heights",

  /** Used for canonical URLs and Open Graph. Replace at launch. */
  siteUrl: "https://alamoheightschiropractic.example.com",

  phone: { display: "(210) 828-9211", href: "tel:+12108289211" },
  email: "front desk",

  address: {
    line1: "4501 McCullough Ave #107",
    line2: "San Antonio, TX 78212",
    full: "4501 McCullough Ave #107, San Antonio, TX 78212",
    street: "4501 McCullough Ave #107",
    postalCode: "78212",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=4501+McCullough+Ave+%23107+San+Antonio+TX+78212",
    parkingNote: "Free patient parking on site, directly in front of Suite 107.",
    /**
     * Drives the map pin on the contact page.
     *
     * Geocoded from `line1` via OpenStreetMap Nominatim, which resolved it to the
     * building at 4501 McCullough Avenue, Olmos Park. It marks the building, not
     * Suite 107's entrance — worth confirming against the real doorway at launch.
     */
    coords: { lat: 29.473811, lng: -98.491794 },
  },

  rating: { score: 4.9, count: 203, source: "Google" },

  hours: [
    { days: "Monday – Thursday", time: "8:00a – 6:00p" },
    { days: "Friday", time: "8:00a – 2:00p" },
    { days: "Saturday", time: "By appointment" },
    { days: "Sunday", time: "Closed" },
  ] satisfies Hours[],

  announcement: {
    message: "Now accepting new patients — most insurance plans welcome.",
    linkLabel: "Check your coverage",
    href: "/faq",
  },

  doctor: {
    name: "Dr. Taylor",
    credentials: "D.C. · Chiropractor",
    /** Drop a portrait into src/assets and wire it through src/data/images.ts. */
    photoCaption: "Portrait of Dr. Taylor in the treatment room, natural light",
    bio: "Patients come to us because something hurts, and they stay because they finally understand why. Every visit starts with listening — what you do all day, how you sleep, where the pain actually travels — before anything else happens.",
    credentialsList: [
      "Doctor of Chiropractic",
      "Massage therapists on staff, working alongside the doctors",
      "Care for adults and children",
    ],
    badges: ["Texas Board Licensed", "Chiropractic & massage therapy"],
  },

  team: [
    { name: "Rose", role: "Front desk & scheduling" },
    { name: "Lorena", role: "Massage therapist" },
  ],

  /** The "our approach" section — three steps, in order. */
  approach: [
    {
      step: "01",
      title: "We listen first",
      body: "A real conversation about your history, your work, and where the pain actually goes. Nobody is moved through in eight minutes.",
    },
    {
      step: "02",
      title: "We assess, then explain",
      body: "A postural, range-of-motion and gait workup — and then a plain-language explanation of what we found, before any treatment is discussed.",
    },
    {
      step: "03",
      title: "Adjustment and soft tissue, together",
      body: "Our massage therapists work alongside the doctors, so the muscle holding a joint out of position gets treated in the same visit.",
    },
  ] satisfies ApproachStep[],

  /** Differentiators. Each one is checkable — no vague reassurance. */
  whyChooseUs: [
    {
      icon: "clock",
      title: "A fifty-minute first visit",
      body: "The assessment is longer than the adjustment. You leave understanding your own back, not holding a treatment plan you didn't follow.",
    },
    {
      icon: "hand",
      title: "Massage therapists on staff",
      body: "They work alongside the doctors, so the muscle holding a joint out of position is treated in the same visit rather than a separate appointment.",
    },
    {
      icon: "shield-check",
      title: "Benefits checked before you arrive",
      body: "We verify your coverage ahead of the first visit, so you know what it costs before you sit down.",
    },
    {
      icon: "check",
      title: "No packages, no lock-in",
      body: "You get an honest range of visits at the end of your assessment. If chiropractic isn't the right route, we'll tell you that too.",
    },
  ],

  insurance: {
    heading: "Insurance & payment",
    body: "We verify your benefits before your first visit, so you know what a visit costs before you sit down — not three weeks later in the mail.",
    accepted: [
      "Blue Cross Blue Shield",
      "Aetna",
      "Cigna",
      "UnitedHealthcare",
      "Medicare",
      "Auto accident / personal injury",
    ],
    notes: [
      {
        title: "Self-pay welcome",
        body: "Straightforward per-visit pricing for patients without coverage. Ask the front desk when you call.",
      },
      {
        title: "No referral needed",
        body: "You can book directly. We're glad to coordinate with your physician if you'd like us to.",
      },
    ],
  },

  /** Content for the spinal region explorer. */
  spine: [
    { id: "cervical", label: "Cervical", range: "C1 – C7", count: 7, width: 44, note: "Neck, headaches, jaw tension", treats: ["Tension headaches", "Neck stiffness", "Desk posture", "Whiplash"] },
    { id: "thoracic", label: "Thoracic", range: "T1 – T12", count: 12, width: 58, note: "Mid-back, posture, rib restriction", treats: ["Mid-back pain", "Rib restriction", "Shoulder mechanics"] },
    { id: "lumbar", label: "Lumbar", range: "L1 – L5", count: 5, width: 70, note: "Low back, sciatica, hip mechanics", treats: ["Low back pain", "Sciatica", "Disc irritation", "Hip mechanics"] },
    { id: "sacral", label: "Sacrum", range: "S1 – S5", count: 3, width: 76, note: "Pelvic alignment, gait, stability", treats: ["Pelvic alignment", "Gait imbalance", "SI joint pain"] },
  ] satisfies SpineRegion[],

  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Conditions", href: "/conditions" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  legal: "Licensed chiropractic clinic — State of Texas.",
} as const;
