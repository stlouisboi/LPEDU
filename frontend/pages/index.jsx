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
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LaunchPath | 90-Day Compliance System for New Motor Carriers" />
        <meta name="twitter:description" content="Install the federal compliance infrastructure FMCSA expects to find before your audit window opens. 90 days. 5 verified checkpoints. Verified Registry ID at completion." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <HomePage />
    </>
  );
}
