export const CATEGORIES = [
  { key: "R", label: "Resources", full: "RESOURCES" },
  { key: "E", label: "Experience", full: "EXPERIENCE" },
  { key: "A", label: "Authority Readiness", full: "AUTHORITY READINESS" },
  { key: "C", label: "Commitment", full: "COMMITMENT" },
  { key: "H", label: "Operational Discipline", full: "OPERATIONAL DISCIPLINE" },
];

export const QUESTIONS = [
  // R — Resources (0–2)
  {
    cat: 0,
    text: "If your truck has a major repair in the first 60 days, do you have funds to cover it without stopping operations?",
    options: [{ text: "Yes", score: 3 }, { text: "Possibly", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 0,
    text: "How many months of operating expenses could you cover without new freight revenue?",
    options: [{ text: "3+ months", score: 3 }, { text: "1–2 months", score: 2 }, { text: "Less than 30 days", score: 1 }],
  },
  {
    cat: 0,
    text: "Do you know your cost per mile including insurance, fuel, maintenance, and fixed expenses?",
    options: [{ text: "Yes", score: 3 }, { text: "Rough estimate", score: 2 }, { text: "No", score: 1 }],
  },
  // E — Experience (3–5)
  {
    cat: 1,
    text: "Have you previously worked in trucking operations, dispatch, or logistics?",
    options: [{ text: "Yes", score: 3 }, { text: "Limited exposure", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 1,
    text: "Do you understand how broker contracts, detention policies, and rate confirmations affect revenue?",
    options: [{ text: "Yes", score: 3 }, { text: "Somewhat", score: 2 }, { text: "Not yet", score: 1 }],
  },
  {
    cat: 1,
    text: "Have you personally managed or reviewed Hours of Service logs before?",
    options: [{ text: "Yes", score: 3 }, { text: "Some familiarity", score: 2 }, { text: "No", score: 1 }],
  },
  // A — Authority Readiness (6–8)
  {
    cat: 2,
    text: "Do you have a documented Driver Qualification file prepared per FMCSA requirements?",
    options: [{ text: "Yes", score: 3 }, { text: "Partially", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 2,
    text: "Are you enrolled in a Drug & Alcohol testing consortium?",
    options: [{ text: "Yes", score: 3 }, { text: "In progress", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 2,
    text: "Do you currently maintain vehicle inspection and maintenance documentation?",
    options: [{ text: "Yes", score: 3 }, { text: "Some records", score: 2 }, { text: "No", score: 1 }],
  },
  // C — Commitment (9–11)
  {
    cat: 3,
    text: "How many hours per week are you prepared to dedicate to compliance and operational systems?",
    options: [{ text: "15+ hours", score: 3 }, { text: "5–15 hours", score: 2 }, { text: "Minimal", score: 1 }],
  },
  {
    cat: 3,
    text: "Which best reflects your mindset?",
    options: [
      { text: "Build a stable long-term operation", score: 3 },
      { text: "Try trucking and see", score: 2 },
      { text: "Make fast money", score: 1 },
    ],
  },
  {
    cat: 3,
    text: "If compliance requires significant time, how likely are you to maintain it consistently?",
    options: [{ text: "Very likely", score: 3 }, { text: "Somewhat", score: 2 }, { text: "Unlikely", score: 1 }],
  },
  // H — Operational Discipline (12–13)
  {
    cat: 4,
    text: "What is your timeline for launching?",
    options: [{ text: "Within 60–90 days", score: 3 }, { text: "Already operating", score: 2 }, { text: "Immediately / as fast as possible", score: 1 }],
  },
  {
    cat: 4,
    text: "If authority can't generate profit in the first 90 days, what's your plan?",
    options: [{ text: "Maintain and stabilize", score: 3 }, { text: "Adjust strategy", score: 2 }, { text: "Shut down", score: 1 }],
  },
];

export const CATEGORY_INSIGHTS = [
  "Most first-year authority failures are not compliance failures. They are cash failures. Money buys time. Time is what compliance requires.",
  "Experience doesn't determine survival — but the gaps it leaves do. What you don't know yet, the road will teach you at full price.",
  "Paperwork gaps are the FMCSA's favorite finding during a new entrant audit. They're not looking for perfect carriers — they're looking for missing documents.",
  "The carriers who survive the first year are not the most talented. They are the ones who showed up for the business side when the freight got busy.",
  null,
];

export const RESULT_CONFIG = {
  GO: {
    label: "REACH RESULT: GO",
    color: "#22c55e",
    rgb: "34,197,94",
    headline: "The conditions to survive are there.",
    bullets: [
      "GO doesn't mean you're guaranteed to win — it means you've got enough in place to install the guard around your authority.",
      "Your next step is Ground 0: The Wisdom Module.",
      "This 90-minute orientation shows you what motor carrier ownership actually requires before you spend money or file paperwork.",
    ],
    cta: "Begin Ground 0",
    ctaHref: "/ground-0-briefing",
    sub: "GO means the conditions for survival exist. Now install the system that keeps it that way.",
  },
  WAIT: {
    label: "REACH RESULT: WAIT",
    color: "#F59E0B",
    rgb: "245,158,11",
    headline: "The system is doing its job — telling you \"not yet\" before you burn money, time, and your family's patience.",
    bullets: [
      "WAIT is not failure. It's wisdom.",
      "Your REACH check identified gaps in the areas listed below.",
      "We'd rather tell you \"not yet\" than watch you lose a truck, a house, or a marriage you could have protected.",
    ],
    cta: "Return to Homepage",
    ctaHref: "/",
    sub: "WAIT means wisdom says 'not yet' so you don't walk into a loss you can't afford.",
  },
  "NO-GO": {
    label: "REACH RESULT: NO-GO",
    color: "#f87171",
    rgb: "248,113,113",
    headline: "This is the system protecting you.",
    bullets: [
      "NO-GO means the conditions for survival aren't in place right now. That's not a judgment — it's a reality check.",
      "If you try to push through anyway, the road will correct that faster than any program.",
      "Take time. Build your resources. Come back when the foundation is stronger.",
    ],
    cta: "Return to Homepage",
    ctaHref: "/",
    sub: "This result protects you from a preventable loss. It is not a rejection.",
  },
};

export const CATEGORY_GAP_CONFIG = [
  {
    key: "r",
    code: "R",
    name: "RESOURCES",
    max: 9,
    feedback: {
      pass: "Your capital position appears sufficient for the implementation period.",
      warning: "Your score indicates limited capital runway. Most new authorities need 3–6 months of operating reserves before consistent revenue arrives.",
      critical: "Your score indicates significant financial constraints. Operating authority without adequate reserves dramatically increases early failure risk.",
    },
  },
  {
    key: "e",
    code: "E",
    name: "EXPERIENCE",
    max: 9,
    feedback: {
      pass: "Your operational background appears sufficient.",
      warning: "Your score indicates limited industry experience. Consider whether you have access to experienced operational support before launch.",
      critical: "Your score indicates minimal trucking or compliance experience. The learning curve for new authority is steep without operational background.",
    },
  },
  {
    key: "a",
    code: "A",
    name: "AUTHORITY READINESS",
    max: 9,
    feedback: {
      pass: "Registration and filing status appears aligned.",
      warning: "Your score indicates incomplete authority setup. Verify USDOT, MC, BOC-3, and insurance filings are complete before operating.",
      critical: "Your score indicates authority is not properly established. Complete all registration and filing requirements before proceeding.",
    },
  },
  {
    key: "c",
    code: "C",
    name: "COMMITMENT",
    max: 9,
    feedback: {
      pass: "Your commitment level and operational discipline appear sufficient.",
      warning: "Your score indicates limited time availability or conditional commitment. This increases implementation risk during the first 90 days.",
      critical: "Your score indicates minimal commitment to ongoing compliance management. The Standard requires consistent attention — especially in the first 90 days.",
    },
  },
  {
    key: "h",
    code: "H",
    name: "OPERATIONAL DISCIPLINE",
    max: 6,
    feedback: {
      pass: "Risk understanding and contingency planning appear adequate.",
      warning: "Your score indicates gaps in operational planning. Ground 0 content directly addresses timeline and contingency planning.",
      critical: "Your score indicates significant gaps in operational discipline. Review Ground 0 materials carefully before proceeding.",
    },
  },
];

// Returns display names of flagged (warning/critical) categories
export function getFlaggedNames(scores) {
  return CATEGORY_GAP_CONFIG
    .filter((cat) => getGapStatus(scores[cat.key], cat.max) !== "pass")
    .map((cat) => cat.name.charAt(0) + cat.name.slice(1).toLowerCase());
}

export function getGapStatus(score, max) {
  const pct = score / max;
  if (pct >= 0.78) return "pass";
  if (pct >= 0.44) return "warning";
  return "critical";
}
