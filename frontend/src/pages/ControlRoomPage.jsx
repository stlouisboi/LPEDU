import { useState, useEffect, useRef } from "react";
import { Link } from '../compat/Link';
import { usePathname } from 'next/navigation';
;

const API = process.env.REACT_APP_BACKEND_URL;
const GOLD = "#C8933F";
const DEEP = "#060D1A";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";

// ── Shared utilities ───────────────────────────────────────────────────────────
const CALENDAR_TASKS = [
  { day: 1,  title: "Verify USDOT Active Status",        cat: "Authority",    desc: "Log into FMCSA SAFER portal and confirm your USDOT number is active and your carrier profile is accurate." },
  { day: 2,  title: "Confirm BOC-3 Filing",               cat: "Authority",    desc: "Contact your process agent and verify the BOC-3 is on file with FMCSA. Save the confirmation." },
  { day: 3,  title: "Verify Liability Insurance on File", cat: "Insurance",    desc: "Confirm your MCS-90 endorsement is filed with FMCSA and matches your policy limits." },
  { day: 5,  title: "Verify Cargo Insurance Policy",      cat: "Insurance",    desc: "Confirm cargo insurance meets the required minimums and is on file with FMCSA." },
  { day: 7,  title: "Complete UCR Registration",          cat: "Authority",    desc: "Register for the Unified Carrier Registration (UCR). Required annually. No exceptions." },
  { day: 8,  title: "Enroll in D&A Testing Consortium",  cat: "D&A Program",  desc: "Enroll yourself (and all CDL drivers) in a DOT-compliant Drug & Alcohol testing consortium." },
  { day: 10, title: "Open Driver Qualification File",     cat: "Driver Files", desc: "Create a DQF for every commercial driver. This file is audited. Missing docs = violation." },
  { day: 14, title: "Establish Pre-Trip Inspection System", cat: "Maintenance", desc: "Set up a standardized DVIR (Driver Vehicle Inspection Report) process. Document the procedure." },
  { day: 18, title: "Set Up Hours of Service System",    cat: "HOS",          desc: "Implement an ELD or paper logbook system compliant with FMCSA HOS regulations." },
  { day: 21, title: "Conduct First Pre-Trip Inspection", cat: "Maintenance",  desc: "Complete and document your first formal pre-trip inspection report. File it." },
  { day: 31, title: "Collect All DQF Documents",          cat: "Driver Files", desc: "Collect CDL, medical certificate, MVR, PSP report, and employment application for each driver." },
  { day: 45, title: "Document Maintenance Schedule",      cat: "Maintenance",  desc: "Create a written preventive maintenance schedule for each commercial vehicle in your fleet." },
  { day: 60, title: "First Compliance Self-Audit",        cat: "Authority",    desc: "Review all 6 compliance domains against your documents. Log gaps. Fix before month 3." },
  { day: 61, title: "Review All FMCSA Filings",           cat: "Authority",    desc: "Confirm BOC-3, insurance certs, and UCR are all current. Update MCS-150 if needed." },
  { day: 75, title: "Test Pre-Trip Compliance",           cat: "Maintenance",  desc: "Audit your DVIRs for the past 60 days. Confirm every trip has a completed report on file." },
  { day: 80, title: "Verify Insurance Coverage Limits",   cat: "Insurance",    desc: "Review liability and cargo limits against your active lanes and cargo types. Adjust if needed." },
  { day: 90, title: "90-Day Compliance Checkpoint",       cat: "Authority",    desc: "Full self-audit: Authority, Insurance, Driver Files, D&A, HOS, Maintenance. Document results." },
];

const HEALTH_QUESTIONS = [
  { q: "Is your Drug & Alcohol testing program enrolled and documented?",          domain: "D&A Program" },
  { q: "Do you have a completed Driver Qualification File (DQF) for each driver?", domain: "Driver Files" },
  { q: "Is your liability insurance actively filed with FMCSA (MCS-90)?",          domain: "Insurance" },
  { q: "Is your cargo insurance current and on file?",                              domain: "Insurance" },
  { q: "Do you have a documented Vehicle Maintenance Schedule?",                    domain: "Maintenance" },
  { q: "Are pre-trip inspection reports (DVIRs) being logged for every trip?",      domain: "Maintenance" },
  { q: "Are your Hours of Service records current and accurate?",                   domain: "HOS" },
  { q: "Is your UCR registration current for this calendar year?",                  domain: "Authority" },
  { q: "Is your BOC-3 process agent filing active?",                                domain: "Authority" },
  { q: "Have you verified your FMCSA SAFER profile is accurate?",                   domain: "Authority" },
];

const MAP_MILESTONES = [
  { month: 0,  label: "ACTIVATION",  title: "Authority Goes Active", color: GOLD,
    items: ["USDOT number active", "MC number active", "BOC-3 filed", "Insurance certs on file", "UCR registered"] },
  { month: 1,  label: "MONTH 1",     title: "Foundation Systems", color: "#5B9BD5",
    items: ["Drug & Alcohol program enrolled", "Driver Qualification Files opened", "Pre-trip inspection process established"] },
  { month: 3,  label: "MONTH 3",     title: "90-Day Checkpoint",  color: GOLD,
    items: ["First compliance self-audit completed", "All DVIRs filed and organized", "HOS records verified"] },
  { month: 6,  label: "MONTH 6",     title: "Operational Review", color: "#5B9BD5",
    items: ["Insurance limits reviewed against load types", "DQFs complete and current", "Maintenance records organized"] },
  { month: 9,  label: "MONTH 9",     title: "Audit Window Opens", color: "#e74c3c",
    items: ["FMCSA New Entrant Safety Audit can begin", "All 6 compliance domains must be audit-ready", "Contact letters may arrive at any time"] },
  { month: 12, label: "MONTH 12",    title: "Mid-Program Review", color: GOLD,
    items: ["Annual UCR renewal due", "MCS-150 biennial update check", "Full compliance re-audit recommended"] },
  { month: 15, label: "MONTH 15",    title: "Pre-Audit Prep",     color: "#e74c3c",
    items: ["Organize all compliance files", "Complete a mock audit", "Resolve any outstanding violations"] },
  { month: 18, label: "MONTH 18",    title: "Audit Deadline",     color: "#e74c3c",
    items: ["New Entrant Safety Audit must be PASSED by this date", "Failure = Unsatisfactory Rating = authority revocation risk"] },
];

const FOLDERS = [
  { id: 1, name: "Authority & Identity",  code: "LP-F-001", icon: "01",
    docs: ["USDOT Number Certificate", "MC Number Confirmation", "BOC-3 Process Agent Filing", "UCR Registration Confirmation", "MCS-150 Biennial Update Record"] },
  { id: 2, name: "Insurance Records",     code: "LP-F-002", icon: "02",
    docs: ["MCS-90 Liability Endorsement", "Cargo Insurance Certificate", "ACORD Certificate of Insurance", "Insurance Filing Confirmation (FMCSA)", "Annual Policy Renewal Records"] },
  { id: 3, name: "Driver Files (DQF)",    code: "LP-F-003", icon: "03",
    docs: ["Commercial Driver's License (CDL)", "Medical Examiner's Certificate", "Motor Vehicle Record (MVR)", "Pre-Employment Drug Test Results", "PSP (Pre-Employment Screening Program) Report", "Driver Application / Employment Record"] },
  { id: 4, name: "Drug & Alcohol",        code: "LP-F-004", icon: "04",
    docs: ["Consortium Enrollment Confirmation", "DOT D&A Policy (signed)", "Pre-Employment Test Results", "Random Testing Pool Records", "Reasonable Suspicion Training Certificate"] },
  { id: 5, name: "Hours of Service",      code: "LP-F-005", icon: "05",
    docs: ["ELD (Device) Registration / Certification", "Daily Log Sheets or ELD Exports", "HOS Exemption Documentation (if applicable)", "Driver Recap Sheets (paper logs)", "HOS Policy Statement"] },
  { id: 6, name: "Vehicle Maintenance",   code: "LP-F-006", icon: "06",
    docs: ["Pre-Trip Inspection Reports (DVIRs)", "Preventive Maintenance Schedule", "Repair & Service Records", "Annual Inspection Certificate (per vehicle)", "Tire & Brake Inspection Logs"] },
  { id: 7, name: "Accident & Incident",   code: "LP-F-007", icon: "07",
    docs: ["FMCSA Accident Register", "Police / Crash Reports", "Insurance Claim Documentation", "Post-Accident Drug Test Results", "Corrective Action Records"] },
  { id: 8, name: "General Operations",    code: "LP-F-008", icon: "08",
    docs: ["Operating Agreement / Owner-Operator Contract", "Rate Confirmations", "Bills of Lading", "Detention & Lumper Receipts", "Broker Payment Records"] },
];

// ── Email Gate Modal ───────────────────────────────────────────────────────────
function GateModal({ open, toolName, onClose, onSuccess, extraData }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!email.includes("@")) { setErr("Enter a valid email address."); return; }
    setLoading(true); setErr("");
    try {
      const r = await fetch(`${API}/api/control-room/capture`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tool_name: toolName, ...(extraData || {}) }),
      });
      if (!r.ok) throw new Error();
      onSuccess(email);
      onClose();
    } catch { setErr("Could not submit. Please try again."); }
    finally { setLoading(false); }
  };

  if (!open) return null;
  return (
    <div data-testid="gate-modal" style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(4,8,18,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
    }}>
      <div style={{
        background: "#0D1829", border: `1px solid rgba(200,147,63,0.30)`,
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6), 0 0 60px rgba(200,147,63,0.08)",
        padding: "3rem 2.5rem", maxWidth: 480, width: "100%",
      }}>
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
          SYSTEM OUTPUT — {toolName.toUpperCase()}
        </p>
        <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.75rem" }}>
          Enter your email to receive your results.
        </h3>
        <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(244,241,235,0.60)", lineHeight: 1.6, marginBottom: "2rem" }}>
          Your report downloads immediately. A copy is sent to your inbox for reference.
        </p>
        <input
          data-testid="gate-email-input"
          type="email" placeholder="your@email.com"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{
            width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,147,63,0.25)",
            color: "#fff", fontFamily: SANS, fontSize: "1rem", padding: "0.875rem 1rem",
            outline: "none", marginBottom: "0.75rem", boxSizing: "border-box",
          }}
        />
        {err && <p style={{ fontFamily: MONO, fontSize: "0.75rem", color: "#e74c3c", marginBottom: "0.75rem" }}>{err}</p>}
        <button
          data-testid="gate-submit-btn"
          onClick={submit} disabled={loading}
          style={{
            width: "100%", background: GOLD, color: "#060D1A", border: "none",
            fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.12em",
            textTransform: "uppercase", padding: "1rem", cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "PROCESSING..." : "GET MY RESULTS →"}
        </button>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.30)", fontFamily: MONO, fontSize: "0.714rem", cursor: "pointer", marginTop: "1.25rem", width: "100%", letterSpacing: "0.1em" }}>
          CANCEL
        </button>
      </div>
    </div>
  );
}

// ── Tool 1: 90-Day Compliance Calendar ────────────────────────────────────────
function CalendarTool({ onExport }) {
  const [date, setDate] = useState("");
  const [generated, setGenerated] = useState(false);

  const tasks = !date ? [] : CALENDAR_TASKS.map(t => {
    const activation = new Date(date + "T00:00:00");
    const taskDate = new Date(activation.getTime() + t.day * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diff = Math.ceil((taskDate - now) / (1000 * 60 * 60 * 24));
    let status = diff > 14 ? "PENDING" : diff >= 0 ? "UPCOMING" : "OVERDUE";
    return { ...t, taskDate, diff, status };
  });

  const catColors = { Authority: "#5B9BD5", Insurance: "#27ae60", "D&A Program": "#9b59b6", "Driver Files": "#e67e22", Maintenance: "#1abc9c", HOS: "#e74c3c" };

  return (
    <div>
      <style>{`
        @media print { .no-print { display: none !important; } .print-only { display: block !important; } body { background: white !important; color: black !important; } }
        .print-only { display: none; }
      `}</style>
      <div className="no-print" style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(200,147,63,0.70)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          LP-TOOL-001 — COMPLIANCE CALENDAR GENERATOR
        </p>
        <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "1rem" }}>
          Enter Your Authority Activation Date
        </h3>
        <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(244,241,235,0.65)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 540 }}>
          Your USDOT / MC number activation date from FMCSA. This generates a personalized 90-day compliance task timeline with status indicators.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            data-testid="calendar-date-input"
            type="date"
            value={date} onChange={e => { setDate(e.target.value); setGenerated(true); }}
            style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,147,63,0.30)",
              color: "#fff", fontFamily: MONO, fontSize: "0.9rem", padding: "0.75rem 1rem",
              colorScheme: "dark", outline: "none",
            }}
          />
          {generated && tasks.length > 0 && (
            <button
              data-testid="calendar-export-btn"
              onClick={onExport}
              style={{
                background: "transparent", border: `1px solid ${GOLD}`, color: GOLD,
                fontFamily: MONO, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "0.75rem 1.75rem", cursor: "pointer",
              }}
            >
              EXPORT PDF →
            </button>
          )}
        </div>
      </div>

      {tasks.length > 0 && (
        <div data-testid="calendar-tasks">
          {/* Status legend */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {[["OVERDUE", "#e74c3c"], ["UPCOMING", GOLD], ["PENDING", "rgba(255,255,255,0.35)"]].map(([s, c]) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                <span style={{ fontFamily: MONO, fontSize: "0.714rem", color: c, letterSpacing: "0.1em" }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {tasks.map((t, i) => (
              <div key={i} data-testid={`calendar-task-${i}`} style={{
                display: "grid", gridTemplateColumns: "80px 1fr auto",
                gap: "1.25rem", alignItems: "start",
                background: "rgba(255,255,255,0.025)",
                border: `1px solid rgba(255,255,255,0.07)`,
                boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
                padding: "1rem 1.25rem",
              }}>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.40)", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>DAY {t.day}</p>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: t.status === "OVERDUE" ? "#e74c3c" : t.status === "UPCOMING" ? GOLD : "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.08em" }}>{t.status}</p>
                </div>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.75rem", color: catColors[t.cat] || GOLD, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{t.cat}</p>
                  <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: "0.95rem", color: "#fff", marginBottom: "0.25rem" }}>{t.title}</p>
                  <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(244,241,235,0.55)", lineHeight: 1.6 }}>{t.desc}</p>
                </div>
                <div style={{ textAlign: "right", minWidth: 90 }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.40)" }}>
                    {t.taskDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                  {t.diff !== 0 && (
                    <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: t.status === "OVERDUE" ? "#e74c3c" : t.status === "UPCOMING" ? GOLD : "rgba(255,255,255,0.25)", marginTop: "0.2rem" }}>
                      {t.diff < 0 ? `${Math.abs(t.diff)}d ago` : `in ${t.diff}d`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tool 2: Compliance Health Check ───────────────────────────────────────────
function GaugeSVG({ score }) {
  const cx = 100, cy = 105, r = 70;
  // Arc from left (NOT READY) → top → right (GO) — sweep-flag=1 draws the TOP semicircle
  const C = Math.PI * r; // semicircle circumference ≈ 219.91
  const d = `M 30 105 A ${r} ${r} 0 0 1 170 105`;

  // Needle — angles measured from the left (180°) sweeping clockwise to right (0°)
  const pct = score / 10;
  const ang = (180 - pct * 180) * Math.PI / 180;
  const nx = cx + r * Math.cos(ang);
  const ny = cy - r * Math.sin(ang);

  const verdictColor = score >= 8 ? "#27ae60" : score >= 6 ? GOLD : "#e74c3c";
  const verdict = score >= 8 ? "GO" : score >= 6 ? "CAUTION" : "NOT READY";

  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox="0 0 200 120" style={{ width: "100%", maxWidth: 320 }}>
        {/* Track background */}
        <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="butt" />
        {/* Red zone: 0–60% (NOT READY) */}
        <path d={d} fill="none" stroke="#e74c3c" strokeWidth="14" strokeLinecap="butt"
          strokeDasharray={`${0.6 * C} ${C}`} strokeDashoffset="0" />
        {/* Gold zone: 60–80% (CAUTION) */}
        <path d={d} fill="none" stroke={GOLD} strokeWidth="14" strokeLinecap="butt"
          strokeDasharray={`${0.2 * C} ${C}`} strokeDashoffset={`${-0.6 * C}`} />
        {/* Green zone: 80–100% (GO) */}
        <path d={d} fill="none" stroke="#27ae60" strokeWidth="14" strokeLinecap="butt"
          strokeDasharray={`${0.2 * C} ${C}`} strokeDashoffset={`${-0.8 * C}`} />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="6" fill={verdictColor} />
        <circle cx={cx} cy={cy} r="3" fill="#fff" />
        {/* Zone labels */}
        <text x="18" y="118" fill="rgba(255,255,255,0.40)" fontFamily="monospace" fontSize="7" textAnchor="start">NOT READY</text>
        <text x="100" y="112" fill="rgba(255,255,255,0.40)" fontFamily="monospace" fontSize="7" textAnchor="middle">CAUTION</text>
        <text x="182" y="118" fill="rgba(255,255,255,0.40)" fontFamily="monospace" fontSize="7" textAnchor="end">GO</text>
      </svg>
      <div style={{
        display: "inline-block", marginTop: "0.75rem",
        padding: "0.5rem 1.75rem",
        border: `1.5px solid ${verdictColor}`,
        boxShadow: `inset 0 1px 4px rgba(0,0,0,0.5), 0 0 20px ${verdictColor}22`,
      }}>
        <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "1.125rem", color: verdictColor, letterSpacing: "0.15em" }}>{verdict}</p>
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.40)", marginTop: "0.25rem" }}>{score}/10 DOMAINS READY</p>
      </div>
    </div>
  );
}

function HealthCheckTool({ onGetPlan, sharedScore }) {
  const [answers, setAnswers] = useState({});
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const score = sharedScore !== undefined ? sharedScore : Object.values(answers).filter(v => v === "yes").length;
  const answered = Object.keys(answers).length;
  const allAnswered = sharedScore !== undefined || answered === HEALTH_QUESTIONS.length;

  const verdictColor = score >= 8 ? "#27ae60" : score >= 6 ? GOLD : "#e74c3c";
  const verdict = score >= 8 ? "GO" : score >= 6 ? "CAUTION" : "NOT READY";

  const shareUrl = `${API}/api/og/health-check?score=${score}`;

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); })
        .catch(() => {
          // Fallback: select the input text
          const el = document.getElementById("share-url-input");
          if (el) { el.select(); document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2500); }
        });
    } else {
      const el = document.getElementById("share-url-input");
      if (el) { el.select(); document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    }
  };

  // Shared view — no questions, just the gauge + CTA
  if (sharedScore !== undefined) {
    return (
      <div>
        {/* Shared result banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          background: `${verdictColor}11`, border: `1px solid ${verdictColor}44`,
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
          padding: "0.875rem 1.25rem", marginBottom: "2.5rem",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: verdictColor, flexShrink: 0 }} />
          <p style={{ fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700, color: verdictColor, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            SHARED COMPLIANCE READINESS RESULT
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(200,147,63,0.70)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              LP-TOOL-002 — COMPLIANCE HEALTH CHECK
            </p>
            <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "1rem" }}>
              This operator scored {score}/10 domains ready.
            </h3>
            <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(244,241,235,0.65)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Verdict: <span style={{ color: verdictColor, fontWeight: 700 }}>{verdict}</span>. Run your own 10-question readiness check below.
            </p>
            <button
              data-testid="shared-take-own-btn"
              onClick={() => window.location.href = "/control-room?tab=health"}
              style={{
                background: GOLD, color: "#060D1A", border: "none",
                fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "1rem 2rem", cursor: "pointer",
              }}
            >
              TAKE YOUR OWN ASSESSMENT →
            </button>
          </div>
          <GaugeSVG score={score} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(200,147,63,0.70)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
        LP-TOOL-002 — COMPLIANCE HEALTH CHECK
      </p>
      <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.75rem" }}>
        Are We Audit-Ready?
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(244,241,235,0.65)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 540 }}>
        10 yes/no questions covering the 6 compliance domains. Answer honestly — this is your readiness signal, not a scorecard.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {HEALTH_QUESTIONS.map((q, i) => (
            <div key={i} data-testid={`health-q-${i}`} style={{
              background: "rgba(255,255,255,0.025)",
              border: `1px solid ${answers[i] === "yes" ? "rgba(39,174,96,0.35)" : answers[i] === "no" ? "rgba(231,76,60,0.35)" : "rgba(255,255,255,0.07)"}`,
              boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
              padding: "1rem 1.25rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{q.domain}</p>
                  <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(244,241,235,0.85)", lineHeight: 1.5 }}>{q.q}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  {["yes", "no"].map(v => (
                    <button
                      key={v}
                      data-testid={`health-q-${i}-${v}`}
                      onClick={() => setAnswers(a => ({ ...a, [i]: v }))}
                      style={{
                        padding: "0.35rem 0.75rem",
                        background: answers[i] === v ? (v === "yes" ? "rgba(39,174,96,0.20)" : "rgba(231,76,60,0.20)") : "transparent",
                        border: `1px solid ${answers[i] === v ? (v === "yes" ? "#27ae60" : "#e74c3c") : "rgba(255,255,255,0.20)"}`,
                        color: answers[i] === v ? (v === "yes" ? "#27ae60" : "#e74c3c") : "rgba(255,255,255,0.50)",
                        fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {v === "yes" ? "YES" : "NO"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "sticky", top: "calc(56px + 1.5rem)" }}>
          <GaugeSVG score={score} />

          {/* Progress note — always visible once started */}
          {!allAnswered && answered > 0 && (
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: "1rem", letterSpacing: "0.08em" }}>
              {HEALTH_QUESTIONS.length - answered} QUESTION{HEALTH_QUESTIONS.length - answered !== 1 ? "S" : ""} REMAINING
            </p>
          )}

          {/* GET PLAN — only after all answered */}
          {allAnswered && (
            <button
              data-testid="health-get-plan-btn"
              onClick={() => {
                const failingDomains = HEALTH_QUESTIONS
                  .filter((_, i) => answers[i] === "no")
                  .map(q => q.domain);
                onGetPlan(score, failingDomains);
              }}
              style={{
                display: "block", width: "100%", marginTop: "1.5rem",
                background: GOLD, color: "#060D1A", border: "none",
                fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "1rem", cursor: "pointer",
              }}
            >
              GET 7-DAY ACTION PLAN →
            </button>
          )}

          {/* SHARE — always visible once at least 1 question answered */}
          {answered > 0 && (
            <>
              <button
                data-testid="health-share-btn"
                onClick={() => setShowShare(s => !s)}
                style={{
                  display: "block", width: "100%", marginTop: allAnswered ? "0.625rem" : "1.5rem",
                  background: showShare ? "rgba(255,255,255,0.05)" : "transparent",
                  border: `1px solid ${showShare ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.20)"}`,
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: MONO, fontWeight: 700, fontSize: "0.8rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "0.875rem", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                SHARE RESULTS {showShare ? "▲" : "▼"}
              </button>

              {showShare && (
                <div data-testid="share-panel" style={{
                  marginTop: "0.5rem", padding: "1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
                }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.675rem", color: "rgba(255,255,255,0.40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                    SHAREABLE LINK — {score}/10 · {verdict}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      id="share-url-input"
                      readOnly
                      value={shareUrl}
                      style={{
                        flex: 1, background: "rgba(0,0,0,0.35)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.60)", fontFamily: MONO,
                        fontSize: "0.675rem", padding: "0.5rem 0.625rem",
                        outline: "none", letterSpacing: "0.02em", minWidth: 0,
                      }}
                      onFocus={e => e.target.select()}
                    />
                    <button
                      data-testid="copy-link-btn"
                      onClick={handleCopyLink}
                      style={{
                        padding: "0.5rem 0.875rem", flexShrink: 0,
                        background: copied ? "rgba(39,174,96,0.15)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${copied ? "#27ae60" : "rgba(255,255,255,0.20)"}`,
                        color: copied ? "#27ae60" : "rgba(255,255,255,0.70)",
                        fontFamily: MONO, fontWeight: 700, fontSize: "0.714rem",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                    >
                      {copied ? "COPIED ✓" : "COPY"}
                    </button>
                  </div>
                  <p style={{ fontFamily: MONO, fontSize: "0.625rem", color: "rgba(255,255,255,0.25)", marginTop: "0.5rem", letterSpacing: "0.04em" }}>
                    This link shows your {score}/10 score and redirects to the live check.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Tool 3: 18-Month Compliance Map ───────────────────────────────────────────
function ComplianceMapTool() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(200,147,63,0.70)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
        LP-TOOL-003 — NEW ENTRANT COMPLIANCE MAP
      </p>
      <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.75rem" }}>
        The 18-Month Window
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(244,241,235,0.65)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 580 }}>
        Every new motor carrier operates within an 18-month New Entrant period. This is the compliance window FMCSA uses to evaluate whether your operation should continue. Click each milestone.
      </p>

      <div style={{ position: "relative" }}>
        {/* Spine line */}
        <div style={{ position: "absolute", left: 55, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, rgba(200,147,63,0.60), rgba(200,147,63,0.10))" }} />

        <div style={{ display: "grid", gap: "0", position: "relative" }}>
          {MAP_MILESTONES.map((m, i) => (
            <div key={i} data-testid={`map-milestone-${i}`} style={{ display: "grid", gridTemplateColumns: "110px 1fr", alignItems: "start" }}>
              {/* Month marker */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0.875rem", paddingRight: "1rem" }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0, zIndex: 2,
                  background: DEEP, border: `2px solid ${m.color}`,
                  boxShadow: `0 0 10px ${m.color}44`,
                }} />
                <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: m.color, letterSpacing: "0.08em", marginTop: "0.4rem", textAlign: "center" }}>{m.label}</p>
              </div>

              {/* Content */}
              <div
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  background: expanded === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${expanded === i ? m.color + "55" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.35)",
                  padding: "1rem 1.25rem",
                  marginBottom: "0.5rem", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: m.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{m.label}</p>
                    <p style={{ fontFamily: SANS, fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>{m.title}</p>
                  </div>
                  <span style={{ fontFamily: MONO, fontSize: "0.857rem", color: "rgba(255,255,255,0.30)", marginLeft: "1rem" }}>{expanded === i ? "−" : "+"}</span>
                </div>
                {expanded === i && (
                  <ul style={{ marginTop: "0.875rem", paddingLeft: "1rem", listStyle: "none" }}>
                    {m.items.map((item, j) => (
                      <li key={j} style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(244,241,235,0.70)", lineHeight: 1.7, display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                        <span style={{ color: m.color, marginTop: "0.35rem", fontSize: "0.6rem", flexShrink: 0 }}>■</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const COMPLIANCE_DOCS_BG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/vpafe5mz_compliance-docs.png";

// ── Tool 4: Folder Architecture Sandbox ───────────────────────────────────────
function FolderSandboxTool() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{
      position: "relative",
      margin: "-3.5rem -2rem -6rem",
      padding: "3.5rem 2rem 6rem",
      background: `linear-gradient(rgba(6,13,26,0.91) 0%, rgba(6,13,26,0.94) 100%), url("${COMPLIANCE_DOCS_BG}") center/cover no-repeat`,
    }}>
      <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(200,147,63,0.70)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
        LP-TOOL-004 — COMPLIANCE FOLDER ARCHITECTURE
      </p>
      <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.75rem" }}>
        The 8-Folder Operating System
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(244,241,235,0.65)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 580 }}>
        Every document your operation produces belongs in one of these 8 folders. Click a folder to see the required documents. This is the minimum viable filing architecture for a FMCSA audit.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
        {FOLDERS.map((f, i) => (
          <div
            key={i}
            data-testid={`folder-${f.id}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              background: expanded === i ? "rgba(200,147,63,0.06)" : "rgba(255,255,255,0.025)",
              border: `1px solid ${expanded === i ? "rgba(200,147,63,0.40)" : "rgba(255,255,255,0.08)"}`,
              boxShadow: expanded === i
                ? `inset 0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(200,147,63,0.08)`
                : "inset 0 1px 4px rgba(0,0,0,0.35)",
              padding: "1.25rem",
              cursor: "pointer", transition: "all 0.2s",
              gridColumn: expanded === i ? "1 / -1" : "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expanded === i ? "1rem" : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Folder icon */}
                <div style={{
                  width: 44, height: 36,
                  background: expanded === i ? "rgba(200,147,63,0.15)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${expanded === i ? "rgba(200,147,63,0.40)" : "rgba(255,255,255,0.12)"}`,
                  borderRadius: "2px 6px 2px 2px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
                }}>
                  <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, color: expanded === i ? GOLD : "rgba(255,255,255,0.40)" }}>{f.icon}</span>
                  {/* Folder tab */}
                  <div style={{
                    position: "absolute", top: -6, left: 0, width: "40%", height: 6,
                    background: expanded === i ? "rgba(200,147,63,0.30)" : "rgba(255,255,255,0.08)",
                    borderRadius: "2px 2px 0 0",
                  }} />
                </div>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(200,147,63,0.60)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{f.code}</p>
                  <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: "0.95rem", color: expanded === i ? "#fff" : "rgba(255,255,255,0.80)" }}>{f.name}</p>
                </div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: "0.857rem", color: "rgba(255,255,255,0.30)" }}>{expanded === i ? "−" : "+"}</span>
            </div>

            {expanded === i && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.5rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(200,147,63,0.15)" }}>
                {f.docs.map((doc, j) => (
                  <div key={j} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
                    padding: "0.625rem 0.875rem",
                    display: "flex", alignItems: "center", gap: "0.625rem",
                  }}>
                    <span style={{ color: GOLD, fontSize: "0.7rem", flexShrink: 0 }}>□</span>
                    <span style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(244,241,235,0.75)", lineHeight: 1.4 }}>{doc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ControlRoomPage ───────────────────────────────────────────────────────
export default function ControlRoomPage() {
  const [activeTool, setActiveTool] = useState("calendar");
  const [gateModal, setGateModal] = useState({ open: false, toolName: "", onSuccess: null });
  const [healthScore, setHealthScore] = useState(null);
  const [sharedScore, setSharedScore] = useState(undefined);
  const toolRef = useRef(null);
  const pathname = usePathname();

  // Read URL params on mount — support shared result links
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    const score = params.get("score");
    if (tab && ["calendar", "health", "map", "folder"].includes(tab)) {
      setActiveTool(tab);
    }
    if (score !== null && !isNaN(parseInt(score))) {
      setSharedScore(Math.max(0, Math.min(10, parseInt(score))));
    }
  }, [location.search]);

  const tools = [
    { id: "calendar", label: "90-Day Calendar",   code: "LP-T-001" },
    { id: "health",   label: "Health Check",       code: "LP-T-002" },
    { id: "map",      label: "18-Month Map",        code: "LP-T-003" },
    { id: "folder",   label: "Folder Sandbox",      code: "LP-T-004" },
  ];

  const openGate = (toolName, onSuccess) => setGateModal({ open: true, toolName, onSuccess });
  const closeGate = () => setGateModal({ open: false, toolName: "", onSuccess: null });

  const handleCalendarExport = () => openGate("90-Day Compliance Calendar", () => window.print());
  const handleHealthPlan = (score, failingDomains) => {
    setHealthScore(score);
    setGateModal({
      open: true,
      toolName: "Compliance Health Check",
      onSuccess: () => window.print(),
      extraData: { score, failing_domains: failingDomains },
    });
  };

  const switchTool = (id) => {
    setActiveTool(id);
    setTimeout(() => toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  return (
    <div style={{ minHeight: "100vh", background: DEEP, paddingTop: 80 }}>
      <style>{`
        @keyframes led-breathe {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 4px ${GOLD}; }
          50%       { opacity: 1.0; box-shadow: 0 0 12px ${GOLD}88; }
        }
        @keyframes scan-line {
          0%   { top: 0%; }
          100% { top: 100%; }
        }
        @media print {
          .no-print { display: none !important; }
          .print-area { display: block !important; }
          body { background: white !important; color: black !important; font-family: 'Inter', sans-serif !important; }
        }
        .tool-tab:hover { border-color: rgba(200,147,63,0.45) !important; color: rgba(244,241,235,0.90) !important; }
      `}</style>

      {/* Hero header */}
      <div style={{ borderBottom: "1px solid rgba(200,147,63,0.20)", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            {/* LED */}
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD, animation: "led-breathe 3s ease-in-out infinite" }} />
            <p data-testid="control-room-id" style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,147,63,0.70)" }}>
              LP-OS-CR-001 — OPERATOR CONTROL ROOM
            </p>
          </div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1.25rem" }}>
            Operator Control Room
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(244,241,235,0.60)", lineHeight: 1.7, maxWidth: 600, marginBottom: "1.5rem" }}>
            Four diagnostic and planning tools for new motor carrier operators. Free to use. Two outputs are gated behind an email — you get instant access, we get the contact.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {[["2 Free Tools", "#27ae60"], ["2 Gated Exports", GOLD]].map(([label, color]) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                border: `1px solid ${color}44`, padding: "0.35rem 0.875rem",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                <span style={{ fontFamily: MONO, fontSize: "0.714rem", color, letterSpacing: "0.08em" }}>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tool selector tabs */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", display: "flex", gap: 0, overflowX: "auto" }}>
          {tools.map(t => (
            <button
              key={t.id}
              data-testid={`tool-tab-${t.id}`}
              className="tool-tab"
              onClick={() => switchTool(t.id)}
              style={{
                background: "none", border: "none", borderBottom: `2px solid ${activeTool === t.id ? GOLD : "transparent"}`,
                padding: "1.25rem 1.5rem 1rem", cursor: "pointer",
                transition: "all 0.15s", whiteSpace: "nowrap",
              }}
            >
              <p style={{ fontFamily: MONO, fontSize: "0.675rem", color: "rgba(255,255,255,0.30)", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>{t.code}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.9rem", fontWeight: 600, color: activeTool === t.id ? "#fff" : "rgba(255,255,255,0.55)" }}>{t.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active tool content */}
      <div ref={toolRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "3.5rem 2rem 6rem" }}>
        {activeTool === "calendar" && <CalendarTool onExport={handleCalendarExport} />}
        {activeTool === "health"   && <HealthCheckTool onGetPlan={handleHealthPlan} sharedScore={sharedScore} />}
        {activeTool === "map"      && <ComplianceMapTool />}
        {activeTool === "folder"   && <FolderSandboxTool />}
      </div>

      {/* Gate modal */}
      <GateModal open={gateModal.open} toolName={gateModal.toolName} onClose={closeGate} onSuccess={gateModal.onSuccess || (() => {})} extraData={gateModal.extraData} />
    </div>
  );
}
