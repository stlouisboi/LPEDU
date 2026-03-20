import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import AuthorityClockSection from "../components/AuthorityClockSection";

/* ── Data ────────────────────────────────────────────────────────── */

const FAILURE_BULLETS = [
  "Pre-authority systems are never installed",
  "Driver files are incomplete",
  "Hours-of-service patterns aren't tracked",
  "Vehicle maintenance records lag behind actual operations",
];

const PILLARS = [
  {
    code: "LP-SYS-01",
    name: "Authority Protection",
    what: "Federal filing continuity, authority maintenance, and structured audit-readiness controls.",
    ifAbsent: "A single documentation gap — one missing DQ file, one lapsed medical certificate — can trigger a conditional rating that freezes operations within 30 days.",
    installs: [
      "FMCSA filing verification protocol",
      "Authority status monitoring system",
      "Audit-readiness documentation structure",
    ],
  },
  {
    code: "LP-SYS-02",
    name: "Insurance Continuity",
    what: "BMC-91 filing integrity, continuous coverage verification, and policy gap prevention.",
    ifAbsent: "Insurance non-renewal after an audit finding is the most common cause of authority revocation. Most carriers don't lose authority directly — they lose insurance, and authority follows.",
    installs: [
      "Coverage verification schedule",
      "Policy gap prevention checklist",
      "Insurer communication protocol",
    ],
  },
  {
    code: "LP-SYS-03",
    name: "Compliance Backbone",
    what: "Hours-of-service records, drug and alcohol program enrollment, driver qualification file management, and vehicle inspection documentation.",
    ifAbsent: "Investigators don't audit one area. They pull records across all four. A clean HOS file means nothing if your D&A program is incomplete. Failure in one area exposes all the others.",
    installs: [
      "Driver Qualification File system (complete)",
      "Drug & Alcohol program enrollment + Clearinghouse protocol",
      "HOS/ELD compliance documentation",
      "Vehicle inspection and maintenance records",
    ],
  },
  {
    code: "LP-SYS-04",
    name: "Cash-Flow Oxygen",
    what: "Rate floor discipline, cost-per-mile control, and financial runway protection.",
    ifAbsent: "Carriers who cannot maintain cash-flow discipline become non-compliant within 60 days — not from negligence, but from financial pressure that forces operational shortcuts.",
    installs: [
      "Cost-per-mile control system",
      "Rate floor calculator",
      "90-day cash runway tracker",
    ],
  },
];

const AUTO_ROWS = [
  { vector: "AROUND",  guard: "Insurance Guard",          cfr: "49 CFR 387",       stops: "Coverage lapses, policy gaps, BMC-91 filing failures" },
  { vector: "UNDER",   guard: "Driver Guard + D&A Guard", cfr: "49 CFR 391 / 382", stops: "DQ file gaps, Clearinghouse violations, unqualified drivers" },
  { vector: "THROUGH", guard: "Log Guard",                cfr: "49 CFR 395",       stops: "HOS violations, ELD compliance failures, falsified records" },
  { vector: "OVER",    guard: "Authority Guard",          cfr: "49 CFR 365",       stops: "Operating authority suspension, revocation exposure" },
];

const INSTALL_PHASES = [
  { code: "01", name: "Authority Stabilization",    weeks: "Weeks 0–2",   desc: "Establish operating authority status, verify insurance filings, and document baseline compliance position." },
  { code: "02", name: "Compliance Infrastructure",  weeks: "Weeks 3–6",   desc: "Install Driver Qualification Files, Drug & Alcohol program enrollment, and vehicle maintenance documentation systems." },
  { code: "03", name: "Operational Oversight",      weeks: "Weeks 7–10",  desc: "Activate ELD monitoring, HOS compliance tracking, and inspection documentation protocols." },
  { code: "04", name: "Audit Readiness",            weeks: "Weeks 11–12", desc: "Complete final system verification, compile audit documentation packet, and confirm readiness status." },
];

const FOR_ITEMS = [
  "New motor carriers within their first 12 months of authority",
  "Owner-operators transitioning from driver to carrier",
  "Carriers preparing for the FMCSA New Entrant Safety Audit",
  "Operators seeking structured operational systems (that will hold up)",
];

const NOT_FOR_ITEMS = [
  "Carriers looking for paperwork shortcuts",
  "Companies seeking done-for-you compliance",
  "Operations already in active audit failure",
  "Operators seeking the fastest path rather than the correct one",
];

/* ── Shared style tokens ─────────────────────────────────────────── */
const BG        = "#0d1c30";
const BG2       = "#091220";
const BG_CARD   = "#0a1828";
const GOLD      = "#d4900a";
const BORDER    = "rgba(255,255,255,0.08)";
const MONO      = "'Inter', sans-serif";
const COND      = "'Playfair Display', serif";
const SANS      = "'Inter', sans-serif";

const sectionLabel = {
  fontFamily: MONO,
  fontSize: "0.714rem",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(212,144,10,0.70)",
  marginBottom: "2rem",
};

const sectionWrap = {
  padding: "80px 24px",
  borderBottom: `1px solid ${BORDER}`,
};

const bodyText = {
  fontFamily: SANS,
  fontSize: "1rem",
  color: "rgba(255,255,255,0.70)",
  lineHeight: 1.82,
};

const linkStyle = {
  fontFamily: SANS,
  fontSize: "var(--text-sm)",
  fontWeight: 600,
  color: "rgba(212,144,10,0.82)",
  textDecoration: "none",
  borderBottom: "1px solid rgba(212,144,10,0.28)",
  paddingBottom: "2px",
};

/* ── Component ──────────────────────────────────────────────────── */
export default function StandardPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#FFF", fontFamily: SANS }}>
      <Navbar />

      {/* ══ 1. HERO ════════════════════════════════════════════════ */}
      <div style={{ background: BG2, borderBottom: `1px solid rgba(212,144,10,0.20)`, padding: "100px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ ...sectionLabel, marginBottom: "1.5rem" }}>LAUNCHPATH — OPERATING STANDARD</p>
          <h1 style={{
            fontFamily: COND, fontWeight: 700,
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            letterSpacing: "-0.025em", color: "#FFF",
            lineHeight: 1.05, marginBottom: "1.75rem", maxWidth: 700,
          }}>
            The system FMCSA expects<br />
            <span style={{ color: GOLD }}>new carriers to already have.</span>
          </h1>
          <p style={{ ...bodyText, fontSize: "1.1rem", maxWidth: 620, marginBottom: "1.5rem" }}>
            The LaunchPath Operating Standard defines the minimum infrastructure a motor carrier must install to survive the New Entrant period — before the audit notice arrives.
          </p>
          <div style={{ borderLeft: `2px solid rgba(212,144,10,0.40)`, paddingLeft: "1.5rem" }}>
            <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.1rem", color: GOLD, marginBottom: "0.3rem" }}>
              Accuracy Over Hype.
            </p>
            <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.1rem", color: "rgba(212,144,10,0.85)" }}>
              Systems Over Shortcuts.
            </p>
          </div>
        </div>
      </div>

      {/* ══ 2. WHY IT EXISTS ═══════════════════════════════════════ */}
      <div style={{ ...sectionWrap }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={sectionLabel}>SECTION 01 — WHY THIS STANDARD EXISTS</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "#FFF", marginBottom: "2rem", maxWidth: 600 }}>
            Most new trucking companies do not fail because drivers lack skill.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
            {FAILURE_BULLETS.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: MONO, fontSize: "0.857rem", color: GOLD, fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>→</span>
                <p style={{ ...bodyText, margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
          <p style={{ ...bodyText, fontStyle: "italic", color: "rgba(255,255,255,0.55)", maxWidth: 560 }}>
            This standard was built to install what most new carriers never get handed.
          </p>
        </div>
      </div>

      {/* ══ 3. FOUR PILLARS ════════════════════════════════════════ */}
      <div style={{ background: BG2, ...sectionWrap }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <p style={sectionLabel}>SECTION 02 — THE FOUR PILLARS</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "1rem" }}>
            What the Standard Protects
          </h2>
          <p style={{ ...bodyText, maxWidth: 620, marginBottom: "3rem" }}>
            The LaunchPath Operating Standard is organized around four operating pillars. Each pillar represents a domain of the carrier operation that must be actively protected.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }} className="pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.code} style={{ background: BG_CARD, borderTop: `2px solid rgba(212,144,10,0.35)`, padding: "2rem 1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                  <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.4rem", color: "#FFF", letterSpacing: "-0.01em" }}>{p.name}</p>
                  <span style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(212,144,10,0.50)", letterSpacing: "0.12em" }}>{p.code}</span>
                </div>
                <p style={{ ...bodyText, fontSize: "var(--text-sm)", marginBottom: "1.25rem" }}>{p.what}</p>

                <div style={{ borderLeft: `2px solid rgba(200,60,60,0.45)`, paddingLeft: "1rem", marginBottom: "1.25rem" }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,60,60,0.65)", marginBottom: "0.4rem" }}>If absent</p>
                  <p style={{ ...bodyText, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.58)", margin: 0 }}>{p.ifAbsent}</p>
                </div>

                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.6rem" }}>What gets installed</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {p.installs.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                        <span style={{ fontFamily: MONO, fontSize: "0.714rem", color: GOLD, flexShrink: 0, lineHeight: 1.6, fontWeight: 700 }}>→</span>
                        <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. AUTO METHOD + GUARDS ════════════════════════════════ */}
      <div style={{ ...sectionWrap }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={sectionLabel}>SECTION 03 — THE AUTO GUARDING MODEL</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#FFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 560 }}>
            Operational failures rarely occur because a single rule was broken.
          </h2>
          <p style={{ ...bodyText, maxWidth: 640, marginBottom: "3rem" }}>
            They occur because the violation crosses around, under, through, or over the controls that were supposed to stop it. The LaunchPath Standard installs operational guards designed to prevent risk from reaching the authority from any direction.
          </p>

          {/* AUTO Table */}
          <div style={{ border: `1px solid ${BORDER}`, marginBottom: "1.5rem", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr", background: "rgba(212,144,10,0.08)", borderBottom: `1px solid ${BORDER}` }}>
              {["AUTO VECTOR", "GUARD", "CFR CITATION", "WHAT IT STOPS"].map((h) => (
                <div key={h} style={{ padding: "0.75rem 1rem", fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(212,144,10,0.65)" }}>{h}</div>
              ))}
            </div>
            {/* Rows */}
            {AUTO_ROWS.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr", borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ padding: "1rem", fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, color: GOLD, letterSpacing: "0.10em" }}>{row.vector}</div>
                <div style={{ padding: "1rem", fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.82)", borderLeft: `1px solid ${BORDER}` }}>{row.guard}</div>
                <div style={{ padding: "1rem", fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.50)", borderLeft: `1px solid ${BORDER}` }}>{row.cfr}</div>
                <div style={{ padding: "1rem", fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", borderLeft: `1px solid ${BORDER}` }}>{row.stops}</div>
              </div>
            ))}
            {/* Shop Guard — spans all vectors */}
            <div style={{ background: "rgba(212,144,10,0.06)", borderTop: `1px solid rgba(212,144,10,0.20)` }}>
              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr" }}>
                <div style={{ padding: "1rem", fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.70)", letterSpacing: "0.10em" }}>ALL<br />VECTORS</div>
                <div style={{ padding: "1rem", fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.88)", fontWeight: 600, borderLeft: `1px solid rgba(212,144,10,0.15)` }}>Shop Guard</div>
                <div style={{ padding: "1rem", fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.50)", borderLeft: `1px solid rgba(212,144,10,0.15)` }}>49 CFR 396</div>
                <div style={{ padding: "1rem", fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", borderLeft: `1px solid rgba(212,144,10,0.15)` }}>Maintenance failures, DVIR gaps — crosses all four vectors</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link to="/auto-method" style={linkStyle}
              onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.82)"; }}
            >
              View full AUTO Method breakdown →
            </Link>
            <Link to="/16-deadly-sins" style={linkStyle}
              onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.82)"; }}
            >
              See the 16 behaviors these guards block →
            </Link>
          </div>
        </div>
      </div>

      {/* ══ 5. 90-DAY INSTALLATION SEQUENCE ═══════════════════════ */}
      <div style={{ background: BG2, ...sectionWrap }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={sectionLabel}>SECTION 04 — THE 90-DAY INSTALLATION SEQUENCE</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "1rem" }}>
            The Standard installs through a structured 90-day sequence.
          </h2>
        </div>
      </div>

      {/* Authority Clock — visual timeline */}
      <AuthorityClockSection />

      {/* Installation phase cards */}
      <div style={{ background: BG2, borderBottom: `1px solid ${BORDER}`, padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }} className="phases-grid-std">
            {INSTALL_PHASES.map((p) => (
              <div key={p.code} data-testid={`install-phase-${p.code}`} style={{ background: BG_CARD, borderTop: `2px solid rgba(212,144,10,0.30)`, padding: "1.75rem 1.5rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.45)", marginBottom: "0.5rem" }}>PHASE {p.code}</p>
                <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.4rem", color: GOLD, letterSpacing: "-0.01em", lineHeight: 1.15, marginBottom: "0.3rem" }}>{p.name}</p>
                <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: "1rem" }}>{p.weeks}</p>
                <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", lineHeight: 1.72, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ ...bodyText, fontStyle: "italic", color: "rgba(255,255,255,0.48)", marginBottom: "1.5rem" }}>
            This is the infrastructure FMCSA expects. This is what you install.
          </p>

          <Link to="/ground-0-briefing" style={linkStyle}
            onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.82)"; }}
          >
            View the full 90-Day Engagement →
          </Link>
        </div>
      </div>

      {/* ══ 6. FOR / NOT FOR ═══════════════════════════════════════ */}
      <div style={{ ...sectionWrap }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={sectionLabel}>SECTION 05 — WHO THIS STANDARD IS FOR</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="for-grid-std">

            {/* For */}
            <div style={{ borderLeft: `3px solid rgba(212,144,10,0.50)`, paddingLeft: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "1.5rem" }}>
                THIS STANDARD IS FOR:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {FOR_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.857rem", color: GOLD, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>→</span>
                    <p style={{ ...bodyText, fontSize: "0.938rem", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Not For */}
            <div style={{ borderLeft: `3px solid rgba(139,47,47,0.60)`, paddingLeft: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9b3535", marginBottom: "1.5rem" }}>
                THIS STANDARD IS NOT FOR:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {NOT_FOR_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.857rem", color: "#8b2f2f", fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>✗</span>
                    <p style={{ ...bodyText, fontSize: "0.938rem", color: "rgba(255,255,255,0.60)", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ 7. CLOSING CTA ═════════════════════════════════════════ */}
      <div style={{ background: BG2, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p style={{ ...sectionLabel, textAlign: "center" }}>LPOS V1.0 | GROUND 0 ENTRY</p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.02em", color: "#FFF", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            The Standard installs through a 90-day guided implementation.<br />
            <span style={{ color: GOLD }}>Access begins with Ground 0.</span>
          </h2>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <Link
              to="/ground-0-briefing"
              data-testid="standard-ground0-btn"
              style={{
                display: "inline-flex", alignItems: "center",
                background: GOLD, color: "#060d19",
                fontFamily: SANS, fontWeight: 700,
                fontSize: "var(--text-sm)", letterSpacing: "0.10em",
                textTransform: "uppercase", padding: "1.1rem 2.25rem",
                textDecoration: "none", transition: "background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
              onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
            >
              INITIATE GROUND 0 →
            </Link>
            <Link
              to="/ground-0-briefing"
              data-testid="standard-engagement-btn"
              style={{
                display: "inline-flex", alignItems: "center",
                background: "transparent", color: GOLD,
                fontFamily: SANS, fontWeight: 700,
                fontSize: "var(--text-sm)", letterSpacing: "0.10em",
                textTransform: "uppercase", padding: "1.1rem 2.25rem",
                textDecoration: "none",
                border: "1px solid rgba(212,144,10,0.50)",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.50)"; }}
            >
              VIEW THE 90-DAY ENGAGEMENT →
            </Link>
          </div>

          <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
            Ground 0 is free. It takes 4–6 minutes. No account required.<br />
            It tells you exactly where your operation stands — and what needs to be built first.
          </p>
        </div>
      </div>

      {/* ══ Responsive ═════════════════════════════════════════════ */}
      <style>{`
        @media (max-width: 720px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .for-grid-std { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .phases-grid-std { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .phases-grid-std { grid-template-columns: 1fr !important; }
        }
        .auto-table-row:hover { background: rgba(212,144,10,0.04); }
      `}</style>

      <FooterSection />
    </div>
  );
}
