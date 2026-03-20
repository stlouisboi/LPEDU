import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";

const LADDER = [
  {
    tier: "Free",
    label: "Knowledge Center",
    desc: "Regulatory briefs, compliance explainers, and the complete checklist series. The foundation — no purchase required.",
    href: "/knowledge-center",
    cta: "Access Free →",
    gold: false,
  },
  {
    tier: "$97–$127",
    label: "Individual Packets",
    desc: "Five domain-specific operating standards. New Entrant, Drug & Alcohol, HOS & Dispatch, Maintenance, Insurance & Authority. Install one domain at a time.",
    href: "#packets",
    cta: "View Packets →",
    gold: false,
  },
  {
    tier: "$497",
    badge: "THE COMPLETE DIY SYSTEM",
    label: "New Carrier Document System",
    desc: "Install the full LaunchPath document architecture in one step. Includes all five packets, the 0\u201330\u201390 Day Implementation Guide, and the unified folder structure.",
    href: "/products/new-carrier-document-system",
    cta: "View Bundle →",
    gold: true,
  },
  {
    tier: "$2,500",
    label: "LaunchPath Standard",
    desc: "The guided path. A dedicated coach, a verified implementation sequence, live compliance monitoring, and the full document system — included. For carriers who want professional oversight through the 90-day window.",
    href: "/ground-0-briefing",
    cta: "Begin Ground 0 →",
    gold: false,
  },
];

const PACKETS = [
  { code: "LP-PKT-001", title: "New Entrant Packet", subtitle: "FMCSA New-Authority Operating Standard", price: "$97", href: "/products/new-entrant-packet", desc: "The 18-month monitoring period framework, DQ file system, and new entrant audit preparation." },
  { code: "LP-PKT-002", title: "Drug & Alcohol Packet", subtitle: "Part 382 Compliance Operating Standard", price: "$127", href: "/products/drug-alcohol-packet", desc: "Enrollment documentation, clearinghouse logs, and supervisor training records." },
  { code: "LP-PKT-003", title: "HOS & Dispatch Packet", subtitle: "Part 395 Hours-of-Service Operating Standard", price: "$127", href: "/products/hos-packet", desc: "ELD compliance, dispatch logs, and hours documentation." },
  { code: "LP-PKT-004", title: "Maintenance & Unit File Packet", subtitle: "Part 396 Fleet Maintenance Operating Standard", price: "$127", href: "/products/maintenance-packet", desc: "Per-VIN unit files, inspection documentation, and maintenance logs." },
  { code: "LP-PKT-005", title: "Insurance & Authority Packet", subtitle: "Carrier Authority & Insurance Operating Standard", price: "$127", href: "/products/insurance-packet", desc: "Authority accuracy, BOC-3 compliance, and insurance filing verification." },
];

const MATRIX_ROWS = [
  { feature: "Domain-Specific Brief",    individual: "check", bundle: "check", standard: "check" },
  { feature: "Operational Checklists",   individual: "check", bundle: "check", standard: "check" },
  { feature: "Templates & Forms",        individual: "check", bundle: "check", standard: "check" },
  { feature: "Unified Folder Structure", individual: null,    bundle: "check", standard: "check" },
  { feature: "0\u201330\u201390 Day Guide", individual: null, bundle: "check", standard: "check" },
  { feature: "Audit-Ready \"Grab Folder\"", individual: null, bundle: "check", standard: "check" },
  { feature: "Cost Savings vs. Individual Packets", individual: null,    bundle: { label: "Save $128" }, standard: { label: "Included" } },
  { feature: "Guided Implementation",    individual: null,    bundle: null,    standard: { label: "Full Support" } },
  { feature: "Cohort Access & Q&A",      individual: null,    bundle: null,    standard: { label: "Included" } },
  { feature: "TCO & Financial Tools",    individual: null,    bundle: null,    standard: { label: "Included" } },
];

export default function ProductsPage() {
  const gold = "#d4900a";

  return (
    <div style={{ background: "#060d19", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#0b1628", borderBottom: `3px solid ${gold}`, padding: "72px 24px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem",
            }}>LP-SYS-LIBRARY | OPERATING STANDARDS</p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF",
              lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem",
            }}>The LaunchPath Operating Standards Library</h1>
            <p style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.1rem",
              color: "#FFFFFF",
              lineHeight: 1.8, maxWidth: 580,
            }}>
              Five domain-specific operating standards and one complete document architecture bundle — the DIY path to installing a compliant new-authority operating system. Designed for carriers building their compliance structure before seeking guided implementation.
            </p>
          </FadeIn>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>

        {/* Commercial Ladder */}
        <FadeIn>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1rem",
          }}>The Commercial Ladder</p>
          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 620,
          }}>
            Every carrier starts in a different place. LaunchPath offers three paths: learn the system, install the documents yourself, or implement the full operating standard with oversight.
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
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: gold, marginBottom: "0.5rem",
                    }}>{tier.badge}</p>
                  )}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.85rem", color: gold }}>{tier.tier}</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.05rem", color: "#FFFFFF" }}>{tier.label}</span>
                  </div>
                  <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.65 }}>{tier.desc}</p>
                </div>
                <Link to={tier.href} style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.8rem",
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
              </div>
            ))}
          </div>
        </FadeIn>

        {/* THE COMPLETE DIY SYSTEM — Featured Bundle */}
        <FadeIn delay={90}>
          <div style={{
            background: "#0b1628", border: `1px solid rgba(212,144,10,0.2)`,
            borderTop: `3px solid ${gold}`, padding: "2.5rem", marginBottom: "4rem",
          }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>THE COMPLETE DIY SYSTEM</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.75rem" }}>New Carrier Document System — $497</h2>
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 580 }}>
              Install the full LaunchPath document architecture in one step. Includes all five packets, the 0–30–90 Day Implementation Guide, and the unified folder structure. $128 less than purchasing the five packets individually.
            </p>
            <Link to="/products/new-carrier-document-system" style={{
              display: "inline-block", background: gold, color: "#0b1628",
              fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.875rem 2rem", textDecoration: "none", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >View Bundle →</Link>
          </div>
        </FadeIn>

        {/* SYSTEM MODULES */}
        <FadeIn delay={130}>
          <p id="packets" style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "0.6rem",
          }}>System Modules</p>
          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.9rem",
            color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "1.5rem",
            fontStyle: "italic",
          }}>Each packet installs one domain of the LaunchPath operating standard.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(212,144,10,0.1)", marginBottom: "4rem" }}>
            {PACKETS.map((p, i) => (
              <div key={i} style={{
                background: "#060d19", padding: "1.5rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "2rem", flexWrap: "wrap",
              }} className="ladder-row">
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "rgba(212,144,10,0.6)", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>{p.code}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", marginBottom: "0.2rem" }}>{p.title}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", color: "rgba(212,144,10,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{p.subtitle}</p>
                  <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1rem", color: "rgba(255,255,255,0.55)" }}>{p.price}</span>
                  <Link to={p.href} style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.8rem",
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

        {/* Bundle CTA */}
        <FadeIn delay={160}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1.5rem",
          }}>LP-SPEC-001 | Comparison Matrix</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.35rem",
            color: "#FFFFFF", letterSpacing: "-0.01em", marginBottom: "2rem",
          }}>LaunchPath System Comparison</h2>
          <div style={{ overflowX: "auto", marginBottom: "4rem" }}>
            <table data-testid="comparison-matrix" style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <colgroup>
                <col style={{ width: "32%" }} />
                <col style={{ width: "22.7%" }} />
                <col style={{ width: "22.7%" }} />
                <col style={{ width: "22.7%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{
                    textAlign: "left", padding: "0.875rem 1rem",
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem",
                    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.08)",
                    background: "#060d19",
                  }}>Feature / Deliverable</th>

                  {/* Individual column */}
                  <th style={{
                    textAlign: "center", padding: "1rem 0.875rem 0.875rem",
                    background: "#0b1628", borderTop: "2px solid rgba(255,255,255,0.2)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Individual Packet</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF" }}>$97–$127</p>
                  </th>

                  {/* Bundle column — gold highlight */}
                  <th style={{
                    textAlign: "center", padding: "1rem 0.875rem 0.875rem",
                    background: "rgba(212,144,10,0.07)", borderTop: "3px solid #d4900a",
                    borderBottom: "1px solid rgba(212,144,10,0.2)",
                    borderLeft: "1px solid rgba(212,144,10,0.15)",
                    borderRight: "1px solid rgba(212,144,10,0.15)",
                  }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Recommended DIY</p>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>New Carrier System</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: gold }}>$497</p>
                  </th>

                  {/* Standard column — institutional */}
                  <th style={{
                    textAlign: "center", padding: "1rem 0.875rem 0.875rem",
                    background: "#080f1e", borderTop: "2px solid rgba(255,255,255,0.15)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>LaunchPath Standard</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF" }}>$2,500</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {MATRIX_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#060d19" : "rgba(0,21,48,0.45)" }}>
                    <td style={{
                      padding: "0.875rem 1rem",
                      fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.72)", lineHeight: 1.5,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>{row.feature}</td>

                    <td style={{
                      textAlign: "center", padding: "0.875rem 0.875rem",
                      background: i % 2 === 0 ? "#0b1628" : "#001730",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      borderLeft: "1px solid rgba(255,255,255,0.06)",
                    }}>
                      <MatrixCell value={row.individual} col="individual" />
                    </td>

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
                    background: "#0b1628",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <a href="#packets" style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.72rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.6)", textDecoration: "none",
                      border: "1px solid rgba(255,255,255,0.2)", padding: "0.5rem 0.875rem",
                      display: "inline-block", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                    >View Packets ↓</a>
                  </td>
                  <td style={{
                    textAlign: "center", padding: "1.25rem 0.875rem",
                    background: "rgba(212,144,10,0.08)",
                    borderTop: "1px solid rgba(212,144,10,0.2)",
                    borderLeft: "1px solid rgba(212,144,10,0.15)",
                    borderRight: "1px solid rgba(212,144,10,0.15)",
                  }}>
                    <Link to="/products/new-carrier-document-system" style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.72rem",
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
                      fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.72rem",
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

      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .ladder-row { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 560px) {
          table[data-testid="comparison-matrix"] { font-size: 0.82rem; }
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
        color: col === "bundle" ? "#d4900a" : col === "standard" ? "#FFFFFF" : "rgba(255,255,255,0.65)",
        fontWeight: col === "bundle" ? 700 : 400,
      }}>✓</span>
    );
  }
  if (value === null) {
    return <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.9rem" }}>—</span>;
  }
  if (value && value.label) {
    return (
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem",
        color: col === "bundle" ? "#d4900a" : "#FFFFFF",
        fontWeight: 600, letterSpacing: "0.04em",
      }}>{value.label}</span>
    );
  }
  return null;
}
