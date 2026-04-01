import Head from 'next/head';
import Day1AuthorityBrief from '../../src/pages/knowledge-center/Day1AuthorityBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-07: What Must Be Operational Before Your First Dispatch | LaunchPath</title>
        <meta name="description" content="From Day 1 of authority activation, FMCSA considers you an operating motor carrier. Learn what must be in place before the first truck moves." />
        <meta property="og:title" content="LP-BRF-07: What Must Be Operational Before Your First Dispatch | LaunchPath" />
        <meta property="og:description" content="From Day 1 of authority activation, FMCSA considers you an operating motor carrier. Learn what must be in place before the first truck moves." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-07: What Must Be Operational Before Your First Dispatch | LaunchPath" />
        <meta name="twitter:description" content="From Day 1 of authority activation, FMCSA considers you an operating motor carrier. Learn what must be in place before the first truck moves." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "LP-BRF-07: What Must Be Operational Before Your First Dispatch",
          "description": "From Day 1 of authority activation, FMCSA considers you an operating motor carrier. Learn what must be in place before the first truck moves.",
          "url": "https://launchpathedu.com/knowledge-center/lp-brf-07",
          "datePublished": "2025-04-01",
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
                    "@id": "https://launchpathedu.com/knowledge-center/lp-brf-07"
          }
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
