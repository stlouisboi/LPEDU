import Head from 'next/head';
import Day1AuthorityBrief from '../../src/pages/knowledge-center/Day1AuthorityBrief';

const TITLE = "What Must Be Operational Before Your First Dispatch | LaunchPath";
const DESC = "See what must be in place before your first truck moves, including core compliance steps, records, and operational readiness.";
const URL = "https://www.launchpathedu.com/knowledge-center/first-dispatch-requirements";

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What Must Be Operational Before Your First Dispatch",
            "description": DESC,
            "url": URL,
            "datePublished": "2025-04-01",
            "dateModified": "2026-04-01",
            "author": { "@type": "Person", "name": "Vince Lawrence", "url": "https://launchpathedu.com/founder" },
            "publisher": {
              "@type": "Organization",
              "name": "LaunchPath Transportation EDU",
              "url": "https://launchpathedu.com",
              "logo": { "@type": "ImageObject", "url": "https://launchpathedu.com/og-launchpath.png" }
            },
            "image": "https://launchpathedu.com/og-launchpath.png",
            "mainEntityOfPage": { "@type": "WebPage", "@id": URL }
          })}}
        />
      </Head>
      <Day1AuthorityBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
