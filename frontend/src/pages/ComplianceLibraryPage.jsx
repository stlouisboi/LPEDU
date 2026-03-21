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

/* ── Entry-Level Resources ──────────────────────────────────── */
const RESOURCES = [
  { sku: "LP-RES-001", title: "16 Deadly Sins Pocket Guide",           price: "$17",  desc: "The LaunchPath proprietary threat model. All 16 operational behaviors that end new carrier authority — with CFR citations, consequence details, and prevention protocol summary." },
  { sku: "LP-RES-002", title: "DQ File Builder Kit",                   price: "$37",  desc: "A complete Driver Qualification file assembly kit. Templates, checklists, and step-by-step build instructions under 49 CFR 391.51 — for one driver or an entire fleet." },
  { sku: "LP-RES-003", title: "New Carrier Compliance Starter Kit",    price: "$47",  desc: "The first-30-days foundation package. Covers the critical installation window — authority verification, D&A enrollment, Clearinghouse registration, and insurance filing checks." },
  { sku: "LP-RES-004", title: "Safety Audit Prep Pack",                price: "$67",  desc: "Audit exposure window preparation. A self-audit tool covering all six FMCSA review domains — so your New Entrant Safety Audit is verification, not discovery." },
  { sku: "LP-RES-005", title: "Four Pillars Compliance Blueprint",     price: "$97",  desc: "The operational architecture of a compliant motor carrier — Authority, Documentation, Driver Management, and Financial Controls — mapped to the 90-day new entrant window." },
  { sku: "LP-RES-006", title: "Complete Compliance Library",           price: "$197", desc: "All five entry-level resources in one discounted bundle. The complete LaunchPath proprietary resource collection — threat model, DQ kit, starter kit, audit prep, and four pillars." },
];

/* ── Individual Packets ─────────────────────────────────────── */
const PACKETS = [
  { sku: "LP-PKT-001", title: "New Entrant Compliance Packet",        price: "$97",  domain: "Authority & New Entrant",  desc: "The foundational compliance packet for new motor carrier authority. Covers FMCSA filing verification, New Entrant Safety Audit preparation, and authority maintenance protocols." },
  { sku: "LP-PKT-002", title: "Drug & Alcohol Compliance Packet",     price: "$97",  domain: "D&A Program",              desc: "Complete Drug & Alcohol program structure for owner-operators and small fleets. Includes Clearinghouse enrollment protocol, pre-employment testing requirements, and program documentation." },
  { sku: "LP-PKT-003", title: "HOS & Dispatch Compliance Packet",     price: "$127", domain: "Hours of Service",         desc: "Hours-of-service documentation system covering ELD compliance, log reconciliation, and dispatch record requirements under 49 CFR Part 395." },
  { sku: "LP-PKT-004", title: "Maintenance & Unit File Packet",       price: "$127", domain: "Vehicle Maintenance",      desc: "Vehicle maintenance documentation system including DVIR requirements, periodic inspection scheduling, and unit file structure under 49 CFR Part 396." },
  { sku: "LP-PKT-005", title: "Insurance & Authority Packet",         price: "$127", domain: "Insurance Continuity",     desc: "BMC-91 filing integrity, coverage verification schedule, and policy gap prevention protocol. Addresses the most common cause of authority revocation." },
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

/* ── Count-up hook (fires on page load, not scroll) ─────────── */
function useCountUpOnLoad(end, duration = 1500) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []); // eslint-disable-line
  return value;
}

/* ── Checkout helper shared by multiple components ────────────── */
function useBuyProduct() {
  const [states, setStates] = useState({}); // { [sku]: "idle"|"loading"|"error" }
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
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }} className="stats-grid">
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
  dq_file: {
    sin: "SIN 01 — The Ghost Driver",
    consequence: "Immediate Out-of-Service order. Automatic failure in any compliance review.",
    cfr: "49 CFR Part 391.51",
  },
  insurance: {
    sin: "SIN 12 — Insurance Mismatch",
    consequence: "FMCSA may show No Insurance on SAFER. Authority can be revoked.",
    cfr: "49 CFR Part 387",
  },
  clearinghouse: {
    sin: "SIN 05 — Clearinghouse Silence",
    consequence: "Driver may have disqualifying violations you do not know about. Carrier is liable.",
    cfr: "49 CFR Part 382.701",
  },
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
      <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.5rem" }}>
        LP-TOOL-003A | QUICK SELF-AUDIT
      </p>
      <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
        Three questions. Real-time exposure check.
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 540 }}>
        Answer honestly. These are the first three questions a compliance investigator asks.
      </p>

      {/* Question cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
        {QUESTIONS.map(q => (
          <div
            key={q.key}
            data-testid={`audit-q-${q.key}`}
            style={{ background: CARD, border: `1px solid ${BORDER}`, padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}
          >
            <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.55, flex: 1, margin: 0 }}>{q.text}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <button
                data-testid={`audit-yes-${q.key}`}
                onClick={() => setAnswer(q.key, true)}
                style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.5rem 1.125rem", border: `1px solid ${answers[q.key] === true ? "#22c55e" : "rgba(255,255,255,0.15)"}`, background: answers[q.key] === true ? "rgba(34,197,94,0.14)" : "transparent", color: answers[q.key] === true ? "#22c55e" : "rgba(255,255,255,0.50)", cursor: "pointer", transition: "all 0.15s" }}
              >Yes</button>
              <button
                data-testid={`audit-no-${q.key}`}
                onClick={() => setAnswer(q.key, false)}
                style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.5rem 1.125rem", border: `1px solid ${answers[q.key] === false ? "#ef4444" : "rgba(255,255,255,0.15)"}`, background: answers[q.key] === false ? "rgba(239,68,68,0.14)" : "transparent", color: answers[q.key] === false ? "#ef4444" : "rgba(255,255,255,0.50)", cursor: "pointer", transition: "all 0.15s" }}
              >No</button>
            </div>
          </div>
        ))}
      </div>

      {/* Result: any No */}
      {anyNo && (
        <div data-testid="audit-result-risk" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.28)", padding: "1.75rem" }}>
          <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ef4444", marginBottom: "1.25rem" }}>
            You have at least one HIGH-RISK compliance exposure.
          </p>
          {failedKeys.map(key => (
            <div key={key} style={{ marginBottom: "1.25rem", paddingLeft: "1rem", borderLeft: "2px solid rgba(239,68,68,0.35)" }}>
              <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", color: "#ef4444", marginBottom: "0.3rem" }}>{SIN_DATA[key].sin}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.6, marginBottom: "0.25rem" }}>{SIN_DATA[key].consequence}</p>
              <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.30)" }}>{SIN_DATA[key].cfr}</p>
            </div>
          ))}
          <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            The 16 Deadly Sins Pocket Guide covers all 16 exposure points and gives you a 7-day plan to close them.
          </p>
          <button
            data-testid="audit-cta-lp-res-001"
            onClick={() => onBuy("LP-RES-001")}
            disabled={isLoading}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.75rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1 }}
          >
            {isLoading ? <><span className="lp-spinner" />&nbsp;Processing...</> : "Get the Pocket Guide — $17"}
          </button>
          {buyError && <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "#ef4444", marginTop: "0.625rem" }}>{buyError}</p>}
        </div>
      )}

      {/* Result: all Yes */}
      {allYes && (
        <div data-testid="audit-result-ok" style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.28)", padding: "1.75rem" }}>
          <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#22c55e", marginBottom: "1rem" }}>
            Good start. There are 13 more exposure points in the full diagnostic.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            The complete self-audit takes 15 minutes and covers all 16 sins across 6 compliance domains.
          </p>
          <button
            data-testid="audit-cta-all-yes"
            onClick={() => onBuy("LP-RES-001")}
            disabled={isLoading}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.75rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1 }}
          >
            {isLoading ? <><span className="lp-spinner" />&nbsp;Processing...</> : "Get the Pocket Guide — $17"}
          </button>
          {buyError && <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "#ef4444", marginTop: "0.625rem" }}>{buyError}</p>}
        </div>
      )}
    </div>
  );
}

/* ── Resource card with native checkout ─────────────────────── */
function ResourceCard({ product, onBuy, loadingState, buyError }) {
  const isLoading = loadingState === "loading";
  return (
    <div
      data-testid={`resource-card-${product.sku.toLowerCase()}`}
      style={{ background: "#FFFFFF", borderTop: `2px solid ${GOLD}`, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem", boxShadow: "0 1px 4px rgba(13,27,48,0.08)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.7)", margin: 0 }}>{product.sku}</p>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "1.25rem", color: NAVY, flexShrink: 0 }}>{product.price}</span>
      </div>
      <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.1rem", color: NAVY, lineHeight: 1.25, margin: 0 }}>{product.title}</h3>
      <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(13,27,48,0.62)", lineHeight: 1.72, flex: 1, margin: 0 }}>{product.desc}</p>
      <div>
        <button
          data-testid={`buy-resource-${product.sku.toLowerCase()}`}
          onClick={() => onBuy(product.sku)}
          disabled={isLoading}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.5rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1, transition: "background 0.2s" }}
          onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = "#e8a520"; }}
          onMouseLeave={e => { e.currentTarget.style.background = isLoading ? GOLD : GOLD; }}
        >
          {isLoading ? <><span className="lp-spinner-dark" />&nbsp;Processing...</> : `Get This — ${product.price}`}
        </button>
        {buyError && <p style={{ fontFamily: SANS, fontSize: "0.814rem", color: "#dc2626", marginTop: "0.5rem", textAlign: "center", lineHeight: 1.5 }}>{buyError}</p>}
      </div>
    </div>
  );
}

/* ── Packet card with native checkout ───────────────────────── */
function PacketCard({ product, onBuy, loadingState, buyError }) {
  const isLoading = loadingState === "loading";
  return (
    <div
      data-testid={`product-card-${product.sku.toLowerCase()}`}
      style={{ background: CARD, borderTop: `2px solid rgba(212,144,10,0.35)`, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.3rem" }}>{product.sku}</p>
          <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", border: `1px solid rgba(255,255,255,0.12)`, padding: "0.15rem 0.5rem" }}>
            {product.domain}
          </span>
        </div>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "1.4rem", color: GOLD, flexShrink: 0 }}>{product.price}</span>
      </div>
      <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.2rem", color: "#FFF", lineHeight: 1.25 }}>{product.title}</h3>
      <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.60)", lineHeight: 1.72, flex: 1 }}>{product.desc}</p>
      <div>
        <button
          data-testid={`buy-btn-${product.sku.toLowerCase()}`}
          onClick={() => onBuy(product.sku)}
          disabled={isLoading}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.5rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1, transition: "background 0.2s" }}
          onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = "#e8a520"; }}
          onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
        >
          {isLoading ? <><span className="lp-spinner" />&nbsp;Processing...</> : `Get This Packet — ${product.price}`}
        </button>
        {buyError && <p style={{ fontFamily: SANS, fontSize: "0.814rem", color: "#ef4444", marginTop: "0.5rem", textAlign: "center", lineHeight: 1.5 }}>{buyError}</p>}
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
        @media (max-width: 720px) {
          .path-cards    { grid-template-columns: 1fr !important; }
          .product-grid  { grid-template-columns: 1fr !important; }
          .resource-grid { grid-template-columns: 1fr !important; }
          .bundle-grid   { grid-template-columns: 1fr !important; }
          .guided-grid   { grid-template-columns: 1fr !important; }
          .stats-grid    { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .path-cards    { grid-template-columns: 1fr 1fr !important; }
          .resource-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* ══ 1. HERO ═══════════════════════════════════════════════ */}
      <div style={{ position: "relative", borderBottom: `3px solid ${GOLD}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/vpafe5mz_compliance-docs.png)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,14,32,0.94) 45%, rgba(6,14,32,0.75) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 5rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "1.25rem" }}>
            LP-SYS-LIBRARY | STANDARDS LIBRARY
          </p>
          <h1 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 620 }}>
            The LaunchPath Operating Standards Library
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", marginBottom: "2rem" }}>
            Three paths to audit-ready compliance infrastructure:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 820 }} className="path-cards">
            {[
              { tier: "TIER 1", label: "Individual Packets",       sub: "Install one domain at a time",                           price: "$97–$127" },
              { tier: "TIER 2", label: "Document System Bundle",   sub: "Install the full structure yourself",                    price: "$497" },
              { tier: "TIER 3", label: "LaunchPath Standard",      sub: "Guided 90-day implementation with verification",         price: "$2,500" },
            ].map((t) => (
              <div key={t.tier} style={{ background: "rgba(10,20,40,0.80)", border: `1px solid rgba(212,144,10,0.25)`, padding: "1.25rem 1.25rem 1.5rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.4rem" }}>{t.tier}</p>
                <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.15rem", color: "#FFF", lineHeight: 1.2, marginBottom: "0.4rem" }}>{t.label}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.55, marginBottom: "0.625rem" }}>{t.sub}</p>
                <p style={{ fontFamily: MONO, fontSize: "0.857rem", fontWeight: 700, color: GOLD }}>{t.price}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.45)", marginTop: "1.75rem", fontStyle: "italic" }}>
            Choose based on where you are and how much structure you need.
          </p>
        </div>
      </div>

      {/* ══ 2. LP-RES-001 FEATURED ZONE — Stats + Self-Audit ══════ */}
      <div style={{ background: BG2, padding: "5rem 1.5rem", borderBottom: `1px solid rgba(212,144,10,0.20)` }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>
            LP-RES-001 | THE 16 DEADLY SINS POCKET GUIDE — $17
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.75rem" }}>
            Know what ends authority before you learn the hard way.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 580, marginBottom: "3rem" }}>
            Most new carriers don't fail audits because they broke the rules. They fail because they didn't know which specific behaviors trigger automatic failure.
          </p>

          {/* Stats counters */}
          <StatsBlock />

          {/* Self-audit */}
          <SinAuditPreview
            onBuy={buy}
            loadingState={states["LP-RES-001"]}
            buyError={errors["LP-RES-001"]}
          />
        </div>
      </div>

      {/* ══ 3. ENTRY-LEVEL RESOURCES ══════════════════════════════ */}
      <div style={{ background: "#F6F3EE", padding: "5rem 1.5rem", borderBottom: `1px solid rgba(13,27,48,0.10)` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem" }}>
            LP-RESOURCES | ENTRY-LEVEL GUIDES &amp; TOOLS
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#0D1B30", marginBottom: "0.75rem" }}>
            Standalone resources. No subscription required.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(13,27,48,0.55)", lineHeight: 1.7, maxWidth: 600, marginBottom: "3rem" }}>
            Self-directed tools, guides, and kits built from the LaunchPath compliance architecture. Start anywhere. Each resource is self-contained.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="resource-grid">
            {RESOURCES.map((r) => (
              <ResourceCard
                key={r.sku}
                product={r}
                onBuy={buy}
                loadingState={states[r.sku]}
                buyError={errors[r.sku]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. INDIVIDUAL PACKETS ══════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.75rem" }}>
            TIER 1 | INDIVIDUAL PACKETS — $97–$127 EACH
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.75rem" }}>
            Install one domain at a time.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600, marginBottom: "3rem" }}>
            Each packet covers one compliance domain completely. Buy what you need, install it, then move to the next.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="product-grid">
            {PACKETS.map((p) => (
              <PacketCard
                key={p.sku}
                product={p}
                onBuy={buy}
                loadingState={states[p.sku]}
                buyError={errors[p.sku]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══ 5. $497 BUNDLE ════════════════════════════════════════ */}
      <div style={{ background: BG2, borderTop: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }} className="bundle-grid">
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>
                LP-SPEC-001 | TIER 2 — THE COMPLETE DIY SYSTEM
              </p>
              <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FFF", letterSpacing: "-0.01em", marginBottom: "0.4rem" }}>
                New Carrier Document System
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "1.15rem", color: GOLD, fontWeight: 700, marginBottom: "0.25rem" }}>
                $497 <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 400, color: "rgba(212,144,10,0.55)" }}>($634 if purchased separately)</span>
              </p>
              <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", marginBottom: "1.75rem", lineHeight: 1.65, maxWidth: 480 }}>
                Every compliance packet, plus the folder architecture and implementation calendar that turns five documents into one operating system. The complete DIY path.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {BUNDLE_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.857rem", color: GOLD, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>→</span>
                    <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                <button
                  data-testid="bundle-buy-btn"
                  onClick={() => buy("LP-BDL-001")}
                  disabled={states["LP-BDL-001"] === "loading"}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1rem 2rem", border: "none", cursor: states["LP-BDL-001"] === "loading" ? "not-allowed" : "pointer", opacity: states["LP-BDL-001"] === "loading" ? 0.75 : 1, transition: "background 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { if (states["LP-BDL-001"] !== "loading") e.currentTarget.style.background = "#e8a520"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
                >
                  {states["LP-BDL-001"] === "loading" ? <><span className="lp-spinner-dark" />&nbsp;Processing...</> : "Download Bundle — $497"}
                </button>
                {errors["LP-BDL-001"] && (
                  <p style={{ fontFamily: SANS, fontSize: "0.814rem", color: "#ef4444", maxWidth: 240, textAlign: "right", lineHeight: 1.5 }}>{errors["LP-BDL-001"]}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 6. BRIDGE COPY — WHY GUIDED? ══════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.5rem" }}>
            LP-DOC-001 | THE DIFFERENCE
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "2rem" }}>
            Why Guided?
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            The $497 Document System gives you every form, template, and checklist you need. If you know what you're doing — or you're willing to figure it out — it's everything required to build an audit-ready operation.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            But most new carriers don't fail because they lacked the documents. They fail because the documents weren't installed in the right order, at the right time, with the right verification.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85 }}>
            The LaunchPath Standard exists for operators who want someone watching the installation — not doing it for them, but confirming it's done right before the audit window closes.
          </p>
        </div>
      </div>

      {/* ══ 7. $2,500 GUIDED STANDARD ═════════════════════════════ */}
      <div style={{ background: BG2, borderTop: `1px solid rgba(212,144,10,0.20)`, borderBottom: `1px solid rgba(212,144,10,0.20)`, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ borderLeft: `3px solid rgba(212,144,10,0.40)`, paddingLeft: "1.5rem", marginBottom: "3rem", maxWidth: 560 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.80)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "0.5rem" }}>
              "If this feels expensive, you are likely not ready. If it feels reasonable, you are already thinking like an operator."
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(212,144,10,0.60)", letterSpacing: "0.08em", margin: 0 }}>
              — Vince Lawrence, Station Custodian
            </p>
          </div>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.5rem" }}>
            LP-STD-001 | TIER 3 — THE GUIDED IMPLEMENTATION
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.4rem" }}>
            The LaunchPath Standard — $2,500
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "start", marginTop: "2rem" }} className="guided-grid">
            <div>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                The difference between the DIY system and the guided implementation isn't the documents — it's whether someone with 25 years in compliance is watching to make sure they're installed correctly before FMCSA arrives.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, marginBottom: "2rem" }}>
                Entry is through Ground 0.
              </p>
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
              <Link
                to="/ground-0-briefing"
                data-testid="guided-ground0-btn"
                style={{ display: "block", textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1.1rem 1.5rem", textDecoration: "none", marginBottom: "1rem", transition: "background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
              >
                INITIATE GROUND 0 →
              </Link>
              <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, textAlign: "center", margin: 0 }}>
                Ground 0 is free. It takes 4–6 minutes.<br />
                Complete it to request admission to the next cohort.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 8. COMPARISON MATRIX ══════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "2rem" }}>
            LP-DOC-002 | COMPARISON MATRIX
          </p>
          <div style={{ border: `1px solid ${BORDER}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderBottom: `1px solid ${BORDER}`, background: "rgba(212,144,10,0.06)" }}>
              <div style={{ padding: "1rem 1.25rem" }} />
              {[{ label: "Individual Packets", price: "$97–$127 ea." }, { label: "Document System Bundle", price: "$497" }, { label: "LaunchPath Standard", price: "$2,500" }].map((col) => (
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
                  <div key={j} style={{ padding: "0.875rem 1.25rem", borderLeft: `1px solid ${BORDER}`, fontFamily: val === "—" ? MONO : SANS, fontSize: "var(--text-sm)", color: val === "✓" ? "#4caf50" : val === "—" ? "rgba(255,255,255,0.20)" : j === 2 ? GOLD : "rgba(255,255,255,0.72)", fontWeight: val === "✓" ? 700 : 400 }}>
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 9. OUTCOME / TRUST STATEMENT ══════════════════════════ */}
      <div style={{ background: BG2, padding: "3.5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", borderLeft: `3px solid rgba(212,144,10,0.35)`, paddingLeft: "1.75rem" }}>
          <p style={{ fontFamily: SANS, fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.60)", lineHeight: 1.82, marginBottom: "0.75rem" }}>
            Every packet in this library is built from the same documentation architecture used in the full LaunchPath Standard. The difference is whether you install it yourself — or with oversight.
          </p>
        </div>
      </div>

      {/* ══ 10. FINAL CTA ══════════════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.25rem" }}>
            LPOS V1.0 | GROUND 0 ENTRY
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#FFF", lineHeight: 1.1, marginBottom: "2rem" }}>
            Not sure which path fits your situation?
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/ground-0-briefing" data-testid="library-ground0-cta" style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1.1rem 2.25rem", textDecoration: "none", transition: "background 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }} onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}>
              INITIATE GROUND 0 →
            </Link>
            <Link to="/standard" data-testid="library-standard-link" style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, background: "transparent", padding: "1.1rem 2.25rem", textDecoration: "none", border: `1px solid rgba(212,144,10,0.45)`, transition: "border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.45)"; }}>
              VIEW THE STANDARD →
            </Link>
          </div>
        </div>
      </div>

      {/* ══ Disclaimer ════════════════════════════════════════════ */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.7, maxWidth: 680, margin: "0 auto", fontStyle: "italic" }}>
          All documents current as of March 2026. Verify current regulatory requirements at ecfr.gov. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
        </p>
      </div>

      <FooterSection />
    </div>
  );
}
