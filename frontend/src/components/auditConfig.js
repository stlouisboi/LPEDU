// Shared audit readiness config — mirrors backend QUESTION_BANK, DOMAIN_CONFIG, etc.

export const QUESTION_BANK = [
  {
    id: "dq_01", domain: "driver_qualification", order: 1,
    prompt: "Do you have a complete DQ file for every active driver — application, MVR, medical certificate, road test, and Clearinghouse query all on file?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
  {
    id: "dq_02", domain: "driver_qualification", order: 2,
    prompt: "Have you run an annual Clearinghouse query for every driver within the past 12 months?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
  {
    id: "da_01", domain: "drug_alcohol", order: 1,
    prompt: "Are you enrolled with a registered C/TPA and is your random testing pool currently active?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
  {
    id: "da_02", domain: "drug_alcohol", order: 2,
    prompt: "Does every driver have a signed D&A policy acknowledgment on file, and was a pre-employment drug test completed before their first dispatch?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
  {
    id: "hos_01", domain: "hos_eld", order: 1,
    prompt: "Is your ELD registered with an FMCSA-approved provider and is the instruction card in every cab?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0 },
  },
  {
    id: "hos_02", domain: "hos_eld", order: 2,
    prompt: "Do you have 6 months of complete driver logs and supporting documents (BOLs, fuel receipts) on file?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
  {
    id: "vm_01", domain: "vehicle_maintenance", order: 1,
    prompt: "Does every vehicle have a current annual inspection within the past 365 days?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0 },
  },
  {
    id: "vm_02", domain: "vehicle_maintenance", order: 2,
    prompt: "Do you have DVIRs on file for every day each vehicle was operated in the past 90 days?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
  {
    id: "ia_01", domain: "insurance_authority", order: 1,
    prompt: "Does SAFER currently show Active insurance with your exact legal name matching your policy?",
    isCritical: true, criticalFailOn: ["NO", "NOT_SURE"], weights: { YES: 1, NO: 0, NOT_SURE: 0 },
  },
  {
    id: "ia_02", domain: "insurance_authority", order: 2,
    prompt: "Is your MCS-150 current — filed within the past two years or since your last operational change?",
    isCritical: false, criticalFailOn: [], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
  {
    id: "ar_01", domain: "audit_response", order: 1,
    prompt: "Have you reviewed and responded to all FMCSA correspondence, portal messages, and audit notices within required deadlines?",
    isCritical: true, criticalFailOn: ["NO"], weights: { YES: 1, NO: 0, NOT_SURE: 0.5 },
  },
];

export const DOMAIN_ORDER = [
  "driver_qualification",
  "drug_alcohol",
  "hos_eld",
  "vehicle_maintenance",
  "insurance_authority",
  "audit_response",
];

export const DOMAIN_LABELS = {
  driver_qualification: "Driver Qualification",
  drug_alcohol: "Drug & Alcohol",
  hos_eld: "HOS / ELD",
  vehicle_maintenance: "Vehicle Maintenance",
  insurance_authority: "Insurance & Authority",
  audit_response: "Audit Response",
};

export const DOMAIN_CRITICAL = {
  driver_qualification: false,
  drug_alcohol: false,
  hos_eld: false,
  vehicle_maintenance: false,
  insurance_authority: true,
  audit_response: true,
};

export const DOMAIN_HELPER_TEXT = {
  driver_qualification: "This section checks whether your driver files are complete, current, and defensible.",
  drug_alcohol: "This section checks whether your drug and alcohol program is active, documented, and being followed.",
  hos_eld: "This section checks whether hours-of-service records and ELD use are current, accurate, and reviewable.",
  vehicle_maintenance: "This section checks whether inspections, repairs, and maintenance records are being handled correctly.",
  insurance_authority: "This section checks whether your authority, filings, and insurance are active and without gaps.",
  audit_response: "This section checks whether you could respond quickly and cleanly if FMCSA asked for records.",
};

export const DOMAIN_COPY = {
  driver_qualification: {
    GREEN: "Every active driver has a complete, current DQ file and annual Clearinghouse query on record.",
    YELLOW: "Files exist but one element is uncertain. Check the action items below and confirm before next dispatch.",
    RED: "A driver is operating without a complete DQ file or without a Clearinghouse query. Automatic audit failure under 49 CFR Part 391. Fix before next dispatch.",
  },
  drug_alcohol: {
    GREEN: "C/TPA enrollment active, random pool running, pre-employment tests and signed policies on file.",
    YELLOW: "Program exists but one element is uncertain. Verify the item flagged below.",
    RED: "No C/TPA enrollment, no pre-employment test, or no written policy. Every driver is retroactively at risk.",
  },
  hos_eld: {
    GREEN: "ELD registered and in-cab. Logs complete. Supporting documents filed by trip.",
    YELLOW: "Device registered but log documentation has gaps. Pull 6 months and verify.",
    RED: "ELD not registered with FMCSA or logs are missing. Roadside OOS order is the immediate consequence.",
  },
  vehicle_maintenance: {
    GREEN: "Every vehicle has a current annual inspection and DVIRs on file for every operating day.",
    YELLOW: "Annual inspections current but DVIR documentation has gaps. Pull and file the past 90 days.",
    RED: "A vehicle is past its annual inspection date or no DVIR process exists. Vehicle OOS per unit.",
  },
  insurance_authority: {
    GREEN: "SAFER shows Active with exact legal name match. MCS-150 is current.",
    YELLOW: "Insurance active but MCS-150 timing is uncertain. Verify due date in the FMCSA portal.",
    RED: "SAFER does not show Active or name does not match. Authority revocation process can begin within days. Fix this before anything else on this dashboard.",
  },
  audit_response: {
    GREEN: "All FMCSA correspondence answered within required deadlines. No open items.",
    YELLOW: "Portal messages may be unreviewed. Log in and check for any pending correspondence.",
    RED: "An audit notice or FMCSA communication has not been responded to. Automatic Unsatisfactory rating begins. This overrides every other item on this dashboard.",
  },
};

export const COLOR_STYLES = {
  GREEN:  { bg: "rgba(34,197,94,0.06)",  border: "rgba(34,197,94,0.25)",  leftBorder: "#22c55e", labelColor: "rgba(34,197,94,0.85)",  dot: "#22c55e"  },
  YELLOW: { bg: "rgba(251,191,36,0.05)", border: "rgba(251,191,36,0.22)", leftBorder: "#fbbf24", labelColor: "rgba(251,191,36,0.85)", dot: "#fbbf24" },
  RED:    { bg: "rgba(239,68,68,0.05)",  border: "rgba(239,68,68,0.25)",  leftBorder: "#ef4444", labelColor: "rgba(239,68,68,0.85)",  dot: "#ef4444"  },
  null:   { bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.08)", leftBorder: "rgba(255,255,255,0.12)", labelColor: "rgba(255,255,255,0.3)", dot: "rgba(255,255,255,0.2)" },
};

export function formatDate(ts) {
  if (!ts) return null;
  try {
    return new Date(ts).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return null;
  }
}

export function formatMonthLabel(checkMonth) {
  if (!checkMonth) return "";
  try {
    const [year, month] = checkMonth.split("-");
    const d = new Date(parseInt(year), parseInt(month) - 1, 1);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch {
    return checkMonth;
  }
}

export function isStale(ts, days = 45) {
  if (!ts) return false;
  const diff = (Date.now() - new Date(ts).getTime()) / (1000 * 60 * 60 * 24);
  return diff >= days;
}

export function getQuestionsForDomain(domain) {
  return QUESTION_BANK.filter(q => q.domain === domain).sort((a, b) => a.order - b.order);
}
