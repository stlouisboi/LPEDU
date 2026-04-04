import React from "react";
import { SignOut } from "@phosphor-icons/react";

export default function PortalHeader({ user, onLogout }) {
  return (
    <div
      style={{
        background: "#000F1F",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1.25rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem" }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#d4900a",
          }}
        >
          LAUNCHPATH COHORT PORTAL
        </p>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>—</span>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
            fontWeight: 700,
            color: "rgba(212,144,10,0.85)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            flex: 1,
          }}
        >
          SYSTEM_STATUS_MONITOR &nbsp;|&nbsp; LPOS v1.0
        </p>
        {user && (
          <div className="portal-header-userinfo" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
            }}>
              OPERATOR: {(user.name || user.email || "").toUpperCase().slice(0, 20)}
            </p>
            <button
              data-testid="portal-logout-btn"
              onClick={onLogout}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                background: "none", border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.60)", fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem", cursor: "pointer", padding: "0.35rem 0.75rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.60)"; }}
            >
              <SignOut size={12} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
