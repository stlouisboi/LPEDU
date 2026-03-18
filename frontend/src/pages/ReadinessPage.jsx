import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { ArrowRight, ArrowLeft, CheckCircle } from "@phosphor-icons/react";

const QUESTIONS = [
  {
    section: "01 — Capital Position",
    question: "How much cash do you have available to start your trucking business?",
    options: [
      { letter: "A", text: "Less than $10,000", risk: "RED", score: 0 },
      { letter: "B", text: "$10,000 – $20,000", risk: "YELLOW", score: 1 },
      { letter: "C", text: "$20,000 – $35,000", risk: null, score: 2 },
      { letter: "D", text: "$35,000 – $50,000", risk: null, score: 3 },
      { letter: "E", text: "More than $50,000", risk: null, score: 4 },
    ],
  },
  {
    section: "02 — Reserve Runway",
    question: "How long can your household cover bills without business income?",
    options: [
      { letter: "A", text: "Less than 1 month", risk: "RED", score: 0 },
      { letter: "B", text: "1–2 months", risk: "YELLOW", score: 1 },
      { letter: "C", text: "3–4 months", risk: null, score: 2 },
      { letter: "D", text: "5–6 months", risk: null, score: 3 },
      { letter: "E", text: "More than 6 months", risk: null, score: 4 },
    ],
  },
  {
    section: "03 — Household Alignment",
    question: "Does your household support this decision?",
    options: [
      { letter: "A", text: "Haven't told them yet", risk: "YELLOW", score: 1 },
      { letter: "B", text: "They're against it", risk: "RED", score: 0 },
      { letter: "C", text: "They're okay with it", risk: null, score: 2 },
      { letter: "D", text: "They support it but we haven't planned together", risk: null, score: 3 },
      { letter: "E", text: "Fully aligned — we've discussed and planned together", risk: null, score: 4 },
    ],
  },
  {
    section: "04 — Time Capacity",
    question: "How many hours per week can you spend on admin and compliance?",
    options: [
      { letter: "A", text: "Less than 10 hours", risk: "RED", score: 0 },
      { letter: "B", text: "10–20 hours", risk: "YELLOW", score: 1 },
      { letter: "C", text: "20–30 hours", risk: null, score: 2 },
      { letter: "D", text: "30–40 hours", risk: null, score: 3 },
      { letter: "E", text: "40+ hours", risk: null, score: 4 },
    ],
  },
  {
    section: "05 — CDL Background",
    question: "What is your commercial driving background?",
    options: [
      { letter: "A", text: "Initial phase (Pre-CDL)", risk: "YELLOW", score: 1 },
      { letter: "B", text: "CDL, no driving record", risk: null, score: 2 },
      { letter: "C", text: "Less than 12 months driving", risk: null, score: 2 },
      { letter: "D", text: "1–3 years driving", risk: null, score: 3 },
      { letter: "E", text: "3+ years driving", risk: null, score: 4 },
    ],
  },
  {
    section: "06 — Regulatory Awareness",
    question: "How familiar are you with FMCSA audit requirements?",
    options: [
      { letter: "A", text: "I don't know what that means", risk: null, score: 0 },
      { letter: "B", text: "I've heard of it but haven't studied it", risk: null, score: 1 },
      { letter: "C", text: "I understand the basics", risk: null, score: 2 },
      { letter: "D", text: "I've researched it in detail", risk: null, score: 3 },
      { letter: "E", text: "I could explain it to someone else", risk: null, score: 4 },
    ],
  },
  {
    section: "07 — Risk Tolerance",
    question: "If you had a $5,000 unexpected expense in month two, what happens?",
    options: [
      { letter: "A", text: "I'd have to shut down", risk: "RED", score: 0 },
      { letter: "B", text: "It would be a serious problem", risk: "YELLOW", score: 1 },
      { letter: "C", text: "I'd figure it out somehow", risk: null, score: 2 },
      { letter: "D", text: "I have a plan for this", risk: null, score: 3 },
      { letter: "E", text: "That's already budgeted — I expect setbacks", risk: null, score: 4 },
    ],
  },
];

const RESULTS = {
  GO: {
    color: "var(--orange)",
    tagBg: "rgba(232,89,15,0.12)",
    tagBorder: "rgba(232,89,15,0.3)",
    headline: "Proceed to admission review.",
    body: "Your structural profile meets the minimum threshold for authority launch. The prerequisites are present. The next step is applying for the 90-Day Standard.",
    cta: { label: "Apply for the 90-Day Standard", href: "/contact" },
    cta2: { label: "View all 5 briefs", href: "/knowledge-center" },
  },
  WAIT: {
    color: "#d97706",
    tagBg: "rgba(217,119,6,0.12)",
    tagBorder: "rgba(217,119,6,0.3)",
    headline: "Remediate, then return.",
    body: "Your structural profile has flagged exposure points that could compromise your authority in the first 90 days. Address the yellow indicators below before returning.",
    cta: { label: "View the Knowledge Center", href: "/knowledge-center" },
    cta2: { label: "Contact the Station Custodian", href: "/contact" },
  },
  STOP: {
    color: "#ef4444",
    tagBg: "rgba(239,68,68,0.12)",
    tagBorder: "rgba(239,68,68,0.3)",
    headline: "Do not proceed.",
    body: "The structural prerequisites for a viable authority are not currently in place. Proceeding now creates terminal risk. Review the flagged areas carefully before returning.",
    cta: { label: "Contact the Station Custodian", href: "/contact" },
    cta2: { label: "View the Knowledge Center", href: "/knowledge-center" },
  },
};

function calcResult(answers) {
  const totalScore = answers.reduce((s, a) => s + (a?.score ?? 0), 0);
  const hasRed = answers.some(a => a?.risk === "RED");
  const yellowCount = answers.filter(a => a?.risk === "YELLOW").length;
  if (hasRed || totalScore < 12) return "STOP";
  if (totalScore < 20 || yellowCount >= 2) return "WAIT";
  return "GO";
}

export default function ReadinessPage() {
  const [phase, setPhase] = useState("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(7).fill(null));
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [consented, setConsented] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const progress = Math.round(((currentQ) / 7) * 100);

  const selectAnswer = (opt) => {
    setSelected(opt);
    const newAnswers = [...answers];
    newAnswers[currentQ] = opt;
    setAnswers(newAnswers);
    setTimeout(() => {
      setSelected(null);
      if (currentQ < 6) {
        setCurrentQ(currentQ + 1);
      } else {
        setPhase("email-gate");
      }
    }, 320);
  };

  const goBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(null);
    } else {
      setPhase("landing");
    }
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    if (!consented) return;
    setSubmitting(true);
    const r = calcResult(answers);
    const score = answers.reduce((s, a) => s + (a?.score ?? 0), 0);
    const red_count = answers.filter(a => a?.risk === "RED").length;
    const yellow_count = answers.filter(a => a?.risk === "YELLOW").length;

    try {
      const API = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${API}/api/diagnostic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, score, result: r, red_count, yellow_count }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Still show result even if MailerLite call fails
    }
    setResult(r);
    setPhase("result");
    setSubmitting(false);
  };

  const wrap = (children) => (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 7rem" }}>
        {children}
      </main>
      <FooterSection />
    </div>
  );

  // ── Landing ──────────────────────────────────────
  if (phase === "landing") return wrap(
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "4rem", alignItems: "start" }} className="readiness-grid">
      <div>
        <p className="overline" style={{ marginBottom: "1.5rem" }}>Ground 0 Briefing // REACH Assessment</p>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1.0,
          color: "var(--text)", marginBottom: "1.75rem", animation: "heroEnter 0.65s ease both",
        }}>
          Carrier<br />
          <span style={{ color: "var(--orange)" }}>Diagnostic</span>
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
          Before you file for authority, identify the exposure points that could end your operation in the first 90 days.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "var(--text-subtle)", marginBottom: "2rem" }}>
          This assessment takes approximately 3 minutes.
        </p>
        <div style={{ borderLeft: "2px solid var(--orange)", paddingLeft: "1.25rem", marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.25rem" }}>Accuracy over ambition.</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "var(--text-subtle)" }}>Your result — GO, WAIT, or STOP — is only useful if it reflects reality.</p>
        </div>
        <button
          data-testid="begin-diagnostic-btn"
          onClick={() => { setPhase("questions"); setCurrentQ(0); }}
          style={{
            background: "var(--orange)", color: "#fff", border: "none",
            fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: "0.98rem", letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "1rem 2rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
        >
          Begin Ground 0 Briefing <ArrowRight size={15} weight="bold" />
        </button>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", color: "var(--text-subtle)", marginTop: "0.75rem" }}>Free. No commitment required.</p>
      </div>

      {/* Section panel */}
      <div style={{ border: "1px solid var(--border)", background: "var(--bg-2)", padding: "1.5rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.672rem", color: "var(--text-subtle)", letterSpacing: "0.12em", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
          REACH ASSESSMENT // 7 SECTIONS
        </p>
        {QUESTIONS.map((q, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.6rem 0", borderBottom: i < 6 ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.672rem", color: "var(--orange)", letterSpacing: "0.08em" }}>0{i + 1}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)" }}>{q.section.split(" — ")[1]}</span>
          </div>
        ))}
        <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.672rem", color: "var(--text-subtle)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>DECISION OUTCOMES</p>
          {[["GO", "var(--orange)", "Proceed to admission"], ["WAIT", "#d97706", "Remediate, then return"], ["STOP", "#ef4444", "Do not proceed"]].map(([label, color, desc]) => (
            <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline", padding: "0.4rem 0" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color, fontWeight: 700, minWidth: 36 }}>{label}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.874rem", color: "var(--text-subtle)" }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .readiness-grid { grid-template-columns: 1fr !important; } .readiness-grid > div:last-child { display: none; } }`}</style>
    </div>
  );

  // ── Questions ──────────────────────────────────────
  if (phase === "questions") {
    const q = QUESTIONS[currentQ];
    return wrap(
      <div>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--orange)", letterSpacing: "0.12em" }}>
              QUESTION {currentQ + 1} OF 7
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)" }}>
              {Math.round(((currentQ + 1) / 7) * 100)}%
            </p>
          </div>
          {/* Segmented progress bar */}
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{
                flex: 1, height: 3,
                background: i <= currentQ ? "var(--orange)" : "var(--border)",
                opacity: i < currentQ ? 0.5 : 1,
              }} />
            ))}
          </div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text-subtle)", letterSpacing: "0.1em", marginTop: "0.5rem" }}>
            {q.section.toUpperCase()}
          </p>
        </div>

        {/* Question */}
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em",
          lineHeight: 1.15, color: "var(--text)", marginBottom: "2.5rem",
          textTransform: "uppercase",
        }}>
          {q.question}
        </h2>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {q.options.map((opt) => {
            const isSelected = answers[currentQ]?.letter === opt.letter || selected?.letter === opt.letter;
            return (
              <button
                key={opt.letter}
                data-testid={`answer-${opt.letter}`}
                onClick={() => selectAnswer(opt)}
                style={{
                  background: isSelected ? "rgba(232,89,15,0.08)" : "var(--bg-2)",
                  border: isSelected ? "1px solid var(--orange)" : "1px solid var(--border)",
                  padding: "1rem 1.25rem",
                  display: "flex", alignItems: "center", gap: "1rem",
                  cursor: "pointer", width: "100%", textAlign: "left",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = "var(--bg-3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; } }}
                onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = "var(--bg-2)"; e.currentTarget.style.borderColor = "var(--border)"; } }}
              >
                <span style={{
                  width: 28, height: 28, border: `1px solid ${isSelected ? "var(--orange)" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.784rem",
                  color: isSelected ? "var(--orange)" : "var(--text-subtle)", flexShrink: 0,
                }}>{opt.letter}</span>
                <span style={{ flex: 1, fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text)", lineHeight: 1.5 }}>{opt.text}</span>
                {opt.risk && (
                  <span style={{
                    background: opt.risk === "RED" ? "rgba(239,68,68,0.12)" : "rgba(217,119,6,0.12)",
                    color: opt.risk === "RED" ? "#ef4444" : "#d97706",
                    border: `1px solid ${opt.risk === "RED" ? "rgba(239,68,68,0.25)" : "rgba(217,119,6,0.25)"}`,
                    padding: "0.2rem 0.6rem",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em",
                    flexShrink: 0,
                  }}>{opt.risk}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Back */}
        <button
          onClick={goBack}
          style={{
            marginTop: "2rem", background: "none", border: "none",
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "'Inter', sans-serif", fontSize: "0.896rem",
            color: "var(--text-subtle)", cursor: "pointer", padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-subtle)"}
        >
          <ArrowLeft size={13} /> Previous Question
        </button>
      </div>
    );
  }

  // ── Email Gate ──────────────────────────────────────
  if (phase === "email-gate") return wrap(
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <p className="overline" style={{ marginBottom: "1.25rem" }}>Assessment Complete</p>
      <h2 style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
        fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em",
        lineHeight: 1.05, color: "var(--text)", marginBottom: "1.25rem",
        animation: "heroEnter 0.5s ease both",
      }}>
        Your Diagnostic<br />Is Ready.
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
        Enter your email to release your structural classification result.
        Your result will be logged and reviewed by the Station Custodian.
      </p>

      <form onSubmit={submitEmail} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.5rem" }}>
            Email Address
          </label>
          <input
            type="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            data-testid="diagnostic-email"
            style={{
              width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
              color: "var(--text)", padding: "0.875rem 1rem",
              fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "var(--orange)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        <label style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", cursor: "pointer", padding: "1rem", border: "1px solid var(--border)", background: "var(--bg-2)" }}>
          <input
            type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)}
            data-testid="diagnostic-consent"
            style={{ marginTop: "0.15rem", accentColor: "var(--orange)", flexShrink: 0 }}
          />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "var(--text-subtle)", lineHeight: 1.6 }}>
            I understand this assessment is for educational guidance only and does not constitute a legal audit result.
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting || !consented}
          data-testid="release-result-btn"
          style={{
            background: consented ? "var(--orange)" : "rgba(232,89,15,0.3)",
            color: "#fff", border: "none", padding: "1rem",
            fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: "0.98rem", letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: consented ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => { if (consented) e.currentTarget.style.background = "var(--orange-hover)"; }}
          onMouseLeave={e => { if (consented) e.currentTarget.style.background = "var(--orange)"; }}
        >
          {submitting ? "Processing..." : "Release Classification Result"}
        </button>
      </form>
    </div>
  );

  // ── Result ──────────────────────────────────────
  if (phase === "result" && result) {
    const r = RESULTS[result];
    const totalScore = answers.reduce((s, a) => s + (a?.score ?? 0), 0);
    const flagged = QUESTIONS.filter((_, i) => answers[i]?.risk);
    return wrap(
      <div>
        <p className="overline" style={{ marginBottom: "1.25rem" }}>Structural Classification Result</p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem", animation: "heroEnter 0.5s ease both" }}>
          <span style={{
            background: r.tagBg, border: `1px solid ${r.tagBorder}`, color: r.color,
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
            fontSize: "2rem", letterSpacing: "0.08em",
            padding: "0.5rem 1.5rem",
          }}>{result}</span>
          <div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text)", lineHeight: 1.2 }}>{r.headline}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.728rem", color: "var(--text-subtle)", marginTop: "0.35rem" }}>Score: {totalScore} of 28</p>
          </div>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: 560 }}>
          {r.body}
        </p>

        {flagged.length > 0 && (
          <div style={{ border: "1px solid var(--border)", marginBottom: "2.5rem" }}>
            <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.672rem", color: "var(--text-subtle)", letterSpacing: "0.1em" }}>FLAGGED EXPOSURE POINTS</p>
            </div>
            {flagged.map((q, i) => {
              const qIdx = QUESTIONS.indexOf(q);
              const ans = answers[qIdx];
              return (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "0.875rem 1.25rem", borderBottom: i < flagged.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <span style={{
                    background: ans.risk === "RED" ? "rgba(239,68,68,0.12)" : "rgba(217,119,6,0.12)",
                    color: ans.risk === "RED" ? "#ef4444" : "#d97706",
                    border: `1px solid ${ans.risk === "RED" ? "rgba(239,68,68,0.25)" : "rgba(217,119,6,0.25)"}`,
                    padding: "0.15rem 0.5rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", flexShrink: 0,
                  }}>{ans.risk}</span>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.2rem" }}>{q.section}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "var(--text-subtle)" }}>Selected: {ans.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
          <Link to={r.cta.href}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--orange)", color: "#fff",
              fontFamily: "'Inter', sans-serif", fontWeight: 700,
              fontSize: "0.98rem", letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1rem 1.75rem", textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
          >
            {r.cta.label} <ArrowRight size={14} weight="bold" />
          </Link>
          <Link to={r.cta2.href}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              border: "1px solid var(--border)", color: "var(--text-muted)",
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              fontSize: "0.98rem", letterSpacing: "0.05em", textTransform: "uppercase",
              padding: "1rem 1.75rem", textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            {r.cta2.label}
          </Link>
        </div>

        <button
          onClick={() => { setPhase("landing"); setCurrentQ(0); setAnswers(Array(7).fill(null)); setResult(null); setEmail(""); setConsented(false); }}
          style={{ marginTop: "1.5rem", background: "none", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.874rem", color: "var(--text-subtle)", cursor: "pointer", padding: 0, textDecoration: "underline" }}
        >
          Restart assessment
        </button>
      </div>
    );
  }

  return null;
}
