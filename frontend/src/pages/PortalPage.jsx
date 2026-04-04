import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Lock, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { usePathname } from 'next/navigation';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { ALL_MODULE_DATA, MODULE_1_DATA } from "../data/moduleData";
import { CURRICULUM, MODULE_OVERVIEWS } from "../data/portalData";
import PortalHeader from "../components/portal/PortalHeader";
import PortalSidebar from "../components/portal/PortalSidebar";
import LockedModuleView, { EnrollCTA } from "../components/portal/LockedModuleView";
import ModuleOverviewCard from "../components/portal/ModuleOverviewCard";
import DeliverablesPortal from "../components/portal/DeliverablesPortal";

// ── Heavy components — code-split, load only when rendered ─────────────────
const Ground0LessonPlayer   = dynamic(() => import("../components/Ground0LessonPlayer"),   { ssr: false, loading: () => <PortalLoading /> });
const AuditReadinessDashboard = dynamic(() => import("../components/AuditReadinessDashboard"), { ssr: false, loading: () => <PortalLoading /> });
const VideoLessonWorkbench  = dynamic(() => import("../components/VideoLessonWorkbench").then(m => ({ default: m.VideoLessonWorkbench })), { ssr: false, loading: () => <PortalLoading /> });
const SignalMonitor         = dynamic(() => import("../components/SignalMonitor"),          { ssr: false, loading: () => null });
const AnnouncementsFeed     = dynamic(() => import("../components/AnnouncementsFeed"),     { ssr: false, loading: () => null });
const VerifiedRegistryID    = dynamic(() => import("../components/VerifiedRegistryID"),    { ssr: false, loading: () => null });
const ModuleChecklist       = dynamic(() => import("../components/ModuleChecklist"),       { ssr: false, loading: () => null });
const TaskItem              = dynamic(() => import("../components/TaskItem"),              { ssr: false, loading: () => null });

function PortalLoading() {
  return (
    <div style={{ padding: "3rem 0", textAlign: "center" }}>
      <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,160,89,0.5)" }}>
        Loading...
      </p>
    </div>
  );
}

// Data is imported from ../data/portalData

export default function PortalPage() {
  const pathname = usePathname();
  const [user, setUser] = useState(location.state?.user || null);
  const [authChecked, setAuthChecked] = useState(location.state?.user ? true : null);
  const [hasCohortAccess, setHasCohortAccess] = useState(null);
  const [selectedId, setSelectedId] = useState("ground-0");
  const [paymentState, setPaymentState] = useState("idle");
  const [stripeSessionId, setStripeSessionId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [submittingTaskId, setSubmittingTaskId] = useState(null);
  const [signalRefreshKey, setSignalRefreshKey] = useState(0);
  const [gateStatuses, setGateStatuses] = useState({});
  const [unlockNotice, setUnlockNotice] = useState(null); // module_id of newly unlocked module
  const [vrfCredential, setVrfCredential] = useState(null);
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem("g0_banner_dismissed") === "true"
  );

  const API = process.env.REACT_APP_BACKEND_URL;

  // Check authentication status on mount
  useEffect(() => {
    if (location.state?.user) {
      // Auth already confirmed — check access next
      checkAccess();
      return;
    }
    const checkAuth = async () => {
      try {
        const resp = await fetch(`${API}/api/auth/me`, { credentials: "include" });
        if (!resp.ok) throw new Error("Not authenticated");
        const userData = await resp.json();
        setUser(userData);
        setAuthChecked(true);
      } catch {
        setAuthChecked(false);
        setHasCohortAccess(false);
      }
    };
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API, location.state]);

  const checkAccess = useCallback(async () => {
    try {
      const resp = await fetch(`${API}/api/portal/access`, { credentials: "include" });
      if (!resp.ok) { setHasCohortAccess(false); return; }
      const data = await resp.json();
      setHasCohortAccess(data.has_access === true);
    } catch {
      setHasCohortAccess(false);
    }
  }, [API]);

  // Once auth is confirmed, check cohort access
  useEffect(() => {
    if (authChecked === true) checkAccess();
  }, [authChecked, checkAccess]);

  // On mount, check for Stripe return session_id in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    if (sid) {
      setStripeSessionId(sid);
      setPaymentState("polling");
      window.history.replaceState({}, document.title, "/portal");
    }
  }, []);

  // Poll payment status when in polling state
  const pollPaymentStatus = useCallback(
    async (sid, attempts = 0) => {
      if (attempts >= 6) {
        setPaymentState("error");
        return;
      }
      try {
        const resp = await fetch(`${API}/api/portal/checkout/status/${sid}`);
        if (!resp.ok) throw new Error("Status check failed");
        const data = await resp.json();
        if (data.payment_status === "paid") {
          setPaymentState("success");
          setHasCohortAccess(true);
          // Deselect locked module so user sees unlocked content
          setSelectedId("module-1");
        } else if (data.status === "expired") {
          setPaymentState("error");
        } else {
          setTimeout(() => pollPaymentStatus(sid, attempts + 1), 2500);
        }
      } catch {
        setTimeout(() => pollPaymentStatus(sid, attempts + 1), 2500);
      }
    },
    [API]
  );

  useEffect(() => {
    if (paymentState === "polling" && stripeSessionId) {
      pollPaymentStatus(stripeSessionId);
    }
  }, [paymentState, stripeSessionId, pollPaymentStatus]);

  const handleCheckout = async () => {
    setPaymentState("loading");
    try {
      const origin = window.location.origin;
      const resp = await fetch(`${API}/api/portal/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ origin_url: origin }),
      });
      if (!resp.ok) throw new Error("Checkout creation failed");
      const data = await resp.json();
      window.location.href = data.url;
    } catch {
      setPaymentState("error");
    }
  };

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    setAuthChecked(false);
  };

  const fetchTasks = useCallback(async () => {
    if (!user?.user_id) return;
    setTasksLoading(true);
    try {
      const resp = await fetch(`${API}/api/tasks/${user.user_id}`, { credentials: "include" });
      if (resp.ok) {
        const data = await resp.json();
        setTasks(data.tasks || []);
      }
    } catch { /* silent */ }
    setTasksLoading(false);
  }, [API, user?.user_id]);

  useEffect(() => {
    if (user?.user_id && hasCohortAccess) fetchTasks();
  }, [user?.user_id, hasCohortAccess, fetchTasks]);

  // Fetch gate statuses for sequential unlock logic
  const fetchGateStatuses = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API}/api/portal/gate-status`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        const prev = gateStatuses;
        const next = data.statuses || {};
        // Detect newly approved modules (was pending_review, now approved)
        for (const modId of Object.keys(next)) {
          if ((prev[modId]?.status === "pending_review" || !prev[modId]) && next[modId]?.status === "approved") {
            setUnlockNotice(modId);
            setTimeout(() => setUnlockNotice(null), 8000);
          }
        }
        setGateStatuses(next);
      }
    } catch {}
  }, [user, API]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user) fetchGateStatuses();
  }, [user, fetchGateStatuses]);

  const handleGateSubmit = async (gateType, moduleId, attestation) => {
    try {
      const res = await fetch(`${API}/api/portal/gate/${gateType}/submit`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module_id: moduleId, attestation }),
      });
      if (res.ok) {
        setGateStatuses(prev => ({ ...prev, [moduleId]: { ...prev[moduleId], status: "pending_review" } }));
      }
    } catch {}
  };

  const handleModuleComplete = async (moduleId) => {
    try {
      const res = await fetch(`${API}/api/portal/module/${moduleId}/complete`, {
        method: "POST", credentials: "include",
      });
      if (res.ok) {
        setGateStatuses(prev => ({ ...prev, [moduleId]: { ...prev[moduleId], status: "complete" } }));
      }
    } catch {}
  };

  useEffect(() => {
    if (!user || !hasCohortAccess) return;
    fetch(`${API}/api/portal/registry-id`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setVrfCredential(d))
      .catch(() => {});
  }, [API, user, hasCohortAccess]);

  // Per-lesson view tracking
  const [lessonProgress, setLessonProgress] = useState({}); // { "module-1": ["1-1", "1-2"], ... }

  // Fetch saved lesson progress from server on load
  useEffect(() => {
    if (!user || !hasCohortAccess) return;
    fetch(`${API}/api/portal/lesson-progress`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.progress) setLessonProgress(d.progress); })
      .catch(() => {});
  }, [API, user, hasCohortAccess]);

  const handleLessonView = async (moduleId, lessonId) => {
    // Optimistic update
    setLessonProgress(prev => ({
      ...prev,
      [moduleId]: [...new Set([...(prev[moduleId] || []), lessonId])],
    }));
    try {
      await fetch(`${API}/api/portal/module/${moduleId}/lesson/${lessonId}/viewed`, {
        method: "POST", credentials: "include",
      });
    } catch {}
  };

  const handleTaskSubmit = async (taskId) => {
    setSubmittingTaskId(taskId);
    // Optimistic update
    setTasks((prev) => prev.map((t) => t.taskId === taskId ? { ...t, status: "submitted" } : t));
    try {
      await fetch(`${API}/api/tasks/${taskId}/submit`, { method: "PATCH", credentials: "include" });
      setSignalRefreshKey((k) => k + 1); // Refresh signal — pulse boost
    } catch { /* silent */ }
    setTimeout(() => fetchTasks(), 500); // Sync with server state
    setSubmittingTaskId(null);
  };

  const selected = CURRICULUM.find((m) => m.id === selectedId);

  // Sequential gate unlock logic (Phase 2)
  const isDone = (modId) => {
    const s = gateStatuses[modId]?.status;
    return s === "approved" || s === "complete" || s === "conditional";
  };

  const isModuleLocked = (mod) => {
    if (!mod || mod.id === "ground-0") return false;
    if (!hasCohortAccess) return true;
    const seq = {
      "module-1": null,
      "module-2": "module-1",
      "module-3": "module-2",
      "module-4": "module-3",
      "module-5": "module-4",
      "module-6": "module-5",
      "module-7": null, // special: only if module-6 outcome=conditional
      "module-8": "module-6",
      "module-9": "module-6",
    };
    if (mod.id === "module-7") return gateStatuses["module-6"]?.outcome !== "conditional";
    const prereq = seq[mod.id];
    if (!prereq) return false;
    return !isDone(prereq);
  };

  const getModuleStatus = (modId) => gateStatuses[modId]?.status || "not_started";

  // All core modules complete (VRF eligibility check — mirrors backend logic)
  const isAllCoreDone = () => {
    const DONE = ["approved", "complete", "conditional"];
    const core = ["module-1", "module-2", "module-3", "module-4", "module-5", "module-6"];
    if (!core.every((id) => DONE.includes(gateStatuses[id]?.status))) return false;
    if (gateStatuses["module-6"]?.status === "conditional") {
      return DONE.includes(gateStatuses["module-7"]?.status);
    }
    return true;
  };

  // ── Auth: Loading ──────────────────────────────────────
  if (authChecked === null) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#0d1c30", minHeight: "100vh", color: "#FFFFFF" }}>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p data-testid="portal-auth-loading" style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.5)" }}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // ── Auth: Login Screen (replaced by Ground 0 lesson player) ───────────────
  if (!authChecked) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#0d1c30", minHeight: "100vh", color: "#FFFFFF" }}>
        <Navbar />
        <Ground0LessonPlayer
          user={null}
          API={API}
          onAuthSuccess={(userData) => {
            setUser(userData);
            setAuthChecked(true);
          }}
        />
        <FooterSection />
      </div>
    );
  }

  // ── Authenticated Portal ────────────────────────────────
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#0d1c30",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <Navbar />

      {/* Portal header strip */}
      <PortalHeader user={user} onLogout={handleLogout} />

      {/* Main layout */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          minHeight: "calc(100vh - 130px)",
        }}
        className="portal-layout"
      >
        {/* ── Sidebar ── */}
        <PortalSidebar
          selectedId={selectedId}
          hasCohortAccess={hasCohortAccess}
          gateStatuses={gateStatuses}
          onSelect={setSelectedId}
          isModuleLocked={isModuleLocked}
          getModuleStatus={getModuleStatus}
          isAllCoreDone={isAllCoreDone}
        />

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: "2.5rem 2.5rem" }} className="portal-main">

          {/* ── G0 Complete Banner ── */}
          {hasCohortAccess === false && !bannerDismissed && (
            <div
              data-testid="g0-complete-banner"
              style={{
                position: "relative",
                background: "rgba(212,144,10,0.05)",
                border: "1px solid rgba(212,144,10,0.22)",
                borderLeft: "3px solid #d4900a",
                padding: "1.25rem 3rem 1.25rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              {/* Dismiss button */}
              <button
                data-testid="g0-banner-dismiss"
                onClick={() => {
                  setBannerDismissed(true);
                  localStorage.setItem("g0_banner_dismissed", "true");
                }}
                style={{
                  position: "absolute",
                  top: "0.875rem",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  padding: "0.25rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                aria-label="Dismiss"
              >
                ×
              </button>

              {/* Code label */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.714rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(212,144,10,0.7)",
                marginBottom: "0.5rem",
              }}>
                LP-MOD-G0 | GROUND 0 COMPLETE
              </p>

              {/* Heading */}
              <p style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.064rem",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                marginBottom: "0.5rem",
              }}>
                Ground 0 Complete — Choose Your Next Step
              </p>

              {/* Body */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.924rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.65,
                marginBottom: "1.125rem",
                maxWidth: 560,
              }}>
                You've completed the Ground 0 orientation. To proceed with the LaunchPath Standard, request admission to the next cohort — or run your REACH diagnostic first to confirm readiness.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href="/admission"
                  data-testid="g0-banner-admission-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    background: "#d4900a",
                    color: "#000F1F",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.857rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.625rem 1.25rem",
                    textDecoration: "none",
                    transition: "background 0.2s",
                    minHeight: 36,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
                >
                  Request Admission →
                </a>
                <a
                  href="/reach-diagnostic"
                  data-testid="g0-banner-reach-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    background: "transparent",
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.857rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.625rem 1.25rem",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.2s",
                    minHeight: 36,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  Run REACH Diagnostic →
                </a>
              </div>
            </div>
          )}
          {/* Announcements Feed — visible to paid cohort users */}
          {hasCohortAccess && <AnnouncementsFeed />}

          {/* ── Verified Registry ID — Persistent Credential Banner ── */}
          {hasCohortAccess && vrfCredential?.issued && (
            <div
              data-testid="vrf-issued-banner"
              style={{
                background: "linear-gradient(90deg, rgba(34,197,94,0.05) 0%, rgba(212,144,10,0.03) 100%)",
                border: "1px solid rgba(34,197,94,0.18)",
                borderLeft: "3px solid #22c55e",
                padding: "0.875rem 1.5rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.65)",
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{
                    fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace",
                    fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em",
                    textTransform: "uppercase", color: "rgba(34,197,94,0.65)",
                    marginBottom: "0.2rem",
                  }}>
                    LP-VRF · VERIFIED REGISTRY · ACTIVE
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.85)", margin: 0 }}>
                    Registry credential issued —{" "}
                    <span style={{
                      fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace",
                      fontWeight: 700, color: "#d4900a", letterSpacing: "0.08em",
                    }}>
                      {vrfCredential.registry_id}
                    </span>
                  </p>
                </div>
              </div>
              <button
                data-testid="vrf-banner-view-btn"
                onClick={() => setSelectedId(
                  gateStatuses["module-6"]?.status === "approved" ? "module-6" : "module-7"
                )}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  background: "transparent", border: "1px solid rgba(34,197,94,0.3)",
                  color: "#22c55e", fontFamily: "'Inter',sans-serif",
                  fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "0.5rem 1rem",
                  cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34,197,94,0.08)"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; }}
              >
                View Credential →
              </button>
            </div>
          )}

          {/* Payment success state */}
          {paymentState === "success" && (
            <div
              data-testid="payment-success"
              style={{
                textAlign: "center",
                maxWidth: 520,
                margin: "4rem auto",
              }}
            >
              <CheckCircle size={48} color="#d4900a" weight="light" style={{ marginBottom: "1.5rem" }} />
              <h2
                style={{
                  fontFamily: "'Newsreader', 'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                }}
              >
                Placement Request Confirmed.
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.87)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Your cohort placement request has been received. You will receive a confirmation
                and next steps within 24 hours.
              </p>
              <div style={{ height: 2, background: "#d4900a", margin: "2rem 0" }} />
              <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.87)", fontStyle: "italic" }}>
                Admission is subject to assessment result and cohort availability.
              </p>
            </div>
          )}

          {/* Payment polling state */}
          {paymentState === "polling" && (
            <div style={{ textAlign: "center", maxWidth: 520, margin: "4rem auto" }}>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.87)", marginBottom: "1rem" }}>
                Confirming your payment...
              </p>
              <p style={{ fontSize: "0.857rem", color: "rgba(255,255,255,0.82)" }}>
                This will only take a moment.
              </p>
            </div>
          )}

          {/* Normal content state */}
          {paymentState !== "success" && paymentState !== "polling" && (
            <>
              {/* Ground 0 is selected (always unlocked) */}
              {selected?.id === "ground-0" && (
                <div data-testid="ground0-module-content">
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.762rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#d4900a",
                      marginBottom: "1.25rem",
                    }}
                  >
                    LP-MOD-G0 | GROUND 0 — FREE ACCESS
                  </p>

                  {/* ── Administrative Health Monitor ── */}
                  <SignalMonitor carrierId={user?.user_id} refreshKey={signalRefreshKey} />

                  {/* ── IMPLEMENTATION_SEQUENCE — Carrier Tasks ── */}
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "0.875rem",
                      paddingBottom: "0.875rem", marginBottom: "0.25rem",
                      borderBottom: "1px solid rgba(212,144,10,0.12)",
                    }}>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em",
                        color: "rgba(212,144,10,0.85)", textTransform: "uppercase", margin: 0,
                      }}>
                        IMPLEMENTATION_SEQUENCE
                      </p>
                      <div style={{ flex: 1, height: 1, background: "rgba(212,144,10,0.12)" }} />
                      {tasks.length > 0 && (
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.762rem", letterSpacing: "0.12em",
                          color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                        }}>
                          {tasks.filter(t => t.status === "verified").length}/{tasks.length} VERIFIED
                        </span>
                      )}
                    </div>

                    {tasksLoading ? (
                      <div style={{ padding: "1.5rem", textAlign: "center" }}>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.714rem", letterSpacing: "0.16em",
                          color: "rgba(212,144,10,0.5)", textTransform: "uppercase",
                        }}>
                          LOADING_SEQUENCE...
                        </p>
                      </div>
                    ) : tasks.length === 0 ? (
                      <div style={{ padding: "1.5rem", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.714rem", letterSpacing: "0.16em",
                          color: "rgba(255,255,255,0.28)", textTransform: "uppercase",
                        }}>
                          NO_TASKS_ASSIGNED
                        </p>
                      </div>
                    ) : (
                      tasks.map((task) => (
                        <TaskItem
                          key={task.taskId}
                          task={task}
                          onSubmit={handleTaskSubmit}
                          loading={submittingTaskId}
                        />
                      ))
                    )}
                  </div>

                  {/* Interactive lesson player */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem" }}>
                    <Ground0LessonPlayer
                      user={user}
                      API={API}
                      isEmbedded={true}
                      onAuthSuccess={(userData) => {
                        setUser(userData);
                        setAuthChecked(true);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Unlock notification */}
              {unlockNotice && (
                <div data-testid="unlock-notice" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", borderLeft: "4px solid #22c55e", padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <CheckCircle size={18} color="#22c55e" />
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.857rem", color: "#22c55e", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.2rem" }}>MODULE APPROVED — SYSTEM ADVANCED</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.55)" }}>Your {unlockNotice?.replace("-", " ")?.toUpperCase()} submission was approved by the Station Custodian. Your next module is now unlocked.</p>
                  </div>
                </div>
              )}

              {/* Paid module selected — gate-aware routing */}
              {selected?.id !== "ground-0" && !isModuleLocked(selected) && (() => {
                const status = getModuleStatus(selected?.id);
                const isGateModule = selected?.id === "module-1" || selected?.id === "module-6";
                const notes = gateStatuses[selected?.id]?.custodian_notes;

                // Pending Custodian Review state
                if (status === "pending_review") return (
                  <div data-testid="module-pending-review" style={{ maxWidth: 580 }}>
                    <div style={{ border: "1px solid rgba(245,158,11,0.3)", borderLeft: "4px solid #f59e0b", background: "rgba(245,158,11,0.04)", padding: "2rem" }}>
                      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "0.75rem" }}>PENDING STATION CUSTODIAN REVIEW</p>
                      <h2 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.875rem" }}>Submission Under Review</h2>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                        Your <strong style={{ color: "#fff" }}>{selected?.label}</strong> submission has been received by the Station Custodian. Review is typically completed within <strong style={{ color: "rgba(255,255,255,0.85)" }}>2 business days</strong>. You will be notified by email when a decision is made.
                      </p>
                      <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem 1.25rem", marginBottom: notes ? "0.875rem" : 0 }}>
                        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.619rem", color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>ITEMS UNDER REVIEW</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          {selected?.id === "module-1"
                            ? "Driver Qualification File — completeness, accuracy, and audit-readiness for all operating drivers including owner-operator."
                            : "Integrity Audit — four-pillar compliance system review across Driver Qualification, Insurance, Drug & Alcohol, and Hours of Service."}
                        </p>
                      </div>
                      {notes && (
                        <div style={{ marginTop: "0.875rem", background: "rgba(0,0,0,0.2)", padding: "0.875rem 1rem", borderLeft: "2px solid #f59e0b" }}>
                          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.619rem", color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.25rem" }}>STATION CUSTODIAN NOTE</p>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.75)" }}>{notes}</p>
                        </div>
                      )}
                      <div style={{ marginTop: "1.25rem", padding: "0.75rem 1rem", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                          While you wait, continue reviewing earlier lessons. Your next module will unlock automatically when the review is approved.
                        </p>
                      </div>
                    </div>
                  </div>
                );

                // Revisions Needed state — show issue + let them fix and re-submit
                if (status === "revisions_needed") {
                  const modData = ALL_MODULE_DATA[selected?.id] || (selected?.id === "module-1" ? MODULE_1_DATA : null);
                  return (
                    <div data-testid="module-revisions-needed">
                      {/* Revisions banner */}
                      <div style={{ border: "1px solid rgba(239,68,68,0.35)", borderLeft: "4px solid #ef4444", background: "rgba(239,68,68,0.04)", padding: "1.5rem 2rem", marginBottom: "2rem" }}>
                        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ef4444", marginBottom: "0.625rem" }}>REVISIONS NEEDED · ACTION REQUIRED</p>
                        <h2 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "1.35rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
                          Station Custodian Review — Revisions Required
                        </h2>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: notes ? "1rem" : 0 }}>
                          Your <strong style={{ color: "#fff" }}>{selected?.label}</strong> submission requires corrections. Review the notes below, update your compliance documents, and re-submit when all items are addressed.
                        </p>
                        {notes && (
                          <div style={{ background: "rgba(0,0,0,0.25)", padding: "0.875rem 1.25rem", borderLeft: "3px solid #ef4444" }}>
                            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.619rem", color: "#ef4444", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.375rem" }}>STATION CUSTODIAN NOTES</p>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>{notes}</p>
                          </div>
                        )}
                      </div>
                      {/* Lesson player so they can review and fix */}
                      {modData && (
                        <VideoLessonWorkbench
                          moduleData={modData}
                          gateStatus={status}
                          onGateSubmit={null}
                          viewedLessons={lessonProgress[selected?.id] || []}
                          onLessonView={(lessonId) => handleLessonView(selected?.id, lessonId)}
                        />
                      )}
                      {/* Re-submit via checklist */}
                      {modData?.completionChecklist && (
                        <ModuleChecklist
                          moduleId={selected?.id}
                          moduleCode={modData?.code || selected?.code}
                          checklist={modData.completionChecklist}
                          isGateModule={isGateModule}
                          gateType={isGateModule ? (selected?.id === "module-1" ? "dqf_gate" : "integrity_audit") : null}
                          gateStatus={status}
                          onGateSubmit={(attestation) => handleGateSubmit(
                            selected?.id === "module-1" ? "dqf_gate" : "integrity_audit",
                            selected?.id,
                            attestation
                          )}
                          onModuleComplete={() => handleModuleComplete(selected?.id)}
                        />
                      )}
                    </div>
                  );
                }

                // Module 1 — DQF Gate
                if (selected?.id === "module-1") return (
                  <div>
                    <VideoLessonWorkbench
                      moduleData={MODULE_1_DATA}
                      gateStatus={status}
                      onGateSubmit={(attestation) => handleGateSubmit("dqf_gate", "module-1", attestation)}
                      viewedLessons={lessonProgress["module-1"] || []}
                      onLessonView={(lessonId) => handleLessonView("module-1", lessonId)}
                    />
                    <ModuleChecklist
                      moduleId="module-1"
                      moduleCode="MOD-1"
                      checklist={MODULE_1_DATA.completionChecklist}
                      isGateModule={true}
                      gateType="dqf_gate"
                      gateStatus={status}
                      onGateSubmit={(attestation) => handleGateSubmit("dqf_gate", "module-1", attestation)}
                    />
                  </div>
                );

                // Module 6 approved (clean path) — credential ceremony
                if (selected?.id === "module-6" && status === "approved") return (
                  <VerifiedRegistryID user={user} />
                );

                // Module 7 complete + all core done (conditional path) — credential ceremony
                if (selected?.id === "module-7" && status === "complete" && isAllCoreDone()) return (
                  <VerifiedRegistryID user={user} />
                );

                // Modules 2–9 — VideoLessonWorkbench + ModuleChecklist
                const modData = ALL_MODULE_DATA[selected?.id];
                if (modData) return (
                  <div>
                    <VideoLessonWorkbench
                      moduleData={modData}
                      gateStatus={status}
                      onGateSubmit={modData.gateType ? (attestation) => handleGateSubmit(modData.gateType, selected.id, attestation) : null}
                      viewedLessons={lessonProgress[selected?.id] || []}
                      onLessonView={(lessonId) => handleLessonView(selected?.id, lessonId)}
                    />
                    {status !== "complete" && status !== "approved" && (
                      <ModuleChecklist
                        moduleId={selected?.id}
                        moduleCode={modData.code}
                        checklist={modData.completionChecklist || []}
                        isGateModule={!!modData.gateType}
                        gateType={modData.gateType}
                        gateStatus={status}
                        onGateSubmit={modData.gateType ? (attestation) => handleGateSubmit(modData.gateType, selected.id, attestation) : null}
                        onModuleComplete={() => handleModuleComplete(selected?.id)}
                      />
                    )}
                    {(status === "complete" || status === "approved") && (
                      <div data-testid="module-complete-banner" style={{ marginTop: "1.5rem", padding: "0.875rem 1rem", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <CheckCircle size={14} color="#22c55e" />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>Module Installed — Next Module Unlocked</span>
                      </div>
                    )}
                  </div>
                );

                // Fallback: overview
                return (
                  <div>
                    <ModuleOverviewCard moduleInfo={MODULE_OVERVIEWS[selected?.id]} type={selected?.type} />
                  </div>
                );
              })()}

              {/* Locked module — show preview + paywall or gate message */}
              {selected?.id !== "ground-0" && isModuleLocked(selected) && (() => {
                // Payment locked
                if (!hasCohortAccess) return <LockedModuleView moduleInfo={MODULE_OVERVIEWS[selected?.id]} type={selected?.type} onCheckout={handleCheckout} paymentState={paymentState} />;
                // Gate locked (sequential prerequisite not met)
                const prereqMap = { "module-2": "Module 1", "module-3": "Module 2", "module-4": "Module 3", "module-5": "Module 4", "module-6": "Module 5", "module-7": "Module 6 (conditional outcome required)", "module-8": "Module 6", "module-9": "Module 6" };
                return (
                  <div data-testid="gate-locked-view" style={{ padding: "2rem", border: "1px solid rgba(255,255,255,0.07)", maxWidth: 520 }}>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.75rem" }}>MODULE LOCKED</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                      <strong style={{ color: "#fff" }}>{selected?.label}</strong> unlocks after {prereqMap[selected?.id] || "the previous module"} is complete.
                    </p>
                  </div>
                );
              })()}
            </>
          )}
          {/* Deliverables — visible to all paid portal users */}
          {hasCohortAccess && <DeliverablesPortal API={process.env.REACT_APP_BACKEND_URL} />}

          {/* Monthly Audit Readiness Dashboard — all logged-in users */}
          {user && (
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem" }}>
              <AuditReadinessDashboard />
            </div>
          )}
        </main>
      </div>

      <FooterSection />

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .portal-layout { flex-direction: column !important; }
          .portal-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.5rem 0 !important; }
          .portal-main { padding: 2rem 1.25rem !important; }
          .portal-header-userinfo { display: none !important; }
        }
      `}} />
    </div>
  );
}

// LockedModuleView, EnrollCTA, ModuleOverviewCard, DeliverablesPortal
// are now imported from src/components/portal/

