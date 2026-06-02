import { Link } from '../compat/Link';

const GOLD  = "#C8933F";
const NAVY  = "#1B2A47";
const DEEP  = "#111D33";
const SLATE = "#8A96A8";
const BODY  = "rgba(244,241,235,0.82)";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";

const OWNER_WHEEL_BG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/5anp3im9_hero-owner-wheel.png";

const TIMELINE = [
  { mark: "MONTH 0",  event: "Authority granted. Operation starts." },
  { mark: "MONTH 6",  event: "First gaps surface — incomplete files, missing program." },
  { mark: "MONTH 9",  event: "Insurance continuity becomes shaky." },
  { mark: "MONTH 14", event: "Revocation. Restart costs $40,000.", final: true },
];

export default function ThePatternSection() {
  return (
    <section
      id="the-pattern"
      data-testid="the-pattern-section"
      style={{
        position: "relative",
        background: `linear-gradient(rgba(8,13,24,0.72) 0%, rgba(8,13,24,0.78) 100%), url("${OWNER_WHEEL_BG}") center 30%/cover no-repeat`,
        borderTop: "1px solid rgba(200,147,63,0.15)",
        borderBottom: "1px solid rgba(200,147,63,0.15)",
        padding: "6rem 1.5rem",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(197,160,89,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.04) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto" }}>

        {/* Two-column grid */}
        <div className="pattern-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>

          {/* LEFT — copy */}
          <div>
            <p className="reveal-on-scroll" style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", marginBottom: "1.75rem" }}>
              THE PATTERN
            </p>
            <h2 className="data-stream" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "2.5rem" }}>
              I'VE WATCHED THIS FAIL<br />200 TIMES.
            </h2>
            <p className="reveal-on-scroll d-160" style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.9, marginBottom: "1.25rem", maxWidth: 600 }}>
              A carrier gets authority. They start moving. The paperwork looks mostly done. The operation feels close enough. Then pressure shows up.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.9, marginBottom: "1.25rem", maxWidth: 600 }}>
              A file is incomplete. A required program was never fully installed. A maintenance record is missing. Insurance continuity gets shaky. Nothing looked urgent until it was expensive.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.9, marginBottom: "2rem", maxWidth: 600, fontStyle: "italic" }}>
              Failure here is structural, not personal. The guard either exists or it doesn't.
            </p>
            <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: "1.5rem", marginBottom: "2.5rem", maxWidth: 600 }}>
              <p style={{ fontFamily: SANS, fontSize: "1rem", fontStyle: "italic", color: GOLD, lineHeight: 1.8, margin: 0 }}>
                LaunchPath was built to stop that pattern — before the gaps become damage, before the records become evidence, before the pressure finds what is missing.
              </p>
            </div>
            <a
              href="#sixteen-sins"
              data-testid="sixteen-sins-link"
              style={{ fontFamily: MONO, fontSize: "0.806rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e8a958"}
              onMouseLeave={e => e.currentTarget.style.color = GOLD}
            >
              SEE THE 16 EXPOSURE PATTERNS →
            </a>
          </div>

          {/* RIGHT — data panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* 200 counter */}
            <div data-testid="pattern-counter" style={{ background: "rgba(8,13,24,0.70)", border: "1px solid rgba(200,147,63,0.22)", borderTop: `3px solid ${GOLD}`, padding: "1.75rem 1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,147,63,0.45)", margin: "0 0 0.5rem" }}>
                DOCUMENTED FAILURE PATTERN
              </p>
              <p style={{ fontFamily: SERIF, fontWeight: 900, fontSize: "5rem", color: GOLD, lineHeight: 1, margin: "0 0 0.375rem", letterSpacing: "-0.04em" }}>
                200
              </p>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(255,255,255,0.58)", letterSpacing: "0.12em", margin: 0 }}>
                CARRIERS · SAME SEQUENCE
              </p>
            </div>

            {/* Failure timeline */}
            <div data-testid="failure-timeline" style={{ background: "rgba(8,13,24,0.70)", border: "1px solid rgba(200,147,63,0.14)", padding: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,147,63,0.45)", margin: "0 0 1.25rem" }}>
                FAILURE SEQUENCE
              </p>
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 0, alignItems: "stretch", marginBottom: i < TIMELINE.length - 1 ? 0 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.final ? "rgba(231,76,60,0.70)" : "rgba(200,147,63,0.45)", flexShrink: 0, marginTop: 3 }} />
                    {i < TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 16, background: "rgba(200,147,63,0.15)", margin: "3px 0" }} />}
                  </div>
                  <div style={{ paddingLeft: "0.75rem", paddingBottom: i < TIMELINE.length - 1 ? "0.875rem" : 0 }}>
                    <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.12em", color: t.final ? "rgba(231,76,60,0.80)" : "rgba(200,147,63,0.55)", margin: "0 0 2px" }}>
                      {t.mark}
                    </p>
                    <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: t.final ? "rgba(231,76,60,0.70)" : "rgba(244,241,235,0.55)", lineHeight: 1.55, margin: 0, fontWeight: t.final ? 600 : 400 }}>
                      {t.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* $40,000 restart cost */}
            <div data-testid="restart-cost" style={{ background: "rgba(100,20,15,0.20)", border: "1px solid rgba(231,76,60,0.22)", padding: "1.25rem 1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(231,76,60,0.55)", margin: "0 0 0.375rem" }}>
                AVERAGE RESTART COST
              </p>
              <p style={{ fontFamily: SERIF, fontWeight: 900, fontSize: "2.25rem", color: "rgba(231,76,60,0.85)", lineHeight: 1, margin: "0 0 0.375rem", letterSpacing: "-0.02em" }}>
                $40,000
              </p>
              <p style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", margin: 0 }}>
                AFTER AUTHORITY REVOCATION
              </p>
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 860px) {
          .pattern-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
