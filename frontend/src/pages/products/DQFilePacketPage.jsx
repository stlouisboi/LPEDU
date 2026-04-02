import ProductPageTemplate from "../../components/ProductPageTemplate";
import FadeIn from "../../components/FadeIn";

const gold = "#d4900a";

const WHO_NOT_FOR = [
  "Carriers who already have complete, current driver qualification files for every driver on their roster.",
  "Operators looking for a third party to build their DQ files for them — this is a document system, not a managed service.",
  "Anyone who believes a copy of a driver's CDL and medical card constitutes a complete DQ file.",
];

const WHAT_NOT_REPLACES = [
  "A qualified safety consultant for carriers under active enforcement action or with open violations.",
  "Legal counsel for regulatory disputes or driver employment matters.",
  "The full Domain Systems Bundle for carriers who need compliance infrastructure across all five domains.",
];

const CONTENTS = [
  {
    title: "Master DQ Checklist",
    desc: "Every required driver qualification file item organized by 49 CFR Part 391 requirement, with completion checkboxes and CFR citations for each entry. Run this against every driver file on your roster to identify gaps before an investigator does.",
  },
  {
    title: "Driver Application Template",
    desc: "A Part 391-compliant driver application structured to capture all regulatory required data at the point of hire — including the 10-year employment history requirement, accident disclosure, and controlled substances statement. Pre-filled with required fields.",
  },
  {
    title: "Annual Review Certification Form",
    desc: "The annual driver record review documentation required under § 391.25. Includes the motor vehicle record review log, annual certification signature block, and a compliance calendar reference for tracking renewal cycles across your driver roster.",
  },
  {
    title: "Previous Employer Inquiry Letter",
    desc: "The written request template for the 3-year employment history check required under § 391.23, including the drug and alcohol violation disclosure section and a response tracking log. Required before a driver operates under your authority.",
  },
  {
    title: "Multi-Driver Audit Worksheet",
    desc: "A consolidated gap-tracking sheet for fleets with 2–10 drivers. Displays every required DQ file element across your entire roster in a single view. Identifies missing or expiring documents at a glance — the format auditors use to review your files.",
  },
  {
    title: "Expiration Tracking Calendar",
    desc: "CDL renewals, medical certificate expirations, annual review cycles, and previous employer inquiry deadlines — all on one tracking sheet. Prevents the most common DQ file violation: expired records that were compliant at hire but never updated.",
  },
];

export default function DQFilePacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-DQ | DRIVER QUALIFICATION FILE BUILDER KIT"
      title="DQ File Builder Kit"
      subtitle="49 CFR Part 391 Compliance Document System — Driver Qualification"
      price="$129"
      sku="LP-PKT-DQ"
      image="https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/67647f90968a7ec9171089ba2a7c65339acd6b6c9f8c3f269144cdbb1488b789.png"
      tagline="The document system for building and maintaining driver qualification files that survive a 49 CFR Part 391 review."
      positioning={[
        "Driver qualification files are one of the most frequently cited deficiency areas in New Entrant Safety Audits. Most carriers have a CDL on file and believe that is sufficient. It is not. Part 391 requires a specific set of documents for every driver, collected in a specific sequence, retained for a specific period. This kit installs that system.",
        "The DQ File Builder Kit is not a service. It is a document architecture — six tools that build the file correctly at hire and keep it current through the audit window. Every item maps directly to a CFR citation. Nothing is added that regulation does not require.",
      ]}
      whatsInside={[
        "Master DQ Checklist — Every Part 391 required item with CFR citations and completion checkboxes. Run this against every driver file to identify gaps immediately.",
        "Driver Application Template — A Part 391-compliant application capturing all required data at the point of hire, including employment history, accident disclosure, and controlled substances statement.",
        "Annual Review Certification Form — The § 391.25 annual driver record review documentation with MVR log, certification signature block, and renewal cycle tracking.",
        "Previous Employer Inquiry Letter — The written 3-year employment history request required under § 391.23, with drug and alcohol violation disclosure section and response log.",
        "Multi-Driver Audit Worksheet — A single-view gap tracker for fleets with 2–10 drivers. Shows every required DQ element across the full roster at once.",
        "Expiration Tracking Calendar — CDL renewals, medical certificate expirations, annual review cycles, and inquiry deadlines on one sheet. Prevents the most common DQ violation.",
      ]}
      whoItsFor={[
        "New authorities who have not yet built a formal driver qualification file system and are approaching the audit window.",
        "Owner-operators adding their first driver and setting up DQ files for the first time.",
        "Small fleets whose DQ files are incomplete, expired, or assembled without a regulatory framework.",
        "Carriers whose DQ records were flagged or cited as deficient during a New Entrant Safety Audit.",
      ]}
      whatItReplaces={[
        "Paying a compliance consultant to tell you what belongs in a driver qualification file.",
        "Using informal file folders with no structure, no checklist, and no expiration tracking.",
        "Discovering that your driver files were built wrong — during the audit, not before it.",
      ]}
      nextStepText="The DQ File Builder Kit covers driver qualification infrastructure. The LaunchPath Starter Stack adds the 16 Deadly Sins self-audit and the Safety Audit Prep Pack — three documents, 84 pages, $138 off individual pricing."
      nextStepHref="/standards/starter-stack"
      nextStepLabel="View the Starter Stack ($219) →"
    >

      {/* Six-document breakdown */}
      <FadeIn delay={155}>
        <div style={{ height: 1, background: "rgba(212,144,10,0.1)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
            marginBottom: "2rem",
          }}>Document Contents — Full Breakdown</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {CONTENTS.map((item, i) => (
              <div key={i} style={{
                background: "#0b1628",
                borderLeft: `3px solid rgba(212,144,10,0.4)`,
                padding: "1.5rem 1.75rem",
                display: "flex", gap: "1.25rem", alignItems: "flex-start",
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.668rem", fontWeight: 700,
                  color: gold, border: "1px solid rgba(212,144,10,0.25)",
                  padding: "0.2rem 0.5rem", flexShrink: 0, marginTop: "0.15rem",
                  letterSpacing: "0.1em",
                }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 700,
                    color: "#fff", margin: "0 0 0.5rem", letterSpacing: "0.02em",
                  }}>{item.title}</p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: 0,
                  }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Who This Is Not For */}
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

      {/* What This Does Not Replace */}
      <FadeIn delay={175}>
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
                color: "rgba(255,255,255,0.68)", lineHeight: 1.7,
                paddingLeft: "1.25rem", position: "relative",
              }}>
                <span style={{ position: "absolute", left: 0, color: "rgba(255,255,255,0.2)" }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Format & Regulatory Standard */}
      <FadeIn delay={180}>
        <div style={{ height: 1, background: "rgba(212,144,10,0.1)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)",
                marginBottom: "0.5rem",
              }}>Format</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                color: "rgba(255,255,255,0.75)", lineHeight: 1.65,
              }}>PDF — immediate download upon purchase.<br />32 pages. Print-ready. Checkbox layout throughout.</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)",
                marginBottom: "0.5rem",
              }}>Regulatory Standard</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                color: "rgba(255,255,255,0.75)", lineHeight: 1.65, letterSpacing: "0.04em",
              }}>49 CFR Part 391</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Audit risk callout */}
      <FadeIn delay={185}>
        <div style={{
          background: "rgba(212,144,10,0.06)", border: "1px solid rgba(212,144,10,0.2)",
          borderLeft: `3px solid ${gold}`, padding: "1.5rem 1.75rem", marginBottom: "3.5rem",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase", color: gold, marginBottom: "0.75rem",
          }}>Already operating and behind on DQ files?</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.88)", lineHeight: 1.75,
          }}>
            If drivers are already under your authority and DQ files have not been built correctly, run the Master DQ Checklist first against every active driver file. The gaps it identifies are what an FMCSA investigator will find during your New Entrant Safety Audit — and incomplete DQ files are one of the fastest paths to an Unsatisfactory rating.
          </p>
        </div>
      </FadeIn>

    </ProductPageTemplate>
  );
}
