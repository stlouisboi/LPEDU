import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const FAILURE_PATTERNS = [
  {
    category: "No Pre-Employment Test or Query",
    items: [
      "Hiring CDL drivers — including family or long-trusted contacts — and dispatching them before a pre-employment drug test and Clearinghouse query are complete.",
      "Assuming a driver's clean record means no query is needed. The Clearinghouse requirement applies every time, every hire.",
    ],
  },
  {
    category: "Wrong or Missing Random Pool",
    items: [
      "No random testing pool enrollment until after an audit letter arrives.",
      "Running tests with a non-DOT panel — the drug panel must comply with Part 40 requirements, not a general employment screen.",
      "Treating random testing as annual rather than maintaining a standing pool with selections throughout the year.",
    ],
  },
  {
    category: "No Written Policy or DER",
    items: [
      "No written D&A policy that has been acknowledged by each covered driver.",
      "No Designated Employer Representative identified — no one in the company is responsible for receiving test results and taking required action.",
      "Supervisor reasonable-suspicion training never completed or not documented.",
    ],
  },
  {
    category: "Clearinghouse Gaps",
    items: [
      "Company never registered in the FMCSA Drug & Alcohol Clearinghouse.",
      "Annual queries not run on employed drivers — the annual limited query requirement is separate from the pre-employment full query.",
      "Driver consent documentation for queries missing from driver files.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Register your company in the FMCSA Drug & Alcohol Clearinghouse.",
    why: "Required before you can run pre-employment or annual queries on CDL drivers. The Clearinghouse is non-optional for interstate CDL operations.",
  },
  {
    step: "02",
    action: "Select and contract with a DOT-compliant consortium or TPA for collections, labs, and random selections.",
    why: "Your consortium handles the mechanics of Part 40 compliance — collection site network, certified lab, MRO — so your program meets federal standards.",
  },
  {
    step: "03",
    action: "Adopt a written D&A policy aligned with 49 CFR Part 382 and Part 40.",
    why: "A written policy is a specific regulatory requirement. It must cover all test types, consequences, and how you handle violations.",
  },
  {
    step: "04",
    action: "Name your Designated Employer Representative (DER) and document that designation.",
    why: "The DER is the person who receives test results, takes required action on positives and refusals, and ensures program compliance. FMCSA expects one to exist.",
  },
  {
    step: "05",
    action: "Complete and document supervisor reasonable-suspicion training.",
    why: "Any supervisor who can send a driver for reasonable-suspicion testing must complete specific training on the signs and symptoms of drug and alcohol misuse.",
  },
  {
    step: "06",
    action: "Run a pre-employment drug test and full Clearinghouse query on every current and new CDL driver before dispatch.",
    why: "Pre-employment testing and Clearinghouse queries are required before a driver operates a CMV for the first time under your authority — no exceptions.",
  },
  {
    step: "07",
    action: "Confirm all covered drivers are enrolled in the random testing pool with your consortium.",
    why: "Random testing is not a one-time event — it requires a standing pool. Every covered driver must be enrolled and available for selection at all times.",
  },
  {
    step: "08",
    action: "Audit each driver's D&A file: policy receipt, CDL copy, Clearinghouse consent, pre-employment test result, and annual query history.",
    why: "A complete D&A file per driver lets you respond immediately when an auditor asks for proof that you kept unsafe drivers out of service.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "Written Policy & DER Documentation",
    items: [
      "Current written D&A policy, dated and signed — aligns with 49 CFR Part 382 and Part 40",
      "Policy acknowledgement signatures from all covered drivers, with dates",
      "Designated Employer Representative (DER) name, title, and contact information documented",
      "Policy revision history — at least one review per year",
    ],
  },
  {
    num: "02",
    title: "Clearinghouse Registration & Query Records",
    items: [
      "Company Clearinghouse registration confirmation",
      "Pre-employment full query for each driver — date, driver CDL, and result",
      "Driver consent documentation for each Clearinghouse query",
      "Annual limited query records for currently employed drivers",
    ],
  },
  {
    num: "03",
    title: "Random Testing Program",
    items: [
      "Consortium or TPA enrollment agreement and program documentation",
      "Random selection lists — each selection round, names drawn, dates",
      "Completed random test results (negative or positive) by driver and date",
      "Annual MIS (Management Information System) data if applicable",
    ],
  },
  {
    num: "04",
    title: "Pre-Employment & Driver Test History",
    items: [
      "Pre-employment drug test chain-of-custody form and lab result — per driver",
      "Any post-accident test records with supporting documentation (crash report, time of test)",
      "Reasonable-suspicion test records with supervisor observations documented",
      "Return-to-duty and follow-up testing records where applicable",
    ],
  },
  {
    num: "05",
    title: "Supervisor Training",
    items: [
      "Reasonable-suspicion training completion certificate for each qualifying supervisor",
      "Training provider documentation (60 minutes on alcohol signs, 60 minutes on drug signs)",
      "Date of training relative to supervisory duties — training must precede supervisor authority to refer drivers for testing",
    ],
  },
];

function SectionHeader({ overline, title, id }) {
  return (
    <div style={{ marginBottom: "2rem" }} id={id}>
      {overline && (
        <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>{overline}</p>
      )}
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", lineHeight: 1.25 }}>{title}</h2>
    </div>
  );
}

function Body({ children, style = {} }) {
  return (
    <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.25rem", ...style }}>{children}</p>
  );
}

function Callout({ label, children }) {
  return (
    <div style={{ borderLeft: "2px solid var(--orange)", paddingLeft: "1.25rem", paddingTop: "1rem", paddingBottom: "1rem", paddingRight: "1.25rem", background: "var(--bg-2)", marginBottom: "1.5rem" }}>
      {label && <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.6rem" }}>{label}</p>}
      <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.784rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>—</span>
          <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const DEFINITIONS = [
  ["Covered driver", "Any driver operating a CMV that requires a CDL under FMCSA — determined by vehicle weight, passenger count, or placarded hazmat thresholds."],
  ["Test types", "Pre-employment, random, post-accident, reasonable suspicion, return-to-duty, and follow-up. Each has specific triggering conditions and documentation requirements."],
  ["Designated Employer Representative (DER)", "The person at your company authorized to receive test results, take required action on positives and refusals, and ensure your program runs correctly."],
  ["Clearinghouse", "FMCSA's national database of drug and alcohol program violations tied to CDL numbers. Pre-employment and annual queries are required for all covered drivers."],
  ["Consortium / TPA", "A third-party administrator that manages random pool enrollment, collections scheduling, lab relationships, and reporting on behalf of smaller carriers."],
];

export default function DrugAlcoholBrief() {
  useSEO({
    title: "Drug & Alcohol Program Brief | LaunchPath Operational Library",
    description: "FMCSA drug and alcohol program requirements for motor carriers under 49 CFR Part 382. Clearinghouse registration, pre-employment query requirements, and TPA enrollment explained.",
  });
  const handlePrint = () => window.print();

  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section data-testid="article-hero" style={{ background: "var(--bg)", padding: "6rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.84rem", color: "var(--text-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem" }}>
            ← Operational Library
          </Link>

          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.5rem" }}>
            Ground 0 — Drug & Alcohol Program (49 CFR Part 382)
          </p>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            Drug & Alcohol Program<br />Installation Brief
          </h1>

          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.176rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            How to install a drug & alcohol program that will pass a new entrant audit — before your first dispatch.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>9-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Required before first CDL driver dispatch
            </span>
          </div>
        </div>
      </section>

      {/* ── EXEC SUMMARY BAND ── */}
      <section data-testid="exec-summary" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="summary-grid">
          <div>
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Understand exactly who is a 'covered driver' under Part 382 and which test types are required — and when.",
                "See what auditors actually look for: written policy, DER, test history, Clearinghouse queries, and random pool documentation.",
                "Learn the four failure patterns that put new entrants at automatic-fail risk before their first load.",
                "Use a 90-day installation plan to build a compliant program from scratch — before any audit notice arrives.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.728rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }} className="download-col">
            <button onClick={handlePrint} data-testid="download-checklist-top" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.896rem", fontWeight: 600, padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap", display: "block", marginBottom: "0.5rem" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download D&A program<br />installation checklist (PDF)</button>
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.784rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── BODY — SECTIONS 1–3 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        {/* Section 1 — Why FMCSA cares */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="Why FMCSA Cares and What Auditors Look For" id="why-fmcsa-cares" />
          <Body>
            Part 382 exists for one reason: to prevent accidents caused by drivers misusing alcohol or controlled substances while operating commercial motor vehicles. FMCSA does not give carriers credit for good intentions — they give credit for documented systems that kept impaired drivers out of service.
          </Body>
          <Body>
            When an auditor reviews your D&A program, they are not looking for a clean driving record. They are looking for evidence that you built and maintained a system: a written policy, a named responsible person, a testing history that matches your driver roster, Clearinghouse activity, and a random pool that was actually running.
          </Body>
          <Callout label="What auditors actually check">
            Written policy — who is covered — test history for every required type — Clearinghouse pre-employment and annual queries — random pool documentation and selections. If any of these is missing, the program does not exist for audit purposes.
          </Callout>
        </div>

        {/* Section 2 — Definitions */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="Definitions and Scope" id="definitions" />
          <Body>Before installing a program, you need to know exactly who it covers and what it requires. These are the five terms that define your obligations.</Body>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "1.5rem" }}>
            {DEFINITIONS.map(([term, def], i) => (
              <div key={term} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.5rem", padding: "1.25rem 0", borderTop: "1px solid var(--border)", alignItems: "start" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.008rem", color: "var(--text)", lineHeight: 1.4 }}>{term}</span>
                <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{def}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>

        {/* Section 3 — Core requirements */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="Core System Requirements — Day 1 Install" id="day-one" />
          <Body>
            A compliant D&A program is not built over time — it must be in place before the first covered driver operates under your authority. There are four non-negotiable components.
          </Body>

          {[
            {
              title: "Written policy, acknowledged by each driver",
              detail: "Your policy must cover all required test types, the consequences of a positive or refusal, and how you handle each situation. Every covered driver must sign and date an acknowledgement before their first dispatch.",
            },
            {
              title: "Consortium or TPA enrollment with a DER named",
              detail: "A DOT-compliant consortium handles your collections network, certified laboratory relationship, Medical Review Officer (MRO), and random pool management. Your Designated Employer Representative is the internal person who receives results and takes required action.",
            },
            {
              title: "Clearinghouse registration and query process",
              detail: "Your company must be registered in the FMCSA Drug & Alcohol Clearinghouse before you can query driver records. Pre-employment full queries are required before every new hire's first dispatch. Annual limited queries are required for all currently employed covered drivers.",
            },
            {
              title: "Supervisor reasonable-suspicion training",
              detail: "Any supervisor who directs CDL drivers must complete at least 60 minutes of training on the signs and symptoms of drug misuse and 60 minutes on alcohol misuse — before they have authority to refer a driver for reasonable-suspicion testing.",
            },
          ].map((block, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.5rem" }}>{block.title}</h3>
              <Body style={{ marginBottom: 0 }}>{block.detail}</Body>
            </div>
          ))}
        </div>

        {/* Section 4 — Records & evidence */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 4" title="Records and Evidence That Prove Compliance" id="records" />
          <Body>When an auditor asks to see your D&A program, these are the documents they will request. All of them must exist, be organized, and be retrievable on demand.</Body>
          <BulletList items={[
            "Policy acknowledgement with driver signature and date — one per covered driver, current version.",
            "Driver education and training records on the D&A program policy.",
            "Supervisor reasonable-suspicion training certificate — provider, duration, and date.",
            "Chain-of-custody forms and certified lab results for all required tests.",
            "Random selection lists with dates, names selected, and completed test results.",
            "Annual MIS (Management Information System) data where required.",
            "Clearinghouse pre-employment full query results with driver consent documentation.",
            "Annual limited query records for each employed covered driver.",
          ]} />
          <Callout label="The critical threshold">
            One post-accident event or missing test — especially a missing pre-employment test or Clearinghouse query — can put the authority and insurance relationship at risk. The cost of a gap discovered after a crash far exceeds the cost of building the system correctly upfront.
          </Callout>
        </div>

      </main>

      {/* ── FAILURE PATTERNS — full-width band ── */}
      <section data-testid="failure-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 5</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            New-Entrant Failure Patterns
          </h2>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            Most new entrants who fail D&A audits do not fail because they are running impaired drivers. They fail because they never installed the administrative infrastructure that proves to an auditor they are not.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)" }}>
            {FAILURE_PATTERNS.map((pattern) => (
              <div key={pattern.category} style={{ background: "var(--bg-2)", padding: "2rem" }}>
                <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", paddingBottom: "0.875rem", borderBottom: "1px solid var(--border)", marginBottom: "1.25rem" }}>{pattern.category}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {pattern.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", marginTop: "0.25rem", flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.952rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY — SECTION 6: MINIMUM VIABLE SYSTEM ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 6" title="Minimum Viable System for 1–3 Trucks" id="minimum-system" />
          <Body>
            You do not need enterprise software or a dedicated compliance officer. A small carrier needs three things that work every single day.
          </Body>

          {[
            {
              title: "One policy, one DER, one consortium",
              detail: "A single written policy template aligned with Part 382 and Part 40. One named DER who knows their responsibilities. One contracted consortium that handles collections scheduling, the lab relationship, MRO services, and random selections.",
            },
            {
              title: "A driver file insert per covered driver",
              detail: "Inside each driver's file: policy acknowledgement with signature, CDL copy, Clearinghouse pre-employment query result with consent, and a running log of test results and dates. One page covers all of it.",
            },
            {
              title: "A calendar or task system for ongoing compliance",
              detail: "Annual Clearinghouse queries — set a recurring task for each driver's hire anniversary or group them in one annual review. Random selection compliance — your consortium will notify you; the task is to respond and document promptly, every time.",
            },
          ].map((block, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.5rem" }}>{block.title}</h3>
              <Body style={{ marginBottom: 0 }}>{block.detail}</Body>
            </div>
          ))}
        </div>
      </main>

      {/* ── 90-DAY CHECKLIST TABLE ── */}
      <section data-testid="da-checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 7</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            90-Day D&A Program Installation Plan
          </h2>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Use this as your installation checklist from Day 1 to a fully documented, audit-ready D&A program.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Step", "Action", "Why It Matters"].map(h => (
                    <th key={h} style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", textAlign: "left", padding: "0 1rem 1rem 0", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CHECKLIST_STEPS.map((row) => (
                  <tr key={row.step} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.05em", padding: "1rem 1.25rem 1rem 0", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.step}</td>
                    <td style={{ padding: "1rem 1.25rem 1rem 0", color: "var(--text-muted)", lineHeight: 1.65, verticalAlign: "top", maxWidth: 340 }}>{row.action}</td>
                    <td style={{ padding: "1rem 0", color: "var(--text-subtle)", lineHeight: 1.65, verticalAlign: "top", fontSize: "0.952rem" }}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── D&A PROGRAM BINDER ── */}
      <section data-testid="da-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 7 — Supplement</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            D&A Program Binder
          </h2>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            One binder. Five tabs. Everything an auditor, insurer, or attorney will ask for when they want to know whether you ran a real drug and alcohol program.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", marginBottom: "2.5rem" }}>
            {BINDER_TABS.map((tab) => (
              <div key={tab.num} className="binder-tab" style={{ background: "var(--bg)", padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem", paddingBottom: "0.875rem", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", letterSpacing: "0.1em" }}>TAB {tab.num}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", lineHeight: 1.3 }}>{tab.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {tab.items.map((item, i) => (
                    <label key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginTop: "0.2rem", flexShrink: 0, accentColor: "var(--orange)", width: 14, height: 14 }} />
                      <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={handlePrint} data-testid="download-binder-btn" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.896rem", fontWeight: 600, padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >Print / Save D&A Binder as PDF</button>
        </div>
      </section>

      {/* ── BODY — SECTION 8: CTA ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Start with the Clearinghouse. Do it today.
          </h2>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            Registration is free and takes less than 20 minutes. Every other step in this brief depends on it. If you have drivers dispatching under your authority today without a Clearinghouse pre-employment query on file, that gap starts closing the moment you register.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a href="https://www.launchpathedu.com/auto-diagnostic" target="_blank" rel="noopener noreferrer" data-testid="article-diagnostic-cta"
              style={{ display: "inline-block", background: "var(--orange)", color: "#fff", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.98rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >Run the REACH Assessment</a>
            <button onClick={handlePrint} data-testid="download-checklist-cta" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem", fontWeight: 600, padding: "1rem 2rem", cursor: "pointer", letterSpacing: "0.03em", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download D&A Program Installation Checklist (PDF)</button>
          </div>
        </div>
      </main>

      {/* Portal cross-link */}
      <ArticlePortalBanner
        taskId="DA-001"
        taskName="Drug & Alcohol Program"
        message="Installing a compliant D&A program is Standard Task DA-001 in the LaunchPath Operating System — one of three critical-priority tasks that must be completed in Week 1. Operators submit their consortium enrollment and written policy for coach verification."
      />

      {/* Operating Standard Library footer strip */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#000F1F",
        padding: "2rem 2.5rem",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "0.84rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
          }}>
            This brief is part of the{" "}
            <a href="/operating-standard" style={{ color: "#d4900a", textDecoration: "none" }}>
              LaunchPath Operating Standard Library
            </a>
            .
          </p>
          <a href="/operating-standard" style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "0.728rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.7)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            View the Full Standard →
          </a>
        </div>
      </div>

      <BriefBundleCTA />
      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .summary-grid { grid-template-columns: 1fr !important; }
          .download-col { text-align: left !important; }
          .def-grid { grid-template-columns: 1fr !important; }
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
