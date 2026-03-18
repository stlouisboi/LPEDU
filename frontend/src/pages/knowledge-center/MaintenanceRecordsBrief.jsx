import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Assign a unique unit number and create a file for each CMV.",
    why: "Stops documents from getting lost in generic 'shop' folders and lets you pull a truck's history quickly.",
  },
  {
    step: "02",
    action: "Build or update a cover sheet for each unit.",
    why: "Gives auditors a clear snapshot of what each truck is, when it entered service, and how you identify it.",
  },
  {
    step: "03",
    action: "Collect and file DVIRs with defects for the last 3–6 months.",
    why: "Proves drivers are inspecting equipment and reporting issues, not just clicking through an app.",
  },
  {
    step: "04",
    action: "Match each DVIR defect to a repair order or invoice.",
    why: "Shows you actually fixed safety-related issues instead of ignoring them.",
  },
  {
    step: "05",
    action: "Confirm annual (periodic) inspection records exist for each unit.",
    why: "Demonstrates you met the minimum inspection standard once every 12 months.",
  },
  {
    step: "06",
    action: "Reconcile roadside inspection reports with repairs.",
    why: "Closes the loop on violations and out-of-service conditions that enforcement already documented.",
  },
  {
    step: "07",
    action: "Build or update a simple PM schedule by unit.",
    why: "Reduces surprise breakdowns and shows you have a plan beyond \"run it until it fails.\"",
  },
  {
    step: "08",
    action: "Create a \"Maintenance Audit\" binder or shared-drive view.",
    why: "Lets you respond in minutes instead of days when an auditor or insurer wants to see maintenance records.",
  },
];

const UNIT_FILE_SECTIONS = [
  {
    num: "01",
    title: "Cover & Identity",
    items: [
      "Unit number, year/make/model, VIN, plate number",
      "In-service date and current mileage",
      "Ownership or lease agreement on file",
    ],
  },
  {
    num: "02",
    title: "Core Documents",
    items: [
      "Current registration (copy)",
      "Insurance ID card (copy)",
      "Latest annual/periodic inspection report",
    ],
  },
  {
    num: "03",
    title: "Inspections & DVIRs — last 12–18 months",
    items: [
      "DVIRs where defects were reported, in date order",
      "DVIRs tied to roadside or OOS violations flagged for quick access",
      "Driver verification sign-offs confirming defect correction",
    ],
  },
  {
    num: "04",
    title: "Repairs & Preventive Maintenance",
    items: [
      "Repair orders and invoices with unit number, complaint, cause, and correction",
      "PM service records (oil, filters, brakes) with dates and mileage/hours",
      "Parts receipts tied to repair order line items",
    ],
  },
  {
    num: "05",
    title: "Roadside & Out-of-Service History",
    items: [
      "Roadside inspection reports and citations",
      "Repair orders showing how OOS items or serious defects were corrected",
      "Return-to-service documentation for each OOS event",
    ],
  },
  {
    num: "06",
    title: "Notes & Patterns",
    items: [
      "Notes on repeated issues (e.g., \"Recurring ABS warning, upgraded sensor and harness 02/15/26\")",
      "Internal decisions (e.g., \"Retired from service 01/05/27 – frame damage\")",
      "Insurer or auditor findings tied to this unit with corrective action taken",
    ],
  },
];

const DVIR_STEPS = [
  {
    num: "01",
    title: "Driver finds a defect",
    detail: "Driver notes the issue on the DVIR — unit number, description, date. Driver signs. Examples: \"Right rear marker light out,\" \"Low air warning intermittent,\" \"Steering has play.\"",
  },
  {
    num: "02",
    title: "Carrier reviews and assigns the repair",
    detail: "Someone checks DVIRs daily or before next dispatch. Decision: fix now (before dispatch), schedule soon (if minor and legal), or take truck OOS until repaired.",
  },
  {
    num: "03",
    title: "Repair is completed and documented",
    detail: "Mechanic creates a repair order: date, unit number, complaint, cause, correction. If it was an OOS defect — brakes, tires, major lighting, steering — unit stays grounded until this is done.",
  },
  {
    num: "04",
    title: "Driver verifies the fix",
    detail: "On the next DVIR, driver confirms the defect has been corrected. Or driver signs the original DVIR again as reviewed and verified.",
  },
  {
    num: "05",
    title: "Retention and retrieval",
    detail: "DVIR and repair order both go into the unit file. For any serious defect or OOS violation in the last year, you can show: DVIR that found it, repair that fixed it, and driver sign-off that confirmed it.",
  },
];

function SectionHeader({ overline, title, id }) {
  return (
    <div style={{ marginBottom: "2rem" }} id={id}>
      {overline && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.728rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          marginBottom: "0.75rem",
        }}>{overline}</p>
      )}
      <h2 style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
        letterSpacing: "-0.015em",
        color: "var(--text)",
        lineHeight: 1.25,
      }}>{title}</h2>
    </div>
  );
}

function Body({ children, style = {} }) {
  return (
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "1.12rem",
      color: "var(--text-muted)",
      lineHeight: 1.85,
      marginBottom: "1.25rem",
      ...style,
    }}>{children}</p>
  );
}

function Callout({ label, children }) {
  return (
    <div style={{
      borderLeft: "2px solid var(--orange)",
      paddingLeft: "1.25rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      paddingRight: "1.25rem",
      background: "var(--bg-2)",
      marginBottom: "1.5rem",
    }}>
      {label && (
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.728rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--orange)",
          marginBottom: "0.6rem",
        }}>{label}</p>
      )}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "1.008rem",
        color: "var(--text-muted)",
        lineHeight: 1.8,
      }}>{children}</div>
    </div>
  );
}

export default function MaintenanceRecordsBrief() {
  const handlePrint = () => window.print();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section data-testid="article-hero" style={{
        background: "var(--bg)",
        padding: "6rem 1.5rem 4rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.84rem",
            color: "var(--text-subtle)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "2.5rem",
          }}>
            ← Operational Library
          </Link>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.728rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "1.5rem",
          }}>
            Compliance Systems — Vehicle & Maintenance (49 CFR Part 396)
          </p>

          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "1.25rem",
          }}>
            Maintenance Records Brief:<br />What Your Unit Files Actually Have to Prove
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.176rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: "2rem",
            maxWidth: 620,
          }}>
            How FMCSA reads your maintenance and inspection records — and how to build unit files that survive roadside, audits, and post-crash investigations.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.806rem",
              color: "var(--text-subtle)",
              letterSpacing: "0.06em",
            }}>14–16 minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.896rem",
              color: "var(--text-subtle)",
            }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.806rem",
              fontWeight: 600,
              color: "var(--orange)",
              background: "var(--orange-muted)",
              padding: "0.25rem 0.75rem",
              letterSpacing: "0.02em",
            }}>
              Required for every CMV in service
            </span>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY BAND ── */}
      <section data-testid="exec-summary" style={{
        background: "var(--bg-2)",
        borderBottom: "1px solid var(--border)",
        padding: "3rem 1.5rem",
      }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center",
        }} className="summary-grid">
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem",
            }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "See what the maintenance rules actually require for 1–3-truck carriers: daily inspections, annuals, repairs, and how long to keep each record.",
                "Understand how inspectors and investigators use your unit files, DVIRs, and roadside reports to decide whether your trucks are \"safe on paper.\"",
                "Learn the most common failure patterns in new entrants: no true unit file, no DVIR lifecycle, and no proof that OOS defects were fixed.",
                "Use a practical 90-day checklist and an example unit-file index so you can build maintenance records that are audit-ready any day a trooper or auditor pulls a truck's history.",
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
            >
              Download unit-file<br />checklist (PDF)
            </button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY — SECTIONS 1–3 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        {/* Section 1 */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="What Maintenance Rules Are Really Trying to Control" id="what-rules-control" />
          <Body>
            Vehicle maintenance rules are not about proving you own a truck — they are about proving you keep it in safe operating condition and fix defects before they hurt someone. At a minimum, regulators want to see that each CMV gets inspected regularly, that drivers are catching obvious defects, and that the carrier is repairing those defects and documenting the work.
          </Body>
          <Body>
            In practice, nobody expects a 1–3-truck carrier to run a dealership-grade shop. They expect you to have a repeatable inspection rhythm (daily and annual), a basic repair plan, and paper or digital evidence that connects "driver found X" to "mechanic fixed X" before the next trip.
          </Body>
          <Callout label="Plain English">
            Maintenance is not about spotless trucks. It is about whether your unit files, DVIRs, and repair orders tell a believable story that you are not ignoring unsafe equipment.
          </Callout>
        </div>

        {/* Section 2 */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="What FMCSA Is Really Checking in Your Unit Files" id="what-fmcsa-checks" />

          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>
            What they want to see for each truck
          </h3>
          <Body>When an investigator picks a unit and asks "Show me the file for this truck," they are looking for four things:</Body>
          {[
            "Proof the truck exists in your system — unit number, VIN, plate, year/make/model, ownership or lease paperwork.",
            "A trail of inspections: daily driver inspections where defects were noted, plus at least one annual (periodic) inspection per year.",
            "Repair records that show defects were corrected and that out-of-service conditions were cleared before the truck went back on the road.",
            "Roadside inspection reports and how you responded to them — especially any OOS violations.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>—</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
            </div>
          ))}

          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "2rem" }}>
            How they connect your paperwork to the real truck
          </h3>
          <Body>Investigators cross-check three things:</Body>
          {[
            "Unit numbers and VINs — do the numbers on your DVIRs, annual inspections, and repair orders all match the same vehicle?",
            "Dates and mileage — do inspections and repairs make sense in time and miles?",
            "Roadside history — when a trooper wrote you up, can they see a follow-up repair order and sign-off, or does the same defect keep reappearing?",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>—</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
            </div>
          ))}

          <div style={{ marginTop: "1.5rem" }}>
            <Callout label="What your unit file proves">
              Your unit file should make it boring and easy for an investigator to see that each truck was inspected, maintained, and repaired in a way that matches how you actually ran it.
            </Callout>
          </div>
        </div>

        {/* Section 3 */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="What Has to Be in Your Maintenance System on Day 1" id="day-one-system" />
          <Body>
            You can grow into software later. On Day 1, a small carrier needs three things that work every single day.
          </Body>

          {[
            {
              title: "Unit identification and file",
              items: [
                "Each CMV gets a unique unit number.",
                "You create a physical or digital folder for that unit with a cover sheet: unit number, VIN, plate, year/make/model, ownership/lease details, and in-service date.",
                "Every maintenance document for that truck gets filed behind that cover sheet.",
              ],
            },
            {
              title: "Daily inspection and DVIR process",
              items: [
                "Drivers perform a walk-around inspection at the start or end of each day the truck is used.",
                "When they find a defect that could affect safety, they record it on a DVIR.",
                "You have a routine for getting DVIRs in front of whoever is responsible for repairs — and for documenting fixes and driver sign-off before the truck runs again.",
              ],
            },
            {
              title: "Annual inspection and basic PM plan",
              items: [
                "Each truck gets a periodic (annual) inspection by a qualified person, with a written report you can produce on demand.",
                "You have a basic preventive maintenance schedule (mileage, hours, or time-based) covering brakes, tires, steering, suspension, and lighting.",
                "You document PM work with repair orders or invoices that tie back to the unit number.",
              ],
            },
          ].map((block) => (
            <div key={block.title} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.875rem" }}>{block.title}</h3>
              {block.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}

          <Callout label="If you have these three building blocks">
            You can add complexity later. Without them, you will always be chasing paperwork when something goes wrong.
          </Callout>
        </div>

      </main>

      {/* ── DVIR LIFECYCLE — full-width band ── */}
      <section data-testid="dvir-lifecycle" style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 4</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            The DVIR Lifecycle: From Defect to Proof of Repair
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 640, marginBottom: "3rem" }}>
            Most new entrants don't fail maintenance because they never look at trucks. They fail because they never close the loop on what their drivers find. A working DVIR lifecycle has five steps — all five, every time.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {DVIR_STEPS.map((s, i) => (
              <div key={s.num} style={{
                display: "grid",
                gridTemplateColumns: "2.25rem 1fr",
                gap: "1.5rem",
                alignItems: "start",
                padding: "1.75rem 0",
                borderTop: "1px solid var(--border)",
                borderLeft: i === 4 ? "2px solid var(--orange)" : "2px solid transparent",
                paddingLeft: i === 4 ? "1.25rem" : "0",
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", paddingTop: "0.3rem", letterSpacing: "0.05em" }}>{s.num}</span>
                <div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.4rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{s.detail}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <Callout label="The loop that must close">
              If you cannot show "defect → repair order → driver verification" on paper for the last bad DVIR, your maintenance system is not complete — regardless of how much work was actually done.
            </Callout>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY — SECTION 5 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 5" title="The LaunchPath Maintenance Operating Standard" id="maintenance-standard" />
          <Body>
            Instead of throwing invoices in a drawer, you treat your maintenance system like every other binder in the LaunchPath Standard. One file per truck, one rhythm per week, one review per month.
          </Body>

          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>System inputs</h3>
          <Body>Four sources feed your maintenance standard:</Body>
          {[
            "Driver inputs: DVIRs, roadside inspection reports, and driver complaints.",
            "Shop inputs: repair orders, PM checklists, parts invoices.",
            "Planning inputs: your PM schedule by unit and in-service dates.",
            "Risk inputs: OOS reports, crash investigations, and any insurer or auditor findings tied to specific equipment.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: "0.625rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem", color: "var(--orange)", marginTop: "0.3rem", flexShrink: 0 }}>—</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2.5rem" }} className="behaviors-grid">
            {[
              {
                period: "Weekly",
                items: [
                  "Review DVIRs with defects and confirm each has a matching repair order or scheduled work.",
                  "Confirm no truck is dispatched with an OOS-level defect that has not been repaired.",
                  "File new repair orders in the correct unit folders.",
                ],
              },
              {
                period: "Monthly",
                items: [
                  "Walk one unit file end-to-end for the last 90–180 days: DVIRs, roadside reports, repairs, and annual inspection.",
                  "Update your PM tracker: each unit and when its next service or annual inspection is due.",
                  "Review repeated defects on the same unit and decide whether to adjust your PM plan.",
                ],
              },
            ].map((block) => (
              <div key={block.period} style={{ background: "var(--bg-2)", padding: "1.75rem", border: "1px solid var(--border)" }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "1rem" }}>{block.period}</p>
                {block.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", marginTop: "0.3rem", flexShrink: 0 }}>—</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── 90-DAY CHECKLIST TABLE ── */}
      <section data-testid="maintenance-checklist-table" style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            90-Day Maintenance Readiness Checklist
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Use this in the 90 days before an audit — or as a recurring quarterly review — to keep your maintenance system audit-ready.
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

      {/* ── UNIT FILE INDEX ── */}
      <section data-testid="unit-file-index" className="audit-binder-section" style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6 — Supplement</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            Example Unit File: Tractor 101
          </h2>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
            2019 Freightliner Cascadia — VIN XXXXX — Plate ABC123
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            Use this as a model for structuring each truck's file. If an investigator flips through it, they should be able to follow the history of that truck without asking you to explain every page.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", marginBottom: "2.5rem" }}>
            {UNIT_FILE_SECTIONS.map((tab) => (
              <div key={tab.num} className="binder-tab" style={{ background: "var(--bg)", padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem", paddingBottom: "0.875rem", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", letterSpacing: "0.1em" }}>TAB {tab.num}</span>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", lineHeight: 1.3 }}>{tab.title}</h3>
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

          <button onClick={handlePrint} data-testid="download-unit-file-btn" style={{
            background: "none", border: "1px solid var(--border)", color: "var(--text-muted)",
            fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 600,
            padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            Print / Save Unit File Index as PDF
          </button>
        </div>
      </section>

      {/* ── ARTICLE BODY — SECTIONS 7–8 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 7" title="When Your Unit Files Don't Match Your Trucks" id="files-dont-match" />
          <Body>
            If you pull a truck's file and it doesn't match what that truck has actually been through, you have the same two problems as in HOS and D&A: safety risk and credibility risk. When your paperwork shows no DVIRs, no repairs, or no annual inspection — but your drivers know the truck is in and out of the shop — investigators will assume your safety management controls are weak or nonexistent.
          </Body>
          <Body>
            If that gap shows up after a serious crash, the unit file becomes evidence of what you did not do. That is a different problem than a compliance audit. When you find gaps, fix them, document what changed, and avoid retroactively filling in records to "clean things up" without fixing the underlying pattern.
          </Body>
          <Callout label="Audit posture">
            It is better to show that you find gaps, fix them, and tighten your process than to pretend you run a perfect system and let investigators discover the missing pieces for you.
          </Callout>
        </div>

        {/* CTA */}
        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em",
            color: "var(--text)", marginBottom: "1rem",
          }}>
            Build one unit file this week. Start with your oldest truck.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)",
            lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520,
          }}>
            Pull the last 90 days of DVIRs, match them to repair orders, and confirm you have a current annual inspection on file. That one exercise tells you exactly where your maintenance system stands before any auditor does.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a href="https://www.launchpathedu.com/auto-diagnostic" target="_blank" rel="noopener noreferrer"
              data-testid="article-diagnostic-cta"
              style={{
                display: "inline-block", background: "var(--orange)", color: "#fff",
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.98rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >
              Run the Ground 0 Readiness Test
            </a>
            <button onClick={handlePrint} data-testid="download-checklist-cta" style={{
              background: "none", border: "1px solid var(--border)", color: "var(--text-muted)",
              fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", fontWeight: 600,
              padding: "1rem 2rem", cursor: "pointer", letterSpacing: "0.03em",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              Download Maintenance Audit Binder (PDF)
            </button>
          </div>
        </div>

      </main>

      {/* Portal cross-link */}
      <ArticlePortalBanner
        taskId="PM-001"
        taskName="Preventive Maintenance Schedule"
        message="A documented PM schedule is Standard Task PM-001 in the LaunchPath Operating System. Operators enrolled in the Standard submit their maintenance program for coach verification and track it as part of their Documentary Integrity score."
      />

      {/* Operating Standard Library footer strip */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#000F1F",
        padding: "2rem 2.5rem",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.84rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
          }}>
            This brief is part of the{" "}
            <a href="/operating-standard" style={{ color: "#C5A059", textDecoration: "none" }}>
              LaunchPath Operating Standard Library
            </a>
            .
          </p>
          <a href="/operating-standard" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.728rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.7)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            View the Full Standard →
          </a>
        </div>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .summary-grid { grid-template-columns: 1fr !important; }
          .download-col { text-align: left !important; }
          .behaviors-grid { grid-template-columns: 1fr !important; }
        }
        @media print {
          body * { visibility: hidden; }
          .audit-binder-section, .audit-binder-section * { visibility: visible; }
          .audit-binder-section {
            position: absolute; left: 0; top: 0; width: 100%;
            background: white !important; color: black !important; padding: 2rem !important;
          }
          .audit-binder-section h2, .audit-binder-section h3 { color: black !important; }
          .audit-binder-section p, .audit-binder-section span, .audit-binder-section label { color: #333 !important; }
          .audit-binder-section .binder-tab { background: white !important; border: 1px solid #ccc; margin-bottom: 0.5rem; }
          .audit-binder-section button { display: none !important; }
        }
      `}</style>
    </div>
  );
}
