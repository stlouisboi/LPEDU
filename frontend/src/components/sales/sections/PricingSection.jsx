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
          <p style={{ ...mono, fontSize: 11, color: T.fog, marginBottom: 24 }}>FIRST COHORT PRICING · 12 CARRIERS MAX</p>
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

      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
        <CTAButton onClick={scrollToAdmission} primary>REQUEST ADMISSION → NO PAYMENT AT THIS STEP</CTAButton>
        <p style={{ ...mono, fontSize: 11, color: T.fog }}>DECISION WITHIN 24–48 HOURS</p>
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
