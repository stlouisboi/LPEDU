import Head from 'next/head';
import AboutPage from '../src/pages/AboutPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>About LaunchPath | Governance Principles & Admission Standards</title>
        <meta name="description" content="LaunchPath applies a stewardship-first standard to new motor carrier compliance. Learn about the governance principles and admission criteria that define the LaunchPath Standard." />
        <meta property="og:title" content="About LaunchPath | Governance Principles & Admission Standards" />
        <meta property="og:description" content="LaunchPath applies a stewardship-first standard to new motor carrier compliance. Learn about the governance principles and admission criteria that define the LaunchPath Standard." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About LaunchPath | Governance Principles & Admission Standards" />
        <meta name="twitter:description" content="LaunchPath applies a stewardship-first standard to new motor carrier compliance. Learn about the governance principles and admission criteria that define the LaunchPath Standard." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://launchpathedu.com/about" />
      </Head>
      <AboutPage />
    </>
  );
}
