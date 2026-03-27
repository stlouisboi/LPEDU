import { T, mono, serif, display } from "../tokens";
import { FAQItem, SectionLabel, section } from "../SharedComponents";

export default function FAQSection() {
  const faqs = [
    { q: "How is this different from hiring a compliance service?", a: `A compliance service manages your paperwork for you. LaunchPath installs the system so you manage it yourself.\n\nThe difference matters because when FMCSA shows up, you are the one who needs to produce the files — not a third-party service that may or may not be reachable.\n\nWe build the infrastructure inside your operation. You own it when we're done. No ongoing dependency.` },
    { q: "How is this different from the free FMCSA training?", a: `FMCSA's New Entrant online training is an awareness course. Six modules. Approximately 90 minutes. It tells you what the regulations are.\n\nIt does not build your DQ file. It does not enroll your D&A program. It does not verify your insurance filing is active on FMCSA's system. It does not simulate your audit before it happens. It does not issue a verified credential when you're done.\n\nLaunchPath installs the system the FMCSA training describes. That is the difference.` },
    { q: "I already have some files in place. Do I start over?", a: `No. Ground 0 identifies what's already installed and what's missing. You don't rebuild what's correct — you verify the structure, fill the gaps, and document what already exists to FMCSA standard.\n\nIf your DQ file is 80% complete, the Standard gets it to 100% and verifies it. You keep what you built.` },
    { q: "What if I haven't dispatched yet?", a: `The best time to install the system is before your first load moves.\n\nThe audit window opens on Day 1 of authority activation — not Day 1 of your first dispatch. Pre-authority and pre-dispatch operators are exactly who Ground 0 was built for.` },
    { q: "Is the phased option the same program?", a: `Yes. Same curriculum. Same five verification checkpoints. Same Station Custodian. Same Verified Registry ID at completion.\n\nThe only differences are:\n— Modules 5–10 unlock at Day 45 upon second payment\n— Total investment is $3,000 vs $2,500 for full authorization\n— You pay $500 more for the flexibility of the payment split\n\nBoth paths install the same system.` },
    { q: "Is admission guaranteed after I request it?", a: `No. Admission is reviewed before enrollment is confirmed.\n\nThis is not a filter designed to exclude — it is a filter designed to protect. The LaunchPath Standard requires 3–5 hours per week and the willingness to submit actual compliance documentation for custodian review. Operators who aren't positioned to complete the 90-day window don't benefit from enrolling — and don't serve the cohort.\n\nIf you complete the REACH Assessment first, the admission review is faster.` },
    { q: "What if I don't complete the 90 days?", a: `Your portal access and custodian access remain active for the duration of your enrollment window.\n\nIf you fall behind, the Station Custodian flags it at the next checkpoint and issues a correction window. The program is structured — but it is not inflexible.\n\nWhat doesn't change is the standard. Files either meet it or they don't. The 90-day window exists because the audit window doesn't wait for anyone.` },
    { q: "Is the $2,500 a one-time payment?", a: `Yes. Full authorization is $2,500 — one payment, full access Day 1.\n\nThe phased option is $1,500 today and $1,500 at Day 45 for a total of $3,000.\n\nPayment plans beyond the phased structure are available — ask during your admission review. No payment is required at the request stage.` },
  ];

  return section(
    <>
      <SectionLabel>LP-FAQ.LOG · QUESTIONS BEFORE YOU COMMIT</SectionLabel>
      <h2 className="section-headline" style={{ ...display, fontSize: 48, color: T.white, lineHeight: 1.15, maxWidth: 600, marginBottom: 12 }}>
        The Questions<br />
        <span style={{ color: T.goldText }}>Operators Ask First.</span>
      </h2>
      <p style={{ ...mono, fontSize: 13, color: T.fog, marginBottom: 48 }}>
        // Answering them here so you don't have to ask later.
      </p>
      <div style={{ maxWidth: 820 }}>
        {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i + 1} />)}
      </div>
      <p style={{ ...mono, fontSize: 11, color: T.fog, marginTop: 32 }}>
        // EOF — LP-FAQ.LOG<br />
        // Additional questions — submit during admission review.
      </p>
    </>,
    T.navy
  );
}
