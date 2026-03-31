import KnowledgeCenterBriefTemplate from "../../components/KnowledgeCenterBriefTemplate";

const DATA = {
  code: "LP-BRF-12",
  cfr: "49 CFR Part 387 — Financial Responsibility",
  title: "Financial Runway Brief",
  subtitle: "What 'Resources' Actually Means Before You Start",
  decisionHeadline: "Running out of money in month two doesn't mean the business failed — it means it was never funded for what compliance actually costs.",
  readTime: "10-minute brief",
  cta: {
    context: "Run the TCO Calculator to see what your first 90 days actually cost — then decide if you're ready.",
    primary: { text: "Run the TCO Calculator →", to: "/tools/tco-calculator" },
    secondary: { text: "Take the REACH Diagnostic →", to: "/reach-diagnostic" },
  },
  executiveSummary: {
    intent: "This is what an owner must understand about capital requirements before committing to operations.",
    cohortNote: "The LaunchPath Standard requires financial runway as a precondition for cohort admission. Carriers who enroll without adequate runway consistently struggle to complete the implementation window.",
    points: [
      "The REACH Assessment's 'Resources' pillar measures financial readiness as a go/no-go condition. A carrier without 90-day operating capital is statistically likely to make compliance shortcuts under cash pressure — and those shortcuts are what auditors find.",
      "Compliance is not free. Insurance premiums, UCR fees, drug testing, maintenance reserves, and administrative overhead are all operating costs that begin before the first load moves. They do not pause while you build your book of business.",
      "Most new carriers underestimate startup costs by 40–60% because they calculate equipment and insurance but omit compliance infrastructure, administrative time, and cash float for receivables lag.",
    ],
  },
  leverage: {
    body: "Under 49 CFR Part 387, minimum insurance requirements represent only one component of financial responsibility. FMCSA's broader evaluation includes whether a carrier has the operational resources to maintain compliance systems over time. A carrier that begins operations underfunded will eventually face a forced choice between paying for compliance and staying liquid. That choice always produces the same outcome: violations, citations, and authority risk.",
    ownerDecisions: [
      "Minimum viable funding vs. operational float — Do you have enough to cover 90 days of operating costs including insurance, compliance administration, maintenance, and receivables lag — or just enough to make the first payment?",
      "Capital deployment sequencing — Are you building compliance infrastructure before revenue is predictable, or planning to build it after you're 'up and running' — which means building it under pressure?",
      "Cash flow modeling — Have you modeled the gap between first load delivery and first payment received? Factoring and broker payment terms create a 30–45 day cash gap in most new carrier situations.",
      "Compliance cost accounting — Have you included drug testing program costs, UCR renewal, MCS-150 updates, HOS system subscriptions, and administrative overhead in your startup budget?",
    ],
  },
  riskGrid: [
    { domain: "Underfunded Startup", fineRange: "N/A (business failure)", downtime: "Operations cease when cash runs out — typically before the audit window opens", remediation: "Cannot be remediated — authority lapses, authority reinstatement required" },
    { domain: "Insurance Lapse Due to Cash Shortfall", fineRange: "$10,000+ per occurrence", downtime: "Immediate authority suspension", remediation: "Reinstatement filing + coverage gap documentation + possible new application" },
    { domain: "Deferred Maintenance Due to Cash Pressure", fineRange: "$500–$16,000 per unit", downtime: "OOS orders at roadside; load delays; shipper relationship damage", remediation: "Emergency repairs at premium cost + documentation reconstruction" },
    { domain: "D&A Program Gap Due to Cost Avoidance", fineRange: "$1,000–$16,000 per violation", downtime: "Immediate dispatch halt; driver OOS", remediation: "$2,500–$6,000 to build compliant program from scratch under enforcement pressure" },
  ],
  costComparison: {
    clean: "Adequate runway (90-day operating capital + compliance budget) allows deliberate system installation before revenue pressure forces shortcuts. Cost: known and controlled.",
    remediation: "Underfunded startup produces deferred compliance, which produces violations, which produces enforcement costs that dwarf the original budget gap. Cost: unpredictable and compounding.",
  },
  maturityDomains: [
    {
      code: "LP-FIN-01",
      name: "Operating Capital Assessment",
      items: [
        "90-day operating budget has been modeled including all fixed and variable costs",
        "Insurance premium timing is accounted for (annual premium, quarterly payments, or monthly)",
        "Receivables lag (30–45 days) is included in cash flow model",
        "Compliance infrastructure costs (testing, subscriptions, admin) are line-itemed",
      ],
    },
    {
      code: "LP-FIN-02",
      name: "Compliance Cost Accounting",
      items: [
        "Drug testing program costs have been estimated (pre-employment + random pool + annual)",
        "UCR registration fee is budgeted for Year 1 and renewal",
        "ELD subscription or purchase is included in startup costs",
        "Administrative time cost (owner hours per week × opportunity cost) has been estimated",
      ],
    },
    {
      code: "LP-FIN-03",
      name: "Cash Flow Contingency",
      items: [
        "Emergency fund for unexpected maintenance or OOS event exists (minimum 1 month fixed costs)",
        "Broker payment terms have been researched and factored into cash flow timeline",
        "Factoring options have been evaluated as a receivables management tool",
        "Fuel cost volatility buffer is included in variable cost estimates",
      ],
    },
  ],
  binderTabs: [
    {
      code: "BUDGET",
      name: "Startup & Operating Budget",
      description: "Financial model covering pre-revenue and first 90-day operating costs.",
      items: [
        "Startup cost worksheet (equipment, insurance down payment, registration fees, compliance setup)",
        "Monthly fixed cost schedule (insurance premium, equipment payment, permits, subscriptions)",
        "Variable cost estimates (fuel, maintenance reserve, tires, drug testing)",
        "Cash flow projection — Month 1 through Month 6",
        "Receivables lag model (delivery date → invoice date → payment date)",
      ],
    },
    {
      code: "COMPLIANCE COSTS",
      name: "Compliance Cost Register",
      description: "All recurring and one-time compliance costs itemized and budgeted.",
      items: [
        "Drug & Alcohol program costs (C/TPA enrollment, pre-employment tests, random pool fee)",
        "UCR registration fee schedule",
        "ELD device/subscription cost",
        "HOS recordkeeping system cost",
        "MCS-150 biennial filing (no fee, but administrative time cost)",
        "Insurance premium by coverage type (liability, cargo, physical damage, bobtail)",
      ],
    },
    {
      code: "RUNWAY",
      name: "Financial Runway Confirmation",
      description: "Evidence that operating capital meets minimum viability threshold.",
      items: [
        "Bank statement or capital confirmation showing 90-day operating reserve",
        "Capital source documentation (personal savings, SBA loan, investor agreement)",
        "Personal financial statement (if sole proprietor or single-member LLC)",
        "Debt schedule — all existing obligations that compete with operating capital",
      ],
    },
  ],
};

export default function FinancialRunwayBrief() {
  return <KnowledgeCenterBriefTemplate data={DATA} />;
}
