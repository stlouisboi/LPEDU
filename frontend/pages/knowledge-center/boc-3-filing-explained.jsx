import Head from 'next/head';
import BOC3FilingPost from '../../src/pages/knowledge-center/BOC3FilingPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>The BOC-3 Filing: What It Is, What Happens If It Lapses | LaunchPath</title>
        <meta name="description" content="The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice." />
        <meta property="og:title" content="The BOC-3 Filing: What It Is, What Happens If It Lapses | LaunchPath" />
        <meta property="og:description" content="The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The BOC-3 Filing: What It Is, What Happens If It Lapses | LaunchPath" />
        <meta name="twitter:description" content="The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notice." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
      </Head>
      <BOC3FilingPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
