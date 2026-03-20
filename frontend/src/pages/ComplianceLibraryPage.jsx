import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

/* ── Tokens ───────────────────────────────────────────────────── */
const GOLD  = "#d4900a";
const NAVY  = "#0b1628";
const BG    = "#0d1c30";
const BG2   = "#091220";
const CARD  = "#0c1828";
const MONO  = "'IBM Plex Mono', monospace";
const COND  = "'Playfair Display', serif";
const SANS  = "'Atkinson Hyperlegible', sans-serif";
const BORDER = "rgba(255,255,255,0.08)";

/* ── Individual Packets ──────────────────────────────────────── */
const PACKETS = [
  {
    sku: "LP-PKT-001",
    title: "New Entrant Compliance Packet",
    price: "$97",
    domain: "Authority & New Entrant",
    desc: "The foundational compliance packet for new motor carrier authority. Covers FMCSA filing verification, New Entrant Safety Audit preparation, and authority maintenance protocols.",
    gumroadUrl: "https://launchpathedu.gumroad.com/l/NewEntrantCompliancePacket",
  },
  {
    sku: "LP-PKT-002",
    title: "Drug & Alcohol Compliance Packet",
    price: "$97",
    domain: "D&A Program",
    desc: "Complete Drug & Alcohol program structure for owner-operators and small fleets. Includes Clearinghouse enrollment protocol, pre-employment testing requirements, and program documentation.",
    gumroadUrl: "https://launchpathedu.gumroad.com/l/DrugAlcoholCompliancePacket",
  },
  {
    sku: "LP-PKT-003",
    title: "HOS & Dispatch Compliance Packet",
    price: "$127",
    domain: "Hours of Service",
    desc: "Hours-of-service documentation system covering ELD compliance, log reconciliation, and dispatch record requirements under 49 CFR Part 395.",
    gumroadUrl: "https://launchpathedu.gumroad.com/l/HOSDispatchCompliancePacket",
  },
  {
    sku: "LP-PKT-004",
    title: "Maintenance & Unit File Packet",
    price: "$127",
    domain: "Vehicle Maintenance",
    desc: "Vehicle maintenance documentation system including DVIR requirements, periodic inspection scheduling, and unit file structure under 49 CFR Part 396.",
    gumroadUrl: "https://launchpathedu.gumroad.com/l/Maintenance_UnitFilePacket",
  },
  {
    sku: "LP-PKT-005",
    title: "Insurance & Authority Packet",
    price: "$127",
    domain: "Insurance Continuity",
    desc: "BMC-91 filing integrity, coverage verification schedule, and policy gap prevention protocol. Addresses the most common cause of authority revocation.",
    gumroadUrl: "https://launchpathedu.gumroad.com/l/Insurance_Authority",
  },
];

/* ── What's Included in bundle ───────────────────────────────── */
const BUNDLE_ITEMS = [
  "All five domain compliance packets",
  "Unified folder architecture and file naming system",
  "0–30–60–90 Day implementation calendar",
  "Master compliance checklist (cross-domain)",
  "Audit preparation packet",
];

/* ── Guided Standard inclusions ─────────────────────────────── */
const GUIDED_ITEMS = [
  "All five compliance packets",
  "Unified folder structure",
  "0–30–90 Day Implementation Guide",
  "Full video curriculum (17+ hours)",
  "Five Station Custodian verification checkpoints",
  "Direct Q&A access throughout the 90-day window",
  "Audit-readiness confirmation at completion",
];

/* ── Comparison matrix rows ──────────────────────────────────── */
const MATRIX = [
  { label: "Domain compliance packets",          ind: "1 per purchase", bundle: "All 5", guided: "All 5" },
  { label: "Folder architecture / structure",    ind: "—",              bundle: "✓",      guided: "✓" },
  { label: "Implementation calendar",            ind: "—",              bundle: "✓",      guided: "✓" },
  { label: "Video curriculum (17+ hrs)",         ind: "—",              bundle: "—",      guided: "✓" },
  { label: "Verification checkpoints (×5)",      ind: "—",              bundle: "—",      guided: "✓" },
  { label: "Direct Q&A access (90-day window)",  ind: "—",              bundle: "—",      guided: "✓" },
  { label: "Audit-readiness confirmation",       ind: "—",              bundle: "—",      guided: "✓" },
  { label: "Entry requirement",                  ind: "None — self-directed", bundle: "None — self-directed", guided: "Ground 0 completion required" },
  { label: "Price",                              ind: "$97–$127 each",  bundle: "$497",   guided: "$2,500" },
];

/* ─────────────────────────────────────────────────────────────── */
export default function ComplianceLibraryPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#FFF", fontFamily: SANS }}>
      <Navbar />

      {/* ══ 1. HERO ═══════════════════════════════════════════════ */}
      <div style={{ position: "relative", borderBottom: `3px solid ${GOLD}`, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/vpafe5mz_compliance-docs.png)",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,14,32,0.94) 45%, rgba(6,14,32,0.75) 100%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 5rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "1.25rem" }}>
            LP-SYS-LIBRARY | STANDARDS LIBRARY
          </p>
          <h1 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 620 }}>
            The LaunchPath Operating Standards Library
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", marginBottom: "2rem" }}>
            Three paths to audit-ready compliance infrastructure:
          </p>

          {/* 3 path cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 820 }} className="path-cards">
            {[
              { tier: "TIER 1", label: "Individual Packets", sub: "Install one domain at a time", price: "$97–$127" },
              { tier: "TIER 2", label: "Document System Bundle", sub: "Install the full structure yourself", price: "$497" },
              { tier: "TIER 3", label: "LaunchPath Standard", sub: "Guided 90-day implementation with verification", price: "$2,500" },
            ].map((t) => (
              <div key={t.tier} style={{ background: "rgba(10,20,40,0.80)", border: `1px solid rgba(212,144,10,0.25)`, padding: "1.25rem 1.25rem 1.5rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.4rem" }}>{t.tier}</p>
                <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.15rem", color: "#FFF", lineHeight: 1.2, marginBottom: "0.4rem" }}>{t.label}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.55, marginBottom: "0.625rem" }}>{t.sub}</p>
                <p style={{ fontFamily: MONO, fontSize: "0.85rem", fontWeight: 700, color: GOLD }}>{t.price}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", marginTop: "1.75rem", fontStyle: "italic" }}>
            Choose based on where you are and how much structure you need.
          </p>
        </div>
      </div>

      {/* ══ 2. INDIVIDUAL PACKETS ══════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.75rem" }}>
            TIER 1 | INDIVIDUAL PACKETS — $97–$127 EACH
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.75rem" }}>
            Install one domain at a time.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600, marginBottom: "3rem" }}>
            Each packet covers one compliance domain completely. Buy what you need, install it, then move to the next.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="product-grid">
            {PACKETS.map((p) => <PacketCard key={p.sku} product={p} />)}
          </div>
        </div>
      </div>

      {/* ══ 3. $497 BUNDLE ════════════════════════════════════════ */}
      <div style={{ background: BG2, borderTop: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }} className="bundle-grid">
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>
                LP-SPEC-001 | TIER 2 — THE COMPLETE DIY SYSTEM
              </p>
              <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FFF", letterSpacing: "-0.01em", marginBottom: "0.4rem" }}>
                New Carrier Document System
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "1.15rem", color: GOLD, fontWeight: 700, marginBottom: "0.25rem" }}>
                $497 <span style={{ fontFamily: MONO, fontSize: "0.70rem", fontWeight: 400, color: "rgba(212,144,10,0.55)" }}>($634 if purchased separately)</span>
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.75rem", lineHeight: 1.65, maxWidth: 480 }}>
                Every compliance packet, plus the folder architecture and implementation calendar that turns five documents into one operating system. The complete DIY path.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {BUNDLE_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.78rem", color: GOLD, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>→</span>
                    <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <a
                href="https://launchpathedu.gumroad.com/l/NewCarrierDocumentSystem"
                data-testid="bundle-buy-btn"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
              >
                Download Bundle — $497
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 4. BRIDGE COPY — WHY GUIDED? ══════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.5rem" }}>
            LP-DOC-001 | THE DIFFERENCE
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "2rem" }}>
            Why Guided?
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            The $497 Document System gives you every form, template, and checklist you need. If you know what you're doing — or you're willing to figure it out — it's everything required to build an audit-ready operation.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            But most new carriers don't fail because they lacked the documents. They fail because the documents weren't installed in the right order, at the right time, with the right verification.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.85 }}>
            The LaunchPath Standard exists for operators who want someone watching the installation — not doing it for them, but confirming it's done right before the audit window closes.
          </p>
        </div>
      </div>

      {/* ══ 5. $2,500 GUIDED STANDARD ═════════════════════════════ */}
      <div style={{ background: BG2, borderTop: `1px solid rgba(212,144,10,0.20)`, borderBottom: `1px solid rgba(212,144,10,0.20)`, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Price-anchoring quote */}
          <div style={{ borderLeft: `3px solid rgba(212,144,10,0.40)`, paddingLeft: "1.5rem", marginBottom: "3rem", maxWidth: 560 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.80)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "0.5rem" }}>
              "If this feels expensive, you are likely not ready. If it feels reasonable, you are already thinking like an operator."
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", color: "rgba(212,144,10,0.60)", letterSpacing: "0.08em", margin: 0 }}>
              — Vince Lawrence, Station Custodian
            </p>
          </div>

          <p style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.5rem" }}>
            LP-STD-001 | TIER 3 — THE GUIDED IMPLEMENTATION
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#FFF", marginBottom: "0.4rem" }}>
            The LaunchPath Standard — $2,500
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "start", marginTop: "2rem" }} className="guided-grid">
            <div>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                The difference between the DIY system and the guided implementation isn't the documents — it's whether someone with 25 years in compliance is watching to make sure they're installed correctly before FMCSA arrives.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                The Standard includes every packet, five verification checkpoints, and direct access to the Station Custodian throughout the 90-day window.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.85, marginBottom: "2rem" }}>
                Entry is through Ground 0.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {GUIDED_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.78rem", color: GOLD, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>→</span>
                    <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: CARD, border: `1px solid rgba(212,144,10,0.25)`, padding: "2rem", alignSelf: "start" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.5rem" }}>
                LPOS V1.0 | ENTRY POINT
              </p>
              <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.75rem", color: GOLD, lineHeight: 1.1, marginBottom: "1.25rem" }}>
                Access begins with Ground 0.
              </p>
              <Link
                to="/ground-0-briefing"
                data-testid="guided-ground0-btn"
                style={{ display: "block", textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1.1rem 1.5rem", textDecoration: "none", marginBottom: "1rem", transition: "background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
                onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
              >
                INITIATE GROUND 0 →
              </Link>
              <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, textAlign: "center", margin: 0 }}>
                Ground 0 is free. It takes 4–6 minutes.<br />
                Complete it to request admission to the next cohort.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 6. COMPARISON MATRIX ══════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "2rem" }}>
            LP-DOC-002 | COMPARISON MATRIX
          </p>

          <div style={{ border: `1px solid ${BORDER}`, overflow: "hidden" }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderBottom: `1px solid ${BORDER}`, background: "rgba(212,144,10,0.06)" }}>
              <div style={{ padding: "1rem 1.25rem", fontFamily: MONO, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)" }}> </div>
              {[
                { label: "Individual Packets", price: "$97–$127 ea." },
                { label: "Document System Bundle", price: "$497" },
                { label: "LaunchPath Standard", price: "$2,500" },
              ].map((col) => (
                <div key={col.label} style={{ padding: "1rem 1.25rem", borderLeft: `1px solid ${BORDER}` }}>
                  <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "1rem", color: "#FFF", lineHeight: 1.2, marginBottom: "0.2rem" }}>{col.label}</p>
                  <p style={{ fontFamily: MONO, fontSize: "0.75rem", color: GOLD, fontWeight: 700 }}>{col.price}</p>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {MATRIX.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", borderBottom: i < MATRIX.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                <div style={{ padding: "0.875rem 1.25rem", fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.55)" }}>{row.label}</div>
                {[row.ind, row.bundle, row.guided].map((val, j) => {
                  const isCheck = val === "✓";
                  const isDash  = val === "—";
                  const isLast  = j === 2;
                  return (
                    <div key={j} style={{ padding: "0.875rem 1.25rem", borderLeft: `1px solid ${BORDER}`, fontFamily: isDash ? MONO : SANS, fontSize: "0.875rem", color: isCheck ? "#4caf50" : isDash ? "rgba(255,255,255,0.20)" : isLast ? GOLD : "rgba(255,255,255,0.72)", fontWeight: isCheck ? 700 : 400 }}>
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 7. OUTCOME / TRUST STATEMENT ══════════════════════════ */}
      <div style={{ background: BG2, padding: "3.5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", borderLeft: `3px solid rgba(212,144,10,0.35)`, paddingLeft: "1.75rem" }}>
          <p style={{ fontFamily: SANS, fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.60)", lineHeight: 1.82, marginBottom: "0.75rem" }}>
            Every packet in this library is built from the same documentation architecture used in the full LaunchPath Standard. The difference is whether you install it yourself — or with oversight.
          </p>
        </div>
      </div>

      {/* ══ 8. FINAL CTA ══════════════════════════════════════════ */}
      <div style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.25rem" }}>
            LPOS V1.0 | GROUND 0 ENTRY
          </p>
          <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "#FFF", lineHeight: 1.1, marginBottom: "2rem" }}>
            Not sure which path fits your situation?
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/ground-0-briefing"
              data-testid="library-ground0-cta"
              style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "1.1rem 2.25rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
              onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
            >
              INITIATE GROUND 0 →
            </Link>
            <Link
              to="/standard"
              data-testid="library-standard-link"
              style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, background: "transparent", padding: "1.1rem 2.25rem", textDecoration: "none", border: `1px solid rgba(212,144,10,0.45)`, transition: "border-color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.45)"; }}
            >
              VIEW THE STANDARD →
            </Link>
          </div>
        </div>
      </div>

      {/* ══ Disclaimer ════════════════════════════════════════════ */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.7, maxWidth: 680, margin: "0 auto", fontStyle: "italic" }}>
          All documents current as of March 2026. Verify current regulatory requirements at ecfr.gov. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
        </p>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 720px) {
          .path-cards { grid-template-columns: 1fr !important; }
          .product-grid { grid-template-columns: 1fr !important; }
          .bundle-grid { grid-template-columns: 1fr !important; }
          .guided-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .path-cards { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Packet card ─────────────────────────────────────────────── */
function PacketCard({ product }) {
  return (
    <div
      data-testid={`product-card-${product.sku.toLowerCase()}`}
      style={{ background: CARD, borderTop: `2px solid rgba(212,144,10,0.35)`, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.3rem" }}>{product.sku}</p>
          <span style={{ fontFamily: MONO, fontSize: "0.60rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", border: `1px solid rgba(255,255,255,0.12)`, padding: "0.15rem 0.5rem" }}>
            {product.domain}
          </span>
        </div>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "1.35rem", color: GOLD, flexShrink: 0 }}>{product.price}</span>
      </div>

      <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.2rem", color: "#FFF", lineHeight: 1.25 }}>{product.title}</h3>
      <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.72, flex: 1 }}>{product.desc}</p>

      <a
        href={product.gumroadUrl}
        data-testid={`buy-btn-${product.sku.toLowerCase()}`}
        target={product.gumroadUrl !== "#" ? "_blank" : undefined}
        rel="noopener noreferrer"
        style={{ display: "block", textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 1.5rem", textDecoration: "none", transition: "background 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#e8a520"; }}
        onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
      >
        Get This Packet — {product.price}
      </a>
    </div>
  );
}
