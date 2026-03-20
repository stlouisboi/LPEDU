import { Link } from "react-router-dom";

const DOMAINS = [
  "Driver Qualification File System",
  "Drug & Alcohol Compliance System",
  "Hours of Service & ELD Monitoring",
  "Vehicle Maintenance Record System",
  "Insurance Continuity Framework",
  "Cash Flow Control System",
];

export default function WhatGetsInstalledSimple() {
  return (
    <section
      data-testid="what-gets-installed-simple"
      style={{
        background: "var(--bg-onyx)",
        borderTop: "1px solid rgba(212,144,10,0.12)",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Section label */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.50)",
          marginBottom: "2rem",
        }}>
          LP-SYS-001 | WHAT GETS INSTALLED
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          color: "#FFFFFF",
          letterSpacing: "-0.025em",
          lineHeight: 1.08,
          marginBottom: "3rem",
        }}>
          Six Domains. One Audit-Ready Authority.
        </h2>

        {/* Domain list */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "0",
          marginBottom: "3rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          {DOMAINS.map((d, i) => (
            <div key={i} style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              padding: "1.25rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              paddingRight: "2rem",
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem",
                color: "#d4900a",
                fontWeight: 700,
                flexShrink: 0,
              }}>→</span>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.4,
                margin: 0,
                fontWeight: 500,
              }}>{d}</p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.50)",
          lineHeight: 1.7,
          marginBottom: "2rem",
          maxWidth: 560,
        }}>
          By the end of this system, your operation will not run the way it does today — and it shouldn't.
        </p>

        {/* Link */}
        <Link
          to="/operating-standard"
          data-testid="see-installation-link"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "rgba(212,144,10,0.80)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(212,144,10,0.25)",
            paddingBottom: "2px",
            letterSpacing: "0.02em",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#d4900a"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.80)"; }}
        >
          See the full installation sequence →
        </Link>

      </div>
    </section>
  );
}
