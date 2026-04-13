const GOLD  = "#C8933F";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";
const BODY  = "rgba(244,241,235,0.80)";
const DEEP  = "#111D33";

// ── Element 1 — Deliverables (spec copy, LP-WEB-002 v2.0) ─────────────────
const BUILT_ITEMS = [
  {
    code: "01",
    item: <>A complete <a href="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={{ color: "#C8933F", textDecoration: "none" }}>Driver Qualification file</a> for every active driver, built to 49 CFR Part 391 expectations — application, MVRs, prior employer inquiries, medical certificate, and annual review documentation.</>,
    group: "core",
  },
  {
    code: "02",
    item: <>A functioning <a href="/knowledge-center/dot-drug-alcohol-program-requirements" style={{ color: "#C8933F", textDecoration: "none" }}>Drug and Alcohol</a> testing program with a registered C/TPA, a designated DER in writing, and pre-employment and random testing documented.</>,
    group: "core",
  },
  {
    code: "03",
    item: "An ELD compliance package for every vehicle that requires it — device on the FMCSA approved list, in-cab instructions, malfunction procedures, and a documented log review process.",
    group: "core",
  },
  {
    code: "04",
    item: "An Annual Inspection record and unit file for every power unit, with DVIRs and repair documentation tied to real equipment, not theory.",
    group: "core",
  },
  {
    code: "05",
    item: "An Insurance Continuity protocol that keeps lapses from silently revoking your authority — BMC-91 monitoring, renewal calendar, and internal verification checks.",
    group: "core",
  },
  {
    code: "06",
    item: "A cash-flow protection structure — rate discipline, payment gap guardrails, and an emergency reserve plan — that keeps you from taking desperate freight just to survive the week.",
    group: "core",
  },
  {
    code: "07",
    item: "A Verified Registry ID confirming your systems were installed and passed the Integrity Audit at the end of the 90-day build.",
    group: "core",
  },
];

// ── Element 2 — "90 / 5 / 5" Counter explainer (LP-WEB-002 v2.0) ──────────
const COUNTER_ITEMS = [
  {
    stat: "90",
    unit: "days",
    definition: "The implementation window to install the Standard in a real carrier operation — not in theory.",
  },
  {
    stat: "5",
    unit: "compliance domains",
    definition: "Authority, insurance, drivers, vehicles, and operations. Every domain covered. No gaps left unaddressed.",
  },
  {
    stat: "5",
    unit: "custodian checkpoints",
    definition: "Five moments where we stop and verify that what was built on paper now exists in your files, systems, and actual behavior.",
  },
];

export default function WhatGetsBuiltSection() {
  return (
    <section
      data-testid="what-gets-built-section"
      style={{
        background: "#041020",
        backgroundImage: "radial-gradient(rgba(200,147,63,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        borderTop: "1px solid rgba(200,147,63,0.15)",
        borderBottom: "1px solid rgba(200,147,63,0.15)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Label */}
        <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", marginBottom: "1.25rem" }}>
          LP-BUILD-TRACK — 90-DAY INSTALLATION WINDOW
        </p>

        {/* Headline — Element 1 title (Option A) */}
        <h2 className="data-stream" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "1.5rem" }}>
          What You Build in 90 Days: An Audit-Ready Compliance System
        </h2>

        {/* Gold rule */}
        <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "1.75rem", opacity: 0.75 }} />

        {/* Lead paragraph — spec copy */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 680, marginBottom: "3rem" }}>
          At the end of the LaunchPath Standard, you will not just "know more about compliance." You will have specific systems and records installed in your operation:
        </p>

        {/* Deliverables checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(200,147,63,0.14)", marginBottom: "2rem" }}>
          {BUILT_ITEMS.map((b, i) => (
            <div
              key={b.code}
              data-testid={`built-item-${i}`}
              style={{
                display: "flex", gap: "1.5rem", alignItems: "flex-start",
                padding: "1.375rem 1.5rem",
                borderBottom: i < BUILT_ITEMS.length - 1 ? "1px solid rgba(200,147,63,0.10)" : "none",
                background: i % 2 === 0 ? "rgba(200,147,63,0.025)" : "transparent",
              }}
            >
              <span style={{
                fontFamily: MONO, fontSize: "0.875rem", fontWeight: 700,
                letterSpacing: "0.08em", color: GOLD, flexShrink: 0,
                paddingTop: "0.15rem", minWidth: "2rem",
              }}>
                {b.code}
              </span>
              <span style={{ fontFamily: SANS, fontSize: "0.980rem", color: BODY, lineHeight: 1.78 }}>
                {b.item}
              </span>
            </div>
          ))}
        </div>

        {/* Closing line — spec copy, italic */}
        <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(244,241,235,0.60)", lineHeight: 1.85, maxWidth: 660, fontStyle: "italic", marginBottom: "4rem" }}>
          This is what "protected authority" looks like in practice — files in place, programs documented, and systems that survive first contact with an auditor.
        </p>

        {/* Divider before counter */}
        <div style={{ width: "100%", height: 1, background: "rgba(200,147,63,0.14)", marginBottom: "4rem" }} />

        {/* ── Element 2 — "90 / 5 / 5" Counter ─────────────────────────── */}
        {/* Counter stat row */}
        <div
          data-testid="ninety-five-five-counter"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            border: "1px solid rgba(200,147,63,0.18)",
            marginBottom: "2.5rem",
          }}
          className="counter-grid"
        >
          {COUNTER_ITEMS.map((c, i) => (
            <div
              key={i}
              data-testid={`counter-item-${i}`}
              style={{
                padding: "2rem 1.5rem",
                borderRight: i < COUNTER_ITEMS.length - 1 ? "1px solid rgba(200,147,63,0.14)" : "none",
                textAlign: "center",
              }}
            >
              <p style={{
                fontFamily: SERIF, fontWeight: 800,
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                color: GOLD, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "0.375rem",
              }}>
                {c.stat}
              </p>
              <p style={{
                fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(200,147,63,0.55)", marginBottom: 0,
              }}>
                {c.unit}
              </p>
            </div>
          ))}
        </div>

        {/* Explainer title */}
        <p style={{
          fontFamily: SANS, fontWeight: 700, fontSize: "1.05rem",
          color: "#FFFFFF", marginBottom: "1.5rem",
        }}>
          What "90 / 5 / 5" Means
        </p>

        {/* Explainer definitions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "4rem" }}>
          {COUNTER_ITEMS.map((c, i) => (
            <div
              key={i}
              data-testid={`counter-explainer-${i}`}
              style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}
            >
              <span style={{
                fontFamily: SERIF, fontWeight: 800, fontSize: "1.5rem",
                color: GOLD, flexShrink: 0, lineHeight: 1, minWidth: "2.5rem",
              }}>
                {c.stat}
              </span>
              <div>
                <p style={{
                  fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "rgba(200,147,63,0.65)", marginBottom: "0.35rem",
                }}>
                  {c.unit}
                </p>
                <p style={{
                  fontFamily: SANS, fontSize: "0.952rem",
                  color: BODY, lineHeight: 1.78, margin: 0,
                }}>
                  {c.definition}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Day 1 vs Day 90 mini-band */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid rgba(200,147,63,0.14)" }} className="wgb-day-grid">
          {[
            {
              label: "DAY 1",
              accent: "rgba(192,57,43,0.60)",
              bg: "rgba(192,57,43,0.04)",
              border: "2px solid rgba(192,57,43,0.30)",
              copy: "The authority may be active, but the operation can still be exposed. Files may be incomplete. Controls may be weak. Responsibilities may be unclear. The carrier is moving, but not fully guarded.",
            },
            {
              label: "DAY 90",
              accent: "rgba(61,153,112,0.80)",
              bg: "rgba(61,153,112,0.04)",
              border: "2px solid rgba(61,153,112,0.25)",
              copy: "The operation is no longer being run from memory, panic, or assumption. Core records are more organized. Major gaps have been surfaced. Required controls are more visible. The guard is being installed in working form.",
            },
          ].map(({ label, accent, bg, border, copy }) => (
            <div key={label} style={{ padding: "1.5rem", background: bg, borderLeft: border }}>
              <p style={{ fontFamily: MONO, fontSize: "0.525rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, margin: "0 0 0.75rem" }}>{label}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.888rem", color: "rgba(244,241,235,0.62)", lineHeight: 1.75, margin: 0 }}>{copy}</p>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 600px) {
          .wgb-day-grid { grid-template-columns: 1fr !important; }
          .counter-grid { grid-template-columns: 1fr !important; }
          .counter-grid > div { border-right: none !important; border-bottom: 1px solid rgba(200,147,63,0.14); }
          .counter-grid > div:last-child { border-bottom: none; }
        }
      `}} />
    </section>
  );
}
