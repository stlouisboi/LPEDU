import { Link } from '../../compat/Link';
import ShareButton from "../../components/ShareButton";
import { ArticleByline } from "../../components/ArticleByline";
import AnnouncementBar from "../../components/home/AnnouncementBar";
import SiteHeader from "../../components/home/SiteHeader";
import SiteFooter from "../../components/home/SiteFooter";
import { PrimaryCtaBlock, SecondaryCtaBlock, CheckpointCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";
import ReadingProgressBar from "../../components/ReadingProgressBar";

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

const STEP_STYLE = {
  background: "rgba(0,15,31,0.03)",
  border: "1px solid rgba(0,15,31,0.07)",
  borderLeft: `3px solid ${gold}`,
  padding: "1.25rem 1.25rem 1.25rem 1.5rem",
  marginBottom: "1.25rem",
};

const STEPS = [
  {
    num: "01",
    label: "Designate a Designated Employer Representative (DER)",
    cfr: "49 CFR Part 40 — Definition and duties of DER",
    body: "The DER is the person authorized to receive drug and alcohol test results from the Medical Review Officer (MRO), take immediate action on those results, and remove a driver from safety-sensitive duties when a result requires it. For most small carriers, the owner serves as DER. The designation must be in writing and the DER must be accessible during operating hours. A DER who is unreachable when an MRO calls with a positive result creates a compliance gap — document the backup DER if the primary is unavailable."
  },
  {
    num: "02",
    label: "Select and Enroll in a Consortium or Third-Party Administrator (TPA)",
    cfr: "49 CFR 382.305 — Random testing pool requirement",
    body: "Owner-operators and carriers with fewer drivers than necessary for a statistically valid in-house random pool must enroll in a consortium. The consortium manages the random selection pool, contracts with SAMHSA-certified labs, provides MRO services, and handles DER support. Enrollment must be in place before the first CDL driver operates — not initiated that same week. Confirm the consortium is registered with FMCSA and operates a DOT-regulated pool, not a non-DOT or occupational health pool. These are not interchangeable."
  },
  {
    num: "03",
    label: "Register the Carrier in the FMCSA Drug and Alcohol Clearinghouse",
    cfr: "49 CFR 382.701 — Employer registration requirement",
    body: "Every motor carrier must register in the FMCSA Drug and Alcohol Clearinghouse at clearinghouse.fmcsa.dot.gov using a Clearinghouse Employer Account. Registration is tied to your USDOT number. If you use a TPA to conduct queries on your behalf, that TPA must also be authorized as your C/TPA in the Clearinghouse. Carrier registration and TPA authorization are separate actions — complete both before any pre-employment query."
  },
  {
    num: "04",
    label: "Conduct Pre-Employment Clearinghouse Queries for All CDL Drivers",
    cfr: "49 CFR 382.701(b) — Pre-employment query requirement",
    body: "Before any CDL driver performs a safety-sensitive function for your operation, you must conduct a pre-employment full query in the Clearinghouse. A full query requires the driver's electronic consent through the Clearinghouse system. If the query returns information — a violation record, a return-to-duty requirement, or an incomplete follow-up testing plan — the driver may not operate until the matter is resolved. A negative query result must be documented. After hire, annual limited queries are required for all CDL drivers on your roster."
  },
  {
    num: "05",
    label: "Complete Pre-Employment Drug Testing Through a SAMHSA-Certified Lab",
    cfr: "49 CFR 382.301 — Pre-employment testing requirement",
    body: "The DOT 5-panel test must be collected at a SAMHSA-certified collection site using a DOT Federal Chain of Custody and Control Form (CCF). The specimen goes directly from the collection site to the laboratory — not through you. The lab sends results to the Medical Review Officer. The MRO contacts the carrier's DER with the verified result. A negative result is not confirmed until the MRO releases the verified negative. Do not allow a driver to operate while waiting on an MRO-verified result based on a preliminary lab finding alone."
  },
  {
    num: "06",
    label: "Document the MRO-Verified Negative in Each Driver's DQ File",
    cfr: "49 CFR 391.51(b)(7) — Driver Qualification File documentation",
    body: <>The MRO-verified negative result must be documented in the driver's <Link to="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={s.link}>Driver Qualification File</Link> — not in a separate testing binder, not in a digital folder that requires a cross-reference lookup. The DQ file is the document an auditor opens. If the pre-employment test result is not in that file, the auditor records it as missing. A lab printout alone is not sufficient — the record must reflect the MRO-verified outcome. Retain the documentation for the duration of employment plus three years per 49 CFR 382.401.</>
  },
  {
    num: "07",
    label: "Enroll Each CDL Driver in the Random Testing Pool",
    cfr: "49 CFR 382.305 — Random testing requirement",
    body: "Every CDL driver performing safety-sensitive functions must be enrolled in the random testing pool. If you use a consortium, notify the consortium of each new driver at the time of hire — not at the end of the month. Obtain written confirmation that the driver is in the pool. FMCSA minimum random testing rates are set annually: at least 50% of the average driver count for controlled substances and at least 10% for alcohol each calendar year. Your consortium handles the statistical selection, but the carrier is responsible for ensuring the driver responds to a random selection and reports for testing within the required timeframe."
  },
  {
    num: "08",
    label: "Establish a Post-Accident Testing Protocol in Writing",
    cfr: "49 CFR 382.303 — Post-accident testing requirement",
    body: "Carriers must have a written post-accident protocol that identifies: (1) which accidents trigger testing, (2) who is responsible for initiating the test, (3) where collection sites are located after hours, and (4) 24-hour contact information. Triggering criteria: any fatal accident; any accident involving bodily injury where the injured requires immediate medical treatment away from the scene or vehicle damage requiring tow-away, where a citation is issued. Alcohol testing must be completed within 8 hours of the accident. Controlled substance testing must be completed within 32 hours. Missing these windows does not eliminate the compliance obligation — it creates a documentation requirement to record why the test was not administered."
  },
  {
    num: "09",
    label: "Complete Reasonable Suspicion Supervisor Training",
    cfr: "49 CFR 382.603 — Supervisor training requirement",
    body: "Any supervisor who has authority to direct a CDL driver to testing based on reasonable suspicion must complete 60 minutes of training on controlled substance abuse indicators and 60 minutes on alcohol misuse indicators. The training must be documented — course title, provider, date completed, and supervisor name. This is a one-time requirement, not annual recertification, but the documentation must be retained. Supervisors who have not completed the training may not make reasonable suspicion determinations."
  },
  {
    num: "10",
    label: "Confirm Annual MIS Reporting Responsibility",
    cfr: "49 CFR 382.403 — Annual MIS report requirement",
    body: "Carriers are required to submit an annual Management Information System (MIS) report to FMCSA covering all drug and alcohol testing data for the prior calendar year. The report is due March 15 each year. Many consortia file the MIS report on behalf of enrolled carriers — confirm whether your TPA handles this and obtain a copy of the filed report for your records. If your consortium does not file on your behalf, you are responsible for filing directly. Failure to file is a violation independent of your testing program's operational status."
  },
];

export const FAQ = [
  {
    q: "How long does it take to set up a DOT drug and alcohol testing program?",
    a: "The practical timeline depends on how quickly you can enroll in a consortium and complete pre-employment testing. Consortium enrollment can often be completed in one to two business days. A SAMHSA-certified collection site appointment can typically be arranged within 48 hours in most metropolitan areas. MRO-verified results are usually returned within 24–72 hours of specimen receipt. Allow a minimum of five to seven business days for the full setup sequence before a driver's first dispatch — and do not compress the timeline by dispatching a driver before MRO-verified results are in hand."
  },
  {
    q: "Can I use any lab for DOT drug testing?",
    a: "No. DOT-mandated drug testing must be conducted by a laboratory certified by the Substance Abuse and Mental Health Services Administration (SAMHSA). Using a non-certified lab — including a standard occupational health lab or a state-certified lab that is not SAMHSA-certified — does not satisfy the 49 CFR Part 382 requirement. Your consortium will direct specimens to a qualified lab. If you are managing testing independently, verify the lab's current SAMHSA certification before using it."
  },
  {
    q: "What is the difference between DOT and non-DOT drug testing?",
    a: "DOT drug testing follows the strict procedural requirements of 49 CFR Part 40 — specific collection procedures, chain of custody, SAMHSA-certified labs, MRO review, and defined result reporting. Non-DOT testing (also called occupational or workplace testing) does not meet these requirements and cannot be used to satisfy a federal motor carrier drug testing obligation. The two programs are parallel and do not substitute for each other. If a driver has passed a non-DOT pre-employment test at a previous employer, that result does not satisfy your 49 CFR 382.301 pre-employment requirement."
  },
  {
    q: "Does a new driver who was already enrolled in a program at another carrier need a new pre-employment test?",
    a: "Generally yes. A pre-employment drug test is required before the driver performs a safety-sensitive function for your operation — regardless of the driver's testing history at a prior employer. There is a limited exception under 49 CFR 382.301(b): if the driver has been in a consortium's random testing pool with no more than a 30-day gap in coverage, and you can document that testing history, a new pre-employment test may not be required. Confirm this exception with your TPA and document the basis for relying on it before dispatching without a new test."
  },
  {
    q: "What happens at a new entrant safety audit if the drug and alcohol program records are incomplete?",
    a: "An auditor who finds no consortium enrollment documentation, no pre-employment test results in driver DQ files, or no evidence of Clearinghouse registration will record each missing element as a violation of 49 CFR Part 382. Drug and alcohol program deficiencies are one of the most common findings in new entrant audits. Unlike some documentation gaps that can be corrected with a Corrective Action Plan, a missing pre-employment test for a driver who has already operated cannot be retroactively completed — it becomes a record of operation without required screening."
  },
];

export default function DrugAlcoholSetupPost() {
  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <ReadingProgressBar />
      <AnnouncementBar />

      <SiteHeader />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Drug & Alcohol Compliance</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Part 382 · 49 CFR Part 40 · FMCSA Clearinghouse</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            How to Set Up Your DOT Drug and Alcohol Testing Program Before Day 1
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            The program must exist before the first driver operates. Not within 30 days. Not once dispatch begins. Before. 49 CFR Part 382 makes no provision for provisional operation while a program is being arranged.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            Most new carriers know they need drug testing. Fewer understand what the complete setup sequence looks like — consortium enrollment, Clearinghouse registration, pre-employment queries, DER designation, supervisor training, and post-accident protocol all have to be in place before first dispatch. This guide covers each step in the order they should be completed.
          </p>
          <p style={{ fontFamily: mono, fontSize: "0.9rem", color: "rgba(13,27,48,0.5)", lineHeight: 1.7, marginTop: "0.75rem" }}>
            For the underlying regulatory requirements, see: <Link to="/knowledge-center/dot-drug-alcohol-program-requirements" style={s.link}>What FMCSA Requires for Your DOT Drug and Alcohol Program</Link>.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Part 382"], ["Reading Time", "~11 min"], ["Program Type", "New Carrier Setup"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(13,27,48,0.08)", display: "flex", alignItems: "center" }}>
              <ShareButton />
            </div>
          </div>
          <ArticleByline date="December 15, 2025" />
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>Why Sequence Matters</h2>
        <p style={s.p}>Each step in the setup sequence has a prerequisite. You cannot conduct a meaningful Clearinghouse query before the carrier is registered. You cannot enroll a driver in the random pool before the consortium is in place. You cannot document an MRO-verified result before the test is complete. Running these steps out of order doesn't just create paperwork problems — it can mean a driver dispatches before a required screening is finished.</p>
        <p style={s.p}>The 10 steps below follow the order in which they should be completed. Most can be initiated simultaneously once you have a consortium selected. Steps 5 and 6 must happen sequentially — the MRO-verified result must be in hand before documentation is complete, and documentation must be complete before dispatch.</p>

        {/* Mid-article CTA */}
        <SecondaryCtaBlock dataTestId="da-setup-mid-cta" />

        <h2 style={s.h2}>The 10-Step Setup Sequence</h2>

        {STEPS.map((step) => (
          <div key={step.num} style={STEP_STYLE}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", color: gold }}>STEP {step.num}</span>
              <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.35, margin: 0 }}>{step.label}</p>
            </div>
            <p style={{ ...s.cfr, marginBottom: "0.75rem", marginTop: "0.1rem" }}>{step.cfr}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{step.body}</p>
          </div>
        ))}

        <h2 style={s.h2}>What Goes in the DQ File vs. Program Records</h2>
        <p style={s.p}>Two categories of drug and alcohol documentation exist: records that must be in each driver's DQ file, and records that belong in the carrier's general drug and alcohol program file. Auditors examine both.</p>

        <h3 style={s.h3}>Must Be in Each Driver's DQ File</h3>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "MRO-verified pre-employment drug test result (negative)",
            "Pre-employment Clearinghouse query result and the driver's consent documentation",
            "Any post-accident test results (with incident record and test-initiation timestamp)",
            "Return-to-duty test result if applicable",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>

        <h3 style={s.h3}>Program Records — Carrier File</h3>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "Consortium/TPA enrollment agreement and confirmation",
            "DER designation — written, dated, signed",
            "FMCSA Clearinghouse employer account registration confirmation",
            "Random pool enrollment confirmations for each CDL driver",
            "Annual random testing rate documentation (50%/10% minimums met)",
            "Supervisor reasonable suspicion training certificates",
            "Post-accident protocol — written procedure, collection site list, 24-hour contacts",
            "Annual MIS report — filed copy, each calendar year",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>

        <h2 style={s.h2}>What Auditors Look For</h2>
        <p style={s.p}>At a <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>new entrant safety audit</Link>, the auditor will ask to see consortium enrollment documentation, DER designation, Clearinghouse registration, and DQ files for a sample of CDL drivers. Pre-employment test results and Clearinghouse query results are reviewed as part of the DQ file examination — they are not reviewed separately.</p>
        <p style={s.p}>The most common finding is not missing tests — it's missing documentation of tests that were completed. A test that happened but left no paper trail in the DQ file is, from the auditor's perspective, a test that did not happen. The standard for drug and alcohol program compliance is not whether the carrier acted in good faith. It is whether the required documentation exists.</p>
        <p style={s.p}>Drug and alcohol program deficiencies are one of the most direct paths to an Unsatisfactory safety rating. The <Link to="/standards/16-deadly-sins" style={s.link}>16 Deadly Sins</Link> covers the specific violations that appear most often in new entrant audit records — and how each one reaches the authority.</p>

        <h2 style={s.h2}>The Drug & Alcohol Compliance Packet</h2>
        <p style={s.p}>The <Link to="/standards/drug-alcohol-packet" style={s.link}>Drug & Alcohol Compliance Packet (LP-PKT-003)</Link> includes a consortium selection checklist, DER designation template, pre-employment testing log, Clearinghouse query documentation form, post-accident protocol template, and annual MIS report tracking sheet — all in fillable format, organized in the sequence they are used during program setup.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          Drug and alcohol program setup — from consortium enrollment and DER designation through Clearinghouse registration and MIS reporting — is installed in Module 3 of the LaunchPath Standard.
        </p>

        <PrimaryCtaBlock />
        <CheckpointCtaBlock />
        <RegulatoryDisclaimer />
      </div>
      <SiteFooter />
    </div>
  );
}
