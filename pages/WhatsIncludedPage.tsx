import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Shield, FileText, DollarSign, Activity, ArrowRight, Book, Download, Lock, AlertTriangle } from 'lucide-react';

export default function WhatsIncludedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-6 py-2 rounded-full mb-6">
            <Book size={16} />
            <p className="text-xs font-black uppercase tracking-[0.3em]">Complete System Breakdown</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            What You Receive
          </h1>
          <p className="text-2xl text-blue-100 mb-4">
            $2,500–$3,500 | The LaunchPath 90-Day Compliance Operating Standard
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Section 1: Complete 90-Day Standard */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              A complete 90-Day Compliance Operating Standard
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <p><strong>8 modules</strong>, from Ground 0 readiness through post-audit recovery</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <p><strong>55 step-by-step lessons</strong> and ~13 hours of structured instruction</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <p>Built for <strong>new and early-stage motor carriers</strong> operating under their own authority</p>
              </div>
            </div>
          </div>

          {/* Section 2: Fully Built Compliance Infrastructure */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              A fully built compliance infrastructure
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Authority setup and protection systems</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  DOT, MC, BOC-3, MCS-150, audit-ready carrier identity
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Insurance continuity framework</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Aligned with FMCSA requirements and underwriting reality
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Driver qualification, vehicle maintenance, HOS, and drug/alcohol systems</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Built to audit standards, not advice-based shortcuts
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Cash-Flow and Operational Discipline */}
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              Cash-flow and operational discipline systems
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Cost-per-mile, startup capital, and rate discipline tools</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To prevent "cheap freight" collapse
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Payment-gap and reserve planning</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  So 30–60 day pay cycles don't shut the business down
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Lane selection, dispatch fundamentals, deadhead control, and technology minimums</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Required for professional operations
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: 70+ Implementation Tools */}
          <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <Download className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              70+ implementation tools (the actual deliverables)
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                Checklists, calculators, file indexes, maps, and templates across all four pillars
              </p>
              <p className="leading-relaxed">
                Every lesson includes <strong>clear student actions</strong> and a <strong>downloadable artifact</strong> that becomes part of the carrier's real operating system
              </p>
            </div>
          </div>

          {/* Section 5: A Guarded Path */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <Lock className="w-8 h-8 text-yellow-600" />
              A guarded path — not open-ended content
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <p><strong>Ground 0 GO / WAIT / NO-GO gate</strong> before capital is put at risk</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <p>A <strong>sequenced build</strong> that prevents skipping critical systems</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <p>A final <strong>90-Day Debrief and REACH Test re-run</strong> so operators finish with a verified standard, not just completed videos</p>
              </div>
            </div>
          </div>

          {/* Section 6: What This Is Not */}
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              What this is not
            </h2>
            
            <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
              <p>❌ Not a dispatching course</p>
              <p>❌ Not a "how to get rich in trucking" program</p>
              <p>❌ Not motivational content</p>
              <p>❌ Not shortcuts</p>
            </div>

            <p className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
              This is a compliance operating standard for carriers who intend to stay in business.
            </p>
          </div>

          {/* Blue-Collar Language Check */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Blue-collar language check (important)
            </h3>
            
            <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <p>✅ Plain</p>
              <p>✅ Concrete</p>
              <p>✅ No hype</p>
              <p>✅ No jargon without explanation</p>
              <p>✅ Reads like a shop manual, not a pitch deck</p>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              A tired owner-operator can skim this and immediately understand: Who it's for, What it builds, Why it exists, Why it costs what it costs.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to build your compliance infrastructure?
          </h2>
          <p className="text-xl text-blue-100">
            Start with Ground 0 to determine if you're structurally ready for the Standard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ground-0"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              Begin Ground 0 (Free) <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/enroll"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2 border-2 border-white/20"
            >
              View Full Enrollment Details <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>
          © LaunchPath Transportation EDU | Accuracy Over Hype. Systems Over Shortcuts.
        </p>
      </footer>
    </div>
  );
}
