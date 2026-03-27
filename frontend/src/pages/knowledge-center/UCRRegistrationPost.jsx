import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const navy = "#0D1B30";
const gold = "#d4900a";
const mono = "'Inter', sans-serif";

const SECTIONS = [
  {
    heading: "What UCR Is",
    body: `The Unified Carrier Registration Agreement is a federally authorized program under 49 USC 14504a. It requires motor carriers, freight brokers, leasing companies, and freight forwarders engaged in interstate commerce to register annually and pay a fee based on fleet size.

UCR replaced the Single State Registration System (SSRS) in 2007. The fees collected are distributed to participating states to fund motor carrier safety enforcement programs.

UCR is administered through the UCR national registration system at ucr.gov. It is not administered by FMCSA directly — which is part of why it's easy to overlook in the authority setup process and why some new carriers complete their MC application without realizing UCR is a separate, mandatory requirement.`,
  },
  {
    heading: "Who Is Required to Register",
    body: `Any of the following entities engaged in interstate commerce must register under UCR: motor carriers transporting property or passengers across state lines — including owner-operators operating under their own authority; private carriers transporting their own property in interstate commerce if they operate CMVs as defined under federal law; freight brokers arranging transportation of property for compensation; leasing companies renting CMVs to motor carriers; and freight forwarders arranging or assembling cargo for transportation.

For motor carriers, UCR applies regardless of vehicle size or fleet size. A single-truck carrier with one box truck operating in interstate commerce owes UCR registration.

Carriers operating exclusively intrastate — within one state, without interstate commerce involvement — may not be required to register under UCR. Verify with your state's UCR administrator before assuming an exemption applies.`,
  },
  {
    heading: "Fee Structure",
    body: `UCR fees are based on the number of vehicles in the carrier's fleet as of the date of registration. Fees are set annually by the UCR Board and approved by FMCSA.

For a fleet of 0 to 2 vehicles, the annual fee is approximately $60 to $80. For 3 to 5 vehicles, approximately $175 to $225. For 6 to 20 vehicles, approximately $450 to $600. Larger fleets are assessed at proportionally higher rates.

For a single-truck new carrier, UCR is typically the smallest annual compliance cost in the registration stack. The registration fee is not the risk — operating without it is. Verify exact fees for the current registration year at ucr.gov, as fees are updated annually.`,
  },
  {
    heading: "Registration Timeline",
    body: `UCR registration opens annually on October 1 for the following calendar year. Carriers are required to be registered before operating in any UCR-participating state.

For new carriers: register as soon as possible after receiving authority. You cannot operate legally in UCR-participating states without current registration. Because UCR is administered separately from FMCSA, your MC authority can be active while your UCR is deficient — and enforcement occurs at the state level during roadside inspections, not during the MC application process.

States that participate in UCR include the majority of states. A current list of participating states is available at ucr.gov. Even if your state of domicile does not participate, you owe UCR if you operate through participating states.`,
  },
  {
    heading: "How to Register",
    body: `Go to ucr.gov and create an account using your USDOT number. The registration process collects your fleet size information and calculates your fee. Payment is made electronically. A registration receipt is issued immediately.

Retain your UCR registration receipt. During roadside inspections, enforcement officers may request proof of UCR registration. In some states, the registration is verified electronically through your USDOT number — but having the receipt available avoids delays.

Registration for the following year should be completed as soon as registration opens on October 1. Carriers who operate into January without renewing are at risk for roadside UCR violations in the new year.`,
  },
  {
    heading: "Enforcement and Consequences",
    body: `UCR enforcement is conducted by state law enforcement during roadside inspections. A carrier operating without current UCR registration is subject to fines that vary by state. In some states, a vehicle can be placed out of service until proof of registration is obtained.

UCR violations can also appear on your FMCSA record and affect your carrier safety profile. During the New Entrant Safety Audit, investigators confirm that required registrations are in order. A missing UCR registration is a finding.

The enforcement consequence is disproportionate to the cost of the registration. For a single-truck carrier, UCR typically costs less than $100 per year. The fines for operating without it are multiples of that — and the disruption of an out-of-service order during a roadside inspection affects your schedule, your broker relationships, and your cash flow in ways that the registration fee does not.`,
  },
];

export default function UCRRegistrationPost() {
  useSEO({
    title: "UCR Registration for New Motor Carriers: Who Owes It, When It's Due, and What Happens If You Skip It | LaunchPath",
    description: "Unified Carrier Registration is a separate annual filing from your MC authority — and operating without it creates roadside enforcement exposure. Here's what UCR is, who must file, and how the fees work.",
  });

  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Article Hero */}
      <div style={{
        background: "var(--bg-2)",
        borderBottom: `3px solid ${gold}`,
        padding: "5rem 1.5rem 4rem",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>
              ← Operational Library
            </Link>
            <span style={{ color: "rgba(13,27,48,0.20)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.40)" }}>Authority Registration</span>
          </div>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-05 · AUTHORITY REGISTRATION · AUTHORITY PROTECTION
          </p>

          <h1 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
            fontSize: "var(--text-2xl)", letterSpacing: "-0.02em",
            color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            UCR Registration for New Motor Carriers: Who Owes It, When It's Due, and What Happens If You Skip It
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            The Unified Carrier Registration is one of the less-discussed compliance requirements for new motor carriers — which is why it catches some carriers off guard. It is not part of the FMCSA authority application process. It is a separate annual registration with its own filing system, its own fees, and its own enforcement consequences.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8, marginTop: "1rem" }}>
            Carriers who assume their MC number covers all federal registration requirements frequently discover UCR at the wrong moment: during a roadside inspection, a compliance review, or when a broker runs their authority through a carrier qualification system.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "UCR registration motor carrier"],
              ["Federal Statute", "49 USC 14504a"],
              ["Reading Time", "~7 min"],
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
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
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
          background: "var(--bg-2)", border: `1px solid rgba(212,144,10,0.20)`,
          borderTop: `3px solid ${gold}`, padding: "2rem", marginBottom: "3rem",
        }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem" }}>
            Related Resources
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LP-BRF-01 — New Entrant Safety Audit Brief", desc: "What auditors review for new carriers in the first 12 months — including verification of required registrations.", href: "/knowledge-center/new-entrant-safety-audit-brief" },
              { label: "LP-BRF-06 — Authority Registrations Brief", desc: "UCR, BOC-3, and MCS-150 — the complete foundational registration stack before your first dispatch.", href: "/knowledge-center/authority-registrations-brief" },
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
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>
            LPOS V1.0 — GROUND 0 ENTRY
          </p>
          <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            If you're a new carrier in your first 90 days, Ground 0 is free.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(13,27,48,0.65)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 460, margin: "0 auto 1.75rem" }}>
            Ground 0 Lesson 0.1 covers the complete foundational registration stack — including UCR — and ends with a verified GO/WAIT/NO-GO decision before your first dispatch.
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
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal or compliance advice. Verify current UCR fees and participating states at ucr.gov.
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
