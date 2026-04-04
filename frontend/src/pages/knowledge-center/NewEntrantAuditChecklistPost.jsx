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

const AREA_HEADER = ({ number, title, cfr }) => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", marginTop: "1.75rem" }}>
    <span style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.14em", color: "rgba(212,144,10,0.65)", flexShrink: 0 }}>{number}</span>
    <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.05rem", color: "#0b1628", lineHeight: 1.2, margin: 0 }}>{title}</h3>
    <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(13,27,48,0.4)", whiteSpace: "nowrap" }}>{cfr}</span>
  </div>
);

export const FAQ = [
  { q: "When does the FMCSA new entrant safety audit happen?", a: "FMCSA conducts the new entrant safety audit within 12 months of the carrier's authority grant date. FMCSA contacts the carrier to schedule the audit. The audit can be conducted on-site at the carrier's principal place of business or remotely, depending on FMCSA's current procedures and the carrier's geographic location." },
  { q: "What happens if I fail the new entrant safety audit?", a: "If the audit finds deficiencies, the carrier receives a Conditional or Unsatisfactory safety rating depending on the severity and pattern of findings. A Conditional rating requires submission of a Corrective Action Plan within 45 calendar days. An Unsatisfactory rating initiates proceedings to revoke operating authority within 60 days unless the carrier demonstrates sufficient compliance to support a rating upgrade." },
  { q: "Which document area causes the most new entrant audit failures?", a: "Driver Qualification Files are the most common source of new entrant audit deficiencies. Missing pre-employment drug test results, incomplete employment applications, absent annual MVR reviews, and missing previous employer safety performance inquiries each constitute separate, documentable deficiencies. Multiple DQ file deficiencies across several drivers signal systemic failure, which FMCSA weights more heavily than isolated gaps." },
  { q: "Can I postpone or reschedule a new entrant safety audit?", a: "Contact FMCSA immediately if you have a scheduling conflict. Failing to respond to an audit notice or failing to cooperate with the audit process is treated as non-compliance and can itself result in an adverse finding. Do not miss a scheduled audit without notifying FMCSA in advance and documenting your communication." },
  { q: "What is the difference between a finding and a violation in a new entrant safety audit?", a: "A finding is a documented deficiency — a specific requirement that was not met. A violation is a finding that rises to the level of a regulatory violation under the applicable CFR section. The severity and pattern of findings across audit areas determines whether the outcome is a Conditional or Unsatisfactory rating. Isolated findings carry different weight than patterns of findings across multiple drivers or vehicles." },
];

export default function NewEntrantAuditChecklistPost() {
  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Audit Readiness</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Parts 391 · 382 · 395 · 396 · 387 · 385 · Audit Readiness</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            What FMCSA Checks in a New Entrant Safety Audit
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            Every new interstate motor carrier receives a mandatory safety audit within 12 months of receiving operating authority. FMCSA conducts this audit to verify the carrier understands and has implemented federal safety regulations. The audit is not complaint-based — it happens regardless of your safety record.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            FMCSA reviews six areas. In each area, auditors look for specific documents. A missing document is a documented deficiency. This page covers what FMCSA reviews in each area and what you must have ready before the auditor arrives.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Parts 391, 382, 395, 396, 387, 385"], ["Reading Time", "~10 min"], ["Cluster", "LP-WEB-001 Page 6"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>What the New Entrant Safety Audit Is</h2>
        <p style={s.p}>The new entrant safety audit is a mandatory compliance review conducted by FMCSA for every new interstate motor carrier within 12 months of authority grant. It is not based on complaints, incidents, or roadside inspection data — it is a scheduled, systematic review that happens to every new carrier in the federal program.</p>
        <p style={s.p}>The audit's purpose is to verify that the carrier has implemented the six major compliance systems required by federal safety regulations. Auditors do not evaluate your intentions or your driving record. They review documents — and they review them against a specific checklist derived from the applicable CFR sections.</p>

        <h2 style={s.h2}>When It Happens</h2>
        <p style={s.p}>Within 12 months of the date operating authority was granted. FMCSA contacts the carrier to schedule the audit. The audit can be conducted on-site at the carrier's principal place of business or remotely.</p>
        <p style={s.p}>Carriers who do not respond to scheduling contact are found non-cooperative. Non-cooperation is treated as a compliance failure — it is not a neutral outcome. Do not allow the scheduling process to lapse without a response.</p>

        <h2 style={s.h2}>The Six Areas FMCSA Reviews</h2>

        <AREA_HEADER number="01" title="Driver Qualification Files" cfr="49 CFR Part 391" />
        <p style={s.p}>Auditors review DQ files for every CDL driver in the operation. The file must be complete — every required document must be present. Missing documents are deficiencies. A missing pre-employment drug test result is an elevated deficiency because it indicates the driver operated without completing a mandatory federal safety screening.</p>
        <p style={s.p}>Full requirements are covered on the <Link to="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={s.link}>Driver Qualification File Requirements</Link> page. Every document listed there must be in the file before the audit.</p>

        <AREA_HEADER number="02" title="Drug and Alcohol Testing Program" cfr="49 CFR Part 382" />
        <p style={s.p}>Auditors verify that the carrier has a compliant drug and alcohol testing program in place. They review consortium enrollment documentation, DER designation, pre-employment test results for every CDL driver, and evidence of a random testing pool. A carrier with CDL drivers and no documented program has a critical deficiency in this area from the first day of dispatch.</p>
        <p style={s.p}>Full requirements are covered on the <Link to="/knowledge-center/dot-drug-alcohol-program-requirements" style={s.link}>DOT Drug and Alcohol Program Requirements</Link> page.</p>

        <AREA_HEADER number="03" title="Hours of Service Records" cfr="49 CFR Part 395" />
        <p style={s.p}>Auditors verify that the carrier uses an approved Electronic Logging Device (ELD) — confirmed on FMCSA's approved device list — and that driver HOS records are maintained. For drivers exempt from ELD requirements, paper logs or other approved records must be present. Auditors typically request records for the prior 6 months.</p>

        <AREA_HEADER number="04" title="Vehicle Maintenance Records" cfr="49 CFR Part 396" />
        <p style={s.p}>Auditors review maintenance records for every commercial vehicle in the fleet. This includes Driver Vehicle Inspection Reports (DVIRs), preventive maintenance (PM) schedules, and repair records for any deficiency noted on a DVIR. A carrier with vehicles and no maintenance records has a documented deficiency in this area for the entire operating period.</p>

        <AREA_HEADER number="05" title="Hazardous Materials Compliance" cfr="49 CFR Parts 171–180 (if applicable)" />
        <p style={s.p}>If the carrier transports hazardous materials, auditors review hazmat compliance documentation — including driver training records, emergency response information, and shipping documentation procedures. If your carrier does not transport hazmat, this area is not reviewed.</p>

        <AREA_HEADER number="06" title="Insurance and Operating Authority" cfr="49 CFR Parts 387 · 390" />
        <p style={s.p}>Auditors verify that liability insurance is filed and active in FMCSA's system (BMC-91), that the BOC-3 process agent designation is on file, and that UCR registration is current for the calendar year. Authority must be active and carrier contact information current in the FMCSA portal.</p>

        <h2 style={s.h2}>Documents You Must Have Ready Before the Auditor Arrives</h2>
        <p style={s.p}>Organize these by audit area. The audit can be conducted on short notice after scheduling. Do not wait for a scheduled date to begin assembling documentation.</p>

        {[
          { area: "Driver Qualification Area", docs: ["Complete DQ file for every CDL driver — signed application, MVR, previous employer inquiry, road test cert or CDL equivalent, medical certificate, negative pre-employment drug test result", "Annual MVR reviews if any driver has been employed for more than 12 months"] },
          { area: "Drug and Alcohol Area", docs: ["Consortium enrollment documentation — signed agreement, effective date", "DER designation letter — signed, dated", "Pre-employment drug test results for every CDL driver — MRO-verified lab reports"] },
          { area: "Hours of Service Area", docs: ["ELD registration documentation — device model and confirmation of FMCSA approved status", "Driver HOS records for prior 6 months"] },
          { area: "Vehicle Maintenance Area", docs: ["DVIRs for every vehicle — completed and signed", "PM schedule for each vehicle — documented intervals", "Repair records for any DVIR-noted deficiencies"] },
          { area: "Insurance and Authority Area", docs: ["BMC-91 confirmation from SAFER — print or screenshot showing active status", "BOC-3 on file", "Current UCR registration certificate for the calendar year"] },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.9rem", color: "#0b1628", marginBottom: "0.5rem" }}>{section.area}</p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
              {section.docs.map((doc, j) => <li key={j} style={s.li}>{doc}</li>)}
            </ul>
          </div>
        ))}

        <p style={s.p}>The <Link to="/standards/new-entrant-packet" style={s.link}>New Entrant Compliance Packet</Link> includes pre-built templates for each of the document categories on this list — organized by audit area and ready to complete before your audit date.</p>

        <h2 style={s.h2}>Pre-Audit Checklist</h2>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "DQ files complete for every CDL driver — every required document present",
            "Drug and alcohol program enrolled — consortium documentation and DER designation on file",
            "Pre-employment drug test result on file for every CDL driver — MRO-verified",
            "ELD confirmed on FMCSA approved device list — registration documented",
            "HOS records for prior 6 months available and organized by driver",
            "Vehicle maintenance records current — PM schedule, DVIRs, repair logs",
            "Insurance active in SAFER — confirmed via public search, screenshot retained",
            "BOC-3 on file",
            "UCR registration current for calendar year",
            "Hazmat training records current (if applicable)",
            "Contact information in FMCSA portal current and accurate",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>

        <p style={s.p}>The <Link to="/standards/16-deadly-sins" style={s.link}>16 Deadly Sins Pocket Guide</Link> identifies the specific compliance behaviors that produce the most common new entrant audit deficiencies — organized by the audit area they threaten.</p>
        <p style={s.p}>The <Link to="/standards/safety-audit-prep-pack" style={s.link}>Safety Audit Prep Pack</Link> provides a structured audit preparation sequence — walking through each of the six audit areas with documentation checklists and gap analysis tools before your audit date.</p>

        <PrimaryCtaBlock dataTestId="kc-reach-cta-mid" />

        <h2 style={s.h2}>The Difference Between a Finding and a Failure</h2>
        <p style={s.p}>A finding is a documented deficiency — a specific requirement that was not met. Not all findings carry the same consequence. The consequence depends on the nature of the finding and whether it reflects a pattern across multiple documents, drivers, or vehicles.</p>
        <p style={s.p}>Critical factors — driver qualification, drug and alcohol, insurance — carry more weight than administrative gaps in non-critical areas. A pattern of findings in a critical area across multiple drivers signals systemic failure, which FMCSA treats differently than a single isolated gap.</p>
        <p style={s.p}>See also: <Link to="/knowledge-center/fmcsa-safety-rating-explained" style={s.link}>FMCSA Safety Rating Explained</Link> for the three-rating system and what each audit outcome means for the authority.</p>

        <h2 style={s.h2}>What Happens After the Audit</h2>
        <p style={s.p}>No deficiencies found: the audit is complete. No formal rating is typically issued. The carrier continues operating through the new entrant period. FMCSA continues monitoring through roadside inspection data and the CSA system.</p>
        <p style={s.p}>Deficiencies found: the carrier receives a Conditional rating. The 45-day Corrective Action Plan window begins from the date of the audit. The full process is covered on the <Link to="/knowledge-center/corrective-action-plan-fmcsa" style={s.link}>Corrective Action Plan</Link> page.</p>
        <p style={s.p}>Critical deficiencies: the carrier may receive an Unsatisfactory rating, which initiates authority revocation proceedings. The 60-day notice period begins immediately.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          The LaunchPath Standard is built around the six areas FMCSA reviews in the new entrant safety audit — each module installs one of the six compliance systems in practice, with documentation that meets audit standards.
        </p>

        <PrimaryCtaBlock />
        <SecondaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
