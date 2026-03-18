import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import FadeIn from "../../components/FadeIn";

const coral = "#D85A30";
const gold = "#C5A059";
const pageBg = "#020408";
const cardBg = "#0B1927";

const DOMAIN_GROUPS = [
  {
    domain: "Authority & Administrative Failures",
    sins: [
      { num: "01", name: "Authority Blindness" },
      { num: "12", name: "Insurance Mismatch" },
      { num: "15", name: "The 150 Delay" },
      { num: "16", name: "Audit Defiance" },
    ],
  },
  {
    domain: "Driver Qualification Failures",
    sins: [
      { num: "02", name: "The Ghost Driver" },
      { num: "03", name: "DQ Negligence" },
      { num: "04", name: "Medical Lapse" },
    ],
  },
  {
    domain: "Drug & Alcohol Failures",
    sins: [
      { num: "05", name: "Clearinghouse Silence" },
      { num: "11", name: "Policy Absence" },
      { num: "14", name: "Consortium Dropout" },
    ],
  },
  {
    domain: "HOS & Dispatch Failures",
    sins: [
      { num: "06", name: "Logbook Fiction" },
      { num: "07", name: "ELD Ignorance" },
    ],
  },
  {
    domain: "Maintenance & Inspection Failures",
    sins: [
      { num: "08", name: "Pencil-Whipping Inspections" },
      { num: "09", name: "Maintenance Amnesia" },
      { num: "10", name: "The Annual Skip" },
    ],
  },
  {
    domain: "Incident Reporting Failures",
    sins: [
      { num: "13", name: "Accident Erasure" },
    ],
  },
];

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
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <div style={{ background: pageBg, minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 1.5rem 7rem" }}>

        {/* ── Header ── */}
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: coral,
            marginBottom: "1rem",
          }}>LP-DOCTRINE-001 | THREAT MODEL</p>

          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}>The 16 Deadly Sins of the New Authority</h1>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "1.75rem",
          }}>The LaunchPath Proprietary Threat Model</p>

          <div style={{ height: 2, background: coral, width: 64, marginBottom: "3rem" }} />

          {/* Copy link utility */}
          <div style={{ marginBottom: "3.5rem" }}>
            <button
              data-testid="copy-link-btn"
              onClick={handleCopyLink}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: copied ? "#C5A059" : "rgba(255,255,255,0.38)",
                background: "transparent",
                border: `1px solid ${copied ? "rgba(197,160,89,0.35)" : "rgba(255,255,255,0.1)"}`,
                padding: "0.45rem 1rem",
                cursor: "pointer",
                transition: "all 0.2s",
                outline: "none",
              }}
            >
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>
          <div style={{ maxWidth: 720, marginBottom: "5.5rem" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.85,
              marginBottom: "1rem",
            }}>
              Every motor carrier failure leaves a paper trail.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.85,
              marginBottom: "1rem",
              fontStyle: "italic",
            }}>
              The investigator writes it down after the fact.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.85,
              marginBottom: "1.75rem",
              fontStyle: "italic",
            }}>
              The LaunchPath system identifies the behaviors before they happen.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.9,
            }}>
              Most new carrier authorities do not fail because the operator was careless. They fail because the operational behaviors that cause failure are invisible until an investigator documents them. These are the 16 behaviors the LaunchPath system is built to eliminate. Each one maps to a specific federal regulation. Each one has ended operating authority for carriers who did not know it was happening.
            </p>
          </div>
        </FadeIn>

        {/* ── At a Glance ── */}
        <FadeIn delay={40}>
          <div style={{ marginBottom: "6rem" }}>
            {/* Section label */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,0.7)",
              marginBottom: "0.75rem",
            }}>THE 16 DEADLY SINS — AT A GLANCE</p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              maxWidth: 680,
              marginBottom: "2.5rem",
            }}>
              Most new authorities do not fail from one major violation. They fail from several smaller failures that go unnoticed until an investigator documents them.
            </p>

            {/* Domain groups grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "rgba(255,255,255,0.05)",
            }} className="glance-grid">
              {DOMAIN_GROUPS.map((group, i) => (
                <div key={i} style={{
                  background: cardBg,
                  borderTop: `2px solid ${coral}`,
                  padding: "1.375rem 1.375rem 1.25rem",
                }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(216,90,48,0.75)",
                    marginBottom: "1rem",
                    lineHeight: 1.5,
                  }}>{group.domain}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {group.sins.map(sin => (
                      <div key={sin.num} style={{
                        display: "flex",
                        gap: "0.625rem",
                        alignItems: "baseline",
                      }}>
                        <span style={{
                          fontFamily: "'Courier New', Courier, monospace",
                          fontSize: "0.62rem",
                          color: "rgba(216,90,48,0.45)",
                          letterSpacing: "0.06em",
                          flexShrink: 0,
                          textTransform: "uppercase",
                        }}>{sin.num}</span>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.82rem",
                          color: "rgba(255,255,255,0.72)",
                          lineHeight: 1.4,
                        }}>{sin.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Violation Records section label ── */}
        <FadeIn delay={60}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,0.7)",
              marginBottom: "0.5rem",
            }}>VIOLATION RECORDS</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.02em",
            }}>Operational Behaviors Documented in New Authority Failures</p>
            <div style={{
              height: 1,
              background: "rgba(255,255,255,0.07)",
              marginTop: "1.5rem",
            }} />
          </div>
        </FadeIn>

        {/* ── Sin card grid ── */}
        <FadeIn delay={70}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
            marginBottom: "6rem",
          }} className="sins-grid">
            {SINS.map((sin, i) => (
              <div key={i} style={{
                background: cardBg,
                borderLeft: `3px solid ${coral}`,
                padding: "1.75rem 2rem 1.5rem",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.15s",
              }} className="sin-card">

                {/* Faint archival background numeral */}
                <span style={{
                  position: "absolute",
                  right: "1.25rem",
                  top: "0.25rem",
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "5.5rem",
                  fontWeight: 900,
                  color: coral,
                  opacity: 0.04,
                  lineHeight: 1,
                  userSelect: "none",
                  letterSpacing: "-0.02em",
                  pointerEvents: "none",
                }}>{sin.num}</span>

                {/* Record ID */}
                <p style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.68rem",
                  color: "rgba(216,90,48,0.5)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.55rem",
                }}>[SIN {sin.num}]</p>

                {/* Name */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: coral,
                  marginBottom: "0.875rem",
                  lineHeight: 1.3,
                }}>{sin.name}</p>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.75,
                  marginBottom: "1.125rem",
                }}>{sin.desc}</p>

                {/* FMCSA mapping */}
                <div style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "0.75rem",
                }}>
                  <p style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.28)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>FMCSA MAPPING: {sin.mapping}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Closing CTA block ── */}
        <FadeIn delay={100}>
          <div style={{
            background: "#0A1525",
            borderLeft: `3px solid ${gold}`,
            padding: "2.75rem 3rem",
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,0.55)",
              marginBottom: "1.25rem",
            }}>CONCLUSION</p>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "0.875rem",
              lineHeight: 1.4,
            }}>Every sin has a corresponding system that prevents it.</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: 540,
            }}>
              The LaunchPath New Carrier Document System installs the infrastructure that eliminates all 16.
            </p>
            <Link
              to="/standards/new-carrier-document-system"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#001530",
                background: gold,
                padding: "0.875rem 2rem",
                textDecoration: "none",
                display: "inline-block",
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
        .sin-card:hover { background: #0F2238 !important; }
        @media (max-width: 700px) {
          .sins-grid { grid-template-columns: 1fr !important; }
          .glance-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 701px) and (max-width: 1000px) {
          .glance-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
