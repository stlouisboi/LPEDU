import Head from 'next/head';
import ConditionalSafetyRatingPost, { FAQ } from '../../src/pages/knowledge-center/ConditionalSafetyRatingPost';

const TITLE = "What a Conditional Safety Rating Means for Motor Carriers | LaunchPath";
const H1 = "What a Conditional Safety Rating Means for Your Motor Carrier Authority";
const DESC = "How FMCSA assigns Conditional safety ratings under 49 CFR Part 385, what the 45-day response window requires, insurance consequences, and the upgrade process for new motor carriers.";
const URL = "https://launchpathedu.com/knowledge-center/conditional-safety-rating-fmcsa";

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
      <ConditionalSafetyRatingPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
