import Head from 'next/head';
import LpBrf09Page from '../../src/pages/knowledge-center/LpBrf09Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-09: Operating Patterns Brief | LaunchPath</title>
        <meta name="description" content="The operating patterns that create compliance exposure for new motor carriers — identified from 200+ operations reviewed under the LaunchPath Standard." />
        <meta property="og:title" content="LP-BRF-09: Operating Patterns Brief | LaunchPath" />
        <meta property="og:description" content="The operating patterns that create compliance exposure for new motor carriers — identified from 200+ operations reviewed under the LaunchPath Standard." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-09: Operating Patterns Brief | LaunchPath" />
        <meta name="twitter:description" content="The operating patterns that create compliance exposure for new motor carriers — identified from 200+ operations reviewed under the LaunchPath Standard." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <LpBrf09Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
