import { Link } from "react-router-dom";

export default function ComplianceMapTeaser() {
  return (
    <section
      data-testid="compliance-map-teaser"
      style={{
        background: "#000D1A",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "52px 24px",
      }}
    >
      <div style={{
        maxWidth: 680,
        margin: "0 auto",
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(197,160,89,0.45)",
          marginBottom: "1rem",
        }}>
          SELF-DIRECTED OPTION
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.975rem",
          color: "rgba(255,255,255,0.58)",
          lineHeight: 1.8,
          marginBottom: "1.5rem",
          maxWidth: 600,
        }}>
          For operators who prefer to install the compliance structure independently, the LaunchPath New Carrier Document System is available as a self-directed package — all five domain packets, the unified folder structure, and the 0–30–90 day implementation guide.
        </p>
        <Link
          to="/standards"
          data-testid="compliance-map-link"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.84rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "rgba(197,160,89,0.75)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#C5A059")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(197,160,89,0.75)")}
        >
          Explore the Standards Library →
        </Link>
      </div>
    </section>
  );
}
