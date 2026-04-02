import Head from 'next/head';
import SafetyAuditPrepPage from '../../src/pages/products/SafetyAuditPrepPage';

export default function Page() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.launchpathedu.com/standards/safety-audit-prep" />
      </Head>
      <SafetyAuditPrepPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
