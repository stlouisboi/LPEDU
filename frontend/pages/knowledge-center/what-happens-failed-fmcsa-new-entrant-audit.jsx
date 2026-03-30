import Head from 'next/head';
import FailedAuditPost from '../../src/pages/knowledge-center/FailedAuditPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath</title>
        <meta name="description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming. Here's what actually happens — and how carriers recover." />
        <meta property="og:title" content="What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath" />
        <meta property="og:description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming. Here's what actually happens — and how carriers recover." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath" />
        <meta name="twitter:description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming. Here's what actually happens — and how carriers recover." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <FailedAuditPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
