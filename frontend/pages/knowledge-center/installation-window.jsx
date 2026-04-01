import Head from 'next/head';
import InstallationWindowBrief from '../../src/pages/knowledge-center/InstallationWindowBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>The 90-Day Compliance Installation Window | LaunchPath</title>
        <meta name="description" content="Why the first 90 days after authority activation are the critical compliance window — and what gets built during them." />
        <meta property="og:title" content="The 90-Day Compliance Installation Window | LaunchPath" />
        <meta property="og:description" content="Why the first 90 days after authority activation are the critical compliance window — and what gets built during them." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The 90-Day Compliance Installation Window | LaunchPath" />
        <meta name="twitter:description" content="Why the first 90 days after authority activation are the critical compliance window — and what gets built during them." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "The 90-Day Compliance Installation Window",
          "description": "Why the first 90 days after authority activation are the critical compliance window \u2014 and what gets built during them.",
          "url": "https://launchpathedu.com/knowledge-center/installation-window",
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
                    "@id": "https://launchpathedu.com/knowledge-center/installation-window"
          }
})}}
        />
      </Head>
      <InstallationWindowBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
