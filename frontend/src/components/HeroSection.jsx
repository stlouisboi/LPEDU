import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const DOMAINS = [
  { num: "01", name: "Authority & Identity" },
  { num: "02", name: "Driver Qualification Files" },
  { num: "03", name: "Drug & Alcohol Program" },
  { num: "04", name: "Hours of Service & Dispatch" },
  { num: "05", name: "Vehicle Maintenance" },
  { num: "06", name: "Insurance & Filings" },
];

const PROOF = [
  { target: 90, suffix: "", label: "Days", sublabel: "Guided implementation" },
  { target: 6,  suffix: "", label: "Domains", sublabel: "Operational coverage" },
  { target: 5,  suffix: "", label: "Checkpoints", sublabel: "Structured submission reviews" },
];

function useCountUp(target, duration, triggered) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [triggered, target, duration]);
  return count;
}

function ProofCard({ item, triggered, delay }) {
  const count = useCountUp(item.target, 1400, triggered);
  return (
    <div style={{
      flex: 1,
      padding: "20px 20px 18px",
      borderRight: "0.5px solid rgba(197,160,89,0.14)",
      position: "relative",
      overflow: "hidden",
      opacity: triggered ? 1 : 0,
      transform: triggered ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, #C5A059, rgba(197,160,89,0.2))",
      }} />
      <p style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: 34,
        fontWeight: 700,
        color: "#C5A059",
        margin: "0 0 2px",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        textShadow: "0 0 20px rgba(197,160,89,0.35)",
      }}>{count}{item.suffix}</p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.90)",
        margin: "0 0 2px",
      }}>{item.label}</p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: "rgba(255,255,255,0.45)",
        margin: 0,
        lineHeight: 1.3,
      }}>{item.sublabel}</p>
    </div>
  );
}

export default function HeroSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const costLow = useCountUp(10, 1600, inView);
  const costHigh = useCountUp(25, 1800, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
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
        background: "#002244",
        minHeight: 620,
        overflow: "hidden",
      }}
    >
      {/* Gold bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#C5A059", zIndex: 10 }} />

      {/* Subtle background grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "200px",
      }} />

      {/* Main grid */}
      <div className="hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 296px", alignItems: "start" }}>

        {/* ── LEFT COLUMN ── */}
        <div className="hero-left" style={{ padding: "100px 44px 80px 56px" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 28, height: 1, background: "#C5A059", flexShrink: 0 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C5A059", margin: 0 }}>
              NEW MOTOR CARRIER AUTHORITY
            </p>
          </div>

          {/* Headline */}
          <h1 style={{ margin: "0 0 0 0" }}>
            <span className="hero-headline-line" style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: 54, fontWeight: 500, lineHeight: 1.07, color: "#FFFFFF", marginBottom: 6 }}>
              Your authority is active.
            </span>
            <span className="hero-headline-line" style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: 54, fontWeight: 500, lineHeight: 1.07, color: "#C5A059" }}>
              The first 90 days<br />determine what survives.
            </span>
          </h1>

          <div style={{ width: 40, height: 2, background: "#C5A059", margin: "26px 0 20px" }} />

          {/* Primary supporting paragraph */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.90)", lineHeight: 1.7, maxWidth: 620, marginBottom: 14 }}>
            LaunchPath installs the compliance infrastructure FMCSA expects into your operation — before gaps become audit exposure.
          </p>

          {/* Secondary body */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 600, marginBottom: 14 }}>
            We install the files, programs, monitoring systems, and operating structure required to keep your authority active under real-world conditions.
          </p>

          {/* System identity line */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(197,160,89,0.70)", lineHeight: 1.65, maxWidth: 560, marginBottom: 28, letterSpacing: "0.01em" }}>
            This is not a resource platform. This is a system that becomes part of your business.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Link to="/ground-0-briefing" data-testid="hero-primary-cta" className="hero-cta-primary"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, letterSpacing: "0.02em", color: "#001833", background: "#C5A059", padding: "16px 36px", height: 52, borderRadius: 4, textDecoration: "none", boxShadow: "0 0 0 3px rgba(197,160,89,0.22)", transition: "background 0.2s", display: "inline-flex", alignItems: "center" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#d4b572")}
                onMouseLeave={e => (e.currentTarget.style.background = "#C5A059")}
              >INITIATE GROUND 0</Link>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", margin: "6px 0 0", letterSpacing: "0.07em", textTransform: "uppercase" }}>Free Readiness Module</p>
            </div>
            <Link to="/standards" data-testid="hero-secondary-cta" className="hero-cta-secondary"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, letterSpacing: "0.01em", color: "rgba(255,255,255,0.65)", background: "transparent", border: "0.5px solid rgba(255,255,255,0.25)", padding: "0 20px", height: 52, borderRadius: 4, textDecoration: "none", transition: "border-color 0.2s, color 0.2s", display: "inline-flex", alignItems: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >VIEW THE SYSTEM INSTALLATION →</Link>
          </div>

          {/* Fix 2 — self-installation clarifier — removed, replaced by system identity line above */}

          {/* Proof strip — hidden on mobile (shown as compact row instead) */}
          <div className="proof-strip" style={{
            display: "flex",
            background: "rgba(0,10,22,0.65)",
            border: "0.5px solid rgba(197,160,89,0.20)",
            borderRadius: 0,
            overflow: "hidden",
            maxWidth: 480,
            boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(197,160,89,0.08)",
          }}>
            {PROOF.map((item, i) => (
              <ProofCard key={i} item={item} triggered={inView} delay={i * 100} />
            ))}
            <style>{`.proof-strip > div:last-child { border-right: none !important; }`}</style>
          </div>

          {/* Mobile proof row — shown only on mobile */}
          <div className="proof-mobile" style={{
            display: "none",
            gap: 0,
            border: "0.5px solid rgba(197,160,89,0.20)",
            background: "rgba(0,10,22,0.65)",
            overflow: "hidden",
          }}>
            {PROOF.map((item, i) => (
              <div key={i} style={{
                flex: 1,
                padding: "14px 12px",
                borderRight: i < PROOF.length - 1 ? "0.5px solid rgba(197,160,89,0.14)" : "none",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #C5A059, rgba(197,160,89,0.2))" }} />
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 700, color: "#C5A059", margin: "0 0 2px", lineHeight: 1, textShadow: "0 0 16px rgba(197,160,89,0.3)" }}>
                  {item.target}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="hero-right" style={{ borderLeft: "0.5px solid rgba(197,160,89,0.10)", padding: "100px 28px 80px", display: "flex", flexDirection: "column" }}>

          {/* Section label 1 */}
          <p className="hero-rp-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(197,160,89,0.85)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 12px" }}>
            THE COST OF BEING UNDERBUILT
          </p>

          {/* Risk card — ultra premium */}
          <div className="hero-risk-card" style={{
            background: "linear-gradient(145deg, rgba(30,4,0,0.70) 0%, rgba(0,8,20,0.80) 100%)",
            border: "0.5px solid rgba(232,89,48,0.25)",
            borderTop: "2px solid #E8590F",
            borderRadius: 2,
            padding: "18px 18px 16px",
            marginBottom: 8,
            position: "relative",
            overflow: "hidden",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}>
            {/* Corner glow */}
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: "radial-gradient(circle, rgba(232,89,48,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.38)", lineHeight: 1.5, margin: "0 0 10px", fontStyle: "italic" }}>
              This is what happens when systems are missing.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,89,48,0.70)", margin: "0 0 8px" }}>EXPOSURE RISK</p>
            <p className="hero-rp-title" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.92)", margin: "0 0 6px" }}>
              Audit failure + remediation
            </p>
            <p className="hero-rp-sub" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.58)", lineHeight: 1.6, margin: "0 0 12px" }}>
              Deficiency findings, corrective action exposure, service disruption, and preventable authority risk.
            </p>
            {/* Animated price — supported by ConsequenceNumberBlock lower on page */}
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 700, color: "#E8590F", margin: 0, letterSpacing: "-0.01em", textShadow: "0 0 16px rgba(232,89,48,0.40)", whiteSpace: "nowrap" }}>
              ${costLow.toLocaleString()},000 – ${costHigh.toLocaleString()},000+
            </p>
          </div>

          {/* Versus divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0 10px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>versus</p>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Solution card — ultra premium */}
          <div style={{
            background: "linear-gradient(145deg, rgba(197,160,89,0.10) 0%, rgba(0,12,28,0.75) 100%)",
            border: "0.5px solid rgba(197,160,89,0.28)",
            borderTop: "2px solid #C5A059",
            borderRadius: 2,
            padding: "18px 18px 16px",
            marginBottom: 24,
            position: "relative",
            overflow: "hidden",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: "radial-gradient(circle, rgba(197,160,89,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)", margin: "0 0 8px" }}>THE STANDARD</p>
            <p className="hero-rp-title" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: "#C5A059", margin: "0 0 6px" }}>
              LaunchPath Standard
            </p>
            <p className="hero-rp-sub" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: "0 0 12px" }}>
              90-day guided installation of the compliance systems new carriers need to operate with structure, proof, and audit readiness.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "#C5A059", margin: 0, letterSpacing: "0.02em" }}>
              Costs less than one audit failure
            </p>
          </div>

          {/* Label 2 */}
          <p className="hero-rp-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(197,160,89,0.85)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 14px" }}>
            WHAT THE STANDARD INSTALLS
          </p>

          {/* Domain list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DOMAINS.map((d, i) => (
              <div key={d.num} style={{
                display: "flex", gap: 12, alignItems: "center",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-6px)",
                transition: `opacity 0.4s ease ${0.5 + i * 0.07}s, transform 0.4s ease ${0.5 + i * 0.07}s`,
              }}>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "rgba(197,160,89,0.55)", width: 20, flexShrink: 0 }}>{d.num}</span>
                <span className="hero-domain-name" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", letterSpacing: "0.01em" }}>{d.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-left { padding: 64px 28px 48px !important; }
          .hero-headline-line { font-size: 36px !important; line-height: 1.1 !important; }
          .proof-strip { display: none !important; }
          .proof-mobile { display: flex !important; }
          .hero-cta-primary, .hero-cta-secondary { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
          .hero-right { border-left: none !important; border-top: 0.5px solid rgba(197,160,89,0.14) !important; padding: 40px 28px 56px !important; width: 100% !important; box-sizing: border-box !important; }
        }
        @media (min-width: 681px) and (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr 220px !important; }
          .hero-left { padding: 80px 28px 64px 36px !important; }
          .hero-right { padding: 80px 16px 64px !important; }
          .hero-headline-line { font-size: 38px !important; line-height: 1.1 !important; }
          .hero-rp-label { font-size: 11px !important; color: rgba(197,160,89,0.90) !important; }
          .hero-rp-sub { font-size: 12px !important; color: rgba(255,255,255,0.76) !important; }
          .hero-rp-title { font-size: 13px !important; }
          .hero-domain-name { font-size: 12px !important; color: rgba(255,255,255,0.90) !important; }
        }
        @media (min-width: 981px) and (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr 296px !important; }
          .hero-left { padding: 90px 36px 72px 44px !important; }
          .hero-right { padding: 90px 24px 72px !important; }
          .hero-headline-line { font-size: 46px !important; }
          .hero-rp-label { font-size: 11px !important; letter-spacing: 0.10em !important; color: rgba(197,160,89,0.92) !important; }
          .hero-rp-sub { font-size: 13px !important; color: rgba(255,255,255,0.80) !important; }
          .hero-rp-title { font-size: 15px !important; }
          .hero-domain-name { font-size: 14px !important; color: rgba(255,255,255,0.92) !important; }
        }
        @keyframes riskPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        .hero-risk-card:hover { border-color: rgba(232,89,48,0.45) !important; transition: border-color 0.3s !important; }
      `}</style>
    </section>
  );
}
