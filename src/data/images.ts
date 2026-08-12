import type { StaticImageData } from "next/image";

import about1 from "@/assets/about1.jpg";
import about2 from "@/assets/about2.jpg";
import adultLifestyle from "@/assets/adult_lifestyle.jpg";
import backMobility from "@/assets/backMobility.jpg";
import condAuto from "@/assets/cond_auto.jpg";
import condHeadache from "@/assets/cond_headache.jpg";
import condMobility from "@/assets/cond_mobility.jpg";
import condSports from "@/assets/cond_sports.jpg";
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import interior1 from "@/assets/interior1.jpg";
import interior2 from "@/assets/interior2.jpg";
import neckPosture from "@/assets/neck_posture.jpg";
import neckPosture2 from "@/assets/neck_posture2.jpg";
import service1 from "@/assets/service1.jpg";
import service2 from "@/assets/service2.jpg";
import service3 from "@/assets/service3.jpg";
import service4 from "@/assets/service4.jpg";
import service5 from "@/assets/service5.jpg";
import service6 from "@/assets/services6.jpg";
import service7 from "@/assets/service7_maintenance.jpg";

/**
 * Every photograph on the site resolves through this file.
 *
 * To re-shoot the site for another clinic: drop new files into `src/assets`,
 * repoint the imports above, and rewrite the `alt` strings. No component holds
 * an image path of its own.
 */
export type Img = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position, when the subject sits off-centre in the frame. */
  position?: string;
};

export const images = {
  hero: {
    primary: {
      src: hero1,
      alt: "Chiropractor assessing a patient's spinal alignment during a consultation",
      position: "50% 35%",
    },
    secondary: {
      src: hero2,
      alt: "Chiropractor guiding a patient through a gentle mobility movement",
      position: "50% 40%",
    },
  },

  about: {
    primary: {
      src: about1,
      alt: "Chiropractor talking with a patient before beginning an assessment",
      position: "50% 40%",
    },
    secondary: {
      src: about2,
      alt: "Clinician reviewing a patient's movement history in the treatment room",
      position: "50% 45%",
    },
  },

  interior: {
    primary: {
      src: interior1,
      alt: "Bright, uncluttered treatment room at the clinic",
      position: "50% 50%",
    },
    secondary: {
      src: interior2,
      alt: "Clinic reception and waiting area with natural light",
      position: "50% 50%",
    },
  },

  lifestyle: {
    src: adultLifestyle,
    alt: "Adult moving comfortably through an everyday activity outdoors",
    position: "50% 40%",
  },

  education: {
    back: {
      src: backMobility,
      alt: "Person performing a controlled lower-back mobility movement",
      position: "50% 45%",
    },
    neck: {
      src: neckPosture,
      alt: "Close view of seated neck and shoulder posture at a desk",
      position: "50% 35%",
    },
    neckSecondary: {
      src: neckPosture2,
      alt: "Clinician assessing a patient's neck range of motion",
      position: "50% 35%",
    },
  },

  /** Keyed by service slug — see `src/data/services.ts`. */
  services: {
    "spinal-adjustment": {
      src: service1,
      alt: "Chiropractor performing a spinal adjustment on a treatment table",
      position: "50% 40%",
    },
    "corrective-care": {
      src: service2,
      alt: "Hands-on chiropractic care focused on the mid-back",
      position: "50% 45%",
    },
    "posture-mobility": {
      src: service5,
      alt: "Clinician assessing a patient's standing posture and alignment",
      position: "50% 35%",
    },
    "sports-chiropractic": {
      src: service4,
      alt: "Athlete working through a guided recovery movement with a clinician",
      position: "50% 40%",
    },
    "auto-injury-care": {
      src: service3,
      alt: "Patient guided through a slow, controlled recovery movement",
      position: "50% 40%",
    },
    "maintenance-care": {
      src: service7,
      alt: "Clinician's hands supporting a patient's knee through a range-of-motion check",
      position: "50% 45%",
    },

    /* ── Prenatal chiropractic ────────────────────────────────────────────────
       No supplied photograph depicts pregnancy. This frame is the closest honest
       match in the set: a patient seated and supported while a clinician works on
       the lower back at the same level — the position-adapted, low-force approach
       the service describes, and the region (low back and pelvis) it addresses.

       The alt text deliberately does NOT describe the patient as pregnant, because
       the photograph does not show that. If a genuine prenatal frame is supplied
       later, drop it in `src/assets`, repoint the import, and rewrite the alt. */
    "prenatal-chiropractic": {
      src: service6,
      alt: "Clinician applying gentle, hands-on care to a seated patient's lower back",
      position: "50% 45%",
    },
  },

  /** Keyed by condition slug — see `src/data/conditions.ts`. */
  conditions: {
    "back-discomfort": {
      src: backMobility,
      alt: "Person performing a controlled lower-back mobility movement",
      position: "50% 45%",
    },
    "neck-discomfort": {
      src: neckPosture,
      alt: "Close view of seated neck and shoulder posture at a desk",
      position: "50% 35%",
    },
    "posture-concerns": {
      src: neckPosture2,
      alt: "Clinician assessing a patient's neck and shoulder position",
      position: "50% 35%",
    },
    "mobility-limitations": {
      src: condMobility,
      alt: "Clinician assisting a patient through a supported range-of-motion stretch",
      position: "50% 45%",
    },
    "sports-related-concerns": {
      src: condSports,
      alt: "Clinicians working with an athlete through a guided recovery session",
      position: "50% 40%",
    },
    "auto-accident-recovery": {
      src: condAuto,
      alt: "Clinician examining a patient's neck and shoulder after an injury",
      position: "50% 35%",
    },
    "headache-related-tension": {
      src: condHeadache,
      alt: "Adult easing tension across the temples and brow",
      position: "50% 30%",
    },
  },
} satisfies Record<string, unknown>;

export type ServiceImageKey = keyof typeof images.services;
export type ConditionImageKey = keyof typeof images.conditions;
