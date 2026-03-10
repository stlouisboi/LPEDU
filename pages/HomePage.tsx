import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Lock,
  FileText,
  Scale,
  Zap
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-[#C5A059] selection:text-[#002244]">
      
      {/* HERO SECTION - EMERGENT DESIGN (Left-Aligned + Data Sidebar) */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Content (The 90-Day Standard) */}
          <div className="lg:w-2/3 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-4">
              <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500 border-l-2 border-[#C5A059] pl-4">
                90-DAY COMPLIANCE OPERATING STANDARD — NEW MOTOR CARRIER AUTHORITIES
              </p>
              <h1 className="text-[40px] md:text-[72px] font-black uppercase tracking-tighter leading-[0.95]">
                The 90-Day Compliance Operating Standard for new motor carrier authorities.
              </h1>
            </div>

            <div className="space-y-8 text-[18px] md:text-[22px] text-slate-300 max-w-2xl leading-relaxed font-medium">
              <p>
                LaunchPath is not a course. It installs the compliance infrastructure,
                financial controls, and governance systems required to survive the
                FMCSA New Entrant period.
              </p>
              <p className="text-white">
                New authorities do not fail because they lack ambition. <br/>
                They fail because operational systems were never installed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                to="/readiness" 
                className="w-full sm:w-auto bg-[#E85D04] text-white px-12 py-6 rounded-lg text-[18px] font-black uppercase tracking-widest hover:bg-white hover:text-[#002244] transition-all active:scale-95 shadow-2xl shadow-[#E85D04]/20"
              >
                BEGIN READINESS TEST
              </Link>
              <p className="text-[14px] font-bold text-slate-500 uppercase tracking-widest">
                Free. Takes approximately 12 minutes.
              </p>
            </div>
          </div>

          {/* Right Sidebar (The FMCSA Brief) */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-[#0A1628]/80 backdrop-blur-sm border border-white/10 p-8 rounded-2xl space-y-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C5A059] to-transparent"></div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">FMCSA NEW ENTRANT BRIEF</p>
                <div className="h-px w-12 bg-[#C5A059]"></div>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Audit window', value: '12–24 months' },
                  { label: 'Required filings', value: '10+' },
                  { label: 'Documented failure points', value: '49' },
                  { label: 'Standard implementation', value: '90 days' },
                  { label: 'Average audit pass rate', value: '94%', highlight: true }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4 group-hover:border-white/20 transition-colors">
                    <p className="text-[13px] font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
                    <p className={`text-[18px] font-black ${stat.highlight ? 'text-[#C5A059]' : 'text-white'}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <p className="text-[13px] text-slate-400 leading-relaxed italic pt-4">
                The New Entrant period has a defined audit window, documented failure patterns, and
                predictable consequences. The carriers who survive it are not more talented. They are more
                prepared.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUR PILLARS SECTION */}
      <section className="bg-[#020617] py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          
          <div className="max-w-3xl space-y-6">
            <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">THE STANDARD</p>
            <h2 className="text-[32px] md:text-[56px] font-black uppercase tracking-tight leading-tight">
              The Four Pillars of the Standard.
            </h2>
            <p className="text-[18px] md:text-[22px] text-slate-400 leading-relaxed">
              These are not modules. They are the four pillars of the LaunchPath Standard. Each one
              addresses a documented failure pattern that ends new carrier authorities in their first 12
              months of operation. All four are installed simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { 
                num: '01', 
                title: 'Authority Protection', 
                desc: 'The MC number survives its first 18 months. The New Entrant period has defined audit triggers, CSA scoring thresholds, and...' 
              },
              { 
                num: '02', 
                title: 'Insurance Continuity', 
                desc: 'Coverage stays active. Rates stay manageable. A single lapse suspends authority automatically. The Standard installs the...' 
              },
              { 
                num: '03', 
                title: 'Compliance Backbone', 
                desc: 'Documentation is built to audit standard before the auditor calls. Driver qualification files, HOS records, maintenance logs,...' 
              },
              { 
                num: '04', 
                title: 'Cash-Flow Oxygen', 
                desc: 'Real cost per mile is established before the first dispatch. Most new authorities run at a loss in the first 90 days without...' 
              }
            ].map((pillar, i) => (
              <div key={i} className="space-y-6 group">
                <p className="text-[14px] font-black text-slate-600 group-hover:text-[#C5A059] transition-colors">{pillar.num}</p>
                <h4 className="text-[20px] font-black uppercase tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">{pillar.title}</h4>
                <p className="text-slate-400 leading-relaxed text-[16px]">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION (Item 4 v3 with Vincent.png) */}
      <section className="bg-[#001833] py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div className="bg-slate-800 rounded-3xl overflow-hidden border-2 border-[#C5A059]/20 grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/5] relative">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vince_founder.png?alt=media&token=b5ea75d9-5252-4ac3-af5c-282eec053e7d" 
                alt="Vince Lawrence - Station Custodian" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001833] via-transparent to-transparent opacity-60"></div>
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
            {[
              { label: 'U.S. NAVY', sub: 'VETERAN' },
              { label: 'OSHA', sub: 'CERTIFIED' },
              { label: '20+ YRS', sub: 'MFG MGMT & LEADERSHIP' },
              { label: 'FOUNDER,', sub: 'LAUNCHPATH EDU' }
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i < 3 ? 'md:border-r border-white/10' : ''} px-4`}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">{item.label}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL ADMISSION GATE */}
      <section className="py-32 px-6 md:px-12 text-center bg-[#020617]">
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
                className="inline-block bg-[#E85D04] text-white px-16 py-8 rounded-xl text-[20px] md:text-[24px] font-black uppercase tracking-widest hover:bg-white hover:text-[#002244] transition-all active:scale-95 shadow-2xl shadow-[#E85D04]/20"
              >
                REQUEST COHORT PLACEMENT →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
