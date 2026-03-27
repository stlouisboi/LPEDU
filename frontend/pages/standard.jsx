import StandardPage from '../src/pages/StandardPage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>The LaunchPath Standard | 90-Day Guided Compliance Program</title>
        <meta name="description" content="A 90-day guided compliance implementation program for new motor carriers. 10 modules, 5 human verification checkpoints, Verified Registry ID at completion." />
        <meta property="og:title" content="The LaunchPath Standard | 90-Day Guided Compliance Program" />
        <meta property="og:description" content="A 90-day guided compliance implementation program for new motor carriers. 10 modules, 5 human verification checkpoints, Verified Registry ID at completion." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The LaunchPath Standard | 90-Day Guided Compliance Program" />
        <meta name="twitter:description" content="A 90-day guided compliance implementation program for new motor carriers. 10 modules, 5 human verification checkpoints, Verified Registry ID at completion." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <StandardPage />
    </>
  );
}
