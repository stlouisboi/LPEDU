import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";

const gold = "#d4900a";
const navy = "#0D1B30";
const darkCard = "#0A1525";

const CASES = [
  {
    id: "CS-001",
    tag: "HOS / ELD COMPLIANCE",
    lane: "Owner-operator · Box truck · Interstate dry van",
    daysOnAuthority: 47,
    sin: "Sin 4 — No Hours of Service system",
    what_happened:
      "A routine roadside inspection flagged an ELD malfunction and the absence of any backup log protocol. A follow-up FMCSA audit found no HOS training documentation, no log reconciliation process, and a driver who could not articulate the 14-hour rule. The audit expanded from a single inspection to a full safety review.",
    what_was_missing:
      "Written Hours of Service policy. Driver training record. Log reconciliation log. ELD malfunction protocol. None of these existed. The carrier had purchased an ELD but never built the administrative system around it.",
    outcome:
      "$8,500 civil penalty. 30-day compliance review period assigned. Conditional safety rating issued. All loads flagged for DOT-aware brokers for the following 90 days.",
    rating: "Conditional",
    ratingColor: "#d4900a",
  },
  {
    id: "CS-002",
    tag: "DRUG & ALCOHOL PROGRAM",
    lane: "Two-driver operation · Refrigerated freight · Regional lanes",
    daysOnAuthority: 68,
    sin: "Sin 7 — No D&A Program",
    what_happened:
      "A random selection came back to the carrier through a consortium. The consortium had no record of enrollment. Investigation revealed the owner had confused creating a consortium account with completing the enrollment process. A pre-employment test had been completed, but consortium membership was never confirmed. The carrier had been operating without a compliant D&A program for 68 days.",
    what_was_missing:
      "Confirmed consortium enrollment documentation. Written Drug and Alcohol policy. Supervisor reasonable-suspicion training certificate. Without the enrollment confirmation, the pre-employment test was treated as invalid.",
    outcome:
      "$16,500 civil penalty. Conditional safety rating. Operating authority under 45-day compliance review. Both drivers required re-testing before returning to service.",
    rating: "Conditional",
    ratingColor: "#d4900a",
  },
  {
    id: "CS-003",
    tag: "INSURANCE CONTINUITY",
    lane: "Solo owner-operator · Power-only · Spot market",
    daysOnAuthority: 31,
    sin: "Sin 2 — Insurance filing lapse",
    what_happened:
      "The carrier's insurance broker changed underwriters mid-term without notifying FMCSA. The certificate on file expired. The carrier continued operating, unaware that the new coverage had not been re-filed with FMCSA. A broker compliance check flagged the lapse and reported it. FMCSA initiated a revocation action the same day.",
    what_was_missing:
      "An insurance monitoring protocol. No process existed for verifying active FMCSA filing status. No broker communication checklist. No calendar reminder for certificate renewal dates.",
    outcome:
      "Operating authority revoked. Carrier off the road for 19 days while re-filing was processed and FMCSA reinstated the authority. All in-transit loads had to be reassigned at the carrier's expense.",
    rating: "Revocation",
    ratingColor: "#c0392b",
  },
  {
    id: "CS-004",
    tag: "VEHICLE MAINTENANCE RECORDS",
    lane: "Three-truck fleet · Flatbed · Regional + OTR",
    daysOnAuthority: 180,
    sin: "Sin 10 — No preventive maintenance system",
    what_happened:
      "An FMCSA targeted inspection at a weigh station placed two of three trucks out of service for brake deficiencies. Investigators requested maintenance records. The carrier produced fuel receipts and one oil change invoice. No inspection logs, no driver vehicle inspection reports (DVIRs), and no PM schedule existed for any unit.",
    what_was_missing:
      "A preventive maintenance schedule. DVIR log for each unit. Annual inspection records. A system linking mileage, inspections, and repair history to each VIN.",
    outcome:
      "Two trucks placed out-of-service indefinitely. Conditional safety rating issued for the fleet. $14,000 in combined civil penalties. Required third-party safety audit before trucks were released.",
    rating: "Conditional",
    ratingColor: "#d4900a",
  },
  {
    id: "CS-005",
    tag: "AUTHORITY MAINTENANCE",
    lane: "Two-driver team · Intermodal / port drayage",
    daysOnAuthority: 120,
    sin: "Sin 1 — BOC-3 lapse",
    what_happened:
      "The carrier's process agent provider had been acquired by another company. The BOC-3 filing on record with FMCSA was not transferred during the acquisition. FMCSA flagged the lapse during a routine compliance check. The carrier had no system to monitor the status of its active filings and did not know the BOC-3 had become invalid.",
    what_was_missing:
      "An authority maintenance calendar. A process for verifying the active status of all FMCSA filings — BOC-3, UCR, MCS-150 biennial update, and insurance certificates — on a recurring schedule.",
    outcome:
      "All operating authority revoked pending re-filing. 11-day operational shutdown. Loss of two contracted port lanes. Re-filing and reinstatement completed but broker relationships required rebuilding.",
    rating: "Revocation",
    ratingColor: "#c0392b",
  },
];

const RATING_BADGE = {
  Conditional: { bg: "rgba(212,144,10,0.12)", border: "rgba(212,144,10,0.35)", color: "#d4900a" },
  Revocation:  { bg: "rgba(192,57,43,0.12)",  border: "rgba(192,57,43,0.35)",  color: "#c0392b" },
};

export default function CaseStudiesPage() {
  return (
    <div style={{ background: navy, minHeight: "100vh", color: "#f4f7fb" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
        .cs-card { transition: border-color 0.2s; }
        .cs-card:hover { border-color: rgba(212,144,10,0.35) !important; }
      `}} />
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ background: navy, borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "5rem 2rem 4rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.70)", marginBottom: "1rem" }}>
              LP-DOC-005 | PATTERN LIBRARY
            </p>
            <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
              Case Studies: How New Authorities End
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.75, maxWidth: 620, marginBottom: "0.75rem" }}>
              The following cases are anonymized composites drawn from FMCSA enforcement patterns and New Entrant Safety Audit data. No names, no locations — only the operational behaviors and missing systems that produced each outcome.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 560 }}>
              Every pattern here maps to a specific LaunchPath compliance domain. The systems that prevent these outcomes are the same systems installed during Ground 0 and the LaunchPath Standard program.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── Cases ── */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* Quiz entry banner */}
        <FadeIn>
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
            gap: "1.25rem", background: darkCard, border: "1px solid rgba(212,144,10,0.18)",
            padding: "1.5rem 2rem", marginBottom: "3rem",
          }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", margin: "0 0 0.3rem" }}>LP-TOOL-003</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.5 }}>
                Not sure which case applies to your operation? Take the 5-question gap audit.
              </p>
            </div>
            <Link
              to="/compliance-gap-quiz"
              data-testid="cs-quiz-cta"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "#0b1628", background: gold, padding: "0.875rem 1.75rem", textDecoration: "none", display: "inline-block", whiteSpace: "nowrap", transition: "background 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
              onMouseLeave={e => { e.currentTarget.style.background = gold; }}
            >
              TAKE THE AUDIT →
            </Link>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {CASES.map((c, i) => {
            const badge = RATING_BADGE[c.rating];
            return (
              <FadeIn key={c.id} delay={i * 20}>
                <div
                  className="cs-card"
                  style={{
                    background: darkCard,
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "2.5rem 2.75rem",
                  }}
                >
                  {/* Card header */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", margin: "0 0 0.35rem" }}>
                        {c.id} &nbsp;·&nbsp; {c.tag}
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.40)", margin: 0 }}>
                        {c.lane}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem", flexShrink: 0 }}>
                      <div style={{ background: badge.bg, border: `1px solid ${badge.border}`, padding: "0.3rem 0.875rem" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: badge.color }}>
                          {c.rating}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}>
                        Day {c.daysOnAuthority} of authority
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "1.5rem" }} />

                  {/* Content blocks */}
                  {[
                    { label: "What Happened", text: c.what_happened },
                    { label: "What Was Missing", text: c.what_was_missing },
                    { label: "Outcome", text: c.outcome },
                  ].map(block => (
                    <div key={block.label} style={{ marginBottom: "1.25rem" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, margin: "0 0 0.5rem" }}>
                        {block.label}
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: 0 }}>
                        {block.text}
                      </p>
                    </div>
                  ))}

                  {/* Sin tag */}
                  <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.10em", textTransform: "uppercase" }}>Maps to</span>
                    <Link to="/16-deadly-sins" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 600, color: "rgba(212,144,10,0.65)", textDecoration: "none", letterSpacing: "0.06em" }}>
                      {c.sin} →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <FadeIn delay={120}>
          <div style={{ background: darkCard, borderLeft: `3px solid ${gold}`, padding: "2.75rem 3rem", marginTop: "4rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.875rem" }}>
              PATTERN RECOGNITION
            </p>
            <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "1rem" }}>
              Every case above has a preventable root cause.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 560, marginBottom: "2rem" }}>
              The systems that would have changed each outcome — HOS documentation, D&A enrollment, insurance monitoring, maintenance records, authority calendars — are the same systems installed during the LaunchPath Standard program.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                to="/reach-diagnostic"
                data-testid="cs-ground0-cta"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "#0b1628", background: gold, padding: "1rem 2.25rem", textDecoration: "none", display: "inline-block", transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = gold; }}
              >
                TAKE REACH DIAGNOSTIC →
              </Link>
              <Link
                to="/launchpath-standard"
                data-testid="cs-standard-cta"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: gold, background: "transparent", padding: "1rem 2rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(212,144,10,0.35)", transition: "border-color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.35)"; }}
              >
                VIEW THE STANDARD →
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* ── Disclaimer ── */}
        <FadeIn delay={140}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.22)", lineHeight: 1.6, marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
            Cases are anonymized composites based on FMCSA enforcement data and New Entrant Safety Audit patterns. No identifying information. Penalty figures reflect ranges documented in FMCSA civil penalty guidance. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
          </p>
        </FadeIn>
      </div>

      <FooterSection />
    </div>
  );
}
