import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import { PrimaryCtaBlock, SecondaryCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";

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
  ratingBlock: { borderLeft: "3px solid rgba(212,144,10,0.3)", paddingLeft: "1.25rem", marginBottom: "1.5rem" },
};

export const FAQ = [
  { q: "What is an FMCSA safety rating?", a: "An FMCSA safety rating is a formal assessment of a motor carrier's compliance with federal safety regulations. FMCSA assigns one of three ratings: Satisfactory, Conditional, or Unsatisfactory. The rating is based on the findings of a safety audit or compliance review — not on accident history alone." },
  { q: "How does FMCSA assign a safety rating to a new carrier?", a: "For new entrant carriers, FMCSA assigns a safety rating primarily through the new entrant safety audit, which occurs within 12 months of authority grant. If the audit finds no deficiencies, no formal rating is typically assigned. If deficiencies are found, the carrier receives a Conditional or Unsatisfactory rating depending on the severity and pattern of findings." },
  { q: "What happens if I get a Conditional safety rating?", a: "A Conditional rating means FMCSA found deficiencies in at least one critical factor during the audit. You have 45 days to submit a Corrective Action Plan documenting what was missing, why, and what corrective action has been taken. The rating is visible in FMCSA's public SAFER system, which some brokers and shippers use to screen carriers." },
  { q: "Can a Conditional rating be changed to Satisfactory?", a: "Yes. After submitting a Corrective Action Plan and having it accepted by FMCSA, you can request an upgrade from Conditional to Satisfactory. FMCSA may conduct a follow-up review to verify that corrections are in place before the rating is changed." },
  { q: "Does a Conditional rating affect my ability to haul freight?", a: "It can. Some brokers and shippers screen carrier safety ratings through FMCSA's SAFER system and may decline to work with carriers showing Conditional or Unsatisfactory ratings. Insurance carriers may also respond to a Conditional rating with premium increases or coverage restrictions depending on the severity and nature of the deficiencies found." },
];

export default function FMCSASafetyRatingPost() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Safety Ratings</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>49 CFR Part 385 · Safety Ratings</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            What Your FMCSA Safety Rating Means and How It Gets Assigned
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            FMCSA maintains a safety rating for every motor carrier operating in interstate commerce. The rating reflects what federal auditors found — or what your safety data shows in the Compliance, Safety, Accountability system. There are three ratings. The distance between them is not arbitrary.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            Most new carriers do not understand what a safety rating is, how it gets assigned, or what it means operationally until they receive one they did not expect. This page covers all three ratings, how each is triggered, and what the consequence looks like from the day it is assigned. If you are starting a carrier, see also: <Link to="/knowledge-center/how-to-start-a-trucking-company" style={s.link}>How to Start a Trucking Company</Link>.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Part 385"], ["Reading Time", "~8 min"], ["Cluster", "LP-WEB-001 Page 3"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>The Three Safety Ratings</h2>
        <p style={s.p}>FMCSA uses three safety ratings. Each rating reflects a different finding about the carrier's safety management controls — not the carrier's driving record, not the carrier's accident count, not the carrier's intentions.</p>

        <div style={s.ratingBlock}>
          <h3 style={{ ...s.h3, marginTop: 0 }}>Satisfactory</h3>
          <p style={s.p}>The carrier's safety management controls are adequate. No critical deficiencies were found. This is the expected outcome when a carrier has built and maintained the six compliance systems FMCSA reviews. A Satisfactory rating does not mean permanent compliance — it means no deficiencies were found at the time of the review.</p>
        </div>

        <div style={s.ratingBlock}>
          <h3 style={{ ...s.h3, marginTop: 0 }}>Conditional</h3>
          <p style={s.p}>At least one safety management control is deficient. The carrier has 45 days to submit a Corrective Action Plan. The rating is immediately visible in FMCSA's public SAFER system. A Conditional rating is recoverable — but recovery requires documented corrective action, not assurances.</p>
        </div>

        <div style={s.ratingBlock}>
          <h3 style={{ ...s.h3, marginTop: 0 }}>Unsatisfactory</h3>
          <p style={s.p}>The carrier's safety management controls are inadequate. FMCSA initiates proceedings to revoke operating authority. The carrier receives a 60-day notice. Operating authority can be preserved only by demonstrating compliance sufficient to support a rating upgrade before the revocation date.</p>
        </div>

        <p style={s.p}>A carrier with no audit on record does not have a Satisfactory rating — it has no rating. A rating must be formally assigned by FMCSA. It is not a default status.</p>

        <h2 style={s.h2}>How FMCSA Assigns a Safety Rating</h2>
        <p style={s.p}>Safety ratings are assigned through formal audits and compliance reviews. The primary mechanisms are:</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {[
            "New entrant safety audit — mandatory for all new carriers within 12 months of authority grant. The primary rating event for new carriers.",
            "Compliance review — triggered by an accumulation of roadside inspection violations, a serious accident, or a complaint. Can occur at any time during a carrier's operating history.",
            "Focused investigation — targets a specific compliance area (e.g., driver qualification or drug and alcohol) based on data signals.",
          ].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>
        <p style={s.p}>Ratings are also influenced by Safety Measurement System (SMS) data — the running score of roadside inspections and violations accumulated through the Compliance, Safety, Accountability (CSA) program. High BASIC scores can trigger a compliance review independent of any scheduled audit.</p>
        <p style={s.p}>The safety rating is published in FMCSA's SAFER system and is publicly accessible to anyone who searches the carrier's DOT number.</p>

        <h2 style={s.h2}>What Triggers a New Entrant Rating</h2>
        <p style={s.p}>Every new interstate motor carrier receives a <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>new entrant safety audit</Link> within 12 months of authority grant. FMCSA contacts the carrier to schedule the audit; the audit can be conducted on-site at the carrier's principal place of business or remotely.</p>
        <p style={s.p}>If the audit finds no deficiencies: typically no formal rating is issued. The carrier continues operating through the new entrant period.</p>
        <p style={s.p}>If deficiencies are found: the carrier receives a Conditional or Unsatisfactory rating, depending on whether the deficiencies involve critical factors and whether they reflect a pattern across multiple documents or drivers.</p>
        <p style={s.p}>The audit is not optional. Carriers who do not respond to scheduling contact are found non-cooperative — which constitutes a compliance failure and is treated accordingly.</p>

        <h2 style={s.h2}>What a Satisfactory Rating Means</h2>
        <p style={s.p}>A Satisfactory rating means FMCSA found no critical deficiencies at the time of review. It does not mean the carrier is permanently compliant. It does not prevent future audits. It does not insulate the carrier from compliance reviews triggered by roadside inspection data or accident investigations.</p>
        <p style={s.p}>FMCSA continues to monitor carriers through roadside inspections after a Satisfactory rating is issued. Accumulated BASIC scores can trigger a compliance review independently of the audit cycle.</p>

        <h2 style={s.h2}>What a Conditional Rating Means Right Now</h2>
        <p style={s.p}>A Conditional rating means FMCSA found at least one critical factor where the safety management controls are deficient. From the date of the audit, the consequences begin immediately.</p>
        <p style={s.p}>The 45-day CAP window opens. Submit a <Link to="/knowledge-center/corrective-action-plan-fmcsa" style={s.link}>Corrective Action Plan</Link> documenting each deficiency, its root cause, the corrective action taken, and the controls implemented to prevent recurrence. Miss the window and the outcome escalates automatically to Unsatisfactory.</p>
        <p style={s.p}>The rating is publicly visible in SAFER from day one. Brokers and shippers who screen carrier safety ratings may decline to work with Conditional carriers. Some freight contracts require Satisfactory ratings. Insurance carriers may respond with premium increases or coverage restrictions.</p>
        <p style={s.p}>If your rating is already Conditional, the <Link to="/bundle" style={s.link}>Document System Bundle</Link> includes the policy and recordkeeping templates most commonly required in a Corrective Action Plan.</p>

        <h2 style={s.h2}>What an Unsatisfactory Rating Means</h2>
        <p style={s.p}>FMCSA has found the carrier's safety management controls inadequate. This is not a CAP situation — it is an authority revocation situation. FMCSA initiates proceedings to revoke operating authority and issues a 60-day notice.</p>
        <p style={s.p}>The carrier can avoid revocation only by demonstrating compliance before the revocation date. This requires more than a CAP submission — FMCSA typically requires a formal compliance review to verify corrections are in place before upgrading an Unsatisfactory rating.</p>
        <p style={s.p}>An Unsatisfactory rating is visible in SAFER immediately. The freight, insurance, and operational consequences of an Unsatisfactory rating are immediate and compounding.</p>

        <h2 style={s.h2}>How Ratings Change Over Time</h2>
        <p style={s.p}>For a Conditional rating: submit a CAP → FMCSA reviews → accepts or requests additional documentation → rating may be upgraded to Satisfactory after corrections are verified.</p>
        <p style={s.p}>For an Unsatisfactory rating: a full compliance review is typically required before FMCSA will upgrade the rating. The carrier must demonstrate that all deficiencies have been corrected and systemic controls are in place.</p>
        <p style={s.p}>Ratings can also decline. A carrier with a Satisfactory rating can receive a Conditional or Unsatisfactory following a subsequent compliance review or based on accumulated roadside violation data. The rating reflects the current compliance picture — not a permanent certification.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          FMCSA safety rating outcomes and their consequence patterns are addressed in the LaunchPath Standard's compliance backbone module — which covers what the audit measures and what corrective action is expected of carriers who receive a Conditional finding.
        </p>

        <PrimaryCtaBlock />
        <SecondaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
