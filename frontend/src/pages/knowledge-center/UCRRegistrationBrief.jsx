import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";

const FAILURE_PATTERNS = [
  {
    category: "Operating Before Registration Is Active",
    items: [
      "Dispatching freight before UCR registration is confirmed for the current calendar year. UCR is a precondition for operating authority, not an administrative detail.",
      "Assuming that filing with FMCSA is the same as UCR. They are separate systems. UCR is filed in your base state, not with FMCSA directly.",
      "Missing the annual renewal window. UCR must be renewed every year — authority granted in a prior year does not carry forward.",
    ],
  },
  {
    category: "BOC-3 Filing Gaps",
    items: [
      "Filing for operating authority and assuming the BOC-3 was already handled by the authority service. The BOC-3 must be filed by a registered process agent service — it is not automatic.",
      "Using a service that has since gone inactive or delisted. FMCSA requires active, registered BOC-3 coverage at all times. Coverage gaps trigger authority revocation.",
      "Not updating the BOC-3 when expanding operations to new states. Your process agent designation must cover every state where you operate.",
    ],
  },
  {
    category: "MCS-150 Non-Compliance",
    items: [
      "Never completing the initial MCS-150 or missing the biennial update. FMCSA deactivates DOT numbers with outdated MCS-150 filings.",
      "Filing the MCS-150 with incorrect fleet size or mileage data. Inaccurate data creates a compliance record discrepancy auditors will flag.",
      "Assuming a new authority application satisfies the MCS-150 update requirement. The MCS-150 and FMCSA operating authority are separate filings.",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Determine your UCR base state and register at ucr.gov for the current calendar year.",
    why: "UCR is filed in your base state — the state where your primary business operations are located. Fee is based on fleet size. Must be active before dispatch.",
  },
  {
    step: "02",
    action: "Select a FMCSA-registered BOC-3 process agent service and confirm they file on your behalf.",
    why: "The BOC-3 designates legal process agents in every state. FMCSA requires it for all motor carriers with operating authority. Filing is done by the service electronically.",
  },
  {
    step: "03",
    action: "Verify your BOC-3 is active in FMCSA's SAFER system before your first load.",
    why: "FMCSA's SAFER database shows your BOC-3 status publicly. Brokers and shippers check this. A missing BOC-3 will get loads turned away.",
  },
  {
    step: "04",
    action: "File or update your MCS-150 (Motor Carrier Identification Report) with FMCSA.",
    why: "The MCS-150 establishes your operational profile with FMCSA. Biennial updates are required. A stale MCS-150 is grounds for placing your DOT number inactive.",
  },
  {
    step: "05",
    action: "Set calendar reminders for UCR annual renewal and MCS-150 biennial update.",
    why: "Both have time-based renewal requirements. Missing a cycle creates compliance gaps that can suspend operating authority. Automate the reminder before it becomes a crisis.",
  },
  {
    step: "06",
    action: "Download and retain confirmation documents for UCR, BOC-3, and MCS-150 in your compliance binder.",
    why: "An auditor will ask for evidence of current registration. Having the confirmation documents organized and dated eliminates audit exposure on three separate compliance items in one step.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "UCR Registration",
    items: [
      "UCR registration confirmation for current calendar year — includes state, fleet size, and registration number",
      "UCR fee payment receipt",
      "Prior year UCR registrations (last 3 years recommended)",
    ],
  },
  {
    num: "02",
    title: "BOC-3 Process Agent",
    items: [
      "BOC-3 filing confirmation from your process agent service",
      "Service provider name, contact, and registration number",
      "FMCSA SAFER system printout confirming BOC-3 status as active",
    ],
  },
  {
    num: "03",
    title: "MCS-150 Filing",
    items: [
      "MCS-150 submission confirmation with FMCSA receipt",
      "Most recent biennial update date and confirmation number",
      "Printed copy of current FMCSA operating authority showing active status",
    ],
  },
];

const DEFINITIONS = [
  ["UCR (Unified Carrier Registration)", "A federal program requiring all interstate commercial motor carriers to register annually in their base state and pay a fee based on fleet size. Revenue supports state-level transportation enforcement programs."],
  ["BOC-3 (Blanket of Coverage)", "A filing with FMCSA designating process agents in each state where the carrier operates. Required for all motor carriers with FMCSA operating authority. Filed by a registered process agent service on behalf of the carrier."],
  ["MCS-150", "The Motor Carrier Identification Report filed with FMCSA. Establishes your operational profile — fleet size, mileage, cargo type, and operations type. Must be updated every two years based on your DOT number's update schedule."],
  ["Base State", "For UCR purposes, the state where the carrier's principal place of business is located. UCR must be filed in the base state, not in every state of operation."],
  ["SAFER System", "FMCSA's Safety and Fitness Electronic Records system. Public-facing database where shippers, brokers, and enforcement check carrier registration status, safety ratings, and authority status in real time."],
];

function SectionHeader({ label, number, title }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      {label && (
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.625rem" }}>
          {label}
        </p>
      )}
      <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.015em", color: "var(--text-paper-heading)", lineHeight: 1.25 }}>
        {title}
      </h2>
    </div>
  );
}

function Body({ children, style = {} }) {
  return (
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-paper-muted)", lineHeight: 1.85, marginBottom: "1.25rem", ...style }}>{children}</p>
  );
}

function Callout({ label, children }) {
  return (
    <div style={{ borderLeft: "3px solid var(--orange)", paddingLeft: "1.25rem", paddingTop: "1rem", paddingBottom: "1rem", paddingRight: "1.25rem", background: "rgba(232,89,15,0.05)", marginBottom: "1.5rem" }}>
      {label && <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "0.6rem" }}>{label}</p>}
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-paper-muted)", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>—</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-paper-muted)", lineHeight: 1.75 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function UCRRegistrationBrief() {
  const handlePrint = () => window.print();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO (dark) ── */}
      <section data-testid="article-hero" style={{ background: "var(--bg)", padding: "6rem 1.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", color: "var(--text-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem" }}>
            ← Knowledge Center
          </Link>

          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.5rem" }}>
            Ground 0 — UCR · BOC-3 · MCS-150 (49 CFR, FMCSA Authority)
          </p>

          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text)", marginBottom: "1.25rem" }}>
            Federal Registration<br />Compliance Brief
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.176rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 620 }}>
            UCR, BOC-3, and MCS-150 — the three federal registrations every new carrier must keep active before dispatching a single load.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.806rem", color: "var(--text-subtle)", letterSpacing: "0.06em" }}>7-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)" }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.806rem", fontWeight: 600, color: "var(--orange)", background: "var(--orange-muted)", padding: "0.25rem 0.75rem", letterSpacing: "0.02em" }}>
              Required before first dispatch
            </span>
          </div>
        </div>
      </section>

      {/* ── EXEC SUMMARY BAND (dark) ── */}
      <section data-testid="exec-summary" style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="summary-grid">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Understand what UCR, BOC-3, and MCS-150 are — and why they are separate, non-negotiable filing requirements.",
                "Learn the three failure patterns that cause new carriers to operate with registration gaps — and why brokers will cut loads over it.",
                "Use a step-by-step installation checklist to get all three registrations active before your first dispatch.",
                "Build the documentation binder that satisfies an auditor asking for proof of current federal registration compliance.",
              ].map((point, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--orange)", marginTop: "0.28rem", flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flexShrink: 0, minWidth: 220 }}>
            <button
              onClick={handlePrint}
              style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-subtle)", fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 600, padding: "0.875rem 1.5rem", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--orange)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-subtle)"; }}
            >
              Download Registration Checklist (PDF)
            </button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", color: "var(--text-subtle)", textAlign: "center" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── DOCUMENT BODY (white) ── */}
      <div style={{ background: "var(--bg-paper)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem" }}>

          {/* Section 1 — Why This Matters */}
          <section data-testid="section-why" style={{ marginBottom: "3.5rem" }}>
            <SectionHeader label="Section 01" title="Why These Three Registrations Matter" />
            <Body>
              Operating authority from FMCSA is not a single document. It is a stack of federal registrations that must all stay active simultaneously. UCR, BOC-3, and MCS-150 are not supplementary paperwork — they are preconditions for legal interstate operation.
            </Body>
            <Body>
              Missing any one of them does not just create a compliance gap. It creates an operational exposure that brokers, shippers, and enforcement can see in real time through FMCSA's SAFER database. Brokers routinely pull carrier authority checks before releasing loads. A lapsed UCR, missing BOC-3, or inactive DOT number means a rejected load — not a warning.
            </Body>
            <Callout label="The Operational Reality">
              A new carrier with active operating authority that dispatches without current UCR is operating illegally. The same is true for a lapsed BOC-3 or an outdated MCS-150. These are not technicalities. They are the foundation of your operating authority stack.
            </Callout>
          </section>

          {/* Section 2 — UCR */}
          <section data-testid="section-ucr" style={{ marginBottom: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <SectionHeader label="Section 02" title="UCR — Unified Carrier Registration" />
            <Body>
              UCR is an annual registration requirement for interstate commercial motor carriers. It is administered at the state level through the Unified Carrier Registration Agreement. You file in your base state — the state where your principal business operations are located.
            </Body>
            <Body>
              The UCR fee is based on your fleet size — the number of commercial motor vehicles you operate in interstate commerce. For most new single-truck carriers, this is the minimum tier. Fees are set annually by the UCR Agreement board.
            </Body>
            <Callout label="Critical Timing Rule">
              UCR registration must be active for the calendar year in which you are operating. A registration from the prior year does not carry over. If you are dispatching loads in January without having renewed UCR for the current year, you are operating in violation.
            </Callout>
            <Body>
              UCR is filed at ucr.gov. You create an account, select your base state, enter your fleet size, and pay the fee. The system issues a confirmation. That confirmation document goes directly into your compliance binder.
            </Body>
          </section>

          {/* Section 3 — BOC-3 */}
          <section data-testid="section-boc3" style={{ marginBottom: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <SectionHeader label="Section 03" title="BOC-3 — Process Agent Designation" />
            <Body>
              The BOC-3 is a filing with FMCSA that designates legal process agents in every state where you operate. A process agent is the person authorized to receive legal documents on behalf of your company in each state — if your company is sued or served in any state, there is a designated agent on record.
            </Body>
            <Body>
              You do not file the BOC-3 yourself. It is filed electronically by a FMCSA-registered process agent service on your behalf. You contract with the service, they file the blanket designation, and FMCSA updates your authority record. The entire process typically takes 24-48 hours.
            </Body>
            <Callout label="SAFER Check Exposure">
              Your BOC-3 status is visible in FMCSA's SAFER database. Brokers and shippers check SAFER before releasing loads. A missing or inactive BOC-3 shows up immediately. This is not a back-office compliance issue — it directly affects whether you can get freight.
            </Callout>
            <Body>
              Once the BOC-3 is filed, verify it is active in SAFER before your first dispatch. Search your DOT number at safer.fmcsa.dot.gov and confirm the process agent field is populated. Print the SAFER result and store it in your compliance binder alongside the BOC-3 service confirmation.
            </Body>
          </section>

          {/* Section 4 — MCS-150 */}
          <section data-testid="section-mcs150" style={{ marginBottom: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <SectionHeader label="Section 04" title="MCS-150 — Motor Carrier Identification" />
            <Body>
              The MCS-150 is the Motor Carrier Identification Report — the filing that establishes your operational profile with FMCSA. It records your fleet size, annual mileage, cargo type, and operation type. FMCSA requires a biennial update based on your DOT number's assigned update schedule.
            </Body>
            <Body>
              For new carriers, the MCS-150 is typically filed as part of the initial USDOT number registration process. But the biennial update requirement does not go away. FMCSA will flag DOT numbers that have not been updated on schedule and can place them in an inactive status — which effectively suspends your operating authority.
            </Body>
            <Callout label="The Biennial Update Trap">
              Many carriers complete the initial MCS-150 correctly but miss the biennial update because no one set a reminder. FMCSA sends notices, but they go to whatever email is on file — which may be outdated. Set your own calendar reminder for 18 months after your initial filing so you act before the deadline, not after.
            </Callout>
          </section>

          {/* Section 5 — Failure Patterns */}
          <section data-testid="section-failures" style={{ marginBottom: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <SectionHeader label="Section 05" title="Three Failure Patterns That Ground New Carriers" />
            <Body>
              The following failure patterns are not theoretical. They represent the recurring gaps that FMCSA enforcement and brokers catch in new entrant operations — most of them visible in SAFER before the carrier realizes there is a problem.
            </Body>
            {FAILURE_PATTERNS.map((pattern, i) => (
              <div key={i} style={{ marginBottom: "2rem" }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.064rem", color: "#002244", letterSpacing: "-0.01em", marginBottom: "0.875rem" }}>
                  {i + 1}. {pattern.category}
                </p>
                <BulletList items={pattern.items} />
              </div>
            ))}
          </section>

          {/* Section 6 — Installation Checklist */}
          <section data-testid="section-checklist" style={{ marginBottom: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <SectionHeader label="Section 06" title="90-Day Installation Checklist" />
            <Body>
              Complete these steps before your first dispatch and set the renewal reminders immediately. All three registrations must be active simultaneously before you operate.
            </Body>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {CHECKLIST_STEPS.map((item) => (
                <div key={item.step} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.25rem", alignItems: "flex-start", padding: "1.25rem", background: "#FFFFFF", border: "1px solid #E5E7EB", borderLeft: "3px solid var(--orange)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", paddingTop: "0.1rem" }}>
                    {item.step}
                  </span>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                      {item.action}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-paper-muted)", lineHeight: 1.7, margin: 0 }}>
                      {item.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 — Binder Tabs */}
          <section data-testid="section-binder" style={{ marginBottom: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <SectionHeader label="Section 07" title="Compliance Binder — What to Keep on File" />
            <Body>
              An auditor reviewing your federal registration compliance will ask for documentation across all three filings. Organize these by tab and keep them current.
            </Body>
            {BINDER_TABS.map((tab) => (
              <div key={tab.num} style={{ marginBottom: "1.5rem", border: "1px solid #E5E7EB", background: "#FFFFFF" }}>
                <div style={{ padding: "0.875rem 1.25rem", background: "var(--bg-2)", display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--orange)" }}>TAB {tab.num}</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{tab.title}</span>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  {tab.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: i < tab.items.length - 1 ? "0.625rem" : 0 }}>
                      <input type="checkbox" style={{ marginTop: "0.25rem", flexShrink: 0, accentColor: "var(--orange)" }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-paper-muted)", lineHeight: 1.65 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Section 8 — Definitions */}
          <section data-testid="section-definitions" style={{ marginBottom: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <SectionHeader label="Section 08" title="Key Terms" />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {DEFINITIONS.map(([term, def]) => (
                <div key={term} style={{ padding: "1.25rem", background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#002244", marginBottom: "0.4rem" }}>{term}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "var(--text-paper-muted)", lineHeight: 1.7, margin: 0 }}>{def}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── CTA SECTION ── */}
        <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>
              Next Step
            </p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
              Run the Ground 0 Readiness Test
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>
              Measure your full compliance posture across all five REACH categories before your first dispatch.
            </p>
            <Link
              to="/reach-diagnostic"
              style={{ display: "inline-block", background: "var(--orange)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.008rem", padding: "1rem 2rem", textDecoration: "none", letterSpacing: "0.02em", transition: "background 0.2s" }}
            >
              RUN THE GROUND 0 READINESS TEST
            </Link>
          </div>
        </section>
      </div>

      {/* Portal cross-link */}
      <ArticlePortalBanner
        taskId="UCR-001"
        taskName="UCR Registration"
        message="UCR, BOC-3, and MCS-150 are Standard Tasks UCR-001, BOC3-001, and MCS150-001 in the LaunchPath Operating System — all three assigned in Week 2 of the implementation sequence. Operators enrolled in the Standard submit registration documentation for coach verification and track these as high-priority authority tasks."
      />

      {/* ── Operating Standard Library footer strip ── */}
      <section style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.616rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.3rem" }}>
              LaunchPath Operating Standard Library
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)" }}>
              Part of the Ground 0 Compliance Framework
            </p>
          </div>
          <Link to="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            ← Back to Knowledge Center
          </Link>
        </div>
      </section>

      <FooterSection />

      <style>{`
        @media (max-width: 768px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
        @media print {
          nav, footer, .portal-banner, button { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
