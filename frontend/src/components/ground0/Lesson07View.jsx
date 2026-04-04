import React, { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { L07_MODULES } from "../../data/ground0Data";

export default function Lesson07View({ onViewCompletion }) {
  const [captureFirstName, setCaptureFirstName] = useState("");
  const [captureEmail, setCaptureEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState("idle");
  const API = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  const handleCapture = async (e) => {
    e.preventDefault();
    if (!captureEmail || captureStatus === "done") return;
    setCaptureStatus("loading");
    try {
      const res = await fetch(`${API}/api/go-email-capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: captureEmail, name: captureFirstName }),
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
          { text: "You received a REACH GO. Let me tell you what that actually means — and what comes next.", highlight: false },
          { text: "Ground 0 did one thing: it helped you understand the weight, order, and discipline required to proceed correctly.", highlight: false },
          { text: "You picked a lane. You scored your readiness. REACH confirmed that the conditions to survive are in place.", highlight: false },
          { text: "That is not a small thing. Most operators who fail audits never did any of it. They launched on excitement, not preparation. REACH qualification is what separates a carrier who is structurally ready from one who just wants to be ready.", highlight: false },
          { text: "You are qualified to proceed. Now comes the build.", highlight: true },
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
              CONFIRMED — Your next step has been saved. Check your inbox for what comes next.
            </p>
          </div>
        ) : (
          <>
            <p style={{ margin: "0 0 0.875rem", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)" }}>
              YOU'RE CLEARED TO MOVE FORWARD
            </p>
            <p style={{ margin: "0 0 0.875rem", fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
              Your results show that you meet the current standard to continue. Leave your information below to secure your next step and continue into the LaunchPath admission path.
            </p>
            <form onSubmit={handleCapture} style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <input
                data-testid="g0-go-firstname-input"
                type="text"
                required
                placeholder="First name"
                value={captureFirstName}
                onChange={e => setCaptureFirstName(e.target.value)}
                style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.762rem", outline: "none", letterSpacing: "0.04em" }}
              />
              <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                <input
                  data-testid="g0-email-capture-input"
                  type="email"
                  required
                  placeholder="Email address"
                  value={captureEmail}
                  onChange={e => setCaptureEmail(e.target.value)}
                  style={{ flex: 1, minWidth: 180, padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.762rem", outline: "none", letterSpacing: "0.04em" }}
                />
                <button
                  data-testid="g0-email-capture-submit"
                  type="submit"
                  disabled={captureStatus === "loading"}
                  style={{ padding: "0.75rem 1.25rem", background: "transparent", border: "1px solid rgba(212,144,10,0.45)", color: "rgba(212,144,10,0.85)", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: captureStatus === "loading" ? "default" : "pointer", whiteSpace: "nowrap" }}
                >
                  {captureStatus === "loading" ? "SENDING…" : "CONTINUE →"}
                </button>
              </div>
            </form>
            {captureStatus === "error" && (
              <p style={{ margin: "0.5rem 0 0", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.571rem", color: "rgba(239,68,68,0.7)", letterSpacing: "0.08em" }}>
                Could not save. Try again or email vince@launchpathedu.com directly.
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
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#d4900a", color: "#000F1F", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.97rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "1.25rem 1.75rem", textDecoration: "none", transition: "background 0.2s", width: "100%", boxSizing: "border-box", minHeight: 56 }}
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
        style={{ background: "none", border: "none", fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", color: "rgba(255,255,255,0.28)", cursor: "pointer", letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.5rem 0", display: "block", transition: "color 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}
      >
        VIEW COMPLETION SUMMARY →
      </button>
    </div>
  );
}
