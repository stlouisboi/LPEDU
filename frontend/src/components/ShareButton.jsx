import { useState, useRef, useEffect } from "react";

const NAVY = "#040a14";
const GOLD = "#d4900a";

export default function ShareButton({ url, title, description }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || (typeof document !== "undefined" ? document.title : "");

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl, text: description || "" });
      } catch (_) {}
      return;
    }
    setOpen(o => !o);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 1800);
  };

  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={handleShare}
        data-testid="share-button"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "transparent", border: "1px solid rgba(212,144,10,0.30)",
          color: "rgba(212,144,10,0.80)", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace",
          fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.65)"; e.currentTarget.style.color = GOLD; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,144,10,0.30)"; e.currentTarget.style.color = "rgba(212,144,10,0.80)"; }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="2.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="3.8" y1="6.2" x2="9.7" y2="3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="3.8" y1="7.8" x2="9.7" y2="10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        Share
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 100,
          background: "#0d1b2a", border: "1px solid rgba(212,144,10,0.25)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)", minWidth: 180, padding: "0.375rem 0",
        }}>
          <button onClick={copyLink} data-testid="share-copy-link"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", width: "100%", background: "none", border: "none", color: copied ? "#4ade80" : "rgba(255,255,255,0.80)", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", padding: "0.6rem 1rem", cursor: "pointer", textAlign: "left" }}>
            {copied ? (
              <><svg width="13" height="13" fill="none" viewBox="0 0 14 14"><path d="M2 7l3.5 3.5L12 3" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> Copied!</>
            ) : (
              <><svg width="13" height="13" fill="none" viewBox="0 0 14 14"><rect x="5" y="1" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5v8a1 1 0 001 1h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Copy Link</>
            )}
          </button>

          <a href={`https://pinterest.com/pin/create/button/?url=${encoded}&description=${encodedTitle}`}
            target="_blank" rel="noreferrer" data-testid="share-pinterest"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", color: "rgba(255,255,255,0.80)", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", padding: "0.6rem 1rem", textDecoration: "none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            Pinterest
          </a>

          <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
            target="_blank" rel="noreferrer" data-testid="share-twitter"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", color: "rgba(255,255,255,0.80)", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", padding: "0.6rem 1rem", textDecoration: "none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Post on X
          </a>
        </div>
      )}
    </div>
  );
}
