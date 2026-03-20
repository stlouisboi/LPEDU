import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const RISK_PATTERNS = [
  {
    category: "Time-Stamp Anomalies",
    items: [
      "Driver qualification file elements dated within a narrow window just before a known audit — suggesting the file was assembled in response to notice rather than at hire.",
      "Annual vehicle inspections clustered in the same period as the file review, rather than distributed according to the vehicle's actual inspection calendar.",
      "Drug and alcohol testing records that show a burst of activity in the weeks before audit, inconsistent with the required testing rates over the prior period.",
    ],
  },
  {
    category: "Form and Format Inconsistency",
    items: [
      "DVIR forms in three different formats within the same vehicle file — suggesting they were collected from different sources at different times rather than maintained continuously.",
      "Driver application forms that look different for drivers hired in the same period — suggesting they were not standardized from a working system.",
      "Log books or ELD printouts that begin mid-period with no explanation of prior records — indicating the logging system was not in place from Day 1.",
    ],
  },
  {
    category: "No Roadside Inspection History",
    items: [
      "A carrier operating for 90 days with significant interstate mileage but zero roadside inspection contacts — an absence that investigators note rather than credit.",
      "An SMS record with no data for the new entrant period, which investigators understand to mean either no operations were conducted or roadside contacts were not being reported.",
      "No record of any violation or out-of-service condition — possible for a well-run operation but uncommon enough that investigators probe the underlying records more carefully.",
    ],
  },
  {
    category: "Maintenance Record Clustering",
    items: [
      "All repair invoices from a two-week window despite 90 days of operation — suggesting the repair documentation was collected retroactively rather than maintained as repairs occurred.",
      "Repair documentation that doesn't reference any DVIR — the defect that triggered the repair is not traceable to an inspection report.",
      "Annual inspection dated after a roadside violation for the same component — suggesting the annual inspection was completed in response to the violation, not as part of a proactive schedule.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Run a file completeness audit against all six FMCSA audit categories before Day 90.",
    why: "Identifies exactly what is present and what is absent in your compliance record before the audit exposure window opens — while there is still time to respond forward.",
  },
  {
    step: "02",
    action: "Check all document dates against your operational timeline — do creation dates make chronological sense?",
    why: "Date inconsistencies are one of the first things investigators examine when assessing whether a record was built contemporaneously or reconstructed. Finding them yourself first allows you to understand and explain them.",
  },
  {
    step: "03",
    action: "Identify all genuine gaps honestly: missing DVIRs, absent pre-employment test results, incomplete DQ file elements.",
    why: "Honest gap identification allows for a forward-looking response. Gaps discovered and corrected are categorically different from gaps uncovered by an investigator.",
  },
  {
    step: "04",
    action: "For each gap, document when you identified it and what the correct forward-looking response is.",
    why: "Building a gap disclosure log — dated entries showing what you found and what you are doing about it — is itself evidence of a functioning compliance system.",
  },
  {
    step: "05",
    action: "Correct gaps with current, accurately-dated documentation — not backdated records.",
    why: "Backdated records are fabrication. If discovered, they convert a compliance gap into a conduct finding that has consequences far beyond the original deficiency.",
  },
  {
    step: "06",
    action: "Reconcile HOS records against dispatch records for the full 90-day period.",
    why: "Unexplained HOS-to-dispatch discrepancies are among the findings most likely to generate additional scrutiny after the initial audit.",
  },
  {
    step: "07",
    action: "Confirm all five DQ file elements are current for every active CDL driver.",
    why: "DQ file deficiencies are the most common finding on New Entrant audit — and one of the most addressable when identified before the audit rather than during it.",
  },
  {
    step: "08",
    action: "Brief your drivers on what to expect during an audit — what investigators ask, what records they request, and the importance of accurate responses.",
    why: "Drivers who are unfamiliar with their own qualification files or testing records create investigator impressions of a carrier that does not know what it is supposed to be maintaining.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "File Completeness Audit",
    items: [
      "Completed 90-day self-audit checklist covering all six FMCSA audit categories",
      "Date of audit completion and name of person who conducted it",
      "List of items reviewed and findings — present, absent, or needs correction",
      "Priority ranking of items needing corrective action before the audit window",
    ],
  },
  {
    num: "02",
    title: "Gap Disclosure Log",
    items: [
      "Each identified gap listed with: description, date identified, root cause, and corrective action taken",
      "All corrections accurately dated with the actual date of correction — not the date the gap originated",
      "Supporting documentation for each correction referenced or attached",
      "Running log that continues through the monitoring period — not a one-time document",
    ],
  },
  {
    num: "03",
    title: "HOS–Dispatch Reconciliation",
    items: [
      "90-day dispatch log alongside corresponding HOS records for cross-reference",
      "Note of any discrepancies identified with explanation",
      "Fuel records for cross-reference against routing and driving time",
      "Any log corrections made — with original entry, correction, and reason documented",
    ],
  },
  {
    num: "04",
    title: "DQ File Status — All Active Drivers",
    items: [
      "Status sheet for each active driver: all five elements listed, current status, and next renewal date",
      "Medical certificate current dates and examiner information",
      "Annual MVR review status and next review date",
      "Any driver status changes in the 90-day period — hire, termination, leave of absence",
    ],
  },
  {
    num: "05",
    title: "Audit-Ready Summary Sheet",
    items: [
      "One-page narrative summary of compliance status per FMCSA audit category as of Day 90",
      "Statement of systems in place: D&A program active, DQ files current, maintenance rhythm operational",
      "Known limitations or gaps with explanation of current status",
      "Contact information for TPA, insurance agent, and any third-party compliance resources used",
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

export default function PreparationReconstructionBrief() {
  useSEO({
    title: "LP-BRF-10: Preparation vs. Reconstruction — What Investigators See | LaunchPath",
    description: "The difference between a carrier that built its compliance systems and one that is rebuilding under scrutiny — what investigators read in the record and how to respond when gaps are found at Day 60.",
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
            LP-BRF-10 — Audit Exposure Window (49 CFR Part 385)
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            Preparation vs. Reconstruction:<br />What Investigators See
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            There is a difference between a carrier that built its systems and one attempting to reconstruct them under scrutiny. Investigators read that difference in the record — in date patterns, form consistency, and the presence of contemporaneous documentation. This brief shows what each side looks like.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>12-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "var(--text-sm)" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Days 60–90 audit hardening
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
                "Understand exactly what an 'audit-ready' compliance file looks like — and why it is fundamentally different from a file assembled in response to an audit notice.",
                "Learn how investigators detect reconstruction: the time-stamp patterns, form inconsistencies, and evidence gaps that reveal a file was not built contemporaneously.",
                "See the four most common reconstruction tells that appear in the Days 60–90 record — and what they signal to investigators beyond the individual deficiency.",
                "Use the 90-day audit hardening checklist to conduct an honest self-audit and respond to gaps forward, not backward.",
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
            >Download 90-day<br />audit hardening checklist (PDF)</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="The Anatomy of an Audit-Ready File" id="audit-ready" />
          <Body>
            An audit-ready compliance file is not a well-organized collection of documents. It is a record that was built continuously — one that reflects how the carrier actually operated over time. The characteristics that make it credible are not just completeness. They are internal consistency, chronological logic, and the absence of clustering patterns that suggest sudden assembly.
          </Body>
          <Body>
            A prepared file has DVIRs distributed across all operating days — not grouped. HOS records that span the full period without unexplained gaps. Driver qualification files assembled at hire, with updates reflecting the actual dates of medical renewals and MVR checks. D&A testing records that reflect a consistent program rhythm, not a burst of testing activity coinciding with audit notice.
          </Body>
          <Callout label="The credibility signal">
            A file that was built day-by-day shows normal variation — a missed DVIR here, an annotated log there, a renewal that came in three weeks late. That variation is realistic. A file that is uniformly complete with no variation is more likely to be reconstructed than maintained. Investigators know the difference.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="How Investigators Detect Reconstruction" id="detect-reconstruction" />
          <Body>
            FMCSA investigators are trained to read compliance records as evidence — not just as checklists. The patterns they look for when assessing whether a file is genuine include date clustering, format inconsistency, and the absence of the normal noise that comes with maintaining records in real time.
          </Body>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem" }}>Date clustering</h3>
          <Body>
            When multiple file elements that should have been created over time — driver applications, medical certificates, road test forms, DVIR reports — all carry dates within a narrow window, investigators recognize it as an assembly event. The question they ask is not "are these documents present?" but "when were they actually created?"
          </Body>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Format inconsistency</h3>
          <Body>
            A DQ file assembled from a working system uses the same forms consistently — same format, same fields, same structure. A file assembled from multiple sources at different times shows variation in form format that reflects when and where each element was gathered. Investigators read this as an indicator of file assembly rather than file maintenance.
          </Body>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>The absence of normal operational noise</h3>
          <Body>
            Real compliance records have imperfections. A pre-trip DVIR with a notation. A log entry that was corrected. A renewal that was three days late. A file with no imperfections over 90 days of operations is statistically unusual — and investigators treat unusual as suspicious rather than exemplary.
          </Body>
          <Callout label="What reconstruction cannot fix">
            A reconstruction cannot create credible contemporaneous evidence after the fact. A dated DVIR with yesterday's date filed in a slot for a day 60 days ago is visible to any investigator who cross-references dates against trip logs, fuel records, or maintenance invoices. Reconstruction is almost always visible — and attempting it after receiving audit notice makes the original gap worse.
          </Callout>
        </div>

        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="What to Do When You Find Gaps at Day 60" id="gaps-at-60" />
          <Body>
            If you conduct a Day 60 file review and find genuine gaps — missing DVIRs, incomplete DQ file elements, absent test documentation — the correct response is forward-looking correction, not backward-looking reconstruction.
          </Body>
          <BulletList items={[
            "Document the gap: write a dated note identifying what is missing and when you discovered it. This becomes your gap disclosure log entry.",
            "Correct forward: fill what can be filled with current, accurately-dated documentation. A missing MVR can be ordered today and filed with the correct current date.",
            "Do not backdate: a DVIR filed today with a date from 45 days ago is fabrication, not correction. The original gap is a compliance deficiency. The backdated record is a conduct finding.",
            "Assess systemic cause: a single missing DVIR is a gap. Twenty missing DVIRs suggest the system was not in place. The corrective response differs accordingly.",
            "Note corrections in your gap disclosure log: showing that you identified and corrected gaps proactively is itself evidence of a functioning compliance system.",
          ]} />
          <Callout label="The distinction that matters at audit">
            A carrier that identified a gap, documented when it found it, corrected it with current documentation, and noted the correction — shows a compliance system that responds to its own findings. That is a different posture than a carrier that had no record of the gap until the investigator found it.
          </Callout>
        </div>

      </main>

      <section data-testid="risk-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 4</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Reconstruction Tells That Investigators Read
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            These are the evidence patterns that signal reconstruction to an investigator. They are not necessarily proof of intentional falsification — but they are signals that the file was assembled rather than maintained, which changes how the investigator reads every other document in the record.
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
          <SectionHeader overline="Section 5" title="The 30-Day Audit Hardening Standard" id="audit-hardening" />
          <Body>
            The 30-day audit hardening sprint for Days 60–90 is not about creating documents — it is about reviewing your existing record for credibility, identifying genuine gaps, and correcting them forward. The standard has four components.
          </Body>
          <BulletList items={[
            "Self-audit against all six FMCSA audit categories. Not a summary review — a document-level check of what is present, what is dated, and what is internally consistent.",
            "Gap disclosure log. Every gap found is documented with the date of discovery and the forward-looking correction. This log is itself an audit exhibit — it shows a carrier that knows what it is supposed to have and acts on gaps.",
            "DQ file currency check. Every active driver's file reviewed for current medical certificate, current MVR, and all five required elements. Renewals initiated where needed.",
            "HOS-dispatch reconciliation. 90-day logs and dispatch records reviewed side-by-side. Unexplained discrepancies noted and assessed. Corrections made at the record level with annotations, not by replacement.",
          ]} />
          <Callout label="Entering the review period">
            A carrier that completes the 90-day audit hardening standard enters Month 9 with a self-audited record, a gap disclosure log, and current driver files. That is a defensible posture. It is not perfection — but it is preparation. LP-BRF-11 covers what happens in the review period itself.
          </Callout>
        </div>
      </main>

      <section data-testid="audit-checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            90-Day Audit Hardening Checklist
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Complete before Day 90. Keep a dated printout in your compliance binder as a record of when the review was conducted and what was found.
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

      <section data-testid="audit-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 6 — Supplement</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            Audit Hardening Binder — 90-Day Review
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            This binder documents your 90-day self-audit and the corrective actions taken. It is your evidence that you review your own compliance record — separate from and in addition to the records themselves.
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
          >Print / Save Audit Hardening Binder as PDF</button>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Complete your 90-day self-audit before the review period opens.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            The review period begins as early as Month 9. That is the point at which FMCSA may contact you with an audit request. If you have not conducted your own review by Day 90, you are entering the audit exposure window without knowing what your record shows. LP-BRF-11 covers what triggers an unannounced audit and what investigators examine.
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
            >Download 90-Day Audit Hardening Checklist (PDF)</button>
          </div>
        </div>
      </main>

      <ArticlePortalBanner
        taskId="AUD-001"
        taskName="90-Day Audit Readiness Review"
        message="Completing the 90-day self-audit and building the gap disclosure log is Standard Task AUD-001 in the LaunchPath Operating System. Operators enrolled in the Standard submit their completeness findings and corrections for coach review before entering the New Entrant review period."
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
