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

const CHECKLIST_BLOCK = {
  background: "rgba(0,15,31,0.03)",
  border: "1px solid rgba(0,15,31,0.07)",
  borderLeft: `3px solid ${gold}`,
  padding: "1.25rem 1.25rem 1.25rem 1.5rem",
  marginBottom: "1.25rem",
};

const CAB_DOCS = [
  { label: "Commercial Driver's License", cfr: "49 CFR 391.11", detail: "Valid, correct class and endorsements for the vehicle being operated. Expired CDL is an automatic out-of-service violation." },
  { label: "Medical Examiner's Certificate", cfr: "49 CFR 391.41 / 391.43", detail: "Current, not expired. Must reflect any restrictions (e.g., corrective lenses required). Interstate commerce requires a Federal Medical Examiner-certified exam." },
  { label: "Hours of Service Records — Current + 7 Prior Days", cfr: "49 CFR 395.8", detail: "ELD or paper log, depending on exemption status. Must be current through last duty status change. Gap in records is a violation independent of whether actual hours were exceeded." },
  { label: "ELD Information Packet", cfr: "49 CFR 395.8(k)", detail: "Instruction sheet for the ELD device, ELD malfunction reporting sheet, and 8 days of blank paper logs for malfunction backup. Required in the cab at all times." },
  { label: "Vehicle Registration", cfr: "49 CFR 390.21", detail: "Current registration for the power unit. If leased, the lease agreement may also be required." },
  { label: "Operating Authority / Cab Card", cfr: "49 CFR 392.9a", detail: "Proof of operating authority for for-hire carriers. The MC number and USDOT number must match the markings on the vehicle." },
  { label: "Annual Vehicle Inspection Report", cfr: "49 CFR 396.21", detail: "The most recent annual inspection report must be carried in the vehicle or kept at the terminal and producible on request. Many carriers keep a copy in the cab." },
  { label: "Pre-Trip Inspection Report (Prior Day's DVIR)", cfr: "49 CFR 396.11", detail: "The driver vehicle inspection report from the prior trip must be in the cab until the next report is submitted. If defects were noted, proof of repair or determination that repair is unnecessary is required." },
];

const VEHICLE_CATEGORIES = [
  {
    label: "Brakes",
    cfr: "49 CFR 393.40–52",
    detail: "Brake adjustment, brake hose condition, air pressure, anti-lock brake system function. Brake violations are the most frequently cited out-of-service condition at roadside inspections. A vehicle with brakes adjusted beyond the out-of-service threshold must be placed OOS on the spot."
  },
  {
    label: "Lights and Lamps",
    cfr: "49 CFR 393.9–25",
    detail: "Headlights, taillights, stop lamps, turn signals, hazard flashers, clearance lights, and marker lights must all be functional. A single inoperative required lamp is a violation. Multiple inoperative lamps can trigger OOS."
  },
  {
    label: "Tires",
    cfr: "49 CFR 393.75",
    detail: "Tread depth minimums (4/32\" front, 2/32\" other), no re-grooved tires on front axle, no flat tires or tires with visible fabric, no tire-to-frame contact. Low tread on a steer tire is an OOS violation."
  },
  {
    label: "Steering and Suspension",
    cfr: "49 CFR 393.80–102",
    detail: "Steering wheel free play, steering column condition, shock absorber condition, spring hangers, U-bolts, and frame integrity. Excessive steering play is an OOS condition."
  },
  {
    label: "Fuel System",
    cfr: "49 CFR 393.65",
    detail: "No fuel leaks. Fuel tanks properly mounted and secured. Fuel cap present and secured. A visible fuel leak is an immediate OOS condition."
  },
  {
    label: "Cargo Securement",
    cfr: "49 CFR 393.100–136",
    detail: "Proper tie-down count, working load limit of securement devices, blocking and bracing for specific cargo types. Unsecured or inadequately secured cargo is a violation that generates severity points and can result in OOS for the load."
  },
];

export const FAQ = [
  {
    q: "What is a Level I roadside inspection and how common is it?",
    a: "A Level I inspection is the North American Standard Inspection — the most comprehensive roadside inspection type. It covers both the driver (license, medical certificate, HOS records) and the vehicle (brakes, lights, tires, steering, suspension, cargo securement). Level I inspections are conducted at fixed inspection stations and by roadside enforcement officers. They are the most common type of inspection resulting in out-of-service orders and CSA violations."
  },
  {
    q: "What happens if a driver is placed out of service at a roadside inspection?",
    a: "An out-of-service order means the driver may not operate the vehicle until the OOS condition is corrected. For driver OOS violations (HOS, license, medical), the driver must be replaced or wait until compliant. For vehicle OOS violations, the vehicle may not move until the defect is repaired. An OOS violation generates the highest severity weight in the applicable CSA BASIC. Multiple OOS violations on a single inspection compound the scoring impact."
  },
  {
    q: "How long do roadside inspection violations stay on a carrier's CSA record?",
    a: "Violations remain in the CSA scoring system for 24 months from the date of the inspection. During a new carrier's first 18 months, this means a violation from the first roadside inspection can still be in the scoring window at the new entrant safety audit. Early violations weigh more heavily than their absolute count suggests because there are fewer data points in the window to offset them."
  },
  {
    q: "Does the carrier's safety rating change after a roadside inspection?",
    a: "A single roadside inspection does not directly change the carrier's official safety rating under 49 CFR Part 385. However, roadside violations accumulate in CSA BASIC scores, and high BASIC scores can trigger a compliance review or targeted investigation, which can result in a safety rating change. For new carriers in the new entrant program, safety audit findings — not BASIC scores alone — determine the initial safety rating."
  },
  {
    q: "What should a driver do if they disagree with a violation recorded at a roadside inspection?",
    a: "The driver should accept the inspection report without argument at the roadside. Disputing findings with an enforcement officer does not change the outcome and can escalate the encounter. The correct process is to challenge the violation after the fact through the DataQs system (dataqs.fmcsa.dot.gov), which allows carriers and drivers to request a review of inspection records they believe are inaccurate. Successful DataQs challenges can remove or correct violations from the BASIC record."
  },
];

export default function RoadsideInspectionPost() {
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
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Roadside Enforcement</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Parts 391 · 393 · 395 · 396 · CVSA North American Standard</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            FMCSA Roadside Inspection: What Inspectors Check and What to Have Ready
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            Roadside inspections are the enforcement mechanism that operates between formal audits. A single violation from a roadside stop generates CSA severity points that accumulate in your BASIC scores — and high BASIC scores can trigger a compliance review faster than your scheduled new entrant safety audit.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            The correct posture is not to prepare for inspections — it is to operate at a level where inspections find nothing. That requires knowing exactly what inspectors look for, what must be in the cab, and what vehicle conditions generate out-of-service orders. This page covers each category.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Parts 391–396"], ["Reading Time", "~10 min"], ["Audience", "New Carriers / Owner-Operators"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(13,27,48,0.08)", display: "flex", alignItems: "center" }}>
              <ShareButton />
            </div>
          </div>
          <ArticleByline date="February 2, 2026" />
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>Why Roadside Violations Are Different from Audit Findings</h2>
        <p style={s.p}>A new entrant safety audit reviews your compliance management systems — records, programs, and procedures. A roadside inspection reviews what is actually present at the point of operation: the driver's documents, the driver's physical condition, the vehicle's mechanical state. The two enforcement mechanisms are parallel. A carrier can have clean audit records and still accumulate CSA violations from poorly maintained equipment or disorganized cab documentation.</p>
        <p style={s.p}>For new carriers in the first 18 months, both matter. CSA BASIC scores are monitored continuously. An unusually high score in any BASIC can trigger an off-cycle compliance review before the scheduled new entrant safety audit. The <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>new entrant safety audit</Link> and roadside enforcement are not separate tracks — they feed the same safety fitness determination.</p>

        <SecondaryCtaBlock dataTestId="roadside-mid-cta" />

        <h2 style={s.h2}>What Must Be in the Cab</h2>
        <p style={s.p}>Document deficiencies are among the most preventable violations at roadside inspections. A driver who cannot produce a required document on request creates a recordable violation regardless of whether the underlying compliance exists. The following documents must be in the cab or on the driver's person at all times while operating.</p>

        {CAB_DOCS.map((doc, i) => (
          <div key={i} style={CHECKLIST_BLOCK}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.25rem" }}>
              <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", margin: 0 }}>{doc.label}</p>
            </div>
            <p style={{ ...s.cfr, marginBottom: "0.5rem" }}>{doc.cfr}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{doc.detail}</p>
          </div>
        ))}

        <h2 style={s.h2}>Driver Compliance — What the Inspector Evaluates</h2>
        <p style={s.p}>Beyond document production, the inspector observes the driver directly and evaluates compliance with operating requirements.</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "CDL class and endorsements match the vehicle and cargo being operated (49 CFR 391.11)",
            "Medical certificate is current and unrestricted, or restrictions are being observed (49 CFR 391.41)",
            "HOS log is current, reflects actual duty status, and matches ELD data — discrepancies between the log and ELD records are treated as falsification (49 CFR 395.8)",
            "Seat belt in use while operating (49 CFR 392.16) — applies to both driver and passenger",
            "No handheld mobile device use while driving (49 CFR 392.82) — hands-free is permitted",
            "No radar detection devices in the cab (49 CFR 392.71) — prohibited in commercial vehicles",
            "No open alcohol containers, no evidence of alcohol use within 4 hours of operating (49 CFR 392.5)",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>

        <h2 style={s.h2}>Vehicle Condition — The Six Inspection Categories</h2>
        <p style={s.p}>CVSA's North American Standard Inspection examines six vehicle systems. Violations in any category generate CSA points. Out-of-service conditions in any category prohibit further operation until corrected.</p>

        {VEHICLE_CATEGORIES.map((cat, i) => (
          <div key={i} style={CHECKLIST_BLOCK}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", marginBottom: "0.25rem" }}>{cat.label}</p>
            <p style={{ ...s.cfr, marginBottom: "0.5rem" }}>{cat.cfr}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{cat.detail}</p>
          </div>
        ))}

        <h2 style={s.h2}>Out-of-Service Orders — What Triggers Them</h2>
        <p style={s.p}>An out-of-service order prohibits further operation of the vehicle, the driver, or both until the deficiency is corrected. OOS violations carry the highest severity weights in the CSA scoring system. A driver or carrier who operates after receiving an OOS order commits a separate, significant violation under 49 CFR 390.5.</p>
        <p style={s.p}>Common OOS triggers for drivers: HOS limit exceeded, expired CDL, expired medical certificate, evidence of alcohol use within 4 hours of operating. Common OOS triggers for vehicles: brakes adjusted beyond the OOS threshold, inoperative required lights during nighttime operation, flat or damaged tires, visible fuel leak, or any condition that creates an imminent hazard.</p>
        <p style={s.p}>An OOS finding at a roadside inspection is a direct input to the CSA Unsafe Driving or Vehicle Maintenance BASIC, depending on the category. OOS violations from roadside inspections can appear on the carrier's record within days and remain there for 24 months.</p>

        <h2 style={s.h2}>How Roadside Violations Score in BASIC</h2>
        <p style={s.p}>Each violation from a roadside inspection is assigned a severity weight (1–10) in the applicable BASIC. OOS violations receive the maximum weight of 10. The violation is then time-weighted — more recent violations count more heavily than older ones. FMCSA's Safety Measurement System (SMS) calculates percentile rankings that compare each carrier's BASIC scores against peers. A percentile at or above the intervention threshold triggers a compliance review or targeted investigation.</p>
        <p style={s.p}>For new carriers with limited inspection history, a single high-severity violation can generate a disproportionate BASIC score because the percentile is calculated against the carrier's own limited data. A carrier with two inspections and one OOS violation has a 50% violation rate in that inspection data set.</p>

        <h2 style={s.h2}>What the Carrier Controls Before Dispatch</h2>
        <p style={s.p}>Most roadside violations are traceable to conditions that existed before the vehicle left the yard. Pre-trip inspections — required under 49 CFR 396.13 — exist to surface these conditions before they become roadside findings. A completed, documented pre-trip inspection that identifies and corrects a defect before dispatch is not a violation. The same defect found by an inspector at a weigh station is.</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "Confirm driver CDL and medical certificate are current before each dispatch — not monthly",
            "Confirm HOS status before dispatch — verify the driver has available hours for the planned trip",
            "Verify cab documents are complete and current — registration, operating authority, annual inspection report, prior DVIR",
            "Require and retain completed Driver Vehicle Inspection Reports (DVIRs) after every trip",
            "Conduct and document annual vehicle inspections per 49 CFR 396.17 — retain the report for 14 months",
            "Address any defects noted on DVIRs before the vehicle operates again",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>
        <p style={s.p}>The <Link to="/standards/new-entrant-packet" style={s.link}>New Entrant Compliance Packet</Link> includes a pre-trip inspection checklist, DVIR template, cab document checklist, and annual inspection tracking log in fillable format.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          Vehicle maintenance records, driver qualification files, and hours of service controls — the documentation systems that determine what an inspector finds — are installed across Modules 2, 3, and 4 of the LaunchPath Standard.
        </p>

        <PrimaryCtaBlock />
        <CheckpointCtaBlock />
        <RegulatoryDisclaimer />
      </div>
      <SiteFooter />
    </div>
  );
}
