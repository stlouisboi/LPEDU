import React, { useState, useEffect, useCallback } from "react";
import { Lock, CheckCircle, ArrowRight, GoogleLogo, SignOut } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import SignalMonitor from "../components/SignalMonitor";
import TaskItem from "../components/TaskItem";

const CURRICULUM = [
  {
    id: "ground-0",
    code: "GROUND 0",
    label: "The Wisdom Module",
    modules: 6,
    locked: false,
    status: "UNLOCKED",
  },
  {
    id: "module-1",
    code: "MODULE 1",
    label: "Business and Authority Setup",
    modules: 7,
    locked: true,
  },
  {
    id: "module-2",
    code: "MODULE 2",
    label: "Insurance Survival",
    modules: 6,
    locked: true,
  },
  {
    id: "module-3",
    code: "MODULE 3",
    label: "The 16 Deadly Sins",
    modules: 8,
    locked: true,
  },
  {
    id: "module-4",
    code: "MODULE 4",
    label: "New Entrant Audit Prep",
    modules: 6,
    locked: true,
  },
  {
    id: "module-5",
    code: "MODULE 5",
    label: "Load Discipline and Cash Flow",
    modules: 6,
    locked: true,
  },
  {
    id: "module-6",
    code: "MODULE 6",
    label: "Stabilization and Long-Term Authority Protection",
    modules: 5,
    locked: true,
  },
  {
    id: "module-7",
    code: "MODULE 7",
    label: "Post-Audit Recovery",
    modules: 4,
    locked: true,
  },
];

const GROUND0_MODULES = [
  { number: "G0-1", title: "The Reality of Motor Carrier Authority", duration: "~12 min" },
  { number: "G0-2", title: "The 90-Day Survival Window", duration: "~15 min" },
  { number: "G0-3", title: "The AUTO Risk Model", duration: "~18 min" },
  { number: "G0-4", title: "The Four Pillars of Survival", duration: "~14 min" },
  { number: "G0-5", title: "The 16 Deadly Sins", duration: "~20 min" },
  { number: "G0-6", title: "The GO / WAIT / NO-GO Decision", duration: "~16 min" },
];

export default function PortalPage() {
  const location = useLocation();
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

  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const handleGoogleLogin = () => {
    const redirectUrl = window.location.origin + "/portal";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const selected = CURRICULUM.find((m) => m.id === selectedId);
  // A module is locked if hasCohortAccess is false (or null) AND it's not ground-0
  const isModuleLocked = (mod) => mod.id !== "ground-0" && !hasCohortAccess;

  // ── Auth: Loading ──────────────────────────────────────
  if (authChecked === null) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#001A33", minHeight: "100vh", color: "#FFFFFF" }}>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p data-testid="portal-auth-loading" style={{ fontSize: "0.896rem", color: "rgba(255,255,255,0.5)" }}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // ── Auth: Login Screen ──────────────────────────────────
  if (!authChecked) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#001A33", minHeight: "100vh", color: "#FFFFFF" }}>
        <Navbar />
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "120px 2rem 80px", textAlign: "center" }}>
          <p style={{
            fontSize: "0.672rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "1.5rem",
          }}>
            OPERATOR PORTAL
          </p>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            LaunchPath Cohort Access
          </h1>
          <p style={{ fontSize: "1.008rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Sign in to access your cohort curriculum, compliance tools, and the 90-Day Operating Standard.
          </p>
          <button
            data-testid="google-login-btn"
            onClick={handleGoogleLogin}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              gap: "0.75rem", minHeight: 52, background: "#FFFFFF", color: "#1A1A1A",
              border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600,
              fontSize: "1rem", cursor: "pointer", padding: "1rem 2.5rem",
              transition: "background 0.2s", width: "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F0F0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
          >
            <GoogleLogo size={20} weight="bold" />
            Continue with Google
          </button>
          <p style={{ fontSize: "0.784rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem" }}>
            Your Google account is used to verify identity only. No data is shared.
          </p>
        </div>
        <FooterSection />
      </div>
    );
  }

  // ── Authenticated Portal ────────────────────────────────
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#001A33",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <Navbar />

      {/* Portal header strip */}
      <div
        style={{
          background: "#000F1F",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "1.25rem 2rem",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.672rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C5A059",
            }}
          >
            LAUNCHPATH COHORT PORTAL
          </p>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>—</span>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.616rem",
              fontWeight: 700,
              color: "rgba(197,160,89,0.85)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              flex: 1,
            }}
          >
            SYSTEM_STATUS_MONITOR &nbsp;|&nbsp; LPOS v1.0
          </p>
          {user && (
            <div className="portal-header-userinfo" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.56rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
              }}>
                OPERATOR: {(user.name || user.email || "").toUpperCase().slice(0, 20)}
              </p>
              <button
                data-testid="portal-logout-btn"
                onClick={handleLogout}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: "none", border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.60)", fontFamily: "'Inter', sans-serif",
                  fontSize: "0.728rem", cursor: "pointer", padding: "0.35rem 0.75rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.60)"; }}
              >
                <SignOut size={12} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

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
        <aside
          style={{
            width: 300,
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,0.08)",
            padding: "2rem 0",
          }}
          className="portal-sidebar"
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.56rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
              padding: "0 1.5rem",
              marginBottom: "1.25rem",
            }}
          >
            IMPLEMENTATION SEQUENCE
          </p>

          {CURRICULUM.map((mod) => {
            const isActive = selectedId === mod.id;
            const locked = isModuleLocked(mod);
            return (
              <button
                key={mod.id}
                data-testid={`sidebar-module-${mod.id}`}
                onClick={() => setSelectedId(mod.id)}
                style={{
                  width: "100%",
                  background: isActive ? "rgba(197,160,89,0.08)" : "none",
                  border: "none",
                  borderLeft: isActive ? "3px solid #C5A059" : "3px solid transparent",
                  cursor: "pointer",
                  padding: "1rem 1.5rem",
                  textAlign: "left",
                  transition: "background 0.15s, border-color 0.15s",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "none"; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    {locked ? (
                      <Lock size={12} weight="bold" color="#C5A059" style={{ flexShrink: 0 }} />
                    ) : (
                      <CheckCircle size={12} weight="bold" color="#22c55e" style={{ flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.784rem",
                      color: locked ? "rgba(255,255,255,0.75)" : "#FFFFFF", letterSpacing: "0.04em",
                    }}>
                      {mod.code}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.784rem",
                    color: locked ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.90)",
                    lineHeight: 1.4, marginBottom: "0.3rem",
                  }}>
                    {mod.label}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.672rem",
                    color: locked ? "rgba(255,255,255,0.42)" : "rgba(197,160,89,0.9)", letterSpacing: "0.04em",
                  }}>
                    {mod.modules} implementation modules{mod.id === "ground-0" ? " — UNLOCKED" : locked ? "" : " — COHORT ACCESS"}
                  </p>
                </div>
              </button>
            );
          })}

          {/* ── SYSTEM STATUS block ── */}
          <div
            data-testid="system-status-block"
            style={{
              margin: "1.5rem 1rem 0",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "1.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.616rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,0.85)",
              marginBottom: "0.25rem",
              padding: "0 0.5rem",
            }}>
              SYSTEM STATUS
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "1rem",
              padding: "0 0.5rem",
            }}>
              LP-MOD-G0
            </p>

            <div style={{ padding: "0 0.5rem", marginBottom: "0.75rem" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.784rem",
                color: "rgba(255,255,255,0.80)",
                marginBottom: "0.5rem",
              }}>
                Ground 0 Installation
              </p>
              {/* Full progress bar */}
              <div style={{ background: "rgba(255,255,255,0.08)", height: 4, marginBottom: "0.4rem" }}>
                <div style={{ background: "#22c55e", height: "100%", width: "100%" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.1em",
                  color: "rgba(34,197,94,0.85)",
                }}>
                  Complete ✓
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.616rem",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  6 / 6
                </p>
              </div>
            </div>

            <div style={{ padding: "0.625rem 0.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.672rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}>
                Status
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.784rem",
                color: "rgba(255,255,255,0.80)",
                marginBottom: "0.875rem",
              }}>
                Ready for Next Phase
              </p>
              <a
                href="/ground-0-complete"
                data-testid="sidebar-view-options-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.784rem",
                  fontWeight: 600,
                  color: "#C5A059",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Options <ArrowRight size={11} />
              </a>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: "2.5rem 2.5rem" }} className="portal-main">

          {/* ── G0 Complete Banner ── */}
          {hasCohortAccess === false && !bannerDismissed && (
            <div
              data-testid="g0-complete-banner"
              style={{
                position: "relative",
                background: "rgba(197,160,89,0.05)",
                border: "1px solid rgba(197,160,89,0.22)",
                borderLeft: "3px solid #C5A059",
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
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.504rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(197,160,89,0.7)",
                marginBottom: "0.5rem",
              }}>
                LP-MOD-G0 | GROUND 0 COMPLETE
              </p>

              {/* Heading */}
              <p style={{
                fontFamily: "'Manrope', sans-serif",
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
                    background: "#C5A059",
                    color: "#000F1F",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.784rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.625rem 1.25rem",
                    textDecoration: "none",
                    transition: "background 0.2s",
                    minHeight: 36,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#d4b06a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C5A059")}
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
                    fontSize: "0.784rem",
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
              <CheckCircle size={48} color="#C5A059" weight="light" style={{ marginBottom: "1.5rem" }} />
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                }}
              >
                Placement Request Confirmed.
              </h2>
              <p style={{ fontSize: "1.008rem", color: "rgba(255,255,255,0.87)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Your cohort placement request has been received. You will receive a confirmation
                and next steps within 24 hours.
              </p>
              <div style={{ height: 2, background: "#C5A059", margin: "2rem 0" }} />
              <p style={{ fontSize: "0.896rem", color: "rgba(255,255,255,0.87)", fontStyle: "italic" }}>
                Admission is subject to assessment result and cohort availability.
              </p>
            </div>
          )}

          {/* Payment polling state */}
          {paymentState === "polling" && (
            <div style={{ textAlign: "center", maxWidth: 520, margin: "4rem auto" }}>
              <p style={{ fontSize: "1.008rem", color: "rgba(255,255,255,0.87)", marginBottom: "1rem" }}>
                Confirming your payment...
              </p>
              <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.82)" }}>
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
                      fontSize: "0.672rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#C5A059",
                      marginBottom: "1.25rem",
                    }}
                  >
                    LP-MOD-G0 | GROUND 0 — FREE ACCESS
                  </p>

                  <h1
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      color: "#FFFFFF",
                      marginBottom: "0.75rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Ground 0 Orientation
                  </h1>

                  <p
                    style={{
                      fontSize: "1.008rem",
                      color: "rgba(255,255,255,0.82)",
                      lineHeight: 1.8,
                      maxWidth: 560,
                      marginBottom: "2.5rem",
                    }}
                  >
                    Six implementation modules. Approximately 95 minutes. No charge. This is the entry point for the LaunchPath Operating Standard.
                  </p>


                  {/* ── Administrative Health Monitor ── */}
                  <SignalMonitor carrierId={user?.user_id} refreshKey={signalRefreshKey} />

                  {/* ── IMPLEMENTATION_SEQUENCE — Carrier Tasks ── */}
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "0.875rem",
                      paddingBottom: "0.875rem", marginBottom: "0.25rem",
                      borderBottom: "1px solid rgba(197,160,89,0.12)",
                    }}>
                      <p style={{
                        fontFamily: "'JetBrains Mono','Courier New',monospace",
                        fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.18em",
                        color: "rgba(197,160,89,0.85)", textTransform: "uppercase", margin: 0,
                      }}>
                        IMPLEMENTATION_SEQUENCE
                      </p>
                      <div style={{ flex: 1, height: 1, background: "rgba(197,160,89,0.12)" }} />
                      {tasks.length > 0 && (
                        <span style={{
                          fontFamily: "'JetBrains Mono','Courier New',monospace",
                          fontSize: "0.448rem", letterSpacing: "0.12em",
                          color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                        }}>
                          {tasks.filter(t => t.status === "verified").length}/{tasks.length} VERIFIED
                        </span>
                      )}
                    </div>

                    {tasksLoading ? (
                      <div style={{ padding: "1.5rem", textAlign: "center" }}>
                        <p style={{
                          fontFamily: "'JetBrains Mono','Courier New',monospace",
                          fontSize: "0.504rem", letterSpacing: "0.16em",
                          color: "rgba(197,160,89,0.5)", textTransform: "uppercase",
                        }}>
                          LOADING_SEQUENCE...
                        </p>
                      </div>
                    ) : tasks.length === 0 ? (
                      <div style={{ padding: "1.5rem", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p style={{
                          fontFamily: "'JetBrains Mono','Courier New',monospace",
                          fontSize: "0.504rem", letterSpacing: "0.16em",
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

                  {/* Implementation modules */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      marginBottom: "2rem",
                    }}
                  >
                    {GROUND0_MODULES.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem 1.5rem",
                          borderBottom:
                            idx < GROUND0_MODULES.length - 1
                              ? "1px solid rgba(255,255,255,0.06)"
                              : "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 700,
                              fontSize: "0.784rem",
                              color: "#C5A059",
                              minWidth: 28,
                            }}
                          >
                            {m.number}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.98rem",
                              color: "rgba(255,255,255,0.93)",
                            }}
                          >
                            {m.title}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.784rem",
                            color: "rgba(255,255,255,0.78)",
                          }}
                        >
                          {m.duration}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="/ground-0-briefing"
                    data-testid="go-to-ground0-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(197,160,89,0.1)",
                      border: "1px solid rgba(197,160,89,0.4)",
                      color: "#C5A059",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.84rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.875rem 1.5rem",
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(197,160,89,0.18)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgba(197,160,89,0.1)")
                    }
                  >
                    Go to Ground 0 Briefing <ArrowRight size={14} />
                  </a>

                  {/* ── Ground 0 Complete — Next Steps banner ── */}
                  <div
                    data-testid="g0-next-steps-banner"
                    style={{
                      marginTop: "2.5rem",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      paddingTop: "2rem",
                    }}
                  >
                    <div style={{
                      background: "rgba(34,197,94,0.06)",
                      border: "1px solid rgba(34,197,94,0.18)",
                      padding: "1.5rem",
                      maxWidth: 520,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
                        <CheckCircle size={16} color="#22c55e" weight="bold" />
                        <p style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.616rem",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(34,197,94,0.85)",
                          margin: 0,
                        }}>
                          Ground 0 Complete — Your Next Step
                        </p>
                      </div>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.78)",
                        lineHeight: 1.7,
                        marginBottom: "1.25rem",
                      }}>
                        You have completed the orientation phase. Three paths forward are available based on your operational situation.
                      </p>
                      <a
                        href="/ground-0-complete"
                        data-testid="g0-view-options-btn"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.784rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#C5A059",
                          textDecoration: "none",
                          transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        View Your Options <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Paid module selected — show content */}
              {selected?.id !== "ground-0" && !isModuleLocked(selected) && (
                <div data-testid="unlocked-module-content">
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase", color: "#22c55e", marginBottom: "1.25rem",
                  }}>
                    {selected?.code} — COHORT ACCESS GRANTED
                  </p>
                  <h1 style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF",
                    marginBottom: "0.75rem", letterSpacing: "-0.02em",
                  }}>
                    {selected?.label}
                  </h1>
                  <p style={{ fontSize: "1.008rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.8, maxWidth: 540, marginBottom: "2.5rem" }}>
                    {selected?.modules} implementation modules. Content is being prepared for this cohort.
                    You will receive an email when your module is released.
                  </p>
                  <div style={{
                    background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)",
                    padding: "1.5rem", maxWidth: 480,
                  }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", color: "rgba(255,255,255,0.87)", lineHeight: 1.7 }}>
                      Your cohort access has been confirmed. LaunchPath curriculum releases are
                      coordinated through your cohort schedule. Check your email for your next steps
                      and release calendar.
                    </p>
                  </div>
                </div>
              )}

              {/* Locked module selected — show payment screen */}
              {selected?.id !== "ground-0" && isModuleLocked(selected) && (
                <div
                  data-testid="payment-screen"
                  style={{ maxWidth: 540, margin: "2rem 0" }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.672rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C5A059",
                      marginBottom: "1.5rem",
                    }}
                  >
                    COHORT ADMISSION
                  </p>

                  <h2
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                      color: "#FFFFFF",
                      marginBottom: "1.25rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    You have completed Ground 0.
                  </h2>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.008rem",
                      color: "rgba(255,255,255,0.87)",
                      lineHeight: 1.85,
                      marginBottom: "2.5rem",
                      maxWidth: 480,
                    }}
                  >
                    The LaunchPath 90-Day Compliance Operating Standard continues in Module 1.
                    Cohort access includes all seven modules, the compliance tool library,
                    milestone verifications, and Station Custodian review before your audit
                    window closes.
                  </p>

                  {/* Price line */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem 1.5rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.896rem",
                        color: "rgba(255,255,255,0.87)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Cohort admission
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.344rem",
                        color: "#C5A059",
                      }}
                    >
                      $5,000
                    </span>
                  </div>

                  {paymentState === "error" && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: "0.896rem",
                        marginBottom: "1rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    data-testid="request-cohort-btn"
                    onClick={handleCheckout}
                    disabled={paymentState === "loading"}
                    style={{
                      width: "100%",
                      minHeight: 52,
                      background: "#C5A059",
                      color: "#002244",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.98rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: paymentState === "loading" ? "wait" : "pointer",
                      padding: "1rem",
                      transition: "background 0.2s",
                      opacity: paymentState === "loading" ? 0.8 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (paymentState !== "loading")
                        e.currentTarget.style.background = "#D4B87A";
                    }}
                    onMouseLeave={(e) => {
                      if (paymentState !== "loading")
                        e.currentTarget.style.background = "#C5A059";
                    }}
                  >
                    {paymentState === "loading" ? "Preparing checkout..." : "Request Cohort Placement"}
                  </button>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.784rem",
                      color: "rgba(255,255,255,0.78)",
                      marginTop: "1rem",
                      fontStyle: "italic",
                    }}
                  >
                    Admission is subject to assessment result and cohort availability. Payment
                    confirms your placement request.
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 768px) {
          .portal-layout { flex-direction: column !important; }
          .portal-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.5rem 0 !important; }
          .portal-main { padding: 2rem 1.25rem !important; }
          .portal-header-userinfo { display: none !important; }
        }
      `}</style>
    </div>
  );
}
