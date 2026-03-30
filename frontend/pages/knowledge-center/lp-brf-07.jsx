import Head from 'next/head';
import Day1AuthorityBrief from '../../src/pages/knowledge-center/Day1AuthorityBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-07: What Must Be Operational Before Your First Dispatch | LaunchPath</title>
        <meta name="description" content="From Day 1 of authority activation, FMCSA considers you an operating motor carrier. Learn what must be in place before the first truck moves." />
        <meta property="og:title" content="LP-BRF-07: What Must Be Operational Before Your First Dispatch | LaunchPath" />
        <meta property="og:description" content="From Day 1 of authority activation, FMCSA considers you an operating motor carrier. Learn what must be in place before the first truck moves." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-07: What Must Be Operational Before Your First Dispatch | LaunchPath" />
        <meta name="twitter:description" content="From Day 1 of authority activation, FMCSA considers you an operating motor carrier. Learn what must be in place before the first truck moves." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <Day1AuthorityBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
