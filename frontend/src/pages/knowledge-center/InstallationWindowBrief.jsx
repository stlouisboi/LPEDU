import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const RISK_PATTERNS = [
  {
    category: "DVIR Gaps in the First 30 Days",
    items: [
      "Missing pre-trip or post-trip DVIRs for operating days — creating a gap in the inspection chain before the first roadside stop.",
      "Drivers signing 'no defects' without conducting an actual inspection, creating a technically-complete but factually false record.",
      "No DVIR system established at all — inspections not completed because no form was provided and no habit was created.",
    ],
  },
  {
    category: "D&A Program Not Running",
    items: [
      "Pre-employment test completed but random pool enrollment not yet confirmed with TPA — leaving a gap in the required ongoing program.",
      "Second driver added to operations without completing pre-employment test or adding to the random pool.",
      "D&A policy distributed but not signed and dated by the driver — creating an unsigned policy in the file.",
    ],
  },
  {
    category: "DQ File Incomplete at First Dispatch",
    items: [
      "Driver dispatched before MVR was received — operating on verbal confirmation that the driver's record was 'clean.'",
      "Medical certificate not yet in file when driver made first interstate run — discovered during subsequent audit.",
      "Prior employment section of driver application left incomplete because 'the driver said they had no other trucking jobs.'",
    ],
  },
  {
    category: "Dispatch Without Records",
    items: [
      "First two weeks of loads operating with no corresponding HOS log, no dispatch record, and no DVIR — relying on memory and fuel receipts to reconstruct.",
      "No trip log or load manifest system established — all dispatch information stored in the owner's phone text messages.",
      "Fuel records exist but don't match the dates and locations of available HOS records, creating an unexplainable discrepancy.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Confirm all five DQ file elements are complete and dated for every CDL driver before first dispatch.",
    why: "Incomplete DQ files at dispatch are one of the most common findings on New Entrant audit — and one of the easiest to close before the monitoring window opens.",
  },
  {
    step: "02",
    action: "Establish your ELD or paper log system and verify it is operational before the first run.",
    why: "HOS records must start with the first dispatch. A logging system established on Day 1 creates a continuous, audit-defensible record from the opening.",
  },
  {
    step: "03",
    action: "Complete a pre-trip and post-trip DVIR for every day of operation and keep a copy in the vehicle file.",
    why: "DVIRs are the daily evidence of your maintenance system. Investigators trace vehicle condition across DVIRs, roadside inspections, and repair records.",
  },
  {
    step: "04",
    action: "Confirm TPA random pool enrollment is active and documented before the first post-hire run.",
    why: "Pre-employment test without ongoing random enrollment does not constitute a compliant D&A program.",
  },
  {
    step: "05",
    action: "Set up a dispatch log showing date, driver, unit, origin, destination, and load type for every movement.",
    why: "Investigators cross-reference dispatch logs against HOS records and fuel data. A dispatch log with gaps or inconsistencies creates unexplained evidence.",
  },
  {
    step: "06",
    action: "Log any roadside inspection results in your vehicle file immediately — pass or violation.",
    why: "Roadside results feed into your SMS score within weeks. Tracking them at the carrier level lets you respond before they accumulate into a threshold trigger.",
  },
  {
    step: "07",
    action: "Conduct a 30-day vehicle inspection and document defects, corrections, and any out-of-service conditions.",
    why: "Establishes a 30-day maintenance check-in rhythm that continues through the monitoring period and demonstrates an active maintenance system.",
  },
  {
    step: "08",
    action: "Complete a Day 30 file completeness review — all five DQ file elements, all DVIRs, all logs, D&A program status.",
    why: "The 30-day checkpoint is your first self-audit opportunity. Gaps found at Day 30 can still be addressed before the audit window opens.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "Driver Qualification Files — Current",
    items: [
      "CDL front and back copy, medical certificate, MVR for each active driver",
      "Completed driver application with 3-year prior employment history",
      "Documented road test or CDL-as-equivalent confirmation",
      "Signed drug and alcohol policy acknowledgment",
    ],
  },
  {
    num: "02",
    title: "HOS & ELD Records — Days 1–30",
    items: [
      "First 30 days of HOS logs for each driver — ELD data exports or paper logs",
      "Driver vehicle inspection reports (DVIR) for all operating days",
      "Record of any hours-of-service exemption documentation (short-haul, 100-air-mile, etc.)",
      "ELD registration confirmation with FMCSA (if applicable)",
    ],
  },
  {
    num: "03",
    title: "Drug & Alcohol Program — 30-Day Status",
    items: [
      "Pre-employment test results (negative) for each CDL driver with date",
      "TPA enrollment confirmation letter with random pool assignment and effective date",
      "Copy of written D&A policy signed and dated by each driver",
      "Testing calendar or TPA contact information for random selection notifications",
    ],
  },
  {
    num: "04",
    title: "Dispatch & Trip Records",
    items: [
      "Dispatch log showing date, driver, unit, and trip for all loads in Days 1–30",
      "Load confirmations, rate confirmations, or trip sheets for reference",
      "Fuel purchase records matching operating dates and routes",
      "Customer delivery receipts or load completion confirmations",
    ],
  },
  {
    num: "05",
    title: "30-Day Completeness Review",
    items: [
      "Day 30 file audit checklist — what was reviewed, what was found, what was corrected",
      "Any gaps identified and how they were closed",
      "Roadside inspection results received in Days 1–30 (if any)",
      "Note of any operational changes — new driver, additional unit, freight type change",
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

export default function InstallationWindowBrief() {
  useSEO({
    title: "LP-BRF-08: The Documentation Architecture of the Installation Window | LaunchPath",
    description: "How to build the documentary structure, dispatch rhythm, and monitoring habits that form in the first 30 days — and why missed steps here become invisible vulnerabilities by Month 9.",
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
            LP-BRF-08 — Installation Window (49 CFR Parts 382 · 391 · 395 · 396)
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            The Documentation Architecture<br />of the Installation Window
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            The first 30 days are not a warm-up period. They are the architectural window in which your compliance systems either get built or fail to exist. What you document here determines what investigators find nine months later.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>11-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Days 1–30 operational build
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
                "Understand why Days 1–30 are structurally different from every other phase of the New Entrant period — the systems you build now cannot be built retroactively.",
                "Learn what a complete 30-day file looks like: DVIRs, HOS records, DQ files, D&A documentation, and dispatch records.",
                "See the four most common documentation failures in the first 30 days and why they compound over the monitoring window.",
                "Use the Day 30 completeness checklist and binder to give your compliance record a defensible foundation before the audit window opens.",
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
            >Download installation<br />window checklist (PDF)</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="Why Days 1–30 Are Structurally Different" id="days-1-30" />
          <Body>
            The New Entrant monitoring period is 12 to 18 months. But the evidence that investigators review at audit is not uniformly distributed across that period. It clusters at the beginning and at the end of events — the first records that were ever created, and the records that existed just before the audit notice arrived.
          </Body>
          <Body>
            The first 30 days are the architectural window because they produce the opening record. An FMCSA investigator reviewing your file at Month 9 will look at your earliest HOS logs to understand your logging habits, your earliest DVIRs to understand your inspection rhythm, and your driver qualification files to confirm that everything required was in place when the first driver dispatched.
          </Body>
          <Callout label="The architectural problem">
            A gap in Month 6 can be explained. A gap at Day 1 cannot. The question investigators ask about early records is not 'what happened?' — it is 'was the system ever in place?' Gaps in the first 30 days suggest the system never existed.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="The Five Files That Must Exist Before Dispatch" id="five-files" />

          {[
            {
              title: "Driver Qualification File",
              items: [
                "All five required elements complete: CDL, medical certificate, MVR, application with 3-year employment history, and documented road test.",
                "MVR must be obtained within 30 days of hire. 'We checked' is not a DQ file element.",
                "Each element must be present in the file before the driver makes the first run under your authority.",
              ],
            },
            {
              title: "Drug & Alcohol Program Record",
              items: [
                "TPA enrollment confirmation with effective date. Random pool assignment confirmed.",
                "Pre-employment negative test result — dated, signed, on file.",
                "Written D&A policy signed and dated by each driver.",
              ],
            },
            {
              title: "HOS Log System",
              items: [
                "ELD registered and operational (if not exempt). Or paper log system established with blank log forms in the vehicle.",
                "First log entry begins with the first dispatch — there is no retroactive start.",
                "DVIR form available in-cab and first pre-trip inspection documented.",
              ],
            },
            {
              title: "Vehicle Maintenance Baseline",
              items: [
                "Initial inspection on file showing the vehicle's condition at the start of operations.",
                "Annual inspection on file if applicable. Out-of-service items corrected before dispatch.",
              ],
            },
            {
              title: "Dispatch Record",
              items: [
                "A trip log or dispatch sheet recording date, driver, unit, route, and commodity for every load.",
                "Does not need to be software — a simple spreadsheet or paper form establishes the record.",
              ],
            },
          ].map((block) => (
            <div key={block.title} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.875rem" }}>{block.title}</h3>
              <BulletList items={block.items} />
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="The Daily and Weekly Dispatch Rhythm" id="dispatch-rhythm" />
          <Body>
            Documentation is not a project. It is a rhythm. The carriers that have defensible records at audit are not carriers that prepared for the audit — they are carriers that maintained a consistent rhythm from Day 1 through the entire monitoring period.
          </Body>
          <Body>
            The daily rhythm for a 1–3 truck operation is not complex: pre-trip DVIR, load dispatch, HOS logging, post-trip DVIR, any defects reported and routed to maintenance. The weekly rhythm adds a review of the prior week's logs for accuracy, a check on D&A testing obligations, and any operational changes noted in the driver file.
          </Body>
          <Callout label="The rhythm creates the record">
            A carrier with a consistent pre-trip/post-trip DVIR habit in the first 30 days will have a DVIR file that an investigator can trace chronologically, match to operating days, and cross-reference against maintenance records. That is what a functional system looks like. A stack of late-filed, identical-format DVIRs does not.
          </Callout>
        </div>
      </main>

      <section data-testid="risk-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 4</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Documentation Failures That Compound Over the Monitoring Window
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            First-30-day gaps do not stay contained. They expand. A missing DVIR on Day 5 means there is no defect-to-repair chain for any problem that developed on that unit that day. A missing pre-employment test at Day 1 means the driver's first 300 loads were made under a deficient D&A program.
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
          <SectionHeader overline="Section 5" title="The 30-Day Documentation Standard" id="30day-standard" />
          <Body>
            The 30-day standard is a measurable output, not a process description. At Day 30, a carrier running the standard should be able to produce the following without advance preparation:</Body>
          <BulletList items={[
            "Complete DQ files for every active CDL driver — all five elements, dated and organized.",
            "30 days of HOS records — ELD exports or paper logs — with no unexplained gaps in operating days.",
            "30 days of DVIRs — one per operating day per unit — with any noted defects and repair documentation.",
            "TPA enrollment confirmation, pre-employment test results, and signed D&A policy for each driver.",
            "A dispatch log showing date, driver, unit, and trip for every load in the period.",
            "A vehicle baseline — initial inspection, annual inspection if applicable, and any identified defects corrected.",
          ]} />
          <Callout label="The Day 30 test">
            Pull your file right now. Can you produce all six items above without preparation? If not, identify what's missing and close those gaps before Day 60. The audit window opens as early as Month 9. The installation window closes much sooner.
          </Callout>
        </div>
      </main>

      <section data-testid="installation-checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Installation Window Readiness Checklist
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Complete at Day 30. Revisit at Day 60. Keep a dated printout with the completeness note of what was found and corrected.
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

      <section data-testid="installation-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6 — Supplement</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            Installation Window Binder — Days 1–30
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            This binder captures the first 30 days of operational documentation. Assemble at Day 30, note what was found and what was corrected. It is the architectural record of your installation window.
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
          >Print / Save Installation Binder as PDF</button>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Complete the Day 30 completeness review before you proceed to the next phase.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            If you are at or past Day 30, do the review now. Identify any gaps. Close them with current documentation — not backdated records. Then read LP-BRF-09 to understand what the pattern you have built will look like by Day 60.
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
            >Download Installation Window Checklist (PDF)</button>
          </div>
        </div>
      </main>

      <ArticlePortalBanner
        taskId="OPS-001"
        taskName="Installation Window Documentation"
        message="Building the first 30-day documentation architecture is Standard Task OPS-001 in the LaunchPath Operating System. Operators enrolled in the Standard complete the Day 30 file review and document any gaps and corrections as part of their installation window record."
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
