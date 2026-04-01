import SixteenSinsPage from '../src/pages/standards/SixteenSinsPage';
import Head from 'next/head';

const SINS_OG = "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/e491aa6163903b78a7a5f025b8d3f6ec5f5303641ad2bb94cb67a829ed554efe.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>The 16 Deadly Sins: Exposure Patterns That End Motor Carrier Authority | LaunchPath</title>
        <meta name="description" content="The 16 most common exposure patterns that reach the authority — each one documented, mapped to CFR, and preventable. Know them before FMCSA finds them for you." />
        <meta property="og:title" content="The 16 Deadly Sins: Exposure Patterns That End Motor Carrier Authority" />
        <meta property="og:description" content="16 recurring preventable failures that most often expose, weaken, or damage a new carrier during the New Entrant period. Each one has a corresponding control." />
        <meta property="og:image" content={SINS_OG} />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://launchpathedu.com/16-deadly-sins" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The 16 Deadly Sins: Exposure Patterns That End Motor Carrier Authority" />
        <meta name="twitter:description" content="16 recurring preventable failures. Each one documented, mapped to CFR, preventable. Know them before pressure finds them for you." />
        <meta name="twitter:image" content={SINS_OG} />
      </Head>
      <SixteenSinsPage />
    </>
  );
}
