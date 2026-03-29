import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PasswordInput from "../../src/components/PasswordInput";

const API  = process.env.REACT_APP_BACKEND_URL;
const dark  = "#030810";
const card  = "#0B1220";
const gold  = "#C8933F";
const navy  = "#080E1C";
const BORDER = "rgba(200,147,63,0.18)";
const mono  = "'JetBrains Mono', monospace";
const disp  = "'Playfair Display', serif";

const ADMIN_LINKS = [
  { href: "/admin/products",    label: "Product Files" },
  { href: "/admin/modules",     label: "Course Modules" },
  { href: "/admin/admissions",  label: "Admissions" },
  { href: "/admin/community",   label: "Community" },
  { href: "/admin/gate-reviews",label: "Gate Reviews" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const redirect = router.query.redirect || "/admin/products";
  const [form, setForm]   = useState({ email: "", password: "" });
  const [state, setState] = useState("idle");

  const inp = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff", fontFamily: mono, fontSize: "1rem",
    padding: "0.875rem 1.125rem", outline: "none",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      const r = await fetch(`${API}/api/auth/login`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (d.ok && d.user?.email === "vince@launchpathedu.com") {
        router.push(redirect);
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login — LaunchPath</title>
      </Head>
      <div style={{ minHeight: "100vh", background: dark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: mono }}>

        {/* Logo */}
        <p style={{ fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: "2.5rem" }}>
          LAUNCHPATH / ADMIN
        </p>

        {/* Login card */}
        <div style={{ width: "100%", maxWidth: 400, background: card, border: `1px solid ${BORDER}`, padding: "2.5rem" }}>
          <h1 style={{ fontFamily: disp, fontSize: "1.625rem", fontWeight: 700, color: "#fff", margin: "0 0 0.5rem" }}>
            Admin Access
          </h1>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>
            Coach credentials required
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              style={inp}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
              data-testid="admin-email-input"
            />
            <PasswordInput
              style={inp}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
            />
            {state === "error" && (
              <p style={{ fontSize: "0.857rem", color: "#f87171", margin: 0 }}>
                Invalid credentials.
              </p>
            )}
            <button
              type="submit"
              disabled={state === "loading"}
              data-testid="admin-login-btn"
              style={{ background: gold, color: navy, fontFamily: mono, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.875rem", border: "none", cursor: "pointer", marginTop: "0.5rem" }}
            >
              {state === "loading" ? "Logging in…" : "Login →"}
            </button>
          </form>
        </div>

        {/* Quick links */}
        <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {ADMIN_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: "0.714rem", color: "rgba(200,147,63,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
        </div>

      </div>
    </>
  );
}
