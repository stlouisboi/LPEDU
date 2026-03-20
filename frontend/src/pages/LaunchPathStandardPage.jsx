import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const gold = "#C5A059";
const goldDim = "rgba(197,160,89,0.75)";
const navy = "#002244";
const dark = "#080f1e";
const card = "#0D1929";
const mono = "'Inter', sans-serif";
const condensed = "'Playfair Display', serif";
const body = "'Inter', sans-serif";

// ── Module Data ──────────────────────────────────────────
const MODULES = [
  { code: "G0", label: "GROUND 0", title: "Orientation Foundation", note: "Pre-Standard entry. Six modules covering the regulatory architecture, 90-day timeline, and risk doctrine.", type: "foundation" },
  { code: "M1", label: "MODULE 1", title: "Business & Authority Setup", note: "Entity structure, USDOT registration, operating authority, BOC-3, UCR, and MCS-150 compliance.", type: "core" },
  { code: "M2", label: "MODULE 2", title: "Driver Qualification System", note: "DQ file construction per 49 CFR §391 — employment application, MVR, medical certificate, CDL verification.", type: "core" },
  { code: "M3", label: "MODULE 3", title: "Drug & Alcohol Compliance", note: "FMCSA-compliant C/TPA enrollment, pre-employment testing protocol, written D&A policy per Part 382.", type: "core" },
  { code: "M4", label: "MODULE 4", title: "Hours of Service & Dispatch", note: "ELD configuration, Part 395 policy documentation, driver duty log review, and dispatch workflow.", type: "core" },
  { code: "M5", label: "MODULE 5", title: "Preventive Maintenance & Vehicle Files", note: "PM schedule construction per §396, DVIR systems, annual inspection records, and unit file architecture.", type: "core" },
  { code: "M6", label: "MODULE 6", title: "Insurance & Authority Continuity", note: "MCS-90 endorsement verification, Form H filing, L&I sync, and carrier monitoring protocol.", badge: "Verified Registry ID issued at completion", type: "core" },
  { code: "M7", label: "MODULE 7", title: "Post-Failure Recovery", note: "Conditional rating response protocol, 45-day correction window, and authority reinstatement procedures.", type: "recovery" },
  { code: "M8", label: "MODULE 8", title: "Load Profitability & Financial Structure", note: "CPM calculation, revenue vs. reserve separation, and operational cost modeling for sustainable dispatch.", type: "extension" },
  { code: "M9", label: "MODULE 9", title: "Broker Relationships & Freight Network", note: "Carrier packet construction, broker compliance standards, and load board positioning strategy.", type: "extension" },
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

function Check({ yes }) {
  if (yes) return <span style={{ color: gold, fontWeight: 700, fontSize: "1rem" }}>✓</span>;
  return <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1rem" }}>—</span>;
}

export default function LaunchPathStandardPage() {
  return (
    <div style={{ background: dark, minHeight: "100vh", color: "#FFFFFF", fontFamily: body }}>
      <Navbar />

      {/* ── SECTION 1: What the Standard Is ─────────────── */}
      <section style={{ background: dark, padding: "96px 24px 72px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: goldDim, marginBottom: "2rem" }}>
            LP-STD-001 | LAUNCHPATH OPERATING STANDARD
          </p>
          <h1 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(2.25rem, 5vw, 3.5rem)", color: "#FFFFFF", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            This is not a course.<br />
            <span style={{ color: gold }}>It is a compliance operating system.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, maxWidth: 680, marginBottom: "2rem" }}>
            The LaunchPath Standard is a guided 90-day implementation program for new motor carriers. It installs the full compliance architecture — documentation systems, operational policies, and verified checkpoints — using the AUTO Method.
          </p>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: "2px", background: "rgba(255,255,255,0.06)", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {[
              { num: "10", label: "Modules" },
              { num: "72", label: "Lessons" },
              { num: "17 hrs", label: "Total runtime" },
              { num: "4", label: "Pillars installed" },
              { num: "5", label: "Coach verifications" },
            ].map((s) => (
              <div key={s.label} style={{ background: card, padding: "1.25rem 2rem", flex: "1 1 120px", textAlign: "center" }}>
                <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.75rem", color: gold, marginBottom: "0.25rem", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ borderLeft: `3px solid rgba(197,160,89,0.35)`, paddingLeft: "1.25rem" }}>
            <p style={{ fontSize: "0.975rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.75, fontStyle: "italic" }}>
              The Standard installs the Four Pillars of the AUTO Method — Documentary, Operational, Insurance, and Financial — across six compliance domains, over 90 days, with the Station Custodian verifying each milestone.
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

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {MODULES.map((mod) => {
              const badge = TYPE_BADGES[mod.type];
              return (
                <div
                  key={mod.code}
                  data-testid={`module-row-${mod.code.toLowerCase()}`}
                  style={{
                    background: card,
                    padding: "1.25rem 1.75rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.5rem",
                  }}
                >
                  {/* Code */}
                  <div style={{ flexShrink: 0, width: 48 }}>
                    <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", color: goldDim, textTransform: "uppercase", marginBottom: "0.2rem" }}>{mod.label}</p>
                    <p style={{ fontFamily: mono, fontSize: "0.857rem", fontWeight: 700, color: gold }}>{mod.code}</p>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                      <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF", margin: 0 }}>{mod.title}</p>
                      <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: badge.color, background: badge.bg, padding: "0.2rem 0.6rem" }}>
                        {badge.label}
                      </span>
                    </div>
                    <p style={{ fontFamily: body, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.60)", lineHeight: 1.65, margin: 0 }}>{mod.note}</p>
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
      </section>

      {/* ── SECTION 3: What Vince Does ───────────────────── */}
      <section style={{ background: "#000c1e", padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: goldDim, marginBottom: "0.75rem" }}>
            STATION CUSTODIAN — LP-VNL
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1rem" }}>
            What Vince Does
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 620, marginBottom: "3rem" }}>
            The difference between the $497 Document System and the $2,500 Guided Standard is the five compliance verification checkpoints. These are not coaching calls. They are structured reviews of your actual documentation against FMCSA standards.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.num}
                data-testid={`milestone-${m.num}`}
                style={{ background: card, padding: "1.75rem 2rem", borderLeft: `3px solid ${i < 4 ? "rgba(197,160,89,0.35)" : gold}` }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ flexShrink: 0 }}>
                    <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em", textTransform: "uppercase", color: goldDim, marginBottom: "0.2rem" }}>{m.week}</p>
                    <p style={{ fontFamily: mono, fontSize: "1.1rem", fontWeight: 700, color: gold, letterSpacing: "-0.02em" }}>{m.num}</p>
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
            {/* FOR YOU */}
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

            {/* NOT FOR YOU */}
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

        <style>{`@media (max-width: 680px) { .qualifier-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── SECTION 5: The Comparison ────────────────────── */}
      <section style={{ background: dark, padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: goldDim, marginBottom: "0.75rem" }}>
            OPTION COMPARISON
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            The Comparison
          </h2>

          <div style={{ border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", background: "#0a1220" }}>
              <div style={{ padding: "1rem 1.5rem" }} />
              <div style={{ padding: "1rem 1rem", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.25rem" }}>DOCUMENT SYSTEM</p>
                <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.25rem", color: "rgba(255,255,255,0.75)" }}>$497</p>
              </div>
              <div style={{ padding: "1rem 1rem", textAlign: "center", borderLeft: `1px solid rgba(197,160,89,0.25)`, background: "rgba(197,160,89,0.05)" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: goldDim, marginBottom: "0.25rem" }}>GUIDED STANDARD</p>
                <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.25rem", color: gold }}>$2,500</p>
              </div>
            </div>

            {/* Feature rows */}
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 180px 180px",
                  background: i % 2 === 0 ? card : "#0a1220",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
              >
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

      {/* ── SECTION 6: Investment ────────────────────────── */}
      <section style={{ background: "#001030", padding: "72px 24px 80px", borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: goldDim, marginBottom: "0.75rem" }}>
            LP-STD-001 | INVESTMENT
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2rem" }}>
            The Investment
          </h2>

          <div style={{ background: card, borderTop: `3px solid ${gold}`, padding: "2.5rem 2.5rem 2rem" }}>
            <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: gold, lineHeight: 1, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>$2,500</p>
            <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "2rem" }}>
              First cohort pricing — 10 carriers maximum
            </p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.75rem" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Full 90-day implementation sequence with 5 coach verification checkpoints",
                  "10-module curriculum — 72 lessons, 17 hours of instruction",
                  "Administrative Signal dashboard with live compliance scoring",
                  "Operator Portal with Implementation Sequence task tracking",
                  "Verified Registry ID (LP-VRF) upon successful completion",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span style={{ color: gold, flexShrink: 0, marginTop: "0.15rem" }}>—</span>
                    <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: The Next Step ─────────────────────── */}
      <section style={{ background: "#000810", padding: "96px 24px 104px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: goldDim, marginBottom: "2rem" }}>
            LP-STD-001 | NEXT STEP
          </p>
          <h2 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>
            Ready to request admission?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 480, margin: "0 auto 3rem" }}>
            Admission is reviewed individually. No payment is required at this step. Complete the request form and the Station Custodian will respond within 24–48 hours.
          </p>

          <Link
            to="/admission"
            data-testid="request-admission-cta"
            style={{
              display: "inline-block",
              background: gold,
              color: navy,
              fontFamily: body,
              fontWeight: 700,
              fontSize: "0.975rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "1.125rem 3rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = gold)}
          >
            Request Admission →
          </Link>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: "1.5rem" }}>
            No payment required at this step &nbsp;·&nbsp; Decision within 24–48 hours
          </p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
