import Head from 'next/head';
import MaintenancePacketPage from '../../src/pages/products/MaintenancePacketPage';

const OG = "https://launchpathedu.com/images/products/domain5-maintenance.webp";

export default function Page() {
  return (
    <>
      <Head>
        <title>Maintenance & Unit File Packet — Part 396 Fleet Maintenance Standard | LaunchPath</title>
        <meta name="description" content="Per-VIN unit files, inspection documentation, and maintenance logs for Part 396. The operating standard for fleet maintenance recordkeeping and inspection compliance." />
        <meta property="og:title" content="Maintenance & Unit File Packet — Part 396 Fleet Maintenance Standard | LaunchPath" />
        <meta property="og:description" content="Per-VIN unit files, inspection documentation, and maintenance logs for Part 396 fleet maintenance compliance." />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://launchpathedu.com/products/maintenance-packet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
        <link rel="canonical" href="https://launchpathedu.com/products/maintenance-packet" />
      </Head>
      <MaintenancePacketPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
