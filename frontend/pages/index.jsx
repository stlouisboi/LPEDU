import HomePage from '../src/pages/HomePage';
import Head from 'next/head';

const SITE = "https://launchpathedu.com";
const OG   = `${SITE}/og-launchpath.png`;
const TITLE = "LaunchPath | 90-Day Compliance System for New Motor Carriers";
const DESC  = "Install the federal compliance infrastructure FMCSA expects to find before your audit window opens. 90 days. 5 verified checkpoints. Verified Registry ID at completion.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      "name": "LaunchPath Transportation EDU",
      "url": SITE,
      "description": DESC,
      "publisher": { "@id": `${SITE}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE}/knowledge-center?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      "name": "LaunchPath Transportation EDU",
      "url": SITE,
      "description": "LaunchPath installs the federal compliance infrastructure FMCSA expects to find in new motor carrier operations. 90-day structured build. 5 verified checkpoints. Verified Registry ID at completion.",
      "logo": { "@type": "ImageObject", "url": OG },
      "founder": {
        "@type": "Person",
        "name": "Vince Lawrence",
        "url": `${SITE}/founder`,
        "jobTitle": "Station Custodian",
        "description": "U.S. Navy Veteran. OSHA Certified. 20+ years manufacturing operations management."
      },
      "educationalCredentialAwarded": "Verified Registry ID — LP-VRF",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "LaunchPath 90-Day Compliance System",
        "itemListElement": [
          {
            "@type": "Course",
            "name": "LaunchPath 90-Day Compliance System",
            "description": "Structured 90-day installation of federal motor carrier compliance infrastructure: authority protection, insurance continuity, compliance backbone, and cash-flow controls.",
            "provider": { "@id": `${SITE}/#organization` },
            "url": `${SITE}/program`
          }
        ]
      },
      "sameAs": []
    }
  ]
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
