const GOLD  = "#C8933F";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";
const BODY  = "rgba(244,241,235,0.80)";

const COST_ITEMS = [
  { code: "LP-CST-01", label: "Civil Penalties",       detail: "Per-violation fines for unqualified drivers, missing records, or program failures. They compound fast." },
  { code: "LP-CST-02", label: "Downtime",              detail: "Days or weeks off the road while corrective action is taken. Freight does not wait." },
  { code: "LP-CST-03", label: "Insurance Disruption",  detail: "A conditional or unsatisfactory rating can trigger carrier review or outright cancellation." },
  { code: "LP-CST-04", label: "Missed Revenue",        detail: "Loads refused, contracts lost, and broker relationships damaged while the operation is locked down." },
  { code: "LP-CST-05", label: "Corrective Action",     detail: "Filing plans, reinstatement fees, reapplication costs, and legal review. Often $15,000–$40,000+." },
  { code: "LP-CST-06", label: "Loss of Authority",     detail: "In serious cases, the MC authority is revoked. Restarting costs more than installation would have." },
];

export default function CostOfFailureSection() {
  return (
    <section
      data-testid="cost-of-failure-section"
      style={{
        background: "#060c18",
        borderTop: "2px solid rgba(192,57,43,0.40)",
        borderBottom: "1px solid rgba(192,57,43,0.20)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Label */}
        <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(192,57,43,0.60)", marginBottom: "1.25rem" }}>
          LP-CONSEQUENCE — UNGUARDED EXPOSURE
        </p>

        {/* Headline */}
        <h2 className="data-stream" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "1.5rem" }}>
          THE COST OF FAILURE<br />DOES NOT ASK FOR PERMISSION.
        </h2>

        {/* Body */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 680, marginBottom: "3.5rem" }}>
          A preventable gap does not stay cheap because it started small. When an unguarded problem reaches the authority, the cost can show up in fines, downtime, insurance pain, missed freight, corrective action, and loss of trust. None of it announces itself in advance.
        </p>

        {/* Cost grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.20)", marginBottom: "3rem" }}>
          {COST_ITEMS.map((item, i) => (
            <div
              key={item.code}
              data-testid={`cost-item-${i}`}
              style={{ background: "#070c18", padding: "1.75rem 1.5rem", position: "relative" }}
            >
              <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(192,57,43,0.45)", margin: "0 0 0.5rem" }}>
                {item.code}
              </p>
              <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.952rem", color: "rgba(255,255,255,0.88)", margin: "0 0 0.625rem", letterSpacing: "0.01em" }}>
                {item.label}
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(244,241,235,0.55)", lineHeight: 1.72, margin: 0 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Anchor line */}
        <div style={{ borderLeft: "3px solid rgba(192,57,43,0.60)", paddingLeft: "1.5rem", maxWidth: 620 }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.05rem", color: GOLD, lineHeight: 1.75, margin: 0 }}>
            The right time to find the gaps is before pressure finds them for you.
          </p>
        </div>

      </div>
    </section>
  );
}
