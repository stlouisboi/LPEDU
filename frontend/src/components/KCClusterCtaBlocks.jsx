import { Link } from '../compat/Link';

const navy = "#000F1F";
const gold = "#d4900a";
const mono = "'Inter', sans-serif";
const serif = "'Newsreader', 'Playfair Display', serif";

export function PrimaryCtaBlock({ dataTestId = "kc-reach-cta" }) {
  return (
    <div data-testid={dataTestId} style={{
      background: navy,
      padding: "2.5rem 2rem",
      margin: "3.5rem 0",
      borderLeft: `4px solid ${gold}`,
    }}>
      <p style={{
        fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
        color: "#fff", lineHeight: 1.2, marginBottom: "1rem",
      }}>
        Find Out Where Your Operation Is Exposed
      </p>
      <p style={{
        fontFamily: mono, fontSize: "0.95rem",
        color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: "1.75rem",
      }}>
        The REACH Test is a free scored diagnostic. It takes less than ten minutes and shows you your current exposure across the Four Pillars — Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen. No login. No payment. A score that tells you where you stand.
      </p>
      <Link
        to="/auto-diagnostic"
        style={{
          display: "inline-block",
          background: navy,
          color: gold,
          fontFamily: mono,
          fontWeight: 700,
          fontSize: "0.762rem",
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          padding: "0.875rem 2rem",
          textDecoration: "none",
          border: `2px solid ${gold}`,
        }}
      >
        Run the REACH Test
      </Link>
    </div>
  );
}

export function SecondaryCtaBlock({ dataTestId = "kc-ground0-cta" }) {
  return (
    <div data-testid={dataTestId} style={{
      background: "#fff",
      border: `2px solid ${navy}`,
      padding: "2.5rem 2rem",
      margin: "2rem 0 3.5rem",
    }}>
      <p style={{
        fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
        color: navy, lineHeight: 1.2, marginBottom: "1rem",
      }}>
        If You're Ready to Understand the Full Compliance Architecture
      </p>
      <p style={{
        fontFamily: mono, fontSize: "0.95rem",
        color: "rgba(0,15,31,0.72)", lineHeight: 1.75, marginBottom: "1.75rem",
      }}>
        Ground 0 is the starting point. It is free, takes about 90 minutes, and ends with a documented decision about whether LaunchPath Standard is the right next step for your operation.
      </p>
      <Link
        to="/ground-0-briefing"
        style={{
          display: "inline-block",
          background: "#fff",
          color: navy,
          border: `2px solid ${navy}`,
          fontFamily: mono,
          fontWeight: 700,
          fontSize: "0.762rem",
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          padding: "0.875rem 2rem",
          textDecoration: "none",
        }}
      >
        Begin Ground 0
      </Link>
    </div>
  );
}

export function RegulatoryDisclaimer() {
  return (
    <p style={{
      fontFamily: mono,
      fontSize: "0.857rem",
      color: "rgba(0,15,31,0.55)",
      lineHeight: 1.75,
      marginTop: "3rem",
      paddingTop: "2rem",
      borderTop: "1px solid rgba(0,15,31,0.08)",
    }}>
      This content is educational and does not constitute legal or regulatory advice. For compliance guidance specific to your operation, consult a qualified transportation attorney or FMCSA-authorized consultant.
    </p>
  );
}
