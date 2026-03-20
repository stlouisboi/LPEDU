import { Link } from "react-router-dom";

const mono = "'Inter', sans-serif";
const gold = "#d4900a";
const navy = "#0b1628";

/**
 * BriefBundleCTA
 * "Download All 5 Checklists" bundle banner shown at the bottom of each brief.
 */
export default function BriefBundleCTA() {
  return (
    <div style={{
      background: navy,
      borderTop: `3px solid ${gold}`,
      padding: "2.5rem 2rem",
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
      }}>
        <div>
          <p style={{
            fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: gold, marginBottom: "0.5rem",
          }}>LP-SPEC-001 — DOCUMENT SYSTEM BUNDLE</p>
          <p style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "1.3rem", color: "#FFFFFF", lineHeight: 1.2, marginBottom: "0.4rem",
          }}>
            New Carrier Document System — All 5 Compliance Packets
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.55)", lineHeight: 1.6,
          }}>
            Driver files, maintenance records, HOS systems, drug program, insurance controls. $497. Ships as a complete operational package.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", flexShrink: 0 }}>
          <a
            href="https://launchpathedu.gumroad.com/l/NewCarrierDocumentSystem"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="brief-bundle-buy-btn"
            style={{
              display: "block", textAlign: "center",
              background: gold, color: "#060d19",
              fontFamily: mono, fontWeight: 700,
              fontSize: "0.714rem", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0.9rem 1.75rem", textDecoration: "none",
              transition: "background 0.2s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = gold}
          >
            DOWNLOAD ALL 5 PACKETS — $497 →
          </a>
          <Link
            to="/auto-diagnostic"
            data-testid="brief-bundle-reach-link"
            style={{
              textAlign: "center", fontFamily: mono, fontSize: "0.762rem",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(212,144,10,0.65)", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = gold}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(212,144,10,0.65)"}
          >
            Run the REACH Assessment →
          </Link>
        </div>
      </div>
    </div>
  );
}
