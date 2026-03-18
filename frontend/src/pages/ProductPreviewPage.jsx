import { useState } from "react";
import Navbar from "../components/Navbar";
import { BookMockup3D, BookInfoPanel, BOOK_PRODUCTS } from "../components/BookMockup3D";

const gold = "#d4900a";

export default function ProductPreviewPage() {
  const [activeId, setActiveId] = useState("new-entrant");
  const product = BOOK_PRODUCTS.find(p => p.id === activeId);

  return (
    <div style={{ background: "#000814", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            letterSpacing: "0.18em", textTransform: "uppercase", color: gold,
            marginBottom: "0.5rem",
          }}>LP-SYS-LIBRARY | PRODUCT PREVIEW TOOL</p>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}>3D Book Mockup Export</h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
            color: "rgba(255,255,255,0.55)", marginTop: "0.5rem",
          }}>
            Select a product, drag to rotate, then export your Gumroad cover image and thumbnail.
          </p>
        </div>

        {/* Product selector tabs */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.4rem",
          marginBottom: "1.5rem",
        }}>
          {BOOK_PRODUCTS.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.5rem 0.9rem",
                cursor: "pointer",
                border: activeId === p.id
                  ? `1px solid ${gold}`
                  : "1px solid rgba(255,255,255,0.15)",
                background: activeId === p.id
                  ? "rgba(212,144,10,0.12)"
                  : "transparent",
                color: activeId === p.id ? gold : "rgba(255,255,255,0.5)",
                borderRadius: "3px",
                transition: "all 0.15s",
              }}
            >
              {p.code}
            </button>
          ))}
        </div>

        {/* Scene + panel */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "1.5rem",
          alignItems: "start",
        }} className="preview-grid">
          {/* Three.js scene */}
          <div>
            <div style={{
              border: "1px solid rgba(212,144,10,0.12)",
              borderRadius: "6px",
              overflow: "hidden",
            }}>
              <BookMockup3D key={activeId} productId={activeId} mode="export" />
            </div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.08em",
              marginTop: "0.75rem",
              textAlign: "center",
            }}>
              DRAG TO ROTATE  ·  AUTO-ROTATES WHEN IDLE  ·  PRESERVES DRAW BUFFER FOR EXPORT
            </p>
          </div>

          {/* Info panel */}
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem",
            }}>RIGHT PANEL CONTENT</p>
            <BookInfoPanel productId={activeId} />

            {/* Export instructions */}
            <div style={{
              marginTop: "1.5rem",
              padding: "1.25rem",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "4px",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: gold, marginBottom: "0.75rem",
              }}>Export Guide</p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                <strong style={{ color: "rgba(255,255,255,0.85)" }}>Cover (1280×720)</strong> — Gumroad product listing image. Shows full scene.
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                <strong style={{ color: "rgba(255,255,255,0.85)" }}>Thumbnail (600×600)</strong> — Tighter crop, square format. Gumroad grid thumbnail.
              </p>
            </div>
          </div>
        </div>

        {/* Current product title */}
        <div style={{
          marginTop: "2rem",
          padding: "1rem 1.5rem",
          borderLeft: `3px solid ${gold}`,
          background: "rgba(212,144,10,0.04)",
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            letterSpacing: "0.12em", textTransform: "uppercase", color: gold,
            marginBottom: "0.25rem",
          }}>Currently previewing</p>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "1.1rem", color: "#FFFFFF",
          }}>{product.name}</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
            color: "rgba(255,255,255,0.5)", marginTop: "0.25rem",
          }}>{product.outcomeLine}</p>
        </div>

      </main>

      <style>{`
        @media (max-width: 760px) {
          .preview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
