import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import FadeIn from "../../components/FadeIn";
import { BookMockup3D } from "../../components/BookMockup3D";

const PACKETS = [
  { code: "LP-PKT-001", title: "New Entrant Packet", price: "$97", href: "/standards/new-entrant-packet" },
  { code: "LP-PKT-002", title: "Drug & Alcohol Packet", price: "$127", href: "/standards/drug-alcohol-packet" },
  { code: "LP-PKT-003", title: "HOS & Dispatch Packet", price: "$127", href: "/standards/hos-packet" },
  { code: "LP-PKT-004", title: "Maintenance & Unit File Packet", price: "$127", href: "/standards/maintenance-packet" },
  { code: "LP-PKT-005", title: "Insurance & Authority Packet", price: "$127", href: "/standards/insurance-packet" },
];

const PHASES = [
  {
    phase: "Days 0–30", label: "The Infrastructure",
    steps: [
      { n: 1, title: "The Digital Foundation", body: "Set up the LaunchPath Unified Folder Structure. Do not move a single file until the folders are labeled exactly as specified in the Master Directory." },
      { n: 2, title: "Insurance & Authority Packet", body: "Audit your MCS-150 for accuracy. File your BOC-3 and ensure your insurance filings match your registered name exactly. Discrepancies here cause the most New Entrant delays." },
      { n: 3, title: "The New Entrant Brief", body: "Read the New Entrant Packet Brief. Identify your Administrative Anniversary — the date your 18-month monitoring period began." },
      { n: 4, title: "Driver Qualification (DQ) Master", body: "Even if you are an owner-operator, you must build a DQ file for yourself. Populate the Driver Qualification Templates and file them in the Driver Folder." },
    ],
  },
  {
    phase: "Days 31–60", label: "The Daily Standard",
    steps: [
      { n: 5, title: "Drug & Alcohol (D&A) Packet", body: "Ensure you are enrolled in a Consortium (C/TPA). Run the Pre-employment Query in the Clearinghouse. File your Proof of Enrollment in the D&A folder." },
      { n: 6, title: "HOS & Dispatch Packet", body: "Install the HOS Operating Brief. If using an ELD, download the driver instruction card and the ELD Malfunction sheet. Place these in the vehicle and in the digital Grab Folder." },
      { n: 7, title: "Dispatch Logs", body: "Implement the Operational Checklist for dispatch. Ensure every load has a corresponding Bill of Lading (BOL) filed by trip number." },
    ],
  },
  {
    phase: "Days 61–90", label: "Maintenance & Hardening",
    steps: [
      { n: 8, title: "Maintenance & Unit File Packet", body: "Build a folder for every VIN in the fleet. Upload the Annual Inspection and the Preventative Maintenance (PM) Schedule." },
      { n: 9, title: "The Maintenance Log", body: "Start the recurring maintenance log. Even if no repairs were made, the No Activity log proves the system is active." },
      { n: 10, title: "The Grab Folder Simulation", body: "Move the required documents (Insurance, DQ, HOS, D&A) into the Audit-Ready Grab Folder. Review it as if you were an FMCSA investigator. If it takes more than 5 minutes to find a document, the system is not installed correctly." },
    ],
  },
];

async function downloadGuide() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
  const W = 215.9;
  const M = 18;
  const CW = W - M * 2;
  let y = M;
  const gold = [197, 160, 89];
  const navy = [0, 34, 68];
  const white = [255, 255, 255];
  const muted = [150, 175, 200];

  function newPage() { doc.addPage(); y = M; }
  function checkY(n) { if (y + n > 268) newPage(); }

  // Cover
  doc.setFillColor(...navy);
  doc.rect(0, 0, W, 279, "F");
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(M, 38, W - M, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...gold);
  doc.text("LAUNCHPATH OPERATING STANDARD — DOCUMENT SYSTEM", M, 34);
  doc.setFontSize(26);
  doc.setTextColor(...white);
  doc.text("0–30–90 Day", M, 56);
  doc.text("Implementation Guide", M, 70);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...muted);
  doc.text("New Carrier Document System — Installation Sequence", M, 84);
  doc.line(M, 96, W - M, 96);
  doc.setFontSize(8);
  doc.text("The DIY path to a compliant new-authority operating standard.", M, 106);
  doc.setFontSize(7);
  doc.setTextColor(...gold);
  doc.text("launchpathedu.com", M, 270);

  // Objective page
  newPage();
  doc.setFillColor(...navy);
  doc.rect(0, 0, W, 279, "F");
  y = M + 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...gold);
  doc.text("THE OBJECTIVE", M, y);
  y += 10;
  doc.setFontSize(14);
  doc.setTextColor(...white);
  const objLines = doc.splitTextToSize(
    "To move a carrier from Paperwork Chaos to an Audit-Ready Operating Standard in one fiscal quarter.",
    CW
  );
  doc.text(objLines, M, y);
  y += objLines.length * 7 + 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...muted);
  const objBody = doc.splitTextToSize(
    "This guide dictates the order of operations for installing the five LaunchPath packets. Each step is a physical action. Mark it complete before moving to the next.",
    CW
  );
  doc.text(objBody, M, y);
  y += objBody.length * 5.5 + 14;
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.line(M, y, W - M, y);

  // Phase pages
  for (const phase of PHASES) {
    y += 12;
    checkY(30);

    doc.setFillColor(0, 21, 48);
    doc.rect(M, y - 4, CW, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text(phase.phase.toUpperCase(), M + 4, y + 4);
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.text(`Focus: ${phase.label}`, M + 38, y + 4);
    y += 18;

    for (const step of phase.steps) {
      checkY(24);
      // Checkbox
      doc.setDrawColor(...muted);
      doc.setLineWidth(0.25);
      doc.rect(M, y - 3.5, 4, 4);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...gold);
      doc.text(`Step ${step.n}:`, M + 6, y);
      doc.setTextColor(...white);
      doc.text(step.title, M + 6 + 13, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...muted);
      const bodyLines = doc.splitTextToSize(step.body, CW - 10);
      doc.text(bodyLines, M + 6, y);
      y += bodyLines.length * 5 + 8;
    }

    doc.setDrawColor(255, 255, 255, 0.1);
    doc.setLineWidth(0.2);
    doc.line(M, y, W - M, y);
    y += 6;
  }

  // Closing note
  checkY(40);
  y += 4;
  doc.setFillColor(0, 21, 48);
  doc.rect(M, y, CW, 28, "F");
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.line(M, y, M, y + 28);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...gold);
  doc.text("SCALING THE STANDARD", M + 4, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...white);
  const closeLines = doc.splitTextToSize(
    "By Day 90, your carrier is not just compliant — it is professionalized. This document system is designed to scale from 1 truck to 20 without changing the architecture.",
    CW - 8
  );
  doc.text(closeLines, M + 4, y + 14);
  y += 36;
  checkY(20);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  const conversionLines = doc.splitTextToSize(
    "If you find that managing this system manually is taking more than 4 hours a week, or you want professional oversight of your implementation, the LaunchPath Standard cohort provides the guided path.",
    CW
  );
  doc.text(conversionLines, M, y);

  doc.save("LaunchPath-0-30-90-Implementation-Guide.pdf");
}

export default function BundlePage() {
  const gold = "#C5A059";

  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#001530", borderBottom: `3px solid ${gold}`, padding: "72px 24px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "3rem", alignItems: "center" }} className="packet-hero-grid">
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem",
                }}>LP-BUNDLE-001 | NEW CARRIER DOCUMENT SYSTEM</p>

                <h1 style={{
                  fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#FFFFFF",
                  lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem",
                }}>New Carrier Document System</h1>

                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem", fontStyle: "italic",
                }}>
                  Full new-authority operating standard in document form — all five compliance domains, unified folder structure, and 0–30–90 day implementation guide.
                </p>

                {/* Price block */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "2rem",
                  flexWrap: "wrap", marginBottom: "1.5rem",
                }}>
                  <div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "2.5rem",
                      fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em",
                    }}>$497</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.45)", marginLeft: "0.75rem",
                    }}>vs. $605 purchased separately</span>
                  </div>
                  <a
                    href="https://launchpathedu.gumroad.com/l/NewCarrierDocumentSystem"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="bundle-buy-btn"
                    style={{
                      display: "inline-block", background: gold, color: "#001530",
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      padding: "1rem 2.25rem", textDecoration: "none", transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#d4b06a"}
                    onMouseLeave={e => e.currentTarget.style.background = gold}
                  >
                    Get on Gumroad →
                  </a>
                </div>

                {/* Standard inclusion line */}
                <div style={{
                  borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem",
                  padding: "0.875rem 1.25rem",
                  background: "rgba(197,160,89,0.06)",
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.75)", lineHeight: 1.7,
              }}>
                The complete document system is included for carriers enrolled in the LaunchPath Standard. If you're weighing both, that's worth knowing.
              </p>
            </div>
              </div>{/* end left col */}

              {/* Right: 3D book */}
              <div style={{ borderRadius: "6px", overflow: "hidden" }}>
                <BookMockup3D productId="bundle" mode="embed" />
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em",
                  textAlign: "center", marginTop: "0.5rem",
                }}>DRAG TO ROTATE</p>
              </div>
            </div>{/* end grid */}
          </FadeIn>
        </div>
      </section>
      <style>{`@media(max-width:760px){.packet-hero-grid{grid-template-columns:1fr!important;}}`}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>

        {/* Positioning */}
        <FadeIn>
          <SectionLabel>What This Is — And What It Is Not</SectionLabel>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            This is not an audit folder bundle or a collection of generic compliance downloads. It is a complete new-authority operating standard in document form — five domain-specific systems unified into a single implementation sequence that a carrier can install without a consultant.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.85, marginBottom: "3rem" }}>
            The competitor landscape includes $150–$550 DIY audit kits and $1,800+ filing-only bundles. This is neither. It is a complete operating standard priced above commodity kits and below consulting — intentionally. The content depth justifies it.
          </p>
        </FadeIn>

        <Divider />

        {/* What's included */}
        <FadeIn delay={80}>
          <SectionLabel>What's Included</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {PACKETS.map((p, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1rem 1.25rem",
                background: "#001530", border: "1px solid rgba(197,160,89,0.1)",
                borderLeft: `2px solid ${gold}`,
              }} className="packet-row">
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(197,160,89,0.65)", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{p.code}</p>
                  <Link to={p.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#FFFFFF", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = gold}
                    onMouseLeave={e => e.currentTarget.style.color = "#FFFFFF"}
                  >{p.title}</Link>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem", color: "rgba(255,255,255,0.45)" }}>{p.price}</span>
              </div>
            ))}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "1rem 1.25rem",
              background: "rgba(197,160,89,0.06)", border: `1px solid rgba(197,160,89,0.25)`,
              borderLeft: `2px solid ${gold}`,
            }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(197,160,89,0.65)", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>LP-GUIDE-001</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#FFFFFF" }}>0–30–90 Day Implementation Guide</p>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem", color: "rgba(197,160,89,0.65)" }}>Included</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "1rem 1.25rem",
              background: "rgba(197,160,89,0.06)", border: `1px solid rgba(197,160,89,0.25)`,
              borderLeft: `2px solid ${gold}`,
            }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#FFFFFF" }}>Unified Folder Structure — Company, DQ, Unit/Maintenance, Audit Grab Folder</p>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem", color: "rgba(197,160,89,0.65)" }}>Included</span>
            </div>
          </div>
        </FadeIn>

        <Divider />

        {/* 0-30-90 Guide */}
        <FadeIn delay={120}>
          <SectionLabel>The 0–30–90 Day Implementation Guide</SectionLabel>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            The guide that separates the $497 bundle from a folder of PDFs. It dictates the order of operations for installing all five packets in sequence — the DIY version of the LaunchPath Standard implementation sequence.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(197,160,89,0.1)", marginBottom: "2rem" }} className="phases-grid">
            {PHASES.map((ph, i) => (
              <div key={i} style={{ background: "#001530", padding: "1.5rem", borderTop: `2px solid ${gold}` }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: gold, letterSpacing: "0.12em", marginBottom: "0.5rem" }}>{ph.phase}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.5rem" }}>Focus: {ph.label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{ph.steps.length} steps</p>
              </div>
            ))}
          </div>
          <button
            onClick={downloadGuide}
            data-testid="download-guide-btn"
            style={{
              background: "transparent", border: `1px solid rgba(197,160,89,0.5)`,
              color: gold, fontFamily: "'Inter', sans-serif", fontWeight: 700,
              fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.875rem 1.75rem", cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(197,160,89,0.08)"; e.currentTarget.style.borderColor = gold; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)"; }}
          >
            Preview Implementation Guide (PDF) →
          </button>
        </FadeIn>

        <Divider />

        {/* Next Step — The Standard */}
        <FadeIn delay={180}>
          <div style={{
            background: "#001530", border: `1px solid rgba(197,160,89,0.15)`,
            borderLeft: `3px solid ${gold}`, padding: "2rem 2.5rem", marginBottom: "2rem",
          }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Next Step</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.8, marginBottom: "0.5rem" }}>
              The bundle is the complete DIY path. The LaunchPath Standard is the guided path — with a dedicated coach, a verified implementation sequence, and live compliance monitoring through the 90-day window.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Inside the Standard, the New Carrier Document System is not optional or discounted — it is automatically provided to every enrolled carrier as part of their cohort materials.
            </p>
            <Link to="/ground-0-briefing" style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.1em", textTransform: "uppercase", color: gold, textDecoration: "none",
            }}>
              Begin Ground 0 — The Standard Entry Point →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
            color: "rgba(255,255,255,0.4)", lineHeight: 1.7,
            borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem",
            fontStyle: "italic",
          }}>
            The New Carrier Document System is included at no additional cost for carriers enrolled in the LaunchPath Standard. Every enrolled carrier receives the full bundle as part of their cohort materials.
          </p>
        </FadeIn>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .phases-grid { grid-template-columns: 1fr !important; }
          .packet-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        }
      `}</style>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
      letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.75)",
      marginBottom: "1.5rem",
    }}>{children}</p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(197,160,89,0.1)", marginBottom: "3.5rem" }} />;
}
