import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const RISK_PATTERNS = [
  {
    category: "Irregular DVIR Cadence",
    items: [
      "DVIRs missing for specific days of the week or specific units — suggesting the inspection habit exists for some runs but not others.",
      "Clusters of 'no defects' entries followed by maintenance repairs — indicating defects existed and were not being reported.",
      "DVIR dates that do not align with trip dispatch records or fuel purchase history.",
    ],
  },
  {
    category: "HOS Log Inconsistencies",
    items: [
      "Log entries showing off-duty status during periods where fuel records or toll data show the vehicle moving.",
      "Driving times that are mathematically inconsistent with routes and known distances.",
      "Logs corrected or annotated in batches rather than at the time of the event — suggesting end-of-week reconstruction.",
    ],
  },
  {
    category: "D&A Program Gaps",
    items: [
      "TPA random testing selection received but no test documentation on file — the selection notice was received and not acted on.",
      "Driver added to operations in Month 2 without pre-employment test — second driver treated differently from first.",
      "Random testing rate falling below required minimum percentage because no mechanism existed to track obligations.",
    ],
  },
  {
    category: "Maintenance Pattern Breaks",
    items: [
      "No defect repairs documented despite DVIRs showing recurring defect entries for the same unit.",
      "Annual inspection expiration occurring mid-period without replacement — vehicle operated with lapsed annual inspection.",
      "Roadside inspection violation issued for a component that was not defected on any prior DVIR, suggesting the inspection habit existed on paper only.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Pull all DVIRs from Days 30–60 and confirm one exists for every operating day per active unit.",
    why: "A continuous DVIR record from the opening of operations is the foundational evidence of your inspection system. Gaps here are the most commonly cited deficiency.",
  },
  {
    step: "02",
    action: "Reconcile HOS logs against dispatch records and fuel receipts for the full 60-day period.",
    why: "Investigators cross-reference HOS logs with external data. Unexplained discrepancies between log records and operational data are treated as evidence of systemic non-compliance.",
  },
  {
    step: "03",
    action: "Confirm all required D&A random testing selections have been acted on and results filed.",
    why: "Random selections that arrive without corresponding test documentation are an immediate audit flag — the obligation existed and the carrier failed to fulfill it.",
  },
  {
    step: "04",
    action: "Review driver qualification files for all active CDL drivers — confirm all elements are still current.",
    why: "Medical certificates expire. MVR checks have annual obligations. DQ file elements that were complete at Day 1 may no longer be current by Day 60.",
  },
  {
    step: "05",
    action: "Log any roadside inspection results from Days 30–60 in your vehicle file and assess impact on SMS scores.",
    why: "SMS BASIC scores are updated regularly. Tracking inspection results at the carrier level allows proactive response before threshold alerts are triggered.",
  },
  {
    step: "06",
    action: "Document all maintenance performed in Days 30–60 against the original DVIR defect entry that triggered it.",
    why: "The traceability chain — defect reported on DVIR, repair completed and documented — is what investigators use to determine whether your maintenance system is functional.",
  },
  {
    step: "07",
    action: "Update your fleet and driver rosters to reflect any changes — units added, drivers terminated or hired.",
    why: "Roster changes create file obligations. A new driver needs a new DQ file. A unit added needs an inspection baseline. Undocumented changes create gaps that compound.",
  },
  {
    step: "08",
    action: "Complete a Day 60 operating pattern review — what record has your operation produced in the first 60 days?",
    why: "Reviewing your own evidence at Day 60 is the last chance to identify and address systemic patterns before the audit exposure window opens.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "HOS Record Set — Days 1–60",
    items: [
      "Complete HOS logs for each driver — ELD exports or paper logs — for the full 60-day period",
      "Log correction documentation if any entries were amended — correction must show original entry and reason for change",
      "Short-haul exemption documentation if applicable",
      "Dispatch records alongside logs for cross-reference",
    ],
  },
  {
    num: "02",
    title: "DVIR Continuity File — Days 1–60",
    items: [
      "All pre-trip and post-trip DVIRs organized by unit and date",
      "Defect-to-repair traceability: each noted defect linked to its repair documentation",
      "Certification of repairs from mechanic or qualified personnel for all defects noted",
      "Note of any units that were out of service and their return-to-service documentation",
    ],
  },
  {
    num: "03",
    title: "D&A Program Record — 60-Day Status",
    items: [
      "Pre-employment test results for all CDL drivers hired in the period",
      "Random selection notices received and corresponding test documentation",
      "TPA communication log for random pool status and compliance rate",
      "Any positive test results, refusals, or return-to-duty documentation",
    ],
  },
  {
    num: "04",
    title: "Driver Status Updates",
    items: [
      "Medical certificate currency — any renewals due or completed in the period",
      "Annual MVR review documentation if applicable",
      "Any license status changes, violations, or disqualifying events reported by drivers",
      "New driver DQ files for any additions to the roster",
    ],
  },
  {
    num: "05",
    title: "Day 60 Pattern Review Notes",
    items: [
      "Self-audit checklist completed at Day 60 with items reviewed and findings noted",
      "Gaps identified and corrective actions taken — with dates",
      "Roadside inspection history: inspection results received, violations, out-of-service conditions",
      "SMS snapshot pulled at Day 60 — BASIC category scores and any alert-threshold proximity",
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

export default function OperatingPatternsBrief() {
  useSEO({
    title: "LP-BRF-09: How Operating Patterns Become Audit Evidence | LaunchPath",
    description: "How logs, maintenance activity, dispatch behavior, and file upkeep accumulate into the operating pattern that FMCSA investigators review — and what your 60-day record needs to show.",
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
            LP-BRF-09 — Pattern Formation (49 CFR Parts 382 · 391 · 395 · 396)
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            How Operating Patterns<br />Become Audit Evidence
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            By Day 60, your logs, DVIRs, dispatch records, and drug and alcohol testing activity have formed a pattern. Investigators don't read individual documents — they read patterns. What does yours look like?
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>12-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Days 30–60 pattern review
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
                "Understand what 'operating pattern' means to an FMCSA investigator — and why pattern analysis is different from document review.",
                "Learn the four evidence streams that accumulate in Days 30–60 and what each stream needs to show to support a Satisfactory outcome.",
                "See the four most common pattern failures that emerge in this window — DVIR gaps, HOS inconsistencies, D&A program breaks, and maintenance chain failures.",
                "Use the Day 60 pattern review checklist to assess your record before the audit exposure window opens.",
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
            >Download pattern review<br />checklist (PDF)</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="What 'Operating Pattern' Means to an Investigator" id="operating-pattern" />
          <Body>
            An FMCSA safety investigator reviewing a new entrant's file is not reading documents sequentially. They are looking for patterns — the recurring structures in the evidence that reveal whether a compliance system exists and is being maintained, or whether documentation is being created to satisfy a requirement rather than to manage an actual operational habit.
          </Body>
          <Body>
            A pattern that supports a Satisfactory finding shows consistency across time and across categories: DVIRs that exist for every operating day, HOS logs that are internally consistent and match dispatch records, maintenance documentation that traces defects to repairs, and D&A testing records that reflect an ongoing managed program. The absence of any one pattern does not automatically produce an adverse finding — but the absence of consistent patterns across multiple categories tells the investigator that the carrier has systems on paper but not in practice.
          </Body>
          <Callout label="How patterns are read">
            An investigator who sees 45 days of DVIRs with no defects on a high-mileage truck, followed by a maintenance invoice for brake work, is not reading a compliant maintenance record. They are reading evidence that defects were not being reported. The pattern across time is the finding — not any single document.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="The Four Evidence Streams That Form in Days 30–60" id="evidence-streams" />

          {[
            {
              title: "HOS and Dispatch Consistency",
              desc: "Your HOS logs, dispatch records, and fuel purchase history should tell the same story. The investigator cross-references all three. Logs that are internally consistent but don't match fuel stops or known route distances are identified as probable reconstruction. Dispatch logs that show loads not reflected in HOS records suggest unreported driving time.",
            },
            {
              title: "DVIR Inspection Rhythm",
              desc: "DVIRs should exist for every operating day — pre-trip and post-trip — for every unit. The investigator counts operating days from the dispatch log and cross-references DVIR dates. Systematic gaps indicate the inspection was not being performed. Noted defects without corresponding repairs indicate a defect reporting system that was not connected to a repair system.",
            },
            {
              title: "Drug & Alcohol Program Continuity",
              desc: "The D&A program record should show that the program was running continuously from the pre-employment tests through random selection compliance. TPA records, testing results, and the driver roster should be internally consistent. The investigator checks whether the number of drivers enrolled matches the actual driver roster and whether required testing rates are being maintained.",
            },
            {
              title: "Driver Qualification Currency",
              desc: "DQ files that were complete at Day 1 may have elements that have lapsed or changed by Day 60. Medical certificates expire. An annual MVR review may be due. A second driver added to the roster needs a complete file. The pattern of file maintenance — whether elements are updated proactively or only when an auditor checks — is itself a finding.",
            },
          ].map((block) => (
            <div key={block.title} style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>{block.title}</h3>
              <Body style={{ marginBottom: "0.5rem" }}>{block.desc}</Body>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="What Your 60-Day Record Needs to Show" id="60day-record" />
          <Body>
            At Day 60, your compliance record is approximately one-third of the way through the minimum monitoring period. What it needs to show is not perfection — it needs to show that a system exists and is being maintained. The investigator's question is not "did anything go wrong?" — the question is "does the record reflect how this carrier actually operates?"
          </Body>
          <BulletList items={[
            "HOS records that are internally consistent and match dispatch activity — with corrections documented at the time of the event, not reconstructed in batches.",
            "A continuous DVIR record where defect entries can be traced to repair documentation — showing that the inspection report is connected to the maintenance system.",
            "D&A program records that reflect an ongoing managed program — with testing obligations being met, selections being acted on, and TPA communications on file.",
            "DQ files that are current for all active drivers — medical certificates not expired, MVRs obtained, file elements updated as drivers change status.",
            "A dispatch log that creates a consistent record of operational activity against which all other records can be cross-referenced.",
          ]} />
          <Callout label="The 60-day threshold">
            If your record at Day 60 does not reflect consistent operating habits, the window to address it before the audit exposure period opens is narrow. LP-BRF-10 covers what to do when gaps are found at Day 60 — and what investigators see when a carrier was not prepared.
          </Callout>
        </div>
      </main>

      <section data-testid="risk-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 4</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Pattern Failures That Emerge in Days 30–60
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            These are the patterns that appear in the evidence record between Days 30 and 60 when a carrier's operational habits don't match its documentation. Each one signals something to an investigator beyond the individual document deficiency.
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
          <SectionHeader overline="Section 5" title="The Pattern-Formation Operating Standard" id="pattern-standard" />
          <Body>
            The standard for Days 30–60 is not about adding new systems — it is about maintaining the systems that should have been installed in the first 30 days. The pattern-formation standard has three rules.
          </Body>
          <BulletList items={[
            "Maintain the rhythm: pre-trip DVIR, dispatch log entry, HOS logging, post-trip DVIR — every day, every unit that operates.",
            "Trace every defect: any item noted on a DVIR must be routed to your mechanic and documented as repaired before the unit is returned to service.",
            "Review at Day 60: pull your own file and ask whether the record produced reflects how you actually operate. If it does not, identify why and address it before the audit exposure window opens.",
          ]} />
          <Callout label="What the standard produces">
            A carrier that maintains the pattern-formation standard through Day 60 enters the audit exposure window with a record that can answer the investigator's core question — 'does this carrier have systems?' — with contemporaneous documentation rather than explanation.
          </Callout>
        </div>
      </main>

      <section data-testid="pattern-checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Day 60 Pattern Review Checklist
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Complete this review at Day 60 and keep a dated note of what was found. This becomes part of your audit preparation record.
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

      <section data-testid="pattern-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6 — Supplement</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            60-Day Pattern Evidence Binder
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            This binder captures the first 60 days of operational pattern evidence. Assemble at Day 60 and review for consistency. It is your record of how the operation has actually been running.
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
          >Print / Save 60-Day Pattern Binder as PDF</button>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Review your 60-day record before proceeding into the audit exposure window.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            If you are in Days 30–60, do the pattern review now. LP-BRF-10 explains what investigators see when they compare a carrier that built its systems to one that is rebuilding under scrutiny — and what to do when gaps are found at Day 60.
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
            >Download Pattern Review Checklist (PDF)</button>
          </div>
        </div>
      </main>

      <ArticlePortalBanner
        taskId="OPS-002"
        taskName="Operating Pattern Review"
        message="Completing the Day 60 pattern review is Standard Task OPS-002 in the LaunchPath Operating System. Operators enrolled in the Standard document their 60-day file completeness findings and corrections as part of their compliance rhythm."
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
