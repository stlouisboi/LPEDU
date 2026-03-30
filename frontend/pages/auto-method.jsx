import AutoMethodPage from '../src/pages/AutoMethodPage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>The Auto Method | LaunchPath</title>
        <meta name="description" content="The systematic approach to building a compliant motor carrier operation from authority activation to verified compliance." />
        <meta property="og:title" content="The Auto Method | LaunchPath" />
        <meta property="og:description" content="The systematic approach to building a compliant motor carrier operation from authority activation to verified compliance." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Auto Method | LaunchPath" />
        <meta name="twitter:description" content="The systematic approach to building a compliant motor carrier operation from authority activation to verified compliance." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <AutoMethodPage />
    </>
  );
}
