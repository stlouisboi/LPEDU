import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const RISK_PATTERNS = [
  {
    category: "SMS Threshold Triggers",
    items: [
      "HOS BASIC score exceeding the 65% alert threshold — triggered by roadside violations that accumulated without carrier awareness or response.",
      "Vehicle maintenance BASIC score elevated by out-of-service conditions from roadside inspections where defects were not being systematically tracked.",
      "Driver fitness BASIC score elevated by medical certificate lapse or CDL compliance issues that were not caught in the quarterly DQ file review.",
    ],
  },
  {
    category: "Crash Data Flags",
    items: [
      "A DOT-reportable crash in the monitoring window that triggers the FMCSA crash BASIC and elevates the carrier's investigation priority.",
      "Multiple minor crashes in a 12-month period that individually do not trigger a threshold but in combination create an elevated crash indicator score.",
      "A crash involving a fatality or serious injury that accelerates the audit timeline regardless of the carrier's SMS score in other categories.",
    ],
  },
  {
    category: "Roadside Inspector Referrals",
    items: [
      "A roadside inspector who observes HOS violations, missing DVIRs, or DQ file deficiencies flagging the carrier for a focused investigation rather than issuing a citation and closing the encounter.",
      "Repeated out-of-service conditions on the same unit across multiple inspections, suggesting a systemic maintenance failure rather than isolated issues.",
      "A roadside encounter where the driver cannot produce required documents — logs, medical certificate, drug testing records — triggering an inspector referral.",
    ],
  },
  {
    category: "Complaint-Initiated Reviews",
    items: [
      "A formal complaint filed by a shipper, driver, or competitor alleging unsafe operations, hours violations, or drug and alcohol program failures.",
      "A driver complaint about being pressured to violate HOS rules that triggers a FMCSA investigation independent of the New Entrant program timeline.",
      "A state agency referral following a roadside stop where the carrier's authority, registration, or insurance status was called into question.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Pull your SMS snapshot at Month 9 and review all six BASIC categories for threshold proximity.",
    why: "BASIC scores approaching or exceeding alert thresholds at Month 9 are the leading indicator of whether an unannounced audit is likely before Month 18.",
  },
  {
    step: "02",
    action: "Review your full roadside inspection history from the monitoring window — violations, OOS conditions, and inspection outcomes.",
    why: "Roadside violations feed into SMS scores. Understanding your inspection history tells you what investigators will see when they pull your record.",
  },
  {
    step: "03",
    action: "Confirm your D&A program is actively managed: current random testing rate, current TPA contract, and all testing records organized.",
    why: "D&A program deficiencies are among the most commonly cited findings on New Entrant audit and the most difficult to explain as anything other than a program that was not running.",
  },
  {
    step: "04",
    action: "Review all DQ files for active drivers — confirm all five elements are current and renewals have been completed.",
    why: "By Month 9, the earliest DQ files may have elements approaching expiration. Medical certificates are the most common lapsed element at this stage.",
  },
  {
    step: "05",
    action: "Pull a full maintenance file review — unit histories, DVIRs, annual inspection currency, and defect-to-repair traceability.",
    why: "The maintenance BASIC is among the most heavily scrutinized categories on New Entrant audit. A complete unit file with traceable defect-repair documentation demonstrates a functional system.",
  },
  {
    step: "06",
    action: "Review your HOS compliance patterns — confirm no systematic violations, log consistency with dispatch, and ELD registration current.",
    why: "Systematic HOS patterns are detected in SMS and trigger HOS-focused investigations. A review at Month 9 allows corrective action before the audit window.",
  },
  {
    step: "07",
    action: "Prepare your FMCSA audit binder: all six category tabs, current documentation, organized by category.",
    why: "When the audit notice arrives — with 48–72 hours of response time — the carrier that has an organized binder is responding. The carrier that does not is reconstructing.",
  },
  {
    step: "08",
    action: "Conduct an internal 'mock audit walk' — would your file produce a Satisfactory finding today?",
    why: "Walking through your own file with the six audit categories as the framework reveals exactly what an investigator would find — before they arrive.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "SMS Monitoring Record",
    items: [
      "Monthly SMS snapshots from Months 1–9 — BASIC category scores and trend over time",
      "Alert threshold notifications received and responses documented",
      "DataQ challenges filed (if any) with outcomes",
      "Roadside inspection history matched to SMS score changes",
    ],
  },
  {
    num: "02",
    title: "Roadside Inspection History",
    items: [
      "Complete roadside inspection results from the monitoring window — all levels, all outcomes",
      "Violation citations with corresponding corrective action documentation",
      "Out-of-service conditions and return-to-service documentation",
      "Inspector referral notices received (if any) with response documentation",
    ],
  },
  {
    num: "03",
    title: "Authority & Insurance Current Status",
    items: [
      "Current L&I snapshot showing active authority, active insurance filings, and filing dates",
      "Current policy declarations with effective date and limits",
      "UCR registration current for the operating year",
      "BMC-91 or BMC-91X filing confirmation showing accepted status",
    ],
  },
  {
    num: "04",
    title: "Operating Systems — Current Status",
    items: [
      "D&A program: TPA contract current, random testing rate current, all test records organized",
      "DQ files: status sheet for each driver with element currency confirmed",
      "Maintenance: unit files with DVIR continuity and annual inspection currency",
      "HOS: logs organized and consistent with dispatch records for the monitoring period",
    ],
  },
  {
    num: "05",
    title: "Audit Readiness Statement",
    items: [
      "Narrative summary of compliance status per FMCSA audit category as of Month 9",
      "Gap disclosure log — gaps identified, corrective actions taken, dates",
      "List of any known compliance limitations with explanation of current status",
      "Mock audit findings and any actions taken in response",
    ],
  },
];

function SectionHeader({ overline, title, id }) {
  return (
    <div style={{ marginBottom: "2rem" }} id={id}>
      {overline && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>{overline}</p>
      )}
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", lineHeight: 1.25 }}>{title}</h2>
    </div>
  );
}

function Body({ children, style = {} }) {
  return (
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.25rem", ...style }}>{children}</p>
  );
}

function Callout({ label, children }) {
  return (
    <div style={{ borderLeft: "2px solid var(--orange)", paddingLeft: "1.25rem", paddingTop: "1rem", paddingBottom: "1rem", paddingRight: "1.25rem", background: "var(--bg-2)", marginBottom: "1.5rem" }}>
      {label && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.6rem" }}>{label}</p>
      )}
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>—</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function NewEntrantReviewBrief() {
  useSEO({
    title: "LP-BRF-11: The New Entrant Review Period and What Triggers Scrutiny | LaunchPath",
    description: "What the FMCSA New Entrant Safety Assurance Program examines in Months 9–18, what triggers an unannounced audit, and how the patterns built in the first 90 days determine what investigators find.",
  });
  const handlePrint = () => window.print();

  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <section data-testid="article-hero" style={{ background: "var(--bg)", padding: "6rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem" }}>
            ← Operational Library
          </Link>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.5rem" }}>
            LP-BRF-11 — New Entrant Review Period (49 CFR Part 385 Subpart D)
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            The New Entrant Review Period:<br />What Triggers Scrutiny
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            Every new carrier enters a monitoring window the day authority activates. Not every carrier gets a full audit — but every carrier is watched. What triggers an unannounced audit, and what investigators examine when they arrive, is determined by what you built in the first 90 days.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>13-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Months 9–18 review window
            </span>
          </div>
        </div>
      </section>

      <section data-testid="exec-summary" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="summary-grid">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Understand how the FMCSA New Entrant Safety Assurance Program monitors carriers from authority activation through Month 18 — and what distinguishes a standard audit from an accelerated one.",
                "Learn the four triggers that bring an unannounced audit earlier than the standard timeline: SMS thresholds, crash data, roadside referrals, and complaints.",
                "See what investigators examine across the six FMCSA audit categories — and how the record produced in your first 90 days determines what they find.",
                "Use the Month 9 readiness checklist and audit binder to prepare your systems for review — before the audit notice arrives.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }} className="download-col">
            <button onClick={handlePrint} data-testid="download-checklist-top" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap", display: "block", marginBottom: "0.5rem" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download Month 9<br />readiness checklist (PDF)</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="How the New Entrant Safety Assurance Program Works" id="nep-program" />
          <Body>
            Under 49 CFR Part 385, Subpart D, FMCSA is required to conduct a safety audit of every new motor carrier within 12 months of first interstate operation. This is statutory — not discretionary. Every carrier that activates operating authority enters the New Entrant Safety Assurance Program automatically and remains in it until the monitoring period closes.
          </Body>
          <Body>
            The program has three possible audit outcomes: Satisfactory, Conditional, and Unsatisfactory. A Satisfactory outcome closes the new entrant period and transitions the carrier into normal oversight. A Conditional outcome triggers a 45-day correction window and, if unresolved, a follow-up review. An Unsatisfactory outcome subjects the carrier's authority to revocation.
          </Body>
          <Callout label="The monitoring window is active from Day 1">
            SMS data collection begins immediately after authority activation. Roadside inspection results, crash reports, and compliance data all feed into the carrier's profile before the audit arrives. The audit reviews what the monitoring window recorded — not just what the carrier presents on the day of the audit.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="What Triggers an Audit Before the Standard Timeline" id="audit-triggers" />
          <Body>
            While FMCSA must audit new carriers within 12 months, the program also permits — and requires — earlier intervention when safety indicators suggest elevated risk. Four types of triggers can accelerate the audit timeline or initiate a focused investigation separate from the standard New Entrant audit.
          </Body>

          {[
            {
              title: "SMS Threshold Violations",
              desc: "The Safety Measurement System (SMS) tracks carrier performance across six BASIC categories: Unsafe Driving, Hours of Service, Driver Fitness, Controlled Substances and Alcohol, Vehicle Maintenance, and Hazardous Materials. When a carrier's BASIC score exceeds the alert threshold for a category, it is flagged for prioritized intervention. Multiple threshold violations across categories create a composite risk profile that accelerates the audit timeline.",
            },
            {
              title: "Crash Data",
              desc: "DOT-reportable crashes are entered into the FMCSA crash database and update the carrier's SMS profile. A single serious crash — involving a fatality, an injury requiring hospitalization, or disabling damage — can trigger an investigation independent of the New Entrant program timeline. Multiple crashes of any severity within the monitoring window compound the carrier's risk profile significantly.",
            },
            {
              title: "Roadside Inspector Referrals",
              desc: "State-level FMCSA investigators receive referrals from roadside inspectors who observe patterns or conditions that suggest systemic non-compliance. A roadside stop that reveals missing DVIRs, HOS violations across multiple logs, or DQ file deficiencies may result in an inspector flagging the carrier for a focused investigation rather than issuing citations and closing the contact.",
            },
            {
              title: "Complaints and Referrals",
              desc: "Formal complaints from drivers, shippers, or other parties alleging unsafe operations, HOS violations, or D&A program failures can trigger a separate investigation. FMCSA is required to review and respond to complaints against operating carriers, and complaint-initiated reviews are not constrained by the standard 12-month audit timeline.",
            },
          ].map((block) => (
            <div key={block.title} style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>{block.title}</h3>
              <Body style={{ marginBottom: "0.5rem" }}>{block.desc}</Body>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="The Six Audit Categories and What Gets Tested" id="six-categories" />
          <Body>
            FMCSA New Entrant audits examine six compliance categories. The audit is not a sampling exercise — investigators review the carrier's records across all six areas and assess whether functioning compliance systems exist in each. The six categories are:
          </Body>
          <BulletList items={[
            "Controlled Substances and Alcohol: Is the D&A program established, is it running with a compliant TPA, are pre-employment tests on file, and are random testing obligations being met?",
            "Driver Qualifications: Are driver qualification files complete and current — all five elements, medical certificates unexpired, MVRs current, road tests documented?",
            "Hours of Service: Are HOS records maintained, internally consistent, and matched to dispatch activity? Are ELD obligations met or exemptions documented?",
            "Vehicle Maintenance: Are DVIRs maintained for all operating days, do they trace to repair documentation, are annual inspections current, and are out-of-service conditions being addressed?",
            "Hazardous Materials: If applicable — are hazmat handling requirements, placarding, and training documentation in place?",
            "Financial Responsibility: Are insurance filings active and current? Do policy limits meet federal minimums? Are filings confirmed in FMCSA's records?",
          ]} />
          <Callout label="What the audit is really asking">
            Across all six categories, the core question is the same: does this carrier have systems that produce compliance as a byproduct of normal operations — or does it have paperwork that was assembled in response to regulatory contact? The evidence record answers that question regardless of what the carrier says.
          </Callout>
        </div>

      </main>

      <section data-testid="risk-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 4</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Triggers That Bring the Audit Earlier
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            These are the four categories of events that move a carrier from the standard 12-month audit timeline to an accelerated investigation. Each one is traceable to specific evidence in the monitoring record — which means each one can be anticipated and addressed before it becomes a trigger.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)" }}>
            {RISK_PATTERNS.map((pattern) => (
              <div key={pattern.category} style={{ background: "var(--bg-2)", padding: "2rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", paddingBottom: "0.875rem", borderBottom: "1px solid var(--border)", marginBottom: "1.25rem" }}>{pattern.category}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {pattern.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", marginTop: "0.25rem", flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 5" title="The Review Period Operating Standard" id="review-standard" />
          <Body>
            The review period standard from Month 9 through the audit is not different from the operating standard in the first 90 days — it is the same standard, applied consistently. The difference is what the standard produces: a 9-month operating record that investigators can read, rather than a 9-month record with gaps that investigators must interpret.
          </Body>
          <BulletList items={[
            "Monitor your SMS snapshot monthly from Month 9 forward. Threshold alerts are early warning indicators — they identify which BASIC categories are drawing investigator attention.",
            "Track roadside inspection results at the carrier level. A violation that accumulates into a threshold alert did not arrive without warning — it was in your roadside history first.",
            "Keep your audit binder current. Investigators typically give 48 to 72 hours of notice before an audit document request. A carrier with a current binder responds. A carrier without one scrambles.",
            "Conduct a mock audit at Month 9. Walk through your file against the six audit categories. Document what you find. Address what needs to be corrected forward.",
          ]} />
          <Callout label="What the first 90 days determine">
            By the time the audit arrives — whether at Month 9, Month 12, or Month 18 — the evidence record has been written by the carrier's operating habits over the prior months. The audit does not create the findings. It reads the record the carrier created. The first 90 days are where that record starts.
          </Callout>
        </div>
      </main>

      <section data-testid="review-checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Month 9 Audit Readiness Checklist
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Complete at Month 9. This is the last major checkpoint before the audit window. What is found and addressed now determines how the audit goes.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "1rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Step", "Action", "Why It Matters"].map(h => (
                    <th key={h} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", textAlign: "left", padding: "0 1rem 1rem 0", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CHECKLIST_STEPS.map((row) => (
                  <tr key={row.step} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.05em", padding: "1rem 1.25rem 1rem 0", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.step}</td>
                    <td style={{ padding: "1rem 1.25rem 1rem 0", color: "var(--text-muted)", lineHeight: 1.65, verticalAlign: "top", maxWidth: 340 }}>{row.action}</td>
                    <td style={{ padding: "1rem 0", color: "var(--text-subtle)", lineHeight: 1.65, verticalAlign: "top", fontSize: "1rem" }}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section data-testid="review-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6 — Supplement</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            New Entrant Review Period Binder — Month 9
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            This binder is your pre-audit assembly at Month 9. Keep it current from this point forward. When the audit notice arrives with 48 hours of document request time, this binder is how you respond.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", marginBottom: "2.5rem" }}>
            {BINDER_TABS.map((tab) => (
              <div key={tab.num} className="binder-tab" style={{ background: "var(--bg)", padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem", paddingBottom: "0.875rem", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.1em" }}>TAB {tab.num}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", lineHeight: 1.3 }}>{tab.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {tab.items.map((item, i) => (
                    <label key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginTop: "0.2rem", flexShrink: 0, accentColor: "var(--orange)", width: 14, height: 14 }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={handlePrint} data-testid="download-binder-btn" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >Print / Save Review Period Binder as PDF</button>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Pull your SMS snapshot now. What does your monitoring period record show?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            The FMCSA Safety Measurement System is publicly accessible at ai.fmcsa.dot.gov. Your BASIC scores are visible to brokers, shippers, and FMCSA investigators — right now. If you haven't checked them, you don't know what your monitoring period record shows. Pull it today.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a href="https://www.launchpathedu.com/auto-diagnostic" target="_blank" rel="noopener noreferrer" data-testid="article-diagnostic-cta"
              style={{ display: "inline-block", background: "var(--orange)", color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >Run the REACH Assessment</a>
            <button onClick={handlePrint} data-testid="download-checklist-cta" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 600, padding: "1rem 2rem", cursor: "pointer", letterSpacing: "0.03em", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download Month 9 Readiness Checklist (PDF)</button>
          </div>
        </div>
      </main>

      <ArticlePortalBanner
        taskId="NEP-001"
        taskName="New Entrant Review Preparation"
        message="Completing the Month 9 audit readiness review and building the pre-audit binder is Standard Task NEP-001 in the LaunchPath Operating System. Operators enrolled in the Standard submit their Month 9 self-audit findings for coach review before entering the audit window."
      />

      <div style={{ borderTop: "1px solid rgba(13,27,48,0.08)", background: "#000F1F", padding: "2rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
            This brief is part of the{" "}
            <a href="/knowledge-center" style={{ color: "#C8860A", textDecoration: "none" }}>LaunchPath Operational Library</a>.
          </p>
          <a href="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,134,10,0.70)", textDecoration: "none", whiteSpace: "nowrap" }}>
            View All Briefs →
          </a>
        </div>
      </div>

      <BriefBundleCTA />
      <FooterSection />

      <style>{`
        @media (max-width: 680px) { .summary-grid { grid-template-columns: 1fr !important; } .download-col { text-align: left !important; } }
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
