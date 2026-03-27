import { useState, useEffect, useRef } from "react";
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const API   = process.env.REACT_APP_BACKEND_URL;
const GOLD  = "#d4900a";
const GOLD_DIM = "rgba(212,144,10,0.65)";
const DARK  = "#070e1c";
const NAVY  = "#0b1628";
const CARD  = "#0d1929";
const MONO  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";

// ── Product images (same as Stripe checkout) ──────────────────────────────────
const BASE = "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/";
const IMG_BUNDLE = BASE + "64d8c85e1b2fcbdc822a1cfbd3e6d33b0474d2e2ebb60f845755c564dc6bb5d7.png";
const IMG_PKT = {
  "LP-PKT-001": BASE + "2a792816a78b73cdc5cdda45a303201ac524991f95981c97aae09cb1f52e738e.png",
  "LP-PKT-002": BASE + "1bad3292205ed62246b466e0dcf3b09ada132cea612035cc9f8674f8802472c3.png",
  "LP-PKT-003": BASE + "546de6eb252c5e998f89c6565bc7193a3c0c002bff62910ac9e730b31f8d82dc.png",
  "LP-PKT-004": BASE + "1dc88494a074059a36d3b6b46b6b8a956c70a05a5a219c9f88e69300f3a6ec3e.png",
  "LP-PKT-005": BASE + "1765edddd11eb37db174f165574154c8c2680e6ea93eec2b608a15b19ed2bfcd.png",
};

// ── Checkout ──────────────────────────────────────────────────────────────────
function useBuy() {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);
  const buy = async () => {
    setState("loading");
    setError(null);
    try {
      const res = await fetch(`${API}/api/products/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_sku: "LP-BDL-001", origin_url: window.location.origin }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else throw new Error();
    } catch {
      setState("idle");
      setError("Something went wrong. Please try again or contact support@launchpathedu.com.");
    }
  };
  return { state, error, buy };
}

// ── Shared subcomponents ──────────────────────────────────────────────────────
function GoldCTA({ state, buy, label = "Get the Document System", size = "lg" }) {
  const loading = state === "loading";
  const pad = size === "lg" ? "1.125rem 2.5rem" : "0.875rem 1.75rem";
  return (
    <button
      data-testid="bundle-buy-cta"
      onClick={buy}
      disabled={loading}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        background: loading ? "rgba(212,144,10,0.5)" : GOLD,
        color: "#060e1b", fontFamily: MONO, fontWeight: 700,
        fontSize: size === "lg" ? "1rem" : "0.9rem",
        letterSpacing: "0.07em", textTransform: "uppercase",
        padding: pad, border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background 0.2s", borderRadius: 0,
      }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#e8a520"; }}
      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = loading ? "rgba(212,144,10,0.5)" : GOLD; }}
    >
      {loading
        ? <><span style={{ width: 13, height: 13, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Processing…</>
        : label}
    </button>
  );
}

function SectionRail({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
      <span style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_DIM }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(212,144,10,0.35), transparent)" }} />
    </div>
  );
}

function Check() {
  return <span style={{ color: GOLD, fontWeight: 700, fontSize: "1rem" }}>✓</span>;
}
function Cross() {
  return <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1rem" }}>—</span>;
}

// ── Packet data (spec-exact) ──────────────────────────────────────────────────
const PACKETS = [
  {
    code: "LP-PKT-001", domain: "Domain 1", title: "New Entrant Compliance Packet",
    pages: 20, value: "$97",
    desc: "The foundation. Covers the 18-month New Entrant monitoring period, the five audit domains, the 30-60-90 day installation sequence, and the 8-folder compliance structure.",
    bullets: [
      "18-Month Timeline & Milestone Calendar",
      "Pre-Launch Compliance Checklist",
      "Common Audit Findings by Domain",
      "Scenario Briefing: When the Audit Notice Arrives",
      "Post-Audit Action Plan Template",
    ],
  },
  {
    code: "LP-PKT-002", domain: "Domain 2", title: "Drug & Alcohol Compliance Packet",
    pages: 18, value: "$127",
    desc: "The program that must exist before your first driver operates. Covers all six testing types, written policy requirements, consortium enrollment, Clearinghouse obligations, and SAP procedures.",
    bullets: [
      "10-Section Written Policy Framework",
      "Program Setup Checklist",
      "SAP Process Walkthrough",
      "Specimen Collection Procedures",
      "Clearinghouse Quick Reference",
    ],
  },
  {
    code: "LP-PKT-003", domain: "Domain 3", title: "HOS & Dispatch Compliance Packet",
    pages: 18, value: "$127",
    desc: "The rules that follow you on every mile. Covers property-carrying HOS limits, sleeper berth splits, adverse driving conditions, personal conveyance, ELD requirements, and common violations.",
    bullets: [
      "14-Hour Window Explained",
      "Sleeper Berth Split Scenarios (7/3, 8/2)",
      "30-Minute Break Clarifications",
      "ELD Setup & Malfunction Procedures",
      "Supporting Documents Requirements",
    ],
  },
  {
    code: "LP-PKT-004", domain: "Domain 4", title: "Maintenance & Unit File Packet",
    pages: 18, value: "$127",
    desc: "The equipment documentation that proves you maintain what you operate. Covers annual inspections, DVIRs, preventive maintenance, tire and brake standards, and out-of-service criteria.",
    bullets: [
      "Unit File Setup Checklist",
      "Annual Inspection Tracking Template",
      "DVIR Process Guide",
      "Brake Adjustment Quick Reference",
      "Scenario Briefing: Roadside Inspection",
    ],
  },
  {
    code: "LP-PKT-005", domain: "Domain 5", title: "Insurance & Authority Packet",
    pages: 18, value: "$127",
    desc: "The filings that keep your authority active. Covers minimum coverage requirements, SAFER status verification, insurance filing procedures, cargo claims, and authority lapse scenarios.",
    bullets: [
      "Coverage Types Brief",
      "SAFER Status Walkthrough",
      "Insurance Filing Verification Checklist",
      "Authority Lapse & Reinstatement Scenarios",
      "Renewal Prep Checklist (90/60/30 days)",
    ],
  },
];

const BONUSES = [
  {
    code: "LP-SYS-DIR-001", title: "Unified Folder Structure Guide",
    tag: "4 pages", value: "Included",
    desc: "The master folder architecture. How to build, label, and maintain the 8-folder compliance system — digital and physical. Includes the Audit-Ready Grab Folder protocol.",
  },
  {
    code: "LP-VIDEO-001", title: "Folder Setup Walkthrough",
    tag: "Video", value: "Included",
    desc: "Step-by-step visual guide showing the physical folder setup process. What goes where. How to label. How to organize for the \"grab and go\" moment when an audit notice arrives.",
  },
];

const LINE_ITEMS = [
  { code: "LP-PKT-001", name: "New Entrant Compliance Packet",      price: "$97" },
  { code: "LP-PKT-002", name: "Drug & Alcohol Compliance Packet",   price: "$127" },
  { code: "LP-PKT-003", name: "HOS & Dispatch Compliance Packet",   price: "$127" },
  { code: "LP-PKT-004", name: "Maintenance & Unit File Packet",     price: "$127" },
  { code: "LP-PKT-005", name: "Insurance & Authority Packet",       price: "$127" },
  { code: "",           name: "Unified Folder Structure Guide",     price: "Included" },
  { code: "",           name: "Folder Setup Walkthrough",           price: "Included" },
];

const WHO_FOR = [
  { title: "Pre-Launch Operators", body: "You're preparing to activate your authority. You want the documentation infrastructure ready before your first load — not built under pressure after an audit notice arrives." },
  { title: "New Entrant Carriers",  body: "You're in the 18-month monitoring window. You need to organize what you have and fill gaps before FMCSA schedules your safety audit." },
  { title: "Post-Failure Recovery", body: "You failed an audit or received a Conditional rating. You need a complete documentation rebuild — fast. This bundle gives you the templates and structure." },
];

const WHAT_YOU_GET = [
  "5 compliance packets (92 pages total)",
  "Unified Folder Structure Guide (4 pages)",
  "Folder Setup Walkthrough (video)",
  "Immediate download access",
  "Lifetime access — no subscription",
  "PDF format — print or use digitally",
  "Future updates included",
];

const STEPS = [
  { n: "01", title: "Purchase", body: "Complete your purchase. You'll receive immediate access to download all materials." },
  { n: "02", title: "Build",    body: "Watch the Folder Setup Walkthrough. Create your 8-folder structure — digital and physical. Use the packets to populate each folder with the correct documents." },
  { n: "03", title: "Maintain", body: "Run the quarterly Grab Folder review. Use the reminder templates to catch expirations before they become violations. When the audit notice arrives, you pick up Folder 08." },
];

const COMPARE = [
  { feature: "Price",                          ind: "$59–$169 each",  bundle: "$499",   std: "$2,500" },
  { feature: "Packets Included",               ind: "1",             bundle: "All 5",  std: "All 5" },
  { feature: "Folder Structure Guide",         ind: false,           bundle: true,     std: true },
  { feature: "Folder Setup Walkthrough",       ind: false,           bundle: true,     std: true },
  { feature: "Station Custodian Verification", ind: false,           bundle: false,    std: true },
  { feature: "90-Day Guided Implementation",   ind: false,           bundle: false,    std: true },
  { feature: "Quarterly Reviews",              ind: false,           bundle: false,    std: true },
  { feature: "Community Access",               ind: false,           bundle: false,    std: true },
  { feature: "Best For",                       ind: "Single domain", bundle: "DIY full install", std: "Guided install" },
];

const FAQS = [
  {
    q: "What format are the packets?",
    a: "All packets are PDF files. You can view them on any device, print them, or store them digitally. The video walkthrough is hosted online with lifetime access.",
  },
  {
    q: "Do I need all five packets?",
    a: "If you're a new motor carrier preparing for or currently in the New Entrant monitoring period — yes. The five domains are the five areas FMCSA reviews in your safety audit. Missing one domain is the same as failing one domain.",
  },
  {
    q: "What's the difference between the bundle and The Standard?",
    a: "The bundle gives you the documents. The Standard installs the system. If you have the discipline and time to build your compliance infrastructure yourself, the bundle is sufficient. If you want guided implementation with verification checkpoints and Station Custodian accountability — that's The Standard.",
  },
  {
    q: "Can I upgrade to The Standard later?",
    a: "Yes. Bundle purchasers can apply the $499 toward The Standard enrollment within 90 days of purchase. Contact us for upgrade details.",
  },
  {
    q: "Are updates included?",
    a: "Yes. When packets are updated for regulatory changes, you'll receive access to the updated versions at no additional cost.",
  },
  {
    q: "Is there a refund policy?",
    a: "Due to the digital nature of these materials, all sales are final. Review the packet descriptions and contents list before purchasing.",
  },
];

// ── Video embed — swap BUNDLE_VIDEO_URL to activate ──────────────────────────
const BUNDLE_VIDEO_URL = ""; // TODO: paste YouTube embed URL here e.g. https://www.youtube.com/embed/XXXX

function BundleVideoEmbed() {
  if (BUNDLE_VIDEO_URL) {
    return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000", border: `1px solid rgba(212,144,10,.2)` }}>
        <iframe
          src={BUNDLE_VIDEO_URL}
          title="8-Folder FMCSA Audit Defense — Folder Setup Walkthrough"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
    );
  }

  // Placeholder shown until URL is set
  return (
    <div style={{
      position: "relative", paddingBottom: "56.25%", background: "#0a1220",
      border: `1px solid rgba(212,144,10,.2)`, borderTop: `2px solid ${GOLD}`,
      overflow: "hidden",
    }}>
      {/* Blueprint grid */}
      <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem", padding: "2rem" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid rgba(212,144,10,.4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: `20px solid ${GOLD}`, marginLeft: 4 }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.8125rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: GOLD, marginBottom: ".625rem" }}>LP-VIDEO-001 · FOLDER SETUP WALKTHROUGH</p>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.72)", lineHeight: 1.65 }}>The 8-Folder FMCSA Audit Defense · 5:55 · Included with every bundle</p>
        </div>
      </div>
    </div>
  );
}

// ── System Access Strip — appears after hero CTA scrolls out of view ─────────
function SystemAccessStrip({ visible, state, buy }) {
  return (
    <div
      data-testid="system-access-strip"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#060d1a",
        borderTop: "1px solid rgba(212,144,10,0.18)",
        padding: "0 24px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Left: system identity */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", overflow: "hidden" }}>
        {/* Static indicator dot — no pulse, no glow */}
        <span style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(212,144,10,0.55)",
          flexShrink: 0,
        }} />
        <div style={{ overflow: "hidden" }}>
          <span style={{
            fontFamily: MONO,
            fontSize: ".714rem",
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.5)",
            display: "block",
            lineHeight: 1,
            marginBottom: ".2rem",
            whiteSpace: "nowrap",
          }}>
            SYSTEM AVAILABLE
          </span>
          <span style={{
            fontFamily: MONO,
            fontSize: ".714rem",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            whiteSpace: "nowrap",
          }}>
            LP-BDL-001 · Document System · Required for audit-ready documentation
          </span>
        </div>
      </div>

      {/* Right: action */}
      <button
        data-testid="sticky-install-btn"
        onClick={buy}
        disabled={state === "loading"}
        style={{
          fontFamily: MONO,
          fontSize: ".714rem",
          fontWeight: 700,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: state === "loading" ? "rgba(212,144,10,0.4)" : "rgba(212,144,10,0.85)",
          background: "transparent",
          border: "1px solid rgba(212,144,10,0.25)",
          padding: ".5rem 1.25rem",
          cursor: state === "loading" ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={e => {
          if (state !== "loading") {
            e.currentTarget.style.borderColor = "rgba(212,144,10,0.6)";
            e.currentTarget.style.color = "rgba(212,144,10,1)";
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(212,144,10,0.25)";
          e.currentTarget.style.color = state === "loading" ? "rgba(212,144,10,0.4)" : "rgba(212,144,10,0.85)";
        }}
      >
        {state === "loading" ? "Processing…" : "Install System — $499"}
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BundleSalesPage() {
  const { state, error, buy } = useBuy();
  const [openFaq, setOpenFaq] = useState(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroCTARef = useRef(null);

  // Show sticky bar only after hero CTA scrolls out of view
  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: DARK, minHeight: "100vh", color: "#FFF", fontFamily: MONO, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .bsp-packet-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 2px; }
        .bsp-who-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
        .bsp-compare th, .bsp-compare td { padding: .875rem 1.25rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,.05); font-size: .875rem; }
        .bsp-compare th { font-size: .714rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
        .bsp-compare tr:hover td { background: rgba(255,255,255,.02); }
        .bsp-faq-row { border-bottom: 1px solid rgba(255,255,255,.07); }
        .bsp-faq-btn { width:100%; background:none; border:none; color:#fff; text-align:left; padding:1.25rem 0; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:1rem; }
        @media(max-width:760px){
          .bsp-packet-grid { grid-template-columns: 1fr !important; }
          .bsp-who-grid    { grid-template-columns: 1fr !important; }
          .bsp-compare     { font-size: .8rem; }
          .bsp-compare th, .bsp-compare td { padding: .625rem .75rem; }
        }
      `}} />
      <Navbar />

      {/* ── S1: HERO ────────────────────────────────────────────────── */}
      <section style={{ background: NAVY, borderBottom: `3px solid ${GOLD}`, padding: "88px 24px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
          {/* Left: headline + CTA */}
          <div style={{ flex: "1 1 440px" }}>
            {/* Live indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: ".625rem", marginBottom: "1.75rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: MONO, fontSize: ".714rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: GOLD_DIM }}>LP-BDL-001 &nbsp;|&nbsp; THE COMPLETE DOCUMENTATION INFRASTRUCTURE</span>
            </div>

            <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2.5rem,5vw,3.75rem)", color: "#FFF", lineHeight: 1.05, letterSpacing: "-.02em", marginBottom: "1.25rem" }}>
              New Carrier Document System
            </h1>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,.7)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 600 }}>
              Five compliance packets. 92 pages. Every template, checklist, and regulatory brief a new motor carrier needs — in one installation kit.
            </p>

            {/* Price block */}
            <div ref={heroCTARef} style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: ".5rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(3rem,6vw,4.5rem)", color: "#FFF", lineHeight: 1, letterSpacing: "-.02em" }}>$499</span>
                <span style={{ fontSize: ".9rem", color: "rgba(255,255,255,.4)" }}>One-time purchase. Lifetime access. Immediate download.</span>
              </div>
              <GoldCTA state={state} buy={buy} size="lg" />
              {error && <p style={{ color: "#f87171", fontSize: ".875rem", marginTop: ".75rem" }}>{error}</p>}
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,.65)", marginTop: ".875rem", lineHeight: 1.7 }}>
                Includes all five domain packets plus the Unified Folder Structure Guide and Folder Setup Walkthrough.
              </p>
            </div>
          </div>

          {/* Right: product image */}
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 280 }}>
              <div style={{ position: "absolute", inset: -8, background: `linear-gradient(135deg, rgba(212,144,10,0.15), transparent)`, borderRadius: 4 }} />
              <img
                src={IMG_BUNDLE}
                alt="Document System Bundle — LP-BDL-001"
                style={{ width: "100%", display: "block", position: "relative", boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,144,10,0.2)" }}
              />
              <div style={{ position: "absolute", bottom: -12, left: "50%", transform: "translateX(-50%)", background: GOLD, color: "#060e1b", fontFamily: MONO, fontSize: ".714rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: ".35rem 1rem", whiteSpace: "nowrap" }}>
                LP-BDL-001
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S2: VIDEO PREVIEW ──────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "64px 24px 72px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SectionRail label="FOLDER SETUP WALKTHROUGH — LP-VIDEO-001" />
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: 580 }}>
            Watch the 8-folder FMCSA audit defense system in action. This video walkthrough — included with every bundle — shows you exactly what goes where and how the Audit-Ready Grab Folder works.
          </p>

          {/* VIDEO_URL — replace with your YouTube/Vimeo embed URL */}
          {/* To activate: replace BUNDLE_VIDEO_URL below with your YouTube embed URL */}
          {/* e.g. https://www.youtube.com/embed/YOUR_VIDEO_ID */}
          <BundleVideoEmbed />
        </div>
      </section>

      {/* ── S3: WHAT'S INCLUDED ────────────────────────────────────── */}
      <section style={{ background: "#080f1e", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <SectionRail label="WHAT'S INCLUDED" />
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.7)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: 680 }}>
            The Document System Bundle contains every compliance document a new motor carrier needs for the first 18 months of operation. Five domain-specific packets covering authority, insurance, driver qualification, drug & alcohol, hours of service, vehicle maintenance, and audit preparation — plus the folder architecture that organizes it all.
          </p>

          {/* 5 Packets grid */}
          <div className="bsp-packet-grid" style={{ gap: "2px", marginBottom: "2px" }}>
            {PACKETS.map((p, i) => (
              <div key={i} style={{ background: CARD, borderLeft: `3px solid ${GOLD}`, padding: "1.75rem 2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".875rem", flexWrap: "wrap", gap: ".5rem" }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: MONO, fontSize: ".714rem", color: GOLD_DIM, letterSpacing: ".12em", display: "block", marginBottom: ".2rem" }}>{p.domain} &nbsp;·&nbsp; {p.code}</span>
                    <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.15rem", color: "#FFF", margin: 0, lineHeight: 1.2 }}>{p.title}</h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexShrink: 0 }}>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontFamily: MONO, fontSize: ".714rem", color: "rgba(255,255,255,.3)", display: "block" }}>{p.pages} pages</span>
                      <span style={{ fontFamily: MONO, fontSize: ".857rem", color: GOLD_DIM }}>{p.value} value</span>
                    </div>
                    {IMG_PKT[p.code] && (
                      <img
                        src={IMG_PKT[p.code]}
                        alt={p.title}
                        style={{ width: 56, height: 72, objectFit: "cover", display: "block", boxShadow: "0 4px 16px rgba(0,0,0,0.5)", flexShrink: 0 }}
                      />
                    )}
                  </div>
                </div>
                <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".4rem" }}>
                  {p.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: ".5rem", alignItems: "flex-start" }}>
                      <span style={{ color: GOLD, fontSize: ".714rem", flexShrink: 0, marginTop: ".2rem" }}>•</span>
                      <span style={{ fontSize: ".857rem", color: "rgba(255,255,255,.65)", lineHeight: 1.55 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 2 Bonuses */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }} className="bsp-bonus-grid">
            {BONUSES.map((b, i) => (
              <div key={i} style={{ background: "rgba(212,144,10,.04)", border: "1px solid rgba(212,144,10,.15)", borderLeft: `2px solid rgba(212,144,10,.4)`, padding: "1.5rem 2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".75rem" }}>
                  <div>
                    <span style={{ fontFamily: MONO, fontSize: ".714rem", color: GOLD_DIM, letterSpacing: ".12em", display: "block", marginBottom: ".2rem" }}>BONUS &nbsp;·&nbsp; {b.code}</span>
                    <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,.85)", margin: 0 }}>{b.title}</h3>
                  </div>
                  <span style={{ fontFamily: MONO, fontSize: ".714rem", color: "#4ade80", background: "rgba(74,222,128,.08)", padding: ".25rem .6rem", letterSpacing: ".12em", flexShrink: 0, marginLeft: ".5rem" }}>INCLUDED</span>
                </div>
                <p style={{ fontSize: ".875rem", color: "rgba(255,255,255,.5)", lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{__html: `@media(max-width:680px){ .bsp-bonus-grid { grid-template-columns: 1fr !important; } }`}} />
        </div>
      </section>

      {/* ── S3: THE MATH ────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SectionRail label="THE MATH" />

          <div style={{ background: CARD, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
            {/* Line items */}
            {LINE_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "80px 1fr auto",
                padding: ".875rem 1.5rem",
                background: i % 2 === 0 ? CARD : "#0a1220",
                borderBottom: "1px solid rgba(255,255,255,.04)",
                gap: "1rem", alignItems: "center",
              }}>
                <span style={{ fontFamily: MONO, fontSize: ".714rem", color: item.code ? GOLD_DIM : "transparent", letterSpacing: ".1em" }}>{item.code}</span>
                <span style={{ fontSize: ".9rem", color: item.code ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.55)" }}>{item.name}</span>
                <span style={{ fontFamily: MONO, fontSize: ".9rem", color: item.price === "Included" ? "#4ade80" : "rgba(255,255,255,.6)", textAlign: "right", whiteSpace: "nowrap" }}>{item.price}</span>
              </div>
            ))}
            {/* Totals */}
            <div style={{ padding: "1rem 1.5rem", background: "#0a1220", borderTop: "1px solid rgba(255,255,255,.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".5rem" }}>
                <span style={{ fontSize: ".9rem", color: "rgba(255,255,255,.5)" }}>Individual Total</span>
                <span style={{ fontFamily: MONO, fontSize: ".9rem", color: "rgba(255,255,255,.5)", textDecoration: "line-through" }}>$635</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".5rem" }}>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#FFF" }}>Bundle Price</span>
                <span style={{ fontFamily: MONO, fontSize: "1.25rem", fontWeight: 700, color: GOLD }}>$499</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: ".857rem", color: "#4ade80" }}>You Save</span>
                <span style={{ fontFamily: MONO, fontSize: ".857rem", color: "#4ade80" }}>$138</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2rem", borderLeft: `3px solid rgba(212,144,10,.4)`, padding: "1rem 1.25rem", background: "rgba(212,144,10,.04)" }}>
            <p style={{ fontSize: ".975rem", color: "rgba(255,255,255,.7)", lineHeight: 1.8, margin: 0 }}>
              The bundle exists because compliance is not modular. You cannot install authority protection without insurance continuity. You cannot document driver qualification without drug & alcohol program infrastructure. The domains connect. The bundle reflects that.
            </p>
          </div>
        </div>
      </section>

      {/* ── S4: WHO THIS IS FOR ─────────────────────────────────────── */}
      <section style={{ background: "#001030", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <SectionRail label="WHO THIS IS FOR" />
          <div className="bsp-who-grid" style={{ gap: "2px" }}>
            {WHO_FOR.map((w, i) => (
              <div key={i} style={{ background: CARD, borderTop: `3px solid ${GOLD}`, padding: "2rem 1.75rem" }}>
                <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.2rem", color: "#FFF", marginBottom: "1rem" }}>{w.title}</h3>
                <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.65)", lineHeight: 1.75, margin: 0 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: WHO THIS IS NOT FOR ────────────────────────────────── */}
      <section style={{ background: DARK, padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionRail label="WHO THIS IS NOT FOR" />
          <div style={{ background: "#0a0e18", border: "1px solid rgba(248,113,113,.15)", borderTop: "3px solid rgba(248,113,113,.4)", padding: "2rem 2.25rem", marginBottom: "2rem" }}>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.75)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              This bundle is documentation infrastructure. It is not:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".875rem" }}>
              {[
                "A substitute for understanding the regulations. You still need to know why these documents exist — not just that they exist.",
                "A guarantee of audit success. A filing cabinet full of documents is not a system. You must implement, maintain, and update.",
                "Guided implementation. If you want Station Custodian verification, quarterly reviews, and structured accountability — that's The Standard, not the bundle.",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(248,113,113,.7)", flexShrink: 0, fontSize: ".857rem", marginTop: ".15rem" }}>•</span>
                  <span style={{ fontSize: ".9rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7 }}>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
              <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75, margin: 0 }}>
                If you need someone to walk you through the installation, verify your work, and catch drift before an investigator does — the bundle is not enough.
              </p>
            </div>
          </div>
          <Link
            to="/launchpath-standard"
            style={{ fontFamily: MONO, fontSize: ".857rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: GOLD, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".75"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Learn About The Standard →
          </Link>
        </div>
      </section>

      {/* ── S6: WHAT YOU GET ────────────────────────────────────────── */}
      <section style={{ background: "#080f1e", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SectionRail label="WHAT YOU GET" />
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {WHAT_YOU_GET.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem 1.25rem", background: i % 2 === 0 ? CARD : "#0a1220", borderLeft: `3px solid ${GOLD}` }}>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: ".975rem", color: "rgba(255,255,255,.85)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: HOW IT WORKS ────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SectionRail label="HOW IT WORKS" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }} className="bsp-steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} style={{ background: CARD, padding: "2rem 1.75rem", borderTop: `3px solid ${GOLD}` }}>
                <p style={{ fontFamily: MONO, fontSize: "2rem", fontWeight: 700, color: "rgba(212,144,10,.25)", lineHeight: 1, marginBottom: "1rem", letterSpacing: "-.02em" }}>{s.n}</p>
                <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.25rem", color: "#FFF", marginBottom: ".875rem" }}>Step {parseInt(s.n)}: {s.title}</h3>
                <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{__html: `@media(max-width:680px){ .bsp-steps-grid { grid-template-columns: 1fr !important; } }`}} />
        </div>
      </section>

      {/* ── S8: PRICING BLOCK (REPEAT) ──────────────────────────────── */}
      <section style={{ background: NAVY, padding: "88px 24px 96px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ fontFamily: MONO, fontSize: ".714rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: GOLD_DIM, marginBottom: "1rem" }}>LP-BDL-001 &nbsp;|&nbsp; NEW CARRIER DOCUMENT SYSTEM</p>
          <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(3rem,6vw,4.5rem)", color: GOLD, lineHeight: 1, marginBottom: ".5rem", letterSpacing: "-.02em" }}>$499</p>
          <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.45)", marginBottom: "2.5rem" }}>
            One-time purchase. Lifetime access. 92 pages + folder guide + setup video.
          </p>
          <GoldCTA state={state} buy={buy} size="lg" />
          {error && <p style={{ color: "#f87171", fontSize: ".875rem", marginTop: ".75rem" }}>{error}</p>}
          <p style={{ fontFamily: MONO, fontSize: ".714rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.2)", marginTop: "1.25rem" }}>
            Secure checkout via Stripe &nbsp;·&nbsp; Immediate download after purchase
          </p>
        </div>
      </section>

      {/* ── S9: COMPARISON TABLE ────────────────────────────────────── */}
      <section style={{ background: "#080f1e", padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <SectionRail label="COMPARE YOUR OPTIONS" />
          <div style={{ overflowX: "auto" }}>
            <table className="bsp-compare" style={{ width: "100%", borderCollapse: "collapse", background: CARD }}>
              <thead>
                <tr style={{ background: "#0a1220" }}>
                  <th style={{ color: "rgba(255,255,255,.4)", width: "36%" }}>Feature</th>
                  <th style={{ color: "rgba(255,255,255,.45)", textAlign: "center" }}>Individual Packets</th>
                  <th style={{ color: GOLD, background: "rgba(212,144,10,.05)", textAlign: "center" }}>Document System Bundle</th>
                  <th style={{ color: "rgba(255,255,255,.45)", textAlign: "center" }}>The Standard</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? CARD : "#0a1220" }}>
                    <td style={{ color: "rgba(255,255,255,.75)" }}>{row.feature}</td>
                    <td style={{ textAlign: "center", color: "rgba(255,255,255,.5)" }}>
                      {typeof row.ind === "boolean" ? (row.ind ? <Check /> : <Cross />) : row.ind}
                    </td>
                    <td style={{ textAlign: "center", background: "rgba(212,144,10,.04)", color: GOLD, fontWeight: row.bundle === "$499" ? 700 : 400 }}>
                      {typeof row.bundle === "boolean" ? (row.bundle ? <Check /> : <Cross />) : row.bundle}
                    </td>
                    <td style={{ textAlign: "center", color: "rgba(255,255,255,.55)" }}>
                      {typeof row.std === "boolean" ? (row.std ? <Check /> : <Cross />) : row.std}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "flex-start" }}>
            <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.5)", lineHeight: 1.75, maxWidth: 580 }}>
              Not sure which option fits? Start with Ground 0 — the free orientation module. You'll know which path is right by the end.
            </p>
            <Link to="/reach-diagnostic" style={{ fontFamily: MONO, fontSize: ".857rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: GOLD, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.opacity = ".75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Take the REACH Diagnostic →
            </Link>
          </div>
        </div>
      </section>

      {/* ── S10: FAQ ────────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "72px 24px 80px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SectionRail label="QUESTIONS" />
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} className="bsp-faq-row">
                <button
                  className="bsp-faq-btn"
                  data-testid={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ fontFamily: MONO, fontSize: ".975rem", fontWeight: 600, color: openFaq === i ? GOLD : "rgba(255,255,255,.85)" }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: GOLD, fontSize: "1.25rem", flexShrink: 0, lineHeight: 1, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8, paddingBottom: "1.25rem", margin: 0 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S11: FOOTER CTA ─────────────────────────────────────────── */}
      <section style={{ background: NAVY, borderTop: `3px solid ${GOLD}`, padding: "80px 24px 88px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.25rem)", color: "#FFF", lineHeight: 1.2, marginBottom: "2rem" }}>
            The documentation infrastructure for your first 18 months.
          </p>
          <GoldCTA state={state} buy={buy} label="Get the Document System — $499" size="lg" />
          {error && <p style={{ color: "#f87171", fontSize: ".875rem", marginTop: ".75rem" }}>{error}</p>}
        </div>
      </section>

      <FooterSection />
      <SystemAccessStrip visible={stickyVisible} state={state} buy={buy} />
    </div>
  );
}
