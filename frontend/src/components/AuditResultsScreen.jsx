import React, { useState } from "react";
import { ArrowLeft, History, CheckCircle, AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { DOMAIN_ORDER, DOMAIN_LABELS, DOMAIN_CRITICAL, DOMAIN_COPY, COLOR_STYLES, formatDate, formatMonthLabel } from "./auditConfig";

function ColorBadge({ color, size = "sm" }) {
  const styles = {
    GREEN:  { bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.3)",  text: "rgba(34,197,94,0.9)"  },
    YELLOW: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", text: "rgba(251,191,36,0.9)" },
    RED:    { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  text: "rgba(239,68,68,0.9)"  },
  };
  const s = styles[color];
  if (!s) return <span style={{ fontFamily: "monospace", fontSize: "0.524rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}>—</span>;
  const fontSize = size === "lg" ? "0.714rem" : "0.524rem";
  return (
    <span style={{ fontFamily: "monospace", fontSize, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: s.text, background: s.bg, border: `1px solid ${s.border}`, padding: size === "lg" ? "3px 10px" : "2px 7px" }}>
      {color}
    </span>
  );
}

function ResultsDomainCard({ domain, domainResult, isCritical }) {
  const [open, setOpen] = useState(false);
  const dr = domainResult || {};
  const sty = COLOR_STYLES[dr.color] || COLOR_STYLES[null];
  const bodyText = dr.color && DOMAIN_COPY[domain]?.[dr.color];

  return (
    <div
      data-testid={`results-domain-card-${domain}`}
      style={{ background: sty.bg, border: `1px solid ${sty.border}`, borderLeft: `3px solid ${sty.leftBorder}`, marginBottom: "2px" }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0.875rem 1.25rem", gap: "0.75rem", textAlign: "left" }}
        aria-expanded={open}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              {DOMAIN_LABELS[domain]}
            </p>
            {isCritical && (
              <span style={{ fontFamily: "monospace", fontSize: "0.44rem", letterSpacing: "0.12em", color: "rgba(239,68,68,0.65)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "1px 4px", textTransform: "uppercase" }}>CRITICAL</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <ColorBadge color={dr.color} />
          <span style={{ fontFamily: "monospace", fontSize: "0.524rem", color: sty.labelColor, letterSpacing: "0.1em" }}>
            {dr.scorePercent != null ? `${dr.scorePercent}%` : "—"}
          </span>
          <div style={{ display: "flex", gap: "0.375rem" }}>
            {[
              { label: "Y", count: dr.yesCount, color: "rgba(34,197,94,0.65)" },
              { label: "N", count: dr.noCount, color: "rgba(239,68,68,0.65)" },
              { label: "?", count: dr.notSureCount, color: "rgba(251,191,36,0.65)" },
            ].map(({ label, count, color }) => count > 0 && (
              <span key={label} style={{ fontFamily: "monospace", fontSize: "0.476rem", color, letterSpacing: "0.08em" }}>{label}:{count}</span>
            ))}
          </div>
          {open ? <ChevronUp size={12} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={12} color="rgba(255,255,255,0.3)" />}
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {bodyText && (
            <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.72, margin: "0.875rem 0 0" }}>
              {bodyText}
            </p>
          )}
          {(dr.notSureVerifyLines || []).length > 0 && (
            <div style={{ marginTop: "0.875rem" }}>
              <p style={{ fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,191,36,0.55)", margin: "0 0 0.5rem" }}>VERIFY THIS:</p>
              {(dr.notSureVerifyLines || []).map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", background: "rgba(251,191,36,0.04)", border: "1px solid rgba(251,191,36,0.12)", borderLeft: "2px solid rgba(251,191,36,0.35)", padding: "0.5rem 0.75rem", marginBottom: "3px" }}>
                  <AlertCircle size={12} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.81rem", color: "rgba(252,211,77,0.85)", lineHeight: 1.6, margin: 0 }}>{line}</p>
                </div>
              ))}
            </div>
          )}
          {dr.criticalFailure && (
            <div style={{ marginTop: "0.875rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <AlertTriangle size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.81rem", color: "rgba(239,68,68,0.8)", lineHeight: 1.6, margin: 0 }}>
                Critical item identified: {(dr.criticalFailures || []).join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AuditResultsScreen({ result, onBack, onViewHistory }) {
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const overall = result.overallResult || {};
  const overallColor = overall.color;
  const criticalOverride = overall.criticalOverride;
  const monthLabel = formatMonthLabel(result.checkMonth);
  const submittedLabel = formatDate(result.submittedAt);
  const sty = COLOR_STYLES[overallColor] || COLOR_STYLES[null];

  const drMap = {};
  (result.domainResults || []).forEach(dr => { drMap[dr.domain] = dr; });

  const overallMessages = {
    GREEN: "All six compliance domains are in a defensible position this month. Confirm each domain remains current.",
    YELLOW: "One or more domains need attention this month. Review the items flagged below and take action within 30 days.",
    RED: "Immediate action required. One or more domains are out of compliance. Do not delay.",
  };

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result.summaryJson || result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <section data-testid="audit-results-screen" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.25rem" }}>
            AUDIT READINESS — RESULTS
          </p>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            {monthLabel} · Submitted {submittedLabel}
          </p>
        </div>
        {onViewHistory && (
          <button
            data-testid="view-history-from-results-btn"
            onClick={onViewHistory}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.4rem 0.75rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            <History size={11} /> View History
          </button>
        )}
      </div>

      {/* Overall status */}
      <div style={{ background: sty.bg, border: `1px solid ${sty.border}`, borderLeft: `3px solid ${sty.leftBorder}`, padding: "1.25rem 1.5rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: 0 }}>OVERALL STATUS</p>
          <ColorBadge color={overallColor} size="lg" />
          {overall.scorePercent != null && !criticalOverride && (
            <span style={{ fontFamily: "monospace", fontSize: "0.619rem", color: sty.labelColor }}>{overall.scorePercent}%</span>
          )}
        </div>
        <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: 0 }}>
          {overallMessages[overallColor] || "Review your domain results below."}
        </p>
      </div>

      {/* Critical override banner */}
      {criticalOverride && (
        <div data-testid="results-critical-override-banner" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderLeft: "3px solid #ef4444", padding: "0.875rem 1.25rem", marginBottom: "1.25rem", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
          <AlertTriangle size={14} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(239,68,68,0.9)", margin: 0 }}>
            {overall.criticalOverrideReason || "Critical failure overrides overall score."}
          </p>
        </div>
      )}

      {/* Domain cards */}
      <div data-testid="results-domain-cards" style={{ marginBottom: "1.5rem" }}>
        {DOMAIN_ORDER.map(dk => (
          <ResultsDomainCard
            key={dk}
            domain={dk}
            domainResult={drMap[dk] || null}
            isCritical={DOMAIN_CRITICAL[dk]}
          />
        ))}
      </div>

      {/* Notes */}
      {result.notes && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.6)", margin: "0 0 0.5rem" }}>MONTHLY NOTES</p>
          <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: 0 }}>{result.notes}</p>
        </div>
      )}

      {/* summaryJson panel */}
      <div style={{ marginBottom: "1.5rem" }}>
        <button
          data-testid="toggle-summary-json-btn"
          onClick={() => setShowJson(v => !v)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer" }}
        >
          {showJson ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          {showJson ? "Hide" : "View"} Summary JSON
        </button>
        {showJson && (
          <div style={{ marginTop: "0.5rem", position: "relative" }}>
            <button
              onClick={handleCopy}
              style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "rgba(197,160,89,0.12)", border: "1px solid rgba(197,160,89,0.2)", color: copied ? "rgba(34,197,94,0.85)" : "rgba(197,160,89,0.75)", fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 0.6rem", cursor: "pointer" }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <pre style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", padding: "1rem", overflowX: "auto", fontFamily: "monospace", fontSize: "0.714rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
              {JSON.stringify(result.summaryJson || {}, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Return to dashboard */}
      <button
        data-testid="return-to-dashboard-btn"
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#d4900a", color: "#000F1F", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.625rem 1.25rem" }}
      >
        <ArrowLeft size={13} /> Return to Dashboard
      </button>
    </section>
  );
}
