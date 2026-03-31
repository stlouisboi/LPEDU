import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const EMAILS = [
  { code: "GO-E1",      flow: "GO Sequence",       num: "1/3", timing: "Within 5 min",         subject: "Your Ground 0 result — you are cleared to proceed." },
  { code: "GO-E2",      flow: "GO Sequence",       num: "2/3", timing: "24 hours",              subject: "What the 90-Day Standard covers." },
  { code: "GO-E3",      flow: "GO Sequence",       num: "3/3", timing: "48 hours",              subject: "Your admission request — next cohort details." },
  { code: "WAIT-E1",    flow: "WAIT Sequence",     num: "1/5", timing: "Immediate",             subject: "Your Ground 0 results are saved." },
  { code: "WAIT-E2",    flow: "WAIT Sequence",     num: "2/5", timing: "Day 3",                 subject: "The gaps that hold most carriers back." },
  { code: "WAIT-E3",    flow: "WAIT Sequence",     num: "3/5", timing: "Day 7",                 subject: "Start closing gaps now — Document System Bundle." },
  { code: "WAIT-E4",    flow: "WAIT Sequence",     num: "4/5", timing: "Day 14",                subject: "What GO status actually looks like." },
  { code: "WAIT-E5",    flow: "WAIT Sequence",     num: "5/5", timing: "Cohort open (manual)",  subject: "The next cohort is now open — your spot is saved." },
  { code: "NO-GO-E1",   flow: "NO-GO Sequence",   num: "1/4", timing: "Immediate",             subject: "You're on the list." },
  { code: "NO-GO-E2",   flow: "NO-GO Sequence",   num: "2/4", timing: "Day 7",                 subject: "Why LaunchPath isn't for everyone." },
  { code: "NO-GO-E3",   flow: "NO-GO Sequence",   num: "3/4", timing: "Day 30",                subject: "Still building? Here's something that might help." },
  { code: "NO-GO-E4",   flow: "NO-GO Sequence",   num: "4/4", timing: "Quarterly (manual)",    subject: "What's new at LaunchPath — [Quarter] [Year]." },
  { code: "PP-E1",      flow: "Enrollment",        num: "1/2", timing: "Instant (Stripe)",      subject: "Your LaunchPath Install Group seat is confirmed." },
  { code: "PP-E2",      flow: "Enrollment",        num: "2/2", timing: "24 hours",              subject: "How the 90-Day Survival System builds on the Four Pillars." },
  { code: "WAIT-PP-E1", flow: "Pre-Kickoff",       num: "1/3", timing: "Day 3 post-enroll",     subject: "Before kickoff — complete these three items." },
  { code: "WAIT-PP-E2", flow: "Pre-Kickoff",       num: "2/3", timing: "Day 30 post-enroll",    subject: "Your Week 1 checkpoint — what to bring." },
  { code: "WAIT-PP-E3", flow: "Pre-Kickoff",       num: "3/3", timing: "Day 45 post-enroll",    subject: "Kickoff is close — confirm your stop-loss lines." },
  { code: "AUD-E1",     flow: "Monthly Audit",     num: "↻",   timing: "Every 30 days",         subject: "[Month] Audit Readiness: Do These 3 Things First." },
  { code: "WL-E1",      flow: "Watchlist",         num: "1/1", timing: "Single opt-in",         subject: "You're on the Future Operator Watchlist." },
];

const FLOW_COLORS = {
  "GO Sequence":    "#2a5c45",
  "WAIT Sequence":  "#5c4a2a",
  "NO-GO Sequence": "#5c2a2a",
  "Enrollment":     "#1e3a5c",
  "Pre-Kickoff":    "#1e3a5c",
  "Monthly Audit":  "#1e3a5c",
  "Watchlist":      "#2a2a4a",
};

const BASE = typeof window !== "undefined" ? window.location.origin : "";

export default function EmailTemplates() {
  const router = useRouter();
  const [copied, setCopied]     = useState(null);
  const [preview, setPreview]   = useState(null);
  const [loading, setLoading]   = useState(null);

  const copyHTML = async (code) => {
    setLoading(code);
    try {
      const url = `${BASE}/emails/LP-EML-${code}.html`;
      const res  = await fetch(url);
      const html = await res.text();
      await navigator.clipboard.writeText(html);
      setCopied(code);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      alert("Copy failed — open the file URL and use Ctrl+U to view source.");
    } finally {
      setLoading(null);
    }
  };

  // Group by flow
  const flows = [...new Set(EMAILS.map(e => e.flow))];

  return (
    <>
      <Head><title>Email Templates — LaunchPath Admin</title></Head>
      <div style={{ minHeight: "100vh", background: "#0a1520", color: "#fff", fontFamily: "'Courier New', monospace" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid #111e30", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(197,160,89,0.5)", marginBottom: 4 }}>LAUNCHPATH ADMIN</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif", color: "#fff" }}>Email Templates</div>
          </div>
          <button onClick={() => router.back()} style={{ background: "none", border: "1px solid #1e2d3d", color: "rgba(255,255,255,0.4)", padding: "8px 16px", cursor: "pointer", fontSize: 11, letterSpacing: "0.1em" }}>
            ← BACK
          </button>
        </div>

        <div style={{ display: "flex", gap: 0, height: "calc(100vh - 65px)" }}>

          {/* Left — list */}
          <div style={{ width: preview ? 380 : "100%", borderRight: "1px solid #111e30", overflowY: "auto", flexShrink: 0 }}>

            {/* Instructions */}
            <div style={{ margin: "20px 24px", padding: "14px 18px", background: "#0e1e2e", border: "1px solid rgba(197,160,89,0.15)", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>
              <span style={{ color: "rgba(197,160,89,0.7)", fontWeight: 700 }}>HOW TO USE — </span>
              Click <strong style={{ color: "rgba(255,255,255,0.7)" }}>COPY HTML</strong> → In MailerLite: New automation step → Custom HTML → Paste → Set subject line → Save.
            </div>

            {flows.map(flow => {
              const group = EMAILS.filter(e => e.flow === flow);
              const color = FLOW_COLORS[flow] || "#1e2d3d";
              return (
                <div key={flow} style={{ marginBottom: 8 }}>
                  <div style={{ padding: "8px 24px", background: color, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                    {flow}
                  </div>
                  {group.map(e => (
                    <div
                      key={e.code}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 24px",
                        borderBottom: "1px solid #0d1a27",
                        background: preview?.code === e.code ? "#0e1e2e" : "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => setPreview(preview?.code === e.code ? null : e)}
                    >
                      {/* Code badge */}
                      <div style={{ flexShrink: 0, width: 90, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(197,160,89,0.6)" }}>
                        {e.code}
                      </div>

                      {/* Subject + timing */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.82)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "Georgia, serif" }}>
                          {e.subject}
                        </div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", marginTop: 2, letterSpacing: "0.08em" }}>
                          {e.num} &nbsp;·&nbsp; {e.timing}
                        </div>
                      </div>

                      {/* Copy button */}
                      <button
                        data-testid={`copy-${e.code}`}
                        onClick={ev => { ev.stopPropagation(); copyHTML(e.code); }}
                        style={{
                          flexShrink: 0,
                          padding: "7px 14px",
                          fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                          cursor: "pointer",
                          border: copied === e.code ? "1px solid rgba(80,200,120,0.5)" : "1px solid rgba(197,160,89,0.3)",
                          background: copied === e.code ? "rgba(80,200,120,0.08)" : "transparent",
                          color: copied === e.code ? "rgba(80,200,120,0.9)" : "rgba(197,160,89,0.7)",
                          transition: "all 0.2s",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {loading === e.code ? "…" : copied === e.code ? "COPIED ✓" : "COPY HTML"}
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* TBD placeholder */}
            <div style={{ margin: "16px 24px 32px", padding: "14px 18px", border: "1px dashed #1e2d3d", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", lineHeight: 1.8 }}>
              FLOW 4 — Waitlist Sequence &nbsp;·&nbsp; TBD<br />
              FLOW 5 — General Nurture &nbsp;·&nbsp; TBD<br />
              5 additional post-purchase emails &nbsp;·&nbsp; TBD
            </div>
          </div>

          {/* Right — iframe preview */}
          {preview && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "12px 20px", borderBottom: "1px solid #111e30", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(197,160,89,0.5)" }}>{preview.code} &nbsp;·&nbsp; {preview.flow}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "Georgia, serif", marginTop: 2 }}>{preview.subject}</div>
                </div>
                <button
                  onClick={() => copyHTML(preview.code)}
                  style={{
                    padding: "9px 20px", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                    cursor: "pointer", border: "1px solid rgba(197,160,89,0.4)",
                    background: copied === preview.code ? "rgba(80,200,120,0.08)" : "rgba(197,160,89,0.08)",
                    color: copied === preview.code ? "rgba(80,200,120,0.9)" : "rgba(197,160,89,0.85)",
                  }}
                >
                  {copied === preview.code ? "COPIED ✓" : "COPY HTML"}
                </button>
              </div>
              <iframe
                key={preview.code}
                src={`/emails/LP-EML-${preview.code}.html`}
                style={{ flex: 1, border: "none", background: "#0a1520" }}
                title={preview.subject}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
