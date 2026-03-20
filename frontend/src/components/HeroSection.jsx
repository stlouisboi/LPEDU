import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BadgeCheck, UserCheck, FileText, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";

const HERO_LETTER_URL = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png";

const ICON_STRIP = [
  { Icon: BadgeCheck,  label: "Authority\nProtection" },
  { Icon: UserCheck,   label: "Driver\nQualification" },
  { Icon: FileText,    label: "Compliance\nDocumentation" },
  { Icon: DollarSign,  label: "Financial\nControls" },
];

const RISK_ITEMS = [
  "Audit failure + remediation",
  "$10,000–$25,000+ exposure",
  "Authority at risk",
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
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#d4900a", zIndex: 10 }} />

      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "200px",
      }} />

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
        <div className="hero-left">

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: "#d4900a", flexShrink: 0 }} />
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", margin: 0,
            }}>
              NEW MOTOR CARRIER AUTHORITY
            </p>
          </div>

          {/* Headline */}
          <h1 style={{ margin: 0 }}>
            <span
              className="hero-headline"
              style={{
                display: "block", fontFamily: "'Playfair Display', serif",
                fontWeight: 700, lineHeight: 1.05, color: "#FFFFFF", marginBottom: 8,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Your authority is active.
            </span>
            <span
              className="hero-headline"
              style={{
                display: "block", fontFamily: "'Playfair Display', serif",
                fontWeight: 700, lineHeight: 1.05, color: "#d4900a",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              The first 90 days<br />determine what survives.
            </span>
          </h1>

          {/* Gold separator */}
          <div style={{ width: 40, height: 2, background: "#d4900a", margin: "28px 0 24px" }} />

          {/* Sub-headline — risk-first */}
          <p
            className="hero-sub"
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              color: "rgba(255,255,255,0.85)", lineHeight: 1.65, maxWidth: 600,
              marginBottom: 16,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            Carriers who enter the New Entrant window without compliance systems face{" "}
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>$10,000–$25,000 in audit exposure</span>
            {" "}— and most don't know it until the notice arrives.
          </p>

          {/* Audience line — gold */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400,
            color: "#d4900a", lineHeight: 1.65, maxWidth: 560, marginBottom: 20,
          }}>
            Built for new motor carriers, box trucks, and 1–3 truck owner-operators in their
            first 90 days of active authority — and those who already got the letter.
          </p>

          {/* Differentiator — italic */}
          <div style={{ borderLeft: "2px solid rgba(212,144,10,0.35)", paddingLeft: 18, marginBottom: 36 }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 15, fontStyle: "italic",
              color: "rgba(255,255,255,0.52)", lineHeight: 1.75, margin: 0,
            }}>
              This is not a compliance service. We do not file your paperwork or manage your operation.
              You do the work. The system shows you what, when, and how.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="hero-cta-row"
            style={{
              display: "flex", alignItems: "flex-start", gap: 16,
              flexWrap: "wrap", marginBottom: 0,
            }}
          >
            {/* Primary */}
            <div>
              <Link
                to="/ground-0-briefing"
                data-testid="hero-primary-cta"
                className="hero-cta-primary"
                style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#0b1628", background: "#d4900a",
                  padding: "18px 36px", textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8a520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#d4900a")}
              >
                INITIATE GROUND 0 →
              </Link>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
                color: "rgba(255,255,255,0.38)", margin: "8px 0 0",
                letterSpacing: "0.07em", textTransform: "uppercase",
              }}>
                FREE · 4 MINUTES · NO ACCOUNT REQUIRED
              </p>
            </div>

            {/* Secondary */}
            <Link
              to="/standards"
              data-testid="hero-secondary-cta"
              className="hero-cta-secondary"
              style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500,
                letterSpacing: "0.04em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                background: "transparent", border: "0.5px solid rgba(255,255,255,0.25)",
                padding: "18px 24px", textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >
              SEE WHAT GETS INSTALLED
            </Link>
          </div>

          {/* Icon strip */}
          <div
            className="hero-icon-strip"
            style={{
              display: "flex", gap: 40, marginTop: 52,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 28, flexWrap: "wrap",
            }}
          >
            {ICON_STRIP.map(({ Icon, label }, i) => (
              <div
                key={label}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.5s ease ${0.4 + i * 0.08}s, transform 0.5s ease ${0.4 + i * 0.08}s`,
                }}
              >
                <Icon size={22} strokeWidth={1.5} color="rgba(212,144,10,0.75)" />
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                  color: "rgba(255,255,255,0.55)", lineHeight: 1.4, margin: 0,
                  whiteSpace: "pre-line",
                }}>
                  {label}
                </p>
              </div>
            ))}
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
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(212,144,10,0.60)", margin: 0,
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
              fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
              color: "rgba(255,255,255,0.92)", lineHeight: 1.2, marginBottom: 16,
            }}>
              Audit failure + remediation
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
              fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
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
      <style>{`
        @media (max-width: 680px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 72px 24px 56px !important;
          }
          .hero-headline { font-size: 44px !important; }
          .hero-sub { font-size: 18px !important; }
          .hero-cta-primary, .hero-cta-secondary {
            width: 100% !important; justify-content: center !important; box-sizing: border-box !important;
          }
          .hero-cta-row { flex-direction: column !important; }
          .hero-right { width: 100% !important; }
          .hero-icon-strip { gap: 24px !important; margin-top: 40px !important; }
        }
        @media (min-width: 681px) and (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; padding: 80px 36px 64px !important; }
          .hero-headline { font-size: 52px !important; }
          .hero-sub { font-size: 17px !important; }
        }
        @media (min-width: 1025px) {
          .hero-headline { font-size: 76px !important; }
          .hero-sub { font-size: 20px !important; }
        }
      `}</style>
    </section>
  );
}
