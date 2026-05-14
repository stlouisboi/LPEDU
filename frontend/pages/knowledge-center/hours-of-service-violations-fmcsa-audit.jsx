import Head from 'next/head';
import HOSViolationsPost, { FAQ } from '../../src/pages/knowledge-center/HOSViolationsPost';

const TITLE = "HOS Violations That Trigger FMCSA Audits and CSA Intervention | LaunchPath";
const H1 = "Hours of Service Violations That Generate CSA Points and Trigger FMCSA Intervention";
const DESC = "Which HOS violations carry the highest CSA severity weights, how the HOS Compliance BASIC score triggers intervention, and what documentation practices prevent violations for new motor carriers.";
const URL = "https://launchpathedu.com/knowledge-center/hours-of-service-violations-fmcsa-audit";

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
                "datePublished": "2026-05-01",
                "dateModified": "2026-05-01",
                "author": { "@type": "Person", "name": "Vince Lawrence", "url": "https://launchpathedu.com/founder" },
                "publisher": { "@type": "Organization", "name": "LaunchPath Transportation EDU", "url": "https://launchpathedu.com", "logo": { "@type": "ImageObject", "url": "https://launchpathedu.com/og-launchpath.png" } },
                "image": "https://launchpathedu.com/og-launchpath.png",
                "mainEntityOfPage": { "@type": "WebPage", "@id": URL }
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQ.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
              }
            ]
          })}}
        />
      </Head>
      <HOSViolationsPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
