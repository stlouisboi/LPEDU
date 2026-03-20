import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle, ArrowRight, X, GoogleLogo } from "@phosphor-icons/react";

// ── Lesson Data ──────────────────────────────────────────────────────────────
const LESSONS = [
  {
    code: "LP-MOD-G0-1",
    number: "G0-1",
    title: "The Reality of Motor Carrier Authority",
    duration: "~12 min",
    pdfLabel: "Authority Reality Briefing",
    requiresAuth: false,
    keyPoints: [
      "USDOT authority is entry into a federally monitored environment — not a license to earn money",
      "The FMCSA New Entrant Safety Audit begins tracking from Day 1 of authority activation",
      "Most new carrier failures are administrative — not operational",
      "Your compliance record is already being written before you know the audit is coming",
    ],
    assessmentQuestion: "Since your authority was activated, have you reviewed your FMCSA Safety Measurement System (SMS) profile?",
    assessmentOptions: [
      "Yes — I review it regularly",
      "Yes — once or twice, briefly",
      "No — I didn't know this existed",
      "My authority is not yet active",
    ],
  },
  {
    code: "LP-MOD-G0-2",
    number: "G0-2",
    title: "The 90-Day Survival Window",
    duration: "~15 min",
    pdfLabel: "90-Day Compliance Calendar",
    requiresAuth: false,
    keyPoints: [
      "The FMCSA New Entrant review initiates within 12–24 months of authority activation",
      "Most carriers that fail audits lost the case in the first 90 days — before they knew they were building a record",
      "Compliance gaps compound: a single missing document becomes a pattern when it repeats",
      "The installation window for your operating standard closes faster than most carriers expect",
    ],
    assessmentQuestion: "How long has your authority been active, and how would you describe your current documentation status?",
    assessmentOptions: [
      "Less than 30 days — just getting started",
      "30–90 days — building infrastructure",
      "90 days to 1 year — operating, some gaps",
      "Over 1 year — looking to strengthen existing systems",
    ],
  },
  {
    code: "LP-MOD-G0-3",
    number: "G0-3",
    title: "The AUTO Risk Model",
    duration: "~18 min",
    pdfLabel: "AUTO Risk Model Reference",
    requiresAuth: false,
    keyPoints: [
      "A — Around: Regulatory threats outside your awareness (FMCSA monitoring, broker compliance checks)",
      "U — Under: Financial exposures beneath your operating model (insurance gaps, factoring risk, fuel cost exposure)",
      "T — Through: Compliance failures that pass unnoticed until audit (incomplete DQ files, ELD and maintenance gaps)",
      "O — Over: Timeline compression that collapses your 90-day window (early audits, accident triggers, shipper requirements)",
    ],
    assessmentQuestion: "Which AUTO risk vector feels most present in your current operation?",
    assessmentOptions: [
      "A — Around: I'm uncertain what FMCSA can see about my operation",
      "U — Under: My financial exposure is higher than I'd like to admit",
      "T — Through: I know there are documentation gaps I haven't addressed",
      "O — Over: I feel like I'm running out of time to get structured",
    ],
  },
  {
    code: "LP-MOD-G0-4",
    number: "G0-4",
    title: "The Four Pillars of Survival",
    duration: "~14 min",
    pdfLabel: "Four Pillars Installation Guide",
    requiresAuth: true,
    keyPoints: [
      "Pillar 1 — Authority Protection: FMCSA filings, UCR, BOC-3, MCS-150 currency, SMS monitoring",
      "Pillar 2 — Insurance Continuity: Filing currency, coverage alignment, certificate management, gap prevention",
      "Pillar 3 — Compliance Backbone: Driver qualification files, D&A program, HOS policy, maintenance records",
      "Pillar 4 — Cash-Flow Oxygen: Load selection discipline, factoring structure, tax reserves, cost-per-mile control",
    ],
    assessmentQuestion: "Of the four pillars, which is your weakest right now?",
    assessmentOptions: [
      "Pillar 1 — Authority Protection (FMCSA filings and monitoring)",
      "Pillar 2 — Insurance Continuity (coverage and certificate management)",
      "Pillar 3 — Compliance Backbone (driver files, HOS, maintenance)",
      "Pillar 4 — Cash-Flow Oxygen (financial systems and load discipline)",
    ],
  },
  {
    code: "LP-MOD-G0-5",
    number: "G0-5",
    title: "The 16 Deadly Sins",
    duration: "~20 min",
    pdfLabel: "16 Deadly Sins Reference Card",
    requiresAuth: true,
    keyPoints: [
      "The 16 Deadly Sins are the documented failure patterns responsible for the majority of new entrant authority revocations",
      "These are not random violations — they are predictable, recurring, and fully preventable with operational infrastructure",
      "HOS, Driver Qualification, Controlled Substances testing, and Vehicle Maintenance represent the four most cited categories",
      "Each sin maps to one of the four LaunchPath Pillars — every sin has a structural prevention mechanism",
    ],
    assessmentQuestion: "From what you know of the 16 Deadly Sins, how many are currently unaddressed in your operation?",
    assessmentOptions: [
      "None — I have systems in place for all of them",
      "1–3 — Minor gaps I haven't formally addressed",
      "4–8 — Several that require immediate attention",
      "More than 8 — I need a full compliance reset",
    ],
  },
  {
    code: "LP-MOD-G0-6",
    number: "G0-6",
    title: "The GO / WAIT / NO-GO Decision",
    duration: "~16 min",
    pdfLabel: "GO/WAIT/NO-GO Decision Framework",
    requiresAuth: true,
    keyPoints: [
      "This is a self-assessment, not an external evaluation — the honest answer is the only useful one",
      "GO means your infrastructure is aligned enough to install the Standard and close gaps systematically",
      "WAIT means critical foundations are missing — proceeding without them multiplies risk, not revenue",
      "NO-GO means the current operational position requires intervention before a structured program can hold",
    ],
    assessmentQuestion: null,
    assessmentOptions: null,
  },
];

const COMPLETION_DATA = {
  GO: {
    color: "#22c55e",
    borderColor: "rgba(34,197,94,0.22)",
    bgColor: "rgba(34,197,94,0.05)",
    label: "LP-DECISION: GO",
    headline: "You've called GO.",
    body: "This is the right call if your foundational infrastructure is aligned — or close enough to close systematically. The LaunchPath Standard is built for this position: operators who are ready to install the full compliance operating system before the audit window closes. The next step is a formal request for admission.",
    cta: "Request Admission",
    ctaHref: "/admission",
    ctaBg: "#d4900a",
    ctaColor: "#0b1628",
    secondary: "Run the REACH Diagnostic First",
    secondaryHref: "/reach-diagnostic",
  },
  WAIT: {
    color: "#fbbf24",
    borderColor: "rgba(251,191,36,0.22)",
    bgColor: "rgba(251,191,36,0.05)",
    label: "LP-DECISION: WAIT",
    headline: "You've called WAIT.",
    body: "This is a responsible decision. WAIT means you've identified foundational gaps that, if left unaddressed, will follow you into the Standard — and the Standard can't close structural gaps, it can only build on top of them. Use the REACH Diagnostic to get a scored assessment of exactly where you stand across the five compliance domains.",
    cta: "Run the REACH Diagnostic",
    ctaHref: "/reach-diagnostic",
    ctaBg: "#d4900a",
    ctaColor: "#0b1628",
    secondary: "Review the Knowledge Center",
    secondaryHref: "/knowledge-center",
  },
  "NO-GO": {
    color: "#f87171",
    borderColor: "rgba(248,113,113,0.22)",
    bgColor: "rgba(248,113,113,0.05)",
    label: "LP-DECISION: NO-GO",
    headline: "You've called NO-GO.",
    body: "This is honesty — and honesty is the only starting point that leads somewhere useful. NO-GO means the current operational conditions need resolution before a structured program can hold. That resolution starts with a direct conversation about where you are and what needs to happen first.",
    cta: "Contact LaunchPath",
    ctaHref: "/contact",
    ctaBg: "#d4900a",
    ctaColor: "#0b1628",
    secondary: "Run the REACH Diagnostic",
    secondaryHref: "/reach-diagnostic",
  },
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function Ground0LessonPlayer({ user, API, onAuthSuccess, isEmbedded = false }) {
  const [view, setView] = useState("overview");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("register");
  const [finalDecision, setFinalDecision] = useState(null);
  const [localUser, setLocalUser] = useState(user);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Sync localUser when prop changes
  useEffect(() => { setLocalUser(user); }, [user]);

  // Load progress from localStorage (for everyone) on mount
  useEffect(() => {
    const saved = localStorage.getItem("ground0_progress");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (Array.isArray(p.completedLessons)) setCompletedLessons(p.completedLessons);
        if (p.view && p.view !== "overview") setView(p.view);
        if (typeof p.lessonIndex === "number") setLessonIndex(p.lessonIndex);
        if (p.finalDecision) setFinalDecision(p.finalDecision);
        if (p.assessmentAnswers && typeof p.assessmentAnswers === "object") setAssessmentAnswers(p.assessmentAnswers);
      } catch {}
    }
    setProgressLoaded(true);
  }, []);

  // If authenticated, load from API and merge
  useEffect(() => {
    if (!localUser || !API || !progressLoaded) return;
    fetch(`${API}/api/ground0/progress`, { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        if (data.completed_lessons?.length > 0) {
          setCompletedLessons(data.completed_lessons);
          if (data.decision) {
            setFinalDecision(data.decision);
            setView("complete");
          } else if (data.completed_lessons.length >= LESSONS.length) {
            setView("decision");
          } else {
            const nextLesson = data.completed_lessons.length;
            setLessonIndex(Math.min(nextLesson, LESSONS.length - 1));
            setView("lesson");
          }
        }
      })
      .catch(() => {});
  }, [localUser, API, progressLoaded]);

  const saveLocal = useCallback((updates) => {
    const current = JSON.parse(localStorage.getItem("ground0_progress") || "{}");
    localStorage.setItem("ground0_progress", JSON.stringify({ ...current, ...updates }));
  }, []);

  const saveServer = useCallback((completed, decision) => {
    if (!localUser || !API) return;
    fetch(`${API}/api/ground0/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ completed_lessons: completed, decision: decision || null }),
    }).catch(() => {});
  }, [localUser, API]);

  const handleBegin = () => {
    setLessonIndex(0);
    setView("lesson");
    setSelectedOption(null);
    saveLocal({ view: "lesson", lessonIndex: 0 });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAssessmentAnswers(prev => {
      const updated = { ...prev, [lessonIndex]: option };
      saveLocal({ assessmentAnswers: updated });
      return updated;
    });
  };

  const handleContinue = () => {
    const nextIndex = lessonIndex + 1;
    // Check if next lesson requires auth and user is not logged in
    if (nextIndex < LESSONS.length && LESSONS[nextIndex].requiresAuth && !localUser) {
      setShowAuthModal(true);
      return;
    }

    const newCompleted = [...new Set([...completedLessons, lessonIndex])];
    setCompletedLessons(newCompleted);
    saveLocal({ completedLessons: newCompleted });
    saveServer(newCompleted, finalDecision);

    if (nextIndex >= LESSONS.length) {
      setView("decision");
      saveLocal({ view: "decision" });
    } else {
      setLessonIndex(nextIndex);
      setSelectedOption(null);
      saveLocal({ lessonIndex: nextIndex });
    }
  };

  const handleDecision = (decision) => {
    const newCompleted = [...new Set([...completedLessons, lessonIndex])];
    setCompletedLessons(newCompleted);
    setFinalDecision(decision);
    setView("complete");
    saveLocal({ completedLessons: newCompleted, finalDecision: decision, view: "complete" });
    saveServer(newCompleted, decision);
  };

  const handleAuthSuccessLocal = (userData) => {
    // Mark current lesson (G0-3) complete and advance to the auth-required lesson (G0-4)
    const newCompleted = [...new Set([...completedLessons, lessonIndex])];
    const nextIndex = lessonIndex + 1;

    // Persist to localStorage BEFORE calling onAuthSuccess, so the re-mounted
    // (embedded) player picks up the correct position when PortalPage re-renders.
    saveLocal({ completedLessons: newCompleted, lessonIndex: nextIndex, view: "lesson" });

    // Sync progress to server with the new session
    fetch(`${API}/api/ground0/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ completed_lessons: newCompleted, decision: finalDecision || null }),
    }).catch(() => {});

    // Update local state
    setCompletedLessons(newCompleted);
    setLessonIndex(nextIndex);
    setSelectedOption(null);
    setLocalUser(userData);
    setShowAuthModal(false);
    setAuthError("");
    setAuthForm({ name: "", email: "", password: "" });

    // Notify parent — this causes PortalPage to switch to the authenticated portal layout.
    // The embedded Ground0LessonPlayer will mount fresh and read the position from localStorage.
    if (onAuthSuccess) onAuthSuccess(userData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const resp = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: authForm.email, password: authForm.password, name: authForm.name || undefined }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.detail || "Registration failed. Please try again.");
      }
      const data = await resp.json();
      handleAuthSuccessLocal(data.user);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const resp = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: authForm.email, password: authForm.password }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.detail || "Sign in failed. Please check your credentials.");
      }
      const data = await resp.json();
      handleAuthSuccessLocal(data.user);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Save progress before redirecting so we can restore it on return
    saveLocal({ view, lessonIndex, completedLessons, finalDecision });
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(window.location.origin + "/portal")}`;
  };

  const pad = isEmbedded ? "0" : "80px 0 0";

  if (!progressLoaded) return null;

  return (
    <div
      data-testid="ground0-lesson-player"
      style={{
        paddingTop: pad,
        fontFamily: "'Inter', sans-serif",
        color: "#FFFFFF",
        maxWidth: isEmbedded ? "100%" : 860,
        margin: isEmbedded ? 0 : "0 auto",
        padding: isEmbedded ? 0 : "80px 2rem 80px",
      }}
    >
      {view === "overview" && <OverviewView lessons={LESSONS} completedLessons={completedLessons} onBegin={handleBegin} isEmbedded={isEmbedded} />}
      {view === "lesson" && (
        <LessonView
          lesson={LESSONS[lessonIndex]}
          lessonIndex={lessonIndex}
          totalLessons={LESSONS.length}
          completedLessons={completedLessons}
          selectedOption={selectedOption}
          onSelectOption={handleOptionSelect}
          onContinue={handleContinue}
          onBack={() => {
            if (lessonIndex === 0) { setView("overview"); } else {
              setLessonIndex(lessonIndex - 1);
              setSelectedOption(null);
            }
          }}
          onJumpTo={(idx) => { setLessonIndex(idx); setSelectedOption(null); }}
          isEmbedded={isEmbedded}
        />
      )}
      {view === "decision" && <DecisionView onDecide={handleDecision} />}
      {view === "complete" && finalDecision && <CompleteView decision={finalDecision} API={API} assessmentAnswers={assessmentAnswers} onRestart={() => { setView("overview"); setCompletedLessons([]); setFinalDecision(null); setAssessmentAnswers({}); saveLocal({}); }} />}

      {/* Auth Gate Modal */}
      {showAuthModal && (
        <AuthGateModal
          authMode={authMode}
          authForm={authForm}
          authError={authError}
          authLoading={authLoading}
          onModeChange={setAuthMode}
          onFormChange={(field, value) => setAuthForm(prev => ({ ...prev, [field]: value }))}
          onRegister={handleRegister}
          onLogin={handleLogin}
          onGoogle={handleGoogleLogin}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

// ── Overview View ─────────────────────────────────────────────────────────────
function OverviewView({ lessons, completedLessons, onBegin, isEmbedded }) {
  return (
    <div>
      {!isEmbedded && (
        <p style={{ fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
          LP-MOD-G0 | GROUND 0 — FREE ACCESS
        </p>
      )}
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isEmbedded ? "clamp(1.5rem, 2.5vw, 2rem)" : "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
        Ground 0: The Wisdom Module
      </h1>
      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 540, marginBottom: isEmbedded ? "1.5rem" : "2.5rem" }}>
        Six implementation modules. Approximately 95 minutes. No charge. This is the entry point for the LaunchPath Operating Standard.
      </p>

      {/* Module list */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem" }}>
        {lessons.map((lesson, idx) => {
          const isComplete = completedLessons.includes(idx);
          const isLocked = lesson.requiresAuth;
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: idx < lessons.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: isComplete ? "rgba(34,197,94,0.04)" : "transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.762rem", color: isComplete ? "#22c55e" : "#d4900a", minWidth: 36, letterSpacing: "0.06em" }}>
                  {lesson.number}
                </span>
                <div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: isComplete ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.93)", display: "block" }}>
                    {lesson.title}
                  </span>
                  {isLocked && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(212,144,10,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Account required
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.45)" }}>{lesson.duration}</span>
                {isComplete && <CheckCircle size={16} color="#22c55e" weight="fill" />}
              </div>
            </div>
          );
        })}
      </div>

      <button
        data-testid="g0-begin-btn"
        onClick={onBegin}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "#d4900a", color: "#0b1628", border: "none",
          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem",
          letterSpacing: "0.06em", textTransform: "uppercase",
          padding: "1rem 2rem", cursor: "pointer", transition: "background 0.2s",
          minHeight: 52,
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
        onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
      >
        {completedLessons.length > 0 ? "Continue Ground 0" : "Begin Ground 0"} <ArrowRight size={16} />
      </button>

      {completedLessons.length > 0 && (
        <p style={{ fontSize: "0.762rem", color: "rgba(255,255,255,0.4)", marginTop: "0.875rem" }}>
          {completedLessons.length} of {LESSONS.length} lessons completed
        </p>
      )}
    </div>
  );
}

// ── Lesson View ───────────────────────────────────────────────────────────────
function LessonView({ lesson, lessonIndex, totalLessons, completedLessons, selectedOption, onSelectOption, onContinue, onBack, onJumpTo, isEmbedded }) {
  const isLastLesson = lessonIndex === totalLessons - 1;
  const canContinue = lesson.assessmentOptions === null || selectedOption !== null;

  return (
    <div data-testid={`lesson-view-${lesson.number}`}>
      {/* Progress stepper */}
      <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "2rem" }}>
        {Array.from({ length: totalLessons }).map((_, idx) => {
          const isComplete = completedLessons.includes(idx);
          const isCurrent = idx === lessonIndex;
          return (
            <React.Fragment key={idx}>
              <button
                data-testid={`step-${idx + 1}`}
                onClick={() => { if (isComplete || idx <= lessonIndex) onJumpTo(idx); }}
                style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: isComplete ? "#22c55e" : isCurrent ? "transparent" : "transparent",
                  border: isComplete ? "2px solid #22c55e" : isCurrent ? "2px solid #d4900a" : "2px solid rgba(255,255,255,0.18)",
                  color: isComplete ? "#0b1628" : isCurrent ? "#d4900a" : "rgba(255,255,255,0.35)",
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.714rem",
                  cursor: (isComplete || idx <= lessonIndex) ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {isComplete ? <CheckCircle size={14} weight="bold" /> : idx + 1}
              </button>
              {idx < totalLessons - 1 && (
                <div style={{ flex: 1, height: 2, background: completedLessons.includes(idx) ? "#22c55e" : "rgba(255,255,255,0.1)" }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Lesson header */}
      <p style={{ fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.5rem" }}>
        {lesson.code} &nbsp;·&nbsp; {lesson.duration}
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#FFFFFF", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        {lesson.title}
      </h2>

      {/* Video placeholder */}
      <div
        data-testid={`video-placeholder-${lesson.number}`}
        style={{
          width: "100%", aspectRatio: "16 / 9", maxHeight: 360,
          background: "linear-gradient(135deg, #060e1a 0%, #0d1c30 60%, #0a1828 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          marginBottom: "2rem", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(212,144,10,0.06) 0%, transparent 70%)" }} />
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          border: "2px solid rgba(212,144,10,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1rem", position: "relative",
        }}>
          <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "18px solid rgba(212,144,10,0.7)", marginLeft: 4 }} />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(212,144,10,0.65)", textTransform: "uppercase", position: "relative" }}>
          Video — Available on Vimeo
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", marginTop: "0.35rem", position: "relative" }}>
          URL coming soon
        </p>
      </div>

      {/* Key Points */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1rem" }}>
          KEY POINTS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {lesson.keyPoints.map((point, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.5)", flexShrink: 0, paddingTop: "0.22rem", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Download */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "0.75rem" }}>
          REFERENCE DOCUMENT
        </p>
        <button
          data-testid={`pdf-download-${lesson.number}`}
          disabled
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.06em",
            textTransform: "uppercase", padding: "0.75rem 1.25rem",
            cursor: "not-allowed",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {lesson.pdfLabel} — Coming Soon
        </button>
      </div>

      {/* Self Assessment */}
      {lesson.assessmentQuestion && lesson.assessmentOptions && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1rem" }}>
            SELF-ASSESSMENT
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.87)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
            {lesson.assessmentQuestion}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {lesson.assessmentOptions.map((option, i) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={i}
                  data-testid={`assessment-option-${lessonIndex}-${i}`}
                  onClick={() => onSelectOption(option)}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "0.875rem",
                    background: isSelected ? "rgba(212,144,10,0.07)" : "transparent",
                    border: isSelected ? "1px solid rgba(212,144,10,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    borderLeft: isSelected ? "3px solid #d4900a" : "3px solid transparent",
                    padding: "0.875rem 1.125rem",
                    cursor: "pointer", textAlign: "left", width: "100%",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderLeft = "3px solid transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; } }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, color: isSelected ? "#d4900a" : "rgba(255,255,255,0.28)", flexShrink: 0, paddingTop: "0.18rem", letterSpacing: "0.1em" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: isSelected ? "rgba(255,255,255,0.93)" : "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <button
          data-testid="g0-back-btn"
          onClick={onBack}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif",
            fontSize: "0.857rem", fontWeight: 600, padding: "0.75rem 1.25rem",
            cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#FFFFFF"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          ← Back
        </button>
        <button
          data-testid="g0-continue-btn"
          onClick={onContinue}
          disabled={!canContinue}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: canContinue ? "#d4900a" : "rgba(212,144,10,0.25)",
            color: canContinue ? "#0b1628" : "rgba(255,255,255,0.3)",
            border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: "0.924rem", letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "0.875rem 1.75rem", cursor: canContinue ? "pointer" : "not-allowed",
            transition: "background 0.2s", minHeight: 48,
          }}
          onMouseEnter={e => { if (canContinue) e.currentTarget.style.background = "#e8a520"; }}
          onMouseLeave={e => { if (canContinue) e.currentTarget.style.background = "#d4900a"; }}
        >
          {isLastLesson ? "Complete Module 6" : "Continue"} <ArrowRight size={14} />
        </button>
      </div>

      {lesson.assessmentOptions && !selectedOption && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.28)", marginTop: "0.875rem", textAlign: "right" }}>
          Select an answer above to continue
        </p>
      )}
    </div>
  );
}

// ── Decision View ─────────────────────────────────────────────────────────────
function DecisionView({ onDecide }) {
  return (
    <div data-testid="g0-decision-view">
      <p style={{ fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        LP-MOD-G0-6 | FINAL ASSESSMENT
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#FFFFFF", marginBottom: "0.875rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        Ground 0 Complete — Make Your Call.
      </h2>
      <p style={{ fontSize: "0.924rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, maxWidth: 520, marginBottom: "2.5rem" }}>
        This is a self-assessment, not an external evaluation. Based on the six modules, declare your current operational position honestly. The call you make here determines your specific next step.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 540 }}>
        {[
          {
            key: "GO",
            color: "#22c55e",
            bg: "rgba(34,197,94,0.05)",
            border: "rgba(34,197,94,0.22)",
            headline: "GO",
            sub: "My foundational infrastructure is aligned. I am ready to install the LaunchPath Standard and close remaining gaps systematically.",
          },
          {
            key: "WAIT",
            color: "#fbbf24",
            bg: "rgba(251,191,36,0.05)",
            border: "rgba(251,191,36,0.22)",
            headline: "WAIT",
            sub: "Critical foundations are missing. I need to address specific gaps before I can install a structured compliance program.",
          },
          {
            key: "NO-GO",
            color: "#f87171",
            bg: "rgba(248,113,113,0.05)",
            border: "rgba(248,113,113,0.22)",
            headline: "NO-GO",
            sub: "My current operational position requires intervention. I am not yet in a position where a structured program can hold.",
          },
        ].map(({ key, color, bg, border, headline, sub }) => (
          <button
            key={key}
            data-testid={`decision-${key.toLowerCase().replace("-", "")}`}
            onClick={() => onDecide(key)}
            style={{
              display: "flex", alignItems: "flex-start", gap: "1.25rem",
              background: bg, border: `1px solid ${border}`,
              borderLeft: `4px solid ${color}`,
              padding: "1.25rem 1.5rem", cursor: "pointer", textAlign: "left",
              width: "100%", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = bg.replace("0.05", "0.10")}
            onMouseLeave={e => e.currentTarget.style.background = bg}
          >
            <div style={{ flexShrink: 0, paddingTop: "0.1rem" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "1.125rem", color, letterSpacing: "0.04em" }}>
                {headline}
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: 0 }}>
              {sub}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── REACH Pass/Fail Logic ─────────────────────────────────────────────────────
// Maps G0-1 through G0-5 assessment answers to REACH pillar pass/fail.
// lessonIndex 0=G0-1, 1=G0-2, 2=G0-3, 3=G0-4, 4=G0-5

const REACH_PILLARS = [
  {
    key: "R",
    label: "R — RESOURCES",
    fullName: "Resources",
    passDesc: "Cash reserves and operational runway confirmed.",
    failDesc: "Cash reserves and operational runway not confirmed.",
    failLink: "→ Review: Four Pillars — Cash-Flow Oxygen",
    failHref: "/knowledge-center",
  },
  {
    key: "E",
    label: "E — EXPERIENCE",
    fullName: "Experience",
    passDesc: "Compliance background or structured learning commitment confirmed.",
    failDesc: "Significant compliance gaps identified across documented failure patterns.",
    failLink: "→ Review: The 16 Deadly Sins",
    failHref: "/16-deadly-sins",
  },
  {
    key: "A",
    label: "A — AUTHORITY READINESS",
    fullName: "Authority Readiness",
    passDesc: "Authority status, filings, and compliance monitoring confirmed.",
    failDesc: "Authority awareness or filing currency not confirmed.",
    failLink: "→ Review: The Reality of Motor Carrier Authority",
    failHref: "/knowledge-center",
  },
  {
    key: "C",
    label: "C — COMMITMENT",
    fullName: "Commitment",
    passDesc: "Operational timeline and implementation capacity confirmed.",
    failDesc: "Timeline compression identified — available implementation window is insufficient.",
    failLink: "→ Review: The 90-Day Survival Window",
    failHref: "/knowledge-center",
  },
  {
    key: "H",
    label: "H — OPERATIONAL DISCIPLINE",
    fullName: "Operational Discipline",
    passDesc: "Existing file structure or readiness to build confirmed.",
    failDesc: "No operational file structure identified — compliance backbone is absent.",
    failLink: "→ Start with the Document System",
    failHref: "/compliance-library",
  },
];

function computeReachStatus(answers) {
  const g01 = answers[0] || "";
  const g03 = answers[2] || "";
  const g04 = answers[3] || "";
  const g05 = answers[4] || "";

  return {
    R: !(g03.includes("U — Under") || g04.includes("Pillar 4")),
    E: !(g05.includes("4–8") || g05.includes("More than 8")),
    A: !(g01.includes("No — I didn't know") || g03.includes("A — Around") || g04.includes("Pillar 1")),
    C: !(g03.includes("O — Over")),
    H: !(g03.includes("T — Through") || g04.includes("Pillar 3") || g05.includes("More than 8")),
  };
}

// ── Gap Tracker Component ─────────────────────────────────────────────────────
function GapTracker({ assessmentAnswers }) {
  const status = computeReachStatus(assessmentAnswers);
  const gaps = REACH_PILLARS.filter(p => !status[p.key]).length;
  const hasAnyData = Object.keys(assessmentAnswers).length > 0;

  return (
    <div
      data-testid="gap-tracker"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(212,144,10,0.2)",
        borderLeft: "3px solid rgba(212,144,10,0.5)",
        padding: "1.5rem",
        marginBottom: "1.75rem",
      }}
    >
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        WHAT NEEDS TO CLOSE BEFORE ENTRY
      </p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {REACH_PILLARS.map((pillar, i) => {
          const passed = status[pillar.key];
          return (
            <div
              key={pillar.key}
              data-testid={`gap-pillar-${pillar.key.toLowerCase()}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "0.875rem 0",
                borderBottom: i < REACH_PILLARS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              {/* Status icon */}
              <div
                aria-label={passed ? "Passed" : "Gap identified"}
                style={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "0.1rem",
                }}
              >
                {passed ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#d4900a" strokeWidth="1.5"/>
                    <path d="M5 8l2 2 4-4" stroke="#d4900a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.5"/>
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", color: passed ? "rgba(255,255,255,0.75)" : "#FFFFFF", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>
                  {pillar.label}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: passed ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.62)", lineHeight: 1.55 }}>
                  {passed ? pillar.passDesc : pillar.failDesc}
                </p>
                {!passed && hasAnyData && (
                  <a
                    href={pillar.failHref}
                    style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.8rem", color: "#d4900a", marginTop: "0.4rem", textDecoration: "none", transition: "opacity 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                  >
                    {pillar.failLink}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", marginBottom: "0.375rem" }}>
          {gaps} OF 5 {gaps === 1 ? "GAP" : "GAPS"} REMAINING
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
          Close these gaps, then retake Ground 0 to confirm readiness for the next cohort.
        </p>
      </div>
    </div>
  );
}

// ── Complete View ─────────────────────────────────────────────────────────────
function CompleteView({ decision, onRestart, API, assessmentAnswers = {} }) {
  const d = COMPLETION_DATA[decision];
  const [captureEmail, setCaptureEmail] = useState("");
  const [captureSubmitted, setCaptureSubmitted] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureError, setCaptureError] = useState("");

  const handleCapture = async (e) => {
    e.preventDefault();
    setCaptureLoading(true);
    setCaptureError("");
    try {
      const reachStatus = computeReachStatus(assessmentAnswers);
      const gaps = REACH_PILLARS.filter(p => !reachStatus[p.key]).length;
      const resp = await fetch(`${API}/api/ground0/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: captureEmail,
          status: decision,
          completion_date: new Date().toISOString().slice(0, 10),
          reach_resources: reachStatus.R ? "PASS" : "FAIL",
          reach_experience: reachStatus.E ? "PASS" : "FAIL",
          reach_authority: reachStatus.A ? "PASS" : "FAIL",
          reach_commitment: reachStatus.C ? "PASS" : "FAIL",
          reach_discipline: reachStatus.H ? "PASS" : "FAIL",
          gaps_remaining: gaps,
        }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.detail || "Submission failed. Please try again.");
      }
      setCaptureSubmitted(true);
    } catch (err) {
      setCaptureError(err.message);
    } finally {
      setCaptureLoading(false);
    }
  };

  if (!d) return null;
  return (
    <div data-testid={`g0-complete-${decision.toLowerCase().replace("-", "")}`} style={{ maxWidth: 560 }}>
      {/* ── Existing status block (keep for all outcomes) ── */}
      <div style={{ background: d.bgColor, border: `1px solid ${d.borderColor}`, borderLeft: `4px solid ${d.color}`, padding: "2rem 2rem", marginBottom: decision === "GO" ? "2rem" : "0" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: d.color, marginBottom: "0.75rem" }}>
          {d.label}
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#FFFFFF", marginBottom: "1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {d.headline}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.78, marginBottom: "1.75rem" }}>
          {d.body}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={d.ctaHref}
            data-testid="g0-completion-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              background: d.ctaBg, color: d.ctaColor,
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "0.75rem 1.5rem", textDecoration: "none", transition: "background 0.2s",
              minHeight: 42,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = d.ctaBg}
          >
            {d.cta} <ArrowRight size={12} />
          </a>
          <a
            href={d.secondaryHref}
            data-testid="g0-completion-secondary"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              background: "transparent", color: "rgba(255,255,255,0.65)",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "0.75rem 1.25rem", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s",
              minHeight: 42,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
          >
            {d.secondary} <ArrowRight size={12} />
          </a>
        </div>
      </div>

      {/* ── WAIT capture section ── */}
      {decision === "WAIT" && (
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: "2rem" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "2rem" }} />

          {/* Gap Tracker — shows which REACH pillars passed/failed */}
          <GapTracker assessmentAnswers={assessmentAnswers} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(251,191,36,0.5)", marginBottom: "0.875rem" }}>
            LP-STATUS: WAIT | NEXT STEPS
          </p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.375rem)", color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            YOU ARE NOT READY — YET
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
            The gaps identified above must be closed before admission is possible.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
            Your operation has gaps that create exposure under active authority. That's a timing issue — not a permanent one.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
            LaunchPath does not adjust the standard to admit you early. Your readiness must rise to the system.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "1.75rem" }}>
            When these gaps are closed, you may request admission to the next cohort.
          </p>

          {captureSubmitted ? (
            <div data-testid="g0-wait-success" style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", borderLeft: "3px solid rgba(212,144,10,0.6)", padding: "1.5rem", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.875rem" }}>
                ✓ YOUR SPOT IS SAVED
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.625rem" }}>
                You'll be first to know when the next cohort opens.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
                A new Ground 0 assessment will be required before entry.
              </p>
              <a
                href="/compliance-library"
                data-testid="g0-doc-bundle-cta-success"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "transparent", color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.625rem 1.125rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s", minHeight: 40 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
              >
                View the Document System <ArrowRight size={11} />
              </a>
            </div>
          ) : (
            <form onSubmit={handleCapture} data-testid="g0-wait-capture-form" style={{ marginBottom: "0" }}>
              <input
                type="email"
                required
                value={captureEmail}
                onChange={e => setCaptureEmail(e.target.value)}
                data-testid="g0-wait-email-input"
                placeholder="Email address"
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.875rem 1rem", outline: "none", marginBottom: "0.625rem", boxSizing: "border-box" }}
              />
              {captureError && (
                <p data-testid="g0-wait-error" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "#f87171", marginBottom: "0.625rem", lineHeight: 1.5 }}>
                  {captureError}
                </p>
              )}
              <button
                type="submit"
                data-testid="g0-wait-submit-btn"
                disabled={captureLoading}
                style={{ width: "100%", background: captureLoading ? "rgba(212,144,10,0.4)" : "#d4900a", color: "#0b1628", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.875rem 1.5rem", cursor: captureLoading ? "wait" : "pointer", minHeight: 48, transition: "background 0.2s" }}
                onMouseEnter={e => { if (!captureLoading) e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { if (!captureLoading) e.currentTarget.style.background = captureLoading ? "rgba(212,144,10,0.4)" : "#d4900a"; }}
              >
                {captureLoading ? "Processing..." : "SAVE MY SPOT →"}
              </button>
            </form>
          )}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.7, marginTop: "0.875rem" }}>
            No spam. Notified when the next cohort opens. A new Ground 0 assessment will be required.
          </p>

          {/* Document System CTA */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.75rem", marginTop: "1.75rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "0.75rem" }}>
              BEGIN CLOSING GAPS NOW
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.78, marginBottom: "1.25rem" }}>
              The Document System gives you the forms and templates to start closing these gaps independently.
            </p>
            <a
              href="/compliance-library"
              data-testid="g0-doc-bundle-cta"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "transparent", color: "rgba(255,255,255,0.58)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.25rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s", minHeight: 42 }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.58)"; }}
            >
              VIEW THE DOCUMENT SYSTEM <ArrowRight size={12} />
            </a>
          </div>
        </div>
      )}

      {/* ── NO-GO capture section ── */}
      {decision === "NO-GO" && (
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: "2rem" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "2rem" }} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,113,113,0.5)", marginBottom: "0.875rem" }}>
            LP-STATUS: NO-GO | ELIGIBILITY
          </p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
            THIS PROGRAM ISN'T THE RIGHT FIT — YET
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
            Based on your Ground 0 results, there's a misalignment with the current requirements of this system.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
            LaunchPath is built for operators within a specific operational range. Based on your current position, the program isn't applicable right now.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "1.75rem" }}>
            That may change. Get notified when your situation qualifies — or when a path opens that fits where you are.
          </p>

          {captureSubmitted ? (
            <div data-testid="g0-nogo-success" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: "3px solid rgba(255,255,255,0.3)", padding: "1.5rem", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "0.875rem" }}>
                ✓ YOU'RE ON THE LIST
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.78, marginBottom: "0.625rem" }}>
                We'll reach out when something relevant opens up.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.78 }}>
                No spam — just updates that matter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCapture} data-testid="g0-nogo-capture-form" style={{ marginBottom: "0" }}>
              <input
                type="email"
                required
                value={captureEmail}
                onChange={e => setCaptureEmail(e.target.value)}
                data-testid="g0-nogo-email-input"
                placeholder="Email address"
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.875rem 1rem", outline: "none", marginBottom: "0.625rem", boxSizing: "border-box" }}
              />
              {captureError && (
                <p data-testid="g0-nogo-error" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "#f87171", marginBottom: "0.625rem", lineHeight: 1.5 }}>
                  {captureError}
                </p>
              )}
              <button
                type="submit"
                data-testid="g0-nogo-submit-btn"
                disabled={captureLoading}
                style={{ width: "100%", background: captureLoading ? "rgba(212,144,10,0.4)" : "#d4900a", color: "#0b1628", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.875rem 1.5rem", cursor: captureLoading ? "wait" : "pointer", minHeight: 48, transition: "background 0.2s" }}
                onMouseEnter={e => { if (!captureLoading) e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { if (!captureLoading) e.currentTarget.style.background = captureLoading ? "rgba(212,144,10,0.4)" : "#d4900a"; }}
              >
                {captureLoading ? "Processing..." : "NOTIFY ME →"}
              </button>
            </form>
          )}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.7, marginTop: "0.875rem" }}>
            We'll only reach out when something relevant opens up.
          </p>
        </div>
      )}

      <button
        onClick={onRestart}
        data-testid="g0-restart-btn"
        style={{
          background: "none", border: "none", fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem", color: "rgba(255,255,255,0.28)", cursor: "pointer",
          letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.5rem 0",
          marginTop: "1.5rem", display: "block", transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}
      >
        Review Ground 0 again →
      </button>
    </div>
  );
}

// ── Auth Gate Modal ───────────────────────────────────────────────────────────
function AuthGateModal({ authMode, authForm, authError, authLoading, onModeChange, onFormChange, onRegister, onLogin, onGoogle, onClose }) {
  return (
    <div
      data-testid="auth-gate-modal"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,5,15,0.85)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div style={{ background: "#0a1828", border: "1px solid rgba(255,255,255,0.1)", maxWidth: 440, width: "100%", padding: "2.5rem 2rem", position: "relative" }}>
        {/* Close */}
        <button
          data-testid="auth-modal-close"
          onClick={onClose}
          style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "1.25rem", lineHeight: 1, padding: "0.25rem", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#FFFFFF"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
        >
          <X size={18} />
        </button>

        <p style={{ fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.875rem" }}>
          LP-MOD-G0-4 | ACCOUNT REQUIRED
        </p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.625rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          {authMode === "register" ? "Create your account to continue" : "Sign in to continue"}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
          Lessons G0-4 through G0-6 and your progress are saved to your account. Takes 30 seconds.
        </p>

        {/* Google button */}
        <button
          data-testid="auth-modal-google-btn"
          onClick={onGoogle}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
            gap: "0.75rem", minHeight: 44, background: "#FFFFFF", color: "#1A1A1A",
            border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600,
            fontSize: "0.924rem", cursor: "pointer", marginBottom: "1.25rem",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >
          <GoogleLogo size={18} weight="bold" />
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Mode tabs */}
        <div style={{ display: "flex", gap: "0", marginBottom: "1.25rem", border: "1px solid rgba(255,255,255,0.1)" }}>
          {["register", "login"].map(mode => (
            <button
              key={mode}
              data-testid={`auth-tab-${mode}`}
              onClick={() => { onModeChange(mode); }}
              style={{
                flex: 1, padding: "0.625rem", background: authMode === mode ? "rgba(212,144,10,0.1)" : "transparent",
                border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600,
                fontSize: "0.762rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: authMode === mode ? "#d4900a" : "rgba(255,255,255,0.4)",
                cursor: "pointer", transition: "all 0.15s",
                borderBottom: authMode === mode ? "2px solid #d4900a" : "2px solid transparent",
              }}
            >
              {mode === "register" ? "Create Account" : "Sign In"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={authMode === "register" ? onRegister : onLogin} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {authMode === "register" && (
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.375rem" }}>
                Name (optional)
              </label>
              <input
                data-testid="auth-name-input"
                type="text"
                value={authForm.name}
                onChange={e => onFormChange("name", e.target.value)}
                placeholder="Your name"
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          )}
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.375rem" }}>
              Email address
            </label>
            <input
              data-testid="auth-email-input"
              type="email"
              required
              value={authForm.email}
              onChange={e => onFormChange("email", e.target.value)}
              placeholder="you@example.com"
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.375rem" }}>
              Password
            </label>
            <input
              data-testid="auth-password-input"
              type="password"
              required
              minLength={6}
              value={authForm.password}
              onChange={e => onFormChange("password", e.target.value)}
              placeholder={authMode === "register" ? "Min. 6 characters" : "Your password"}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {authError && (
            <p data-testid="auth-error" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "#f87171", lineHeight: 1.5 }}>
              {authError}
            </p>
          )}

          <button
            data-testid="auth-submit-btn"
            type="submit"
            disabled={authLoading}
            style={{
              width: "100%", minHeight: 44, background: authLoading ? "rgba(212,144,10,0.5)" : "#d4900a",
              color: "#0b1628", border: "none", fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: "0.924rem", letterSpacing: "0.08em",
              textTransform: "uppercase", cursor: authLoading ? "wait" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {authLoading ? "Processing..." : authMode === "register" ? "Create Account & Continue" : "Sign In & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
