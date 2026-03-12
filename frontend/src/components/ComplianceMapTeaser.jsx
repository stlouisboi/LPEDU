import { Link } from "react-router-dom";

export default function ComplianceMapTeaser() {
  return (
    <section
      data-testid="compliance-map-teaser"
      style={{
        background: "#001530",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 24px",
      }}
    >
      <div style={{
        maxWidth: 720,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2.5rem",
        flexWrap: "wrap",
      }}>
        <div>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "1.12rem",
            color: "#FFFFFF",
            marginBottom: "0.375rem",
          }}>
            See the complete regulatory architecture.
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.784rem",
            color: "rgba(197,160,89,0.8)",
            letterSpacing: "0.06em",
          }}>
            48 compliance elements. One map.
          </p>
        </div>
        <Link
          to="/operating-standard"
          data-testid="compliance-map-link"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.784rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C5A059",
            textDecoration: "none",
            border: "1px solid rgba(197,160,89,0.4)",
            padding: "0.6rem 1.5rem",
            whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(197,160,89,0.08)";
            e.currentTarget.style.borderColor = "rgba(197,160,89,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(197,160,89,0.4)";
          }}
        >
          View Compliance Map →
        </Link>
      </div>
    </section>
  );
}
