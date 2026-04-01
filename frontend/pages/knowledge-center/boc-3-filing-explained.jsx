import Head from 'next/head';
import BOC3FilingPost from '../../src/pages/knowledge-center/BOC3FilingPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>The BOC-3 Filing: What It Is, What Happens If It Lapses | LaunchPath</title>
        <meta name="description" content="The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice." />
        <meta property="og:title" content="The BOC-3 Filing: What It Is, What Happens If It Lapses | LaunchPath" />
        <meta property="og:description" content="The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The BOC-3 Filing: What It Is, What Happens If It Lapses | LaunchPath" />
        <meta name="twitter:description" content="The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "The BOC-3 Filing: What It Is, What Happens If It Lapses",
          "description": "The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice.",
          "url": "https://launchpathedu.com/knowledge-center/boc-3-filing-explained",
          "datePublished": "2025-03-01",
          "dateModified": "2026-04-01",
          "author": {
                    "@type": "Person",
                    "name": "Vince Lawrence",
                    "url": "https://launchpathedu.com/founder"
          },
          "publisher": {
                    "@type": "Organization",
                    "name": "LaunchPath Transportation EDU",
                    "url": "https://launchpathedu.com",
                    "logo": {
                              "@type": "ImageObject",
                              "url": "https://launchpathedu.com/og-launchpath.png"
                    }
          },
          "image": "https://launchpathedu.com/og-launchpath.png",
          "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://launchpathedu.com/knowledge-center/boc-3-filing-explained"
          }
})}}
        />
      </Head>
      <BOC3FilingPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
