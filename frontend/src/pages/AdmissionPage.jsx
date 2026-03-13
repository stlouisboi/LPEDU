import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const COHORT_OPTIONS = [
  "Next available cohort",
  "30 days",
  "60 days",
  "90 days",
  "I am already operating",
];

export default function AdmissionPage() {
  const [form, setForm] = useState({
    name: "", email: "", usdot_number: "", cohort_preference: "", message: "",
  });
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const API = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.cohort_preference) return;
    setState("loading");
    try {
      const resp = await fetch(`${API}/api/admission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setState("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#FFFFFF",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.98rem",
    padding: "0.875rem 1.125rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.616rem",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(197,160,89,0.85)",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ background: "#000D1A", minHeight: "100vh", color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* Back link */}
        <Link
          to="/ground-0-complete"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.616rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.65)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            marginBottom: "2.5rem",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          ← Back to Options
        </Link>

        {/* Header */}
        <p
          data-testid="admission-page-label"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.85)",
            marginBottom: "1.5rem",
          }}
        >
          LP-STD-001 | ADMISSION REQUEST
        </p>

        <h1
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}
        >
          Request Admission to the LaunchPath Standard
        </h1>

        <p
          style={{
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.8,
            marginBottom: "0.875rem",
          }}
        >
          Admission to the LaunchPath Standard is reviewed and cohort-based. Completing this form
          places you in the queue for the next cohort.
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.55)",
            fontStyle: "italic",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Admission is subject to REACH Assessment result and cohort availability.
          You will receive a response within 24–48 hours.
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "2.5rem" }} />

        {/* Success state */}
        {state === "success" ? (
          <div data-testid="admission-success">
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
              padding: "0.6rem 1.25rem",
              marginBottom: "2rem",
            }}>
              <span style={{ color: "#22c55e" }}>✓</span>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "rgba(34,197,94,0.95)",
                margin: 0,
              }}>
                Admission Request Submitted
              </p>
            </div>

            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
              color: "#FFFFFF",
              marginBottom: "1.25rem",
              lineHeight: 1.2,
            }}>
              Your request has been received.
            </h2>

            <p style={{
              fontSize: "1.008rem",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.8,
              marginBottom: "2rem",
              maxWidth: 480,
            }}>
              The Station Custodian will review your submission and respond within 24–48 hours.
              Check your inbox at {form.email} for confirmation and next steps.
            </p>

            <div style={{ height: 2, background: "#C5A059", maxWidth: 120, marginBottom: "2rem" }} />

            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.85)",
              fontStyle: "italic",
              lineHeight: 1.75,
              maxWidth: 480,
            }}>
              "The first ninety days do not test ambition. They test operational structure."
            </p>

            <Link
              to="/portal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "2rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#C5A059",
                textDecoration: "none",
              }}
            >
              Return to Portal →
            </Link>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} data-testid="admission-form" noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

              {/* Name */}
              <div>
                <label style={labelStyle} htmlFor="admission-name">Full Name *</label>
                <input
                  id="admission-name"
                  data-testid="admission-name-input"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full legal name"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle} htmlFor="admission-email">Operating Email *</label>
                <input
                  id="admission-email"
                  data-testid="admission-email-input"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your business email address"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>

              {/* USDOT */}
              <div>
                <label style={labelStyle} htmlFor="admission-usdot">USDOT Authority Number</label>
                <input
                  id="admission-usdot"
                  data-testid="admission-usdot-input"
                  name="usdot_number"
                  type="text"
                  value={form.usdot_number}
                  onChange={handleChange}
                  placeholder="USDOT# (leave blank if not yet issued)"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.784rem",
                  color: "rgba(255,255,255,0.40)",
                  marginTop: "0.4rem",
                  fontStyle: "italic",
                }}>
                  Optional. Include if authority has been issued.
                </p>
              </div>

              {/* Cohort preference */}
              <div>
                <label style={labelStyle} htmlFor="admission-cohort">Timeline to Launch *</label>
                <select
                  id="admission-cohort"
                  data-testid="admission-cohort-select"
                  name="cohort_preference"
                  required
                  value={form.cohort_preference}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23C5A059' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "calc(100% - 1rem) center",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="" disabled style={{ background: "#0D1929" }}>Select your timeline</option>
                  {COHORT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} style={{ background: "#0D1929" }}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle} htmlFor="admission-message">Anything to add? (Optional)</label>
                <textarea
                  id="admission-message"
                  data-testid="admission-message-input"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="REACH Assessment result, current operational status, questions for the Station Custodian..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>

              {/* Error */}
              {state === "error" && (
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "#f87171",
                  fontStyle: "italic",
                }}>
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                data-testid="admission-submit-btn"
                disabled={state === "loading" || !form.name || !form.email || !form.cohort_preference}
                style={{
                  minHeight: 52,
                  background: "#C5A059",
                  color: "#002244",
                  border: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.925rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: state === "loading" ? "wait" : "pointer",
                  opacity: (state === "loading" || !form.name || !form.email || !form.cohort_preference) ? 0.7 : 1,
                  transition: "background 0.2s, opacity 0.2s",
                  alignSelf: "flex-start",
                  padding: "0 2.5rem",
                }}
                onMouseEnter={(e) => { if (state !== "loading") e.currentTarget.style.background = "#D4B87A"; }}
                onMouseLeave={(e) => { if (state !== "loading") e.currentTarget.style.background = "#C5A059"; }}
              >
                {state === "loading" ? "Submitting..." : "Submit Admission Request"}
              </button>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.784rem",
                color: "rgba(255,255,255,0.42)",
                fontStyle: "italic",
                marginTop: "-0.75rem",
              }}>
                No payment is required at this step. Admission request is reviewed before cohort placement.
              </p>
            </div>
          </form>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
