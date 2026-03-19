import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import FadeIn from "../../components/FadeIn";

const coral = "#D85A30";
const highRisk = "#C0392B";
const gold = "#d4900a";
const pageBg = "#060d19";
const cardBg = "#0B1927";

const DOMAIN_GROUPS = [
  {
    domain: "Authority & Administrative Failures",
    sins: [
      { num: "01", name: "Authority Blindness" },
      { num: "12", name: "Insurance Mismatch", highRisk: true },
      { num: "15", name: "The 150 Delay" },
      { num: "16", name: "Audit Defiance", highRisk: true },
    ],
  },
  {
    domain: "Driver Qualification Failures",
    sins: [
      { num: "02", name: "The Ghost Driver", highRisk: true },
      { num: "03", name: "DQ Negligence" },
      { num: "04", name: "Medical Lapse" },
    ],
  },
  {
    domain: "Drug & Alcohol Failures",
    sins: [
      { num: "05", name: "Clearinghouse Silence", highRisk: true },
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
    mapping: "49 CFR 390.19",
    whatHappens: "Loads dispatched before authority activation are retroactively illegal. Insurance claims can be denied. The violation exists whether you knew or not.",
  },
  {
    num: "02",
    name: "The Ghost Driver",
    highRisk: true,
    desc: "Allowing a driver to operate before their pre-employment drug test results are back and filed.",
    mapping: "49 CFR 382.301",
    whatHappens: "A positive result returned after the driver has already run loads means retroactive violation exposure. The audit doesn't care when you found out.",
  },
  {
    num: "03",
    name: "DQ Negligence",
    desc: "Failing to maintain a Driver Qualification file that meets Part 391 standards — treating a CDL as the only proof needed.",
    mapping: "49 CFR 391.51",
    whatHappens: "An incomplete DQ file is treated the same as no file at all. One missing document can trigger a conditional rating across your entire operation.",
  },
  {
    num: "04",
    name: "Medical Lapse",
    desc: "Allowing a driver with an expired or self-certified mismatch on their medical card to stay behind the wheel.",
    mapping: "49 CFR 391.45",
    whatHappens: "Expired medical certificates convert drivers to \"unqualified\" status retroactively. Every load they ran after expiration becomes a violation.",
  },
  {
    num: "05",
    name: "Clearinghouse Silence",
    highRisk: true,
    desc: "Failing to run the mandatory annual or pre-employment queries on the FMCSA Drug & Alcohol Clearinghouse.",
    mapping: "49 CFR 382.701",
    whatHappens: "A missed query that would have returned a violation means you dispatched an ineligible driver. The liability is yours, not theirs.",
  },
  {
    num: "06",
    name: "Logbook Fiction",
    desc: "Encouraging or ignoring the falsification of HOS logs to make the load happen.",
    mapping: "49 CFR 395.8",
    whatHappens: "Falsified logs are criminal violations. One provable instance can trigger an expedited audit and immediate out-of-service orders.",
  },
  {
    num: "07",
    name: "ELD Ignorance",
    desc: "Operating without a registered, functioning ELD or failing to carry the required ELD instruction cards in the cab.",
    mapping: "49 CFR 395.22",
    whatHappens: "No ELD or non-compliant device means automatic out-of-service at roadside. Repeated violations accelerate audit scheduling.",
  },
  {
    num: "08",
    name: "Pencil-Whipping Inspections",
    desc: "Documenting a DVIR without actually inspecting the equipment.",
    mapping: "49 CFR 396.11",
    whatHappens: "A signed inspection that missed a visible defect becomes evidence of negligence. If that defect causes an accident, the paper trail leads directly to you.",
  },
  {
    num: "09",
    name: "Maintenance Amnesia",
    desc: "Failing to keep a 12-month recurring maintenance log for every VIN in the fleet.",
    mapping: "49 CFR 396.3",
    whatHappens: "Missing maintenance records mean FMCSA assumes no maintenance was performed. The absence of documentation is treated as absence of care.",
  },
  {
    num: "10",
    name: "The Annual Skip",
    desc: "Operating a unit that has not had a documented periodic (annual) inspection within the last 365 days.",
    mapping: "49 CFR 396.17",
    whatHappens: "Units without current annual inspection are automatically out-of-service. One expired truck can shut down your entire roadside encounter.",
  },
  {
    num: "11",
    name: "Policy Absence",
    desc: "Operating a Drug & Alcohol program without a written, company-specific policy provided to every driver.",
    mapping: "49 CFR 382.601",
    whatHappens: "No written policy means no compliant program — regardless of whether you're enrolled in a consortium. The policy is the foundation; everything else is built on it.",
  },
  {
    num: "12",
    name: "Insurance Mismatch",
    highRisk: true,
    desc: "Failing to ensure your insurance filing matches your registered company name and coverage minimums exactly.",
    mapping: "49 CFR 387.7, 387.9",
    whatHappens: "A filing mismatch triggers automatic authority suspension. FMCSA doesn't call first — your MC number goes inactive in SAFER within hours.",
  },
  {
    num: "13",
    name: "Accident Erasure",
    desc: "Failing to maintain an Accident Register — even if you have had zero accidents. The zero must be documented.",
    mapping: "49 CFR 390.15",
    whatHappens: "No register means no proof of your safety record. Investigators treat missing documentation as concealment, not oversight.",
  },
  {
    num: "14",
    name: "Consortium Dropout",
    desc: "Being removed from a random drug testing pool for non-payment or missed tests without immediate re-enrollment.",
    mapping: "49 CFR 382.305",
    whatHappens: "Gaps in random pool coverage mean every driver was technically non-compliant during that period. The violation is retroactive and applies to all drivers.",
  },
  {
    num: "15",
    name: "The 150 Delay",
    desc: "Failing to update your MCS-150 biennial update — signaling to FMCSA that the lights are off at headquarters.",
    mapping: "49 CFR 390.19",
    whatHappens: "Missed MCS-150 updates trigger increased audit probability. FMCSA uses update compliance as a proxy for operational discipline.",
  },
  {
    num: "16",
    name: "Audit Defiance",
    highRisk: true,
    desc: "Failing to respond to or provide documentation for a New Entrant Safety Audit within the required response window.",
    mapping: "49 CFR 385.308",
    whatHappens: "Non-response is automatic failure. Authority revocation follows within 45 days. There is no second notice — only the revocation letter.",
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
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.7)",
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
                          color: sin.highRisk ? "rgba(192,57,43,0.75)" : "rgba(216,90,48,0.45)",
                          letterSpacing: "0.06em",
                          flexShrink: 0,
                          textTransform: "uppercase",
                        }}>{sin.num}</span>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.82rem",
                          color: sin.highRisk ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.72)",
                          lineHeight: 1.4,
                          fontWeight: sin.highRisk ? 600 : 400,
                        }}>{sin.name}</span>
                        {sin.highRisk && (
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.52rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: "#C0392B",
                            textTransform: "uppercase",
                            flexShrink: 0,
                          }}>⚠</span>
                        )}
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
              color: "rgba(212,144,10,0.7)",
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
              <SinCard key={i} sin={sin} />
            ))}
          </div>
        </FadeIn>

        {/* ── Closing CTA block ── */}
        <FadeIn delay={100}>
          <div style={{
            background: "#0A1525",
            borderLeft: `3px solid ${gold}`,
            padding: "2.75rem 3rem",
            marginBottom: "3rem",
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.55)",
              marginBottom: "1.25rem",
            }}>CONCLUSION</p>

            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "1rem",
              lineHeight: 1.4,
            }}>
              If you recognized two or more of these in your own operation, your audit window is open and your gaps are already accumulating.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: "1rem",
              maxWidth: 580,
            }}>
              Every sin on this list has ended a motor carrier's authority. Every sin has a corresponding system that prevents it.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              maxWidth: 580,
            }}>
              Ground 0 shows you exactly which sins are active in your operation right now — in 4 minutes, for free.
            </p>

            {/* Dual CTA */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2rem" }}>
              <Link
                to="/ground-0-briefing"
                data-testid="sins-ground0-cta"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "#0b1628",
                  background: gold,
                  padding: "1rem 2.25rem",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8a520")}
                onMouseLeave={e => (e.currentTarget.style.background = gold)}
              >
                INITIATE GROUND 0 →
              </Link>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                  letterSpacing: "0.05em",
                }}>Already know what you need?</p>
                <Link
                  to="/compliance-library"
                  data-testid="sins-bundle-cta"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: gold,
                    background: "transparent",
                    padding: "0.875rem 1.75rem",
                    textDecoration: "none",
                    display: "inline-block",
                    border: `1px solid rgba(212,144,10,0.40)`,
                    transition: "border-color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = gold)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.40)")}
                >
                  VIEW THE DOCUMENT SYSTEM — $497 →
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Copy Link utility (moved to bottom) ── */}
        <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
          <button
            data-testid="copy-link-btn"
            onClick={handleCopyLink}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: copied ? "#d4900a" : "rgba(255,255,255,0.28)",
              background: "transparent",
              border: `1px solid ${copied ? "rgba(212,144,10,0.30)" : "rgba(255,255,255,0.08)"}`,
              padding: "0.4rem 0.9rem",
              cursor: "pointer",
              transition: "all 0.2s",
              outline: "none",
            }}
          >
            {copied ? "Link Copied" : "Copy Link"}
          </button>
        </div>

      </main>

      <FooterSection />

      <style>{`
        .sin-card:hover { background: #0F2238 !important; }
        .sin-card-high-risk:hover { background: #150c0c !important; }
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

/* ── Sin card component ────────────────────────────────────────── */
function SinCard({ sin }) {
  const isHighRisk = sin.highRisk === true;
  const borderColor = isHighRisk ? highRisk : coral;
  const bgColor = isHighRisk ? "#110B0B" : cardBg;

  return (
    <div
      data-testid={`sin-card-${sin.num}`}
      style={{
        background: bgColor,
        borderLeft: `3px solid ${borderColor}`,
        padding: "1.75rem 2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.15s",
      }}
      className={isHighRisk ? "sin-card-high-risk" : "sin-card"}
    >
      {/* Faint archival background numeral */}
      <span style={{
        position: "absolute",
        right: "1.25rem",
        top: "0.25rem",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: "5.5rem",
        fontWeight: 900,
        color: borderColor,
        opacity: isHighRisk ? 0.06 : 0.04,
        lineHeight: 1,
        userSelect: "none",
        letterSpacing: "-0.02em",
        pointerEvents: "none",
      }}>{sin.num}</span>

      {/* HIGH RISK badge */}
      {isHighRisk && (
        <div style={{
          position: "absolute",
          top: "1rem",
          right: "1.25rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: highRisk,
          background: "rgba(192,57,43,0.12)",
          border: `1px solid rgba(192,57,43,0.30)`,
          padding: "0.2rem 0.6rem",
          zIndex: 1,
        }}>
          AUTHORITY ENDING
        </div>
      )}

      {/* Record ID */}
      <p style={{
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: "0.68rem",
        color: isHighRisk ? "rgba(192,57,43,0.65)" : "rgba(216,90,48,0.5)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "0.55rem",
      }}>[SIN {sin.num}]</p>

      {/* Name */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "1rem",
        fontWeight: 600,
        color: isHighRisk ? "#D85A4A" : coral,
        marginBottom: "0.875rem",
        lineHeight: 1.3,
        paddingRight: isHighRisk ? "9rem" : 0,
      }}>{sin.name}</p>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.88rem",
        color: "rgba(255,255,255,0.75)",
        lineHeight: 1.75,
        marginBottom: "1rem",
      }}>{sin.desc}</p>

      {/* FMCSA mapping */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "0.75rem",
        marginBottom: "0.875rem",
      }}>
        <p style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.28)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          margin: 0,
        }}>FMCSA MAPPING: {sin.mapping}</p>
      </div>

      {/* WHAT HAPPENS */}
      <div style={{
        background: isHighRisk ? "rgba(192,57,43,0.07)" : "rgba(255,255,255,0.03)",
        borderLeft: `2px solid ${isHighRisk ? "rgba(192,57,43,0.35)" : "rgba(216,90,48,0.18)"}`,
        padding: "0.75rem 0.875rem",
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isHighRisk ? "rgba(192,57,43,0.75)" : "rgba(216,90,48,0.55)",
          marginBottom: "0.4rem",
        }}>WHAT HAPPENS</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.84rem",
          color: isHighRisk ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.62)",
          lineHeight: 1.7,
          margin: 0,
          fontStyle: "italic",
        }}>{sin.whatHappens}</p>
      </div>

    </div>
  );
}
