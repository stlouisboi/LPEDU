import Head from 'next/head';
import BundlePage from '../../src/pages/products/BundlePage';

const TITLE = "FMCSA Compliance Document Bundle for New Motor Carriers | LaunchPath";
const DESC = "Five compliance domain packets — DQ files, Drug & Alcohol, HOS, Insurance, and Maintenance — with a unified folder structure and 90-day implementation calendar. Every document FMCSA expects. $499.";
const OG_IMAGE = "https://launchpathedu.com/og-bundle.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://launchpathedu.com/products/bundle" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://launchpathedu.com/products/bundle" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <BundlePage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
