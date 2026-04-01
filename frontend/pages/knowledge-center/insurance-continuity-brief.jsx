import Head from 'next/head';
import InsuranceContinuityBrief from '../../src/pages/knowledge-center/InsuranceContinuityBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>Insurance Continuity and Authority Suspension: What New Carriers Must Know | LaunchPath</title>
        <meta name="description" content="How an insurance lapse triggers automatic authority suspension — and the filing verification and renewal process that prevents it." />
        <meta property="og:title" content="Insurance Continuity and Authority Suspension: What New Carriers Must Know | LaunchPath" />
        <meta property="og:description" content="How an insurance lapse triggers automatic authority suspension — and the filing verification and renewal process that prevents it." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Insurance Continuity and Authority Suspension: What New Carriers Must Know | LaunchPath" />
        <meta name="twitter:description" content="How an insurance lapse triggers automatic authority suspension — and the filing verification and renewal process that prevents it." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Insurance Continuity and Authority Suspension: What New Carriers Must Know",
          "description": "How an insurance lapse triggers automatic authority suspension \u2014 and the filing verification and renewal process that prevents it.",
          "url": "https://launchpathedu.com/knowledge-center/insurance-continuity-brief",
          "datePublished": "2025-02-01",
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
                    "@id": "https://launchpathedu.com/knowledge-center/insurance-continuity-brief"
          }
})}}
        />
      </Head>
      <InsuranceContinuityBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
