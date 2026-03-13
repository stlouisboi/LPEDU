import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const LESSONS = [
  {
    number: "0.1",
    title: "Welcome to LaunchPath",
    description:
      "Most carriers enter the trucking industry believing the hardest part is behind them once the authority is issued. It is not. This lesson reframes what the first 90 days actually require and what LaunchPath is built to install.",
    duration: "8 minutes",
    outcome:
      "Understand what the LaunchPath Standard is, what it is not, and what the next 90 days require from you as an operator.",
  },
  {
    number: "0.2",
    title: "The Four Pillars of Survival",
    description:
      "Every new authority faces four categories of risk simultaneously. This lesson names them, maps them, and explains why the absence of any one of them is sufficient to end an operation before the first audit.",
    duration: "15 minutes",
    outcome:
      "Identify the four systems every new authority must install — Authority Protection, Insurance Continuity, Compliance Backbone, Cash-Flow Oxygen — and understand how they interact.",
  },
  {
    number: "0.3",
    title: "Lane Selection",
    description:
      "Box truck and semi-truck operations are governed by different regulatory requirements, carry different insurance profiles, and require different capital structures. Operating in the wrong lane is a compliance and financial error that is difficult to correct after authority is issued.",
    duration: "18 minutes",
    outcome:
      "Determine the correct operational lane for your authority before committing capital or filing paperwork.",
  },
  {
    number: "0.4",
    title: "Personal Readiness Check",
    description:
      "The LaunchPath Standard requires a carrier who is operationally, financially, and personally ready to implement a compliance system under federal oversight. This lesson provides the framework for assessing readiness honestly before the first dollar is spent.",
    duration: "20 minutes",
    outcome:
      "Complete a structured assessment of your financial reserves, operational capacity, and personal readiness against documented first-year carrier requirements.",
  },
  {
    number: "0.5",
    title: "Risk Tolerance Assessment",
    description:
      "Every carrier has a stop-loss line — the point at which the cost of continuing exceeds the cost of stopping. Most carriers have never defined it. This lesson builds that line before the first load moves so that decisions under pressure have a framework behind them.",
    duration: "15 minutes",
    outcome:
      "Define your stop-loss line and your risk tolerance before the first load moves. Establish the decision criteria you will use when the operation faces financial or compliance pressure.",
  },
  {
    number: "0.6",
    title: "The Go/No-Go Decision",
    description:
      "The final lesson of Ground 0 applies everything from Lessons 0.1 through 0.5 to a single structured decision framework. The result is not a score. It is a decision — GO, WAIT, or NO-GO — with a specific next step attached to each outcome.",
    duration: "14 minutes",
    outcome:
      "Complete the structured decision framework that produces your GO, WAIT, or NO-GO result and receive your specific next step based on that result.",
  },
];

export default function Ground0Page() {
  const [openPanel, setOpenPanel] = useState(0);
  const [openedPanels, setOpenedPanels] = useState(new Set([0]));
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(`${API}/api/ground0`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!resp.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePanel = (idx) => {
    const isOpening = openPanel !== idx;
    setOpenPanel(isOpening ? idx : null);
    if (isOpening) {
      setOpenedPanels(prev => new Set([...prev, idx]));
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F5F6F7", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Header Block ── Light background */}
      <div style={{ background: "#F5F6F7", padding: "100px 24px 72px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            data-testid="ground0-section-label"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.728rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C5A059",
              marginBottom: "1.5rem",
            }}
          >
            GROUND 0 — THE WISDOM MODULE
          </p>

          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              color: "#002244",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Before admission is considered, every carrier completes Ground 0.
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.12rem",
              color: "#444444",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
              fontWeight: 500,
            }}
          >
            Six lessons. Approximately 90 minutes. No charge. This is where the LaunchPath
            Standard begins.
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.008rem",
              color: "#555555",
              lineHeight: 1.9,
              maxWidth: 680,
            }}
          >
            Ground 0 does not teach compliance. It establishes whether you are the carrier this
            standard was built for. By the end of Lesson 0.6 you will have made a structured
            Go/No-Go decision about your operation. That decision determines the next step.
          </p>
        </div>
      </div>

      {/* ── Accordion Section ── Dark navy */}
      <div style={{ background: "#002244", padding: "72px 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Progress indicator — sticky, one line, institutional */}
          <div
            data-testid="progress-indicator"
            style={{
              position: "sticky",
              top: 64,
              background: "#002244",
              zIndex: 10,
              padding: "0.875rem 0",
              marginBottom: "0.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.784rem",
                fontWeight: 400,
                color: "rgba(197,160,89,0.78)",
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              {openedPanels.size} of 6 lessons
            </p>
          </div>

          {/* Accordion panels */}
          {LESSONS.map((lesson, idx) => {
            const isOpen = openPanel === idx;
            return (
              <div
                key={idx}
                data-testid={`lesson-panel-${idx}`}
                style={{
                  borderLeft: `3px solid ${isOpen ? "#C5A059" : "transparent"}`,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  data-testid={`lesson-toggle-${idx}`}
                  onClick={() => togglePanel(idx)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "1.75rem 1.5rem 1.75rem 1.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.896rem",
                        fontWeight: 700,
                        color: "#C5A059",
                        letterSpacing: "0.04em",
                        minWidth: 28,
                        opacity: isOpen ? 1 : 0.9,
                      }}
                    >
                      {lesson.number}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.008rem",
                        color: isOpen ? "#FFFFFF" : "rgba(255,255,255,0.87)",
                        transition: "color 0.2s",
                      }}
                    >
                      {lesson.title}
                    </span>
                  </div>
                  <span
                    style={{
                      color: isOpen ? "#C5A059" : "rgba(255,255,255,0.60)",
                      fontSize: "1.4rem",
                      lineHeight: 1,
                      transition: "all 0.2s",
                      transform: isOpen ? "rotate(45deg)" : "none",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 1.75rem 2.25rem 2.75rem" }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.98rem",
                        color: "rgba(255,255,255,0.90)",
                        lineHeight: 1.9,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {lesson.description}
                    </p>

                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.84rem",
                        color: "rgba(197,160,89,0.90)",
                        marginBottom: "1.5rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Estimated duration: {lesson.duration}
                    </p>

                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        paddingTop: "1.25rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.672rem",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#C5A059",
                          marginBottom: "0.6rem",
                        }}
                      >
                        OUTCOME
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.98rem",
                          color: "#FFFFFF",
                          lineHeight: 1.8,
                        }}
                      >
                        {lesson.outcome}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* ── Email Capture / Confirmation Block ── */}
          <div style={{ paddingTop: 72 }}>
            {!submitted ? (
              <div
                data-testid="email-capture-block"
                style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}
              >
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "1.344rem",
                    color: "#FFFFFF",
                    lineHeight: 1.5,
                    marginBottom: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  The Standard begins here.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.98rem",
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.6,
                    marginBottom: "2rem",
                    fontWeight: 400,
                  }}
                >
                  Submit your operating email to receive your Go/No-Go assessment result and next steps.
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    data-testid="ground0-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your operating email address"
                    style={{
                      width: "100%",
                      padding: "1rem 1.25rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.008rem",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#FFFFFF",
                      outline: "none",
                      marginBottom: "1rem",
                      boxSizing: "border-box",
                    }}
                  />

                  {error && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: "0.896rem",
                        marginBottom: "1rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    data-testid="ground0-submit-btn"
                    type="submit"
                    disabled={loading}
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
                      cursor: loading ? "wait" : "pointer",
                      padding: "1rem",
                      transition: "background 0.2s",
                      opacity: loading ? 0.8 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.background = "#D4B87A";
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.background = "#C5A059";
                    }}
                  >
                    {loading ? "Submitting..." : "Receive My Go/No-Go Result"}
                  </button>
                </form>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.84rem",
                    color: "rgba(255,255,255,0.84)",
                    marginTop: "1.25rem",
                    fontStyle: "italic",
                  }}
                >
                  You will receive your Go/No-Go result and next steps. No sales sequence. No
                  pressure.
                </p>
              </div>
            ) : (
              /* Confirmation block — replaces email capture in place */
              <div
                data-testid="confirmation-block"
                style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}
              >
                {/* Part 1 */}
                <div style={{ marginBottom: "2rem" }}>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.232rem",
                      color: "#FFFFFF",
                      marginBottom: "1rem",
                    }}
                  >
                    Your result is on its way.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.98rem",
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.85,
                    }}
                  >
                    Check your inbox. Your Go/No-Go assessment result and next steps will arrive
                    within the next few minutes.
                  </p>
                </div>

                {/* Gold rule — 2px minimum */}
                <div
                  style={{ height: 2, background: "#C5A059", margin: "2rem 0" }}
                  data-testid="gold-rule"
                />

                {/* Part 2 */}
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.896rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#C5A059",
                      marginBottom: "1rem",
                    }}
                  >
                    While you wait.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.98rem",
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.85,
                      marginBottom: "2rem",
                    }}
                  >
                    If Ground 0 confirmed what you already suspected — that your operation needs
                    a documented compliance system before the audit window opens — the next step
                    is available now.
                  </p>

                  <a
                    data-testid="portal-cta-btn"
                    href="/portal"
                    style={{
                      display: "block",
                      minHeight: 52,
                      background: "#C5A059",
                      color: "#002244",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.98rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "1rem",
                      textAlign: "center",
                      lineHeight: "32px",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#C5A059")}
                  >
                    Request Cohort Placement
                  </a>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.784rem",
                      color: "rgba(255,255,255,0.75)",
                      marginTop: "1.25rem",
                      fontStyle: "italic",
                    }}
                  >
                    Admission is not guaranteed. Placement is based on assessment result and
                    cohort availability.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 390px) {
          input[type="email"] { font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
}
