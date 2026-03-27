import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";

const gold = "#d4900a";
const navy = "#0D1B30";
const darkCard = "#0A1525";

const RATINGS = [
  {
    label: "Satisfactory",
    color: "#2e7d32",
    bg: "rgba(46,125,50,0.10)",
    border: "rgba(46,125,50,0.30)",
    desc: "FMCSA has determined the carrier has adequate safety management controls in place. Continued operation without compliance deadline. The baseline required for standard broker contracts and insurance rates.",
  },
  {
    label: "Conditional",
    color: "#d4900a",
    bg: "rgba(212,144,10,0.10)",
    border: "rgba(212,144,10,0.35)",
    desc: "The carrier has demonstrated deficiencies in one or more safety management domains. Operating authority remains active, but a compliance clock is running. Failure to respond within the window results in automatic downgrade to Unsatisfactory.",
    highlight: true,
  },
  {
    label: "Unsatisfactory",
    color: "#c0392b",
    bg: "rgba(192,57,43,0.10)",
    border: "rgba(192,57,43,0.30)",
    desc: "FMCSA has determined the carrier does not have adequate safety controls. Operating authority is subject to revocation. A 45-day window exists to contest the finding or demonstrate corrective action before revocation takes effect.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Obtain and review the audit report",
    body: "Request the full Safety Measurement System (SMS) audit report from the FMCSA regional service center. Identify exactly which BASIC domains triggered violations — Unsafe Driving, Hours of Service Compliance, Driver Fitness, Controlled Substances, Vehicle Maintenance, Hazardous Materials (if applicable), Crash Indicator. The violations are listed as specific regulatory citations. Start here.",
  },
  {
    num: "02",
    title: "Implement the corrective actions",
    body: "For each cited violation, build or document the system that addresses it. If the violation was a missing HOS policy — create and sign a written policy. If it was an expired annual vehicle inspection — complete the inspection and file the record. If it was a D&A program deficiency — correct the enrollment gap and produce the documentation. The corrective action must be genuine and documentable, not cosmetic.",
  },
  {
    num: "03",
    title: "Prepare the Corrective Action Plan (CAP)",
    body: "The CAP is a written response submitted to FMCSA documenting what violations were found, what you did to correct them, and what system is now in place to prevent recurrence. It should reference the specific CFR citations from the audit, describe the corrective action taken, and include supporting evidence — policy documents, training records, inspection logs, enrollment confirmations.",
  },
  {
    num: "04",
    title: "Submit to your FMCSA Regional Service Center",
    body: "The CAP must be submitted within 45 days of the Conditional rating notification. Late submissions are not accepted without documented cause. Submit via certified mail or through the FMCSA portal. Keep a copy of every document submitted and the submission confirmation. Your regional service center is listed on the safety rating notification letter.",
  },
  {
    num: "05",
    title: "Request a safety fitness re-determination",
    body: "After submitting the CAP, formally request a re-evaluation. FMCSA will review the submitted documentation and, if the corrective actions are accepted, issue a new safety fitness determination. If additional documentation is needed, they will request it. If the CAP is insufficient, you will receive a written explanation. Timeline for re-evaluation: 30–90 days, depending on regional office workload and the scope of the original violations.",
  },
];

const DIY_YES = [
  "Violations are documentation-related (missing records, outdated forms, unsigned policies)",
  "Violations are contained to 1–2 BASIC domains",
  "No formal Notice of Claim or imminent revocation is in play",
  "You have the time to build the corrective systems and assemble the supporting records",
];

const DIY_NO = [
  "Violations span 3 or more BASIC domains",
  "You received a formal Notice of Claim (not just a Conditional rating)",
  "Your authority is at immediate risk of revocation",
  "You have already submitted a CAP that was rejected",
  "The violations involve driver qualifications, drug and alcohol testing failures, or crash history",
];

export default function ConditionalRatingPage() {
  return (
    <div style={{ background: navy, minHeight: "100vh", color: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ background: navy, borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "5rem 2rem 4rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.70)", marginBottom: "1rem" }}>
              LP-DOC-006 | COMPLIANCE RESPONSE
            </p>
            <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
              Conditional Safety Rating: What It Means and How to Upgrade
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.75, maxWidth: 620 }}>
              A Conditional rating is not a death sentence. It is a documented finding that your safety management controls have deficiencies — and a compliance clock that starts the moment you receive it. The window is 45 days. The path forward is specific and executable.
            </p>
          </FadeIn>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* ── Rating System ── */}
        <FadeIn>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.875rem" }}>
            THE THREE SAFETY RATINGS
          </p>
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "0.75rem" }}>
            Where Conditional sits in the FMCSA safety fitness framework
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "2.25rem" }}>
            FMCSA assigns one of three safety fitness ratings following a New Entrant Safety Audit or targeted compliance review. Each rating carries a different operational consequence.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}>
            {RATINGS.map(r => (
              <div
                key={r.label}
                style={{
                  background: r.bg,
                  border: `1px solid ${r.border}`,
                  borderLeft: `3px solid ${r.color}`,
                  padding: "1.5rem 1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.625rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: r.color }}>
                    {r.label}
                  </span>
                  {r.highlight && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", background: "rgba(212,144,10,0.10)", padding: "0.2rem 0.6rem", border: "1px solid rgba(212,144,10,0.25)" }}>
                      You are here
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.70, margin: 0 }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── The 45-Day Clock ── */}
        <FadeIn delay={30}>
          <div style={{ background: darkCard, border: "1px solid rgba(255,255,255,0.07)", padding: "2.5rem 2.75rem", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.875rem" }}>
              THE COMPLIANCE WINDOW
            </p>
            <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "1rem" }}>
              45 days from notification. Not 45 business days. 45 calendar days.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              The notification letter from FMCSA establishes the start date. From that date, the carrier has 45 days to submit a Corrective Action Plan and request a re-evaluation. Carriers that miss the window without documented cause are automatically downgraded to Unsatisfactory — which triggers a revocation process.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 0 }}>
              The 45-day window is not a grace period. It is the full timeline for building, documenting, and submitting the corrective systems that will satisfy the auditor's findings. Carriers who treat the first 30 days as planning time often run out of runway.
            </p>
          </div>
        </FadeIn>

        {/* ── Upgrade Path ── */}
        <FadeIn delay={40}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.875rem" }}>
            THE UPGRADE PATH
          </p>
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "0.75rem" }}>
            From Conditional to Satisfactory: the five-step sequence
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "2.25rem" }}>
            FMCSA does not publish a single form for this process. What follows is the operational sequence carriers use to upgrade their rating.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  gap: "1.75rem",
                  paddingBottom: i < STEPS.length - 1 ? "2.5rem" : 0,
                  position: "relative",
                }}
              >
                {/* Step number + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 40, height: 40, background: "rgba(212,144,10,0.12)",
                    border: `1px solid rgba(212,144,10,0.35)`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, color: gold, letterSpacing: "0.04em" }}>{step.num}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: "rgba(212,144,10,0.15)", marginTop: "0.5rem" }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: "0.5rem" }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", marginBottom: "0.625rem", lineHeight: 1.3 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.75, margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── DIY vs. Help ── */}
        <FadeIn delay={60}>
          <div style={{ margin: "4rem 0 0" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.875rem" }}>
              SELF-ASSESSMENT
            </p>
            <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "0.75rem" }}>
              DIY vs. outside help: how to make the call
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "2.25rem" }}>
              Most Conditional ratings are self-correctable. Some are not. The difference is scope and timeline, not carrier capability.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {/* DIY viable */}
              <div style={{ background: "rgba(46,125,50,0.07)", border: "1px solid rgba(46,125,50,0.25)", padding: "1.75rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2e7d32", marginBottom: "1rem" }}>DIY is viable when</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {DIY_YES.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#2e7d32", fontSize: "0.857rem", flexShrink: 0, marginTop: "0.15rem" }}>✓</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Get help */}
              <div style={{ background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.25)", padding: "1.75rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c0392b", marginBottom: "1rem" }}>Get outside help when</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {DIY_NO.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#c0392b", fontSize: "0.857rem", flexShrink: 0, marginTop: "0.15rem" }}>→</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: darkCard, border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem 1.75rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.75, margin: 0 }}>
                <strong style={{ color: "rgba(255,255,255,0.70)" }}>On timeline:</strong> If you are within 10 days of the 45-day deadline and have not yet submitted a CAP, the DIY window has likely closed. In that scenario, an experienced consultant can sometimes negotiate a brief extension with the regional office while the CAP is prepared — but this is not guaranteed and should not be planned for.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ── Bottom CTA ── */}
        <FadeIn delay={80}>
          <div style={{ background: darkCard, borderLeft: `3px solid ${gold}`, padding: "2.75rem 3rem", marginTop: "4rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.875rem" }}>
              PREVENTION IS THE SYSTEM
            </p>
            <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "1rem" }}>
              The systems that prevent a Conditional rating are the same ones that upgrade it.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 560, marginBottom: "2rem" }}>
              Ground 0 identifies which compliance systems are missing in your operation before the audit does. The LaunchPath Standard installs them. If you are reading this before receiving a Conditional rating, that is the right sequence.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                to="/portal"
                data-testid="conditional-ground0-cta"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "#0b1628", background: gold, padding: "1rem 2.25rem", textDecoration: "none", display: "inline-block", transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = gold; }}
              >
                TAKE REACH DIAGNOSTIC →
              </Link>
              <Link
                to="/launchpath-standard"
                data-testid="conditional-standard-cta"
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
        <FadeIn delay={100}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.22)", lineHeight: 1.6, marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
            Information on this page reflects FMCSA safety fitness determination procedures as documented in 49 CFR Part 385. Timelines and procedures are subject to change. Verify current requirements at fmcsa.dot.gov. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
          </p>
        </FadeIn>
      </div>

      <FooterSection />
    </div>
  );
}
