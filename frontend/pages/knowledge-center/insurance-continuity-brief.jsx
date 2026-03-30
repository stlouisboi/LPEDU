import Head from 'next/head';
import InsuranceContinuityBrief from '../../src/pages/knowledge-center/InsuranceContinuityBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>Insurance Continuity and Authority Suspension: What New Carriers Must Know | LaunchPath</title>
        <meta name="description" content="How an insurance lapse triggers automatic authority suspension — and the filing verification and renewal process that prevents it." />
        <meta property="og:title" content="Insurance Continuity and Authority Suspension: What New Carriers Must Know | LaunchPath" />
        <meta property="og:description" content="How an insurance lapse triggers automatic authority suspension — and the filing verification and renewal process that prevents it." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Insurance Continuity and Authority Suspension: What New Carriers Must Know | LaunchPath" />
        <meta name="twitter:description" content="How an insurance lapse triggers automatic authority suspension — and the filing verification and renewal process that prevents it." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <InsuranceContinuityBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
