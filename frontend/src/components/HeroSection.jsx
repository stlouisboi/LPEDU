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
  { target: 90, prefix: "",  suffix: "",  label: "Days to Install It" },
  { target: 30, prefix: "",  suffix: "+", label: "Forms & Templates" },
  { target: 0,  prefix: "$", suffix: "",  label: "Revenue Day 1 of Revocation" },
  { target: 16, prefix: "",  suffix: "",  label: "Documented Failure Patterns" },
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
      padding: "20px 16px 18px",
      borderRight: "0.5px solid rgba(212,144,10,0.14)",
      position: "relative",
      overflow: "hidden",
      opacity: triggered ? 1 : 0,
      transform: triggered ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, #d4900a, rgba(212,144,10,0.2))",
      }} />
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 32,
        fontWeight: 700,
        color: "#d4900a",
        margin: "0 0 4px",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        textShadow: "0 0 20px rgba(212,144,10,0.35)",
        whiteSpace: "nowrap",
      }}>{item.prefix}{count}{item.suffix}</p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.75)",
        margin: 0,
        lineHeight: 1.3,
      }}>{item.label}</p>
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
        background: "#0b1628",
        minHeight: 620,
        overflow: "hidden",
      }}
    >
      {/* Gold bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#d4900a", zIndex: 10 }} />

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
            <div style={{ width: 28, height: 1, background: "#d4900a", flexShrink: 0 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4900a", margin: 0 }}>
              NEW MOTOR CARRIER AUTHORITY
            </p>
          </div>

          {/* Headline */}
          <h1 style={{ margin: "0 0 0 0" }}>
            <span className="hero-headline-line" style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-3xl)", fontWeight: 500, lineHeight: 1.07, color: "#FFFFFF", marginBottom: 6 }}>
              Your authority is active.
            </span>
            <span className="hero-headline-line" style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-3xl)", fontWeight: 500, lineHeight: 1.07, color: "#d4900a" }}>
              The first 90 days<br />determine what survives.
            </span>
          </h1>

          <div style={{ width: 40, height: 2, background: "#d4900a", margin: "26px 0 22px" }} />

          {/* Single subheadline */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-lg)", fontWeight: 500, color: "rgba(255,255,255,0.90)", lineHeight: 1.7, maxWidth: 600, marginBottom: 22 }}>
            LaunchPath installs the compliance infrastructure FMCSA expects into your operation — before gaps become audit exposure.
          </p>

          {/* Clarifier box */}
          <div style={{ borderLeft: "2px solid rgba(212,144,10,0.35)", paddingLeft: 18, marginBottom: 28 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
              This is not a compliance service. We do not file your paperwork or manage your operation. LaunchPath installs the system you operate on — including the files, programs, and controls required to remain compliant.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Link to="/ground-0-briefing" data-testid="hero-primary-cta" className="hero-cta-primary"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", color: "#0b1628", background: "#d4900a", padding: "16px 32px", height: 52, textDecoration: "none", boxShadow: "0 0 0 3px rgba(212,144,10,0.22)", transition: "background 0.2s", display: "inline-flex", alignItems: "center", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8a520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#d4900a")}
              >INITIATE GROUND 0 →</Link>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", margin: "6px 0 0", letterSpacing: "0.07em", textTransform: "uppercase" }}>Free Readiness Module</p>
            </div>
            <Link to="/standards" data-testid="hero-secondary-cta" className="hero-cta-secondary"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", color: "rgba(255,255,255,0.65)", background: "transparent", border: "0.5px solid rgba(255,255,255,0.25)", padding: "0 20px", height: 52, textDecoration: "none", transition: "border-color 0.2s, color 0.2s", display: "inline-flex", alignItems: "center", textTransform: "uppercase" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >SEE WHAT GETS INSTALLED</Link>
          </div>

          {/* Proof strip — hidden on mobile (shown as compact row instead) */}
          <div className="proof-strip" style={{
            display: "flex",
            background: "rgba(0,10,22,0.65)",
            border: "0.5px solid rgba(212,144,10,0.20)",
            borderRadius: 0,
            overflow: "hidden",
            maxWidth: 480,
            boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,144,10,0.08)",
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
            border: "0.5px solid rgba(212,144,10,0.20)",
            background: "rgba(0,10,22,0.65)",
            overflow: "hidden",
          }}>
            {PROOF.map((item, i) => (
              <div key={i} style={{
                flex: 1,
                padding: "14px 10px",
                borderRight: i < PROOF.length - 1 ? "0.5px solid rgba(212,144,10,0.14)" : "none",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #d4900a, rgba(212,144,10,0.2))" }} />
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: "#d4900a", margin: "0 0 2px", lineHeight: 1, whiteSpace: "nowrap" }}>
                  {item.prefix}{item.target}{item.suffix}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.3 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="hero-right" style={{ borderLeft: "0.5px solid rgba(212,144,10,0.14)", padding: "100px 28px 80px", display: "flex", flexDirection: "column" }}>

          {/* Document header */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", margin: "0 0 4px" }}>
              LPOS — RISK ANALYSIS
            </p>
            <p className="hero-rp-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(212,144,10,0.95)", letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
              THE COST OF BEING UNDERBUILT
            </p>
          </div>

          {/* Risk card */}
          <div className="hero-risk-card" style={{
            background: "rgba(20,4,0,0.60)",
            border: "0.5px solid rgba(232,89,48,0.30)",
            borderTop: "2px solid #E8590F",
            padding: "18px 18px 16px",
            marginBottom: 8,
            position: "relative",
            overflow: "hidden",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: "radial-gradient(circle, rgba(232,89,48,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,89,48,0.80)", margin: "0 0 8px" }}>EXPOSURE RISK</p>
            <p className="hero-rp-title" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 6px", letterSpacing: "0.01em" }}>
              Audit failure + remediation
            </p>
            <p className="hero-rp-sub" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, margin: "0 0 12px" }}>
              Deficiency findings, corrective action exposure, service disruption, and preventable authority risk.
            </p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 700, color: "#E8590F", margin: 0, letterSpacing: "-0.01em", textShadow: "0 0 16px rgba(232,89,48,0.40)", whiteSpace: "nowrap" }}>
              ${costLow.toLocaleString()},000 – ${costHigh.toLocaleString()},000+
            </p>
          </div>

          {/* Versus divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0 10px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.10)" }} />
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>versus</p>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.10)" }} />
          </div>

          {/* Solution card */}
          <div style={{
            background: "rgba(212,144,10,0.07)",
            border: "0.5px solid rgba(212,144,10,0.32)",
            borderTop: "2px solid #d4900a",
            padding: "18px 18px 16px",
            marginBottom: 24,
            position: "relative",
            overflow: "hidden",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: "radial-gradient(circle, rgba(212,144,10,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", margin: "0 0 8px" }}>THE STANDARD</p>
            <p className="hero-rp-title" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: "#d4900a", margin: "0 0 6px", letterSpacing: "0.01em" }}>
              LaunchPath Standard
            </p>
            <p className="hero-rp-sub" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.80)", lineHeight: 1.65, margin: "0 0 12px" }}>
              90-day guided installation of the compliance systems new carriers need to operate with structure, proof, and audit readiness.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: "#d4900a", margin: 0, letterSpacing: "0.02em" }}>
              Costs less than one audit failure
            </p>
          </div>

          {/* Domain label */}
          <p className="hero-rp-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(212,144,10,0.95)", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 14px" }}>
            WHAT THE STANDARD INSTALLS
          </p>

          {/* Domain list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {DOMAINS.map((d, i) => (
              <div key={d.num} style={{
                display: "flex", gap: 12, alignItems: "center",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-6px)",
                transition: `opacity 0.4s ease ${0.5 + i * 0.07}s, transform 0.4s ease ${0.5 + i * 0.07}s`,
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(212,144,10,0.65)", width: 20, flexShrink: 0 }}>{d.num}</span>
                <span className="hero-domain-name" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.92)", letterSpacing: "0.01em" }}>{d.name}</span>
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
          .hero-right { border-left: none !important; border-top: 0.5px solid rgba(212,144,10,0.14) !important; padding: 40px 28px 56px !important; width: 100% !important; box-sizing: border-box !important; }
        }
        @media (min-width: 681px) and (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr 220px !important; }
          .hero-left { padding: 80px 28px 64px 36px !important; }
          .hero-right { padding: 80px 16px 64px !important; }
          .hero-headline-line { font-size: 38px !important; line-height: 1.1 !important; }
          .hero-rp-label { font-size: 11px !important; color: rgba(212,144,10,0.90) !important; }
          .hero-rp-sub { font-size: 12px !important; color: rgba(255,255,255,0.76) !important; }
          .hero-rp-title { font-size: 13px !important; }
          .hero-domain-name { font-size: 12px !important; color: rgba(255,255,255,0.90) !important; }
        }
        @media (min-width: 981px) and (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr 296px !important; }
          .hero-left { padding: 90px 36px 72px 44px !important; }
          .hero-right { padding: 90px 24px 72px !important; }
          .hero-headline-line { font-size: 46px !important; }
          .hero-rp-label { font-size: 11px !important; letter-spacing: 0.10em !important; color: rgba(212,144,10,0.92) !important; }
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
