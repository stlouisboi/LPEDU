import React from "react";
import { Link } from "../../compat/Link";

export default function ResultCTAs({ result }) {
  const sans = "'Inter', sans-serif";
  const btnBase = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    minHeight: 48, fontFamily: sans, fontWeight: 700,
    fontSize: "0.868rem", letterSpacing: "0.08em",
    textTransform: "uppercase", textDecoration: "none",
    padding: "0.875rem 1.75rem", transition: "background 0.2s",
  };

  if (result === "GO") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link
          to="/program"
          data-testid="cta-proceed-standard"
          style={{ ...btnBase, background: "#d4900a", color: "#000F1F" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
        >
          Proceed to the 90-Day Standard →
        </Link>
        <Link
          to="/ground-0-briefing"
          data-testid="cta-begin-ground-0"
          style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.20)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Review Ground 0 First
        </Link>
      </div>
    );
  }

  if (result === "WAIT") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        <button
          data-testid="cta-retake"
          onClick={() => window.location.reload()}
          style={{ ...btnBase, background: "#d4900a", color: "#000F1F", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
        >
          Retake Assessment
        </button>
        <Link
          to="/contact"
          data-testid="cta-contact"
          style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.45)", padding: "0.875rem 0.5rem", fontSize: "0.857rem" }}
        >
          Contact →
        </Link>
      </div>
    );
  }

  // NO-GO
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
      <button
        data-testid="cta-retake"
        onClick={() => window.location.reload()}
        style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        Retake Assessment
      </button>
      <Link
        to="/contact"
        data-testid="cta-contact"
        style={{ ...btnBase, background: "transparent", color: "rgba(255,255,255,0.45)", padding: "0.875rem 0.5rem", fontSize: "0.857rem" }}
      >
        Contact →
      </Link>
    </div>
  );
}
