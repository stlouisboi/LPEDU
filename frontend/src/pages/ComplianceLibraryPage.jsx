/**
 * ComplianceLibraryPage.jsx
 * LP-SYS-LIBRARY — Complete Operating Standards Library
 * Implements LP-SYS-LIBRARY-COPY v1.0 (all 8 sections)
 */

import Image from 'next/image';
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import MCAuditWindow from "../components/MCAuditWindow";
import { THUMBS, BUNDLE_CONFIGS, CFR_REF, PRODUCTS, ACCORDION_GROUPS } from "../data/libraryData";

const DOMAIN_IMAGES = {
  "LP-PKT-001": "/images/products/domain1-new-entrant.webp",
  "LP-PKT-DQ":  "/images/products/domain2-dq-files.webp",
  "LP-PKT-002": "/images/products/domain3-drug-alcohol.webp",
  "LP-PKT-003": "/images/products/domain4-hos-dispatch.webp",
  "LP-PKT-004": "/images/products/domain5-maintenance.webp",
  "LP-PKT-005": "/images/products/domain6-insurance.webp",
};

const API = process.env.REACT_APP_BACKEND_URL;

// ── Design tokens ──────────────────────────────────────────────────────────
const NAVY  = "#060d19";
const NAVY2 = "#0b1628";
const NAVY3 = "#00213F";
const GOLD  = "#d4900a";
const CORAL = "#D85A30";
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
    <div
      id={`product-${p.sku.toLowerCase()}`}
      style={{ scrollMarginTop: "90px", ...(isBundle ? { border: `2px solid #A8B2BE`, borderRadius: 8, padding: "1.25rem 1.5rem", boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.05)", background: NAVY2 } : { borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem", marginBottom: "1rem", background: "#080E18", borderRadius: 6, padding: "1rem 1.25rem", boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.05)" }) }}>
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
          {p.blurb && (
            <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.45)", margin: "0.5rem 0 0", lineHeight: 1.7 }}>{p.blurb}</p>
          )}
          {p.bullets?.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0.625rem 0 0", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.50)", paddingLeft: "1rem", position: "relative", lineHeight: 1.65 }}>
                  <span style={{ position: "absolute", left: 0, color: GOLD }}>—</span>{b}
                </li>
              ))}
            </ul>
          )}
          {p.savings && <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.70)", marginTop: "0.375rem", margin: "0.375rem 0 0" }}>{p.savings}</p>}
          {p.installIf && (
            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "7.5pt", fontStyle: "italic", color: "#7A8590", marginTop: "8px", marginBottom: 0, lineHeight: 1.6 }}>
              {p.installIf}
            </p>
          )}
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
            <Image
              src={p.coverImg}
              alt={p.name}
              width={180}
              height={180}
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
          <p style={{ fontFamily: MONO, fontSize: "15px", letterSpacing: "0.10em", textTransform: "uppercase", color: CORAL, margin: 0, fontWeight: 700 }}>{group.label}</p>
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

// ── REACH Micro-CTA ──────────────────────────────────────────────────────────
function ReachMicroCta() {
  return (
    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "8pt", color: "rgba(255,255,255,0.55)", margin: "1.25rem 0 0", lineHeight: 1.6 }}>
      Not ready to purchase? Run the free{" "}
      <a href="https://launchpathedu.com/reach-diagnostic" style={{ color: "#C9A84C", textDecoration: "underline", textDecorationColor: "#C9A84C" }}>
        REACH Diagnostic
      </a>{" "}
      to see your compliance exposure first.
    </p>
  );
}

// ── Library Email Capture ─────────────────────────────────────────────────────
function LibraryEmailCapture({ API, GOLD, NAVY, SANS, MONO, COND }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const r = await fetch(`${API}/api/risk-map/email-capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first_name: "" }),
      });
      if (r.ok) {
        router.push("/resources/first-90-days-risk-map/thank-you");
      } else {
        setState("error");
      }
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
              LP-LEAD-001 | NEW AUTHORITY? START HERE
            </p>
            <h3 style={{ fontFamily: COND, fontWeight: 800, fontSize: "1.375rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Get the First 90 Days Risk Map™ — Free
            </h3>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              The compliance-first guide for new owner-operators. See where the first 90 days create the highest risk to your authority.
            </p>
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(197,160,89,0.65)", lineHeight: 1.65, marginTop: "0.5rem" }}>
              Built around the 3 critical phases of your first 90 days — Foundation, Operations, and Audit Readiness.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.81rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginTop: "0.5rem" }}>
              Understand where small compliance misses turn into bigger problems before they threaten your authority.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.81rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginTop: "0.5rem", fontStyle: "italic" }}>
              If you decide you need more than awareness, the REACH Diagnostic and LaunchPath Standard exist to help you move from risk visibility to structured implementation.
            </p>
          </div>

          {/* Form */}
          <div style={{ flex: "1 1 280px" }}>
            {state === "error" && (
              <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: "#ef4444", marginBottom: 8 }}>
                Something went wrong. Try again.
              </p>
            )}
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
                  {state === "loading" ? "SENDING…" : "SEND ME THE RISK MAP →"}
                </button>
              </div>
              <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.10em", color: "rgba(255,255,255,0.20)", marginTop: 8 }}>
                No spam. One email. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ComplianceLibraryPage() {

  const { states, errors, buy } = useBuy();
  const [openGroup, setOpenGroup] = useState(null);
  const toggleGroup = (id) => setOpenGroup(g => g === id ? null : id);

  // Auto-open accordion + scroll to product when URL hash is present
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash.startsWith("product-")) return;
    const sku = hash.replace("product-", "").toUpperCase();
    const group = ACCORDION_GROUPS.find(g => g.skus.includes(sku));
    if (group) {
      setOpenGroup(group.id);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 350);
    }
  }, []);

  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {/* ── SECTION 1: PAGE HERO ─────────────────────────────────────── */}
      <section data-testid="library-hero" style={{ background: NAVY2, borderBottom: `3px solid ${CORAL}`, padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: CORAL, marginBottom: "1.5rem" }}>
            LP-SYS-LIBRARY | OPERATING STANDARDS LIBRARY
          </p>
          <h1 style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(2.25rem, 5vw, 4rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
            The LaunchPath Operating Standards Library
          </h1>
          <div style={{ height: 2, background: CORAL, width: 64, marginBottom: "1.5rem" }} />
          <p style={{ fontFamily: SANS, fontSize: "1.1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: 640 }}>
            Choose your path: DIY document system or guided 90-day installation for new motor carriers.
          </p>
          {/* Task 01: 3-bullet benefit statement */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 560 }}>
            {[
              "Pass the New Entrant audit on the first attempt.",
              "Install a complete document system in 90 days.",
              "Know exactly what FMCSA will look for before they arrive.",
            ].map((b, i) => (
              <li key={i} style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, paddingLeft: "1.25rem", position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: GOLD, fontWeight: 700 }}>·</span>{b}
              </li>
            ))}
          </ul>
          {/* Task 01: Primary + Secondary CTAs */}
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="/reach-diagnostic"
              data-testid="hero-reach-cta"
              style={{ display: "inline-block", background: GOLD, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >
              TAKE THE REACH DIAGNOSTIC — FREE
            </Link>
            <a href="#bundle"
              data-testid="hero-bundle-skip"
              style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(212,144,10,0.80)", textDecoration: "underline", textDecorationColor: "rgba(212,144,10,0.40)", letterSpacing: "0.02em", whiteSpace: "nowrap" }}
            >
              Already know what you need? Skip to the DIY Bundle →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: BUNDLE HERO CARD + ROI SNAPSHOT (Tasks 02+03) ── */}
      <section id="bundle" data-testid="bundle-hero-card" style={{ background: "#040f1e", borderBottom: `1px solid rgba(212,144,10,0.20)`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* RECOMMENDED label */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, background: "rgba(212,144,10,0.10)", border: `1px solid rgba(212,144,10,0.40)`, padding: "4px 14px", borderRadius: 2 }}>
              RECOMMENDED FOR MOST CARRIERS
            </span>
          </div>
          {/* Card */}
          <div style={{ background: "#061224", border: `2px solid ${GOLD}`, boxShadow: "0 0 24px rgba(212,144,10,0.20), 0 0 48px rgba(212,144,10,0.08)", overflow: "hidden" }}>
            {/* Bundle hero image */}
            <div style={{ width: "100%", height: 200, overflow: "hidden", position: "relative" }}>
              <img
                src="/images/products/bundle-document-system.webp"
                alt="Document System Bundle — LaunchPath"
                loading="eager"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,18,36,0) 40%, rgba(6,18,36,1) 100%)" }} />
            </div>
            <div style={{ padding: "2rem 2.5rem 2rem" }}>
            {/* Title + Price */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.375rem" }}>
              <h2 style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>
                Document System Bundle — $499
              </h2>
            </div>
            <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.50)", marginBottom: "1.75rem" }}>
              The complete document system. You install it yourself.
            </p>
            {/* 4 Feature checkmarks — per spec */}
            <div style={{ marginBottom: "2rem" }}>
              {[
                "All five domain compliance packets",
                "Unified folder architecture",
                "0–30–60–90 day implementation calendar",
                "Master compliance checklist",
              ].map((feat, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: GOLD, fontWeight: 700, fontSize: "1rem", lineHeight: 1.5, flexShrink: 0 }}>&#10003;</span>
                  <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{feat}</p>
                </div>
              ))}
            </div>
            {/* CTA */}
            <button
              data-testid="bundle-hero-buy-btn"
              onClick={() => buy("LP-BDL-001")}
              disabled={states["LP-BDL-001"] === "loading"}
              style={{ width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.952rem", letterSpacing: "0.10em", textTransform: "uppercase", background: states["LP-BDL-001"] === "loading" ? "rgba(212,144,10,0.45)" : GOLD, color: NAVY, border: "none", padding: "1.125rem", cursor: states["LP-BDL-001"] === "loading" ? "not-allowed" : "pointer", transition: "background 0.2s", marginBottom: "1.25rem" }}
              onMouseEnter={e => { if (states["LP-BDL-001"] !== "loading") e.currentTarget.style.background = "#e8a520"; }}
              onMouseLeave={e => { if (states["LP-BDL-001"] !== "loading") e.currentTarget.style.background = GOLD; }}
            >
              {states["LP-BDL-001"] === "loading" ? "Processing…" : "INSTALL THE SYSTEM — $499"}
            </button>
            {errors["LP-BDL-001"] && <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "#ef4444", marginBottom: "0.75rem" }}>{errors["LP-BDL-001"]}</p>}
            {/* P2 micro-copy under bundle hero CTA */}
            <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", textAlign: "center", marginBottom: "0.75rem", lineHeight: 1.5 }}>Instant access. 30-day implementation roadmap included.</p>

            {/* ROI Snapshot — embedded below the CTA per spec */}
            <div data-testid="roi-strip" style={{ margin: "1.5rem 0", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", textAlign: "center", marginBottom: "1rem" }}>
                THE COST DECISION
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }} className="roi-grid">
                <div style={{ padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                    Typical cost of remediation after a failed New Entrant audit
                  </p>
                  <p style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)", color: "rgba(255,255,255,0.50)", letterSpacing: "-0.02em", margin: 0 }}>
                    $10,000–$25,000
                  </p>
                </div>
                <div style={{ padding: "1.25rem 1.5rem", background: "rgba(212,144,10,0.04)" }}>
                  <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                    Cost of installing the complete document system before the audit
                  </p>
                  <p style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)", color: GOLD, letterSpacing: "-0.02em", margin: 0 }}>
                    $499
                  </p>
                </div>
              </div>
            </div>

            </div>
            {/* Escape link */}
            <p style={{ fontFamily: SANS, fontSize: "0.814rem", color: "rgba(255,255,255,0.35)", textAlign: "center", lineHeight: 1.6, margin: 0 }}>
              Not ready for the full system?{" "}
              <a href="#component-library" style={{ color: "rgba(212,144,10,0.65)", textDecoration: "underline", textDecorationColor: "rgba(212,144,10,0.35)" }}>
                Explore individual domains below →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PATH CHOOSER CARD GRID (Task 04) ──────────────── */}
      <section data-testid="path-chooser-grid" style={{ background: "#040a14", borderBottom: `1px solid ${BORDER}`, padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "2rem", textAlign: "center" }}>
            NOT SURE WHICH PATH FITS YOUR OPERATION?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="path-chooser-grid">
            {[
              {
                situation: "Just activated authority, unsure of your exposure",
                cta: "TAKE THE REACH DIAGNOSTIC — FREE →",
                action: "link",
                href: "/reach-diagnostic",
                testid: "path-card-reach",
              },
              {
                situation: "Know your gaps, confident in self-installation",
                cta: "DOCUMENT SYSTEM BUNDLE — $499 →",
                action: "buy",
                sku: "LP-BDL-001",
                testid: "path-card-bundle",
              },
              {
                situation: "Want every audit domain covered in one pass",
                cta: "VIEW THE LIBRARY — $699 →",
                action: "link",
                href: "/products/library",
                testid: "path-card-library",
              },
              {
                situation: "Want it built, verified, and confirmed audit-ready",
                cta: "LAUNCHPATH STANDARD — $2,500 →",
                action: "link",
                href: "/ground-0-briefing",
                testid: "path-card-standard",
                note: "Admission-gated. Begins at Ground 0.",
              },
            ].map((card, i) => (
              <div key={i} style={{ background: "#0A1520", border: `1px solid rgba(212,144,10,0.18)`, padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.25rem" }}>
                <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.65, margin: 0 }}>{card.situation}</p>
                <div>
                  {card.action === "buy" ? (
                    <button
                      data-testid={card.testid}
                      onClick={() => buy(card.sku)}
                      disabled={states[card.sku] === "loading"}
                      style={{ width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.08em", textTransform: "uppercase", background: GOLD, color: NAVY, border: "none", padding: "0.75rem 1rem", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                      onMouseLeave={e => e.currentTarget.style.background = GOLD}
                    >
                      {states[card.sku] === "loading" ? "Processing…" : card.cta}
                    </button>
                  ) : (
                    <Link to={card.href} data-testid={card.testid} style={{ display: "block", width: "100%", boxSizing: "border-box", fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", color: "rgba(212,144,10,0.85)", border: `1px solid rgba(212,144,10,0.35)`, padding: "0.75rem 1rem", textDecoration: "none", textAlign: "center", transition: "border-color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.70)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.35)"}
                    >
                      {card.cta}
                    </Link>
                  )}
                  {card.note && <p style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", marginTop: "0.5rem", lineHeight: 1.5 }}>{card.note}</p>}
                  {errors[card.sku] && <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "#ef4444", marginTop: "0.375rem" }}>{errors[card.sku]}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: AUDIT WINDOW CALCULATOR (P2 — moved up) ────────── */}
      <section data-testid="audit-window-section" style={{ background: "#001428", padding: "4rem 1.5rem", borderTop: `1px solid rgba(197,160,89,0.12)`, borderBottom: `1px solid rgba(197,160,89,0.12)` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.875rem", textAlign: "center" }}>
            HOW MUCH TIME DO YOU HAVE?
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto 2rem", textAlign: "center" }}>
            FMCSA targets new carriers for a safety audit within 18 months of authority grant. Enter your MC effective date to see your remaining window.
          </p>
          <MCAuditWindow />
        </div>
      </section>

      {/* ── SECTION 6: SOCIAL PROOF PLACEHOLDER (P3 — populates after first cohort) */}
      <section data-testid="social-proof-placeholder" style={{ background: "#030d1a", borderBottom: `1px solid ${BORDER}`, padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ border: `1px dashed rgba(212,144,10,0.20)`, padding: "2rem", textAlign: "center" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.35)", marginBottom: "0.75rem" }}>
              CARRIER OUTCOMES — POPULATING AFTER FIRST COHORT
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.20)", lineHeight: 1.7, margin: 0 }}>
              Verified audit pass results and carrier testimonials will appear here once the first cohort completes the program.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: CHOOSE HOW YOU WANT TO BUILD ────────────────── */}
      <section data-testid="two-path-band" style={{ background: NAVY3, borderBottom: `1px solid ${BORDER}`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: CORAL, marginBottom: "0.875rem" }}>
              CHOOSE HOW YOU WANT TO BUILD
            </p>
            <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>
              The difference is not the documents. It is whether someone with 25 years in compliance is watching to make sure they are installed correctly.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.5rem", alignItems: "start" }} className="two-path-grid">
            {/* PRIMARY PATH — Bundle (dominant) */}
            <div style={{ background: "#060d19", border: `1px solid rgba(212,144,10,0.25)`, padding: "2rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: CORAL, marginBottom: "0.75rem" }}>
                LP-BDL-001 | SELF-INSTALLATION
              </p>
              <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.75rem", color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                Document System Bundle
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.40)", fontStyle: "italic", marginBottom: "1.25rem" }}>
                The complete document system. You install it yourself.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "0.875rem" }}>
                Five domain packets, a unified folder structure, a 0–30–60–90 day implementation calendar, and a master compliance checklist — everything required to build an audit-ready operation if you know what you are doing or are prepared to learn.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(212,144,10,0.85)", lineHeight: 1.75, marginBottom: "1.5rem", borderLeft: "2px solid rgba(212,144,10,0.35)", paddingLeft: "0.875rem" }}>
                Most carriers should choose the Document System Bundle, not the $699 Library — it includes the folder architecture, 0–90 day calendar, and master checklist that tell you what to do and when.
              </p>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.45)", marginBottom: "0.625rem" }}>WHAT'S INCLUDED</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {["New Entrant Compliance Packet","Drug & Alcohol Compliance Packet","HOS & Dispatch Compliance Packet","Maintenance & Unit File Packet","Insurance & Authority Packet","Unified Folder Architecture","0–30–60–90 Day Implementation Calendar","Master Compliance Checklist"].map((item, i) => (
                    <li key={i} style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6, paddingLeft: "1rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: GOLD }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.25rem", marginBottom: "1rem" }}>
                <p style={{ fontFamily: SANS, fontWeight: 800, fontSize: "1.5rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>$499</p>
                <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.35)" }}>Instant access. One-time. $176 below individual acquisition cost.</p>
              </div>
              {/* Consequence Callout */}
              <div style={{ background: "#071422", borderLeft: "3px solid #C9A84C", padding: "12px", marginBottom: "1.25rem", lineHeight: 1.65 }}>
                <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "#fff" }}>Typical cost of remediation after a failed New Entrant audit: </span>
                <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "#EDD99A", fontWeight: 700 }}>$10,000–$25,000</span>
                <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "#fff" }}>. Cost of installing the complete document system before the audit: </span>
                <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "#EDD99A", fontWeight: 700 }}>$499</span>
                <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "#fff" }}>.</span>
              </div>
              {/* Primary CTA — filled */}
              <button
                data-testid="buy-bundle-btn"
                onClick={() => buy("LP-BDL-001")}
                disabled={states["LP-BDL-001"] === "loading"}
                style={{ width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", background: states["LP-BDL-001"] === "loading" ? "rgba(212,144,10,0.45)" : GOLD, color: NAVY, border: "none", padding: "1rem", cursor: states["LP-BDL-001"] === "loading" ? "not-allowed" : "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => { if (states["LP-BDL-001"] !== "loading") e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { if (states["LP-BDL-001"] !== "loading") e.currentTarget.style.background = GOLD; }}
              >
                {states["LP-BDL-001"] === "loading" ? "Processing…" : "INSTALL THE BUNDLE — $499 →"}
              </button>
              {/* P2 micro-copy */}
              <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "rgba(255,255,255,0.30)", textAlign: "center", marginTop: "0.5rem", lineHeight: 1.5 }}>Instant access. 30-day implementation roadmap included.</p>
              {errors["LP-BDL-001"] && <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "#ef4444", marginTop: "0.375rem" }}>{errors["LP-BDL-001"]}</p>}
            </div>

            {/* STANDARD — directional callout only (no price, no purchase path) */}
            <div data-testid="standard-callout" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.10)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>
                  LP-STD-001 | GUIDED IMPLEMENTATION
                </p>
                <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.375rem", color: "rgba(255,255,255,0.65)", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1rem" }}>
                  The LaunchPath Standard
                </h3>
                <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.75, margin: 0 }}>
                  Not ready to self-install? The LaunchPath Standard is a guided 90-day implementation — but it requires Ground 0 completion first. That is where this starts.
                </p>
              </div>
              <div>
                {/* Outlined button (secondary weight — directional, not purchase) */}
                <Link
                  to="/ground-0-briefing"
                  data-testid="begin-reach-btn"
                  style={{ display: "block", textAlign: "center", background: "transparent", color: GOLD, border: `1px solid rgba(212,144,10,0.55)`, fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.55)"}
                >
                  BEGIN GROUND 0 →
                </Link>
                {/* P2 micro-copy */}
                <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: "0.5rem", lineHeight: 1.5 }}>Free. No purchase required. Takes 20 minutes.</p>
                {/* Secondary action — text link only */}
                <p style={{ textAlign: "center", marginTop: "0.875rem" }}>
                  <Link to="/standard" style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(212,144,10,0.50)", textDecoration: "underline", textDecorationColor: "rgba(212,144,10,0.25)" }}>
                    View full engagement details →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STARTER STACK — REPOSITIONED (Task 6) ──────────────────── */}
      <section style={{ background: NAVY, borderBottom: `1px solid ${BORDER}`, padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Task 6: New label */}
          <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "7.5pt", fontWeight: 700, color: "#C9A84C", textAlign: "left", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>
            New to LaunchPath? Start here.
          </p>
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
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1.75rem" }}>BEFORE YOU BUY — READ THIS</p>
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

      {/* ── SECTION 4a: MC AUDIT WINDOW — moved to Section 5 above ── */}

      {/* ── SECTION 4b: EMAIL CAPTURE ────────────────────────────────────── */}
      <LibraryEmailCapture API={API} GOLD={GOLD} NAVY={NAVY} SANS={SANS} MONO={MONO} COND={COND} />

      {/* ── SECTION 9: DOMAIN PRODUCT CARD GRID (P3) ────────────────── */}
      <section id="component-library" style={{ background: NAVY, padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Section header */}
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.5rem", color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.625rem" }}>
            Just Need One Area Fixed?
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 680, marginBottom: "1.5rem" }}>
            Know exactly which domain needs attention? Each packet covers one compliance area completely. Select your domain. Install it. Move to the next.
          </p>

          {/* Task 05: Micro-CTA above packet grid */}
          <div style={{ marginBottom: "2.5rem", padding: "1rem 1.25rem", background: "rgba(212,144,10,0.05)", border: "1px solid rgba(212,144,10,0.20)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6, margin: 0 }}>
              Buying more than one domain? The Document System Bundle includes all five for $499 — $176 below individual acquisition cost.
            </p>
            <a href="#bundle" data-testid="domain-bundle-crosssell" style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.08em", color: GOLD, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              INSTALL THE BUNDLE →
            </a>
          </div>

          {/* 2×3 Domain Product Card Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "3rem" }} className="domain-card-grid">
            {[
              {
                domain: "DOMAIN 1 · AUTHORITY & NEW ENTRANT",
                name: "New Entrant Compliance Packet",
                description: "Your full 18-month new entrant roadmap — authority activation through audit window.",
                bestFor: "Best for carriers in their first 18 months with authority.",
                price: "$139",
                sku: "LP-PKT-001",
                href: "/standards/new-entrant-packet",
                testid: "domain-card-lp-pkt-001",
              },
              {
                domain: "DOMAIN 2 · DRIVER QUALIFICATION",
                name: "DQ File Builder Kit",
                description: "Build a complete, CFR-compliant Driver Qualification file for every driver in your fleet.",
                bestFor: "Best for fleets adding drivers or building DQ files from scratch.",
                price: "$129",
                sku: "LP-PKT-DQ",
                href: "/standards/dq-file-builder",
                testid: "domain-card-lp-pkt-dq",
              },
              {
                domain: "DOMAIN 3 · DRUG & ALCOHOL",
                name: "Drug & Alcohol Compliance Packet",
                description: "A complete Part 382 program — policy, testing protocols, and Clearinghouse integration.",
                bestFor: "Best for owner-operators setting up Part 382 compliance for the first time.",
                price: "$129",
                sku: "LP-PKT-002",
                href: "/standards/drug-alcohol-packet",
                testid: "domain-card-lp-pkt-002",
              },
              {
                domain: "DOMAIN 4 · HOS & DISPATCH",
                name: "HOS & Dispatch Compliance Packet",
                description: "ELD compliance, dispatch standards, and HOS records that hold under inspection.",
                bestFor: "Best for carriers using ELDs who need HOS records that hold under inspection.",
                price: "$119",
                sku: "LP-PKT-003",
                href: "/standards/hos-packet",
                testid: "domain-card-lp-pkt-003",
              },
              {
                domain: "DOMAIN 5 · VEHICLE MAINTENANCE",
                name: "Maintenance & Unit File Packet",
                description: "Unit files, PM schedules, and repair documentation per Part 396.",
                bestFor: "Best for owner-operators building unit files and PM schedules from zero.",
                price: "$119",
                sku: "LP-PKT-004",
                href: "/standards/maintenance-packet",
                testid: "domain-card-lp-pkt-004",
              },
              {
                domain: "DOMAIN 6 · INSURANCE CONTINUITY",
                name: "Insurance & Authority Packet",
                description: "Filings, renewal calendar, and monitoring that keep your authority active.",
                bestFor: "Best for carriers managing filings and renewal calendars independently.",
                price: "$109",
                sku: "LP-PKT-005",
                href: "/standards/insurance-packet",
                testid: "domain-card-lp-pkt-005",
              },
            ].map((card) => (
              <div key={card.sku} data-testid={card.testid} style={{ background: "#060d19", border: `1px solid rgba(212,144,10,0.20)`, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.45)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.20)"}
              >
                {/* Product image mockup */}
                {DOMAIN_IMAGES[card.sku] && (
                  <div style={{ width: "100%", height: 160, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                    <img
                      src={DOMAIN_IMAGES[card.sku]}
                      alt={card.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,13,25,0) 50%, rgba(6,13,25,0.85) 100%)" }} />
                  </div>
                )}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.25rem", flex: 1 }}>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.5rem", lineHeight: 1.4 }}>{card.domain}</p>
                  <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: "0.5rem" }}>{card.name}</h3>
                  <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 0 }}>{card.description}</p>
                  {/* P2: Best For line */}
                  <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.30)", lineHeight: 1.55, fontStyle: "italic", margin: "0.375rem 0 0" }}>{card.bestFor}</p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                    <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: "1.25rem", color: GOLD, letterSpacing: "-0.02em" }}>{card.price}</span>
                    <span style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>1 ASSET</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
                    <button
                      data-testid={`buy-btn-${card.sku.toLowerCase()}`}
                      onClick={() => buy(card.sku)}
                      disabled={states[card.sku] === "loading"}
                      style={{ width: "100%", fontFamily: SANS, fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.08em", textTransform: "uppercase", background: states[card.sku] === "loading" ? "rgba(212,144,10,0.45)" : GOLD, color: NAVY, border: "none", padding: "0.625rem 0.75rem", cursor: states[card.sku] === "loading" ? "not-allowed" : "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => { if (states[card.sku] !== "loading") e.currentTarget.style.background = "#e8a520"; }}
                      onMouseLeave={e => { if (states[card.sku] !== "loading") e.currentTarget.style.background = GOLD; }}
                    >
                      {states[card.sku] === "loading" ? "Processing…" : `ADD TO SYSTEM — ${card.price}`}
                    </button>
                    {/* P2 micro-copy under domain packet buy buttons */}
                    <p style={{ fontFamily: SANS, fontSize: "0.657rem", color: "rgba(255,255,255,0.22)", textAlign: "center", marginTop: "0.25rem", marginBottom: "0.375rem", lineHeight: 1.4 }}>Instant access. One-time payment.</p>
                    <Link to={card.href} style={{ display: "block", textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: "0.714rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none", padding: "0.5rem 0.75rem", border: "1px solid rgba(212,144,10,0.20)", transition: "border-color 0.15s, color 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.50)"; e.currentTarget.style.color = GOLD; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.20)"; e.currentTarget.style.color = "rgba(212,144,10,0.65)"; }}
                    >
                      VIEW DOMAIN →
                    </Link>
                  </div>
                  {errors[card.sku] && <p style={{ fontFamily: SANS, fontSize: "0.714rem", color: "#ef4444", marginTop: "0.375rem" }}>{errors[card.sku]}</p>}
                </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other products — diagnostics and tools */}
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.45)", marginBottom: "1rem" }}>
            DIAGNOSTICS &amp; SUPPLEMENTAL TOOLS
          </p>
          {ACCORDION_GROUPS.filter(g => ["diagnostics", "audit-prep"].includes(g.id)).map(group => {
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
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>BUYING MULTIPLE DOMAINS?</p>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.75, maxWidth: 500, margin: "0 auto 1.25rem" }}>
              The Document System Bundle includes all five compliance packets plus the folder architecture, implementation calendar, and master checklist — at $176 below individual acquisition cost.
            </p>
            <a href="#bundle" style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, textDecoration: "none" }}>
              BUILD THE FULL SYSTEM — $499 →
            </a>
          </div>
          <ReachMicroCta />

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
                      textAlign: "center", padding: "0.75rem 1rem", fontFamily: SANS, fontSize: "0.875rem", fontWeight: 800,
                      color: highlight ? GOLD : "#fff",
                      background: highlight ? "rgba(212,144,10,0.10)" : "rgba(212,144,10,0.06)",
                      border: highlight ? `2px solid ${GOLD}` : undefined,
                      borderBottom: highlight ? `2px solid ${GOLD}` : undefined,
                      borderTop: highlight ? `3px solid ${GOLD}` : undefined,
                    }}>
                      {highlight && (
                        <div style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, background: "rgba(212,144,10,0.12)", border: `1px solid rgba(212,144,10,0.40)`, padding: "3px 10px", borderRadius: 2, display: "inline-block", marginBottom: "0.375rem" }}>RECOMMENDED</div>
                      )}
                      <div>{label}</div>
                      <div style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700, marginTop: 2, color: highlight ? GOLD : "rgba(255,255,255,0.45)" }}>{sub}</div>
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
                        color: val === "✓" ? "#C9A84C" : val === "—" ? "#7A8590" : "#fff",
                        fontWeight: val === "✓" ? 700 : 400,
                        background: ci === 2 ? "rgba(212,144,10,0.04)" : undefined,
                        borderLeft: ci === 2 ? `1px solid rgba(212,144,10,0.20)` : undefined,
                        borderRight: ci === 2 ? `1px solid rgba(212,144,10,0.20)` : undefined,
                      }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {/* Desktop CTA row */}
              <tfoot>
                <tr>
                  <td style={{ padding: "1.25rem 1rem" }} />
                  {/* Individual Assets — no direct CTA, link to domain grid */}
                  <td style={{ padding: "1.25rem 1rem", textAlign: "center" }}>
                    <a href="#component-library" style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.15)" }}>Browse domains →</a>
                  </td>
                  {/* Complete Library */}
                  <td style={{ padding: "1.25rem 1rem", textAlign: "center", background: "rgba(212,144,10,0.04)", borderLeft: `1px solid rgba(212,144,10,0.20)`, borderRight: `1px solid rgba(212,144,10,0.20)` }}>
                    <Link to="/products/library" data-testid="compare-library-link" style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(212,144,10,0.70)", textDecoration: "none", border: "1px solid rgba(212,144,10,0.30)", padding: "0.5rem 1rem", transition: "border-color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.70)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.30)"}
                    >
                      VIEW THE LIBRARY →
                    </Link>
                  </td>
                  {/* Bundle */}
                  <td style={{ padding: "1.25rem 1rem", textAlign: "center", background: "rgba(212,144,10,0.08)", borderLeft: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}`, borderBottom: `2px solid ${GOLD}` }}>
                    <button
                      data-testid="compare-bundle-buy-btn"
                      onClick={() => buy("LP-BDL-001")}
                      disabled={states["LP-BDL-001"] === "loading"}
                      style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.08em", textTransform: "uppercase", background: GOLD, color: NAVY, border: "none", padding: "0.625rem 1.25rem", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                      onMouseLeave={e => e.currentTarget.style.background = GOLD}
                    >
                      {states["LP-BDL-001"] === "loading" ? "Processing…" : "INSTALL THE BUNDLE →"}
                    </button>
                  </td>
                  {/* Standard */}
                  <td style={{ padding: "1.25rem 1rem", textAlign: "center" }}>
                    <Link to="/ground-0-briefing" style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", padding: "0.5rem 1rem", transition: "border-color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                    >
                      BEGIN GROUND 0 →
                    </Link>
                  </td>
                </tr>
              </tfoot>
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
                subtitle: "Best fit for experienced safety teams who already have their own implementation process and just need the documents.",
                rows: [
                  ["Domain compliance packets", "All 8 documents"],
                  ["Folder architecture", "—"], ["Implementation calendar", "—"],
                  ["Master checklist", "—"], ["Video curriculum", "—"],
                  ["Verification checkpoints", "—"], ["Q&A access", "—"],
                  ["Audit-readiness confirmation", "—"], ["Entry requirement", "None"],
                ],
                cta: { label: "VIEW THE LIBRARY →", href: "/products/library" },
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
                {card.subtitle && (
                  <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 12 }}>{card.subtitle}</p>
                )}
                {card.rows.map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                    <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.50)" }}>{label}</span>
                    <span style={{ fontFamily: SANS, fontSize: "0.762rem", fontWeight: val === "✓" || val.startsWith("✓") ? 700 : 400, color: val === "✓" || val.startsWith("✓") ? "#C9A84C" : val === "—" ? "#7A8590" : "#fff", marginLeft: 8, textAlign: "right" }}>{val}</span>
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

        /* Path chooser grid: 2-col on desktop, 1-col on mobile */
        @media (max-width: 640px) {
          .path-chooser-grid { grid-template-columns: 1fr !important; }
        }

        /* Domain card grid: 3-col desktop, 2-col tablet, 1-col mobile */
        @media (max-width: 900px) {
          .domain-card-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .domain-card-grid { grid-template-columns: 1fr !important; }
        }

        /* ROI grid: 2-col on desktop, 1-col on mobile */
        @media (max-width: 560px) {
          .roi-grid { grid-template-columns: 1fr !important; }
          .roi-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
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
