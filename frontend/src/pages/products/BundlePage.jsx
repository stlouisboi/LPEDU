import { useState } from "react";
import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";

const API  = process.env.REACT_APP_BACKEND_URL;
const GOLD = "#d4900a";
const GOLD_DIM = "rgba(212,144,10,0.65)";
const CORAL = "#D85A30";
const DARK = "#070e1c";
const NAVY = "#0b1628";
const CARD = "#0d1929";
const MONO = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";

// ── Domain packets in the bundle ────────────────────────────────────────────
const PACKETS = [
  { code: "LP-PKT-001", domain: "Domain 1", title: "New Entrant Compliance Packet",    pages: 40, retail: "$97",  desc: "New Entrant Safety Audit brief, pre-launch checklist, 8-folder structure map." },
  { code: "LP-PKT-002", domain: "Domain 2", title: "Drug & Alcohol Compliance Packet", pages: 36, retail: "$127",  desc: "Part 382 brief, program setup checklist, 10-section written policy, recordkeeping log." },
  { code: "LP-PKT-003", domain: "Domain 3", title: "HOS & Dispatch Compliance Packet", pages: 36, retail: "$127", desc: "HOS rules brief, ELD usage checklist, dispatch standards, weekly review checklist." },
  { code: "LP-PKT-004", domain: "Domain 4", title: "Maintenance & Unit File Packet",   pages: 36, retail: "$127", desc: "Part 396 brief, unit file template, PM schedule, defect and repair tracking sheet." },
  { code: "LP-PKT-005", domain: "Domain 5", title: "Insurance & Authority Packet",     pages: 36, retail: "$127", desc: "Coverage types brief, broker/shipper contract risk checklist, 90/60/30-day renewal." },
];

const BONUSES = [
  { code: "LP-GUIDE-001", title: "0–30–90 Day Implementation Guide", desc: "Installation sequence dictating the order of operations across all 5 domains. The DIY version of the LaunchPath Standard implementation map.", tag: "INCLUDED" },
  { code: "LP-ARCH-001",  title: "Unified Folder Architecture",       desc: "Company folder, DQ folder, Unit/Maintenance folder, and Audit-Ready Grab Folder — pre-mapped to FMCSA investigator review patterns.", tag: "INCLUDED" },
  { code: "LP-CKL-001",  title: "Master Compliance Checklist",        desc: "Cross-domain master checklist tying all 5 packets to a single pass/fail review. Run it quarterly or before any audit window.", tag: "INCLUDED" },
];

const PHASES = [
  {
    id: "0–30", label: "Infrastructure",
    color: GOLD,
    steps: [
      "Install the Unified Folder Architecture (Company, DQ, Unit, Grab Folder)",
      "Complete the Insurance & Authority Packet — verify MCS-150, BOC-3, Form H",
      "Execute the New Entrant Compliance Packet — establish your Administrative Anniversary",
      "Build your DQ file from the Driver Qualification Templates",
    ],
  },
  {
    id: "31–60", label: "Daily Standard",
    color: "#60a5fa",
    steps: [
      "Enroll in a FMCSA-registered C/TPA, run the Clearinghouse pre-employment query",
      "Install the Drug & Alcohol Compliance Packet — file Proof of Enrollment",
      "Implement the HOS & Dispatch Packet — configure ELD, install driver instruction card",
      "Activate dispatch log and BOL filing by trip number",
    ],
  },
  {
    id: "61–90", label: "Hardening",
    color: "#4ade80",
    steps: [
      "Build unit files for every VIN — upload Annual Inspection and PM schedule",
      "Activate the Maintenance & Unit File Packet — start the recurring maintenance log",
      "Run the Audit-Ready Grab Folder simulation — every document locatable in under 5 minutes",
      "Execute the Master Compliance Checklist — document gaps before the audit window opens",
    ],
  },
];

const RISKS = [
  { code: "R-01", title: "Incomplete DQ File",          desc: "A missing CDL copy, unsigned application, or lapsed MVR causes immediate driver disqualification during a New Entrant audit. One driver = authority suspension." },
  { code: "R-02", title: "No Written D&A Policy",        desc: "Part 382 requires a written D&A policy. Carriers without one receive an Unsatisfactory rating on the first audit — no cure window." },
  { code: "R-03", title: "ELD Malfunction Documentation", desc: "Failing to document an ELD malfunction is treated the same as falsifying records. The checklist prevents this." },
  { code: "R-04", title: "No PM Log for 60+ Days",       desc: "A gap in the Preventive Maintenance log signals a non-functioning maintenance program. Automatic conditional finding." },
  { code: "R-05", title: "Insurance Lapse",               desc: "A single day without continuous Form H coverage triggers automatic authority revocation. The 90/60/30-day checklist closes this gap." },
];

const COMPARE_ROWS = [
  { feature: "5 domain-specific compliance packets (185+ pages)",        bundle: true,  standard: true  },
  { feature: "Unified Folder Architecture + Master Compliance Checklist", bundle: true,  standard: true  },
  { feature: "0–30–90 Day Implementation Guide",                         bundle: true,  standard: true  },
  { feature: "10-module curriculum (72 lessons, 17 hrs)",                 bundle: false, standard: true  },
  { feature: "Operator Portal with task tracking",                        bundle: false, standard: true  },
  { feature: "5 coach milestone verification checkpoints",                bundle: false, standard: true  },
  { feature: "Pre-audit simulation (Week 11)",                            bundle: false, standard: true  },
  { feature: "Administrative Signal dashboard",                           bundle: false, standard: true  },
  { feature: "Verified Registry ID (LP-VRF)",                             bundle: false, standard: true  },
  { feature: "Direct access to Station Custodian",                        bundle: false, standard: true  },
];

// ── Checkout ──────────────────────────────────────────────────────────────────
function useBuy() {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);
  const buy = async () => {
    setState("loading");
    setError(null);
    try {
      const res = await fetch(`${API}/api/products/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_sku: "LP-BDL-001", origin_url: window.location.origin }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else throw new Error();
    } catch {
      setState("idle");
      setError("Something went wrong. Please try again or contact support@launchpathedu.com.");
    }
  };
  return { state, error, buy };
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Rail({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 0 2.5rem" }}>
      <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_DIM, whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, rgba(212,144,10,0.35), transparent)` }} />
    </div>
  );
}

function BuyButton({ state, onClick, size = "lg" }) {
  const isLoading = state === "loading";
  const pad = size === "lg" ? "1.25rem 3rem" : "1rem 2rem";
  const fs  = size === "lg" ? "1rem" : "0.9rem";
  return (
    <button
      data-testid="bundle-buy-btn"
      onClick={onClick}
      disabled={isLoading}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.625rem",
        background: isLoading ? "rgba(212,144,10,0.5)" : GOLD,
        color: "#070e1c", fontFamily: MONO, fontWeight: 700,
        fontSize: fs, letterSpacing: "0.07em", textTransform: "uppercase",
        padding: pad, border: "none", cursor: isLoading ? "not-allowed" : "pointer",
        transition: "background 0.2s", borderRadius: 0,
      }}
      onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = "#e8a520"; }}
      onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = GOLD; }}
    >
      {isLoading
        ? <><span style={{ width: 14, height: 14, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Processing…</>
        : <>Get Instant Access — $499 →</>}
    </button>
  );
}

function Check({ yes }) {
  if (yes) return <span style={{ color: GOLD, fontWeight: 700 }}>✓</span>;
  return <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BundlePage() {
  const { state, error, buy } = useBuy();

  return (
    <div style={{ background: DARK, minHeight: "100vh", color: "#FFFFFF", fontFamily: MONO }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .bundle-phases { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
        .bundle-risk-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 2px; }
        @media(max-width:760px){
          .bundle-hero-grid { grid-template-columns: 1fr !important; }
          .bundle-phases { grid-template-columns: 1fr !important; }
          .bundle-risk-grid { grid-template-columns: 1fr !important; }
          .bundle-compare-grid { grid-template-columns: 1fr 100px 100px !important; }
        }
      `}} />

      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        background: NAVY,
        borderBottom: `3px solid ${CORAL}`,
        padding: "80px 24px 64px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Blueprint grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative" }}>
          {/* System label */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ display: "inline-block", width: 6, height: 6,
              background: "rgba(216,90,48,0.70)", flexShrink: 0,
            }} />
            <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: CORAL }}>
              LP-BDL-001 &nbsp;|&nbsp; NEW CARRIER DOCUMENT SYSTEM
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "center" }} className="bundle-hero-grid">
            <div>
              <h1 style={{
                fontFamily: SERIF, fontWeight: 700,
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                color: "#FFFFFF", lineHeight: 1.05, letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}>
                New Carrier Document System
              </h1>
              <div style={{ height: 2, background: CORAL, width: 64, marginBottom: "1.5rem" }} />
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: 560 }}>
                Five compliance domain packets, a unified folder architecture, and a 0–30–90 day installation guide — every document a new carrier needs to pass a New Entrant Safety Audit, in a single system.
              </p>

              {/* Price block */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2.75rem, 5vw, 4rem)", color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.02em" }}>$499</span>
                <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", textDecoration: "line-through" }}>$635 retail</span>
                <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "0.25rem 0.6rem" }}>SAVE $138</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>
                PDF delivery · Instant download · No subscription
              </p>

              <BuyButton state={state} onClick={buy} size="lg" />
              {error && <p style={{ color: "#f87171", fontSize: "0.875rem", marginTop: "0.75rem" }}>{error}</p>}

              {/* Reassurance */}
              <div style={{ display: "flex", gap: "2rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
                {["185+ pages across 5 domains", "Instant PDF download", "Stripe-secured checkout"].map((t, i) => (
                  <span key={i} style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ color: GOLD }}>—</span> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div style={{
              background: "rgba(0,0,0,0.3)",
              border: `1px solid rgba(212,144,10,0.2)`,
              borderTop: `2px solid ${GOLD}`,
              padding: "1.75rem",
              boxShadow: "inset 0 2px 12px rgba(0,0,0,0.4)",
            }}>
              <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD_DIM, marginBottom: "1.25rem" }}>SYSTEM CONTENTS</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {PACKETS.map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.03)", borderLeft: `2px solid ${GOLD}` }}>
                    <div>
                      <span style={{ fontSize: "0.714rem", color: GOLD_DIM, fontFamily: MONO, letterSpacing: "0.1em", display: "block", marginBottom: "0.1rem" }}>{p.domain}</span>
                      <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{p.title.split(" Compliance")[0].split(" Packet")[0]}</span>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontFamily: MONO, flexShrink: 0, marginLeft: "0.5rem" }}>{p.pages}pp</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.625rem 0.875rem", background: "rgba(212,144,10,0.04)", borderLeft: `2px solid rgba(212,144,10,0.35)` }}>
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>+ 3 Bonus Deliverables</span>
                  <span style={{ fontSize: "0.714rem", color: GOLD_DIM, fontFamily: MONO, letterSpacing: "0.12em" }}>INCLUDED</span>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.857rem", color: "rgba(255,255,255,0.5)" }}>Retail value</span>
                  <span style={{ fontSize: "0.857rem", color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>$635</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.857rem", fontWeight: 700, color: "#FFFFFF" }}>Bundle price</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, color: GOLD }}>$499</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS IS ──────────────────────────────────────────────── */}
      <section style={{ background: "#080f1e", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Rail label="POSITIONING — LP-BDL-001" />
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            What this is — and what it is not
          </h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            This is not a template bundle or a generic compliance download. It is a complete new-authority operating standard in document form — five domain-specific systems unified into a single installation sequence that a carrier can execute without a consultant.
          </p>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.9, marginBottom: "1.75rem" }}>
            The competitor landscape includes $150–$550 DIY audit kits with no sequence logic and $1,800+ filing-only bundles that touch authority paperwork and nothing else. This is neither. It covers all six FMCSA audit domains, delivers a physical implementation calendar, and prices above commodity kits and below consulting — intentionally.
          </p>
          <div style={{ borderLeft: `3px solid rgba(212,144,10,0.4)`, paddingLeft: "1.25rem", background: "rgba(212,144,10,0.04)", padding: "1rem 1.25rem" }}>
            <p style={{ fontSize: "0.975rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
              "The New Entrant Safety Audit is not a surprise. FMCSA tells you exactly what they are looking for. This system builds it for you before they arrive."
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────────────── */}
      <section style={{ background: "#001030", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Rail label="SYSTEM CONTENTS — 8 DELIVERABLES" />
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            What's included
          </h2>

          {/* 5 Packets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "2px" }}>
            {PACKETS.map((p, i) => (
              <div key={i} style={{
                background: CARD, padding: "1.5rem 2rem",
                display: "grid", gridTemplateColumns: "200px 1fr auto",
                gap: "2rem", alignItems: "start",
                borderLeft: `3px solid ${GOLD}`,
              }} className="packet-item">
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: GOLD_DIM, letterSpacing: "0.12em", marginBottom: "0.25rem" }}>{p.domain} &nbsp;·&nbsp; {p.code}</p>
                  <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", lineHeight: 1.3, margin: 0 }}>{p.title}</p>
                  <p style={{ fontFamily: MONO, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem" }}>{p.pages} pages · PDF</p>
                </div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.3)", textDecoration: "line-through", marginBottom: "0.1rem" }}>{p.retail}</p>
                  <p style={{ fontFamily: MONO, fontSize: "0.857rem", color: GOLD_DIM, letterSpacing: "0.1em" }}>INCLUDED</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bonuses */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "2px" }}>
            {BONUSES.map((b, i) => (
              <div key={i} style={{
                background: "rgba(212,144,10,0.04)", padding: "1.25rem 2rem",
                display: "grid", gridTemplateColumns: "200px 1fr auto",
                gap: "2rem", alignItems: "start",
                border: "1px solid rgba(212,144,10,0.12)",
                borderLeft: `2px solid rgba(212,144,10,0.4)`,
              }} className="packet-item">
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: GOLD_DIM, letterSpacing: "0.12em", marginBottom: "0.25rem" }}>BONUS &nbsp;·&nbsp; {b.code}</p>
                  <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.3, margin: 0 }}>{b.title}</p>
                </div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
                <span style={{ fontFamily: MONO, fontSize: "0.714rem", color: "#4ade80", background: "rgba(74,222,128,0.08)", padding: "0.25rem 0.6rem", letterSpacing: "0.12em", flexShrink: 0 }}>{b.tag}</span>
              </div>
            ))}
          </div>

          <style dangerouslySetInnerHTML={{__html: `.packet-item { transition: background 0.15s; } .packet-item:hover { background: rgba(212,144,10,0.04) !important; } @media(max-width:680px){ .packet-item { grid-template-columns: 1fr !important; } }`}} />
        </div>
      </section>

      {/* ── 0-30-90 GUIDE ──────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <Rail label="INSTALLATION SEQUENCE — LP-GUIDE-001" />
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0.875rem" }}>
            The 0–30–90 Day Implementation Guide
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 620 }}>
            The document that separates the $499 Bundle from a folder of PDFs. It dictates the order of operations for installing all five packets — domain by domain — in the sequence FMCSA auditors expect to find them.
          </p>

          <div className="bundle-phases" style={{ background: "rgba(255,255,255,0.04)", gap: "2px" }}>
            {PHASES.map((ph) => (
              <div key={ph.id} style={{ background: CARD, padding: "2rem 1.75rem", borderTop: `3px solid ${ph.color}` }}>
                <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: ph.color, marginBottom: "0.375rem" }}>DAYS {ph.id}</p>
                <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF", marginBottom: "1.5rem" }}>{ph.label}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {ph.steps.map((step, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: MONO, fontSize: "0.714rem", color: ph.color, flexShrink: 0, marginTop: "0.15rem", fontWeight: 700 }}>{j+1}.</span>
                      <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RISK SECTION ──────────────────────────────────────────────── */}
      <section style={{ background: "#080f1e", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Rail label="RISK REGISTER — LP-RSK-001" />
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0.875rem" }}>
            What this system prevents
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 600 }}>
            These are the five most common reasons new carriers fail their New Entrant Safety Audit. Each one has a corresponding document in this system.
          </p>

          <div className="bundle-risk-grid" style={{ gap: "2px" }}>
            {RISKS.map((r) => (
              <div key={r.code} style={{
                background: CARD, padding: "1.5rem 1.75rem",
                borderLeft: "3px solid rgba(248,113,113,0.4)",
                display: "flex", flexDirection: "column", gap: "0.5rem",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", margin: 0 }}>{r.title}</p>
                  <span style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(248,113,113,0.55)", letterSpacing: "0.1em", flexShrink: 0, marginLeft: "1rem" }}>{r.code}</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
            {/* 6th cell: CTA */}
            <div style={{
              background: "rgba(212,144,10,0.05)", padding: "1.5rem 1.75rem",
              border: `1px solid rgba(212,144,10,0.2)`,
              borderLeft: `3px solid ${GOLD}`,
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "1rem",
            }}>
              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF", lineHeight: 1.4 }}>
                This system addresses all five failure patterns before your audit window opens.
              </p>
              <BuyButton state={state} onClick={buy} size="sm" />
              {error && <p style={{ color: "#f87171", fontSize: "0.857rem" }}>{error}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────────── */}
      <section style={{ background: "#001030", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Rail label="OPTION COMPARISON" />
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0.875rem" }}>
            Bundle vs. Guided Standard
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 580 }}>
            The $499 Bundle is the complete DIY path. The $2,500 Guided Standard adds a coach who verifies your implementation at five milestones and issues a Verified Registry ID upon completion.
          </p>

          <div style={{ border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px", background: "#0a1220" }} className="bundle-compare-grid">
              <div style={{ padding: "1rem 1.5rem" }} />
              <div style={{ padding: "1rem", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.25rem" }}>DOCUMENT SYSTEM</p>
                <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF" }}>$499</p>
              </div>
              <div style={{ padding: "1rem", textAlign: "center", borderLeft: `1px solid rgba(212,144,10,0.25)`, background: "rgba(212,144,10,0.05)" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD_DIM, marginBottom: "0.25rem" }}>GUIDED STANDARD</p>
                <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.25rem", color: GOLD }}>$2,500</p>
              </div>
            </div>
            {/* Rows */}
            {COMPARE_ROWS.map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 160px 160px",
                background: i % 2 === 0 ? CARD : "#0a1220",
                borderTop: "1px solid rgba(255,255,255,0.04)",
              }} className="bundle-compare-grid">
                <div style={{ padding: "0.875rem 1.5rem" }}>
                  <p style={{ fontSize: "0.875rem", color: row.bundle ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.4 }}>{row.feature}</p>
                </div>
                <div style={{ padding: "0.875rem 1rem", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check yes={row.bundle} />
                </div>
                <div style={{ padding: "0.875rem 1rem", textAlign: "center", borderLeft: `1px solid rgba(212,144,10,0.12)`, background: "rgba(212,144,10,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check yes={row.standard} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ───────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Rail label="QUALIFICATION FILTER — LP-QFY-001" />
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            Who this is for
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }} className="qualifier-grid">
            <div style={{ background: CARD, borderTop: `3px solid ${GOLD}`, padding: "2rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "1.5rem" }}>FOR YOU</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {["Your authority is active or being activated within 30 days", "You are ready to install infrastructure — not just read about it", "You want the complete document system without paying $1,800+ for a consultant", "You treat compliance as an operational cost of doing business, not optional overhead"].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, fontSize: "0.7rem", flexShrink: 0, marginTop: "0.2rem" }}>→</span>
                    <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.65 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#0a0e18", borderTop: "3px solid rgba(248,113,113,0.35)", padding: "2rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(248,113,113,0.7)", marginBottom: "1.5rem" }}>NOT FOR YOU</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {["You haven't applied for authority yet and have no timeline", "You are looking for shortcuts or content to passively read", "You are already under a Satisfactory rating with no compliance gaps", "You expect a human to complete the installation for you"].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(248,113,113,0.65)", fontSize: "0.7rem", flexShrink: 0, marginTop: "0.2rem" }}>✕</span>
                    <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `@media(max-width:680px){ .qualifier-grid { grid-template-columns: 1fr !important; } }`}} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: NAVY, padding: "96px 24px 104px", position: "relative", overflow: "hidden" }}>
        {/* Blueprint grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "40px 40px", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_DIM, marginBottom: "2rem" }}>LP-BDL-001 | CHECKOUT</p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "1rem" }}>
            Install the system before<br/>the audit window opens.
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
            5 compliance domain packets · 185+ pages · Instant PDF delivery
          </p>
          <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "2.5rem", color: GOLD, letterSpacing: "-0.02em", marginBottom: "2rem" }}>$499</p>

          <BuyButton state={state} onClick={buy} size="lg" />
          {error && <p style={{ color: "#f87171", fontSize: "0.875rem", marginTop: "0.75rem" }}>{error}</p>}

          <p style={{ fontFamily: MONO, fontSize: "0.714rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "1.5rem" }}>
            Stripe-secured checkout &nbsp;·&nbsp; Instant access after payment
          </p>

          {/* Upsell note */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              Carriers enrolled in the <strong style={{ color: "rgba(255,255,255,0.65)" }}>LaunchPath Standard ($2,500)</strong> receive this complete bundle at no additional cost as part of their cohort materials. If you are evaluating both options, that is worth knowing.
            </p>
            <Link to="/reach-diagnostic" style={{ fontFamily: MONO, fontSize: "0.857rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, textDecoration: "none" }}>
              Learn about the Guided Standard →
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
