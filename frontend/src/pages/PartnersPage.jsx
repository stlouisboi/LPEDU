import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";

const API = process.env.REACT_APP_BACKEND_URL;

const PERSONAS = [
  {
    code: "LP-PARTNER-INS",
    role: "Insurance Agents & Underwriters",
    headline: "Before you bind, they need a documented operating structure.",
    body: "Carriers without documented compliance infrastructure represent elevated claims risk within the first 90 days. A referral to LaunchPath installs the Standard before the policy becomes active — reducing audit exposure for both parties.",
    signal: "Fewer conditional ratings. Cleaner renewals.",
  },
  {
    code: "LP-PARTNER-FLT",
    role: "Fleet Operators",
    headline: "Compliance does not scale with units unless the system does.",
    body: "Each new unit added to a fleet introduces a new set of authority, insurance, and documentation requirements. The LaunchPath Standard provides a repeatable onboarding system that installs the same operating infrastructure across every driver and vehicle.",
    signal: "Standardized onboarding. Consistent compliance posture.",
  },
  {
    code: "LP-PARTNER-BKR",
    role: "Freight Brokers",
    headline: "The carriers you refer reflect on your operation.",
    body: "New entrant carriers without documented operating standards create liability exposure for the brokers who book them. Referring carriers to LaunchPath before they enter your freight network installs the infrastructure that protects both the load and the relationship.",
    signal: "Vetted carriers. Reduced freight liability.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "You identify the carrier.",
    body: "A new carrier in your network — one you're about to bind, book, or add to your fleet — needs a documented operating standard before operations begin.",
  },
  {
    num: "02",
    title: "You make the referral.",
    body: "You connect them to LaunchPath. We handle the intake, the assessment, and the Standard installation from there. No administrative burden on your side.",
  },
  {
    num: "03",
    title: "They return compliant.",
    body: "The carrier completes the LaunchPath Standard and returns to your operation with documented compliance infrastructure, audit-ready records, and an active operating framework.",
  },
];

const STATS = [
  { value: "4", label: "Protection Systems Installed" },
  { value: "49", label: "Documented Failure Points Addressed" },
  { value: "90", label: "Days of New Entrant Period Covered" },
  { value: "100%", label: "FMCSA New Entrant Audit Focus" },
];

const ROLES = [
  "Insurance Agent / Underwriter",
  "Fleet Operator",
  "Freight Broker",
  "Other",
];

function PersonaCard({ p, idx }) {
  return (
    <FadeIn delay={idx * 80}>
      <div style={{
        background: "#001530",
        borderTop: "3px solid #C5A059",
        padding: "2.5rem 2rem",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          color: "rgba(197,160,89,1)",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}>
          {p.code}
        </p>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          {p.role}
        </p>
        <h3 style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "1.12rem",
          color: "#FFFFFF",
          lineHeight: 1.3,
          marginBottom: "1rem",
          flex: 0,
        }}>
          {p.headline}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.05rem",
          color: "rgba(255,255,255,0.90)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
          flex: 1,
        }}>
          {p.body}
        </p>
        <div style={{
          borderTop: "1px solid rgba(197,160,89,0.14)",
          paddingTop: "0.875rem",
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            color: "rgba(197,160,89,0.95)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            {p.signal}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) { setError("Please select your role."); return; }
    setStatus("loading");
    setError("");
    try {
      const resp = await fetch(`${API}/api/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1.1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#FFFFFF",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1.05rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(197,160,89,0.95)",
    display: "block",
    marginBottom: "0.4rem",
  };

  if (status === "success") {
    return (
      <div data-testid="partner-form-success" style={{ textAlign: "center", padding: "3rem 0" }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.672rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(197,160,89,1)",
          marginBottom: "1rem",
        }}>
          LP-PARTNER-001 — INQUIRY RECEIVED
        </p>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          color: "#FFFFFF",
          marginBottom: "0.875rem",
          letterSpacing: "-0.01em",
        }}>
          Your inquiry has been received.
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1.7,
          maxWidth: 440,
          margin: "0 auto",
        }}>
          A member of the LaunchPath team will follow up within one business day to discuss the partnership arrangement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-testid="partner-contact-form" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="form-grid">
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            data-testid="partner-name"
            required
            type="text"
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(197,160,89,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            data-testid="partner-email"
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="your@company.com"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(197,160,89,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="form-grid">
        <div>
          <label style={labelStyle}>Company</label>
          <input
            data-testid="partner-company"
            required
            type="text"
            value={form.company}
            onChange={set("company")}
            placeholder="Company or agency name"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(197,160,89,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
        <div>
          <label style={labelStyle}>Your Role</label>
          <select
            data-testid="partner-role"
            required
            value={form.role}
            onChange={set("role")}
            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
            onFocus={e => (e.target.style.borderColor = "rgba(197,160,89,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          >
            <option value="" style={{ background: "#001530" }}>Select your role</option>
            {ROLES.map(r => (
              <option key={r} value={r} style={{ background: "#001530" }}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Message (Optional)</label>
        <textarea
          data-testid="partner-message"
          value={form.message}
          onChange={set("message")}
          placeholder="Describe your carrier referral volume, fleet size, or specific inquiry."
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={e => (e.target.style.borderColor = "rgba(197,160,89,0.5)")}
          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
        />
      </div>

      {error && (
        <p data-testid="partner-form-error" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          color: "#f87171",
        }}>
          {error}
        </p>
      )}

      <button
        data-testid="partner-submit-btn"
        type="submit"
        disabled={status === "loading"}
        style={{
          background: status === "loading" ? "rgba(197,160,89,0.5)" : "#C5A059",
          color: "#001530",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "1rem 2.5rem",
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          alignSelf: "flex-start",
        }}
        onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "#D4B87A"; }}
        onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.background = "#C5A059"; }}
      >
        {status === "loading" ? "Submitting..." : "Request a Partnership Conversation"}
      </button>
    </form>
  );
}

export default function PartnersPage() {
  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ background: "#000D1A", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section data-testid="partners-hero" style={{
        background: "#000D1A",
        borderBottom: "1px solid rgba(197,160,89,0.12)",
        padding: "96px 24px 80px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.672rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,1)",
              marginBottom: "1.5rem",
            }}>
              LP-PARTNER-001 | REFERRAL & PARTNERSHIP NETWORK
            </p>
            <h1 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              maxWidth: 720,
            }}>
              The operational layer behind your carrier relationships.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.75,
              maxWidth: 600,
              marginBottom: "0.875rem",
            }}>
              LaunchPath installs the compliance infrastructure that new motor carrier authorities require to survive federal oversight. For partners — insurers, fleets, and brokers — this is the onboarding layer that reduces exposure before it becomes a claim, a violation, or a failed load.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.75,
              maxWidth: 600,
              marginBottom: "2.75rem",
            }}>
              The arrangement is straightforward: you identify the carrier. We handle the Standard installation.
            </p>
            <button
              data-testid="partners-hero-cta"
              onClick={scrollToForm}
              style={{
                background: "#C5A059",
                color: "#001530",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "1rem 2.25rem",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                minHeight: 52,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#D4B87A")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C5A059")}
            >
              Request a Partnership Conversation
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── Three Personas ── */}
      <section data-testid="partners-personas" style={{
        background: "#001020",
        borderBottom: "1px solid rgba(197,160,89,0.12)",
        padding: "72px 24px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.672rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,1)",
              marginBottom: "0.625rem",
            }}>
              WHO THIS SERVES
            </p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              Three industries. One operational problem.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.90)",
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: "3rem",
            }}>
              Underprepared carriers create downstream risk for every partner in their network. LaunchPath eliminates that risk at the source.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(197,160,89,0.1)",
          }} className="persona-grid">
            {PERSONAS.map((p, i) => <PersonaCard key={p.code} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section data-testid="partners-how-it-works" style={{
        background: "#000D1A",
        borderBottom: "1px solid rgba(197,160,89,0.12)",
        padding: "72px 24px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.672rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,1)",
              marginBottom: "0.625rem",
            }}>
              THE REFERRAL PROCESS
            </p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "3rem",
            }}>
              Three steps. No administrative burden.
            </h2>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(197,160,89,0.1)" }}>
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div style={{
                  background: "#001020",
                  padding: "2.25rem 2rem",
                  display: "flex",
                  gap: "2rem",
                  alignItems: "flex-start",
                }}>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "rgba(197,160,89,0.2)",
                    lineHeight: 1,
                    minWidth: 56,
                    letterSpacing: "-0.02em",
                  }}>
                    {step.num}
                  </p>
                  <div>
                    <h3 style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      color: "#FFFFFF",
                      marginBottom: "0.625rem",
                      lineHeight: 1.3,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.7,
                    }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Band ── */}
      <section data-testid="partners-trust-band" style={{
        background: "#001530",
        borderTop: "1px solid rgba(197,160,89,0.15)",
        borderBottom: "1px solid rgba(197,160,89,0.15)",
        padding: "56px 24px",
      }}>
        <div style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(197,160,89,0.1)",
        }} className="stats-grid">
          {STATS.map((s) => (
            <FadeIn key={s.label}>
              <div style={{
                background: "#001530",
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  color: "#C5A059",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                  letterSpacing: "0.02em",
                }}>
                  {s.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section
        ref={formRef}
        data-testid="partners-contact-section"
        style={{
          background: "#001020",
          borderBottom: "1px solid rgba(197,160,89,0.12)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.672rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,1)",
              marginBottom: "0.625rem",
            }}>
              LP-PARTNER-INQUIRY
            </p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              Request a Partnership Conversation
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.7,
              marginBottom: "2.75rem",
              maxWidth: 560,
            }}>
              Submit your inquiry below. A member of the LaunchPath team will follow up within one business day to discuss the referral arrangement and determine whether the partnership is the right fit.
            </p>
          </FadeIn>
          <ContactForm />
        </div>
      </section>

      <FooterSection />

      <style>{`
        @media (max-width: 760px) {
          .persona-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
