import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const gold = "#C5A059";
const navy = "#002244";

const PRODUCTS = [
  {
    sku: "LP-GUIDE-001",
    title: "The 16 Deadly Sins Pocket Guide",
    price: "$17",
    desc: "Maps all 16 conditions that generate critical findings in FMCSA New Entrant Safety Audits. Each exposure point paired with the specific refuge system that eliminates it. Includes a status review worksheet to assess your current compliance position.",
    gumroadUrl: "#",
    upgradeLabel: "Upgrade: New Entrant Compliance Packet ($97)",
    upgradeHref: "/standards/new-entrant-packet",
  },
  {
    sku: "LP-KIT-001",
    title: "DQ File Builder Kit",
    price: "$37",
    desc: "Everything required to build a complete, audit-ready Driver Qualification File under 49 CFR Part 391. Includes assembly checklist, gap diagnostic for up to four drivers, retention schedule, and owner-operator self-filing guide.",
    gumroadUrl: "#",
    upgradeLabel: "Upgrade: New Entrant Compliance Packet ($97)",
    upgradeHref: "/standards/new-entrant-packet",
  },
  {
    sku: "LP-KIT-002",
    title: "New Carrier Compliance Starter Kit",
    price: "$47",
    desc: "The authority activation sequence from LLC formation through first legal dispatch. Includes pre-dispatch compliance checklist, required registrations reference, insurance minimums chart, and a 90-day compliance calendar covering the full New Entrant monitoring window.",
    gumroadUrl: "#",
    upgradeLabel: "Upgrade: Insurance & Authority Packet ($127)",
    upgradeHref: "/standards/insurance-packet",
  },
  {
    sku: "LP-PACK-001",
    title: "Safety Audit Prep Pack",
    price: "$67",
    desc: "Prepares your documentation for the FMCSA New Entrant Safety Audit before the notice arrives. Covers all six audit categories, common findings and how to prevent them, audit conduct guidance, and a corrective action plan template.",
    gumroadUrl: "#",
    upgradeLabel: "Upgrade: New Entrant Compliance Packet ($97)",
    upgradeHref: "/standards/new-entrant-packet",
  },
  {
    sku: "LP-BLUEPRINT-001",
    title: "Four Pillars Compliance Blueprint",
    price: "$97",
    desc: "The complete framework for building and maintaining motor carrier operating authority. Covers all four pillars (Authority Protection, Insurance Continuity, Compliance Backbone, Cash-Flow Oxygen), the 16 Deadly Sins diagnostic, the 90-day implementation roadmap, and the REACH risk assessment.",
    gumroadUrl: "#",
    upgradeLabel: "View the full Standard →",
    upgradeHref: "/ground-0-briefing",
  },
];

export default function ComplianceLibraryPage() {
  return (
    <div style={{ background: "#F0F2F4", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero — full-width background image with overlay */}
      <div style={{ position: "relative", borderBottom: `3px solid ${gold}`, overflow: "hidden" }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/vpafe5mz_compliance-docs.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(0,20,50,0.92) 40%, rgba(0,20,50,0.70) 100%)",
        }} />

        {/* Text content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 5rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem",
          }}>LP-SYS-LIBRARY | COMPLIANCE RESOURCES</p>

          <h1 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 580,
          }}>Compliance Reference Library</h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.80)",
            lineHeight: 1.7, maxWidth: 520, marginBottom: "1rem",
          }}>
            Standalone tools for new motor carrier operators. Each resource targets a specific compliance problem — no course enrollment required.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(197,160,89,0.85)",
            lineHeight: 1.7, maxWidth: 520,
          }}>
            These are not course materials. They are diagnostic and reference tools built on the LaunchPath Four Pillars framework. Buy what you need, use it immediately.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }} className="product-grid">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.sku} product={p} index={i} />
          ))}
        </div>
      </div>

      {/* Bundle Banner */}
      <div style={{
        background: navy,
        borderTop: `3px solid ${gold}`,
        borderBottom: `3px solid ${gold}`,
      }}>
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "3rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: gold,
              marginBottom: "0.6rem",
            }}>LP-BUNDLE-001</p>

            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              marginBottom: "0.4rem",
            }}>Complete Compliance Library</h2>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: gold,
              fontWeight: 600,
              marginBottom: "0.6rem",
            }}>All five products — $197 <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "rgba(197,160,89,0.6)" }}>(save $68)</span></p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              maxWidth: 460,
            }}>
              Every LaunchPath compliance reference document in one download. Individual value $265.
            </p>
          </div>

          <a
            href="#"
            data-testid="bundle-library-buy-btn"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: gold,
              border: `2px solid ${gold}`,
              background: "transparent",
              padding: "1rem 2rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = gold;
              e.currentTarget.style.color = navy;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = gold;
            }}
          >
            Download Bundle — $197
          </a>
        </div>
      </div>

      {/* How These Relate */}
      <div style={{ background: "#FFFFFF", borderTop: "1px solid #DDE0E4" }}>
        <div style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
            color: navy,
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            marginBottom: "1.5rem",
          }}>These are the reference tools.<br />The Standard is the implementation system.</h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.8,
            marginBottom: "1rem",
          }}>
            Each resource in this library targets a specific compliance problem — diagnosing gaps, building a file, preparing for an audit. They tell you what you need and map the framework.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
          }}>
            The LaunchPath Standard installs it. Seventy-two video lessons. Eighty-four implementation tools. The 90-Day Installation phase followed by the 18-Month Continuity Standard — structured maintenance through the full FMCSA new entrant monitoring window.
          </p>

          <Link
            to="/ground-0-briefing"
            data-testid="library-ground0-cta"
            style={{
              display: "inline-block",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: navy,
              padding: "1rem 2.25rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#001A33"}
            onMouseLeave={e => e.currentTarget.style.background = navy}
          >
            Begin with Ground 0 →
          </Link>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ background: "#F0F2F4", borderTop: "1px solid #DDE0E4", padding: "1.75rem 1.5rem", textAlign: "center" }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.78rem",
          color: "#888",
          lineHeight: 1.7,
          maxWidth: 680,
          margin: "0 auto",
          fontStyle: "italic",
        }}>
          All documents current as of March 2026. Verify current regulatory requirements at ecfr.gov. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
        </p>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .product-grid { grid-template-columns: 1fr !important; }
          .hero-img-wrap { display: none; }
        }
      `}</style>
    </div>
  );
}

function ProductCard({ product, index }) {
  return (
    <div
      data-testid={`product-card-${product.sku.toLowerCase()}`}
      style={{
        background: "#FFFFFF",
        border: "1px solid #DDE0E4",
        borderTop: `3px solid ${gold}`,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,34,68,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* SKU */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: gold,
      }}>{product.sku}</p>

      {/* Title + Price row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <h3 style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: navy,
          lineHeight: 1.25,
          flex: 1,
        }}>{product.title}</h3>

        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "1.4rem",
          color: gold,
          flexShrink: 0,
        }}>{product.price}</span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.875rem",
        color: "#555",
        lineHeight: 1.7,
        flex: 1,
      }}>{product.desc}</p>

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "auto" }}>
        <a
          href={product.gumroadUrl}
          data-testid={`buy-btn-${product.sku.toLowerCase()}`}
          target={product.gumroadUrl !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            background: navy,
            padding: "0.875rem 1.5rem",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = gold}
          onMouseLeave={e => e.currentTarget.style.background = navy}
        >
          Download — {product.price}
        </a>

        <Link
          to={product.upgradeHref}
          data-testid={`upgrade-btn-${product.sku.toLowerCase()}`}
          style={{
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: gold,
            textDecoration: "none",
            letterSpacing: "0.04em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {product.upgradeLabel} →
        </Link>
      </div>
    </div>
  );
}
