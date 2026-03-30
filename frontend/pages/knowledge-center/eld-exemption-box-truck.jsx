import Head from 'next/head';
import ELDExemptionPost from '../../src/pages/knowledge-center/ELDExemptionPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>ELD Exemptions for Box Truck Operators: What's Covered and What Isn't | LaunchPath</title>
        <meta name="description" content="The short-haul exemption eliminates the ELD requirement for qualifying box truck operators — but it doesn't eliminate HOS rules or recordkeeping. Here's exactly what applies." />
        <meta property="og:title" content="ELD Exemptions for Box Truck Operators: What's Covered and What Isn't | LaunchPath" />
        <meta property="og:description" content="The short-haul exemption eliminates the ELD requirement for qualifying box truck operators — but it doesn't eliminate HOS rules or recordkeeping. Here's exactly what applies." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ELD Exemptions for Box Truck Operators: What's Covered and What Isn't | LaunchPath" />
        <meta name="twitter:description" content="The short-haul exemption eliminates the ELD requirement for qualifying box truck operators — but it doesn't eliminate HOS rules or recordkeeping. Here's exactly what applies." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <ELDExemptionPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
