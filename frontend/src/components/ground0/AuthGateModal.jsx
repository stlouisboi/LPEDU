import React from "react";
import { X, GoogleLogo } from "@phosphor-icons/react";
import PasswordInput from "../PasswordInput";

export default function AuthGateModal({ authMode, authForm, authError, authLoading, onModeChange, onFormChange, onRegister, onLogin, onGoogle, onClose }) {
  return (
    <div
      data-testid="auth-gate-modal"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,5,15,0.85)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div style={{ background: "#0a1828", border: "1px solid rgba(255,255,255,0.1)", maxWidth: 440, width: "100%", padding: "2.5rem 2rem", position: "relative" }}>
        {/* Close */}
        <button
          data-testid="auth-modal-close"
          onClick={onClose}
          style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "1.25rem", lineHeight: 1, padding: "0.25rem", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#FFFFFF"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
        >
          <X size={18} />
        </button>

        <p style={{ fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.875rem" }}>
          LP-MOD-G0-4 | ACCOUNT REQUIRED
        </p>
        <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.625rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          {authMode === "register" ? "Create your account to continue" : "Sign in to continue"}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
          Lessons G0-4 through G0-6 and your progress are saved to your account. Takes 30 seconds.
        </p>

        {/* Google button */}
        <button
          data-testid="auth-modal-google-btn"
          onClick={onGoogle}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", minHeight: 44, background: "#FFFFFF", color: "#1A1A1A", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.924rem", cursor: "pointer", marginBottom: "1.25rem", transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >
          <GoogleLogo size={18} weight="bold" />
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Mode tabs */}
        <div style={{ display: "flex", gap: "0", marginBottom: "1.25rem", border: "1px solid rgba(255,255,255,0.1)" }}>
          {["register", "login"].map(mode => (
            <button
              key={mode}
              data-testid={`auth-tab-${mode}`}
              onClick={() => onModeChange(mode)}
              style={{ flex: 1, padding: "0.625rem", background: authMode === mode ? "rgba(212,144,10,0.1)" : "transparent", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.762rem", letterSpacing: "0.12em", textTransform: "uppercase", color: authMode === mode ? "#d4900a" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.15s", borderBottom: authMode === mode ? "2px solid #d4900a" : "2px solid transparent" }}
            >
              {mode === "register" ? "Create Account" : "Sign In"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={authMode === "register" ? onRegister : onLogin} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {authMode === "register" && (
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.375rem" }}>
                Name (optional)
              </label>
              <input
                data-testid="auth-name-input"
                type="text"
                value={authForm.name}
                onChange={e => onFormChange("name", e.target.value)}
                placeholder="Your name"
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          )}
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.375rem" }}>
              Email address
            </label>
            <input
              data-testid="auth-email-input"
              type="email"
              required
              value={authForm.email}
              onChange={e => onFormChange("email", e.target.value)}
              placeholder="you@example.com"
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.375rem" }}>
              Password
            </label>
            <PasswordInput
              data-testid="auth-password-input"
              required
              value={authForm.password}
              onChange={e => onFormChange("password", e.target.value)}
              placeholder={authMode === "register" ? "Min. 6 characters" : "Your password"}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {authError && (
            <p data-testid="auth-error" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "#f87171", lineHeight: 1.5 }}>
              {authError}
            </p>
          )}

          <button
            data-testid="auth-submit-btn"
            type="submit"
            disabled={authLoading}
            style={{ width: "100%", minHeight: 44, background: authLoading ? "rgba(212,144,10,0.5)" : "#d4900a", color: "#0b1628", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.924rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: authLoading ? "wait" : "pointer", transition: "background 0.2s" }}
          >
            {authLoading ? "Processing..." : authMode === "register" ? "Create Account & Continue" : "Sign In & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
