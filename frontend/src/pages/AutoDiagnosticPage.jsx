import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";
import { ArrowRight } from "@phosphor-icons/react";

const VECTORS = [
  {
    num: "01",
    name: "Regulatory Violations",
    body: "Small compliance errors that trigger automatic federal review. What appears minor internally can initiate formal oversight externally.",
  },
  {
    num: "02",
    name: "Underwriting Isolation",
    body: "Missing or inconsistent information that causes insurers to restrict, cancel, or refuse coverage. Without underwriting support, authority becomes fragile.",
  },
  {
    num: "03",
    name: "Administrative Inconsistency",
    body: "Incomplete or poorly maintained documentation during audit review. When records do not align, confidence erodes.",
  },
  {
    num: "04",
    name: "Financial Structure Gaps",
    body: "Poor separation of revenue, reserves, and tax obligations. When financial structure is weak, cash flow destabilizes under pressure.",
  },
  {
    num: "05",
    name: "System Misalignment",
    body: "Operating practices that conflict with how regulators, insurers, and brokers evaluate risk. When your internal system does not match institutional expectations, access narrows.",
  },
];

export default function AutoDiagnosticPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "7rem 1.5rem 5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="overline" style={{ marginBottom: "1.25rem", animation: "heroEnter 0.65s ease both" }}>Standard Diagnostic Protocol</p>
          <h1 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em",
            lineHeight: 1.0, color: "var(--text)", marginBottom: "1rem",
            animation: "heroEnter 0.65s ease both", animationDelay: "0.1s",
          }}>
            The <span style={{ color: "var(--orange)" }}>AUTO</span> Diagnostic
          </h1>
          <p style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 600,
            fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)",
            color: "var(--text-muted)", letterSpacing: "0.04em",
            textTransform: "uppercase", marginBottom: "1rem",
            animation: "heroEnter 0.65s ease both", animationDelay: "0.15s",
          }}>
            Authority Under Total Observation: A Guarding Standard for New Motor Carriers
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.762rem",
            color: "var(--text-subtle)", letterSpacing: "0.1em",
            animation: "heroEnter 0.65s ease both", animationDelay: "0.2s",
          }}>
            Based on the OSHA "Point of Operation" Safety Protocol
          </p>
        </div>
      </section>

      {/* Factory Floor / Open Road */}
      <section style={{ padding: "6rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "1px", background: "var(--border)",
          }} className="two-col-grid">
            <FadeIn>
              <div style={{ background: "var(--bg-2)", padding: "3rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                  From the Factory Floor
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.85 }}>
                  In manufacturing, a machine without proper guarding can cause catastrophic injury. OSHA uses a simple tool — the <strong style={{ color: "var(--text)" }}>"gotcha stick"</strong> — to determine if a worker's body can{" "}
                  <em style={{ color: "var(--orange)" }}>reach</em> a machine's point of operation. If it can, the machine has failed its safety inspection.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div style={{ background: "var(--bg-2)", padding: "3rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                  To the Open Road
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.85 }}>
                  The AUTO Diagnostic is that gotcha stick for new motor carriers. It identifies where your operation is exposed to the five most common points of authority failure — before an auditor, underwriter, or enforcement action finds them first.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .two-col-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Five Vectors */}
      <section style={{ padding: "7rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ maxWidth: 600, marginBottom: "4.5rem" }}>
              <p className="overline" style={{ marginBottom: "1rem" }}>Five Points of Failure</p>
              <h2 style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em",
              }}>
                Hierarchical Exposure Vectors
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }} className="vectors-grid">
            {VECTORS.map((v, i) => (
              <FadeIn key={v.num} delay={i * 70}>
                <div style={{
                  background: "var(--bg)", padding: "2.5rem",
                  borderBottom: "none", height: "100%",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
                >
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--orange)", letterSpacing: "0.1em", marginBottom: "1rem" }}>{v.num}</p>
                  <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.875rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{v.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{v.body}</p>
                </div>
              </FadeIn>
            ))}
            {/* OSHA callout in the 6th cell */}
            <FadeIn delay={350}>
              <div style={{ background: "var(--bg-2)", padding: "2.5rem", height: "100%", border: "none" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>
                  OSHA STANDARD APPLIED
                </p>
                <p style={{
                  fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
                  fontSize: "1.2rem", color: "var(--text)", lineHeight: 1.4,
                  marginBottom: "1rem",
                }}>
                  "Can an auditor reach the defect?"
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>
                  If the vulnerability is accessible during review, corrective action will not be optional.
                </p>
              </div>
            </FadeIn>
          </div>
          <style>{`@media (max-width: 768px) { .vectors-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* Diagnostic Completion Note */}
      <section style={{ padding: "5rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ border: "1px solid var(--border)", padding: "2.5rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>
                DIAGNOSTIC COMPLETION
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                Completion of the AUTO Diagnostic marks the end of the{" "}
                <strong style={{ color: "var(--text)" }}>Orientation</strong> phase. Corrective action and systematic implementation are restricted to the admission phase.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.7, fontStyle: "italic" }}>
                This assessment is based on self-reported data. It is not a substitute for a legal audit. It is a structured first step in identifying structural vulnerabilities before they become record.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p className="overline" style={{ marginBottom: "1.5rem" }}>Verified Stewardship Before Operational Movement</p>
            <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
              Run the AUTO Diagnostic
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 2.5rem" }}>
              7 questions. 3 minutes. A GO, WAIT, or STOP classification that reflects where you actually stand.
            </p>
            <Link to="/reach-diagnostic"
              data-testid="run-diagnostic-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                background: "var(--orange)", color: "#fff",
                fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "1rem", letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >
              Begin the Diagnostic <ArrowRight size={15} weight="bold" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
