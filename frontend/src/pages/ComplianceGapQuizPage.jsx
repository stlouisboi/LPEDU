import { useState } from "react";
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";

const gold = "#d4900a";
const navy = "#0D1B30";
const darkCard = "#0A1525";

const QUESTIONS = [
  {
    id: "q1",
    domain: "HOS / ELD COMPLIANCE",
    domainColor: "#d4900a",
    question: "Do you have a written Hours of Service policy, signed by every driver, with a log reconciliation process in place?",
    yes: "HOS system in place",
    no: "HOS gap identified",
    caseId: "CS-001",
    caseTag: "Sin 4 — No HOS system",
    gapSummary: "No written HOS policy or driver training record. An FMCSA audit will treat this as a systemic deficiency, not a paperwork oversight.",
    fix: "Build a written HOS policy, obtain driver signatures, and implement a log reconciliation process before your first inspection.",
  },
  {
    id: "q2",
    domain: "DRUG & ALCOHOL PROGRAM",
    domainColor: "#c0392b",
    question: "Do you have confirmed enrollment documentation from a DOT-compliant Drug & Alcohol testing consortium — not just a login, but proof of active membership?",
    yes: "D&A program enrolled",
    no: "D&A gap identified",
    caseId: "CS-002",
    caseTag: "Sin 7 — No D&A Program",
    gapSummary: "Consortium account creation is not the same as enrollment. FMCSA requires documented confirmation. A pre-employment test without enrollment confirmation is treated as invalid.",
    fix: "Contact your consortium and request a written enrollment confirmation. Verify your carrier record appears in their system.",
  },
  {
    id: "q3",
    domain: "INSURANCE CONTINUITY",
    domainColor: "#7b3fa0",
    question: "Do you have a documented process for verifying that your FMCSA insurance certificate is actively on file — separate from knowing your policy is current?",
    yes: "Insurance monitoring in place",
    no: "Insurance gap identified",
    caseId: "CS-003",
    caseTag: "Sin 2 — Insurance filing lapse",
    gapSummary: "A policy can be active while the FMCSA filing is lapsed. These are two different systems. Brokers can change underwriters without re-filing. Carriers are responsible for what FMCSA has on record.",
    fix: "Log into FMCSA's SAFER system and verify your active insurance filing. Add a recurring 60-day calendar reminder to re-verify.",
  },
  {
    id: "q4",
    domain: "VEHICLE MAINTENANCE",
    domainColor: "#1565c0",
    question: "Does every vehicle in your fleet have a current annual inspection record and an active Driver Vehicle Inspection Report (DVIR) log?",
    yes: "Maintenance records current",
    no: "Maintenance gap identified",
    caseId: "CS-004",
    caseTag: "Sin 10 — No PM system",
    gapSummary: "Annual inspections and DVIRs are not optional — they are the documentary evidence that your equipment is roadworthy. Their absence tells an investigator the entire maintenance program is missing.",
    fix: "Complete an annual inspection for each unit. Begin a DVIR log immediately. Build a preventive maintenance schedule tied to mileage and calendar.",
  },
  {
    id: "q5",
    domain: "AUTHORITY MAINTENANCE",
    domainColor: "#00695c",
    question: "Do you have a calendar or tracking system for your BOC-3 filing, UCR annual registration, and MCS-150 biennial update deadlines?",
    yes: "Authority calendar in place",
    no: "Authority gap identified",
    caseId: "CS-005",
    caseTag: "Sin 1 — BOC-3 / authority lapse",
    gapSummary: "Operating authority is not self-maintaining. BOC-3 providers change. UCR deadlines pass. MCS-150 updates lapse. FMCSA will revoke authority for administrative failures with the same speed as safety violations.",
    fix: "Build a compliance calendar with recurring alerts for every FMCSA filing deadline. Verify the active status of each filing in SAFER today.",
  },
];

export default function ComplianceGapQuizPage() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | results
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({}); // { q1: true/false, ... }

  const gaps = QUESTIONS.filter(q => answers[q.id] === false);
  const score = QUESTIONS.length - gaps.length;

  function handleAnswer(yes) {
    const updated = { ...answers, [QUESTIONS[current].id]: yes };
    setAnswers(updated);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setPhase("results");
    }
  }

  function restart() {
    setPhase("intro");
    setCurrent(0);
    setAnswers({});
  }

  const q = QUESTIONS[current];
  const progress = ((current) / QUESTIONS.length) * 100;

  return (
    <div style={{ background: navy, minHeight: "100vh", color: "#f4f7fb" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
        .quiz-btn-yes { transition: background 0.18s, border-color 0.18s; }
        .quiz-btn-yes:hover { background: rgba(46,125,50,0.18) !important; border-color: rgba(46,125,50,0.60) !important; }
        .quiz-btn-no { transition: background 0.18s, border-color 0.18s; }
        .quiz-btn-no:hover { background: rgba(192,57,43,0.18) !important; border-color: rgba(192,57,43,0.60) !important; }
        .gap-card { transition: border-color 0.2s; }
        .gap-card:hover { border-color: rgba(212,144,10,0.30) !important; }
      `}} />
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ background: navy, borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "5rem 2rem 4rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.70)", marginBottom: "1rem" }}>
              LP-TOOL-003 | GAP AUDIT
            </p>
            <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)", color: "#FFFFFF", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1.1rem" }}>
              5-Question Compliance Gap Audit
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 540 }}>
              Five yes/no questions covering the five domains most commonly cited in New Entrant Safety Audits. Your answers identify which gaps are active in your operation and surface the case study that matches each one.
            </p>
          </FadeIn>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* ── INTRO ── */}
        {phase === "intro" && (
          <FadeIn>
            <div style={{ background: darkCard, border: "1px solid rgba(255,255,255,0.08)", padding: "2.75rem 3rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "1rem" }}>
                BEFORE YOU BEGIN
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                Answer each question honestly based on what exists in your operation today — not what you intend to build. A "yes" requires documentation you can produce right now. If you would have to create it before an audit, the answer is no.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                This audit covers 5 domains: Hours of Service, Drug &amp; Alcohol, Insurance, Vehicle Maintenance, and Authority Maintenance. It takes under 2 minutes.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", flexWrap: "wrap" }}>
                {[
                  { num: "01", label: "HOS / ELD" },
                  { num: "02", label: "D&A Program" },
                  { num: "03", label: "Insurance" },
                  { num: "04", label: "Maintenance" },
                  { num: "05", label: "Authority" },
                ].map(d => (
                  <div key={d.num} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.667rem", color: gold, fontWeight: 700 }}>{d.num}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>{d.label}</span>
                  </div>
                ))}
              </div>
              <button
                data-testid="quiz-start-btn"
                onClick={() => setPhase("quiz")}
                style={{
                  marginTop: "2.25rem",
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
                  letterSpacing: "0.10em", textTransform: "uppercase",
                  color: "#0b1628", background: gold,
                  border: "none", padding: "1rem 2.5rem", cursor: "pointer",
                  transition: "background 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = gold; }}
              >
                BEGIN AUDIT →
              </button>
            </div>
          </FadeIn>
        )}

        {/* ── QUIZ ── */}
        {phase === "quiz" && (
          <FadeIn key={current}>
            {/* Progress bar */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>
                  Question {current + 1} of {QUESTIONS.length}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
                  {Math.round(progress)}% complete
                </span>
              </div>
              <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${progress}%`, background: gold, borderRadius: 2, transition: "width 0.3s" }} />
              </div>
            </div>

            <div style={{ background: darkCard, border: "1px solid rgba(255,255,255,0.08)", padding: "2.75rem 3rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: q.domainColor, opacity: 0.75, marginBottom: "1.25rem" }}>
                {q.domain}
              </p>
              <h2 style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
                fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)", color: "#FFFFFF",
                lineHeight: 1.35, marginBottom: "2.5rem", letterSpacing: "-0.01em",
              }}>
                {q.question}
              </h2>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  data-testid={`quiz-yes-btn-${current + 1}`}
                  className="quiz-btn-yes"
                  onClick={() => handleAnswer(true)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "#2e7d32", background: "rgba(46,125,50,0.08)",
                    border: "1px solid rgba(46,125,50,0.35)",
                    padding: "1rem 2.25rem", cursor: "pointer", flex: "1 1 140px",
                  }}
                >
                  YES — IN PLACE
                </button>
                <button
                  data-testid={`quiz-no-btn-${current + 1}`}
                  className="quiz-btn-no"
                  onClick={() => handleAnswer(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "#c0392b", background: "rgba(192,57,43,0.08)",
                    border: "1px solid rgba(192,57,43,0.35)",
                    padding: "1rem 2.25rem", cursor: "pointer", flex: "1 1 140px",
                  }}
                >
                  NO — NOT YET
                </button>
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.22)", marginTop: "1.5rem", lineHeight: 1.5 }}>
                A "yes" requires documentation you can produce today. If you would need to create it first, select No.
              </p>
            </div>
          </FadeIn>
        )}

        {/* ── RESULTS ── */}
        {phase === "results" && (
          <FadeIn>
            {/* Score header */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.625rem" }}>
                AUDIT COMPLETE
              </p>
              <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#FFFFFF", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                {gaps.length === 0
                  ? "No active gaps identified."
                  : gaps.length === 1
                  ? "1 active compliance gap identified."
                  : `${gaps.length} active compliance gaps identified.`}
              </h2>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                {QUESTIONS.map(q => (
                  <div
                    key={q.id}
                    title={answers[q.id] ? q.yes : q.no}
                    style={{
                      width: 32, height: 8,
                      background: answers[q.id]
                        ? "rgba(46,125,50,0.65)"
                        : "rgba(192,57,43,0.65)",
                      borderRadius: 2,
                    }}
                  />
                ))}
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", marginLeft: "0.5rem" }}>
                  {score}/{QUESTIONS.length} systems in place
                </span>
              </div>
            </div>

            {/* No gaps */}
            {gaps.length === 0 && (
              <div style={{ background: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.25)", borderLeft: "3px solid #2e7d32", padding: "2rem 2.25rem", marginBottom: "2rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.952rem", color: "#2e7d32", marginBottom: "0.625rem", letterSpacing: "0.04em" }}>
                  All five domains accounted for.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.75, margin: 0 }}>
                  Your operation has the foundational compliance systems in place. The next layer is verifying those systems are correctly installed and will hold up under FMCSA scrutiny — which is what Ground 0 and the LaunchPath Standard are designed to confirm.
                </p>
              </div>
            )}

            {/* Gap cards */}
            {gaps.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {gaps.map(gap => (
                  <div
                    key={gap.id}
                    className="gap-card"
                    style={{ background: darkCard, border: "1px solid rgba(192,57,43,0.20)", borderLeft: "3px solid rgba(192,57,43,0.55)", padding: "2rem 2.25rem" }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(192,57,43,0.70)", marginBottom: "0.5rem" }}>
                      {gap.domain} — GAP ACTIVE
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.70, marginBottom: "1rem" }}>
                      {gap.gapSummary}
                    </p>
                    <div style={{ background: "rgba(0,0,0,0.20)", border: "1px solid rgba(255,255,255,0.06)", padding: "0.875rem 1.125rem", marginBottom: "1.25rem" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.375rem" }}>NEXT ACTION</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{gap.fix}</p>
                    </div>
                    <Link
                      to="/case-studies"
                      data-testid={`quiz-result-case-link-${gap.caseId}`}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, color: "rgba(212,144,10,0.70)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}
                      onMouseEnter={e => { e.currentTarget.style.color = gold; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.70)"; }}
                    >
                      See {gap.caseId}: {gap.caseTag} →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Clean systems */}
            {score > 0 && gaps.length > 0 && (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(46,125,50,0.55)", marginBottom: "0.625rem" }}>Systems in place</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {QUESTIONS.filter(q => answers[q.id] === true).map(q => (
                    <span key={q.id} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(46,125,50,0.70)", background: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.20)", padding: "0.25rem 0.75rem" }}>
                      {q.domain}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div style={{ background: darkCard, borderLeft: `3px solid ${gold}`, padding: "2.5rem 2.75rem", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "#FFFFFF", lineHeight: 1.3, marginBottom: "0.875rem" }}>
                {gaps.length === 0
                  ? "Confirm your systems will hold under audit."
                  : "Close the gaps before FMCSA finds them."}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 480, marginBottom: "1.75rem" }}>
                {gaps.length === 0
                  ? "The REACH Diagnostic confirms whether your systems will hold under FMCSA scrutiny."
                  : `The REACH Diagnostic identifies gaps in your operation and gives you a GO / WAIT / NO-GO result before you lose authority.`}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  to="/reach-diagnostic"
                  data-testid="quiz-result-ground0-cta"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "#0b1628", background: gold, padding: "1rem 2.25rem", textDecoration: "none", display: "inline-block", transition: "background 0.18s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = gold; }}
                >
                  TAKE REACH DIAGNOSTIC →
                </Link>
                <button
                  data-testid="quiz-retake-btn"
                  onClick={restart}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", padding: "1rem 1.75rem", cursor: "pointer", transition: "border-color 0.18s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                >
                  Retake Audit
                </button>
              </div>
            </div>

          </FadeIn>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
