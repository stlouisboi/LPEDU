import { useState, useEffect } from "react";
import { ArrowUp } from "@phosphor-icons/react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      data-testid="scroll-to-top-btn"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        width: 44,
        height: 44,
        borderRadius: 0,
        background: "#080E1C",
        border: "1px solid rgba(200,147,63,0.5)",
        color: "#C8933F",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s, border-color 0.2s, background 0.2s",
        boxShadow: "0 2px 16px rgba(0,0,0,0.45)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#C8933F";
        e.currentTarget.style.color = "#080E1C";
        e.currentTarget.style.borderColor = "#C8933F";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "#080E1C";
        e.currentTarget.style.color = "#C8933F";
        e.currentTarget.style.borderColor = "rgba(200,147,63,0.5)";
      }}
    >
      <ArrowUp size={18} weight="bold" />
    </button>
  );
}
