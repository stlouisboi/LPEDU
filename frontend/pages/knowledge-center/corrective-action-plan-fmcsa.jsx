import Head from 'next/head';
import CorrectiveActionPlanPost from '../../src/pages/knowledge-center/CorrectiveActionPlanPost';

const TITLE = "Corrective Action Plan FMCSA: What to Do After an Audit | LaunchPath";
const H1 = "What a Corrective Action Plan Is and How to Build One After an FMCSA Audit";
const DESC = "FMCSA requires a Corrective Action Plan when a new entrant audit finds deficiencies. Here is what a CAP must include and the timeline you have to respond.";
const URL = "https://www.launchpathedu.com/knowledge-center/corrective-action-plan-fmcsa";

const FAQ_ITEMS = [
  { q: "What is a Corrective Action Plan for FMCSA?", a: "A Corrective Action Plan is a formal written response submitted to FMCSA after a safety audit finds deficiencies. It documents each deficiency found, its root cause, the corrective action taken, and the controls implemented to prevent recurrence. FMCSA requires submission within 45 calendar days of the audit." },
  { q: "How long do I have to submit a Corrective Action Plan?", a: "45 calendar days from the date of the audit. This is not a deadline that can be negotiated or extended through inaction. If you believe you cannot produce the required documentation within 45 days, contact FMCSA immediately to understand your options — do not simply allow the window to close." },
  { q: "What happens if I miss the 45-day CAP deadline?", a: "Failure to submit a Corrective Action Plan within 45 calendar days results in an automatic escalation to an Unsatisfactory safety rating. FMCSA then initiates proceedings to revoke operating authority. You receive a 60-day notice before revocation takes effect." },
  { q: "What must be included in an FMCSA Corrective Action Plan?", a: "Each deficiency must be addressed individually. For each finding, the CAP must document: the specific regulation cited, the root cause of the deficiency, the corrective action taken (completed, not planned), supporting documentation demonstrating the correction has been made, and the controls put in place to prevent recurrence. FMCSA reviews the CAP against the specific findings in the audit report." },
  { q: "Can I avoid a Corrective Action Plan if I fix the deficiencies before the audit ends?", a: "Correcting deficiencies before the audit conclusion can influence how FMCSA characterizes findings. However, once a finding is documented in the audit record, the carrier is typically required to submit a CAP addressing it regardless of subsequent corrections. Consult with a qualified transportation attorney if you receive an audit finding and want to understand your full range of options." },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" key="canonical" href={URL} />
        <meta property="og:title" content={H1} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={H1} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "headline": H1,
                "description": DESC,
                "url": URL,
                "datePublished": "2026-04-01",
                "dateModified": "2026-04-01",
                "author": { "@type": "Person", "name": "Vince Lawrence", "url": "https://launchpathedu.com/founder" },
                "publisher": { "@type": "Organization", "name": "LaunchPath Transportation EDU", "url": "https://launchpathedu.com", "logo": { "@type": "ImageObject", "url": "https://launchpathedu.com/og-launchpath.png" } },
                "image": "https://launchpathedu.com/og-launchpath.png",
                "mainEntityOfPage": { "@type": "WebPage", "@id": URL }
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQ_ITEMS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
              }
            ]
          })}}
        />
      </Head>
      <CorrectiveActionPlanPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
