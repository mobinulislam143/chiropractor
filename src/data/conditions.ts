import type { ConditionImageKey } from "./images";

export type Condition = {
  slug: string;
  title: string;
  /** Short scanning line used in grids. */
  summary: string;
  /** What patients typically describe — not diagnostic criteria. */
  signs: string[];
  intro: string;
  /** Educational explanation. Deliberately non-diagnostic. */
  explanation: string[];
  /** How chiropractic may fit into a broader plan — never framed as a cure. */
  careApproach: string[];
  faqs: { q: string; a: string }[];
  imageKey: ConditionImageKey;
  /** Slugs of services that commonly relate to this concern. */
  relatedServices: string[];
};

/**
 * Educational content only. Nothing here diagnoses, and nothing here claims that
 * chiropractic care resolves a condition. Copy is reviewed against that rule.
 */
export const conditions: Condition[] = [
  {
    slug: "back-discomfort",
    title: "Back Discomfort",
    summary: "Stiffness on waking, discomfort when seated, or a recurring lower-back pattern.",
    signs: ["Stiffness in the first hour after waking", "Discomfort that builds while sitting", "A pattern that returns to the same spot"],
    intro:
      "Lower-back discomfort is one of the most common reasons people come in, and it's rarely traceable to a single dramatic moment. More often it's the accumulation of how you sit, lift, sleep and move.",
    explanation: [
      "The lower back is built to move as a series of segments. When one of those segments moves less than it should, the ones around it usually take on more than they should — and that redistribution is often where the discomfort is felt.",
      "This is why the sore spot and the restricted spot aren't always the same place. Assessment matters more than treating wherever it hurts.",
      "Most lower-back discomfort is mechanical rather than structural. That distinction is worth understanding, because it changes what's reasonable to expect from care.",
    ],
    careApproach: [
      "We assess how each segment of your lower back actually moves before discussing any treatment.",
      "Chiropractic care may help restore mobility to restricted segments, which some patients find eases the load on surrounding areas.",
      "Movement work between visits usually matters as much as what happens in the room.",
      "If your presentation suggests something outside our scope, we'll tell you and refer appropriately.",
    ],
    faqs: [
      { q: "Should I rest or keep moving?", a: "For most mechanical back discomfort, gentle continued movement tends to be better tolerated than extended rest. What's appropriate for you depends on your assessment." },
      { q: "Do I need an MRI first?", a: "Usually not. Imaging is valuable when specific findings suggest it, and we'll refer you when that's the case rather than as a matter of routine." },
      { q: "When should I see a physician instead?", a: "Discomfort with fever, unexplained weight loss, loss of bowel or bladder control, or significant progressive weakness warrants medical assessment promptly. We'll refer you if we see those signs." },
    ],
    imageKey: "back-discomfort",
    relatedServices: ["spinal-adjustment", "corrective-care", "posture-mobility"],
  },
  {
    slug: "neck-discomfort",
    title: "Neck Discomfort",
    summary: "Limited rotation, desk-related ache, or tension across the shoulders.",
    signs: ["Difficulty turning to check a blind spot", "Ache that builds through a working day", "Tension across the tops of the shoulders"],
    intro:
      "Neck discomfort frequently tracks with how much of your day is spent looking at a screen — and with how long you hold a single position rather than the position itself.",
    explanation: [
      "The neck supports the head through a wide range of motion. Sustained positions — particularly a forward head position at a monitor — ask the muscles at the back of the neck to work continuously rather than intermittently.",
      "Over time, some segments of the neck move less freely. The surrounding muscles often respond by holding more tension, which is the sensation most people actually notice.",
      "Duration usually matters more than posture. Two hours in a reasonable position without moving can be less comfortable than frequent movement in an imperfect one.",
    ],
    careApproach: [
      "We assess rotation and extension segment by segment, rather than describing your posture in general terms.",
      "Care typically combines adjustment with soft tissue work, since the muscular tension and joint restriction usually accompany each other.",
      "We'll review your workstation if screen time is a factor, and suggest a small number of practical changes.",
      "Neck discomfort with headache, dizziness or arm symptoms gets a more careful assessment before any treatment.",
    ],
    faqs: [
      { q: "Is neck adjustment safe?", a: "Neck adjustment is widely used, and serious complications are rare. We screen for the specific factors that would make it inappropriate, and lower-force alternatives are always available if you'd prefer them." },
      { q: "What if I'm nervous about my neck being adjusted?", a: "Tell us. There are effective lower-force techniques, and we'd rather use one you're comfortable with than one you brace against." },
      { q: "Will changing my desk setup fix it?", a: "It may help, but setup alone rarely resolves an established pattern. Movement frequency through the day usually matters more than the setup itself." },
    ],
    imageKey: "neck-discomfort",
    relatedServices: ["posture-mobility", "spinal-adjustment", "corrective-care"],
  },
  {
    slug: "posture-concerns",
    title: "Posture Concerns",
    summary: "Concerns about alignment, rounded shoulders, or how you hold yourself.",
    signs: ["Noticing a rounded or forward position in photographs", "Tension that follows sustained positions", "Being told your posture has changed"],
    intro:
      "Posture is one of the most discussed and least useful ideas in back care — largely because it's usually framed as a fixed shape you either have or don't. It's more usefully understood as movement variety.",
    explanation: [
      "There isn't one correct posture. Positions that are comfortable for a short period become uncomfortable when sustained, and that's true of positions typically described as good.",
      "What tends to correlate with discomfort is how long you hold any single position, and how much freedom of movement you have available when you leave it.",
      "For that reason, we assess available range of motion rather than photographing you against a grid and describing the shape.",
    ],
    careApproach: [
      "We assess where your available movement is genuinely limited, not how closely you resemble a diagram.",
      "Care aims to restore mobility to restricted areas so more positions are comfortably available to you.",
      "We suggest a small number of practical changes to how often you move, rather than a posture you're asked to hold.",
      "We won't promise a permanently altered posture — that isn't a claim the evidence supports.",
    ],
    faqs: [
      { q: "Can bad posture be corrected permanently?", a: "Mobility and movement habits can change, and both affect how you hold yourself. A permanently different resting posture isn't something we'd promise." },
      { q: "Do posture braces help?", a: "They may provide a short-term reminder, but they don't build the mobility or strength that sustains a position. We'd generally prioritise movement work." },
    ],
    imageKey: "posture-concerns",
    relatedServices: ["posture-mobility", "corrective-care", "spinal-adjustment"],
  },
  {
    slug: "mobility-limitations",
    title: "Mobility Limitations",
    summary: "Reduced range of motion, or movements that no longer feel available.",
    signs: ["Reaching or turning that feels restricted", "Stiffness that takes longer to ease than it used to", "Avoiding certain movements without deciding to"],
    intro:
      "Sometimes the concern isn't discomfort so much as range — a movement that used to be available and now isn't, or one you've quietly started working around.",
    explanation: [
      "Range of motion is the product of several things: joint mobility, soft tissue length, and how confident your nervous system is about the movement.",
      "People often adapt to a lost range without noticing, substituting a nearby joint to accomplish the movement. That substitution frequently loads the substituting area over time.",
      "Assessing which segment is actually restricted — rather than which one is complaining — is usually the useful step.",
    ],
    careApproach: [
      "We assess the movement you're describing directly, and look at the joints above and below it.",
      "Care may combine adjustment with soft tissue work to address restriction in the segments that assessed as limited.",
      "Progressive movement work between visits is typically central rather than supplementary.",
      "Improvement in range is usually gradual, and we'll be honest about expected pace.",
    ],
    faqs: [
      { q: "Is lost mobility just part of getting older?", a: "Some change with age is expected, but a specific restriction that appeared over months is usually worth assessing rather than accepting." },
      { q: "How long does it take to see a change?", a: "It varies with what's driving the restriction and how long it's been present. We'll give you an honest range after assessing rather than before." },
    ],
    imageKey: "mobility-limitations",
    relatedServices: ["posture-mobility", "corrective-care", "sports-chiropractic"],
  },
  {
    slug: "sports-related-concerns",
    title: "Sports-Related Concerns",
    summary: "Recurring strain, slow recovery, or discomfort tied to training.",
    signs: ["Strain that returns when training volume rises", "Recovery that takes longer than it used to", "Discomfort at a specific point in a movement"],
    intro:
      "Training-related discomfort tends to be a load problem before it's a tissue problem — the tissue is often fine, but the rate at which demand increased wasn't.",
    explanation: [
      "Tissues adapt to load, but they adapt at their own pace. Most recurring training strain traces back to volume or intensity rising faster than that.",
      "Where the discomfort appears in a movement is diagnostically useful. Discomfort at the top of a range points somewhere different than discomfort under load at the bottom.",
      "A restriction elsewhere in the chain frequently shows up as strain at the point that compensated for it — which is why we assess beyond the sore area.",
    ],
    careApproach: [
      "We assess the movement your sport actually requires, under conditions closer to how you use it.",
      "Care addresses restrictions found in the assessment, in the sore area and in the segments feeding into it.",
      "We'll have a direct conversation about training load, including when reducing it is the faster route back.",
      "We're glad to coordinate with a coach, trainer or physician where that helps.",
    ],
    faqs: [
      { q: "Will I have to stop training?", a: "Often not entirely. Modifying load is more common than stopping, though what's appropriate depends on the assessment." },
      { q: "Should I use ice or heat?", a: "For most recurring training strain, gentle movement tends to be more useful than either. Both are reasonable for short-term comfort." },
    ],
    imageKey: "sports-related-concerns",
    relatedServices: ["sports-chiropractic", "corrective-care", "maintenance-care"],
  },
  {
    slug: "auto-accident-recovery",
    title: "Auto Accident Recovery",
    summary: "Whiplash-type symptoms or delayed-onset discomfort after a collision.",
    signs: ["Discomfort that appeared a day or more after a collision", "Reduced neck rotation since the incident", "Headache or tension following an impact"],
    intro:
      "Discomfort after a motor vehicle collision commonly arrives on a delay — often twenty-four to seventy-two hours later — which is why feeling fine at the scene doesn't tell you much.",
    explanation: [
      "In a collision, the head and neck can move through a rapid range in a very short time. The tissues involved are often irritated rather than damaged, but the irritation takes time to become noticeable.",
      "The direction of impact and where your head was looking at the moment of collision both influence what's affected, which is why we ask about the mechanics in detail.",
      "Early assessment is worthwhile even when symptoms are mild, both for care and for having a clear record of findings.",
    ],
    careApproach: [
      "We assess conservatively after a collision, and refer for imaging or to a physician when findings suggest it.",
      "Early care is gentler, progressing as range of motion and comfort allow rather than on a fixed schedule.",
      "We keep clear documentation of findings and progress throughout.",
      "Some presentations after a collision need medical assessment first. We'll say so directly if that's the case.",
    ],
    faqs: [
      { q: "I felt fine at the scene — is an assessment still worth it?", a: "Yes. Delayed-onset discomfort is common after a collision, and an early baseline assessment is useful even if you feel well." },
      { q: "How long does recovery take?", a: "It varies considerably with the collision and the individual. We'll give you a realistic range after assessing, and adjust it as we go." },
      { q: "Do you work with insurance claims?", a: "We maintain thorough documentation of findings and progress. Questions about the claim itself are best directed to your insurer or attorney." },
    ],
    imageKey: "auto-accident-recovery",
    relatedServices: ["auto-injury-care", "spinal-adjustment", "corrective-care"],
  },
  {
    slug: "headache-related-tension",
    title: "Headache-Related Tension",
    summary: "Tension across the neck and shoulders accompanying headache.",
    signs: ["Tension at the base of the skull", "Headache that follows long screen sessions", "Neck stiffness alongside the headache"],
    intro:
      "Some headaches are accompanied by, and appear to track with, tension and restricted movement in the neck. Those are the ones where assessing the neck is reasonable.",
    explanation: [
      "The upper neck and the base of the skull share nerve pathways with parts of the head. Tension and restriction in that area can accompany headache symptoms for some people.",
      "This doesn't apply to every headache. Migraine, headaches with visual or neurological symptoms, and sudden severe headaches are different presentations that warrant medical assessment.",
      "We screen for that distinction before discussing whether chiropractic care is a sensible part of your picture at all.",
    ],
    careApproach: [
      "We start by screening for headache presentations that need medical assessment rather than ours.",
      "Where neck restriction accompanies the headache, care addresses mobility in the upper neck and surrounding tissue.",
      "Some patients find that easing neck tension changes their headache pattern. We won't predict that for you in advance.",
      "If your headaches don't respond as expected, we'll say so and help you find the right next step.",
    ],
    faqs: [
      { q: "Can chiropractic care treat migraines?", a: "Migraine is a distinct neurological condition, and we wouldn't present chiropractic care as a treatment for it. Where neck tension accompanies migraine, addressing that is sometimes helpful — but that's a narrower claim." },
      { q: "When should a headache be seen by a physician?", a: "A sudden severe headache, one with visual or neurological symptoms, one following a head injury, or a marked change in your usual pattern all warrant prompt medical assessment." },
    ],
    imageKey: "headache-related-tension",
    relatedServices: ["posture-mobility", "spinal-adjustment", "corrective-care"],
  },
];

export function getCondition(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
