import Head from 'next/head';
import CarrierFilesPage from '../src/pages/CarrierFilesPage';
import SiteHeader from '../src/components/home/SiteHeader';
import FooterSection from '../src/components/FooterSection';

const TITLE = "Carrier Files | LaunchPath Transportation EDU";
const DESC  = "Documented carrier outcomes — what was missing at entry, what was installed, and what the New Entrant Safety Audit found. No names. No DOT numbers.";

export default function CarrierFiles() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
      </Head>
      <SiteHeader />
      <CarrierFilesPage />
      <FooterSection />
    </>
  );
}
