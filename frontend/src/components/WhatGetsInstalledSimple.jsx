import { Link } from '../compat/Link';

const JBMONO = "'JetBrains Mono', monospace";
const GOLD   = "#C5A059";
const NAVY   = "#002244";

const DOMAINS = [
  { num: "01", title: "AUTHORITY & IDENTITY",       desc: "Filing verification, MC status monitoring, and structured audit-readiness controls." },
  { num: "02", title: "DRIVER QUALIFICATION FILES", desc: "Complete DQ file system for every driver under your authority — medical certificates, applications, MVRs, and annual reviews." },
  { num: "03", title: "DRUG & ALCOHOL PROGRAM",     desc: "Consortium enrollment, written policy documentation, pre-employment testing protocol, and Clearinghouse query compliance." },
  { num: "04", title: "HOURS OF SERVICE & DISPATCH",desc: "ELD compliance documentation, log record systems, and supporting documents for violation response." },
  { num: "05", title: "VEHICLE MAINTENANCE",        desc: "Unit files, DVIR documentation protocol, 12-month maintenance logs, and annual inspection tracking." },
  { num: "06", title: "INSURANCE & FILINGS",        desc: "BMC-91 filing continuity, coverage verification schedule, and policy gap prevention protocol." },
];

export default function WhatGetsInstalledSimple() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

        @keyframes wgi-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(197,160,89,0.6); }
          50%       { opacity: 0.40; box-shadow: 0 0 0 5px rgba(197,160,89,0); }
        }
        .wgi-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: ${GOLD};
          animation: wgi-pulse 3s ease-in-out infinite;
          flex-shrink: 0;
        }
        .wgi-card:nth-child(2) .wgi-status-dot { animation-delay: 0.5s; }
        .wgi-card:nth-child(3) .wgi-status-dot { animation-delay: 1.0s; }
        .wgi-card:nth-child(4) .wgi-status-dot { animation-delay: 1.5s; }
        .wgi-card:nth-child(5) .wgi-status-dot { animation-delay: 2.0s; }
        .wgi-card:nth-child(6) .wgi-status-dot { animation-delay: 2.5s; }
        @keyframes wgi-scan {
          0%   { top: -1%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 101%; opacity: 0; }
        }

        .wgi-section {
          background: #020b18;
          background-image:
            linear-gradient(rgba(197,160,89,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.035) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .wgi-id-plate {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(180deg, #0e1f38 0%, #060f1e 100%);
          border: 1px solid rgba(197,160,89,0.25);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.4), 2px 2px 6px rgba(0,0,0,0.5);
          padding: 0.35rem 0.875rem;
          margin-bottom: 3rem;
        }
        .wgi-id-plate span {
          font-family: ${JBMONO};
          font-size: 0.667rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(197,160,89,0.70);
        }

        /* System rail — mechanical divider */
        .wgi-rail {
          position: relative;
          height: 1px;
          background: rgba(197,160,89,0.18);
          margin: 3rem 0;
        }
        .wgi-rail::before, .wgi-rail::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 6px; height: 6px;
          border: 1px solid rgba(197,160,89,0.45);
          background: #020b18;
          box-shadow: 0 0 4px rgba(197,160,89,0.25);
        }
        .wgi-rail::before { left: 0; }
        .wgi-rail::after  { right: 0; }

        /* Domain grid */
        .wgi-grid-wrap {
          position: relative;
          overflow: hidden;
        }
        .wgi-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.18) 20%, rgba(197,160,89,0.08) 50%, rgba(197,160,89,0.18) 80%, transparent 100%);
          pointer-events: none;
          animation: wgi-scan 12s linear infinite;
          z-index: 10;
        }
        .wgi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 900px) { .wgi-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .wgi-grid { grid-template-columns: 1fr; } }

        /* Inset panel card */
        .wgi-card {
          position: relative;
          border: 1px solid rgba(197,160,89,0.12);
          margin: -1px 0 0 -1px;
          padding: 2rem 1.75rem 2rem;
          background: linear-gradient(160deg, rgba(255,255,255,0.018) 0%, rgba(0,0,0,0.20) 100%);
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(197,160,89,0.06);
          transition: background 0.2s;
          overflow: hidden;
        }
        .wgi-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(197,160,89,0.35), transparent);
        }
        .wgi-card:hover { background: linear-gradient(160deg, rgba(197,160,89,0.04) 0%, rgba(0,0,0,0.15) 100%); }

        .wgi-domain-num {
          font-family: ${JBMONO};
          font-size: 1.75rem;
          font-weight: 700;
          color: rgba(197,160,89,0.18);
          line-height: 1;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
          user-select: none;
        }
      `}} />

      <section
        data-testid="what-gets-installed-simple"
        className="wgi-section"
        style={{
          borderTop: "1px solid rgba(197,160,89,0.15)",
          borderBottom: "1px solid rgba(197,160,89,0.15)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>

          {/* Stamped ID plate */}
          <div className="wgi-id-plate">
            <span>LP-SYS-001</span>
            <span style={{ color: "rgba(197,160,89,0.25)" }}>|</span>
            <span>WHAT THE STANDARD INSTALLS</span>
          </div>

          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#F5F5F5", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "0.75rem" }}>
            Six Domains. One Audit-Ready Authority.
          </h2>

          {/* System Rail */}
          <div className="wgi-rail" />

          {/* Domain grid with vertical scan line */}
          <div className="wgi-grid-wrap">
            <div className="wgi-scanline" />
            <div className="wgi-grid">
              {DOMAINS.map((d) => (
                <div key={d.num} className="wgi-card">
                  <div className="wgi-domain-num">{d.num}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                    <p style={{ fontFamily: JBMONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F5F5F5", lineHeight: 1.3, margin: 0 }}>
                      {d.title}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
                      <span style={{ fontFamily: JBMONO, fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.45)" }}>STATUS: VERIFIED</span>
                      <div className="wgi-status-dot" />
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(245,245,245,0.52)", lineHeight: 1.72, margin: 0 }}>
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* System Rail bottom */}
          <div className="wgi-rail" style={{ marginTop: "3rem", marginBottom: "2rem" }} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", fontStyle: "italic", color: "rgba(245,245,245,0.42)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
            By the end of this system, your operation will not run the way it does today — and it shouldn't.
          </p>

          <Link
            to="/operating-standard"
            data-testid="see-installation-link"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(197,160,89,0.80)", textDecoration: "none", borderBottom: "1px solid rgba(197,160,89,0.25)", paddingBottom: "2px", letterSpacing: "0.02em", transition: "color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(197,160,89,0.80)"; }}
          >
            See the full installation sequence →
          </Link>

        </div>
      </section>
    </>
  );
}
