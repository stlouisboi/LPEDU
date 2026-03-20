import React, { useState, useEffect, useCallback } from "react";
import { Lock, CheckCircle, ArrowRight, GoogleLogo, SignOut } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import SignalMonitor from "../components/SignalMonitor";
import TaskItem from "../components/TaskItem";
import { VideoLessonWorkbench, MODULE_1_DATA } from "../components/VideoLessonWorkbench";
import { CPMCalculator } from "../components/CPMCalculator";

const CURRICULUM = [
  { id: "ground-0", code: "GROUND 0", label: "The Mindset Module",           locked: false, type: "foundation", lessonCount: 6  },
  { id: "module-1", code: "MODULE 1", label: "Business & Authority Setup",   locked: true,  type: "core",       lessonCount: 7  },
  { id: "module-2", code: "MODULE 2", label: "Insurance Survival",           locked: true,  type: "core",       lessonCount: 6  },
  { id: "module-3", code: "MODULE 3", label: "The 16 Deadly Sins",           locked: true,  type: "core",       lessonCount: 8  },
  { id: "module-4", code: "MODULE 4", label: "New Entrant Audit Prep",       locked: true,  type: "core",       lessonCount: 6  },
  { id: "module-5", code: "MODULE 5", label: "Cash-Flow Oxygen",             locked: true,  type: "core",       lessonCount: 6  },
  { id: "module-6", code: "MODULE 6", label: "Operational Discipline",       locked: true,  type: "core",       lessonCount: 6  },
  { id: "module-7", code: "MODULE 7", label: "Post-Audit Recovery",          locked: true,  type: "recovery",   lessonCount: 4  },
  { id: "module-8", code: "MODULE 8", label: "ELD Compliance",               locked: true,  type: "extension",  lessonCount: 5  },
  { id: "module-9", code: "MODULE 9", label: "Hazmat Decisions",             locked: true,  type: "extension",  lessonCount: 4  },
];

const MODULE_OVERVIEWS = {
  "module-2": {
    code: "MOD-2", title: "Insurance Survival", lessonCount: 6, duration: "~2 hrs",
    description: "Understand exactly what coverage FMCSA requires, how the commercial insurance market evaluates new carriers, and what certificate failures look like at audit.",
    topics: ["Primary liability minimums by operation type", "Cargo insurance structures and coverage gaps", "BMC-91/91X filing mechanics", "Common violations and how they appear in audits", "Renewal timing and lapse protection strategies", "Building safety history to reduce premiums"],
  },
  "module-3": {
    code: "MOD-3", title: "The 16 Deadly Sins", lessonCount: 8, duration: "~3 hrs",
    description: "A structured walkthrough of the 16 most cited FMCSA violation categories — the ones that trigger SMS alerts, audits, and authority revocation proceedings.",
    topics: ["Hours of Service violations (Part 395)", "Driver Qualification file failures (Part 391)", "Controlled Substances & Alcohol testing (Part 382)", "Vehicle maintenance and inspection records (Part 396)", "Financial responsibility / insurance lapse", "Hazardous materials missteps", "Accident register and recordkeeping failures", "Operating beyond authority scope"],
  },
  "module-4": {
    code: "MOD-4", title: "New Entrant Audit Prep", lessonCount: 6, duration: "~2.5 hrs",
    description: "Prepare your operation for the FMCSA New Entrant Safety Audit — what they examine, what documentation you must have ready, and how to respond to findings.",
    topics: ["Audit triggers and the 12-month new entrant timeline", "The Safety Audit examination checklist", "Document control system setup", "Driver file requirements and verification", "Responding to Conditional safety ratings", "Corrective Action Plan development"],
  },
  "module-5": {
    code: "MOD-5", title: "Cash-Flow Oxygen", lessonCount: 6, duration: "~2 hrs",
    description: "Build the financial operating systems that keep a new motor carrier solvent through the first year — load selection, factoring, and cash cycle discipline.",
    topics: ["Load-to-overhead ratio analysis", "Invoice factoring vs. direct billing", "Fuel surcharge and cost exposure management", "Tax reserve discipline for new carriers", "Broker credit vetting and payment terms", "Building toward cash flow stability"],
  },
  "module-6": {
    code: "MOD-6", title: "Operational Discipline", lessonCount: 6, duration: "~2 hrs",
    description: "Install the daily, weekly, and monthly operational rhythms that define a compliant, audit-ready carrier operation.",
    topics: ["Pre/post-trip inspection protocols", "ELD and HOS log discipline", "Maintenance record cadence and filing", "Driver Vehicle Inspection Report (DVIR) management", "Incident reporting timelines and procedures", "Monthly self-audit routine"],
  },
  "module-7": {
    code: "MOD-7", title: "Post-Audit Recovery", lessonCount: 4, duration: "~1.5 hrs", type: "recovery",
    description: "For carriers who have received a Conditional or Unsatisfactory safety rating — this module provides the structured path back to Satisfactory status.",
    topics: ["Understanding your safety rating and what it means", "Building your Corrective Action Plan", "Document reconstruction and evidence preparation", "Rebuttal submission and timeline for rating improvement"],
  },
  "module-8": {
    code: "MOD-8", title: "ELD Compliance", lessonCount: 5, duration: "~1.75 hrs", type: "extension",
    description: "Everything a regulated carrier needs to know about Electronic Logging Device compliance — applicability, device selection, and audit presentation.",
    topics: ["ELD mandate applicability and exemptions", "Approved device selection criteria", "Driver training and adoption requirements", "ELD malfunction and exception protocols", "Data transfer for roadside inspections", "Common ELD audit violations and remedies"],
  },
  "module-9": {
    code: "MOD-9", title: "Hazmat Decisions", lessonCount: 4, duration: "~1.5 hrs", type: "extension",
    description: "A structured decision framework for carriers considering or already handling hazardous materials — federal requirements, registrations, and risk exposure.",
    topics: ["Hazmat classification and definition boundaries", "PHMSA registration requirements and thresholds", "Placarding rules and shipper responsibilities", "Emergency Response Information requirements", "Carrier training documentation", "Hazmat liability exposure for non-specialist carriers"],
  },
};

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
  const isModuleLocked = (mod) => mod && mod.id !== "ground-0" && !hasCohortAccess;

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

  // ── Auth: Login Screen ──────────────────────────────────
  if (!authChecked) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#0d1c30", minHeight: "100vh", color: "#FFFFFF" }}>
        <Navbar />
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "120px 2rem 80px", textAlign: "center" }}>
          <p style={{
            fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#d4900a", marginBottom: "1.5rem",
          }}>
            OPERATOR PORTAL
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            LaunchPath Cohort Access
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "3rem" }}>
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
          <p style={{ fontSize: "0.857rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem" }}>
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
        background: "#0d1c30",
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
              fontSize: "0.762rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d4900a",
            }}
          >
            LAUNCHPATH COHORT PORTAL
          </p>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>—</span>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              fontWeight: 700,
              color: "rgba(212,144,10,0.85)",
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
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.714rem",
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
                  fontSize: "0.762rem", cursor: "pointer", padding: "0.35rem 0.75rem",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
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
                  background: isActive ? "rgba(212,144,10,0.08)" : "none",
                  border: "none",
                  borderLeft: isActive ? "3px solid #d4900a" : "3px solid transparent",
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
                      <Lock size={12} weight="bold" color="#d4900a" style={{ flexShrink: 0 }} />
                    ) : (
                      <CheckCircle size={12} weight="bold" color="#22c55e" style={{ flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem",
                      color: locked ? "rgba(255,255,255,0.75)" : "#FFFFFF", letterSpacing: "0.04em",
                    }}>
                      {mod.code}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                    color: locked ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.90)",
                    lineHeight: 1.4, marginBottom: "0.3rem",
                  }}>
                    {mod.label}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.762rem",
                    color: locked ? "rgba(255,255,255,0.42)" : (mod.type === "recovery" ? "rgba(251,146,60,0.75)" : mod.type === "extension" ? "rgba(129,140,248,0.75)" : "rgba(212,144,10,0.9)"),
                    letterSpacing: "0.04em",
                  }}>
                    {mod.lessonCount} lessons
                    {mod.id === "ground-0" ? " — UNLOCKED"
                      : mod.type === "recovery" ? " — RECOVERY"
                      : mod.type === "extension" ? " — EXTENSION"
                      : locked ? ""
                      : " — COHORT ACCESS"}
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.85)",
              marginBottom: "0.25rem",
              padding: "0 0.5rem",
            }}>
              SYSTEM STATUS
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
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
                fontSize: "0.857rem",
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
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem",
                  letterSpacing: "0.1em",
                  color: "rgba(34,197,94,0.85)",
                }}>
                  Complete ✓
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  6 / 6
                </p>
              </div>
            </div>

            <div style={{ padding: "0.625rem 0.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem",
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
                fontSize: "0.857rem",
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
                  fontSize: "0.857rem",
                  fontWeight: 600,
                  color: "#d4900a",
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

          {/* ── TOOLS section ── */}
          <div style={{ margin: "0.5rem 1rem 0", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.25rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "0.625rem", paddingLeft: "0.5rem" }}>
              TOOLS
            </p>
            <button
              data-testid="sidebar-tool-cpm"
              onClick={() => setSelectedId("tool-cpm")}
              style={{
                width: "100%",
                background: selectedId === "tool-cpm" ? "rgba(212,144,10,0.08)" : "none",
                border: "none",
                borderLeft: selectedId === "tool-cpm" ? "3px solid #d4900a" : "3px solid transparent",
                cursor: "pointer",
                padding: "0.875rem 1.5rem",
                textAlign: "left",
                transition: "background 0.15s, border-color 0.15s",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
              onMouseEnter={(e) => { if (selectedId !== "tool-cpm") e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { if (selectedId !== "tool-cpm") e.currentTarget.style.background = "none"; }}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", color: "#FFFFFF", letterSpacing: "0.03em" }}>
                CPM Calculator
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(212,144,10,0.75)" }}>
                Cost per mile · load profitability
              </span>
            </button>
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
                fontFamily: "'Playfair Display', serif",
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
                  fontFamily: "'Playfair Display', serif",
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

                  <h1
                    style={{
                      fontFamily: "'Playfair Display', serif",
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
                      fontSize: "1rem",
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
                              fontSize: "0.857rem",
                              color: "#d4900a",
                              minWidth: 28,
                            }}
                          >
                            {m.number}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "1rem",
                              color: "rgba(255,255,255,0.93)",
                            }}
                          >
                            {m.title}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.857rem",
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
                      background: "rgba(212,144,10,0.1)",
                      border: "1px solid rgba(212,144,10,0.4)",
                      color: "#d4900a",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.857rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.875rem 1.5rem",
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(212,144,10,0.18)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgba(212,144,10,0.1)")
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
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.714rem",
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
                        fontSize: "var(--text-sm)",
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
                          fontSize: "0.857rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#d4900a",
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

              {/* Paid module selected — route to workbench or overview */}
              {selected?.id !== "ground-0" && !isModuleLocked(selected) && (
                <>
                  {selected?.id === "module-1" ? (
                    <VideoLessonWorkbench moduleData={MODULE_1_DATA} />
                  ) : (
                    <ModuleOverviewCard
                      moduleInfo={MODULE_OVERVIEWS[selected?.id]}
                      type={selected?.type}
                    />
                  )}
                </>
              )}

              {/* Tool: CPM Calculator */}
              {selectedId === "tool-cpm" && hasCohortAccess && (
                <CPMCalculator variant="portal" />
              )}
              {selectedId === "tool-cpm" && !hasCohortAccess && (
                <div data-testid="tool-locked-screen">
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
                    LP-TOOLS | CPM CALCULATOR
                  </p>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem" }}>Cost Per Mile Control System</h1>
                  <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 480, marginBottom: "2rem" }}>
                    The full CPM Calculator — including Step 4 load profitability analysis — is part of the LaunchPath Standard cohort.
                  </p>
                  <a href="/tools/cpm-calculator" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "var(--text-sm)", color: "#d4900a", textDecoration: "none", padding: "0.875rem 1.5rem", border: "1px solid rgba(212,144,10,0.3)", transition: "background 0.15s" }}>
                    Use the free public version →
                  </a>
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
                      fontSize: "0.762rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#d4900a",
                      marginBottom: "1.5rem",
                    }}
                  >
                    COHORT ADMISSION
                  </p>

                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
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
                      fontSize: "1rem",
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
                        fontSize: "var(--text-sm)",
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
                        color: "#d4900a",
                      }}
                    >
                      $5,000
                    </span>
                  </div>

                  {paymentState === "error" && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: "var(--text-sm)",
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
                      background: "#d4900a",
                      color: "#0b1628",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
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
                        e.currentTarget.style.background = "#d4900a";
                    }}
                  >
                    {paymentState === "loading" ? "Preparing checkout..." : "Request Cohort Placement"}
                  </button>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.857rem",
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
          {/* Deliverables — visible to all paid portal users */}
          {hasCohortAccess && <DeliverablesPortal API={process.env.REACT_APP_BACKEND_URL} />}
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

// ── ModuleOverviewCard (modules 2-9 — cohort delivery sequence) ──────────────
function ModuleOverviewCard({ moduleInfo, type }) {
  const mono = "'Inter', sans-serif";
  if (!moduleInfo) return null;

  const isRecovery = type === "recovery";
  const isExtension = type === "extension";
  const accentColor = isRecovery ? "rgba(251,146,60,0.85)" : isExtension ? "rgba(129,140,248,0.85)" : "#d4900a";
  const accentBg = isRecovery ? "rgba(251,146,60,0.07)" : isExtension ? "rgba(99,102,241,0.07)" : "rgba(212,144,10,0.05)";
  const accentBorder = isRecovery ? "rgba(251,146,60,0.22)" : isExtension ? "rgba(99,102,241,0.22)" : "rgba(212,144,10,0.16)";

  return (
    <div data-testid="module-overview-card">
      <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        LP-{moduleInfo.code} | {moduleInfo.title.toUpperCase()}
      </p>

      {(isRecovery || isExtension) && (
        <div style={{ display: "inline-block", background: accentBg, border: `1px solid ${accentBorder}`, padding: "0.25rem 0.875rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", color: accentColor, textTransform: "uppercase", margin: 0 }}>
            {isRecovery ? "RECOVERY MODULE — OPTIONAL" : "STANDARD EXTENSION — INCLUDED IN ENROLLMENT"}
          </p>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", letterSpacing: "-0.02em", margin: 0 }}>
          {moduleInfo.title}
        </h1>
        <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0 }}>
          {moduleInfo.lessonCount} LESSONS · {moduleInfo.duration}
        </span>
      </div>

      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.78, maxWidth: 580, marginBottom: "2.5rem" }}>
        {moduleInfo.description}
      </p>

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem", maxWidth: 560 }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
          KEY TOPICS — {moduleInfo.lessonCount} IMPLEMENTATION UNITS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {moduleInfo.topics.map((topic, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
              <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(212,144,10,0.55)", flexShrink: 0, paddingTop: "0.18rem", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.73)", lineHeight: 1.55 }}>
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div style={{ width: 7, height: 7, background: "rgba(212,144,10,0.45)", borderRadius: "50%", flexShrink: 0 }} />
        <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>
          COHORT DELIVERY SEQUENCE — YOUR FACILITATOR WILL ACTIVATE THIS MODULE
        </p>
      </div>
    </div>
  );
}

// ── Deliverables Section (Portal) ────────────────────────────────────────────
const CATEGORY_LABELS = {
  hos: "HOS Compliance Packet",
  maintenance: "Maintenance Packet",
  insurance: "Insurance & Authority Packet",
  drug_alcohol: "Drug & Alcohol Packet",
  new_entrant: "New Entrant Packet",
  general: "General / All Cohort",
};

function DeliverablesPortal({ API }) {
  const [pdfs, setPdfs] = useState([]);
  const [downloading, setDownloading] = useState(null);
  const mono = "'Inter', sans-serif";

  useEffect(() => {
    fetch(`${API}/api/portal/pdfs`, { credentials: "include" })
      .then(r => r.ok ? r.json() : [])
      .then(setPdfs)
      .catch(() => {});
  }, [API]);

  if (pdfs.length === 0) return null;

  const handleDownload = async (pdf) => {
    setDownloading(pdf.id);
    try {
      const r = await fetch(`${API}/api/portal/pdfs/${pdf.id}/download`, { credentials: "include" });
      if (!r.ok) throw new Error("Download failed");
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = pdf.original_filename || `${pdf.display_name}.pdf`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch {}
    finally { setDownloading(null); }
  };

  return (
    <section style={{ borderTop: "1px solid rgba(212,144,10,0.15)", padding: "2.5rem 2.5rem 3rem", marginTop: "1rem" }}>
      <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.82)", marginBottom: "1.5rem" }}>
        DELIVERABLES — {pdfs.length} FILE{pdfs.length !== 1 ? "S" : ""}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {pdfs.map(pdf => (
          <div key={pdf.id} data-testid={`deliverable-${pdf.id}`} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.14)",
            borderLeft: "3px solid #d4900a", padding: "1rem 1.25rem", gap: "1rem", flexWrap: "wrap",
          }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "#fff", margin: "0 0 3px" }}>{pdf.display_name}</p>
              {pdf.description && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", margin: "0 0 5px" }}>{pdf.description}</p>}
              <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)" }}>
                {CATEGORY_LABELS[pdf.category] || pdf.category}
              </span>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.30)", margin: "4px 0 0" }}>
                This asset is designed to be used in your daily operation — not stored.
              </p>
            </div>
            <button
              data-testid={`download-${pdf.id}`}
              onClick={() => handleDownload(pdf)}
              disabled={downloading === pdf.id}
              style={{
                fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", background: downloading === pdf.id ? "rgba(212,144,10,0.3)" : "#d4900a",
                color: "#0b1628", border: "none", padding: "0.65rem 1.25rem", cursor: downloading === pdf.id ? "not-allowed" : "pointer",
                flexShrink: 0,
              }}
            >{downloading === pdf.id ? "DOWNLOADING..." : "DOWNLOAD →"}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
