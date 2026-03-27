import { T, mono, serif, display } from "../tokens";
import { CTAButton, GoldLine, SectionLabel, section } from "../SharedComponents";

export default function FinalCTASection({ handleAuthorize, checkoutLoading, handlePhased, handleBundle }) {
  return section(
    <>
      <SectionLabel>LP-STD-001 · ENROLLMENT · 12 CARRIERS MAXIMUM</SectionLabel>
      <h2 className="section-headline" style={{ ...display, fontSize: 56, color: T.white, lineHeight: 1.1, maxWidth: 640, marginBottom: 16 }}>
        Ready to Install<br />
        <span style={{ color: T.goldText }}>the System?</span>
      </h2>
      <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
        Admission is reviewed before enrollment is confirmed.
        The LaunchPath Standard is limited to 12 carriers per cohort.
        No payment is required at this step.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
          <CTAButton data-testid="final-authorize-full-btn" primary onClick={handleAuthorize} disabled={checkoutLoading}>
            {checkoutLoading ? "PROCESSING..." : "AUTHORIZE FULL SYSTEM → $2,500"}
          </CTAButton>
          <p style={{ ...mono, fontSize: 10, color: T.fog }}>START IMMEDIATELY</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
          <CTAButton data-testid="final-phased-auth-btn" primary={false} onClick={handlePhased}>REQUEST PHASED AUTHORIZATION →</CTAButton>
          <p style={{ ...mono, fontSize: 10, color: T.fog }}>$1,500 TODAY · $1,500 AT DAY 45 · $3,000 TOTAL</p>
        </div>
      </div>

      <GoldLine />

      <p style={{ ...serif, fontSize: 15, color: T.fog, marginBottom: 8 }}>
        Not ready for the full Standard?{" "}
        <span data-testid="bundle-link-final-cta" onClick={handleBundle} style={{ color: T.goldText, textDecoration: "underline", cursor: "pointer" }}>
          The $499 Document System
        </span>{" "}
        gives you all five compliance packets — you install it yourself, without the verification layer.
      </p>

      <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${T.navyBorder}` }}>
        <p style={{ ...mono, fontSize: 11, color: T.fog, lineHeight: 2 }}>
          Verified against 49 CFR · Current as of March 2026 ·{" "}
          <a href="/privacy-policy" style={{ color: T.fog, textDecoration: "underline", textUnderlineOffset: 3 }}>Privacy Policy</a>
          {" "}·{" "}
          <a href="/terms-of-service" style={{ color: T.fog, textDecoration: "underline", textUnderlineOffset: 3 }}>Terms of Service</a>
          <br />
          LaunchPath is an educational program. Content does not constitute legal, compliance, or financial advice.
        </p>
      </div>
    </>,
    T.navyMid
  );
}
