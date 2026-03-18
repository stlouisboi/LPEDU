import React, { useState } from "react";
import ReactPlayer from "react-player";
import { PlayCircle, FileText, ArrowRight } from "@phosphor-icons/react";

// ── Module 1 Lesson Data ─────────────────────────────────────────────────────
export const MODULE_1_DATA = {
  id: "module-1",
  code: "MOD-1",
  title: "Business & Authority Setup",
  description:
    "Install your legal and regulatory foundation before the first truck moves. Seven implementation units covering entity selection, USDOT filing, and authority activation.",
  totalDuration: "~2 hrs",
  lessonCount: 7,
  lessons: [
    {
      id: "1-1",
      number: "1.1",
      title: "The Authority Decision",
      subtitle: "What you're actually filing for — and what activates your compliance clock",
      duration: "~22 min",
      description:
        "Most carriers think operating authority is paperwork. It isn't. It's the moment the federal government starts the clock on your compliance obligations. This lesson defines exactly what Operating Authority is, what it activates under federal law, and why the 90-day new entrant window begins the moment your MC number goes active.",
      videoUrl: null,
      resources: [
        { label: "New Entrant Compliance Packet — LP-PKT-001", href: "/standards/new-entrant-packet" },
      ],
    },
    {
      id: "1-2",
      number: "1.2",
      title: "Choosing Your Entity Structure",
      subtitle: "LLC vs. S-Corp vs. Sole Proprietor — the liability architecture decision",
      duration: "~18 min",
      description:
        "Entity selection is not primarily a tax conversation for motor carriers. It's a liability architecture decision that determines your exposure during the most dangerous compliance window of your operation. This lesson covers the practical implications of each structure for a carrier operating inside the first 90 days of authority.",
      videoUrl: null,
      resources: [],
    },
    {
      id: "1-3",
      number: "1.3",
      title: "Filing USDOT & Operating Authority",
      subtitle: "Two separate federal identifiers — filing sequence, activation timeline, and what to watch for",
      duration: "~20 min",
      description:
        "The USDOT number and MC number are distinct federal identifiers with different purposes and different activations. This lesson walks through the correct filing sequence on FMCSA's Unified Registration System, what happens between filing and activation, and how to confirm your authority is live.",
      videoUrl: null,
      resources: [
        { label: "New Entrant Compliance Packet — LP-PKT-001", href: "/standards/new-entrant-packet" },
      ],
    },
    {
      id: "1-4",
      number: "1.4",
      title: "UCR, BOC-3, and MCS-150",
      subtitle: "Three required registrations most new carriers overlook — all three carry compliance consequences",
      duration: "~16 min",
      description:
        "Unified Carrier Registration, Process Agent filing, and the Biennial MCS-150 Update are not optional administrative tasks. Each carries its own compliance obligation, deadline, and enforcement exposure. This lesson covers what each requires and when.",
      videoUrl: null,
      resources: [
        { label: "Authority Registrations Brief (Free Resource)", href: "/knowledge-center/authority-registrations-brief" },
      ],
    },
    {
      id: "1-5",
      number: "1.5",
      title: "Insurance Certificates & Authority Activation",
      subtitle: "Why authority stays inactive until your insurer files the right certificate with FMCSA",
      duration: "~14 min",
      description:
        "Operating authority cannot be activated until a licensed insurance company files a Form BMC-91 or BMC-91X with FMCSA directly. This is a step most new carriers don't know exists. This lesson covers what must be filed, by whom, how to track submission, and how to confirm activation.",
      videoUrl: null,
      resources: [
        { label: "Insurance & Authority Packet — LP-PKT-005", href: "/standards/insurance-packet" },
      ],
    },
    {
      id: "1-6",
      number: "1.6",
      title: "Reading Your SAFER Web Profile",
      subtitle: "Your public compliance record — what auditors, brokers, and shippers see before they call you",
      duration: "~12 min",
      description:
        "SAFER Web is FMCSA's public-facing carrier database. Before any safety audit, insurance renewal, or broker relationship, your SAFER profile is checked. This lesson shows you how to read every field on your profile and what immediate corrections to make.",
      videoUrl: null,
      resources: [],
    },
    {
      id: "1-7",
      number: "1.7",
      title: "Module 1 Complete — Authority Installed",
      subtitle: "Checklist verification and handoff to Module 2: Insurance Survival",
      duration: "~10 min",
      description:
        "Authority is active. The foundation is installed. This closing session reviews the Module 1 implementation checklist, confirms your authority status through FMCSA's carrier portal, and sets the context for Module 2 — where we build the insurance layer before the audit window narrows further.",
      videoUrl: null,
      resources: [
        { label: "New Entrant Compliance Packet — LP-PKT-001", href: "/standards/new-entrant-packet" },
      ],
    },
  ],
};

// ── Video Placeholder ────────────────────────────────────────────────────────
function VideoPlaceholder({ lesson, moduleCode }) {
  const mono = "'JetBrains Mono', 'Courier New', monospace";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000D1A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
      }}
    >
      <PlayCircle size={56} color="rgba(197,160,89,0.22)" weight="thin" />
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: mono,
            fontSize: "0.504rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "rgba(197,160,89,0.5)",
            textTransform: "uppercase",
            marginBottom: "0.625rem",
          }}
        >
          {moduleCode} | LESSON {lesson.number}
        </p>
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.62)",
            maxWidth: 320,
            lineHeight: 1.4,
            marginBottom: "0.875rem",
          }}
        >
          {lesson.title}
        </p>
        <p
          style={{
            fontFamily: mono,
            fontSize: "0.448rem",
            fontWeight: 700,
            letterSpacing: "0.26em",
            color: "rgba(255,255,255,0.16)",
            textTransform: "uppercase",
          }}
        >
          VIDEO IN PRODUCTION
        </p>
      </div>
    </div>
  );
}

// ── VideoLessonWorkbench ─────────────────────────────────────────────────────
export function VideoLessonWorkbench({ moduleData }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const lesson = moduleData.lessons[activeIdx];
  const mono = "'JetBrains Mono', 'Courier New', monospace";

  return (
    <div data-testid="video-lesson-workbench">
      {/* Module Header */}
      <p
        style={{
          fontFamily: mono,
          fontSize: "0.672rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#C5A059",
          marginBottom: "1.25rem",
        }}
      >
        LP-{moduleData.code} | {moduleData.title.toUpperCase()}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1.25rem",
          marginBottom: "0.625rem",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {moduleData.title}
        </h1>
        <span
          style={{
            fontFamily: mono,
            fontSize: "0.504rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          {moduleData.lessonCount} LESSONS · {moduleData.totalDuration}
        </span>
      </div>

      <p
        style={{
          fontSize: "1rem",
          color: "rgba(255,255,255,0.68)",
          lineHeight: 1.78,
          maxWidth: 580,
          marginBottom: "2.5rem",
        }}
      >
        {moduleData.description}
      </p>

      {/* Workbench */}
      <div
        style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}
        className="lesson-workbench-layout"
      >
        {/* Left: Video + Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 16:9 Video container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              background: "#000D1A",
              marginBottom: "1.75rem",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ position: "absolute", inset: 0 }}>
              {lesson.videoUrl ? (
                <ReactPlayer
                  url={lesson.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  config={{
                    vimeo: { playerOptions: { byline: false, portrait: false, title: false } },
                  }}
                />
              ) : (
                <VideoPlaceholder lesson={lesson} moduleCode={moduleData.code} />
              )}
            </div>
          </div>

          {/* Lesson Info */}
          <div
            style={{
              borderLeft: "3px solid #C5A059",
              paddingLeft: "1.25rem",
              marginBottom: "1.75rem",
            }}
          >
            <p
              style={{
                fontFamily: mono,
                fontSize: "0.56rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "rgba(197,160,89,0.72)",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              {moduleData.code} | LESSON {lesson.number} · {lesson.duration}
            </p>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                marginBottom: "0.4rem",
              }}
            >
              {lesson.title}
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.924rem",
                color: "rgba(255,255,255,0.52)",
                marginBottom: "1rem",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              {lesson.subtitle}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.98rem",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.82,
              }}
            >
              {lesson.description}
            </p>
          </div>

          {/* Supporting Resources */}
          {lesson.resources?.length > 0 && (
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: mono,
                  fontSize: "0.504rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  marginBottom: "0.875rem",
                }}
              >
                SUPPORTING RESOURCES
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {lesson.resources.map((r, i) => (
                  <a
                    key={i}
                    href={r.href}
                    data-testid={`lesson-resource-${i}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.896rem",
                      color: "#C5A059",
                      textDecoration: "none",
                      padding: "0.75rem 1rem",
                      background: "rgba(197,160,89,0.05)",
                      border: "1px solid rgba(197,160,89,0.16)",
                      transition: "background 0.15s",
                      maxWidth: 460,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(197,160,89,0.11)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgba(197,160,89,0.05)")
                    }
                  >
                    <FileText size={14} weight="bold" style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{r.label}</span>
                    <ArrowRight size={12} style={{ flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Lesson Track */}
        <div
          style={{
            width: 256,
            flexShrink: 0,
            position: "sticky",
            top: "80px",
            alignSelf: "flex-start",
          }}
          className="lesson-track"
        >
          <p
            style={{
              fontFamily: mono,
              fontSize: "0.448rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.22)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            LESSON TRACK — {moduleData.lessonCount} UNITS
          </p>

          {moduleData.lessons.map((l, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={l.id}
                data-testid={`lesson-track-${l.id}`}
                onClick={() => setActiveIdx(idx)}
                style={{
                  width: "100%",
                  background: isActive ? "rgba(197,160,89,0.07)" : "none",
                  border: "none",
                  borderLeft: isActive
                    ? "2px solid #C5A059"
                    : "2px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  padding: "0.75rem 0.875rem",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  transition: "background 0.12s, border-color 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: "0.504rem",
                      fontWeight: 700,
                      color: isActive ? "#C5A059" : "rgba(255,255,255,0.28)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {l.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.616rem",
                      color: "rgba(255,255,255,0.26)",
                    }}
                  >
                    {l.duration}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.784rem",
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.56)",
                    lineHeight: 1.35,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {l.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lesson-workbench-layout { flex-direction: column !important; }
          .lesson-track { width: 100% !important; position: static !important; order: -1; margin-bottom: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
