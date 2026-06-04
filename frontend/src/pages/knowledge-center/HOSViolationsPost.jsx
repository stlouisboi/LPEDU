import { Link } from '../../compat/Link';
import ShareButton from "../../components/ShareButton";
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

const VIOLATION_BLOCK = {
  background: "rgba(0,15,31,0.03)",
  border: "1px solid rgba(0,15,31,0.07)",
  borderLeft: `3px solid ${gold}`,
  padding: "1.25rem 1.25rem 1.25rem 1.5rem",
  marginBottom: "1rem",
};

const VIOLATIONS = [
  {
    label: "Operating a CMV while out of service — HOS",
    severity: 10,
    cfr: "49 CFR 395.13",
    detail: "Operating a vehicle after an out-of-service order for hours of service is the highest-severity HOS violation in the BASIC scoring system. A driver who has exceeded the driving or on-duty limit and continues to operate — or is directed to operate by the carrier — generates a severity-10 violation for the driver and for the carrier's record."
  },
  {
    label: "Driving beyond 11-hour limit (property-carrying)",
    severity: 7,
    cfr: "49 CFR 395.3(a)(3)",
    detail: "A driver may not drive more than 11 cumulative hours after coming off 10 consecutive hours off duty. Driving a single minute beyond the 11-hour limit is a violation. ELD systems record driving time automatically — a violation is generated the moment the 11-hour threshold is crossed while the vehicle is in motion."
  },
  {
    label: "Operating beyond the 14-hour on-duty window",
    severity: 8,
    cfr: "49 CFR 395.3(a)(2)",
    detail: "A property-carrying driver may not drive after the 14th consecutive hour following the start of a shift — regardless of how many of those hours were spent driving. The 14-hour clock starts at the beginning of the first on-duty period after a qualifying 10-hour rest. Unlike the 11-hour driving limit, the 14-hour window is not extended by off-duty breaks taken during the shift."
  },
  {
    label: "Failure to take the 30-minute rest break",
    severity: 4,
    cfr: "49 CFR 395.3(a)(3)(ii)",
    detail: "A driver may not drive after 8 cumulative hours of driving time without first taking a consecutive 30-minute non-driving period. The break can be off-duty or sleeper berth time — it cannot be on-duty non-driving. Violations occur when drivers push past the 8-hour driving mark without a documented break."
  },
  {
    label: "Exceeding the 60/70-hour weekly limit",
    severity: 6,
    cfr: "49 CFR 395.3(b)",
    detail: "A driver may not drive after accumulating 60 on-duty hours in 7 consecutive days, or 70 hours in 8 consecutive days, depending on the carrier's operating schedule. The 60/70-hour limit is reset only after 34 or more consecutive hours off duty. Carriers operating multiple drivers must track weekly totals at the fleet level — a driver who was near the limit at a prior carrier cannot be dispatched as if the slate is clean."
  },
  {
    label: "ELD form-and-manner violations",
    severity: 1,
    cfr: "49 CFR 395.8(d)",
    detail: "Form-and-manner violations occur when required information fields are incomplete, missing, or inaccurate — even if actual hours were not exceeded. Missing location entries, incorrect duty status notation, or unsigned logs each generate a violation. Individual form-and-manner violations carry a severity weight of 1, but multiple violations on the same inspection compound quickly."
  },
  {
    label: "False record of duty status",
    severity: 9,
    cfr: "49 CFR 395.8(e)",
    detail: "A false log — whether on paper or through ELD manipulation — is one of the most serious violations in the HOS BASIC. Falsification is inferred when ELD data, fuel receipts, GPS records, or toll transactions place the driver at a location inconsistent with the logged duty status. Carriers who instruct drivers to falsify records face separate violations under 49 CFR 395.8(e) and can face civil penalties."
  },
  {
    label: "ELD malfunction — failure to maintain paper logs",
    severity: 5,
    cfr: "49 CFR 395.34",
    detail: "When an ELD malfunctions, the driver must switch to paper logs within 24 hours and continue on paper for up to 8 days while the malfunction is corrected. Failure to maintain paper logs after a malfunction — or failure to carry the required 8 days of blank paper logs in the cab — is a violation. The ELD information packet required in the cab must include blank paper log forms for this reason."
  },
];

export const FAQ = [
  {
    q: "How does FMCSA track HOS violations between roadside inspections?",
    a: "FMCSA's Safety Measurement System (SMS) aggregates HOS violations from roadside inspections into the HOS Compliance BASIC. Each violation is assigned a severity weight and time-weighted based on recency. The BASIC score is then compared against other carriers to produce a percentile ranking. Carriers at or above the intervention threshold (currently 65th percentile for the HOS Compliance BASIC) are flagged for potential enforcement action. ELD data can also be reviewed during off-site compliance reviews without requiring a roadside stop."
  },
  {
    q: "Can a carrier be held responsible for a driver's HOS violation?",
    a: "Yes. Under 49 CFR 390.11, motor carriers have a duty to require drivers to comply with the Federal Motor Carrier Safety Regulations. A carrier that knew or should have known a driver was exceeding HOS limits — through dispatch records, trip logs, or ELD data — can be cited for requiring or permitting a violation. Carriers that set schedules, dispatch times, or delivery windows that make compliance with HOS rules impossible are particularly exposed to this finding."
  },
  {
    q: "Does the 30-minute rest break apply to owner-operators?",
    a: "Yes. The 30-minute break requirement under 49 CFR 395.3(a)(3)(ii) applies to all property-carrying CMV drivers subject to Part 395, including owner-operators. Exemptions exist for certain operations — short-haul (defined by the 150 air-mile radius rule), drivers operating under the agricultural short-haul exemption, and others specified in 49 CFR 395.1. If none of the enumerated exemptions apply, the 30-minute break is required."
  },
  {
    q: "What is the short-haul exemption and does it eliminate HOS record-keeping requirements?",
    a: "Under 49 CFR 395.1(e), drivers who operate within a 150 air-mile radius of their normal work reporting location and return to that location within 14 consecutive hours are exempt from the daily log requirement. This eliminates the requirement to maintain a daily log — it does not eliminate the 11-hour driving limit, the 14-hour window, or the 30-minute break requirement. Drivers relying on the short-haul exemption must still track hours to ensure they do not exceed the applicable driving limits."
  },
  {
    q: "How long does a new carrier have before HOS violations begin affecting safety fitness?",
    a: "From the first day a CDL driver operates under the carrier's authority, HOS violations from roadside inspections begin accumulating in the HOS Compliance BASIC. FMCSA does not apply a grace period for new carriers on BASIC scoring. A new entrant safety audit typically occurs within 12 months of receiving authority — but BASIC scores are monitored continuously and can trigger an off-cycle intervention at any point if they reach the applicable threshold. Compliance from Day 1 is not optional."
  },
];

export default function HOSViolationsPost() {
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
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Hours of Service</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Part 395 · FMCSA CSA BASIC Scoring</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Hours of Service Violations That Generate CSA Points and Trigger FMCSA Intervention
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            HOS violations are the most frequently cited violation type in FMCSA roadside inspections. They accumulate in the HOS Compliance BASIC, and that BASIC score is one of the most direct paths from a roadside stop to a compliance review — without waiting for the scheduled new entrant safety audit.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            This page covers the specific violation types, their CSA severity weights, how the scoring system translates violations into intervention thresholds, and what documentation practices prevent violations from occurring.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Part 395"], ["Reading Time", "~9 min"], ["BASIC", "HOS Compliance"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(13,27,48,0.08)", display: "flex", alignItems: "center" }}>
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>How HOS Violations Reach the Carrier Record</h2>
        <p style={s.p}>An HOS violation found during a roadside inspection is recorded in the Federal Motor Carrier Safety Administration's Motor Carrier Management Information System (MCMIS). From MCMIS, it feeds into the Safety Measurement System (SMS), where it is assigned a severity weight and contributes to the HOS Compliance BASIC score. The carrier's BASIC percentile is recalculated after each inspection event.</p>
        <p style={s.p}>Violations remain in the 24-month scoring window from the date of the inspection. For new carriers, this means violations from the first months of operation are still in the scoring window at the new entrant safety audit — and because there are fewer total inspection data points early in a carrier's history, a single high-severity violation produces a disproportionately high percentile score.</p>

        <SecondaryCtaBlock dataTestId="hos-violations-mid-cta" />

        <h2 style={s.h2}>HOS Violations by Severity Weight</h2>
        <p style={s.p}>Each violation type carries a severity weight from 1 (low) to 10 (maximum). Severity weight reflects the regulatory significance of the violation — not just its frequency. Out-of-service violations carry the highest weights. The severity weight is multiplied by a time weight (more recent violations score higher) to produce the individual violation's contribution to the BASIC score.</p>

        {VIOLATIONS.map((v, i) => (
          <div key={i} style={VIOLATION_BLOCK}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
              <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", margin: 0, flex: 1 }}>{v.label}</p>
              <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", background: v.severity >= 8 ? "rgba(185,28,28,0.08)" : "rgba(0,15,31,0.05)", color: v.severity >= 8 ? "#b91c1c" : "rgba(0,26,51,0.55)", border: `1px solid ${v.severity >= 8 ? "rgba(185,28,28,0.20)" : "rgba(0,15,31,0.10)"}`, padding: "0.2rem 0.5rem", borderRadius: 3, flexShrink: 0 }}>SEVERITY {v.severity}</span>
            </div>
            <p style={{ ...s.cfr, marginBottom: "0.5rem" }}>{v.cfr}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{v.detail}</p>
          </div>
        ))}

        <h2 style={s.h2}>The HOS Compliance BASIC — Intervention Threshold</h2>
        <p style={s.p}>FMCSA's current intervention threshold for the HOS Compliance BASIC is the 65th percentile for passenger-carrying carriers and an absolute threshold for property-carrying carriers. When a carrier's HOS Compliance BASIC score reaches or exceeds the intervention threshold, it becomes eligible for a warning letter, off-site investigation, or targeted roadside inspection program.</p>
        <p style={s.p}>Intervention does not mean the carrier's authority is immediately revoked. It means FMCSA has flagged the carrier for additional scrutiny. A subsequent compliance review — triggered by the BASIC score — can result in a safety rating change. For new carriers still in the new entrant program, an Unsatisfactory safety rating from a compliance review initiated by a high BASIC score can lead to revocation proceedings.</p>

        <h2 style={s.h2}>ELD Recordkeeping and the Separate Violation Category</h2>
        <p style={s.p}>ELD recordkeeping violations — form-and-manner errors, missing data fields, failure to annotate edits — are separate from the underlying hours violations. A driver who operated within all legal hour limits but maintained an incomplete log can still generate BASIC points for the recordkeeping deficiencies. Conversely, a driver who operated legally but whose ELD shows an unresolved malfunction and no paper log backup generates both a technical ELD violation and a potential form-and-manner violation.</p>
        <p style={s.p}>Carriers should audit ELD records at regular intervals — not only after inspections. Systematic form-and-manner deficiencies across multiple drivers are a strong indicator of a training or supervision gap that will be visible in the BASIC data.</p>

        <h2 style={s.h2}>What Correct HOS Compliance Looks Like</h2>
        <p style={s.p}>A clean HOS record is not produced by careful driving alone. It is produced by dispatch practices, schedule management, and driver training that work together to prevent violations before they occur.</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "Dispatch planning accounts for actual drive time, mandatory break windows, and loading/unloading delays — not optimistic assumptions",
            "Drivers know their current hours before dispatch — not from memory but from ELD review",
            "The 14-hour window is treated as a planning constraint, not a target",
            "ELD logs are reviewed daily by the carrier for completeness, accuracy, and form-and-manner compliance",
            "Driver on-duty time outside the cab — pre-trip inspections, loading, waiting — is logged as on-duty non-driving, not ignored",
            "Drivers are trained on the short-haul exemption conditions so they don't inadvertently rely on it when they don't qualify",
            "Post-accident and post-inspection records are retained for the required 6-month minimum (49 CFR 395.8(k))",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>
        <p style={s.p}>HOS controls — including driver training, dispatch protocols, and ELD audit procedures — are installed in Module 4 of the LaunchPath Standard. The <Link to="/standards/hos-dispatch-packet" style={s.link}>HOS & Dispatch Compliance Packet</Link> includes an HOS rules reference card, dispatch planning worksheet, and ELD audit log template.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          Not sure where your HOS compliance currently stands? The REACH Diagnostic evaluates your HOS domain as one of five compliance areas and shows exactly where the exposure is.
        </p>

        <PrimaryCtaBlock />
        <CheckpointCtaBlock />
        <RegulatoryDisclaimer />
      </div>
      <SiteFooter />
    </div>
  );
}
