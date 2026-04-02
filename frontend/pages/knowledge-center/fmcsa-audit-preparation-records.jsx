import Head from 'next/head';
import LpBrf10Page from '../../src/pages/knowledge-center/LpBrf10Page';

const TITLE = "FMCSA Audit Preparation and Record Reconstruction | LaunchPath";
const DESC = "Understand how to prepare for an FMCSA audit and how to rebuild missing or incomplete records under pressure.";
const URL = "https://launchpathedu.com/knowledge-center/fmcsa-audit-preparation-records";

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
            "headline": "FMCSA Audit Preparation and Record Reconstruction",
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
      <LpBrf10Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
