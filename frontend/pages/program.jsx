import Head from 'next/head';
import LaunchPathSalesPage from '../src/pages/LaunchPathSalesPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Enroll in the LaunchPath Standard | LaunchPath Transportation EDU</title>
        <meta name="description" content="Install the federal compliance infrastructure FMCSA expects before your audit window opens. 90 days. 5 human verification checkpoints. Verified Registry ID at completion. 12 carriers maximum per cohort." />
        <meta property="og:title" content="Enroll in the LaunchPath Standard" />
        <meta property="og:description" content="Install the federal compliance infrastructure FMCSA expects before your audit window opens. $2,500 — 12 carriers maximum per cohort." />
        <meta property="og:image" content="https://launchpathedu.com/og-program.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Enroll in the LaunchPath Standard | LaunchPath" />
        <meta name="twitter:description" content="Install the federal compliance infrastructure FMCSA expects before your audit window opens. $2,500 — 12 carriers maximum per cohort." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-program.png" />
      </Head>
      <LaunchPathSalesPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
