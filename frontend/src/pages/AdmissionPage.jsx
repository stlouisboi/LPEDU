import { useState } from "react";
import { Link } from '../compat/Link';
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
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    padding: "0.875rem 1.125rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.714rem",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(212,144,10,0.85)",
    marginBottom: "0.5rem",
  };

  const hintStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.857rem",
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
    <div style={{ background: "#080f1e", minHeight: "100vh", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", position: "relative" }}>
      {/* dot-grid background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(197,160,89,0.10) 1px, transparent 1px)",
        backgroundSize: "36px 36px", opacity: 0.35,
      }} />
      <style>{`
        @keyframes lp-sweep { 0%{transform:translateX(-100%);opacity:.5} 100%{transform:translateX(300%);opacity:0} }
        .lp-scan-btn { position:relative; overflow:hidden; }
        .lp-scan-btn::after { content:""; position:absolute; top:0; left:0; width:35%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%); }
        .lp-scan-btn:hover::after { animation:lp-sweep .55s ease-out forwards; }
        .adm-input:focus { border-color: rgba(212,144,10,0.55) !important; }
      `}</style>
      <Navbar />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px 80px", position: "relative", zIndex: 1 }}>

        {/* Back link */}
        <Link
          to="/launchpath-standard"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
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
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
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
            fontFamily: "'Newsreader', 'Playfair Display', serif",
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
            fontSize: "1rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.8,
            marginBottom: "0.875rem",
          }}
        >
          The LaunchPath Standard accepts a limited cohort each quarter. This is not open enrollment. Every request is reviewed individually — admission is based on your operational readiness, authority status, and REACH Assessment result.
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.55)",
            fontStyle: "italic",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Not every applicant is admitted. You will receive a decision within 24–48 hours. If your situation involves a conditional rating or pending authority action, note that in your message below.
        </p>

        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "2.5rem" }} />

        {/* ── Price Anchor — Block 10 ────────────────────────── */}
        <div style={{
          background: "rgba(197,160,89,0.05)",
          border: "1px solid rgba(197,160,89,0.22)",
          borderLeft: "3px solid rgba(197,160,89,0.60)",
          padding: "1.5rem 1.625rem",
          marginBottom: "2.5rem",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.40)",
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(197,160,89,0.70)", marginBottom: "0.75rem",
          }}>LP-STD-001 — FIRST COHORT</p>
          <p style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700, fontSize: "1.375rem",
            color: "#C5A059", lineHeight: 1.2, marginBottom: "0.875rem",
          }}>$2,500 &nbsp;·&nbsp; 10 carriers maximum &nbsp;·&nbsp; Reviewed individually</p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.938rem",
            color: "rgba(255,255,255,0.60)", lineHeight: 1.75, margin: 0,
          }}>
            Not every applicant is admitted. Admission is based on operational readiness, authority status, and REACH Assessment result — not urgency, not ability to pay.
          </p>
        </div>
        <div style={{
          background: "rgba(197,160,89,0.04)",
          border: "1px solid rgba(197,160,89,0.12)",
          padding: "1.25rem 1.5rem",
          marginBottom: "2.5rem",
          display: "flex", flexWrap: "wrap", gap: "0", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(197,160,89,0.25)" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", width: "100%", marginBottom: "0.875rem" }}>WHAT HAPPENS NEXT</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", width: "100%" }}>
            {[
              { n: "01", t: "Email confirmation sent", d: "Immediately" },
              { n: "02", t: "Station Custodian reviews your request", d: "Within 24–48 hours" },
              { n: "03", t: "Admission decision sent", d: "Via email" },
              { n: "04", t: "Payment link sent if admitted", d: "Secures your cohort seat" },
              { n: "05", t: "Orientation begins", d: "Ground 0 + Module 1 within 24 hrs of payment" },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", flex: "1 1 160px" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.600rem", fontWeight: 700, color: "rgba(212,144,10,0.45)", letterSpacing: "0.1em", flexShrink: 0, marginTop: "0.1rem" }}>{s.n}</span>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.810rem", fontWeight: 600, color: "rgba(255,255,255,0.70)", marginBottom: "0.1rem" }}>{s.t}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.32)" }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                fontSize: "var(--text-sm)",
                color: "rgba(34,197,94,0.95)",
                margin: 0,
              }}>
                Admission Request Submitted
              </p>
            </div>

            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
              color: "#FFFFFF",
              marginBottom: "1.25rem",
              lineHeight: 1.2,
            }}>
              Your request has been received.
            </h2>

            <p style={{
              fontSize: "1rem",
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
              className="lp-scan-btn"
              style={{
                minHeight: 54,
                background: "#d4900a",
                color: "#0b1628",
                border: "none",
                fontFamily: "'Inter', sans-serif",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              marginBottom: "2.5rem",
            }}>
              Powered by Stripe · Secure checkout
            </p>

            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "1.75rem" }} />

            <p style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
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
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--text-sm)",
                  color: "#f87171",
                  fontStyle: "italic",
                }}>
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}

              {/* WHAT HAPPENS AFTER YOU SUBMIT */}
              <div style={{
                background: "rgba(197,160,89,0.04)", border: "1px solid rgba(197,160,89,0.14)",
                borderLeft: "2px solid rgba(212,144,10,0.40)", padding: "1.25rem 1.5rem", marginBottom: "1.5rem",
              }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.875rem" }}>
                  WHAT HAPPENS AFTER YOU SUBMIT
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { n: "01", t: "You receive an email confirmation immediately." },
                    { n: "02", t: "The Station Custodian reviews your request — within 24–48 hours." },
                    { n: "03", t: "Admission decision sent via email." },
                    { n: "04", t: "If admitted: payment link sent to secure your cohort seat." },
                    { n: "05", t: "Orientation begins: Ground 0 + Module 1 unlock within 24 hours of payment." },
                  ].map(s => (
                    <div key={s.n} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.600rem", fontWeight: 700, color: "rgba(212,144,10,0.45)", letterSpacing: "0.1em", flexShrink: 0, marginTop: "0.15rem" }}>{s.n}</span>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.810rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.55, margin: 0 }}>{s.t}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.30)", marginTop: "0.875rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)", lineHeight: 1.6 }}>
                  If you are interested in a payment plan, note it in the message field below. Payment plan availability is discussed during admission review.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                data-testid="admission-submit-btn"
                disabled={state === "loading" || !isValid}
                className="lp-scan-btn"
                style={{
                  minHeight: 52,
                  background: "#d4900a",
                  color: "#0b1628",
                  border: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
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
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.857rem",
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
