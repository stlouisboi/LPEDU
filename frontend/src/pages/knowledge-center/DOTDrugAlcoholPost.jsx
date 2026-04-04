import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import { PrimaryCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";

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

const TEST_TYPE_STYLE = {
  background: "rgba(0,15,31,0.03)", border: "1px solid rgba(0,15,31,0.07)",
  padding: "1.25rem 1.25rem 1.25rem 1.5rem", marginBottom: "1rem",
};

export const FAQ = [
  { q: "What is 49 CFR Part 382?", a: "49 CFR Part 382 is the federal regulation that establishes drug and alcohol testing requirements for commercial motor vehicle operators. It covers which carriers must have a program, the types of testing required, testing procedures, and consequences for violations. It applies to all motor carriers employing CDL drivers in safety-sensitive functions in interstate commerce." },
  { q: "What types of drug and alcohol testing does FMCSA require?", a: "FMCSA requires six types of testing under 49 CFR Part 382: pre-employment (before first safety-sensitive function), random (ongoing, based on annual minimum rates set by FMCSA), post-accident (specific triggering criteria under 49 CFR 382.303), reasonable suspicion (based on trained supervisor observation), return-to-duty (after a violation), and follow-up (after return-to-duty completion)." },
  { q: "Do I need a drug and alcohol program if I am the only driver?", a: "Yes. Owner-operators who drive CDL vehicles in safety-sensitive functions are subject to 49 CFR Part 382. Owner-operators must enroll in a consortium to satisfy the random testing requirement — a single-driver operation cannot run a statistically valid random testing program independently. Consortium enrollment satisfies both the program requirement and the random testing requirement." },
  { q: "What is a consortium and why do most small carriers use one?", a: "A consortium — also called a Third-Party Administrator (TPA) — manages drug and alcohol testing on behalf of multiple carriers. It maintains the random testing pool, contracts with SAMHSA-certified labs, provides access to Medical Review Officers (MROs) and Substance Abuse Professionals (SAPs), and handles required reporting. Most small carriers use a consortium because establishing an equivalent in-house program requires significantly more administrative infrastructure." },
  { q: "What happens if a driver fails a pre-employment drug test?", a: "A driver who receives a positive pre-employment drug test result may not perform any safety-sensitive function until they have completed the return-to-duty process under 49 CFR Part 40 — including evaluation by a Substance Abuse Professional and a negative return-to-duty test result. The positive result must also be reported to the FMCSA Drug and Alcohol Clearinghouse." },
];

export default function DOTDrugAlcoholPost() {
  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Drug & Alcohol Compliance</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Part 382 · Drug & Alcohol Testing</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            What FMCSA Requires for Your DOT Drug and Alcohol Program
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            49 CFR Part 382 requires every motor carrier employing CDL drivers in safety-sensitive functions to have a drug and alcohol testing program in place before the first driver operates. Not within 30 days of first dispatch. Before.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            Most new carriers understand they need a drug test. Fewer understand they need a program — a structured system that covers pre-employment testing, ongoing random testing, post-accident testing, reasonable suspicion protocols, and return-to-duty procedures. This page covers what that program requires.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Part 382"], ["Reading Time", "~9 min"], ["Cluster", "LP-WEB-001 Page 7"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>Who Must Have a DOT Drug and Alcohol Program</h2>
        <p style={s.p}>Every motor carrier employing CDL drivers in safety-sensitive functions is subject to 49 CFR Part 382. Safety-sensitive functions include operating a commercial motor vehicle that requires a CDL — loading and unloading, maintenance, and inspection activities performed immediately before operating are also covered under the definition.</p>
        <p style={s.p}>Owner-operators who drive are not exempt. If you hold a CDL and operate a CMV in your own carrier operation, you are subject to Part 382 as both employer and employee. This includes the random testing requirement — which means you must enroll in a consortium to satisfy it.</p>
        <p style={s.p}>For the broader pre-operation compliance sequence, see: <Link to="/knowledge-center/new-trucking-authority-first-steps" style={s.link}>New Trucking Authority First Steps</Link>.</p>

        <h2 style={s.h2}>The Six Types of Testing Required Under 49 CFR Part 382</h2>

        {[
          { type: "Pre-Employment", body: "Required before any CDL driver performs any safety-sensitive function for the first time. The test must be from a SAMHSA-certified laboratory. The result must be verified by a Medical Review Officer (MRO). A negative MRO-verified result must be documented before the driver operates — not the lab result alone. No exceptions. No provisional dispatch pending results." },
          { type: "Random", body: "FMCSA establishes annual minimum testing rates. Carriers must test at least 50% of their average driver count for controlled substances and at least 10% for alcohol each calendar year. Random selection must be truly random — conducted by a qualified Third-Party Administrator or consortium. Self-selection by the employer does not satisfy this requirement." },
          { type: "Post-Accident", body: "Required after accidents meeting specific criteria under 49 CFR 382.303: any fatal accident, or any accident involving bodily injury or vehicle tow-away where a citation is issued. Testing must be completed within specified timeframes: 8 hours for alcohol, 32 hours for controlled substances. Missing the window means the test cannot be administered and the record must document why." },
          { type: "Reasonable Suspicion", body: "Required when a trained supervisor observes signs and symptoms of impairment or drug/alcohol use as defined in Part 382. The supervisor must be trained in recognition — this is a separate regulatory requirement from the testing program itself. Observations must be documented contemporaneously." },
          { type: "Return-to-Duty", body: "Required after a violation of Part 382. The driver must complete evaluation by a Substance Abuse Professional (SAP), comply with the SAP's recommended follow-up plan, and produce a negative return-to-duty test result before returning to safety-sensitive functions." },
          { type: "Follow-Up", body: "After completing return-to-duty, the driver is subject to unannounced follow-up testing for a period of up to 60 months, as directed by the SAP. The number and frequency of follow-up tests is determined by the SAP — not by the carrier." },
        ].map(({ type, body }, i) => (
          <div key={i} style={TEST_TYPE_STYLE}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#0b1628", marginBottom: "0.5rem" }}>{type}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{body}</p>
          </div>
        ))}

        <h2 style={s.h2}>Establishing a Program — Consortium or In-House</h2>
        <p style={s.p}>Most small and mid-size motor carriers use a Third-Party Administrator (TPA) — also called a consortium — to manage their drug and alcohol testing program. A consortium handles random pool management, laboratory contracts, MRO services, DER support, and annual MIS reporting.</p>
        <p style={s.p}>An in-house program requires the carrier to contract directly with a SAMHSA-certified laboratory and a qualified MRO, establish and document a randomization process, manage the DER function internally, and file the annual MIS report independently. For most carriers with fewer than 20 CDL drivers, the administrative burden of an in-house program is not proportionate to the size of the operation.</p>
        <p style={s.p}>Owner-operators must enroll in a consortium. A single-driver pool cannot produce statistically valid random selection — the consortium satisfies both the program structure requirement and the random testing pool requirement.</p>

        <h2 style={s.h2}>The DER Requirement</h2>
        <p style={s.p}>Every carrier must designate a Designated Employer Representative (DER). The DER is the person authorized to receive test results from the MRO and take the required action based on those results — including removing a driver from safety-sensitive duties following a positive or refused test.</p>
        <p style={s.p}>For small carriers, the owner typically serves as DER. The designation must be documented. The DER must understand the Part 40 return-to-duty process and be accessible during operating hours to receive results and take immediate action when required.</p>

        <h2 style={s.h2}>Pre-Employment Testing — What the Standard Requires</h2>
        <p style={s.p}>The DOT 5-panel test covers: marijuana (THC metabolites), cocaine, opioids and opiates, amphetamines and methamphetamines, and phencyclidine (PCP). Testing must be conducted at a SAMHSA-certified collection site using a DOT-approved chain of custody form.</p>
        <p style={s.p}>A MRO-verified negative result must be documented before the driver operates. The distinction between a lab result and an MRO-verified result matters: the lab result is a preliminary finding. The MRO review is the step that produces the reportable result. Until the MRO releases a verified negative, the test is not complete.</p>
        <p style={s.p}>The negative result must be documented in the driver's <Link to="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={s.link}>Driver Qualification File</Link>. Not retained separately. In the file. At audit, auditors review DQ files and expect to find the pre-employment test result in the file — not in a separate binder or a digital folder that requires a separate lookup.</p>

        <h2 style={s.h2}>FMCSA Drug and Alcohol Clearinghouse — Mandatory Registration</h2>
        <p style={s.p}>All motor carriers, TPAs/consortia, and CDL drivers must be registered in the FMCSA Drug and Alcohol Clearinghouse (clearinghouse.fmcsa.dot.gov). The Clearinghouse is a secure database that records drug and alcohol program violations for CDL drivers.</p>
        <p style={s.p}>Before hiring any CDL driver, the carrier must conduct a pre-employment query in the Clearinghouse. Annually, the carrier must conduct limited queries for all current CDL drivers. Clearinghouse registration is separate from consortium enrollment — both are required.</p>

        <h2 style={s.h2}>Annual MIS Reporting</h2>
        <p style={s.p}>Carriers are required to submit an annual Management Information System (MIS) report to FMCSA covering drug and alcohol testing data for the prior calendar year. The report is due by March 15 of the following year. Many consortia submit MIS reports on behalf of enrolled carriers — confirm whether your consortium handles this and retain a copy of the filed report.</p>

        <h2 style={s.h2}>Drug and Alcohol Program Setup Checklist</h2>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "Enroll in a FMCSA-compliant consortium or TPA before first driver dispatch",
            "Designate a DER — document the designation in writing",
            "Register the carrier in the FMCSA Drug and Alcohol Clearinghouse",
            "Conduct a pre-employment Clearinghouse query for every new CDL driver",
            "Complete pre-employment drug test for every CDL driver — from SAMHSA-certified lab",
            "Confirm MRO-verified negative result before the driver operates",
            "Document the negative result in each driver's DQ file",
            "Enroll each CDL driver in the random testing pool",
            "Establish post-accident testing protocol — document procedures and 24-hour contact list",
            "Confirm supervisor reasonable suspicion training is complete and documented",
            "Establish annual MIS reporting process — confirm whether consortium handles filing",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>
        <p style={s.p}>The <Link to="/standards/drug-alcohol-packet" style={s.link}>Drug & Alcohol Compliance Packet</Link> includes a consortium selection checklist, DER designation template, pre-employment testing log, and annual MIS report template in fillable format.</p>

        <h2 style={s.h2}>What Happens Without a Program in Place</h2>
        <p style={s.p}>Operating without a drug and alcohol program is a violation of 49 CFR Part 382 from the first day a CDL driver dispatches. The violation does not begin at the audit — it begins at first dispatch.</p>
        <p style={s.p}>At a <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>new entrant safety audit</Link>, the auditor verifies program existence and documentation for every CDL driver in the operation. No consortium enrollment documentation means no program — regardless of whether tests were actually conducted. No pre-employment result in the DQ file means the driver may have operated without completing a mandatory federal safety screening.</p>
        <p style={s.p}>That finding is not a paperwork deficiency. It is an indication that a driver operated without authorization under 49 CFR Part 382. A Corrective Action Plan can document what the carrier has done since the audit — but it cannot retroactively authorize a dispatch that occurred without the required screening in place.</p>
        <p style={s.p}>The <Link to="/standards/16-deadly-sins" style={s.link}>16 Deadly Sins Pocket Guide</Link> covers the drug and alcohol compliance failures that appear most often in new entrant audit records — and what FMCSA documents when they find them.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          Drug and alcohol compliance — from consortium enrollment to DER designation to pre-employment testing — is installed in Module 3 of the LaunchPath Standard, the compliance module covering the full 49 CFR Part 382 program requirement.
        </p>

        <PrimaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
