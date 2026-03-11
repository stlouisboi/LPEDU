import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";

const RISK_PATTERNS = [
  {
    category: "Under-Reporting Units or Drivers",
    items: [
      "Regularly using trucks or leased-on drivers not listed on the policy to keep the quote low.",
      "Adding units mid-term without notifying the agent — coverage gap opens the moment the new truck is dispatched.",
      "Leased operators treated as 'independent' without confirming how the policy handles non-listed drivers.",
    ],
  },
  {
    category: "Expanding Operations Without Re-Underwriting",
    items: [
      "Moving into higher-risk commodities (hazmat, refrigerated, oversized) without adjusting limits or classifications.",
      "Running longer haul lanes or crossing into new operating areas without updating declarations.",
      "Taking on contract or spot freight outside your typical profile without checking policy conditions.",
    ],
  },
  {
    category: "Silent Authority Inactivation",
    items: [
      "Missing a renewal or monthly payment — policy cancels, insurer files a BMC-91 withdrawal, MC authority goes inactive.",
      "Not monitoring FMCSA L&I records, so the carrier keeps running while the public record shows 'inactive.'",
      "Assuming the agent handles filing notifications without verifying acceptance with FMCSA.",
    ],
  },
  {
    category: "MCS-90 Misunderstanding",
    items: [
      "Assuming MCS-90 means 'covered no matter what' — it protects the public up to minimums, not you beyond your policy.",
      "Not understanding that insurers can seek reimbursement from the carrier when MCS-90 pays a claim excluded by the policy.",
      "Misrepresenting the operation at underwriting, then being surprised when MCS-90 reimbursement is pursued after a crash.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Pull your FMCSA L&I snapshot and confirm authority status and required limits.",
    why: "Verifies your authority is active and shows exactly what level of financial responsibility FMCSA expects you to maintain.",
  },
  {
    step: "02",
    action: "Reconcile your fleet roster with your policy declarations.",
    why: "Ensures every unit you run is scheduled or otherwise covered under the policy you are relying on.",
  },
  {
    step: "03",
    action: "Reconcile your CDL driver roster with your policy and underwriting file.",
    why: "Reduces the risk of unreported drivers creating coverage disputes after a claim.",
  },
  {
    step: "04",
    action: "Confirm current BMC-91/BMC-91X filings are on file and match your insurer.",
    why: "Proves your insurer has an active filing supporting your MC number, which is required for legal interstate operations.",
  },
  {
    step: "05",
    action: "Verify MCS-90 (when required) and other key endorsements are present.",
    why: "Shows you meet federal financial responsibility requirements and that public liability is protected.",
  },
  {
    step: "06",
    action: "Review upcoming renewal and payment dates and set reminders.",
    why: "Prevents accidental cancellations and filing withdrawals that could silently inactivate your authority.",
  },
  {
    step: "07",
    action: "Compare your last 90 days of freight to your policy classifications and limits.",
    why: "Confirms your coverage still matches the commodities, lanes, and exposures you actually run.",
  },
  {
    step: "08",
    action: "Create or update an \"Insurance & Authority\" binder or digital folder.",
    why: "Lets you respond quickly when auditors, shippers, or attorneys ask how you are insured and at what limits.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "Authority & FMCSA Records",
    items: [
      "Current L&I snapshot showing MC and USDOT status, operating authority type, and insurance filings",
      "Operating authority certificate (MC number) and USDOT registration",
      "Any recent FMCSA correspondence about authority, revocation, or reinstatement",
      "BOC-3 process agent designation on file",
    ],
  },
  {
    num: "02",
    title: "Policy & Endorsements",
    items: [
      "Current policy declarations with limits, covered autos, and key forms",
      "MCS-90 endorsement (where required) and any other regulatory endorsements",
      "Any special conditions, exclusions, or warranties that affect your operations",
      "Confirmation that policy classifications match your actual freight and lanes",
    ],
  },
  {
    num: "03",
    title: "Filings & Evidence of Financial Responsibility",
    items: [
      "Confirmation or printout showing active BMC-91/BMC-91X filings with effective dates and insurer name",
      "Documentation of any prior cancellations and reinstatements with dates",
      "Proof of required UCR registration — current year",
      "Cargo insurance certificate if required by shippers or brokers",
    ],
  },
  {
    num: "04",
    title: "Fleet & Driver Reconciliation",
    items: [
      "Current fleet roster with unit numbers, VINs, plates, garaging locations",
      "Current CDL driver roster with hire dates and roles",
      "Simple reconciliation sheet showing how each unit and driver ties to the policy",
      "Documentation of any leased-on drivers or owner-operator agreements",
    ],
  },
  {
    num: "05",
    title: "Notes & Renewal Plan",
    items: [
      "Summary of your last renewal: rate changes, coverage changes, and reasons",
      "A one-page renewal plan: when you start quoting, what information you provide, how you decide on limits",
      "Agent contact log — key conversations and decisions documented",
      "Reminder dates: renewal, payment due dates, UCR opening window",
    ],
  },
];

function SectionHeader({ overline, title, id }) {
  return (
    <div style={{ marginBottom: "2rem" }} id={id}>
      {overline && (
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem",
        }}>{overline}</p>
      )}
      <h2 style={{
        fontFamily: "'Manrope', sans-serif", fontWeight: 700,
        fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em",
        color: "var(--text)", lineHeight: 1.25,
      }}>{title}</h2>
    </div>
  );
}

function Body({ children, style = {} }) {
  return (
    <p style={{
      fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)",
      lineHeight: 1.85, marginBottom: "1.25rem", ...style,
    }}>{children}</p>
  );
}

function Callout({ label, children }) {
  return (
    <div style={{
      borderLeft: "2px solid var(--orange)", paddingLeft: "1.25rem", paddingTop: "1rem",
      paddingBottom: "1rem", paddingRight: "1.25rem", background: "var(--bg-2)", marginBottom: "1.5rem",
    }}>
      {label && (
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.6rem",
        }}>{label}</p>
      )}
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>—</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function InsuranceContinuityBrief() {
  const handlePrint = () => window.print();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section data-testid="article-hero" style={{ background: "var(--bg)", padding: "6rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", color: "var(--text-subtle)",
            textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex",
            alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem",
          }}>← Knowledge Center</Link>

          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.5rem" }}>
            Compliance Systems — Insurance & Authority (49 CFR Part 387)
          </p>

          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            Insurance Continuity Brief:<br />What Your Policy and Filings Actually Have to Prove
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.176rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            How FMCSA, insurers, and attorneys read your insurance file — and how to keep your authority active and insurable when rates move or a claim hits.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>14–16 minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Required before first interstate dispatch
            </span>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY BAND ── */}
      <section data-testid="exec-summary" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="summary-grid">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "See what federal insurance rules actually require for for-hire carriers, including minimum liability limits and proof of financial responsibility.",
                "Understand how filings like BMC-91/BMC-91X and endorsements like MCS-90 work together to keep your authority active — and what happens when they are pulled.",
                "Learn the most common failure patterns in new entrants: under-reporting units and drivers, missing cancellations, and silent authority inactivations after non-payment.",
                "Use a practical 90-day checklist so your insurance, filings, and fleet reality match any day an auditor, insurer, or plaintiff's attorney pulls your file.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }} className="download-col">
            <button onClick={handlePrint} data-testid="download-checklist-top" style={{
              background: "none", border: "1px solid var(--border)", color: "var(--text-muted)",
              fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 600,
              padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em",
              transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap", display: "block", marginBottom: "0.5rem",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download insurance<br />continuity checklist (PDF)</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── BODY — SECTIONS 1–3 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="What the Insurance Rules Are Really Trying to Control" id="what-rules-control" />
          <Body>
            Federal insurance rules are not about making sure you have "some policy on file." They are about proving you can pay for the damage you cause up to certain minimum limits, and that the public will not be left uncompensated after a crash.
          </Body>
          <Body>
            For most property carriers, minimum liability limits start at $750,000 and go higher for certain commodities — oil and hazardous materials among them. Those limits must be backed by acceptable financial responsibility mechanisms on file with FMCSA. Endorsements like MCS-90 are designed to guarantee payment to the public up to those minimums, even if your policy would otherwise deny coverage.
          </Body>
          <Callout label="Plain English">
            This system is not about whether your agent gave you a card. It is about whether your real operation and real policy match what you told FMCSA — and whether the public gets paid if you hurt someone.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="How Filings and Endorsements Actually Work" id="filings-endorsements" />

          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>Minimum financial responsibility and Part 387</h3>
          <Body>
            Part 387 sets minimum levels of financial responsibility for motor carriers of property and prescribes how carriers must prove they meet those levels. A motor carrier may not operate until it has obtained and has in effect the minimum levels required, and must maintain proof at its place of business in the form of an MCS-90 endorsement, surety bond, or self-insurance authorization.
          </Body>
          <Body>
            For most for-hire property carriers hauling non-hazardous freight in interstate commerce with vehicles over 10,000 pounds, that minimum is $750,000 in public liability — with higher limits for certain hazardous materials categories.
          </Body>

          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "2rem" }}>BMC-91/BMC-91X filings: how your authority comes alive</h3>
          <Body>
            Your insurance company proves to FMCSA that you have required liability coverage by filing forms such as BMC-91 or BMC-91X. A BMC-91 is a filing from a single insurer certifying your policy meets federal minimums. A BMC-91X is used when multiple insurers provide layers of coverage that together meet the requirement.
          </Body>
          <Body>
            These filings are effectively non-cancelable without notice — insurers must give FMCSA advance notice (typically 30 days) before canceling. Without an active filing your MC number cannot remain active in interstate commerce.
          </Body>
          <Callout label="How your authority stays alive">
            Your operating authority is physically tied to a live BMC-91/BMC-91X filing from your insurer. When that filing goes away, your authority goes with it — whether or not you know it happened.
          </Callout>

          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "2rem" }}>MCS-90: what it guarantees — and what it doesn't</h3>
          <Body>
            The MCS-90 endorsement obligates the insurer to pay judgments for bodily injury, property damage, or environmental restoration up to federal minimums — even if the underlying policy would otherwise exclude the loss. It is designed to protect the public, not to expand your coverage beyond what you bought.
          </Body>
          <Body>
            Insurers may seek reimbursement from the carrier when MCS-90 is triggered in situations excluded by the policy. If you under-report or misrepresent your operation at underwriting, MCS-90 can save the victim but then come back to bill you.
          </Body>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="What Has to Be in Your Insurance System on Day 1" id="day-one-system" />
          <Body>On Day 1 as a 1–3-truck carrier, you need more than a policy number. You need a matched set of realities.</Body>

          {[
            {
              title: "Operating authority and policy aligned",
              items: [
                "The authority you apply for matches the operations, routes, and commodities you actually run.",
                "Your policy declarations accurately reflect vehicle types, garaging locations, radius, and driver pool.",
              ],
            },
            {
              title: "Filings and endorsements correctly issued",
              items: [
                "The insurer files the correct BMC-91 or BMC-91X with FMCSA and confirms it has been accepted, activating your authority.",
                "The policy includes required endorsements including MCS-90 to meet federal financial responsibility requirements.",
              ],
            },
            {
              title: "Internal change-control rule",
              items: [
                "No new unit, no new CDL driver, and no new class of freight or radius expansion without same-day notice to your agent.",
                "You treat this as part of your dispatch checklist, not an afterthought.",
              ],
            },
          ].map((block) => (
            <div key={block.title} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.875rem" }}>{block.title}</h3>
              <BulletList items={block.items} />
            </div>
          ))}

          <Callout label="Without these three pieces">
            You risk having your filings pulled, claims denied, or your authority inactivated without realizing it until a shipper or trooper checks your status.
          </Callout>
        </div>

      </main>

      {/* ── RISK PATTERNS — full-width band ── */}
      <section data-testid="risk-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 4</p>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Patterns That Create the Most Insurance and Authority Risk
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            Insurance and authority failures usually show up as patterns, not one-off mistakes. When your insurance file, FMCSA records, and real operation don't match, you are setting yourself up for both regulatory action and painful claim disputes after a serious crash.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)" }}>
            {RISK_PATTERNS.map((pattern) => (
              <div key={pattern.category} style={{ background: "var(--bg-2)", padding: "2rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", paddingBottom: "0.875rem", borderBottom: "1px solid var(--border)", marginBottom: "1.25rem" }}>{pattern.category}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {pattern.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", marginTop: "0.25rem", flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY — SECTION 5 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 5" title="The LaunchPath Insurance Operating Standard" id="insurance-standard" />
          <Body>Instead of treating insurance as a once-a-year renewal event, you run it like part of your compliance operating system — with a defined file, defined inputs, and a quarterly rhythm.</Body>

          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>System inputs</h3>
          <Body>Five sources feed your insurance standard:</Body>
          <BulletList items={[
            "FMCSA records: your public L&I snapshot — authority status, active filings, required limits.",
            "Policy documents: declarations pages, endorsements including MCS-90, and any special conditions.",
            "Fleet roster: current list of units with VINs, plates, garaging locations, and in-service status.",
            "Driver roster: current CDL drivers, hire dates, and whether they operate under your authority.",
            "Operations profile: commodities, lanes, and customer requirements you are actually running.",
          ]} />

          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "1rem" }}>Quarterly behaviors</h3>
          <BulletList items={[
            "Compare your fleet roster and driver list against what your policy declarations show as covered units and drivers. Document and correct discrepancies.",
            "Review your L&I record to confirm authority is active, required filings are on file, and there are no pending cancellations.",
            "Look at the freight you actually hauled and confirm your limits, endorsements, and classifications still fit your risk profile.",
            "Document conversations and decisions with your agent in a simple 'Insurance Notes' log so you can show how you managed your risk.",
          ]} />

          <Callout label="The question you should always be able to answer">
            Who is insured to drive what, for which freight, under which authority, and at what limits? On paper, without guessing.
          </Callout>
        </div>
      </main>

      {/* ── 90-DAY CHECKLIST TABLE ── */}
      <section data-testid="insurance-checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6</p>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            90-Day Insurance Continuity Readiness Checklist
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Use this in the 90 days before an audit, renewal, or major shipper onboarding — or as a recurring quarterly review.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "0.98rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Step", "Action", "Why It Matters"].map(h => (
                    <th key={h} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", textAlign: "left", padding: "0 1rem 1rem 0", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CHECKLIST_STEPS.map((row) => (
                  <tr key={row.step} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.05em", padding: "1rem 1.25rem 1rem 0", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.step}</td>
                    <td style={{ padding: "1rem 1.25rem 1rem 0", color: "var(--text-muted)", lineHeight: 1.65, verticalAlign: "top", maxWidth: 340 }}>{row.action}</td>
                    <td style={{ padding: "1rem 0", color: "var(--text-subtle)", lineHeight: 1.65, verticalAlign: "top", fontSize: "0.952rem" }}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── INSURANCE & AUTHORITY BINDER ── */}
      <section data-testid="insurance-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6 — Supplement</p>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            Insurance & Authority File — 2026
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            This file becomes your front-of-house for shippers, lenders, and auditors who want to see whether you take insurance and authority seriously. Keep it current. Keep it retrievable.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", marginBottom: "2.5rem" }}>
            {BINDER_TABS.map((tab) => (
              <div key={tab.num} className="binder-tab" style={{ background: "var(--bg)", padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem", paddingBottom: "0.875rem", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", letterSpacing: "0.1em" }}>TAB {tab.num}</span>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", lineHeight: 1.3 }}>{tab.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {tab.items.map((item, i) => (
                    <label key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginTop: "0.2rem", flexShrink: 0, accentColor: "var(--orange)", width: 14, height: 14 }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={handlePrint} data-testid="download-binder-btn" style={{
            background: "none", border: "1px solid var(--border)", color: "var(--text-muted)",
            fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 600,
            padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >Print / Save Insurance File as PDF</button>
        </div>
      </section>

      {/* ── BODY — SECTIONS 7–8 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 7" title="When Your Policy and Filings Don't Match Your Operation" id="mismatch" />
          <Body>
            If your insurance paperwork, FMCSA filings, and real-world operation don't match, you have the same twin risk you saw in the other briefs: safety and credibility. On the regulatory side, operating without required filings or below minimum limits can lead to authority inactivation and enforcement.
          </Body>
          <Body>
            On the claims side, serious gaps — unreported units, misclassified operations, excluded freight — can fuel coverage disputes, MCS-90 reimbursement actions, and tougher treatment in litigation. When you find gaps, correct them, document what changed, and do not attempt to retroactively clean records without addressing the underlying mismatch.
          </Body>
          <Callout label="Audit posture">
            It is better to show that you intentionally keep your insurance and authority aligned — even if you had to correct mistakes — than to argue after a crash that you "didn't know" what your policy and filings actually covered.
          </Callout>
        </div>

        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Pull your L&I snapshot today. Look at your declarations page. See if they match.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            Most carriers have never compared their FMCSA record to their policy declarations side by side. That comparison takes 15 minutes and tells you everything about whether your insurance system is real or just paperwork.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a href="https://www.launchpathedu.com/auto-diagnostic" target="_blank" rel="noopener noreferrer" data-testid="article-diagnostic-cta"
              style={{ display: "inline-block", background: "var(--orange)", color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.98rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >Run the Ground 0 Readiness Test</a>
            <button onClick={handlePrint} data-testid="download-checklist-cta" style={{
              background: "none", border: "1px solid var(--border)", color: "var(--text-muted)",
              fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", fontWeight: 600,
              padding: "1rem 2rem", cursor: "pointer", letterSpacing: "0.03em", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download Insurance Continuity Checklist (PDF)</button>
          </div>
        </div>
      </main>

      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .summary-grid { grid-template-columns: 1fr !important; }
          .download-col { text-align: left !important; }
        }
        @media print {
          body * { visibility: hidden; }
          .audit-binder-section, .audit-binder-section * { visibility: visible; }
          .audit-binder-section { position: absolute; left: 0; top: 0; width: 100%; background: white !important; color: black !important; padding: 2rem !important; }
          .audit-binder-section h2, .audit-binder-section h3 { color: black !important; }
          .audit-binder-section p, .audit-binder-section span, .audit-binder-section label { color: #333 !important; }
          .audit-binder-section .binder-tab { background: white !important; border: 1px solid #ccc; margin-bottom: 0.5rem; }
          .audit-binder-section button { display: none !important; }
        }
      `}</style>
    </div>
  );
}
