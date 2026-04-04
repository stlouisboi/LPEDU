import React from "react";

export default function RiskMap({ scores, animate }) {
  const rows = [
    { label: "Resources", val: scores.r, max: 9 },
    { label: "Experience", val: scores.e, max: 9 },
    { label: "Authority Readiness", val: scores.a, max: 9 },
    { label: "Commitment", val: scores.c, max: 9 },
    { label: "Operational Discipline", val: scores.h, max: 6 },
  ];

  return (
    <div data-testid="risk-map" style={{ marginBottom: "2.5rem" }}>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a",
        marginBottom: "1.25rem",
      }}>
        AUTHORITY RISK MAP
      </p>
      {rows.map((row) => {
        const pct = Math.round((row.val / row.max) * 100);
        const barColor = pct >= 78 ? "#d4900a" : pct >= 55 ? "#7A9BB5" : "#6B7A82";
        return (
          <div key={row.label} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)" }}>
                {row.label}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", fontWeight: 600, color: barColor }}>
                {row.val}/{row.max}
              </span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", height: 3 }}>
              <div style={{
                background: barColor,
                height: "100%",
                width: animate ? `${pct}%` : "0%",
                transition: animate ? "width 1s ease" : "none",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
