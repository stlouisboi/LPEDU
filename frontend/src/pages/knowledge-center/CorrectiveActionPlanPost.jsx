import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import { PrimaryCtaBlock, SecondaryCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";

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

const DEFICIENCY_ROW = ({ area, examples, correction }) => (
  <div style={{ borderLeft: "3px solid rgba(212,144,10,0.2)", paddingLeft: "1.25rem", marginBottom: "1.75rem" }}>
    <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.9rem", color: "#0b1628", marginBottom: "0.4rem" }}>{area}</p>
    <p style={{ fontFamily: mono, fontSize: "0.9rem", color: "rgba(0,26,51,0.75)", lineHeight: 1.75, marginBottom: "0.4rem" }}><strong>Common findings:</strong> {examples}</p>
    <p style={{ fontFamily: mono, fontSize: "0.9rem", color: "rgba(0,26,51,0.75)", lineHeight: 1.75, margin: 0 }}><strong>Corrective documentation:</strong> {correction}</p>
  </div>
);

export const FAQ = [
  { q: "What is a Corrective Action Plan for FMCSA?", a: "A Corrective Action Plan is a formal written response submitted to FMCSA after a safety audit finds deficiencies. It documents each deficiency found, its root cause, the corrective action taken, and the controls implemented to prevent recurrence. FMCSA requires submission within 45 calendar days of the audit." },
  { q: "How long do I have to submit a Corrective Action Plan?", a: "45 calendar days from the date of the audit. This is not a deadline that can be negotiated or extended through inaction. If you believe you cannot produce the required documentation within 45 days, contact FMCSA immediately to understand your options — do not simply allow the window to close." },
  { q: "What happens if I miss the 45-day CAP deadline?", a: "Failure to submit a Corrective Action Plan within 45 calendar days results in an automatic escalation to an Unsatisfactory safety rating. FMCSA then initiates proceedings to revoke operating authority. You receive a 60-day notice before revocation takes effect." },
  { q: "What must be included in an FMCSA Corrective Action Plan?", a: "Each deficiency must be addressed individually. For each finding, the CAP must document: the specific regulation cited, the root cause of the deficiency, the corrective action taken (completed, not planned), supporting documentation demonstrating the correction has been made, and the controls put in place to prevent recurrence. FMCSA reviews the CAP against the specific findings in the audit report." },
  { q: "Can I avoid a Corrective Action Plan if I fix the deficiencies before the audit ends?", a: "Correcting deficiencies before the audit conclusion can influence how FMCSA characterizes findings. However, once a finding is documented in the audit record, the carrier is typically required to submit a CAP addressing it regardless of subsequent corrections. Consult with a qualified transportation attorney if you receive an audit finding and want to understand your full range of options." },
];

export default function CorrectiveActionPlanPost() {
  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Audit Response</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Part 385 · Corrective Action Plans</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            What a Corrective Action Plan Is and How to Build One After an FMCSA Audit
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            When FMCSA finds deficiencies in a new entrant safety audit, the carrier has 45 calendar days to submit a Corrective Action Plan. The CAP is not a request for leniency — it is a documented record of what was missing, why, and what has been done to correct it. Miss the window and the outcome escalates automatically.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            Most carriers that fail to recover from a Conditional rating do not fail because the deficiencies are unrecoverable. They fail because they did not understand what the CAP requires — or they ran out of the 45-day window before they figured it out.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Part 385"], ["Reading Time", "~9 min"], ["Cluster", "LP-WEB-001 Page 5"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>What a Corrective Action Plan Is</h2>
        <p style={s.p}>A Corrective Action Plan is a written response submitted to FMCSA after a <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>new entrant audit</Link> or compliance review finds deficiencies. It does not dispute the findings. It addresses them.</p>
        <p style={s.p}>The CAP must document: what was missing, the root cause of why it was missing, what corrective action has been taken — past tense, not planned — and what controls have been implemented to prevent recurrence. It is not a narrative of intent. It is a structured record of completed action.</p>
        <p style={s.p}>FMCSA reviews the CAP against the specific deficiencies listed in the audit report. The response must address each finding individually, by finding reference, with supporting documentation attached.</p>

        <h2 style={s.h2}>When FMCSA Requires a Corrective Action Plan</h2>
        <p style={s.p}>A CAP is required whenever an audit or compliance review produces a Conditional safety rating. The audit report will identify each deficiency and reference the specific regulation violated. Every deficiency in the report must be addressed in the CAP — not just the ones the carrier considers significant.</p>
        <p style={s.p}>An Unsatisfactory rating typically produces a different process — authority revocation proceedings — rather than a standard CAP review cycle. Consult with a qualified transportation attorney if you receive an Unsatisfactory rating to understand the full sequence and timeline for your operation.</p>

        <h2 style={s.h2}>The 45-Day Timeline</h2>
        <p style={s.p}>The clock starts on the date of the audit — not the date you receive the written report, not the date you first understand what the report says. 45 calendar days from the audit date.</p>
        <p style={s.p}>FMCSA does not extend this window through inaction or silence. If you contact FMCSA before the window closes and document your contact, you may have options. If you allow the window to close without submitting, the outcome escalates automatically.</p>
        <p style={s.p}>Use the first week to read the audit report in full and list every finding. Use the following three weeks to gather documentation for each deficiency. Use the final week to compile, review, and submit. Do not use the final week to start gathering documentation.</p>

        <h2 style={s.h2}>What a CAP Must Include</h2>
        <p style={s.p}>Required elements for each deficiency finding:</p>
        <ol style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          {[
            "The specific deficiency — referenced by finding number and the CFR citation identified in the audit report.",
            "The root cause — not 'we didn't know.' Be specific. Was the document absent because the process for collecting it was never established? Because the document was created but not retained? The root cause determines what the corrective action and systemic controls must address.",
            "The corrective action taken — past tense. Not 'we will complete the DQ file.' 'The DQ file for Driver X has been completed. All required documents are attached.'",
            "Supporting documentation — the actual document, not a description of it. If the finding is a missing pre-employment drug test result, attach the lab report and MRO verification.",
            "Controls implemented to prevent recurrence — the process, policy, or procedure now in place that prevents the same gap from existing again. This is what FMCSA uses to evaluate whether the correction is systemic or ad hoc.",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ol>

        <h2 style={s.h2}>Common Audit Deficiencies and How to Address Each One</h2>
        <p style={s.p}>These are the deficiency categories that appear most often in new entrant audit records. Each requires a structured response with specific documentation.</p>

        <DEFICIENCY_ROW
          area="Driver Qualification File Deficiencies — 49 CFR Part 391"
          examples={<>Missing pre-employment drug test result; absent or incomplete MVR; missing previous employer safety performance inquiry; expired medical examiner's certificate. See: <Link to="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={s.link}>Driver Qualification File Requirements</Link>.</>}
          correction="Produce the missing document. If the document cannot be produced retroactively (e.g., a pre-employment drug test that was never administered), document the root cause and attach evidence that the process is now in place to prevent recurrence. Attach the current, compliant document for each driver."
        />

        <DEFICIENCY_ROW
          area="Drug and Alcohol Program Deficiencies — 49 CFR Part 382"
          examples="No consortium enrollment documented; no DER designation on file; pre-employment drug test result missing from one or more DQ files; no random testing pool established."
          correction="Produce consortium enrollment documentation. Produce a dated, signed DER designation letter. Produce MRO-verified lab results for any pre-employment tests that were completed but not documented. If a pre-employment test was never conducted, document the corrective action and systemic controls now in place."
        />

        <DEFICIENCY_ROW
          area="Hours of Service Deficiencies — 49 CFR Part 395"
          examples="No ELD installed or ELD not on FMCSA approved device list; no driver logs or HOS records on file; records for fewer than 6 months available."
          correction="Produce ELD registration documentation confirming the device is on the FMCSA approved ELD list. Produce retroactive HOS records where available. Attach the process now in place for daily log management and recordkeeping."
        />

        <DEFICIENCY_ROW
          area="Vehicle Maintenance Deficiencies — 49 CFR Part 396"
          examples="No maintenance records on file for one or more units; no systematic PM intervals documented; DVIRs not maintained; no repair records for noted deficiencies."
          correction="Produce maintenance records for each vehicle. Produce the PM schedule now established for each unit. Produce DVIR records for the period in question, or document the corrective action and attach the current DVIR system."
        />

        <p style={s.p}>The <Link to="/bundle" style={s.link}>Document System Bundle</Link> includes the policy documents and recordkeeping templates most commonly required to address DQ file, drug and alcohol, and vehicle maintenance deficiencies in a Corrective Action Plan.</p>
        <p style={s.p}>The <Link to="/standards/safety-audit-prep-pack" style={s.link}>Safety Audit Prep Pack</Link> provides the structured framework most carriers need to organize their CAP response and verify their corrective actions are documented correctly before submission.</p>

        <h2 style={s.h2}>CAP Response Checklist</h2>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "List each deficiency finding by finding number and CFR citation",
            "Document root cause for each deficiency — specific, not generic",
            "Confirm corrective action is complete for each deficiency — past tense",
            "Attach supporting documentation for each deficiency — the actual document, not a description",
            "Document systemic controls implemented to prevent recurrence for each deficiency",
            "Confirm submission date is within 45 calendar days of the audit date",
            "Retain a complete copy of the full submission with proof of delivery",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>

        <PrimaryCtaBlock dataTestId="kc-reach-cta-mid" />

        <h2 style={s.h2}>What Happens If You Miss the Deadline</h2>
        <p style={s.p}>A Conditional rating escalates automatically to Unsatisfactory when the 45-day CAP window closes without a submission. FMCSA initiates proceedings to revoke operating authority. The carrier receives a 60-day notice before revocation takes effect.</p>
        <p style={s.p}>At this point, the conversation is no longer about a Corrective Action Plan. It is about authority recovery — a different process with a different timeline and a different standard of documentation. See also: <Link to="/knowledge-center/fmcsa-safety-rating-explained" style={s.link}>FMCSA Safety Rating Explained</Link> for the full consequence chain.</p>
        <p style={s.p}>Carriers can attempt to submit documentation after the window, but FMCSA is not required to accept a late submission. The 45-day window is not a suggestion.</p>

        <h2 style={s.h2}>The Most Common Reason CAPs Fail</h2>
        <p style={s.p}>FMCSA returns CAPs for revision when the submission documents intent rather than completed action, or when the documentation attached does not match the deficiency it is meant to correct.</p>
        <p style={s.p}>A CAP that says "Driver X's DQ file will be completed within 10 days" is not a CAP. A CAP that says "Driver X's DQ file has been completed. All required documents, including the pre-employment drug test result, are attached to this submission" is a CAP — provided the documents are actually attached.</p>
        <p style={s.p}>Each revision request from FMCSA consumes days from the 45-day window. Treat the initial submission as your one opportunity to present a complete, documented response. Do not count on a revision cycle.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          The LaunchPath Standard's compliance backbone and audit response modules cover both the prevention and the recovery sequence — from building the systems that prevent audit deficiencies to understanding what a Corrective Action Plan requires when one is needed.
        </p>

        <PrimaryCtaBlock />
        <SecondaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
