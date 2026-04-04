import React from "react";
import { CATEGORY_GAP_CONFIG } from "../../data/reachData";

function getGapStatus(score, max) {
  const pct = score / max;
  if (pct >= 0.78) return "pass";
  if (pct >= 0.44) return "warning";
  return "critical";
}

const STATUS_STYLE = {
  pass:     { color: "#22c55e", icon: "✓", border: "rgba(34,197,94,0.15)",    bg: "rgba(34,197,94,0.03)"    },
  warning:  { color: "#F59E0B", icon: "⚠", border: "rgba(245,158,11,0.3)",   bg: "rgba(245,158,11,0.04)"   },
  critical: { color: "#ef4444", icon: "✗", border: "rgba(239,68,68,0.3)",    bg: "rgba(239,68,68,0.04)"    },
};

export default function CategoryBreakdown({ scores }) {
  const mono = "'JetBrains Mono', 'IBM Plex Mono', monospace";
  const sans = "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif";
  return (
    <div data-testid="category-breakdown" style={{ marginBottom: "2.5rem" }}>
      <p style={{
        fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: "rgba(212,144,10,0.65)", marginBottom: "1.25rem",
      }}>
        CATEGORY BREAKDOWN
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {CATEGORY_GAP_CONFIG.map((cat) => {
          const score = scores[cat.key];
          const status = getGapStatus(score, cat.max);
          const s = STATUS_STYLE[status];
          return (
            <div
              key={cat.key}
              data-testid={`gap-card-${cat.key}`}
              style={{ background: s.bg, border: `1px solid ${s.border}`, padding: "0.875rem 1.25rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: status === "pass" ? "0.25rem" : "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ fontFamily: mono, fontSize: "var(--text-sm)", color: "#d4900a", fontWeight: 700 }}>
                    {cat.code}
                  </span>
                  <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    — {cat.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: mono, fontSize: "0.857rem", color: s.color, fontWeight: 700 }}>
                    {score}/{cat.max}
                  </span>
                  <span style={{ fontSize: "0.762rem", color: s.color, lineHeight: 1 }}>
                    {s.icon}
                  </span>
                </div>
              </div>
              <p style={{
                fontFamily: sans,
                fontSize: status === "pass" ? "0.868rem" : "0.924rem",
                color: status === "pass" ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.72)",
                lineHeight: 1.6, margin: 0,
                fontStyle: status === "pass" ? "italic" : "normal",
              }}>
                {cat.feedback[status]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
