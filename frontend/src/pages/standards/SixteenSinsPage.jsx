import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import FadeIn from "../../components/FadeIn";

const coral = "#D85A30";
const gold = "#C5A059";

const SINS = [
  {
    num: "01",
    name: "Authority Blindness",
    desc: "Operating before your MC/DOT status is officially \"Active\" or failing to complete the UCR registration.",
    mapping: "49 CFR Part 390, 392",
  },
  {
    num: "02",
    name: "The Ghost Driver",
    desc: "Allowing a driver to operate before their pre-employment drug test results are back and filed.",
    mapping: "49 CFR Part 382.301",
  },
  {
    num: "03",
    name: "DQ Negligence",
    desc: "Failing to maintain a Driver Qualification file that meets Part 391 standards — treating a CDL as the only proof needed.",
    mapping: "49 CFR Part 391.51",
  },
  {
    num: "04",
    name: "Medical Lapse",
    desc: "Allowing a driver with an expired or self-certified mismatch on their medical card to stay behind the wheel.",
    mapping: "49 CFR Part 391.41",
  },
  {
    num: "05",
    name: "Clearinghouse Silence",
    desc: "Failing to run the mandatory annual or pre-employment queries on the FMCSA Drug & Alcohol Clearinghouse.",
    mapping: "49 CFR Part 382.701",
  },
  {
    num: "06",
    name: "Logbook Fiction",
    desc: "Encouraging or ignoring the falsification of HOS logs to make the load happen.",
    mapping: "49 CFR Part 395.8",
  },
  {
    num: "07",
    name: "ELD Ignorance",
    desc: "Operating without a registered, functioning ELD or failing to carry the required ELD instruction cards in the cab.",
    mapping: "49 CFR Part 395.22",
  },
  {
    num: "08",
    name: "Pencil-Whipping Inspections",
    desc: "Documenting a DVIR without actually inspecting the equipment.",
    mapping: "49 CFR Part 396.11",
  },
  {
    num: "09",
    name: "Maintenance Amnesia",
    desc: "Failing to keep a 12-month recurring maintenance log for every VIN in the fleet.",
    mapping: "49 CFR Part 396.3",
  },
  {
    num: "10",
    name: "The Annual Skip",
    desc: "Operating a unit that has not had a documented periodic (annual) inspection within the last 365 days.",
    mapping: "49 CFR Part 396.17",
  },
  {
    num: "11",
    name: "Policy Absence",
    desc: "Operating a Drug & Alcohol program without a written, company-specific policy provided to every driver.",
    mapping: "49 CFR Part 382.601",
  },
  {
    num: "12",
    name: "Insurance Mismatch",
    desc: "Failing to ensure your insurance filing matches your registered company name and coverage minimums exactly.",
    mapping: "49 CFR Part 387 — BMC-91X filing requirements",
  },
  {
    num: "13",
    name: "Accident Erasure",
    desc: "Failing to maintain an Accident Register — even if you have had zero accidents. The zero must be documented.",
    mapping: "49 CFR Part 390.15",
  },
  {
    num: "14",
    name: "Consortium Dropout",
    desc: "Being removed from a random drug testing pool for non-payment or missed tests without immediate re-enrollment.",
    mapping: "49 CFR Part 382.305",
  },
  {
    num: "15",
    name: "The 150 Delay",
    desc: "Failing to update your MCS-150 biennial update — signaling to FMCSA that the lights are off at headquarters.",
    mapping: "49 CFR Part 390.19",
  },
  {
    num: "16",
    name: "Audit Defiance",
    desc: "Failing to respond to or provide documentation for a New Entrant Safety Audit within the required response window.",
    mapping: "49 CFR Part 385.11",
  },
];

export default function SixteenSinsPage() {
  return (
    <div style={{ background: "#020408", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>
        <FadeIn>
          {/* Header */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: coral,
            marginBottom: "1rem",
          }}>LP-DOCTRINE-001 | THREAT MODEL</p>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem",
          }}>The 16 Deadly Sins of the New Authority</h1>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem",
            color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>The LaunchPath Proprietary Threat Model</p>

          {/* Coral rule */}
          <div style={{ height: 2, background: coral, width: 64, marginBottom: "2.5rem" }} />

          {/* Intro */}
          <div style={{ maxWidth: 720, marginBottom: "4rem" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
              color: "rgba(255,255,255,0.88)", lineHeight: 1.85, marginBottom: "1rem",
            }}>
              Every motor carrier failure leaves a paper trail.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
              color: "rgba(255,255,255,0.7)", lineHeight: 1.85, marginBottom: "1rem",
              fontStyle: "italic",
            }}>
              The investigator writes it down after the fact.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
              color: "rgba(255,255,255,0.7)", lineHeight: 1.85, marginBottom: "1.5rem",
              fontStyle: "italic",
            }}>
              The LaunchPath system identifies the behaviors before they happen.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
              color: "rgba(255,255,255,0.82)", lineHeight: 1.85,
            }}>
              Most new carrier authorities do not fail because the operator was careless. They fail because the operational behaviors that cause failure are invisible until an investigator documents them. These are the 16 behaviors the LaunchPath system is built to eliminate. Each one maps to a specific federal regulation. Each one has ended operating authority for carriers who did not know it was happening.
            </p>
          </div>
        </FadeIn>

        {/* Sin card grid */}
        <FadeIn delay={60}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(197,160,89,0.1)",
            marginBottom: "4rem",
          }} className="sins-grid">
            {SINS.map((sin, i) => (
              <div key={i} style={{
                background: "#020408",
                borderLeft: `3px solid ${coral}`,
                padding: "1.5rem 1.5rem 1.25rem",
                transition: "background 0.15s",
              }}
                className="sin-card"
              >
                {/* Number */}
                <p style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.72rem",
                  color: `rgba(216,90,48,0.6)`,
                  letterSpacing: "0.08em",
                  marginBottom: "0.35rem",
                }}>SIN {sin.num}</p>

                {/* Name */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: coral,
                  marginBottom: "0.6rem",
                  lineHeight: 1.3,
                }}>{sin.name}</p>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.65,
                  marginBottom: "0.875rem",
                }}>{sin.desc}</p>

                {/* FMCSA mapping */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "0.625rem" }}>
                  <p style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}>FMCSA MAPPING: {sin.mapping}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Footer callout */}
        <FadeIn delay={100}>
          <div style={{
            borderLeft: `3px solid ${gold}`,
            background: "rgba(0,21,48,0.6)",
            borderRadius: "0 6px 6px 0",
            padding: "2rem 2.5rem",
            marginBottom: "2rem",
          }}>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "0.5rem",
            }}>Every sin has a corresponding system that prevents it.</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7,
              marginBottom: "1.25rem",
            }}>
              The LaunchPath New Carrier Document System installs the infrastructure that eliminates all 16.
            </p>
            <Link to="/standards/new-carrier-document-system" style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#001530", background: gold,
              padding: "0.75rem 1.75rem", textDecoration: "none", display: "inline-block",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              View the New Carrier Document System →
            </Link>
          </div>
        </FadeIn>
      </main>

      <FooterSection />

      <style>{`
        .sin-card:hover { background: rgba(216,90,48,0.04) !important; }
        @media (max-width: 700px) {
          .sins-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
