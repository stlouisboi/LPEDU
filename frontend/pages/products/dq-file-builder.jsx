import Head from 'next/head';
import DQFilePacketPage from '../../src/pages/products/DQFilePacketPage';

const OG = "https://launchpathedu.com/images/products/domain2-dq-files.webp";

export default function Page() {
  return (
    <>
      <Head>
        <title>DQ File Builder Kit — Driver Qualification File System | LaunchPath</title>
        <meta name="description" content="Structured driver qualification file system, CDL verification, medical certificate tracking, and MVR documentation for Part 391 compliance." />
        <meta property="og:title" content="DQ File Builder Kit — Driver Qualification File System | LaunchPath" />
        <meta property="og:description" content="Structured driver qualification file system for Part 391 compliance. CDL verification, medical certificates, MVR documentation." />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
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
