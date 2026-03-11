import React, { useState, useEffect, useCallback } from "react";
import { Lock, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const CURRICULUM = [
  {
    id: "ground-0",
    code: "GROUND 0",
    label: "The Wisdom Module",
    lessons: 6,
    locked: false,
    status: "UNLOCKED",
  },
  {
    id: "module-1",
    code: "MODULE 1",
    label: "Business and Authority Setup",
    lessons: 7,
    locked: true,
  },
  {
    id: "module-2",
    code: "MODULE 2",
    label: "Insurance Survival",
    lessons: 6,
    locked: true,
  },
  {
    id: "module-3",
    code: "MODULE 3",
    label: "The 16 Deadly Sins",
    lessons: 8,
    locked: true,
  },
  {
    id: "module-4",
    code: "MODULE 4",
    label: "New Entrant Audit Prep",
    lessons: 6,
    locked: true,
  },
  {
    id: "module-5",
    code: "MODULE 5",
    label: "Load Discipline and Cash Flow",
    lessons: 6,
    locked: true,
  },
  {
    id: "module-6",
    code: "MODULE 6",
    label: "Stabilization and Long-Term Authority Protection",
    lessons: 5,
    locked: true,
  },
  {
    id: "module-7",
    code: "MODULE 7",
    label: "Post-Audit Recovery",
    lessons: 4,
    locked: true,
  },
];

const GROUND0_LESSONS = [
  { number: "0.1", title: "Welcome to LaunchPath", duration: "8 min" },
  { number: "0.2", title: "The Four Pillars of Survival", duration: "15 min" },
  { number: "0.3", title: "Lane Selection", duration: "18 min" },
  { number: "0.4", title: "Personal Readiness Check", duration: "20 min" },
  { number: "0.5", title: "Risk Tolerance Assessment", duration: "15 min" },
  { number: "0.6", title: "The Go/No-Go Decision", duration: "14 min" },
];

export default function PortalPage() {
  const [selectedId, setSelectedId] = useState("ground-0");
  const [paymentState, setPaymentState] = useState("idle"); // idle | loading | polling | success | error
  const [sessionId, setSessionId] = useState(null);

  const API = process.env.REACT_APP_BACKEND_URL;

  // On mount, check for Stripe return session_id in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    if (sid) {
      setSessionId(sid);
      setPaymentState("polling");
      // Clean URL without reload
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
    if (paymentState === "polling" && sessionId) {
      pollPaymentStatus(sessionId);
    }
  }, [paymentState, sessionId, pollPaymentStatus]);

  const handleCheckout = async () => {
    setPaymentState("loading");
    try {
      const origin = window.location.origin;
      const resp = await fetch(`${API}/api/portal/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin_url: origin }),
      });
      if (!resp.ok) throw new Error("Checkout creation failed");
      const data = await resp.json();
      window.location.href = data.url;
    } catch {
      setPaymentState("error");
    }
  };

  const selected = CURRICULUM.find((m) => m.id === selectedId);

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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.784rem",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            90-Day Compliance Operating Standard
          </p>
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
              fontSize: "0.672rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              padding: "0 1.5rem",
              marginBottom: "1.25rem",
            }}
          >
            CURRICULUM
          </p>

          {CURRICULUM.map((mod) => {
            const isActive = selectedId === mod.id;
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
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "none";
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    {mod.locked && (
                      <Lock
                        size={12}
                        weight="bold"
                        color="#C5A059"
                        style={{ flexShrink: 0 }}
                      />
                    )}
                    {!mod.locked && (
                      <CheckCircle
                        size={12}
                        weight="bold"
                        color="#C5A059"
                        style={{ flexShrink: 0 }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.784rem",
                        color: mod.locked ? "rgba(255,255,255,0.5)" : "#FFFFFF",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {mod.code}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.784rem",
                      color: mod.locked ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.75)",
                      lineHeight: 1.4,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {mod.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.672rem",
                      color: mod.locked ? "rgba(255,255,255,0.22)" : "rgba(197,160,89,0.7)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {mod.lessons} lessons{mod.status ? ` — ${mod.status}` : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: "2.5rem 2.5rem" }} className="portal-main">
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
              <p style={{ fontSize: "1.008rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Your cohort placement request has been received. You will receive a confirmation
                and next steps within 24 hours.
              </p>
              <div style={{ height: 2, background: "#C5A059", margin: "2rem 0" }} />
              <p style={{ fontSize: "0.896rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
                Admission is subject to assessment result and cohort availability.
              </p>
            </div>
          )}

          {/* Payment polling state */}
          {paymentState === "polling" && (
            <div style={{ textAlign: "center", maxWidth: 520, margin: "4rem auto" }}>
              <p style={{ fontSize: "1.008rem", color: "rgba(255,255,255,0.65)", marginBottom: "1rem" }}>
                Confirming your payment...
              </p>
              <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.35)" }}>
                This will only take a moment.
              </p>
            </div>
          )}

          {/* Normal content state */}
          {paymentState !== "success" && paymentState !== "polling" && (
            <>
              {/* Ground 0 is selected (unlocked) */}
              {!selected?.locked && (
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
                    GROUND 0 — THE WISDOM MODULE
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
                    The Wisdom Module
                  </h1>

                  <p
                    style={{
                      fontSize: "1.008rem",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.8,
                      maxWidth: 560,
                      marginBottom: "2.5rem",
                    }}
                  >
                    Ground 0 is the foundation of the LaunchPath Standard. Six lessons. Approximately
                    90 minutes. No charge.
                  </p>

                  {/* Lesson list */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      marginBottom: "2rem",
                    }}
                  >
                    {GROUND0_LESSONS.map((l, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem 1.5rem",
                          borderBottom:
                            idx < GROUND0_LESSONS.length - 1
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
                            {l.number}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.98rem",
                              color: "rgba(255,255,255,0.8)",
                            }}
                          >
                            {l.title}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.784rem",
                            color: "rgba(255,255,255,0.3)",
                          }}
                        >
                          {l.duration}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="/ground-0-briefing"
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
                </div>
              )}

              {/* Locked module selected — show payment screen */}
              {selected?.locked && (
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
                      color: "rgba(255,255,255,0.65)",
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
                        color: "rgba(255,255,255,0.65)",
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
                      $2,500
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
                      color: "rgba(255,255,255,0.3)",
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
        }
      `}</style>
    </div>
  );
}
