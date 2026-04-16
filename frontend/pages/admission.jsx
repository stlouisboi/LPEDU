import Head from 'next/head';
import AdmissionPage from '../src/pages/AdmissionPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Apply for the LaunchPath Standard | New Motor Carrier Admission</title>
        <meta name="description" content="Submit your carrier information to apply for the LaunchPath Standard — the 90-day guided compliance program for new motor carriers." />
        <meta property="og:title" content="Apply for the LaunchPath Standard | LaunchPath Transportation EDU" />
        <meta property="og:description" content="Submit your carrier information to apply for the LaunchPath Standard — the 90-day guided compliance program for new motor carriers." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Apply for the LaunchPath Standard | LaunchPath Transportation EDU" />
        <meta name="twitter:description" content="Submit your carrier information to apply for the LaunchPath Standard — the 90-day guided compliance program for new motor carriers." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://launchpathedu.com/admission" />
      </Head>
      <AdmissionPage />
    </>
  );
}
