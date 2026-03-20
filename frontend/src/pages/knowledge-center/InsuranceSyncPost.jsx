import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const navy = "#0b1628";
const gold = "#d4900a";
const mono = "'JetBrains Mono', monospace";

const SECTIONS = [
  {
    heading: "How the Insurance Filing Works",
    body: `Operating authority under the FMCSA requires more than obtaining an MC number. It requires that your insurance carrier file proof of coverage directly with FMCSA — and that filing must remain continuously active.

The forms involved are the BMC-91 (for primary liability) and the BMC-91X (for cargo insurance). These are filed by your insurance company, not by you. When your insurer files the BMC-91, FMCSA records your coverage as active. When your insurer cancels or withdraws the filing, FMCSA records it as inactive — and your authority suspends.

The coverage minimums are set by 49 CFR Part 387. For general freight carriers operating vehicles 10,001 pounds GVWR and above, the minimum public liability coverage is $750,000. For carriers transporting household goods, the minimum is $1,000,000. Most brokers require $1,000,000 regardless of regulatory minimum, and many require additional cargo coverage above the regulatory floor.

These minimums are the floor. Falling below them, or allowing the filing to lapse for any reason, triggers suspension.`,
  },
  {
    heading: "The Lapse Trigger",
    body: `The most important thing a new carrier needs to understand about insurance continuity is this: FMCSA does not give you time to fix a lapse. The suspension is automatic.

When your insurer files a cancellation notice with FMCSA, the system records the cancellation date and suspends your operating authority on that date. There is no grace period built into the regulatory structure. There is no phone call from FMCSA warning you it's coming.

Common reasons a BMC-91 filing lapses:

Missed premium payment. If a premium installment is missed, the insurer can initiate cancellation per the terms of the policy. The cancellation notice goes to FMCSA. Your authority suspends. You may not know it has happened until a broker runs your authority status and comes back with a problem.

Policy non-renewal. Insurers may decline to renew a policy at the end of the term due to claims history, changes in your fleet, or underwriting decisions. If you don't have replacement coverage bound and filed before the expiration date, your authority lapses.

Coverage gap during fleet changes. Adding a vehicle, removing a vehicle, or changing your operational profile can create a coverage gap if the insurer's filing isn't updated to reflect the current state of the operation.

Underwriting review findings. In some cases, an insurer will initiate a mid-term review after a claim or inspection event and elect to cancel coverage. This is less common but has the same result.`,
  },
  {
    heading: "The Timing Problem for New Carriers",
    body: `New carriers face a specific timing challenge that established carriers do not.

When you apply for MC authority, FMCSA's SAFER system records you as a "New Entrant." You have 90 days from authority activation to obtain and file proof of insurance before your authority is revoked. Most carriers move quickly to secure insurance — but not all of them understand that the BMC-91 must be filed and reflected in FMCSA's system before the first dispatch.

A carrier who has purchased a policy but whose insurer has not yet completed the BMC-91 filing is not legally authorized to operate, regardless of what the policy documents say. The filing in FMCSA's system is the operative record, not the policy itself.

To verify your current filing status: go to FMCSA's SAFER system (safer.fmcsa.dot.gov), search your DOT number, and confirm that your insurance filing shows as "active." Do not rely on your insurer's confirmation alone. Verify it in the system.`,
  },
  {
    heading: "Three Operational Decisions That Create Insurance Risk",
    body: `New carriers most commonly damage their insurance standing through operational decisions that contradict their application profile. Underwriters review these patterns at renewal, and they matter.

Operating outside your declared radius. When you apply for coverage, you declare an operational radius — local, regional, or OTR. Your premium is calculated on that declaration. If you dispatch loads that consistently fall outside that radius, your insurer has grounds to dispute coverage on claims that arise from those runs, and to non-renew your policy at term. Insurers review ELD records, IFTA filings, and broker load histories during audits. Consistent operation outside your declared radius is treated as a material misrepresentation on the application.

Dispatching a driver before completing the pre-employment Clearinghouse query. Under 49 CFR Part 382, a carrier must query the FMCSA Drug and Alcohol Clearinghouse before allowing a driver to operate a commercial motor vehicle. This is not optional and it is not timing-flexible. If a carrier dispatches a driver without completing this query and that driver is involved in an incident, the carrier's failure to comply with Part 382 creates a coverage dispute. The insurer's position is that the carrier did not follow the regulatory requirements that the policy assumes. This is one of the most direct paths to a denied claim.

No documented annual MVR review process. Under 49 CFR Part 391.25, carriers are required to obtain and review a Motor Vehicle Record for each driver at least once every 12 months. If you have drivers and no system for pulling and documenting annual MVRs, you are out of compliance with Part 391.25 — and if you have a claim involving a driver whose record you haven't reviewed, you have compounded the liability. Insurers at renewal ask about your driver monitoring systems. A documented process for annual MVR review is required. "I check when something comes up" is not a system.`,
  },
  {
    heading: "What Insurance Continuity Actually Requires",
    body: `Maintaining insurance continuity is not complicated. It requires consistent attention to three things.

First: know your policy renewal date and act before it. The worst time to discover you cannot find replacement coverage is the week before your policy expires. Give yourself 60 days before renewal to confirm your current insurer is renewing and at what terms. If there's any uncertainty, begin the replacement process immediately.

Second: verify your BMC-91 status quarterly in FMCSA's SAFER system. Your insurer can file changes that affect your coverage without a phone call to you. Quarterly verification costs nothing and catches problems before they become suspensions.

Third: maintain compliance with the operational requirements your policy assumes. Clearinghouse queries before first dispatch. Annual MVR reviews for all drivers. Operations within your declared radius unless your coverage has been updated to reflect changes. These are not insurance practices — they are regulatory requirements that your policy is built on. Letting either lapse creates risk on both fronts simultaneously.`,
  },
  {
    heading: "The Authority Reinstatement Process",
    body: `If your authority does suspend due to an insurance lapse, reinstatement requires a new BMC-91 filing from a licensed insurer and verification through FMCSA's system that the filing is active. The suspension itself typically resolves within one to three business days of the new filing being processed.

What doesn't recover automatically is your standing with brokers, the mark on your SAFER profile, and the disruption to any load commitments you had in progress. Authority can be reinstated. The operational and financial cost of the downtime cannot be recovered.

This is why insurance continuity is a system problem, not an emergency management problem. By the time reinstatement is needed, the damage is already done.`,
  },
  {
    heading: "A Note on Insurance Costs for New Carriers",
    body: `New carriers operate without Safety Measurement System data because they haven't operated long enough to generate it. Underwriters price the absence of data as risk. This is not negotiable in year one.

What is within your control is the operational profile you present at application and renewal: clean DOT number, no open violations, no prior authority revocations, a documented compliance structure, and a declared operational radius that accurately reflects your actual lanes.

Carriers who present organized, verifiable compliance documentation at application are treated differently than carriers who cannot answer basic questions about their drug testing program or driver file structure. This is not a positioning strategy — it is underwriters doing their job, and preparation changes the outcome.`,
  },
];

export default function InsuranceSyncPost() {
  useSEO({
    title: "The Insurance Sync Problem: Why New Carriers Lose Authority Before They Ever Run a Load | LaunchPath",
    description: "New motor carriers lose operating authority due to insurance lapses before their first load. Understand BMC-91 filing mechanics, the lapse trigger, and how to maintain continuous coverage.",
  });

  return (
    <div style={{ background: navy, minHeight: "100vh" }}>
      <Navbar />

      {/* Article Hero */}
      <div style={{
        background: "#080f1e",
        borderBottom: `3px solid ${gold}`,
        padding: "5rem 1.5rem 4rem",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>
              ← Operational Library
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.60rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Insurance Continuity</span>
          </div>

          {/* Category + code */}
          <p style={{ fontFamily: mono, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-06 · INSURANCE CONTINUITY · AUTHORITY PROTECTION
          </p>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "var(--text-2xl)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            The Insurance Sync Problem: Why New Carriers Lose Authority Before They Ever Run a Load
          </h1>

          {/* Lead */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            Most new motor carriers understand that insurance is required before they operate. What they don't understand is that insurance isn't a one-time purchase — it's a continuous filing that can be revoked, lapsed, or canceled at any point, and when it lapses, authority suspension follows automatically.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginTop: "1rem" }}>
            This sequence — insurance problem leads to authority problem leads to no operation — is one of the top three reasons new carriers fail in their first two years. It is also one of the most preventable.
          </p>

          {/* Meta */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "New motor carrier insurance requirements"],
              ["CFR References", "49 CFR Part 387 · 49 CFR Part 382 · 49 CFR Part 391"],
              ["Reading Time", "~8 min"],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.2rem" }}>{label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.60)" }}>{value}</p>
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
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
              fontSize: "var(--text-xl)", color: "#FFFFFF",
              letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1.25rem",
              paddingBottom: "0.6rem", borderBottom: "1px solid rgba(212,144,10,0.15)",
            }}>
              {section.heading}
            </h2>
            {section.body.split("\n\n").map((para, j) => (
              <p key={j} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "var(--text-base)",
                color: "rgba(255,255,255,0.72)", lineHeight: 1.85, marginBottom: "1.1rem",
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
          <p style={{ fontFamily: mono, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem" }}>
            Related Resources
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LP-BRF-05 — Insurance Continuity Brief", desc: "BMC-91 filing structure, coverage minimums by carrier type, and policy renewal verification.", href: "/knowledge-center/insurance-continuity-brief" },
              { label: "LP-BRF-01 — New Entrant Safety Audit Brief", desc: "The 12-month audit window and the documentation FMCSA reviews — the same areas insurers review at renewal.", href: "/knowledge-center/new-entrant-safety-audit-brief" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 3, minHeight: 40, background: gold, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <Link to={item.href} style={{ fontFamily: mono, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, textDecoration: "none" }}>{item.label}</Link>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.50)", marginTop: "0.2rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ground 0 CTA */}
        <div style={{ textAlign: "center", padding: "3rem 2rem", background: "#060d19", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: mono, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>
            LPOS V1.0 — GROUND 0 ENTRY
          </p>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#FFFFFF", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            If you're a new carrier in your first 90 days, Ground 0 is free.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 460, margin: "0 auto 1.75rem" }}>
            It covers what the audit looks for — including the Four Pillars that keep a carrier operating — and ends with a structured GO/WAIT/NO-GO decision framework.
          </p>
          <Link
            to="/auto-diagnostic"
            data-testid="article-reach-cta"
            style={{
              display: "inline-block", background: gold, color: "#060d19",
              fontFamily: mono, fontWeight: 700, fontSize: "0.65rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "1rem 2.25rem", textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = gold}
          >
            RUN THE REACH ASSESSMENT →
          </Link>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.7, marginTop: "2.5rem", fontStyle: "italic" }}>
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal, insurance, or compliance advice. Verify all regulatory requirements with FMCSA directly at fmcsa.dot.gov and consult a licensed insurance professional before making coverage decisions.
        </p>
        <p style={{ fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginTop: "0.5rem" }}>
          LaunchPath Transportation EDU · Accuracy Over Hype. Systems Over Shortcuts.
        </p>
      </div>

      <BriefBundleCTA />
      <FooterSection />
    </div>
  );
}
