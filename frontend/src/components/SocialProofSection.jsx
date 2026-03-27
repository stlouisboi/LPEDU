import { useState, useEffect, useRef } from "react";

const INTERVAL_MS = 6000;

const CASES = [
  {
    code: "LP-OPR-TYPE-A · OUTCOME LOG",
    label: "Pre-Dispatch Authority",
    domain: "DQ File + D&A Program",
    region: "Owner-Operator · Single Truck · Dry Van",
    stat: "0",
    statLabel: "Audit Findings",
    statSub: "Month 14 new entrant audit",
    quote:
      "We built the DQ file and enrolled the D&A program before the first load moved. FMCSA conducted their review in Month 14. No findings. That's what the system was built to produce.",
    timeframe: "MC activated Jan 2024 · LP-VRF issued Apr 2024",
  },
  {
    code: "LP-OPR-TYPE-B · OUTCOME LOG",
    label: "Approaching Audit Window",
    domain: "Insurance + HOS Verification",
    region: "Owner-Operator · Two Trucks · Expedited",
    stat: "3",
    statLabel: "Gaps Closed",
    statSub: "Before the Month 9 window opened",
    quote:
      "The REACH Assessment flagged three open exposures we didn't know about. Insurance filing wasn't verified active on FMCSA's system. D&A random pool wasn't activated. HOS policy existed — but wasn't signed by the driver. All three closed before the audit window.",
    timeframe: "Enrolled Month 7 · No audit findings",
  },
  {
    code: "LP-OPR-TYPE-C · OUTCOME LOG",
    label: "Post-Audit Notice",
    domain: "Module 7 — Post-Failure Recovery",
    region: "Small Fleet · 3 Trucks · Power-Only",
    stat: "38",
    statLabel: "Days to Clear",
    statSub: "Conditional rating resolved (45-day window)",
    quote:
      "The audit notice came in Month 12. We had a Conditional rating and a 45-day correction window. Module 7 was the exact protocol we needed — not general advice, a specific corrective sequence. Filed within 38 days. Conditional cleared.",
    timeframe: "Enrolled after audit notice · Cleared before deadline",
  },
  {
    code: "LP-OPR-TYPE-A · OUTCOME LOG",
    label: "Pre-Authority Installation",
    domain: "Full 90-Day Standard",
    region: "Pre-Launch Operator · 1 Truck · Flatbed",
    stat: "LP-VRF",
    statLabel: "Issued Week 13",
    statSub: "Verified Registry ID on file",
    quote:
      "We enrolled before the authority clock started. The system was installed and verified before we moved a single load. When FMCSA ran their new entrant review, every file was in order. The Registry ID is what our broker required to expand the relationship.",
    timeframe: "Pre-authority enrollment · VRF issued at Week 13",
  },
];

export default function SocialProofSection() {
  const [active, setActive]     = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef  = useRef(null);
  const progressRef  = useRef(null);
  const startTimeRef = useRef(Date.now());

  const goTo = (idx) => {
    setActive(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const advance = () => {
    setActive(a => (a + 1) % CASES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    intervalRef.current = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, []); // eslint-disable-line

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(100, (elapsed / INTERVAL_MS) * 100));
    };
    progressRef.current = setInterval(tick, 60);
    return () => clearInterval(progressRef.current);
  }, [active]);

  const c = CASES[active];

  return (
    <section style={{ background: "#0b1628", borderTop: "1px solid rgba(212,144,10,0.12)", borderBottom: "1px solid rgba(212,144,10,0.12)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(212,144,10,0.7)", textTransform: "uppercase", marginBottom: 14 }}>
            LP-OUTCOME.LOG · OPERATOR RESULTS
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, color: "#F5F2EC", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: 560 }}>
            What the System<br />
            <span style={{ color: "#D4A94E" }}>Produces in the Field.</span>
          </h2>
        </div>

        {/* Card */}
        <div
          key={active}
          data-testid="case-study-card"
          style={{
            background: "#0d1a2d",
            border: "1px solid #1E2D42",
            borderLeft: "3px solid #C9A84C",
            padding: "40px 44px",
            animation: "lp-fade-in 0.45s ease both",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes lp-fade-in {
              from { opacity: 0; transform: translateY(12px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}} />

          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>

            {/* Stat */}
            <div style={{ flexShrink: 0, minWidth: 140, borderRight: "1px solid #1E2D42", paddingRight: 40 }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(212,144,10,0.6)", letterSpacing: "0.16em", marginBottom: 10, textTransform: "uppercase" }}>
                {c.code}
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, color: "#D4A94E", lineHeight: 1, marginBottom: 6 }}>
                {c.stat}
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#F5F2EC", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                {c.statLabel}
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#4A6070", letterSpacing: "0.08em" }}>
                {c.statSub}
              </p>
            </div>

            {/* Quote + meta */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "#4A6070", background: "#0B1220", border: "1px solid #1E2D42", padding: "3px 8px" }}>
                  {c.label}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "rgba(212,144,10,0.55)", background: "#0B1220", border: "1px solid rgba(212,144,10,0.2)", padding: "3px 8px" }}>
                  {c.domain}
                </span>
              </div>
              <blockquote style={{ borderLeft: "none", margin: 0, padding: 0 }}>
                <p style={{ fontFamily: "'Source Sans 3', 'Source Sans Pro', sans-serif", fontSize: "1.05rem", color: "#8FA3B8", lineHeight: 1.75, fontStyle: "italic", marginBottom: 20 }}>
                  "{c.quote}"
                </p>
              </blockquote>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#4A6070", letterSpacing: "0.08em" }}>
                {c.region} · {c.timeframe}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#1E2D42" }}>
            <div style={{ height: "100%", background: "#C9A84C", width: `${progress}%`, transition: "width 0.06s linear" }} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, flexWrap: "wrap", gap: 16 }}>
          {/* Dots */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {CASES.map((cs, i) => (
              <button
                key={i}
                data-testid={`case-dot-${i}`}
                onClick={() => { clearInterval(intervalRef.current); goTo(i); intervalRef.current = setInterval(advance, INTERVAL_MS); }}
                aria-label={cs.label}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  background: i === active ? "#C9A84C" : "#1E2D42",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              data-testid="case-prev-btn"
              onClick={() => { clearInterval(intervalRef.current); goTo((active - 1 + CASES.length) % CASES.length); intervalRef.current = setInterval(advance, INTERVAL_MS); }}
              style={{ width: 36, height: 36, background: "transparent", border: "1px solid #1E2D42", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2D42"}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="#8FA3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              data-testid="case-next-btn"
              onClick={() => { clearInterval(intervalRef.current); advance(); intervalRef.current = setInterval(advance, INTERVAL_MS); }}
              style={{ width: 36, height: 36, background: "transparent", border: "1px solid #1E2D42", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2D42"}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="#8FA3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Disclaimer */}
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#2A3D52", letterSpacing: "0.08em" }}>
            COMPOSITE OPERATOR OUTCOMES · IDENTIFYING DETAILS OMITTED
          </p>
        </div>
      </div>
    </section>
  );
}
