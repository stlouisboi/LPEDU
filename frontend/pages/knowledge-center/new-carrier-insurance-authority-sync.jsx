import Head from 'next/head';
import InsuranceSyncPost from '../../src/pages/knowledge-center/InsuranceSyncPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath</title>
        <meta name="description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta property="og:title" content="How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath" />
        <meta property="og:description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath" />
        <meta name="twitter:description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "How to Verify Your Insurance Filing Is Active on FMCSA's System",
          "description": "Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong.",
          "url": "https://launchpathedu.com/knowledge-center/new-carrier-insurance-authority-sync",
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
                    "@id": "https://launchpathedu.com/knowledge-center/new-carrier-insurance-authority-sync"
          }
})}}
        />
      </Head>
      <InsuranceSyncPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
