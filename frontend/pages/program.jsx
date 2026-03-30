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
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Enroll in the LaunchPath Standard | LaunchPath" />
        <meta name="twitter:description" content="Install the federal compliance infrastructure FMCSA expects before your audit window opens. $2,500 — 12 carriers maximum per cohort." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <LaunchPathSalesPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
