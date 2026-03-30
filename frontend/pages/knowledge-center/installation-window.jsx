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
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The 90-Day Compliance Installation Window | LaunchPath" />
        <meta name="twitter:description" content="Why the first 90 days after authority activation are the critical compliance window — and what gets built during them." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <InstallationWindowBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
