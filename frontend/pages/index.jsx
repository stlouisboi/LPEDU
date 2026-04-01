import HomePage from '../src/pages/HomePage';
import Head from 'next/head';

const SITE = "https://launchpathedu.com";
const OG   = `${SITE}/og-launchpath.png`;
const TITLE = "LaunchPath | 90-Day Compliance System for New Motor Carriers";
const DESC  = "Install the federal compliance infrastructure FMCSA expects to find before your audit window opens. 90 days. 5 verified checkpoints. Verified Registry ID at completion.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LaunchPath Transportation EDU",
  "url": SITE,
  "description": DESC,
  "publisher": {
    "@type": "Organization",
    "name": "LaunchPath Transportation EDU",
    "url": SITE,
    "logo": { "@type": "ImageObject", "url": OG },
    "founder": { "@type": "Person", "name": "Vince Lawrence", "url": `${SITE}/founder` }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE}/knowledge-center?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={OG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <HomePage />
    </>
  );
}
