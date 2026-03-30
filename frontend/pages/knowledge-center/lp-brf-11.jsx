import Head from 'next/head';
import LpBrf11Page from '../../src/pages/knowledge-center/LpBrf11Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-11: New Entrant Review Brief | LaunchPath</title>
        <meta name="description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta property="og:title" content="LP-BRF-11: New Entrant Review Brief | LaunchPath" />
        <meta property="og:description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-11: New Entrant Review Brief | LaunchPath" />
        <meta name="twitter:description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <LpBrf11Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
