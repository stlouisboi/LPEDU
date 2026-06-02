import Head from 'next/head';
import DQFilePacketPage from '../../src/pages/products/DQFilePacketPage';

const OG = "https://launchpathedu.com/og-dq-file-builder.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>FMCSA Driver Qualification File Template & Builder Kit | LaunchPath</title>
        <meta name="description" content="Build an FMCSA-compliant DQ file for every CDL driver. Includes master checklist, driver application, annual MVR review form, and expiration tracker. 49 CFR Part 391." />
        <meta property="og:title" content="DQ File Builder Kit — Driver Qualification File System | LaunchPath" />
        <meta property="og:description" content="Structured driver qualification file system for Part 391 compliance. CDL verification, medical certificates, MVR documentation." />
        <meta property="og:image" content={OG} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://launchpathedu.com/products/dq-file-builder" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
        <link rel="canonical" href="https://launchpathedu.com/products/dq-file-builder" />
      </Head>
      <DQFilePacketPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
