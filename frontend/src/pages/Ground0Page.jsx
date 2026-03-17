import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import REACHAssessmentWidget from "../components/REACHAssessmentWidget";

const MODULES = [
  {
    number: "G0-1",
    title: "The Reality of Motor Carrier Authority",
    description:
      "Authority is not permission to operate — it is entry into a federally regulated environment with a documented audit timeline that begins on Day 1. This module establishes what a USDOT authority actually represents and what the regulatory environment requires during the new entrant period.",
    duration: "~12 minutes",
    outcome:
      "Understand what authority actually requires from an operator, what the FMCSA new entrant period demands, and what LaunchPath was built to address.",
  },
  {
    number: "G0-2",
    title: "The 90-Day Survival Window",
    description:
      "The New Entrant Safety Audit is not a distant event — it is a scheduled regulatory review that initiates within 12–24 months of authority activation. The compliance record begins forming on Day 1. Carriers that wait until the audit notice arrives are already behind. This module maps the timeline.",
    duration: "~15 minutes",
    outcome:
      "Map the regulatory timeline from authority activation through the New Entrant review period and identify the critical installation windows where structure must be in place.",
  },
  {
    number: "G0-3",
    title: "The AUTO Risk Model",
    description:
      "Every new carrier authority faces four vectors of regulatory, financial, and operational risk. The AUTO Model maps those threats — Around, Under, Through, and Over — and identifies the exposure points that eliminate authorities in the first 90 days. Understanding these vectors is the first requirement of the Standard.",
    duration: "~18 minutes",
    outcome:
      "Identify the four threat vectors that attack new motor carrier authorities and understand how each one terminates operations before the audit window closes.",
  },
  {
    number: "G0-4",
    title: "The Four Pillars of Survival",
    description:
      "Four operational systems create the documented compliance architecture that regulators, insurers, and freight partners require. Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen are not optional components — they are the structural requirements of authority survival. The absence of any single pillar creates exposure across all four.",
    duration: "~14 minutes",
    outcome:
      "Understand the four systems every new authority must install and how they interact to prevent regulatory, financial, and operational failure.",
  },
  {
    number: "G0-5",
    title: "The 16 Deadly Sins",
    description:
      "There are 16 documented failure patterns responsible for the majority of new entrant authority failures. These are not random errors — they are predictable, recurring, and preventable. This module identifies each one, maps it to the AUTO threat vector it belongs to, and explains the operational failure sequence that follows.",
    duration: "~20 minutes",
    outcome:
      "Recognize the 16 most common failure patterns in new motor carrier operations and identify which pillar system each one requires to prevent it.",
  },
  {
    number: "G0-6",
    title: "The GO / WAIT / NO-GO Decision",
    description:
      "The final module applies the knowledge from G0-1 through G0-5 to a structured readiness assessment. The result is a classification — GO, WAIT, or NO-GO — that determines whether the operator is ready to proceed with Standard admission or requires foundational work first. This is not a score. It is a decision.",
    duration: "~16 minutes",
    outcome:
      "Complete the REACH Assessment and receive a structured GO, WAIT, or NO-GO classification with a specific next step attached to each outcome.",
  },
];

export default function Ground0Page() {
  const [openPanel, setOpenPanel] = useState(0);
  const [openedPanels, setOpenedPanels] = useState(new Set([0]));
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // kept for potential future use
  const [showReachWidget, setShowReachWidget] = useState(false);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_BACKEND_URL;

  // Called when REACH widget captures operator email — submits Ground 0 + redirects to completion
  const handleReachEmailCaptured = async (capturedEmail) => {
    if (submitted) return;
    try {
      await fetch(`${API}/api/ground0`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: capturedEmail }),
      });
    } catch { /* still navigate */ }
    navigate("/ground-0-complete");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Fire-and-forget — email capture is secondary; user always proceeds
    fetch(`${API}/api/ground0`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    navigate("/ground-0-complete");
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
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.672rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C5A059",
              marginBottom: "1.5rem",
            }}
          >
            LP-MOD-G0 — Open Access Implementation Module
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
            Before admission is considered, every operator completes Ground 0.
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
            Six implementation modules. Approximately 95 minutes. No charge. This is the first installation phase of the LaunchPath Operating Standard.
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.008rem",
              color: "#555555",
              lineHeight: 1.9,
              maxWidth: 680,
              marginBottom: "2rem",
            }}
          >
            Ground 0 does not teach compliance. It establishes whether you are the carrier this
            standard was built for. By the end of G0-6 you will have completed a structured
            readiness assessment. That result determines the next step.
          </p>

          {/* Doctrine quote */}
          <div style={{
            borderLeft: "3px solid #C5A059",
            paddingLeft: "1.5rem",
            marginTop: "1rem",
          }}>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontStyle: "italic",
              fontSize: "1.008rem",
              color: "#333333",
              lineHeight: 1.75,
              marginBottom: "0.5rem",
            }}>
              "Wisdom sees ahead and prepares for what's coming. Better to collect wisdom earnings today than to pay sin wages tomorrow."
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.616rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C5A059",
            }}>
              — Operator Note / Vince Lawrence, Station Custodian
            </p>
          </div>
        </div>
      </div>

      {/* ── Sin Wages / Wisdom Earnings Philosophy ── Very dark bg */}
      <div style={{ background: "#000D1A", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.85)",
            marginBottom: "1.25rem",
          }}>
            The Ground 0 Philosophy
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.35rem, 2.8vw, 1.85rem)",
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
          }}>
            Sin Wages vs. Wisdom Earnings
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.98rem",
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.8,
            maxWidth: 620,
            marginBottom: "2.5rem",
          }}>
            In the motor carrier industry, <strong style={{ color: "#f87171" }}>Sin Wages</strong> represent the compounding costs of administrative neglect — audit penalties, insurance spikes, authority revocation. What costs $500 to prevent in Month 1 can cost $5,000 to correct in Month 6 and $50,000 to survive in Month 12.
          </p>

          {/* Comparison table */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            marginBottom: "2.5rem",
          }} className="sinwages-grid">
            <div style={{ background: "#0D1929", padding: "1.75rem" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.616rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(248,113,113,0.85)",
                marginBottom: "1rem",
              }}>Sin Wages</p>
              {[
                "Paid later, with compounding interest",
                "Audit penalties — $1,000–$16,000 per violation",
                "Insurance non-renewal after a CSA finding",
                "Authority revocation and revenue loss",
                "The cost of starting over",
              ].map((item, i) => (
                <p key={i} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.80)",
                  lineHeight: 1.7,
                  paddingLeft: "0.75rem",
                  borderLeft: "2px solid rgba(248,113,113,0.35)",
                  marginBottom: "0.5rem",
                }}>
                  {item}
                </p>
              ))}
            </div>
            <div style={{ background: "#0D1A10", padding: "1.75rem" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.616rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(74,222,128,0.85)",
                marginBottom: "1rem",
              }}>Wisdom Earnings</p>
              {[
                "Collected early — compound positively",
                "Operational readiness before the audit window",
                "Documentation systems installed at activation",
                "Insurance continuity through policy discipline",
                "Authority protected through the first 24 months",
              ].map((item, i) => (
                <p key={i} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.80)",
                  lineHeight: 1.7,
                  paddingLeft: "0.75rem",
                  borderLeft: "2px solid rgba(74,222,128,0.35)",
                  marginBottom: "0.5rem",
                }}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.98rem",
            color: "rgba(255,255,255,0.70)",
            fontStyle: "italic",
            lineHeight: 1.7,
          }}>
            The choice is not whether to pay — it's when, and how much.
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
              {openedPanels.size} of 6 implementation modules reviewed
            </p>
          </div>

          {/* Accordion panels */}
          {MODULES.map((module, idx) => {
            const isOpen = openPanel === idx;
            return (
              <div
                key={idx}
                data-testid={`module-panel-${idx}`}
                style={{
                  borderLeft: `3px solid ${isOpen ? "#C5A059" : "transparent"}`,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  data-testid={`module-toggle-${idx}`}
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
                        whiteSpace: "nowrap",
                        opacity: isOpen ? 1 : 0.9,
                      }}
                    >
                      {module.number}
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
                      {module.title}
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
                      {module.description}
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
                      Estimated duration: {module.duration}
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
                        {module.outcome}
                      </p>
                    </div>

                    {/* G0-6: embed the REACH Assessment widget inline */}
                    {idx === 5 && (
                      <div style={{
                        borderTop: "1px solid rgba(197,160,89,0.2)",
                        marginTop: "2rem",
                        paddingTop: "0.5rem",
                      }}>
                        {!showReachWidget ? (
                          <button
                            data-testid="g0-begin-reach-btn"
                            onClick={() => setShowReachWidget(true)}
                            style={{
                              marginTop: "1.25rem",
                              background: "#C5A059",
                              color: "#002244",
                              border: "none",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 700,
                              fontSize: "0.875rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              cursor: "pointer",
                              padding: "0.875rem 2rem",
                              minHeight: 48,
                              transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#C5A059")}
                          >
                            Begin REACH Assessment
                          </button>
                        ) : (
                          <REACHAssessmentWidget onEmailCaptured={handleReachEmailCaptured} />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* ── Operator Voice note ── */}
          <div style={{
            borderLeft: "3px solid rgba(197,160,89,0.4)",
            paddingLeft: "1.75rem",
            marginBottom: "3rem",
            marginTop: "1rem",
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.616rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,0.75)",
              marginBottom: "0.875rem",
            }}>
              — Station Custodian / Operator Note
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.98rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.85,
              marginBottom: "0.875rem",
            }}>
              I've seen too many veterans and entrepreneurs treat the first 90 days like a honeymoon period. They focus on the chrome and the load boards while the paperwork sits in a pile.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.98rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.85,
              marginBottom: "0.875rem",
            }}>
              By the time the audit notice hits the inbox, they're already underwater.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.98rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.85,
            }}>
              We made Ground 0 free because the industry doesn't need more students — it needs Operators who understand that the system is what keeps the lights on. If you can't install the discipline here, you won't survive the first inspection.
            </p>
          </div>

          {/* ── Readiness Tier Table ── */}
          <div style={{ marginBottom: "3rem" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.672rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,0.85)",
              marginBottom: "1.25rem",
            }}>
              GO / WAIT / NO-GO — Readiness Classifications
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.08)" }} className="tier-list">
              {[
                { tier: "GO", color: "#22c55e", status: "Operational infrastructure aligned", meaning: "Proceed to Standard admission." },
                { tier: "WAIT", color: "#fbbf24", status: "Infrastructure gaps identified", meaning: "Address identified gaps before proceeding to Standard admission." },
                { tier: "NO-GO", color: "#f87171", status: "Authority launch not recommended", meaning: "Foundational issues require resolution before authority activation." },
              ].map((row) => (
                <div key={row.tier} style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "1.5rem",
                  background: "#001530",
                  padding: "1.25rem 1.5rem",
                  alignItems: "start",
                }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.08em",
                    color: row.color,
                    marginTop: "0.1rem",
                  }}>{row.tier}</p>
                  <div>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#FFFFFF",
                      marginBottom: "0.25rem",
                    }}>{row.status}</p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.825rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.5,
                    }}>{row.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                    {email && <><br /><span style={{ fontStyle: "italic", fontSize: "0.875rem", opacity: 0.75 }}>Sent to: {email}</span></>}
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
        @media (max-width: 600px) {
          .sinwages-grid { grid-template-columns: 1fr !important; }
          .tier-list > div { grid-template-columns: 60px 1fr !important; }
        }
      `}</style>
    </div>
  );
}
