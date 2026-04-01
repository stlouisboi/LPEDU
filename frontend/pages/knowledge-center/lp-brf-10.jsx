import Head from 'next/head';
import LpBrf10Page from '../../src/pages/knowledge-center/LpBrf10Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-10: Preparation & Reconstruction Brief | LaunchPath</title>
        <meta name="description" content="What preparation actually means for a new motor carrier — and how carriers reconstruct compliance records under audit pressure." />
        <meta property="og:title" content="LP-BRF-10: Preparation & Reconstruction Brief | LaunchPath" />
        <meta property="og:description" content="What preparation actually means for a new motor carrier — and how carriers reconstruct compliance records under audit pressure." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-10: Preparation & Reconstruction Brief | LaunchPath" />
        <meta name="twitter:description" content="What preparation actually means for a new motor carrier — and how carriers reconstruct compliance records under audit pressure." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "LP-BRF-10: Preparation & Reconstruction Brief",
          "description": "What preparation actually means for a new motor carrier \u2014 and how carriers reconstruct compliance records under audit pressure.",
          "url": "https://launchpathedu.com/knowledge-center/lp-brf-10",
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
                    "@id": "https://launchpathedu.com/knowledge-center/lp-brf-10"
          }
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
