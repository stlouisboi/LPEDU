import { useState } from "react";
import { Eye, EyeOff } from "@phosphor-icons/react";

const GOLD = "#C8933F";
const NAVY = "#080E1C";

export default function PasswordInput({ style, placeholder = "Password", value, onChange, required, autoComplete, name }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        name={name}
        data-testid="password-input"
        style={{ ...style, paddingRight: "2.5rem", width: "100%", boxSizing: "border-box" }}
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        data-testid="password-toggle-btn"
        style={{
          position: "absolute",
          right: "0.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: show ? GOLD : "rgba(255,255,255,0.35)",
          padding: 0,
          display: "flex",
          alignItems: "center",
          transition: "color 0.2s",
        }}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
