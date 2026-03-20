import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const navy = "#0b1628";
const gold = "#d4900a";
const mono = "'Inter', sans-serif";

const SECTIONS = [
  {
    heading: "What the New Entrant Program Is",
    body: `The New Entrant Program is established under 49 CFR Part 385 Subpart D. It applies to every new motor carrier that receives interstate operating authority under 49 CFR Part 390.

The program has two components: continuous monitoring through FMCSA's Safety Measurement System (SMS) and a mandatory New Entrant Safety Audit conducted within 12 months of authority activation.

The program ends when FMCSA removes your "New Entrant" status — which happens after a satisfactory audit outcome and the completion of the monitoring period. If your audit results in a conditional or unsatisfactory rating, the program does not end on the standard timeline.`,
  },
  {
    heading: "The Safety Measurement System During the New Entrant Period",
    body: `The Safety Measurement System is FMCSA's data analysis tool for monitoring carrier safety performance. It aggregates data from roadside inspections, crash reports, and investigation findings to calculate carrier safety scores across seven Behavior Analysis and Safety Improvement Categories (BASICs): Unsafe Driving, Hours of Service Compliance, Driver Fitness, Controlled Substances/Alcohol, Vehicle Maintenance, Hazardous Materials Compliance (if applicable), and Crash Indicator.

New entrant carriers begin with no SMS data. As roadside inspections and any crash reports accumulate, your SMS profile builds. A pattern of violations in any BASIC category can trigger additional FMCSA attention before the scheduled audit.

During the New Entrant period, FMCSA monitors your SMS data for patterns that suggest safety fitness problems. If your data shows sufficient concern, FMCSA can accelerate the audit timeline — conducting it earlier than the 12-month standard. You will not receive extended notice.

This is why compliance systems cannot wait for the audit notice. If roadside inspections are generating violations in your first six months, your audit may arrive in month eight, not month twelve.`,
  },
  {
    heading: "The New Entrant Safety Audit — What and When",
    body: `FMCSA is required to conduct a New Entrant Safety Audit within 12 months of the date a carrier begins operations under their authority. Some carriers are audited in month three. Others are audited in month eleven. You do not choose the timing, and you typically receive 24 to 48 hours advance notice.

The audit reviews your compliance systems across six areas: driver qualification files (49 CFR Part 391), hours of service records (49 CFR Part 395), drug and alcohol testing program (49 CFR Part 382), vehicle inspection and maintenance records (49 CFR Part 396), accident register (49 CFR Part 390), and financial responsibility/insurance filings (49 CFR Part 387).

The investigator is not looking for perfect operations — they are looking for functioning systems. A carrier who has been operating for six months and has complete, organized records across these six areas will fare differently than a carrier who has been operating but has not maintained documentation.`,
  },
  {
    heading: "The Three Audit Outcomes",
    body: `Satisfactory. No critical violations found. Your new entrant status is removed and your authority continues without condition. This is the outcome that ends the formal New Entrant monitoring period.

Conditional. Violations found that do not rise to the level of imminent safety hazard but indicate deficient compliance systems. FMCSA issues a notice identifying the specific violations and a 45-day correction window. The carrier must submit documented corrections within that window. If corrections are accepted, status moves to satisfactory. If not, authority revocation proceedings begin.

Unsatisfactory. Critical violations found indicating an imminent safety hazard or a pattern of serious noncompliance. FMCSA may revoke authority following an unsatisfactory rating. Reinstatement requires a full compliance review and is not automatic.

The distinction between conditional and unsatisfactory is not always predictable from the outside. Carriers who receive unsatisfactory ratings are typically those with violations across multiple BASICs, evidence of willful noncompliance, or a history of prior enforcement action.`,
  },
  {
    heading: "What Happens After a Conditional Rating",
    body: `A conditional rating is not the end — but it requires immediate, focused action.

The 45-day correction window begins from the date of the notice, not the date you receive it. Days pass quickly when you are also running loads, managing cash flow, and addressing the operational issues the audit identified.

For each cited violation, you must document the corrective action taken, provide supporting records (updated files, new policies, signed acknowledgments as applicable), and submit through the FMCSA portal or directly to the assigned investigator per their instructions.

During the correction period, your conditional status is visible in FMCSA's SAFER system. Brokers who run carrier checks will see it. Some will stop tendering loads until the status resolves. Your insurance carrier may initiate a mid-term review.

You are managing a compliance correction, a potential revenue interruption, and an insurance review simultaneously. This is the operational reality of a conditional rating. It is recoverable — but the carriers who recover cleanly are the ones who respond immediately and completely, not the ones who wait to see if the rating resolves on its own.`,
  },
  {
    heading: "The 18-Month Maximum",
    body: `If FMCSA has not conducted a New Entrant Safety Audit within 18 months of your authority activation, they are required to do so. In practice, most audits occur before the 12-month mark. But if yours has not happened by month 12, do not assume you have cleared the requirement. The audit is coming — and arriving at month 16 or 17 with incomplete systems is the same problem as arriving at month 8 unprepared.

Use the full time available to build and maintain your compliance infrastructure. The audit window is not a deadline to prepare for — it is a period during which your systems should already be operational.`,
  },
  {
    heading: "The Four Pillars in the New Entrant Context",
    body: `The Four Pillars of Survival — Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen — map directly onto the New Entrant Program.

Authority Protection covers your FMCSA registration status, BOC-3 filing, and the audit outcome itself. Keeping your authority active throughout the New Entrant period requires that no foundational filing lapses.

Insurance Continuity is directly reviewed in the audit under the financial responsibility category. A lapsed BMC-91 filing found during an audit is a violation. Insurance status also affects your conditional rating's downstream consequences.

Compliance Backbone is the majority of what the audit reviews: driver qualification files, HOS records, drug and alcohol program, and maintenance records. This is where most conditional ratings are generated — not because carriers are unsafe operators, but because their documentation doesn't reflect their operations.

Cash-Flow Oxygen is not directly audited, but it determines whether you can sustain operations through the correction period if a conditional rating arrives. A carrier without 90-day reserves who faces a revenue interruption during a 45-day correction window is in a two-front problem.

All four pillars must be maintained simultaneously throughout the New Entrant period — not sequentially, not when convenient.`,
  },
  {
    heading: "What You Can Do Before the Audit Arrives",
    body: `Three actions before the audit notice arrives.

Verify your compliance documentation is complete. Every DQF element for every driver. Drug and alcohol program documentation. HOS records for the required retention period. Pre-trip and post-trip inspection records. Annual vehicle inspection records. Accident register — even if there are no accidents to record, the register itself must exist.

Verify your foundational filings. Check your BOC-3 status and insurance filing status in SAFER. Confirm both are active. Confirm your MCS-150 is current.

Run an internal audit before FMCSA does. Review your own records against the six audit categories. Identify gaps. Fill them. If you find a deficiency, you have time to correct it. Once the investigator arrives, the window is closed.`,
  },
];

export default function NewEntrantProgramPost() {
  useSEO({
    title: "The FMCSA New Entrant Program: A Plain-Language Guide to Your First 12 Months | LaunchPath",
    description: "Every new motor carrier enters the FMCSA New Entrant Program the day authority activates. Here's what the monitoring period covers, what the mandatory audit reviews, and what each possible outcome means for your operation.",
  });

  return (
    <div style={{ background: "#f7f4ee", minHeight: "100vh" }}>
      <Navbar />

      {/* Article Hero */}
      <div style={{
        background: "#080f1e",
        borderBottom: `3px solid ${gold}`,
        padding: "5rem 1.5rem 4rem",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>
              ← Operational Library
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>New Entrant Program</span>
          </div>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-08 · NEW ENTRANT PROGRAM · FOUNDATIONAL ANCHOR
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "var(--text-2xl)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            The FMCSA New Entrant Program: A Plain-Language Guide to Your First 12 Months
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            When a new motor carrier receives operating authority from FMCSA, they enter a structured monitoring period called the New Entrant Program. This program runs for a minimum of 12 months and includes a mandatory safety audit. How a carrier performs during this window determines whether their authority continues without condition or whether they face corrective requirements, conditional ratings, or revocation.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginTop: "1rem" }}>
            Most new carriers know the audit exists. Few understand how the monitoring period works, what FMCSA is watching throughout, and what the full consequences of each possible outcome are. This guide covers the complete picture.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "FMCSA new entrant program"],
              ["CFR References", "49 CFR Part 385 Subpart D"],
              ["Reading Time", "~11 min"],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.2rem" }}>{label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.60)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {SECTIONS.map((section, i) => (
          <div key={i} style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "var(--text-xl)", color: "#0b1628",
              letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1.25rem",
              paddingBottom: "0.6rem", borderBottom: "1px solid rgba(212,144,10,0.15)",
            }}>
              {section.heading}
            </h2>
            {section.body.split("\n\n").map((para, j) => (
              <p key={j} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "var(--text-base)",
                color: "rgba(0,26,51,0.82)", lineHeight: 1.85, marginBottom: "1.1rem",
              }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        {/* Related Resources */}
        <div style={{
          background: "#080f1e", border: `1px solid rgba(212,144,10,0.20)`,
          borderTop: `3px solid ${gold}`, padding: "2rem", marginBottom: "3rem",
        }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem" }}>
            Related Resources
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LP-BRF-01 — New Entrant Safety Audit Brief", desc: "Detailed documentation requirements by audit category — the full regulatory framework for the six-area review.", href: "/knowledge-center/new-entrant-safety-audit-brief" },
              { label: "LP-BRF-05 — Insurance Continuity Brief", desc: "BMC-91 filing mechanics and lapse prevention — the financial responsibility category the audit reviews.", href: "/knowledge-center/insurance-continuity-brief" },
              { label: "LP-BRF-03 — Drug & Alcohol Program Brief", desc: "Part 382 program requirements for new carriers, including Clearinghouse registration and pre-employment query obligations.", href: "/knowledge-center/drug-alcohol-program-brief" },
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
        <div style={{ textAlign: "center", padding: "3rem 2rem", background: "#060d19", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>
            LPOS V1.0 — GROUND 0 ENTRY
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "#FFFFFF", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            If you're a new carrier in your first 90 days, Ground 0 is free.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 460, margin: "0 auto 1.75rem" }}>
            Ground 0 covers the Four Pillars framework and how they apply throughout the New Entrant period — before the audit notice arrives and while there's still time to build.
          </p>
          <Link
            to="/auto-diagnostic"
            data-testid="article-reach-cta"
            style={{
              display: "inline-block", background: gold, color: "#060d19",
              fontFamily: mono, fontWeight: 700, fontSize: "0.714rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "1rem 2.25rem", textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = gold}
          >
            RUN THE REACH ASSESSMENT →
          </Link>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(0,26,51,0.45)", lineHeight: 1.7, marginTop: "2.5rem", fontStyle: "italic" }}>
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal or compliance advice. Verify all regulatory requirements with FMCSA directly at fmcsa.dot.gov.
        </p>
        <p style={{ fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(0,26,51,0.35)", marginTop: "0.5rem" }}>
          LaunchPath Transportation EDU · Accuracy Over Hype. Systems Over Shortcuts.
        </p>
      </div>

      <BriefBundleCTA />
      <FooterSection />
    </div>
  );
}
