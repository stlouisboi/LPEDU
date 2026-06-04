import React from "react";
import { SignOut } from "@phosphor-icons/react";

const mono = "'JetBrains Mono', monospace";
const serif = "'Newsreader', 'Playfair Display', serif";

export default function PortalHeader({ user, onLogout, auditDaysRemaining, registryIssued }) {
  return (
    <div data-testid="portal-header-container">

      {/* ── Classification Strip ── */}
      <div style={{
        background: "#030c18",
        borderBottom: "1px solid rgba(200,169,110,0.10)",
        padding: "0.3rem 2rem",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: "rgba(200,169,110,0.38)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            LP-PORTAL-1.0 · LAUNCHPATH STANDARD PROGRAM · COHORT OPERATOR PORTAL
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {auditDaysRemaining != null && (
              <p style={{ fontFamily: mono, fontSize: 9, color: "rgba(200,169,110,0.38)", letterSpacing: "0.14em" }}>
                AUDIT WINDOW: {auditDaysRemaining}d REMAINING
              </p>
            )}
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.16em" }}>
              <span style={{ color: "#22c55e", marginRight: 4 }}>◆</span>
              <span style={{ color: "rgba(200,169,110,0.38)" }}>SYSTEM: ACTIVE</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Header Row ── */}
      <div style={{
        background: "#000F1F",
        borderBottom: "2px solid rgba(200,169,110,0.13)",
        padding: "1rem 2rem",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}>
          {/* Left: Portal Identity */}
          <div>
            <p style={{ fontFamily: mono, fontSize: 9, color: "rgba(200,169,110,0.50)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>
              LPOS v1.0
            </p>
            <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.01em" }}>
              Operator Portal
            </p>
          </div>

          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />

          {/* Center: Status Chips */}
          {registryIssued && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.20)",
              padding: "0.3rem 0.75rem",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)", display: "block" }} />
              <p style={{ fontFamily: mono, fontSize: 9, color: "#22c55e", letterSpacing: "0.14em", textTransform: "uppercase" }}>VRF ISSUED</p>
            </div>
          )}

          {/* Right: Operator + Logout */}
          {user && (
            <div
              className="portal-header-userinfo"
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: mono, fontSize: 9, color: "rgba(200,169,110,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>OPERATOR</p>
                <p style={{ fontFamily: mono, fontSize: 11, color: "rgba(250,248,244,0.80)", letterSpacing: "0.06em" }}>
                  {(user.name || user.email || "").slice(0, 28)}
                </p>
              </div>
              <button
                data-testid="portal-logout-btn"
                onClick={onLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.50)",
                  fontFamily: mono,
                  fontSize: "0.714rem",
                  cursor: "pointer",
                  padding: "0.4rem 0.8rem",
                  letterSpacing: "0.08em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.30)"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.50)"; }}
              >
                <SignOut size={11} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
