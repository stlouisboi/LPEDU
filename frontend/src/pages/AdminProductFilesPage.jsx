import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API   = process.env.REACT_APP_BACKEND_URL;
const gold  = "#d4900a";
const navy  = "#0b1628";
const dark  = "#080f1e";
const card  = "#0c1828";
const mono  = "'Inter', sans-serif";
const disp  = "'Playfair Display', serif";
const BORDER = "rgba(255,255,255,0.07)";

// Product catalog mirror (must match backend PRODUCTS dict)
const PRODUCTS = {
  "LP-RES-001": { name: "16 Deadly Sins Pocket Guide",            price: "$17" },
  "LP-RES-002": { name: "DQ File Builder Kit",                    price: "$37" },
  "LP-RES-003": { name: "New Carrier Compliance Starter Kit",     price: "$47" },
  "LP-RES-004": { name: "Safety Audit Prep Pack",                 price: "$67" },
  "LP-RES-005": { name: "Four Pillars Compliance Blueprint",      price: "$97" },
  "LP-RES-006": { name: "Complete Compliance Library",            price: "$197" },
  "LP-PKT-001": { name: "New Entrant Compliance Packet",          price: "$97" },
  "LP-PKT-002": { name: "Drug & Alcohol Compliance Packet",       price: "$97" },
  "LP-PKT-003": { name: "HOS & Dispatch Compliance Packet",       price: "$127" },
  "LP-PKT-004": { name: "Maintenance & Unit File Packet",         price: "$127" },
  "LP-PKT-005": { name: "Insurance & Authority Packet",           price: "$127" },
  "LP-BDL-001": { name: "Complete New Carrier Document System",   price: "$497" },
};

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
function ProductRow({ sku, product, fileInfo, onUploaded }) {
  const [uploadState, setUploadState] = useState("idle"); // idle | confirming | uploading | done | error
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);

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
    try {
      const r = await fetch(`${API}/api/admin/products/${sku}/test-download`, { credentials: "include" });
      if (!r.ok) { alert("Test download failed. Is a file uploaded?"); return; }
      const d = await r.json();
      window.open(`${API}/api/products/download?token=${d.token}`, "_blank");
    } catch { alert("Test download error."); }
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
          {hasFile ? (
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
          <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileSelect} />
          <button
            data-testid={`upload-btn-${sku.toLowerCase()}`}
            onClick={() => fileRef.current?.click()}
            style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: gold, background: "transparent", border: `1px solid rgba(212,144,10,0.35)`, padding: "0.4rem 0.875rem", cursor: "pointer" }}
          >
            {hasFile ? "Replace" : "Upload"}
          </button>
          {hasFile && (
            <button
              data-testid={`test-dl-btn-${sku.toLowerCase()}`}
              onClick={handleTestDl}
              style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", background: "transparent", border: "1px solid rgba(255,255,255,0.14)", padding: "0.4rem 0.875rem", cursor: "pointer" }}
            >
              Test DL
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

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminProductFilesPage() {
  const [authed, setAuthed]     = useState(false);
  const [loading, setLoading]   = useState(true);
  const [fileMap, setFileMap]   = useState({});  // { sku: fileInfo }

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

  const uploadedCount = Object.keys(fileMap).length;
  const totalCount    = Object.keys(PRODUCTS).length;

  return (
    <div style={{ minHeight: "100vh", background: dark, fontFamily: mono, color: "#fff" }}>
      {/* Top bar */}
      <div style={{ background: navy, borderBottom: `1px solid ${BORDER}`, padding: "0.875rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, margin: 0 }}>LAUNCHPATH ADMIN</p>
          <Link to="/admin/admissions" style={{ fontFamily: mono, fontSize: "0.762rem", color: "rgba(255,255,255,0.40)", textDecoration: "none" }}>Admissions →</Link>
          <Link to="/admin/modules"    style={{ fontFamily: mono, fontSize: "0.762rem", color: "rgba(255,255,255,0.40)", textDecoration: "none" }}>Modules →</Link>
        </div>
        <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: 0 }}>PRODUCT FILE MANAGER</p>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "3rem 1.75rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "0.5rem" }}>
            LP-ADMIN | PRODUCT FILES
          </p>
          <h1 style={{ fontFamily: disp, fontWeight: 700, fontSize: "1.75rem", color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
            Product File Manager
          </h1>
          <p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(255,255,255,0.40)" }}>
            {uploadedCount} of {totalCount} products have files uploaded
            {uploadedCount < totalCount && (
              <span style={{ color: "#ef4444", marginLeft: "0.75rem" }}>
                · {totalCount - uploadedCount} missing
              </span>
            )}
          </p>
        </div>

        {/* Summary badges */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.20)", padding: "0.6rem 1.25rem" }}>
            <span style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.1em" }}>
              {uploadedCount} UPLOADED
            </span>
          </div>
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)", padding: "0.6rem 1.25rem" }}>
            <span style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em" }}>
              {totalCount - uploadedCount} MISSING
            </span>
          </div>
        </div>

        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 60px 160px 1fr", gap: "1rem", padding: "0.75rem 0", borderBottom: `2px solid rgba(212,144,10,0.25)`, marginBottom: "0.25rem" }}>
          {["SKU", "Product Name", "Price", "Status", "Actions"].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {Object.entries(PRODUCTS).map(([sku, product]) => (
          <ProductRow
            key={sku}
            sku={sku}
            product={product}
            fileInfo={fileMap[sku] || null}
            onUploaded={handleUploaded}
          />
        ))}

        {/* Instructions */}
        <div style={{ marginTop: "3rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>UPLOAD NOTES</p>
          <ul style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(255,255,255,0.40)", lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>Only PDF files are accepted (max 50MB per file).</li>
            <li>Use "Test DL" to verify a file is downloadable before buyers hit it.</li>
            <li>Replacing a file for a SKU overwrites the previous version immediately.</li>
            <li>Buyers receive a 60-minute time-limited download link upon payment.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
