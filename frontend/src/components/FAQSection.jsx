import { useState } from "react";

const GOLD = "#C8933F";
const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "'Inter', sans-serif";

const FAQS = [
  {
    q: "How is this different from hiring a compliance service?",
    a: "A compliance service files paperwork for you. LaunchPath installs the system so you can do it yourself. You do the work. The system shows you what, when, and how.",
    code: "LP-FAQ-001",
  },
  {
    q: "What if I already have some files in place?",
    a: "Ground 0 identifies what's missing. You don't rebuild what's already installed — you fill the gaps and verify the structure.",
    code: "LP-FAQ-002",
  },
  {
    q: "What if I haven't dispatched yet?",
    a: "The best time to install the system is before your first load. Ground 0 works for pre-authority and pre-dispatch operators.",
    code: "LP-FAQ-003",
  },
  {
    q: "How much time does installation require each week?",
    a: "Plan for 3–5 hours per week during the 90-day installation window. The work is structured — you're not guessing what to do next.",
    code: "LP-FAQ-004",
  },
  {
    q: "Is this for active authorities only?",
    a: "No. Ground 0 is designed for pre-authority, newly active, and carriers approaching their 9-month audit window.",
    code: "LP-FAQ-005",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ fontFamily: MONO }}>
      {/* Structural Rail — top of each FAQ item */}
      <div className="struct-rail" style={{ marginBottom: 0 }} />

      <button
        data-testid={`faq-item-${index + 1}`}
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none",
          cursor: "pointer", padding: "1.5rem 0",
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", gap: "1.5rem", textAlign: "left",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* ID plate badge */}
          <span style={{
            fontFamily: MONO, fontSize: "0.600rem", fontWeight: 700,
            color: "rgba(200,147,63,0.40)", letterSpacing: "0.10em",
            background: "rgba(200,147,63,0.06)",
            border: "1px solid rgba(200,147,63,0.15)",
            padding: "0.15rem 0.45rem",
            marginRight: "0.75rem", display: "inline-block",
            verticalAlign: "middle",
          }}>
            {faq.code}
          </span>
          <span style={{
            fontFamily: MONO,
            fontSize: "0.925rem", fontWeight: 600,
            color: open ? GOLD : "rgba(255,255,255,0.85)",
            lineHeight: 1.6,
            transition: "color 0.2s ease",
          }}>
            {faq.q}
          </span>
        </div>
        {/* Bracket toggle */}
        <span style={{
          fontFamily: MONO, fontSize: "0.925rem",
          color: open ? GOLD : "rgba(200,147,63,0.50)",
          flexShrink: 0, transition: "color 0.2s ease",
          lineHeight: 1, marginTop: "0.15rem",
        }}>
          {open ? "[ − ]" : "[ + ]"}
        </span>
      </button>

      {/* Answer panel */}
      <div style={{
        maxHeight: open ? "480px" : "0",
        overflow: "hidden",
        transition: "max-height 0.38s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div className="inset-card" style={{
          paddingBottom: "1.625rem", paddingLeft: "1.75rem",
          paddingTop: "0.25rem",
          borderLeft: `2px solid rgba(200,147,63,0.30)`,
          marginLeft: "1.25rem", marginBottom: "0.75rem",
          background: "rgba(200,147,63,0.03)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.28s ease 0.06s",
        }}>
          <p style={{
            fontFamily: SANS, fontSize: "0.952rem",
            color: "rgba(244,241,235,0.70)",
            lineHeight: 1.85, margin: 0,
          }}>
            {faq.a}
          </p>
          <p style={{ fontFamily: MONO, fontSize: "0.575rem", color: "rgba(200,147,63,0.22)", marginTop: "0.875rem", marginBottom: 0, letterSpacing: "0.08em" }}>
            {faq.code} — END
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      data-testid="faq-section"
      style={{
        background: "#070c14",
        borderTop: "1px solid rgba(200,147,63,0.10)",
        borderBottom: "1px solid rgba(200,147,63,0.10)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* System log header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,147,63,0.45)" }}>
            ▸ SYSTEM LOG
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(200,147,63,0.12)" }} />
          <span style={{ fontFamily: MONO, fontSize: "0.58rem", color: "rgba(200,147,63,0.25)" }}>
            LP-FAQ.LOG
          </span>
        </div>

        <h2 style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          color: "#FFFFFF",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          marginBottom: "2.75rem",
        }}>
          // Questions Before You Start
        </h2>

        {/* FAQ container with bracket decoration */}
        <div style={{ position: "relative", paddingLeft: "1rem" }}>
          {/* Left bracket */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 3, background: `linear-gradient(180deg, ${GOLD}, rgba(200,147,63,0.08))` }} />

          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
            {/* Closing structural rail */}
            <div className="struct-rail" style={{ marginTop: 0 }} />
          </div>

          {/* End marker */}
          <div style={{ paddingTop: "1.25rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.625rem", color: "rgba(200,147,63,0.22)", letterSpacing: "0.10em" }}>
              // EOF — LP-FAQ.LOG
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
