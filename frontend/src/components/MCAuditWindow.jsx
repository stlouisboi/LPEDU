import { useState } from "react";
import { Link } from '../compat/Link';

/* ── Tokens ──────────────────────────────────────────────────────────────── */
const GOLD  = "#C5A059";
const NAVY  = "#001830";
const MONO  = "'JetBrains Mono','IBM Plex Mono',monospace";
const SANS  = "'Inter',sans-serif";
const COND  = "'Barlow Condensed','Newsreader',serif";

const PHASES = [
  { label: "INSTALLATION PHASE", days: [0, 182],   color: "#4ade80", risk: "LOW",      bg: "rgba(74,222,128,0.10)", border: "rgba(74,222,128,0.35)" },
  { label: "CRITICAL WINDOW",    days: [183, 365],  color: "#f59e0b", risk: "ELEVATED", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.35)" },
  { label: "PRE-AUDIT",          days: [366, 548],  color: "#ef4444", risk: "HIGH",     bg: "rgba(239,68,68,0.10)",  border: "rgba(239,68,68,0.35)"  },
  { label: "AUDIT ELIGIBLE",     days: [549, Infinity], color: "#dc2626", risk: "CRITICAL", bg: "rgba(220,38,38,0.12)", border: "rgba(220,38,38,0.45)" },
];

const RECS = [
  "You're in the installation phase. Start with your DQ files and authority documentation now — do not wait until month 6.",
  "You're in the critical window. Your compliance systems must be fully installed and self-audited before you hit month 12.",
  "You are in pre-audit territory. If your documentation is not audit-ready today, remediation costs will exceed $15,000.",
  "Your audit window has closed. An FMCSA safety audit can be triggered at any time. Treat every week as if the investigator is en route.",
];

function getPhaseIndex(elapsed) {
  return PHASES.findIndex(p => elapsed >= p.days[0] && elapsed <= p.days[1]);
}

export default function MCAuditWindow({ compact = false }) {
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);

  const compute = (val) => {
    setDate(val);
    if (!val) { setResult(null); return; }
    const granted = new Date(val);
    const today   = new Date();
    const elapsed = Math.max(0, Math.floor((today - granted) / 86400000));
    const windowDays = 548; // 18 months ≈ 548 days
    const remaining  = Math.max(0, windowDays - elapsed);
    const pct        = Math.min(1, elapsed / windowDays);
    const monthsElapsed = Math.min(18, Math.floor(elapsed / (windowDays / 18)));
    const phaseIdx   = getPhaseIndex(elapsed);
    setResult({ elapsed, remaining, pct, monthsElapsed, phaseIdx });
  };

  const phase = result ? PHASES[result.phaseIdx] : null;

  return (
    <div
      data-testid="mc-audit-window"
      style={{
        background: NAVY,
        border: `1px solid rgba(197,160,89,0.30)`,
        borderRadius: 8,
        padding: compact ? "1.5rem" : "2rem",
        boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.05)",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
        <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.55)", margin: 0 }}>
          LP-TOOL-WIN | NEW CARRIER AUDIT WINDOW CALCULATOR
        </p>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: "#4ade80", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", padding: "2px 7px", borderRadius: 2, flexShrink: 0, marginLeft: 8 }}>
          FREE
        </span>
      </div>

      <h3 style={{ fontFamily: COND, fontWeight: 800, fontSize: compact ? "1.25rem" : "1.5rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.375rem" }}>
        How Much of Your Audit Window Is Left?
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
        FMCSA targets new carriers for a safety audit within 18 months of authority grant. Enter your MC effective date.
      </p>

      {/* Date input */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: result ? "1.75rem" : 0, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.55)", marginBottom: 6 }}>
            MC/DOT AUTHORITY GRANT DATE
          </p>
          <input
            data-testid="audit-date-input"
            type="date"
            value={date}
            onChange={(e) => compute(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#001020", border: "1px solid rgba(197,160,89,0.30)",
              borderRadius: 0, color: "#fff", fontFamily: MONO, fontSize: "0.875rem",
              padding: "0.625rem 0.875rem", outline: "none", colorScheme: "dark",
            }}
          />
        </div>
      </div>

      {/* Results */}
      {result && phase && (
        <div>
          {/* 18-cell month grid */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>
              18-MONTH AUDIT WINDOW — {result.monthsElapsed} OF 18 MONTHS ELAPSED
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(18, 1fr)", gap: 3 }}>
              {Array.from({ length: 18 }, (_, i) => {
                const isFilled   = i < result.monthsElapsed;
                const isRem      = i >= result.monthsElapsed;
                // color remaining cells by which phase they fall in
                const cellDay    = Math.floor((i + 1) * (548 / 18));
                const cellPhase  = getPhaseIndex(cellDay);
                const remColor   = isRem ? PHASES[cellPhase].color + "33" : undefined;
                return (
                  <div
                    key={i}
                    style={{
                      height: 10, borderRadius: 1,
                      background: isFilled ? GOLD : remColor,
                      border: isFilled ? "none" : `1px solid ${PHASES[cellPhase].color}22`,
                      transition: "background 0.2s",
                    }}
                  />
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <p style={{ fontFamily: MONO, fontSize: 8, color: "rgba(255,255,255,0.20)", letterSpacing: "0.10em" }}>MONTH 1</p>
              <p style={{ fontFamily: MONO, fontSize: 8, color: "rgba(255,255,255,0.20)", letterSpacing: "0.10em" }}>MONTH 18</p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(197,160,89,0.15)", marginBottom: "1.25rem" }}>
            <div style={{ background: "#001020", padding: "1rem 1.25rem" }}>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", marginBottom: 4 }}>DAYS ELAPSED</p>
              <p style={{ fontFamily: COND, fontWeight: 800, fontSize: "1.75rem", color: "rgba(255,255,255,0.60)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {result.elapsed.toLocaleString()}
              </p>
            </div>
            <div style={{ background: "#001020", padding: "1rem 1.25rem" }}>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", marginBottom: 4 }}>
                {result.remaining > 0 ? "DAYS REMAINING" : "DAYS PAST WINDOW"}
              </p>
              <p style={{ fontFamily: COND, fontWeight: 800, fontSize: "1.75rem", color: result.remaining > 0 ? GOLD : "#ef4444", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {result.remaining > 0 ? result.remaining.toLocaleString() : (result.elapsed - 548).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Phase badge + recommendation */}
          <div style={{ background: phase.bg, border: `1px solid ${phase.border}`, borderRadius: 6, padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: phase.color }}>{phase.label}</span>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: phase.color, opacity: 0.7 }}>· RISK: {phase.risk}</span>
            </div>
            <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
              {RECS[result.phaseIdx]}
            </p>
          </div>

          {/* CTA — smart routing based on phase */}
          {(result.phaseIdx === 2 || result.phaseIdx === 3) ? (
            /* PRE-AUDIT or AUDIT ELIGIBLE — urgent path to /admission */
            <div>
              <Link
                to="/admission"
                data-testid="audit-window-cta"
                style={{
                  display: "block", textAlign: "center",
                  fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  background: "#ef4444", color: "#fff",
                  padding: "0.875rem", textDecoration: "none",
                  boxShadow: "inset 0 -3px 8px rgba(0,0,0,0.30)",
                  marginBottom: "0.5rem",
                }}
              >
                YOUR AUDIT WINDOW IS CLOSING — REQUEST ADMISSION →
              </Link>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", textAlign: "center", color: "rgba(239,68,68,0.55)", margin: 0, textTransform: "uppercase" }}>
                No payment at this step · Reviewed within 24 hrs
              </p>
            </div>
          ) : (
            /* INSTALLATION PHASE or CRITICAL WINDOW — standard path */
            <Link
              to="/compliance-library"
              data-testid="audit-window-cta"
              style={{
                display: "block", textAlign: "center",
                fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: GOLD, color: NAVY,
                padding: "0.875rem", textDecoration: "none",
                boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              INSTALL YOUR COMPLIANCE SYSTEM BEFORE TIME RUNS OUT →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
