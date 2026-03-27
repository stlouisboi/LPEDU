import { useState, useEffect, useRef } from "react";
import { Link } from '../compat/Link';
import AdminNavBar from "../components/AdminNavBar";

const API   = process.env.REACT_APP_BACKEND_URL;
const gold  = "#d4900a";
const navy  = "#0b1628";
const dark  = "#080f1e";
const card  = "#0c1828";
const mono  = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const body  = "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif";
const disp  = "'Newsreader', 'Playfair Display', serif";

const BORDER = "rgba(255,255,255,0.07)";

// ── Login Gate ────────────────────────────────────────────────────────────────
function AdminLoginGate({ onSuccess }) {
  const [form, setForm]   = useState({ email: "", password: "" });
  const [state, setState] = useState("idle");
  const inp = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: mono, fontSize: "1rem", padding: "0.875rem 1.125rem", outline: "none" };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      const r = await fetch(`${API}/api/auth/login`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (d.ok && d.user?.email === "vince@launchpathedu.com") { onSuccess(); }
      else setState("error");
    } catch { setState("error"); }
  };
  return (
    <div style={{ minHeight: "100vh", background: dark, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 380, background: card, border: `1px solid ${BORDER}`, padding: "2.5rem" }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: "0.75rem" }}>LAUNCHPATH ADMIN</p>
        <h2 style={{ fontFamily: disp, fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "2rem" }}>Product Files</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input style={inp} type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          <input style={inp} type="password" placeholder="Password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
          {state === "error" && <p style={{ fontFamily: mono, fontSize: "0.857rem", color: "#f87171" }}>Invalid credentials.</p>}
          <button type="submit" disabled={state === "loading"} style={{ background: gold, color: navy, fontFamily: mono, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.875rem", border: "none", cursor: "pointer" }}>
            {state === "loading" ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Row component ─────────────────────────────────────────────────────────────
function ProductRow({ sku, product, fileInfo, onUploaded, bundleContents, bundleReadiness, productsMap }) {
  const [uploadState, setUploadState] = useState("idle"); // idle | confirming | uploading | done | error
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState(null); // null | { tokens: [...] } | { error: string }
  const [emailState, setEmailState] = useState("idle"); // idle | sending | sent | error
  const fileRef = useRef(null);
  const isBundle = !!(bundleContents && bundleContents[sku]);
  // For bundles: ready = all components have files; partial = some uploaded
  const bundleStatus = isBundle ? (bundleReadiness?.[sku] || "missing") : null; // "ready" | "partial" | "missing"

  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setSelectedFile(f);
    setUploadState("confirming");
    setUploadMsg("");
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploadState("uploading");
    setProgress(0);
    const formData = new FormData();
    formData.append("file", selectedFile);
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    });
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        setUploadState("done");
        setUploadMsg("File uploaded successfully.");
        setSelectedFile(null);
        if (fileRef.current) fileRef.current.value = "";
        onUploaded(sku, res);
      } else {
        setUploadState("error");
        setUploadMsg("Upload failed. Please try again.");
      }
    });
    xhr.addEventListener("error", () => { setUploadState("error"); setUploadMsg("Upload failed. Please try again."); });
    xhr.open("POST", `${API}/api/admin/products/${sku}/upload`);
    xhr.withCredentials = true;
    xhr.send(formData);
  };

  const handleTestDl = async () => {
    setTestResults(null);
    try {
      const r = await fetch(`${API}/api/admin/products/${sku}/test-download`, { credentials: "include" });
      const d = await r.json();
      if (!r.ok) { setTestResults({ error: d.detail || "Test failed. Check component files are uploaded." }); return; }
      if (d.tokens && d.tokens.length > 0) {
        setTestResults({ tokens: d.tokens });
      } else {
        setTestResults({ error: "No tokens returned — check that component files are uploaded." });
      }
    } catch { setTestResults({ error: "Test download error — check logs." }); }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete the uploaded file for ${sku}? This cannot be undone.`)) return;
    try {
      const r = await fetch(`${API}/api/admin/products/${sku}/file`, { method: "DELETE", credentials: "include" });
      if (r.ok) onUploaded();
      else alert("Delete failed. Try again.");
    } catch { alert("Delete error."); }
  };

  const handleTestEmail = async () => {
    setEmailState("sending");
    try {
      const r = await fetch(`${API}/api/admin/products/${sku}/test-email`, { method: "POST", credentials: "include" });
      const d = await r.json();
      if (r.ok) setEmailState("sent");
      else { setEmailState("error"); alert(d.detail || "Email send failed."); }
    } catch { setEmailState("error"); alert("Email send error."); }
    setTimeout(() => setEmailState("idle"), 4000);
  };

  const hasFile = !!fileInfo;
  const fmtSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  return (
    <div data-testid={`product-row-${sku.toLowerCase()}`} style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 60px 160px 1fr", gap: "1rem", alignItems: "center" }}>
        {/* SKU */}
        <span style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, color: "rgba(212,144,10,0.75)", letterSpacing: "0.08em" }}>{sku}</span>
        {/* Name */}
        <span style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(255,255,255,0.80)" }}>{product.name}</span>
        {/* Price */}
        <span style={{ fontFamily: mono, fontSize: "0.857rem", fontWeight: 700, color: gold }}>{product.price}</span>
        {/* Status */}
        <div>
          {isBundle ? (
            bundleStatus === "ready" ? (
              <span data-testid={`file-status-${sku.toLowerCase()}`} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22c55e", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)", padding: "0.2rem 0.6rem" }}>
                Components Ready
              </span>
            ) : bundleStatus === "partial" ? (
              <span data-testid={`file-status-${sku.toLowerCase()}`} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f59e0b", background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", padding: "0.2rem 0.6rem" }}>
                Partial
              </span>
            ) : (
              <span data-testid={`file-status-${sku.toLowerCase()}`} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ef4444", background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.22)", padding: "0.2rem 0.6rem" }}>
                No Components
              </span>
            )
          ) : hasFile ? (
            <span data-testid={`file-status-${sku.toLowerCase()}`} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22c55e", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)", padding: "0.2rem 0.6rem" }}>
              File Uploaded
            </span>
          ) : (
            <span data-testid={`file-status-${sku.toLowerCase()}`} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ef4444", background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.22)", padding: "0.2rem 0.6rem" }}>
              No File
            </span>
          )}
        </div>
        {/* Actions */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          {!isBundle && <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileSelect} />}
          {!isBundle && (
            <button
              data-testid={`upload-btn-${sku.toLowerCase()}`}
              onClick={() => fileRef.current?.click()}
              style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: gold, background: "transparent", border: `1px solid rgba(212,144,10,0.35)`, padding: "0.4rem 0.875rem", cursor: "pointer" }}
            >
              {hasFile ? "Replace" : "Upload"}
            </button>
          )}
          {(hasFile || isBundle) && (
            <button
              data-testid={`test-dl-btn-${sku.toLowerCase()}`}
              onClick={handleTestDl}
              style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", background: "transparent", border: "1px solid rgba(255,255,255,0.14)", padding: "0.4rem 0.875rem", cursor: "pointer" }}
            >
              Test DL
            </button>
          )}
          <button
            data-testid={`test-email-btn-${sku.toLowerCase()}`}
            onClick={handleTestEmail}
            disabled={emailState === "sending"}
            style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: emailState === "sent" ? "rgba(74,222,128,0.80)" : "rgba(212,144,10,0.70)", background: "transparent", border: `1px solid ${emailState === "sent" ? "rgba(74,222,128,0.30)" : "rgba(212,144,10,0.25)"}`, padding: "0.4rem 0.875rem", cursor: emailState === "sending" ? "not-allowed" : "pointer" }}
          >
            {emailState === "sending" ? "Sending…" : emailState === "sent" ? "Email Sent ✓" : "Test Email"}
          </button>
          {hasFile && (
            <button
              data-testid={`delete-file-btn-${sku.toLowerCase()}`}
              onClick={handleDelete}
              style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(248,113,113,0.70)", background: "transparent", border: "1px solid rgba(248,113,113,0.25)", padding: "0.4rem 0.875rem", cursor: "pointer" }}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* File info row */}
      {hasFile && (
        <div style={{ paddingLeft: "110px", marginTop: "0.4rem", display: "flex", gap: "1.5rem" }}>
          <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.35)" }}>{fileInfo.filename}</span>
          <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)" }}>{fmtSize(fileInfo.size)}</span>
          <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)" }}>{fmtDate(fileInfo.updated_at)}</span>
        </div>
      )}

      {/* Bundle delivery note */}
      {bundleContents?.[sku] && (
        <div style={{ paddingLeft: "110px", marginTop: "0.5rem" }}>
          <span style={{ fontFamily: mono, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)" }}>
            DELIVERS:
          </span>
          <ul style={{ margin: "0.35rem 0 0 0", paddingLeft: "1rem", listStyle: "disc" }}>
            {bundleContents[sku].map(compSku => (
              <li key={compSku} style={{ fontFamily: mono, fontSize: "0.667rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.9 }}>
                <span style={{ color: "rgba(212,144,10,0.45)", marginRight: "0.5rem" }}>{compSku}</span>
                {productsMap?.[compSku]?.name || compSku}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Test DL results panel */}
      {testResults && (
        <div style={{ paddingLeft: "110px", marginTop: "0.75rem" }}>
          {testResults.error ? (
            <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(248,113,113,0.80)", margin: 0 }}>{testResults.error}</p>
          ) : (
            <div style={{ background: "rgba(212,144,10,0.06)", border: "1px solid rgba(212,144,10,0.20)", padding: "0.875rem 1rem" }}>
              <p style={{ fontFamily: mono, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", margin: "0 0 0.625rem" }}>
                TEST DOWNLOAD LINKS — expire in 60 min
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {testResults.tokens.map(item => (
                  item.token ? (
                    <div key={item.token} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                      <span style={{ fontFamily: mono, fontSize: "0.625rem", color: "rgba(255,255,255,0.35)", minWidth: 80 }}>{item.sku}</span>
                      <a
                        href={`${API}/api/products/download?token=${item.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(212,144,10,0.90)", textDecoration: "none" }}
                      >
                        {item.name} →
                      </a>
                    </div>
                  ) : (
                    <p key={item.sku} style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(248,113,113,0.70)", margin: 0 }}>
                      {item.sku} — no file uploaded yet
                    </p>
                  )
                ))}
              </div>
              <button onClick={() => setTestResults(null)} style={{ fontFamily: mono, fontSize: "0.625rem", color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer", padding: "0.5rem 0 0", letterSpacing: "0.08em" }}>
                DISMISS
              </button>
            </div>
          )}
        </div>
      )}

      {/* Confirm before upload */}
      {uploadState === "confirming" && selectedFile && (
        <div style={{ marginTop: "0.75rem", paddingLeft: "110px", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(255,255,255,0.65)" }}>{selectedFile.name} ({fmtSize(selectedFile.size)})</span>
          <button onClick={handleUpload} style={{ background: gold, color: navy, fontFamily: mono, fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.4rem 1rem", border: "none", cursor: "pointer" }}>
            Confirm Upload
          </button>
          <button onClick={() => { setUploadState("idle"); setSelectedFile(null); if (fileRef.current) fileRef.current.value = ""; }} style={{ background: "transparent", color: "rgba(255,255,255,0.35)", fontFamily: mono, fontSize: "0.714rem", border: "1px solid rgba(255,255,255,0.12)", padding: "0.4rem 0.75rem", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      )}

      {/* Progress bar */}
      {uploadState === "uploading" && (
        <div style={{ marginTop: "0.75rem", paddingLeft: "110px" }}>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden", maxWidth: 320 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: gold, transition: "width 0.2s", borderRadius: 2 }} />
          </div>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", marginTop: "0.35rem" }}>Uploading… {progress}%</p>
        </div>
      )}

      {/* Message */}
      {uploadMsg && (
        <p style={{ paddingLeft: "110px", marginTop: "0.5rem", fontFamily: mono, fontSize: "0.857rem", color: uploadState === "done" ? "#22c55e" : "#ef4444" }}>{uploadMsg}</p>
      )}
    </div>
  );
}

// ── Live Checkout Test Panel ──────────────────────────────────────────────────
function LiveCheckoutTestPanel() {
  const [checkoutState, setCheckoutState] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg]           = useState("");
  const [simState, setSimState]           = useState("idle"); // idle | loading | done | error
  const [simResult, setSimResult]         = useState(null);

  const handleTestCheckout = async () => {
    setCheckoutState("loading");
    setErrorMsg("");
    try {
      const r = await fetch(`${API}/api/products/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_sku: "LP-TEST-001", origin_url: window.location.origin }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.href = d.url;
      } else {
        setErrorMsg(d.detail || "Failed to create checkout session.");
        setCheckoutState("error");
      }
    } catch (e) {
      setErrorMsg("Network error — check backend.");
      setCheckoutState("error");
    }
  };

  const handleSimulate = async () => {
    setSimState("loading");
    setSimResult(null);
    try {
      const r = await fetch(`${API}/api/admin/products/LP-TEST-001/simulate-purchase`, {
        method: "POST", credentials: "include",
      });
      const d = await r.json();
      setSimResult(d);
      setSimState("done");
    } catch {
      setSimState("error");
    }
  };

  return (
    <div data-testid="live-checkout-test-panel" style={{ marginBottom: "2.5rem", border: "1px solid rgba(212,144,10,0.30)", background: "rgba(212,144,10,0.04)", padding: "1.5rem" }}>
      <p style={{ fontFamily: mono, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.5rem" }}>
        LP-ADMIN | STRIPE TEST
      </p>
      <p style={{ fontFamily: mono, fontSize: "0.924rem", color: "#fff", marginBottom: "0.375rem", fontWeight: 600 }}>
        Live Checkout Test — LP-TEST-001 ($1.00)
      </p>
      <p style={{ fontFamily: mono, fontSize: "0.762rem", color: "rgba(255,255,255,0.40)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
        Initiates a real $1.00 Stripe charge (live mode). Use to verify the full Stripe → webhook → confirmed page → download pipeline end-to-end.
        <br />
        <span style={{ color: "rgba(212,144,10,0.70)" }}>Use a real card on the Stripe checkout page — this is a live charge.</span>
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <button
          data-testid="test-live-checkout-btn"
          onClick={handleTestCheckout}
          disabled={checkoutState === "loading"}
          style={{ background: gold, color: navy, fontFamily: mono, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", border: "none", cursor: checkoutState === "loading" ? "not-allowed" : "pointer", opacity: checkoutState === "loading" ? 0.7 : 1 }}
        >
          {checkoutState === "loading" ? "OPENING STRIPE…" : "OPEN $1 STRIPE CHECKOUT →"}
        </button>
        <button
          data-testid="test-simulate-btn"
          onClick={handleSimulate}
          disabled={simState === "loading"}
          style={{ background: "transparent", color: "rgba(212,144,10,0.80)", fontFamily: mono, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.25rem", border: "1px solid rgba(212,144,10,0.35)", cursor: simState === "loading" ? "not-allowed" : "pointer", opacity: simState === "loading" ? 0.7 : 1 }}
        >
          {simState === "loading" ? "SIMULATING…" : "SIMULATE (NO CHARGE)"}
        </button>
      </div>
      {checkoutState === "error" && (
        <p style={{ fontFamily: mono, fontSize: "0.762rem", color: "#f87171", marginTop: "0.75rem" }}>{errorMsg}</p>
      )}
      {simState === "done" && simResult && (
        <div style={{ marginTop: "1rem", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.20)", padding: "1rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "#22c55e", marginBottom: "0.5rem", fontWeight: 700 }}>SIMULATION COMPLETE</p>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.375rem" }}>Session: {simResult.session_id}</p>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>Email sent to: {simResult.sent_to}</p>
          <a
            href={simResult.confirmed_page}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: mono, fontSize: "0.714rem", color: gold, textDecoration: "none" }}
          >
            View Confirmed Page →
          </a>
        </div>
      )}
      {simState === "error" && (
        <p style={{ fontFamily: mono, fontSize: "0.762rem", color: "#f87171", marginTop: "0.75rem" }}>Simulation failed — check backend logs.</p>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminProductFilesPage() {
  const [authed, setAuthed]         = useState(false);
  const [loading, setLoading]       = useState(true);
  const [fileMap, setFileMap]       = useState({});        // { sku: fileInfo }
  const [productsMap, setProducts]  = useState({});        // { sku: { name, price } } — from API
  const [bundleContents, setBundles]= useState({});        // { sku: [component skus] } — from API

  // Check if already logged in
  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.email === "vince@launchpathedu.com") setAuthed(true); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const loadFiles = async () => {
    try {
      const r = await fetch(`${API}/api/admin/products/files`, { credentials: "include" });
      const d = await r.json();
      const map = {};
      (d.uploaded || []).forEach(f => { map[f.sku] = f; });
      setFileMap(map);
      if (d.products)       setProducts(d.products);
      if (d.bundle_contents) setBundles(d.bundle_contents);
    } catch {}
  };

  useEffect(() => { if (authed) loadFiles(); }, [authed]);

  const handleUploaded = (sku, res) => {
    setFileMap(prev => ({
      ...prev,
      [sku]: { sku, filename: res.filename || "file.pdf", size: res.size, updated_at: res.updated_at || new Date().toISOString() },
    }));
  };

  if (loading) return <div style={{ minHeight: "100vh", background: dark }} />;
  if (!authed) return <AdminLoginGate onSuccess={() => setAuthed(true)} />;

  // Compute bundle readiness: "ready" | "partial" | "missing"
  const bundleSkus = new Set(Object.keys(bundleContents));
  const bundleReadiness = {};
  Object.entries(bundleContents).forEach(([bSku, components]) => {
    const uploaded = components.filter(c => !!fileMap[c]).length;
    if (uploaded === components.length) bundleReadiness[bSku] = "ready";
    else if (uploaded > 0) bundleReadiness[bSku] = "partial";
    else bundleReadiness[bSku] = "missing";
  });

  // Counters: a product is "satisfied" if it has its own file (non-bundle) or all components are ready (bundle)
  const satisfiedCount = Object.keys(productsMap).filter(sku =>
    bundleSkus.has(sku) ? bundleReadiness[sku] === "ready" : !!fileMap[sku]
  ).length;
  const totalCount    = Object.keys(productsMap).length;
  const missingCount  = totalCount - satisfiedCount;

  return (
    <div style={{ minHeight: "100vh", background: dark, fontFamily: mono, color: "#fff" }}>
      <AdminNavBar />

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "3rem 1.75rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "0.5rem" }}>
            LP-ADMIN | PRODUCT FILES
          </p>
          <h1 style={{ fontFamily: disp, fontWeight: 700, fontSize: "1.75rem", color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
            Product File Manager
          </h1>
          <p style={{ fontFamily: body, fontSize: "0.924rem", color: "rgba(255,255,255,0.40)" }}>
            {satisfiedCount} of {totalCount} products have files uploaded
            {missingCount > 0 && (
              <span style={{ color: "#ef4444", marginLeft: "0.75rem" }}>
                · {missingCount} missing
              </span>
            )}
          </p>
        </div>

        {/* Summary badges */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.20)", padding: "0.6rem 1.25rem" }}>
            <span style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.1em" }}>
              {satisfiedCount} UPLOADED
            </span>
          </div>
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)", padding: "0.6rem 1.25rem" }}>
            <span style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em" }}>
              {missingCount} MISSING
            </span>
          </div>
        </div>

        {/* Live Checkout Test Panel */}
        <LiveCheckoutTestPanel />

        {totalCount === 0 ? (
          <p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(255,255,255,0.30)" }}>Loading products…</p>
        ) : (
          <>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 60px 160px 1fr", gap: "1rem", padding: "0.75rem 0", borderBottom: `2px solid rgba(212,144,10,0.25)`, marginBottom: "0.25rem" }}>
              {["SKU", "Product Name", "Price", "Status", "Actions"].map(h => (
                <span key={h} style={{ fontFamily: mono, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {Object.entries(productsMap).map(([sku, product]) => (
              <ProductRow
                key={sku}
                sku={sku}
                product={product}
                fileInfo={fileMap[sku] || null}
                onUploaded={handleUploaded}
                bundleContents={bundleContents}
                bundleReadiness={bundleReadiness}
                productsMap={productsMap}
              />
            ))}
          </>
        )}

        {/* Instructions */}
        <div style={{ marginTop: "3rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>UPLOAD NOTES</p>
          <ul style={{ fontFamily: body, fontSize: "0.924rem", color: "rgba(255,255,255,0.50)", lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>Only PDF files are accepted (max 50MB per file).</li>
            <li>Use "Test DL" to verify a file is downloadable before buyers hit it.</li>
            <li>Replacing a file for a SKU overwrites the previous version immediately.</li>
            <li>Buyers receive 60-minute time-limited download links upon payment.</li>
            <li><strong style={{ color: "rgba(212,144,10,0.70)" }}>Bundles deliver component files individually</strong> — upload each component SKU (e.g. LP-PKT-SINS, LP-PKT-DQ, LP-RES-004 to activate LP-RES-006). "Test DL" on a bundle opens one tab per component.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
