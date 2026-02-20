import React from 'react';
import { ArrowRight, CheckCircle2, Shield, FileText, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EnrollPage() {
  const navigate = useNavigate();

  const handleGroundZero = () => {
    // TODO: Integrate with Stripe for $197 Ground 0 purchase
    navigate('/ground-zero');
  };

  const handleApplyStandard = () => {
    // TODO: Integrate with Stripe for $2,500 Standard purchase
    alert('Stripe integration coming soon. This will process the $2,500 payment.');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The LaunchPath Standard
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-blue-100">
            A 90-Day Compliance Implementation System for New Motor Carriers
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
            Not a course. Not a coaching program. A governed execution framework designed to get your authority, insurance, and compliance infrastructure built correctly — before the FMCSA begins watching.
          </p>
          <button
            onClick={handleGroundZero}
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            Begin with Ground 0 <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-blue-200 mt-4">
            Ground 0 is available on a rolling basis. Admission into the Standard requires verified readiness.
          </p>
        </div>
      </section>

      {/* Section 1: The Problem */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Why 40% of new motor carriers fail within two years
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              It is rarely the freight market.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              It is rarely the equipment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              It is almost always one of four things: they lost their operating authority, their insurance lapsed, they failed a compliance review, or they ran out of cash before revenue stabilized.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              These are not bad luck outcomes. They are predictable failures — and every one of them is preventable with the right systems in place before operations begin.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Most new carriers don't build those systems. They file for authority, bind insurance, find a load, and figure out compliance as problems surface.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-semibold">
              The FMCSA does not wait for you to figure it out.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              New entrant carriers are subject to audit within their first 12 months of operation. The audit is not a formality. It is a review of whether your compliance infrastructure exists and functions correctly.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Carriers who enter that audit without systems fail it. The consequences range from corrective action requirements to authority revocation.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
              The LaunchPath Standard exists to prevent that outcome.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: What the Standard Is */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            This is not content. This is infrastructure.
          </h2>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
            The LaunchPath Standard is a 90-day compliance implementation system built on four operational pillars:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <Shield className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Pillar 1 — Authority Protection
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your MC authority is your license to operate. It must be actively maintained. We build the systems that protect it from activation through your first compliance review.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <FileText className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Pillar 2 — Insurance Continuity
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Insurance in the motor carrier space is a federally regulated requirement with specific minimum thresholds tied to your authority. One lapse can trigger revocation. We build the systems that prevent that.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <CheckCircle2 className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Pillar 3 — Compliance Backbone
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Driver Qualification Files. Hours of Service records. Vehicle inspection documentation. Drug and Alcohol program management. These are not optional. They are the documentation an FMCSA investigator will review. We build them correctly the first time.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <DollarSign className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Pillar 4 — Cash-Flow Oxygen
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A business that runs out of money stops operating. The gap between freight delivery and payment receipt is real, and it is the leading cause of first-year cash flow failure. We build the financial systems that keep you operating through it.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              What you build in 90 days:
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Operating authority activated with all required filings in place</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Insurance policy structured to federal minimums with continuity systems in place</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Complete Driver Qualification File (yours and any drivers you hire)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Hours of Service recordkeeping system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Vehicle inspection and maintenance documentation system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Drug and Alcohol program enrollment and compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Business banking and accounting structure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Cash flow management framework with factoring evaluation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Audit readiness documentation package</span>
              </li>
            </ul>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            This is not a checklist you print and file away. It is a functional compliance infrastructure that operates continuously.
          </p>
        </div>
      </section>

      {/* Section 3: How Admission Works */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Admission is not open to everyone. It is earned.
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Ground 0 is available on a rolling basis. It is a six-lesson readiness diagnostic — not a welcome module — designed to help you determine whether you are operationally, financially, and personally prepared to launch a motor carrier authority right now.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              At the end of Ground 0, you make one of three decisions: <strong>GO</strong>, <strong>WAIT</strong>, or <strong>NO-GO</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Admission into the LaunchPath Standard occurs during scheduled implementation cycles. This ensures every operator enters the system with verified readiness and progresses through the 90-day execution window under a consistent governance framework.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              To be considered for admission, you must:
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Complete all six Ground 0 lessons</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Complete all associated Ground 0 assessment tools</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Record a documented GO decision</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Have startup capital that meets the minimum threshold for your lane</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>Have household alignment confirmed</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            This is not a barrier designed to exclude people. It is a standard designed to protect the operators who enter the system — and the integrity of the environment they enter.
          </p>

          <button
            onClick={handleGroundZero}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            Begin Ground 0 — No Commitment Required <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Section 4: Who This Is For */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            This system is built for a specific operator
          </h2>
          
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              The LaunchPath Standard is designed for:
            </h3>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">New motor carrier operators</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Carriers who have filed or are preparing to file for MC authority and need to build their compliance infrastructure correctly from the beginning.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Operators in their first 90 days</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Carriers who are already operating but have not yet established systematic compliance documentation and need to build it before their New Entrant Safety Audit.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Operators returning from a lapse</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Carriers who have had authority issues and are rebuilding their compliance infrastructure with a clear understanding of what went wrong.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              This system is not designed for:
            </h3>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Operators who are looking for shortcuts through the compliance process.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Operators who want to be told their situation is easier than it is.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Operators who are not prepared to invest the time and attention that building a compliant carrier operation requires.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                If that describes you, this is not the right system. There are faster, simpler options available. They produce the outcomes you would expect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: About the Instructor */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Federal compliance experience. No operational mythology.
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Vince is a United States Navy veteran with more than 20 years of experience in federal compliance, manufacturing leadership, and safety system management. He holds an OSHA Safety Certification.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              He has not driven a semi-truck for a living. He is not a trucking influencer. He does not teach operational tactics or load board strategy.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              What he teaches is regulatory compliance infrastructure — how to build the systems that protect a federally regulated business from the enforcement actions that end it.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              That expertise is the foundation of every lesson, every tool, and every framework in the LaunchPath Standard.
            </p>
          </div>

          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 italic">
            Accuracy Over Hype. Systems Over Shortcuts.
          </p>
        </div>
      </section>

      {/* Section 6: Investment */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            The cost of the Standard vs. the cost of getting it wrong
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A failed FMCSA compliance review can result in corrective action requirements, civil penalties, and — in the most serious cases — authority revocation.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A single out-of-service order during a roadside inspection generates downtime, potential violations, and SMS BASIC score damage that follows your authority for years.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              An insurance lapse of one day can trigger automatic FMCSA notification and authority suspension.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
              These are not rare outcomes. They are what happens when carriers operate without compliance infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The LaunchPath Standard */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                The LaunchPath Standard
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">$2,500</span>
              </div>
              <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Includes:</h4>
              <ul className="space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Ground 0 Readiness Module (6 lessons, 11 tools)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Modules 1–8 (90-day implementation system)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>All downloadable tools, checklists, calculators, and templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Scheduled cohort coaching calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Direct instructor access during implementation window</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                Payment plans available. Contact for details.
              </p>
              <button
                onClick={handleApplyStandard}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Apply for the Standard <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Ground 0 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Ground 0 — Readiness Diagnostic
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$197</span>
              </div>
              <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Includes:</h4>
              <ul className="space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>All six Ground 0 lessons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>All 11 downloadable assessment tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>GO/WAIT/NO-GO decision framework</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Credit toward full Standard enrollment if you are admitted</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                Ground 0 completion is required before Standard admission. This is where the process begins.
              </p>
              <button
                onClick={handleGroundZero}
                className="w-full bg-gray-900 dark:bg-gray-700 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                Begin Ground 0 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: I already have my MC authority. Is this still relevant?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes. Having authority and having the compliance infrastructure to maintain it are different things. The majority of New Entrant Safety Audit failures occur in carriers that have been operating for 6–10 months — not carriers that filed incorrectly. The Standard addresses the full compliance backbone, not just the initial filing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: How much time does this require per week?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Plan for two to three hours per week minimum to complete the 90-day implementation on pace. Operators who treat this as a sprint followed by extended inactivity do not produce the same outcomes as operators who maintain consistent weekly execution.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: I'm in a box truck / cargo van. Is this relevant to my operation?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes. FMCSA jurisdiction applies to most commercial motor vehicles operating in interstate commerce, regardless of vehicle size. The compliance requirements vary by GVWR and operation type, and the Standard addresses both box truck and semi-truck lanes throughout.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: What if I complete Ground 0 and my decision is WAIT?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You receive a structured WAIT Improvement Plan that identifies your specific gaps and the steps required to close them. Ground 0 credit applies to full enrollment when you are ready. A WAIT decision is not a failure — it is the system functioning correctly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: Is this legal or compliance advice?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                No. LaunchPath Transportation EDU is an educational program. The content does not constitute legal, tax, financial, or compliance advice. You are responsible for verifying all regulatory requirements with FMCSA and consulting qualified professionals for your specific situation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: What makes this different from other trucking courses?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Most trucking education focuses on operations — how to find loads, how to negotiate rates, how to grow a fleet. LaunchPath does not cover any of that. It covers one thing: how to build and maintain the compliance infrastructure that keeps your authority active and your operation legal. If you are looking for operational strategy, this is not the right program. If you are looking for compliance infrastructure, there is not a more systematic alternative available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to begin?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Ground 0 is the starting point. It is available now, on a rolling basis, with no commitment to the full Standard.
          </p>
          <p className="text-lg text-blue-100 mb-10">
            Begin the diagnostic. Make the decision with accurate information. If the decision is GO, the admission window will be waiting.
          </p>
          <button
            onClick={handleGroundZero}
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            Begin Ground 0 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p className="mb-2">
          LaunchPath Transportation EDU is an educational program. Content does not constitute legal, tax, financial, or compliance advice. Verify all requirements with FMCSA and qualified professionals.
        </p>
        <p>
          © LaunchPath Transportation EDU | Accuracy Over Hype. Systems Over Shortcuts.
        </p>
      </footer>
    </div>
  );
}
