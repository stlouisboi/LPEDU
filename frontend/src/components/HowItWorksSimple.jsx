import { Link } from "react-router-dom";

const STEPS = [
  {
    num: "STEP 1",
    label: "COMPLETE GROUND 0",
    desc: "Run the readiness diagnostic. See where your operation stands and what gaps are exposed.",
  },
  {
    num: "STEP 2",
    label: "IDENTIFY COMPLIANCE GAPS",
    desc: "Receive your findings brief. Understand what's missing and what needs to be built first.",
  },
  {
    num: "STEP 3",
    label: "INSTALL THE SYSTEM",
    desc: "Build your compliance infrastructure in sequence across the first 90 days of authority.",
  },
  {
    num: "STEP 4",
    label: "CONTINUE UNDER THE STANDARD",
    desc: "Maintain system integrity through the 18-month New Entrant monitoring window with the Continuity Standard.",
  },
];

export default function HowItWorksSimple() {
  return (
    <>
      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-left: 1px solid rgba(212,144,10,0.14);
          margin-bottom: 3rem;
        }
        @media (max-width: 900px) { .hiw-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .hiw-grid { grid-template-columns: 1fr !important; } }
        .hiw-card {
          border-right: 1px solid rgba(212,144,10,0.14);
          border-bottom: 1px solid rgba(212,144,10,0.14);
          border-top: 2px solid rgba(212,144,10,0.35);
          padding: 2rem 1.75rem;
          position: relative;
        }
      `}</style>

      <section
        data-testid="how-it-works-simple"
        style={{
          background: "#090f16",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "2rem" }}>
            LP-STD-001 — HOW IT WORKS
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FFFFFF", letterSpacing: "-0.025em", lineHeight: 1.08, marginBottom: "3rem" }}>
            The Installation Sequence
          </h2>

          <div className="hiw-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="hiw-card" data-testid={`step-card-${i + 1}`}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "0.5rem" }}>
                  {s.num}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#d4900a", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/operating-standard"
            data-testid="see-standard-link"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(212,144,10,0.80)", textDecoration: "none", borderBottom: "1px solid rgba(212,144,10,0.25)", paddingBottom: "2px", letterSpacing: "0.02em", transition: "color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#d4900a"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.80)"; }}
          >
            See the full Standard →
          </Link>

          <Link
            to="/operating-standard"
            data-testid="see-standard-link"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(212,144,10,0.80)", textDecoration: "none", borderBottom: "1px solid rgba(212,144,10,0.25)", paddingBottom: "2px", letterSpacing: "0.02em", transition: "color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#d4900a"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.80)"; }}
          >
            See the full Standard →
          </Link>

        </div>
      </section>
    </>
  );
}
