import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { PlayCircle, FileText, ArrowRight } from "@phosphor-icons/react";
import LessonQA from "./LessonQA";

const API = process.env.REACT_APP_BACKEND_URL;

// ── Module 1 Lesson Data ─────────────────────────────────────────────────────
export const MODULE_1_DATA = {
  id: "module-1",
  code: "MOD-1",
  title: "Driver Qualification File",
  description:
    "Build the complete, audit-ready Driver Qualification File for every operating driver — including the owner-operator. Eight implementation units covering business foundation, federal filings, and the DQF gate. Module 2 does not unlock until the Station Custodian verifies this module complete.",
  totalDuration: "~120 min",
  lessonCount: 8,
  lessons: [
    {
      id: "1-1",
      number: "1.1",
      title: "Your Business Foundation",
      subtitle: "Entity structure, liability architecture, and what you're building before the first truck moves",
      duration: "~8 min",
      description:
        "Before authority is filed, the legal and financial structure of your operation determines your personal liability exposure during the most dangerous compliance window in your career. This lesson establishes what the business foundation means for a motor carrier and why getting it right before Day 1 is the single most important decision you'll make.",
      videoUrl: null,
      resources: [
        { label: "Business Foundation Brief — LP-PKT-001", href: "/standards/new-entrant-packet" },
      ],
    },
    {
      id: "1-2",
      number: "1.2",
      title: "Business Entity Selection",
      subtitle: "LLC vs. S-Corp vs. Sole Proprietor — the liability architecture decision for motor carriers",
      duration: "~12 min",
      description:
        "Entity selection is not primarily a tax conversation for motor carriers. It is a liability architecture decision that determines your personal exposure during the most dangerous compliance window of your operation. This lesson covers the practical implications of each structure for a carrier operating inside the first 90 days of authority.",
      videoUrl: null,
      resources: [],
    },
    {
      id: "1-3",
      number: "1.3",
      title: "Filing for DOT/MC Authority",
      subtitle: "Two separate federal identifiers — filing sequence, activation timeline, and confirmation",
      duration: "~18 min",
      description:
        "The USDOT number and MC number are distinct federal identifiers with different purposes and different activation timelines. This lesson walks through the correct filing sequence on FMCSA's Unified Registration System, what happens between filing and activation, and how to confirm authority is live in SAFER.",
      videoUrl: null,
      resources: [
        { label: "Authority Filing Guide — LP-PKT-001", href: "/standards/new-entrant-packet" },
      ],
    },
    {
      id: "1-4",
      number: "1.4",
      title: "BOC-3 and Process Agent",
      subtitle: "The required filing most new carriers overlook — and what happens when it's missing",
      duration: "~10 min",
      description:
        "BOC-3 Process Agent designation is a mandatory FMCSA filing that most new carriers miss. Without it, authority activation can stall and compliance penalties can accrue. This lesson covers what BOC-3 requires, how to file, and how to verify it's on record.",
      videoUrl: null,
      resources: [],
    },
    {
      id: "1-5",
      number: "1.5",
      title: "UCR and State Registrations",
      subtitle: "Annual compliance requirements that carry enforcement exposure when missed",
      duration: "~12 min",
      description:
        "Unified Carrier Registration is an annual requirement with enforcement consequences that most new carriers discover only after they're in violation. This lesson covers UCR registration, state-level requirements, and how to build these renewal obligations into your compliance calendar.",
      videoUrl: null,
      resources: [
        { label: "Authority Registrations Brief", href: "/knowledge-center/authority-registrations-brief" },
      ],
    },
    {
      id: "1-6",
      number: "1.6",
      title: "Insurance — First Look",
      subtitle: "BMC-91/91X filing, authority activation, and the coverage types FMCSA requires",
      duration: "~15 min",
      description:
        "Operating authority cannot activate until a licensed insurer files a Form BMC-91 or BMC-91X with FMCSA directly. This is a step most new carriers don't know exists. This lesson covers what must be filed, by whom, how to track submission, and how to confirm activation.",
      videoUrl: null,
      resources: [
        { label: "Insurance & Authority Packet — LP-PKT-005", href: "/standards/insurance-packet" },
      ],
    },
    {
      id: "1-7",
      number: "1.7",
      title: "Driver Qualification File (GATE)",
      subtitle: "Building the complete, audit-ready DQF — the hard gate before Module 2",
      duration: "~15 min",
      description:
        "The Driver Qualification File is the single most cited deficiency in new entrant audits. Every operating driver — including the owner-operator — must have a complete, current DQF on file before a mile is driven commercially. This lesson builds the complete DQF from scratch. Completing this lesson triggers the Station Custodian review. Module 2 unlocks only after the DQF is verified audit-ready.",
      videoUrl: null,
      resources: [
        { label: "DQF Build Kit — LP-PKT-003", href: "/standards/dqf-packet" },
        { label: "Driver Qualification Checklist", href: "/standards/dqf-checklist" },
      ],
    },
    {
      id: "1-8",
      number: "1.8",
      title: "Business Banking & Chart of Accounts",
      subtitle: "Financial infrastructure setup — separating personal and business finances from Day 1",
      duration: "~10 min",
      description:
        "Commingling personal and business funds is the most common financial mistake new carriers make. It creates audit exposure, tax liability, and personal liability risk. This lesson covers business banking setup, basic chart of accounts structure, and the financial discipline required to run a compliant commercial operation.",
      videoUrl: null,
      resources: [
        { label: "Financial Infrastructure Brief", href: "/knowledge-center/financial-infrastructure" },
      ],
    },
  ],
  completionChecklist: [
    { id: "1-cl-1", text: "USDOT number verified on FMCSA SAFER as Active status" },
    { id: "1-cl-2", text: "MC number (Operating Authority) verified on FMCSA SAFER as Active" },
    { id: "1-cl-3", text: "BOC-3 Process Agent filing confirmed on record in FMCSA system" },
    { id: "1-cl-4", text: "Insurance certificate obtained and BMC-91/91X filed with FMCSA" },
    { id: "1-cl-5", text: "SAFER screenshot showing 'Active' authority status captured and saved" },
    { id: "1-cl-6", text: "MCS-150 biennial update current (filed within 24 months)" },
  ],
};

// ── Video Placeholder ────────────────────────────────────────────────────────
function VideoPlaceholder({ lesson, moduleCode }) {
  const mono = "'Inter', sans-serif";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080f1e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
      }}
    >
      <PlayCircle size={56} color="rgba(212,144,10,0.22)" weight="thin" />
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: mono,
            fontSize: "0.714rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "rgba(212,144,10,0.5)",
            textTransform: "uppercase",
            marginBottom: "0.625rem",
          }}
        >
          {moduleCode} | LESSON {lesson.number}
        </p>
        <p
          style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 600,
            fontSize: "1.1rem",
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
            fontSize: "0.762rem",
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
export function VideoLessonWorkbench({ moduleData, gateStatus, onGateSubmit, viewedLessons = [], onLessonView }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [urlMap, setUrlMap] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const lesson = moduleData.lessons[activeIdx];

  // Auto-mark lesson as viewed when selected
  const handleSelectLesson = (idx) => {
    setActiveIdx(idx);
    const lessonId = moduleData.lessons[idx]?.id;
    if (lessonId && onLessonView && !viewedLessons.includes(lessonId)) {
      onLessonView(lessonId);
    }
  };
  const mono = "'Inter', sans-serif";

  // Fetch admin-set Vimeo/PDF URLs for this module
  useEffect(() => {
    fetch(`${API}/api/portal/module-urls/${moduleData.id}`)
      .then(r => r.json())
      .then(d => {
        const map = {};
        (d.lessons || []).forEach(l => { map[l.lesson_id] = { vimeo_url: l.vimeo_url, pdf_url: l.pdf_url }; });
        setUrlMap(map);
      })
      .catch(() => {});
  }, [moduleData.id]);

  return (
    <div data-testid="video-lesson-workbench">
      {/* Module Header */}
      <p
        style={{
          fontFamily: mono,
          fontSize: "0.762rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#d4900a",
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
            fontFamily: "'Newsreader', 'Playfair Display', serif",
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
            fontSize: "0.714rem",
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
          fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)",
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
              background: "#080f1e",
              marginBottom: "1.75rem",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ position: "absolute", inset: 0 }}>
              {(urlMap[lesson.id]?.vimeo_url || lesson.videoUrl) ? (
                <ReactPlayer
                  url={urlMap[lesson.id]?.vimeo_url || lesson.videoUrl}
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
              borderLeft: "3px solid #d4900a",
              paddingLeft: "1.25rem",
              marginBottom: "1.75rem",
            }}
          >
            {/* Position indicator + meta */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
                  fontSize: "0.714rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "#d4900a",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                LESSON {activeIdx + 1} OF {moduleData.lessonCount}
              </p>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
                  fontSize: "0.619rem",
                  color: "rgba(212,144,10,0.52)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {moduleData.code} · {lesson.number} · {lesson.duration}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                marginBottom: "0.625rem",
              }}
            >
              {lesson.title}
            </h2>
            {lesson.subtitle && (
              <div style={{ background: "rgba(212,144,10,0.04)", borderLeft: "2px solid rgba(212,144,10,0.28)", padding: "0.5rem 0.875rem", marginBottom: "1rem" }}>
                <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.97rem", color: "rgba(255,255,255,0.62)", fontStyle: "italic", lineHeight: 1.55, margin: 0 }}>
                  {lesson.subtitle}
                </p>
              </div>
            )}
            <p
              style={{
                fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)",
                fontSize: "1rem",
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
                  fontSize: "0.714rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  marginBottom: "0.875rem",
                }}
              >
                TOOLS FOR THIS LESSON
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
                      fontSize: "var(--text-sm)",
                      color: "#d4900a",
                      textDecoration: "none",
                      padding: "0.75rem 1rem",
                      background: "rgba(212,144,10,0.05)",
                      border: "1px solid rgba(212,144,10,0.16)",
                      transition: "background 0.15s",
                      maxWidth: 460,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(212,144,10,0.11)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgba(212,144,10,0.05)")
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

          {/* Per-Lesson Q&A */}
          <LessonQA lessonId={lesson.id} lessonNumber={lesson.number} />
        </div>

        {/* Gate Submission — DQF (lesson 1.7 / MOD-1) or Integrity Audit (lesson 6.6 / MOD-6) */}
        {moduleData.gateLesson && lesson.number === moduleData.gateLesson && onGateSubmit && (
          <div data-testid="dqf-gate-section" style={{ marginTop: "2rem", padding: "1.5rem", background: moduleData.gateType === "integrity_audit" ? "rgba(212,144,10,0.04)" : "rgba(239,68,68,0.04)", border: `1px solid ${moduleData.gateType === "integrity_audit" ? "rgba(212,144,10,0.25)" : "rgba(239,68,68,0.2)"}`, borderLeft: `4px solid ${moduleData.gateType === "integrity_audit" ? "#d4900a" : "#ef4444"}`, boxSizing: "border-box" }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: moduleData.gateType === "integrity_audit" ? "#d4900a" : "#ef4444", marginBottom: "0.625rem" }}>
              {moduleData.gateType === "integrity_audit" ? "MOD-6 CREDENTIAL GATE · STATION CUSTODIAN REVIEW REQUIRED" : "MOD-1 HARD GATE · CUSTODIAN REVIEW REQUIRED"}
            </p>
            <h3 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
              {moduleData.gateType === "integrity_audit" ? "Submit for Integrity Audit" : "Submit DQF for Review"}
            </h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "1rem" }}>
              {moduleData.gateType === "integrity_audit"
                ? "The Verified Registry ID is issued only after the Station Custodian confirms your four-pillar compliance system is complete and defensible. By submitting, you confirm:"
                : "Module 2 will not unlock until the Station Custodian verifies your Driver Qualification File. By submitting, you confirm:"}
            </p>
            <ul style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.824rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, paddingLeft: "1.125rem", marginBottom: "1.25rem" }}>
              {moduleData.gateType === "integrity_audit" ? (
                <>
                  <li>Your Authority Protection documentation (filings, UCR, BOC-3, SMS) is current and on file</li>
                  <li>Your Insurance Continuity system (BMC filings, certificates, coverage) is active and documented</li>
                  <li>Your Compliance Backbone (DQF, D&A program, HOS records, maintenance logs) is complete</li>
                  <li>Your financial systems are in place and all four pillars are ready for examination</li>
                </>
              ) : (
                <>
                  <li>A complete DQF exists for every operating driver, including the owner-operator</li>
                  <li>All required documents (application, MVR, PSP, medical cert, road test, drug test) are on file</li>
                  <li>The file is organized and ready for examination</li>
                </>
              )}
            </ul>
            {!submitted && gateStatus !== "pending_review" ? (
              <button
                data-testid="submit-dqf-btn"
                disabled={submitting}
                onClick={async () => {
                  setSubmitting(true);
                  const attestation = moduleData.gateType === "integrity_audit"
                    ? "I confirm that my full four-pillar compliance system (Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow systems) is installed, documented, and ready for Station Custodian examination."
                    : "I confirm that a complete, audit-ready Driver Qualification File has been built for every operating driver including the owner-operator. All required documents are on file and organized for examination.";
                  await onGateSubmit(attestation);
                  setSubmitted(true);
                  setSubmitting(false);
                }}
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 1.75rem", background: moduleData.gateType === "integrity_audit" ? "#d4900a" : "#ef4444", color: moduleData.gateType === "integrity_audit" ? "#000F1F" : "#fff", border: "none", cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? "SUBMITTING..." : moduleData.gateType === "integrity_audit" ? "SUBMIT FOR INTEGRITY AUDIT →" : "SUBMIT DQF FOR CUSTODIAN REVIEW →"}
              </button>
            ) : (
              <div data-testid="dqf-submitted-state" style={{ padding: "0.75rem 1rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "flex-start", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f59e0b", flexShrink: 0 }}>PENDING REVIEW</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>You will be notified by email when a decision is made. Expected: 2 business days.</span>
              </div>
            )}
          </div>
        )}

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
              fontSize: "0.762rem",
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
            const isViewed = viewedLessons.includes(l.id);
            const isGateLes = moduleData.gateLesson && l.number === moduleData.gateLesson;
            return (
              <button
                key={l.id}
                data-testid={`lesson-track-${l.id}`}
                onClick={() => handleSelectLesson(idx)}
                style={{
                  width: "100%",
                  background: isActive ? "rgba(212,144,10,0.07)" : "none",
                  border: "none",
                  borderLeft: isActive
                    ? "2px solid #d4900a"
                    : isGateLes ? "2px solid rgba(239,68,68,0.4)"
                    : isViewed ? "2px solid rgba(34,197,94,0.3)"
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
                      fontSize: "0.714rem",
                      fontWeight: 700,
                      color: isActive ? "#d4900a" : isGateLes ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.28)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {l.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.714rem",
                      color: "rgba(255,255,255,0.26)",
                    }}
                  >
                    {l.duration}
                  </span>
                  {isViewed && !isGateLes && <span style={{ color: "#22c55e", fontSize: "0.7rem", flexShrink: 0 }}>✓</span>}
                  {isGateLes && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.476rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: moduleData.gateType === "integrity_audit" ? "rgba(212,144,10,0.85)" : "rgba(239,68,68,0.75)", background: "rgba(0,0,0,0.4)", padding: "0.1rem 0.3rem", flexShrink: 0 }}>{moduleData.gateType === "integrity_audit" ? "CRED" : "GATE"}</span>}
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.857rem",
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
