import { Link } from '../../compat/Link';
import ShareButton from "../../components/ShareButton";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import { PrimaryCtaBlock, SecondaryCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";
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

const CALLOUT = {
  background: "rgba(185,28,28,0.04)",
  border: "1px solid rgba(185,28,28,0.15)",
  borderLeft: "3px solid rgba(185,28,28,0.50)",
  padding: "1.25rem 1.25rem 1.25rem 1.5rem",
  marginBottom: "1.5rem",
};

const INFO_BLOCK = {
  background: "rgba(0,15,31,0.03)",
  border: "1px solid rgba(0,15,31,0.07)",
  borderLeft: `3px solid ${gold}`,
  padding: "1.25rem 1.25rem 1.25rem 1.5rem",
  marginBottom: "1.25rem",
};

const RATINGS = [
  {
    label: "Satisfactory",
    color: "#166534",
    bg: "rgba(22,101,52,0.06)",
    border: "rgba(22,101,52,0.20)",
    def: "FMCSA has determined the carrier has adequate safety management controls in place to meet the safety fitness standard. A Satisfactory rating is the standard compliance posture. Most carriers that complete the new entrant program without major audit findings receive a Satisfactory rating."
  },
  {
    label: "Conditional",
    color: "#92400e",
    bg: "rgba(146,64,14,0.06)",
    border: "rgba(146,64,14,0.25)",
    def: "FMCSA has determined the carrier does not have adequate safety management controls in one or more areas but has not found the safety fitness standard to be failed. A Conditional rating does not revoke the carrier's operating authority. It is a notice that deficiencies have been identified and must be corrected."
  },
  {
    label: "Unsatisfactory",
    color: "#991b1b",
    bg: "rgba(153,27,27,0.06)",
    border: "rgba(153,27,27,0.25)",
    def: "FMCSA has determined the carrier fails to meet the safety fitness standard. An Unsatisfactory rating begins a revocation process. New entrant carriers who receive an Unsatisfactory rating from a new entrant safety audit have 45 days to correct deficiencies. If not corrected within that window, the registration is revoked."
  },
];

export const FAQ = [
  {
    q: "Can a motor carrier continue to operate after receiving a Conditional safety rating?",
    a: "Yes. A Conditional safety rating does not suspend or revoke operating authority. The carrier may continue to operate while working to upgrade the rating. However, insurance carriers may renegotiate rates or coverage terms for carriers with a Conditional rating, and shippers and brokers increasingly screen carriers by safety rating. The practical consequence of maintaining a Conditional rating long-term extends beyond the regulatory relationship."
  },
  {
    q: "How long does a Conditional safety rating stay on a carrier's record?",
    a: "A Conditional safety rating remains on the carrier's record until it is upgraded through a successful safety rating upgrade process or a subsequent compliance review results in a different rating. There is no automatic expiration. The rating is visible in FMCSA's SAFER database and in third-party carrier monitoring services used by shippers and brokers."
  },
  {
    q: "What is the process to upgrade from Conditional to Satisfactory?",
    a: "The carrier must request a safety rating upgrade from FMCSA after demonstrating that the deficiencies identified in the original compliance review have been corrected. The request should include documentation of the corrective actions taken. FMCSA may conduct a follow-up compliance review to verify the corrections. A successful follow-up results in a rating upgrade. There is no standard timeline for processing upgrade requests — carriers should follow up with the FMCSA service center assigned to their state."
  },
  {
    q: "How does a Conditional rating affect insurance?",
    a: "A Conditional safety rating is publicly visible in FMCSA's SAFER database and is routinely reviewed by insurance underwriters at renewal. Many commercial truck insurance carriers will not write a new policy for a carrier with a Conditional rating, and some existing carriers will non-renew at the next renewal date. Carriers without continuous liability coverage lose their operating authority under 49 CFR 387 — a Conditional rating that leads to an insurance non-renewal can produce an authority lapse, which is its own separate compliance problem."
  },
  {
    q: "What is a Voluntary Compliance Review and should a carrier request one?",
    a: "A Voluntary Compliance Review (VCR) is a compliance review requested by the carrier — not initiated by FMCSA. Carriers operating under a Conditional rating sometimes request a VCR after making compliance improvements as a way to demonstrate readiness for an upgrade. The VCR follows the same process as a standard compliance review. Requesting a VCR before deficiencies are fully corrected is not advisable — a VCR that results in a confirmed Conditional or downgraded Unsatisfactory rating is not a recoverable outcome in the short term."
  },
];

export default function ConditionalSafetyRatingPost() {
  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <ReadingProgressBar />
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Safety Fitness</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Part 385 · FMCSA Safety Rating System</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            What a Conditional Safety Rating Means for Your Motor Carrier Authority
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            A Conditional safety rating is not a failed audit. It is FMCSA's determination that your safety management controls are inadequate in at least one area. The rating does not revoke your authority — but it is a formal notice, it is publicly visible, and it starts a clock you need to understand.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            This page covers how Conditional ratings are assigned, what they require, how they differ from an Unsatisfactory rating, and what the upgrade process looks like. If you have already received a Conditional rating, start with the section on the 45-day response window.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Part 385"], ["Reading Time", "~10 min"], ["Urgency", "Time-Sensitive"]].map(([l, v]) => (
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

        <h2 style={s.h2}>The Three Safety Ratings</h2>
        <p style={s.p}>Under 49 CFR Part 385, FMCSA assigns one of three safety ratings following a compliance review. The rating reflects FMCSA's determination of whether the carrier meets the safety fitness standard — not a score, not a grade, but a regulatory determination.</p>

        {RATINGS.map((r, i) => (
          <div key={i} style={{ background: r.bg, border: `1px solid ${r.border}`, borderLeft: `3px solid ${r.color}`, padding: "1.25rem 1.25rem 1.25rem 1.5rem", marginBottom: "1rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: r.color, marginBottom: "0.5rem", letterSpacing: "0.04em" }}>{r.label.toUpperCase()}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{r.def}</p>
          </div>
        ))}

        <SecondaryCtaBlock dataTestId="conditional-rating-mid-cta" />

        <h2 style={s.h2}>How a Conditional Rating Is Assigned</h2>
        <p style={s.p}>A Conditional rating is issued following a compliance review — typically a new entrant safety audit, a targeted compliance review, or an investigation initiated by CSA BASIC scores. The reviewer evaluates the carrier's safety management controls against seven regulatory factors: Parts 382, 383, 387, 390, 391, 392, 393, 395, 396, and 397.</p>
        <p style={s.p}>A violation rate above the acute or critical threshold in any factor area — or a pattern of violations that indicates inadequate safety management — can result in a Conditional finding in that factor. A Conditional rating is issued when at least one factor produces a finding of inadequacy, but the overall safety fitness standard is not determined to be failed.</p>
        <p style={s.p}>The specific regulatory areas cited in the Conditional finding are documented in the compliance review report. The carrier's corrective actions must address those specific areas — a general compliance improvement that doesn't speak to the cited deficiencies will not satisfy the upgrade review.</p>

        <h2 style={s.h2}>The 45-Day Response Window</h2>
        <div style={CALLOUT}>
          <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#991b1b", marginBottom: "0.5rem" }}>Time-Sensitive — New Entrant Carriers</p>
          <p style={{ ...s.p, marginBottom: 0 }}>New entrant carriers who receive an Unsatisfactory rating at their new entrant safety audit have 45 days from the date of the written notice to correct all identified deficiencies. Carriers who receive a Conditional rating at a new entrant audit are not automatically subject to the same 45-day revocation window — but the audit report will specify the response requirements and timeline. Read the audit report and the accompanying notice carefully. The clock and the required actions are both in that document.</p>
        </div>
        <p style={s.p}>For carriers not in the new entrant program, a Conditional rating does not carry an automatic correction deadline imposed by FMCSA. However, an open Conditional rating that remains unaddressed for an extended period can factor into subsequent compliance reviews and into FMCSA's decision to initiate an investigation.</p>

        <h2 style={s.h2}>Writing a Corrective Action Plan</h2>
        <p style={s.p}>Whether required as part of an audit response or submitted voluntarily to support a rating upgrade request, a Corrective Action Plan must do two things: (1) identify the specific regulatory deficiency cited in the compliance review, and (2) describe what the carrier has done — not will do — to correct it. A CAP that describes future intentions without documenting current implementation will not satisfy FMCSA's review.</p>
        <p style={s.p}>Effective CAP elements for each cited deficiency:</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "The specific CFR section cited in the compliance review finding",
            "The specific violation — what was found, what was missing, what was incorrect",
            "The corrective action taken — documentation created, procedures implemented, training completed",
            "The date the corrective action was completed",
            "Supporting documentation attached or available upon request",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>
        <p style={s.p}>For detail on the CAP structure and format, see: <Link to="/knowledge-center/corrective-action-plan-fmcsa" style={s.link}>How to Write a Corrective Action Plan for an FMCSA Compliance Review</Link>.</p>

        <h2 style={s.h2}>Insurance Consequences of a Conditional Rating</h2>
        <p style={s.p}>A Conditional safety rating is visible in FMCSA's SAFER database. Insurance underwriters, shippers, brokers, and freight platforms check SAFER. The commercial consequence of a Conditional rating is not theoretical — it is a material factor in renewal decisions and load access.</p>
        <p style={s.p}>Under 49 CFR Part 387, every motor carrier must maintain minimum levels of financial responsibility. If an insurer non-renews or cancels coverage and the carrier cannot obtain replacement coverage, the carrier's operating authority is suspended. A Conditional rating that precipitates a coverage non-renewal does not produce a grace period. The authority suspension is effective when the insurance lapses.</p>
        <p style={s.p}>Carriers with a Conditional rating should contact their insurer proactively — before renewal — to understand the underwriter's position and timeline. Waiting for a non-renewal notice at 30 days leaves limited time to source replacement coverage.</p>

        <h2 style={s.h2}>Operating While Conditional — Documentation Standard</h2>
        <p style={s.p}>A carrier operating under a Conditional rating is subject to the same regulatory requirements as any other operating carrier — with heightened scrutiny. Roadside inspection rates and compliance review initiation rates are higher for Conditional carriers. The documentation standard does not change, but the frequency of review does.</p>
        <p style={s.p}>Carriers in this situation should operate as if every dispatch could produce a roadside inspection and every month could produce an off-site compliance review request. <Link to="/knowledge-center/fmcsa-roadside-inspection-checklist" style={s.link}>Cab document readiness</Link> and complete <Link to="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={s.link}>Driver Qualification Files</Link> are not procedural best practices in this context — they are the difference between a clean inspection and a citation that compounds an already-open compliance review.</p>

        <h2 style={s.h2}>What the REACH Diagnostic Shows Before an Audit</h2>
        <p style={s.p}>The LaunchPath REACH Diagnostic evaluates your compliance position across five domains before a compliance review occurs — giving you a structured view of where your operation is exposed before FMCSA makes its own determination. A GO result means your compliance posture supports moving forward with program installation. A WAIT result means there are documented gaps that should be addressed first. A NO-GO result means the current operation has exposure serious enough that proceeding without correction creates known, unmitigated risk.</p>
        <p style={s.p}>A Conditional rating tells you where the gaps were. The REACH Diagnostic tells you where they are now.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          A Conditional safety rating is a signal that the guard was incomplete. The LaunchPath Standard is built to install that guard before the audit opens — not to reconstruct it after.
        </p>

        <PrimaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
