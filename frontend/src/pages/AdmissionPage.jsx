import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const COMPLIANCE_STATUS_OPTIONS = [
  "Authority Active — No known issues",
  "Authority Active — Conditional rating received",
  "Authority Active — Under FMCSA monitoring",
  "Authority Recently Activated (less than 30 days)",
  "Pre-Authority (authority not yet issued)",
  "Other",
];

const LANE_OPTIONS = [
  { value: "box_truck", label: "Box Truck / Straight Truck" },
  { value: "semi", label: "Semi / Tractor-Trailer" },
];

export default function AdmissionPage() {
  const [form, setForm] = useState({
    carrier_name: "",
    email: "",
    dot_mc_number: "",
    authority_activation_date: "",
    compliance_status: "",
    lane: "",
    message: "",
  });
  const [admissionId, setAdmissionId] = useState(null);
  const [state, setState] = useState("idle"); // idle | loading | success | checkout | error
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const API = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const isValid = form.carrier_name && form.email && form.compliance_status && form.lane;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setState("loading");
    try {
      const resp = await fetch(`${API}/api/admission-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error("Failed");
      const data = await resp.json();
      setAdmissionId(data.admission_id || null);
      setState("success");
    } catch {
      setState("error");
    }
  };

  const handleProceedToPayment = async () => {
    if (!admissionId) return;
    setCheckoutLoading(true);
    try {
      const origin = window.location.origin;
      const resp = await fetch(`${API}/api/create-admission-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admission_id: admissionId, origin_url: origin }),
      });
      if (!resp.ok) throw new Error("Checkout failed");
      const data = await resp.json();
      window.location.href = data.checkout_url;
    } catch {
      setCheckoutLoading(false);
      setState("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#FFFFFF",
    fontFamily: "'Atkinson Hyperlegible', sans-serif",
    fontSize: "0.98rem",
    padding: "0.875rem 1.125rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.616rem",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(212,144,10,0.85)",
    marginBottom: "0.5rem",
  };

  const hintStyle = {
    fontFamily: "'Atkinson Hyperlegible', sans-serif",
    fontSize: "0.784rem",
    color: "rgba(255,255,255,0.40)",
    marginTop: "0.4rem",
    fontStyle: "italic",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23C5A059' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "calc(100% - 1rem) center",
    paddingRight: "2.5rem",
  };

  return (
    <div style={{ background: "#080f1e", minHeight: "100vh", color: "#FFFFFF", fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* Back link */}
        <Link
          to="/launchpath-standard"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.616rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.65)",
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
          ← Back to the Standard
        </Link>

        {/* Header */}
        <p
          data-testid="admission-page-label"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.85)",
            marginBottom: "1.5rem",
          }}
        >
          LP-STD-001 | COHORT ADMISSION REQUEST
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
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
          The LaunchPath Standard accepts a limited cohort each quarter. This is not open enrollment. Every request is reviewed individually — admission is based on your operational readiness, authority status, and REACH Assessment result.
        </p>

        <p
          style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.55)",
            fontStyle: "italic",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Not every applicant is admitted. You will receive a decision within 24–48 hours. If your situation involves a conditional rating or pending authority action, note that in your message below.
        </p>

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
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "rgba(34,197,94,0.95)",
                margin: 0,
              }}>
                Admission Request Submitted
              </p>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
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
              Complete your enrollment now by securing your cohort seat. Payment of <strong style={{ color: "#d4900a" }}>$2,500</strong> confirms your place in the LaunchPath Standard. No refunds are issued after cohort start.
            </p>

            <button
              data-testid="proceed-to-payment-btn"
              onClick={handleProceedToPayment}
              disabled={checkoutLoading}
              style={{
                minHeight: 54,
                background: "#d4900a",
                color: "#0b1628",
                border: "none",
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontWeight: 700,
                fontSize: "0.975rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: checkoutLoading ? "wait" : "pointer",
                opacity: checkoutLoading ? 0.75 : 1,
                transition: "background 0.2s, opacity 0.2s",
                padding: "0 2.5rem",
                display: "inline-block",
                marginBottom: "1.25rem",
              }}
              onMouseEnter={(e) => { if (!checkoutLoading) e.currentTarget.style.background = "#D4B87A"; }}
              onMouseLeave={(e) => { if (!checkoutLoading) e.currentTarget.style.background = "#d4900a"; }}
            >
              {checkoutLoading ? "Redirecting to payment..." : "Proceed to Payment — $2,500 →"}
            </button>

            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              marginBottom: "2.5rem",
            }}>
              Powered by Stripe · Secure checkout
            </p>

            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "1.75rem" }} />

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.75)",
              fontStyle: "italic",
              lineHeight: 1.75,
              maxWidth: 480,
            }}>
              "The first ninety days do not test ambition. They test operational structure."
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} data-testid="admission-form" noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

              {/* Carrier Name */}
              <div>
                <label style={labelStyle} htmlFor="admission-carrier-name">Carrier / Business Name *</label>
                <input
                  id="admission-carrier-name"
                  data-testid="admission-carrier-name-input"
                  name="carrier_name"
                  type="text"
                  required
                  value={form.carrier_name}
                  onChange={handleChange}
                  placeholder="Your legal operating name or DBA"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)")}
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>

              {/* DOT / MC Number */}
              <div>
                <label style={labelStyle} htmlFor="admission-dot">USDOT / MC Number</label>
                <input
                  id="admission-dot"
                  data-testid="admission-dot-input"
                  name="dot_mc_number"
                  type="text"
                  value={form.dot_mc_number}
                  onChange={handleChange}
                  placeholder="USDOT# or MC# (leave blank if not yet issued)"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
                <p style={hintStyle}>Optional. Include if authority has been issued.</p>
              </div>

              {/* Authority Activation Date */}
              <div>
                <label style={labelStyle} htmlFor="admission-activation-date">Authority Activation Date</label>
                <input
                  id="admission-activation-date"
                  data-testid="admission-activation-date-input"
                  name="authority_activation_date"
                  type="date"
                  value={form.authority_activation_date}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    colorScheme: "dark",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
                <p style={hintStyle}>Optional. The date your operating authority was first granted.</p>
              </div>

              {/* Compliance Status */}
              <div>
                <label style={labelStyle} htmlFor="admission-compliance-status">Current Compliance Status *</label>
                <select
                  id="admission-compliance-status"
                  data-testid="admission-compliance-status-select"
                  name="compliance_status"
                  required
                  value={form.compliance_status}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                >
                  <option value="" disabled style={{ background: "#0D1929" }}>Select current status</option>
                  {COMPLIANCE_STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} style={{ background: "#0D1929" }}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Lane / Equipment */}
              <div>
                <label style={labelStyle} htmlFor="admission-lane">Primary Equipment Type *</label>
                <select
                  id="admission-lane"
                  data-testid="admission-lane-select"
                  name="lane"
                  required
                  value={form.lane}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                >
                  <option value="" disabled style={{ background: "#0D1929" }}>Select equipment type</option>
                  {LANE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} style={{ background: "#0D1929" }}>{opt.label}</option>
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,144,10,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>

              {/* Error */}
              {state === "error" && (
                <p style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
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
                disabled={state === "loading" || !isValid}
                style={{
                  minHeight: 52,
                  background: "#d4900a",
                  color: "#0b1628",
                  border: "none",
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.925rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: state === "loading" ? "wait" : "pointer",
                  opacity: (state === "loading" || !isValid) ? 0.7 : 1,
                  transition: "background 0.2s, opacity 0.2s",
                  alignSelf: "flex-start",
                  padding: "0 2.5rem",
                }}
                onMouseEnter={(e) => { if (state !== "loading") e.currentTarget.style.background = "#D4B87A"; }}
                onMouseLeave={(e) => { if (state !== "loading") e.currentTarget.style.background = "#d4900a"; }}
              >
                {state === "loading" ? "Submitting..." : "Submit Admission Request"}
              </button>

              <p style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontSize: "0.784rem",
                color: "rgba(255,255,255,0.42)",
                fontStyle: "italic",
                marginTop: "-0.75rem",
              }}>
                No payment is required at this step. Admission requests are reviewed before cohort placement.
              </p>
            </div>
          </form>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
