import Head from 'next/head';
import LpBrf10Page from '../../src/pages/knowledge-center/LpBrf10Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-10: Preparation & Reconstruction Brief | LaunchPath</title>
        <meta name="description" content="What preparation actually means for a new motor carrier — and how carriers reconstruct compliance records under audit pressure." />
        <meta property="og:title" content="LP-BRF-10: Preparation & Reconstruction Brief | LaunchPath" />
        <meta property="og:description" content="What preparation actually means for a new motor carrier — and how carriers reconstruct compliance records under audit pressure." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-10: Preparation & Reconstruction Brief | LaunchPath" />
        <meta name="twitter:description" content="What preparation actually means for a new motor carrier — and how carriers reconstruct compliance records under audit pressure." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
      </Head>
      <LpBrf10Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
