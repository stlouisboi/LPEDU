import Head from 'next/head';
import BundlePage from '../../src/pages/products/BundlePage';

const TITLE = "Document System Bundle — $499 | LaunchPath";
const DESC = "Five compliance domain packets, a unified folder structure, and a 90-day implementation calendar. Every form FMCSA expects — for $499.";
const OG_IMAGE = "https://launchpathedu.com/og-launchpath.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.launchpathedu.com/products/bundle" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="product" />
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
