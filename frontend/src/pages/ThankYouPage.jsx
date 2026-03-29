import { useState, useEffect, useRef } from "react";
import { Link } from '../compat/Link';
import { useRouter } from 'next/router';
import Navbar from "../components/Navbar";

const API   = process.env.REACT_APP_BACKEND_URL;
const GOLD  = "#d4900a";
const NAVY  = "#060d1a";
const CARD  = "#0b1628";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";

// Placeholder Vimeo ID — replace with real video via admin panel
const WELCOME_VIMEO_ID = "76979871"; // placeholder

export default function ThankYouPage() {
  const router   = useRouter();
  const sessionId = router.isReady ? (router.query.session_id || null) : undefined;
  const [pageState, setPageState] = useState("pending"); // pending | confirmed | failed
  const [data, setData]           = useState(null);
  const retryCount = useRef(0);

  const verify = async (sid) => {
    if (!sid) { setPageState("confirmed"); return; } // no session = direct visit
    try {
      const res  = await fetch(`${API}/api/products/verify?session_id=${encodeURIComponent(sid)}`);
      const json = await res.json();
      if (json.status === "confirmed") {
        setData(json);
        setPageState("confirmed");
      } else if (json.status === "pending") {
        retryCount.current += 1;
        if (retryCount.current >= 20) setPageState("confirmed"); // show page anyway
        else setTimeout(() => verify(sid), 1500);
      } else {
        setPageState("confirmed"); // still show page
      }
    } catch {
      setPageState("confirmed");
    }
  };

  useEffect(() => {
    if (sessionId === undefined) return;
    verify(sessionId);
  }, [sessionId]); // eslint-disable-line

  const downloadUrl = data?.download_token
    ? `${API}/api/products/download?token=${data.download_token}`
    : null;

  const productName = data?.product_name || "Your Product";

  if (pageState === "pending") {
    return (
      <div style={{ minHeight: "100vh", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 36, height: 36, border: `3px solid rgba(212,144,10,0.3)`,
            borderTopColor: GOLD, borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 1.25rem",
          }} />
          <p style={{ fontFamily: MONO, fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em" }}>
            CONFIRMING YOUR ORDER…
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: "#fff", fontFamily: SANS }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .ty-fade { animation: fadeUp 0.55s ease both; }
        .ty-fade-1 { animation-delay: 0.05s; }
        .ty-fade-2 { animation-delay: 0.15s; }
        .ty-fade-3 { animation-delay: 0.28s; }
        .ty-fade-4 { animation-delay: 0.42s; }
        .ty-fade-5 { animation-delay: 0.58s; }
        .ty-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .ty-btn { transition: opacity 0.2s, transform 0.2s; }
      `}</style>

      <Navbar />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>

        {/* ── Receipt tag ── */}
        <div className="ty-fade ty-fade-1" style={{
          fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700,
          letterSpacing: "0.2em", color: GOLD, marginBottom: "1.5rem",
          textTransform: "uppercase",
        }}>
          ORDER CONFIRMED
        </div>

        {/* ── Headline ── */}
        <h1 className="ty-fade ty-fade-2" style={{
          fontFamily: SERIF, fontWeight: 700,
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          lineHeight: 1.15, letterSpacing: "-0.02em",
          color: "#fff", marginBottom: "1rem",
        }}>
          You're in. Here's what<br />happens next.
        </h1>

        {/* ── Product name ── */}
        {data && (
          <p className="ty-fade ty-fade-2" style={{
            fontFamily: MONO, fontSize: "0.857rem",
            color: "rgba(255,255,255,0.45)", marginBottom: "2.5rem",
            borderLeft: `2px solid ${GOLD}`, paddingLeft: "0.875rem",
          }}>
            {productName}
          </p>
        )}

        {/* ── Founder video ── */}
        <div className="ty-fade ty-fade-3" style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: MONO, fontSize: "0.714rem", letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
            marginBottom: "0.875rem",
          }}>
            FROM VINCE — LAUNCHPATH FOUNDER
          </p>
          <div style={{
            position: "relative", paddingBottom: "56.25%", height: 0,
            background: "#050d1a",
            border: "1px solid rgba(212,144,10,0.15)",
            overflow: "hidden",
          }}>
            <iframe
              src={`https://player.vimeo.com/video/${WELCOME_VIMEO_ID}?autoplay=0&title=0&byline=0&portrait=0&color=d4900a`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Welcome from Vince — LaunchPath"
            />
          </div>
        </div>

        {/* ── Gold divider ── */}
        <div className="ty-fade ty-fade-3" style={{
          height: 1, background: `rgba(212,144,10,0.18)`, marginBottom: "2.5rem",
        }} />

        {/* ── Next steps ── */}
        <div className="ty-fade ty-fade-4" style={{ marginBottom: "2.5rem" }}>
          <p style={{
            fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(212,144,10,0.7)", marginBottom: "1.5rem",
          }}>
            THREE THINGS TO DO RIGHT NOW
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { n: "01", text: "Check your email — your download link and receipt are on the way. Check your spam folder if it doesn't arrive in 5 minutes." },
              { n: "02", text: "Download your product using the button below. Your file is also permanently available from your purchase confirmation email." },
              { n: "03", text: "Start with the Ground 0 briefing if you haven't already — it maps the full 90-day infrastructure and shows exactly where your new product fits." },
            ].map(({ n, text }) => (
              <div key={n} style={{
                display: "flex", gap: "1.25rem", alignItems: "flex-start",
                background: CARD,
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "1.125rem 1.25rem",
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700,
                  color: GOLD, flexShrink: 0, paddingTop: "0.15rem",
                }}>{n}</span>
                <p style={{
                  fontFamily: SANS, fontSize: "0.981rem",
                  color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: 0,
                }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA buttons ── */}
        <div className="ty-fade ty-fade-5" style={{
          display: "flex", flexWrap: "wrap", gap: "0.875rem", marginBottom: "3rem",
        }}>
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="thank-you-download-btn"
              className="ty-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: GOLD, color: "#000",
                fontFamily: MONO, fontSize: "0.8rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.875rem 1.5rem", textDecoration: "none",
                border: "none", cursor: "pointer",
              }}
            >
              DOWNLOAD YOUR FILE →
            </a>
          )}
          <Link
            to="/ground-0-briefing"
            data-testid="thank-you-ground0-btn"
            className="ty-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "transparent",
              border: `1px solid rgba(212,144,10,0.45)`,
              color: GOLD,
              fontFamily: MONO, fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.875rem 1.5rem", textDecoration: "none",
            }}
          >
            START GROUND 0 →
          </Link>
          <Link
            to="/compliance-library"
            data-testid="thank-you-library-btn"
            className="ty-btn"
            style={{
              display: "inline-flex", alignItems: "center",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.65)",
              fontFamily: MONO, fontSize: "0.8rem", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.875rem 1.5rem", textDecoration: "none",
            }}
          >
            STANDARDS LIBRARY
          </Link>
        </div>

        {/* ── Footer note ── */}
        <p className="ty-fade ty-fade-5" style={{
          fontFamily: SANS, fontSize: "0.857rem",
          color: "rgba(255,255,255,0.30)", lineHeight: 1.7,
        }}>
          Questions? Reply to your receipt email or reach out at{" "}
          <a href="mailto:vince@launchpathedu.com" style={{ color: "rgba(212,144,10,0.7)", textDecoration: "none" }}>
            vince@launchpathedu.com
          </a>
        </p>

      </main>
    </div>
  );
}
