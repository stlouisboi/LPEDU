import Head from "next/head";

const NAVY   = "#1B2A4A";
const GOLD   = "#B8902A";
const MONO   = "'JetBrains Mono','IBM Plex Mono',monospace";
const BODY   = "'Source Sans 3','Source Sans Pro',sans-serif";
const HEAD_F = "'Inter',sans-serif";

const SECTION_A = [
  { num: "01", item: "Portal login active",          detail: "Log into portal.fmcsa.dot.gov. Confirm account is active, not disabled or archived." },
  { num: "02", item: "Company Official verified",    detail: "Owner or employee — not a consultant or third-party service. Must match Login.gov." },
  { num: "03", item: "Login.gov email matched",      detail: "Email on Portal account matches Login.gov account for Company Official exactly." },
  { num: "04", item: "MFA enabled",                  detail: "Multi-factor authentication active on Login.gov account." },
  { num: "05", item: "Backup Official designated",   detail: "Secondary person assigned in case primary Official is unavailable." },
];

const SECTION_B = [
  { num: "06", item: "MCS-150 current",              detail: "Biennial Update filed within last 24 months. Address, fleet count, and contacts current." },
  { num: "07", item: "Physical address verified",    detail: "Street address on file is inspectable. No PO Boxes. No virtual offices." },
  { num: "08", item: "Fleet count audited",          detail: "Vehicle count in FMCSA records matches actual equipment." },
  { num: "09", item: "BOC-3 status confirmed",       detail: "Verified active at safer.fmcsa.dot.gov. Provider still registered and operating." },
  { num: "10", item: "FMCSA alerts active",          detail: "Subscribed to FMCSA email alerts. Phase 2 invitation will arrive via email — do not attempt Motus access before it arrives." },
];

function CheckRow({ num, item, detail }) {
  return (
    <tr style={{ borderBottom: `1px solid rgba(27,42,74,0.12)` }}>
      <td style={{ padding: "10px 8px", fontFamily: MONO, fontSize: "11px", fontWeight: 700, color: GOLD, whiteSpace: "nowrap", verticalAlign: "top" }}>{num}</td>
      <td style={{ padding: "10px 12px 10px 8px", width: 32, verticalAlign: "top" }}>
        <div style={{ width: 14, height: 14, border: `1.5px solid ${NAVY}`, borderRadius: 2, marginTop: 1 }} />
      </td>
      <td style={{ padding: "10px 12px 10px 0", fontFamily: HEAD_F, fontSize: "12px", fontWeight: 700, color: NAVY, whiteSpace: "nowrap", verticalAlign: "top" }}>{item}</td>
      <td style={{ padding: "10px 8px 10px 0", fontFamily: BODY, fontSize: "11.5px", color: "#374151", lineHeight: 1.5, verticalAlign: "top" }}>{detail}</td>
    </tr>
  );
}

export default function MotusChecklist() {
  return (
    <>
      <Head>
        <title>Motus Transition Checklist — LP-CUR-M1-L9 | LaunchPath</title>
        <meta name="robots" content="noindex" />
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { size: letter portrait; margin: 0.5in; }
          }
          body { margin: 0; background: #f3f4f6; }
        `}</style>
      </Head>

      {/* Print button — hidden when printing */}
      <div className="no-print" style={{ background: NAVY, padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          LP-CUR-M1-L9 | Motus Transition Checklist
        </span>
        <button
          onClick={() => window.print()}
          style={{ fontFamily: HEAD_F, fontSize: "13px", fontWeight: 700, color: "#fff", background: GOLD, border: "none", padding: "8px 20px", cursor: "pointer", letterSpacing: "0.04em" }}
        >
          Print / Save as PDF
        </button>
      </div>

      {/* US Letter page */}
      <div style={{ maxWidth: 816, margin: "24px auto", background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}>

        {/* Header band */}
        <div style={{ background: NAVY, padding: "24px 32px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <span style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              LAUNCHPATH TRANSPORTATION EDU&nbsp;&nbsp;/&nbsp;&nbsp;LP-CUR-M1-L9
            </span>
            <span style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              AUTHORITY PROTECTION · MODULE 1
            </span>
          </div>
          <div style={{ height: 2, background: GOLD, marginBottom: 16, width: 64 }} />
          <h1 style={{ fontFamily: HEAD_F, fontWeight: 700, fontSize: "22px", color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
            MOTUS TRANSITION CHECKLIST
          </h1>
          <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(255,255,255,0.58)", margin: 0, lineHeight: 1.5 }}>
            10-Step Monthly Verification — Run at the same time as your IFTA quarterly prep.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 32px 24px" }}>

          {/* Section A */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 3, height: 18, background: GOLD }} />
              <span style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, color: NAVY, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                SECTION A — PORTAL & ACCOUNT
              </span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", borderTop: `2px solid ${NAVY}` }}>
              <thead>
                <tr style={{ background: "rgba(27,42,74,0.04)" }}>
                  <th style={{ padding: "6px 8px", fontFamily: MONO, fontSize: "9px", fontWeight: 700, color: "rgba(27,42,74,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "left", width: 30 }}>#</th>
                  <th style={{ width: 32 }} />
                  <th style={{ padding: "6px 8px 6px 0", fontFamily: MONO, fontSize: "9px", fontWeight: 700, color: "rgba(27,42,74,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "left", width: 180 }}>ITEM</th>
                  <th style={{ padding: "6px 8px 6px 0", fontFamily: MONO, fontSize: "9px", fontWeight: 700, color: "rgba(27,42,74,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "left" }}>REQUIREMENT / DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {SECTION_A.map(r => <CheckRow key={r.num} {...r} />)}
              </tbody>
            </table>
          </div>

          {/* Section B */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 3, height: 18, background: GOLD }} />
              <span style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 700, color: NAVY, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                SECTION B — DATA & FILINGS
              </span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", borderTop: `2px solid ${NAVY}` }}>
              <thead>
                <tr style={{ background: "rgba(27,42,74,0.04)" }}>
                  <th style={{ padding: "6px 8px", fontFamily: MONO, fontSize: "9px", fontWeight: 700, color: "rgba(27,42,74,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "left", width: 30 }}>#</th>
                  <th style={{ width: 32 }} />
                  <th style={{ padding: "6px 8px 6px 0", fontFamily: MONO, fontSize: "9px", fontWeight: 700, color: "rgba(27,42,74,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "left", width: 180 }}>ITEM</th>
                  <th style={{ padding: "6px 8px 6px 0", fontFamily: MONO, fontSize: "9px", fontWeight: 700, color: "rgba(27,42,74,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "left" }}>REQUIREMENT / DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {SECTION_B.map(r => <CheckRow key={r.num} {...r} />)}
              </tbody>
            </table>
          </div>

          {/* Operating instructions */}
          <div style={{ background: "rgba(27,42,74,0.04)", border: `1px solid rgba(27,42,74,0.14)`, borderLeft: `3px solid ${GOLD}`, padding: "14px 18px", marginBottom: 24 }}>
            <p style={{ fontFamily: MONO, fontSize: "9px", fontWeight: 700, color: NAVY, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>OPERATING INSTRUCTIONS</p>
            <p style={{ fontFamily: BODY, fontSize: "11.5px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
              <strong>Owner:</strong> Company Official — the person designated on the FMCSA Portal account.<br />
              <strong>Frequency:</strong> Monthly. Run at the same time as IFTA quarterly prep. This checklist will be wired into the LaunchPath recurring admin calendar in Module 3.<br />
              <strong>Important:</strong> Do not create a Motus account until FMCSA sends the Phase 2 carrier invitation. Until then, all filings remain in the legacy system.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: NAVY, padding: "12px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            LP-CUR-M1-L9 | Motus Transition Checklist | Authority Protection<br />
            LaunchPath Transportation EDU | launchpathedu.com
          </span>
          <span style={{ fontFamily: MONO, fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "right" }}>
            Cohort use only<br />Not for redistribution
          </span>
        </div>
      </div>
    </>
  );
}
