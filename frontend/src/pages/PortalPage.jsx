import React, { useState, useEffect, useCallback } from "react";
import { Lock, CheckCircle, ArrowRight, LogOut, Clock, AlertTriangle, Circle, CircleDashed } from "lucide-react";
const SignOut = LogOut;
const Warning = AlertTriangle;
import { usePathname } from 'next/navigation';
;
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import SignalMonitor from "../components/SignalMonitor";
import TaskItem from "../components/TaskItem";
import { VideoLessonWorkbench, MODULE_1_DATA } from "../components/VideoLessonWorkbench";
import { ALL_MODULE_DATA } from "../data/moduleData";
import Ground0LessonPlayer from "../components/Ground0LessonPlayer";
import AnnouncementsFeed from "../components/AnnouncementsFeed";
import VerifiedRegistryID from "../components/VerifiedRegistryID";
import ModuleChecklist from "../components/ModuleChecklist";

const CURRICULUM = [
  { id: "ground-0", code: "GROUND 0", label: "The Wisdom Module",            locked: false, type: "foundation", typeLabel: "FREE FOUNDATION",        lessonCount: 6  },
  { id: "module-1", code: "MODULE 1", label: "Driver Qualification File",    locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 8, gate: "HARD GATE"       },
  { id: "module-2", code: "MODULE 2", label: "Authority & Insurance",        locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 7  },
  { id: "module-3", code: "MODULE 3", label: "The 16 Deadly Sins",           locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 8  },
  { id: "module-4", code: "MODULE 4", label: "Drug & Alcohol Program",       locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 7  },
  { id: "module-5", code: "MODULE 5", label: "Hours of Service & Dispatch",  locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 7  },
  { id: "module-6", code: "MODULE 6", label: "Integrity Audit",              locked: true,  type: "audit",      typeLabel: "AUDIT GATE",             lessonCount: 6, gate: "CREDENTIAL GATE" },
  { id: "module-7", code: "MODULE 7", label: "Post-Audit Recovery",          locked: true,  type: "recovery",   typeLabel: "POST-AUDIT RECOVERY",    lessonCount: 5  },
  { id: "module-8", code: "MODULE 8", label: "ELD Compliance",               locked: true,  type: "extension",  typeLabel: "STANDARD EXTENSION",     lessonCount: 5  },
  { id: "module-9", code: "MODULE 9", label: "Hazmat Decisions",             locked: true,  type: "extension",  typeLabel: "STANDARD EXTENSION",     lessonCount: 5  },
];

const MODULE_OVERVIEWS = {
  "module-1": {
    code: "MOD-1", title: "Driver Qualification File", lessonCount: 8, duration: "~120 min",
    description: "Build the complete, audit-ready Driver Qualification File for every operating driver — including the owner-operator. The DQF is the single most cited deficiency in new entrant audits. This module does not end when the video ends; it ends when the file is built, verified, and ready for examination.",
    topics: ["Your Business Foundation — entity structure and compliance architecture", "Business Entity Selection — liability implications for new carriers", "Filing for DOT/MC Authority — USDOT, MC number, and activation sequence", "BOC-3 and Process Agent — required filing most carriers miss", "UCR and State Registrations — annual compliance requirements", "Insurance — First Look — BMC-91/91X filing and authority activation", "Driver Qualification File (GATE) — building the complete, audit-ready DQF", "Business Banking & Chart of Accounts — financial infrastructure setup"],
  },
  "module-2": {
    code: "MOD-2", title: "Authority & Insurance", lessonCount: 7, duration: "~105 min",
    description: "Insurance lapse is the most common cause of authority suspension. This module installs the full insurance continuity system — from first-year budget reality to accident response protocol to renewal strategy.",
    topics: ["The Five Required Coverage Types — what FMCSA mandates and why", "First-Year Insurance Budget Reality — what new carriers actually pay", "Insurance Cancellation Triggers — how lapses happen and how to prevent them", "SMS Scores and Insurance Impact — how your safety score affects premiums", "Accident Response Protocol — the first 24 hours after an incident", "Claims Management — building your claims record correctly", "Renewal Strategy — positioning for better rates after Year 1"],
  },
  "module-3": {
    code: "MOD-3", title: "The 16 Deadly Sins", lessonCount: 8, duration: "~115 min",
    description: "The Exposure & Refuge framework governs this module. Each of the 16 documented FMCSA violation categories is presented as an exposure with a corresponding refuge — the system you install to eliminate it permanently.",
    topics: ["Introduction — What the 16 Sins Actually Represent", "Drug & Alcohol Exposure (Sins 1–5) — testing failures and program gaps", "Driver Qualification Exposure (Sins 6–9) — DQF deficiencies at audit", "Insurance & Financial Exposure (Sins 10–11) — lapses and coverage failures", "Vehicle Maintenance Exposure (Sins 12, 14, 15) — inspection and record failures", "Hours of Service Exposure (Sins 13, 16) — log violations and ELD gaps", "The Complete Exposure Map — all 16 patterns in sequence", "From Exposure to Refuge — what the installation sequence addresses"],
  },
  "module-4": {
    code: "MOD-4", title: "Drug & Alcohol Program", lessonCount: 7, duration: "~110 min",
    description: "Install a fully compliant federal Drug & Alcohol testing program — consortium enrollment, Clearinghouse registration, written policy, and owner-operator special compliance. This is not optional; it's a hard compliance requirement before a commercial driver operates.",
    topics: ["Federal D&A Program Requirements — what Part 382 actually mandates", "Consortium Selection and Enrollment — choosing and joining a qualified C/TPA", "Drug & Alcohol Clearinghouse — registration, queries, and reporting obligations", "Testing Procedures and Documentation — chain of custody and record requirements", "Owner-Operator Special Considerations — self-enrollment and query requirements", "Written Policy and Program Maintenance — building the compliant D&A policy", "Program Verification — confirming your program is audit-ready"],
  },
  "module-5": {
    code: "MOD-5", title: "Hours of Service & Dispatch", lessonCount: 7, duration: "~100 min",
    description: "Build the Hours of Service compliance framework and dispatch record system that protects your operation at roadside inspection and audit. HOS violations are among the most cited in new entrant reviews.",
    topics: ["Federal HOS Rules — the 11/14/60/70 framework and what it means operationally", "The 11/14/60-70 Hour Limits — tracking cycles and resets correctly", "Short-Haul Exemptions — the 150 air-mile rule and qualifying conditions", "ELD Requirements and Exemptions — when ELD is required and when paper logs apply", "Paper Log Compliance — maintaining correct logs for exempt operations", "Dispatch Records and Evidence Trail — building the documentation behind every move", "HOS Self-Audit Routine — monthly review to catch patterns before the auditor does"],
  },
  "module-6": {
    code: "MOD-6", title: "Integrity Audit", lessonCount: 6, duration: "~90 min",
    description: "The Integrity Audit is a full four-pillar system review conducted by the Station Custodian. A clean audit result triggers issuance of the Verified Registry ID credential — the LaunchPath proof of a documented, defensible compliance installation.",
    topics: ["What the Integrity Audit Reviews — the four-pillar examination framework", "Preparing Your Documentation Package — what must be ready before review begins", "The Four-Pillar Review Process — how the Station Custodian evaluates each pillar", "Audit Conduct and Response Protocol — what to expect and how to respond", "Ratings, Results, and What They Mean — clean vs. conditional outcomes", "Credential Issuance — what the Verified Registry ID represents and how it's issued"],
  },
  "module-7": {
    code: "MOD-7", title: "Post-Audit Recovery", lessonCount: 5, duration: "~75 min", type: "recovery",
    description: "Activated only by a conditional outcome at Module 6. This module provides the structured path from a conditional safety rating back to a defensible, stable operating position.",
    topics: ["Understanding What Happened — reading your conditional rating correctly", "Corrective Action Plans — building a CAP that satisfies the reviewer", "Rebuilding the Compliance Backbone — document reconstruction and gap closure", "Authority Repair and Reinstatement — the timeline and process for rating improvement", "Long-Term Stability After Disruption — preventing recurrence and rebuilding evidence"],
  },
  "module-8": {
    code: "MOD-8", title: "ELD Compliance", lessonCount: 5, duration: "~70 min", type: "extension",
    description: "Everything a regulated carrier needs to know about Electronic Logging Device compliance — applicability decisions, malfunction protocols, and carrier-driver responsibilities. Included in enrollment; outside the Verified Registry ID framework.",
    topics: ["ELD Mandate Scope and Applicability — who is and isn't required", "Exemption Criteria — short-haul, driveaway-towaway, and pre-2000 vehicle rules", "Malfunction and Data Transfer Protocols — what to do when ELD fails at roadside", "Carrier-Driver Responsibilities — training, documentation, and proper use requirements", "ELD Compliance Verification — confirming your ELD setup is audit-ready"],
  },
  "module-9": {
    code: "MOD-9", title: "Hazmat Decisions", lessonCount: 5, duration: "~65 min", type: "extension",
    description: "A structured decision framework for carriers operating near or within hazardous materials territory — threshold awareness, inadvertent exposure, and when to engage a specialist. Included in enrollment; outside the Verified Registry ID framework.",
    topics: ["Hazmat Threshold Awareness — when you are and aren't regulated under PHMSA", "Inadvertent Exposure — when you don't know you're carrying a regulated material", "Placard Requirements and Decision Framework — what triggers placarding obligations", "When to Engage a Compliance Specialist — recognizing the limits of self-compliance", "Hazmat Liability Exposure — what non-specialist carriers face for inadvertent violations"],
  },
};

const GROUND0_MODULES = [];

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
          {/* Operator Tools quick-access */}
          <div style={{ padding: "0 1.5rem 1.75rem", marginBottom: "1.75rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: "0.875rem" }}>
              OPERATOR TOOLS
            </p>
            {[
              { code: "LP-TOOL-001", label: "TCO Calculator", href: "/tools/tco-calculator", free: true },
              { code: "LP-TOOL-002", label: "Load Profitability Analyzer", href: "/tools/load-analyzer", free: false },
            ].map((tool) => (
              <a
                key={tool.code}
                href={tool.href}
                data-testid={`portal-tool-${tool.code.toLowerCase()}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", padding: "0.625rem 0.75rem", marginBottom: "0.375rem", background: "rgba(212,144,10,0.06)", border: "1px solid rgba(212,144,10,0.14)", textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,144,10,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(212,144,10,0.06)")}
              >
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4900a", margin: "0 0 2px" }}>{tool.code}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.3 }}>{tool.label}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
                  {tool.free && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22c55e", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)", padding: "0.15rem 0.45rem" }}>FREE</span>
                  )}
                  <span style={{ color: "#d4900a", fontSize: "0.8rem" }}>→</span>
                </div>
              </a>
            ))}
          </div>

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
            YOUR IMPLEMENTATION JOURNEY
          </p>

          {CURRICULUM.map((mod) => {
            const isActive = selectedId === mod.id;
            const locked = isModuleLocked(mod);
            const status = getModuleStatus(mod.id);
            const isConditionalLocked = mod.type === "recovery" && locked;

            // Status icon
            const icon = (() => {
              if (mod.id === "ground-0") return <CheckCircle size={13} color="#22c55e" weight="fill" />;
              if (locked && isConditionalLocked) return <CircleDashed size={13} color="rgba(251,146,60,0.35)" />;
              if (locked) return <Lock size={11} color="rgba(212,144,10,0.45)" />;
              if (status === "approved" || status === "complete") return <CheckCircle size={13} color="#22c55e" weight="fill" />;
              if (status === "pending_review") return <Clock size={13} color="#f59e0b" />;
              if (status === "revisions_needed") return <Warning size={13} color="#ef4444" />;
              if (status === "conditional") return <CircleDashed size={13} color="#f97316" />;
              return <Circle size={13} color="rgba(255,255,255,0.22)" />;
            })();

            // Type label color
            const typeColor = (() => {
              if (mod.id === "ground-0") return "#22c55e";
              if (mod.type === "audit") return "#ef4444";
              if (mod.type === "core") return "rgba(212,144,10,0.75)";
              if (mod.type === "recovery") return "rgba(251,146,60,0.7)";
              if (mod.type === "extension") return "rgba(129,140,248,0.7)";
              return "rgba(255,255,255,0.3)";
            })();

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
                  padding: "0.875rem 1.5rem",
                  textAlign: "left",
                  transition: "background 0.15s, border-color 0.15s",
                  opacity: isConditionalLocked ? 0.5 : 1,
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                  <div style={{ marginTop: "0.15rem", flexShrink: 0 }}>{icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Code row + YOU ARE HERE */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.2rem" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.714rem", color: locked ? "rgba(255,255,255,0.5)" : "#FFFFFF", letterSpacing: "0.06em" }}>
                        {mod.code}
                      </span>
                      {isActive && (
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4900a", flexShrink: 0 }}>
                          ← HERE
                        </span>
                      )}
                    </div>
                    {/* Module name */}
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: locked ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)", lineHeight: 1.35, marginBottom: "0.3rem" }}>
                      {mod.label}
                    </p>
                    {/* Type label */}
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: typeColor }}>
                      {mod.typeLabel}
                    </span>
                    {/* Status badges for unlocked cohort modules */}
                    {hasCohortAccess && !locked && mod.id !== "ground-0" && (() => {
                      const badge = (text, color, bg, border) => (
                        <span style={{ display: "inline-block", marginTop: "0.3rem", marginLeft: "0.25rem", fontFamily: "'Inter',sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color, background: bg, border: `1px solid ${border}`, padding: "0.1rem 0.375rem" }}>
                          {text}
                        </span>
                      );
                      if (status === "pending_review") return badge("UNDER REVIEW", "#f59e0b", "rgba(245,158,11,0.1)", "rgba(245,158,11,0.3)");
                      if (status === "revisions_needed") return badge("REVISIONS NEEDED", "#ef4444", "rgba(239,68,68,0.1)", "rgba(239,68,68,0.3)");
                      if (status === "approved") return badge("APPROVED ✓", "#22c55e", "rgba(34,197,94,0.08)", "rgba(34,197,94,0.25)");
                      if (status === "conditional") return badge("CONDITIONAL", "#f97316", "rgba(249,115,22,0.1)", "rgba(249,115,22,0.25)");
                      if (status === "complete") return badge("COMPLETE ✓", "#22c55e", "rgba(34,197,94,0.08)", "rgba(34,197,94,0.2)");
                      return null;
                    })()}
                  </div>
                </div>
              </button>
            );
          })}

          {/* ── Journey Progress Summary ── */}
          {hasCohortAccess && (() => {
            const completedCount = CURRICULUM.filter((m) => {
              if (m.id === "ground-0") return true;
              const s = gateStatuses[m.id]?.status;
              return s === "approved" || s === "complete";
            }).length;
            const registryIssued = gateStatuses["module-6"]?.status === "approved";
            return (
              <div data-testid="journey-progress-summary" style={{ margin: "1.25rem 1rem 0", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.1rem", paddingBottom: "0.75rem", paddingLeft: "0.5rem" }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.35rem" }}>
                  Progress: <strong style={{ color: "rgba(255,255,255,0.65)" }}>{completedCount} of 10</strong> modules
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: registryIssued ? "#22c55e" : "rgba(255,255,255,0.28)" }}>
                  Verified Registry ID: {registryIssued ? <strong>Issued ✓</strong> : "Pending"}
                </p>
              </div>
            );
          })()}

          {/* System Status block ends sidebar */}
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

                // Module 6 approved — credential ceremony
                if (selected?.id === "module-6" && status === "approved") return (
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

// ── LockedModuleView (modules 2-9 — locked state with lesson preview) ─────────
function LockedModuleView({ moduleInfo, type, onCheckout, paymentState }) {
  const isRecovery = type === "recovery";
  const isExtension = type === "extension";
  const accentColor = isRecovery ? "rgba(251,146,60,0.85)" : isExtension ? "rgba(129,140,248,0.85)" : "#d4900a";
  const accentBg    = isRecovery ? "rgba(251,146,60,0.07)" : isExtension ? "rgba(99,102,241,0.07)" : "rgba(212,144,10,0.05)";
  const accentBorder = isRecovery ? "rgba(251,146,60,0.22)" : isExtension ? "rgba(99,102,241,0.22)" : "rgba(212,144,10,0.16)";

  // Fallback for any module without specific overview data
  if (!moduleInfo) return (
    <div data-testid="locked-module-view">
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>COHORT MODULE — LOCKED</p>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>This module is part of the LaunchPath Standard.</h1>
      <EnrollCTA onCheckout={onCheckout} paymentState={paymentState} />
    </div>
  );

  return (
    <div data-testid="locked-module-view">
      {/* Lock bar */}
      <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", borderLeft: "3px solid #d4900a", padding: "0.875rem 1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Lock size={13} color="#d4900a" weight="bold" />
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", margin: 0 }}>
            Cohort module — requires LaunchPath Standard enrollment to unlock.
          </p>
        </div>
        <a href="/admission" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "#d4900a", color: "#000F1F", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.5rem 1.125rem", textDecoration: "none", whiteSpace: "nowrap" }}>
          Request Admission →
        </a>
      </div>

      {/* Code label */}
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        LP-{moduleInfo.code} | {moduleInfo.title.toUpperCase()}
      </p>

      {(isRecovery || isExtension) && (
        <div style={{ display: "inline-block", background: accentBg, border: `1px solid ${accentBorder}`, padding: "0.25rem 0.875rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", color: accentColor, textTransform: "uppercase", margin: 0 }}>
            {isRecovery ? "RECOVERY MODULE — OPTIONAL" : "STANDARD EXTENSION — INCLUDED IN ENROLLMENT"}
          </p>
        </div>
      )}

      {/* Title + meta */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "rgba(255,255,255,0.35)", letterSpacing: "-0.02em", margin: 0 }}>
          {moduleInfo.title}
        </h1>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.20)", letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0 }}>
          {moduleInfo.lessonCount} LESSONS · {moduleInfo.duration}
        </span>
      </div>

      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.78, maxWidth: 580, marginBottom: "2.5rem" }}>
        {moduleInfo.description}
      </p>

      {/* Lesson structure — locked preview */}
      <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem", maxWidth: 560, marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase", margin: 0 }}>
            LESSON STRUCTURE — {moduleInfo.lessonCount} UNITS
          </p>
          <Lock size={11} color="rgba(212,144,10,0.35)" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {moduleInfo.topics.map((topic, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", opacity: 0.38 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(212,144,10,0.6)", flexShrink: 0, paddingTop: "0.18rem", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>

      <EnrollCTA onCheckout={onCheckout} paymentState={paymentState} />
    </div>
  );
}

function EnrollCTA({ onCheckout, paymentState }) {
  return (
    <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", padding: "1.75rem", maxWidth: 560 }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.7)", marginBottom: "0.5rem" }}>UNLOCK THIS MODULE</p>
      <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF", letterSpacing: "-0.01em", marginBottom: "0.625rem" }}>Part of the LaunchPath Standard</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        All 9 implementation modules, cohort delivery, and facilitator support. $2,500 one-time enrollment.
      </p>
      {paymentState === "error" && (
        <p style={{ color: "#ff6b6b", fontSize: "0.857rem", marginBottom: "0.875rem", fontFamily: "'Inter',sans-serif" }}>Something went wrong. Please try again.</p>
      )}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <button
          data-testid="request-cohort-btn"
          onClick={onCheckout}
          disabled={paymentState === "loading"}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "#d4900a", color: "#000F1F", border: "none", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: paymentState === "loading" ? "wait" : "pointer", opacity: paymentState === "loading" ? 0.8 : 1 }}
        >
          {paymentState === "loading" ? "Preparing…" : "Request Cohort Placement"}
        </button>
        <a href="/reach-diagnostic" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.55)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.857rem", padding: "0.75rem 1.25rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}>
          Run REACH Diagnostic →
        </a>
      </div>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.30)", marginTop: "0.875rem", fontStyle: "italic" }}>
        Admission subject to assessment and cohort availability.
      </p>
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
        <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", letterSpacing: "-0.02em", margin: 0 }}>
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
