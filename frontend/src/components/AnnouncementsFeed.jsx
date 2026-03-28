import React, { useState, useEffect } from "react";
import { Megaphone, X } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;

export default function AnnouncementsFeed() {
  const [items, setItems] = useState([]);
  const [dismissed, setDismissed] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dismissed_announcements") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    fetch(`${API}/api/portal/announcements`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setItems(d.announcements || []))
      .catch(() => {});
  }, []);

  const dismiss = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try { localStorage.setItem("dismissed_announcements", JSON.stringify(next)); } catch {}
  };

  const visible = items.filter((a) => !dismissed.includes(a.announcement_id));
  if (visible.length === 0) return null;

  const priorityStyles = {
    critical: { border: "rgba(239,68,68,0.4)", borderLeft: "#ef4444", bg: "rgba(239,68,68,0.05)", labelColor: "#ef4444", label: "IMPORTANT" },
    important: { border: "rgba(245,158,11,0.35)", borderLeft: "#f59e0b", bg: "rgba(245,158,11,0.04)", labelColor: "#f59e0b", label: "NOTICE" },
    normal:   { border: "rgba(255,255,255,0.1)", borderLeft: "rgba(212,144,10,0.6)", bg: "rgba(212,144,10,0.03)", labelColor: "rgba(212,144,10,0.7)", label: "ANNOUNCEMENT" },
  };

  return (
    <div data-testid="announcements-feed" style={{ marginBottom: "2rem" }}>
      {visible.map((ann) => {
        const s = priorityStyles[ann.priority] || priorityStyles.normal;
        return (
          <div
            key={ann.announcement_id}
            data-testid={`announcement-${ann.announcement_id}`}
            style={{
              position: "relative",
              background: s.bg,
              border: `1px solid ${s.border}`,
              borderLeft: `3px solid ${s.borderLeft}`,
              padding: "1rem 3rem 1rem 1.25rem",
              marginBottom: "0.75rem",
            }}
          >
            {/* Dismiss button */}
            <button
              data-testid={`dismiss-announcement-${ann.announcement_id}`}
              onClick={() => dismiss(ann.announcement_id)}
              style={{
                position: "absolute", top: "0.75rem", right: "0.875rem",
                background: "none", border: "none", color: "rgba(255,255,255,0.28)",
                cursor: "pointer", padding: "0.2rem", display: "flex", alignItems: "center",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <Megaphone size={14} color={s.labelColor} style={{ flexShrink: 0, marginTop: "0.15rem" }} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: s.labelColor }}>
                    {s.label}
                  </span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.857rem", color: "#FFFFFF" }}>{ann.title}</span>
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: 0 }}>
                  {ann.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
