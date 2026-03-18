import { useState } from "react";
import { Link } from "react-router-dom";

const gold = "#C5A059";
const navy = "#002244";

const DOMAINS = [
  {
    num: "01",
    domain: "Authority & Identity",
    asks: "USDOT status, MC authority, BOC-3, MCS-150, UCR registration",
    packet: "New Entrant Packet",
    href: "/standards/new-entrant-packet",
  },
  {
    num: "02",
    domain: "Driver Qualification Files",
    asks: "CDL, medical certificate, MVR, driver application, road test, pre-employment drug test",
    packet: "New Entrant Packet",
    href: "/standards/new-entrant-packet",
  },
  {
    num: "03",
    domain: "Drug & Alcohol Program",
    asks: "C/TPA enrollment, Clearinghouse queries, written policy, pre-employment test results, random testing records",
    packet: "Drug & Alcohol Packet",
    href: "/standards/drug-alcohol-packet",
  },
  {
    num: "04",
    domain: "Hours of Service",
    asks: "ELD registration, driver logs or ELD records, supporting documents, dispatch compliance",
    packet: "HOS & Dispatch Packet",
    href: "/standards/hos-packet",
  },
  {
    num: "05",
    domain: "Vehicle Maintenance",
    asks: "Annual inspections, DVIRs, PM schedule, repair orders",
    packet: "Maintenance & Unit File Packet",
    href: "/standards/maintenance-packet",
  },
  {
    num: "06",
    domain: "Insurance & Financial Responsibility",
    asks: "BMC-91X filing on record, policy verification, coverage minimums met",
    packet: "Insurance & Authority Packet",
    href: "/standards/insurance-packet",
  },
  {
    num: "07",
    domain: "Accident Register",
    asks: "Accident log for qualifying accidents — 3-year retention",
    packet: "New Entrant Packet (audit prep checklist)",
    href: "/standards/new-entrant-packet",
  },
];

// showPricing: true on /standards, false on homepage
export function FMCSADomainTable({ showPricing = true }) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    const url = window.location.origin + "/standards#audit-domains";
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <div id="audit-domains" style={{ marginBottom: "4rem" }}>
      {/* Mobile scroll hint */}
      <p className="table-scroll-hint" style={{
        display: "none",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.62rem",
        color: "rgba(197,160,89,0.5)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "0.5rem",
        textAlign: "right",
      }}>SCROLL TABLE →</p>

      <div style={{ overflowX: "auto", position: "relative" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr>
              {["FMCSA Audit Domain", "What the Investigator Asks For", "LaunchPath Packet"].map((h, i) => (
                <th key={i} style={{
                  background: navy,
                  color: gold,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.875rem 1rem",
                  textAlign: i === 2 ? "center" : "left",
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOMAINS.map((row, i) => (
              <tr key={i} className="fmcsa-row" style={{ background: i % 2 === 0 ? "#020408" : "rgba(0,21,48,0.5)" }}>
                <td style={{ padding: "0.875rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.35)",
                    display: "block", marginBottom: "0.2rem",
                  }}>{row.num}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}>{row.domain}</span>
                </td>
                <td style={{
                  padding: "0.875rem 1rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.55,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  {row.asks}
                </td>
                <td style={{
                  padding: "0.875rem 1rem",
                  textAlign: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <Link to={row.href} style={{
                    display: "inline-block",
                    background: navy,
                    color: gold,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "3px 9px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    border: `1px solid rgba(197,160,89,0.3)`,
                    whiteSpace: "nowrap",
                    transition: "border-color 0.15s",
                  }}>
                    {row.packet}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer callout */}
      <div style={{
        borderLeft: `3px solid ${gold}`,
        background: "rgba(0,21,48,0.6)",
        borderRadius: "0 6px 6px 0",
        padding: "1.25rem 1.5rem",
        marginTop: "1px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
      }}>
        <div>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "0.35rem",
          }}>Every audit domain. One document system.</p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.68)",
            lineHeight: 1.6,
          }}>
            The New Carrier Document System covers all seven domains across five packets
            {showPricing && " — $497 or included in the LaunchPath Standard"}.
          </p>
        </div>
        <button
          data-testid="copy-audit-link-btn"
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
            flexShrink: 0,
            alignSelf: "center",
          }}
        >
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>

      <style>{`
        .fmcsa-row:hover td { background: rgba(197,160,89,0.04) !important; }
        @media (max-width: 700px) {
          .table-scroll-hint { display: block !important; }
        }
      `}</style>
    </div>
  );
}
