import Head from 'next/head';
import CarrierFilesPage from '../src/pages/CarrierFilesPage';
import SiteHeader from '../src/components/home/SiteHeader';
import FooterSection from '../src/components/FooterSection';

const TITLE = "Carrier Files | LaunchPath Transportation EDU";
const DESC  = "Three documented carrier outcomes — DQ file gaps, drug & alcohol program failures, and HOS/maintenance deficiencies. What was missing, what was installed, and what FMCSA found.";
const OG    = "https://launchpathedu.com/og-launchpath.png";
const URL   = "https://launchpathedu.com/carrier-files";

export default function CarrierFiles() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
      </Head>
      <SiteHeader />
      <CarrierFilesPage />
      <FooterSection />
    </>
  );
}
