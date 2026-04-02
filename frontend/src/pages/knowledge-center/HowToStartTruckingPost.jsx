import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import { PrimaryCtaBlock, SecondaryCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";
import PreOpChecklistGate from "../../components/PreOpChecklistGate";

const gold = "#d4900a";
const mono = "'Inter', sans-serif";
const serif = "'Newsreader', 'Playfair Display', serif";

const s = {
  h2: { fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", color: "#0b1628", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1.1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(212,144,10,0.15)", marginTop: "2.75rem" },
  h3: { fontFamily: serif, fontWeight: 700, fontSize: "1.1rem", color: "#0b1628", lineHeight: 1.25, marginBottom: "0.75rem", marginTop: "1.75rem" },
  p: { fontFamily: mono, fontSize: "1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.85, marginBottom: "1rem" },
  link: { color: gold, fontWeight: 600, textDecoration: "underline" },
  li: { fontFamily: mono, fontSize: "0.95rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.75, marginBottom: "0.6rem", paddingLeft: "0.25rem" },
  cfr: { fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.2rem" },
};

const PHASE_LABEL_STYLE = {
  fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
  color: "rgba(212,144,10,0.65)", marginBottom: "0.35rem",
};

const PHASE_BOX = {
  background: "rgba(0,15,31,0.03)", border: "1px solid rgba(0,15,31,0.08)",
  padding: "1.5rem", marginBottom: "1.5rem",
};

export const FAQ = [
  { q: "How long does it take to start a trucking company?", a: "Business formation can be completed in one to two weeks. FMCSA processes MC number applications in 20 to 25 business days. Pre-operation compliance — insurance filing, drug and alcohol program setup, driver qualification files — typically takes an additional two to four weeks. Most carriers can be fully compliant and ready for first dispatch in 45 to 60 days from the start of the process." },
  { q: "Do I need a CDL to start a trucking company?", a: "If you intend to drive a commercial motor vehicle requiring a CDL — which includes most Class A tractor-trailer operations — then yes, you need a CDL. If you are starting a company with employed drivers and will not drive yourself, you do not need a CDL. All CDL drivers you employ in CDL-required vehicles must hold current, valid CDLs." },
  { q: "What is the biggest compliance mistake new trucking companies make?", a: "Dispatching a driver before the pre-employment drug test result is on file. This is not a paperwork error — it means the driver operated without completing a required federal safety screening. At a new entrant audit, this finding is treated with elevated severity because it indicates the carrier dispatched without meeting a mandatory requirement, regardless of how the driver performed on the road." },
  { q: "How much does it cost to start a trucking company?", a: "Startup compliance costs include the MC number application ($300), UCR registration (fee varies by fleet size), insurance (variable by cargo type and equipment value), and consortium enrollment for drug testing (typically $100 to $250 annually per driver). Operating costs — fuel, maintenance, insurance — are ongoing. Use the LaunchPath TCO Calculator to build a realistic operating budget before you apply for authority." },
  { q: "What is the new entrant safety audit and when does it happen?", a: "The new entrant safety audit is a mandatory compliance review that FMCSA conducts within 12 months of a new carrier receiving operating authority. It covers six areas: driver qualification files, drug and alcohol program, hours of service records, vehicle maintenance records, hazardous materials compliance (if applicable), and insurance and authority documentation. Carriers who have not built their compliance systems before the audit are at high risk of receiving a Conditional or Unsatisfactory safety rating." },
];

export default function HowToStartTruckingPost() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Startup Sequence</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Parts 387 · 391 · 382 · 385 · Startup Sequence</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            How to Start a Trucking Company Without Getting Shut Down in Year One
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            Most new trucking companies that fail their first FMCSA compliance audit do not fail because they were reckless. They fail because they did not know what the system requires — and they found out after their authority was already active.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            This page covers the full startup sequence from business formation to first load — organized around what FMCSA actually requires, not what the freight industry assumes.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Parts 387, 391, 382, 385"], ["Reading Time", "~12 min"], ["Cluster", "LP-WEB-001 Page 4 (Pillar)"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>Why Year One Is the Most Dangerous Period</h2>
        <p style={s.p}>FMCSA designates every new motor carrier as a "new entrant" for the first 18 months after authority is granted. During this window, the carrier receives a mandatory safety audit. Most carriers that receive Conditional or Unsatisfactory safety ratings receive them during this period — not because they were operating recklessly, but because they never installed the compliance systems the regulations require.</p>
        <p style={s.p}>Operating without a compliant drug and alcohol program, without complete driver qualification files, or without accurate hours of service records is not a risk — it is a documented violation from the first day of dispatch. The audit does not create the violation. It records what was already true.</p>

        <h2 style={s.h2}>Phase 1 — Business Formation</h2>
        <div style={PHASE_BOX}>
          <p style={PHASE_LABEL_STYLE}>Phase 01 of 04</p>
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            {[
              "Choose a legal entity. Limited Liability Company (LLC) is most common for small carriers — it provides liability separation between the business and personal assets.",
              "Obtain an Employer Identification Number (EIN) from the IRS. Required for tax filing, banking, and FMCSA registration.",
              "Open a dedicated business bank account. Separation of business and personal finances supports clean recordkeeping — which matters at audit.",
              "Begin commercial insurance conversations before applying for authority. Insurers need your DOT number to bind coverage; start the process in parallel with FMCSA registration.",
            ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
          </ul>
        </div>

        <h2 style={s.h2}>Phase 2 — FMCSA Registration</h2>
        <div style={PHASE_BOX}>
          <p style={PHASE_LABEL_STYLE}>Phase 02 of 04</p>
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            {[
              "Apply for a DOT number — free, through FMCSA's Unified Registration System. This is your federal identifier.",
              "Apply for a Motor Carrier number (MC number) — Operating Authority Request via Form OP-1, $300 filing fee. Processing time: 20 to 25 business days.",
              "File a BOC-3 — designation of a process agent in every state you intend to operate. Required for authority to be active.",
              "Complete the FMCSA new entrant orientation — required as part of the new entrant program.",
            ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
          </ul>
        </div>
        <p style={s.p}>After your MC number becomes active, a specific compliance sequence must be completed before you move a single load. That sequence is covered in detail on the <Link to="/knowledge-center/new-trucking-authority-first-steps" style={s.link}>New Trucking Authority First Steps</Link> page.</p>

        <h2 style={s.h2}>Phase 3 — Pre-Operation Compliance Installation</h2>
        <p style={s.p}>Before the first load moves, four compliance systems must be installed. These systems correspond to the Four Pillars of the LaunchPath Protection System. They are not optional. An audit conducted the day after your first dispatch reviews whether these systems exist and are documented correctly.</p>

        <h3 style={s.h3}>Authority Protection</h3>
        <p style={s.p}>File liability insurance with FMCSA using Form BMC-91. Verify the filing shows active in FMCSA's SAFER system before dispatch. Complete UCR (Unified Carrier Registration) for the current calendar year. Confirm your contact information in the FMCSA portal is current and accurate.</p>

        <h3 style={s.h3}>Insurance Continuity</h3>
        <p style={s.p}>Minimum liability limits are set by 49 CFR Part 387 — $750,000 for general freight, $1,000,000 for oil, higher for hazardous materials categories. Your coverage must be continuous. A single day of lapsed coverage creates the conditions for authority revocation. Build a process for renewal monitoring before you ever have a renewal date to watch.</p>

        <h3 style={s.h3}>Compliance Backbone</h3>
        <p style={s.p}>A complete <Link to="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={s.link}>Driver Qualification File</Link> must be in place for every CDL driver before they operate. A <Link to="/knowledge-center/dot-drug-alcohol-program-requirements" style={s.link}>Drug and Alcohol Testing Program</Link> must be established before the first driver dispatches — including pre-employment testing documented in the DQ file. Your ELD must be on FMCSA's approved device list and installed. Hours of service records begin from the first day of operation. Vehicle maintenance records — PM schedules, inspection logs, repair documentation — begin from the first day of operation.</p>

        <h3 style={s.h3}>Cash-Flow Oxygen</h3>
        <p style={s.p}>Cash-flow failure is a compliance trigger. Cancelled insurance, lapsed UCR registration, deferred maintenance — each is a compliance deficiency and an operational risk. The operating costs most new carriers underestimate are the ongoing, recurring costs: insurance premiums, IFTA quarterly filing, IRP registration, maintenance reserves, and compliance overhead. Build a realistic operating budget before you activate authority. The <Link to="/tools/tco-calculator" style={s.link}>LaunchPath TCO Calculator</Link> helps new carriers project fuel, insurance, maintenance, and compliance costs before the first load moves.</p>

        <h2 style={s.h2}>The 16 Compliance Failures That Shut Down New Carriers</h2>
        <p style={s.p}>There are 16 recurring, preventable compliance failures that FMCSA finds in new entrant audits. These are not obscure regulations — they are the same gaps in the same document areas, repeated across carriers in the same first-year pattern.</p>
        <p style={s.p}>The most common involve driver qualification files, drug and alcohol programs, and hours of service records. Each failure has a documented audit consequence and a documented cost — to the operation, to the rating, and to the authority itself.</p>
        <p style={s.p}>See also: <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>New Entrant Audit Checklist</Link> for what FMCSA reviews in each audit area.</p>
        <p style={s.p}>The <Link to="/standards/16-deadly-sins" style={s.link}>16 Deadly Sins Pocket Guide</Link> covers all 16 failure patterns — organized by pillar, with the audit consequence and the cost of each one documented.</p>

        <h2 style={s.h2}>Your Startup Checklist</h2>
        <p style={s.p}>Work through these phases in sequence. Do not dispatch until every item in Phase 3 is complete.</p>

        {[
          { label: "Phase 1 — Formation", items: ["LLC or legal entity formed", "EIN obtained from IRS", "Dedicated business bank account opened", "Commercial insurance quotes initiated"] },
          { label: "Phase 2 — Registration", items: ["DOT number obtained", "MC number applied for (OP-1)", "BOC-3 process agent filed", "UCR registration completed for current year"] },
          { label: "Phase 3 — Pre-Operation (Complete Before Dispatch)", items: ["Insurance filed via BMC-91 — active and verified in SAFER", "Drug and Alcohol program established — consortium enrolled, DER designated", "Pre-employment drug test completed for every CDL driver — result on file", "Complete DQ file in place for every CDL driver", "ELD installed — confirmed on FMCSA approved device list", "IFTA and IRP registration initiated with base state (within 30 days)"] },
          { label: "Phase 4 — Operational Discipline (From Day One)", items: ["HOS records current from first dispatch", "Maintenance records active — PM schedule documented, DVIR process in place", "Accident register established and accessible"] },
        ].map((phase, i) => (
          <div key={i} style={{ ...PHASE_BOX, marginBottom: "1rem" }}>
            <p style={PHASE_LABEL_STYLE}>{phase.label}</p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
              {phase.items.map((item, j) => <li key={j} style={s.li}>{item}</li>)}
            </ul>
          </div>
        ))}

        <p style={s.p}>The <Link to="/standards/starter-stack" style={s.link}>LaunchPath Starter Stack</Link> includes the core compliance documents, templates, and checklists for Phases 2 and 3 of this sequence — authority activation through pre-operation installation.</p>

        <PreOpChecklistGate />

        <PrimaryCtaBlock dataTestId="kc-reach-cta-mid" />

        <h2 style={s.h2}>The New Entrant Safety Audit</h2>
        <p style={s.p}>Every new interstate motor carrier receives a mandatory safety audit within 12 months of authority grant. FMCSA schedules the audit — it can be conducted on-site or remotely. The audit covers six areas: driver qualification files, drug and alcohol program, hours of service records, vehicle maintenance records, hazardous materials compliance (if applicable), and insurance and operating authority documentation.</p>
        <p style={s.p}>Carriers who have built all four compliance systems before the audit face a review of their documentation. Carriers who have not face a finding for each missing system. The <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>New Entrant Audit Checklist</Link> covers what FMCSA reviews in each area. The <Link to="/knowledge-center/fmcsa-safety-rating-explained" style={s.link}>FMCSA Safety Rating Explained</Link> page covers what each audit outcome means for the authority.</p>

        <h2 style={s.h2}>What Happens When Compliance Breaks</h2>
        <p style={s.p}>The sequence is documented and predictable. An audit finding produces a deficiency. A deficiency requires a Corrective Action Plan within 45 calendar days. A missed CAP window produces an Unsatisfactory safety rating. An Unsatisfactory rating produces authority revocation proceedings with a 60-day notice.</p>
        <p style={s.p}>The outcome is always recoverable — until the revocation is complete. After revocation, reapplication is required and the new entrant clock resets. The <Link to="/knowledge-center/corrective-action-plan-fmcsa" style={s.link}>Corrective Action Plan</Link> page covers what a CAP requires and why most carriers that fail to recover miss it not because the deficiencies are unrecoverable, but because they do not understand what the CAP must contain.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          The LaunchPath Standard covers the complete startup sequence — from FMCSA registration through the 90-day compliance build — including installation of every system covered in this guide.
        </p>

        <PrimaryCtaBlock />
        <SecondaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
