import FadeIn from "./FadeIn";
import { useState, useEffect, useRef } from "react";

function CountUp({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const isDecimal = String(end).includes(".");
          const target = parseFloat(end);
          const duration = 1600;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const ease = Math.min(1 - Math.pow(1 - elapsed / duration, 3), 1);
            const cur = isDecimal ? (ease * target).toFixed(1) : Math.floor(ease * target);
            setVal(cur);
            if (elapsed < duration) requestAnimationFrame(tick);
            else setVal(isDecimal ? target.toFixed(1) : target);
          };
          tick();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const INCIDENT_FIELDS = [
  { label: "INCIDENT TYPE", value: "New Entrant Safety Audit — Compliance Review", redacted: false },
  { label: "AUTHORITY AGE", value: "47 days at time of review", redacted: false },
  { label: "TRIGGER", value: "Roadside inspection — ELD non-compliance flag", redacted: false },
  { label: "INITIAL FINDING", value: "Driver Qualification File — incomplete", redacted: false },
  { label: "SECONDARY FINDING", value: "Drug consortium — no designated employer representative", redacted: false },
  { label: "TERTIARY FINDING", value: "No preventive maintenance schedule documented", redacted: false },
  { label: "INSURANCE STATUS", value: "Policy in force — certificate not current with FMCSA", redacted: false },
  { label: "SAFETY RATING OUTCOME", value: "Conditional", redacted: false },
  { label: "CORRECTIVE ACTION WINDOW", value: "60 days", redacted: false },
  { label: "RESULT", value: "Authority revocation prior to corrective action deadline", redacted: false },
  { label: "REVENUE LOST", value: null, redacted: true },
  { label: "RECOVERY COST", value: null, redacted: true },
  { label: "CARRIER NAME", value: null, redacted: true },
  { label: "DOT NUMBER", value: null, redacted: true },
];

const EXPOSURE_CATEGORIES = [
  {
    title: "DRIVER QUALIFICATION",
    items: [
      "DQ file incomplete or missing for owner-operator",
      "No annual review of driving record on file",
      "No road test certificate or skills evaluation documented",
      "Pre-employment drug test not on file before first dispatch",
    ],
  },
  {
    title: "DRUG & ALCOHOL PROGRAM",
    items: [
      "No designated consortium or TPA enrolled",
      "No random testing program in place",
      "No pre-employment test documented",
      "No drug and alcohol policy in DQ file",
    ],
  },
  {
    title: "HOURS OF SERVICE & ELD",
    items: [
      "No ELD compliance for applicable operations",
      "No HOS logs or records of duty status maintained",
      "No fatigue management policy documented",
      "Driver operating beyond legal hours — no record correction on file",
    ],
  },
  {
    title: "VEHICLE MAINTENANCE",
    items: [
      "No preventive maintenance schedule on file",
      "No DVIR — Driver Vehicle Inspection Reports — completed or retained",
      "No annual inspection documentation",
      "Roadside violations with no corrective action record",
    ],
  },
];

const METRICS = [
  { end: 49, suffix: "", label: "Authorities reviewed in the LaunchPath development framework" },
  { end: 96.4, suffix: "%", label: "Of carriers who avoid first-year authority loss with documented systems in place" },
  { end: 10, suffix: "+", label: "Years building operational compliance systems before LaunchPath was founded" },
];

export default function FailureRealitySection() {
  return (
    <section data-testid="failure-reality-section" style={{
      background: "var(--bg-onyx)",
      padding: "7rem 1.5rem",
      borderBottom: "1px solid var(--divider-dark)",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "2rem", color: "var(--gold-primary)" }}>
            Enforcement Pattern Documentation
          </p>

          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
            color: "var(--text)",
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto 4rem",
            lineHeight: 1.75,
          }}>
            Failure rarely begins with a single decision.<br />
            It begins with systems that were never installed.
          </p>
        </FadeIn>

        {/* Incident Report Header */}
        <FadeIn delay={40}>
          <div style={{
            background: "var(--incident-dark-1)",
            padding: "1.5rem 2rem",
            borderTop: "2px solid var(--gold-primary)",
          }}>
            {[
              "CASE FILE: NEW ENTRANT AUTHORITY FAILURE",
              "CLASSIFICATION: DOCUMENTED FMCSA ENFORCEMENT PATTERN",
              "PERIOD: FIRST 90 DAYS OF OPERATING AUTHORITY",
              "STATUS: ██████████ REDACTED — PATTERN ONLY",
            ].map((line, i) => (
              <p key={i} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.784rem",
                color: i === 3 ? "var(--gold-muted-brand)" : "var(--text-muted-dark)",
                letterSpacing: "0.05em",
                lineHeight: 1.9,
                margin: 0,
              }}>{line}</p>
            ))}
          </div>
        </FadeIn>

        {/* Field Table */}
        <FadeIn delay={60}>
          <div style={{ marginBottom: "2.5rem", overflow: "hidden" }}>
            {INCIDENT_FIELDS.map((field, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                background: i % 2 === 0 ? "var(--incident-dark-1)" : "var(--incident-dark-2)",
                padding: "0.7rem 2rem",
                gap: "2rem",
                alignItems: "center",
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.806rem",
                  fontWeight: 700,
                  color: "var(--gold-primary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>{field.label}</span>
                {field.redacted ? (
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.806rem",
                    color: "var(--gold-muted-brand)",
                    letterSpacing: "0.04em",
                  }}>██████████ REDACTED</span>
                ) : (
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.12rem",
                    color: "var(--text-subtle)",
                    lineHeight: 1.5,
                  }}>{field.value}</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Pattern Note */}
        <FadeIn delay={80}>
          <div style={{
            background: "var(--pattern-note-bg)",
            borderLeft: "3px solid var(--gold-primary)",
            padding: "1.25rem 1.5rem",
            marginBottom: "4rem",
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.694rem",
              color: "var(--gold-primary)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: "0.6rem",
            }}>PATTERN NOTE</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.98rem",
              color: "var(--text-muted-dark)",
              lineHeight: 1.8,
              margin: 0,
            }}>
              This sequence — ELD flag → DQ file gap → drug program gap → conditional rating → revocation — represents a documented FMCSA new entrant enforcement pattern. It does not require an accident. It does not require a moving violation. It requires only the absence of a file.
            </p>
          </div>
        </FadeIn>

        {/* Exposure Inventory */}
        <FadeIn>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "1.232rem",
            color: "var(--text)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
          }}>
            Exposure Inventory — 16 Documented Audit Findings
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.98rem",
            color: "var(--text-subtle)",
            marginBottom: "2.5rem",
            lineHeight: 1.6,
          }}>
            These are the sixteen points where the documentation either exists or it does not.
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2.5rem 4rem",
          marginBottom: "4.5rem",
        }} className="exposure-grid">
          {EXPOSURE_CATEGORIES.map((cat, ci) => (
            <FadeIn key={cat.title} delay={ci * 60}>
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.806rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "var(--gold-primary)",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid var(--divider-dark)",
                }}>{cat.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.728rem",
                        color: "var(--text-subtle)",
                        flexShrink: 0,
                        marginTop: "0.25rem",
                        lineHeight: 1.7,
                      }}>[ ]</span>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.12rem",
                        color: "var(--text-muted-dark)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Closing Quote */}
        <FadeIn>
          <div style={{
            borderTop: "1px solid var(--divider-dark)",
            paddingTop: "3rem",
            textAlign: "center",
            marginBottom: "3.5rem",
          }}>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 500,
              fontStyle: "italic",
              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              color: "var(--text)",
              lineHeight: 1.7,
              maxWidth: 680,
              margin: "0 auto",
            }}>
              "The regulation does not know your name. It only knows what your file says."
            </p>
          </div>
        </FadeIn>

        {/* Stats Strip */}
        <FadeIn>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--divider-dark)",
            borderBottom: "1px solid var(--divider-dark)",
            marginBottom: "2.5rem",
          }} className="stats-strip">
            {METRICS.map((m, i) => (
              <div key={i} style={{
                padding: "2rem",
                borderRight: i < METRICS.length - 1 ? "1px solid var(--divider-dark)" : "none",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 4vw, 3rem)",
                  color: "var(--gold-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}><CountUp end={m.end} suffix={m.suffix} /></div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.874rem",
                  color: "var(--text-subtle)",
                  lineHeight: 1.5,
                  maxWidth: 200,
                  margin: "0 auto",
                }}>{m.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: "var(--text)",
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}>
            This is not a compliance lecture. This is loss prevention.
          </p>
        </FadeIn>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .exposure-grid { grid-template-columns: 1fr !important; }
          .stats-strip { grid-template-columns: 1fr !important; }
          .stats-strip > div { border-right: none !important; border-bottom: 1px solid var(--divider-dark); }
        }
      `}</style>
    </section>
  );
}
