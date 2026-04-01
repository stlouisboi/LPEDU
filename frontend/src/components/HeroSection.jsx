import { Link } from '../compat/Link';
import { useState, useEffect, useRef } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const HERO_LETTER_URL = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png";
const GOLD = "#C8933F";


const RISK_ITEMS = [
  "First document request exposes missing DQ files",
  "$10,000–$25,000+ in remediation, downtime, insurance increase",
  "Conditional or Unsatisfactory rating — authority at risk",
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

      {/* Blueprint dot-grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.07,
        backgroundImage: "radial-gradient(circle, rgba(197,160,89,0.6) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }} />

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
          maxWidth: 1280, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1.4fr 1fr",
          gap: 64, alignItems: "center",
          padding: "100px 56px 80px",
        }}
      >

        {/* ── LEFT COLUMN ── */}
        <div className="hero-left" style={{ background: "rgba(5,12,24,0.55)", padding: "32px 36px", margin: "-32px -36px", backdropFilter: "brightness(0.92)" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: "#C8933F", flexShrink: 0 }} />
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8933F", margin: 0,
            }}>
              NEW MOTOR CARRIER AUTHORITY
            </p>
          </div>

          {/* Headline */}
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

          {/* Sub-headline — desktop */}
          <p
            className="hero-sub hero-sub-desktop"
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.82)", lineHeight: 1.8, maxWidth: 580,
              marginBottom: 28,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            Your MC number is active, but that doesn't mean it's protected. LaunchPath shows new carriers where FMCSA can already reach their operation, how much damage a failed audit can do, and helps install the guard your files and records should have had from Day 1.
          </p>

          {/* Sub-headline — mobile */}
          <p
            className="hero-sub hero-sub-mobile"
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.82)", lineHeight: 1.8, maxWidth: 580,
              marginBottom: 24, display: "none",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.15s",
            }}
          >
            Active doesn't mean protected. $10K–$25K+ is a normal bill for a failed New Entrant audit — most gaps show up in the first 90 days.
          </p>

          {/* Primary CTAs */}
          <div
            style={{
              display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start",
              marginBottom: 28,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <Link
                to="/reach-diagnostic"
                data-testid="hero-reach-cta"
                className="lp-scan-btn"
                style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "'Inter', sans-serif", fontWeight: 700,
                  fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase",
                  color: "#0b1628", background: GOLD,
                  padding: "1rem 2rem", textDecoration: "none",
                  transition: "background 0.2s",
                  minHeight: 48,
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#e8a958"}
                onMouseLeave={e => e.currentTarget.style.background = GOLD}
              >
                Check My Exposure →
              </Link>
              <Link
                to="/ground-0-briefing"
                data-testid="hero-ground0-cta"
                style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "'Inter', sans-serif", fontWeight: 500,
                  fontSize: "0.857rem", letterSpacing: "0.01em",
                  color: "rgba(255,255,255,0.45)", background: "transparent",
                  border: "none", padding: "0", textDecoration: "none",
                  transition: "color 0.2s",
                  minHeight: 48,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.80)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
              >
                Or begin the Ground 0 briefing →
              </Link>
            </div>
            {/* Sub-CTA descriptor */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.619rem",
              fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(200,147,63,0.50)", margin: 0,
            }}>
              3-minute REACH self-test
            </p>
          </div>

          {/* ── CONSEQUENCE BAND — LP-EXP-001 ───────────────────── */}
          <div style={{
            background: "rgba(6,10,20,0.85)",
            border: "0.5px solid rgba(200,147,63,0.18)",
            borderLeft: "2px solid rgba(200,147,63,0.50)",
            padding: "28px 24px 22px",
            marginBottom: 28,
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.50)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: "rgba(200,147,63,0.70)", marginBottom: 18,
            }}>LP-EXP-001 — EXPOSURE WINDOW</p>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
              {[
                { num: "$10K–$25K+", label: "Average cost of a failed New Entrant Safety Audit — remediation, downtime, insurance increase, reapplication." },
                { num: "87 days", label: "Average time from authority activation to first compliance failure in an unstructured operation." },
                { num: "18 months", label: "Your New Entrant audit window. It opens on Day 1. It does not wait for you to be ready." },
              ].map(({ num, label }, i) => (
                <div key={i} style={{
                  flex: "1 1 150px", paddingRight: 20, paddingBottom: 12,
                  borderRight: i < 2 ? "0.5px solid rgba(200,147,63,0.14)" : "none",
                  paddingLeft: i > 0 ? 20 : 0,
                }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 26, color: "#C8933F", lineHeight: 1.1, marginBottom: 10 }}>{num}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontStyle: "italic",
              color: "rgba(200,147,63,0.60)", margin: "14px 0 0", lineHeight: 1.5,
            }}>
              The audit does not announce itself until it is already scheduled.
            </p>
          </div>

          {/* Proof strip */}
          <div
            style={{
              display: "flex", gap: 40,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 28, flexWrap: "wrap",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
            {[
              { num: "90", label: "Days to get\nfully built" },
              { num: "5",  label: "Compliance\ndomains covered" },
              { num: "5",  label: "Custodian checkpoints\nbefore you're done" },
            ].map(({ num, label }, i) => (
              <div
                key={i}
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}
              >
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 800,
                  fontSize: 40, color: "#C8933F", lineHeight: 1, letterSpacing: "-0.03em",
                }}>
                  {num}
                </span>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                  color: "rgba(255,255,255,0.50)", lineHeight: 1.4, margin: 0,
                  whiteSpace: "pre-line",
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary program link */}
          <div style={{
            marginTop: 24, paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}>
            <Link
              to="/program"
              data-testid="hero-program-link"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                color: "rgba(212,144,10,0.75)", textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#D4900A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.75)"; }}
            >
              Review the full LaunchPath Standard →
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Comparison Card ── */}
        <div
          className="hero-right"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {/* Card header */}
          <div style={{
            background: "#060f1e",
            border: "0.5px solid rgba(255,255,255,0.10)",
            padding: "14px 24px",
            borderBottom: "none",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(212,144,10,0.85)", margin: 0,
            }}>
              LPOS — RISK ANALYSIS
            </p>
          </div>

          {/* WITHOUT block */}
          <div style={{
            background: "rgba(232,89,15,0.05)",
            border: "0.5px solid rgba(255,255,255,0.10)",
            borderTop: "2px solid #E8590F",
            padding: "28px 24px",
            borderBottom: "none",
            boxShadow: "inset 0 4px 12px rgba(0,0,0,0.70), inset 0 0 0 1px rgba(232,89,15,0.06), inset -3px 0 8px rgba(0,0,0,0.40), inset 3px 0 8px rgba(0,0,0,0.40)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <AlertTriangle size={16} strokeWidth={2} color="#E8590F" />
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#E8590F", margin: 0,
              }}>
                WITHOUT THE STANDARD
              </p>
            </div>
            <p style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif", fontSize: 20, fontWeight: 700,
              color: "rgba(255,255,255,0.92)", lineHeight: 1.2, marginBottom: 16,
            }}>
              What happens to an unstructured operation
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RISK_ITEMS.map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#E8590F", fontSize: 14, marginTop: 1, flexShrink: 0 }}>✕</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Versus divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#060f1e",
            border: "0.5px solid rgba(255,255,255,0.10)",
            borderTop: "none", borderBottom: "none",
            padding: "10px 24px",
          }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: "rgba(255,255,255,0.30)", letterSpacing: "0.14em",
              textTransform: "uppercase", margin: 0,
            }}>versus</p>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* WITH block */}
          <div style={{
            background: "rgba(212,144,10,0.06)",
            border: "0.5px solid rgba(255,255,255,0.10)",
            borderTop: "2px solid #d4900a",
            padding: "28px 24px",
            borderBottom: "none",
            boxShadow: "inset 0 4px 12px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(212,144,10,0.05), inset -3px 0 8px rgba(0,0,0,0.35), inset 3px 0 8px rgba(0,0,0,0.35)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <CheckCircle2 size={16} strokeWidth={2} color="#d4900a" />
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#d4900a", margin: 0,
              }}>
                WITH THE STANDARD
              </p>
            </div>
            <p style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif", fontSize: 20, fontWeight: 700,
              color: "#d4900a", lineHeight: 1.2, marginBottom: 16,
            }}>
              LaunchPath Standard
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {SAFE_ITEMS.map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#d4900a", fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "0.5px solid rgba(212,144,10,0.20)", paddingTop: 16 }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700,
                color: "#d4900a", margin: 0,
              }}>
                Costs less than one audit failure
              </p>
            </div>
          </div>

          {/* Card footer */}
          <div style={{
            background: "#060f1e",
            border: "0.5px solid rgba(255,255,255,0.10)",
            borderTop: "none",
            padding: "12px 24px",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11,
              color: "rgba(255,255,255,0.30)", margin: 0, letterSpacing: "0.04em",
            }}>
              Verified against 49 CFR · 25-year compliance infrastructure
            </p>
          </div>
        </div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style dangerouslySetInnerHTML={{__html: `
      `}} />
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 680px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 72px 24px 56px !important;
          }
          .hero-headline { font-size: 32px !important; }
          .hero-headline-two { font-size: 32px !important; }
          .hero-sub-desktop { display: none !important; }
          .hero-sub-mobile { display: block !important; font-size: 16px !important; }
          .hero-right { width: 100% !important; }
        }
        @media (min-width: 681px) and (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; padding: 80px 36px 64px !important; }
          .hero-headline { font-size: 42px !important; }
          .hero-headline-two { font-size: 42px !important; }
          .hero-sub { font-size: 17px !important; }
        }
        @media (min-width: 1025px) {
          .hero-headline { font-size: 56px !important; }
          .hero-headline-two { font-size: 52px !important; }
          .hero-sub { font-size: 18px !important; }
        }
      `}} />
    </section>
  );
}
