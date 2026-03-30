import { T, mono, serif, display } from "../tokens";
import { GoldDivider, SectionLabel, section } from "../SharedComponents";
import { Link } from "../../../compat/Link";

export default function ProblemSection() {
  const LEFT_PATTERNS = [
    "Driver dispatched before Medical Examiner's Certificate verified",
    "D&A program enrolled after first dispatch — not before",
    "DQ file missing employment history going back 3 years",
    "No written Hours of Service policy on file",
    "ELD configured — but never verified against Part 395 requirements",
    "Maintenance records exist — but not in a format FMCSA accepts",
    "Annual inspection on file — but no DVIR system in place",
    "Insurance certificate current — filing not verified active on FMCSA system",
  ];
  const RIGHT_PATTERNS = [
    "MCS-150 filed at registration — never updated after first year",
    "UCR registration paid — wrong classification used",
    "Drug testing policy written — random testing pool never activated",
    "Clearinghouse query run at hire — annual query never scheduled",
    "BOC-3 filed — process agent out of state, filing outdated",
    "Operating authority active — broker packet never built to carrier packet standard",
    "Hazmat endorsement on CDL — no hazmat training documentation on file",
    "Pre-trip inspection process in place — no written DVIR procedure",
  ];

  return (
    <>
      {section(
        <>
          <SectionLabel>LP-CASE-001 · THE PATTERN · WHY CARRIERS FAIL</SectionLabel>
          <h2 className="section-headline" style={{ ...display, fontSize: 48, color: T.white, lineHeight: 1.15, maxWidth: 700, marginBottom: 28 }}>
            The System Was Never<br />
            Installed. That's It.<br />
            <span style={{ color: T.goldText }}>That's the Whole Reason.</span>
          </h2>
          <p style={{ ...serif, fontSize: 18, color: T.mist, lineHeight: 1.7, maxWidth: 660, marginBottom: 48 }}>
            New carriers don't lose their authority because they can't drive.
            They don't fail because they can't find freight.
            They fail because the federal government expects a fully documented compliance infrastructure to exist
            from Day 1 — and they never built it.
          </p>

          <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "36px clamp(20px, 4vw, 40px)", marginBottom: 48 }}>
            <p style={{ ...mono, fontSize: 10, color: T.gold, letterSpacing: "0.16em", marginBottom: 24 }}>
              LP-PATTERN-001 · OBSERVED ACROSS 200+ OPERATIONS
            </p>
            <p style={{ ...serif, fontSize: 17, color: T.mist, marginBottom: 24, fontStyle: "italic", lineHeight: 1.7 }}>
              This is what an unstructured first year looks like:
            </p>
            {[
              ["Authority activates.", "Clock starts. Carrier doesn't know it."],
              ["First loads move.", "No DQ file built. Driver dispatched unqualified."],
              ["Month 3 —", "D&A program exists on paper. Not enrolled with a C/TPA."],
              ["Month 6 —", "Insurance files current on carrier's end. Not verified on FMCSA's system."],
              ["Month 9 —", "Audit notice arrives. Carrier pulls files. Gaps everywhere."],
              ["Month 11 —", "Conditional rating issued. 45 days to correct or lose authority."],
              ["Month 14 —", "Authority revoked. Restart costs $40,000."],
            ].map(([label, desc], i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ ...mono, fontSize: 11, color: T.gold, flexShrink: 0, minWidth: 120, paddingTop: 2 }}>→ {label}</span>
                <span style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7 }}>{desc}</span>
              </div>
            ))}
            <GoldDivider />
            <p style={{ ...serif, fontSize: 17, color: T.fog, lineHeight: 1.7 }}>
              The failure wasn't the audit.<br />
              <strong style={{ color: T.white }}>The failure was Month 1.</strong>
            </p>
          </div>

          <div className="three-col" style={{ display: "flex", gap: 2, marginBottom: 48 }}>
            {[
              ["$10,000–$25,000+", "Average cost of a failed New Entrant Safety Audit — remediation, downtime, insurance cancellation, reapplication."],
              ["87 days", "Average time from authority activation to first compliance failure in an unstructured operation."],
              ["18 months", "Your audit window. It opened on Day 1. It does not wait for you to be ready."],
            ].map(([stat, desc], i) => (
              <div key={i} style={{ flex: 1, background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "28px 24px" }}>
                <p style={{ ...display, fontSize: 32, color: T.goldText, fontWeight: 700, marginBottom: 12, lineHeight: 1.1 }}>{stat}</p>
                <p style={{ ...serif, fontSize: 17, color: T.fog, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "36px clamp(20px, 4vw, 40px)", marginBottom: 48 }}>
            <p style={{ ...mono, fontSize: 10, color: T.gold, letterSpacing: "0.16em", marginBottom: 16 }}>
              LP-FAILURE-001 · THE 16 EXPOSURE PATTERNS
            </p>
            <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, marginBottom: 24 }}>
              These are not edge cases. These are the same 16 failure points, repeating across carriers,
              in months 6, 9, and 14 — regardless of freight type, fleet size, or experience level.
            </p>
            <div className="two-col" style={{ display: "flex", gap: 24 }}>
              <div style={{ flex: 1 }}>
                {LEFT_PATTERNS.slice(0, 4).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "#7A3535", flexShrink: 0, marginTop: 4, fontSize: 13 }}>✕</span>
                    <span style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {RIGHT_PATTERNS.slice(0, 4).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "#7A3535", flexShrink: 0, marginTop: 4, fontSize: 13 }}>✕</span>
                    <span style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, borderTop: `1px solid ${T.navyBorder}`, paddingTop: 16 }}>
              <Link
                href="/standards/16-deadly-sins"
                data-testid="see-all-16-patterns-link"
                style={{
                  ...mono, fontSize: 11, color: T.goldText,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 0", textDecoration: "none",
                }}
              >
                SEE ALL 16 PATTERNS →
              </Link>
            </div>
            <GoldDivider />
            <p style={{ ...serif, fontSize: 17, color: T.fog, lineHeight: 1.7 }}>
              Every one of these is an automatic or near-automatic audit failure.{" "}
              Every one of them is preventable.{" "}
              They require a system.
            </p>
          </div>

          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <p style={{ ...display, fontSize: 22, color: T.white, fontWeight: 700, lineHeight: 1.6 }}>
              Failure here is structural, not personal.<br />
              The system either exists or it doesn't.<br />
              <span style={{ color: T.goldText }}>LaunchPath installs it.</span>
            </p>
          </div>
        </>,
        T.navy
      )}
    </>
  );
}
