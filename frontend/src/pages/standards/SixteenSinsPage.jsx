import { useState, useRef } from "react";
import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import FadeIn from "../../components/FadeIn";

const coral = "#D85A30";
const highRisk = "#C0392B";
const gold = "#d4900a";
const pageBg = "#060d19";
const cardBg = "#0B1927";

const FEATURED_NUM = ["02", "05", "08", "12", "16"];

const REMAINING_SINS = [
  { num: "01", name: "Authority Blindness" },
  { num: "03", name: "DQ Negligence" },
  { num: "04", name: "Medical Lapse" },
  { num: "06", name: "Logbook Fiction" },
  { num: "07", name: "ELD Ignorance" },
  { num: "09", name: "Maintenance Amnesia" },
  { num: "10", name: "The Annual Skip" },
  { num: "11", name: "Policy Absence" },
  { num: "13", name: "Accident Erasure" },
  { num: "14", name: "Consortium Dropout" },
  { num: "15", name: "The 150 Delay" },
];

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
  const [email, setEmail] = useState("");
  const [gateState, setGateState] = useState("idle"); // idle | submitting | done
  const API = process.env.REACT_APP_BACKEND_URL;

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleGateSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setGateState("submitting");
    try {
      await fetch(`${API}/api/sins-checklist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (_) {}
    setGateState("done");
    generatePDF();
  }

  function generatePDF() {
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF({ unit: "mm", format: "letter" });
      const W = 215.9;
      const gold = [212, 144, 10];
      const dark = [11, 22, 40];
      const white = [255, 255, 255];
      const red = [192, 57, 43];

      // Background
      doc.setFillColor(...dark);
      doc.rect(0, 0, W, 279.4, "F");

      // Header bar
      doc.setFillColor(...gold);
      doc.rect(0, 0, W, 3, "F");

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...white);
      doc.text("THE 16 DEADLY SINS", 20, 24);
      doc.setFontSize(11);
      doc.setTextColor(...gold);
      doc.text("OF THE NEW AUTHORITY — SELF-AUDIT CHECKLIST", 20, 32);

      doc.setFontSize(8);
      doc.setTextColor(160, 180, 200);
      doc.text("LaunchPath Transportation EDU  |  LP-DOCTRINE-001  |  launchpathedu.com", 20, 40);

      // Divider
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.5);
      doc.line(20, 44, W - 20, 44);

      let y = 52;
      const colW = (W - 40) / 2;
      let col = 0;

      const HIGH_RISK = ["02", "05", "12", "16"];

      SINS.forEach((sin, i) => {
        const isHR = HIGH_RISK.includes(sin.num);
        const x = 20 + col * (colW + 8);

        // Card bg
        doc.setFillColor(15, 30, 50);
        doc.rect(x, y, colW - 4, 38, "F");

        if (isHR) {
          doc.setDrawColor(...red);
          doc.setLineWidth(0.8);
          doc.line(x, y, x, y + 38);
        } else {
          doc.setDrawColor(216, 90, 48);
          doc.setLineWidth(0.4);
          doc.line(x, y, x, y + 38);
        }

        // Sin number + badge
        doc.setFontSize(7);
        doc.setFont("courier", "bold");
        doc.setTextColor(isHR ? 192 : 216, isHR ? 57 : 90, isHR ? 43 : 48);
        doc.text(`[SIN ${sin.num}]`, x + 4, y + 7);

        if (isHR) {
          doc.setFillColor(192, 57, 43);
          doc.rect(x + colW - 28, y + 2, 24, 6, "F");
          doc.setFontSize(5);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(255, 255, 255);
          doc.text("HIGH RISK", x + colW - 27, y + 6.5);
        }

        // Name
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(isHR ? 230 : 216, isHR ? 100 : 90, isHR ? 80 : 48);
        doc.text(sin.name, x + 4, y + 14, { maxWidth: colW - 12 });

        // Desc (truncated to 1 line)
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(200, 215, 230);
        const descLines = doc.splitTextToSize(sin.desc, colW - 12);
        doc.text(descLines.slice(0, 2), x + 4, y + 21);

        // CFR
        doc.setFontSize(6);
        doc.setFont("courier", "normal");
        doc.setTextColor(120, 140, 160);
        doc.text(`FMCSA: ${sin.mapping}`, x + 4, y + 34);

        // Checkbox
        doc.setDrawColor(100, 130, 160);
        doc.setLineWidth(0.3);
        doc.rect(x + colW - 8, y + 26, 4, 4);

        col++;
        if (col === 2) {
          col = 0;
          y += 42;
          if (y > 240 && i < SINS.length - 1) {
            doc.addPage();
            doc.setFillColor(...dark);
            doc.rect(0, 0, W, 279.4, "F");
            doc.setFillColor(...gold);
            doc.rect(0, 0, W, 2, "F");
            y = 16;
          }
        }
      });

      // Footer
      const finalY = y > 240 ? 270 : Math.max(y + 48, 260);
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.3);
      doc.line(20, finalY, W - 20, finalY);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 140, 160);
      doc.text("Verify regulatory requirements at ecfr.gov. LaunchPath Transportation EDU is an educational program.", 20, finalY + 6);
      doc.setTextColor(...gold);
      doc.text("launchpathedu.com/16-deadly-sins", W - 20, finalY + 6, { align: "right" });

      doc.save("16-deadly-sins-self-audit.pdf");
    });
  }

  return (
    <div style={{ background: pageBg, minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 1.5rem 7rem" }}>

        {/* ── Header ── */}
        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: coral,
            marginBottom: "1rem",
          }}>LP-DOCTRINE-001 | THREAT MODEL</p>

          <h1 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}>The 16 Deadly Sins of the New Authority</h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.857rem",
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
              fontSize: "1.1rem",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.7)",
              marginBottom: "0.75rem",
            }}>THE 16 DEADLY SINS — AT A GLANCE</p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--text-sm)",
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
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.714rem",
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
                          fontSize: "0.714rem",
                          color: sin.highRisk ? "rgba(192,57,43,0.75)" : "rgba(216,90,48,0.45)",
                          letterSpacing: "0.06em",
                          flexShrink: 0,
                          textTransform: "uppercase",
                        }}>{sin.num}</span>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.857rem",
                          color: sin.highRisk ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.72)",
                          lineHeight: 1.4,
                          fontWeight: sin.highRisk ? 600 : 400,
                        }}>{sin.name}</span>
                        {sin.highRisk && (
                          <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.762rem",
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

        {/* ── Transition to featured sins ── */}
        <FadeIn delay={45}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.55)", lineHeight: 1.75,
            maxWidth: 640, marginBottom: "4rem", fontStyle: "italic",
          }}>
            Below are the 5 most common authority-ending behaviors.
            The full list — with prevention protocols — is in the checklist.
          </p>
        </FadeIn>

        {/* ── Featured Sins (5 with full detail) ── */}
        <FadeIn delay={50}>
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(212,144,10,0.7)", marginBottom: "0.5rem",
            }}>FEATURED VIOLATIONS</p>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.88rem",
              color: "rgba(255,255,255,0.38)", letterSpacing: "0.02em",
            }}>The 5 most common authority-ending behaviors — documented below in full</p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginTop: "1.5rem" }} />
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem", marginBottom: "2.5rem",
          }} className="sins-grid">
            {SINS.filter(s => FEATURED_NUM.includes(s.num)).map((sin, i) => (
              <SinCard key={i} sin={sin} />
            ))}
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.45)", lineHeight: 1.75,
            maxWidth: 640, marginBottom: "4rem", fontStyle: "italic",
          }}>
            These are 5 of the 16. The remaining 11 — including prevention protocols for all 16 — are in the full checklist.
          </p>
        </FadeIn>

        {/* ── Email Gate — Checklist Download ── */}
        <FadeIn delay={50}>
          <div style={{
            background: "#F6F3EE",
            border: `1px solid rgba(212,144,10,0.30)`,
            borderLeft: `4px solid ${gold}`,
            padding: "2.75rem 3rem",
            marginBottom: "5rem",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a",
              marginBottom: "0.75rem",
            }}>LP-LEAD-001 | CHECKLIST DOWNLOAD</p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#0D1B30",
              letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "0.75rem",
            }}>Download the 16 Deadly Sins Checklist</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)",
              color: "rgba(13,27,48,0.65)", lineHeight: 1.75, maxWidth: 520, marginBottom: "1.25rem",
            }}>
              A self-audit tool for new motor carriers. Review your operation against all 16 behaviors
              that most commonly end authority — with CFR citations, consequence details, and prevention protocols.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem" }}>
              {[
                "All 16 sins with full descriptions",
                "\"What Happens\" consequence line for each",
                "Self-audit checkboxes",
                "Prevention protocol summary",
                "Next-step recommendations based on your results",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#d4900a", fontSize: "0.857rem", marginTop: "0.15rem", flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(13,27,48,0.75)", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            {gateState === "done" ? (
              <div>
                <div style={{
                  background: "rgba(76,175,80,0.10)", border: "1px solid rgba(76,175,80,0.35)",
                  padding: "0.875rem 1.5rem", marginBottom: "1.75rem", display: "inline-block",
                }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, color: "#2e7d32", letterSpacing: "0.10em", textTransform: "uppercase", margin: 0 }}>
                    Downloading — check your downloads folder
                  </p>
                </div>

                {/* Post-download nudge */}
                <div style={{
                  background: "rgba(13,27,48,0.04)",
                  border: "1px solid rgba(212,144,10,0.30)",
                  padding: "1.5rem 1.75rem",
                  maxWidth: 520,
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)",
                    color: "rgba(13,27,48,0.72)", lineHeight: 1.75, marginBottom: "1.25rem",
                  }}>
                    Your checklist is downloading. Ready to see which of these are active in your operation right now?
                  </p>
                  <a
                    href="/reach-diagnostic"
                    data-testid="sins-download-ground0-nudge"
                    style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
                      letterSpacing: "0.10em", textTransform: "uppercase", color: "#0b1628",
                      background: gold, padding: "0.75rem 1.75rem", textDecoration: "none",
                      display: "inline-block", transition: "background 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = gold; }}
                  >
                    Take the REACH Diagnostic →
                  </a>
                  <button
                    onClick={generatePDF}
                    style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem",
                      letterSpacing: "0.06em", color: "rgba(13,27,48,0.40)",
                      background: "transparent", border: "none",
                      padding: "0.75rem 1rem", cursor: "pointer", display: "block",
                      marginTop: "0.75rem",
                    }}
                  >
                    Download again
                  </button>
                </div>
              </div>
            ) : (
              <>
              <form onSubmit={handleGateSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "stretch" }}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  data-testid="sins-checklist-email"
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)",
                    color: "#0D1B30", background: "#FFFFFF",
                    border: "1px solid rgba(13,27,48,0.20)", padding: "0.875rem 1.25rem",
                    outline: "none", width: 280, minWidth: 200,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#d4900a"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(13,27,48,0.20)"; }}
                />
                <button
                  type="submit"
                  disabled={gateState === "submitting"}
                  data-testid="sins-checklist-download-btn"
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "#0b1628", background: gateState === "submitting" ? "rgba(212,144,10,0.60)" : gold,
                    border: "none", padding: "0.875rem 2rem", cursor: gateState === "submitting" ? "default" : "pointer",
                    transition: "background 0.2s", whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => { if (gateState !== "submitting") e.currentTarget.style.background = "#e8a520"; }}
                  onMouseLeave={e => { if (gateState !== "submitting") e.currentTarget.style.background = gold; }}
                >
                  {gateState === "submitting" ? "Preparing..." : "Download the Checklist →"}
                </button>
              </form>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.762rem",
                color: "rgba(13,27,48,0.40)", marginTop: "0.875rem", letterSpacing: "0.02em",
              }}>
                No spam. Just the checklist and relevant compliance resources.
              </p>
              </>
            )}
          </div>
        </FadeIn>

        {/* ── Remaining 11 sins — names only (gated) ── */}
        <FadeIn delay={65}>
          <div style={{
            background: "#0A1525",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "2.5rem 3rem",
            marginBottom: "5rem",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(216,90,48,0.60)", marginBottom: "0.75rem",
            }}>THE REMAINING 11</p>
            <h3 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#FFFFFF",
              lineHeight: 1.2, marginBottom: "0.75rem", letterSpacing: "-0.01em",
            }}>The full checklist includes these additional failure patterns:</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
              color: "rgba(255,255,255,0.40)", lineHeight: 1.7, marginBottom: "1.75rem",
            }}>
              Each includes the full description, CFR citation, consequence details, and prevention protocol.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
              {REMAINING_SINS.map(sin => (
                <div key={sin.num} style={{ display: "flex", gap: "0.875rem", alignItems: "baseline" }}>
                  <span style={{
                    fontFamily: "'Courier New', Courier, monospace", fontSize: "0.714rem",
                    color: "rgba(216,90,48,0.40)", letterSpacing: "0.06em", flexShrink: 0,
                  }}>→</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
                    fontWeight: 500, color: "rgba(255,255,255,0.55)", lineHeight: 1.5,
                  }}>SIN {sin.num} — {sin.name}</span>
                </div>
              ))}
            </div>

            {/* Pocket Guide upsell */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "1.75rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(212,144,10,0.70)", margin: "0 0 0.4rem",
                }}>LP-RES-001 | POCKET GUIDE</p>
                <p style={{
                  fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
                  fontSize: "1.1rem", color: "#FFFFFF", margin: "0 0 0.4rem",
                }}>Get all 16 — with full prevention protocols</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                  color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: 400, margin: 0,
                }}>
                  CFR citations, consequence details, and prevention systems for every sin. A permanent reference for your operation.
                </p>
              </div>
              <a
                href="https://launchpathedu.gumroad.com/l/16DeadlySinsPocketGuide"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="sins-pocket-guide-buy-btn"
                style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
                  letterSpacing: "0.10em", textTransform: "uppercase",
                  color: "#0b1628", background: "#C5A059",
                  padding: "1rem 2rem", textDecoration: "none",
                  display: "inline-block", whiteSpace: "nowrap",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#C5A059"; }}
              >
                Get the Pocket Guide — $17 →
              </a>
            </div>
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.55)",
              marginBottom: "1.25rem",
            }}>CONCLUSION</p>

            <p style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
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
                to="/reach-diagnostic"
                data-testid="sins-ground0-cta"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
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
                TAKE REACH DIAGNOSTIC →
              </Link>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.857rem",
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
                    fontSize: "var(--text-sm)",
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
                  VIEW THE DOCUMENT SYSTEM — $499 →
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
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

      {/* ── Next in the Framework ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.45)", marginBottom: "0.35rem" }}>
              NEXT IN THE FRAMEWORK
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", margin: 0 }}>
              The AUTO Method: Why These Failures Happen
            </p>
          </div>
          <Link
            to="/auto-method"
            data-testid="sins-next-framework-link"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "#0b1628", background: gold, padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e8a520")}
            onMouseLeave={e => (e.currentTarget.style.background = gold)}
          >
            VIEW THE AUTO METHOD →
          </Link>
        </div>
      </div>

      <FooterSection />

      <style dangerouslySetInnerHTML={{__html: `
        .sin-card:hover { background: #0F2238 !important; }
        .sin-card-high-risk:hover { background: #150c0c !important; }
        @media (max-width: 700px) {
          .sins-grid { grid-template-columns: 1fr !important; }
          .glance-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 701px) and (max-width: 1000px) {
          .glance-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}} />
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
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem",
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
        fontSize: "0.714rem",
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
          fontSize: "0.714rem",
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
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isHighRisk ? "rgba(192,57,43,0.75)" : "rgba(216,90,48,0.55)",
          marginBottom: "0.4rem",
        }}>WHAT HAPPENS</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.857rem",
          color: isHighRisk ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.62)",
          lineHeight: 1.7,
          margin: 0,
          fontStyle: "italic",
        }}>{sin.whatHappens}</p>
      </div>

    </div>
  );
}
