import Head from 'next/head';
import DQFileRequirementsPost from '../../src/pages/knowledge-center/DQFileRequirementsPost';

const TITLE = "Driver Qualification File Requirements FMCSA | LaunchPath";
const H1 = "What FMCSA Requires in Every Driver Qualification File";
const DESC = "FMCSA requires a Driver Qualification File for every CDL driver you employ. Here is what 49 CFR Part 391 requires in every file before your driver operates.";
const URL = "https://launchpathedu.com/knowledge-center/driver-qualification-file-requirements-fmcsa";

const FAQ_ITEMS = [
  { q: "What documents go in a driver qualification file?", a: "At minimum: employment application, motor vehicle records, previous employer inquiry, road test certificate or CDL equivalent, medical examiner's certificate, and a negative pre-employment drug test result. Annual MVR reviews are added every 12 months thereafter." },
  { q: "How long do I have to keep a DQ file after a driver leaves?", a: "Three years from the date of termination. Some documents within the file — particularly drug test results — have their own retention periods under 49 CFR Part 382. Retain whichever period is longer." },
  { q: "Does every driver need a DQ file or just CDL drivers?", a: "49 CFR Part 391 applies to drivers of commercial motor vehicles as defined under federal regulations. Most carriers subject to FMCSA jurisdiction are operating CMVs that require CDLs. Verify the CMV definition applies to your operation — if it does, DQ files are required." },
  { q: "What happens if FMCSA finds an incomplete DQ file at audit?", a: "The missing document is recorded as a deficiency. You are required to submit a Corrective Action Plan within 45 days documenting what was missing, why, and what you have done to correct it. Failure to submit a CAP results in an Unsatisfactory safety rating." },
  { q: "Can I keep DQ files electronically?", a: "Yes. Electronic storage is acceptable provided the system can produce a legible, complete copy on demand. Every required document must still be present regardless of storage format." },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" key="canonical" href={URL} />
        <meta property="og:title" content={H1} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={H1} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "headline": H1,
                "description": DESC,
                "url": URL,
                "datePublished": "2026-04-01",
                "dateModified": "2026-04-01",
                "author": { "@type": "Person", "name": "Vince Lawrence", "url": "https://launchpathedu.com/founder" },
                "publisher": { "@type": "Organization", "name": "LaunchPath Transportation EDU", "url": "https://launchpathedu.com", "logo": { "@type": "ImageObject", "url": "https://launchpathedu.com/og-launchpath.png" } },
                "image": "https://launchpathedu.com/og-launchpath.png",
                "mainEntityOfPage": { "@type": "WebPage", "@id": URL }
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQ_ITEMS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
              }
            ]
          })}}
        />
      </Head>
      <DQFileRequirementsPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
