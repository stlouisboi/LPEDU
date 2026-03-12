import { useEffect, useRef, useState } from "react";

const FINDINGS = [
  "Missing Driver Qualification Files",
  "Incomplete drug and alcohol program enrollment",
  "Unmonitored hours-of-service violations",
  "Missing vehicle maintenance records",
  "Lack of documented carrier oversight",
];

const STATS = [
  { value: "49", label: "Documented compliance failure points" },
  { value: "96%", label: "Insurance decisions influenced by safety history" },
  { value: "10+", label: "Filings required to activate authority" },
];

function CountUp({ target, duration = 1400 }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isPercent = target.includes("%");
          const isPlus = target.endsWith("+");
          const num = parseInt(target.replace(/\D/g, ""), 10);
          const startTime = performance.now();
          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * num);
            setDisplay(isPercent ? `${current}%` : isPlus ? `${current}+` : String(current));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function RegulatoryRealitySection() {
  return (
    <section
      data-testid="regulatory-reality-section"
      style={{
        background: "#000F1F",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ borderLeft: "2px solid rgba(197,160,89,0.7)", paddingLeft: "1.5rem", marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.672rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#C5A059", marginBottom: "0.6rem",
          }}>
            FMCSA Oversight Record
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.896rem", color: "rgba(255,255,255,0.78)",
            letterSpacing: "0.04em",
          }}>
            Common audit findings in new motor carriers.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "5rem", marginBottom: "4rem" }} className="reg-reality-cols">

          {/* Left: body copy */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.008rem", color: "rgba(255,255,255,0.75)",
              lineHeight: 1.85, marginBottom: "1.75rem",
            }}>
              Every year FMCSA compliance reviews identify the same operational failures in new motor carriers.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.008rem", color: "rgba(255,255,255,0.82)",
              lineHeight: 1.85, marginBottom: "2rem",
            }}>
              These are not rare events. They are the predictable result of operating without a structured compliance system.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.672rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#C5A059", marginBottom: "1rem",
            }}>
              Common findings include:
            </p>
            {FINDINGS.map((f, i) => (
              <div key={i} style={{
                display: "flex", gap: "0.875rem", alignItems: "flex-start",
                padding: "0.6rem 0",
                borderBottom: i < FINDINGS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <span style={{ color: "#C5A059", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.6 }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* Right: emphasis block */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{
              border: "1px solid rgba(197,160,89,0.3)",
              padding: "2.5rem 2rem",
              background: "rgba(197,160,89,0.05)",
            }}>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.232rem)",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.65,
                marginBottom: "1.5rem",
              }}>
                Authority failure is rarely caused by lack of effort.
              </p>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.232rem)",
                color: "#C5A059",
                lineHeight: 1.65,
              }}>
                It is usually caused by missing operational infrastructure.
              </p>
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.84rem", color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75, marginTop: "1.5rem",
            }}>
              Most of these violations are not caused by reckless behavior. They are caused by missing operational infrastructure.
            </p>
          </div>
        </div>

        {/* Stat block */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.07)",
        }} className="reg-stats-grid">
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: "#000F1F",
              padding: "2rem 1.75rem",
            }}>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#C5A059",
                marginBottom: "0.6rem",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>
                <CountUp target={s.value} />
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.84rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Reinforcement line */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.84rem",
          color: "rgba(255,255,255,0.58)",
          textAlign: "center",
          marginTop: "1.5rem",
          letterSpacing: "0.02em",
        }}>
          These patterns appear consistently across new motor carrier audits.
        </p>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .reg-reality-cols { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .reg-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
