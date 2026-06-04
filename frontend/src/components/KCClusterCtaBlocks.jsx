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
      margin: "4rem 0 0",
      borderLeft: `4px solid ${gold}`,
    }}>
      <p style={{
        fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em",
        textTransform: "uppercase", color: `rgba(212,144,10,0.65)`, marginBottom: "0.75rem",
      }}>
        LP-KC-CTA-001 — REACH DIAGNOSTIC
      </p>
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
        The REACH Diagnostic is a free 14-question readiness check. It takes less than ten minutes and shows you your current exposure across the Four Pillars — Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen. No login. No payment. A score that tells you where you stand.
      </p>
      <Link
        to="/reach-diagnostic"
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
        Run the REACH Diagnostic
      </Link>
    </div>
  );
}

export function SecondaryCtaBlock({ dataTestId = "kc-ground0-cta" }) {
  return (
    <div data-testid={dataTestId} style={{
      background: "#fff",
      borderTop: `4px solid ${navy}`,
      borderLeft: `1px solid rgba(0,15,31,0.12)`,
      borderRight: `1px solid rgba(0,15,31,0.12)`,
      borderBottom: `1px solid rgba(0,15,31,0.12)`,
      padding: "2.5rem 2rem",
      margin: "2.5rem 0 0",
    }}>
      <p style={{
        fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em",
        textTransform: "uppercase", color: "rgba(0,15,31,0.40)", marginBottom: "0.75rem",
      }}>
        LP-KC-CTA-002 — PROGRAM INQUIRY
      </p>
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

export function CheckpointCtaBlock({ dataTestId = "kc-checkpoint-cta" }) {
  const checkpoints = [
    {
      day: "DAY 30",
      label: "Operational Foundation Review",
      note: "Authority, insurance, DQ files, D&A program — confirm infrastructure is in place. Identify the biggest win and priority for the next 30 days.",
    },
    {
      day: "DAY 60",
      label: "Compliance Readiness Review",
      note: "Score all six FMCSA audit areas 1–10. Name current risks. Specify immediate corrective actions.",
    },
    {
      day: "DAY 90",
      label: "Program Completion & Compliance Posture Summary",
      note: "Before vs. after comparison table. Audit readiness confirmation. REACH score comparison. What this operation can now do that it could not 90 days ago.",
    },
  ];
  return (
    <div data-testid={dataTestId} style={{
      background: "#050d18",
      borderTop: "3px solid #C8A96E",
      padding: "2.5rem 2rem",
      margin: "2.5rem 0 4rem",
    }}>
      <p style={{
        fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em",
        textTransform: "uppercase", color: "rgba(200,169,110,0.65)", marginBottom: "0.75rem",
      }}>
        LP-CKP-001 — CARRIER CHECKPOINT
      </p>
      <p style={{
        fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
        color: "#FFFFFF", lineHeight: 1.2, marginBottom: "1rem",
      }}>
        Track Where Your Operation Stands at Day 30, 60, and 90
      </p>
      <p style={{
        fontFamily: mono, fontSize: "0.95rem",
        color: "rgba(255,255,255,0.70)", lineHeight: 1.75, marginBottom: "1.75rem",
      }}>
        The Carrier Checkpoint is a structured review document completed at three points during the program. It records what was installed, what gaps remain, and where your compliance posture stands against the audit window.
      </p>
      <div style={{ borderTop: "1px solid rgba(200,169,110,0.15)", marginBottom: "2rem" }}>
        {checkpoints.map((cp, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "88px 1fr",
            gap: "1.5rem",
            padding: "1rem 0",
            borderBottom: "1px solid rgba(200,169,110,0.10)",
            alignItems: "flex-start",
          }}>
            <p style={{
              fontFamily: mono, fontWeight: 700, fontSize: "0.762rem",
              letterSpacing: "0.12em", color: "#C8A96E", marginTop: "2px",
            }}>
              {cp.day}
            </p>
            <div>
              <p style={{
                fontFamily: mono, fontWeight: 700, fontSize: "0.875rem",
                color: "rgba(255,255,255,0.90)", marginBottom: "0.2rem",
              }}>
                {cp.label}
              </p>
              <p style={{
                fontFamily: mono, fontSize: "0.857rem",
                color: "rgba(255,255,255,0.58)", lineHeight: 1.7,
              }}>
                {cp.note}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/ground-0-briefing"
        style={{
          display: "inline-block",
          background: "#C8A96E",
          color: "#050d18",
          fontFamily: mono,
          fontWeight: 700,
          fontSize: "0.762rem",
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          padding: "0.875rem 2rem",
          textDecoration: "none",
        }}
      >
        Access the Carrier Checkpoint →
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
