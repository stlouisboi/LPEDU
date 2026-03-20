import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { REACHTeaserSection } from "../components/REACHTeaserSection";

// ── Questions ────────────────────────────────────────────
const CATEGORIES = [
  { key: "R", label: "Resources", full: "RESOURCES" },
  { key: "E", label: "Experience", full: "EXPERIENCE" },
  { key: "A", label: "Authority Readiness", full: "AUTHORITY READINESS" },
  { key: "C", label: "Commitment", full: "COMMITMENT" },
  { key: "H", label: "Operational Discipline", full: "OPERATIONAL DISCIPLINE" },
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
    color: "#22c55e",
    rgb: "34,197,94",
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
    color: "#F59E0B",
    rgb: "245,158,11",
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
    color: "#f87171",
    rgb: "248,113,113",
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

// ── Category Gap Config ───────────────────────────────────
const CATEGORY_GAP_CONFIG = [
  {
    key: "r",
    code: "R",
    name: "RESOURCES",
    max: 9,
    feedback: {
      pass: "Your capital position appears sufficient for the implementation period.",
      warning: "Your score indicates limited capital runway. Most new authorities need 3–6 months of operating reserves before consistent revenue arrives.",
      critical: "Your score indicates significant financial constraints. Operating authority without adequate reserves dramatically increases early failure risk.",
    },
  },
  {
    key: "e",
    code: "E",
    name: "EXPERIENCE",
    max: 9,
    feedback: {
      pass: "Your operational background appears sufficient.",
      warning: "Your score indicates limited industry experience. Consider whether you have access to experienced operational support before launch.",
      critical: "Your score indicates minimal trucking or compliance experience. The learning curve for new authority is steep without operational background.",
    },
  },
  {
    key: "a",
    code: "A",
    name: "AUTHORITY READINESS",
    max: 9,
    feedback: {
      pass: "Registration and filing status appears aligned.",
      warning: "Your score indicates incomplete authority setup. Verify USDOT, MC, BOC-3, and insurance filings are complete before operating.",
      critical: "Your score indicates authority is not properly established. Complete all registration and filing requirements before proceeding.",
    },
  },
  {
    key: "c",
    code: "C",
    name: "COMMITMENT",
    max: 9,
    feedback: {
      pass: "Your commitment level and operational discipline appear sufficient.",
      warning: "Your score indicates limited time availability or conditional commitment. This increases implementation risk during the first 90 days.",
      critical: "Your score indicates minimal commitment to ongoing compliance management. The Standard requires consistent attention — especially in the first 90 days.",
    },
  },
  {
    key: "h",
    code: "H",
    name: "OPERATIONAL DISCIPLINE",
    max: 6,
    feedback: {
      pass: "Risk understanding and contingency planning appear adequate.",
      warning: "Your score indicates gaps in operational planning. Ground 0 content directly addresses timeline and contingency planning.",
      critical: "Your score indicates significant gaps in operational discipline. Review Ground 0 materials carefully before proceeding.",
    },
  },
];

function getGapStatus(score, max) {
  const pct = score / max;
  if (pct >= 0.78) return "pass";
  if (pct >= 0.44) return "warning";
  return "critical";
}

const STATUS_STYLE = {
  pass:     { color: "#22c55e", icon: "✓", border: "rgba(34,197,94,0.15)",    bg: "rgba(34,197,94,0.03)"    },
  warning:  { color: "#F59E0B", icon: "⚠", border: "rgba(245,158,11,0.3)",   bg: "rgba(245,158,11,0.04)"   },
  critical: { color: "#ef4444", icon: "✗", border: "rgba(239,68,68,0.3)",    bg: "rgba(239,68,68,0.04)"    },
};

function CategoryBreakdown({ scores }) {
  const mono = "'IBM Plex Mono', monospace";
  const sans = "'Atkinson Hyperlegible', sans-serif";
  return (
    <div data-testid="category-breakdown" style={{ marginBottom: "2.5rem" }}>
      <p style={{
        fontFamily: mono, fontSize: "0.616rem", fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: "rgba(212,144,10,0.65)", marginBottom: "1.25rem",
      }}>
        CATEGORY BREAKDOWN
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {CATEGORY_GAP_CONFIG.map((cat) => {
          const score = scores[cat.key];
          const status = getGapStatus(score, cat.max);
          const s = STATUS_STYLE[status];
          return (
            <div
              key={cat.key}
              data-testid={`gap-card-${cat.key}`}
              style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                padding: "0.875rem 1.25rem",
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: status === "pass" ? "0.25rem" : "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ fontFamily: mono, fontSize: "0.9rem", color: "#d4900a", fontWeight: 700 }}>
                    {cat.code}
                  </span>
                  <span style={{ fontFamily: mono, fontSize: "0.504rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    — {cat.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: mono, fontSize: "0.784rem", color: s.color, fontWeight: 700 }}>
                    {score}/{cat.max}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: s.color, lineHeight: 1 }}>
                    {s.icon}
                  </span>
                </div>
              </div>
              {/* Feedback */}
              <p style={{
                fontFamily: sans,
                fontSize: status === "pass" ? "0.868rem" : "0.924rem",
                color: status === "pass" ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.72)",
                lineHeight: 1.6,
                margin: 0,
                fontStyle: status === "pass" ? "italic" : "normal",
              }}>
                {cat.feedback[status]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Returns display names of flagged (warning/critical) categories
function getFlaggedNames(scores) {
  return CATEGORY_GAP_CONFIG
    .filter((cat) => getGapStatus(scores[cat.key], cat.max) !== "pass")
    .map((cat) => cat.name.charAt(0) + cat.name.slice(1).toLowerCase());
}

// Result-specific CTA rows
function ResultCTAs({ result }) {
  const sans = "'Atkinson Hyperlegible', sans-serif";
  const btnBase = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    minHeight: 48, fontFamily: sans, fontWeight: 700,
    fontSize: "0.868rem", letterSpacing: "0.08em",
    textTransform: "uppercase", textDecoration: "none",
    padding: "0.875rem 1.75rem", transition: "background 0.2s",
  };
  if (result === "GO") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link
          to="/launchpath-standard"
          data-testid="cta-proceed-standard"
          style={{ ...btnBase, background: "#d4900a", color: "#000F1F" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
        >
          Proceed to the 90-Day Standard →
        </Link>
        <Link
          to="/ground-0-briefing"
          data-testid="cta-begin-ground-0"
          style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.20)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Review Ground 0 First
        </Link>
      </div>
    );
  }
  if (result === "WAIT") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        <Link
          to="/ground-0-briefing"
          data-testid="cta-begin-ground-0"
          style={{ ...btnBase, background: "#d4900a", color: "#000F1F" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
        >
          Begin Ground 0 →
        </Link>
        <button
          data-testid="cta-retake"
          onClick={() => window.location.reload()}
          style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Retake Assessment
        </button>
        <Link
          to="/contact"
          data-testid="cta-contact"
          style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.45)", padding: "0.875rem 0.5rem", fontSize: "0.84rem" }}
        >
          Contact →
        </Link>
      </div>
    );
  }
  // NO-GO
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
      <Link
        to="/ground-0-briefing"
        data-testid="cta-begin-ground-0"
        style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.25)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        Review Ground 0 Materials
      </Link>
      <Link
        to="/contact"
        data-testid="cta-contact"
        style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.45)", padding: "0.875rem 0.5rem", fontSize: "0.84rem" }}
      >
        Contact →
      </Link>
    </div>
  );
}


// ── Risk Map ─────────────────────────────────────────────
function RiskMap({ scores, animate }) {
  const rows = [
    { label: "Resources", val: scores.r, max: 9 },
    { label: "Experience", val: scores.e, max: 9 },
    { label: "Authority Readiness", val: scores.a, max: 9 },
    { label: "Commitment", val: scores.c, max: 9 },
    { label: "Operational Discipline", val: scores.h, max: 6 },
  ];

  return (
    <div data-testid="risk-map" style={{ marginBottom: "2.5rem" }}>
      <p style={{
        fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.78rem", fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a",
        marginBottom: "1.25rem",
      }}>
        AUTHORITY RISK MAP
      </p>
      {rows.map((row) => {
        const pct = Math.round((row.val / row.max) * 100);
        const barColor = pct >= 78 ? "#d4900a" : pct >= 55 ? "#7A9BB5" : "#6B7A82";
        return (
          <div key={row.label} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem", color: "var(--text-muted)" }}>
                {row.label}
              </span>
              <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.924rem", fontWeight: 600, color: barColor }}>
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
    <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", background: "#0d1c30", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      {/* ── INTRO — full clinical diagnostic section ─── */}
      {phase === "intro" && (
        <REACHTeaserSection onBegin={() => setPhase("questions")} />
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
                  background: i < currentCatIdx ? "#d4900a" : i === currentCatIdx ? "#d4900a" : "rgba(255,255,255,0.2)",
                  opacity: i === currentCatIdx ? 1 : i < currentCatIdx ? 0.6 : 0.3,
                }} />
                {i < 4 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)" }} />}
              </div>
            ))}
            <span style={{ fontSize: "0.875rem", color: "var(--text-subtle)", marginLeft: "0.5rem" }}>
              {currentCatIdx + 1} of 5
            </span>
          </div>

          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#d4900a", marginBottom: "2rem",
          }}>
            {CATEGORIES[currentCatIdx].full} — {CATEGORIES[currentCatIdx].key}
          </p>

          <p style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 600,
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
                    background: isSelected ? "rgba(212,144,10,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isSelected ? "#d4900a" : "rgba(255,255,255,0.12)"}`,
                    color: isSelected ? "#d4900a" : "var(--text-muted)",
                    fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.05rem",
                    padding: "1.1rem 1.5rem", textAlign: "left", cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor = "rgba(212,144,10,0.4)";
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

          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.38)", marginTop: "2rem", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.06em" }}>
            {CATEGORIES[currentCatIdx].full}
          </p>
        </div>
      )}

      {/* ── INSIGHT ───────────────────────────────────── */}
      {phase === "insight" && insightIdx !== null && (
        <div style={{ ...wrap, paddingTop: "120px", paddingBottom: "80px" }}>
          <div style={{ borderLeft: "2px solid #d4900a", paddingLeft: "1.5rem", maxWidth: 480 }}>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontSize: "1.12rem",
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
                  background: "#d4900a", opacity: i === 4 ? 1 : 0.5,
                }} />
                {i < 4 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)" }} />}
              </div>
            ))}
            <span style={{ fontSize: "0.875rem", color: "var(--text-subtle)", marginLeft: "0.5rem" }}>5 of 5</span>
          </div>

          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#d4900a", marginBottom: "2rem",
          }}>
            OPERATIONAL DISCIPLINE — H
          </p>

          <p style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 600,
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
              fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1.05rem",
              padding: "1rem 1.25rem", resize: "vertical", boxSizing: "border-box",
              marginBottom: "1.5rem", outline: "none",
            }}
          />

          <button
            data-testid="reach-open-submit"
            onClick={handleOpenSubmit}
            style={{
              minHeight: 52, background: "#d4900a", color: "#0b1628", border: "none",
              fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "1.05rem",
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              padding: "1rem 2.5rem", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
          >
            Complete Assessment
          </button>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.38)", marginTop: "1rem", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.06em" }}>
            OPERATIONAL DISCIPLINE — FINAL QUESTION
          </p>
        </div>
      )}

      {/* ── ANALYZING ─────────────────────────────────── */}
      {phase === "analyzing" && (
        <div style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "#000A14",
          minHeight: "calc(100vh - 64px)",
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 1.5rem" }}>

            {/* System header */}
            <div style={{ marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(212,144,10,0.15)" }}>
              <p style={{
                fontSize: "0.504rem",
                color: "rgba(212,144,10,0.6)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "0.625rem",
              }}>
                LPOS v1.0 | LP-MOD-REACH | DIAGNOSTIC_ENGINE_v1
              </p>
              <p style={{
                fontSize: "0.896rem",
                color: "#FFFFFF",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                DIAGNOSTIC ENGINE RUNNING
              </p>
            </div>

            {/* Status line with blink */}
            <p className="scan-blink" style={{
              fontSize: "0.672rem",
              color: "#22c55e",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              SYSTEM_SCAN_IN_PROGRESS...
            </p>

            {/* Progress bar */}
            <div style={{
              background: "rgba(255,255,255,0.06)",
              height: 2,
              marginBottom: "2.5rem",
              overflow: "hidden",
            }}>
              <div style={{
                background: "#d4900a",
                height: "100%",
                width: `${Math.round((analyzedCats / 5) * 100)}%`,
                transition: "width 0.38s ease",
              }} />
            </div>

            {/* Category scan entries */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CATEGORIES.map((c, i) => {
                const state = analyzedCats > i ? "done" : analyzedCats === i ? "scanning" : "pending";
                return (
                  <div key={i} style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "0.875rem 0",
                    borderBottom: i < CATEGORIES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    opacity: state === "pending" ? 0.3 : 1,
                    transition: "opacity 0.35s ease",
                  }}>
                    <span style={{
                      fontSize: "0.784rem",
                      color: state === "done" ? "#22c55e" : state === "scanning" ? "#d4900a" : "rgba(255,255,255,0.25)",
                      fontWeight: 700,
                      minWidth: 14,
                    }}>
                      {state === "done" ? "✓" : state === "scanning" ? "◉" : "○"}
                    </span>
                    <span style={{
                      fontSize: "0.616rem",
                      color: state === "done" ? "rgba(255,255,255,0.85)" : state === "scanning" ? "#d4900a" : "rgba(255,255,255,0.3)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {state === "done" ? "ANALYZED" : state === "scanning" ? "SCANNING..." : "PENDING"} — {c.full}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer note */}
            <p style={{
              fontSize: "0.448rem",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "2.5rem",
              lineHeight: 1.9,
            }}>
              ASSESSMENT_ID: LP-ASSESS-REACH-v1{"\n"}
              DO_NOT_CLOSE_WINDOW — PROCESSING
            </p>
          </div>

          <style>{`
            @keyframes scan-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.15; } }
            .scan-blink { animation: scan-blink 1.1s steps(1) infinite; }
          `}</style>
        </div>
      )}

      {/* ── RESULTS ───────────────────────────────────── */}
      {phase === "results" && cfg && scores && (
        <div style={{ background: "#000A14", minHeight: "calc(100vh - 64px)", paddingBottom: "80px" }}>

          {/* Status Banner */}
          <div style={{
            borderBottom: `3px solid ${cfg.color}`,
            background: `rgba(${cfg.rgb}, 0.04)`,
            padding: "3rem 1.5rem 2.5rem",
          }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.504rem",
                color: "rgba(212,144,10,0.55)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}>
                LPOS v1.0 | LP-MOD-REACH | ASSESSMENT COMPLETE
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
                <div style={{
                  border: `1px solid ${cfg.color}`,
                  background: `rgba(${cfg.rgb}, 0.1)`,
                  padding: "0.5rem 1.25rem",
                }}>
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 700,
                    fontSize: "0.784rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: cfg.color,
                    margin: 0,
                  }}>
                    {cfg.label}
                  </p>
                </div>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.616rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  REACH SCORE: {scores.total} / 42
                </p>
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                color: "#FFFFFF",
                lineHeight: 1.35,
                maxWidth: 560,
                marginBottom: "1.75rem",
              }}>
                {cfg.headline}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {cfg.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: cfg.color,
                      fontSize: "0.672rem",
                      marginTop: "0.25rem",
                      flexShrink: 0,
                      fontWeight: 700,
                    }}>—</span>
                    <span style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      fontSize: "1.008rem",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.7,
                    }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Map + Email */}
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

            {/* Category Breakdown */}
            <div style={{ marginBottom: "2.5rem" }}>
              <CategoryBreakdown scores={scores} />
            </div>

            {/* ── Authority Risk Map ── */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "1.5rem",
              }}>
                AUTHORITY RISK MAP
              </p>
              <RiskMap scores={scores} animate={animateMap} />
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem",
                color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em",
                textTransform: "uppercase", marginTop: "1rem",
              }}>
                {scores.total >= 33 ? "GO THRESHOLD MET — PROCEED TO GROUND 0"
                  : scores.total >= 22 ? "WAIT THRESHOLD — GAPS IDENTIFIED"
                  : "NO-GO THRESHOLD — CRITICAL GAPS DETECTED"}
              </p>
            </div>

            {/* ── Issue 1: Result-specific bridge CTA — immediately below risk map ── */}
            {result === "GO" && (
              <div style={{
                borderLeft: "3px solid #d4900a",
                background: "rgba(212,144,10,0.05)",
                border: "1px solid rgba(212,144,10,0.22)",
                padding: "1.75rem 1.75rem",
                marginBottom: "2.5rem",
              }}>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.60rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)",
                  marginBottom: "0.875rem",
                }}>NEXT STEP — QUALIFIED OPERATOR</p>
                <p style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem",
                  color: "rgba(255,255,255,0.80)", lineHeight: 1.80, marginBottom: "1.5rem",
                }}>
                  {scores.a < 9
                    ? `Your Authority Readiness score shows ${9 - scores.a} point${9 - scores.a > 1 ? "s" : ""} of exposure — the most commonly cited gaps in new entrant audits. The LaunchPath Standard closes this in Weeks 3–6.`
                    : "Your assessment indicates strong readiness across all five categories. The LaunchPath Standard installs the compliance infrastructure that maintains this through the full audit window."}
                </p>
                <a
                  href="/launchpath-standard"
                  data-testid="cta-standard-direct"
                  style={{
                    display: "inline-block", background: "#d4900a", color: "#0b1628",
                    fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.875rem",
                    letterSpacing: "0.09em", textTransform: "uppercase", textDecoration: "none",
                    padding: "1rem 2rem", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                  onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
                >
                  PROCEED TO THE 90-DAY STANDARD →
                </a>
              </div>
            )}

            {result === "WAIT" && (() => {
              const flagged = getFlaggedNames(scores);
              return (
                <div style={{
                  borderLeft: "3px solid rgba(245,158,11,0.60)",
                  background: "rgba(245,158,11,0.04)",
                  border: "1px solid rgba(245,158,11,0.20)",
                  padding: "1.75rem 1.75rem",
                  marginBottom: "2.5rem",
                }}>
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.60rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,158,11,0.65)",
                    marginBottom: "0.875rem",
                  }}>NEXT STEP — CLOSE THE GAPS FIRST</p>
                  <p style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem",
                    color: "rgba(255,255,255,0.75)", lineHeight: 1.80, marginBottom: "1.5rem",
                  }}>
                    {flagged.length > 0
                      ? `Your ${flagged.join(", ")} score${flagged.length > 1 ? "s indicate" : " indicates"} gaps that should be addressed before the Standard begins. Ground 0 gives you the framework. The 16 Deadly Sins shows the specific behaviors to resolve.`
                      : "Your assessment indicates areas that should be strengthened before implementation begins. Ground 0 provides the preparation framework."}
                  </p>
                  <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                    <a href="/16-deadly-sins" data-testid="cta-wait-sins"
                      style={{ display: "inline-block", background: "#F59E0B", color: "#0b1628", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.09em", textTransform: "uppercase", textDecoration: "none", padding: "0.875rem 1.5rem", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f7b731"}
                      onMouseLeave={e => e.currentTarget.style.background = "#F59E0B"}
                    >Review the 16 Deadly Sins →</a>
                    <a href="/ground-0-briefing" data-testid="cta-wait-ground0"
                      style={{ display: "inline-block", background: "transparent", color: "rgba(255,255,255,0.65)", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.09em", textTransform: "uppercase", textDecoration: "none", padding: "0.875rem 1.5rem", border: "1px solid rgba(255,255,255,0.20)", transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >Begin Ground 0</a>
                  </div>
                </div>
              );
            })()}

            {result === "NO-GO" && (
              <div style={{
                borderLeft: "3px solid rgba(248,113,113,0.50)",
                background: "rgba(248,113,113,0.04)",
                border: "1px solid rgba(248,113,113,0.18)",
                padding: "1.75rem 1.75rem",
                marginBottom: "2.5rem",
              }}>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.60rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(248,113,113,0.65)",
                  marginBottom: "0.875rem",
                }}>NEXT STEP — RESOLVE THE CONDITIONS FIRST</p>
                <p style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "1rem",
                  color: "rgba(255,255,255,0.72)", lineHeight: 1.80, marginBottom: "1.5rem",
                }}>
                  This result protects you from a preventable financial loss. The conditions that caused it are resolvable. The Knowledge Center contains the resources to address each one. Return when your score changes.
                </p>
                <a href="/knowledge-center" data-testid="cta-nogo-knowledge"
                  style={{ display: "inline-block", background: "transparent", color: "rgba(255,255,255,0.70)", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.09em", textTransform: "uppercase", textDecoration: "none", padding: "0.875rem 1.5rem", border: "1px solid rgba(255,255,255,0.22)", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >Explore the Knowledge Center →</a>
              </div>
            )}

            {/* Email capture */}
            {!submitted ? (
              <div data-testid="reach-email-block" style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "2rem",
              }}>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.56rem",
                  color: "rgba(212,144,10,0.65)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}>
                  RECEIVE YOUR RESULTS BRIEF
                </p>
                <p style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
                  fontSize: "1.008rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}>
                  Your full REACH summary — score breakdown, category feedback, and preparation resources — will arrive in your inbox within minutes.
                </p>
                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <input
                    data-testid="reach-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your operating email address"
                    style={{
                      padding: "1rem 1.25rem",
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      fontSize: "1rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    data-testid="reach-email-submit"
                    type="submit"
                    disabled={loading}
                    style={{
                      minHeight: 52,
                      background: "#d4900a",
                      color: "#0b1628",
                      border: "none",
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.98rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: loading ? "wait" : "pointer",
                      padding: "1rem",
                      opacity: loading ? 0.8 : 1,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#D4B87A"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#d4900a"; }}
                  >
                    {loading ? "Sending..." : "Send My Results"}
                  </button>
                </form>
                <p style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "0.875rem",
                  fontStyle: "italic",
                }}>
                  No sales sequence. Results and preparation resources only.
                </p>
              </div>
            ) : (
              <div data-testid="reach-confirmed" style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "2rem",
              }}>
                <div style={{ height: 2, background: cfg.color, marginBottom: "1.5rem" }} />

                {/* What This Means — only for WAIT/NO-GO */}
                {result !== "GO" && (() => {
                  const flagged = getFlaggedNames(scores);
                  return (
                    <div style={{ marginBottom: "2rem" }}>
                      <p style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.616rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(212,144,10,0.65)",
                        marginBottom: "0.875rem",
                      }}>
                        WHAT THIS MEANS
                      </p>
                      {flagged.length > 0 && (
                        <p style={{
                          fontFamily: "'Atkinson Hyperlegible', sans-serif",
                          fontSize: "1.008rem",
                          color: "rgba(255,255,255,0.72)",
                          lineHeight: 1.75,
                          marginBottom: "1rem",
                        }}>
                          Your{" "}
                          {flagged.length === 1
                            ? flagged[0]
                            : flagged.slice(0, -1).join(", ") + " and " + flagged[flagged.length - 1]}{" "}
                          {flagged.length === 1 ? "score suggests" : "scores suggest"} areas that should be addressed before or during implementation.
                        </p>
                      )}
                      <p style={{
                        fontFamily: "'Atkinson Hyperlegible', sans-serif",
                        fontSize: "0.98rem",
                        color: "rgba(255,255,255,0.52)",
                        lineHeight: 1.7,
                        marginBottom: 0,
                      }}>
                        {cfg.sub}
                      </p>
                    </div>
                  );
                })()}

                {/* GO result simple message */}
                {result === "GO" && (
                  <p style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontSize: "1.008rem",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                  }}>
                    {cfg.sub}
                  </p>
                )}

                {/* Result-specific CTAs */}
                <ResultCTAs result={result} />
              </div>
            )}
          </div>
        </div>
      )}

      {["results", "intro"].includes(phase) && <FooterSection />}
    </div>
  );
}
