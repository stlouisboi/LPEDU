import React, { useState, useEffect } from "react";
import { Link } from '../compat/Link';
import AnnouncementBar from "../components/home/AnnouncementBar";
import SiteHeader from "../components/home/SiteHeader";
import SiteFooter from "../components/home/SiteFooter";
import { REACHTeaserSection } from "../components/REACHTeaserSection";
import MCAuditWindow from "../components/MCAuditWindow";
import { CATEGORIES, QUESTIONS, CATEGORY_INSIGHTS, RESULT_CONFIG, CATEGORY_GAP_CONFIG, getFlaggedNames } from "../data/reachData";
import CategoryBreakdown from "../components/reach/CategoryBreakdown";
import ResultCTAs from "../components/reach/ResultCTAs";
import RiskMap from "../components/reach/RiskMap";

// ── Main Page ─────────────────────────────────────────────
export default function REACHAssessmentPage() {
  const [phase, setPhase] = useState("intro"); // intro|questions|open|insight|analyzing|results|confirmed
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null); // brief highlight before advance
  const [insightIdx, setInsightIdx] = useState(null);
  const [openAnswer, setOpenAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState(null);
  const [analyzedCats, setAnalyzedCats] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animateMap, setAnimateMap] = useState(false);

  // LP-WRK-001 §7.1 — ICP Profile fields
  const [profileStep, setProfileStep] = useState(0);          // 0-3
  const [authorityGrantDate, setAuthorityGrantDate] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [fileState, setFileState] = useState("");
  const [decisionAuthority, setDecisionAuthority] = useState("");

  const API = process.env.REACT_APP_BACKEND_URL;

  // Analyzing animation
  useEffect(() => {
    if (phase !== "analyzing") return;
    let count = 0;
    const iv = setInterval(() => {
      count++;
      setAnalyzedCats(count);
      if (count >= 5) {
        clearInterval(iv);
        setTimeout(() => {
          setPhase("results");
          setTimeout(() => setAnimateMap(true), 300);
        }, 700);
      }
    }, 380);
    return () => clearInterval(iv);
  }, [phase]);

  const calcScores = (ans) => {
    const r = ans.slice(0, 3).reduce((s, a) => s + a, 0);
    const e = ans.slice(3, 6).reduce((s, a) => s + a, 0);
    const a = ans.slice(6, 9).reduce((s, a) => s + a, 0);
    const c = ans.slice(9, 12).reduce((s, a) => s + a, 0);
    const h = ans.slice(12, 14).reduce((s, a) => s + a, 0);
    const total = r + e + a + c + h;
    const outcome = total >= 32 ? "GO" : total >= 22 ? "WAIT" : "NO-GO";
    return { r, e, a, c, h, total, outcome };
  };

  const handleOptionSelect = (score, qIdx) => {
    setSelected(score);
    const newAnswers = [...answers, score];

    setTimeout(() => {
      setSelected(null);
      const isLastInCategory = (qIdx + 1) % 3 === 0;
      const catIdx = Math.floor(qIdx / 3);
      const insight = CATEGORY_INSIGHTS[catIdx];

      if (qIdx === 13) {
        // Last scored question — show open text
        setAnswers(newAnswers);
        setCurrentQ(14);
        setPhase("open");
      } else if (isLastInCategory && insight) {
        setAnswers(newAnswers);
        setInsightIdx(catIdx);
        setPhase("insight");
        setTimeout(() => {
          setPhase("questions");
          setCurrentQ(qIdx + 1);
          setInsightIdx(null);
        }, 2200);
      } else {
        setAnswers(newAnswers);
        setCurrentQ(qIdx + 1);
      }
    }, 350);
  };

  const handleOpenSubmit = () => {
    const computed = calcScores(answers);
    setScores(computed);
    setResult(computed.outcome);
    setPhase("profile");   // LP-WRK-001 §7.1 — capture ICP fields before analyzing
    setProfileStep(0);
  };

  const handleProfileComplete = () => {
    setPhase("analyzing");
    setAnalyzedCats(0);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch(`${API}/api/reach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName,
          result,
          total_score: scores.total,
          category_scores: { r: scores.r, e: scores.e, a: scores.a, c: scores.c, h: scores.h },
          open_response: openAnswer,
          // LP-WRK-001 §7.1 — ICP qualification fields
          authority_grant_date: authorityGrantDate || null,
          fleet_size: fleetSize || null,
          file_state: fileState || null,
          decision_authority: decisionAuthority || null,
        }),
      });
      // For WAIT/NO-GO: also register in the REACH waitlist
      if (result === "WAIT" || result === "NO-GO") {
        const sourceTag = result === "WAIT" ? "reach_wait_capture" : "reach_nogo_capture";
        await fetch(`${API}/api/ground0/waitlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            first_name: firstName,
            status: result,
            source_tag: sourceTag,
            completion_date: new Date().toISOString().slice(0, 10),
            reach_resources: scores.r >= 7 ? "PASS" : "FAIL",
            reach_experience: scores.e >= 7 ? "PASS" : "FAIL",
            reach_authority: scores.a >= 7 ? "PASS" : "FAIL",
            reach_commitment: scores.c >= 7 ? "PASS" : "FAIL",
            reach_discipline: scores.h >= 5 ? "PASS" : "FAIL",
            gaps_remaining: [scores.r < 7, scores.e < 7, scores.a < 7, scores.c < 7, scores.h < 5].filter(Boolean).length,
          }),
        }).catch(() => {});
      }
    } catch { /* still confirm */ }
    setLoading(false);
    setSubmitted(true);
    // Redirect WAIT/NO-GO users to their REACH holding page
    if (result === "WAIT") {
      setTimeout(() => { window.location.href = "/resources/reach-wait"; }, 1400);
    } else if (result === "NO-GO") {
      setTimeout(() => { window.location.href = "/resources/reach-nogo"; }, 1400);
    }
  };

  const currentCatIdx = phase === "questions" ? QUESTIONS[currentQ]?.cat ?? 0 : 0;
  const cfg = result ? RESULT_CONFIG[result] : null;

  // ── Shared container styles ───────────────────────────
  const wrap = {
    maxWidth: 640,
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  return (
    <div className="lp-home" style={{ fontFamily: "'Instrument Sans', sans-serif", background: "#1C2B3A", minHeight: "100vh", color: "#FFFFFF", position: "relative" }}>
      {/* Dot-grid background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(200,169,110,0.08) 1px, transparent 1px)",
        backgroundSize: "36px 36px", opacity: 0.5,
      }} />
      <AnnouncementBar />
      <SiteHeader activePath="/reach-diagnostic" />

      {/* ── INTRO — full clinical diagnostic section ─── */}
      {phase === "intro" && (
        <>
          <REACHTeaserSection onBegin={() => setPhase("questions")} />
          {/* MC Audit Window Calculator */}
          <section style={{ background: "#152433", padding: "4rem 1.5rem", borderTop: "1px solid rgba(200,169,110,0.12)" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <MCAuditWindow />
            </div>
          </section>
        </>
      )}

      {/* ── QUESTIONS ─────────────────────────────────── */}
      {phase === "questions" && currentQ < 14 && (
        <div style={{ ...wrap, paddingTop: "100px", paddingBottom: "80px", position: "relative", zIndex: 1 }}>
          {/* Diagnostic terminal header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "2rem", paddingBottom: "0.75rem",
            borderBottom: "1px solid rgba(200,169,110,0.12)",
            flexWrap: "wrap", gap: "0.5rem",
          }}>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.600rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,169,110,0.78)" }}>
              LOG_ENTRY_{String(currentQ + 1).padStart(2, '0')}_OF_15 · LP-MOD-REACH
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.600rem", letterSpacing: "0.10em", color: "rgba(255,255,255,0.52)" }}>
              {new Date().toISOString().replace("T"," ").substring(0,19)} UTC
            </p>
          </div>
          {/* 15-cell data grid progress */}
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.571rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,169,110,0.80)", marginBottom: "8px" }}>
              LP-REACH-SCAN · {CATEGORIES[currentCatIdx].full} · SECTION {currentCatIdx + 1} OF 5
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 3 }}>
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} style={{
                  height: 8,
                  background: i < currentQ ? "#C8A96E" : i === currentQ ? "rgba(200,169,110,0.35)" : "rgba(255,255,255,0.07)",
                  borderRadius: 1,
                  transition: "background 0.25s ease",
                }} />
              ))}
            </div>
          </div>

          <p style={{
            fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
            fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C8A96E", marginBottom: "2rem",
          }}>
            {CATEGORIES[currentCatIdx].full} — {CATEGORIES[currentCatIdx].key}
          </p>

          <p style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 600,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#FFFFFF",
            lineHeight: 1.55, marginBottom: "2.5rem", maxWidth: 540,
            whiteSpace: "pre-line",
          }}>
            {QUESTIONS[currentQ].text}
          </p>

          {currentQ === 0 && (
            <p style={{ fontSize: "0.924rem", color: "rgba(250,248,244,0.78)", fontFamily: "'Instrument Sans', sans-serif", marginBottom: "2rem", marginTop: "-1.75rem", lineHeight: 1.75, maxWidth: 500 }}>
              This is a reality check to keep you from walking into a bad deal with your own name on the door. If you answer like who you wish you were instead of who you are right now, the road will correct that faster than any program.
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {QUESTIONS[currentQ].options.map((opt, i) => {
              const isSelected = selected === opt.score && answers.length === currentQ;
              return (
                <button
                  key={i}
                  data-testid={`reach-option-${i}`}
                  onClick={() => handleOptionSelect(opt.score, currentQ)}
                  style={{
                    background: isSelected ? "rgba(200,169,110,0.12)" : "rgba(21,36,51,0.8)",
                    border: `1px solid ${isSelected ? "#C8A96E" : "rgba(200,169,110,0.20)"}`,
                    borderRadius: 0,
                    color: isSelected ? "#C8A96E" : "rgba(255,255,255,0.72)",
                    fontFamily: "'Instrument Sans', sans-serif", fontSize: "1rem",
                    padding: "1rem 1.5rem", textAlign: "left", cursor: "pointer",
                    transition: "background 0.1s, border-color 0.1s",
                    boxShadow: isSelected ? "inset 0 1px 3px rgba(0,0,0,0.5)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(200,169,110,0.07)";
                      e.currentTarget.style.borderColor = "rgba(200,169,110,0.40)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(21,36,51,0.8)";
                      e.currentTarget.style.borderColor = "rgba(200,169,110,0.20)";
                    }
                  }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          <p style={{ fontSize: "0.714rem", color: "rgba(255,255,255,0.65)", marginTop: "2rem", fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {CATEGORIES[currentCatIdx].full}
          </p>
        </div>
      )}

      {/* ── INSIGHT ───────────────────────────────────── */}
      {phase === "insight" && insightIdx !== null && (
        <div style={{ ...wrap, paddingTop: "120px", paddingBottom: "80px" }}>
          <div style={{ borderLeft: "2px solid #8B7355", paddingLeft: "1.5rem", maxWidth: 480 }}>
            <p style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif", fontSize: "1.12rem",
              color: "rgba(250,248,244,0.85)", lineHeight: 1.8, fontStyle: "italic",
            }}>
              {CATEGORY_INSIGHTS[insightIdx]}
            </p>
          </div>
        </div>
      )}

      {/* ── OPEN TEXT (Q15) ───────────────────────────── */}
      {phase === "open" && (
        <div style={{ ...wrap, paddingTop: "100px", paddingBottom: "80px" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", alignItems: "center" }}>
            {CATEGORIES.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 0,
                  background: "#C8A96E", opacity: i === 4 ? 1 : 0.5,
                }} />
                {i < 4 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)" }} />}
              </div>
            ))}
            <span style={{ fontSize: "0.714rem", color: "rgba(255,255,255,0.65)", marginLeft: "0.5rem" }}>5 of 5</span>
          </div>

          <p style={{
            fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
            fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C8A96E", marginBottom: "2rem",
          }}>
            OPERATIONAL DISCIPLINE — H
          </p>

          <p style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 600,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#FFFFFF",
            lineHeight: 1.55, marginBottom: "2rem", maxWidth: 540,
          }}>
            What concerns you most about starting a trucking operation?
          </p>

          <textarea
            data-testid="reach-open-input"
            value={openAnswer}
            onChange={(e) => setOpenAnswer(e.target.value)}
            placeholder="Share your honest answer. This helps us send you the right preparation resources."
            rows={4}
            style={{
              width: "100%", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF",
              fontFamily: "'Instrument Sans', sans-serif", fontSize: "1.1rem",
              padding: "1rem 1.25rem", resize: "vertical", boxSizing: "border-box",
              marginBottom: "1.5rem", outline: "none",
            }}
          />

          <button
            data-testid="reach-open-submit"
            onClick={handleOpenSubmit}
            className="lp-scan-btn"
            style={{
              minHeight: 52, background: "#C8A96E", color: "#FAF8F4", border: "none",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.1rem",
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              padding: "1rem 2.5rem", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C8A96E")}
          >
            Complete Assessment
          </button>
          <p style={{ fontSize: "0.714rem", color: "rgba(255,255,255,0.65)", marginTop: "1rem", fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            OPERATIONAL DISCIPLINE — FINAL QUESTION
          </p>
        </div>
      )}

      {/* ── ICP PROFILE PHASE (LP-WRK-001 §7.1) ────────── */}
      {phase === "profile" && (() => {
        const PROFILE_STEPS = [
          {
            code: "LP-ICP-01 · AUTHORITY WINDOW",
            q: "When did FMCSA grant your MC/DOT authority?",
            type: "date",
          },
          {
            code: "LP-ICP-02 · FLEET PROFILE",
            q: "How many power units do you currently operate?",
            type: "options",
            opts: [
              { label: "1–3 units — owner-operator", val: "1-3" },
              { label: "4–5 units — small fleet",    val: "4-5" },
              { label: "6–10 units",                 val: "6-10" },
              { label: "11+ units",                  val: "11+" },
              { label: "No equipment yet",           val: "none" },
            ],
            onSelect: (v) => { setFleetSize(v); setProfileStep(2); },
          },
          {
            code: "LP-ICP-03 · COMPLIANCE FILE STATE",
            q: "Which best describes your current compliance file situation?",
            type: "options",
            opts: [
              { label: "I have nothing. I don't know where to start.",            val: "nothing" },
              { label: "I have some documents but I'm not sure they're right.",   val: "some_docs_unsure" },
              { label: "I have documents but haven't organized them properly.",   val: "have_disorganized" },
              { label: "I have a system but it hasn't been reviewed.",            val: "system_unreviewed" },
              { label: "I have a compliance consultant handling this.",           val: "consultant" },
            ],
            onSelect: (v) => { setFileState(v); setProfileStep(3); },
          },
          {
            code: "LP-ICP-04 · DECISION STRUCTURE",
            q: "What is your role in this operation?",
            type: "options",
            opts: [
              { label: "Sole owner — I make all decisions.",                      val: "sole_owner" },
              { label: "Owner with a spouse or partner who is also involved.",    val: "owner_with_partner" },
              { label: "Fleet manager — owner approval required for purchases.",  val: "fleet_manager" },
              { label: "Employee — I am not the decision-maker.",                 val: "employee" },
            ],
            onSelect: (v) => { setDecisionAuthority(v); handleProfileComplete(); },
          },
        ];
        const step = PROFILE_STEPS[profileStep];
        return (
          <div style={{ paddingTop: "80px", paddingBottom: "80px", minHeight: "calc(100vh - 64px)", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace" }}>
            <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 1.5rem" }}>

              {/* Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: "2.5rem" }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ flex: 1, height: 2, background: i <= profileStep ? "#C8A96E" : "rgba(255,255,255,0.08)", transition: "background 0.25s" }} />
                ))}
              </div>

              <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,169,110,0.7)", marginBottom: "1.25rem" }}>
                {step.code}
              </p>
              <p style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontWeight: 600, fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "#FFFFFF", lineHeight: 1.55, marginBottom: "2.25rem", maxWidth: 540 }}>
                {step.q}
              </p>

              {step.type === "date" ? (
                <div>
                  <input
                    type="date"
                    data-testid="reach-icp-date"
                    value={authorityGrantDate}
                    onChange={e => setAuthorityGrantDate(e.target.value)}
                    style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,169,110,0.25)", color: "#FFFFFF", padding: "0.875rem 1.25rem", minHeight: 52, width: "100%", maxWidth: 320, borderRadius: 0, outline: "none", colorScheme: "dark", boxSizing: "border-box", marginBottom: "1rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    <button
                      data-testid="reach-icp-date-submit"
                      onClick={() => setProfileStep(1)}
                      disabled={!authorityGrantDate}
                      style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", background: authorityGrantDate ? "#C8A96E" : "rgba(200,169,110,0.2)", color: authorityGrantDate ? "#1C2B3A" : "rgba(255,255,255,0.3)", border: "none", padding: "0.875rem 1.5rem", minHeight: 48, cursor: authorityGrantDate ? "pointer" : "default", borderRadius: 0 }}>
                      CONTINUE →
                    </button>
                    <button
                      data-testid="reach-icp-date-skip"
                      onClick={() => { setAuthorityGrantDate(""); setProfileStep(1); }}
                      style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", background: "transparent", color: "rgba(250,248,244,0.72)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.875rem 1.25rem", minHeight: 48, cursor: "pointer", borderRadius: 0 }}>
                      NOT YET GRANTED
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {step.opts.map((opt, i) => (
                    <button
                      key={i}
                      data-testid={`reach-icp-opt-${profileStep}-${i}`}
                      onClick={() => step.onSelect(opt.val)}
                      style={{ background: "rgba(21,36,51,0.8)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 0, color: "rgba(255,255,255,0.8)", fontFamily: "'Instrument Sans',sans-serif", fontSize: "1rem", padding: "0.875rem 1.5rem", textAlign: "left", cursor: "pointer", minHeight: 52, transition: "background 0.1s, border-color 0.1s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,169,110,0.08)"; e.currentTarget.style.borderColor = "#C8A96E"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(21,36,51,0.8)"; e.currentTarget.style.borderColor = "rgba(200,169,110,0.2)"; }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: "2rem" }}>
                LP-WRK-001 · QUALIFICATION PROFILE · STEP {profileStep + 1} OF 4
              </p>
            </div>
          </div>
        );
      })()}

      {/* ── ANALYZING ─────────────────────────────────── */}
      {phase === "analyzing" && (
        <div style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "#000A14",
          minHeight: "calc(100vh - 64px)",
          fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 1.5rem" }}>

            {/* System header */}
            <div style={{ marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(200,169,110,0.15)" }}>
              <p style={{
                fontSize: "0.714rem",
                color: "rgba(200,169,110,0.6)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "0.625rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                LP-MOD-REACH · DIAGNOSTIC_ENGINE_v1
              </p>
              <p style={{
                fontSize: "0.762rem",
                color: "#FFFFFF",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                DIAGNOSTIC ENGINE RUNNING
              </p>
            </div>

            {/* Status line with blink */}
            <p className="scan-blink" style={{
              fontSize: "0.762rem",
              color: "#22c55e",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              SYSTEM_SCAN_IN_PROGRESS...
            </p>

            {/* Progress bar */}
            <div style={{
              background: "rgba(255,255,255,0.06)",
              height: 2,
              marginBottom: "2.5rem",
              overflow: "hidden",
            }}>
              <div style={{
                background: "#C8A96E",
                height: "100%",
                width: `${Math.round((analyzedCats / 5) * 100)}%`,
                transition: "width 0.38s ease",
              }} />
            </div>

            {/* Category scan entries */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CATEGORIES.map((c, i) => {
                const state = analyzedCats > i ? "done" : analyzedCats === i ? "scanning" : "pending";
                return (
                  <div key={i} style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "0.875rem 0",
                    borderBottom: i < CATEGORIES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    opacity: state === "pending" ? 0.3 : 1,
                    transition: "opacity 0.35s ease",
                  }}>
                    <span style={{
                      fontSize: "0.857rem",
                      color: state === "done" ? "#22c55e" : state === "scanning" ? "#C8A96E" : "rgba(255,255,255,0.25)",
                      fontWeight: 700,
                      minWidth: 14,
                    }}>
                      {state === "done" ? "✓" : state === "scanning" ? "◉" : "○"}
                    </span>
                    <span style={{
                      fontSize: "0.714rem",
                      color: state === "done" ? "rgba(255,255,255,0.85)" : state === "scanning" ? "#C8A96E" : "rgba(255,255,255,0.3)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {state === "done" ? "ANALYZED" : state === "scanning" ? "SCANNING..." : "PENDING"} — {c.full}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer note */}
            <p style={{
              fontSize: "0.762rem",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "2.5rem",
              lineHeight: 1.9,
            }}>
              ASSESSMENT_ID: LP-ASSESS-REACH-v1{"\n"}
              DO_NOT_CLOSE_WINDOW — PROCESSING
            </p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scan-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.15; } }
            .scan-blink { animation: scan-blink 1.1s steps(1) infinite; }
          `}} />
        </div>
      )}

      {/* ── RESULTS ───────────────────────────────────── */}
      {phase === "results" && cfg && scores && (
        <div style={{ background: "#000A14", minHeight: "calc(100vh - 64px)", paddingBottom: "80px" }}>

          {/* Status Banner */}
          <div style={{
            borderBottom: `3px solid ${cfg.color}`,
            background: `rgba(${cfg.rgb}, 0.04)`,
            padding: "3rem 1.5rem 2.5rem",
          }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.714rem",
                color: "rgba(200,169,110,0.80)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}>
                LPOS v1.0 | LP-MOD-REACH | ASSESSMENT COMPLETE
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
                <div style={{
                  border: `1px solid ${cfg.color}`,
                  background: `rgba(${cfg.rgb}, 0.1)`,
                  padding: "0.5rem 1.25rem",
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.857rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: cfg.color,
                    margin: 0,
                  }}>
                    {cfg.label}
                  </p>
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem",
                  color: "rgba(250,248,244,0.75)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  REACH SCORE: {scores.total} / 42
                </p>
              </div>

              <h2 style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                color: "#FFFFFF",
                lineHeight: 1.35,
                maxWidth: 560,
                marginBottom: "1.75rem",
              }}>
                {cfg.headline}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {cfg.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      color: cfg.color,
                      fontSize: "0.762rem",
                      marginTop: "0.25rem",
                      flexShrink: 0,
                      fontWeight: 700,
                    }}>—</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.7,
                    }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Map + Email */}
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

            {/* Category Breakdown */}
            <div style={{ marginBottom: "2.5rem" }}>
              <CategoryBreakdown scores={scores} />
            </div>

            {/* ── Authority Risk Map ── */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(200,169,110,0.65)", marginBottom: "1.5rem",
              }}>
                AUTHORITY RISK MAP
              </p>
              <RiskMap scores={scores} animate={animateMap} />
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.714rem",
                color: "rgba(255,255,255,0.58)", letterSpacing: "0.1em",
                textTransform: "uppercase", marginTop: "1rem",
              }}>
                {scores.total >= 32 ? "GO THRESHOLD MET — PROCEED TO GROUND 0"
                  : scores.total >= 22 ? "WAIT THRESHOLD — GAPS IDENTIFIED"
                  : "NO-GO THRESHOLD — CRITICAL GAPS DETECTED"}
              </p>
            </div>

            {/* ── Issue 1: Result-specific bridge CTA — immediately below risk map ── */}
            {result === "GO" && (
              <div style={{
                borderLeft: "3px solid #8B7355",
                background: "rgba(200,169,110,0.05)",
                border: "1px solid rgba(200,169,110,0.22)",
                padding: "1.75rem 1.75rem",
                marginBottom: "2.5rem",
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,169,110,0.80)",
                  marginBottom: "0.875rem",
                }}>NEXT STEP — QUALIFIED OPERATOR</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                  color: "rgba(255,255,255,0.80)", lineHeight: 1.80, marginBottom: "1.5rem",
                }}>
                  {scores.a < 9
                    ? `Your Authority Readiness score shows ${9 - scores.a} point${9 - scores.a > 1 ? "s" : ""} of exposure — the most commonly cited gaps in new entrant audits. The LaunchPath Standard closes this in Weeks 3–6.`
                    : "Your assessment indicates strong readiness across all five categories. The LaunchPath Standard installs the compliance infrastructure that maintains this through the full audit window."}
                </p>
                <a
                  href="/launchpath-standard"
                  data-testid="cta-standard-direct"
                  style={{
                    display: "inline-block", background: "#C8A96E", color: "#FAF8F4",
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.762rem",
                    letterSpacing: "0.09em", textTransform: "uppercase", textDecoration: "none",
                    padding: "1rem 2rem", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                  onMouseLeave={e => e.currentTarget.style.background = "#C8A96E"}
                >
                  PROCEED TO THE 90-DAY STANDARD →
                </a>
              </div>
            )}

            {result === "WAIT" && (() => {
              const flagged = getFlaggedNames(scores);
              return (
                <div style={{
                  borderLeft: "3px solid rgba(245,158,11,0.60)",
                  background: "rgba(245,158,11,0.04)",
                  border: "1px solid rgba(245,158,11,0.20)",
                  padding: "1.75rem 1.75rem",
                  marginBottom: "2.5rem",
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,158,11,0.65)",
                    marginBottom: "0.875rem",
                  }}>NEXT STEP — CLOSE THE GAPS FIRST</p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                    color: "rgba(255,255,255,0.75)", lineHeight: 1.80, marginBottom: "1.5rem",
                  }}>
                    {flagged.length > 0
                      ? `Your ${flagged.join(", ")} score${flagged.length > 1 ? "s indicate" : " indicates"} gaps that should be addressed before the Standard begins. Ground 0 gives you the framework. The 16 Deadly Sins shows the specific behaviors to resolve.`
                      : "Your assessment indicates areas that should be strengthened before implementation begins. Ground 0 provides the preparation framework."}
                  </p>
                  <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                    <a href="/16-deadly-sins" data-testid="cta-wait-sins" className="lp-scan-btn"
                      style={{ display: "inline-block", background: "#F59E0B", color: "#FAF8F4", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.09em", textTransform: "uppercase", textDecoration: "none", padding: "0.875rem 1.5rem", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f7b731"}
                      onMouseLeave={e => e.currentTarget.style.background = "#F59E0B"}
                    >Review the 16 Deadly Sins →</a>
                  </div>
                </div>
              );
            })()}

            {result === "NO-GO" && (
              <div style={{
                borderLeft: "3px solid rgba(248,113,113,0.50)",
                background: "rgba(248,113,113,0.04)",
                border: "1px solid rgba(248,113,113,0.18)",
                padding: "1.75rem 1.75rem",
                marginBottom: "2.5rem",
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(248,113,113,0.65)",
                  marginBottom: "0.875rem",
                }}>NEXT STEP — RESOLVE THE CONDITIONS FIRST</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                  color: "rgba(255,255,255,0.72)", lineHeight: 1.80, marginBottom: "1.5rem",
                }}>
                  This result protects you from a preventable financial loss. The conditions that caused it are resolvable. The Knowledge Center contains the resources to address each one. Return when your score changes.
                </p>
                <a href="/knowledge-center" data-testid="cta-nogo-knowledge"
                  style={{ display: "inline-block", background: "transparent", color: "rgba(255,255,255,0.70)", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.09em", textTransform: "uppercase", textDecoration: "none", padding: "0.875rem 1.5rem", border: "1px solid rgba(255,255,255,0.22)", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >Explore the Knowledge Center →</a>
              </div>
            )}

            {/* Email capture */}
            {!submitted ? (
              <div data-testid="reach-email-block" style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "2rem",
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem",
                  color: "rgba(200,169,110,0.65)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}>
                  RECEIVE YOUR RESULTS BRIEF
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}>
                  Your full REACH summary — score breakdown, category feedback, and preparation resources — will arrive in your inbox within minutes.
                </p>
                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <input
                    data-testid="reach-firstname-input"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    style={{
                      padding: "1rem 1.25rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <input
                    data-testid="reach-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your operating email address"
                    style={{
                      padding: "1rem 1.25rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    data-testid="reach-email-submit"
                    type="submit"
                    disabled={loading}
                    className="lp-scan-btn"
                    style={{
                      minHeight: 52, background: "#C8A96E", color: "#FAF8F4", border: "none",
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      cursor: loading ? "wait" : "pointer", padding: "1rem",
                      opacity: loading ? 0.8 : 1, transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#D4B87A"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#C8A96E"; }}
                  >
                    {loading ? "Sending..." : "Send My Results"}
                  </button>
                </form>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.762rem",
                  color: "rgba(250,248,244,0.78)",
                  marginTop: "0.875rem",
                  fontStyle: "italic",
                }}>
                  No sales sequence. Results and preparation resources only.
                </p>
              </div>
            ) : (
              <div data-testid="reach-confirmed" style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "2rem",
              }}>
                <div style={{ height: 2, background: cfg.color, marginBottom: "1.5rem" }} />

                {/* What This Means — only for WAIT/NO-GO */}
                {result !== "GO" && (() => {
                  const flagged = getFlaggedNames(scores);
                  return (
                    <div style={{ marginBottom: "2rem" }}>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.714rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(200,169,110,0.65)",
                        marginBottom: "0.875rem",
                      }}>
                        WHAT THIS MEANS
                      </p>
                      {flagged.length > 0 && (
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "1rem",
                          color: "rgba(255,255,255,0.72)",
                          lineHeight: 1.75,
                          marginBottom: "1rem",
                        }}>
                          Your{" "}
                          {flagged.length === 1
                            ? flagged[0]
                            : flagged.slice(0, -1).join(", ") + " and " + flagged[flagged.length - 1]}{" "}
                          {flagged.length === 1 ? "score suggests" : "scores suggest"} areas that should be addressed before or during implementation.
                        </p>
                      )}
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1rem",
                        color: "rgba(255,255,255,0.52)",
                        lineHeight: 1.7,
                        marginBottom: 0,
                      }}>
                        {cfg.sub}
                      </p>
                    </div>
                  );
                })()}

                {/* GO result simple message */}
                {result === "GO" && (
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                  }}>
                    {cfg.sub}
                  </p>
                )}

                {/* Result-specific CTAs */}
                <ResultCTAs result={result} />

                {/* Ground 0 closing statement */}
                <div style={{
                  marginTop: "2.5rem",
                  padding: "1.25rem 1.5rem",
                  borderLeft: "3px solid rgba(200,169,110,0.4)",
                  background: "rgba(200,169,110,0.04)",
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.8,
                    margin: 0,
                    fontStyle: "italic",
                  }}>
                    "GO means the conditions for survival exist. It does not guarantee success — it means you're ready to install the system. WAIT and NO-GO mean wisdom says 'not yet' so you don't walk into a loss you can't afford."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {["results", "intro"].includes(phase) && <SiteFooter />}
    </div>
  );
}
