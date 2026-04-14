import React from "react";
import { ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DOMAIN_ORDER, DOMAIN_LABELS, COLOR_STYLES, formatDate, formatMonthLabel } from "./auditConfig";

const DOMAIN_COLORS = {
  driver_qualification: "#60a5fa",
  drug_alcohol:         "#34d399",
  hos_eld:             "#f59e0b",
  vehicle_maintenance: "#a78bfa",
  insurance:           "#f87171",
  financial:           "#94a3b8",
};

function ScoreTrendChart({ history }) {
  if (!history || history.length < 2) return null;

  const [activeDomains, setActiveDomains] = React.useState(
    () => new Set(["overall", ...DOMAIN_ORDER])
  );

  const toggle = (key) =>
    setActiveDomains((prev) => {
      if (prev.size === 1 && prev.has(key)) return prev; // prevent hiding all
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const data = [...history].reverse().map((check) => {
    const row = {
      month: formatMonthLabel(check.checkMonth).replace(/^\w+ /, "").slice(0, 6),
      overall: check.overallResult?.scorePercent ?? null,
    };
    (check.domainResults || []).forEach((dr) => {
      row[dr.domain] = dr.scorePercent ?? null;
    });
    return row;
  });

  return (
    <div data-testid="score-trend-chart" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(197,160,89,0.12)", padding: "1.25rem 1.25rem 0.5rem", marginBottom: "1.75rem" }}>
      <p style={{ fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)", marginBottom: "1rem" }}>
        COMPLIANCE SCORE TREND
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -28, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontFamily: "monospace", fontSize: 9, fill: "rgba(255,255,255,0.3)" }}
            tickLine={false} axisLine={false}
          />
          <YAxis
            domain={[0, 100]} tickCount={5}
            tick={{ fontFamily: "monospace", fontSize: 9, fill: "rgba(255,255,255,0.3)" }}
            tickLine={false} axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{ background: "#0a1220", border: "1px solid rgba(197,160,89,0.2)", fontFamily: "monospace", fontSize: 10, padding: "6px 10px" }}
            formatter={(val, key) => [`${val ?? "—"}%`, DOMAIN_LABELS[key] || "Overall"]}
            labelStyle={{ color: "rgba(197,160,89,0.8)", marginBottom: 4 }}
            cursor={{ stroke: "rgba(197,160,89,0.15)" }}
          />
          {/* Overall score — thick gold */}
          {activeDomains.has("overall") && (
            <Line type="monotone" dataKey="overall" stroke="#C8933F" strokeWidth={2.5} dot={{ r: 3, fill: "#C8933F", strokeWidth: 0 }} activeDot={{ r: 5 }} name="overall" connectNulls />
          )}
          {/* Domain scores — thin colored, shown only if toggled on */}
          {DOMAIN_ORDER.filter(dk => activeDomains.has(dk)).map((dk) => (
            <Line key={dk} type="monotone" dataKey={dk} stroke={DOMAIN_COLORS[dk]} strokeWidth={1} dot={false} name={dk} strokeOpacity={0.55} connectNulls />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {/* Clickable legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem", padding: "0.625rem 0 0.25rem" }}>
        <button
          onClick={() => toggle("overall")}
          style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", padding: 0, opacity: activeDomains.has("overall") ? 1 : 0.3, transition: "opacity 0.15s" }}
        >
          <div style={{ width: 18, height: 2.5, background: "#C8933F", borderRadius: 2 }} />
          <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.55)" }}>Overall</span>
        </button>
        {DOMAIN_ORDER.map((dk) => (
          <button
            key={dk}
            onClick={() => toggle(dk)}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", padding: 0, opacity: activeDomains.has(dk) ? 1 : 0.3, transition: "opacity 0.15s" }}
          >
            <div style={{ width: 14, height: 1.5, background: DOMAIN_COLORS[dk], borderRadius: 1 }} />
            <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.4)" }}>{DOMAIN_LABELS[dk]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

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

      {/* Score trend chart */}
      <ScoreTrendChart history={history} />

      {/* History list */}
      <div>
        {history.map((check, idx) => {
          const overall = check.overallResult || {};
          const drMap = {};
          (check.domainResults || []).forEach(dr => { drMap[dr.domain] = dr; });
          const submittedLabel = formatDate(check.submittedAt);
          const monthLabel = formatMonthLabel(check.checkMonth);
          const isFirst = idx === 0;
          const prev = history[idx + 1];
          const delta = (overall.scorePercent != null && prev?.overallResult?.scorePercent != null)
            ? overall.scorePercent - prev.overallResult.scorePercent
            : null;

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
                    {delta !== null && (
                      <span data-testid={`delta-badge-${check.checkId}`} style={{
                        fontFamily: "monospace", fontSize: "0.44rem", fontWeight: 700,
                        letterSpacing: "0.10em", textTransform: "uppercase",
                        color: delta > 0 ? "rgba(34,197,94,0.85)" : delta < 0 ? "rgba(239,68,68,0.80)" : "rgba(255,255,255,0.3)",
                        background: delta > 0 ? "rgba(34,197,94,0.06)" : delta < 0 ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${delta > 0 ? "rgba(34,197,94,0.20)" : delta < 0 ? "rgba(239,68,68,0.20)" : "rgba(255,255,255,0.10)"}`,
                        padding: "1px 5px",
                      }}>
                        {delta > 0 ? `+${delta}%` : `${delta}%`}
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
