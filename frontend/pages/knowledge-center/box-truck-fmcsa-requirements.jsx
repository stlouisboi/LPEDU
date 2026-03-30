import Head from 'next/head';
import BoxTruckFMCSAPost from '../../src/pages/knowledge-center/BoxTruckFMCSAPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes | LaunchPath</title>
        <meta name="description" content="The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line." />
        <meta property="og:title" content="Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes | LaunchPath" />
        <meta property="og:description" content="The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes | LaunchPath" />
        <meta name="twitter:description" content="The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <BoxTruckFMCSAPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
