import Head from 'next/head';
import ContactPage from '../src/pages/ContactPage';
export default function Page() {
  return (
    <>
      <Head>
        <title>Contact LaunchPath | Transportation Compliance Education</title>
        <meta name="description" content="Contact LaunchPath Transportation EDU. Reach the team with questions about enrollment, the LaunchPath Standard, or new motor carrier compliance." />
        <meta property="og:title" content="Contact LaunchPath | Transportation Compliance Education" />
        <meta property="og:description" content="Contact LaunchPath Transportation EDU. Reach the team with questions about enrollment, the LaunchPath Standard, or new motor carrier compliance." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact LaunchPath | Transportation Compliance Education" />
        <meta name="twitter:description" content="Contact LaunchPath Transportation EDU. Reach the team with questions about enrollment, the LaunchPath Standard, or new motor carrier compliance." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://launchpathedu.com/contact" />
      </Head>
      <ContactPage />
    </>
  );
}
