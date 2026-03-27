import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, DownloadSimple, Shield } from "@phosphor-icons/react";

const API = process.env.REACT_APP_BACKEND_URL;

const PILLARS = ["Authority Protection", "Insurance Continuity", "Compliance Backbone", "Cash-Flow Systems"];

export default function VerifiedRegistryID({ user }) {
  const [credential, setCredential] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/portal/registry-id`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { setCredential(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch { return iso.slice(0, 10); }
  };

  const handleExportPDF = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const card = cardRef.current;

      // Capture the credential card at 2x scale for crisp resolution
      const canvas = await html2canvas(card, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#000f1f",
        logging: false,
      });

      // A4 portrait: 210mm × 297mm
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      // Background fill
      pdf.setFillColor(0, 15, 31); // #000F1F
      pdf.rect(0, 0, pageW, pageH, "F");

      // Gold top bar
      pdf.setFillColor(212, 144, 10);
      pdf.rect(0, 0, pageW, 3, "F");

      // Header text
      pdf.setFontSize(7);
      pdf.setTextColor(212, 144, 10);
      pdf.setFont("helvetica", "bold");
      pdf.text("LAUNCHPATH OPERATING STANDARD", pageW / 2, 14, { align: "center", charSpace: 1.5 });

      pdf.setFontSize(5.5);
      pdf.setTextColor(120, 140, 160);
      pdf.setFont("helvetica", "normal");
      pdf.text("LPOS v1.0 · LP-SYS-001 · COMPLIANCE CREDENTIAL", pageW / 2, 19, { align: "center", charSpace: 1 });

      // Horizontal rule
      pdf.setDrawColor(212, 144, 10, 0.3);
      pdf.setLineWidth(0.3);
      pdf.line(15, 23, pageW - 15, 23);

      // Place credential card image, centered with margin
      const imgData = canvas.toDataURL("image/png");
      const cardAspect = canvas.height / canvas.width;
      const maxImgW = pageW - 30; // 15mm margin each side
      const imgW = maxImgW;
      const imgH = imgW * cardAspect;
      const imgX = 15;
      const imgY = 28;

      // Draw dark background for card region
      pdf.setFillColor(0, 10, 25);
      pdf.roundedRect(imgX - 1, imgY - 1, imgW + 2, imgH + 2, 1, 1, "F");

      pdf.addImage(imgData, "PNG", imgX, imgY, imgW, imgH);

      const bottomOfCard = imgY + imgH;

      // Divider
      pdf.setDrawColor(212, 144, 10, 0.2);
      pdf.line(15, bottomOfCard + 8, pageW - 15, bottomOfCard + 8);

      // Four-pillar confirmation block
      pdf.setFontSize(6);
      pdf.setTextColor(212, 144, 10);
      pdf.setFont("helvetica", "bold");
      pdf.text("FOUR-PILLAR CERTIFICATION", pageW / 2, bottomOfCard + 14, { align: "center", charSpace: 1 });

      const pillarsY = bottomOfCard + 20;
      const colW = (pageW - 30) / 2;
      pdf.setFontSize(7.5);
      pdf.setFont("helvetica", "normal");
      PILLARS.forEach((pillar, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 15 + col * colW;
        const y = pillarsY + row * 7;
        // Green checkmark dot
        pdf.setFillColor(34, 197, 94);
        pdf.circle(x + 1.5, y - 1.2, 1.2, "F");
        pdf.setTextColor(200, 210, 220);
        pdf.text(pillar, x + 5, y);
      });

      // Verification statement
      const stmtY = pillarsY + 18;
      pdf.setDrawColor(34, 197, 94, 0.2);
      pdf.rect(15, stmtY - 4, pageW - 30, 18, "D");
      pdf.setFontSize(7);
      pdf.setTextColor(160, 180, 200);
      pdf.setFont("helvetica", "normal");
      const stmtLines = pdf.splitTextToSize(
        "This credential confirms that the above operator's four-pillar compliance system has been reviewed and verified by the LaunchPath Station Custodian. It represents a documented, defensible compliance installation as of the date of issuance. This credential does not constitute legal advice or guarantee regulatory approval.",
        pageW - 42
      );
      pdf.text(stmtLines, pageW / 2, stmtY + 2, { align: "center" });

      // Footer
      pdf.setFontSize(6);
      pdf.setTextColor(60, 80, 100);
      pdf.text("LaunchPath Education · launchpathedu.com", pageW / 2, pageH - 10, { align: "center", charSpace: 0.5 });
      pdf.setFillColor(212, 144, 10);
      pdf.rect(0, pageH - 3, pageW, 3, "F");

      // Filename based on registry ID
      const filename = `${credential.registry_id}_Registry_Seal.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Export failed. Please try the print option instead.");
    }
    setExporting(false);
  };

  if (loading) return (
    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
      LOADING CREDENTIAL...
    </p>
  );

  if (!credential?.issued) return (
    <div data-testid="registry-id-pending" style={{ padding: "2rem", border: "1px solid rgba(212,144,10,0.2)", background: "rgba(212,144,10,0.03)", maxWidth: 580 }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.6)", marginBottom: "0.75rem" }}>LP-VRF · PENDING ISSUANCE</p>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>Verified Registry ID — Pending</h2>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
        Your Integrity Audit (Module 6) is under Station Custodian review. The Verified Registry ID will be issued upon a clean audit result.
      </p>
    </div>
  );

  return (
    <div data-testid="verified-registry-id">
      {/* ── Ceremony Introduction ── */}
      <div style={{
        borderTop: "3px solid #22c55e",
        background: "rgba(0,20,10,0.45)",
        padding: "2rem 2.5rem",
        marginBottom: "0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "repeating-linear-gradient(0deg, #22c55e 0px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #22c55e 0px, transparent 1px, transparent 32px)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          {/* Row 1 — code label + badge, animates in first */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap", animation: "credReveal 0.5s ease-out 0.05s both" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
              fontSize: "0.571rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(34,197,94,0.6)",
              margin: 0,
            }}>
              LP-MOD-6 · INTEGRITY AUDIT — CLEAN RESULT
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }} />
              <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.476rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#22c55e" }}>
                VERIFIED · ACTIVE
              </span>
            </div>
          </div>
          {/* Row 2 — headline, animates in second */}
          <h1 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
            animation: "credReveal 0.6s ease-out 0.3s both",
          }}>
            Your compliance system is verified.
          </h1>
          {/* Row 3 — body copy, animates in last */}
          <p style={{
            fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)",
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.8,
            maxWidth: 520,
            margin: 0,
            animation: "credReveal 0.6s ease-out 0.55s both",
          }}>
            The Station Custodian has reviewed your four-pillar compliance installation and confirmed it complete and defensible. Your Verified Registry ID has been issued below.
          </p>
        </div>
      </div>

      <div style={{ height: "2rem" }} />

      {/* Credential Card */}
      <div
        ref={cardRef}
        data-testid="registry-credential-card"
        style={{
          maxWidth: 640,
          background: "linear-gradient(135deg, #000f1f 0%, #001a33 50%, #0a1a2e 100%)",
          border: "1px solid rgba(212,144,10,0.4)",
          borderTop: "3px solid #d4900a",
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
          marginBottom: "1.5rem",
          animation: "credReveal 0.7s ease-out 0.8s both",
        }}
      >
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "repeating-linear-gradient(0deg, #d4900a 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #d4900a 0px, transparent 1px, transparent 40px)",
        }} />
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 16, right: 16, width: 20, height: 20, borderTop: "2px solid rgba(212,144,10,0.4)", borderRight: "2px solid rgba(212,144,10,0.4)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 16, width: 20, height: 20, borderBottom: "2px solid rgba(212,144,10,0.4)", borderLeft: "2px solid rgba(212,144,10,0.4)" }} />

        <div style={{ position: "relative" }}>
          {/* Issuer row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <Shield size={22} color="#d4900a" weight="fill" />
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#d4900a", margin: 0 }}>LAUNCHPATH VERIFIED REGISTRY</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.571rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: 0 }}>LPOS v1.0 · LP-SYS-001</p>
            </div>
          </div>

          {/* Operator */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.25rem" }}>ISSUED TO</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#FFFFFF", letterSpacing: "-0.02em", margin: "0 0 0.25rem" }}>
              {credential.operator_name}
            </h2>
            {credential.operator_email && (
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>{credential.operator_email}</p>
            )}
          </div>

          {/* Registry ID box */}
          <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,144,10,0.25)", padding: "1rem 1.5rem", marginBottom: "2rem", display: "inline-block" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.6)", marginBottom: "0.25rem" }}>REGISTRY IDENTIFIER</p>
            <p data-testid="registry-id-code" style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: "1.5rem", color: "#d4900a", letterSpacing: "0.1em", margin: 0 }}>
              {credential.registry_id}
            </p>
          </div>

          {/* Four-pillar grid */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>FOUR-PILLAR CERTIFICATION</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.375rem" }}>
              {PILLARS.map((pillar) => (
                <div key={pillar} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={12} color="#22c55e" weight="fill" />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.65)" }}>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: "0 0 0.2rem" }}>DATE OF ISSUANCE</p>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.762rem", fontWeight: 600, color: "rgba(255,255,255,0.55)", margin: 0 }}>{formatDate(credential.issued_at)}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#22c55e", margin: 0 }}>VERIFIED · ACTIVE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <button
          data-testid="export-pdf-btn"
          onClick={handleExportPDF}
          disabled={exporting}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "0.75rem 1.5rem",
            background: exporting ? "rgba(212,144,10,0.5)" : "#d4900a",
            color: "#000F1F", border: "none",
            cursor: exporting ? "default" : "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { if (!exporting) e.currentTarget.style.background = "#e8a520"; }}
          onMouseLeave={(e) => { if (!exporting) e.currentTarget.style.background = "#d4900a"; }}
        >
          <DownloadSimple size={14} weight="bold" />
          {exporting ? "GENERATING PDF..." : "DOWNLOAD REGISTRY SEAL"}
        </button>

        <button
          data-testid="print-credential-btn"
          onClick={() => window.print()}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.762rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "0.75rem 1.25rem", background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.55)",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
        >
          Print
        </button>
      </div>

      {/* Info note */}
      <div style={{ maxWidth: 580, padding: "1rem 1.25rem", background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)", borderLeft: "3px solid #22c55e" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
          The <strong style={{ color: "rgba(255,255,255,0.85)" }}>Verified Registry ID</strong> confirms that your four-pillar compliance system has been reviewed and verified by the LaunchPath Station Custodian. Download and save your Registry Seal PDF to your compliance file or share it with brokers as proof of installation.
        </p>
      </div>

      {/* What this credential means */}
      <div style={{
        maxWidth: 580,
        marginTop: "1.75rem",
        padding: "1.5rem",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderLeft: "3px solid rgba(212,144,10,0.4)",
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          fontSize: "0.571rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.65)",
          marginBottom: "1.25rem",
        }}>
          WHAT THIS CREDENTIAL MEANS FOR YOUR OPERATION
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { title: "Documented defensibility.", body: "Your compliance installation has been independently reviewed — not just self-certified. That distinction matters when an investigator arrives." },
            { title: "Broker and partner trust.", body: "Share your Registry Seal with brokers, shippers, and partners as evidence that your operation runs to a documented standard." },
            { title: "Audit position.", body: "Carriers with documented compliance systems face fewer violations and shorter audit resolution timelines. Your position is now different." },
            { title: "A permanent record.", body: "Your Registry ID is on file at LaunchPath. Your issuance date and verification status can be confirmed at any time." },
          ].map(({ title, body }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", animation: `credReveal 0.5s ease-out ${0.1 + i * 0.12}s both` }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(212,144,10,0.08)", border: "1px solid rgba(212,144,10,0.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.12rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.476rem", fontWeight: 700, color: "rgba(212,144,10,0.8)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", color: "rgba(255,255,255,0.87)", marginBottom: "0.2rem" }}>{title}</p>
                <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.65, margin: 0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes credReveal {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
