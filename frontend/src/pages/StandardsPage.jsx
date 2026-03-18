import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";
import { FMCSADomainTable } from "../components/FMCSADomainTable";
import { DoctrineStack } from "../components/DoctrineStack";

const gold = "#d4900a";
const coral = "#D85A30";

const LADDER = [
  {
    tier: "$97–$127",
    label: "Individual Packets",
    desc: "Five domain-specific document systems. Each covers one compliance area with a regulatory brief, checklists, templates, and a folder structure. Buy one domain or build toward the full system.",
    href: "#packets",
    cta: "View Packets →",
    gold: false,
  },
  {
    tier: "$497",
    badge: "THE COMPLETE DIY SYSTEM",
    label: "New Carrier Document System",
    desc: "Install the full LaunchPath document architecture in one step. Includes all five packets, the 0–30–90 Day Implementation Guide, and the unified folder structure. $128 less than purchasing the five packets individually.",
    href: "/standards/new-carrier-document-system",
    cta: "View Bundle →",
    gold: true,
  },
  {
    tier: "$2,500",
    label: "LaunchPath Standard",
    desc: "The 90-day compliance operating standard with Station Custodian verification. Guided implementation, milestone checkpoints, and the complete document system included. Entry through Ground 0.",
    href: "/ground-0-briefing",
    cta: "Begin Ground 0 →",
    gold: false,
  },
];

const PACKETS = [
  { code: "LP-PKT-001", title: "New Entrant Compliance Packet",    subtitle: "FMCSA New-Authority Operating Standard",           price: "$97",  href: "/standards/new-entrant-packet",   desc: "Regulatory brief, pre-launch checklist, audit prep documentation index, folder architecture, and weekend install guide. The complete document system for the 18-month New Entrant monitoring period." },
  { code: "LP-PKT-002", title: "Drug & Alcohol Compliance Packet", subtitle: "Part 382 Compliance Operating Standard",            price: "$127", href: "/standards/drug-alcohol-packet",  desc: "Regulatory brief, program build checklist, 10-section policy outline, testing trigger log format, driver handout template, and folder architecture. The complete document system for Part 382 compliance." },
  { code: "LP-PKT-003", title: "HOS & Dispatch Packet",            subtitle: "Part 395 Hours-of-Service Operating Standard",     price: "$127", href: "/standards/hos-packet",           desc: "Regulatory brief, ELD compliance checklist, dispatch record structure, HOS documentation guide, and folder architecture. The complete document system for Part 395 compliance." },
  { code: "LP-PKT-004", title: "Maintenance & Unit File Packet",   subtitle: "Part 396 Fleet Maintenance Operating Standard",    price: "$127", href: "/standards/maintenance-packet",   desc: "Regulatory brief, per-VIN unit file checklist, fillable PM schedule template, defect and repair tracking sheet, and folder architecture. The complete document system for Part 396 compliance." },
  { code: "LP-PKT-005", title: "Insurance & Authority Packet",     subtitle: "Carrier Authority & Insurance Operating Standard", price: "$127", href: "/standards/insurance-packet",     desc: "Regulatory brief, authority accuracy checklist, BOC-3 verification guide, insurance filing tracker, and folder architecture. The complete document system for carrier authority compliance." },
];

const MATRIX_ROWS = [
  { feature: "All 5 compliance packets",              bundle: "check", standard: "check" },
  { feature: "Unified folder structure",              bundle: "check", standard: "check" },
  { feature: "0\u201330\u201390 implementation guide",bundle: "check", standard: "check" },
  { feature: "16 Deadly Sins doctrine",               bundle: { label: "Reference only" }, standard: "check" },
  { feature: "Station Custodian verification",        bundle: null,    standard: { label: "5 checkpoints" } },
  { feature: "90-day guided implementation",          bundle: null,    standard: "check" },
  { feature: "Cohort access and Q&A",                 bundle: null,    standard: "check" },
  { feature: "Installation method",                   bundle: { label: "Self-install" },   standard: { label: "Guided" } },
  { feature: "Entry requirement",                     bundle: { label: "Purchase direct" }, standard: { label: "Ground 0 completion" } },
];

export default function StandardsPage() {
  return (
    <div style={{ background: "#060d19", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>

        {/* Page Header */}
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem",
          }}>LP-SYS-LIBRARY | OPERATING STANDARDS</p>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF",
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem",
          }}>The LaunchPath Operating Standards Library</h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
            color: "#FFFFFF", lineHeight: 1.8, maxWidth: 580, marginBottom: "4rem",
          }}>
            Five domain-specific operating standards and one complete document architecture bundle — the DIY path to installing a compliant new-authority operating system. Designed for carriers building their compliance structure before seeking guided implementation.
          </p>
        </FadeIn>

        {/* FMCSA Audit Domain Mapping Table */}
        <FadeIn delay={40}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1.5rem",
          }}>FMCSA Audit Domain Coverage</p>
          <FMCSADomainTable showPricing={true} />
        </FadeIn>

        {/* Good Cop / Bad Cop connector */}
        <FadeIn delay={70}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px",
            background: "rgba(212,144,10,0.1)", marginBottom: "4rem",
          }} className="connector-grid">
            <div style={{ background: "#0b1628", padding: "2rem" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: "0.75rem",
              }}>What compliance looks like when it works.</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                color: "rgba(255,255,255,0.78)", lineHeight: 1.7,
              }}>
                The FMCSA Audit Domain Mapping Table shows exactly what an investigator reviews — and which LaunchPath packet covers each domain.
              </p>
            </div>
            <div style={{ background: "#0b1628", padding: "2rem" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", color: coral, marginBottom: "0.75rem",
              }}>What failure looks like before it arrives.</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                color: "rgba(255,255,255,0.78)", lineHeight: 1.7,
              }}>
                The 16 Deadly Sins are the operational behaviors that make compliant-looking records useless. The doctrine that prevents them is built into every packet.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginBottom: "4rem", marginTop: "-3rem" }}>
            <Link to="/standards/16-deadly-sins" style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.85rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: coral, textDecoration: "none",
              border: `1px solid rgba(216,90,48,0.35)`, padding: "0.625rem 1.5rem",
              display: "inline-block", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(216,90,48,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              View the 16 Deadly Sins — The LaunchPath Threat Model →
            </Link>
          </div>
        </FadeIn>

        {/* Doctrine Stack */}
        <FadeIn delay={85}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1.5rem",
          }}>Authority Survival Framework</p>
          <DoctrineStack />
        </FadeIn>

        {/* Three-Tier Ladder */}
        <FadeIn delay={100}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1rem",
          }}>The Commercial Ladder</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 620,
          }}>
            Every carrier starts in a different place. LaunchPath offers three paths: install the documents yourself, or implement the full operating standard with oversight.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(212,144,10,0.1)", marginBottom: "4rem" }}>
            {LADDER.map((tier, i) => (
              <div key={i} style={{
                background: tier.gold ? "#0b1628" : "#060d19",
                borderLeft: tier.gold ? `3px solid ${gold}` : "3px solid transparent",
                padding: "1.75rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "2rem", flexWrap: "wrap",
              }} className="ladder-row">
                <div style={{ flex: 1 }}>
                  {tier.badge && (
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "0.5rem",
                    }}>{tier.badge}</p>
                  )}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: gold }}>{tier.tier}</span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#FFFFFF" }}>{tier.label}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.65 }}>{tier.desc}</p>
                </div>
                {tier.href.startsWith("#") ? (
                  <a href={tier.href} style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: gold,
                    background: "transparent",
                    border: `1px solid rgba(212,144,10,0.4)`,
                    padding: "0.75rem 1.5rem", textDecoration: "none",
                    whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >{tier.cta}</a>
                ) : (
                <Link to={tier.href} style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: tier.gold ? "#0b1628" : gold,
                  background: tier.gold ? gold : "transparent",
                  border: `1px solid ${tier.gold ? gold : "rgba(212,144,10,0.4)"}`,
                  padding: "0.75rem 1.5rem", textDecoration: "none",
                  whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >{tier.cta}</Link>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* THE COMPLETE DIY SYSTEM */}
        <FadeIn delay={115}>
          <div style={{
            background: "#0b1628", border: `1px solid rgba(212,144,10,0.2)`,
            borderTop: `3px solid ${gold}`, padding: "2.5rem", marginBottom: "4rem",
          }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>THE COMPLETE DIY SYSTEM</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.75rem" }}>New Carrier Document System — $497</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 580 }}>
              Install the full LaunchPath document architecture in one step. Includes all five packets, the 0–30–90 Day Implementation Guide, and the unified folder structure. $128 less than purchasing the five packets individually.
            </p>
            <Link to="/standards/new-carrier-document-system" style={{
              display: "inline-block", background: gold, color: "#0b1628",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.875rem 2rem", textDecoration: "none", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >View Bundle →</Link>
          </div>
        </FadeIn>

        {/* SYSTEM MODULES */}
        <FadeIn delay={130}>
          <p id="packets" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "0.6rem",
          }}>System Modules</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
            color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "1.5rem", fontStyle: "italic",
          }}>Each packet installs one domain of the LaunchPath operating standard.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(212,144,10,0.1)", marginBottom: "4rem" }}>
            {PACKETS.map((p, i) => (
              <div key={i} style={{
                background: "#060d19", padding: "1.5rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "2rem", flexWrap: "wrap",
              }} className="ladder-row">
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(212,144,10,0.6)", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>{p.code}</p>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", marginBottom: "0.2rem" }}>{p.title}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "rgba(212,144,10,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{p.subtitle}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", color: "rgba(255,255,255,0.55)" }}>{p.price}</span>
                  <Link to={p.href} style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                    letterSpacing: "0.1em", textTransform: "uppercase", color: gold,
                    border: `1px solid rgba(212,144,10,0.4)`, padding: "0.625rem 1.25rem",
                    textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,144,10,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >View →</Link>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Comparison Matrix — Bundle vs Standard */}
        <FadeIn delay={145}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1.5rem",
          }}>LP-SPEC-001 | Comparison Matrix</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.35rem",
            color: "#FFFFFF", letterSpacing: "-0.01em", marginBottom: "2rem",
          }}>LaunchPath System Comparison</h2>
          {/* Mobile scroll hint */}
          <p className="matrix-scroll-hint" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            color: "rgba(212,144,10,0.5)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            textAlign: "right",
            display: "none",
          }}>SCROLL TABLE →</p>
          <div style={{ overflowX: "auto", marginBottom: "4rem" }}>
            <table data-testid="comparison-matrix" style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
              <colgroup>
                <col style={{ width: "40%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{
                    textAlign: "left", padding: "0.875rem 1rem",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
                    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.08)",
                    background: "#060d19",
                  }}>Feature</th>
                  <th style={{
                    textAlign: "center", padding: "1rem 0.875rem 0.875rem",
                    background: "rgba(212,144,10,0.07)", borderTop: "3px solid #d4900a",
                    borderBottom: "1px solid rgba(212,144,10,0.2)",
                    borderLeft: "1px solid rgba(212,144,10,0.15)",
                    borderRight: "1px solid rgba(212,144,10,0.15)",
                  }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.2rem" }}>DIY System</p>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: gold }}>$497</p>
                  </th>
                  <th style={{
                    textAlign: "center", padding: "1rem 0.875rem 0.875rem",
                    background: "#080f1e", borderTop: "2px solid rgba(255,255,255,0.2)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Guided Implementation</p>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF" }}>$2,500</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#060d19" : "rgba(0,21,48,0.45)" }}>
                    <td style={{
                      padding: "0.875rem 1rem",
                      fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.82)", lineHeight: 1.5,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>{row.feature}</td>
                    <td style={{
                      textAlign: "center", padding: "0.875rem 0.875rem",
                      background: i % 2 === 0 ? "rgba(212,144,10,0.06)" : "rgba(212,144,10,0.04)",
                      borderBottom: "1px solid rgba(212,144,10,0.1)",
                      borderLeft: "1px solid rgba(212,144,10,0.15)",
                      borderRight: "1px solid rgba(212,144,10,0.15)",
                    }}>
                      <MatrixCell value={row.bundle} col="bundle" />
                    </td>
                    <td style={{
                      textAlign: "center", padding: "0.875rem 0.875rem",
                      background: i % 2 === 0 ? "#080f1e" : "#001020",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      borderLeft: "1px solid rgba(255,255,255,0.06)",
                    }}>
                      <MatrixCell value={row.standard} col="standard" />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "1.25rem 1rem" }} />
                  <td style={{
                    textAlign: "center", padding: "1.25rem 0.875rem",
                    background: "rgba(212,144,10,0.08)",
                    borderTop: "1px solid rgba(212,144,10,0.2)",
                    borderLeft: "1px solid rgba(212,144,10,0.15)",
                    borderRight: "1px solid rgba(212,144,10,0.15)",
                  }}>
                    <Link to="/standards/new-carrier-document-system" style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.72rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "#0b1628", background: gold, textDecoration: "none",
                      padding: "0.5rem 0.875rem", display: "inline-block", transition: "opacity 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >View Bundle →</Link>
                  </td>
                  <td style={{
                    textAlign: "center", padding: "1.25rem 0.875rem",
                    background: "#080f1e",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <Link to="/ground-0-briefing" style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.72rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: gold, textDecoration: "none",
                      border: `1px solid rgba(212,144,10,0.35)`, padding: "0.5rem 0.875rem",
                      display: "inline-block", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(212,144,10,0.08)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >Apply for Admission →</Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </FadeIn>

      </main>

      <FooterSection />

      <style>{`
        .ladder-row { transition: background 0.15s; }
        @media (max-width: 680px) {
          .ladder-row { flex-direction: column; align-items: flex-start !important; }
          .connector-grid { grid-template-columns: 1fr !important; }
          .matrix-scroll-hint { display: block !important; }
        }
      `}</style>
    </div>
  );
}

function MatrixCell({ value, col }) {
  if (value === "check") {
    return (
      <span style={{
        fontSize: "1rem",
        color: col === "bundle" ? "#d4900a" : "#0F6E56",
        fontWeight: 700,
      }}>✓</span>
    );
  }
  if (value === null) {
    return <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.9rem" }}>—</span>;
  }
  if (value && value.label) {
    return (
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem",
        color: col === "bundle" ? "#d4900a" : "#FFFFFF",
        fontWeight: 600, letterSpacing: "0.04em",
      }}>{value.label}</span>
    );
  }
  return null;
}
