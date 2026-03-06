import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Scale, 
  Clock,
  ShieldAlert,
  Gavel
} from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "The Standard | LaunchPath Transportation EDU";
  }, []);

  return (
    <div className="bg-[#002244] text-white font-sans overflow-x-hidden selection:bg-[#C5A059] selection:text-[#002244]">
      
      {/* HERO SECTION - The Foreman of the Standard */}
      <section className="relative min-h-[80vh] flex flex-col lg:flex-row overflow-hidden border-b border-white/5">
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 sm:p-12 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative">
          <div className="relative z-10 max-w-2xl space-y-10 animate-reveal-up">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                THE <br/>
                <span className="text-[#C5A059] italic">STANDARD</span> <br/>
                CUSTODIAN.
              </h1>
            </div>

            <div className="space-y-8 text-lg md:text-[22px] text-slate-300 font-medium leading-relaxed max-w-xl">
              <p className="font-bold text-white">
                LaunchPath is an institutional operating standard for new motor carriers, not a course or coaching program.
              </p>
              <p>
                The standard exists to prevent terminal failure from authority revocation, insurance lapse, and cash-flow asphyxiation. It requires compliance infrastructure before operational dispatch.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] bg-slate-800 relative min-h-[500px] lg:min-h-0">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vince_founder.png?alt=media&token=b5ea75d9-5252-4ac3-af5c-282eec053e7d" 
            alt="Vince Lawrence - Station Custodian" 
            className="w-full h-full object-cover grayscale brightness-75 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244] via-transparent to-transparent lg:hidden"></div>
        </div>
      </section>

      {/* ITEM 1: CREDENTIALS BAR */}
      <section className="bg-[#001833] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 px-4">
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">U.S. NAVY</p>
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">VETERAN</p>
            </div>
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 px-4">
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">OSHA</p>
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">CERTIFIED</p>
            </div>
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 px-4">
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">20+ YRS</p>
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">MANUFACTURING</p>
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">MANAGEMENT & LEADERSHIP</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">FOUNDER,</p>
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C5A059] leading-tight">LAUNCHPATH EDU</p>
            </div>
          </div>
        </div>
      </section>

      {/* ITEM 2: FOUNDER SECTION — QUALIFICATION STATEMENT */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-2">
            <p className="text-[14px] font-black uppercase tracking-[0.4em] text-[#C5A059]">THE STANDARD CUSTODIAN</p>
            <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tight text-white leading-tight">
              VINCE LAWRENCE
            </h2>
            <p className="text-[18px] font-bold text-slate-400 uppercase tracking-widest">Station Custodian, LaunchPath Transportation EDU</p>
          </div>

          <div className="space-y-8 text-[18px] md:text-[22px] text-slate-300 leading-relaxed">
            <p>
              I did not come from trucking. I came from 20 years of building and leading operational systems in
              manufacturing environments — where documented processes were the difference between a compliant
              operation and a costly one, and where leadership meant being accountable for systems other people ran.
            </p>
            <p>
              When I looked at what new motor carriers were operating without in their first 90 days, I recognized the
              same failure pattern I had watched surface on the plant floor. Not ignorance. Not laziness. The absence
              of a system. LaunchPath is built from that pattern recognition. The names are different. The failure
              modes are not.
            </p>
          </div>

          <div className="py-12 border-y border-white/10 text-center">
            <p className="text-[22px] md:text-[28px] font-black uppercase tracking-tight text-white leading-tight italic">
              “My responsibility is not to motivate carriers — it is to prevent preventable failure.”
            </p>
            <p className="text-[14px] font-bold text-slate-500 mt-4 uppercase tracking-widest">— Vince Lawrence, Station Custodian</p>
          </div>

          <div className="space-y-8 text-[18px] md:text-[22px] text-slate-300 leading-relaxed">
            <p>
              The Navy runs on documented procedure. Manufacturing operations at the leadership level run on
              system accountability. OSHA certification is not a trucking credential — it is a regulatory philosophy
              credential. FMCSA and OSHA operate from the same foundation: industries that will not self-regulate
              require documented systems, audit mechanisms, and consequence structures. That is the environment I
              built systems in for two decades. That is the background LaunchPath is built from.
            </p>
          </div>
        </div>
      </section>

      {/* OPERATIONAL DOCTRINE SECTION */}
      <section className="bg-[#0A1628] py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-2">
              <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">48 CFR SUBPART</p>
              <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tight text-white">OPERATIONAL DOCTRINE</h2>
            </div>
            <p className="text-[14px] font-black text-[#C5A059] uppercase tracking-widest">Version 4.2 • Authority: Station Custodian</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                id: '§ 1.6', 
                title: 'Diagnostic Precedence Rule', 
                desc: 'Teaching before diagnosing builds systems that don’t fit the actual operation. The assessment comes first. Always.' 
              },
              { 
                id: '§ 1.8', 
                title: 'Stewardship Refusal Authority', 
                desc: 'Carriers who enroll before they are ready don’t just waste money. They build on a broken foundation. This standard refuses admission when readiness is absent.' 
              },
              { 
                id: '§ 1.9', 
                title: 'Responsibility Prioritization', 
                desc: 'Admission based on willingness to pay rather than readiness to build weakens the standard for every carrier in the cohort. Readiness determines admission. Not urgency.' 
              },
              { 
                id: '§ 2.1', 
                title: 'Governance Before Growth', 
                desc: 'Operational scale without established governance creates terminal liability. Governance must be installed before capacity is expanded.' 
              }
            ].map((item) => (
              <div key={item.id} className="space-y-4 p-8 bg-[#002244] rounded-3xl border border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-[#C5A059] font-black text-lg">{item.id}</span>
                  <h4 className="text-[18px] font-black uppercase tracking-tight text-white">{item.title}</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITEM 3: INSTITUTIONAL BOUNDARIES SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-[14px] font-black uppercase tracking-[0.4em] text-[#C5A059]">INSTITUTIONAL BOUNDARIES</p>
            <h2 className="text-[32px] md:text-[40px] font-black uppercase tracking-tight text-white leading-tight">
              What LaunchPath Does Not Provide
            </h2>
            <p className="text-[18px] md:text-[22px] text-slate-400 leading-relaxed">
              Knowing what we don’t do is as important as knowing what we do. LaunchPath is a compliance
              education and implementation system. We build infrastructure. We do not operate your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Legal advice or legal representation',
              'Dispatch services or load booking',
              'Insurance brokerage or policy placement',
              'Guaranteed FMCSA audit outcomes',
              'Tax preparation or financial advisory',
              'Ongoing consulting retainers or managed services',
              'Revenue generation coaching or freight strategies'
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 text-slate-300">
                <span className="text-[#C5A059] font-black">—</span>
                <span className="text-[16px] md:text-[18px] font-bold">{item}</span>
              </div>
            ))}
          </div>

          <p className="pt-12 text-[18px] md:text-[20px] text-slate-400 italic text-center">
            These boundaries are not limitations — they are the reason the LaunchPath Standard maintains its integrity.
          </p>
        </div>
      </section>

      {/* FINAL ADMISSION GATE */}
      <section className="py-32 px-6 md:px-12 text-center bg-[#001833] border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-12">
            <p className="text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-slate-500">
              NOT ALL APPLICANTS ARE ACCEPTED. SOME ARE ADVISED TO WAIT. OTHERS ARE ADVISED
              NOT TO PROCEED AT ALL.
            </p>
            
            <div className="space-y-8">
              <p className="italic text-[18px] md:text-[22px] text-slate-300">
                “If this feels expensive, you are likely not ready. If it feels reasonable, you are already thinking like an operator.”
              </p>
              
              <Link 
                to="/readiness" 
                className="inline-block bg-[#C5A059] text-[#002244] px-16 py-8 rounded-xl text-[20px] md:text-[24px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl shadow-[#C5A059]/20"
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

export default AboutPage;
