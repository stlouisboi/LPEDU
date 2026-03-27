/**
 * ComplianceLibraryPage.jsx
 * LP-SYS-LIBRARY — Complete Operating Standards Library
 * Implements LP-SYS-LIBRARY-COPY v1.0 (all 8 sections)
 */

import { useState, useCallback } from "react";
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import useSEO from "../hooks/useSEO";
import MCAuditWindow from "../components/MCAuditWindow";
import { THUMBS, BUNDLE_CONFIGS, CFR_REF, PRODUCTS, ACCORDION_GROUPS } from "../data/libraryData";

const API = process.env.REACT_APP_BACKEND_URL;

// ── Design tokens ──────────────────────────────────────────────────────────
const NAVY  = "#060d19";
const NAVY2 = "#0b1628";
const NAVY3 = "#00213F";
const GOLD  = "#d4900a";
const BORDER = "rgba(255,255,255,0.08)";
const SANS  = "'Inter', sans-serif";
const MONO  = "'IBM Plex Mono', 'Courier New', monospace";
const COND  = "'Barlow Condensed', 'Inter', sans-serif";


// ── Checkout hook ────────────────────────────────────────────────────────────
function useBuy() {
  const [states, setStates] = useState({});
  const [errors, setErrors]  = useState({});
  const buy = useCallback(async (sku) => {
    setStates(s => ({ ...s, [sku]: "loading" }));
    setErrors(e => ({ ...e, [sku]: null }));
    try {
      const res = await fetch(`${API}/api/products/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_sku: sku, origin_url: window.location.origin }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error();
    } catch {
      setStates(s => ({ ...s, [sku]: "idle" }));
      setErrors(e => ({ ...e, [sku]: "Could not start checkout. Please try again." }));
    }
  }, []);
  return { states, errors, buy };
}

// ── Accordion components ──────────────────────────────────────────────────────

function AccordionProductRow({ p, onBuy, loading, error, isBundle }) {
  const [expanded, setExpanded] = useState(false);
  const isLoading = loading === "loading";
  const bc = BUNDLE_CONFIGS[p.sku];
  return (
    <div style={{ ...(isBundle ? { border: `2px solid #A8B2BE`, borderRadius: 8, padding: "1.25rem 1.5rem", boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.05)", background: NAVY2 } : { borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem", marginBottom: "1rem", background: "#080E18", borderRadius: 6, padding: "1rem 1.25rem", boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.05)" }) }}>
      {isBundle && bc && (
        <div style={{ textAlign: "center", marginBottom: "0.875rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "#0D1B2A", color: "#A8B2BE", border: "1px solid #A8B2BE44", display: "inline-block", fontWeight: 700 }}>{bc.badge}</span>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", justifyContent: "space-between" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
            <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "1.1rem", color: "#fff", margin: 0, lineHeight: 1.3 }}>{p.name}</h3>
            <span style={{ fontFamily: MONO, fontSize: "0.667rem", color: "rgba(212,144,10,0.50)", letterSpacing: "0.12em", flexShrink: 0 }}>{p.sku}</span>
          </div>
          <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.60)", margin: 0, lineHeight: 1.65 }}>{p.outcome}</p>
          {p.savings && <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.70)", marginTop: "0.375rem", margin: "0.375rem 0 0" }}>{p.savings}</p>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: "1.35rem", color: "#fff", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{p.price}</span>
          <button
            data-testid={`buy-btn-${p.sku.toLowerCase()}`}
            onClick={() => onBuy(p.sku)}
            disabled={isLoading}
            style={{
              fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.06em",
              background: isLoading ? "rgba(212,144,10,0.45)" : GOLD, color: NAVY,
              border: "none", padding: "0.625rem 1.125rem",
              cursor: isLoading ? "not-allowed" : "pointer", whiteSpace: "nowrap", transition: "background 0.15s",
            }}
            onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = "#e8a520"; }}
            onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = GOLD; }}
          >{isLoading ? "…" : "ADD TO SYSTEM →"}</button>
        </div>
      </div>
      {p.inside?.length > 0 && (
        <button onClick={() => setExpanded(v => !v)} style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", background: "transparent", border: "none", padding: "0.75rem 0 0", cursor: "pointer", display: "block" }}>
          {expanded ? "HIDE CONTENTS ▲" : "WHAT'S INSIDE ▼"}
        </button>
      )}
      {expanded && (
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", paddingTop: "0.75rem" }}>
          <div style={{ flex: 1 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {p.inside.map((item, i) => (
                <li key={i} style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.65)", paddingLeft: "1rem", position: "relative", lineHeight: 1.65 }}>
                  <span style={{ position: "absolute", left: 0, color: GOLD }}>·</span>{item}
                </li>
              ))}
            </ul>
            {CFR_REF[p.sku] && (
              <p className="authority-line" style={{ marginTop: "0.75rem", borderTop: "1px solid rgba(197,160,89,0.12)", paddingTop: "0.5rem" }}>
                AUTHORITY: {CFR_REF[p.sku]}
              </p>
            )}
          </div>
          {p.coverImg && (
            <img
              src={p.coverImg}
              alt={p.name}
              style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(212,160,23,0.25)", flexShrink: 0, background: "#080E18" }}
            />
          )}
        </div>
      )}
      {error && <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "#ef4444", marginTop: "0.5rem" }}>{error}</p>}
    </div>
  );
}

function AccordionGroup({ group, isOpen, onToggle, products, onBuy, states, errors }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        onClick={onToggle}
        style={{
          background: "#0D1B2A",
          border: `1px solid rgba(212,160,23,${isOpen ? "0.5" : "0.2"})`,
          borderRadius: isOpen ? "6px 6px 0 0" : "6px",
          padding: "20px 24px", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "border-color 0.2s",
          minHeight: 64,
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.borderColor = "rgba(212,160,23,0.35)"; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.borderColor = "rgba(212,160,23,0.2)"; }}
      >
        <div>
          <p style={{ fontFamily: MONO, fontSize: "15px", letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, margin: 0, fontWeight: 700 }}>{group.label}</p>
          <p style={{ fontFamily: SANS, fontSize: "15px", color: "rgba(255,255,255,0.70)", margin: "6px 0 0", lineHeight: 1.5 }}>{group.subtitle}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0, marginLeft: "1.5rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "13px", letterSpacing: "0.08em", color: "rgba(212,160,23,0.80)", whiteSpace: "nowrap" }}>
            {group.assets} · {group.priceRange}
          </span>
          <span style={{ color: GOLD, fontSize: "0.85rem", display: "inline-block", transition: "transform 0.2s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", userSelect: "none" }}>▼</span>
        </div>
      </div>
      {isOpen && (
        <div style={{ border: "1px solid rgba(212,160,23,0.3)", borderTop: "none", borderRadius: "0 0 6px 6px", padding: "20px", background: "#0A1520" }}>
          {products.map(p => (
            <AccordionProductRow key={p.sku} p={p} onBuy={onBuy} loading={states[p.sku]} error={errors[p.sku]} isBundle={group.isBundle} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Library Email Capture ─────────────────────────────────────────────────────
function LibraryEmailCapture({ API, GOLD, NAVY, SANS, MONO, COND }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const r = await fetch(`${API}/api/library/email-capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(r.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section
      data-testid="library-email-capture"
      style={{ background: "#00213F", borderTop: "1px solid rgba(197,160,89,0.12)", borderBottom: "1px solid rgba(197,160,89,0.12)", padding: "3.5rem 1.5rem" }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
          {/* Copy */}
          <div style={{ flex: "1 1 300px" }}>
            <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.55)", marginBottom: "0.5rem" }}>
              LP-LEAD-001 | NOT READY TO BUY?
            </p>
            <h3 style={{ fontFamily: COND, fontWeight: 800, fontSize: "1.375rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Get the 16 Deadly Sins Checklist — Free
            </h3>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              The 16 most common FMCSA violations that end new carrier authority. Identify your exposure in 10 minutes.
            </p>
          </div>

          {/* Form */}
          <div style={{ flex: "1 1 280px" }}>
            {state === "done" ? (
              <div
                data-testid="email-capture-success"
                style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.30)", borderRadius: 6, padding: "1.25rem 1.5rem" }}
              >
                <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4ade80", marginBottom: 4 }}>CONFIRMED</p>
                <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.65 }}>
                  Checklist is on its way to your inbox. Check your spam folder if you don't see it within 5 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.55)", marginBottom: 6 }}>
                  YOUR EMAIL ADDRESS
                </p>
                <div style={{ display: "flex", gap: 0 }}>
                  <input
                    data-testid="library-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carrier@company.com"
                    style={{
                      flex: 1, background: "#001020", border: "1px solid rgba(197,160,89,0.30)",
                      borderRight: "none", borderRadius: 0, color: "#fff",
                      fontFamily: SANS, fontSize: "0.875rem", padding: "0.75rem 1rem",
                      outline: "none",
                    }}
                  />
                  <button
                    data-testid="library-email-submit"
                    type="submit"
                    disabled={state === "loading"}
                    style={{
                      background: GOLD, color: "#001830", border: "none",
                      fontFamily: SANS, fontWeight: 700, fontSize: "0.75rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "0.75rem 1.125rem", cursor: "pointer", flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {state === "loading" ? "SENDING…" : "SEND ME THE CHECKLIST →"}
                  </button>
                </div>
                {state === "error" && (
                  <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: "#ef4444", marginTop: 6 }}>
                    Something went wrong. Try again.
                  </p>
                )}
                <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.10em", color: "rgba(255,255,255,0.20)", marginTop: 8 }}>
                  NO SPAM. ONE EMAIL. UNSUBSCRIBE ANYTIME.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ComplianceLibraryPage() {
  useSEO({
    title: "Operating Standards Library",
    description: "Every document, system, and guided implementation LaunchPath produces — organized by compliance domain and deployment path.",
  });

  const { states, errors, buy } = useBuy();
  const [openGroup, setOpenGroup] = useState(null);
  const toggleGroup = (id) => setOpenGroup(g => g === id ? null : id);

  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {/* ── SECTION 1: PAGE HERO ─────────────────────────────────────── */}
      <section data-testid="library-hero" style={{ background: NAVY2, borderBottom: `3px solid ${GOLD}`, padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "1.5rem" }}>
            LP-SYS-LIBRARY | OPERATING STANDARDS LIBRARY
          </p>
          <h1 style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(2.25rem, 5vw, 4rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
            The LaunchPath Operating Standards Library
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "1.2rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: 640 }}>
            Every document, system, and guided implementation LaunchPath produces — organized by compliance domain and deployment path.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.8, maxWidth: 700 }}>
            New motor carriers fail audits not because they lack ambition but because no one helped them build a compliant operating structure before FMCSA arrived to check. This library exists to fix that. Choose the path that fits where you are.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: TWO-PATH DECISION BAND ───────────────────────── */}
      <section data-testid="two-path-band" style={{ background: NAVY3, borderBottom: `1px solid ${BORDER}`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.875rem" }}>
              TWO PATHS. ONE STANDARD.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>
              The difference is not the documents. It is whether someone with 25 years in compliance is watching to make sure they are installed correctly.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "1.5rem", alignItems: "start" }} className="two-path-grid">
            {/* PATH 1 — Flagship */}
            <div style={{ background: "#060d19", border: `2px solid ${GOLD}`, padding: "2.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.75rem" }}>
                LP-STD-001 | GUIDED IMPLEMENTATION
              </p>
              <h2 style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                The LaunchPath Standard
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                Guided 90-day installation with verification at every checkpoint.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                This is the complete compliance operating standard, built with you over 90 days. You don't receive documents and figure it out. You receive a structured implementation, five verification checkpoints, direct access throughout the window, and an audit-readiness confirmation when the 90 days are complete.
              </p>
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "0.75rem" }}>
                  WHAT'S INCLUDED
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {[
                    "All five domain compliance packets",
                    "Unified folder architecture and implementation calendar",
                    "Full video curriculum — 17+ hours",
                    "Five Station Custodian verification checkpoints",
                    "Direct Q&A access throughout the 90-day window",
                    "Audit-readiness confirmation at completion",
                  ].map((item, i) => (
                    <li key={i} style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, paddingLeft: "1rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: GOLD }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem", marginBottom: "1.75rem" }}>
                <p style={{ fontFamily: SANS, fontWeight: 800, fontSize: "1.75rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>$2,500</p>
                <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>One engagement. No subscription. No upsells.</p>
                <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "0.375rem" }}>
                  Ground 0 completion required before access is granted. Ground 0 is free.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/reach-diagnostic" data-testid="begin-ground0-btn" style={{ display: "inline-block", background: GOLD, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                  onMouseLeave={e => e.currentTarget.style.background = GOLD}
                >
                  BEGIN GROUND 0 →
                </Link>
                <Link to="/standard" style={{ display: "inline-block", background: "transparent", color: "rgba(212,144,10,0.80)", fontFamily: SANS, fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "1rem 1.5rem", textDecoration: "none", border: "1px solid rgba(212,144,10,0.30)", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.70)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.30)"}
                >
                  VIEW FULL ENGAGEMENT DETAILS →
                </Link>
              </div>
            </div>

            {/* PATH 2 — Bundle */}
            <div id="bundle" style={{ background: NAVY2, border: `1px solid rgba(212,144,10,0.25)`, padding: "2rem", scrollMarginTop: "80px" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.75rem" }}>
                LP-BDL-001 | SELF-INSTALLATION
              </p>
              <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.75rem", color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                Document System Bundle
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.40)", fontStyle: "italic", marginBottom: "1.25rem" }}>
                The complete document system. You install it yourself.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Five domain packets, a unified folder structure, a 0–30–60–90 day implementation calendar, and a master compliance checklist — everything required to build an audit-ready operation if you know what you are doing or are prepared to learn.
              </p>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.45)", marginBottom: "0.625rem" }}>
                  WHAT'S INCLUDED
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {[
                    "New Entrant Compliance Packet",
                    "Drug & Alcohol Compliance Packet",
                    "HOS & Dispatch Compliance Packet",
                    "Maintenance & Unit File Packet",
                    "Insurance & Authority Packet",
                    "Unified Folder Architecture",
                    "0–30–60–90 Day Implementation Calendar",
                    "Master Compliance Checklist",
                  ].map((item, i) => (
                    <li key={i} style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6, paddingLeft: "1rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: GOLD }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: SANS, fontWeight: 800, fontSize: "1.5rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>$499</p>
                <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.35)" }}>Instant access. One-time. $176 below individual acquisition cost.</p>
                <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.30)", marginTop: "0.75rem", lineHeight: 1.7, borderLeft: `2px solid rgba(212,144,10,0.30)`, paddingLeft: "0.75rem" }}>
                  A New Entrant Safety Audit can result in a Conditional or Unsatisfactory rating within your first 18 months. Average remediation cost: $10,000–$25,000. This system costs $499.
                </p>
              </div>
              <button
                data-testid="buy-bundle-btn"
                onClick={() => buy("LP-BDL-001")}
                disabled={states["LP-BDL-001"] === "loading"}
                style={{ width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", background: GOLD, color: NAVY, border: "none", padding: "1rem", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                onMouseLeave={e => e.currentTarget.style.background = GOLD}
              >
                {states["LP-BDL-001"] === "loading" ? "Processing…" : "INSTALL THE BUNDLE — $499 →"}
              </button>
              {errors["LP-BDL-001"] && <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "#ef4444", marginTop: "0.5rem" }}>{errors["LP-BDL-001"]}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2b: OTHER BUNDLE OPTIONS ────────────────────────── */}
      <section style={{ background: NAVY, borderBottom: `1px solid ${BORDER}`, padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.40)", margin: 0 }}>
              ALSO AVAILABLE
            </p>
            <div style={{ flex: 1, height: 1, background: BORDER }} />
          </div>
          {/* $219 Starter Stack */}
          {(() => { const p = PRODUCTS.find(x => x.sku === "LP-RES-006"); const bc = BUNDLE_CONFIGS["LP-RES-006"]; return (
            <div style={{ border: `${bc.borderWidth} solid ${bc.borderColor}`, borderRadius: 8, overflow: "hidden", padding: "1.25rem 1.5rem", maxWidth: 540 }}>
              <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "#0D1B2A", color: bc.badgeColor, border: `1px solid ${bc.badgeColor}44`, display: "inline-block", fontWeight: 700, marginBottom: "0.75rem" }}>{bc.badge}</span>
              <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.15rem", color: "#fff", letterSpacing: "-0.01em", margin: "0 0 0.375rem" }}>{p.name}</h3>
              <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>{p.outcome}</p>
              {p.savings && <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.10em", color: "rgba(212,144,10,0.65)", margin: "0 0 0.875rem" }}>{p.savings}</p>}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.02em" }}>{p.price}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <a href="/standards/starter-stack" style={{ fontFamily: SANS, fontSize: "0.714rem", color: "rgba(212,144,10,0.65)", textDecoration: "none", letterSpacing: "0.06em" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(212,144,10,1)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(212,144,10,0.65)"}>
                    What's Inside →
                  </a>
                  <button data-testid={`buy-btn-${p.sku.toLowerCase()}`} onClick={() => buy(p.sku)} style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.08em", background: GOLD, color: NAVY, border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>{p.primaryCta}</button>
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* ── BUNDLE FAQ ───────────────────────────────────────────────── */}
      <section style={{ background: "#040a14", borderBottom: `1px solid ${BORDER}`, padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1.75rem" }}>COMMON QUESTIONS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              {
                q: "Why is the $499 Document System less expensive than the $699 Complete Library?",
                a: "Different products, different purpose. The $499 bundle includes the implementation architecture — the folder map, the 0–90 day calendar, and the master checklist — that tells you what to do and when. The $699 library is the complete document collection without the installation structure. Most carriers need the system, not just the documents.",
              },
              {
                q: "Can I upgrade from the $499 bundle to the $2,500 Standard later?",
                a: "Yes. Bundle purchasers may apply their purchase toward Standard enrollment within 90 days.",
              },
              {
                q: "What if I already have some documents in place?",
                a: "The Ground 0 module (free) identifies what's already installed and what's missing. You don't rebuild what works — you close the gaps.",
              },
            ].map((item, i, arr) => (
              <div key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none", padding: "1.5rem 0" }}>
                <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.952rem", color: "#fff", lineHeight: 1.5, marginBottom: "0.625rem" }}>Q: {item.q}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0, paddingLeft: "1.25rem", borderLeft: `2px solid rgba(212,144,10,0.25)` }}>A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ROUTING BAND ──────────────────────────────────── */}
      <section data-testid="routing-band" style={{ background: "#040a14", borderBottom: `1px solid ${BORDER}`, padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.75rem", textAlign: "center" }}>
            NOT SURE WHICH PATH FITS YOUR OPERATION?
          </p>
          <div style={{ border: `1px solid ${BORDER}`, overflow: "hidden", marginBottom: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "rgba(212,144,10,0.06)", borderBottom: `1px solid ${BORDER}`, padding: "0.75rem 1.25rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", margin: 0 }}>YOUR SITUATION</p>
              <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", margin: 0 }}>RECOMMENDED PATH</p>
            </div>
            {[
              ["Just activated authority, unsure of your exposure", "Start with the free REACH Diagnostic"],
              ["Know your gaps, confident in self-installation", "Document System Bundle — $499"],
              ["Want every domain covered in one pass", "Complete Library — $699"],
              ["Want it built, verified, and confirmed audit-ready", "LaunchPath Standard — $2,500"],
            ].map(([situation, path], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "1rem 1.25rem", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6, paddingRight: "1rem" }}>{situation}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.857rem", fontWeight: 600, color: "rgba(212,144,10,0.85)", margin: 0, lineHeight: 1.6 }}>{path}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/reach-diagnostic" data-testid="routing-reach-cta" style={{ display: "inline-block", background: GOLD, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", padding: "1rem 2.5rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >
              TAKE THE REACH DIAGNOSTIC — FREE →
            </Link>
            <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.30)", marginTop: "0.875rem" }}>
              4–6 minutes. 16 questions. You'll know exactly where your exposure is before you spend a dollar.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4a: MC AUDIT WINDOW CALCULATOR ───────────────────── */}
      <section style={{ background: "#001428", padding: "4rem 1.5rem", borderTop: `1px solid rgba(197,160,89,0.12)` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <MCAuditWindow />
        </div>
      </section>

      {/* ── SECTION 4b: EMAIL CAPTURE ────────────────────────────────────── */}
      <LibraryEmailCapture API={API} GOLD={GOLD} NAVY={NAVY} SANS={SANS} MONO={MONO} COND={COND} />

      {/* ── SECTION 4: INDIVIDUAL ASSETS ACCORDION ──────────────────── */}
      <section id="component-library" style={{ background: NAVY, padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Section header */}
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.5rem", color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.625rem" }}>
            INSTALL BY DOMAIN
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 680, marginBottom: "0.25rem" }}>
            Know exactly which domain needs attention?
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 680, marginBottom: "0.25rem" }}>
            Each packet below covers one compliance area completely — authority, drivers, drug &amp; alcohol, HOS, maintenance, or insurance.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 680, marginBottom: "1.5rem" }}>
            Select your domain. Install it. Move to the next.
          </p>
          <a href="#bundle" style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, textDecoration: "none", display: "inline-block", marginBottom: "2.5rem", border: "1px solid rgba(212,144,10,0.40)", padding: "0.5rem 1.125rem" }}>
            NEED THE FULL SYSTEM? THE $499 BUNDLE COVERS ALL FIVE. →
          </a>

          {/* Accordion groups */}
          {ACCORDION_GROUPS.map(group => {
            const groupProducts = PRODUCTS.filter(p => group.skus.includes(p.sku));
            return (
              <AccordionGroup
                key={group.id}
                group={group}
                isOpen={openGroup === group.id}
                onToggle={() => toggleGroup(group.id)}
                products={groupProducts}
                onBuy={buy}
                states={states}
                errors={errors}
              />
            );
          })}

          {/* Bottom bundle reminder */}
          <div style={{ marginTop: "2.5rem", textAlign: "center", padding: "2rem 1.5rem", borderTop: `1px solid rgba(212,160,23,0.20)`, borderBottom: `1px solid rgba(212,160,23,0.20)` }}>
            <div style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(212,160,23,0.30)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>BUYING MULTIPLE DOMAINS?</p>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.75, maxWidth: 500, margin: "0 auto 1.25rem" }}>
              The Document System Bundle includes all five compliance packets plus the folder architecture, implementation calendar, and master checklist — at $176 below individual acquisition cost.
            </p>
            <a href="#bundle" style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, textDecoration: "none" }}>
              BUILD THE FULL SYSTEM — $499 →
            </a>
            <div style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(212,160,23,0.30)", letterSpacing: "0.15em", marginTop: "1.25rem" }}>
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 6: COMPARISON MATRIX ────────────────────────────── */}
      <section data-testid="comparison-matrix" style={{ background: NAVY3, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1rem" }}>
            LP-DOC-002 | HOW THE FOUR PATHS COMPARE
          </p>

          {/* Desktop table */}
          <div className="comparison-table" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SANS }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${GOLD}` }}>
                  <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", background: "rgba(212,144,10,0.06)" }}></th>
                  {[
                    { label: "Individual Resources & Packets", sub: "$59–$169", highlight: false },
                    { label: "Complete LaunchPath Library", sub: "$699", highlight: false },
                    { label: "Document System Bundle", sub: "$499", highlight: true },
                    { label: "LaunchPath Standard", sub: "$2,500", highlight: false },
                  ].map(({ label, sub, highlight }) => (
                    <th key={label} style={{
                      textAlign: "center", padding: "0.75rem 1rem", fontFamily: SANS, fontSize: "0.875rem", fontWeight: 700,
                      color: highlight ? GOLD : "#fff",
                      background: highlight ? "rgba(212,144,10,0.10)" : "rgba(212,144,10,0.06)",
                      border: highlight ? `2px solid ${GOLD}` : undefined,
                      borderBottom: highlight ? `2px solid ${GOLD}` : undefined,
                    }}>
                      <div>{label}</div>
                      <div style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700, marginTop: 2, color: highlight ? GOLD : "rgba(255,255,255,0.45)" }}>{sub}</div>
                      {highlight && <div style={{ fontFamily: MONO, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginTop: 4, opacity: 0.8 }}>RECOMMENDED</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Domain compliance packets",          "1 per purchase",       "All 8 documents",      "All 5",   "All 5"],
                  ["Folder architecture / structure",    "—",                    "—",                    "✓",       "✓"],
                  ["0–30–60–90 Implementation calendar", "—",                    "—",                    "✓",       "✓"],
                  ["Master compliance checklist",        "—",                    "—",                    "✓",       "✓"],
                  ["Video curriculum (17+ hrs)",         "—",                    "—",                    "—",       "✓"],
                  ["Verification checkpoints (×5)",      "—",                    "—",                    "—",       "✓"],
                  ["Direct Q&A access (90-day window)",  "—",                    "—",                    "—",       "✓"],
                  ["Audit-readiness confirmation",       "—",                    "—",                    "—",       "✓"],
                  ["Entry requirement",                  "None — self-directed", "None — self-directed", "None — self-directed", "Ground 0 completion required"],
                  ["Price",                              "$59–$169 each",        "$699",                 "$499",    "$2,500"],
                ].map(([label, col1, col2, col3, col4], i) => (
                  <tr key={label} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.60)", fontWeight: 600 }}>{label}</td>
                    {[col1, col2, col3, col4].map((val, ci) => (
                      <td key={ci} style={{
                        padding: "0.875rem 1rem", textAlign: "center", fontFamily: SANS, fontSize: "0.875rem",
                        color: val === "✓" ? "#4ade80" : val === "—" ? "rgba(255,255,255,0.20)" : "#fff",
                        fontWeight: val === "✓" ? 700 : 400,
                        background: ci === 2 ? "rgba(212,144,10,0.04)" : undefined,
                        borderLeft: ci === 2 ? `1px solid rgba(212,144,10,0.20)` : undefined,
                        borderRight: ci === 2 ? `1px solid rgba(212,144,10,0.20)` : undefined,
                      }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked comparison cards */}
          <div className="comparison-cards">
            {[
              {
                title: "INDIVIDUAL ASSETS", price: "$59–$169 each", recommended: false,
                rows: [
                  ["Domain compliance packets", "1 per purchase"],
                  ["Folder architecture", "—"], ["Implementation calendar", "—"],
                  ["Master checklist", "—"], ["Video curriculum", "—"],
                  ["Verification checkpoints", "—"], ["Q&A access", "—"],
                  ["Audit-readiness confirmation", "—"], ["Entry requirement", "None"],
                ],
                cta: null,
              },
              {
                title: "COMPLETE DIY LIBRARY", price: "$699", recommended: false,
                rows: [
                  ["Domain compliance packets", "All 8 documents"],
                  ["Folder architecture", "—"], ["Implementation calendar", "—"],
                  ["Master checklist", "—"], ["Video curriculum", "—"],
                  ["Verification checkpoints", "—"], ["Q&A access", "—"],
                  ["Audit-readiness confirmation", "—"], ["Entry requirement", "None"],
                ],
                cta: null,
              },
              {
                title: "DOCUMENT SYSTEM BUNDLE", price: "$499", recommended: true,
                rows: [
                  ["Domain compliance packets", "All 5"],
                  ["Folder architecture", "✓"], ["Implementation calendar", "✓"],
                  ["Master checklist", "✓"], ["Video curriculum", "—"],
                  ["Verification checkpoints", "—"], ["Q&A access", "—"],
                  ["Audit-readiness confirmation", "—"], ["Entry requirement", "None"],
                ],
                cta: { label: "INSTALL THE BUNDLE — $499 →", sku: "LP-BDL-001" },
              },
              {
                title: "LAUNCHPATH STANDARD", price: "$2,500", recommended: false,
                rows: [
                  ["Domain compliance packets", "All 5"],
                  ["Folder architecture", "✓"], ["Implementation calendar", "✓"],
                  ["Master checklist", "✓"], ["Video curriculum", "✓ (17+ hrs)"],
                  ["Verification checkpoints", "✓ (×5)"], ["Q&A access", "✓ (90-day)"],
                  ["Audit-readiness confirmation", "✓"], ["Entry requirement", "Ground 0 required"],
                ],
                cta: { label: "REQUEST ADMISSION →", href: "/admission" },
              },
            ].map((card) => (
              <div key={card.title} style={{
                background: "#0A1520",
                border: card.recommended ? `2px solid ${GOLD}` : `1px solid rgba(212,144,10,0.20)`,
                boxShadow: card.recommended ? `0 0 16px rgba(212,144,10,0.25)` : "none",
                borderRadius: 8, padding: 20, marginBottom: 12,
              }}>
                {card.recommended && (
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, background: "rgba(212,144,10,0.12)", border: `1px solid rgba(212,144,10,0.35)`, padding: "3px 10px", borderRadius: 20 }}>RECOMMENDED</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", color: card.recommended ? GOLD : "#fff", margin: 0, lineHeight: 1.3 }}>{card.title}</p>
                  <p style={{ fontFamily: MONO, fontSize: "0.875rem", fontWeight: 700, color: card.recommended ? GOLD : "rgba(255,255,255,0.70)", margin: 0, flexShrink: 0, marginLeft: 8 }}>{card.price}</p>
                </div>
                {card.rows.map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                    <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.50)" }}>{label}</span>
                    <span style={{ fontFamily: SANS, fontSize: "0.762rem", fontWeight: val === "✓" || val.startsWith("✓") ? 700 : 400, color: val === "✓" || val.startsWith("✓") ? "#4ade80" : val === "—" ? "rgba(255,255,255,0.20)" : "#fff", marginLeft: 8, textAlign: "right" }}>{val}</span>
                  </div>
                ))}
                {card.cta && (
                  <div style={{ marginTop: 16 }}>
                    {card.cta.sku ? (
                      <button
                        data-testid={`mobile-compare-buy-${card.cta.sku.toLowerCase()}`}
                        onClick={() => buy(card.cta.sku)}
                        disabled={states[card.cta.sku] === "loading"}
                        style={{ width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", background: GOLD, color: NAVY, border: "none", padding: "0.875rem", cursor: "pointer" }}
                      >
                        {states[card.cta.sku] === "loading" ? "Processing…" : card.cta.label}
                      </button>
                    ) : (
                      <Link to={card.cta.href} style={{ display: "block", width: "100%", boxSizing: "border-box", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", color: GOLD, border: `1px solid rgba(212,144,10,0.45)`, padding: "0.875rem", textDecoration: "none", textAlign: "center" }}>
                        {card.cta.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: VINCE AUTHORITY BLOCK ────────────────────────── */}
      <section data-testid="vince-authority-block" style={{ background: NAVY2, borderBottom: `1px solid ${BORDER}`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.45)", marginBottom: "2rem" }}>
            LP-DOC-003 | STATION CUSTODIAN
          </p>
          <div style={{ width: 40, height: 3, background: GOLD, margin: "0 auto 2rem" }} />
          <blockquote style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, fontStyle: "italic", margin: "0 0 2rem", padding: 0 }}>
            "Most carriers don't fail their audit because they lacked a form. They fail because no one installed the forms in the right order, at the right time, with the right verification in place."
          </blockquote>
          <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.952rem", color: "#fff", marginBottom: "0.25rem" }}>Vince Lawrence</p>
          <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.6 }}>
            Station Custodian, LaunchPath Transportation EDU<br />
            25 years in safety management, OSHA certification, and compliance operations.
          </p>
        </div>
      </section>

      {/* ── SECTION 8: FOOTER CTA ────────────────────────────────────── */}
      <section data-testid="library-footer-cta" style={{ background: "#040a14", borderBottom: `1px solid ${BORDER}`, padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1.25rem" }}>
            LPOS V1.0 | ENTRY POINT
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Every operator starts with the REACH Diagnostic.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "2.25rem", maxWidth: 560, margin: "0 auto 2.25rem" }}>
            Before you buy anything, run the REACH Diagnostic. It takes 4–6 minutes. It identifies your exposure across all four compliance pillars — before FMCSA does.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/reach-diagnostic" data-testid="footer-reach-cta" style={{ display: "inline-block", background: GOLD, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", padding: "1rem 2.5rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >
              TAKE THE REACH DIAGNOSTIC — FREE →
            </Link>
            <Link to="/standard" style={{ display: "inline-block", background: "transparent", color: "rgba(212,144,10,0.75)", fontFamily: SANS, fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "1rem 1.75rem", textDecoration: "none", border: "1px solid rgba(212,144,10,0.28)", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.60)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.28)"}
            >
              VIEW THE LAUNCHPATH STANDARD →
            </Link>
          </div>
          <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "rgba(255,255,255,0.18)", marginTop: "3rem", lineHeight: 1.7 }}>
            All documents current as of March 2026. Verify current regulatory requirements at ecfr.gov. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
          </p>
        </div>
      </section>

      {/* Responsive grid fix */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .two-path-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .two-path-grid { grid-template-columns: 1fr !important; }
        }

        /* Comparison table / mobile cards toggle */
        .comparison-table { display: block; }
        .comparison-cards { display: none; }
        @media (max-width: 768px) {
          .comparison-table { display: none !important; }
          .comparison-cards { display: block !important; }
        }

        /* Bundle boxes full-width on mobile */
        @media (max-width: 768px) {
          .two-path-grid > div { width: 100% !important; max-width: 100% !important; }
        }
      `}} />

      <FooterSection />
    </div>
  );
}
