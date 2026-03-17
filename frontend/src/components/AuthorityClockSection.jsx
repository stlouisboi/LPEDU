import { useEffect, useRef, useState } from "react";

const TIMELINE = [
  {
    code: "DAY 1",
    label: "Authority Active",
    body: "Insurance filings, driver files, safety controls, and compliance records should already be operational. The compliance clock starts at activation, not at the first load.",
    accent: true,
  },
  {
    code: "DAYS 1–30",
    label: "Systems Installation",
    body: "The carrier's documentary structure, dispatch rhythm, and monitoring habits begin taking shape. Missing systems at this stage become future exposure.",
  },
  {
    code: "DAYS 30–60",
    label: "Operational Pattern Formation",
    body: "Logs, maintenance activity, dispatch behavior, and file upkeep begin establishing the operating patterns later reviewed under audit conditions.",
  },
  {
    code: "DAYS 60–90",
    label: "Audit Exposure Window",
    body: "If the core systems are not installed by this stage, audit preparation becomes reconstruction rather than verification.",
    warning: true,
  },
  {
    code: "MONTHS 9–18",
    label: "What Was Built Gets Tested",
    body: "The operational patterns created in the first months of authority become visible under scrutiny. Early discipline determines later defensibility.",
    consequence: true,
  },
];

export default function AuthorityClockSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      data-testid="authority-clock-section"
      ref={ref}
      style={{
        background: "#001A33",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "112px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* LP code label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.672rem",
          color: "rgba(197,160,89,0.85)",
          letterSpacing: "0.12em",
          marginBottom: "2rem",
        }}>
          LP-TIM-001 | AUTHORITY ACTIVATION TIMELINE
        </div>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.672rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#C5A059", marginBottom: "1rem",
          }}>
            The 90-Day Authority Clock
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
            maxWidth: 620,
          }}>
            When a motor carrier activates authority, the compliance timeline begins immediately.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.83)",
            lineHeight: 1.85,
            maxWidth: 580,
          }}>
            The first ninety days are not a grace period. They are the installation window. The files, monitoring rhythms, operating controls, and compliance patterns built here determine what investigators later find under scrutiny. Carriers who wait for the audit notice are already behind.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "3.5rem" }}>
          {TIMELINE.map((item, idx) => (
            <div
              key={idx}
              data-testid={`clock-stage-${idx}`}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "2.5rem",
                borderLeft: `3px solid ${
                  item.accent      ? "#C5A059"
                  : item.warning   ? "#fb923c"
                  : item.consequence ? "rgba(255,255,255,0.22)"
                  : "rgba(197,160,89,0.35)"
                }`,
                padding: "2rem 0 2rem 2.5rem",
                borderBottom: idx < TIMELINE.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
              className="clock-row"
            >
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.784rem",
                  fontWeight: 700,
                  color: item.accent ? "#C5A059" : item.warning ? "#fb923c" : item.consequence ? "rgba(255,255,255,0.45)" : "rgba(197,160,89,0.80)",
                  letterSpacing: "0.06em",
                  marginBottom: "0.3rem",
                }}>
                  {item.code}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  color: "#FFFFFF",
                  lineHeight: 1.3,
                }}>
                  {item.label}
                </p>
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.98rem",
                color: item.consequence ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.86)",
                lineHeight: 1.8,
                alignSelf: "center",
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "2.5rem",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.98rem, 2vw, 1.12rem)",
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.7,
            marginBottom: "0.5rem",
          }}>
            FMCSA does not audit paperwork.
          </p>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.98rem, 2vw, 1.12rem)",
            color: "#C5A059",
            lineHeight: 1.7,
          }}>
            They audit the operational patterns created during the first months of authority.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .clock-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  );
}
