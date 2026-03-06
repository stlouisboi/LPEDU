import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Activity
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-[#002244] text-white font-sans overflow-x-hidden selection:bg-[#C5A059] selection:text-[#002244]">
      
      {/* ITEM 0 & 1: NEW HERO COPY & REMOVE ALL OTHER HERO CTAs (Confirmed in v3) */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-[32px] md:text-[64px] font-black uppercase tracking-tighter leading-[1.1] mb-6">
            90-DAY COMPLIANCE OPERATING STANDARD FOR NEW AUTHORITIES
          </h1>
          <h2 className="text-[20px] md:text-[28px] font-bold text-[#C5A059] mb-8 uppercase tracking-tight">
            Built to survive the New Entrant Safety Audit, not chase YouTube dreams.
          </h2>
          <p className="text-[18px] md:text-[22px] text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Most authorities are not revoked for driving mistakes. They are revoked because paperwork, insurance,
            compliance, and regulatory pressure collapse under load. LaunchPath installs an operating standard in
            your first 90 days so your authority can withstand FMCSA audits, insurance underwriting, and real-world
            cash-flow shocks.
          </p>
          
          <div className="flex flex-col items-center space-y-6">
            <Link 
              to="/readiness" 
              className="inline-block bg-[#C5A059] text-[#002244] px-12 py-6 rounded-xl text-[18px] md:text-[20px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl shadow-[#C5A059]/20"
            >
              Begin Ground 0
            </Link>
            <p className="text-[14px] md:text-[16px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Admission is not automatic. Eligibility starts with Ground 0.
            </p>
          </div>
        </div>

        {/* Credentials Bar (Stays as per Item 0) */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-20 pt-10 border-t border-white/5 opacity-60">
          <div className="flex items-center space-x-3">
            <Shield size={18} className="text-[#C5A059]" />
            <span className="text-[12px] font-black uppercase tracking-widest">U.S. Navy Veteran Operated</span>
          </div>
          <div className="flex items-center space-x-3">
            <Activity size={18} className="text-[#C5A059]" />
            <span className="text-[12px] font-black uppercase tracking-widest">20+ Years Compliance & Safety</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle2 size={18} className="text-[#C5A059]" />
            <span className="text-[12px] font-black uppercase tracking-widest">Safety-Certified Operations</span>
          </div>
        </div>
      </section>

      {/* ITEM 4 (v2): REAL KNOWLEDGE DELIVERY BLOCK */}
      <section className="bg-[#001833] py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-8 text-[18px] md:text-[22px] text-slate-300 leading-relaxed">
            <p>
              FMCSA’s New Entrant Safety Audit typically occurs within the first 12 months of operation. What most
              new carriers don’t realize is that early audits are often triggered by administrative signals — not accidents.
              A missing record doesn’t just fail an audit. It can suspend authority, void insurance, and expose personal
              liability. By the time most carriers realize something is wrong, it is already on record.
            </p>
          </div>
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-[22px] md:text-[28px] font-black uppercase tracking-tight text-white leading-tight">
              Compliance failure is rarely about ignorance. It’s about operating without a system. LaunchPath exists to
              install that system before the first preventable failure occurs.
            </p>
          </div>
        </div>
      </section>

      {/* THE MATH OF AUTHORITY LOSS */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tight text-center mb-16">
          The Math of Authority Loss
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20">
          <div className="space-y-4 p-8 bg-[#001833] rounded-3xl border border-white/5">
            <p className="text-6xl font-black text-[#C5A059]">49</p>
            <p className="text-[14px] font-black uppercase tracking-widest text-slate-400">Critical Audit Failure Points</p>
          </div>
          <div className="space-y-4 p-8 bg-[#001833] rounded-3xl border border-white/5">
            <p className="text-6xl font-black text-[#C5A059]">96.4</p>
            <p className="text-[14px] font-black uppercase tracking-widest text-slate-400">Average Insurance Increase %</p>
          </div>
          <div className="space-y-4 p-8 bg-[#001833] rounded-3xl border border-white/5">
            <p className="text-6xl font-black text-[#C5A059]">10+</p>
            <p className="text-[14px] font-black uppercase tracking-widest text-slate-400">Regulatory Filings Required</p>
          </div>
        </div>

        {/* ITEM 5 (v3): PHILOSOPHICAL LINE 1 */}
        <div className="text-center py-12 italic text-[20px] md:text-[24px] text-slate-400 max-w-3xl mx-auto leading-relaxed">
          "The wise carrier builds the system before the audit. The audit only confirms what was already true."
        </div>
        
        <div className="mt-16 text-center pt-12 border-t border-white/10">
          <p className="text-[22px] md:text-[28px] font-black uppercase tracking-tight text-white">
            This is not a compliance lecture.
          </p>
          <p className="text-[22px] md:text-[28px] font-black uppercase tracking-tight text-[#C5A059]">
            This is loss prevention.
          </p>
        </div>
      </section>

      {/* ITEM 3 (v2/v3): GROUND 0 AS STEP 1 — SECTION REFRAME */}
      <section className="bg-[#0A1628] py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tight text-[#C5A059]">
            THE STANDARD BEGINS WITH GROUND 0
          </h2>
          <div className="space-y-8 text-[18px] md:text-[22px] text-slate-300 leading-relaxed">
            <p>
              Ground 0 is the orientation every carrier completes before admission is considered. It contains the
              REACH Readiness Assessment — a diagnostic that maps your current compliance exposure and
              produces a GO, WAIT, or NO-GO determination. Some carriers proceed. Some are advised to wait.
              Others are advised not to proceed at all. The standard does not begin at payment. It begins here.
            </p>
          </div>
          
          <div className="pt-8">
            <Link 
              to="/readiness" 
              className="inline-flex items-center space-x-4 bg-[#C5A059] text-[#002244] px-12 py-6 rounded-xl text-[18px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95"
            >
              <span>Begin Ground 0 → Step 1 of the LaunchPath Standard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ITEM 5 (v2): PRIMARY THREAT SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-[14px] font-black uppercase tracking-[0.4em] text-[#C5A059]">THE PRIMARY THREAT</p>
          <h2 className="text-[28px] md:text-[44px] font-black uppercase tracking-tight text-white leading-tight">
            Most New Authorities Don’t Fail Because They’re Lazy — They Fail Because They’re Unprotected.
          </h2>
          <div className="space-y-6 text-[18px] md:text-[22px] text-slate-300 leading-relaxed">
            <p>
              Authority revocations, insurance cancellations, and audit failures don’t announce themselves. By the time
              most carriers realize something is wrong, it’s already on record — on their CSA profile, in their insurance
              history, and in their FMCSA authority file. The first 90 days determine whether your authority becomes an
              asset or a liability. Not the first year. The first 90 days.
            </p>
            <p className="font-bold text-white italic">
              The regulation doesn’t know your name. It only knows what your file says. A prepared file is the only defense that works.
            </p>
          </div>
        </div>
      </section>

      {/* COMPLETE COMPLIANCE SYSTEM GRID */}
      <section className="bg-[#001833] py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tight text-center mb-16">
            Complete Compliance System Installed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Driver Qualification File System',
              'ELD & Hours-of-Service Documentation',
              'Insurance Compliance Structure',
              'Maintenance Record System',
              'DOT Registration Management',
              'Audit-Ready Filing Procedures'
            ].map((system) => (
              <div key={system} className="flex items-center gap-4 bg-[#002244] p-8 rounded-2xl border border-white/5 hover:border-[#C5A059]/30 transition-colors">
                <CheckCircle2 className="text-[#C5A059] shrink-0" size={24} />
                <span className="text-[18px] font-bold text-slate-200">{system}</span>
              </div>
            ))}
          </div>

          {/* ITEM 5 (v3): PHILOSOPHICAL LINE 3 */}
          <div className="text-center mt-20 italic text-[20px] md:text-[24px] text-slate-400 max-w-3xl mx-auto leading-relaxed">
            "This program does not make you compliant. It gives you the infrastructure to stay compliant — which is a different thing entirely."
          </div>
        </div>
      </section>

      {/* ITEM 6A (v2): THE FULL INSTITUTIONAL STANDARD (SHADOW TIER) */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <p className="text-[14px] font-black uppercase tracking-[0.4em] text-[#C5A059] text-center mb-4">THE FULL INSTITUTIONAL STANDARD</p>
        <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tight text-center mb-8">
          What Proper Implementation Actually Requires
        </h2>
        <p className="text-[18px] md:text-[22px] text-slate-400 text-center mb-16 leading-relaxed">
          When carriers pursue full compliance implementation through private consultants or compliance firms,
          the scope typically includes the following. Read it carefully — this is what your authority requires to survive.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-20">
          {[
            { title: 'Pre-authority structural validation', desc: 'confirming the operation is built correctly before the first load moves' },
            { title: 'Insurance continuity mapping', desc: 'ensuring coverage never lapses and survives carrier changes' },
            { title: 'Audit-grade document architecture', desc: 'DQ files, maintenance records, and policy manuals built to withstand federal review' },
            { title: 'Failure mode analysis', desc: 'identifying what breaks first in a new carrier operation and building guards before it does' },
            { title: 'Authority defense playbooks', desc: 'knowing exactly how to respond when FMCSA makes contact' },
            { title: 'Operational discipline systems', desc: 'the daily and weekly habits that keep a compliant operation compliant' },
            { title: 'Driver qualification monitoring', desc: 'built before a driver ever turns a key' },
            { title: '30/60/90 day checkpoints', desc: 'structured reviews that catch drift before it becomes record' }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <h4 className="text-[18px] font-black uppercase text-white flex items-center gap-3">
                <span className="text-[#C5A059] text-[14px]">{i + 1}.</span>
                {item.title}
              </h4>
              <p className="text-[16px] text-slate-400 leading-relaxed pl-7">— {item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/10 space-y-12">
          <div className="text-center">
            <p className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">EXTERNAL COST REFERENCE</p>
            <p className="text-[24px] md:text-[32px] font-black text-white">
              $5,000–$12,000+
            </p>
            <p className="text-[16px] text-slate-400 mt-2">When assembled privately through consultants, attorneys, and compliance firms.</p>
          </div>

          <div className="bg-[#001833] p-10 md:p-16 rounded-[40px] border border-white/5">
            <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] mb-6">THE LAUNCHPATH APPROACH</p>
            <p className="text-[18px] md:text-[22px] text-slate-200 leading-relaxed">
              LaunchPath delivers the same standard at a reduced rate by systematizing the process across a controlled group
              of serious carriers. The methodology doesn’t change. The delivery is structured so that more carriers can access
              it without compromising the standard. You are not getting a discounted product. You are getting structured
              access to a system that took years to build — because building it alone costs far more than this.
            </p>
          </div>
        </div>
      </section>

      {/* ITEM 6B (v2): THE FULL PENALTY TABLE */}
      <section className="bg-[#001833] py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[14px] font-black uppercase tracking-[0.4em] text-[#C5A059] text-center mb-4">THE REAL MATH</p>
          <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tight text-center mb-8">
            What FMCSA Non-Compliance Actually Costs
          </h2>
          <p className="text-[18px] md:text-[22px] text-slate-400 text-center mb-16 leading-relaxed">
            These are not hypothetical risks. These are documented regulatory and financial consequences that hit
            new carriers every year.
          </p>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#002244]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001833] border-b border-white/10">
                  <th className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-500">Violation / Failure Event</th>
                  <th className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-500 text-right">Documented Cost Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="bg-white/[0.02]"><td colSpan={2} className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Direct Penalties</td></tr>
                <tr>
                  <td className="px-8 py-6 font-bold text-slate-200">New Entrant Audit failure — authority revocation</td>
                  <td className="px-8 py-6 text-right font-black text-red-400">$5,000–$15,000+</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold text-slate-200">Out-of-service violation per vehicle</td>
                  <td className="px-8 py-6 text-right font-black text-red-400">$1,000–$16,000</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold text-slate-200">Operating without required insurance on file</td>
                  <td className="px-8 py-6 text-right font-black text-red-400">Suspension + Liability</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold text-slate-200">Improper DQ file — driver disqualified at audit</td>
                  <td className="px-8 py-6 text-right font-bold text-slate-400">Lost Revenue + Re-qualifying</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold text-slate-200">CSA score damage from recordable violations</td>
                  <td className="px-8 py-6 text-right font-bold text-slate-400">$3,000–$8,000+ Annually</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold text-slate-200">Hours of Service violation — driver fatigue citation</td>
                  <td className="px-8 py-6 text-right font-black text-red-400">$1,000–$11,000</td>
                </tr>
                <tr className="bg-emerald-500/5"><td colSpan={2} className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">The Hidden Drain</td></tr>
                <tr className="bg-emerald-500/5">
                  <td className="px-8 py-6 font-bold text-slate-200">High CSA score or Conditional safety rating</td>
                  <td className="px-8 py-6 text-right text-slate-400">Restricted Freight Access</td>
                </tr>
                <tr className="bg-emerald-500/5">
                  <td className="px-8 py-6 font-bold text-slate-200">Insurance premium increase after CSA score</td>
                  <td className="px-8 py-6 text-right font-black text-red-400">$3,000–$8,000+ Annually</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[20px] md:text-[24px] font-black text-white leading-relaxed">
              The LaunchPath 90-Day Survival System is priced at a fraction of a single compliance failure. That is not a sales
              tactic. That is arithmetic.
            </p>
          </div>
        </div>
      </section>

      {/* ITEM 7 (v2): THREE PATHS COMPARISON TABLE */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <p className="text-[14px] font-black uppercase tracking-[0.4em] text-[#C5A059] text-center mb-4">IMPLEMENTATION CONTEXT</p>
        <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tight text-center mb-16">
          Three Paths. One Decision.
        </h2>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#001833]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#002244] border-b border-white/10">
                <th className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-500">Path</th>
                <th className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-500">Typical Cost</th>
                <th className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-500">What You’re Left With</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[16px]">
              <tr>
                <td className="px-8 py-8 font-black text-white">Trial-and-error self-study</td>
                <td className="px-8 py-8 text-red-400 font-bold">$10,000–$25,000+</td>
                <td className="px-8 py-8 text-slate-400">Experience you paid too much for</td>
              </tr>
              <tr>
                <td className="px-8 py-8 font-black text-white">Private consultant / compliance firm</td>
                <td className="px-8 py-8 text-white font-bold">$5,000–$12,000</td>
                <td className="px-8 py-8 text-slate-400">Their knowledge, not your system</td>
              </tr>
              <tr className="bg-[#C5A059]/5 border-2 border-[#C5A059]">
                <td className="px-8 py-8 font-black text-[#C5A059]">LaunchPath Standard</td>
                <td className="px-8 py-8 text-[#C5A059] font-black">$5,000</td>
                <td className="px-8 py-8 text-slate-200 font-bold">Built infrastructure you own and operate — verified by the Station Custodian before your audit window closes</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[18px] font-black uppercase tracking-widest text-slate-500">
            We are not the cheapest option. We are the most systematized one.
          </p>
        </div>
      </section>

      {/* ITEM 4 (v3): FOUNDER SECTION — SOCIAL PROOF BLOCK */}
      <section className="bg-[#001833] py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div className="bg-slate-800 rounded-3xl overflow-hidden border-2 border-[#C5A059]/20 grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/5]">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vince_founder.png?alt=media&token=b5ea75d9-5252-4ac3-af5c-282eec053e7d" 
                alt="Vince Lawrence - Station Custodian" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[14px] font-black uppercase tracking-[0.4em] text-[#C5A059]">THE STANDARD CUSTODIAN</p>
                <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tight text-white leading-tight">
                  VINCE LAWRENCE
                </h2>
                <p className="text-[18px] font-bold text-slate-400 uppercase tracking-widest">Station Custodian, LaunchPath Transportation EDU</p>
              </div>
              <div className="space-y-6 text-[18px] md:text-[20px] text-slate-300 leading-relaxed">
                <p>
                  I did not come from trucking. I came from 20 years of building operational systems in manufacturing
                  environments — where a missing record was not an inconvenience, it was a liability. When I looked at
                  what new motor carriers were operating without, I recognized the failure pattern. Not ignorance. Not
                  laziness. The absence of a system. LaunchPath is the system.
                </p>
              </div>
            </div>
          </div>

          <div className="py-12 border-y border-white/10 text-center mb-16">
            <p className="text-[24px] md:text-[32px] font-black uppercase tracking-tight text-white leading-tight italic">
              “My responsibility is not to motivate carriers — it is to prevent preventable failure.”
            </p>
            <p className="text-[14px] font-bold text-slate-500 mt-4 uppercase tracking-widest">— Vince Lawrence, Station Custodian</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">U.S. NAVY</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">VETERAN</p>
            </div>
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">OSHA</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">CERTIFIED</p>
            </div>
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">20+ YRS</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">MFG MGMT & LEADERSHIP</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">FOUNDER,</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">LAUNCHPATH EDU</p>
            </div>
          </div>
        </div>
      </section>

      {/* ITEM 5 (v3): PHILOSOPHICAL LINE 2 & ADMISSION GATE */}
      <section className="py-32 px-6 md:px-12 text-center bg-[#002244]">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="italic text-[20px] md:text-[24px] text-slate-400 leading-relaxed">
            "Most carriers wait until something goes wrong to learn what should have been built before they started.
            LaunchPath exists for the ones who refuse to wait."
          </div>

          <div className="space-y-12">
            <p className="text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-slate-500">
              NOT ALL APPLICANTS ARE ACCEPTED. SOME ARE ADVISED TO WAIT. OTHERS ARE ADVISED
              NOT TO PROCEED AT ALL.
            </p>
            
            <div className="space-y-8">
              <p className="italic text-[18px] md:text-[20px] text-slate-300">
                “If this feels expensive, you are likely not ready. If it feels reasonable, you are already thinking like an operator.”
              </p>
              
              <Link 
                to="/readiness" 
                className="inline-block bg-[#C5A059] text-[#002244] px-16 py-8 rounded-xl text-[20px] md:text-[24px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl shadow-[#C5A059]/20"
              >
                REQUEST COHORT PLACEMENT →
              </Link>
            </div>

            <div className="pt-12 border-t border-white/5">
              <p className="text-[12px] text-slate-600 uppercase tracking-widest font-black">
                Current as of March 2026. Verified against ecfr.gov.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
