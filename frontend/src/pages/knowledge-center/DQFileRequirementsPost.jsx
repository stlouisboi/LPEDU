import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import { PrimaryCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";

const navy = "#000F1F";
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

const FAQ = [
  { q: "What documents go in a driver qualification file?", a: "At minimum: employment application, motor vehicle records, previous employer inquiry, road test certificate or CDL equivalent, medical examiner's certificate, and a negative pre-employment drug test result. Annual MVR reviews are added every 12 months thereafter." },
  { q: "How long do I have to keep a DQ file after a driver leaves?", a: "Three years from the date of termination. Some documents within the file — particularly drug test results — have their own retention periods under 49 CFR Part 382. Retain whichever period is longer." },
  { q: "Does every driver need a DQ file or just CDL drivers?", a: "49 CFR Part 391 applies to drivers of commercial motor vehicles as defined under federal regulations. Most carriers subject to FMCSA jurisdiction are operating CMVs that require CDLs. Verify the CMV definition applies to your operation — if it does, DQ files are required." },
  { q: "What happens if FMCSA finds an incomplete DQ file at audit?", a: "The missing document is recorded as a deficiency. You are required to submit a Corrective Action Plan within 45 days documenting what was missing, why, and what you have done to correct it. Failure to submit a CAP results in an Unsatisfactory safety rating." },
  { q: "Can I keep DQ files electronically?", a: "Yes. Electronic storage is acceptable provided the system can produce a legible, complete copy on demand. Every required document must still be present regardless of storage format." },
];

export default function DQFileRequirementsPost() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Driver Qualification</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Part 391 · Driver Qualification</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            What FMCSA Requires in Every Driver Qualification File
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            A Driver Qualification File is the documentation package federal law requires you to maintain for every commercial driver in your operation. 49 CFR 391.51 specifies what belongs in the file, when each document must be collected, and how long you must keep it. An incomplete file is treated the same as no file at an FMCSA audit.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            Carriers lose audits not because they refused to build DQ files, but because they did not know what the file requires or when each document must be in place. This page covers what 49 CFR Part 391 requires — document by document, deadline by deadline.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Part 391"], ["Reading Time", "~9 min"], ["Cluster", "LP-WEB-001 Page 1"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>What Is a Driver Qualification File</h2>
        <p style={s.p}>A Driver Qualification File — commonly called a DQ file — is the compliance record FMCSA requires you to maintain for every CDL driver you employ. The requirement is established under 49 CFR Part 391. It applies to every motor carrier with CDL drivers operating in interstate commerce, regardless of fleet size. One truck, one driver: you need a DQ file. Ten trucks, ten drivers: you need ten DQ files.</p>
        <p style={s.p}>The file is not a formality. In a new entrant safety audit, FMCSA auditors review DQ files directly. A missing document is a documented deficiency. A missing pre-employment drug test result is a severe deficiency — because it means your driver operated without meeting the federal qualification standard.</p>
        <p style={s.p}>The file belongs to the carrier, not the driver. When a driver leaves your operation, you keep the file. For carriers still building their compliance infrastructure from the ground up, <Link to="/knowledge-center/how-to-start-a-trucking-company" style={s.link}>How to Start a Trucking Company</Link> covers the full startup sequence and where DQ file installation fits.</p>

        <h2 style={s.h2}>What 49 CFR Part 391 Requires in Every File</h2>
        <h3 style={s.h3}>Documents Required Before the Driver Operates</h3>
        <p style={s.p}>These documents must be in the file before the driver moves a single load. Not within 30 days. Before dispatch.</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "49 CFR 391.21 — Application for employment. A completed, signed application covering the prior 10 years of employment history, all accidents in the prior 3 years, and all traffic violations in the prior 3 years.",
            "49 CFR 391.23 — Motor vehicle record from every state in which the driver held a license in the prior 3 years. You must request this from the state directly or through a third-party MVR service. A driver telling you they have a clean record is not a substitute.",
            "49 CFR 391.23(d) — Previous employer safety performance history inquiry. You must contact every DOT-regulated employer the driver worked for in the prior 3 years and request their safety performance history. The inquiry must be documented, and the response — or the documented attempt if the employer does not respond — must be in the file.",
            "49 CFR 391.31 and 391.33 — Road test certificate or equivalent. If the driver holds a valid CDL, you may accept the CDL as equivalent to a road test under certain conditions. If you conduct your own road test, the signed certificate must be on file.",
            "49 CFR 391.43 — Medical examiner's certificate from a licensed examiner listed on the FMCSA National Registry of Certified Medical Examiners. An expired certificate means the driver is not medically qualified to operate.",
            "49 CFR Part 382.301 — Pre-employment drug test result. A negative result from a DOT-approved drug test must be on file before the driver operates. This cannot be backdated.",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>

        <h3 style={s.h3}>Documents Required After Employment Begins</h3>
        <p style={s.p}>49 CFR 391.25 — Annual review of driving record. Within 12 months of the driver's start date, and every 12 months thereafter, you must pull a current MVR and document a formal review. The review must be signed and retained in the file.</p>
        <p style={s.p}>The annual review is not the same as the initial MVR. It is a separate, recurring requirement. Carriers who pull an MVR at hire and never pull another one are in violation by the end of the first year.</p>

        <h2 style={s.h2}>How Long You Must Keep the File</h2>
        <p style={s.p}>49 CFR 391.51(b) specifies retention periods by document type.</p>
        <p style={s.p}>For active drivers: maintain the complete file for the duration of employment. For terminated drivers: retain the file for 3 years from the date of termination.</p>
        <p style={s.p}>Specific documents within the file have their own retention requirements. The pre-employment drug test result is governed by 49 CFR Part 382 retention rules — negative results for 1 year, positive results for 5 years.</p>
        <p style={s.p}>Physical or electronic storage is acceptable. If you store files electronically, the system must be capable of producing a legible copy on demand.</p>

        <h2 style={s.h2}>What Happens When a File Is Incomplete at Audit</h2>
        <p style={s.p}>FMCSA auditors review DQ files in every new entrant safety audit. The review is methodical. Auditors work from a checklist. Missing documents are documented as deficiencies.</p>
        <p style={s.p}>A single missing document in a single driver's file: documented deficiency, Corrective Action Plan required within 45 days.</p>
        <p style={s.p}>A missing pre-employment drug test result: elevated severity. The finding indicates the driver operated without meeting the federal drug testing requirement. This is not a paperwork deficiency — it is a substantive compliance failure.</p>
        <p style={s.p}>A pattern of incomplete files across multiple drivers: FMCSA treats this differently than a single gap. Pattern findings indicate systemic failure, not administrative oversight.</p>
        <p style={s.p}>The doctrine applies here: if it is not documented, it does not exist. A driver who has been with you for two years and has a spotless record still needs a complete DQ file.</p>
        <p style={s.p}>The <Link to="/standards/16-deadly-sins" style={s.link}>16 Deadly Sins Pocket Guide</Link> identifies the DQ file failures that appear most often in new entrant audit records — and what each one costs.</p>

        <h2 style={s.h2}>DQ File Checklist</h2>
        <p style={s.p}>Complete this checklist for every driver before they operate. Items marked PRE must be in the file before dispatch. Items marked ANN are ongoing annual requirements.</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "Signed employment application covering prior 10 years (PRE) — 49 CFR 391.21",
            "MVR from every state licensed in prior 3 years (PRE) — 49 CFR 391.23",
            "Previous employer safety performance history inquiry — documented attempt or response (PRE) — 49 CFR 391.23(d)",
            "Road test certificate or CDL equivalent documentation (PRE) — 49 CFR 391.31/391.33",
            "Current medical examiner's certificate from FMCSA National Registry examiner (PRE) — 49 CFR 391.43",
            "Negative pre-employment drug test result (PRE) — 49 CFR 382.301",
            "Annual MVR review — signed, dated, retained (ANN) — 49 CFR 391.25",
            "Updated medical certificate upon expiration (ongoing) — 49 CFR 391.43",
            "Record of any violations reported by driver under 391.27 (ANN)",
            "Documentation of any disqualifying offenses — 49 CFR 391.15",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>
        <p style={s.p}>If you need a pre-built DQ file system — the forms, the templates, and the instructions for each required document — the <Link to="/standards/dq-file-builder" style={s.link}>DQ File Builder Kit</Link> covers every item on this checklist.</p>

        <h2 style={s.h2}>What Happens Without a Complete DQ File</h2>
        <p style={s.p}>Carriers who operate without complete DQ files face three documented outcomes at audit.</p>
        <p style={s.p}>First: a deficiency finding that requires a formal Corrective Action Plan. The CAP has a 45-day response window. Miss the window and the outcome escalates to an Unsatisfactory safety rating.</p>
        <p style={s.p}>Second: if the pre-employment drug test is missing, FMCSA's finding indicates the driver operated without authorization under 49 CFR Part 382. That finding carries more weight than a missing MVR because it signals the carrier dispatched a driver without completing a required safety screening.</p>
        <p style={s.p}>Third: an Unsatisfactory safety rating affects more than compliance. Brokers check FMCSA's SAFER system. A carrier with an Unsatisfactory rating loses freight. The compliance failure becomes a revenue problem.</p>
        <p style={s.p}>Build the file before the driver operates. Maintain it annually. Keep it for three years after the driver leaves.</p>
        <p style={s.p}>See also: <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>new entrant audit</Link> and <Link to="/knowledge-center/corrective-action-plan-fmcsa" style={s.link}>Corrective Action Plan</Link>.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        {/* Module connection */}
        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          Driver Qualification File requirements are covered in depth in Module 2 of the LaunchPath Standard — the module that installs a complete, audit-ready DQ system for every driver in your fleet.
        </p>

        <PrimaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
