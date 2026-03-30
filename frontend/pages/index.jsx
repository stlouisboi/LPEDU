import HomePage from '../src/pages/HomePage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>LaunchPath | 90-Day Compliance System for New Motor Carriers</title>
        <meta name="description" content="Install the federal compliance infrastructure FMCSA expects to find before your audit window opens. 90 days. 5 verified checkpoints. Verified Registry ID at completion." />
        <meta property="og:title" content="LaunchPath | 90-Day Compliance System for New Motor Carriers" />
        <meta property="og:description" content="Install the federal compliance infrastructure FMCSA expects to find before your audit window opens. 90 days. 5 verified checkpoints. Verified Registry ID at completion." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LaunchPath | 90-Day Compliance System for New Motor Carriers" />
        <meta name="twitter:description" content="Install the federal compliance infrastructure FMCSA expects to find before your audit window opens. 90 days. 5 verified checkpoints. Verified Registry ID at completion." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <HomePage />
    </>
  );
}
