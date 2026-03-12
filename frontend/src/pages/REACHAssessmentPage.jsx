import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

// ── Questions ────────────────────────────────────────────
const CATEGORIES = [
  { key: "R", label: "Resources", full: "RESOURCES" },
  { key: "E", label: "Experience", full: "EXPERIENCE" },
  { key: "A", label: "Authority Readiness", full: "AUTHORITY READINESS" },
  { key: "C", label: "Commitment", full: "COMMITMENT" },
  { key: "H", label: "Hustle Check", full: "HUSTLE CHECK" },
];

const QUESTIONS = [
  // R — Resources (0–2)
  {
    cat: 0,
    text: "If your truck experiences a major repair within the first 60 days, do you currently have funds available to cover the repair without stopping operations?",
    options: [{ text: "Yes", score: 3 }, { text: "Possibly", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 0,
    text: "How many months of operating expenses could your business cover today without new freight revenue?",
    options: [{ text: "3+ months", score: 3 }, { text: "1–2 months", score: 2 }, { text: "Less than 30 days", score: 1 }],
  },
  {
    cat: 0,
    text: "Do you know your current cost per mile including insurance, fuel, maintenance, and fixed expenses?",
    options: [{ text: "Yes", score: 3 }, { text: "Rough estimate", score: 2 }, { text: "No", score: 1 }],
  },
  // E — Experience (3–5)
  {
    cat: 1,
    text: "Have you previously worked in trucking operations, dispatch, or logistics?",
    options: [{ text: "Yes", score: 3 }, { text: "Limited exposure", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 1,
    text: "Do you understand how broker contracts, detention policies, and rate confirmations affect revenue?",
    options: [{ text: "Yes", score: 3 }, { text: "Somewhat", score: 2 }, { text: "Not yet", score: 1 }],
  },
  {
    cat: 1,
    text: "Have you personally managed or reviewed Hours of Service logs before?",
    options: [{ text: "Yes", score: 3 }, { text: "Some familiarity", score: 2 }, { text: "No", score: 1 }],
  },
  // A — Authority Readiness (6–8)
  {
    cat: 2,
    text: "Do you currently have a documented Driver Qualification file prepared according to FMCSA requirements?",
    options: [{ text: "Yes", score: 3 }, { text: "Partially", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 2,
    text: "Are you enrolled in a Drug & Alcohol testing consortium?",
    options: [{ text: "Yes", score: 3 }, { text: "In progress", score: 2 }, { text: "No", score: 1 }],
  },
  {
    cat: 2,
    text: "Do you currently maintain vehicle inspection and maintenance documentation?",
    options: [{ text: "Yes", score: 3 }, { text: "Some records", score: 2 }, { text: "No", score: 1 }],
  },
  // C — Commitment (9–11)
  {
    cat: 3,
    text: "How many hours per week are you prepared to dedicate to managing compliance and operational systems?",
    options: [{ text: "15+ hours", score: 3 }, { text: "5–15 hours", score: 2 }, { text: "Minimal time", score: 1 }],
  },
  {
    cat: 3,
    text: "Which statement best reflects your mindset?",
    options: [
      { text: "I want to build a stable long-term operation", score: 3 },
      { text: "I want to try trucking and see what happens", score: 2 },
      { text: "I'm hoping to make fast money", score: 1 },
    ],
  },
  {
    cat: 3,
    text: "If compliance systems require significant time to maintain, how likely are you to maintain them consistently?",
    options: [{ text: "Very likely", score: 3 }, { text: "Somewhat likely", score: 2 }, { text: "Unlikely", score: 1 }],
  },
  // H — Hustle Check (12–13, scored; 14 = open text)
  {
    cat: 4,
    text: "What is your timeline for launching operations?",
    options: [{ text: "Within 60–90 days", score: 3 }, { text: "Already operating", score: 2 }, { text: "Immediately / as fast as possible", score: 1 }],
  },
  {
    cat: 4,
    text: "If your authority cannot generate profit in the first 90 days, what is your plan?",
    options: [{ text: "Maintain operations and stabilize", score: 3 }, { text: "Adjust strategy", score: 2 }, { text: "Shut down", score: 1 }],
  },
];

// Insights shown after last question of each category
const CATEGORY_INSIGHTS = [
  "Many new authorities fail within the first 60 days due to unexpected repairs or delayed freight payments.",
  "Understanding broker contracts and HOS requirements before launch reduces early compliance exposure significantly.",
  "FMCSA inspectors regularly find Driver Qualification and Drug & Alcohol documentation gaps during new entrant audits.",
  "The carriers who survive the first year are not the most experienced. They are the most disciplined.",
  null, // no insight after hustle check
];

const RESULT_CONFIG = {
  GO: {
    label: "OPERATIONAL READINESS: GO",
    color: "#C5A059",
    headline: "Your assessment indicates strong readiness for the LaunchPath Standard.",
    bullets: [
      "Capital runway shows sufficient operational buffer.",
      "Compliance awareness is developing across key categories.",
      "Operational discipline indicators are positive.",
    ],
    cta: "Begin Ground 0 Briefing",
    ctaHref: "/ground-0-briefing",
    sub: "Ground 0 installs the operational systems that protect a GO-ready authority.",
  },
  WAIT: {
    label: "OPERATIONAL READINESS: WAIT",
    color: "#A0A870",
    headline: "Your assessment shows several areas that should be strengthened before launching authority.",
    bullets: [
      "One or more REACH categories indicate fixable gaps.",
      "Proceeding without addressing these areas increases early failure risk.",
      "Ground 0 provides the framework to close these gaps.",
    ],
    cta: "Review Ground 0 Preparation",
    ctaHref: "/ground-0-briefing",
    sub: "Launching before gaps are resolved is the most common cause of first-year authority failure.",
  },
  "NO-GO": {
    label: "OPERATIONAL READINESS: NO-GO",
    color: "#8A7060",
    headline: "Based on your responses, launching authority right now would likely expose your operation to significant risk.",
    bullets: [
      "Multiple REACH categories indicate critical operational gaps.",
      "Authorities launched under these conditions face predictable failure within 90 days.",
      "LaunchPath will be here when the conditions are right.",
    ],
    cta: "Join the Preparation Track",
    ctaHref: "/ground-0-briefing",
    sub: "This result protects you from a preventable financial loss. It is not a rejection.",
  },
};

// ── Risk Map ─────────────────────────────────────────────
function RiskMap({ scores, animate }) {
  const rows = [
    { label: "Resources", val: scores.r, max: 9 },
    { label: "Experience", val: scores.e, max: 9 },
    { label: "Authority Readiness", val: scores.a, max: 9 },
    { label: "Commitment", val: scores.c, max: 9 },
    { label: "Hustle Check", val: scores.h, max: 6 },
  ];

  return (
    <div data-testid="risk-map" style={{ marginBottom: "2.5rem" }}>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase", color: "#C5A059",
        marginBottom: "1.25rem",
      }}>
        AUTHORITY RISK MAP
      </p>
      {rows.map((row) => {
        const pct = Math.round((row.val / row.max) * 100);
        const barColor = pct >= 78 ? "#C5A059" : pct >= 55 ? "#7A9BB5" : "#6B7A82";
        return (
          <div key={row.label} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-muted)" }}>
                {row.label}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", fontWeight: 600, color: barColor }}>
                {row.val}/{row.max}
              </span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", height: 3 }}>
              <div style={{
                background: barColor,
                height: "100%",
                width: animate ? `${pct}%` : "0%",
                transition: animate ? "width 1s ease" : "none",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function REACHAssessmentPage() {
  const [phase, setPhase] = useState("intro"); // intro|questions|open|insight|analyzing|results|confirmed
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null); // brief highlight before advance
  const [insightIdx, setInsightIdx] = useState(null);
  const [openAnswer, setOpenAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState(null);
  const [analyzedCats, setAnalyzedCats] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animateMap, setAnimateMap] = useState(false);

  const API = process.env.REACT_APP_BACKEND_URL;

  // Analyzing animation
  useEffect(() => {
    if (phase !== "analyzing") return;
    let count = 0;
    const iv = setInterval(() => {
      count++;
      setAnalyzedCats(count);
      if (count >= 5) {
        clearInterval(iv);
        setTimeout(() => {
          setPhase("results");
          setTimeout(() => setAnimateMap(true), 300);
        }, 700);
      }
    }, 380);
    return () => clearInterval(iv);
  }, [phase]);

  const calcScores = (ans) => {
    const r = ans.slice(0, 3).reduce((s, a) => s + a, 0);
    const e = ans.slice(3, 6).reduce((s, a) => s + a, 0);
    const a = ans.slice(6, 9).reduce((s, a) => s + a, 0);
    const c = ans.slice(9, 12).reduce((s, a) => s + a, 0);
    const h = ans.slice(12, 14).reduce((s, a) => s + a, 0);
    const total = r + e + a + c + h;
    const outcome = total >= 33 ? "GO" : total >= 22 ? "WAIT" : "NO-GO";
    return { r, e, a, c, h, total, outcome };
  };

  const handleOptionSelect = (score, qIdx) => {
    setSelected(score);
    const newAnswers = [...answers, score];

    setTimeout(() => {
      setSelected(null);
      const isLastInCategory = (qIdx + 1) % 3 === 0;
      const catIdx = Math.floor(qIdx / 3);
      const insight = CATEGORY_INSIGHTS[catIdx];

      if (qIdx === 13) {
        // Last scored question — show open text
        setAnswers(newAnswers);
        setCurrentQ(14);
        setPhase("open");
      } else if (isLastInCategory && insight) {
        setAnswers(newAnswers);
        setInsightIdx(catIdx);
        setPhase("insight");
        setTimeout(() => {
          setPhase("questions");
          setCurrentQ(qIdx + 1);
          setInsightIdx(null);
        }, 2200);
      } else {
        setAnswers(newAnswers);
        setCurrentQ(qIdx + 1);
      }
    }, 350);
  };

  const handleOpenSubmit = () => {
    const computed = calcScores(answers);
    setScores(computed);
    setResult(computed.outcome);
    setPhase("analyzing");
    setAnalyzedCats(0);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch(`${API}/api/reach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          result,
          total_score: scores.total,
          category_scores: { r: scores.r, e: scores.e, a: scores.a, c: scores.c, h: scores.h },
          open_response: openAnswer,
        }),
      });
    } catch { /* still confirm */ }
    setLoading(false);
    setSubmitted(true);
  };

  const currentCatIdx = phase === "questions" ? QUESTIONS[currentQ]?.cat ?? 0 : 0;
  const cfg = result ? RESULT_CONFIG[result] : null;

  // ── Shared container styles ───────────────────────────
  const wrap = {
    maxWidth: 640,
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#001A33", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      {/* ── INTRO ─────────────────────────────────────── */}
      {phase === "intro" && (
        <div style={{ ...wrap, paddingTop: "120px", paddingBottom: "80px" }}>
          <p style={{
            fontSize: "0.672rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "1.5rem",
          }}>
            THE REACH ASSESSMENT
          </p>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.5rem",
          }}>
            Authority Readiness Diagnostic
          </h1>
          <p style={{ fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1rem", maxWidth: 520 }}>
            Most new motor carrier authorities fail within the first year because critical operational systems were never installed.
          </p>
          <p style={{ fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: 520 }}>
            This diagnostic evaluates whether your operation is prepared to survive the first 90 days.
          </p>

          <div style={{ display: "flex", gap: "2.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <div key={c.key}>
                <p style={{ fontSize: "0.896rem", fontWeight: 700, color: "#C5A059" }}>{c.key}</p>
                <p style={{ fontSize: "0.784rem", color: "var(--text-subtle)" }}>{c.label}</p>
              </div>
            ))}
          </div>

          <button
            data-testid="reach-start-btn"
            onClick={() => setPhase("questions")}
            style={{
              minHeight: 52, background: "#C5A059", color: "#002244", border: "none",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.98rem",
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              padding: "1rem 2.5rem", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C5A059")}
          >
            Run the Diagnostic
          </button>
          <p style={{ fontSize: "0.784rem", color: "var(--text-subtle)", marginTop: "1rem", fontStyle: "italic" }}>
            15 questions. Approximately 4 minutes.
          </p>
        </div>
      )}

      {/* ── QUESTIONS ─────────────────────────────────── */}
      {phase === "questions" && currentQ < 14 && (
        <div style={{ ...wrap, paddingTop: "100px", paddingBottom: "80px" }}>
          {/* Category progress */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", alignItems: "center" }}>
            {CATEGORIES.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: i < currentCatIdx ? "#C5A059" : i === currentCatIdx ? "#C5A059" : "rgba(255,255,255,0.2)",
                  opacity: i === currentCatIdx ? 1 : i < currentCatIdx ? 0.6 : 0.3,
                }} />
                {i < 4 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)" }} />}
              </div>
            ))}
            <span style={{ fontSize: "0.728rem", color: "var(--text-subtle)", marginLeft: "0.5rem" }}>
              {currentCatIdx + 1} of 5
            </span>
          </div>

          <p style={{
            fontSize: "0.672rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "2rem",
          }}>
            {CATEGORIES[currentCatIdx].full} — {CATEGORIES[currentCatIdx].key}
          </p>

          <p style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 600,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#FFFFFF",
            lineHeight: 1.55, marginBottom: "2.5rem", maxWidth: 540,
          }}>
            {QUESTIONS[currentQ].text}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {QUESTIONS[currentQ].options.map((opt, i) => {
              const isSelected = selected === opt.score && answers.length === currentQ;
              return (
                <button
                  key={i}
                  data-testid={`reach-option-${i}`}
                  onClick={() => handleOptionSelect(opt.score, currentQ)}
                  style={{
                    background: isSelected ? "rgba(197,160,89,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isSelected ? "#C5A059" : "rgba(255,255,255,0.12)"}`,
                    color: isSelected ? "#C5A059" : "var(--text-muted)",
                    fontFamily: "'Inter', sans-serif", fontSize: "0.98rem",
                    padding: "1.1rem 1.5rem", textAlign: "left", cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor = "rgba(197,160,89,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }
                  }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          <p style={{ fontSize: "0.728rem", color: "rgba(255,255,255,0.3)", marginTop: "2rem" }}>
            Question {currentQ + 1} of 15
          </p>
        </div>
      )}

      {/* ── INSIGHT ───────────────────────────────────── */}
      {phase === "insight" && insightIdx !== null && (
        <div style={{ ...wrap, paddingTop: "120px", paddingBottom: "80px" }}>
          <div style={{ borderLeft: "2px solid #C5A059", paddingLeft: "1.5rem", maxWidth: 480 }}>
            <p style={{
              fontFamily: "'Manrope', sans-serif", fontSize: "1.12rem",
              color: "var(--text-muted)", lineHeight: 1.8, fontStyle: "italic",
            }}>
              {CATEGORY_INSIGHTS[insightIdx]}
            </p>
          </div>
        </div>
      )}

      {/* ── OPEN TEXT (Q15) ───────────────────────────── */}
      {phase === "open" && (
        <div style={{ ...wrap, paddingTop: "100px", paddingBottom: "80px" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", alignItems: "center" }}>
            {CATEGORIES.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#C5A059", opacity: i === 4 ? 1 : 0.5,
                }} />
                {i < 4 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)" }} />}
              </div>
            ))}
            <span style={{ fontSize: "0.728rem", color: "var(--text-subtle)", marginLeft: "0.5rem" }}>5 of 5</span>
          </div>

          <p style={{
            fontSize: "0.672rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "2rem",
          }}>
            HUSTLE CHECK — H
          </p>

          <p style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 600,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#FFFFFF",
            lineHeight: 1.55, marginBottom: "2rem", maxWidth: 540,
          }}>
            What concerns you most about starting a trucking operation?
          </p>

          <textarea
            data-testid="reach-open-input"
            value={openAnswer}
            onChange={(e) => setOpenAnswer(e.target.value)}
            placeholder="Share your honest answer. This helps us send you the right preparation resources."
            rows={4}
            style={{
              width: "100%", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif", fontSize: "0.98rem",
              padding: "1rem 1.25rem", resize: "vertical", boxSizing: "border-box",
              marginBottom: "1.5rem", outline: "none",
            }}
          />

          <button
            data-testid="reach-open-submit"
            onClick={handleOpenSubmit}
            style={{
              minHeight: 52, background: "#C5A059", color: "#002244", border: "none",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.98rem",
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              padding: "1rem 2.5rem", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C5A059")}
          >
            Complete Assessment
          </button>
          <p style={{ fontSize: "0.728rem", color: "rgba(255,255,255,0.3)", marginTop: "1rem" }}>
            Question 15 of 15
          </p>
        </div>
      )}

      {/* ── ANALYZING ─────────────────────────────────── */}
      {phase === "analyzing" && (
        <div style={{ ...wrap, paddingTop: "140px", paddingBottom: "80px", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "1.232rem", color: "#FFFFFF", marginBottom: "2.5rem",
          }}>
            Analyzing Your Operational Readiness
          </p>
          <div style={{ textAlign: "left", maxWidth: 280, margin: "0 auto" }}>
            {CATEGORIES.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                marginBottom: "0.875rem",
                opacity: analyzedCats > i ? 1 : 0.2,
                transition: "opacity 0.3s ease",
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: analyzedCats > i ? "#C5A059" : "rgba(255,255,255,0.2)",
                }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-muted)" }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULTS ───────────────────────────────────── */}
      {phase === "results" && cfg && scores && (
        <div style={{ ...wrap, paddingTop: "100px", paddingBottom: "80px" }}>
          {/* Result label */}
          <div style={{
            display: "inline-block", border: `1px solid ${cfg.color}`,
            padding: "0.4rem 0.875rem", marginBottom: "2rem",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700,
              fontSize: "0.728rem", letterSpacing: "0.16em",
              textTransform: "uppercase", color: cfg.color, margin: 0,
            }}>
              {cfg.label}
            </p>
          </div>

          <h2 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#FFFFFF",
            lineHeight: 1.3, marginBottom: "1.5rem", maxWidth: 520,
          }}>
            {cfg.headline}
          </h2>

          <ul style={{ listStyle: "none", padding: 0, marginBottom: "2.5rem" }}>
            {cfg.bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: cfg.color, marginTop: "0.15rem", flexShrink: 0 }}>—</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {/* Risk Map */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem", marginBottom: "2.5rem" }}>
            <RiskMap scores={scores} animate={animateMap} />
            <p style={{ fontSize: "0.784rem", color: "var(--text-subtle)", fontStyle: "italic", marginTop: "0.75rem" }}>
              Total REACH score: {scores.total}/42
            </p>
          </div>

          {/* Email capture — after results, not before */}
          {!submitted ? (
            <div data-testid="reach-email-block" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem" }}>
              <p style={{
                fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "1.5rem",
              }}>
                Enter your email to receive your REACH assessment summary and preparation recommendations.
              </p>
              <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input
                  data-testid="reach-email-input"
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your operating email address"
                  style={{
                    padding: "1rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.98rem",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
                    color: "#FFFFFF", outline: "none", boxSizing: "border-box",
                  }}
                />
                <button
                  data-testid="reach-email-submit"
                  type="submit" disabled={loading}
                  style={{
                    minHeight: 52, background: "#C5A059", color: "#002244", border: "none",
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.98rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    cursor: loading ? "wait" : "pointer", padding: "1rem", opacity: loading ? 0.8 : 1,
                  }}
                >
                  {loading ? "Sending..." : "Send My Results"}
                </button>
              </form>
              <p style={{ fontSize: "0.784rem", color: "rgba(255,255,255,0.35)", marginTop: "0.875rem", fontStyle: "italic" }}>
                No sales sequence. Results and preparation resources only.
              </p>
            </div>
          ) : (
            <div data-testid="reach-confirmed" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem" }}>
              <div style={{ height: 2, background: "#C5A059", marginBottom: "1.5rem" }} />
              <p style={{ fontSize: "1.008rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
                {cfg.sub}
              </p>
              <Link
                to={cfg.ctaHref}
                style={{
                  display: "inline-block", minHeight: 52, background: "#C5A059", color: "#002244",
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.98rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  textDecoration: "none", padding: "1rem 2.5rem", lineHeight: "32px",
                }}
              >
                {cfg.cta}
              </Link>
            </div>
          )}
        </div>
      )}

      {["results", "intro"].includes(phase) && <FooterSection />}
    </div>
  );
}
