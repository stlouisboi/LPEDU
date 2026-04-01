import Head from 'next/head';
import LpBrf11Page from '../../src/pages/knowledge-center/LpBrf11Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-11: New Entrant Review Brief | LaunchPath</title>
        <meta name="description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta property="og:title" content="LP-BRF-11: New Entrant Review Brief | LaunchPath" />
        <meta property="og:description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-11: New Entrant Review Brief | LaunchPath" />
        <meta name="twitter:description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "LP-BRF-11: New Entrant Review Brief",
          "description": "What FMCSA's New Entrant Review actually examines \u2014 the six compliance domains and the documentation standard applied at each checkpoint.",
          "url": "https://launchpathedu.com/knowledge-center/lp-brf-11",
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
                    "@id": "https://launchpathedu.com/knowledge-center/lp-brf-11"
          }
})}}
        />
      </Head>
      <LpBrf11Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
