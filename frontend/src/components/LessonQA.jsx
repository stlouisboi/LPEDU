import React, { useState, useEffect, useCallback } from "react";
import { ChatCircle, ArrowRight } from "@phosphor-icons/react";

const API = process.env.REACT_APP_BACKEND_URL;

export default function LessonQA({ lessonId, lessonNumber }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchQA = useCallback(() => {
    if (!lessonId) return;
    setLoading(true);
    fetch(`${API}/api/portal/lesson/${lessonId}/qa`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { setItems(d.qa || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [lessonId]);

  useEffect(() => { fetchQA(); }, [fetchQA]);

  const handlePost = async () => {
    if (!question.trim()) return;
    setPosting(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/portal/lesson/${lessonId}/qa`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });
      if (!res.ok) throw new Error("Failed to post");
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
      setQuestion("");
    } catch {
      setError("Could not post question. Please try again.");
    }
    setPosting(false);
  };

  const formatTime = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return ""; }
  };

  return (
    <div data-testid="lesson-qa" style={{ marginTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
        <ChatCircle size={15} color="rgba(212,144,10,0.7)" />
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: 0 }}>
          LESSON {lessonNumber} — Q&A
        </p>
        {items.length > 0 && (
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em" }}>
            {items.length} {items.length === 1 ? "QUESTION" : "QUESTIONS"}
          </span>
        )}
      </div>

      {/* Questions list */}
      {loading ? (
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          LOADING...
        </p>
      ) : items.length === 0 ? (
        <div style={{ padding: "1rem 0", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>No questions yet for this lesson. Be the first to ask.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          {items.map((item) => (
            <div key={item.qa_id} data-testid={`qa-item-${item.qa_id}`} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "1rem 1.25rem" }}>
              {/* Question */}
              <div style={{ marginBottom: item.reply ? "0.875rem" : 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.8)", letterSpacing: "0.06em" }}>
                    {item.user_name}
                  </span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em" }}>
                    {formatTime(item.created_at)}
                  </span>
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.65, margin: 0 }}>
                  {item.question}
                </p>
              </div>

              {/* Reply */}
              {item.reply && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.875rem", paddingLeft: "0.75rem", borderLeft: "2px solid rgba(212,144,10,0.3)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.06em" }}>
                      Station Custodian
                    </span>
                    {item.replied_at && (
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em" }}>
                        {formatTime(item.replied_at)}
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.65, margin: 0 }}>
                    {item.reply}
                  </p>
                </div>
              )}

              {/* Awaiting reply badge */}
              {!item.reply && (
                <div style={{ marginTop: "0.5rem" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,158,11,0.6)", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)", padding: "0.15rem 0.5rem" }}>
                    AWAITING REPLY
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post question form */}
      <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.25rem" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.875rem" }}>
          ASK A QUESTION
        </p>
        <textarea
          data-testid="qa-question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question about this lesson..."
          rows={3}
          style={{
            width: "100%",
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.924rem",
            lineHeight: 1.6,
            padding: "0.75rem 1rem",
            resize: "vertical",
            boxSizing: "border-box",
            outline: "none",
            marginBottom: "0.75rem",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(212,144,10,0.4)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
        {error && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "#ef4444", marginBottom: "0.625rem" }}>{error}</p>}
        <button
          data-testid="qa-submit-btn"
          onClick={handlePost}
          disabled={posting || !question.trim()}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "0.625rem 1.25rem",
            background: question.trim() ? "#d4900a" : "rgba(255,255,255,0.06)",
            color: question.trim() ? "#000F1F" : "rgba(255,255,255,0.25)",
            border: "none", cursor: posting || !question.trim() ? "default" : "pointer",
            transition: "all 0.2s", opacity: posting ? 0.7 : 1,
          }}
        >
          {posting ? "POSTING..." : "POST QUESTION"}
          {!posting && question.trim() && <ArrowRight size={12} />}
        </button>
      </div>
    </div>
  );
}
