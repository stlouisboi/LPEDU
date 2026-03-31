import Head from 'next/head';
import KnowledgeCenterIndex from '../../src/pages/KnowledgeCenterIndex';

export default function Page() {
  return (
    <>
      <Head>
        <title>Knowledge Center | FMCSA Compliance Resources for New Motor Carriers | LaunchPath</title>
        <meta name="description" content="Free compliance resources, briefs, and guides for new motor carriers — organized by compliance domain. Built against 49 CFR federal audit criteria." />
        <meta property="og:title" content="LaunchPath Knowledge Center" />
        <meta property="og:description" content="Free compliance resources, briefs, and guides for new motor carriers — organized by compliance domain." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <KnowledgeCenterIndex />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
