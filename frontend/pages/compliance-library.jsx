import ComplianceLibraryPage from '../src/pages/ComplianceLibraryPage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Operating Standards Library | LaunchPath</title>
        <meta name="description" content="Every document, system, and guided implementation LaunchPath produces — organized by compliance domain and deployment path." />
        <meta property="og:title" content="Operating Standards Library | LaunchPath" />
        <meta property="og:description" content="Every document, system, and guided implementation LaunchPath produces — organized by compliance domain and deployment path." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Operating Standards Library | LaunchPath" />
        <meta name="twitter:description" content="Every document, system, and guided implementation LaunchPath produces — organized by compliance domain and deployment path." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
      </Head>
      <ComplianceLibraryPage />
    </>
  );
}
