import Head from 'next/head';
import UCRRegistrationPost from '../../src/pages/knowledge-center/UCRRegistrationPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>UCR Registration for New Carriers: What It Is and How to Stay Current | LaunchPath</title>
        <meta name="description" content="Unified Carrier Registration requirements for new motor carriers — who must register, annual renewal obligations, and the consequence of letting it lapse." />
        <meta property="og:title" content="UCR Registration for New Carriers: What It Is and How to Stay Current | LaunchPath" />
        <meta property="og:description" content="Unified Carrier Registration requirements for new motor carriers — who must register, annual renewal obligations, and the consequence of letting it lapse." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UCR Registration for New Carriers: What It Is and How to Stay Current | LaunchPath" />
        <meta name="twitter:description" content="Unified Carrier Registration requirements for new motor carriers — who must register, annual renewal obligations, and the consequence of letting it lapse." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <UCRRegistrationPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
