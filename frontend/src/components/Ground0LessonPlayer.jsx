import React, { useState, useEffect, useCallback } from "react";
import { LESSONS } from "../data/ground0Data";
import OverviewView from "./ground0/OverviewView";
import LessonView from "./ground0/LessonView";
import ReachRedirectView from "./ground0/ReachRedirectView";
import CompleteView from "./ground0/CompleteView";
import Lesson07View from "./ground0/Lesson07View";
import AuthGateModal from "./ground0/AuthGateModal";

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
            setView("complete");
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
      setView("complete");
      saveLocal({ view: "complete" });
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
    const newCompleted = [...new Set([...completedLessons, lessonIndex])];
    const nextIndex = lessonIndex + 1;
    saveLocal({ completedLessons: newCompleted, lessonIndex: nextIndex, view: "lesson" });
    fetch(`${API}/api/ground0/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ completed_lessons: newCompleted, decision: finalDecision || null }),
    }).catch(() => {});
    setCompletedLessons(newCompleted);
    setLessonIndex(nextIndex);
    setSelectedOption(null);
    setLocalUser(userData);
    setShowAuthModal(false);
    setAuthError("");
    setAuthForm({ name: "", email: "", password: "" });
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
    saveLocal({ view, lessonIndex, completedLessons, finalDecision });
    window.location.href = `${process.env.REACT_APP_AUTH_URL}/?redirect=${encodeURIComponent(window.location.origin + "/portal")}`;
  };

  if (!progressLoaded) return null;

  return (
    <div
      data-testid="ground0-lesson-player"
      style={{
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
      {view === "decision" && <ReachRedirectView />}
      {view === "lesson07" && (
        <Lesson07View onViewCompletion={() => { setView("complete"); saveLocal({ view: "complete" }); }} />
      )}
      {view === "complete" && (
        <CompleteView
          API={API}
          assessmentAnswers={assessmentAnswers}
          onViewLesson07={() => { setView("lesson07"); saveLocal({ view: "lesson07" }); }}
          onRestart={() => {
            setView("overview");
            setCompletedLessons([]);
            setFinalDecision(null);
            setAssessmentAnswers({});
            saveLocal({});
          }}
        />
      )}

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
