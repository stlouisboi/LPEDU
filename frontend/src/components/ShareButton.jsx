import { useState, useRef, useEffect } from "react";

const GOLD = "#d4900a";

const ICON = {
  share: <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="2.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/><line x1="3.8" y1="6.2" x2="9.7" y2="3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="3.8" y1="7.8" x2="9.7" y2="10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  copy: <svg width="13" height="13" fill="none" viewBox="0 0 14 14"><rect x="5" y="1" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5v8a1 1 0 001 1h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  check: <svg width="13" height="13" fill="none" viewBox="0 0 14 14"><path d="M2 7l3.5 3.5L12 3" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pinterest: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
  x: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  facebook: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>,
  linkedin: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  whatsapp: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  email: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M1 4l6 4.5L13 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
};

function MenuItem({ icon, label, color, onClick, href }) {
  const style = {
    display: "flex", alignItems: "center", gap: "0.625rem", width: "100%",
    background: "none", border: "none", color: color || "rgba(255,255,255,0.80)",
    fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", padding: "0.55rem 1rem",
    cursor: "pointer", textAlign: "left", textDecoration: "none",
    transition: "background 0.15s",
  };
  const hoverEnter = e => e.currentTarget.style.background = "rgba(255,255,255,0.05)";
  const hoverLeave = e => e.currentTarget.style.background = "none";

  if (href) return (
    <a href={href} target="_blank" rel="noreferrer" style={style}
      onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
      {icon} {label}
    </a>
  );
  return (
    <button onClick={onClick} style={style}
      onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
      {icon} {label}
    </button>
  );
}

export default function ShareButton({ url, title, description }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  const shareUrl  = url   || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || (typeof document !== "undefined" ? document.title : "");
  const shareDesc  = description || "";

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: shareTitle, url: shareUrl, text: shareDesc }); } catch (_) {}
      return;
    }
    setOpen(o => !o);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 1800);
  };

  const e  = encodeURIComponent(shareUrl);
  const et = encodeURIComponent(shareTitle);

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
        {ICON.share} Share
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 200,
          background: "#0d1b2a", border: "1px solid rgba(212,144,10,0.20)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55)", minWidth: 192, padding: "0.375rem 0",
        }}>
          <MenuItem icon={copied ? ICON.check : ICON.copy} label={copied ? "Copied!" : "Copy Link"} color={copied ? "#4ade80" : undefined} onClick={copyLink} />
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0.25rem 0" }} />
          <MenuItem icon={ICON.pinterest} label="Pinterest"   href={`https://pinterest.com/pin/create/button/?url=${e}&description=${et}`} />
          <MenuItem icon={ICON.x}         label="Post on X"   href={`https://twitter.com/intent/tweet?url=${e}&text=${et}`} />
          <MenuItem icon={ICON.facebook}  label="Facebook"    href={`https://www.facebook.com/sharer/sharer.php?u=${e}`} />
          <MenuItem icon={ICON.linkedin}  label="LinkedIn"    href={`https://www.linkedin.com/sharing/share-offsite/?url=${e}`} />
          <MenuItem icon={ICON.whatsapp}  label="WhatsApp"    href={`https://wa.me/?text=${et}%20${e}`} />
          <MenuItem icon={ICON.email}     label="Email"       href={`mailto:?subject=${et}&body=${et}%0A%0A${e}`} />
        </div>
      )}
    </div>
  );
}
