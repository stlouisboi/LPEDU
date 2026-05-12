import { Link } from '../compat/Link';
import { useState, useEffect, useRef } from "react";

const HERO_LETTER_URL = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png";
const GOLD = "#C8933F";


const RISK_ITEMS = [
  "First document request exposes missing DQ files",
  "$10,000–$25,000+ in remediation, downtime, insurance increase",
  <>Conditional or Unsatisfactory <a href="/knowledge-center/fmcsa-safety-rating-explained" style={{ color: "#C8933F", textDecoration: "none" }}>rating</a> — authority at risk</>,
  "87 days on average to the first compliance failure",
];

const SAFE_ITEMS = [
  "Audit-ready documentation",
  "Structured compliance systems",
  "Protected authority",
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      style={{
        position: "relative",
        background: `linear-gradient(to right, rgba(11,22,40,0.63) 30%, rgba(11,22,40,0.55) 60%, rgba(11,22,40,0.32) 100%), url("${HERO_LETTER_URL}") center/cover no-repeat`,
        overflow: "hidden",
      }}
    >
      {/* Gold top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#C8933F", zIndex: 10 }} />

      {/* System initialization vertical scan line */}
      <div className="hero-scan-vline" />
      <div className="hero-scan-init-label">SYSTEM INITIALIZATION — LP-OS v3.2</div>
      {/* Terminal boot-log lines — appear after typewriter */}
      <div className="hero-boot-line hero-boot-line-1">MODULE: 49 CFR COMPLIANCE · INDEXED</div>
      <div className="hero-boot-line hero-boot-line-2">MODULE: FMCSA AUTHORITY PROTOCOLS · ACTIVE</div>
      <div className="hero-boot-line hero-boot-line-3">STATUS: OPERATIONAL · MONITORING</div>

      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "200px",
      }} />

      {/* Blueprint line grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(197,160,89,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.04) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />
      {/* CRT scan-line overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)" }} />

      {/* One-time load animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes hero-init-scan {
          0%   { top: -4px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
        /* Typewriter reveal for SYSTEM INITIALIZATION label */
        @keyframes hero-typewriter {
          from { max-width: 0; opacity: 1; }
          to   { max-width: 380px; opacity: 1; }
        }
        @keyframes hero-cursor-blink {
          0%, 100% { border-color: rgba(200,147,63,0.55); }
          50%       { border-color: transparent; }
        }
        @keyframes hero-cursor-fade {
          to { border-color: transparent; }
        }
        @keyframes hero-data-stream {
          0%   { transform: translateX(-100%); opacity: 0; }
          8%   { opacity: 0.6; }
          92%  { opacity: 0.6; }
          100% { transform: translateX(220%); opacity: 0; }
        }
        /* Single entrance glow pulse for REACH button — one beat, no loop */
        @keyframes hero-btn-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(200,147,63,0); }
          35%  { box-shadow: 0 0 28px 10px rgba(200,147,63,0.70), 0 0 52px 20px rgba(200,147,63,0.26); }
          100% { box-shadow: 0 0 0 0 rgba(200,147,63,0); }
        }
        /* Repeating soft ring — starts after entrance flash */
        @keyframes hero-btn-ring {
          0%   { box-shadow: 0 0 0 0 rgba(200,147,63,0.42); }
          70%  { box-shadow: 0 0 0 14px rgba(200,147,63,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,147,63,0); }
        }
        /* Boot-log lines appear after typewriter ends */
        @keyframes hero-boot-fadein {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .hero-boot-line {
          position: absolute; right: 24px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.524rem; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(200,147,63,0.30); opacity: 0;
          text-align: right; pointer-events: none; z-index: 6;
        }
        .hero-boot-line-1 { top: 34px; animation: hero-boot-fadein 0.5s ease forwards 2.9s; }
        .hero-boot-line-2 { top: 47px; animation: hero-boot-fadein 0.5s ease forwards 3.3s; }
        .hero-boot-line-3 { top: 60px; animation: hero-boot-fadein 0.5s ease forwards 3.7s; color: rgba(34,197,94,0.38); }
        /* Original horizontal scan (top→bottom) */
        .hero-scan-vline {
          position: absolute;
          left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(200,147,63,0.0) 15%, rgba(200,147,63,0.8) 48%, rgba(200,147,63,0.8) 52%, rgba(200,147,63,0.0) 85%, transparent 100%);
          box-shadow: 0 0 12px rgba(200,147,63,0.6), 0 0 4px rgba(200,147,63,0.9);
          animation: hero-init-scan 1.8s cubic-bezier(0.4,0,0.6,1) 0.3s forwards;
          z-index: 5; pointer-events: none;
        }
        /* NEW: 1px vertical gold scan line sweeping left→right at 5% opacity */
        @keyframes hero-vscan-sweep {
          0%   { left: -1px; opacity: 0; }
          3%   { opacity: 1; }
          97%  { opacity: 0.7; }
          100% { left: 100%; opacity: 0; }
        }
        .hero-vscan-line {
          position: absolute;
          top: 0; bottom: 0; width: 1px;
          background: rgba(200, 147, 63, 0.05);
          box-shadow: 0 0 6px rgba(200,147,63,0.18), 0 0 2px rgba(200,147,63,0.30);
          animation: hero-vscan-sweep 2.8s cubic-bezier(0.25,0,0.55,1) 0.6s forwards;
          z-index: 6; pointer-events: none;
        }
        .hero-scan-init-label {
          position: absolute; top: 18px; right: 24px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.625rem; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: rgba(200,147,63,0.55);
          white-space: nowrap; overflow: hidden; max-width: 0;
          border-right: 1px solid rgba(200,147,63,0.55);
          animation:
            hero-typewriter 2.4s steps(36, end) 0.5s forwards,
            hero-cursor-blink 0.55s step-end 0.5s 6,
            hero-cursor-fade 0.3s ease 3.9s forwards;
          z-index: 6; pointer-events: none;
        }
        .hero-sweep-line {
          position: absolute; top: 0; left: 0; width: 30%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(197,160,89,0.04), transparent);
          animation: hero-data-stream 2.2s ease-in-out 0.4s forwards;
          z-index: 1; pointer-events: none;
        }
        .lp-scan-btn { position: relative; overflow: hidden; }
        .lp-scan-btn::after {
          content: ""; position: absolute; top: 0; left: 0;
          width: 35%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .lp-scan-btn:hover::after { animation: lp-sweep 0.55s ease-out forwards; }
        @keyframes lp-sweep {
          0%   { transform: translateX(-100%); opacity: 0.5; }
          100% { transform: translateX(300%); opacity: 0; }
        }
        .hero-reach-btn-pulse {
          animation:
            hero-btn-pulse 1.3s cubic-bezier(0.4, 0, 0.6, 1) 1.4s 1,
            hero-btn-ring 2.6s ease-out 4s infinite;
        }
      `}} />
      <div className="hero-sweep-line" />
      <div className="hero-vscan-line" />

      {/* Main grid */}
      <div
        className="hero-grid"
        style={{
          position: "relative", zIndex: 1,
          maxWidth: 860, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr",
          padding: "120px 56px 100px",
        }}
      >

        {/* ── HERO CONTENT — single column per LP-WEB-D ── */}
        <div className="hero-left" style={{ background: "rgba(5,12,24,0.55)", padding: "32px 36px", margin: "-32px -36px", backdropFilter: "brightness(0.92)" }}>

          {/* Category label */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: "#C8933F", flexShrink: 0 }} />
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8933F", margin: 0,
            }}>
              NEW MOTOR CARRIER AUTHORITY
            </p>
          </div>

          {/* H1 — retain as-is */}
          <h1 style={{ margin: 0 }}>
            <span
              className="hero-headline"
              style={{
                display: "block", fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontWeight: 900, lineHeight: 1.05, color: "#FFFFFF", marginBottom: 6,
                letterSpacing: "-0.03em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              You Didn't Start This Authority
            </span>
            <span
              className="hero-headline hero-headline-two"
              style={{
                display: "block", fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontWeight: 900, lineHeight: 1.05, color: "#C8933F",
                letterSpacing: "-0.03em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              to Lose It in Your First Audit.
            </span>
          </h1>

          {/* Gold separator */}
          <div style={{ width: 40, height: 2, background: "#C8933F", margin: "28px 0 24px" }} />

          {/* Subhead — LP-WEB-012 */}
          <p
            className="hero-sub"
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.82)", lineHeight: 1.8, maxWidth: 620,
              marginBottom: 24,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            FMCSA has 16 automatic failure violations that can end your authority in a single audit — and that audit can arrive within 90 days of receiving your operating authority. LP-OS is a sequenced compliance implementation system for 1–20-truck carriers that closes those failure points from Day 1, before the inspector opens your file.
          </p>

          {/* Problem bullets — LP-WEB-012 */}
          <div
            style={{
              display: "flex", flexDirection: "column", gap: 8,
              maxWidth: 620, marginBottom: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.18s, transform 0.6s ease 0.18s",
            }}
          >
            {[
              "16 automatic failure violations can end your authority with a single hit — drug and alcohol, driver qualification, insurance, or maintenance.",
              "New-entrant audits are required within your first year; some carriers receive the audit call within 90 days of authority.",
              "CSA scores and roadside violations don't stay on the safety side. They reach your insurance premiums and can make you uninsurable.",
            ].map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#C8933F", flexShrink: 0, marginTop: 4, letterSpacing: "0.04em" }}>—</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.825rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>{line}</p>
              </div>
            ))}
          </div>

          {/* Solution line — LP-WEB-012 */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.80)", fontSize: "0.906rem", lineHeight: 1.7,
              maxWidth: 620, marginBottom: 28,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.21s, transform 0.6s ease 0.21s",
            }}
          >
            LP-OS organizes your compliance position into one auditable structure — so you know exactly what FMCSA sees when they open your file, and what needs to close before they do.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            {/* Split-panel REACH button — LP-WEB-012 spec */}
            <Link
              to="/reach-diagnostic"
              data-testid="hero-reach-cta"
              className="hero-reach-btn-pulse"
              style={{
                display: "inline-flex", alignItems: "stretch",
                border: `1px solid #C9A84C`, borderRadius: 4,
                textDecoration: "none", overflow: "hidden",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <span style={{ background: "#C9A84C", padding: "13px 14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L10 6L1 11V1Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="0.5" strokeLinejoin="round"/>
                </svg>
              </span>
              <span style={{ background: "transparent", padding: "13px 22px", display: "flex", alignItems: "center", fontFamily: "'Inter', Helvetica, sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", color: "#C9A84C" }}>
                Run REACH Diagnostic
              </span>
              <span style={{ background: "transparent", borderLeft: "1px solid #C9A84C", padding: "13px 14px", display: "flex", alignItems: "center", color: "#C9A84C", fontSize: 14 }}>
                →
              </span>
            </Link>

            {/* Support text */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.38)", letterSpacing: "0.02em", margin: 0 }}>
              Takes under 5 minutes. No email. No sales call. Instant exposure map.
            </p>

            {/* Trust line */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "4px 0 0", maxWidth: 480 }}>
              25+ years in safety and compliance implementation. U.S. Navy veteran. OSHA 30-Hour certified. Built for carriers who answer to the work, not the pitch.
            </p>

            {/* Secondary CTA */}
            <Link
              to="/ground-0-briefing"
              data-testid="hero-ground0-cta"
              style={{
                display: "inline-flex", alignItems: "center", marginTop: 4,
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
                fontSize: "0.857rem", letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.60)", background: "transparent",
                border: "none", padding: "4px 0", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.60)"; }}
            >
              Begin Ground 0 →
            </Link>
          </div>
        </div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style dangerouslySetInnerHTML={{__html: `
      `}} />
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 680px) {
          .hero-grid {
            padding: 80px 20px 64px !important;
          }
          .hero-left { margin: -32px -20px !important; }
          .hero-headline { font-size: 32px !important; }
          .hero-headline-two { font-size: 32px !important; }
          .hero-sub { font-size: 16px !important; }
        }
        @media (min-width: 681px) and (max-width: 1024px) {
          .hero-grid { padding: 88px 36px 72px !important; }
          .hero-headline { font-size: 52px !important; }
          .hero-headline-two { font-size: 48px !important; }
          .hero-sub { font-size: 17px !important; }
        }
        @media (min-width: 1025px) {
          .hero-headline { font-size: 74px !important; }
          .hero-headline-two { font-size: 70px !important; }
          .hero-sub { font-size: 18px !important; }
        }
      `}} />
    </section>
  );
}
