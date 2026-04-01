import Head from 'next/head';
import LpBrf08Page from '../../src/pages/knowledge-center/LpBrf08Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-08: Installation Window Brief | LaunchPath</title>
        <meta name="description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta property="og:title" content="LP-BRF-08: Installation Window Brief | LaunchPath" />
        <meta property="og:description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-08: Installation Window Brief | LaunchPath" />
        <meta name="twitter:description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "LP-BRF-08: Installation Window Brief",
          "description": "The 90-day compliance installation window \u2014 what gets built, in what sequence, and why the order matters for new motor carriers.",
          "url": "https://launchpathedu.com/knowledge-center/lp-brf-08",
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
                    "@id": "https://launchpathedu.com/knowledge-center/lp-brf-08"
          }
})}}
        />
      </Head>
      <LpBrf08Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
