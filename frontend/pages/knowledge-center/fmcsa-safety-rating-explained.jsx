import Head from 'next/head';
import FMCSASafetyRatingPost from '../../src/pages/knowledge-center/FMCSASafetyRatingPost';

const TITLE = "FMCSA Safety Rating Explained for New Carriers | LaunchPath";
const H1 = "What Your FMCSA Safety Rating Means and How It Gets Assigned";
const DESC = "FMCSA assigns safety ratings based on inspections, violations, and audits. Here is how the three-rating system works and what each rating means for your operation.";
const URL = "https://www.launchpathedu.com/knowledge-center/fmcsa-safety-rating-explained";

const FAQ_ITEMS = [
  { q: "What is an FMCSA safety rating?", a: "An FMCSA safety rating is a formal assessment of a motor carrier's compliance with federal safety regulations. FMCSA assigns one of three ratings: Satisfactory, Conditional, or Unsatisfactory. The rating is based on the findings of a safety audit or compliance review — not on accident history alone." },
  { q: "How does FMCSA assign a safety rating to a new carrier?", a: "For new entrant carriers, FMCSA assigns a safety rating primarily through the new entrant safety audit, which occurs within 12 months of authority grant. If the audit finds no deficiencies, no formal rating is typically assigned. If deficiencies are found, the carrier receives a Conditional or Unsatisfactory rating depending on the severity and pattern of findings." },
  { q: "What happens if I get a Conditional safety rating?", a: "A Conditional rating means FMCSA found deficiencies in at least one critical factor during the audit. You have 45 days to submit a Corrective Action Plan documenting what was missing, why, and what corrective action has been taken. The rating is visible in FMCSA's public SAFER system, which some brokers and shippers use to screen carriers." },
  { q: "Can a Conditional rating be changed to Satisfactory?", a: "Yes. After submitting a Corrective Action Plan and having it accepted by FMCSA, you can request an upgrade from Conditional to Satisfactory. FMCSA may conduct a follow-up review to verify that corrections are in place before the rating is changed." },
  { q: "Does a Conditional rating affect my ability to haul freight?", a: "It can. Some brokers and shippers screen carrier safety ratings through FMCSA's SAFER system and may decline to work with carriers showing Conditional or Unsatisfactory ratings. Insurance carriers may also respond to a Conditional rating with premium increases or coverage restrictions depending on the severity and nature of the deficiencies found." },
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
      <FMCSASafetyRatingPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
