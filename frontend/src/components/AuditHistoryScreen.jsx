import React from "react";
import { ArrowLeft } from "lucide-react";
import { DOMAIN_ORDER, DOMAIN_LABELS, COLOR_STYLES, formatDate, formatMonthLabel } from "./auditConfig";

function MiniColorDot({ color }) {
  const s = COLOR_STYLES[color] || COLOR_STYLES[null];
  return (
    <div
      title={`${color || "NOT STARTED"}`}
      style={{ width: 20, height: 20, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
    </div>
  );
}

function OverallBadge({ color }) {
  const styles = {
    GREEN:  { bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.3)",  text: "rgba(34,197,94,0.9)"  },
    YELLOW: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", text: "rgba(251,191,36,0.9)" },
    RED:    { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  text: "rgba(239,68,68,0.9)"  },
  };
  const s = styles[color];
  if (!s) return <span style={{ fontFamily: "monospace", fontSize: "0.524rem", color: "rgba(255,255,255,0.3)" }}>—</span>;
  return (
    <span style={{ fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: s.text, background: s.bg, border: `1px solid ${s.border}`, padding: "2px 8px" }}>
      {color}
    </span>
  );
}

export default function AuditHistoryScreen({ history, onBack, onViewResult }) {
  if (!history || history.length === 0) {
    return (
      <section data-testid="audit-history-screen" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: 0 }}>CHECK HISTORY</p>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <ArrowLeft size={11} /> Back
          </button>
        </div>
        <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.875rem", color: "rgba(255,255,255,0.35)" }}>No history yet.</p>
      </section>
    );
  }

  return (
    <section data-testid="audit-history-screen" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.25rem" }}>
            CHECK HISTORY
          </p>
          <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            {history.length} check{history.length !== 1 ? "s" : ""} on record
          </p>
        </div>
        <button
          data-testid="history-back-btn"
          onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.4rem 0.75rem", cursor: "pointer" }}
        >
          <ArrowLeft size={11} /> Back to Dashboard
        </button>
      </div>

      {/* History list */}
      <div>
        {history.map((check, idx) => {
          const overall = check.overallResult || {};
          const drMap = {};
          (check.domainResults || []).forEach(dr => { drMap[dr.domain] = dr; });
          const submittedLabel = formatDate(check.submittedAt);
          const monthLabel = formatMonthLabel(check.checkMonth);
          const isFirst = idx === 0;

          return (
            <div
              key={check.checkId}
              data-testid={`history-entry-${check.checkId}`}
              style={{ border: "1px solid rgba(255,255,255,0.08)", borderLeft: isFirst ? "3px solid rgba(197,160,89,0.4)" : "1px solid rgba(255,255,255,0.08)", marginBottom: "2px", padding: "1rem 1.25rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                    <p style={{ fontFamily: "monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.75)", margin: 0 }}>
                      {monthLabel}
                    </p>
                    {isFirst && (
                      <span style={{ fontFamily: "monospace", fontSize: "0.44rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)", background: "rgba(197,160,89,0.06)", border: "1px solid rgba(197,160,89,0.2)", padding: "1px 5px" }}>LATEST</span>
                    )}
                    {overall.criticalOverride && (
                      <span style={{ fontFamily: "monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(239,68,68,0.75)", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", padding: "1px 5px" }}>CRITICAL OVERRIDE</span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
                    <OverallBadge color={overall.color} />
                    {overall.scorePercent != null && (
                      <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                        {overall.scorePercent}%
                      </span>
                    )}
                    <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                      {submittedLabel}
                    </span>
                  </div>
                </div>

                {/* Domain mini dots */}
                <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", alignItems: "center" }}>
                  {DOMAIN_ORDER.map(dk => (
                    <MiniColorDot key={dk} color={drMap[dk]?.color || null} />
                  ))}
                </div>

                <button
                  data-testid={`view-result-${check.checkId}`}
                  onClick={() => onViewResult(check)}
                  style={{ background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.2)", color: "rgba(197,160,89,0.8)", fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.4rem 0.75rem", cursor: "pointer", flexShrink: 0 }}
                >
                  View Results
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
