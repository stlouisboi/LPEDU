import { T, mono, serif, display } from "../tokens";
import { ArrowItem, CTAButton, CrossItem, SectionLabel, section } from "../SharedComponents";

export default function WhoIsItForSection({ handleReach }) {
  return section(
    <>
      <SectionLabel>LP-QFY-001 · OPERATOR QUALIFICATION FILTER</SectionLabel>
      <h2 className="section-headline" style={{ ...display, fontSize: 48, color: T.white, lineHeight: 1.15, maxWidth: 680, marginBottom: 16 }}>
        This Is Built for<br />
        <span style={{ color: T.goldText }}>One Type of Operator.</span>
      </h2>
      <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
        LaunchPath is not for everyone.
        It is specifically built for new motor carriers
        who treat compliance as operational infrastructure — not administrative overhead.
      </p>

      <div className="two-col" style={{ display: "flex", gap: 2, marginBottom: 48 }}>
        <div style={{ flex: 1, background: T.navyCard, border: `1px solid ${T.navyBorder}`, borderTop: `3px solid ${T.green}`, padding: "32px 28px" }}>
          <p style={{ ...mono, fontSize: 10, color: "#4CAF80", letterSpacing: "0.16em", marginBottom: 20 }}>THIS IS FOR YOU IF:</p>
          {[
            "You received your MC number in the last 90 days and you are not certain every required file is complete and current",
            "You are pre-authority and want the infrastructure installed before the clock starts — not while it's running",
            "You are approaching Month 9 and your compliance documentation has not been formally verified by anyone who knows what FMCSA looks for",
            "You run 1–5 trucks and you are the only person responsible for your own compliance record",
            "You are willing to do the work — 3 to 5 hours per week for 90 days — because you understand that a $40,000 restart costs more than the time",
            "You want documented proof that your system was built correctly — not just your own belief that it was",
          ].map((item, i) => <ArrowItem key={i} color={T.white}>{item}</ArrowItem>)}
        </div>

        <div style={{ flex: 1, background: T.navyCard, border: `1px solid ${T.navyBorder}`, borderTop: "3px solid #7A3535", padding: "32px 28px" }}>
          <p style={{ ...mono, fontSize: 10, color: "#B05555", letterSpacing: "0.16em", marginBottom: 20 }}>THIS IS NOT FOR YOU IF:</p>
          {[
            "You are looking for someone to manage your compliance on your behalf",
            "You need a dispatch service, a compliance broker, or a freight agent",
            "You already have a dedicated safety director or compliance team actively managing your files",
            "You want a general trucking course, CDL training, or freight brokerage education",
            "You are not willing to submit your actual compliance documentation for custodian review",
            "You believe federal auditors will overlook incomplete files because your operation is small",
          ].map((item, i) => <CrossItem key={i}>{item}</CrossItem>)}
        </div>
      </div>

      <div className="three-col" style={{ display: "flex", gap: 2, marginBottom: 48 }}>
        {[
          { code: "LP-OPR-TYPE-A", title: "THE NEW AUTHORITY", desc: "MC number active 0–60 days. Has not touched DQ files. D&A program not yet enrolled. First dispatch coming.", note: "The best time to install the system is before the first load moves." },
          { code: "LP-OPR-TYPE-B", title: "THE APPROACHING WINDOW", desc: "Authority active 6–9 months. Some files in place. No formal verification done. Audit window opening.", note: "Ground 0 identifies the gaps. You don't rebuild what's installed — you verify what exists and fill what's missing." },
          { code: "LP-OPR-TYPE-C", title: "THE AUDIT NOTICE", desc: "Received FMCSA contact. Audit scheduled or pending. Files incomplete. 45-day correction window at risk.", note: "Module 7 covers the post-failure recovery protocol specifically. You still have a window. Use it." },
        ].map((p, i) => (
          <div key={i} style={{ flex: 1, background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "28px 24px" }}>
            <p style={{ ...mono, fontSize: 10, color: T.fog, letterSpacing: "0.14em", marginBottom: 10 }}>{p.code}</p>
            <p style={{ ...mono, fontSize: 12, color: T.white, letterSpacing: "0.08em", marginBottom: 16, fontWeight: 600 }}>{p.title}</p>
            <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ height: 1, background: T.navyBorder, marginBottom: 16 }} />
            <p style={{ ...serif, fontSize: 15, color: T.fog, lineHeight: 1.65, fontStyle: "italic" }}>{p.note}</p>
          </div>
        ))}
      </div>

      <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "32px 40px", textAlign: "center" }}>
        <p style={{ ...serif, fontSize: 17, color: T.mist, marginBottom: 20 }}>
          Not sure which category you're in?<br />
          The REACH Assessment tells you in 4 minutes. No account required. No sales call.
        </p>
        <CTAButton primary={false} onClick={handleReach} data-testid="reach-assessment-btn">RUN THE REACH ASSESSMENT →</CTAButton>
      </div>
    </>,
    T.navyMid
  );
}
