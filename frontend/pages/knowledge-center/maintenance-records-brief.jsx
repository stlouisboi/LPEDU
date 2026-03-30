import Head from 'next/head';
import MaintenanceRecordsBrief from '../../src/pages/knowledge-center/MaintenanceRecordsBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>Vehicle Maintenance Records: What FMCSA Requires New Carriers to Keep | LaunchPath</title>
        <meta name="description" content="The Part 396 maintenance file requirements for new motor carriers — unit files, inspection records, DVIR procedures, and repair documentation that survives an audit." />
        <meta property="og:title" content="Vehicle Maintenance Records: What FMCSA Requires New Carriers to Keep | LaunchPath" />
        <meta property="og:description" content="The Part 396 maintenance file requirements for new motor carriers — unit files, inspection records, DVIR procedures, and repair documentation that survives an audit." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vehicle Maintenance Records: What FMCSA Requires New Carriers to Keep | LaunchPath" />
        <meta name="twitter:description" content="The Part 396 maintenance file requirements for new motor carriers — unit files, inspection records, DVIR procedures, and repair documentation that survives an audit." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <MaintenanceRecordsBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
