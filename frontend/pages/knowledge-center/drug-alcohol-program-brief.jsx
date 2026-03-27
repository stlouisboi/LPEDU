import Head from 'next/head';
import DrugAlcoholBrief from '../../src/pages/knowledge-center/DrugAlcoholBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>Drug & Alcohol Compliance Program for New Motor Carriers | LaunchPath</title>
        <meta name="description" content="What a real D&A compliance program actually proves. Program brief for new motor carriers under 49 CFR Parts 382 & 40." />
        <meta property="og:title" content="Drug & Alcohol Compliance Program for New Motor Carriers | LaunchPath" />
        <meta property="og:description" content="What a real D&A compliance program actually proves. Program brief for new motor carriers under 49 CFR Parts 382 & 40." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Drug & Alcohol Compliance Program for New Motor Carriers | LaunchPath" />
        <meta name="twitter:description" content="What a real D&A compliance program actually proves. Program brief for new motor carriers under 49 CFR Parts 382 & 40." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <DrugAlcoholBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
