import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API = process.env.REACT_APP_BACKEND_URL;
const GOLD  = "#d4900a";
const NAVY  = "#0b1628";
const BG    = "#0d1c30";
const BG2   = "#091220";
const CARD  = "#0c1828";
const BORDER = "rgba(255,255,255,0.08)";
const SANS  = "'Inter', sans-serif";
const COND  = "'Playfair Display', serif";
const MONO  = "'Inter', sans-serif";

export default function ProductConfirmedPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [pageState, setPageState] = useState("pending");
  const [data, setData] = useState(null);
  const retryCount = useRef(0);

  const verify = async () => {
    if (!sessionId) { setPageState("failed"); return; }
    try {
      const res = await fetch(`${API}/api/products/verify?session_id=${encodeURIComponent(sessionId)}`);
      const json = await res.json();
      if (json.status === "confirmed") {
        setData(json);
        setPageState("confirmed");
      } else if (json.status === "pending") {
        retryCount.current += 1;
        if (retryCount.current >= 10) {
          setPageState("failed");
        } else {
          setTimeout(verify, 3000);
        }
      } else {
        setPageState("failed");
      }
    } catch {
      setPageState("failed");
    }
  };

  useEffect(() => { verify(); }, []); // eslint-disable-line

  const downloadUrl = data ? `${API}/api/products/download?token=${data.download_token}` : null;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", fontFamily: SANS }}>
      <style>{`
        @keyframes lp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.88)} }
        @keyframes lp-spin  { to{transform:rotate(360deg)} }
        .lp-pulse { animation: lp-pulse 1.8s ease-in-out infinite; }
        .lp-spinner { animation: lp-spin 0.75s linear infinite; border:2px solid rgba(212,144,10,0.25); border-top-color:${GOLD}; border-radius:50%; width:18px; height:18px; display:inline-block; }
      `}</style>

      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, margin: 0 }}>LAUNCHPATH</p>
        </Link>
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Purchase Confirmation</p>
      </div>

      {/* Gold accent line */}
      <div style={{ height: "3px", background: `linear-gradient(to right, ${GOLD}, rgba(212,144,10,0.3), transparent)` }} />

      {/* Main content */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        {pageState === "pending" && <PendingState retryNum={retryCount.current} />}
        {pageState === "confirmed" && <ConfirmedState data={data} downloadUrl={downloadUrl} />}
        {pageState === "failed" && <FailedState />}
      </div>
    </div>
  );
}

function PendingState({ retryNum }) {
  return (
    <div data-testid="confirmed-pending" style={{ textAlign: "center" }}>
      <div
        className="lp-pulse"
        style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid rgba(212,144,10,0.35)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2.5rem" }}
      >
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: GOLD, opacity: 0.7 }} />
      </div>
      <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2rem)", color: "#fff", marginBottom: "1rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
        Verifying your payment...
      </h2>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        This takes just a moment. Do not close this tab.
      </p>
      {retryNum > 0 && (
        <p style={{ fontFamily: MONO, fontSize: "0.857rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
          Checking... attempt {retryNum} of 10
        </p>
      )}
    </div>
  );
}

function ConfirmedState({ data, downloadUrl }) {
  const upsell = data?.upsell;
  const sku    = data?.product_sku;
  const showGround0 = sku !== "LP-BDL-001";
  const upsellHref  = !upsell ? null : upsell.sku === "cohort" ? "/admission" : "/compliance-library";

  return (
    <div data-testid="confirmed-success">
      {/* Checkmark circle */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(212,144,10,0.10)", border: `1px solid rgba(212,144,10,0.40)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.75rem" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.625rem" }}>
          {sku} · Purchase Confirmed
        </p>
        <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2, margin: 0 }}>
          Your {data?.product_name} is ready.
        </h2>
      </div>

      {/* Download button */}
      <div style={{ background: CARD, border: `1px solid rgba(212,144,10,0.20)`, padding: "2rem", textAlign: "center", marginBottom: "0.75rem" }}>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="download-now-btn"
          style={{ display: "inline-block", background: GOLD, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "1.1rem 2.75rem", textDecoration: "none", borderRadius: 2, transition: "background 0.2s" }}
        >
          Download Now →
        </a>
      </div>
      <p style={{ textAlign: "center", fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.28)", marginBottom: "3rem", lineHeight: 1.65 }}>
        Your download link expires in 60 minutes. A backup copy has been sent to your email.
      </p>

      {/* Divider */}
      <div style={{ height: "1px", background: BORDER, marginBottom: "2.5rem" }} />

      {/* Product-aware upsell */}
      {upsell && upsellHref && (
        <div data-testid="upsell-block" style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.875rem" }}>
            NEXT STEP
          </p>
          <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: "1.35rem", color: "#fff", marginBottom: "0.5rem", lineHeight: 1.2 }}>
            {upsell.label} — {upsell.price}
          </h3>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            {upsell.pitch}
          </p>
          <Link
            to={upsellHref}
            data-testid="upsell-cta-btn"
            style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, padding: "0.875rem 2rem", textDecoration: "none", border: `1px solid rgba(212,144,10,0.40)` }}
          >
            View {upsell.label} →
          </Link>
        </div>
      )}

      {/* Ground 0 block */}
      {showGround0 && (
        <div data-testid="ground0-block" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "2rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>
            NOT SURE WHAT TO DO NEXT?
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Complete Ground 0 free. 45 minutes. No sales call.
          </p>
          <Link
            to="/portal"
            data-testid="ground0-cta-btn"
            style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.50)", padding: "0.75rem 1.5rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            Initiate Ground 0 →
          </Link>
        </div>
      )}
    </div>
  );
}

function FailedState() {
  return (
    <div data-testid="confirmed-failed" style={{ textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h2 style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2rem)", color: "#fff", marginBottom: "1rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
        We could not verify your payment.
      </h2>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 2.5rem" }}>
        If you completed checkout, your receipt is in your email and your download link is included. If you need help, contact us at{" "}
        <a href="mailto:support@launchpathedu.com" style={{ color: GOLD, textDecoration: "none" }}>support@launchpathedu.com</a>.
      </p>
      <Link
        to="/compliance-library"
        data-testid="return-to-store-btn"
        style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.875rem 2rem", textDecoration: "none" }}
      >
        Return to Standards Library →
      </Link>
    </div>
  );
}
