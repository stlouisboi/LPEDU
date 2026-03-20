import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

export default function BriefComingSoon({ code, title, category, phase, description }) {
  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "var(--bg)", padding: "6rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem" }}>
            ← Operational Library
          </Link>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>
            {code} — {category}
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.5rem" }}>
            90-Day Authority Clock Deep-Dive · Phase: {phase}
          </p>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            {title}
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 580 }}>
            {description}
          </p>

          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, color: "rgba(212,144,10,0.85)", background: "rgba(212,144,10,0.08)", border: "1px solid rgba(212,144,10,0.25)", padding: "0.3rem 0.875rem", letterSpacing: "0.10em", textTransform: "uppercase" }}>
            Brief in preparation
          </span>
        </div>
      </section>

      {/* Coming soon body */}
      <section style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1.5rem" }}>
            LP-SYS-001 | BRIEF STATUS
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 600 }}>
            This brief is part of the 90-Day Authority Clock deep-dive series. Full content covering regulatory citations, checklist steps, and operational installation guidance is being prepared and will be published shortly.
          </p>

          <div style={{ borderLeft: "2px solid rgba(212,144,10,0.35)", paddingLeft: "1.25rem", paddingTop: "1rem", paddingBottom: "1rem", background: "rgba(212,144,10,0.04)", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.5rem" }}>
              In this brief
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>
              Regulatory requirements active during this phase · Documentation that must be in place · Common gaps that become audit findings · Checklist for the installation window
            </p>
          </div>

          <Link
            to="/knowledge-center"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(212,144,10,0.80)", textDecoration: "none", letterSpacing: "0.04em", borderBottom: "1px solid rgba(212,144,10,0.25)", paddingBottom: "1px" }}
          >
            ← Return to Operational Library
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
