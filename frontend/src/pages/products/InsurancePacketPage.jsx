import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function InsurancePacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-005 | INSURANCE & AUTHORITY PACKET"
      title="Insurance & Authority Packet"
      subtitle="FMCSA Authority & Insurance Filing Operating Standard (Document System)"
      price="$109"
      sku="LP-PKT-005"
      image="https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/1765edddd11eb37db174f165574154c8c2680e6ea93eec2b608a15b19ed2bfcd.png"
      tagline="The document system for insurance continuity and operating authority maintenance."
      positioning={[
        "This is not an insurance broker. It is a document system built to install the filing verification, contract review discipline, renewal preparation framework, and authority maintenance habits that keep a carrier operational and protected.",
        "Insurance is not a purchase. It is a filing. A policy that exists but is not filed correctly with FMCSA does not satisfy your federal obligation. This packet closes the gap between having coverage and being covered.",
      ]}
      whatsInside={[
        "Coverage Types Brief — What Each Policy Does and Why It Matters: A plain-language explanation of every coverage type a new carrier should understand — primary liability, motor truck cargo, physical damage, general liability, non-trucking liability, and occupational accident. Covers FMCSA minimum financial responsibility requirements by operation type, required filing forms (BMC-91X), and why federal minimums are floors, not industry standards. Citations current as of publication.",
        "Broker and Shipper Contract Risk Checklist: Every contract clause that creates insurance and liability risk for the carrier — additional insured requirements, indemnification language, cargo claim filing windows, waiver of subrogation provisions, and authority warranty clauses. Use this checklist before signing any broker or shipper agreement.",
        "Renewal Prep Checklist — What Underwriters Evaluate: A 90-day renewal preparation framework covering loss run requests, CSA score review, coverage gap identification, market preparation, and binding confirmation. Includes the specific actions required at 90 days out, 60 days out, and 30 days out — so renewal is a managed process, not a reactive scramble.",
        "Authority Status and Filings Checklist — Staying Active and In Good Standing: Annual and monthly verification steps for USDOT status, MC authority, BMC-91X filings, MCS-150 updates, BOC-3, and UCR registration. Includes the authority lapse items that can suspend or revoke operating authority — and a monthly quick-check format for insurance continuity between renewals.",
      ]}
      whoItsFor={[
        "New carriers setting up insurance for the first time and verifying filings are correct",
        "Carriers approaching their first renewal who have not prepared a renewal documentation package",
        "Owner-operators signing broker and shipper agreements without a contract risk review process",
        "Carriers who have had a lapse in authority status or insurance filing and need to restore good standing",
      ]}
      whatItReplaces={[
        "Signing a broker agreement without reviewing the indemnification clause",
        "Discovering your BMC-91X filing lapsed when a broker runs an authority check",
        "Arriving at renewal without a loss run or organized safety records",
        "Operating for months with an insurance filing gap because the renewal was processed but the filing was not confirmed",
      ]}
      nextStepText="The Insurance & Authority Packet covers one of five compliance domains. The New Carrier Document System bundles all five with a 0–30–90 day implementation guide — the complete DIY operating standard for new authorities."
      nextStepText="This packet is one of five domain-specific document systems in the Domain Systems Bundle ($499). The bundle includes all five packets, a unified folder structure, and a 0–30–90 day implementation guide."
      nextStepHref="/compliance-library"
      nextStepLabel="View the Domain Systems Bundle ($499) →"
      mockupId={null}
    />
  );
}
