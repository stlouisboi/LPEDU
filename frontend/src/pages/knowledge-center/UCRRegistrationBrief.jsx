import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const FAILURE_PATTERNS = [
  {
    category: "Operating Before Registration Is Current",
    items: [
      "Dispatching freight before UCR registration is confirmed for the current calendar year. UCR is an annual requirement — a registration from last year does not carry forward.",
      "Assuming that receiving FMCSA operating authority means UCR is covered. They are separate systems. UCR is filed in your base state, not with FMCSA.",
      "Missing the annual renewal window and continuing to operate. There is no grace period for a lapsed UCR.",
    ],
  },
  {
    category: "BOC-3 Coverage Gaps",
    items: [
      "Applying for operating authority and assuming the BOC-3 was filed automatically. The BOC-3 must be filed by a registered process agent service on your behalf — it does not happen by default.",
      "Using a service that has since gone inactive or delisted from FMCSA's registry. Your BOC-3 coverage status is only as good as your service provider's active standing.",
      "Not verifying BOC-3 status in SAFER before dispatch. If it does not show as active in the public database, it does not exist for a broker or enforcement officer checking your authority.",
    ],
  },
  {
    category: "MCS-150 Neglect",
    items: [
      "Never completing the biennial MCS-150 update on the required schedule. FMCSA deactivates DOT numbers with outdated reports, which puts your operating authority at risk.",
      "Filing the MCS-150 with incorrect fleet size or mileage data. Inaccurate filings create a discrepancy between your FMCSA record and your actual operations — auditors notice this.",
      "Assuming the MCS-150 was satisfied by your initial DOT number application. The biennial update cycle is separate and must be maintained indefinitely.",
    ],
  },
  {
    category: "SAFER Visibility Risk",
    items: [
      "Not checking your own SAFER record before your first dispatch. Brokers pull SAFER on every new carrier before releasing loads. A lapsed registration shows up before you know it is a problem.",
      "Treating these as back-office compliance tasks rather than operational prerequisites. Any one of the three failing in SAFER can get a load rejected before you know there is an issue.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Determine your UCR base state and register at ucr.gov for the current calendar year.",
    why: "UCR is filed in the state where your principal business operations are located. The fee is based on fleet size. Registration must be active before you dispatch your first load.",
  },
  {
    step: "02",
    action: "Select an FMCSA-registered BOC-3 process agent service and confirm they file on your behalf.",
    why: "The BOC-3 designates legal process agents in every state where you operate. FMCSA requires it for all carriers with operating authority. Filing is done electronically by your service provider.",
  },
  {
    step: "03",
    action: "Verify your BOC-3 is active in FMCSA's SAFER system before your first load.",
    why: "SAFER is the public database brokers and enforcement check in real time. Search your DOT number at safer.fmcsa.dot.gov and confirm the BOC-3 field shows as active before you move freight.",
  },
  {
    step: "04",
    action: "File or update your MCS-150 with FMCSA and confirm the submission.",
    why: "The MCS-150 establishes your operational profile with FMCSA. A stale or missing report can result in an inactive DOT number — which suspends your operating authority without notice.",
  },
  {
    step: "05",
    action: "Set calendar reminders for UCR annual renewal and MCS-150 biennial update.",
    why: "Both have time-based renewal requirements. Set the UCR reminder for 60 days before December 31 each year and the MCS-150 reminder for 18 months after your last filing — before the deadline, not after.",
  },
  {
    step: "06",
    action: "Download and retain confirmation documents for UCR, BOC-3, and MCS-150 in your compliance binder.",
    why: "An auditor will ask for current proof of registration across all three filings. Having them organized and dated eliminates exposure on three separate compliance requirements in one step.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "UCR Registration",
    items: [
      "UCR registration confirmation for the current calendar year — includes state, fleet size, and registration number",
      "UCR fee payment receipt",
      "Prior two years of UCR registrations — demonstrates continuous annual compliance",
    ],
  },
  {
    num: "02",
    title: "BOC-3 Process Agent",
    items: [
      "BOC-3 filing confirmation from your process agent service — provider name, contact, and filing date",
      "FMCSA SAFER system printout confirming BOC-3 status as active — printed and dated within the last 30 days",
      "Service provider registration documentation confirming they are currently listed with FMCSA",
    ],
  },
  {
    num: "03",
    title: "MCS-150 & USDOT Status",
    items: [
      "MCS-150 submission confirmation with FMCSA receipt and confirmation number",
      "Most recent biennial update date and the next required update date",
      "FMCSA operating authority printout showing active status — pulled from SAFER",
    ],
  },
];

const DEFINITIONS = [
  ["UCR (Unified Carrier Registration)", "An annual registration program for interstate commercial motor carriers. Filed in the carrier's base state. Fee is based on fleet size. Revenue funds state-level transportation enforcement programs."],
  ["BOC-3", "A filing with FMCSA that designates legal process agents in each state where the carrier operates. Required for all motor carriers with FMCSA operating authority. Filed electronically by a registered process agent service."],
  ["MCS-150", "The Motor Carrier Identification Report filed with FMCSA. Records fleet size, annual mileage, cargo type, and operations type. Must be updated on a biennial schedule based on your USDOT number assignment."],
  ["Base State", "For UCR purposes, the state where the carrier's principal place of business is located. UCR is filed in the base state — not in every state of operation."],
  ["SAFER System", "FMCSA's Safety and Fitness Electronic Records system. The public database where shippers, brokers, and enforcement check carrier authority status, BOC-3 standing, and registration activity in real time."],
];

function SectionHeader({ overline, title, id }) {
  return (
    <div style={{ marginBottom: "2rem" }} id={id}>
      {overline && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>{overline}</p>
      )}
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", lineHeight: 1.25 }}>{title}</h2>
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
      {label && <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.6rem" }}>{label}</p>}
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

export default function UCRRegistrationBrief() {
  useSEO({
    title: "UCR Registration Brief | LaunchPath Operational Library",
    description: "Unified Carrier Registration requirements for new motor carriers. Who must register, fee structure by fleet size, annual renewal cycle, and consequences of a UCR lapse.",
  });
  const handlePrint = () => window.print();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section data-testid="article-hero" style={{ background: "var(--bg)", padding: "6rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", color: "var(--text-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem" }}>
            ← Operational Library
          </Link>

          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.5rem" }}>
            Ground 0 — Federal Authority Registration (UCR · BOC-3 · MCS-150)
          </p>

          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            Authority Registrations Brief:<br />UCR, BOC-3, and MCS-150<br />Before Your First Dispatch
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.176rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            Three separate federal filings. One combined requirement. All of them must be active before the truck moves.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>8-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Required before first dispatch
            </span>
          </div>
        </div>
      </section>

      {/* ── EXEC SUMMARY BAND ── */}
      <section data-testid="exec-summary" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="summary-grid">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Understand what UCR, BOC-3, and MCS-150 are — and why none of them is optional or interchangeable with the others.",
                "See what brokers and enforcement check in SAFER before releasing loads — and what a registration gap looks like from their side.",
                "Learn the four failure patterns that leave new carriers dispatching with registration gaps.",
                "Use a step-by-step installation checklist to get all three filings active and verified before your first dispatch.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }} className="download-col">
            <button onClick={handlePrint} data-testid="download-checklist-top" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 600, padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap", display: "block", marginBottom: "0.5rem" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download registration<br />checklist (PDF)</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── BODY — SECTIONS 1–4 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        {/* Section 1 — Why all three must be active simultaneously */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="Why All Three Must Be Active Simultaneously" id="why-all-three" />
          <Body>
            Operating authority from FMCSA is not a single document. It is a stack of registrations that must all stay current at the same time. UCR, BOC-3, and MCS-150 are not supplementary paperwork — they are three separate legal obligations that together constitute your authority to move interstate freight.
          </Body>
          <Body>
            Missing any one of them does not create a partial compliance gap. It creates an operational exposure visible to brokers, shippers, and enforcement in real time through FMCSA's SAFER database. A lapsed UCR, missing BOC-3, or outdated MCS-150 shows up before you know it is a problem — and by the time a broker rejects a load over it, you have already dispatched in violation.
          </Body>
          <Callout label="The combined obligation">
            A new carrier with active operating authority that dispatches without current UCR is operating illegally. The same is true for a lapsed BOC-3 or an outdated MCS-150. Treat them as one filing event with three components — not three separate tasks to get to when time allows.
          </Callout>
        </div>

        {/* Section 2 — Definitions */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="Definitions and Scope" id="definitions" />
          <Body>Before installing these registrations, you need to understand what each one is, why it exists, and what it is not.</Body>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "1.5rem" }}>
            {DEFINITIONS.map(([term, def]) => (
              <div key={term} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.5rem", padding: "1.25rem 0", borderTop: "1px solid var(--border)", alignItems: "start" }} className="def-grid">
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.008rem", color: "var(--text)", lineHeight: 1.4 }}>{term}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{def}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>

        {/* Section 3 — What each filing requires */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="What Each Filing Actually Requires" id="filing-requirements" />
          <Body>
            Each of the three registrations has a specific process, a specific renewal cycle, and a specific place where active status is verified. Understanding all three before you start is how you avoid the gaps that ground new carriers.
          </Body>

          {[
            {
              title: "UCR — filed in your base state, renewed every January",
              detail: "UCR is filed at ucr.gov. You select your base state, enter your fleet size, and pay the annual fee. The fee tier for a single-truck operation is the minimum bracket. Registration must be completed for the current calendar year before you dispatch. The renewal window opens in October for the following year — set the reminder before the window closes.",
            },
            {
              title: "BOC-3 — filed by your service provider, verified in SAFER",
              detail: "You do not file the BOC-3 yourself. You contract with a registered process agent service, they file a blanket designation with FMCSA, and FMCSA updates your authority record within 24-48 hours. After they confirm the filing, verify it is reflected in SAFER before your first dispatch. Your responsibility is to maintain a service that stays in good standing with FMCSA.",
            },
            {
              title: "MCS-150 — filed with FMCSA on a biennial schedule",
              detail: "The MCS-150 records your operational profile — fleet size, annual mileage, operations type, and cargo. FMCSA assigns your biennial update month based on your USDOT number. If the update is missed, FMCSA can place your DOT number in an inactive status, which effectively suspends your operating authority. Do not wait for a notice — set your own reminder and file early.",
            },
          ].map((block, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.5rem" }}>{block.title}</h3>
              <Body style={{ marginBottom: 0 }}>{block.detail}</Body>
            </div>
          ))}
        </div>

        {/* Section 4 — Records and evidence */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 4" title="Records That Prove Current Registration" id="records" />
          <Body>When an auditor or enforcement officer asks for proof of federal registration compliance, these are the documents they will request. All of them must exist and be retrievable on demand.</Body>
          <BulletList items={[
            "UCR registration confirmation for the current calendar year — state, fleet size, registration number, and fee receipt.",
            "BOC-3 filing confirmation from your process agent service — provider identity and filing date.",
            "SAFER system printout showing BOC-3 as active — pulled and dated within the last 30 days.",
            "MCS-150 submission confirmation with FMCSA receipt and confirmation number.",
            "Current FMCSA operating authority printout from SAFER showing authority as active.",
            "Calendar evidence of next renewal dates — UCR and MCS-150 biennial update.",
          ]} />
          <Callout label="The broker check you cannot control">
            Before releasing a load to a new carrier, brokers pull SAFER. What they see is your real-time compliance status across all three registrations. There is no call you can make to explain a lapsed UCR or an inactive BOC-3 at load time. The only way to manage this exposure is to close it before dispatch — not after.
          </Callout>
        </div>

      </main>

      {/* ── FAILURE PATTERNS — full-width band ── */}
      <section data-testid="failure-patterns" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 5</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            New-Entrant Failure Patterns
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
            Most carriers who dispatch with registration gaps are not making a knowing choice. They assume the filing happened, assume it carries forward, or assume that because they have authority, everything else is covered. None of those assumptions are safe.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)" }}>
            {FAILURE_PATTERNS.map((pattern) => (
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

      {/* ── BODY — SECTION 6: MINIMUM VIABLE SYSTEM ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 6" title="Minimum Viable System for a New Single-Truck Carrier" id="minimum-system" />
          <Body>
            You do not need a compliance consultant to get these three registrations right. You need one afternoon, the right websites, and the discipline to set renewal reminders before you forget.
          </Body>

          {[
            {
              title: "UCR: ucr.gov, one afternoon, annual reminder set",
              detail: "Create an account at ucr.gov. Select your base state. Enter your fleet size — for one truck, you are in the minimum fee bracket. Pay. Download the confirmation. Set a calendar reminder for the following October to renew before the next calendar year. The entire process takes under an hour.",
            },
            {
              title: "BOC-3: one service, one confirmation, SAFER verified",
              detail: "Select any FMCSA-registered process agent service — there are several reputable providers operating at low annual cost. They file electronically. Within 24-48 hours, log into SAFER and confirm your BOC-3 shows as active. Print the SAFER result and keep it in your compliance binder. If your service ever closes or loses FMCSA standing, you will need to replace it immediately.",
            },
            {
              title: "MCS-150: FMCSA Portal, biennial reminder set 18 months out",
              detail: "Log into the FMCSA Portal and locate your biennial update date. File the MCS-150 update — fleet size, annual mileage, and operations type. Set a calendar reminder for 18 months from now, not the deadline itself. You want to file early, not scramble when a notice arrives at an address you no longer check.",
            },
          ].map((block, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "var(--text)", marginBottom: "0.5rem" }}>{block.title}</h3>
              <Body style={{ marginBottom: 0 }}>{block.detail}</Body>
            </div>
          ))}
        </div>
      </main>

      {/* ── 90-DAY CHECKLIST TABLE ── */}
      <section data-testid="checklist-table" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 7</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.75rem" }}>
            Installation Checklist — Before First Dispatch
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 680, marginBottom: "2.5rem" }}>
            Complete all six steps before you dispatch your first load. None of them can be deferred — each one is a condition of legal operation.
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

      {/* ── COMPLIANCE BINDER ── */}
      <section data-testid="authority-binder" className="audit-binder-section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.75rem" }}>Section 7 — Supplement</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem" }}>
            Authority Registration Binder
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 620 }}>
            Three tabs. Everything an auditor, broker, or enforcement officer will ask for when they want to confirm your authority to operate is current and properly registered.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", marginBottom: "2.5rem" }}>
            {BINDER_TABS.map((tab) => (
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

          <button onClick={handlePrint} data-testid="download-binder-btn" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 600, padding: "0.875rem 1.5rem", cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >Print / Save Authority Registration Binder as PDF</button>
        </div>
      </section>

      {/* ── CTA ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div data-testid="article-cta" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
            Check your SAFER record before your first load.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.092rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 520 }}>
            Go to safer.fmcsa.dot.gov and search your DOT number now. Confirm UCR status, BOC-3 standing, and authority status are all showing active. If anything is missing or expired, the gap is visible to every broker and shipper who runs a check on you — and they will, before every load.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <Link to="/reach-diagnostic" data-testid="article-diagnostic-cta"
              style={{ display: "inline-block", background: "var(--orange)", color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.98rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >Run the Ground 0 Readiness Test</Link>
            <button onClick={handlePrint} data-testid="download-checklist-cta" style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", fontWeight: 600, padding: "1rem 2rem", cursor: "pointer", letterSpacing: "0.03em", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >Download Authority Registration Checklist (PDF)</button>
          </div>
        </div>
      </main>

      {/* Portal cross-link */}
      <ArticlePortalBanner
        taskId="UCR-001"
        taskName="UCR Registration"
        message="UCR, BOC-3, and MCS-150 are three authority registration tasks in the LaunchPath implementation sequence — all assigned in the first two weeks. Operators enrolled in the LaunchPath program submit registration documentation for coach verification and track these as high-priority authority tasks."
      />

      {/* Operating Standard Library footer strip */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "#000F1F", padding: "2rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            This brief is part of the{" "}
            <a href="/operating-standard" style={{ color: "#d4900a", textDecoration: "none" }}>LaunchPath Operating Standard Library</a>.
          </p>
          <a href="/operating-standard" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.7)", textDecoration: "none", whiteSpace: "nowrap" }}>
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
