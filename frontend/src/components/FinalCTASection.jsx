import { Link } from '../compat/Link';

const GOLD = "#C8933F";
const SANS = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

const BG_IMG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/ft9osegn_hero-empty-dock.png";

export default function FinalCTASection() {
  return (
    <section
      data-testid="final-cta-section"
      style={{
        position: "relative",
        background: `linear-gradient(rgba(4,8,18,0.84) 0%, rgba(4,8,18,0.91) 100%), url("${BG_IMG}") center 60%/cover no-repeat`,
        padding: "9rem 1.5rem 7rem",
        overflow: "hidden",
      }}
    >
      {/* Subtle grain texture overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "200px", opacity: 0.04,
      }} />
      {/* Blueprint grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(197,160,89,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.045) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />
      {/* Monitoring sweep — staggered 2s offset */}
      <div className="bp-sweep-line bp-sweep-line-delayed" style={{ "--sweep-height": "500px" }} aria-hidden="true" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>

        {/* System code */}
        <p style={{
          fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700,
          letterSpacing: "0.20em", textTransform: "uppercase",
          color: "rgba(200,147,63,0.55)", marginBottom: "1.5rem",
        }}>
          LP-WIN-STATUS — AUTHORITY EXPOSURE WINDOW
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: SERIF, fontWeight: 900,
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          letterSpacing: "-0.03em", lineHeight: 1.1,
          color: "#FFFFFF", marginBottom: "1.25rem",
        }}>
          If your authority is active,<br />
          the audit window is<br />
          already open.
        </h2>

        {/* New consequence lines — LP-WEB-002 v2.0 Element 4 */}
        <p style={{
          fontFamily: SERIF, fontWeight: 900,
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          letterSpacing: "-0.03em", lineHeight: 1.1,
          color: "#FFFFFF", marginBottom: "1.25rem",
          maxWidth: 680, margin: "0 auto 1.25rem",
        }}>
          LaunchPath is the 90-day build that closes your exposure before an investigator finds it.
        </p>

        <p style={{
          fontFamily: SERIF, fontWeight: 900,
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          letterSpacing: "-0.03em", lineHeight: 1.1,
          color: "#FFFFFF", marginBottom: "2.25rem",
          maxWidth: 680, margin: "0 auto 2.25rem",
        }}>
          When you finish the Standard, you are holding audit-ready files, documented programs, and a Verified Registry ID — not just notes from another course.
        </p>

        {/* Body */}
        <p style={{
          fontFamily: SANS, fontSize: "1rem",
          color: "rgba(244,241,235,0.75)", lineHeight: 1.85,
          marginBottom: "1.25rem", maxWidth: 520, margin: "0 auto 1.25rem",
        }}>
          The REACH Diagnostic is a 14-question readiness check. Complete it in 4–6 minutes. No account required. No sales call. No commitment.
        </p>

        <p style={{
          fontFamily: SANS, fontSize: "1rem",
          color: "rgba(244,241,235,0.65)", lineHeight: 1.85,
          marginBottom: "3rem", maxWidth: 520, margin: "0 auto 3rem",
        }}>
          What you get: a clear read on where your operation stands — and which systems need to be installed before an investigator requests them.
        </p>

        {/* CTA */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes reach-btn-scan {
            0%   { left: -60%; opacity: 0; }
            10%  { opacity: 1; }
            100% { left: 120%; opacity: 0; }
          }
          .reach-cta-btn { position: relative; overflow: hidden; }
          .reach-cta-btn::after {
            content: '';
            position: absolute; top: 0; left: -60%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(200,147,63,0.30), transparent);
            opacity: 0;
          }
          .reach-cta-btn:hover::after { animation: reach-btn-scan 0.55s ease-in-out forwards; }
          @media (max-width: 480px) {
            .final-cta-btn { padding: 1rem 1.5rem !important; font-size: 0.857rem !important; }
          }
        `}} />

        <Link
          to="/reach-diagnostic"
          data-testid="final-cta-reach-btn"
          className="reach-cta-btn final-cta-btn btn-scan"
          style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: MONO, fontWeight: 700,
            fontSize: "0.857rem", letterSpacing: "0.15em", textTransform: "uppercase",
            color: GOLD, background: "transparent",
            border: `1.5px solid ${GOLD}`,
            padding: "1.25rem 2.5rem", textDecoration: "none",
            transition: "color 0.2s, border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(200,147,63,0.08)";
            e.currentTarget.style.borderColor = "#e8a958";
            e.currentTarget.style.color = "#e8a958";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = GOLD;
            e.currentTarget.style.color = GOLD;
          }}
        >
          RUN THE REACH DIAGNOSTIC →
        </Link>

        {/* Disclaimer */}
        <p style={{
          fontFamily: SANS, fontSize: "0.762rem",
          color: "rgba(138,150,168,0.50)",
          marginTop: "3rem", lineHeight: 1.7, maxWidth: 480, margin: "3rem auto 0",
        }}>
          This is not done-for-you compliance. LaunchPath is a video-led implementation program. You do the work. The system shows you what, when, and how.
        </p>

      </div>
    </section>
  );
}
