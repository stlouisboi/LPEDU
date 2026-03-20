import { useState } from "react";

const FAQS = [
  {
    q: "How is this different from hiring a compliance service?",
    a: "A compliance service files paperwork for you. LaunchPath installs the system so you can do it yourself. You do the work. The system shows you what, when, and how.",
  },
  {
    q: "What if I already have some files in place?",
    a: "Ground 0 identifies what's missing. You don't rebuild what's already installed — you fill the gaps and verify the structure.",
  },
  {
    q: "What if I haven't dispatched yet?",
    a: "The best time to install the system is before your first load. Ground 0 works for pre-authority and pre-dispatch operators.",
  },
  {
    q: "How much time does installation require each week?",
    a: "Plan for 3–5 hours per week during the 90-day installation window. The work is structured — you're not guessing what to do next.",
  },
  {
    q: "Is this for active authorities only?",
    a: "No. Ground 0 is designed for pre-authority, newly active, and carriers approaching their 9-month audit window.",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <button
        data-testid={`faq-item-${index + 1}`}
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "1.75rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.05rem",
          fontWeight: 500,
          color: open ? "#d4900a" : "rgba(255,255,255,0.88)",
          lineHeight: 1.5,
          transition: "color 0.15s",
        }}>
          {faq.q}
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          color: "rgba(212,144,10,0.70)",
          flexShrink: 0,
          transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "none",
          lineHeight: 1,
          marginTop: "0.2rem",
        }}>
          +
        </span>
      </button>

      {open && (
        <div style={{ paddingBottom: "1.75rem", paddingRight: "3rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.60)",
            lineHeight: 1.8,
            margin: 0,
          }}>
            {faq.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      data-testid="faq-section"
      style={{
        background: "#080e18",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.55)",
          marginBottom: "2rem",
        }}>
          LP-FAQ-001 — COMMON QUESTIONS
        </p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          color: "#FFFFFF",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: "3rem",
        }}>
          Questions Before You Start
        </h2>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
