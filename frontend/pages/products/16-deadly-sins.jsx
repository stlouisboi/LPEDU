import Head from 'next/head';
import SixteenSinsPage from '../../src/pages/standards/SixteenSinsPage';

const OG = "https://launchpathedu.com/og-launchpath.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>The 16 Deadly Sins: Exposure Patterns That End Motor Carrier Authority | LaunchPath</title>
        <meta name="description" content="The 16 most common exposure patterns that reach the authority — each one documented, mapped to CFR, and preventable. Know them before FMCSA finds them for you." />
        <meta property="og:title" content="The 16 Deadly Sins: Exposure Patterns That End Motor Carrier Authority | LaunchPath" />
        <meta property="og:description" content="16 recurring preventable failures. Each documented, mapped to CFR, preventable. Know them before pressure finds them for you." />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://launchpathedu.com/products/16-deadly-sins" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The 16 Deadly Sins: Exposure Patterns That End Motor Carrier Authority | LaunchPath" />
        <meta name="twitter:description" content="16 recurring preventable failures. Each documented, mapped to CFR, preventable." />
        <meta name="twitter:image" content={OG} />
        <link rel="canonical" href="https://launchpathedu.com/products/16-deadly-sins" />
      </Head>
      <SixteenSinsPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
