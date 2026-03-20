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
    heading: "How FMCSA Defines a Commercial Motor Vehicle",
    body: `The regulatory definition of a commercial motor vehicle under 49 CFR Part 390.5 is the starting point. A vehicle is a CMV subject to FMCSA jurisdiction if it is used in interstate commerce and meets any of the following: a GVWR, GCWR, GVW, or GCW of 10,001 pounds or more; designed to transport 9 or more passengers including the driver for compensation; designed to transport 16 or more passengers including the driver not for compensation; or used in transporting hazardous materials in quantities requiring placarding.

For most box truck operators carrying general freight, the 10,001-pound threshold is what brings them under FMCSA jurisdiction. This triggers the requirement to obtain a USDOT number and, if operating for hire across state lines, an MC number and operating authority.

What it does not automatically trigger is a CDL requirement, ELD applicability, or the full range of driver qualification requirements under Part 391. Those thresholds are governed by weight class — and they change at 26,001 pounds.`,
  },
  {
    heading: "Below 26,001 lbs — What Applies",
    body: `For box trucks with a GVWR below 26,001 pounds operating in interstate commerce for hire:

USDOT number: Required.

Operating authority (MC number): Required for for-hire interstate carriers.

Insurance: Required. BMC-91 filing with FMCSA at the applicable minimum — $750,000 public liability for general freight.

CDL: Not required for vehicles under 26,001 pounds GVWR, unless the vehicle is placarded for hazardous materials or designed to transport 16 or more passengers. Verify state-specific requirements — some states impose additional CDL thresholds.

ELD: The short-haul exemption under 49 CFR Part 395.1(e) exempts drivers who operate within a 150 air-mile radius of their reporting location and return to that location each day, among other conditions. Most local box truck operators qualify. Verify each condition before assuming exemption applies.

Medical certification: Drivers of CMVs in interstate commerce must hold a valid medical examiner's certificate under 49 CFR Part 391.41, regardless of whether a CDL is required.

Hours of service: HOS rules under 49 CFR Part 395 apply to drivers of CMVs in interstate commerce. The short-haul exemption may exempt qualifying drivers from ELD use and HOS record requirements, but does not exempt them from the underlying HOS limits.

Driver qualification file: A reduced DQF is required for drivers of CMVs that do not require a CDL. The specific elements required are listed in 49 CFR Part 391 — it is a shorter file than for CDL drivers, but it is not an empty folder.`,
  },
  {
    heading: "At and Above 26,001 lbs — What Changes",
    body: `At 26,001 pounds GVWR, several additional requirements activate.

CDL required. Under 49 CFR Part 383, a CDL is required to operate a CMV with a GVWR of 26,001 pounds or more in interstate commerce. This is a Class B CDL at minimum. If you are pulling a trailer with a GCWR above 26,001 lbs, a Class A may be required.

Full DQF required. CDL drivers must have a complete driver qualification file under 49 CFR Part 391, including a commercial driver's license copy, medical examiner's certificate, MVR, road test or equivalent, pre-employment drug test result, and Clearinghouse query result. All elements must be present before the driver operates.

ELD applicability broadens. The short-haul exemption becomes harder to maintain at this weight class if your operational pattern changes. If you hire CDL drivers who have been required to use ELDs at prior employers, your ELD compliance infrastructure must be in place.

Medical certification reporting. CDL holders must self-certify their type of driving and, in most cases, provide their medical examiner's certificate to their state licensing agency, which then updates the CDL record. Carriers must track this for every CDL driver on their roster.`,
  },
  {
    heading: "What Stays the Same Regardless of Weight",
    body: `Several requirements apply across the entire FMCSA-regulated spectrum, regardless of where a box truck falls in the weight thresholds.

New Entrant Safety Audit. All new motor carriers — regardless of vehicle type or weight class — are subject to the New Entrant Safety Audit within 12 months of authority. The audit reviews the compliance areas applicable to your operation, adjusted for your specific requirements.

Vehicle maintenance records. Part 396 applies to all carriers operating CMVs in interstate commerce. Pre-trip and post-trip inspection records, maintenance logs, and annual inspection records are required regardless of vehicle weight class.

FMCSA registration maintenance. UCR registration, BOC-3 filing, and insurance continuity apply to all FMCSA-regulated carriers regardless of fleet size or vehicle class.

Drug and alcohol testing. Carriers who employ CDL drivers are subject to the full Part 382 program. Carriers who do not employ CDL drivers are not subject to Part 382 — but should document this clearly, because investigators sometimes ask.`,
  },
  {
    heading: "The Weight Class Decision at Startup",
    body: `For operators who are choosing between sub-26,001 lb and heavier equipment at startup, the weight threshold has real financial and operational implications.

Operating at sub-26,001 lbs reduces startup complexity: no CDL hiring requirement, reduced DQF burden, and in many cases ELD exemption eligibility. Insurance premiums are typically lower. The trade-off is lower payload capacity and the revenue ceiling that comes with it.

Operating above 26,001 lbs increases earning potential per load but requires CDL drivers, full DQF compliance, and the additional regulatory infrastructure that comes with it. It also increases insurance costs and the capital required to maintain compliance.

Neither choice is inherently better. The choice should reflect your verified capital position, your ability to hire and manage CDL drivers if applicable, and your operational radius. These factors — not equipment assumptions — determine which lane you can sustain.

The LaunchPath Lane Selection Matrix in Ground 0 walks through this decision with capital and cash-flow comparisons. If you haven't completed that exercise, it is worth doing before committing to equipment.`,
  },
  {
    heading: "A Note on Intrastate Operations",
    body: `Everything above applies to interstate commerce — carriers crossing state lines or operating in the flow of interstate trade. Carriers operating entirely within one state's borders are subject to state regulations, not FMCSA jurisdiction, unless they meet specific thresholds.

If you believe your operation is intrastate, verify that characterization with your state's DOT before assuming FMCSA regulations don't apply. The definition of interstate commerce is broader than many operators expect — it includes cargo that originated from or is destined for another state, even if the truck never crosses a state line.

Misidentifying an interstate operation as intrastate is one of the most common foundational errors new box truck carriers make. It results in operating without required authority, without required insurance filings, and without the compliance systems FMCSA would expect — creating a compliance gap that compounds the longer it goes unaddressed.`,
  },
];

export default function BoxTruckFMCSAPost() {
  useSEO({
    title: "Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes | LaunchPath",
    description: "The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line for new box truck operators.",
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
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Vehicle & Operations</span>
          </div>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-03 · VEHICLE & OPERATIONS · LANE SELECTION
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "var(--text-2xl)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            Box truck operators encounter more regulatory complexity than most anticipate when they first apply for authority. The regulations that apply to their operation depend significantly on vehicle weight, cargo type, and whether they cross state lines — and the answers change at specific weight thresholds.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginTop: "1rem" }}>
            The most important threshold is 26,001 pounds GVWR. What applies below it and what applies above it are meaningfully different. Understanding where you fall determines your CDL exposure, your ELD applicability, your medical certification requirements, and your FMCSA filing obligations.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "Box truck FMCSA requirements"],
              ["CFR References", "49 CFR Part 390 · Part 383 · Part 391 · Part 395"],
              ["Reading Time", "~9 min"],
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
              { label: "LP-BRF-01 — New Entrant Safety Audit Brief", desc: "What the audit reviews for carriers at all weight classes — including sub-CDL box truck operations.", href: "/knowledge-center/new-entrant-safety-audit-brief" },
              { label: "LP-BRF-02 — HOS Compliance Brief", desc: "Hours of service framework, the short-haul exemption conditions, and what ELD records prove to an investigator.", href: "/knowledge-center/hos-compliance-brief" },
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
            Ground 0 includes the Lane Selection Matrix — a capital and cash-flow comparison for box truck vs. semi operations that helps you choose the lane you can sustain, not just the one you can start.
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
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal or compliance advice. Weight thresholds, CDL requirements, and exemption eligibility should be verified with FMCSA at fmcsa.dot.gov and with your state's motor carrier authority.
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
