import Head from 'next/head';
import UCRRegistrationBrief from '../../src/pages/knowledge-center/UCRRegistrationBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>Authority Registrations for New Motor Carriers: UCR, MCS-150, and BOC-3 | LaunchPath</title>
        <meta name="description" content="The three foundational filings every new carrier must maintain — UCR, MCS-150, and BOC-3 — and what lapses in each one trigger." />
        <meta property="og:title" content="Authority Registrations for New Motor Carriers: UCR, MCS-150, and BOC-3 | LaunchPath" />
        <meta property="og:description" content="The three foundational filings every new carrier must maintain — UCR, MCS-150, and BOC-3 — and what lapses in each one trigger." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Authority Registrations for New Motor Carriers: UCR, MCS-150, and BOC-3 | LaunchPath" />
        <meta name="twitter:description" content="The three foundational filings every new carrier must maintain — UCR, MCS-150, and BOC-3 — and what lapses in each one trigger." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Authority Registrations for New Motor Carriers: UCR, MCS-150, and BOC-3",
          "description": "The three foundational filings every new carrier must maintain \u2014 UCR, MCS-150, and BOC-3 \u2014 and what lapses in each one trigger.",
          "url": "https://launchpathedu.com/knowledge-center/authority-registrations-brief",
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
                    "@id": "https://launchpathedu.com/knowledge-center/authority-registrations-brief"
          }
})}}
        />
      </Head>
      <UCRRegistrationBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
