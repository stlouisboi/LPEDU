import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const RISK_PATTERNS = [
  {
    category: "Filing Without Verification",
    items: [
      "Assuming the BOC-3 designation is on file because the filing service said it was submitted — without pulling the SAFER confirmation.",
      "Running the first load before confirming the BMC-91 has been accepted and is showing as active on the FMCSA L&I record.",
      "Treating UCR registration as optional in the first year because enforcement 'hasn't caught up yet.'",
    ],
  },
  {
    category: "Authority Without Infrastructure",
    items: [
      "MC number granted, but no D&A consortium enrolled and no pre-employment test completed before the first CDL driver dispatches.",
      "Driver qualification file missing one or more of the five required elements — MVR, medical certificate, application, employment history, or road test.",
      "No ELD or paper logging system established, and the first HOS record is created from memory after the fact.",
    ],
  },
  {
    category: "Insurance Filing Gaps",
    items: [
      "Policy is bound and premium is paid, but the insurer has not yet filed the BMC-91 — leaving a window between coverage and legal operating authority.",
      "MCS-90 endorsement not issued or not verified as part of the policy declarations before the first interstate dispatch.",
      "Operating under the assumption that 'the broker handles the filing' without independently confirming acceptance in FMCSA's system.",
    ],
  },
  {
    category: "Process Agent Confusion",
    items: [
      "Using a BOC-3 blanket filing service without verifying the designation appears in FMCSA's records under the correct USDOT and MC numbers.",
      "Thinking the BOC-3 is a one-time setup that never needs to be checked again — lapses happen when service companies lose contracts or fail.",
      "Not understanding that without an active BOC-3 on file, FMCSA cannot process legal service on the carrier — a technical block to operating legally.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Pull your FMCSA L&I snapshot and confirm BOC-3, BMC-91/BMC-91X, and UCR are all showing as active.",
    why: "Verifies all three foundational federal filings are accepted and recorded — not just submitted.",
  },
  {
    step: "02",
    action: "Confirm your MCS-90 endorsement is included in your policy declarations and on file with FMCSA.",
    why: "Ensures your insurance filing meets federal financial responsibility requirements before dispatch.",
  },
  {
    step: "03",
    action: "Enroll every CDL driver who will operate under your authority in your D&A consortium.",
    why: "Establishes your pre-employment testing obligation and creates the testing record that investigators will check.",
  },
  {
    step: "04",
    action: "Complete a documented pre-employment drug test for each CDL driver before first dispatch.",
    why: "A negative pre-employment test result must be in the driver file before the driver can legally operate under your authority.",
  },
  {
    step: "05",
    action: "Assemble all five elements of the driver qualification file for each active CDL driver.",
    why: "Incomplete DQ files at dispatch create immediate audit exposure — investigators check these on Day 1 review.",
  },
  {
    step: "06",
    action: "Conduct an initial vehicle inspection and document it as your maintenance baseline.",
    why: "Establishes the starting condition of the vehicle and begins the inspection record chain that auditors will trace.",
  },
  {
    step: "07",
    action: "Set up your HOS logging system — ELD or compliant paper logs — and confirm it is active before the first run.",
    why: "HOS records begin the moment the driver starts operating. There is no legitimate retroactive first log.",
  },
  {
    step: "08",
    action: "Build your Day 1 compliance binder with printouts confirming each of the items above.",
    why: "Creates a dated, organized record of what was in place at authority activation — your strongest defense against 'you never had systems' arguments.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "Authority & FMCSA Filings",
    items: [
      "SAFER/L&I snapshot showing MC and USDOT status, authority type, and active insurance filings",
      "BOC-3 filing confirmation showing process agent designation and effective date",
      "UCR registration confirmation for current operating year",
      "Operating authority certificate and USDOT registration documentation",
    ],
  },
  {
    num: "02",
    title: "Insurance Records",
    items: [
      "Policy declarations page showing effective date, limits, and covered autos",
      "BMC-91 or BMC-91X filing confirmation from FMCSA showing active status",
      "MCS-90 endorsement (if required) or documentation confirming financial responsibility mechanism",
      "Agent contact information and confirmation of filing submission date",
    ],
  },
  {
    num: "03",
    title: "Drug & Alcohol Program",
    items: [
      "D&A consortium enrollment confirmation letter or contract with TPA",
      "Pre-employment drug test results (negative) for each CDL driver",
      "Signed drug and alcohol policy acknowledgment for each driver",
      "Testing consortium random pool enrollment confirmation",
    ],
  },
  {
    num: "04",
    title: "Driver Qualification Files",
    items: [
      "Current commercial driver's license (front and back copy) for each driver",
      "Medical examiner's certificate current within required renewal period",
      "Motor vehicle record (MVR) obtained within 30 days of hiring",
      "Completed driver application with prior employment history for 3 years",
      "Documented road test or equivalent — CDL accepted as road test equivalent",
    ],
  },
  {
    num: "05",
    title: "Vehicle Baseline",
    items: [
      "Initial pre-trip inspection completed and signed by driver",
      "Annual inspection record if vehicle is more than 90 days from acquisition",
      "Vehicle registration and operating weight documentation",
      "Note of any pre-existing defects identified at acquisition with correction documentation",
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

export default function Day1AuthorityBrief() {
  useSEO({
    title: "LP-BRF-07: Day 1 Authority Compliance | LaunchPath Operational Library",
    description: "What must be operationally in place before your first dispatch — BOC-3, BMC-91, UCR, D&A program, and driver qualification files. The go/no-go checklist for new motor carriers.",
  });
  const handlePrint = () => window.print();

  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section data-testid="article-hero" style={{ background: "var(--bg)", padding: "6rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem" }}>
            ← Operational Library
          </Link>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.5rem" }}>
            LP-BRF-07 — Authority Activation (49 CFR Part 385 · 387 · 382)
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            Day 1 Authority Compliance:<br />What Must Be Operational Before Your First Dispatch
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            An MC number visible in SAFER is not a go signal. Three federal filings must be confirmed active, a drug and alcohol program must be running, and driver qualification files must be complete — before the first truck moves.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>11-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Complete before first truck moves
            </span>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY BAND ── */}
      <section data-testid="exec-summary" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="summary-grid">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Learn exactly what FMCSA requires to be in place at authority activation — not just at audit time, nine months later.",
                "Understand the three non-negotiable federal filings and why 'submitted' is not the same as 'active and accepted.'",
                "Build the operational infrastructure checklist — D&A program, DQ files, HOS system, vehicle baseline — that must exist before the first load.",
                "Walk away with a Day 1 binder structure that documents what was in place from the moment you activated, so the question 'did you have systems at Day 1?' has a clear answer.",
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
            >Download Day 1<br />authority checklist (PDF)</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── BODY SECTIONS 1–3 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="What 'Authority Active' Actually Means" id="authority-active" />
          <Body>
            When FMCSA grants your operating authority and your MC number appears in SAFER, that visibility does not mean you are legally ready to operate in interstate commerce. Authority activation is a threshold event, not a clearance. What it confirms is that your application was approved and your number has been assigned.
          </Body>
          <Body>
            What it does not confirm is whether your insurance filing has been received and accepted, whether your process agent designation is on file, whether your UCR registration for the current year is paid, or whether you have the operational infrastructure — drug testing, driver qualification, maintenance systems — that federal regulations require to be in place before your first dispatch.
          </Body>
          <Callout label="The distinction that matters">
            The question is not whether your number is visible in SAFER. The question is whether everything that number depends on — every filing, every endorsement, every program — is confirmed active and documented before the first truck moves.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="The Three Non-Negotiable Federal Filings" id="three-filings" />

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>BOC-3: Process Agent Designation</h3>
          <Body>
            Under 49 CFR Part 366, every motor carrier operating in interstate commerce must designate a process agent in each state where it operates or has its principal place of business. The BOC-3 is the form used to make that designation. Without an active BOC-3 on file with FMCSA, the agency cannot legally serve process on your carrier — which is a technical prerequisite to operating authority being granted and maintained.
          </Body>
          <Body>
            Many carriers use blanket filing services that designate agents in all states simultaneously. The critical step that is frequently skipped: confirming the filing appears in FMCSA's records under your specific USDOT and MC numbers before dispatch.
          </Body>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "2rem" }}>BMC-91/BMC-91X: Insurance Filing with FMCSA</h3>
          <Body>
            Your insurance policy alone does not satisfy federal financial responsibility requirements. Your insurer must file a BMC-91 (single insurer) or BMC-91X (layered coverage) with FMCSA confirming that you have the required minimum liability coverage. Until FMCSA accepts and records that filing, your authority is not backed by the financial responsibility mechanism the regulations require.
          </Body>
          <Body>
            The gap between "policy bound" and "BMC-91 accepted" can be several days. Carriers who dispatch in that gap are operating without the complete legal foundation their authority requires.
          </Body>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "2rem" }}>UCR: Unified Carrier Registration</h3>
          <Body>
            UCR is a separate annual registration requirement under 49 USC 14504a. It is not part of the FMCSA operating authority application process, and it is not automatic. Every for-hire interstate motor carrier must register and pay annual UCR fees. Operating without current UCR registration creates roadside enforcement exposure that far exceeds the cost of the registration itself.
          </Body>
          <Callout label="Confirmation, not assumption">
            All three filings must be confirmed in FMCSA's records — not just submitted. Pull your L&I snapshot before the first dispatch and verify all three appear as active.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="The Operational Infrastructure That Isn't a Filing" id="operational-infra" />
          <Body>
            Beyond the three federal filings, there are four operational systems that must exist before the first CDL driver dispatches. These are not filing requirements — they are program requirements with their own evidence trail, and investigators check all four on New Entrant audit.
          </Body>

          {[
            {
              title: "Drug & Alcohol Program",
              items: [
                "Enrolled with a FMCSA-compliant TPA (third-party administrator) before any CDL driver operates.",
                "Pre-employment drug test completed and returned negative for each CDL driver before first dispatch.",
                "Written drug and alcohol policy signed and distributed to all CDL drivers.",
              ],
            },
            {
              title: "Driver Qualification Files",
              items: [
                "All five required elements complete for each active CDL driver: application, MVR, medical certificate, road test, and prior employment history.",
                "MVR obtained within 30 days of hire. Medical certificate current and signed by qualified examiner.",
                "Road test documentation — or CDL as equivalent — on file before first dispatch.",
              ],
            },
            {
              title: "HOS Logging System",
              items: [
                "ELD registered with FMCSA (if required) or paper log system established before the first run.",
                "HOS records begin at the first dispatch. There is no legitimate retroactive first log entry.",
                "Short-haul exemption confirmation documented if operating under the 150-air-mile exception.",
              ],
            },
            {
              title: "Vehicle Maintenance Baseline",
              items: [
                "Initial pre-trip inspection completed and signed by the driver on the first day of operation.",
                "Annual inspection on file if the vehicle is not newly placed in service.",
                "Any pre-existing defects identified, documented, and corrected before dispatch.",
              ],
            },
          ].map((block) => (
            <div key={block.title} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.875rem" }}>{block.title}</h3>
              <BulletList items={block.items} />
            </div>
          ))}

          <Callout label="The Day 1 question every investigator asks">
            Was your drug and alcohol program in place before the first CDL driver moved? Were your driver qualification files complete? If the answer is no — or 'mostly' — you are already behind. The audit window opens before these gaps can be closed retroactively.
          </Callout>
        </div>

      </main>

      {/* ── RISK PATTERNS BAND ── */}
      <section data-testid="risk-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 4</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Common Day 1 Authority and Compliance Failures
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            Day 1 failures do not announce themselves. Carriers operate for weeks or months before discovering that a filing was never accepted, a driver never tested, or a vehicle inspection was never completed. By then, the audit window has opened.
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

      {/* ── SECTION 5 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 5" title="The LaunchPath Day 1 Operating Standard" id="day1-standard" />
          <Body>
            The Day 1 Standard treats authority activation as the opening of an evidence window, not the start of a build period. Everything that the audit checks — filings, programs, files, systems — must be in place before the first load moves. The standard has two rules.
          </Body>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>Rule 1: Confirm, don't assume</h3>
          <Body>
            Every filing must be confirmed active in FMCSA's records before dispatch. Every program enrollment must be confirmed with the TPA before the first driver test. Every driver file element must be assembled and reviewed before the driver moves. Submission is not confirmation.
          </Body>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "1rem" }}>Rule 2: Document the date</h3>
          <Body>
            Every confirmation must be dated. The Day 1 binder is a timestamped record of what was in place when. When an investigator asks "were your systems in place at authority activation?", the answer is not a verbal response — it is a dated document showing each element was confirmed before the first dispatch.
          </Body>

          <Callout label="What the Day 1 standard produces">
            A carrier that follows the Day 1 Standard enters the New Entrant monitoring period with a clean opening record — all filings confirmed, all programs running, all files complete. That is not the same as passing the audit. But it removes the lowest-hanging grounds for an adverse finding.
          </Callout>
        </div>
      </main>

      {/* ── DAY 1 CHECKLIST TABLE ── */}
      <section data-testid="day1-checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Day 1 Authority Readiness Checklist
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Complete every step before the first dispatch. Keep a dated printout of this checklist in your Day 1 compliance binder.
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

      {/* ── DAY 1 BINDER ── */}
      <section data-testid="day1-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6 — Supplement</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            Day 1 Compliance Binder — {new Date().getFullYear()}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            This binder documents what was in place at authority activation. Assemble it before the first dispatch. Date each item. It is your opening record.
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
          >Print / Save Day 1 Binder as PDF</button>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 7" title="When You Find a Gap Before Dispatch" id="gap-before-dispatch" />
          <Body>
            If you complete the Day 1 checklist and find a gap — a filing that hasn't been accepted, a driver test that hasn't been completed, a file element that's missing — the answer is simple: do not dispatch until it is corrected. There is no grace period for operating under authority that is not properly supported.
          </Body>
          <Body>
            The cost of a one-day delay to confirm your BMC-91 is accepted is far less than the cost of the cascade that follows an authority inactivation or an adverse audit finding tied to gaps that existed at Day 1. Document the gap, correct it, and add the correction with a date to your Day 1 binder.
          </Body>
          <Callout label="The retroactivity problem">
            Investigators look at when systems were in place. If your first dispatch predates your pre-employment drug test, your DQ file completion, or your BMC-91 acceptance, that sequence is permanently in the record. It cannot be corrected retroactively — only disclosed and explained.
          </Callout>
        </div>

        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Pull your SAFER record right now. Confirm all three filings are showing as active.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            The L&I snapshot at li-public.fmcsa.dot.gov takes two minutes to pull. Most new carriers have never checked it. If your BOC-3, BMC-91, and UCR are not all showing as active and current, you are not in a legal operating posture regardless of what your agent told you.
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
            >Download Day 1 Authority Checklist (PDF)</button>
          </div>
        </div>
      </main>

      <ArticlePortalBanner
        taskId="AUTH-001"
        taskName="Day 1 Authority Confirmed"
        message="Confirming all three federal filings and completing operational infrastructure before dispatch is Standard Task AUTH-001 in the LaunchPath Operating System. Operators enrolled in the Standard document each element with dated confirmations as part of their opening compliance record."
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
