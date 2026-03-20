import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Questions ────────────────────────────────────────────
const CATEGORIES = [
  { key: "R", label: "Resources", full: "RESOURCES" },
  { key: "E", label: "Experience", full: "EXPERIENCE" },
  { key: "A", label: "Authority Readiness", full: "AUTHORITY READINESS" },
  { key: "C", label: "Commitment", full: "COMMITMENT" },
  { key: "H", label: "Operational Discipline", full: "OPERATIONAL DISCIPLINE" },
];

const QUESTIONS = [
  { cat: 0, text: "If your truck experiences a major repair within the first 60 days, do you currently have funds available to cover the repair without stopping operations?", options: [{ text: "Yes", score: 3 }, { text: "Possibly", score: 2 }, { text: "No", score: 1 }] },
  { cat: 0, text: "How many months of operating expenses could your business cover today without new freight revenue?", options: [{ text: "3+ months", score: 3 }, { text: "1–2 months", score: 2 }, { text: "Less than 30 days", score: 1 }] },
  { cat: 0, text: "Do you know your current cost per mile including insurance, fuel, maintenance, and fixed expenses?", options: [{ text: "Yes", score: 3 }, { text: "Rough estimate", score: 2 }, { text: "No", score: 1 }] },
  { cat: 1, text: "Have you previously worked in trucking operations, dispatch, or logistics?", options: [{ text: "Yes", score: 3 }, { text: "Limited exposure", score: 2 }, { text: "No", score: 1 }] },
  { cat: 1, text: "Do you understand how broker contracts, detention policies, and rate confirmations affect revenue?", options: [{ text: "Yes", score: 3 }, { text: "Somewhat", score: 2 }, { text: "Not yet", score: 1 }] },
  { cat: 1, text: "Have you personally managed or reviewed Hours of Service logs before?", options: [{ text: "Yes", score: 3 }, { text: "Some familiarity", score: 2 }, { text: "No", score: 1 }] },
  { cat: 2, text: "Do you currently have a documented Driver Qualification file prepared according to FMCSA requirements?", options: [{ text: "Yes", score: 3 }, { text: "Partially", score: 2 }, { text: "No", score: 1 }] },
  { cat: 2, text: "Are you enrolled in a Drug & Alcohol testing consortium?", options: [{ text: "Yes", score: 3 }, { text: "In progress", score: 2 }, { text: "No", score: 1 }] },
  { cat: 2, text: "Do you currently maintain vehicle inspection and maintenance documentation?", options: [{ text: "Yes", score: 3 }, { text: "Some records", score: 2 }, { text: "No", score: 1 }] },
  { cat: 3, text: "How many hours per week are you prepared to dedicate to managing compliance and operational systems?", options: [{ text: "15+ hours", score: 3 }, { text: "5–15 hours", score: 2 }, { text: "Minimal time", score: 1 }] },
  { cat: 3, text: "Which statement best reflects your mindset?", options: [{ text: "I want to build a stable long-term operation", score: 3 }, { text: "I want to try trucking and see what happens", score: 2 }, { text: "I'm hoping to make fast money", score: 1 }] },
  { cat: 3, text: "If compliance systems require significant time to maintain, how likely are you to maintain them consistently?", options: [{ text: "Very likely", score: 3 }, { text: "Somewhat likely", score: 2 }, { text: "Unlikely", score: 1 }] },
  { cat: 4, text: "What is your timeline for launching operations?", options: [{ text: "Within 60–90 days", score: 3 }, { text: "Already operating", score: 2 }, { text: "Immediately / as fast as possible", score: 1 }] },
  { cat: 4, text: "If your authority cannot generate profit in the first 90 days, what is your plan?", options: [{ text: "Maintain operations and stabilize", score: 3 }, { text: "Adjust strategy", score: 2 }, { text: "Shut down", score: 1 }] },
];

const CATEGORY_INSIGHTS = [
  "Many new authorities fail within the first 60 days due to unexpected repairs or delayed freight payments.",
  "Understanding broker contracts and HOS requirements before launch reduces early compliance exposure significantly.",
  "FMCSA inspectors regularly find Driver Qualification and Drug & Alcohol documentation gaps during new entrant audits.",
  "The carriers who survive the first year are not the most experienced. They are the most disciplined.",
  null,
];

const RESULT_CONFIG = {
  GO: {
    label: "OPERATIONAL READINESS: GO",
    color: "#22c55e",
    headline: "Your assessment indicates strong operational readiness.",
    bullets: [
      "Capital runway shows sufficient operational buffer.",
      "Compliance awareness is developing across key categories.",
      "Operational discipline indicators are positive.",
    ],
    cta: "Proceed to Standard Admission",
    ctaHref: "/portal",
    sub: "Ground 0 qualifies you for Standard admission. The next step is cohort placement.",
  },
  WAIT: {
    label: "OPERATIONAL READINESS: WAIT",
    color: "#fbbf24",
    headline: "Your assessment shows areas that should be strengthened before launching authority.",
    bullets: [
      "One or more REACH categories indicate fixable gaps.",
      "Proceeding without addressing these areas increases early failure risk.",
      "Review the relevant Operational Library briefs before activating authority.",
    ],
    cta: "Review the Operational Library",
    ctaHref: "/knowledge-center",
    sub: "Launching before gaps are resolved is the most common cause of first-year authority failure.",
  },
  "NO-GO": {
    label: "OPERATIONAL READINESS: NO-GO",
    color: "#f87171",
    headline: "Based on your responses, launching authority right now would create significant risk.",
    bullets: [
      "Multiple REACH categories indicate critical operational gaps.",
      "Authorities launched under these conditions face predictable failure within 90 days.",
      "LaunchPath will be here when the conditions are right.",
    ],
    cta: "Review the Recovery Path",
    ctaHref: "/knowledge-center/authority-reinstatement-brief",
    sub: "This result protects you from a preventable financial loss. It is not a rejection.",
  },
};

function RiskMap({ scores, animate }) {
  const rows = [
    { label: "Resources", val: scores.r, max: 9 },
    { label: "Experience", val: scores.e, max: 9 },
    { label: "Authority Readiness", val: scores.a, max: 9 },
    { label: "Commitment", val: scores.c, max: 9 },
    { label: "Operational Discipline", val: scores.h, max: 6 },
  ];
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "1.25rem" }}>
        AUTHORITY RISK MAP
      </p>
      {rows.map((row) => {
        const pct = Math.round((row.val / row.max) * 100);
        const barColor = pct >= 78 ? "#d4900a" : pct >= 55 ? "#7A9BB5" : "#6B7A82";
        return (
          <div key={row.label} style={{ marginBottom: "0.875rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)" }}>{row.label}</span>
              <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.825rem", fontWeight: 600, color: barColor }}>{row.val}/{row.max}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", height: 3 }}>
              <div style={{ background: barColor, height: "100%", width: animate ? `${pct}%` : "0%", transition: animate ? "width 1s ease" : "none" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function REACHAssessmentWidget({ onEmailCaptured }) {
  const [phase, setPhase] = useState("intro"); // intro|questions|open|insight|analyzing|results
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
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
  const navigate = useNavigate();

  useEffect(() => {
    if (phase !== "analyzing") return;
    let count = 0;
    const iv = setInterval(() => {
      count++;
      setAnalyzedCats(count);
      if (count >= 5) {
        clearInterval(iv);
        setTimeout(() => { setPhase("results"); setTimeout(() => setAnimateMap(true), 300); }, 700);
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
    return { r, e, a, c, h, total, outcome: total >= 33 ? "GO" : total >= 22 ? "WAIT" : "NO-GO" };
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
        setAnswers(newAnswers);
        setCurrentQ(14);
        setPhase("open");
      } else if (isLastInCategory && insight) {
        setAnswers(newAnswers);
        setInsightIdx(catIdx);
        setPhase("insight");
        setTimeout(() => { setPhase("questions"); setCurrentQ(qIdx + 1); setInsightIdx(null); }, 2200);
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
          email, result,
          total_score: scores.total,
          category_scores: { r: scores.r, e: scores.e, a: scores.a, c: scores.c, h: scores.h },
          open_response: openAnswer,
        }),
      });
      if (onEmailCaptured) onEmailCaptured(email);
    } catch { /* still confirm */ }
    setLoading(false);
    setSubmitted(true);
    // Auto-navigate to the completion page with the result after a brief moment
    setTimeout(() => {
      navigate(`/ground-0-complete?result=${result}`);
    }, 1800);
  };

  const currentCatIdx = phase === "questions" ? (QUESTIONS[currentQ]?.cat ?? 0) : 0;
  const cfg = result ? RESULT_CONFIG[result] : null;

  // ── Shared wrapper for all phases ─────────────────────
  const box = { paddingTop: "2rem", paddingBottom: "0.5rem" };

  // ── INTRO ─────────────────────────────────────────────
  if (phase === "intro") return (
    <div style={box}>
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "1.25rem" }}>
        THE REACH ASSESSMENT — G0-6 INLINE
      </p>
      <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.8, marginBottom: "0.875rem", maxWidth: 500 }}>
        15 questions across five operational readiness categories. Approximately 4 minutes.
      </p>
      <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 500 }}>
        Your result — GO, WAIT, or NO-GO — will appear here when the assessment is complete.
      </p>
      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <div key={c.key}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.875rem", fontWeight: 700, color: "#d4900a" }}>{c.key}</p>
            <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.784rem", color: "rgba(255,255,255,0.60)" }}>{c.label}</p>
          </div>
        ))}
      </div>
      <button
        data-testid="widget-reach-start"
        onClick={() => setPhase("questions")}
        style={{
          background: "#d4900a", color: "#0b1628", border: "none",
          fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.875rem",
          letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          padding: "0.875rem 2rem", minHeight: 48, transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
      >
        Run the Diagnostic
      </button>
    </div>
  );

  // ── QUESTIONS ─────────────────────────────────────────
  if (phase === "questions" && currentQ < 14) return (
    <div style={box}>
      {/* Category dots */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.75rem", alignItems: "center" }}>
        {CATEGORIES.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: i <= currentCatIdx ? "#d4900a" : "rgba(255,255,255,0.2)", opacity: i === currentCatIdx ? 1 : i < currentCatIdx ? 0.55 : 0.25 }} />
            {i < 4 && <div style={{ width: 18, height: 1, background: "rgba(255,255,255,0.1)" }} />}
          </div>
        ))}
        <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.784rem", color: "rgba(255,255,255,0.55)", marginLeft: "0.4rem" }}>{currentCatIdx + 1} of 5</span>
      </div>

      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "1.5rem" }}>
        {CATEGORIES[currentCatIdx].full} — {CATEGORIES[currentCatIdx].key}
      </p>

      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#FFFFFF", lineHeight: 1.55, marginBottom: "2rem", maxWidth: 520 }}>
        {QUESTIONS[currentQ].text}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.25rem" }}>
        {QUESTIONS[currentQ].options.map((opt, i) => {
          const isSel = selected === opt.score && answers.length === currentQ;
          return (
            <button
              key={i}
              data-testid={`widget-option-${i}`}
              onClick={() => handleOptionSelect(opt.score, currentQ)}
              style={{
                background: isSel ? "rgba(212,144,10,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isSel ? "#d4900a" : "rgba(255,255,255,0.12)"}`,
                color: isSel ? "#d4900a" : "rgba(255,255,255,0.80)",
                fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem",
                padding: "0.875rem 1.25rem", textAlign: "left", cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (!isSel) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(212,144,10,0.4)"; }}}
              onMouseLeave={(e) => { if (!isSel) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.784rem", color: "rgba(255,255,255,0.45)" }}>
        Question {currentQ + 1} of 15
      </p>
    </div>
  );

  // ── INSIGHT ───────────────────────────────────────────
  if (phase === "insight" && insightIdx !== null) return (
    <div style={box}>
      <div style={{ borderLeft: "2px solid #d4900a", paddingLeft: "1.25rem", maxWidth: 460 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, fontStyle: "italic" }}>
          {CATEGORY_INSIGHTS[insightIdx]}
        </p>
      </div>
    </div>
  );

  // ── OPEN TEXT (Q15) ───────────────────────────────────
  if (phase === "open") return (
    <div style={box}>
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "1.5rem" }}>
        OPERATIONAL DISCIPLINE — H
      </p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#FFFFFF", lineHeight: 1.55, marginBottom: "1.75rem", maxWidth: 520 }}>
        What concerns you most about starting a trucking operation?
      </p>
      <textarea
        data-testid="widget-open-input"
        value={openAnswer}
        onChange={(e) => setOpenAnswer(e.target.value)}
        placeholder="Share your honest answer."
        rows={3}
        style={{
          width: "100%", background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF",
          fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem",
          padding: "0.875rem 1.125rem", resize: "vertical", boxSizing: "border-box",
          marginBottom: "1.25rem", outline: "none",
        }}
      />
      <button
        data-testid="widget-open-submit"
        onClick={handleOpenSubmit}
        style={{
          background: "#d4900a", color: "#0b1628", border: "none",
          fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.875rem",
          letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          padding: "0.875rem 2rem", minHeight: 48, transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
      >
        Complete Assessment
      </button>
      <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.784rem", color: "rgba(255,255,255,0.45)", marginTop: "0.75rem" }}>Question 15 of 15</p>
    </div>
  );

  // ── ANALYZING ─────────────────────────────────────────
  if (phase === "analyzing") return (
    <div style={{ ...box, textAlign: "center", paddingTop: "2.5rem" }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.12rem", color: "#FFFFFF", marginBottom: "2rem" }}>
        Analyzing Operational Readiness
      </p>
      <div style={{ textAlign: "left", maxWidth: 240, margin: "0 auto" }}>
        {CATEGORIES.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem", opacity: analyzedCats > i ? 1 : 0.2, transition: "opacity 0.3s ease" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: analyzedCats > i ? "#d4900a" : "rgba(255,255,255,0.2)" }} />
            <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.80)" }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── RESULTS ───────────────────────────────────────────
  if (phase === "results" && cfg && scores) return (
    <div style={box}>
      {/* Result badge */}
      <div style={{ display: "inline-block", border: `1px solid ${cfg.color}`, padding: "0.35rem 0.875rem", marginBottom: "1.5rem" }}>
        <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.784rem", letterSpacing: "0.16em", textTransform: "uppercase", color: cfg.color, margin: 0 }}>
          {cfg.label}
        </p>
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.12rem, 2.5vw, 1.5rem)", color: "#FFFFFF", lineHeight: 1.3, marginBottom: "1.25rem", maxWidth: 500 }}>
        {cfg.headline}
      </h3>

      <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
        {cfg.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: "0.625rem", marginBottom: "0.625rem", alignItems: "flex-start" }}>
            <span style={{ color: cfg.color, flexShrink: 0, marginTop: "0.1rem" }}>—</span>
            <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.925rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.7 }}>{b}</span>
          </li>
        ))}
      </ul>

      {/* Risk Map */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.75rem", marginBottom: "2rem" }}>
        <RiskMap scores={scores} animate={animateMap} />
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.616rem", color: "rgba(255,255,255,0.45)", marginTop: "0.5rem" }}>
          TOTAL REACH SCORE: {scores.total}/42
        </p>
      </div>

      {/* Email capture */}
      {!submitted ? (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.75rem" }}>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "1.25rem", maxWidth: 460 }}>
            Enter your email to receive your REACH summary and preparation recommendations.
          </p>
          <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.625rem", maxWidth: 420 }}>
            <input
              data-testid="widget-email-input"
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your operating email address"
              style={{
                padding: "0.875rem 1.125rem", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF", outline: "none", boxSizing: "border-box",
              }}
            />
            <button
              data-testid="widget-email-submit"
              type="submit" disabled={loading}
              style={{
                minHeight: 48, background: "#d4900a", color: "#0b1628", border: "none",
                fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.875rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: loading ? "wait" : "pointer", opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? "Sending..." : "Send My Results"}
            </button>
          </form>
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.784rem", color: "rgba(255,255,255,0.50)", marginTop: "0.75rem", fontStyle: "italic" }}>
            No sales sequence. Results and preparation resources only.
          </p>
        </div>
      ) : (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.75rem" }}>
          <div style={{ height: 2, background: "#d4900a", marginBottom: "1.25rem", maxWidth: 420 }} />
          <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "0.98rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: 460 }}>
            {cfg.sub}
          </p>
          <Link
            to={cfg.ctaHref}
            data-testid="widget-result-cta"
            style={{
              display: "inline-block", minHeight: 48, background: "#d4900a", color: "#0b1628",
              fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: "0.875rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", padding: "0.875rem 2rem",
            }}
          >
            {cfg.cta}
          </Link>
        </div>
      )}
    </div>
  );

  return null;
}
