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
        background: `linear-gradient(to right, rgba(11,22,40,0.97) 55%, rgba(11,22,40,0.72) 100%), url("${HERO_LETTER_URL}") center/cover no-repeat`,
        overflow: "hidden",
      }}
    >
      {/* Gold top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#C8933F", zIndex: 10 }} />

      {/* System initialization vertical scan line */}
      <div className="hero-scan-vline" />
      <div className="hero-scan-init-label">SYSTEM INITIALIZATION — LP-OS v3.2</div>

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
        @keyframes hero-init-flicker {
          0%, 100% { opacity: 1; }
          48% { opacity: 1; }
          50% { opacity: 0.3; }
          52% { opacity: 1; }
          78% { opacity: 1; }
          80% { opacity: 0.15; }
          82% { opacity: 1; }
        }
        @keyframes hero-data-stream {
          0%   { transform: translateX(-100%); opacity: 0; }
          8%   { opacity: 0.6; }
          92%  { opacity: 0.6; }
          100% { transform: translateX(220%); opacity: 0; }
        }
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
          animation: hero-init-flicker 2.4s ease-out 0.2s forwards;
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

          {/* Subhead — revised per LP-WEB-D */}
          <p
            className="hero-sub"
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.82)", lineHeight: 1.8, maxWidth: 620,
              marginBottom: 36,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            Your MC number is active. That does not mean the operation behind it is protected. The REACH Diagnostic identifies where FMCSA can already reach your business — in under five minutes.
          </p>

          {/* CTAs — primary full weight, secondary ghost/text */}
          <div
            style={{
              display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <Link
              to="/reach-diagnostic"
              data-testid="hero-reach-cta"
              className="lp-scan-btn"
              style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "0.9rem", letterSpacing: "0.10em", textTransform: "uppercase",
                color: "#0b1628", background: GOLD,
                padding: "1.1rem 2.5rem", textDecoration: "none",
                transition: "background 0.2s",
                minHeight: 52,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#e8a958"}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >
              Run REACH Diagnostic →
            </Link>
            <Link
              to="/ground-0-briefing"
              data-testid="hero-ground0-cta"
              style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
                fontSize: "0.857rem", letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.40)", background: "transparent",
                border: "none", padding: "4px 0", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.40)"; }}
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
          .hero-headline { font-size: 44px !important; }
          .hero-headline-two { font-size: 44px !important; }
          .hero-sub { font-size: 17px !important; }
        }
        @media (min-width: 1025px) {
          .hero-headline { font-size: 60px !important; }
          .hero-headline-two { font-size: 56px !important; }
          .hero-sub { font-size: 18px !important; }
        }
      `}} />
    </section>
  );
}
