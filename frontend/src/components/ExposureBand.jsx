const GOLD  = "#C8933F";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";

export default function ExposureBand() {
  return (
    <section
      data-testid="exposure-band"
      style={{
        background: "#040c18",
        borderTop: "2px solid rgba(200,147,63,0.50)",
        borderBottom: "1px solid rgba(200,147,63,0.15)",
        padding: "2.5rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint line grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(197,160,89,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.04) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
      {/* CRT scan-line overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: "3rem", alignItems: "flex-start", flexWrap: "wrap", position: "relative", zIndex: 1 }}>

        {/* Left: heading + status chips */}
        <div style={{ flexShrink: 0, minWidth: 280 }}>
          <p className="reveal-on-scroll" style={{
            fontFamily: MONO, fontSize: "0.600rem", fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(200,147,63,0.45)", margin: "0 0 0.625rem",
          }}>
            LP-EXP-STATUS
          </p>
          <h2 className="reveal-on-scroll d-80" style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.375rem)",
            color: GOLD, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 1.25rem",
          }}>
            ACTIVE DOES NOT<br />MEAN PROTECTED.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { code: "16", label: "AUTOMATIC FAILURE VIOLATIONS" },
              { code: "90", label: "DAYS TO FIRST AUDIT CALL" },
              { code: "12", label: "MONTH NEW-ENTRANT WINDOW" },
            ].map((chip, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(200,147,63,0.45)", flexShrink: 0 }} />
                <span style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, color: GOLD, letterSpacing: "0.06em", minWidth: 24 }}>{chip.code}</span>
                <span style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(255,255,255,0.58)", letterSpacing: "0.10em" }}>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: "rgba(200,147,63,0.20)", alignSelf: "stretch", minHeight: 48, flexShrink: 0 }} />

        {/* Right: body */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <p className="reveal-on-scroll d-160" style={{
            fontFamily: SANS, fontSize: "1rem",
            color: "rgba(244,241,235,0.72)", lineHeight: 1.82, margin: 0, maxWidth: 620,
          }}>
            An MC number can go live before the operation behind it is ready.{" "}
            <span style={{ color: "rgba(244,241,235,0.90)", fontWeight: 500 }}>
              Missing records, weak file discipline, insurance gaps, and uninstalled controls
            </span>{" "}
            do not stay small for long. They stay quiet until they reach in and do damage.
          </p>
        </div>

      </div>
    </section>
  );
}
