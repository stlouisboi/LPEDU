import Head from 'next/head';
import MaintenancePacketPage from '../../src/pages/products/MaintenancePacketPage';
export default function Page() {
  return (
    <>
      <Head>
        <title>Maintenance & Unit File Packet — Part 396 Fleet Maintenance Standard | LaunchPath</title>
        <meta name="description" content="Per-VIN unit files, inspection documentation, and maintenance logs for Part 396. The operating standard for fleet maintenance recordkeeping and inspection compliance." />
        <meta property="og:title" content="Maintenance & Unit File Packet — Part 396 Fleet Maintenance Standard | LaunchPath" />
        <meta property="og:description" content="Per-VIN unit files, inspection documentation, and maintenance logs for Part 396 fleet maintenance compliance." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-maintenance-packet.png" />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maintenance & Unit File Packet — Part 396 Fleet Maintenance Standard | LaunchPath" />
        <meta name="twitter:description" content="Per-VIN unit files, inspection documentation, and maintenance logs for Part 396 fleet maintenance compliance." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-maintenance-packet.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/standards/maintenance-packet" />
      </Head>
      <MaintenancePacketPage />
    </>
  );
}
