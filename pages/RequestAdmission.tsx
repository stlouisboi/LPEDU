import React, { useState } from 'react';
import { 
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  TrendingUp,
  Shield,
  DollarSign,
  Activity,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestAdmission: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-lg">
            <Shield size={16} className="text-[#002244] dark:text-signal-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Implementation System
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#002244] dark:text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            LaunchPath: Structured Compliance Implementation for Motor Carriers
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A six-module system for building FMCSA compliance infrastructure. Developed from 200+ carrier implementations and 47 audit preparations.
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL BUILD */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-[#002244] dark:text-white">
            What You'll Build
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Documented Safety Management Program",
                desc: "FMCSA-compliant safety policies, accident register, and violation response procedures."
              },
              {
                title: "Insurance Monitoring Protocols",
                desc: "90/60/30-day renewal alerts, certificate tracking, and coverage gap contingency plans."
              },
              {
                title: "Driver Qualification File System",
                desc: "MVR review checklists, medical card tracking, and annual violation review procedures."
              },
              {
                title: "Vehicle Maintenance Tracking",
                desc: "Preventive maintenance schedules, inspection documentation, and repair record systems."
              },
              {
                title: "Hours-of-Service Violation Response",
                desc: "ELD data review procedures, driver counseling protocols, and violation tracking."
              },
              {
                title: "Regulatory Change Monitoring",
                desc: "CFR update notifications, compliance impact assessments, and implementation timelines."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#002244] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIME INVESTMENT */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[#002244] dark:text-white">
            Time Investment Required
          </h2>
          
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <Clock size={24} className="text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
              <div className="space-y-4">
                <p className="text-lg font-semibold text-[#002244] dark:text-white">
                  Plan for 8-12 hours per week over 90 days.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  This is implementation work, not passive learning. You'll be building spreadsheets, creating checklists, organizing documents, and establishing operational procedures. Most carriers complete 2-3 modules per month while maintaining operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THIS REPLACES */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-[#002244] dark:text-white">
            What This Replaces
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-white/5">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Alternative Approach
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Typical Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                  <tr>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      Compliance consultant ($150-250/hour, typically 40-60 hours)
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-900 dark:text-white">
                      $6,000 - $15,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      Custom template and system development
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-900 dark:text-white">
                      $2,000 - $5,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      Trial-and-error implementation (100+ hours of your time at $50/hour)
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-900 dark:text-white">
                      $5,000+
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-[#002244] dark:text-white">
                      Total Alternative Cost
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-lg text-[#002244] dark:text-white">
                      $13,000 - $25,000+
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              This system consolidates the research, template development, and implementation guidance into a structured 90-day process. You still do the work—building your specific files, entering your data, and executing your procedures—but you're following a documented process instead of figuring it out through trial and error.
            </p>
          </div>
        </div>
      </section>

      {/* RISK REDUCTION */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-[#002244] dark:text-white">
            Documented Risk Reduction
          </h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Authority Suspension Risk",
                without: "No documented safety program. FMCSA can suspend authority for pattern of non-compliance.",
                with: "Documented safety management program showing compliance efforts, even if violations occur.",
                impact: "Authority suspension = $0 revenue until reinstated (typically 60-90 days)."
              },
              {
                title: "Insurance Cancellation Risk",
                without: "No monitoring of renewal dates. Coverage gaps trigger FMCSA authority suspension.",
                with: "90/60/30-day renewal alerts. Broker communication protocols. Backup coverage options.",
                impact: "Coverage gap = immediate authority suspension + difficulty obtaining future coverage."
              },
              {
                title: "Audit Violation Risk",
                without: "No documented procedures. Violations result in fines and increased insurance premiums.",
                with: "Documented policies and procedures showing systematic compliance efforts.",
                impact: "Average FMCSA fine: $6,000. Serious violations: up to $79,000."
              }
            ].map((risk, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#002244] dark:text-white flex items-center space-x-3">
                  <Shield size={24} className="text-[#002244] dark:text-signal-gold" />
                  <span>{risk.title}</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                      Without System
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {risk.without}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      With System
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {risk.with}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">Financial Impact: </span>
                    {risk.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM DEVELOPMENT BACKGROUND */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-[#002244] dark:text-white">
            System Development Background
          </h2>
          
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-8 space-y-6">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              This system documents processes developed through:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#002244] dark:bg-signal-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-[#002244] dark:text-white">200+ carrier implementations</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Since 2020</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#002244] dark:bg-signal-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-[#002244] dark:text-white">47 FMCSA audit preparations</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">43 satisfactory outcomes, 4 conditional</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#002244] dark:bg-signal-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-[#002244] dark:text-white">12 authority reinstatement cases</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">9 successful, 3 ongoing</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#002244] dark:bg-signal-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-[#002244] dark:text-white">30+ insurance renewal negotiations</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">After violations or claims</p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-4 border-t border-slate-200 dark:border-white/10">
              Each module reflects patterns from these implementations. Templates include language that has worked in actual audits and insurance reviews.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#002244] dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="p-12 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Implementation Investment
              </h2>
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-6xl font-bold text-signal-gold" style={{ fontFamily: 'ui-monospace, "SF Mono", Consolas, monospace' }}>
                  $2,500
                </span>
                <span className="text-xl text-white/60">one-time</span>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/10">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What This Covers</h3>
                <ul className="space-y-3">
                  {[
                    "Six implementation modules (2-3 weeks each)",
                    "Operational templates and checklists",
                    "Direct implementation support during your cohort",
                    "Ongoing system access and updates"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-white/80">
                      <CheckCircle size={20} className="text-signal-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What This Doesn't Include</h3>
                <ul className="space-y-3">
                  {[
                    "Filing your FMCSA applications (you do this)",
                    "Negotiating with insurance brokers (you do this)",
                    "Day-to-day operational execution (you do this)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-white/60">
                      <XCircle size={20} className="text-white/40 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cohort Structure</h3>
                <p className="text-white/80">
                  LaunchPath operates in cohorts of 10 carriers. Each cohort receives direct implementation support over 90 days. Cohort enrollment opens when capacity is available.
                </p>
              </div>

              <p className="text-white/60 text-sm">
                Self-paced access is available immediately for $1,500 (no direct support, no cohort structure).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHANGE 10: WHAT THIS DOESN'T GUARANTEE */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-100 dark:bg-white/[0.02] rounded-2xl border border-slate-200 dark:border-white/10 p-10 space-y-6">
          <h3 className="text-2xl font-bold text-[#002244] dark:text-white">
            What This Doesn't Guarantee
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            This system documents compliance efforts and builds operational infrastructure. It does not guarantee FMCSA audit outcomes, insurance approval, or business profitability. Your execution, discipline, and operational decisions determine results.
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400 italic">
            LaunchPath provides the structure. You provide the implementation.
          </p>
        </div>
      </section>

      {/* CHANGE 11: COHORT STRUCTURE */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#002244] dark:text-white">
              Cohort Structure
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              I work with 10 carriers at a time. This allows me to provide direct implementation support, answer operational questions, and maintain the standard without dilution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
              <h3 className="font-semibold text-[#002244] dark:text-white">
                Cohort Implementation (Recommended)
              </h3>
              <p className="text-3xl font-bold text-signal-gold" style={{ fontFamily: 'ui-monospace, "SF Mono", Consolas, monospace' }}>$2,500</p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Direct implementation support during your cohort</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Operational question access</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Structured 90-day timeline</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Next start: March 1st</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
              <h3 className="font-semibold text-[#002244] dark:text-white">
                Self-Paced Implementation
              </h3>
              <p className="text-3xl font-bold text-slate-600 dark:text-slate-400" style={{ fontFamily: 'ui-monospace, "SF Mono", Consolas, monospace' }}>$1,500</p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>Immediate access to all modules</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>All templates and checklists</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>No direct support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>No operational question access</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-base text-slate-500 dark:text-slate-400 italic">
            The cohort model exists to protect the standard. If you need to move faster, self-paced is available. But the structure works best when carriers move through it together.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center space-y-8">
        <button
          onClick={() => navigate('/ground-0')}
          className="bg-signal-gold hover:bg-[#C5A572] text-[#002244] px-12 py-6 rounded-xl font-semibold text-lg transition-all inline-flex items-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <span>Complete Ground 0 Assessment</span>
          <ArrowRight size={20} />
        </button>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Ground 0 is a free diagnostic assessment that determines your readiness for implementation.
        </p>
      </section>

      {/* WHAT THIS DOESN'T GUARANTEE */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-8">
          <h3 className="text-xl font-bold text-[#002244] dark:text-white mb-4">
            What This Doesn't Guarantee
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This system documents compliance efforts. It doesn't guarantee audit outcomes or prevent violations. Your operational execution determines results. FMCSA auditors evaluate your actual compliance, not just your documentation. This system helps you demonstrate systematic compliance efforts, but it cannot control driver behavior, vehicle failures, or operational decisions.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t border-slate-200 dark:border-white/10 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Questions? Contact <a href="mailto:support@launchpathedu.com" className="text-[#002244] dark:text-signal-gold font-semibold hover:underline">support@launchpathedu.com</a>
        </p>
      </footer>
    </div>
  );
};

export default RequestAdmission;
