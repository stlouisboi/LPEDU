import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";

const API = process.env.REACT_APP_BACKEND_URL;
const GOLD   = "#d4900a";
const NAVY   = "#0b1628";
const BG     = "#0d1c30";
const BG2    = "#091220";
const CARD   = "#0c1828";
const BORDER = "rgba(255,255,255,0.08)";
const SANS   = "'Inter', sans-serif";
const COND   = "'Newsreader', 'Playfair Display', serif";
const MONO   = "'JetBrains Mono', 'Inter', monospace";

export default function ProductConfirmedPage() {
  const router = useRouter();
  const sessionId = router.isReady ? (router.query.session_id || null) : undefined;
  const [pageState, setPageState] = useState("pending");
  const [data, setData] = useState(null);
  const retryCount = useRef(0);

  const verify = async (sid) => {
    if (!sid) { setPageState("failed"); return; }
    try {
      const res = await fetch(`${API}/api/products/verify?session_id=${encodeURIComponent(sid)}`);
      const json = await res.json();
      if (json.status === "confirmed") {
        setData(json);
        setPageState("confirmed");
      } else if (json.status === "pending") {
        retryCount.current += 1;
        if (retryCount.current >= 20) {
          setPageState("failed");
        } else {
          setTimeout(() => verify(sid), 1500);
        }
      } else {
        setPageState("failed");
      }
    } catch {
      setPageState("failed");
    }
  };

  useEffect(() => {
    // sessionId undefined = router not ready yet; null = ready but no param
    if (sessionId === undefined) return;
    verify(sessionId);
  }, [sessionId]); // eslint-disable-line

  const downloadUrl = data ? `${API}/api/products/download?token=${data.download_token}` : null;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes lp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.88)} }
        @keyframes lp-spin  { to{transform:rotate(360deg)} }
        .lp-pulse { animation: lp-pulse 1.8s ease-in-out infinite; }
        .lp-spinner { animation: lp-spin 0.75s linear infinite; border:2px solid rgba(212,144,10,0.25); border-top-color:${GOLD}; border-radius:50%; width:18px; height:18px; display:inline-block; }
      `}} />

      <Navbar />

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
  const isBundle = data?.is_bundle;
  const downloadTokens = data?.download_tokens || [];
  const showGround0 = !upsell || upsell.sku === "cohort";

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
          {isBundle ? `Your ${data?.product_name} is ready.` : `Your ${data?.product_name} is ready.`}
        </h2>
        {isBundle && (
          <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", marginTop: "0.625rem", lineHeight: 1.6 }}>
            {downloadTokens.length} files included — each has its own download link below.
          </p>
        )}
      </div>

      {/* Download button(s) */}
      {isBundle ? (
        <div style={{ background: CARD, border: `1px solid rgba(212,144,10,0.20)`, padding: "1.75rem", marginBottom: "0.75rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "1.25rem" }}>
            YOUR DOWNLOADS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {downloadTokens.map((item, i) => (
              <div key={item.token} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", margin: "0 0 2px" }}>{item.sku}</p>
                  <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.80)", margin: 0 }}>{item.name}</p>
                </div>
                <a
                  href={`${API}/api/products/download?token=${item.token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`download-btn-${item.sku.toLowerCase()}`}
                  style={{ display: "inline-block", background: GOLD, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.625rem 1.25rem", textDecoration: "none", flexShrink: 0 }}
                >
                  Download →
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
      <p style={{ textAlign: "center", fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.28)", marginBottom: "3rem", lineHeight: 1.65 }}>
        Download links expire in 60 minutes. Return to this page any time to generate fresh links.
      </p>

      {/* Divider */}
      <div style={{ height: "1px", background: BORDER, marginBottom: "2.5rem" }} />

      {/* Product-aware upsell */}
      {upsell && <UpsellCard upsell={upsell} purchasedSku={sku} />}

      {/* Ground 0 block */}
      {showGround0 && (
        <div data-testid="ground0-block" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "2rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>
            NOT SURE WHAT TO DO NEXT?
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Take the REACH Diagnostic. Free. 4–6 minutes. No sales call.
          </p>
          <Link
            to="/reach-diagnostic"
            data-testid="ground0-cta-btn"
            style={{ display: "inline-block", fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.50)", padding: "0.75rem 1.5rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            Take the REACH Diagnostic →
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Upsell product card — shown below downloads on confirmed page ─────────────
function UpsellCard({ upsell, purchasedSku }) {
  const [loading, setLoading] = useState(false);
  const isCohort = upsell.sku === "cohort";

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/products/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_sku: upsell.sku,
          origin_url: typeof window !== "undefined" ? window.location.origin : "",
        }),
      });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="upsell-block"
      style={{
        marginBottom: "2.5rem",
        background: CARD,
        borderTop: `3px solid ${GOLD}`,
        padding: "1.75rem",
      }}
    >
      {/* Label */}
      <p style={{
        fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700,
        letterSpacing: "0.20em", textTransform: "uppercase",
        color: "rgba(212,144,10,0.60)", margin: "0 0 1.25rem",
      }}>
        RECOMMENDED NEXT STEP
      </p>

      {/* Image + content row */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        {/* Product image */}
        {upsell.image && (
          <Image
            src={upsell.image}
            alt={upsell.label}
            width={72}
            height={96}
            style={{
              width: 72, height: 96, objectFit: "cover",
              flexShrink: 0, opacity: 0.92,
              border: "1px solid rgba(212,144,10,0.15)",
            }}
          />
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Product name + price */}
          <h3 style={{
            fontFamily: COND, fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "#fff", letterSpacing: "-0.01em",
            lineHeight: 1.2, margin: "0 0 0.375rem",
          }}>
            {upsell.label}
          </h3>
          <p style={{
            fontFamily: MONO, fontSize: "1.1rem", fontWeight: 700,
            color: GOLD, margin: "0 0 0.875rem", letterSpacing: "0.02em",
          }}>
            {upsell.price}
          </p>
          {/* Pitch */}
          <p style={{
            fontFamily: SANS, fontSize: "0.9rem",
            color: "rgba(255,255,255,0.60)", lineHeight: 1.75, margin: 0,
          }}>
            {upsell.pitch}
          </p>

          {/* Savings badge */}
          {upsell.savings && (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.875rem" }}>
              <span style={{
                fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#4ade80",
                background: "rgba(74,222,128,0.10)",
                border: "1px solid rgba(74,222,128,0.25)",
                padding: "0.25rem 0.625rem",
                whiteSpace: "nowrap",
              }}>
                {upsell.savings}
              </span>
              {upsell.savings_context && (
                <span style={{
                  fontFamily: SANS, fontSize: "0.775rem",
                  color: "rgba(255,255,255,0.32)", lineHeight: 1.4,
                }}>
                  {upsell.savings_context}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: BORDER, marginBottom: "1.25rem" }} />

      {/* CTA */}
      {isCohort ? (
        <div>
          <Link
            to="/admission"
            data-testid="upsell-cta-btn"
            style={{
              display: "block", textAlign: "center",
              fontFamily: SANS, fontWeight: 700, fontSize: "0.875rem",
              letterSpacing: "0.10em", textTransform: "uppercase",
              color: GOLD, padding: "1rem 2rem", textDecoration: "none",
              border: `1px solid rgba(212,144,10,0.45)`,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(212,144,10,0.07)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Request Admission — No payment at this step →
          </Link>
          <p style={{
            fontFamily: MONO, fontSize: "0.625rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.22)",
            textAlign: "center", marginTop: "0.75rem",
          }}>
            $2,500 · Reviewed within 24 hrs · Not every applicant admitted
          </p>
        </div>
      ) : (
        <button
          data-testid="upsell-cta-btn"
          onClick={handleBuyNow}
          disabled={loading}
          style={{
            display: "block", width: "100%",
            fontFamily: SANS, fontWeight: 700, fontSize: "0.9rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: loading ? "rgba(255,255,255,0.40)" : NAVY,
            background: loading ? "rgba(212,144,10,0.25)" : GOLD,
            border: "none", padding: "1.1rem 2rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#b87d08"; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = GOLD; }}
        >
          {loading
            ? "Setting up checkout..."
            : `Add ${upsell.label} — ${upsell.price} →`}
        </button>
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
