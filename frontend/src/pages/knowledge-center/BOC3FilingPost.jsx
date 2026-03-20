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
    heading: "What the BOC-3 Is",
    body: `The BOC-3 is a filing that designates a process agent in each state where a carrier operates. Under 49 CFR Part 366, motor carriers that operate as for-hire in interstate commerce are required to designate process agents in every state they operate in or through.

A process agent is a person or entity authorized to receive legal process — subpoenas, court orders, regulatory notices — on behalf of the carrier in that state. FMCSA requires this designation so that a carrier cannot avoid legal process simply by operating out of a different state.

Most carriers do not hire individual agents in each state. Instead, they use a blanket BOC-3 provider — a company that files the BOC-3 on the carrier's behalf and serves as process agent across all states simultaneously. These services typically cost $20 to $75 as a one-time fee, though some providers charge annual maintenance fees.`,
  },
  {
    heading: "Why It's Required Before Authority Is Granted",
    body: `FMCSA will not grant operating authority until a BOC-3 is on file. This is one of three filings required for authority activation — along with the MCS-150 (carrier registration) and the BMC-91 (proof of insurance). Authority goes active only when all three are recorded in FMCSA's system.

For new carriers working through the authority application process, the BOC-3 is typically the fastest filing to complete. A blanket BOC-3 provider can file electronically within 24 to 48 hours, and the filing appears in FMCSA's system shortly after.

The mistake some carriers make is assuming that because the BOC-3 was filed at startup, it requires no further attention. That assumption is incorrect.`,
  },
  {
    heading: "What Happens When a BOC-3 Lapses",
    body: `A BOC-3 filing can lapse in several ways.

The process agent withdraws or goes out of business. If your blanket BOC-3 provider closes, merges, or is otherwise unable to continue serving as your agent, the filing may be withdrawn from FMCSA's system. The carrier is not automatically notified.

The carrier stops paying annual maintenance fees. Some BOC-3 providers charge annual fees to maintain the filing. If those fees are not paid, the provider may withdraw the filing.

The filing was never completed correctly. In some cases, carriers believe their BOC-3 is on file when it isn't — because the filing was initiated but not completed, or because it was filed for a different DOT number or entity name.

When a BOC-3 is not on file or has been withdrawn, FMCSA records the carrier's authority as deficient. This can result in authority suspension independent of insurance status. A carrier can have active insurance and still have their authority suspended for a missing BOC-3 filing.`,
  },
  {
    heading: "How to Verify Your BOC-3 Status",
    body: `Go to safer.fmcsa.dot.gov and search your USDOT number or company name. On your carrier profile page, look for the "Licensing and Insurance" section. This section shows your active filings, including BOC-3 status.

If your BOC-3 shows as active with a listed provider, your filing is current. Note the provider name — you will want to maintain contact information for them in case of questions.

If your BOC-3 shows as inactive, revoked, or missing, you need to file a new one before FMCSA will treat your authority as fully active. Contact a registered BOC-3 blanket provider and initiate a new filing. Provide your USDOT number, MC number, and legal entity name exactly as registered with FMCSA.

Verify your BOC-3 status quarterly — the same interval recommended for insurance filing verification. It takes less than five minutes and confirms one of the three foundational filings that keep your authority active.`,
  },
  {
    heading: "Common Errors at Application",
    body: `Using an unregistered provider. Not every company that offers BOC-3 services is authorized to file with FMCSA. Verify that any provider you use is registered as a process agent in FMCSA's system. If their filing does not appear in SAFER, it has no effect.

Filing under the wrong entity. If your legal entity name changed after the original BOC-3 was filed — because you restructured your business, changed your LLC name, or obtained a new MC number — the original filing may not cover your current authority. Confirm that your BOC-3 is filed under your current legal name and current USDOT/MC numbers.

Assuming the MC application includes the BOC-3. Applying for MC authority through FMCSA's Unified Registration System does not automatically generate a BOC-3 filing. The BOC-3 is a separate filing you must initiate with a process agent.`,
  },
  {
    heading: "The BOC-3 in Context",
    body: `The BOC-3 is not the most complex regulatory requirement new carriers face. But it sits alongside insurance and carrier registration as one of the three foundational filings that determine whether your authority is active.

Brokers who verify carrier authority before tendering loads run checks that include BOC-3 status. Insurance underwriters at renewal may verify that your foundational filings are intact. FMCSA investigators during the New Entrant Safety Audit will confirm that required filings are in order.

A lapsed BOC-3 discovered during any of these reviews creates a problem that could have been avoided with quarterly verification. There is no regulatory complexity involved — only the discipline to check a filing that most carriers set up once and never look at again.`,
  },
];

export default function BOC3FilingPost() {
  useSEO({
    title: "The BOC-3 Filing: What It Is, What Happens If It Lapses, and How to Verify Yours | LaunchPath",
    description: "The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice. Here's what it is and how to verify yours.",
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
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Authority Registration</span>
          </div>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-02 · AUTHORITY REGISTRATION · AUTHORITY PROTECTION
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "var(--text-2xl)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            The BOC-3 Filing: What It Is, What Happens If It Lapses, and How to Verify Yours
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            The BOC-3 is one of the smaller administrative requirements in the FMCSA registration process — and one of the more consequential ones if it lapses or was never properly filed. Carriers who assume their MC number covers all federal registration requirements frequently discover a BOC-3 problem at the worst possible time: during a compliance review, an insurance audit, or a broker check.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginTop: "1rem" }}>
            This article covers what the BOC-3 is, why it's required, what happens when it's missing or lapsed, and how to verify your current status.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "BOC-3 filing motor carrier"],
              ["CFR References", "49 CFR Part 366"],
              ["Reading Time", "~7 min"],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.2rem" }}>{label}</p>
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
              { label: "LP-BRF-01 — New Entrant Safety Audit Brief", desc: "What investigators review during the 12-month audit — including verification of your BOC-3 and other foundational filings.", href: "/knowledge-center/new-entrant-safety-audit-brief" },
              { label: "LP-BRF-06 — Authority Registrations Brief", desc: "UCR, BOC-3, and MCS-150 — the three federal registrations that must all be active before your first dispatch.", href: "/knowledge-center/authority-registrations-brief" },
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
            Ground 0 covers the full registration stack — BOC-3, UCR, MCS-150, and insurance — and ends with a GO/WAIT/NO-GO decision framework before your first dispatch.
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
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal or compliance advice. Verify all filing requirements with FMCSA at fmcsa.dot.gov and review your SAFER profile at safer.fmcsa.dot.gov.
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
