import Head from 'next/head';
import InstallationWindowBrief from '../../src/pages/knowledge-center/InstallationWindowBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>The 90-Day Compliance Installation Window | LaunchPath</title>
        <meta name="description" content="Why the first 90 days after authority activation are the critical compliance window — and what gets built during them." />
        <meta property="og:title" content="The 90-Day Compliance Installation Window | LaunchPath" />
        <meta property="og:description" content="Why the first 90 days after authority activation are the critical compliance window — and what gets built during them." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The 90-Day Compliance Installation Window | LaunchPath" />
        <meta name="twitter:description" content="Why the first 90 days after authority activation are the critical compliance window — and what gets built during them." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <InstallationWindowBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
