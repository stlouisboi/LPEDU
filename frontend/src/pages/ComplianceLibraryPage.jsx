import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const API    = process.env.REACT_APP_BACKEND_URL;
const GOLD   = "#d4900a";
const NAVY   = "#0b1628";
const BG     = "#0d1c30";
const BG2    = "#091220";
const CARD   = "#0c1828";
const MONO   = "'Inter', sans-serif";
const COND   = "'Playfair Display', serif";
const SANS   = "'Inter', sans-serif";
const BORDER = "rgba(255,255,255,0.08)";

const THUMBS = {
  "LP-RES-001": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/843ba9f50627568ea8a314e52df0898299c83abb09d7468f3d86233527e5381c.png",
  "LP-RES-002": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/a1311e9c2284cab2e8b46e40d6e97f7e262b18a103408a1ce0108692fcea707e.png",
  "LP-RES-004": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/0f086db9d0b79a9781132340e3cb8851e0ad0062ebf8b8551458a21995c16173.png",
  "LP-RES-006": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/766a7baa3f58994baa14a0f77b9f8e5e7c6e87df594e164fed46c13ccca587ab.png",
  "LP-PKT-001": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/750a63c8fe4579187dab8c3fe84f84f1bc01eff5ec2046acd3eb02621e20b789.png",
  "LP-PKT-002": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/e7b64f4e9b93050eea2aafcd8002e0f49b2d712cd41e5a6a0429a5aed3d7800f.png",
  "LP-PKT-003": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/5243aec3da3a790d03bed29d9ee0fd0977ac235e887cd51140ac1564514a3df2.png",
  "LP-PKT-004": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/ef1ec4017733ec5408cbd98994a9baf6d3af80ed7019061e9ef3378dbc6baa60.png",
  "LP-PKT-005": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/4148f0c2618d09baa142952150c1e1861948fb03c611abe1e8713fefef465544.png",
};

/* ── Product data ────────────────────────────────────────────── */
const RESOURCES = [
  {
    sku: "LP-RES-001",
    title: "16 Deadly Sins Pocket Guide",
    price: "$37",
    ctaLabel: "GET THIS — $37",
    format: "PDF · 24 Pages · Instant Download",
    desc: "Identifies the 16 compliance failures most likely to end a new carrier's authority — and gives you a 7-day plan to close them.",
    bullets: [
      "16-sin self-audit with CFR citations and HIGH-RISK flags",
      "GREEN / YELLOW / RED risk band scoring",
      "7-Day Stabilization Plan (triage, systems, audit check)",
      "System Skeletons for DQ, D&A, maintenance, accident register",
      "CFR Quick Reference mapped to all 16 sins",
      "Monthly Verification Checklist",
    ],
    forWho: "For new carriers in their first 90 days.",
    notFor: "This is a diagnostic. The Bundle installs the infrastructure.",
  },
  {
    sku: "LP-RES-002",
    title: "DQ File Builder Kit",
    price: "$67",
    ctaLabel: "GET THIS — $67",
    format: "PDF · 32 Pages · Instant Download",
    desc: "Every template required to build a compliant Driver Qualification File — or audit one that already exists.",
    bullets: [
      "Master DQ File Checklist (11 items, CFR citations)",
      "Driver Application Template (49 CFR 391.21 compliant)",
      "Annual Review of Driving Record Form",
      "Previous Employer Inquiry Letter (includes full D&A history section per 49 CFR 40.25)",
      "Multi-driver Audit Worksheet (GO / WAIT status per file)",
      "Expiration Tracking Calendar with 60-day alerts",
    ],
    forWho: "For carriers building DQ files for the first time.",
    notFor: "Not skeletons — completed, fillable, print-ready.",
  },
  {
    sku: "LP-RES-004",
    title: "Safety Audit Prep Pack",
    price: "$97",
    ctaLabel: "GET THIS — $97",
    format: "PDF · 28 Pages · Instant Download",
    desc: "The document pull list, mock audit walkthrough, and 48-hour response sequence for carriers facing a New Entrant Safety Audit.",
    bullets: [
      "Document pull list mapped to FMCSA's standard audit request",
      "Mock audit self-review protocol",
      "48-hour response sequence for when the notice arrives",
      "Satisfactory / Conditional / Unsatisfactory rating guide",
      "Audit-Ready Grab Folder setup checklist",
      "Common audit findings by domain with correction priority",
    ],
    forWho: "For carriers in the audit window or who have received a notice.",
    notFor: null,
  },
  {
    sku: "LP-RES-006",
    title: "Complete Compliance Library",
    price: "$147",
    ctaLabel: "GET THE COLLECTION — $147",
    format: "PDF · 3 Documents · Instant Download",
    desc: "All three LaunchPath standalone resources in one package.",
    bullets: [
      "16 Deadly Sins Pocket Guide ($37 value)",
      "DQ File Builder Kit ($67 value)",
      "Safety Audit Prep Pack ($97 value)",
    ],
    forWho: null,
    notFor: null,
    savingsNote: "$201 retail value. $147 for the complete collection.",
  },
];

const PACKETS = [
  {
    sku: "LP-PKT-001",
    title: "New Entrant Compliance Packet",
    price: "$97",
    ctaLabel: "GET THIS PACKET — $97",
    format: "PDF · 40 Pages · Instant Download",
    domain: "Domain 1 · Authority & New Entrant",
    desc: "The document system for carriers in the 18-month New Entrant monitoring period.",
    bullets: [
      "New Entrant Safety Audit Brief (49 CFR Parts 385, 390–396)",
      "Pre-Launch Compliance Checklist (all domains, before first load)",
      "Audit Prep Checklist and Documentation Index",
      "Unified 8-Folder Structure Map",
      "One-weekend installation guide with time estimates",
      "Automatic failure items by domain",
    ],
    note: "This packet covers one domain. The Bundle covers all five.",
  },
  {
    sku: "LP-PKT-002",
    title: "Drug & Alcohol Compliance Packet",
    price: "$97",
    ctaLabel: "GET THIS PACKET — $97",
    format: "PDF · 36 Pages · Instant Download",
    domain: "Domain 2 · D&A Program",
    desc: "The document system for installing a compliant 49 CFR Part 382 program.",
    bullets: [
      "Part 382 Regulatory Brief (all six testing types)",
      "Program Setup Checklist (CTPA, pre-employment, Clearinghouse)",
      "10-section Written Policy Outline (382.601 compliant)",
      "Driver Handout Template",
      "Recordkeeping Checklist with retention periods",
      "Testing Trigger Log (audit-ready format)",
    ],
    note: "Documents your program. Does not administer it.",
  },
  {
    sku: "LP-PKT-003",
    title: "HOS & Dispatch Compliance Packet",
    price: "$127",
    ctaLabel: "GET THIS PACKET — $127",
    format: "PDF · 36 Pages · Instant Download",
    domain: "Domain 3 · Hours of Service",
    desc: "The document system for HOS compliance and dispatch standards under 49 CFR Part 395.",
    bullets: [
      "HOS Rules Brief (all core limits, short-haul exemptions)",
      "Dispatch Standards Checklist including what the carrier cannot ask a driver to do",
      "ELD Usage Checklist (registration, data fields, edits, malfunction)",
      "Daily compliance checklist (5–10 minutes per shift)",
      "Weekly review checklist (30 minutes, catches drift before audit)",
    ],
    note: "HOS drift is caught weekly or it is caught by an investigator.",
  },
  {
    sku: "LP-PKT-004",
    title: "Maintenance & Unit File Packet",
    price: "$127",
    ctaLabel: "GET THIS PACKET — $127",
    format: "PDF · 36 Pages · Instant Download",
    domain: "Domain 4 · Vehicle Maintenance",
    desc: "The document system for vehicle maintenance compliance under 49 CFR Part 396.",
    bullets: [
      "Part 396 Maintenance and Inspection Brief",
      "Unit File Template (required contents per VIN with retention periods)",
      "PM Schedule Outline (11 maintenance items, fill-in intervals)",
      "Defect and Repair Tracking Sheet with FMCSA certification language",
      "Pre-Trip Inspection Checklist mapped to Appendix G",
    ],
    note: "A maintained truck with no records is the same as an unmaintained truck to FMCSA.",
  },
  {
    sku: "LP-PKT-005",
    title: "Insurance & Authority Packet",
    price: "$127",
    ctaLabel: "GET THIS PACKET — $127",
    format: "PDF · 36 Pages · Instant Download",
    domain: "Domain 5 · Insurance Continuity",
    desc: "The document system for insurance continuity and authority maintenance under 49 CFR Part 387.",
    bullets: [
      "Coverage Types Brief (6 types including Non-Trucking Liability and OccAcc)",
      "Broker and Shipper Contract Risk Checklist (18 flagging criteria)",
      "90/60/30-Day Insurance Renewal Prep Checklist",
      "Authority Status and Filings Checklist",
      "Insurance Continuity Monthly Quick Check",
    ],
    note: "Insurance is not a purchase. It is a filing.",
  },
];

const BUNDLE_ITEMS = [
  "All five domain compliance packets",
  "Unified folder architecture and file naming system",
  "0–30–60–90 Day implementation calendar",
  "Master compliance checklist (cross-domain)",
  "Audit preparation packet",
];

const GUIDED_ITEMS = [
  "All five compliance packets",
  "Unified folder structure",
  "0–30–90 Day Implementation Guide",
  "Full video curriculum (17+ hours)",
  "Five Station Custodian verification checkpoints",
  "Direct Q&A access throughout the 90-day window",
  "Audit-readiness confirmation at completion",
];

const MATRIX = [
  { label: "Domain compliance packets",          ind: "1 per purchase",         bundle: "All 5",  guided: "All 5" },
  { label: "Folder architecture / structure",    ind: "—",                      bundle: "✓",      guided: "✓" },
  { label: "Implementation calendar",            ind: "—",                      bundle: "✓",      guided: "✓" },
  { label: "Video curriculum (17+ hrs)",         ind: "—",                      bundle: "—",      guided: "✓" },
  { label: "Verification checkpoints (×5)",      ind: "—",                      bundle: "—",      guided: "✓" },
  { label: "Direct Q&A access (90-day window)",  ind: "—",                      bundle: "—",      guided: "✓" },
  { label: "Audit-readiness confirmation",       ind: "—",                      bundle: "—",      guided: "✓" },
  { label: "Entry requirement",                  ind: "None — self-directed",   bundle: "None — self-directed", guided: "Ground 0 completion required" },
  { label: "Price",                              ind: "$97–$127 each",           bundle: "$497",   guided: "$2,500" },
];

/* ── Count-up (fires on load) ────────────────────────────────── */
function useCountUpOnLoad(end, duration = 1500) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []); // eslint-disable-line
  return value;
}

/* ── Checkout hook ───────────────────────────────────────────── */
function useBuyProduct() {
  const [states, setStates] = useState({});
  const [errors, setErrors] = useState({});
  const buy = async (sku) => {
    setStates(s => ({ ...s, [sku]: "loading" }));
    setErrors(e => ({ ...e, [sku]: null }));
    try {
      const res = await fetch(`${API}/api/products/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_sku: sku, origin_url: window.location.origin }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else throw new Error();
    } catch {
      setStates(s => ({ ...s, [sku]: "idle" }));
      setErrors(e => ({ ...e, [sku]: "Something went wrong. Please try again or contact support." }));
    }
  };
  return { states, errors, buy };
}

/* ── Stats block ─────────────────────────────────────────────── */
function StatsBlock() {
  const c1 = useCountUpOnLoad(18);
  const c2 = useCountUpOnLoad(90);
  const c3 = useCountUpOnLoad(7);
  const stats = [
    { value: c1, label: "Months before your New Entrant Safety Audit arrives" },
    { value: c2, label: "Average days to first compliance failure" },
    { value: c3, label: "Automatic failure items that end authority immediately" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }} className="stats-grid">
      {stats.map((s, i) => (
        <div key={i} style={{ textAlign: "center", padding: "1.5rem", background: "rgba(212,144,10,0.04)", border: `1px solid rgba(212,144,10,0.18)` }}>
          <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "3.5rem", color: GOLD, lineHeight: 1, margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>{s.value}</p>
          <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Self-audit preview ──────────────────────────────────────── */
const SIN_DATA = {
  dq_file:      { sin: "SIN 01 — The Ghost Driver",       consequence: "Immediate Out-of-Service order. Automatic failure in any compliance review.", cfr: "49 CFR Part 391.51" },
  insurance:    { sin: "SIN 12 — Insurance Mismatch",     consequence: "FMCSA may show No Insurance on SAFER. Authority can be revoked.",             cfr: "49 CFR Part 387" },
  clearinghouse:{ sin: "SIN 05 — Clearinghouse Silence",  consequence: "Driver may have disqualifying violations you do not know about. Carrier is liable.", cfr: "49 CFR Part 382.701" },
};
const QUESTIONS = [
  { key: "dq_file",       text: "Do you have a complete DQ file for every active driver?" },
  { key: "insurance",     text: "Is your insurance filing verified as Active on SAFER right now?" },
  { key: "clearinghouse", text: "Have you run a Clearinghouse query on every current driver in the last 12 months?" },
];

function SinAuditPreview({ onBuy, loadingState, buyError }) {
  const [answers, setAnswers] = useState({ dq_file: null, insurance: null, clearinghouse: null });
  const setAnswer = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));
  const allAnswered = Object.values(answers).every(a => a !== null);
  const anyNo       = Object.entries(answers).some(([, v]) => v === false);
  const allYes      = allAnswered && !anyNo;
  const failedKeys  = Object.entries(answers).filter(([, v]) => v === false).map(([k]) => k);
  const isLoading   = loadingState === "loading";

  return (
    <div style={{ marginTop: "3rem" }}>
      <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.5rem" }}>LP-TOOL-003A | QUICK SELF-AUDIT</p>
      <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.25rem,2.5vw,1.75rem)", color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Three questions. Real-time exposure check.</h3>
      <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 540 }}>Answer honestly. These are the first three questions a compliance investigator asks.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
        {QUESTIONS.map(q => (
          <div key={q.key} data-testid={`audit-q-${q.key}`} style={{ background: CARD, border: `1px solid ${BORDER}`, padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.55, flex: 1, margin: 0 }}>{q.text}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <button data-testid={`audit-yes-${q.key}`} onClick={() => setAnswer(q.key, true)}  style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.5rem 1.125rem", border: `1px solid ${answers[q.key] === true  ? "#22c55e" : "rgba(255,255,255,0.15)"}`, background: answers[q.key] === true  ? "rgba(34,197,94,0.14)"  : "transparent", color: answers[q.key] === true  ? "#22c55e"  : "rgba(255,255,255,0.50)", cursor: "pointer" }}>Yes</button>
              <button data-testid={`audit-no-${q.key}`}  onClick={() => setAnswer(q.key, false)} style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.5rem 1.125rem", border: `1px solid ${answers[q.key] === false ? "#ef4444" : "rgba(255,255,255,0.15)"}`, background: answers[q.key] === false ? "rgba(239,68,68,0.14)"  : "transparent", color: answers[q.key] === false ? "#ef4444"  : "rgba(255,255,255,0.50)", cursor: "pointer" }}>No</button>
            </div>
          </div>
        ))}
      </div>
      {anyNo && (
        <div data-testid="audit-result-risk" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.28)", padding: "1.75rem" }}>
          <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ef4444", marginBottom: "1.25rem" }}>You have at least one HIGH-RISK compliance exposure.</p>
          {failedKeys.map(key => (
            <div key={key} style={{ marginBottom: "1.25rem", paddingLeft: "1rem", borderLeft: "2px solid rgba(239,68,68,0.35)" }}>
              <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", color: "#ef4444", marginBottom: "0.3rem" }}>{SIN_DATA[key].sin}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.6, marginBottom: "0.25rem" }}>{SIN_DATA[key].consequence}</p>
              <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.30)" }}>{SIN_DATA[key].cfr}</p>
            </div>
          ))}
          <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>The 16 Deadly Sins Pocket Guide covers all 16 exposure points and gives you a 7-day plan to close them.</p>
          <button data-testid="audit-cta-lp-res-001" onClick={() => onBuy("LP-RES-001")} disabled={isLoading} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.75rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1 }}>
            {isLoading ? <><span className="lp-spinner" />&nbsp;Processing...</> : "Get the Pocket Guide — $37"}
          </button>
          {buyError && <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "#ef4444", marginTop: "0.625rem" }}>{buyError}</p>}
        </div>
      )}
      {allYes && (
        <div data-testid="audit-result-ok" style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.28)", padding: "1.75rem" }}>
          <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#22c55e", marginBottom: "1rem" }}>Good start. There are 13 more exposure points in the full diagnostic.</p>
          <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>The complete self-audit takes 15 minutes and covers all 16 sins across 6 compliance domains.</p>
          <button data-testid="audit-cta-all-yes" onClick={() => onBuy("LP-RES-001")} disabled={isLoading} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.75rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1 }}>
            {isLoading ? <><span className="lp-spinner" />&nbsp;Processing...</> : "Get the Pocket Guide — $37"}
          </button>
          {buyError && <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "#ef4444", marginTop: "0.625rem" }}>{buyError}</p>}
        </div>
      )}
    </div>
  );
}

/* ── PDF icon ────────────────────────────────────────────────── */
function PdfIcon({ color = GOLD }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2v6h6M9 13h6M9 17h4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Resource card (light background) ───────────────────────── */
function ResourceCard({ p, onBuy, loadingState, buyError }) {
  const isLoading = loadingState === "loading";
  const thumb = THUMBS[p.sku];
  return (
    <div data-testid={`resource-card-${p.sku.toLowerCase()}`} style={{ background: "#FFFFFF", borderTop: `3px solid ${GOLD}`, display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(13,27,48,0.10)", overflow: "hidden" }}>
      {thumb && (
        <div style={{ overflow: "hidden", background: "#0d1c30", height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={thumb} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
        </div>
      )}
      <div style={{ padding: "1.5rem 1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", margin: 0 }}>{p.sku}</p>
        </div>
        <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.2rem", color: NAVY, lineHeight: 1.2, margin: 0 }}>{p.title}</h3>
        <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
        <ul style={{ margin: "0.25rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
          {p.bullets.map((b, i) => (
            <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0, lineHeight: 1.55, fontSize: "0.857rem" }}>→</span>
              <span style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(13,27,48,0.70)", lineHeight: 1.55 }}>{b}</span>
            </li>
          ))}
        </ul>
        {p.savingsNote && <p style={{ fontFamily: MONO, fontSize: "0.857rem", fontWeight: 700, color: NAVY, background: "rgba(212,144,10,0.10)", padding: "0.5rem 0.75rem", borderLeft: `2px solid ${GOLD}`, margin: 0 }}>{p.savingsNote}</p>}
        <div style={{ borderTop: "1px solid rgba(13,27,48,0.08)", paddingTop: "0.75rem" }}>
          {p.forWho && <p style={{ fontFamily: SANS, fontSize: "0.857rem", fontStyle: "italic", color: "rgba(13,27,48,0.55)", lineHeight: 1.6, margin: "0 0 0.2rem" }}>{p.forWho}</p>}
          {p.notFor && <p style={{ fontFamily: SANS, fontSize: "0.857rem", fontStyle: "italic", color: "rgba(13,27,48,0.40)", lineHeight: 1.6, margin: 0 }}>{p.notFor}</p>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
          <PdfIcon color={GOLD} />
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "1.25rem", color: NAVY }}>{p.price}</span>
          <span style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(13,27,48,0.40)", letterSpacing: "0.04em" }}>{p.format}</span>
        </div>
        <button data-testid={`buy-resource-${p.sku.toLowerCase()}`} onClick={() => onBuy(p.sku)} disabled={isLoading}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.5rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1, transition: "background 0.2s" }}
          onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = "#e8a520"; }}
          onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}>
          {isLoading ? <><span className="lp-spinner-dark" />&nbsp;Processing...</> : p.ctaLabel}
        </button>
        {buyError && <p style={{ fontFamily: SANS, fontSize: "0.814rem", color: "#dc2626", textAlign: "center", lineHeight: 1.5, margin: 0 }}>{buyError}</p>}
      </div>
    </div>
  );
}

/* ── Packet card (dark background) ──────────────────────────── */
function PacketCard({ p, onBuy, loadingState, buyError }) {
  const isLoading = loadingState === "loading";
  const thumb = THUMBS[p.sku];
  return (
    <div data-testid={`product-card-${p.sku.toLowerCase()}`} style={{ background: CARD, borderTop: `3px solid rgba(212,144,10,0.50)`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Thumbnail */}
      {thumb && (
        <div style={{ overflow: "hidden", background: BG2, height: 420 }}>
          <img src={thumb} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", transition: "transform 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }} />
        </div>
      )}
      <div style={{ padding: "1.5rem 1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        <div>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", margin: "0 0 0.35rem" }}>{p.sku}</p>
          <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", border: `1px solid rgba(255,255,255,0.12)`, padding: "0.15rem 0.5rem" }}>{p.domain}</span>
        </div>
        <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.2rem", color: "#FFF", lineHeight: 1.2, margin: 0 }}>{p.title}</h3>
        <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
        {/* Bullets */}
        <ul style={{ margin: "0.25rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
          {p.bullets.map((b, i) => (
            <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0, lineHeight: 1.55, fontSize: "0.857rem" }}>→</span>
              <span style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{b}</span>
            </li>
          ))}
        </ul>
        {/* Note */}
        {p.note && (
          <p style={{ fontFamily: SANS, fontSize: "0.857rem", fontStyle: "italic", color: "rgba(255,255,255,0.35)", borderTop: `1px solid ${BORDER}`, paddingTop: "0.75rem", lineHeight: 1.6, margin: 0 }}>{p.note}</p>
        )}
        {/* Price + format */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
          <PdfIcon color={GOLD} />
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "1.35rem", color: GOLD }}>{p.price}</span>
          <span style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.30)", letterSpacing: "0.04em" }}>{p.format}</span>
        </div>
        {/* CTA */}
        <button data-testid={`buy-btn-${p.sku.toLowerCase()}`} onClick={() => onBuy(p.sku)} disabled={isLoading}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.5rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1, transition: "background 0.2s" }}
          onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = "#e8a520"; }}
          onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}>
          {isLoading ? <><span className="lp-spinner" />&nbsp;Processing...</> : p.ctaLabel}
        </button>
        {buyError && <p style={{ fontFamily: SANS, fontSize: "0.814rem", color: "#ef4444", textAlign: "center", lineHeight: 1.5, margin: 0 }}>{buyError}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
export default function ComplianceLibraryPage() {
  const { states, errors, buy } = useBuyProduct();

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#FFF", fontFamily: SANS }}>
      <style>{`
        @keyframes lp-spin { to { transform: rotate(360deg); } }
        .lp-spinner      { display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.25);border-top-color:#fff;border-radius:50%;animation:lp-spin 0.75s linear infinite;vertical-align:middle; }
        .lp-spinner-dark { display:inline-block;width:16px;height:16px;border:2px solid rgba(11,22,40,0.3);border-top-color:${NAVY};border-radius:50%;animation:lp-spin 0.75s linear infinite;vertical-align:middle; }
        @media (max-width: 780px) {
          .bundle-grid { display: flex !important; flex-direction: column !important; gap: 2rem !important; }
          .guided-grid { display: flex !important; flex-direction: column !important; gap: 2rem !important; }
          .path-cards  { grid-template-columns: 1fr 1fr !important; }
          .stats-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .path-cards  { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <div style={{ position: "relative", borderBottom: `3px solid ${GOLD}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/vpafe5mz_compliance-docs.png)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,14,32,0.94) 45%, rgba(6,14,32,0.75) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 5rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "1.25rem" }}>LP-SYS-LIBRARY | STANDARDS LIBRARY</p>
          <h1 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#FFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 620 }}>
            The LaunchPath Operating Standards Library
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", marginBottom: "2rem" }}>Three paths to audit-ready compliance infrastructure:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", maxWidth: 820 }} className="path-cards">
            {[{ tier: "TIER 1", label: "Individual Resources & Packets", sub: "Install one domain at a time", price: "$37–$197" },
              { tier: "TIER 2", label: "Document System Bundle",         sub: "Install the full structure yourself", price: "$497" },
              { tier: "TIER 3", label: "LaunchPath Standard",            sub: "Guided 90-day implementation with verification", price: "$2,500" }].map(t => (
              <div key={t.tier} style={{ background: "rgba(10,20,40,0.80)", border: `1px solid rgba(212,144,10,0.25)`, padding: "1.25rem 1.25rem 1.5rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.4rem" }}>{t.tier}</p>
                <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.15rem", color: "#FFF", lineHeight: 1.2, marginBottom: "0.4rem" }}>{t.label}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.55, marginBottom: "0.625rem" }}>{t.sub}</p>
                <p style={{ fontFamily: MONO, fontSize: "0.857rem", fontWeight: 700, color: GOLD }}>{t.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ LP-RES-001 FEATURED ZONE ════════════════════════════ */}
      <div style={{ background: BG2, padding: "5rem 1.5rem", borderBottom: `1px solid rgba(212,144,10,0.20)` }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>LP-RES-001 | 16 DEADLY SINS POCKET GUIDE — $37</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.75rem" }}>Know what ends authority before you learn the hard way.</h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 580, marginBottom: "3rem" }}>Most new carriers don't fail audits because they broke the rules. They fail because they didn't know which specific behaviors trigger automatic failure.</p>
          <StatsBlock />
          <SinAuditPreview onBuy={buy} loadingState={states["LP-RES-001"]} buyError={errors["LP-RES-001"]} />
        </div>
      </div>

      {/* ══ RESOURCES ═══════════════════════════════════════════ */}
      <div style={{ background: "#F6F3EE", padding: "5rem 1.5rem", borderBottom: `1px solid rgba(13,27,48,0.10)` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem" }}>LP-RESOURCES | STANDALONE GUIDES &amp; KITS</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.02em", color: "#0D1B30", marginBottom: "0.75rem" }}>Standalone resources. No subscription required.</h2>
          <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(13,27,48,0.55)", lineHeight: 1.7, maxWidth: 600, marginBottom: "3rem" }}>Self-contained tools and kits. See what's inside. Buy what you need.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(540px, 1fr))", gap: "1.5rem" }} className="resource-grid">
            {RESOURCES.map(r => (
              <ResourceCard key={r.sku} p={r} onBuy={buy} loadingState={states[r.sku]} buyError={errors[r.sku]} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ PACKETS ═════════════════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.75rem" }}>TIER 1 | COMPLIANCE PACKETS — $97–$127 EACH</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.75rem" }}>Install one domain at a time.</h2>
          <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600, marginBottom: "3rem" }}>Each packet covers one compliance domain completely. Buy what you need, install it, then move to the next.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(540px, 1fr))", gap: "1.5rem" }} className="packet-grid">
            {PACKETS.map(p => (
              <PacketCard key={p.sku} p={p} onBuy={buy} loadingState={states[p.sku]} buyError={errors[p.sku]} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ $497 BUNDLE ═════════════════════════════════════════ */}
      <div style={{ position: "relative", background: "#050d18", borderTop: `4px solid ${GOLD}`, overflow: "hidden", padding: "5rem 1.5rem" }}>
        {/* Gold grain texture overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 70% 50%, rgba(212,144,10,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: 0.4 }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(212,144,10,0.12)", border: `1px solid rgba(212,144,10,0.35)`, padding: "0.35rem 0.875rem", marginBottom: "2.5rem" }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
            <span style={{ fontFamily: MONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>LP-BDL-001 · TIER 2 · BEST VALUE</span>
          </div>

          {/* Main headline */}
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3.25rem)", color: "#FFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem", maxWidth: 700 }}>
            The documents aren't the problem.<br />
            <span style={{ color: GOLD }}>The missing architecture is.</span>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1.05rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.8, maxWidth: 600, marginBottom: "3rem" }}>
            Carriers don't lose their authority because they didn't have a form. They lose it because no one installed the forms in the right order, verified them, and built a system to maintain them. The Document System fixes that.
          </p>

          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }} className="bundle-grid">

            {/* Left — What's inside */}
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.25rem" }}>WHAT'S INSIDE</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
                {[
                  { label: "New Entrant Compliance Packet", note: "Authority, pre-launch, audit index" },
                  { label: "Drug & Alcohol Compliance Packet", note: "Part 382 program, written policy, testing log" },
                  { label: "HOS & Dispatch Compliance Packet", note: "ELD rules, dispatch standards, daily checklist" },
                  { label: "Maintenance & Unit File Packet", note: "Part 396, PM schedule, defect tracking" },
                  { label: "Insurance & Authority Packet", note: "Coverage types, renewal calendar, broker risk" },
                  { label: "Unified Folder Architecture", note: "How the five domains connect into one system" },
                  { label: "0–30–60–90 Day Implementation Calendar", note: "Sequenced install so nothing gets skipped" },
                  { label: "Master Compliance Checklist", note: "Cross-domain verification at 90 days" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", paddingBottom: "0.875rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(212,144,10,0.15)", border: `1px solid rgba(212,144,10,0.30)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <span style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, color: GOLD }}>{i + 1}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.88)", margin: "0 0 0.1rem" }}>{item.label}</p>
                      <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", margin: 0 }}>{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk frame */}
              <div style={{ borderLeft: `3px solid rgba(212,144,10,0.50)`, paddingLeft: "1.25rem", background: "rgba(212,144,10,0.04)", padding: "1rem 1.25rem" }}>
                <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>
                  A New Entrant Safety Audit can result in a <strong style={{ color: "rgba(255,255,255,0.88)" }}>Conditional or Unsatisfactory rating</strong> within your first 18 months. The average remediation cost is <strong style={{ color: GOLD }}>$10,000–$25,000</strong>. This system costs $497.
                </p>
              </div>
            </div>

            {/* Right — Price + CTA */}
            <div style={{ position: "sticky", top: "6rem" }}>
              <div style={{ background: "rgba(212,144,10,0.05)", border: `1px solid rgba(212,144,10,0.25)`, padding: "2rem" }}>
                {/* Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.75rem" }}>
                  {[
                    { val: "5", label: "Compliance Domains" },
                    { val: "40+", label: "Templates & Checklists" },
                    { val: "90", label: "Day Implementation" },
                    { val: "1", label: "Unified System" },
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: "center", padding: "0.875rem 0.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.75rem", color: GOLD, margin: "0 0 0.1rem", lineHeight: 1 }}>{m.val}</p>
                      <p style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", margin: 0 }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "2.5rem", color: "#FFF", margin: "0 0 0.1rem", lineHeight: 1 }}>$497</p>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(212,144,10,0.55)", letterSpacing: "0.06em", margin: 0 }}>$634 if purchased separately · One-time · Instant access</p>
                </div>

                {/* CTA */}
                <button data-testid="bundle-buy-btn" onClick={() => buy("LP-BDL-001")} disabled={states["LP-BDL-001"] === "loading"}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1.1rem 1.5rem", border: "none", cursor: states["LP-BDL-001"] === "loading" ? "not-allowed" : "pointer", opacity: states["LP-BDL-001"] === "loading" ? 0.75 : 1, transition: "background 0.2s", marginBottom: "0.875rem" }}
                  onMouseEnter={e => { if (states["LP-BDL-001"] !== "loading") e.currentTarget.style.background = "#e8a520"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}>
                  {states["LP-BDL-001"] === "loading" ? <><span className="lp-spinner-dark" />&nbsp;Processing...</> : "Build The System — $497"}
                </button>

                <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.30)", textAlign: "center", lineHeight: 1.65, margin: 0 }}>
                  PDF delivery · Instant download · No subscription
                </p>

                {errors["LP-BDL-001"] && <p style={{ fontFamily: SANS, fontSize: "0.814rem", color: "#ef4444", textAlign: "center", lineHeight: 1.5, marginTop: "0.75rem" }}>{errors["LP-BDL-001"]}</p>}
              </div>

              {/* Upgrade note */}
              <div style={{ marginTop: "1rem", padding: "1rem", borderLeft: `2px solid rgba(212,144,10,0.25)` }}>
                <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.65, margin: 0 }}>
                  Need the system installed and verified — not just delivered? The <Link to="/launchpath-standard" style={{ color: "rgba(212,144,10,0.70)", textDecoration: "none" }}>LaunchPath Standard</Link> includes everything here plus 90 days of guided implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BRIDGE COPY ═════════════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.5rem" }}>LP-DOC-001 | THE DIFFERENCE</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "2rem" }}>Why Guided?</h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85, marginBottom: "1.25rem" }}>The $497 Document System gives you every form, template, and checklist you need. If you know what you're doing — or you're willing to figure it out — it's everything required to build an audit-ready operation.</p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85 }}>Most new carriers don't fail because they lacked the documents. They fail because the documents weren't installed in the right order, at the right time, with the right verification.</p>
        </div>
      </div>

      {/* ══ $2,500 GUIDED STANDARD ══════════════════════════════ */}
      <div style={{ background: BG2, borderTop: `1px solid rgba(212,144,10,0.20)`, borderBottom: `1px solid rgba(212,144,10,0.20)`, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ borderLeft: `3px solid rgba(212,144,10,0.40)`, paddingLeft: "1.5rem", marginBottom: "3rem", maxWidth: 560 }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: "clamp(1rem,2vw,1.2rem)", color: "rgba(255,255,255,0.80)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "0.5rem" }}>"If this feels expensive, you are likely not ready. If it feels reasonable, you are already thinking like an operator."</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(212,144,10,0.60)", letterSpacing: "0.08em", margin: 0 }}>— Vince Lawrence, Station Custodian</p>
          </div>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.5rem" }}>LP-STD-001 | TIER 3 — THE GUIDED IMPLEMENTATION</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.5rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.4rem" }}>The LaunchPath Standard — $2,500</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "start", marginTop: "2rem" }} className="guided-grid">
            <div>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, marginBottom: "2rem" }}>The difference between the DIY system and the guided implementation isn't the documents — it's whether someone with 25 years in compliance is watching to make sure they're installed correctly before FMCSA arrives.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {GUIDED_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.857rem", color: GOLD, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>→</span>
                    <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: CARD, border: `1px solid rgba(212,144,10,0.25)`, padding: "2rem", alignSelf: "start" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.5rem" }}>LPOS V1.0 | ENTRY POINT</p>
              <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.75rem", color: GOLD, lineHeight: 1.1, marginBottom: "1.25rem" }}>Access begins with Ground 0.</p>
              <Link to="/ground-0-briefing" data-testid="guided-ground0-btn"
                style={{ display: "block", textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1.1rem 1.5rem", textDecoration: "none", marginBottom: "1rem" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}>
                INITIATE GROUND 0 →
              </Link>
              <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, textAlign: "center", margin: 0 }}>Ground 0 is free. It takes 4–6 minutes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ COMPARISON MATRIX ═══════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "2rem" }}>LP-DOC-002 | COMPARISON MATRIX</p>
          <div style={{ border: `1px solid ${BORDER}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderBottom: `1px solid ${BORDER}`, background: "rgba(212,144,10,0.06)" }}>
              <div style={{ padding: "1rem 1.25rem" }} />
              {[{ label: "Individual Resources & Packets", price: "$37–$197 / $97–$127" }, { label: "Document System Bundle", price: "$497" }, { label: "LaunchPath Standard", price: "$2,500" }].map(col => (
                <div key={col.label} style={{ padding: "1rem 1.25rem", borderLeft: `1px solid ${BORDER}` }}>
                  <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1rem", color: "#FFF", lineHeight: 1.2, marginBottom: "0.2rem" }}>{col.label}</p>
                  <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: GOLD, fontWeight: 700 }}>{col.price}</p>
                </div>
              ))}
            </div>
            {MATRIX.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderBottom: i < MATRIX.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                <div style={{ padding: "0.875rem 1.25rem", fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)" }}>{row.label}</div>
                {[row.ind, row.bundle, row.guided].map((val, j) => (
                  <div key={j} style={{ padding: "0.875rem 1.25rem", borderLeft: `1px solid ${BORDER}`, fontFamily: val === "—" ? MONO : SANS, fontSize: "var(--text-sm)", color: val === "✓" ? "#4caf50" : val === "—" ? "rgba(255,255,255,0.20)" : j === 2 ? GOLD : "rgba(255,255,255,0.72)", fontWeight: val === "✓" ? 700 : 400 }}>{val}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.25rem" }}>LPOS V1.0 | GROUND 0 ENTRY</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.02em", color: "#FFF", lineHeight: 1.1, marginBottom: "2rem" }}>Not sure which path fits your situation?</h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/ground-0-briefing" data-testid="library-ground0-cta" style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1.1rem 2.25rem", textDecoration: "none" }} onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }} onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}>INITIATE GROUND 0 →</Link>
            <Link to="/standard" data-testid="library-standard-link" style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, background: "transparent", padding: "1.1rem 2.25rem", textDecoration: "none", border: `1px solid rgba(212,144,10,0.45)` }}>VIEW THE STANDARD →</Link>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.7, maxWidth: 680, margin: "0 auto", fontStyle: "italic" }}>
          All documents current as of March 2026. Verify current regulatory requirements at ecfr.gov. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
        </p>
      </div>
      <FooterSection />
    </div>
  );
}
