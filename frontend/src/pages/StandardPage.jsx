import React from "react";
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

/* ── Design Tokens ─────────────────────────────────────────────── */
const NAVY    = "#1a3a5c";
const GOLD    = "#C5A059";
const S950    = "#0f172a";
const S900    = "#0A1520";
const S800    = "#111827";
const S700    = "#334155";
const S500    = "#64748b";
const S400    = "#94a3b8";
const S300    = "#cbd5e1";
const RED     = "#ef4444";
const WHITE   = "#ffffff";

const DISPLAY = "'Playfair Display', serif";
const BODY    = "'Inter', sans-serif";
const MONO    = "'JetBrains Mono', 'IBM Plex Mono', monospace";

/* ── Module Data ───────────────────────────────────────────────── */
const MODULES = [
  { code: "LP-MOD-G0", title: "Ground 0 — Orientation Foundation",        type: "FOUNDATION", lessons: "6 lessons",       summary: "The regulatory framework and what the 90-day window means for your authority.", coming: false },
  { code: "LP-MOD-01", title: "Business & Authority Setup",                type: "CORE",       lessons: "8 lessons",       summary: "Make sure every federal filing is active and correct before operations begin.",    coming: false },
  { code: "LP-MOD-02", title: "Driver Qualification System",               type: "CORE",       lessons: "10 lessons",      summary: "Build a complete, CFR-compliant file for every driver before dispatch.",          coming: false },
  { code: "LP-MOD-03", title: "Drug & Alcohol Compliance",                 type: "CORE",       lessons: "8 lessons",       summary: "Get your federal drug testing program set up before your first load.",              coming: false },
  { code: "LP-MOD-04", title: "Hours of Service & Dispatch",               type: "CORE",       lessons: "7 lessons",       summary: "Configure your ELD and build dispatch records that hold under inspection.",         coming: false },
  { code: "LP-MOD-05", title: "Preventive Maintenance & Vehicle Files",    type: "CORE",       lessons: "8 lessons",       summary: "Unit files and maintenance records that prove road-legal status.",                  coming: false },
  { code: "LP-MOD-06", title: "Insurance & Authority Continuity",          type: "CORE",       lessons: "5 lessons",       summary: "Verify insurance filings are actually active — not just assumed filed.",             coming: false },
  { code: "LP-MOD-07", title: "Post-Failure Recovery",                     type: "RECOVERY",   lessons: "Variable",        summary: "45-day correction sequence if you receive a Conditional rating.",                  coming: false },
  { code: "LP-MOD-08", title: "ELD Compliance",                            type: "EXTENSION",  lessons: "COMING COHORT 2", summary: "Extended ELD configuration and compliance audit preparation.",                      coming: true  },
  { code: "LP-MOD-09", title: "Hazmat Decisions",                          type: "EXTENSION",  lessons: "COMING COHORT 2", summary: "Hazmat transportation eligibility, registration, and documentation requirements.",  coming: true  },
];

const TYPE_COLOR = {
  FOUNDATION: GOLD,
  CORE: "rgba(197,160,89,0.7)",
  RECOVERY: "#60a5fa",
  EXTENSION: S500,
};

/* ── Checkpoint Data ───────────────────────────────────────────── */
const CHECKPOINTS = [
  { num: 1, title: "Authority Foundation",          detail: "USDOT/MC verified, insurance confirmed, BOC-3 filed",                          when: "END OF WEEK 1"  },
  { num: 2, title: "Driver Guard Installation",     detail: "DQ Files audit-ready for all active drivers",                                  when: "END OF WEEK 4"  },
  { num: 3, title: "Drug Guard Installation",       detail: "D&A program compliant, consortium enrolled",                                    when: "END OF WEEK 7"  },
  { num: 4, title: "Log & Shop Guard Installation", detail: "ELD registered, maintenance system operational",                                when: "END OF WEEK 11" },
  { num: 5, title: "Integrity Audit",               detail: "Full system verification → Verified Registry ID issued",                        when: "END OF WEEK 13" },
];

/* ── Divider ────────────────────────────────────────────────────── */
function GoldRule() {
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: 0.35, margin: "0 auto", maxWidth: 900 }} />;
}

/* ── Section Label ──────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
      {children}
    </p>
  );
}

/* ── FAQ Data ───────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "What if I don't complete in 90 days?",
    a: "The 90-day window is the implementation target — not a hard cutoff that voids your enrollment. If you're actively working through the system, your Station Custodian will work with you. Extensions are evaluated case-by-case. Carriers who complete Ground 0 and stay current through the first two checkpoints rarely fall behind schedule.",
  },
  {
    q: "Is the phased option the same program?",
    a: "Yes — same curriculum, same Station Custodian verification, same Verified Registry ID upon completion. The only difference is access timing and total cost. Phase 1 unlocks Ground 0 through Module 4. Phase 2 unlocks Modules 5–9 at Day 45. Both paths end at the same place: a fully installed compliance infrastructure and a verified registry credential.",
  },
  {
    q: "What exactly is the Station Custodian?",
    a: "The Station Custodian is Vince Lawrence — the person who built the Standard and manually verifies every enrolled carrier's implementation. Verification is not automated or AI-graded. Vince reviews your documentation at each of the five checkpoints before you advance. It's a structured review process built to catch the gaps that cause conditional ratings.",
  },
];

/* ── FAQ Accordion ──────────────────────────────────────────────── */
function FaqAccordion({ items }) {
  const [open, setOpen] = React.useState(null);
  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{ borderBottom: `1px solid rgba(255,255,255,0.07)` }}
        >
          <button
            data-testid={`faq-toggle-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", textAlign: "left", background: "none", border: "none",
              cursor: "pointer", padding: "1.25rem 0",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
            }}
          >
            <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.9375rem", color: WHITE, lineHeight: 1.5 }}>
              {item.q}
            </span>
            <span style={{ color: GOLD, fontWeight: 700, fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
          </button>
          {open === i && (
            <p style={{ fontFamily: BODY, fontSize: "0.9rem", color: S400, lineHeight: 1.8, paddingBottom: "1.25rem", margin: 0 }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────────── */
export default function StandardPage() {
  return (
    <div style={{ background: S950, minHeight: "100vh", color: WHITE }}>
      <Navbar />

      {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
      <section style={{ background: S950, borderTop: `2px solid ${GOLD}`, paddingTop: "6rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>LP-STD-001 | SYSTEM AUTHORIZATION</SectionLabel>

          <h1 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em", color: WHITE, marginBottom: "0.5rem", lineHeight: 1.15 }}>
            THE LAUNCHPATH STANDARD
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: "1.75rem" }}>
            90-Day Compliance Infrastructure Installation
          </p>
          <p style={{ fontFamily: BODY, fontSize: "1.125rem", color: S400, lineHeight: 1.75, maxWidth: 580, margin: "0 auto 2.5rem", fontStyle: "italic" }}>
            "For carriers who want the system installed correctly the first time, with expert verification at each phase."
          </p>

          <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <Link
              to="/admission"
              data-testid="hero-request-admission-btn"
              style={{ display: "block", width: "100%", boxSizing: "border-box", fontFamily: BODY, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", background: GOLD, color: NAVY, padding: "1rem 2rem", textDecoration: "none", textAlign: "center", borderRadius: 4 }}
            >
              REQUEST ADMISSION →
            </Link>
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: S500, marginTop: "0.625rem", textAlign: "center" }}>
              NO PAYMENT AT THIS STEP
            </p>
          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── SECTION 2: WHAT THE STANDARD IS ─────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", background: S800 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="std-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>

            {/* Problem column */}
            <div>
              <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontVariant: "small-caps", color: S400, marginBottom: "1.25rem" }}>
                WHAT MOST NEW CARRIERS DO
              </p>
              {[
                "Download random forms from the internet",
                "Hope their paperwork is \"good enough\"",
                "Find out what's missing when the auditor arrives",
                "Pay $10,000–$25,000 fixing preventable failures",
              ].map((line) => (
                <div key={line} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ color: RED, fontWeight: 700, fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>✗</span>
                  <span style={{ fontFamily: BODY, fontSize: "0.9375rem", color: WHITE, lineHeight: 1.6 }}>{line}</span>
                </div>
              ))}
            </div>

            {/* Solution column */}
            <div>
              <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontVariant: "small-caps", color: GOLD, marginBottom: "1.25rem" }}>
                WHAT THE STANDARD INSTALLS
              </p>
              {[
                "Audit-ready documentation from Day 1",
                "Four compliance systems mapped to 49 CFR",
                "Four industrial guards protecting your authority",
                "Station Custodian verification at 5 checkpoints",
                "Verified Registry ID credential upon completion",
              ].map((line) => (
                <div key={line} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ color: GOLD, fontWeight: 700, fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontFamily: BODY, fontSize: "0.9375rem", color: WHITE, lineHeight: 1.6 }}>{line}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── SECTION 3: INSTALLATION SEQUENCE ────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", background: S950 }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <SectionLabel>LP-CURR-001 | THE INSTALLATION SEQUENCE</SectionLabel>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: WHITE, marginBottom: "2rem", letterSpacing: "-0.02em" }}>
            What Gets Installed
          </h2>

          {/* Stat bar */}
          <div className="std-stat-bar" style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", marginBottom: "3rem", padding: "1.25rem", background: "rgba(197,160,89,0.06)", border: `1px solid rgba(197,160,89,0.2)`, borderRadius: 8 }}>
            {[["10", "MODULES"], ["72", "LESSONS"], ["17+", "HOURS"], ["84", "DOCUMENTS"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.75rem", color: GOLD, margin: 0, lineHeight: 1 }}>{num}</p>
                <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: S400, margin: "4px 0 0", textTransform: "uppercase" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Module grid */}
          <div className="std-module-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {MODULES.map((mod) => (
              <div
                key={mod.code}
                style={{
                  background: S900,
                  border: `1px solid rgba(197,160,89,0.25)`,
                  borderRadius: 8,
                  padding: 16,
                  opacity: mod.coming ? 0.7 : 1,
                  position: "relative",
                  boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.05)",
                }}
              >
                {/* Asset tag — top right */}
                <div style={{ position: "absolute", top: 8, right: 8, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: TYPE_COLOR[mod.type], background: "rgba(197,160,89,0.08)", border: `1px solid rgba(197,160,89,0.3)`, padding: "2px 8px", borderRadius: 2, display: "inline-block" }}>
                    {mod.type}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.10em", color: "rgba(197,160,89,0.40)", display: "inline-block" }}>
                    {mod.code} · REV. 2026.03
                  </span>
                </div>

                <p style={{ fontFamily: MONO, fontSize: 9, color: S500, letterSpacing: "0.12em", marginBottom: 6, textTransform: "uppercase" }}>{mod.code}</p>
                <p style={{ fontFamily: BODY, fontWeight: 700, fontSize: "0.8rem", color: WHITE, lineHeight: 1.4, marginBottom: 6, paddingRight: 60 }}>{mod.title}</p>
                <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: S400, lineHeight: 1.55, marginBottom: 10 }}>{mod.summary}</p>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.10em", textTransform: "uppercase", color: mod.coming ? S500 : "rgba(197,160,89,0.65)" }}>
                  {mod.lessons}
                </span>
                {!mod.coming && (
                  <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(197,160,89,0.30)", marginTop: 10, borderTop: "1px solid rgba(197,160,89,0.12)", paddingTop: 6 }}>
                    AUTHORITY: 49 CFR § {["387","391","382","395","396","387","395","391","395","396"][MODULES.indexOf(mod)] ?? "391"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── SECTION 4: STATION CUSTODIAN VERIFICATION ───────────── */}
      <section style={{ padding: "5rem 1.5rem", background: S800 }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel>LP-VRF-001 | STATION CUSTODIAN VERIFICATION</SectionLabel>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: WHITE, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            The 5 Verification Checkpoints
          </h2>
          <p style={{ fontFamily: BODY, fontSize: "1rem", color: S400, lineHeight: 1.75, marginBottom: "3rem" }}>
            Your implementation is verified by the Station Custodian at five critical milestones — not auto-graded, not AI-checked.
          </p>

          {/* Checkpoint timeline */}
          <div style={{ position: "relative", paddingLeft: 32 }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 4, top: 8, bottom: 8, width: 1, background: "rgba(197,160,89,0.3)" }} />

            {CHECKPOINTS.map((cp, i) => (
              <div key={cp.num} style={{ position: "relative", marginBottom: i < 4 ? "2.5rem" : 0 }}>
                {/* Pulse dot */}
                <div className="std-cp-dot" style={{ position: "absolute", left: -28, top: 4, width: 10, height: 10, borderRadius: "50%", background: GOLD, boxShadow: `0 0 6px ${GOLD}` }} />

                <div>
                  <p style={{ fontFamily: BODY, fontWeight: 700, fontSize: "0.9375rem", color: WHITE, marginBottom: 4 }}>
                    CHECKPOINT {cp.num} — {cp.title}
                  </p>
                  <p style={{ fontFamily: BODY, fontSize: "0.875rem", color: S400, lineHeight: 1.6, marginBottom: 4 }}>{cp.detail}</p>
                  <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: S500 }}>{cp.when}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <p style={{ fontFamily: BODY, fontSize: "0.9375rem", color: S300, lineHeight: 1.8, fontStyle: "italic", marginTop: "2.5rem", padding: "1.25rem 1.5rem", borderLeft: `2px solid rgba(197,160,89,0.4)` }}>
            "Each checkpoint is manually verified by Vince Lawrence before you proceed. This is not a course you click through — it's a system that gets installed correctly or not at all."
          </p>

          {/* Registry note */}
          <div style={{ marginTop: "2rem", background: "rgba(197,160,89,0.06)", border: `1px solid rgba(197,160,89,0.25)`, borderRadius: 8, padding: "1.25rem 1.5rem" }}>
            <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>LP-VRF REGISTRY</p>
            <p style={{ fontFamily: BODY, fontSize: "0.875rem", color: S400, lineHeight: 1.7 }}>
              Carriers who complete all five checkpoints receive a Verified Registry ID — confirming that the compliance infrastructure was installed under the Standard.
            </p>
          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── SECTION 5: FINANCING ─────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", background: S950 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionLabel>LP-FIN-001 | AUTHORITY PROTECTION FINANCING</SectionLabel>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: WHITE, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
            Choose Your Authorization Path
          </h2>

          <div className="std-finance-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>

            {/* Card A — Single Authorization */}
            <div style={{ position: "relative", paddingTop: "1.75rem" }}>
              {/* Floating badge */}
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, background: S950, border: `1px solid rgba(197,160,89,0.4)`, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>
                  ★ RECOMMENDED
                </span>
              </div>
              <div
                data-testid="card-single-auth"
                style={{ background: S900, border: `2px solid ${GOLD}`, borderRadius: 12, padding: "2rem", boxShadow: `0 0 20px rgba(197,160,89,0.2)` }}
              >
                <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: S400, marginBottom: "1rem" }}>SINGLE AUTHORIZATION</p>
                <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "2.5rem", color: GOLD, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>$2,500</p>
                <p style={{ fontFamily: BODY, fontSize: "0.8125rem", color: S400, marginBottom: "1.75rem" }}>Full system access at enrollment</p>

                {[
                  "Full system access — all modules unlocked Day 1",
                  "90-day implementation window",
                  "Station Custodian verification at all 5 checkpoints",
                  "Verified Registry ID upon Integrity Audit completion",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.625rem", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>●</span>
                    <span style={{ fontFamily: BODY, fontSize: "0.875rem", color: WHITE, lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}

                <Link
                  to="/admission"
                  data-testid="single-auth-cta"
                  style={{ display: "block", textAlign: "center", marginTop: "1.75rem", fontFamily: BODY, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", background: GOLD, color: NAVY, padding: "1rem", textDecoration: "none", borderRadius: 4 }}
                >
                  AUTHORIZE FULL SYSTEM — $2,500 →
                </Link>
                <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.10em", color: S500, textAlign: "center", marginTop: "0.75rem" }}>Save $500 vs. phased authorization</p>
              </div>
            </div>

            {/* Card B — Phased Authorization */}
            <div
              data-testid="card-phased-auth"
              style={{ background: S900, border: `1px solid ${S700}`, borderRadius: 12, padding: "2rem" }}
            >
              <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: S400, marginBottom: "1rem" }}>PHASED AUTHORIZATION</p>
              <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "2.5rem", color: WHITE, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>$1,500 <span style={{ fontSize: "1rem", color: S400 }}>today</span></p>
              <p style={{ fontFamily: BODY, fontSize: "0.8125rem", color: S400, marginBottom: "1.75rem" }}>+ $1,500 at Day 45 · $3,000 total</p>

              {/* Phase 1 */}
              <div style={{ marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>PHASE 1 — $1,500 AT ENROLLMENT</p>
                {["Ground 0 + Modules 1–4 access", "90-day implementation window begins", "Station Custodian verification, Checkpoints 1–3"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: S500, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ fontFamily: BODY, fontSize: "0.8375rem", color: S300, lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Phase 2 */}
              <div style={{ marginBottom: "1.75rem" }}>
                <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: S400, marginBottom: "0.5rem" }}>PHASE 2 — $1,500 AT DAY 45</p>
                {["Modules 5–9 unlocked", "Checkpoints 4–5 verification", "Verified Registry ID upon Integrity Audit"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: S500, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ fontFamily: BODY, fontSize: "0.8375rem", color: S300, lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/admission"
                data-testid="phased-auth-cta"
                style={{ display: "block", textAlign: "center", fontFamily: BODY, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", color: GOLD, border: `1px solid ${GOLD}`, padding: "1rem", textDecoration: "none", borderRadius: 4 }}
              >
                REQUEST PHASED AUTHORIZATION →
              </Link>
              <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.10em", color: S500, textAlign: "center", marginTop: "0.75rem" }}>$500 more than single authorization</p>
            </div>

          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── SECTION 6: FAQ ───────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", background: S800 }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel>LP-STD-FAQ | COMMON QUESTIONS</SectionLabel>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: WHITE, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Before You Apply
          </h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <GoldRule />

      {/* ── SECTION 7: FINAL CTA ─────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", background: S800, textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <SectionLabel>LP-STD-001 | ENROLLMENT</SectionLabel>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: WHITE, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Ready to Install the System?
          </h2>
          <p style={{ fontFamily: BODY, fontSize: "1rem", color: S400, lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Admission is reviewed before enrollment is confirmed. The LaunchPath Standard is limited to 12 carriers per cohort.
          </p>
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <Link
              to="/admission"
              data-testid="footer-request-admission-btn"
              style={{ display: "block", fontFamily: BODY, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", background: GOLD, color: NAVY, padding: "1.125rem 2rem", textDecoration: "none", textAlign: "center", borderRadius: 4 }}
            >
              REQUEST ADMISSION →
            </Link>
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: S500, marginTop: "0.625rem" }}>
              NO PAYMENT AT THIS STEP · FIRST COHORT · 10 CARRIERS MAX
            </p>
          </div>
        </div>
      </section>

      <FooterSection />

      {/* ── Responsive Styles ────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes std-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #C5A059; }
          50%       { opacity: 0.45; box-shadow: 0 0 2px #C5A059; }
        }
        .std-cp-dot { animation: std-pulse 2.2s ease-in-out infinite; }

        @media (max-width: 768px) {
          .std-two-col    { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .std-module-grid { grid-template-columns: 1fr 1fr !important; }
          .std-finance-grid { grid-template-columns: 1fr !important; }
          .std-stat-bar   { gap: 1.25rem !important; }
        }
        @media (max-width: 480px) {
          .std-module-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}
