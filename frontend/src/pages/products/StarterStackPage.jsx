import ProductPageTemplate from "../../components/ProductPageTemplate";
import FadeIn from "../../components/FadeIn";

const gold = "#d4900a";

const WHO_NOT_FOR = [
  "Carriers who already have structured compliance records and are ready to build domain-level systems.",
  "Operators looking for someone to complete their filings or manage their programs for them.",
  "Anyone who believes a checklist replaces a working compliance infrastructure.",
];

const WHAT_NOT_REPLACES = [
  "A qualified safety consultant for carriers under active enforcement action.",
  "Legal counsel for regulatory disputes or CSA intervention.",
  "The Domain Systems Bundle for carriers who need a complete, domain-by-domain document installation.",
];

const INCLUDED_DOCS = [
  {
    code: "LP-PKT-SINS",
    title: "16 Deadly Sins Pocket Guide",
    pages: 24,
    value: "$59",
    contents: [
      "16-Sin Self-Audit Checklist — Every item mapped to its CFR citation. Run this against your current operation to identify active exposure before an investigator does.",
      "GREEN / YELLOW / RED Risk Scoring — Each violation category is rated by severity. Know which gaps are fatal on audit day and which are correctable.",
      "7-Day Stabilization Plan — A sequenced response protocol for carriers who identify active deficiencies. What to do, in what order, within the first week.",
      "System Skeletons — Rapid-setup document structures for carriers who have gaps and need to build from scratch without a consultant.",
      "Monthly Verification Checklist — A recurring audit of the 16 sin categories. Designed to be run monthly by any owner-operator without a dedicated safety manager.",
    ],
  },
  {
    code: "LP-PKT-DQ",
    title: "DQ File Builder Kit",
    pages: 32,
    value: "$129",
    contents: [
      "Master DQ Checklist — Every required driver qualification file item, organized by 49 CFR Part 391 requirement with completion checkboxes and CFR citations.",
      "Driver Application Template — A Part 391-compliant application structured to capture all regulatory required data at the point of hire.",
      "Annual Review Certification Form — The annual driver record review documentation required under § 391.25. Includes review log and certification signature block.",
      "Previous Employer Inquiry Letter — The written request template for the 3-year employment history check required under § 391.23.",
      "Multi-Driver Audit Worksheet — A consolidated tracking sheet for fleets with 2–10 drivers. Identifies file gaps across the entire driver roster at a glance.",
      "Expiration Tracking Calendar — CDL renewals, medical certificate expiration, annual review cycles. One sheet that prevents the most common DQ file violations.",
    ],
  },
  {
    code: "LP-RES-004",
    title: "Safety Audit Prep Pack",
    pages: 28,
    value: "$169",
    contents: [
      "Document Pull List — The exact documents an FMCSA compliance investigator will request, organized by audit domain. Pull and organize these before any notice arrives.",
      "Mock Audit Self-Review Worksheet — Walk your own operation through the audit criteria. Identify deficiencies before the investigator does.",
      "48-Hour Response Sequence — A step-by-step protocol for carriers who have just received an audit notice. What to pull, organize, and have ready — and in what order.",
      "Safety Rating Interpretation Guide — An explanation of Satisfactory, Conditional, and Unsatisfactory ratings, what each means operationally, and what triggers each outcome.",
      "Audit-Ready Grab Folder Checklist — The 8-folder physical or digital filing system that places every audit document in a retrievable location before the investigator arrives.",
      "Common Findings Index — The most frequently cited violations by domain, mapped to the document that addresses each. Use this to close gaps fast.",
    ],
  },
];

export default function StarterStackPage() {
  return (
    <ProductPageTemplate
      label="LP-RES-006 | LAUNCHPATH STARTER STACK"
      title="LaunchPath Starter Stack"
      subtitle="Compliance Assessment + DQ Infrastructure + Audit Readiness — 3-Document System"
      price="$219"
      sku="LP-RES-006"
      image="https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/3e4a1a7c6cccefa64a3714b009dbfa366f636c720274436e5dce3d2ad6317e75.png"
      tagline="Three documents. 84 pages. The self-audit, the DQ file system, and the audit prep kit — in one acquisition at $138 off individual pricing."
      positioning={[
        "This is not a general compliance overview. The Starter Stack is a targeted acquisition for carriers who need to assess their current exposure, build their driver qualification file infrastructure, and establish audit readiness — without purchasing a full domain system.",
        "Each document in this stack operates independently. Run the self-audit first. Build the DQ files second. Use the audit prep pack as your ongoing readiness baseline. Together, they address the three most common enforcement failure points for small and new carrier operations.",
      ]}
      whatsInside={[
        "16 Deadly Sins Pocket Guide (LP-PKT-SINS · 24 pages · $59 value) — The 16-sin self-audit checklist with CFR citations, GREEN/YELLOW/RED risk scoring, 7-Day Stabilization Plan, System Skeletons, and Monthly Verification Checklist.",
        "DQ File Builder Kit (LP-PKT-DQ · 32 pages · $129 value) — Master DQ checklist, driver application template, annual review certification form, previous employer inquiry letter, multi-driver audit worksheet, and expiration tracking calendar.",
        "Safety Audit Prep Pack (LP-RES-004 · 28 pages · $169 value) — Document pull list, mock audit self-review, 48-hour response sequence, safety rating guide, Audit-Ready Grab Folder checklist, and common findings index.",
      ]}
      whoItsFor={[
        "New authorities in the first 6 months of operation who have not yet conducted a formal self-audit.",
        "Owner-operators who know their DQ files are incomplete and need a structured system to fix them.",
        "Carriers who have received an audit notice and need to organize immediately without a consultant.",
        "Small fleets (1–5 trucks) who want quarterly compliance verification without an ongoing advisory relationship.",
      ]}
      whatItReplaces={[
        "A compliance consultant charging $150–$300 per hour to tell you what's in your driver qualification files.",
        "Generic audit prep downloads that give you a checklist without regulatory context or filing architecture.",
        "Guesswork about which compliance gaps are critical versus which are manageable.",
      ]}
      nextStepText="The Starter Stack covers self-audit, DQ files, and audit readiness. The Domain Systems Bundle adds all five domain compliance packets — new entrant, drug and alcohol, HOS, maintenance, and insurance — plus the complete folder structure, implementation calendar, and master checklist."
      nextStepHref="/bundle"
      nextStepLabel="View the Document System Bundle ($499) →"
      standardInclusion={true}
    >

      {/* Document-by-document breakdown */}
      <FadeIn delay={155}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase", color: "#D85A30",
            marginBottom: "2rem",
          }}>Document Contents — Full Breakdown</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {INCLUDED_DOCS.map((doc, di) => (
              <div key={di} style={{
                background: "#0b1628",
                borderLeft: `3px solid rgba(212,144,10,0.4)`,
                padding: "1.75rem 2rem",
              }}>
                {/* Doc header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".5rem", marginBottom: "1.25rem" }}>
                  <div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                      letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)",
                      display: "block", marginBottom: "0.3rem",
                    }}>{doc.code} · {doc.pages} pages</span>
                    <h3 style={{
                      fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
                      fontSize: "1.2rem", color: "#FFF", margin: 0, lineHeight: 1.2,
                    }}>{doc.title}</h3>
                  </div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                    color: "rgba(212,144,10,0.65)",
                  }}>{doc.value} value</span>
                </div>

                {/* Contents list */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {doc.contents.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: "0.65rem",
                        color: gold, marginTop: "0.2rem", flexShrink: 0,
                        border: "1px solid rgba(212,144,10,0.2)", padding: "0.1rem 0.35rem",
                      }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                        color: "rgba(255,255,255,0.82)", lineHeight: 1.7,
                      }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Who This Is Not For */}
      <FadeIn delay={170}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase", color: "#D85A30",
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
      <FadeIn delay={180}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.20em", textTransform: "uppercase", color: "#D85A30",
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

      {/* Format */}
      <FadeIn delay={185}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 0 3.5rem" }} />
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
              }}>3 PDFs — immediate download upon purchase.<br />84 pages total. Print-ready. Checkbox layout throughout.</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)",
                marginBottom: "0.5rem",
              }}>Regulatory Standard</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                color: "rgba(255,255,255,0.6)", lineHeight: 1.65, letterSpacing: "0.04em",
              }}>49 CFR Parts 382, 383, 385, 390, 391<br />(citations current as of publication)</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)",
                marginBottom: "0.5rem",
              }}>Value</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                color: "rgba(255,255,255,0.75)", lineHeight: 1.65,
              }}>$357 individual value.<br />Starter Stack price: $219 — save $138.</p>
            </div>
          </div>
        </section>
      </FadeIn>

    </ProductPageTemplate>
  );
}
