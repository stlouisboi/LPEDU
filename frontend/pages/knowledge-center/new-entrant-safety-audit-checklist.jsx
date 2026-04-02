import Head from 'next/head';
import NewEntrantAuditChecklistPost from '../../src/pages/knowledge-center/NewEntrantAuditChecklistPost';

const TITLE = "New Entrant Safety Audit Checklist for FMCSA | LaunchPath";
const H1 = "What FMCSA Checks in a New Entrant Safety Audit";
const DESC = "Every new interstate motor carrier receives a safety audit within 12 months of getting authority. Here is what FMCSA reviews and how to prepare before the auditor arrives.";
const URL = "https://launchpathedu.com/knowledge-center/new-entrant-safety-audit-checklist";

const FAQ_ITEMS = [
  { q: "When does the FMCSA new entrant safety audit happen?", a: "FMCSA conducts the new entrant safety audit within 12 months of the carrier's authority grant date. FMCSA contacts the carrier to schedule the audit. The audit can be conducted on-site at the carrier's principal place of business or remotely, depending on FMCSA's current procedures and the carrier's geographic location." },
  { q: "What happens if I fail the new entrant safety audit?", a: "If the audit finds deficiencies, the carrier receives a Conditional or Unsatisfactory safety rating depending on the severity and pattern of findings. A Conditional rating requires submission of a Corrective Action Plan within 45 calendar days. An Unsatisfactory rating initiates proceedings to revoke operating authority within 60 days unless the carrier demonstrates sufficient compliance to support a rating upgrade." },
  { q: "Which document area causes the most new entrant audit failures?", a: "Driver Qualification Files are the most common source of new entrant audit deficiencies. Missing pre-employment drug test results, incomplete employment applications, absent annual MVR reviews, and missing previous employer safety performance inquiries each constitute separate, documentable deficiencies. Multiple DQ file deficiencies across several drivers signal systemic failure, which FMCSA weights more heavily than isolated gaps." },
  { q: "Can I postpone or reschedule a new entrant safety audit?", a: "Contact FMCSA immediately if you have a scheduling conflict. Failing to respond to an audit notice or failing to cooperate with the audit process is treated as non-compliance and can itself result in an adverse finding. Do not miss a scheduled audit without notifying FMCSA in advance and documenting your communication." },
  { q: "What is the difference between a finding and a violation in a new entrant safety audit?", a: "A finding is a documented deficiency — a specific requirement that was not met. The severity and pattern of findings across audit areas determines whether the outcome is a Conditional or Unsatisfactory rating. Isolated findings carry different weight than patterns of findings across multiple drivers or vehicles." },
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
      <NewEntrantAuditChecklistPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
