import Head from 'next/head';
import InsuranceSyncPost from '../../src/pages/knowledge-center/InsuranceSyncPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath</title>
        <meta name="description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta property="og:title" content="How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath" />
        <meta property="og:description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath" />
        <meta name="twitter:description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <InsuranceSyncPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
