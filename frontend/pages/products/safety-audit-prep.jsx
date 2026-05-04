import Head from 'next/head';
import SafetyAuditPrepPage from '../../src/pages/products/SafetyAuditPrepPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Safety Audit Prep — New Entrant Audit Preparation | LaunchPath</title>
        <meta name="description" content="Prepare your operation for the FMCSA new entrant safety audit. Structured documentation review, audit-ready file organization, and gap remediation protocols." />
        <meta property="og:title" content="Safety Audit Prep — New Entrant Audit Preparation | LaunchPath" />
        <meta property="og:description" content="Structured documentation review, audit-ready file organization, and gap remediation for the FMCSA new entrant safety audit." />
        <meta property="og:image" content="https://launchpathedu.com/images/products/tool-audit-prep.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://launchpathedu.com/products/safety-audit-prep" />
      </Head>
      <SafetyAuditPrepPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
