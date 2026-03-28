import { useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";
import { ArrowRight, CheckCircle } from "lucide-react";

const AUTHORITY_AGE = [
  "Not yet issued",
  "0–6 months",
  "6–12 months",
  "12–18 months",
  "18–24 months",
  "24+ months",
];

const INQUIRY_TYPE = [
  "Starting my authority — want to do it right",
  "Authority is active — approaching my audit window",
  "Already had a compliance issue",
  "Researching options before committing",
  "Other",
];

const inputStyle = {
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  padding: "0.875rem 1rem",
  fontSize: "1.064rem",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.806rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--text-subtle)",
  marginBottom: "0.6rem",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", mc: "", authorityAge: "", inquiryType: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "7rem 1.5rem 5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 480px", gap: "7rem", alignItems: "start" }} className="contact-grid">

          {/* Left — framing */}
          <div style={{ position: "sticky", top: "100px" }}>
            <p className="overline" style={{ marginBottom: "1.5rem", animation: "heroEnter 0.65s ease both" }}>
              Direct Contact
            </p>
            <h1 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: "1.75rem",
              animation: "heroEnter 0.65s ease both",
              animationDelay: "0.1s",
            }}>
              Admission starts<br />with a conversation.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.12rem",
              color: "var(--text-muted)",
              lineHeight: 1.85,
              marginBottom: "2.5rem",
              animation: "heroEnter 0.65s ease both",
              animationDelay: "0.2s",
            }}>
              Before any dollar is committed, LaunchPath assesses whether
              your operation is structured to build on. Use this form to
              start that conversation.
            </p>

            <div style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "2rem",
              display: "flex", flexDirection: "column", gap: "1.25rem",
              animation: "heroEnter 0.65s ease both",
              animationDelay: "0.3s",
            }}>
              {[
                ["Response time", "Within 2 business days"],
                ["No obligation", "The conversation is free"],
                ["No pressure", "Readiness determines admission, not urgency"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.874rem", color: "var(--text-subtle)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", paddingTop: "0.1rem" }}>{label}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <FadeIn delay={100}>
            {submitted ? (
              <div style={{
                border: "1px solid var(--border)",
                background: "var(--bg-2)",
                padding: "4rem 2.5rem",
                textAlign: "center",
              }}>
                <CheckCircle size={40} color="var(--orange)" weight="duotone" style={{ marginBottom: "1.5rem" }} />
                <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--text)", marginBottom: "1rem" }}>
                  Message received.
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 360, margin: "0 auto" }}>
                  Vince reviews every inquiry personally. You'll hear back within 2 business days
                  with either a readiness assessment or next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input name="name" required value={form.name} onChange={handle}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--border-gold)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                      data-testid="contact-name"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handle}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--border-gold)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                      data-testid="contact-email"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Phone (optional)</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handle}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--border-gold)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                      data-testid="contact-phone"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>MC / DOT Number (if issued)</label>
                    <input name="mc" value={form.mc} onChange={handle}
                      placeholder="MC-XXXXXXX"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--border-gold)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                      data-testid="contact-mc"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Authority Age</label>
                  <select name="authorityAge" value={form.authorityAge} onChange={handle}
                    style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                    onFocus={e => e.target.style.borderColor = "var(--border-gold)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                    data-testid="contact-authority-age"
                  >
                    <option value="">Select authority age</option>
                    {AUTHORITY_AGE.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>What prompted this contact?</label>
                  <select name="inquiryType" value={form.inquiryType} onChange={handle}
                    style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                    onFocus={e => e.target.style.borderColor = "var(--border-gold)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                    data-testid="contact-inquiry-type"
                  >
                    <option value="">Select one</option>
                    {INQUIRY_TYPE.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea name="message" value={form.message} onChange={handle} rows={5}
                    placeholder="Describe your situation briefly..."
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    onFocus={e => e.target.style.borderColor = "var(--border-gold)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                    data-testid="contact-message"
                  />
                </div>

                <button type="submit" disabled={loading}
                  data-testid="contact-submit"
                  style={{
                    background: loading ? "rgba(232,89,15,0.6)" : "var(--orange)",
                    color: "#fff",
                    border: "none",
                    padding: "1rem 2rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    width: "100%",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "var(--orange-hover)"; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "var(--orange)"; }}
                >
                  {loading ? "Sending..." : <>Send Message <ArrowRight size={15} weight="bold" /></>}
                </button>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)", lineHeight: 1.6, textAlign: "center" }}>
                  Not all applicants are accepted. A response does not constitute an offer of admission.
                </p>

              </form>
            )}
          </FadeIn>

        </div>
        <style dangerouslySetInnerHTML={{__html: `@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }`}} />
      </section>

      <FooterSection />
    </div>
  );
}
