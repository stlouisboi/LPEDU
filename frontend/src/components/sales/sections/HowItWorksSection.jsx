import { T, mono, serif, display } from "../tokens";
import { CTAButton, GoldLine, SectionLabel, section } from "../SharedComponents";

export default function HowItWorksSection({ handleAuthorize, checkoutLoading }) {
  const checkpoints = [
    { week: "WEEK 1", code: "CHECKPOINT 01 — AUTHORITY FOUNDATION", body: "Custodian reviews DQ file, D&A enrollment, insurance certificate, and UCR registration.", status: "VERIFIED OR FLAGGED" },
    { week: "WEEKS 2–4", code: "CORE INSTALLATION — MODULES 1–3", body: "Driver Qualification System built. Drug & Alcohol program enrolled. Every driver qualified before first dispatch.", status: null },
    { week: "WEEK 4", code: "CHECKPOINT 02 — IMPLEMENTATION SEQUENCE AUDIT", body: "All active tasks reviewed against Standard. Carrier approved to advance or assigned a correction window.", status: "ADVANCE OR CORRECT" },
    { week: "WEEKS 5–7", code: "CORE INSTALLATION — MODULES 4–5", body: "Hours of Service and ELD documented. Preventive Maintenance system and vehicle files built.", status: null },
    { week: "WEEK 7", code: "CHECKPOINT 03 — MID-POINT DOCUMENTATION REVIEW", body: "DQ, D&A, HOS, PM, and insurance verified simultaneously against operational reality — not just policy intent.", status: "SYSTEMS VERIFIED" },
    { week: "WEEKS 8–10", code: "CORE INSTALLATION — MODULES 6–9", body: "Insurance continuity verified on FMCSA system. Load profitability, broker relationships, and carrier packet complete.", status: null },
    { week: "WEEK 11", code: "CHECKPOINT 04 — PRE-AUDIT SIMULATION", body: "Installed systems walked against all 16 exposure patterns. Remaining gaps corrected before the audit window opens.", status: "AUDIT-READY OR CORRECTION ISSUED" },
    { week: "WEEK 13", code: "CHECKPOINT 05 — INTEGRITY AUDIT · LP-VRF ISSUED", body: "All six compliance domains reviewed against final Standard. All pass — the Verified Registry ID is issued.", status: "VERIFIED REGISTRY ID ISSUED ✓", final: true },
  ];

  return section(
    <>
      <SectionLabel>LP-STD-001 · THE IMPLEMENTATION SEQUENCE · 90 DAYS</SectionLabel>
      <h2 className="section-headline" style={{ ...display, fontSize: 48, color: T.white, lineHeight: 1.15, maxWidth: 680, marginBottom: 16 }}>
        This Is How the<br />
        <span style={{ color: T.goldText }}>System Gets Installed.</span>
      </h2>
      <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, maxWidth: 600, marginBottom: 56 }}>
        Not studied. Not read. Installed. 90 days. 10 modules. 5 human verification checkpoints.
        You do the work. The Station Custodian verifies it's correct.
      </p>

      <div style={{ position: "relative" }}>
        <div className="hide-mobile" style={{ position: "absolute", left: 119, top: 0, bottom: 0, width: 1, background: T.navyBorder }} />
        {checkpoints.map((cp, i) => (
          <div key={i} style={{ display: "flex", gap: 0, marginBottom: 4 }}>
            <div className="hide-mobile" style={{ width: 120, flexShrink: 0, paddingTop: 22, textAlign: "right", paddingRight: 24 }}>
              <span style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.1em" }}>{cp.week}</span>
            </div>
            <div className="hide-mobile" style={{ width: 20, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 26 }}>
              <div style={{
                width: cp.status ? 12 : 8, height: cp.status ? 12 : 8,
                background: cp.status ? T.gold : T.navyBorder,
                border: cp.status ? "none" : `1px solid ${T.fog}`,
                borderRadius: cp.final ? 0 : "50%",
                transform: cp.final ? "rotate(45deg)" : "none",
                flexShrink: 0,
              }} />
            </div>
            <div style={{
              flex: 1, marginLeft: 20, marginBottom: 8,
              background: cp.status ? T.navyCard : "transparent",
              border: cp.status ? `1px solid ${cp.final ? T.gold : T.navyBorder}` : "none",
              padding: cp.status ? "24px 28px" : "16px 28px",
            }}>
              <p style={{ ...mono, fontSize: 10, color: cp.status ? T.goldText : T.fog, letterSpacing: "0.14em", marginBottom: 8 }}>{cp.code}</p>
              {cp.body.split("\n\n").map((para, j) => (
                <p key={j} style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, marginBottom: 8 }}>{para}</p>
              ))}
              {cp.status && (
                <p style={{ ...mono, fontSize: 10, color: cp.final ? T.gold : T.goldDim, letterSpacing: "0.14em", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.navyBorder}` }}>
                  STATUS: {cp.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <GoldLine />

      <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "36px 40px" }}>
        <p style={{ ...mono, fontSize: 10, color: T.gold, letterSpacing: "0.16em", marginBottom: 20 }}>
          WHAT THE STATION CUSTODIAN IS — AND ISN'T
        </p>
        <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, marginBottom: 20 }}>
          The Station Custodian is not a coach. Not a consultant. Not an AI check.
        </p>
        <p style={{ ...serif, fontSize: 17, color: T.white, lineHeight: 1.7, marginBottom: 20 }}>
          The Station Custodian is <strong>Vince Lawrence</strong> — 25+ years in safety, compliance, and operations.
          He reviews your actual files against the same criteria an FMCSA investigator uses during a New Entrant audit.
          He finds the gap before the investigator does.
        </p>
        <blockquote style={{ borderLeft: `3px solid ${T.gold}`, paddingLeft: 20, margin: "24px 0 0" }}>
          <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, fontStyle: "italic", marginBottom: 8 }}>
            "Each checkpoint is manually verified before you proceed.
            This is not a course you click through —
            it's a system that gets installed correctly or not at all."
          </p>
          <p style={{ ...mono, fontSize: 11, color: T.fog, letterSpacing: "0.08em" }}>— Vince Lawrence, Station Custodian LP-VNL</p>
        </blockquote>
      </div>

      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
        <CTAButton onClick={handleAuthorize} primary disabled={checkoutLoading}>
          {checkoutLoading ? "PROCESSING..." : "AUTHORIZE FULL SYSTEM →"}
        </CTAButton>
        <p style={{ ...mono, fontSize: 11, color: T.fog, letterSpacing: "0.06em" }}>$2,500 · 12 CARRIERS MAXIMUM · START IMMEDIATELY</p>
      </div>
    </>,
    T.navyMid
  );
}
