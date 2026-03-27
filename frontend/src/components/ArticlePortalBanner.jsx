;

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";

/**
 * ArticlePortalBanner
 * Contextual cross-link shown at the bottom of each Knowledge Center brief.
 * Maps the article topic to its corresponding implementation sequence task in the portal.
 *
 * Props:
 *   taskId    — e.g. "DA-001"
 *   taskName  — e.g. "Drug & Alcohol Program"
 *   message   — optional override body copy
 */
export default function ArticlePortalBanner({ taskId, taskName, message }) {
  const router = useRouter();

  const defaultMessage = `This compliance area is tracked as a Standard Task in the LaunchPath Operating System. Operators enrolled in the Standard use the portal to submit documentation, receive coach verification, and maintain their Administrative Signal.`;

  return (
    <div style={{
      background: "#000A14",
      borderTop: "1px solid rgba(212,144,10,0.14)",
      borderBottom: "1px solid rgba(212,144,10,0.14)",
      padding: "3rem 2.5rem",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* System label row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "#d4900a",
            boxShadow: "0 0 5px rgba(212,144,10,0.5)",
            flexShrink: 0,
          }} />
          <p style={{
            fontFamily: mono,
            fontSize: "0.714rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.75)",
            margin: 0,
          }}>
            LPOS v1.0 | STANDARD_TASK: {taskId} — {taskName?.toUpperCase()}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2.5rem",
          alignItems: "center",
        }}
          className="portal-banner-grid"
        >
          {/* Left: copy */}
          <div>
            <h3 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.015em",
              marginBottom: "0.875rem",
              lineHeight: 1.35,
            }}>
              This is a Standard Task inside the LaunchPath Operating System.
            </h3>
            <p style={{
              fontFamily: sans,
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.58)",
              lineHeight: 1.8,
              maxWidth: 520,
              margin: 0,
            }}>
              {message || defaultMessage}
            </p>
          </div>

          {/* Right: CTAs */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            flexShrink: 0,
          }}>
            <button
              data-testid={`portal-crosslink-${taskId?.toLowerCase().replace("-", "")}`}
              onClick={() => router.push("/portal")}
              style={{
                background: "#d4900a",
                border: "none",
                color: "#020617",
                fontFamily: mono,
                fontWeight: 700,
                fontSize: "0.714rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.875rem 1.5rem",
                cursor: "pointer",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8a520"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#d4900a"}
            >
              OPEN OPERATOR PORTAL →
            </button>
            <button
              data-testid={`ground0-crosslink-${taskId?.toLowerCase().replace("-", "")}`}
              onClick={() => router.push("/reach-diagnostic")}
              style={{
                background: "transparent",
                border: "1px solid rgba(212,144,10,0.25)",
                color: "rgba(212,144,10,0.75)",
                fontFamily: mono,
                fontWeight: 700,
                fontSize: "0.714rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,144,10,0.55)";
                e.currentTarget.style.color = "#d4900a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,144,10,0.25)";
                e.currentTarget.style.color = "rgba(212,144,10,0.75)";
              }}
            >
              TAKE REACH DIAGNOSTIC →
            </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 640px) {
          .portal-banner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
