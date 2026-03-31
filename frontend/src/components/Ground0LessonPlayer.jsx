import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle, ArrowRight, X, GoogleLogo } from "@phosphor-icons/react";
import PasswordInput from "./PasswordInput";

const API = process.env.REACT_APP_BACKEND_URL;

// ── Lesson Data — LP-SYS-CUR-001 ─────────────────────────────────────────────
const LESSONS = [
  {
    code: "LP-GRD-0.1",
    number: "0.1",
    title: "Welcome to LaunchPath",
    duration: "~8 min",
    pdfLabel: "LaunchPath Orientation Brief",
    requiresAuth: false,
    keyPoints: [
      "LaunchPath is a compliance operating system installation — not a course to study, a system to build and run",
      "You are entering a federally monitored environment the moment your authority activates — the clock starts on Day 1",
      "Ground 0 is your free diagnostic layer: 6 lessons, ~90 minutes, required before enrollment",
      "Every lesson moves you one step closer to knowing whether the LaunchPath Standard is the right next step",
    ],
    assessmentQuestion: "What brings you to LaunchPath today?",
    assessmentOptions: [
      "I just received my authority and want to build compliance infrastructure correctly from the start",
      "I've been operating for a few months and realize I have gaps I haven't addressed",
      "I received an audit notice or compliance inquiry and need to respond",
      "I'm still exploring whether this path is the right fit for my operation",
    ],
  },
  {
    code: "LP-GRD-0.2",
    number: "0.2",
    title: "The Four Pillars of Survival",
    duration: "~15 min",
    pdfLabel: "Four Pillars Reference Guide",
    requiresAuth: false,
    keyPoints: [
      "Pillar 1 — Authority Protection: FMCSA filings, UCR, BOC-3, MCS-150 currency, and active SMS monitoring",
      "Pillar 2 — Insurance Continuity: BMC filings, coverage alignment, certificate management, and lapse prevention",
      "Pillar 3 — Compliance Backbone: Driver Qualification Files, Drug & Alcohol program, HOS records, and maintenance logs",
      "Pillar 4 — Cash-Flow Oxygen: Load selection discipline, factoring structure, cost-per-mile control, and tax reserves",
    ],
    standardBridge: [
      "In the LaunchPath Standard, we install the guards that prevent each of these cascade failures from reaching your operation. Not described. Not diagrammed. Installed. Driver Qualification Files built before dispatch. D&A program enrolled before the first driver moves a load. Maintenance logs active before the first roadside inspection.",
      "The 16 Deadly Sins — which you will see a preview of in your downloads — are the 16 specific failure points that trigger these cascades. The Standard installs the guard for every one of them across the nine-module sequence.",
      "Ground 0 shows you the exposure. The Standard closes it.",
    ],
    assessmentQuestion: "Which pillar is weakest in your current operation right now?",
    assessmentOptions: [
      "Pillar 1 — Authority Protection (FMCSA filings, UCR, SMS monitoring)",
      "Pillar 2 — Insurance Continuity (coverage alignment, BMC filings, certificate management)",
      "Pillar 3 — Compliance Backbone (DQF, Drug & Alcohol, HOS, maintenance records)",
      "Pillar 4 — Cash-Flow Oxygen (load selection, factoring, financial discipline)",
    ],
  },
  {
    code: "LP-GRD-0.3",
    number: "0.3",
    title: "Lane Selection",
    duration: "~18 min",
    pdfLabel: "Lane Selection Decision Framework",
    requiresAuth: false,
    keyPoints: [
      "Your operating lane determines your compliance risk profile before a single mile is driven",
      "Dry van, flatbed, reefer, intermodal, and specialized haul carry different FMCSA exposure levels",
      "Choosing the wrong lane for your current infrastructure creates compliance obligations you can't yet meet",
      "LaunchPath's Standard is optimized for general freight — deviations require additional compliance architecture",
    ],
    standardBridge: [
      "One more thing about lane selection before we move on.",
      "The lane you choose here is not just an equipment decision. It is a compliance decision.",
      "Box truck and semi have different regulatory thresholds, different insurance structures, different HOS implications, and different DQ file requirements depending on GVWR and CDL class.",
      "In the LaunchPath Standard, your lane choice from this lesson gets tied directly to the specific policies, checklists, and maintenance standards that apply to your operation. The system is built around your actual lane — not a generic carrier template.",
      "If you switch lanes after enrollment, your Station Custodian recalibrates the sequence. The system adapts. The point is: the decision you make in this lesson is the foundation the Standard builds on.",
    ],
    assessmentQuestion: "Which best describes your current or planned operation type?",
    assessmentOptions: [
      "Dry van / general freight (standard truckload OTR or regional)",
      "Flatbed or specialized cargo haul",
      "Temperature-controlled / reefer",
      "Intermodal, port drayage, or other specialized",
    ],
  },
  {
    code: "LP-GRD-0.4",
    number: "0.4",
    title: "Personal Readiness Check",
    duration: "~20 min",
    pdfLabel: "Readiness Assessment Worksheet",
    requiresAuth: true,
    keyPoints: [
      "Most new carrier failures are administrative and financial — not operational; the truck runs, the paperwork fails",
      "Readiness is measured across five dimensions: Resources, Experience, Authority, Commitment, and Discipline (REACH)",
      "The first 90 days of authority are the highest-risk period — the audit window opens before most carriers are ready",
      "This module gives you an honest gap assessment before you invest further in the system",
    ],
    assessmentQuestion: "How long has your authority been active, and how would you describe your current documentation status?",
    assessmentOptions: [
      "Less than 30 days — authority is new, building infrastructure from scratch",
      "30–90 days — building out systems, some gaps I know need to be addressed",
      "90 days to 1 year — operating, but I know compliance gaps exist",
      "Over 1 year — looking to formalize and strengthen what I've been running",
    ],
  },
  {
    code: "LP-GRD-0.5",
    number: "0.5",
    title: "Risk Tolerance Assessment",
    duration: "~15 min",
    pdfLabel: "Risk Exposure Map",
    requiresAuth: true,
    keyPoints: [
      "The FMCSA Safety Measurement System is scoring your operation right now — whether you are checking it or not",
      "Risk in motor carrier operations is not random — it accumulates through predictable, documented patterns",
      "The AUTO Risk Model maps four exposure vectors: Around (regulatory), Under (financial), Through (documentation), Over (timeline)",
      "Your risk tolerance determines whether you install the compliance system now or wait until the audit forces your hand",
    ],
    assessmentQuestion: "Which risk vector is most present in your current operation?",
    assessmentOptions: [
      "Around — I'm uncertain what FMCSA can currently see about my operation",
      "Under — My financial exposure (insurance, cash reserves) is higher than I'd like to admit",
      "Through — I know there are documentation gaps I haven't formally closed",
      "Over — I feel like I'm running out of time to get my systems structured before review",
    ],
  },
  {
    code: "LP-GRD-0.6",
    number: "0.6",
    title: "The Go/No-Go Decision",
    duration: "~14 min",
    pdfLabel: "Go/No-Go Decision Framework",
    requiresAuth: true,
    keyPoints: [
      "This is a self-assessment, not an external evaluation — the honest answer is the only useful one",
      "GO means your foundational infrastructure is aligned enough to install the Standard systematically",
      "WAIT means critical gaps exist — the Standard cannot close structural problems, only build on top of them",
      "NO-GO means your current operational position requires intervention before a structured program can hold",
    ],
    goBridge: [
      "And a GO decision is not 'go figure it out on your own.'",
      "A GO decision means: go install a system that will not let the risks we covered in Ground 0 sneak up on you. That is what the Install Track is for.",
      "Carriers who make a GO decision and then try to self-install compliance systems from FMCSA guidance documents and general trucking forums — they build incomplete systems. Not because they are not capable. Because the FMCSA guidance is not written as an installation guide. It is written as a regulatory reference. There is a difference.",
      "The LaunchPath Standard converts that regulatory reference into a 90-day installation sequence. Module by module. Checkpoint by checkpoint. Verified by a Station Custodian before you proceed.",
      "Your GO decision is the beginning of that installation. The Admission Request Form is the next step.",
    ],
    waitBridge: [
      "When you complete the WAIT Improvement Plan and close the gaps — come back.",
      "Retake the Personal Readiness Check in Lesson 0.4. Run the numbers again. If your score has moved into GO range, submit a fresh Admission Request.",
      "We reserve Install Group seats for operators who complete the WAIT plan. A carrier who worked the plan and returned is more prepared than a carrier who jumped straight from an emotional GO to enrollment.",
      "The seat will be there.",
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
  const [urlMap, setUrlMap] = useState({});

  // Fetch admin-set Vimeo/PDF URLs for Ground 0 lessons
  useEffect(() => {
    fetch(`${API}/api/portal/module-urls/ground-0`)
      .then(r => r.json())
      .then(d => {
        const map = {};
        (d.lessons || []).forEach(l => { map[l.lesson_id] = { vimeo_url: l.vimeo_url, pdf_url: l.pdf_url }; });
        setUrlMap(map);
      })
      .catch(() => {});
  }, [API]);

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
    const nextView = decision === "GO" ? "lesson07" : "complete";
    setView(nextView);
    saveLocal({ completedLessons: newCompleted, finalDecision: decision, view: nextView });
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
    window.location.href = `${process.env.REACT_APP_AUTH_URL}/?redirect=${encodeURIComponent(window.location.origin + "/portal")}`;
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
          urlMap={urlMap}
        />
      )}
      {view === "decision" && <DecisionView onDecide={handleDecision} />}
      {view === "lesson07" && (
        <Lesson07View onViewCompletion={() => { setView("complete"); saveLocal({ view: "complete" }); }} />
      )}
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
      <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: isEmbedded ? "clamp(1.5rem, 2.5vw, 2rem)" : "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
        Ground 0: The Wisdom Module
      </h1>
      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 540, marginBottom: isEmbedded ? "1.5rem" : "2.5rem" }}>
        Six lessons. Approximately 90 minutes. No charge. Required before enrollment — this is the diagnostic and preview layer for the LaunchPath Operating Standard.
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
function LessonView({ lesson, lessonIndex, totalLessons, completedLessons, selectedOption, onSelectOption, onContinue, onBack, onJumpTo, isEmbedded, urlMap }) {
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
      <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#FFFFFF", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        {lesson.title}
      </h2>

      {/* Video — Vimeo embed if URL set, else placeholder */}
      {urlMap[lesson.number]?.vimeo_url ? (
        <div style={{ width: "100%", aspectRatio: "16/9", maxHeight: 360, marginBottom: "2rem", background: "#000" }}>
          <iframe
            src={`${urlMap[lesson.number].vimeo_url}${urlMap[lesson.number].vimeo_url.includes('?') ? '&' : '?'}autoplay=0&byline=0&portrait=0&title=0`}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={lesson.title}
          />
        </div>
      ) : (
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
      )}

      {/* Key Points */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1rem" }}>
          KEY POINTS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {lesson.keyPoints.map((point, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.5)", flexShrink: 0, paddingTop: "0.22rem", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Standard Bridge — Install Track Connection (Lessons 0.2, 0.3) */}
      {lesson.standardBridge && (
        <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.15)", borderLeft: "3px solid rgba(212,144,10,0.5)", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1.25rem" }}>
            THE INSTALL TRACK CONNECTION
          </p>
          {lesson.standardBridge.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: i < lesson.standardBridge.length - 1 ? "0.875rem" : 0 }}>
              {para}
            </p>
          ))}
        </div>
      )}

      {/* GO / WAIT Decision Context — Lesson 0.6 */}
      {(lesson.goBridge || lesson.waitBridge) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
          {lesson.goBridge && (
            <div style={{ background: "rgba(34,197,94,0.03)", border: "1px solid rgba(34,197,94,0.15)", borderLeft: "3px solid rgba(34,197,94,0.4)", padding: "1.5rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(34,197,94,0.65)", marginBottom: "1.25rem" }}>
                GO DOES NOT MEAN PERFECT
              </p>
              {lesson.goBridge.map((para, i) => (
                <p key={i} style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: i < lesson.goBridge.length - 1 ? "0.875rem" : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          )}
          {lesson.waitBridge && (
            <div style={{ background: "rgba(251,191,36,0.03)", border: "1px solid rgba(251,191,36,0.15)", borderLeft: "3px solid rgba(251,191,36,0.4)", padding: "1.5rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(251,191,36,0.55)", marginBottom: "1.25rem" }}>
                DEFINING YOUR EXIT CONDITION IS NOT PESSIMISM
              </p>
              {lesson.waitBridge.map((para, i) => (
                <p key={i} style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: i < lesson.waitBridge.length - 1 ? "0.875rem" : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PDF Download */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "0.75rem" }}>
          REFERENCE DOCUMENT
        </p>
        {urlMap[lesson.number]?.pdf_url ? (
          <a
            href={urlMap[lesson.number].pdf_url}
            target="_blank" rel="noreferrer"
            data-testid={`pdf-download-${lesson.number}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "transparent", border: "1px solid rgba(212,144,10,0.35)", color: "#d4900a", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.75rem 1.25rem", textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download {lesson.pdfLabel}
          </a>
        ) : (
        <button
          data-testid={`pdf-download-${lesson.number}`}
          disabled
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.75rem 1.25rem", cursor: "not-allowed" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {lesson.pdfLabel} — Coming Soon
        </button>
        )}
      </div>

      {/* Self Assessment */}
      {lesson.assessmentQuestion && lesson.assessmentOptions && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1rem" }}>
            SELF-ASSESSMENT
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.87)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
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
                  <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.667rem", fontWeight: 700, color: isSelected ? "#d4900a" : "rgba(255,255,255,0.28)", flexShrink: 0, paddingTop: "0.22rem", letterSpacing: "0.12em" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: isSelected ? "rgba(255,255,255,0.93)" : "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
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
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", color: "rgba(255,255,255,0.28)", marginTop: "0.875rem", textAlign: "right", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          SELECT AN ANSWER ABOVE TO CONTINUE
        </p>
      )}
    </div>
  );
}

// ── Decision View ─────────────────────────────────────────────────────────────
function DecisionView({ onDecide }) {
  return (
    <div data-testid="g0-decision-view">
      <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        LP-MOD-G0-6 | FINAL ASSESSMENT
      </p>
      <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#FFFFFF", marginBottom: "0.875rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        Ground 0 Complete — Make Your Call.
      </h2>
      <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, maxWidth: 520, marginBottom: "2.5rem" }}>
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
            <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, margin: 0 }}>
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
    failLink: "→ LP-BRF-08: The Installation Window",
    failHref: "/knowledge-center/lp-brf-08",
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
    failLink: "→ LP-BRF-07: Before Your First Dispatch",
    failHref: "/knowledge-center/lp-brf-07",
  },
  {
    key: "C",
    label: "C — COMMITMENT",
    fullName: "Commitment",
    passDesc: "Operational timeline and implementation capacity confirmed.",
    failDesc: "Timeline compression identified — available implementation window is insufficient.",
    failLink: "→ LP-BRF-08: The Installation Window",
    failHref: "/knowledge-center/lp-brf-08",
  },
  {
    key: "H",
    label: "H — OPERATIONAL DISCIPLINE",
    fullName: "Operational Discipline",
    passDesc: "Existing file structure or readiness to build confirmed.",
    failDesc: "No operational file structure identified — compliance backbone is absent.",
    failLink: "→ LP-BRF-09: How Patterns Become Evidence",
    failHref: "/knowledge-center/lp-brf-09",
  },
];

function computeReachStatus(answers) {
  // New lesson index mapping (LP-SYS-CUR-001):
  // 0 = 0.1 Welcome (why here)
  // 1 = 0.2 Four Pillars (weakest pillar)
  // 2 = 0.3 Lane Selection
  // 3 = 0.4 Personal Readiness Check (authority age + docs)
  // 4 = 0.5 Risk Tolerance Assessment (AUTO risk vectors)
  const g02 = answers[1] || ""; // weakest pillar
  const g04 = answers[3] || ""; // authority age / doc status
  const g05 = answers[4] || ""; // risk vector

  return {
    R: !(g05.includes("Under") || g02.includes("Pillar 4")),
    E: !(g02.includes("Pillar 3") && g05.includes("Through")),
    A: !(g04.includes("Less than 30") && g05.includes("Around") || g02.includes("Pillar 1")),
    C: !(g05.includes("Over") || (g04.includes("90 days to 1 year") && g05.includes("Through"))),
    H: !(g05.includes("Through") || g02.includes("Pillar 3")),
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
      <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
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
                <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "0.762rem", color: passed ? "rgba(255,255,255,0.75)" : "#FFFFFF", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
                  {pillar.label}
                </p>
                <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.857rem", color: passed ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  {passed ? pillar.passDesc : pillar.failDesc}
                </p>
                {!passed && hasAnyData && (
                  <a
                    href={pillar.failHref}
                    style={{ display: "inline-block", fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontWeight: 600, fontSize: "0.857rem", color: "#d4900a", marginTop: "0.4rem", textDecoration: "none", transition: "opacity 0.15s" }}
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
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "0.924rem", color: "#FFFFFF", marginBottom: "0.375rem" }}>
          {gaps} OF 5 {gaps === 1 ? "GAP" : "GAPS"} REMAINING
        </p>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
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

  // Module roadmap for the GO completion screen
  const MODULE_ROADMAP = [
    { code: "MOD-1", name: "Driver Qualification File", tag: "HARD GATE", tagColor: "rgba(239,68,68,0.75)", desc: "Build the complete, audit-ready DQF for every operating driver" },
    { code: "MOD-2", name: "Authority & Insurance", tag: null, desc: "Install your authority monitoring and insurance continuity systems" },
    { code: "MOD-3", name: "The 16 Deadly Sins", tag: null, desc: "Map and eliminate the 16 documented FMCSA violation patterns" },
    { code: "MOD-4", name: "Drug & Alcohol Program", tag: null, desc: "Install the federal D&A compliance program and Clearinghouse enrollment" },
    { code: "MOD-5", name: "Hours of Service & Dispatch", tag: null, desc: "Build the HOS compliance framework and dispatch records system" },
    { code: "MOD-6", name: "Integrity Audit", tag: "CREDENTIAL GATE", tagColor: "rgba(212,144,10,0.85)", desc: "Full four-pillar system review — clean audit triggers Verified Registry ID" },
    { code: "MOD-7", name: "Post-Audit Recovery", tag: "CONDITIONAL", tagColor: "rgba(251,146,60,0.75)", desc: "Activated only if your audit produces a conditional outcome" },
    { code: "MOD-8", name: "ELD Compliance", tag: "EXTENSION", tagColor: "rgba(129,140,248,0.75)", desc: "Full ELD mandate, exemption, and malfunction compliance" },
    { code: "MOD-9", name: "Hazmat Decisions", tag: "EXTENSION", tagColor: "rgba(129,140,248,0.75)", desc: "Hazmat threshold awareness and carrier decision framework" },
  ];

  return (
    <div data-testid={`g0-complete-${decision.toLowerCase().replace("-", "")}`} style={{ maxWidth: 640, animation: "heroEnter 0.5s ease-out forwards" }}>
      {/* ── Ceremony Header ── */}
      <div style={{ borderTop: `3px solid ${d.color}`, background: "rgba(0,0,0,0.35)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: 0 }}>
          LP-MOD-G0 · GROUND 0 · SEQUENCE COMPLETE
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: d.bgColor, border: `1px solid ${d.borderColor}`, padding: "0.25rem 0.75rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.color, boxShadow: `0 0 8px ${d.color}` }} />
          <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: d.color }}>
            {d.label}
          </span>
        </div>
      </div>
      {/* ── Decision Block ── */}
      <div style={{ background: d.bgColor, border: `1px solid ${d.borderColor}`, borderTop: "none", padding: "2.5rem 2rem" }}>
        <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", marginBottom: "1.25rem", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          {d.headline}
        </h1>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.82, maxWidth: 520, marginBottom: decision !== "GO" ? "2rem" : "0" }}>
          {d.body}
        </p>

        {/* GO path: no CTA here — moved to roadmap section below */}
        {decision !== "GO" && (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href={d.ctaHref} data-testid="g0-completion-cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: d.ctaBg, color: d.ctaColor, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 0.2s", minHeight: 48 }} onMouseEnter={e => e.currentTarget.style.background = "#e8a520"} onMouseLeave={e => e.currentTarget.style.background = d.ctaBg}>
              {d.cta} <ArrowRight size={14} />
            </a>
            <a href={d.secondaryHref} data-testid="g0-completion-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "transparent", color: "rgba(255,255,255,0.65)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.875rem 1.25rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s", minHeight: 48 }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
              {d.secondary} <ArrowRight size={14} />
            </a>
          </div>
        )}
      </div>

      {/* ── GO path: Module roadmap + continuation CTA ── */}
      {decision === "GO" && (
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none" }}>
          {/* What you just completed */}
          <div style={{ padding: "1.75rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(34,197,94,0.65)", marginBottom: "1.25rem" }}>
              GROUND 0 — WHAT YOU COMPLETED
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                "Compliance framework and the Four Pillars of Survival — installed",
                "Operating lane and risk profile — assessed",
                "Personal readiness across five REACH dimensions — evaluated",
                "Risk exposure vectors (AUTO) — mapped",
                "GO/WAIT/NO-GO decision — confirmed",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.32)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    <span style={{ color: "#22c55e", fontSize: "0.5rem", fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.94rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module roadmap preview */}
          <div style={{ padding: "1.75rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1.25rem" }}>
              THE INSTALLATION SEQUENCE — 9 MODULES
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {MODULE_ROADMAP.map((mod, i) => (
                <div key={mod.code} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "0.75rem 0.875rem", background: mod.tag === "CREDENTIAL GATE" ? "rgba(212,144,10,0.04)" : "rgba(255,255,255,0.015)", borderLeft: `2px solid ${mod.tag === "HARD GATE" ? "rgba(239,68,68,0.4)" : mod.tag === "CREDENTIAL GATE" ? "rgba(212,144,10,0.5)" : mod.tag === "CONDITIONAL" ? "rgba(251,146,60,0.3)" : mod.tag === "EXTENSION" ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.1)"}` }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.619rem", fontWeight: 700, color: "rgba(212,144,10,0.5)", flexShrink: 0, paddingTop: "0.18rem", letterSpacing: "0.1em", minWidth: 44 }}>{mod.code}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>{mod.name}</span>
                      {mod.tag && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: mod.tagColor, background: "rgba(0,0,0,0.3)", border: `1px solid ${mod.tagColor}`, padding: "0.1rem 0.4rem", flexShrink: 0 }}>{mod.tag}</span>}
                    </div>
                    <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.5, margin: 0 }}>{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Single continuation CTA */}
          <div style={{ padding: "1.75rem 2rem" }}>
            <a
              href="/admission"
              data-testid="g0-completion-cta"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#d4900a", color: "#000F1F",
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.97rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "1.25rem 1.75rem", textDecoration: "none",
                transition: "background 0.2s", width: "100%", boxSizing: "border-box",
                minHeight: 56,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
              onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
            >
              <span>Continue to Install the LaunchPath Operating System</span>
              <ArrowRight size={18} />
            </a>
            <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginTop: "0.875rem", lineHeight: 1.6 }}>
              NO PAYMENT AT THIS STEP · ADMISSION REVIEWED WITHIN 24 HOURS
            </p>
          </div>
        </div>
      )}

      {/* ── WAIT capture section ── */}
      {decision === "WAIT" && (
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: "2rem" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "2rem" }} />

          {/* Gap Tracker — shows which REACH pillars passed/failed */}
          <GapTracker assessmentAnswers={assessmentAnswers} />

          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(251,191,36,0.5)", marginBottom: "0.875rem" }}>
            LP-STATUS: WAIT | NEXT STEPS
          </p>
          <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.375rem)", color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            YOU ARE NOT READY — YET
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
            The gaps identified above must be closed before admission is possible.
          </p>

          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
            Your operation has gaps that create exposure under active authority. That's a timing issue — not a permanent one.
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
            LaunchPath does not adjust the standard to admit you early. Your readiness must rise to the system.
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "1.75rem" }}>
            When these gaps are closed, you may request admission to the next cohort.
          </p>

          {captureSubmitted ? (
            <div data-testid="g0-wait-success" style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", borderLeft: "3px solid rgba(212,144,10,0.6)", padding: "1.5rem", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.875rem" }}>
                ✓ YOUR SPOT IS SAVED
              </p>
              <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.625rem" }}>
                You'll be first to know when the next cohort opens.
              </p>
              <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
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
            <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "0.75rem" }}>
              BEGIN CLOSING GAPS NOW
            </p>
            <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.78, marginBottom: "1.25rem" }}>
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

          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,113,113,0.5)", marginBottom: "0.875rem" }}>
            LP-STATUS: NO-GO | ELIGIBILITY
          </p>
          <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
            THIS PROGRAM ISN'T THE RIGHT FIT — YET
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
            Based on your Ground 0 results, there's a misalignment with the current requirements of this system.
          </p>

          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
            LaunchPath is built for operators within a specific operational range. Based on your current position, the program isn't applicable right now.
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "1.75rem" }}>
            That may change. Get notified when your situation qualifies — or when a path opens that fits where you are.
          </p>

          {captureSubmitted ? (
            <div data-testid="g0-nogo-success" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: "3px solid rgba(255,255,255,0.3)", padding: "1.5rem", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "0.875rem" }}>
                ✓ YOU'RE ON THE LIST
              </p>
              <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.78, marginBottom: "0.625rem" }}>
                We'll reach out when something relevant opens up.
              </p>
              <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.78 }}>
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
          background: "none", border: "none", fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          fontSize: "0.524rem", color: "rgba(255,255,255,0.22)", cursor: "pointer",
          letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.5rem 0",
          marginTop: "1.5rem", display: "block", transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.22)"}
      >
        REVIEW GROUND 0 AGAIN →
      </button>
    </div>
  );
}

// ── Lesson 0.7 — GO Path Only ─────────────────────────────────────────────────
const L07_MODULES = [
  { num: "01", title: "Authority and Registration Infrastructure", desc: "Your USDOT number, MC authority, BOC-3, UCR. The paperwork that keeps your operating status active and your FMCSA record clean." },
  { num: "02", title: "Driver Qualification File System", desc: "Every document required before a driver touches a wheel. Application. MVR. Medical certificate. Clearinghouse query. Road test. Pre-employment drug test. Built to 49 CFR Part 391 standard." },
  { num: "03", title: "Drug and Alcohol Program", desc: "Enrollment with a C/TPA. Written policy. Driver acknowledgments. Random pool. Clearinghouse obligations. Every component required before first dispatch." },
  { num: "04", title: "Hours of Service and ELD", desc: "Registered device. Compliant logs. Supporting documents by trip. The system that keeps HOS violations from becoming audit findings." },
  { num: "05", title: "Preventive Maintenance and Vehicle Files", desc: "Unit file per VIN. Annual inspection documentation. DVIR process. Maintenance log. This is the proof that you are running safe equipment." },
  { num: "06", title: "Insurance and Authority Continuity", desc: "BMC-91X verification on SAFER. Renewal protocols. The process that ensures a single missed payment does not end your operation." },
  { num: "07", title: "Post-Failure Recovery", desc: "What to do if you receive a Conditional rating, a notice of audit, or an out-of-service order. The recovery protocol so a setback does not become a collapse." },
  { num: "08", title: "Load Profitability and Financial Structure", desc: "True cost per mile. Break-even rate. Cash flow architecture. This is what keeps the truck on the road when a broker takes 60 days to pay." },
  { num: "09", title: "Broker Relationships and Freight Network", desc: "Carrier packet. Broker qualification. Lane discipline. The operational layer that builds your freight network on terms that protect your margins." },
];

function Lesson07View({ onViewCompletion }) {
  const [captureEmail, setCaptureEmail] = React.useState("");
  const [captureStatus, setCaptureStatus] = React.useState("idle"); // idle | loading | done | error
  const API = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  const handleCapture = async (e) => {
    e.preventDefault();
    if (!captureEmail || captureStatus === "done") return;
    setCaptureStatus("loading");
    try {
      const res = await fetch(`${API}/api/go-email-capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: captureEmail }),
      });
      setCaptureStatus(res.ok ? "done" : "error");
    } catch {
      setCaptureStatus("error");
    }
  };

  return (
    <div data-testid="g0-lesson07-view" style={{ maxWidth: 680 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4900a", margin: 0 }}>
          LP-GRD-0.7
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.2rem 0.625rem" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
          <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#22c55e" }}>GO PATH</span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em" }}>5–7 MIN</span>
      </div>

      <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#FFFFFF", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        What Happens After GO
      </h2>

      {/* Intro */}
      <div style={{ marginBottom: "2.5rem" }}>
        {[
          { text: "You made a GO decision. Let me tell you what that actually means — and what comes next.", highlight: false },
          { text: "Ground 0 did one thing: it helped you look at your situation clearly before committing to anything.", highlight: false },
          { text: "You picked a lane. You scored your readiness. You defined where your floor is. You made a written decision.", highlight: false },
          { text: "That is not a small thing. Most operators who fail audits never did any of it. They launched on excitement, not preparation. Ground 0 is what separates a carrier who is structurally ready from a carrier who just wants to be ready.", highlight: false },
          { text: "You are structurally ready. Now comes the build.", highlight: true },
        ].map((item, i) => (
          <p key={i} style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: item.highlight ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.72)", lineHeight: 1.82, marginBottom: "0.875rem", fontWeight: item.highlight ? 600 : 400 }}>
            {item.text}
          </p>
        ))}
      </div>

      {/* 9-Module Overview */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1.25rem" }}>
          WHAT THE LAUNCHPATH STANDARD INSTALLS — NINE MODULES
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {L07_MODULES.map(mod => (
            <div key={mod.num} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.015)", borderLeft: "2px solid rgba(212,144,10,0.25)" }}>
              <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, color: "rgba(212,144,10,0.55)", flexShrink: 0, paddingTop: "0.15rem", letterSpacing: "0.12em", minWidth: 28 }}>
                {mod.num}
              </span>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "0.2rem" }}>
                  {mod.title}
                </p>
                <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.55, margin: 0 }}>
                  {mod.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "That is the system" summary */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem 0", marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
          That is the system.
        </p>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
          Ground 0 helped you decide whether to build it. The Standard is how you build it.
        </p>
        <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", borderLeft: "3px solid rgba(212,144,10,0.55)", padding: "1.25rem 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, marginBottom: "0.625rem" }}>
            <strong style={{ color: "#FFFFFF" }}>Ground 0</strong> helps you decide if you should build.
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, marginBottom: "0.875rem" }}>
            <strong style={{ color: "#FFFFFF" }}>The Install Track</strong> helps you actually build — the authority-protecting, audit-ready, FMCSA-compliant operation — in the next 90 days.
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.857rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
            Not figure it out on your own. Not piece it together from forums and YouTube. Build it with a structured sequence, a Station Custodian who verifies your work at five checkpoints, and a 90-day window that maps directly to your New Entrant audit exposure period.
          </p>
        </div>
      </div>

      {/* Verification + Cohort */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.625rem" }}>
            Five verification checkpoints. A real person reviews your actual compliance files — not a checklist you submitted, your files — against the same criteria an FMCSA investigator uses.
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, margin: 0 }}>
            That is what the $2,500 covers. Not videos. The verified installation of a compliance system that keeps your authority standing.
          </p>
        </div>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.78 }}>
          The next cohort opens on a rolling basis. Seats are limited to 12 carriers per Install Group. That is not a sales tactic. That is a function of how many operations one Station Custodian can verify properly in a 90-day window.
        </p>
      </div>

      {/* Final pitch */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.75rem", marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, marginBottom: "0.875rem" }}>
          If you are GO and you are ready to move — apply now. The form takes about 4 minutes. No payment at this step. I review it and confirm your eligibility within 24 to 48 hours.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.48)", lineHeight: 1.6 }}>
          Apply your GO decision. Join the next LaunchPath Install Group.
        </p>
      </div>

      {/* Email capture */}
      <div style={{ margin: "0 0 2rem", padding: "1.25rem 1.5rem", background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.15)" }}>
        {captureStatus === "done" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            <p style={{ margin: 0, fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.667rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)" }}>
              CONFIRMED — Program details on their way to <span style={{ color: "rgba(212,144,10,0.85)" }}>{captureEmail}</span>
            </p>
          </div>
        ) : (
          <>
            <p style={{ margin: "0 0 0.875rem", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)" }}>
              NOT READY TO APPLY YET? GET PROGRAM DETAILS SENT TO YOU.
            </p>
            <form onSubmit={handleCapture} style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              <input
                data-testid="g0-email-capture-input"
                type="email"
                required
                placeholder="your@email.com"
                value={captureEmail}
                onChange={e => setCaptureEmail(e.target.value)}
                style={{
                  flex: 1, minWidth: 200, padding: "0.75rem 1rem",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace",
                  fontSize: "0.762rem", outline: "none", letterSpacing: "0.04em",
                }}
              />
              <button
                data-testid="g0-email-capture-submit"
                type="submit"
                disabled={captureStatus === "loading"}
                style={{
                  padding: "0.75rem 1.25rem", background: "transparent",
                  border: "1px solid rgba(212,144,10,0.45)", color: "rgba(212,144,10,0.85)",
                  fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace",
                  fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase", cursor: captureStatus === "loading" ? "default" : "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {captureStatus === "loading" ? "SENDING…" : "SEND ME DETAILS"}
              </button>
            </form>
            {captureStatus === "error" && (
              <p style={{ margin: "0.5rem 0 0", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.571rem", color: "rgba(239,68,68,0.7)", letterSpacing: "0.08em" }}>
                Could not save email. Try again or email vince@launchpathedu.com directly.
              </p>
            )}
          </>
        )}
      </div>

      {/* Primary CTA */}
      <div style={{ marginBottom: "2rem" }}>
        <a
          href="/admission"
          data-testid="g0-lesson07-cta"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#d4900a", color: "#000F1F",
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.97rem",
            letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "1.25rem 1.75rem", textDecoration: "none",
            transition: "background 0.2s", width: "100%", boxSizing: "border-box",
            minHeight: 56,
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
          onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
        >
          <span>JOIN THE NEXT INSTALL GROUP</span>
          <ArrowRight size={18} />
        </a>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginTop: "0.875rem", lineHeight: 1.6 }}>
          NO PAYMENT AT THIS STEP · FORM TAKES ABOUT 4 MINUTES · REVIEWED WITHIN 24–48 HOURS
        </p>
      </div>

      {/* Secondary: view completion summary */}
      <button
        data-testid="g0-lesson07-view-summary"
        onClick={onViewCompletion}
        style={{
          background: "none", border: "none",
          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          fontSize: "0.524rem", color: "rgba(255,255,255,0.28)", cursor: "pointer",
          letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.5rem 0",
          display: "block", transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}
      >
        VIEW COMPLETION SUMMARY →
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
        <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.625rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
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
            <PasswordInput
              data-testid="auth-password-input"
              required
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
