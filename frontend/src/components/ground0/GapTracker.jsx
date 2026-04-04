import React from "react";
import { REACH_PILLARS, computeReachStatus } from "../../data/ground0Data";

export default function GapTracker({ assessmentAnswers }) {
  const status = computeReachStatus(assessmentAnswers);
  const gaps = REACH_PILLARS.filter(p => !status[p.key]).length;
  const hasAnyData = Object.keys(assessmentAnswers).length > 0;

  return (
    <div
      data-testid="gap-tracker"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(212,144,10,0.2)",
        borderLeft: "3px solid rgba(212,144,10,0.5)",
        padding: "1.5rem",
        marginBottom: "1.75rem",
      }}
    >
      <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        WHAT NEEDS TO CLOSE BEFORE ENTRY
      </p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {REACH_PILLARS.map((pillar, i) => {
          const passed = status[pillar.key];
          return (
            <div
              key={pillar.key}
              data-testid={`gap-pillar-${pillar.key.toLowerCase()}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "0.875rem 0",
                borderBottom: i < REACH_PILLARS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                aria-label={passed ? "Passed" : "Gap identified"}
                style={{ flexShrink: 0, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.1rem" }}
              >
                {passed ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#d4900a" strokeWidth="1.5"/>
                    <path d="M5 8l2 2 4-4" stroke="#d4900a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.5"/>
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "0.762rem", color: passed ? "rgba(255,255,255,0.75)" : "#FFFFFF", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
                  {pillar.label}
                </p>
                <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.857rem", color: passed ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  {passed ? pillar.passDesc : pillar.failDesc}
                </p>
                {!passed && hasAnyData && (
                  <a
                    href={pillar.failHref}
                    style={{ display: "inline-block", fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontWeight: 600, fontSize: "0.857rem", color: "#d4900a", marginTop: "0.4rem", textDecoration: "none", transition: "opacity 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                  >
                    {pillar.failLink}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "0.924rem", color: "#FFFFFF", marginBottom: "0.375rem" }}>
          {gaps} OF 5 {gaps === 1 ? "GAP" : "GAPS"} REMAINING
        </p>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
          Close these gaps, then retake Ground 0 to confirm readiness for the next cohort.
        </p>
      </div>
    </div>
  );
}
