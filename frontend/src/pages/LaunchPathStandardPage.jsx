import { Link } from '../compat/Link';
import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { useCountUp } from "../hooks/useCountUp";

const gold = "#C5A059";
const goldDim = "rgba(197,160,89,0.75)";
const navy = "#002244";
const dark = "#080f1e";
const card = "#0D1929";
const mono = "'Inter', sans-serif";
const condensed = "'Newsreader', 'Playfair Display', serif";
const body = "'Inter', sans-serif";

// ── Module Data ──────────────────────────────────────────
const MODULES = [
  { code: "G0", label: "GROUND 0", title: "Orientation Foundation", note: "Pre-Standard entry. Six modules covering the regulatory architecture, 90-day timeline, and risk doctrine.", type: "foundation" },
  { code: "M1", label: "MODULE 1", title: "Business & Authority Setup", plain: "Make sure your authority is legally filed and every federal registration is active and current.", note: "Entity structure, USDOT registration, operating authority, BOC-3, UCR, and MCS-150 compliance.", type: "core" },
  { code: "M2", label: "MODULE 2", title: "Driver Qualification System", plain: "Build a complete file for every driver before they touch a load — the paperwork FMCSA will ask for first.", note: "DQ file construction per 49 CFR §391 — employment application, MVR, medical certificate, CDL verification.", type: "core" },
  { code: "M3", label: "MODULE 3", title: "Drug & Alcohol Compliance", plain: "Get your federal drug testing program set up and documented before your first dispatch — not after your first audit.", note: "FMCSA-compliant C/TPA enrollment, pre-employment testing protocol, written D&A policy per Part 382.", type: "core" },
  { code: "M4", label: "MODULE 4", title: "Hours of Service & Dispatch", plain: "Configure your ELD correctly and build the dispatch records that hold up under roadside inspection.", note: "ELD configuration, Part 395 policy documentation, driver duty log review, and dispatch workflow.", type: "core" },
  { code: "M5", label: "MODULE 5", title: "Preventive Maintenance & Vehicle Files", plain: "Build unit files and maintenance records that prove your trucks are road-legal — not just assumed to be.", note: "PM schedule construction per §396, DVIR systems, annual inspection records, and unit file architecture.", type: "core" },
  { code: "M6", label: "MODULE 6", title: "Insurance & Authority Continuity", plain: "Verify your insurance filings are actually active on FMCSA's system — not just paid and assumed filed.", note: "MCS-90 endorsement verification, Form H filing, L&I sync, and carrier monitoring protocol.", badge: "Verified Registry ID issued at completion", type: "core" },
  { code: "M7", label: "MODULE 7", title: "Post-Failure Recovery", plain: "If you receive a Conditional rating, here is your documented 45-day correction window and reinstatement sequence.", note: "Conditional rating response protocol, 45-day correction window, and authority reinstatement procedures.", type: "recovery" },
  { code: "M8", label: "MODULE 8", title: "Load Profitability & Financial Structure", plain: "Calculate your real cost per mile and build a financial structure that keeps the truck — and you — operational.", note: "CPM calculation, revenue vs. reserve separation, and operational cost modeling for sustainable dispatch.", type: "extension" },
  { code: "M9", label: "MODULE 9", title: "Broker Relationships & Freight Network", plain: "Build your carrier packet, understand broker compliance requirements, and position on load boards correctly.", note: "Carrier packet construction, broker compliance standards, and load board positioning strategy.", type: "extension" },
];

const TYPE_BADGES = {
  foundation: { label: "FOUNDATION", color: "#4ade80", bg: "rgba(74,222,128,0.08)" },
  core: { label: "CORE", color: gold, bg: "rgba(197,160,89,0.08)" },
  recovery: { label: "RECOVERY", color: "#fb923c", bg: "rgba(251,146,60,0.08)" },
  extension: { label: "EXTENSION", color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
};

// ── Milestone Data ───────────────────────────────────────
const MILESTONES = [
  {
    num: "01",
    week: "END OF WEEK 1",
    title: "Authority Documentation Verification",
    desc: "Review and verify that the DQ file, D&A program enrollment, insurance certificate (Form H), and UCR registration are properly filed and match FMCSA records. Flag any deficiencies before Week 2 tasks begin.",
  },
  {
    num: "02",
    week: "END OF WEEK 4",
    title: "Implementation Sequence Audit",
    desc: "Full review of all active implementation tasks. Verify completion status, confirm documentation meets standard, and approve carrier to advance. Deficiencies are logged and assigned correction windows.",
  },
  {
    num: "03",
    week: "END OF WEEK 7",
    title: "Mid-Point Documentation Review",
    desc: "Cross-sectional review of documentation across all active compliance domains — DQ, D&A, HOS, PM, and insurance. Verifies that paper systems reflect operational reality, not just policy intent.",
  },
  {
    num: "04",
    week: "END OF WEEK 11",
    title: "Pre-Audit Simulation",
    desc: "Walk the carrier's installed systems against the 16 documented failure patterns. Simulate the audit review process. Identify any remaining exposures before the FMCSA New Entrant Audit window opens.",
  },
  {
    num: "05",
    week: "END OF WEEK 13",
    title: "Verified Registry ID Issuance",
    desc: "If all six compliance domains pass the final review, the LaunchPath Verified Registry ID (LP-VRF) is issued. Confirms that the carrier's compliance infrastructure was installed under the Standard.",
    badge: "LP-VRF ISSUED",
  },
];

// ── Comparison Table Data ────────────────────────────────
const COMPARE_ROWS = [
  { feature: "30+ FMCSA compliance forms & templates", diy: true, guided: true },
  { feature: "90-day implementation map", diy: true, guided: true },
  { feature: "6-domain compliance architecture", diy: true, guided: true },
  { feature: "10-module curriculum (72 lessons, 17 hrs)", diy: false, guided: true },
  { feature: "Administrative Signal tracking", diy: false, guided: true },
  { feature: "Implementation Sequence (10 tasks, by week)", diy: false, guided: true },
  { feature: "Operator Portal access", diy: false, guided: true },
  { feature: "5 coach milestone verification checkpoints", diy: false, guided: true },
  { feature: "Pre-audit simulation (Week 11)", diy: false, guided: true },
  { feature: "Verified Registry ID (LP-VRF)", diy: false, guided: true },
  { feature: "Direct access to Station Custodian", diy: false, guided: true },
];

// ── Animated Stat ─────────────────────────────────────────
function HudStat({ num, label, suffix = "" }) {
  // parse numeric part
  const numeric = parseInt(String(num).replace(/\D/g, ""), 10) || 0;
  const [count, ref] = useCountUp(numeric, 1000);
  const display = String(num).includes(" ") ? `${count} ${String(num).split(" ")[1]}` : `${count}${suffix}`;
  return (
    <div ref={ref} style={{ background: card, padding: "1.25rem 2rem", flex: "1 1 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* scan line */}
      <div style={{ position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.06), transparent)", animation: "hud-scan 3s ease-in-out infinite", animationDelay: `${Math.random() * 2}s` }} />
      <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.75rem", color: gold, marginBottom: "0.25rem", lineHeight: 1 }}>{display}</p>
      <p style={{ fontFamily: mono, fontSize: "0.8125rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>{label}</p>
    </div>
  );
}

const STATS = [
  { num: "10",   label: "Modules" },
  { num: "72",   label: "Lessons" },
  { num: "17 hrs", label: "Total runtime" },
  { num: "4",    label: "Pillars installed" },
  { num: "5",    label: "Coach verifications" },
];

const GLOBAL_STYLES = `
  @keyframes hud-scan {
    0%   { left: -60%; }
    50%  { left: 110%; }
    100% { left: 110%; }
  }
  @keyframes wire-draw {
    from { stroke-dashoffset: 1000; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes lp-sweep {
    0%   { transform: translateX(-100%); opacity: 0.5; }
    60%  { opacity: 0.5; }
    100% { transform: translateX(300%); opacity: 0; }
  }
  .lp-scan-btn { position: relative; overflow: hidden; }
  .lp-scan-btn::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 35%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transform: translateX(-100%);
    transition: none;
  }
  .lp-scan-btn:hover::after {
    animation: lp-sweep 0.55s ease-out forwards;
  }
  .module-row { transition: border-left-color 0.25s, background 0.2s; }
  .module-row:hover { background: rgba(197,160,89,0.04) !important; border-left: 2px solid rgba(197,160,89,0.35) !important; }
  .milestone-row { transition: background 0.2s; }
  .milestone-row:hover { background: rgba(197,160,89,0.03) !important; }
`;

// ── Blueprint Wire (vertical connector alongside modules list) ────────────────
function BlueprintWire({ height = 600 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <svg ref={ref} width="32" height={height} viewBox={`0 0 32 ${height}`} style={{ position: "absolute", left: -20, top: 0, opacity: 0.45, pointerEvents: "none", flexShrink: 0 }}>
      <line x1="16" y1="0" x2="16" y2={height} stroke="rgba(197,160,89,0.25)" strokeWidth="1" strokeDasharray="4 6" />
      {Array.from({ length: Math.floor(height / 60) }).map((_, i) => (
        <circle key={i} cx="16" cy={i * 60 + 30} r="3"
          fill="none" stroke={visible ? "rgba(197,160,89,0.55)" : "transparent"}
          strokeWidth="1"
          style={{ transition: `stroke 0.4s ease ${i * 0.07}s`, fill: visible ? "rgba(197,160,89,0.12)" : "transparent" }}
        />
      ))}
    </svg>
  );
}



function Check({ yes }) {
  if (yes) return <span style={{ color: gold, fontWeight: 700, fontSize: "1rem" }}>✓</span>;
  return <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1rem" }}>—</span>;
}

export default function LaunchPathStandardPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: dark, minHeight: "100vh", color: "#FFFFFF", fontFamily: body }}>
      <style>{GLOBAL_STYLES + `
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.35} }
        .std-hero-grid { display: grid; grid-template-columns: 1fr 360px; gap: 4rem; align-items: center; }
        .std-faq-row { border-bottom: 1px solid rgba(255,255,255,.07); }
        .std-faq-btn { width:100%; background:none; border:none; color:#fff; text-align:left; padding:1.25rem 0; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:1rem; font-family:'Inter',sans-serif; font-size:.975rem; font-weight:600; }
        @media(max-width:760px){
          .std-hero-grid { grid-template-columns: 1fr !important; }
          .qualifier-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: navy, borderBottom: `3px solid ${gold}`, padding: "88px 24px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(${gold} 1px,transparent 1px),linear-gradient(90deg,${gold} 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "2rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: gold, boxShadow: `0 0 8px ${gold}`, display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: mono, fontSize: ".714rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: goldDim }}>LP-STD-001 &nbsp;|&nbsp; LAUNCHPATH OPERATING STANDARD &nbsp;|&nbsp; COHORT ENROLLMENT</span>
          </div>

          <div className="std-hero-grid">
            <div>
              <h1 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(2.25rem,5vw,3.75rem)", color: "#FFF", lineHeight: 1.05, letterSpacing: "-.02em", marginBottom: "1.25rem" }}>
                This is not a course.<br />
                <span style={{ color: gold }}>It is a compliance operating system.</span>
              </h1>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.7)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 540 }}>
                A guided 90-day implementation program. Five verification checkpoints where a Station Custodian reviews your actual compliance files against FMCSA audit standards — not your intent, not your plan. Your documents.
                <br /><br />
                A Verified Registry ID issued when all six domains pass final review.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link to="/admission" data-testid="hero-request-admission-btn" className="lp-scan-btn" style={{ display: "inline-block", background: gold, color: navy, fontFamily: body, fontWeight: 700, fontSize: ".975rem", letterSpacing: ".08em", textTransform: "uppercase", padding: "1.125rem 2.75rem", textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#D4B87A"}
                  onMouseLeave={e => e.currentTarget.style.background = gold}>
                  Request Admission →
                </Link>
                <span style={{ fontFamily: mono, fontSize: ".714rem", color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase" }}>No payment at this step</span>
              </div>
            </div>

            {/* Right panel */}
            <div style={{ background: "rgba(0,0,0,.3)", border: `1px solid rgba(197,160,89,.2)`, borderTop: `2px solid ${gold}`, padding: "1.75rem", boxShadow: "inset 0 2px 12px rgba(0,0,0,.4)" }}>
              <p style={{ fontFamily: mono, fontSize: ".714rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: goldDim, marginBottom: "1.25rem" }}>INVESTMENT</p>
              <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "3.5rem", color: gold, lineHeight: 1, marginBottom: ".25rem", letterSpacing: "-.02em" }}>$2,500</p>
              <p style={{ fontFamily: mono, fontSize: ".625rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: ".25rem" }}>FIRST COHORT · 10 CARRIERS MAX</p>
              <p style={{ fontFamily: body, fontSize: ".762rem", color: "rgba(255,255,255,.35)", fontStyle: "italic", marginBottom: "1.5rem" }}>Payment plans available — ask during admission review.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", marginBottom: "1.5rem" }}>
                {["90-day guided implementation", "10 modules · 72 lessons · 17 hrs", "5 coach verification checkpoints", "Pre-audit simulation — Week 11", "Verified Registry ID (LP-VRF)", "All 5 document system packets", "Operator Portal access"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: ".625rem", alignItems: "center" }}>
                    <span style={{ color: gold, fontWeight: 700, fontSize: ".7rem", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: ".857rem", color: "rgba(255,255,255,.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <p style={{ fontFamily: mono, fontSize: "0.8125rem", color: "rgba(255,255,255,.62)", lineHeight: 1.6, margin: 0 }}>
                  Bundle purchasers ($499) may apply toward Standard enrollment within 90 days of purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HUD STATS ─────────────────────────────────────── */}
      <section style={{ background: dark, padding: "0", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "2px", background: "rgba(255,255,255,.06)", flexWrap: "wrap" }}>
            {STATS.map((s) => <HudStat key={s.label} num={s.num} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* ── SECTION 1: What the Standard Is ─────────────── */}
      <section style={{ background: dark, padding: "72px 24px 72px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: goldDim, marginBottom: "2rem" }}>
            POSITIONING — LP-STD-001
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            What separates the Standard from everything else
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.5rem" }}>
            The LaunchPath Standard is a guided 90-day implementation program for new motor carriers. It installs the full compliance architecture — documentation systems, operational policies, and verified checkpoints — using the AUTO Method.
          </p>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, maxWidth: 680, marginBottom: "2rem" }}>
            The difference between a $499 document system and a $2,500 guided standard is not the documents. The documents are the same. The difference is five human verification checkpoints where a Station Custodian reviews your actual compliance files against FMCSA audit standards — and flags gaps before an investigator does.
            <br /><br />
            An investigator who finds the gap charges you $10,000–$25,000 to correct it under scrutiny. The Station Custodian finds it first.
          </p>
          <div style={{ borderLeft: `3px solid rgba(197,160,89,0.35)`, paddingLeft: "1.25rem" }}>
            <p style={{ fontSize: "0.975rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.75, fontStyle: "italic" }}>
              "The Standard installs the Four Pillars of the AUTO Method — Documentary, Operational, Insurance, and Financial — across six compliance domains, over 90 days, with the Station Custodian verifying each milestone."
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: What Gets Installed ──────────────── */}
      <section style={{ background: "#001030", padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: goldDim, marginBottom: "0.75rem" }}>
            CURRICULUM
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            What Gets Installed
          </h2>

          <div style={{ position: "relative", paddingLeft: 16 }}>
            <BlueprintWire height={MODULES.length * 72} />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {MODULES.map((mod) => {
                const badge = TYPE_BADGES[mod.type];
                return (
                  <div
                    key={mod.code}
                    className="module-row"
                    data-testid={`module-row-${mod.code.toLowerCase()}`}
                    style={{
                      background: card,
                      padding: "1.25rem 1.75rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1.5rem",
                      borderLeft: "2px solid transparent",
                    }}
                  >
                  <div style={{ flexShrink: 0, width: 48 }}>
                    <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", color: goldDim, textTransform: "uppercase", marginBottom: "0.2rem" }}>{mod.label}</p>
                    <p style={{ fontFamily: mono, fontSize: "0.857rem", fontWeight: 700, color: gold }}>{mod.code}</p>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                      <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF", margin: 0 }}>{mod.title}</p>
                      <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: badge.color, background: badge.bg, padding: "0.2rem 0.6rem" }}>
                        {badge.label}
                      </span>
                    </div>
                    {mod.plain && (
                      <p style={{ fontFamily: body, fontWeight: 600, fontSize: "0.875rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.6, margin: "0 0 0.3rem" }}>{mod.plain}</p>
                    )}
                    <p style={{ fontFamily: body, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>{mod.note}</p>
                    {mod.badge && (
                      <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4ade80", background: "rgba(74,222,128,0.08)", display: "inline-block", padding: "0.2rem 0.6rem", marginTop: "0.5rem" }}>
                        ★ {mod.badge}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: What Vince Does ───────────────────── */}
      <section style={{ background: "#000c1e", padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: goldDim, marginBottom: "0.75rem" }}>
            STATION CUSTODIAN — LP-VNL
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1rem" }}>
            The Five Verification Checkpoints
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 620, marginBottom: "3rem" }}>
            The difference between the $499 Document System and the $2,500 Guided Standard is these five structured reviews. Not coaching calls. Not check-ins. Documented compliance verification — your actual files reviewed against FMCSA audit criteria.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.num}
                className="milestone-row"
                data-testid={`milestone-${m.num}`}
                style={{ background: card, padding: "1.75rem 2rem", borderLeft: `3px solid ${i < 4 ? "rgba(197,160,89,0.35)" : gold}` }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ flexShrink: 0 }}>
                    <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em", textTransform: "uppercase", color: goldDim, marginBottom: "0.2rem" }}>{m.week}</p>
                    <div style={{ position: "relative", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="36" height="36" style={{ position: "absolute", top: 0, left: 0, opacity: 0.6 }}>
                        <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(197,160,89,0.15)" strokeWidth="1.5" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke={i === 4 ? gold : "rgba(197,160,89,0.45)"} strokeWidth="1.5"
                          strokeDasharray={`${(i + 1) / MILESTONES.length * 88} 88`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                          style={{ transition: "stroke-dasharray 1s ease 0.3s" }}
                        />
                      </svg>
                      <p style={{ fontFamily: mono, fontSize: "0.857rem", fontWeight: 700, color: gold, letterSpacing: "-0.02em", margin: 0, position: "relative", zIndex: 1 }}>{m.num}</p>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.15rem", color: "#FFFFFF", margin: 0 }}>{m.title}</h3>
                      {m.badge && (
                        <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "0.2rem 0.6rem" }}>{m.badge}</span>
                      )}
                    </div>
                    <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Who It's For ──────────────────────── */}
      <section style={{ background: "#001A33", padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 940, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: goldDim, marginBottom: "0.75rem" }}>
            LP-QFY-001 | OPERATOR QUALIFICATION FILTER
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            Who This Is For
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "rgba(255,255,255,0.05)" }} className="qualifier-grid">
            <div style={{ background: card, borderTop: `3px solid ${gold}`, padding: "2rem 2rem 2.5rem" }}>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: "1.5rem" }}>FOR YOU</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Your authority is active and the 90-day clock is running",
                  "You are committed to working through the full implementation sequence",
                  "You are willing to submit documentation for coach verification",
                  "You treat compliance as operational infrastructure, not administrative overhead",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.875rem" }}>
                    <span style={{ color: gold, flexShrink: 0, marginTop: "0.15rem", fontSize: "0.7rem" }}>→</span>
                    <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.80)", lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#0a0e18", borderTop: `3px solid rgba(248,113,113,0.4)`, padding: "2rem 2rem 2.5rem" }}>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(248,113,113,0.7)", marginBottom: "1.5rem" }}>NOT FOR YOU</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "You do not yet have operating authority and are not actively pursuing it",
                  "You are looking for templates, shortcuts, or passive reading material",
                  "You are unwilling to submit compliance documentation for review",
                  "You are already under a satisfactory rating and have no gap in your systems",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.875rem" }}>
                    <span style={{ color: "rgba(248,113,113,0.65)", flexShrink: 0, marginTop: "0.15rem", fontSize: "0.7rem" }}>✕</span>
                    <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: The Comparison ────────────────────── */}
      <section style={{ background: dark, padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: goldDim, marginBottom: "0.75rem" }}>
            OPTION COMPARISON
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            Bundle vs. Standard
          </h2>

          <div style={{ border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", background: "#0a1220" }}>
              <div style={{ padding: "1rem 1.5rem" }} />
              <div style={{ padding: "1rem 1rem", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.25rem" }}>DOCUMENT SYSTEM</p>
                <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.25rem", color: "rgba(255,255,255,0.75)" }}>$499</p>
              </div>
              <div style={{ padding: "1rem 1rem", textAlign: "center", borderLeft: `1px solid rgba(197,160,89,0.25)`, background: "rgba(197,160,89,0.05)" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: goldDim, marginBottom: "0.25rem" }}>GUIDED STANDARD</p>
                <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.25rem", color: gold }}>$2,500</p>
              </div>
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", background: i % 2 === 0 ? card : "#0a1220", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ padding: "0.875rem 1.5rem" }}>
                  <p style={{ fontSize: "var(--text-sm)", color: row.guided && !row.diy ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.60)", lineHeight: 1.4, margin: 0 }}>{row.feature}</p>
                </div>
                <div style={{ padding: "0.875rem 1rem", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check yes={row.diy} />
                </div>
                <div style={{ padding: "0.875rem 1rem", textAlign: "center", borderLeft: `1px solid rgba(197,160,89,0.12)`, background: "rgba(197,160,89,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check yes={row.guided} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FAQ ───────────────────────────────── */}
      <section style={{ background: "#001030", padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,.07)` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: ".714rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: goldDim, marginBottom: ".75rem" }}>QUESTIONS</p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem,3.5vw,2.5rem)", color: "#FFF", lineHeight: 1.1, marginBottom: "2.5rem" }}>Common Questions</h2>
          <div>
            {[
              { q: "What is the difference between the $499 bundle and the $2,500 Standard?", a: "The bundle gives you the documents. The Standard installs the system. The documents are identical. What you're paying for in the Standard is five structured verification checkpoints where the Station Custodian reviews your actual compliance files — not your plan to build them." },
              { q: "Is admission guaranteed after I request it?", a: "No. Every admission request is reviewed individually. Not every applicant is admitted. Admission is based on operational readiness, authority status, and REACH Assessment result. If your situation involves a conditional rating or pending authority action, note that in your request." },
              { q: "What happens if I don't complete the 90 days?", a: "Enrollment includes 90 days of implementation guidance. Carriers who fall behind can discuss options with the Station Custodian directly. The program is structured — not passive — so consistent participation is expected." },
              { q: "When does the program begin?", a: "After admission is confirmed and payment is received, you'll receive access to Ground 0 and Module 1 within 24 hours. The 90-day implementation clock starts at Module 1 activation." },
              { q: "Can bundle purchasers upgrade to the Standard?", a: "Yes. Bundle purchasers can apply the $499 toward Standard enrollment within 90 days of their bundle purchase. Contact us with your purchase confirmation for upgrade details." },
              { q: "Is the $2,500 a one-time payment?", a: "Yes. One payment secures your cohort seat and covers the full 90-day program, all five verification checkpoints, the Operator Portal, and the Verified Registry ID at completion. No recurring fees." },
            ].map((faq, i) => (
              <div key={i} className="std-faq-row">
                <button className="std-faq-btn" data-testid={`std-faq-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ color: openFaq === i ? gold : "rgba(255,255,255,.85)" }}>
                  <span>{faq.q}</span>
                  <span style={{ color: gold, fontSize: "1.25rem", flexShrink: 0, lineHeight: 1, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8, paddingBottom: "1.25rem", margin: 0 }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Investment + CTA ──────────────────── */}
      <section style={{ background: "#000810", padding: "96px 24px 104px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: goldDim, marginBottom: "1rem" }}>
            LP-STD-001 | COHORT ENROLLMENT
          </p>
          <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(3rem,7vw,5rem)", color: gold, lineHeight: 1, marginBottom: ".25rem", letterSpacing: "-.02em" }}>$2,500</p>
          <p style={{ fontFamily: mono, fontSize: ".714rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: "2rem" }}>First cohort pricing · 12 carriers maximum</p>

          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>
            Ready to request admission?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 480, margin: "0 auto 3rem" }}>
            Admission is reviewed individually. No payment is required at this step. Complete the request form and the Station Custodian will respond within 24–48 hours.
          </p>

          <Link
            to="/admission"
            data-testid="request-admission-cta"
            className="lp-scan-btn"
            style={{ display: "inline-block", background: gold, color: navy, fontFamily: body, fontWeight: 700, fontSize: "0.975rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "1.125rem 3rem", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = gold)}
          >
            Request Admission →
          </Link>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: "1.5rem" }}>
            No payment required at this step &nbsp;·&nbsp; Decision within 24–48 hours
          </p>

          {/* Downgrade note */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <p style={{ fontSize: ".875rem", color: "rgba(255,255,255,.4)", lineHeight: 1.7 }}>
              Not ready for the full Standard? The <Link to="/bundle" style={{ color: "rgba(212,144,10,.65)", textDecoration: "none" }}>$499 Document System Bundle</Link> gives you all five compliance packets — you install it yourself, without the verification layer.
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

