import { Link } from '../compat/Link';
import { useSearchParams } from 'next/navigation';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

// ── Replace with actual Gumroad bundle URL when available ──
const GUMROAD_BUNDLE_URL = "https://launchpath.gumroad.com/l/document-system";

const RESULT_HEADER = {
  GO: {
    color: "#22c55e",
    label: "REACH RESULT: GO",
    headline: "Your result: GO — your operational infrastructure is aligned.",
    sub: "You are cleared to proceed. Review your recommended next step below.",
  },
  WAIT: {
    color: "#fbbf24",
    label: "REACH RESULT: WAIT",
    headline: "Your result: WAIT — gaps have been identified in your assessment.",
    sub: "Address the flagged areas before proceeding to Standard admission.",
  },
  "NO-GO": {
    color: "#f87171",
    label: "REACH RESULT: NO-GO",
    headline: "Your result: NO-GO — critical operational gaps require resolution.",
    sub: "LaunchPath will be here when the conditions improve. Review the preparation path below.",
  },
};

const PATHS = [
  {
    id: "A",
    label: "PATH A — FULL SYSTEM INSTALLATION",
    code: "LP-STD-001 | LaunchPath Standard",
    title: "Request Admission to the Standard",
    includes: [
      "Complete 90-day implementation sequence",
      "All compliance documentation systems",
      "Verified milestone tracking",
      "Direct access to Station Custodian",
    ],
    best_for: "Operators ready to install the full system with guided implementation.",
    cta: "Request Admission",
    href: "/admission",
    external: false,
    priceLabel: "Admission-based",
    borderTop: "#d4900a",
    ctaBg: "#d4900a",
    ctaColor: "#0b1628",
    primary: true,
  },
  {
    id: "B",
    label: "PATH B — DOCUMENT SYSTEM ONLY",
    code: "LP-DOC-BND | New Carrier Document System",
    title: "Install the Document Infrastructure",
    includes: [
      "5 complete document packets (30+ forms)",
      "Driver qualification file system",
      "Drug & alcohol program documentation",
      "HOS & dispatch records",
      "Maintenance & unit files",
      "Insurance & authority tracking",
      "90-day implementation map",
    ],
    best_for: "Operators who can self-implement with the right documentation infrastructure.",
    cta: "Get Document System",
    href: GUMROAD_BUNDLE_URL,
    external: true,
    priceLabel: "$499",
    borderTop: "#475569",
    ctaBg: "#334155",
    ctaColor: "#f1f5f9",
    primary: false,
  },
  {
    id: "C",
    label: "PATH C — RETURN LATER",
    code: null,
    title: "Return When Ready",
    includes: [
      "Access the Operational Library briefs",
      "Review the 90-day authority timeline",
      "Revisit your REACH Assessment result",
      "Ground 0 completion is saved permanently",
    ],
    best_for: "Operators not ready to proceed. Ground 0 does not expire.",
    cta: "Return to Portal",
    href: "/portal",
    external: false,
    priceLabel: "Free",
    borderTop: "#334155",
    ctaBg: "transparent",
    ctaColor: "#94a3b8",
    primary: false,
  },
];

function PathCard({ path }) {
  const ctaEl = path.external ? (
    <a
      href={path.href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`path-${path.id.toLowerCase()}-cta`}
      style={{
        display: "block",
        background: path.ctaBg,
        color: path.ctaColor,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "var(--text-sm)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0.875rem 1.5rem",
        textDecoration: "none",
        textAlign: "center",
        border: path.primary ? "none" : "1px solid rgba(255,255,255,0.12)",
        transition: "opacity 0.2s",
        marginTop: "auto",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {path.cta}
    </a>
  ) : (
    <Link
      to={path.href}
      data-testid={`path-${path.id.toLowerCase()}-cta`}
      style={{
        display: "block",
        background: path.ctaBg,
        color: path.ctaColor,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "var(--text-sm)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0.875rem 1.5rem",
        textDecoration: "none",
        textAlign: "center",
        border: path.primary ? "none" : "1px solid rgba(255,255,255,0.12)",
        transition: "opacity 0.2s",
        marginTop: "auto",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {path.cta}
    </Link>
  );

  return (
    <div
      data-testid={`path-card-${path.id.toLowerCase()}`}
      style={{
        background: "#0D1929",
        borderTop: `3px solid ${path.borderTop}`,
        padding: "2rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        flex: path.primary ? "1.15" : "1",
        minWidth: 0,
      }}
    >
      {/* Label */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.714rem",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: path.primary ? "rgba(212,144,10,0.9)" : "rgba(148,163,184,0.8)",
        marginBottom: "0.375rem",
      }}>
        {path.label}
      </p>

      {/* Code */}
      {path.code && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.1em",
          marginBottom: "1.25rem",
        }}>
          {path.code}
        </p>
      )}

      {/* Title */}
      <h3 style={{
        fontFamily: "'Newsreader', 'Playfair Display', serif",
        fontWeight: 700,
        fontSize: "1.1rem",
        color: "#FFFFFF",
        lineHeight: 1.3,
        marginBottom: "1.25rem",
      }}>
        {path.title}
      </h3>

      {/* Includes list */}
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem", flex: 1 }}>
        {path.includes.map((item, i) => (
          <li key={i} style={{
            display: "flex",
            gap: "0.625rem",
            alignItems: "flex-start",
            marginBottom: "0.5rem",
          }}>
            <span style={{ color: path.borderTop, flexShrink: 0, marginTop: "0.2rem", fontSize: "0.7rem" }}>—</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--text-sm)",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.55,
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "1.25rem" }} />

      {/* Best for */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontStyle: "italic",
        fontSize: "0.825rem",
        color: "rgba(255,255,255,0.55)",
        lineHeight: 1.55,
        marginBottom: "1.5rem",
      }}>
        Best for: {path.best_for}
      </p>

      {/* Price + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "0.875rem" }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.857rem",
          color: "rgba(255,255,255,0.55)",
        }}>
          {path.priceLabel}
        </p>
      </div>

      {ctaEl}
    </div>
  );
}

export default function Ground0CompletePage() {
  const searchParams = useSearchParams();
  const resultParam = searchParams.get("result"); // "GO", "WAIT", "NO-GO", or null
  const resultCfg = resultParam ? RESULT_HEADER[resultParam] : null;

  return (
    <div style={{ background: "#080f1e", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      {/* ── Header Block ─────────────────────────────────── */}
      <div style={{
        background: "#080f1e",
        padding: "96px 24px 64px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* LP code */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.85)",
            marginBottom: "2rem",
          }}>
            LP-MOD-G0 | GROUND 0 COMPLETE
          </p>

          {/* Dynamic result badge — shown when result is present, else generic completion indicator */}
          {resultCfg ? (
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              border: `1px solid ${resultCfg.color}`,
              background: `rgba(${resultCfg.color === "#22c55e" ? "34,197,94" : resultCfg.color === "#fbbf24" ? "251,191,36" : "248,113,113"},0.08)`,
              padding: "0.6rem 1.25rem",
              marginBottom: "2rem",
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.857rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: resultCfg.color,
                margin: 0,
              }}>
                {resultCfg.label}
              </p>
            </div>
          ) : (
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
              padding: "0.6rem 1.25rem",
              marginBottom: "2rem",
            }}>
              <span style={{ color: "#22c55e", fontSize: "1.1rem", lineHeight: 1 }}>✓</span>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                color: "rgba(34,197,94,0.95)",
                letterSpacing: "0.04em",
                margin: 0,
              }}>
                Ground 0 Installation Complete
              </p>
            </div>
          )}

          {/* Dynamic headline */}
          <h1 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            color: "#FFFFFF",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}>
            {resultCfg ? resultCfg.headline : "The next step depends on your operational situation."}
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.8,
            maxWidth: 620,
          }}>
            {resultCfg
              ? resultCfg.sub
              : "You've completed the orientation phase of the LaunchPath Operating Standard. You now understand the regulatory architecture, the 90-day timeline, and the systems required to protect your authority."
            }
          </p>
        </div>
      </div>

      {/* ── Three Paths ───────────────────────────────────── */}
      <div style={{
        background: "#001030",
        padding: "72px 24px 80px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>

          {/* Section label */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "2.5rem",
          }}>
            Choose Your Path
          </p>

          {/* Cards grid */}
          <div
            style={{ display: "flex", gap: "1px", background: "rgba(255,255,255,0.07)" }}
            className="completion-paths"
          >
            {PATHS.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>

        </div>
      </div>

      {/* ── Wisdom Quote ──────────────────────────────────── */}
      <div style={{
        background: "#000810",
        padding: "64px 24px",
        borderBottom: "1px solid rgba(212,144,10,0.1)",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.55)",
            marginBottom: "1.75rem",
          }}>
            LP-DOCTRINE
          </p>
          <p style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 600,
            fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
            color: "rgba(255,255,255,0.90)",
            lineHeight: 1.75,
            fontStyle: "italic",
            marginBottom: "1.25rem",
          }}>
            "Most failures in the first 90 days are not failures of commitment. They are failures of structure."
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
            letterSpacing: "0.12em",
            color: "rgba(212,144,10,0.65)",
            textTransform: "uppercase",
          }}>
            — Vince Lawrence, Station Custodian
          </p>
        </div>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 760px) {
          .completion-paths { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
