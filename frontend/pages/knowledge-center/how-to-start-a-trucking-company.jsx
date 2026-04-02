import Head from 'next/head';
import HowToStartTruckingPost from '../../src/pages/knowledge-center/HowToStartTruckingPost';

const TITLE = "How to Start a Trucking Company: A Compliance-First Guide | LaunchPath";
const H1 = "How to Start a Trucking Company Without Getting Shut Down in Year One";
const DESC = "Most new trucking companies fail their first compliance audit. Here is the full startup sequence — from business formation to first load — built around what FMCSA actually requires.";
const URL = "https://launchpathedu.com/knowledge-center/how-to-start-a-trucking-company";

const FAQ_ITEMS = [
  { q: "How long does it take to start a trucking company?", a: "Business formation can be completed in one to two weeks. FMCSA processes MC number applications in 20 to 25 business days. Pre-operation compliance — insurance filing, drug and alcohol program setup, driver qualification files — typically takes an additional two to four weeks. Most carriers can be fully compliant and ready for first dispatch in 45 to 60 days from the start of the process." },
  { q: "Do I need a CDL to start a trucking company?", a: "If you intend to drive a commercial motor vehicle requiring a CDL — which includes most Class A tractor-trailer operations — then yes, you need a CDL. If you are starting a company with employed drivers and will not drive yourself, you do not need a CDL. All CDL drivers you employ in CDL-required vehicles must hold current, valid CDLs." },
  { q: "What is the biggest compliance mistake new trucking companies make?", a: "Dispatching a driver before the pre-employment drug test result is on file. This is not a paperwork error — it means the driver operated without completing a required federal safety screening. At a new entrant audit, this finding is treated with elevated severity because it indicates the carrier dispatched without meeting a mandatory requirement, regardless of how the driver performed on the road." },
  { q: "How much does it cost to start a trucking company?", a: "Startup compliance costs include the MC number application ($300), UCR registration (fee varies by fleet size), insurance (variable by cargo type and equipment value), and consortium enrollment for drug testing (typically $100 to $250 annually per driver). Operating costs — fuel, maintenance, insurance — are ongoing. Use the LaunchPath TCO Calculator to build a realistic operating budget before you apply for authority." },
  { q: "What is the new entrant safety audit and when does it happen?", a: "The new entrant safety audit is a mandatory compliance review that FMCSA conducts within 12 months of a new carrier receiving operating authority. It covers six areas: driver qualification files, drug and alcohol program, hours of service records, vehicle maintenance records, hazardous materials compliance (if applicable), and insurance and authority documentation. Carriers who have not built their compliance systems before the audit are at high risk of receiving a Conditional or Unsatisfactory safety rating." },
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
      <HowToStartTruckingPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
