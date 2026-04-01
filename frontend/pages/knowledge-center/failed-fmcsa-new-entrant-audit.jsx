import Head from 'next/head';
import FailedAuditPost2 from '../../src/pages/knowledge-center/FailedAuditPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath</title>
        <meta name="description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming." />
        <meta property="og:title" content="What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath" />
        <meta property="og:description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath" />
        <meta name="twitter:description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "What Actually Happens When You Fail an FMCSA New Entrant Audit",
          "description": "A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming.",
          "url": "https://launchpathedu.com/knowledge-center/failed-fmcsa-new-entrant-audit",
          "datePublished": "2025-03-15",
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
                    "@id": "https://launchpathedu.com/knowledge-center/failed-fmcsa-new-entrant-audit"
          }
})}}
        />
      </Head>
      <FailedAuditPost2 />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
