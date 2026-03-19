import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TIMELINE = [
  {
    code: "D1",
    label: "Day 1 — Authority Active",
    sublabel: "Systems Must Already Be Running",
    body: "Insurance filings, driver files, safety controls, and compliance records should already be operational. There is no grace period.",
    accent: true,
    link: "/knowledge-center/lp-brf-07",
  },
  {
    code: "30",
    label: "Days 1–30 — Installation Window",
    sublabel: "Documentary Structure Takes Shape",
    body: "The carrier's documentary structure, dispatch rhythm, and monitoring habits begin forming. Missed steps here become invisible vulnerabilities.",
    link: "/knowledge-center/lp-brf-08",
  },
  {
    code: "60",
    label: "Days 30–60 — Pattern Formation",
    sublabel: "Operational Records Begin Accumulating",
    body: "Logs, maintenance activity, dispatch behavior, and file upkeep begin establishing the operating pattern later reviewed under scrutiny.",
    link: "/knowledge-center/lp-brf-09",
  },
  {
    code: "90",
    label: "Days 60–90 — Audit Exposure Window",
    sublabel: "Preparation or Reconstruction",
    body: "If core systems are not installed by this stage, audit preparation becomes reconstruction. Reconstruction under scrutiny is a different problem entirely.",
    warning: true,
    link: "/knowledge-center/lp-brf-10",
  },
  {
    code: "9M",
    label: "Months 9–18 — What You Built Gets Tested",
    sublabel: "Scrutiny Makes Early Gaps Visible",
    body: "The operational patterns created in the first months of authority become visible later under scrutiny. Each gap compounds. Each missing record becomes harder to defend.",
    consequence: true,
    link: "/knowledge-center/lp-brf-11",
  },
];

function getRowConfig(item) {
  if (item.accent) return {
    nodeSize: 10, nodeFill: "#d4900a", nodeBorder: "#d4900a",
    connectorColor: "rgba(212,144,10,0.50)",
    badgeBorder: "rgba(212,144,10,0.65)", badgeColor: "#d4900a",
    titleColor: "#FFFFFF", titleSize: "1rem",
    bodyColor: "rgba(255,255,255,0.86)", bodyItalic: false,
    rowBg: "transparent", rowBorderTop: "none",
  };
  if (item.warning) return {
    nodeSize: 13, nodeFill: "#fb923c", nodeBorder: "#fb923c",
    connectorColor: "rgba(251,146,60,0.30)",
    badgeBorder: "rgba(251,146,60,0.60)", badgeColor: "#fb923c",
    titleColor: "#FFFFFF", titleSize: "1.08rem",
    bodyColor: "rgba(255,255,255,0.88)", bodyItalic: false,
    rowBg: "rgba(251,146,60,0.028)", rowBorderTop: "1px solid rgba(251,146,60,0.12)",
  };
  if (item.consequence) return {
    nodeSize: 8, nodeFill: "transparent", nodeBorder: "rgba(255,255,255,0.18)",
    connectorColor: "transparent",
    badgeBorder: "rgba(255,255,255,0.14)", badgeColor: "rgba(255,255,255,0.36)",
    titleColor: "rgba(255,255,255,0.50)", titleSize: "0.94rem",
    bodyColor: "rgba(255,255,255,0.48)", bodyItalic: true,
    rowBg: "transparent", rowBorderTop: "1px solid rgba(255,255,255,0.04)",
  };
  return {
    nodeSize: 8, nodeFill: "transparent", nodeBorder: "rgba(212,144,10,0.45)",
    connectorColor: "rgba(212,144,10,0.36)",
    badgeBorder: "rgba(212,144,10,0.30)", badgeColor: "rgba(212,144,10,0.70)",
    titleColor: "rgba(255,255,255,0.88)", titleSize: "0.94rem",
    bodyColor: "rgba(255,255,255,0.72)", bodyItalic: false,
    rowBg: "transparent", rowBorderTop: "none",
  };
}

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
        background: "#0d1c30",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "112px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* LP code label */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.616rem",
          color: "rgba(212,144,10,0.80)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: "2.5rem",
        }}>
          LP-TIM-001 | AUTHORITY ACTIVATION TIMELINE
        </p>

        {/* Section header — separated by thin rule */}
        <div style={{
          marginBottom: "4rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#d4900a",
            marginBottom: "0.75rem",
          }}>
            The 90-Day Authority Clock
          </p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "var(--text-2xl)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "0.25rem",
            maxWidth: 560,
          }}>
            The Clock Starts
          </h2>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "var(--text-2xl)",
            letterSpacing: "-0.02em",
            color: "#d4900a",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            maxWidth: 560,
          }}>
            Day One.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.76)",
            lineHeight: 1.85,
            maxWidth: 560,
          }}>
            The first ninety days are not a grace period. They are the installation window. The files, monitoring rhythms, operating controls, and compliance patterns built here determine what investigators later find under scrutiny. Carriers who wait for the audit notice are already behind.
          </p>
        </div>

        {/* Timeline with architectural spine + diamond nodes */}
        <div style={{ marginBottom: "5rem" }}>
          {TIMELINE.map((item, idx) => {
            const cfg = getRowConfig(item);
            const isLast = idx === TIMELINE.length - 1;
            return (
              <div
                key={idx}
                data-testid={`clock-stage-${idx}`}
                className="clock-outer-row"
                style={{
                  display: "flex",
                  gap: 0,
                  background: cfg.rowBg,
                  borderTop: cfg.rowBorderTop,
                }}
              >
                {/* ── Spine column: node + connector ── */}
                <div style={{
                  width: 32,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: 27,
                }}>
                  {/* Diamond marker */}
                  <div
                    className="clock-node"
                    style={{
                      width: cfg.nodeSize,
                      height: cfg.nodeSize,
                      background: cfg.nodeFill,
                      border: `1.5px solid ${cfg.nodeBorder}`,
                      transform: "rotate(45deg)",
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  />
                  {/* Connector to next row */}
                  {!isLast && (
                    <div style={{
                      flex: 1,
                      width: 1,
                      minHeight: 32,
                      background: cfg.connectorColor,
                      marginTop: 7,
                    }} />
                  )}
                </div>

                {/* ── Content row ── */}
                <div
                  className="clock-content-row"
                  style={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: "2.5rem",
                    padding: `1.75rem 0 ${isLast ? "0.75rem" : "2.25rem"} 1.75rem`,
                  }}
                >
                  {/* Left: time badge + stage title — linked to deep-dive brief */}
                  <Link
                    to={item.link}
                    data-testid={`clock-phase-link-${idx}`}
                    className="clock-phase-link"
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div style={{
                      display: "inline-block",
                      border: `1px solid ${cfg.badgeBorder}`,
                      padding: "3px 10px 4px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.608rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: cfg.badgeColor,
                      textTransform: "uppercase",
                      marginBottom: "0.65rem",
                    }}>
                      {item.code}
                    </div>
                    <p className="clock-phase-label" style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: cfg.titleSize,
                      color: cfg.titleColor,
                      lineHeight: 1.22,
                      letterSpacing: "-0.01em",
                      marginBottom: item.sublabel ? "0.3rem" : 0,
                    }}>
                      {item.label}
                    </p>
                    {item.sublabel && (
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        color: cfg.badgeColor,
                        opacity: 0.75,
                        lineHeight: 1.3,
                        marginBottom: "0.5rem",
                      }}>
                        {item.sublabel}
                      </p>
                    )}
                    <span className="clock-brief-hint" style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.58rem",
                      color: "rgba(212,144,10,0.40)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      display: "block",
                      transition: "color 0.15s",
                    }}>
                      → Read Brief
                    </span>
                  </Link>

                  {/* Right: body copy */}
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: item.warning ? "0.98rem" : "0.938rem",
                    color: cfg.bodyColor,
                    lineHeight: 1.82,
                    alignSelf: "center",
                    fontStyle: cfg.bodyItalic ? "italic" : "normal",
                  }}>
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Doctrine closing statement — left-aligned, final authority ── */}
        <div style={{
          borderTop: "2px solid rgba(212,144,10,0.20)",
          paddingTop: "3rem",
          maxWidth: 680,
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.608rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: "rgba(212,144,10,0.55)",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}>
            LP-DOC-001 | Doctrine
          </p>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            color: "rgba(255,255,255,0.95)",
            lineHeight: 1.5,
            letterSpacing: "-0.015em",
            marginBottom: "0.375rem",
          }}>
            FMCSA does not audit paperwork.
          </p>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            color: "#d4900a",
            lineHeight: 1.5,
            letterSpacing: "-0.015em",
          }}>
            They audit the operational patterns created during the first months of authority.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .clock-content-row {
            grid-template-columns: 1fr !important;
            gap: 0.6rem !important;
          }
        }
        @media (max-width: 480px) {
          .clock-node { display: none; }
          .clock-outer-row > div:first-child {
            width: 0 !important;
            min-width: 0 !important;
            overflow: hidden;
          }
          .clock-content-row { padding-left: 0 !important; }
        }
        .clock-phase-link:hover .clock-phase-label {
          text-decoration: underline;
          text-decoration-color: rgba(212,144,10,0.55);
          text-underline-offset: 3px;
        }
        .clock-phase-link:hover .clock-brief-hint {
          color: rgba(212,144,10,0.75) !important;
        }
      `}</style>
    </section>
  );
}
