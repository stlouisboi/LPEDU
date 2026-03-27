import FadeIn from "./FadeIn";

const DISQUALIFIERS = [
  "LaunchPath is not for carriers who believe compliance is a one-time setup task rather than an operating discipline.",
  "LaunchPath is not for carriers who are waiting until the first violation to take documentation seriously.",
  "LaunchPath is not for carriers who want someone to manage their compliance for them rather than install it themselves.",
  "LaunchPath is not for carriers who are running on optimism and a clean driving record instead of a documented system.",
];

export default function WhoNotForSection() {
  return (
    <section data-testid="who-not-for-section" style={{
      background: "var(--bg-paper)",
      padding: "7rem 1.5rem",
      borderTop: "3px solid var(--gold-primary)",
      borderBottom: "1px solid var(--divider-light)",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.5rem", color: "var(--text-paper-heading)" }}>
            Who This Is Not For
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.2rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            maxWidth: 640,
          }}>
            If you are looking for a way to pass an audit without building the systems behind it, LaunchPath will frustrate you.
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3.5rem" }}>
          {DISQUALIFIERS.map((line, i) => (
            <FadeIn key={i} delay={i * 60}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.092rem",
                color: "var(--text-paper)",
                lineHeight: 1.8,
                paddingLeft: "1.5rem",
                borderLeft: "2px solid var(--divider-light)",
              }}>
                {line}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{
            borderTop: "1px solid var(--divider-light)",
            paddingTop: "2.5rem",
          }}>
            <p style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 500,
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "var(--text-paper-heading)",
              lineHeight: 1.8,
              textAlign: "center",
            }}>
              The carriers who succeed in the first 90 days are not the most experienced. They are the most prepared.<br />
              If you read those four lines and recognized someone else — not yourself — you are the carrier this standard was built for.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
