import { Link } from "react-router-dom";

const DOMAINS = [
  {
    num: "01",
    title: "AUTHORITY & IDENTITY",
    desc: "Filing verification, MC status monitoring, and structured audit-readiness controls.",
  },
  {
    num: "02",
    title: "DRIVER QUALIFICATION FILES",
    desc: "Complete DQ file system for every driver under your authority — medical certificates, applications, MVRs, and annual reviews.",
  },
  {
    num: "03",
    title: "DRUG & ALCOHOL PROGRAM",
    desc: "Consortium enrollment, written policy documentation, pre-employment testing protocol, and Clearinghouse query compliance.",
  },
  {
    num: "04",
    title: "HOURS OF SERVICE & DISPATCH",
    desc: "ELD compliance documentation, log record systems, and supporting documents for violation response.",
  },
  {
    num: "05",
    title: "VEHICLE MAINTENANCE",
    desc: "Unit files, DVIR documentation protocol, 12-month maintenance logs, and annual inspection tracking.",
  },
  {
    num: "06",
    title: "INSURANCE & FILINGS",
    desc: "BMC-91 filing continuity, coverage verification schedule, and policy gap prevention protocol.",
  },
];

export default function WhatGetsInstalledSimple() {
  return (
    <>
      <style>{`
        .wgi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid rgba(212,144,10,0.14);
          border-left: 1px solid rgba(212,144,10,0.14);
          margin-bottom: 3rem;
        }
        @media (max-width: 900px) { .wgi-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .wgi-grid { grid-template-columns: 1fr; } }
        .wgi-card {
          border-right: 1px solid rgba(212,144,10,0.14);
          border-bottom: 1px solid rgba(212,144,10,0.14);
          padding: 2rem 1.75rem;
          transition: background 0.18s;
        }
        .wgi-card:hover { background: rgba(212,144,10,0.04); }
      `}</style>

      <section
        data-testid="what-gets-installed-simple"
        style={{
          background: "var(--bg-onyx)",
          borderTop: "1px solid rgba(212,144,10,0.12)",
          borderBottom: "1px solid rgba(212,144,10,0.12)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "2rem" }}>
            LP-SYS-001 — WHAT THE STANDARD INSTALLS
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FFFFFF", letterSpacing: "-0.025em", lineHeight: 1.08, marginBottom: "3rem" }}>
            Six Domains. One Audit-Ready Authority.
          </h2>

          <div className="wgi-grid">
            {DOMAINS.map((d) => (
              <div key={d.num} className="wgi-card">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.55)", letterSpacing: "0.14em", marginBottom: "0.75rem" }}>
                  {d.num}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF", lineHeight: 1.3, marginBottom: "0.875rem" }}>
                  {d.title}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", fontStyle: "italic", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
            By the end of this system, your operation will not run the way it does today — and it shouldn't.
          </p>

          <Link
            to="/operating-standard"
            data-testid="see-installation-link"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(212,144,10,0.80)", textDecoration: "none", borderBottom: "1px solid rgba(212,144,10,0.25)", paddingBottom: "2px", letterSpacing: "0.02em", transition: "color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#d4900a"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.80)"; }}
          >
            See the full installation sequence →
          </Link>

        </div>
      </section>
    </>
  );
}
