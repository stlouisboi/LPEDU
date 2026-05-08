import { T, mono, serif, display } from "../tokens";
import { CTAButton, CheckItem, CrossItem, GoldDivider, SectionLabel, section } from "../SharedComponents";

export default function PricingSection({ scrollToAdmission, handleBundle }) {
  return section(
    <>
      <SectionLabel>LP-STD-001 · INVESTMENT</SectionLabel>
      <h2 className="section-headline" style={{ ...display, fontSize: 48, color: T.white, lineHeight: 1.15, maxWidth: 780, marginBottom: 48 }}>
        What the Standard Costs.<br />
        <span style={{ color: T.goldText }}>What a Failed Audit Costs More.</span>
      </h2>

      <div className="two-col" style={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <div style={{ flex: 1, background: T.navyCard, border: `1px solid ${T.gold}`, padding: "36px 32px" }}>
          <p style={{ ...mono, fontSize: 10, color: T.gold, letterSpacing: "0.16em", marginBottom: 12 }}>THE STANDARD</p>
          <p style={{ ...display, fontSize: 52, color: T.goldText, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>$2,500</p>
          <p style={{ ...mono, fontSize: 11, color: T.fog, marginBottom: 16 }}>FIRST COHORT PRICING · 12 CARRIERS MAX</p>
          <p data-testid="payment-plan-callout" style={{ ...serif, fontSize: 14, color: "rgba(197,160,89,0.80)", lineHeight: 1.7, marginBottom: 20, padding: "10px 14px", border: "1px solid rgba(197,160,89,0.20)", background: "rgba(197,160,89,0.04)" }}>
            Payment plan available. $1,500 at enrollment · $1,500 at Day 30. Both options secure the same seat and the same system access.
          </p>
          <GoldDivider />
          {[
            "90-day guided implementation",
            "10 modules · 72 lessons · 17 hours",
            "5 Station Custodian verification checkpoints",
            "Pre-audit simulation — Week 11",
            "All 5 document system packets",
            "Verified Registry ID (LP-VRF) at completion",
            "Operator Portal access throughout",
          ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
          <p style={{ ...mono, fontSize: 11, color: T.fog, marginTop: 20 }}>Payment plans available — ask during admission review.</p>
        </div>

        <div style={{ flex: 1, background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "36px 32px" }}>
          <p style={{ ...mono, fontSize: 10, color: "#7A3535", letterSpacing: "0.16em", marginBottom: 12 }}>THE ALTERNATIVE</p>
          <p style={{ ...display, fontSize: 52, color: "#8B3535", fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>$10,000+</p>
          <p style={{ ...mono, fontSize: 11, color: T.fog, marginBottom: 24 }}>AVERAGE COST OF A FAILED NEW ENTRANT AUDIT</p>
          <GoldDivider />
          {[
            "Remediation fees",
            "Downtime while authority is under review",
            "Insurance policy cancellation and reinstatement",
            "Reapplication fees and waiting period",
            "Revenue loss during shutdown",
            "Conditional or Unsatisfactory safety rating on record",
            "87 days — average time to first compliance failure in an unstructured operation",
          ].map((item, i) => <CrossItem key={i}>{item}</CrossItem>)}
        </div>
      </div>

      <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, borderTop: "none", padding: "20px", textAlign: "center" }}>
        <p style={{ ...display, fontSize: 20, color: T.white, fontWeight: 700 }}>The Standard costs less than one audit failure.</p>
      </div>

      <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "40px", marginTop: 40 }}>
        <p style={{ ...mono, fontSize: 10, color: T.gold, letterSpacing: "0.16em", marginBottom: 20 }}>THE DIFFERENCE BETWEEN $499 AND $2,500</p>
        <p style={{ ...serif, fontSize: 16, color: T.mist, lineHeight: 1.8, marginBottom: 16 }}>
          The $499 Document System gives you every form and template in the Standard. The documents are identical.
        </p>
        <p style={{ ...serif, fontSize: 16, color: T.mist, lineHeight: 1.8, marginBottom: 16 }}>
          The difference is five human verification checkpoints. A Station Custodian reviews your actual
          compliance files — your DQ file, your D&A program, your maintenance records — against the same
          criteria an FMCSA investigator uses during a New Entrant audit.
        </p>
        <p style={{ ...serif, fontSize: 16, color: T.white, lineHeight: 1.8, fontWeight: 600 }}>
          An investigator who finds the gap charges you $10,000–$25,000 to correct it under scrutiny.
          The Station Custodian finds it first. That is what the $2,500 pays for.
        </p>
      </div>

      {/* LP-WEB-F Gap 1: Cohort Date Block */}
      <div data-testid="cohort-date-block" style={{ marginTop: 40, background: "rgba(197,160,89,0.05)", border: "1px solid rgba(197,160,89,0.22)", borderLeft: "3px solid rgba(197,160,89,0.60)", padding: "20px 24px", marginBottom: 20 }}>
        <p style={{ ...mono, fontSize: 10, color: "rgba(197,160,89,0.65)", letterSpacing: "0.18em", marginBottom: 12 }}>LP-COH-001 — NEXT COHORT</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ ...serif, fontSize: 14, color: T.mist, lineHeight: 1.6, margin: 0 }}><span style={{ color: T.goldText, fontWeight: 700 }}>Next cohort:</span> Coming Soon — Date TBD</p>
          <p style={{ ...serif, fontSize: 14, color: T.mist, lineHeight: 1.6, margin: 0 }}><span style={{ color: T.goldText, fontWeight: 700 }}>Applications close:</span> 7 days before cohort start</p>
          <p style={{ ...serif, fontSize: 14, color: T.mist, lineHeight: 1.6, margin: 0 }}><span style={{ color: T.goldText, fontWeight: 700 }}>Seats:</span> 12 carriers maximum</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
        <CTAButton onClick={scrollToAdmission} primary>REQUEST ADMISSION → NO PAYMENT AT THIS STEP</CTAButton>
        <p style={{ ...mono, fontSize: 11, color: T.fog }}>DECISION WITHIN 24–48 HOURS</p>

        {/* LP-WEB-F Gap 2: Post-Admission Path */}
        <div data-testid="post-admission-path" style={{ marginTop: 12, padding: "24px 28px", background: "rgba(11,18,32,0.60)", border: "1px solid rgba(255,255,255,0.08)", maxWidth: 600 }}>
          <p style={{ ...mono, fontSize: 10, color: T.gold, letterSpacing: "0.16em", marginBottom: 16 }}>WHAT HAPPENS AFTER ADMISSION</p>
          <p style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.12em", marginBottom: 10 }}>IF ADMITTED:</p>
          {[
            "You receive a Stripe payment link and portal access instructions within one business day.",
            "Payment confirms your seat.",
            "The 90-day installation clock starts on the cohort start date.",
            "No payment is collected at the application step.",
          ].map((line, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ color: T.goldText, fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
              <p style={{ ...serif, fontSize: 13, color: T.mist, lineHeight: 1.6, margin: 0 }}>{line}</p>
            </div>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "16px 0" }} />
          <p style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.12em", marginBottom: 10 }}>IF THE COHORT IS FULL OR THE TIMING IS NOT RIGHT:</p>
          {[
            "You are notified within 24–48 hours.",
            "You are added to the waitlist for the next cohort at no obligation.",
          ].map((line, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ color: T.goldText, fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
              <p style={{ ...serif, fontSize: 13, color: T.mist, lineHeight: 1.6, margin: 0 }}>{line}</p>
            </div>
          ))}
        </div>

        <p style={{ ...serif, fontSize: 14, color: T.fog, marginTop: 8 }}>
          Not ready for the full Standard?{" "}
          <span data-testid="bundle-link-pricing" onClick={handleBundle} style={{ color: T.goldText, textDecoration: "underline", cursor: "pointer" }}>
            The $499 Document System
          </span>{" "}
          gives you all five compliance packets — you install it yourself, without the verification layer.
        </p>
      </div>
    </>,
    T.navy
  );
}
