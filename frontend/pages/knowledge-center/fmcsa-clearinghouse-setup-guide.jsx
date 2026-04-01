import Head from 'next/head';
import ClearinghouseSetupPost from '../../src/pages/knowledge-center/ClearinghouseSetupPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>How to Register in the FMCSA Drug and Alcohol Clearinghouse | LaunchPath</title>
        <meta name="description" content="Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key." />
        <meta property="og:title" content="How to Register in the FMCSA Drug and Alcohol Clearinghouse | LaunchPath" />
        <meta property="og:description" content="Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Register in the FMCSA Drug and Alcohol Clearinghouse | LaunchPath" />
        <meta name="twitter:description" content="Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "How to Register in the FMCSA Drug and Alcohol Clearinghouse",
          "description": "Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key.",
          "url": "https://launchpathedu.com/knowledge-center/fmcsa-clearinghouse-setup-guide",
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
                    "@id": "https://launchpathedu.com/knowledge-center/fmcsa-clearinghouse-setup-guide"
          }
})}}
        />
      </Head>
      <ClearinghouseSetupPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
