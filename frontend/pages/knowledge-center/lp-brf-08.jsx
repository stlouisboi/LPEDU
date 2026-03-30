import Head from 'next/head';
import LpBrf08Page from '../../src/pages/knowledge-center/LpBrf08Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-08: Installation Window Brief | LaunchPath</title>
        <meta name="description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta property="og:title" content="LP-BRF-08: Installation Window Brief | LaunchPath" />
        <meta property="og:description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-08: Installation Window Brief | LaunchPath" />
        <meta name="twitter:description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <LpBrf08Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
