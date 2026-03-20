import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const gold = "#C5A059";
const mono = "'Inter', sans-serif";

export default function AdmissionConfirmedPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("checking"); // checking | paid | pending | error
  const API = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    let tries = 0;
    const poll = async () => {
      try {
        const resp = await fetch(`${API}/api/admission-payment-status/${sessionId}`);
        if (!resp.ok) throw new Error();
        const data = await resp.json();
        if (data.payment_status === "paid") { setStatus("paid"); return; }
        tries++;
        if (tries < 10) setTimeout(poll, 2000);
        else setStatus("pending");
      } catch {
        setStatus("error");
      }
    };
    poll();
  }, [sessionId, API]);

  return (
    <div style={{ background: "#080f1e", minHeight: "100vh", color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "112px 24px 80px", textAlign: "center" }}>

        {status === "checking" && (
          <>
            <div style={{ width: 40, height: 40, border: `3px solid rgba(197,160,89,0.2)`, borderTopColor: gold, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 2rem" }} />
            <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)" }}>
              Verifying payment...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </>
        )}

        {status === "paid" && (
          <>
            <div data-testid="payment-confirmed-badge" style={{
              display: "inline-flex", alignItems: "center", gap: "0.625rem",
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)",
              padding: "0.625rem 1.5rem", marginBottom: "2.5rem",
            }}>
              <span style={{ color: "#22c55e", fontSize: "1rem" }}>✓</span>
              <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(34,197,94,0.9)" }}>
                Enrollment Confirmed
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#FFFFFF",
              lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.01em",
            }}>
              You are enrolled in the LaunchPath Standard.
            </h1>

            <p style={{ fontSize: "1.075rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1.25rem", maxWidth: 520, margin: "0 auto 1.25rem" }}>
              The Station Custodian will be in contact within 24 hours to initiate your onboarding sequence and confirm your cohort start date.
            </p>

            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 520, margin: "0 auto 3rem", fontStyle: "italic" }}>
              Check your inbox for a receipt from Stripe and a welcome message from Vince Lawrence.
            </p>

            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "2.5rem" }} />

            <p style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "1.1rem", color: gold, fontStyle: "italic", lineHeight: 1.75,
              maxWidth: 480, margin: "0 auto",
            }}>
              "The first ninety days do not test ambition. They test operational structure."
            </p>
          </>
        )}

        {(status === "pending" || status === "error") && (
          <>
            <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)", marginBottom: "1.5rem" }}>
              Payment received — confirmation pending
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", color: "#FFFFFF",
              lineHeight: 1.1, marginBottom: "1.25rem",
            }}>
              Your payment is being processed.
            </h1>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 480, margin: "0 auto 2.5rem" }}>
              This can take a few minutes. You will receive a confirmation email at your registered address. If you have questions, reply to the admission confirmation email.
            </p>
            <Link
              to="/launchpath-standard"
              style={{
                fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: gold, textDecoration: "none",
              }}
            >
              ← Return to LaunchPath Standard
            </Link>
          </>
        )}
      </div>
      <FooterSection />
    </div>
  );
}
