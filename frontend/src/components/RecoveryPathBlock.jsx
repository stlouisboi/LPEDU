import { Link } from "react-router-dom";

export default function RecoveryPathBlock() {
  return (
    <section
      data-testid="recovery-path-block"
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
        borderLeft: "3px solid var(--gold-primary)",
        paddingLeft: "2rem",
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "1.25rem",
        }}>
          Already Facing Compliance Action?
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.7,
          marginBottom: "0.875rem",
        }}>
          If you've received a warning letter, failed a safety audit, or are facing
          authority revocation — the LaunchPath Standard still applies.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.90)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
        }}>
          The rebuild is harder after failure. But it's not over.
        </p>

        <Link
          to="/knowledge-center/authority-reinstatement-brief"
          data-testid="recovery-path-cta"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--gold-primary)",
            textDecoration: "none",
            transition: "color 0.2s",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-primary)")}
        >
          START THE REBUILD &rarr;
        </Link>
      </div>
    </section>
  );
}
