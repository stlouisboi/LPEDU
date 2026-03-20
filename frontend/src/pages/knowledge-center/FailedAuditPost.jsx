import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const navy = "#0D1B30";
const gold = "#d4900a";
const mono = "'Inter', sans-serif";

const SECTIONS = [
  {
    heading: "What the New Entrant Audit Is and When It Happens",
    body: `Under 49 CFR Part 385, Subpart D, FMCSA is required to conduct a safety audit of every new motor carrier within 12 months of the carrier's first interstate operation. This is not discretionary. It is a statutory requirement built into the New Entrant Program, and every carrier that activates authority enters the monitoring window automatically.

The audit is not announced far in advance. FMCSA investigators contact carriers with relatively short notice, typically requesting records within 48 to 72 hours of notification. Carriers who don't have systems already in place — organized, retrievable, documented — are not preparing for an audit at that point. They are attempting reconstruction on a deadline.

What investigators actually review falls across six compliance categories: controlled substances and alcohol testing, driver qualifications, hours of service, vehicle maintenance, hazardous materials (if applicable), and financial responsibility. The audit is not a spot check of one area. It is a cross-sectional review of whether the carrier has functional operating systems installed — not whether paperwork exists somewhere.

The distinction matters. A carrier can have most of the correct documents without having a functional system, and investigators are trained to read the difference.`,
  },
  {
    heading: "What \"Failure\" Actually Means — It Is Not a Binary",
    body: `The language around failing an FMCSA audit is imprecise in the industry, and that imprecision costs carriers money. The audit does not result in a pass or fail. It results in one of three safety ratings: Satisfactory, Conditional, or Unsatisfactory.

A Satisfactory rating means the carrier demonstrated adequate compliance systems across the reviewed categories. The monitoring window continues, but no corrective action is required.

A Conditional rating means the carrier has critical or acute violations — deficiencies in one or more areas significant enough to indicate that safety management controls are not adequate. The carrier is not shut down immediately. But the rating is recorded on SAFER, visible to brokers, and it triggers a 45-day correction window. Failure to respond adequately within that window escalates the situation.

An Unsatisfactory rating means the carrier's violations are severe enough that FMCSA has determined it is not fit to operate. Operating authority is subject to revocation. This outcome is relatively rare on first audit, but it is not theoretical — it happens to carriers who activated authority without any compliance infrastructure in place.

The critical point: a Conditional rating is the most common adverse outcome, and it is not the end of operations. It is the beginning of a response process. How that process goes depends almost entirely on whether the carrier has systems to show, or only paper to produce.`,
  },
  {
    heading: "The Cascade: What Happens After a Conditional Rating",
    body: `A Conditional safety rating from a New Entrant audit does not stay contained to the audit itself. It triggers a cascade across the carrier's operating relationships that most new carriers don't anticipate.

Insurance consequences come first. Most commercial trucking policies have a clause requiring the insured carrier to notify the insurer of any change in safety rating. When a carrier receives a Conditional rating, insurers treat this as a material change in risk profile. The response varies: some insurers require an immediate audit of the carrier's operations, some impose mid-term surcharges, and some initiate non-renewal at the policy term. For a carrier already managing tight cash flow in year one, a premium increase tied to a Conditional rating is not an abstract risk — it is a direct threat to operations.

Broker relationships are affected immediately. FMCSA SAFER is publicly accessible, and brokers check carrier safety ratings before tendering loads. A Conditional rating does not legally prohibit a broker from using a carrier, but in practice, many brokerage compliance departments will remove Conditional-rated carriers from their approved carrier lists until the rating is resolved. For a carrier that depends on broker freight, this can reduce load availability during the exact window when they need revenue most.

Cash-flow pressure intensifies compliance failure. The combination of reduced load volume and potential insurance cost increases creates financial pressure. That pressure is where compliance decisions collapse. Carriers who cannot afford a TPA drug testing service cancel their programs. Carriers running lean skip pre-trip documentation. These shortcuts generate the next set of violations that compound the original rating — and create grounds for an Unsatisfactory outcome on the follow-up review.`,
  },
  {
    heading: "The 45-Day Correction Window",
    body: `When a carrier receives a Conditional rating, FMCSA provides a 45-day window to submit documentation demonstrating that the deficiencies have been corrected. This is not a negotiation. It is a formal compliance response process, and what you submit determines what happens next.

The carrier must provide written evidence of corrective action for each cited violation. Documentation of corrected violations is not a letter explaining what you plan to do — it is proof of what you have already done. FMCSA reviewers distinguish between carriers who have installed corrected systems and carriers who have written policies describing systems that don't exist in practice.

Common corrective action submissions include updated driver qualification files with missing elements completed, drug and alcohol program enrollment documentation, vehicle inspection records, and revised operational procedures. Each submission must correspond directly to the cited violation, and the documentation must be organized well enough that a reviewer can match it to the deficiency without ambiguity.

Carriers who have underlying systems — even partially built ones — can respond effectively to a Conditional rating within the 45-day window. Carriers who were operating without any compliance infrastructure are attempting to build and document entire systems in 45 days while continuing to operate. Some manage it. Many do not.`,
  },
  {
    heading: "What Carriers Who Recover Do Differently",
    body: `Carriers who receive a Conditional rating and successfully upgrade to Satisfactory share a pattern that distinguishes them from carriers who spiral into Unsatisfactory or revocation.

They respond to the rating as a documentation problem, not a compliance crisis. The systems, in most cases, exist — they are just not organized in a way that is immediately demonstrable. A carrier with a functioning drug testing program through a licensed TPA, driver files that contain the required elements, and maintenance records that document inspection and repair activity can typically demonstrate corrective action for most Conditional deficiencies without fundamentally changing how they operate. The correction is organizational, not operational.

They act within the first week, not the last week. The 45-day window creates a false sense of margin. Carriers who wait until day 30 to begin assembling their response are operating without buffer. Insurance conversations, if needed, take time. Document retrieval from third-party programs takes time. Building organized submission packages takes time. Carriers who begin on day one have the time to do it correctly.

They treat the correction as a system audit, not a checklist exercise. The best responses to Conditional ratings don't just address the cited violations — they document the full operating structure that should have been visible in the first audit. When a reviewer sees a complete driver file system, a functioning drug program with current records, and organized vehicle inspection documentation, the message is that a functioning carrier exists. A response that addresses only the cited deficiencies while leaving surrounding gaps visible does not create the same impression.`,
  },
  {
    heading: "What This Means Before the Audit Arrives",
    body: `The New Entrant Safety Audit is not a test you prepare for when you receive the notice. It is a test you either pass or fail based on how you operated from day one of authority activation.

Investigators review records that already exist. They are not asking what your systems look like today — they are reviewing what your systems produced during the months since your authority activated. If your driver files were incomplete in month three, those files are still incomplete when the audit arrives in month eight. If you never enrolled in a drug testing program, there are no pre-employment test records to show. If your DVIRs are missing, they cannot be created retroactively.

The carriers who pass New Entrant audits without incident are not necessarily the carriers who prepared the most in the days before the audit. They are the carriers who installed compliance systems before their first dispatch and maintained them consistently through the monitoring window.

This is the core operational principle behind the LaunchPath Four Pillars framework: authority protection, insurance continuity, compliance backbone, and cash-flow oxygen are not audit preparation categories. They are operating system categories that produce the documentation an audit reviews as a byproduct of normal operations.

If you are a new carrier in your first 90 days, you are in the installation window. The audit window opens before the installation window closes. That overlap is where the risk lives — and where it can be closed.`,
  },
];

export default function FailedAuditPost() {
  useSEO({
    title: "What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath",
    description: "A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming. Here's what actually happens — and how carriers recover.",
  });

  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Article Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Operational Library</Link>
            <span style={{ color: "rgba(13,27,48,0.20)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.40)" }}>New Entrant Program</span>
          </div>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-01 · NEW ENTRANT PROGRAM · AUTHORITY PROTECTION
          </p>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            What Actually Happens When You Fail an FMCSA New Entrant Audit
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            The FMCSA New Entrant Safety Audit does not result in a pass or fail. It results in a rating — and the rating you receive determines what happens to your insurance, your broker relationships, and your ability to keep running. Most carriers who receive a Conditional rating don't understand the cascade until they're already inside it.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "Failed FMCSA New Entrant Audit"],
              ["CFR References", "49 CFR Part 385 Subpart D"],
              ["Reading Time", "~9 min"],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.2rem" }}>{label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(13,27,48,0.70)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {SECTIONS.map((section, i) => (
          <div key={i} style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "var(--text-xl)", color: "#0b1628", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1.25rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(212,144,10,0.15)" }}>
              {section.heading}
            </h2>
            {section.body.split("\n\n").map((para, j) => (
              <p key={j} style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-base)", color: "rgba(0,26,51,0.82)", lineHeight: 1.85, marginBottom: "1.1rem" }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        {/* Related Resources */}
        <div style={{ background: "var(--bg-2)", border: `1px solid rgba(212,144,10,0.20)`, borderTop: `3px solid ${gold}`, padding: "2rem", marginBottom: "3rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem" }}>Related Resources</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LP-BRF-01 — New Entrant Safety Audit Brief", desc: "The six audit categories, automatic-failure conditions, and the one-binder audit prep checklist.", href: "/knowledge-center/new-entrant-safety-audit-brief" },
              { label: "LP-BRF-05 — Insurance Continuity Brief", desc: "How a Conditional rating affects your policy at renewal — and what you can do before the notice arrives.", href: "/knowledge-center/insurance-continuity-brief" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 3, minHeight: 40, background: gold, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <Link to={item.href} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, textDecoration: "none" }}>{item.label}</Link>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(0,26,51,0.60)", marginTop: "0.2rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ground 0 CTA */}
        <div style={{ textAlign: "center", padding: "3rem 2rem", background: "var(--bg-2)", border: "1px solid rgba(13,27,48,0.07)" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>LPOS V1.0 — GROUND 0 ENTRY</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            If you're a new carrier in your first 90 days, Ground 0 is free.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(13,27,48,0.65)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 460, margin: "0 auto 1.75rem" }}>
            It covers what the audit looks for — including the Four Pillars that keep a carrier operating — before you're in the audit window.
          </p>
          <Link to="/auto-diagnostic" data-testid="article-reach-cta"
            style={{ display: "inline-block", background: gold, color: "#060d19", fontFamily: mono, fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem 2.25rem", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = gold}
          >RUN THE REACH ASSESSMENT →</Link>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(0,26,51,0.45)", lineHeight: 1.7, marginTop: "2.5rem", fontStyle: "italic" }}>
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal or compliance advice. Verify all regulatory requirements with FMCSA at fmcsa.dot.gov.
        </p>
        <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(0,26,51,0.35)", marginTop: "0.5rem" }}>
          LaunchPath Transportation EDU · Accuracy Over Hype. Systems Over Shortcuts.
        </p>
      </div>

      <BriefBundleCTA />
      <FooterSection />
    </div>
  );
}
