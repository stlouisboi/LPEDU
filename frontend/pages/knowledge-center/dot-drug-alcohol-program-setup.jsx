import Head from 'next/head';
import DrugAlcoholSetupPost, { FAQ } from '../../src/pages/knowledge-center/DrugAlcoholSetupPost';

const TITLE = "How to Set Up a DOT Drug and Alcohol Testing Program | LaunchPath";
const H1 = "How to Set Up Your DOT Drug and Alcohol Testing Program Before Day 1";
const DESC = "A 10-step setup sequence for new motor carriers: consortium enrollment, FMCSA Clearinghouse registration, pre-employment testing, DER designation, supervisor training, and post-accident protocol — all before first dispatch.";
const URL = "https://launchpathedu.com/knowledge-center/dot-drug-alcohol-program-setup";

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
                "datePublished": "2025-12-15",
                "dateModified": "2025-12-15",
                "author": { "@type": "Person", "name": "Vince Lawrence", "url": "https://launchpathedu.com/founder" },
                "publisher": { "@type": "Organization", "name": "LaunchPath Transportation EDU", "url": "https://launchpathedu.com", "logo": { "@type": "ImageObject", "url": "https://launchpathedu.com/og-launchpath.png" } },
                "image": "https://launchpathedu.com/og-launchpath.png",
                "mainEntityOfPage": { "@type": "WebPage", "@id": URL }
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQ.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
              },
              {
                "@type": "HowTo",
                "name": H1,
                "description": DESC,
                "totalTime": "PT7D",
                "step": [
                  { "@type": "HowToStep", "position": 1, "name": "Designate a DER", "text": "Designate a Designated Employer Representative in writing before first driver dispatch." },
                  { "@type": "HowToStep", "position": 2, "name": "Enroll in a Consortium or TPA", "text": "Select and enroll in a FMCSA-compliant consortium to manage your random testing pool and program requirements." },
                  { "@type": "HowToStep", "position": 3, "name": "Register in the FMCSA Clearinghouse", "text": "Create an employer account at clearinghouse.fmcsa.dot.gov and authorize your TPA." },
                  { "@type": "HowToStep", "position": 4, "name": "Conduct Pre-Employment Clearinghouse Queries", "text": "Run a full Clearinghouse query with driver consent before each CDL driver's first safety-sensitive function." },
                  { "@type": "HowToStep", "position": 5, "name": "Complete Pre-Employment Drug Testing", "text": "Send each driver to a SAMHSA-certified collection site. Await MRO-verified negative result before dispatch." },
                  { "@type": "HowToStep", "position": 6, "name": "Document MRO-Verified Result in Driver's DQ File", "text": "File the MRO-verified negative result in the driver's Driver Qualification File." },
                  { "@type": "HowToStep", "position": 7, "name": "Enroll Each CDL Driver in Random Testing Pool", "text": "Notify the consortium of each CDL driver at hire. Obtain written pool enrollment confirmation." },
                  { "@type": "HowToStep", "position": 8, "name": "Establish Post-Accident Testing Protocol", "text": "Document triggering criteria, responsible parties, collection site locations, and 24-hour contact list." },
                  { "@type": "HowToStep", "position": 9, "name": "Complete Supervisor Reasonable Suspicion Training", "text": "Each qualifying supervisor must complete 60 minutes of controlled substance training and 60 minutes of alcohol training." },
                  { "@type": "HowToStep", "position": 10, "name": "Confirm Annual MIS Reporting", "text": "Confirm whether your TPA files the annual MIS report on your behalf. Retain a copy for your records." }
                ]
              }
            ]
          })}}
        />
      </Head>
      <DrugAlcoholSetupPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
