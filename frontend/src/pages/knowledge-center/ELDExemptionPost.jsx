import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const navy = "#0b1628";
const gold = "#d4900a";
const mono = "'IBM Plex Mono', monospace";

const SECTIONS = [
  {
    heading: "The ELD Mandate — Who It Applies To",
    body: `Under 49 CFR Part 395.8 and the ELD final rule (49 CFR Part 395 Subpart B), ELD use is required for drivers who are required to prepare Hours of Service records of duty status (RODS).

A driver is required to prepare RODS if they operate a CMV in interstate commerce — that is, a vehicle with a GVWR of 10,001 pounds or more crossing state lines or in the flow of interstate trade.

This means most box truck operators in interstate commerce are subject to HOS recording requirements. Whether they must use an ELD depends on whether they qualify for an exemption — and qualifying for an exemption is a conditions-based determination, not a vehicle-type determination.`,
  },
  {
    heading: "The Short-Haul Exemption",
    body: `The primary exemption available to box truck operators is the short-haul exemption under 49 CFR Part 395.1(e). This exemption eliminates the ELD requirement and the requirement to maintain paper RODS for drivers who meet all of the following conditions simultaneously.

Condition 1: The driver operates within a 150 air-mile radius of their normal work reporting location.

Condition 2: The driver returns to their normal work reporting location and is released from work within 14 consecutive hours after coming on duty.

Condition 3: The driver has at least 10 consecutive hours off duty separating each on-duty period.

Condition 4: The driver does not exceed 11 hours of driving time in any on-duty period.

Condition 5: The motor carrier maintains accurate time records showing the driver's time on duty and off duty for each 24-hour period. These records must be retained for 6 months.

All five conditions must be met for every shift. A driver who meets all conditions 49 out of 50 shifts and violates one condition on shift 50 has lost the exemption for that shift and must have a paper log or ELD record for it.`,
  },
  {
    heading: "The 150 Air-Mile Radius — What It Actually Means",
    body: `The 150 air-mile radius is measured in straight-line distance from the normal work reporting location, not road miles. A driver who travels 180 road miles but stays within 150 air miles of their reporting location may still qualify. A driver who travels 140 road miles but crosses the 150 air-mile boundary does not.

"Normal work reporting location" means the location where the driver typically reports for duty — usually the carrier's terminal or the driver's home base. If your drivers report to different locations on different days, this complicates the analysis.

Carriers whose routes extend beyond 150 air miles on any trip — even occasionally — must have an ELD or paper log in place for those trips. The exemption cannot be applied selectively to only the trips that fall within the radius. Each trip and each shift must be evaluated against the conditions independently.`,
  },
  {
    heading: "What the Short-Haul Exemption Does Not Exempt",
    body: `This is where operators most often misunderstand the short-haul exemption.

The exemption eliminates the ELD requirement and the RODS requirement. It does not eliminate Hours of Service rules.

A driver operating under the short-haul exemption is still subject to the 11-hour driving limit, the 14-hour on-duty window, and the 10-hour off-duty requirement. They simply document compliance differently — through the employer's time records rather than a personal log or ELD.

If a driver operating under the exemption violates an HOS limit, it is still a violation. The absence of an ELD or paper log does not make the violation invisible — roadside inspections can identify HOS violations through driver interviews, fuel receipts, load records, and other documentation. The exemption changes the documentation method, not the underlying obligation.`,
  },
  {
    heading: "Other Available Exemptions",
    body: `The agricultural exemption covers drivers transporting agricultural commodities within a 150 air-mile radius from the source of the commodities, who are exempt from HOS rules entirely during planting and harvesting seasons. This is a narrow exemption — most box truck freight carriers do not qualify.

The adverse driving conditions exception is not an exemption from ELD requirements, but allows a driver to extend their driving window by up to 2 hours when unexpected adverse driving conditions are encountered. Must be documented when used.

The oilfield operations exemption allows for modified HOS rules for drivers engaged in oilfield work. Not applicable to most box truck carriers.`,
  },
  {
    heading: "When Box Truck Operators Are Not Exempt",
    body: `A box truck operator loses short-haul exemption eligibility — and must have an ELD or paper log — when any of the following occur.

Any trip extends beyond 150 air miles from the reporting location. Even one trip outside the radius eliminates the exemption for that shift.

The driver is not released from duty within 14 hours of coming on duty. This condition must be met on every shift — not most shifts.

The carrier does not maintain the required time records. A carrier that fails to maintain time records loses the exemption's evidentiary protection. Without records, an investigator cannot verify compliance with the conditions, and the exemption is treated as inapplicable.

Additionally, if a carrier employs CDL drivers operating vehicles above 26,001 lbs GVWR, ELD applicability for those drivers is governed by the standard ELD mandate rules. The short-haul exemption may still apply if the CDL driver meets all five conditions, but the analysis must be conducted for each driver on each shift.`,
  },
  {
    heading: "Recordkeeping for Exempt Carriers",
    body: `Carriers operating under the short-haul exemption must maintain time records for each driver showing time on duty each day, time off duty each day, and total hours for the week. These records are not RODS — they are simpler. But they are required and must be retained for 6 months under 49 CFR Part 395.8(k).

During the New Entrant Safety Audit, investigators review HOS compliance. An exempt carrier who has not maintained time records has a violation — not for lacking an ELD, but for lacking the records the exemption requires.

The records are straightforward to maintain. A simple daily time log for each driver, retained consistently, satisfies the requirement. The failure point is not the format — it is carriers who assume exemption means no recordkeeping, which is not what the regulation provides.`,
  },
];

export default function ELDExemptionPost() {
  useSEO({
    title: "ELD Exemptions for Box Truck Operators: What's Covered and What Isn't | LaunchPath",
    description: "The short-haul exemption eliminates the ELD requirement for qualifying box truck operators — but it doesn't eliminate HOS rules or recordkeeping. Here's exactly what the exemption covers and when it doesn't apply.",
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
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>
              ← Operational Library
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.60rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Hours of Service</span>
          </div>

          <p style={{ fontFamily: mono, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-07 · HOURS OF SERVICE · COMPLIANCE BACKBONE
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "var(--text-2xl)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            ELD Exemptions for Box Truck Operators: What's Covered and What Isn't
          </h1>

          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            Box truck operators frequently ask whether they're required to use an Electronic Logging Device. The answer depends on a specific set of conditions — not just vehicle weight — and many operators who believe they are exempt are either partially wrong or operating under conditions that have eliminated their exemption without them realizing it.
          </p>

          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginTop: "1rem" }}>
            This article covers who must use an ELD, the conditions of the primary exemption available to box truck operators, and what happens when those conditions are not met.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "ELD exemption box truck"],
              ["CFR References", "49 CFR Part 395 Subpart B · Part 395.1(e)"],
              ["Reading Time", "~8 min"],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.2rem" }}>{label}</p>
                <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.60)" }}>{value}</p>
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
                fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "var(--text-base)",
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
          <p style={{ fontFamily: mono, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem" }}>
            Related Resources
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LP-BRF-02 — HOS Compliance Brief", desc: "Full hours of service framework — driving limits, on-duty windows, exemption conditions, and how FMCSA reads your logs.", href: "/knowledge-center/hos-compliance-brief" },
              { label: "LP-BRF-POST-03 — Box Truck FMCSA Requirements", desc: "The 26,001 lb threshold and how it affects CDL requirements, ELD applicability, and your full regulatory profile.", href: "/knowledge-center/box-truck-fmcsa-requirements" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 3, minHeight: 40, background: gold, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <Link to={item.href} style={{ fontFamily: mono, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, textDecoration: "none" }}>{item.label}</Link>
                  <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.85rem", color: "rgba(0,26,51,0.60)", marginTop: "0.2rem", lineHeight: 1.6 }}>{item.desc}</p>
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
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "#FFFFFF", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            If you're a new carrier in your first 90 days, Ground 0 is free.
          </p>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 460, margin: "0 auto 1.75rem" }}>
            Ground 0 covers the Lane Selection framework for box truck operators — including the operational and regulatory differences between sub-CDL and CDL lanes — before you commit to equipment.
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

        <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.75rem", color: "rgba(0,26,51,0.45)", lineHeight: 1.7, marginTop: "2.5rem", fontStyle: "italic" }}>
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal or compliance advice. Verify ELD requirements and exemption eligibility with FMCSA at fmcsa.dot.gov.
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
