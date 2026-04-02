import Head from 'next/head';
import DQFilePacketPage from '../../src/pages/products/DQFilePacketPage';

const TITLE = "DQ File Builder Kit — Driver Qualification File System | LaunchPath";
const DESC = "Build and maintain FMCSA-compliant driver qualification files. Includes master DQ checklist, driver application, annual review form, and expiration tracker. 49 CFR Part 391. $129.";
const URL = "https://www.launchpathedu.com/standards/dq-file-builder";
const OG_IMAGE = "https://launchpathedu.com/og-launchpath.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "DQ File Builder Kit",
            "description": DESC,
            "url": URL,
            "image": OG_IMAGE,
            "brand": {
              "@type": "Organization",
              "name": "LaunchPath Transportation EDU",
              "url": "https://launchpathedu.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "129.00",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": URL
            }
          })}}
        />
      </Head>
      <DQFilePacketPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
