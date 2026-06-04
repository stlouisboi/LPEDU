import { T, mono, serif, display } from "../tokens";
import { section, SectionLabel } from "../SharedComponents";

const OUTCOMES = [
  {
    code: "LP-CF-001",
    profile: "Owner-operator · dry van · 1 power unit · Southeast",
    enrolled: "Month 2 of 18-month window",
    gap: "DQ file architecture — 4 of 7 §391 required elements absent or non-compliant at entry. No annual MVR review scheduled. No medical certificate tracking.",
    result: "SATISFACTORY",
    violations: "1 recordable — §391.51 incomplete employment history. Corrective documentation submitted and accepted prior to audit close.",
    note: "Authority retained.",
  },
  {
    code: "LP-CF-002",
    profile: "Small fleet · dry van · 3 power units · 4 drivers · Mid-South",
    enrolled: "Month 3 of 18-month window",
    gap: "§382 Drug & Alcohol program not established at authority activation. Consortium membership absent. No pre-employment testing documentation on file for 2 of 4 drivers.",
    result: "SATISFACTORY",
    violations: "0 acute · 0 recordable",
    note: "Authority retained.",
  },
  {
    code: "LP-CF-003",
    profile: "Owner-operator · flatbed · 1 power unit · Mid-Atlantic",
    enrolled: "Month 5 of 18-month window",
    gap: "No vehicle preventive maintenance records. DVIRs inconsistent — treated as optional. HOS logs missing off-duty and sleeper berth notations across several weeks.",
    result: "SATISFACTORY",
    violations: "2 recordable — §396.11 DVIR gaps and §395.8 HOS notation gaps. Both pre-enrollment. Corrective action plans accepted.",
    note: "Authority retained.",
  },
];

export default function VerifiedOutcomesSection() {
  return section(
    <>
      <SectionLabel>LP-CF-SERIES · VERIFIED OUTCOMES</SectionLabel>
      <h2
        className="section-headline"
        style={{ ...display, color: T.white, lineHeight: 1.1, maxWidth: 800, marginBottom: 20 }}
      >
        Three Carriers. Three Audit Windows.<br />
        <span style={{ color: T.goldText }}>All Three: Satisfactory.</span>
      </h2>
      <p style={{ ...serif, fontSize: 16, color: "rgba(245,242,236,0.68)", maxWidth: 620, marginBottom: 52, lineHeight: 1.8 }}>
        Anonymized records from LaunchPath carriers who completed the Standard and went through their FMCSA New Entrant Safety Audit. Every result is documented.
      </p>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
        className="outcomes-grid"
        data-testid="verified-outcomes-grid"
      >
        {OUTCOMES.map((o) => (
          <div key={o.code} style={{ background: T.navyCard, padding: "32px 28px", borderTop: `2px solid ${T.gold}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
              <p style={{ ...mono, fontSize: 9, color: T.gold, letterSpacing: "0.18em" }}>{o.code}</p>
              <span
                data-testid={`outcome-badge-${o.code}`}
                style={{
                  ...mono,
                  fontSize: 8,
                  color: "#4ade80",
                  background: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  padding: "3px 9px",
                  letterSpacing: "0.14em",
                }}
              >
                {o.result}
              </span>
            </div>

            <p style={{ ...mono, fontSize: 10, color: "rgba(245,242,236,0.48)", marginBottom: 20, lineHeight: 1.7 }}>
              {o.profile}
            </p>

            <p style={{ ...mono, fontSize: 9, color: T.gold, marginBottom: 8, letterSpacing: "0.12em" }}>
              GAP AT ENTRY
            </p>
            <p style={{ ...serif, fontSize: 13.5, color: "rgba(245,242,236,0.80)", lineHeight: 1.7, marginBottom: 24 }}>
              {o.gap}
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 18 }}>
              <p style={{ ...mono, fontSize: 9, color: "rgba(245,242,236,0.38)", marginBottom: 6, letterSpacing: "0.1em" }}>
                AUDIT VIOLATIONS
              </p>
              <p style={{ ...mono, fontSize: 10, color: "rgba(245,242,236,0.62)", lineHeight: 1.65 }}>
                {o.violations}
              </p>
              <p style={{ ...mono, fontSize: 10, color: T.goldText, marginTop: 12, fontWeight: 700 }}>
                {o.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ ...mono, fontSize: 9.5, color: "rgba(245,242,236,0.25)", marginTop: 22, letterSpacing: "0.05em" }}>
        Carrier identifiers removed. Outcomes are on record at LaunchPath. Available for review during Ground 0.
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) {
          .outcomes-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </>,
    T.navy
  );
}
