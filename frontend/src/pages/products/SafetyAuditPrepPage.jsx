import ProductPageTemplate from "../../components/ProductPageTemplate";
import FadeIn from "../../components/FadeIn";

const WHO_NOT_FOR = [
  "Carriers who have already passed their New Entrant Safety Audit without issues.",
  "Operators looking for someone to handle their audit response for them.",
  "Carriers wanting a generic compliance checklist with no FMCSA-specific context.",
];

const WHAT_NOT_REPLACES = [
  "Legal counsel for regulatory disputes or contested audit findings.",
  "A qualified safety manager for a growing fleet.",
  "The LaunchPath Standard for carriers who want guided implementation with professional oversight.",
];

export default function SafetyAuditPrepPage() {
  return (
    <ProductPageTemplate
      label="LP-RES-004 | SAFETY AUDIT PREP PACK"
      title="The #1 Audit-Prep and Response System for New Entrant Safety Audits."
      subtitle="Know exactly what to pull, what auditors ask for first, and what to do in the 48 hours after your notice — without reading 80 pages of FMCSA manuals."
      price="$169"
      sku="LP-RES-004"
      image="https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/f1ddc39e48c368c4ef812892aa94c6788efe10c117dc9a062c4d9c57d9dd07b5.png"
      ctaLabel="GET THE PREP PACK — $169 →"
      valuePoints={[
        "18-month audit window timeline — know when to be ready, not just what to have.",
        "Monthly mock audit + 3-Minute Quick Pulse — audit-ready in under 10 minutes a month.",
        "48-Hour Response Sequence and 30-Day Conditional Recovery Sprint — built for the notice that's already arrived.",
      ]}
      tagline="The audit-prep and response system built specifically for carriers inside the FMCSA New Entrant Safety Assurance Program — whether a notice has arrived or not."
      positioning={[
        "This is not a generic audit checklist. It is a structured readiness and response system — built around the 18-month window that every new motor carrier authority operates inside before their first New Entrant Safety Audit.",
        "The Safety Audit Prep Pack covers the full audit lifecycle: what to have in place before a notice arrives, what to pull in the first 48 hours after one does, and what to do in the 30 days following a Conditional rating.",
      ]}
      whatsInside={[
        "18-Month Audit Window Timeline — A visual and written breakdown of the FMCSA New Entrant Safety Assurance Program timeline, so you know when audit exposure is highest and what to have ready at each stage.",
        "Monthly Mock Audit Protocol — A structured self-review process you can run in under 10 minutes each month. Includes the 3-Minute Quick Pulse for rapid compliance pulse-checks between full reviews.",
        "48-Hour Response Sequence — The hour-by-hour response plan for the 48 hours after an audit notice arrives. Document pull list, contact checklist, and immediate action steps organized so nothing gets missed under pressure.",
        "Audit-Ready Grab Folder Architecture — The pre-organized folder structure for the documents auditors request most frequently. Set it up once and it's ready when the notice comes.",
        "30-Day Conditional Recovery Sprint — A structured 30-day remediation plan for carriers who receive a Conditional rating. Covers all six compliance domains with prioritized correction steps.",
      ]}
      whoItsFor={[
        "New motor carriers inside the 18-month New Entrant Safety Assurance Program monitoring window.",
        "Carriers who have received an audit notice and need an organized response immediately.",
        "Owner-operators who want to run monthly compliance checks without hiring a consultant.",
        "Small fleets (1–5 trucks) without a dedicated safety manager.",
      ]}
      whatItReplaces={[
        "A compliance consultant charging $500+ per audit response engagement.",
        "A generic FMCSA audit checklist with no timeline or response structure.",
        "Guesswork in the 48 hours after a notice arrives.",
      ]}
      nextStepText="This pack is included in the LaunchPath Starter Stack ($219) alongside the 16 Deadly Sins Pocket Guide and DQ File Builder Kit — bundled at 39% below individual cost."
      nextStepHref="/compliance-library"
      nextStepLabel="View the LaunchPath Starter Stack ($219) →"
    >
      <FadeIn delay={165}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
          color: "rgba(255,255,255,0.75)", lineHeight: 1.75,
          marginBottom: "3.5rem", fontStyle: "italic",
        }}>
          This pack gives you the timeline, the monthly protocol, and the 48-hour response sequence in one system — organized so you can implement it yourself before a notice arrives, or respond correctly after one does.
        </p>
      </FadeIn>

      <FadeIn delay={170}>
        <div style={{ height: 1, background: "rgba(212,144,10,0.1)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1.5rem",
          }}>Who This Is Not For</p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {WHO_NOT_FOR.map((item, i) => (
              <li key={i} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
                color: "rgba(255,255,255,0.88)", lineHeight: 1.7,
                paddingLeft: "1.25rem", position: "relative",
              }}>
                <span style={{ position: "absolute", left: 0, color: "rgba(248,113,113,0.7)" }}>×</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={180}>
        <div style={{ height: 1, background: "rgba(212,144,10,0.1)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "1.5rem",
          }}>What This Does Not Replace</p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {WHAT_NOT_REPLACES.map((item, i) => (
              <li key={i} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
                color: "rgba(255,255,255,0.88)", lineHeight: 1.7,
                paddingLeft: "1.25rem", position: "relative",
              }}>
                <span style={{ position: "absolute", left: 0, color: "rgba(248,113,113,0.7)" }}>×</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>
    </ProductPageTemplate>
  );
}
