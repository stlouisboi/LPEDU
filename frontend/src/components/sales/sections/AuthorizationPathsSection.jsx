import { T, mono, serif, display } from "../tokens";
import { SectionLabel, CheckItem, ArrowItem, CTAButton } from "../SharedComponents";

export default function AuthorizationPathsSection({ admissionRef, handleAuthorize, handlePhased, checkoutLoading }) {
  return (
    <section ref={admissionRef} style={{ background: T.navyMid }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px clamp(20px, 5vw, 40px)" }}>
        <SectionLabel>LP-STD-001 · AUTHORIZATION · 12 CARRIERS MAXIMUM</SectionLabel>
        <h2 className="section-headline" style={{ ...display, fontSize: 48, color: T.white, lineHeight: 1.15, maxWidth: 680, marginBottom: 16 }}>
          Choose Your<br />
          <span style={{ color: T.goldText }}>Authorization Path.</span>
        </h2>
        <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
          Both paths install the same system. Both include all five Station Custodian checkpoints.
          The difference is timing and total investment.
        </p>

        <div className="two-col" style={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <div style={{ flex: 1, background: T.navyCard, border: `2px solid ${T.gold}`, padding: "36px 32px", position: "relative" }}>
            <div style={{ position: "absolute", top: -1, right: 24, background: T.gold, color: "#0B1220", ...mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", padding: "6px 12px" }}>
              ★ RECOMMENDED
            </div>
            <p style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.14em", marginBottom: 8 }}>SINGLE AUTHORIZATION</p>
            <p style={{ ...display, fontSize: 52, color: T.goldText, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>$2,500</p>
            <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, marginBottom: 28 }}>Full system access at enrollment</p>
            {["Full system access — all modules unlocked Day 1", "90-day implementation window begins immediately", "Station Custodian verification at all 5 checkpoints", "Pre-audit simulation — Week 11", "Verified Registry ID upon Integrity Audit completion"].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
            <CheckItem accent={T.gold}>Save $500 vs. the phased option</CheckItem>
            <div style={{ marginTop: 28 }}>
              <CTAButton data-testid="authorize-full-system-btn" primary onClick={handleAuthorize} disabled={checkoutLoading} style={{ width: "100%", textAlign: "center" }}>
                {checkoutLoading ? "PROCESSING..." : "AUTHORIZE FULL SYSTEM → $2,500"}
              </CTAButton>
            </div>
            <p style={{ ...mono, fontSize: 10, color: T.fog, textAlign: "center", marginTop: 10 }}>12 carriers maximum per cohort</p>
          </div>

          <div style={{ flex: 1, background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "36px 32px" }}>
            <p style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.14em", marginBottom: 8 }}>PHASED AUTHORIZATION</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <p style={{ ...display, fontSize: 52, color: T.goldText, fontWeight: 900, lineHeight: 1 }}>$1,500</p>
              <span style={{ ...mono, fontSize: 13, color: T.gold }}>today</span>
            </div>
            <p style={{ ...serif, fontSize: 17, color: T.fog, lineHeight: 1.7, marginBottom: 28 }}>+ $1,500 at Day 45 · $3,000 total</p>
            <p style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.12em", marginBottom: 12 }}>PHASE 1 — $1,500 AT ENROLLMENT</p>
            {["Ground 0 + Modules 1–4 access", "90-day implementation window begins", "Station Custodian verification, Checkpoints 1–3"].map((item, i) => <ArrowItem key={i}>{item}</ArrowItem>)}
            <div style={{ height: 1, background: T.navyBorder, margin: "20px 0" }} />
            <p style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.12em", marginBottom: 12 }}>PHASE 2 — $1,500 AT DAY 45</p>
            {["Modules 5–9 unlocked", "Checkpoints 4–5 verification", "Verified Registry ID upon Integrity Audit"].map((item, i) => <ArrowItem key={i}>{item}</ArrowItem>)}
            <div style={{ marginTop: 28 }}>
              <CTAButton data-testid="request-phased-auth-btn" primary={false} onClick={handlePhased} style={{ width: "100%", textAlign: "center" }}>
                REQUEST PHASED AUTHORIZATION →
              </CTAButton>
            </div>
            <p style={{ ...mono, fontSize: 10, color: T.fog, textAlign: "center", marginTop: 10 }}>$500 more than single authorization</p>
          </div>
        </div>

        <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, borderTop: "none", padding: "20px", textAlign: "center", marginBottom: 2 }}>
          <p style={{ ...display, fontSize: 18, color: T.white, fontWeight: 700 }}>Both paths get you to the same place. Full pay gets you there for $500 less.</p>
        </div>

        <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "32px 40px" }}>
          <p style={{ ...mono, fontSize: 10, color: T.gold, letterSpacing: "0.16em", marginBottom: 16 }}>WHAT DOESN'T CHANGE REGARDLESS OF PATH</p>
          <p style={{ ...serif, fontSize: 15, color: T.mist, lineHeight: 1.8 }}>
            The Station Custodian reviews your actual files. Not your plan. Not your intent. Your documents.
            Both authorization paths include all five verification checkpoints.
            Both issue the Verified Registry ID upon completion.
            The only difference is when you pay and when modules unlock.
          </p>
        </div>
      </div>
    </section>
  );
}
