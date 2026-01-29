
import React from 'react';
import { 
  Shield,
  ShieldCheck, 
  Award, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Scale, 
  BarChart3, 
  Globe, 
  Mail, 
  Calendar, 
  Download,
  BookOpen,
  Anchor,
  User,
  Star,
  Zap,
  TrendingDown,
  Quote,
  Briefcase,
  FileText,
  Activity,
  UserCheck,
  ClipboardCheck,
  Search,
  Lock,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InstitutionalBadge = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/20 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-sm" role="img" aria-label={label}>
    <Icon size={16} className="text-[#D4AF37]" fill={Icon === Award ? "currentColor" : "none"} aria-hidden="true" />
    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white whitespace-nowrap">{label}</span>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-700 overflow-x-hidden">
      
      {/* SECTION 1: PURPOSE */}
      <section className="relative bg-[#F8F9FA] py-20 lg:py-32 border-b border-slate-200 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" aria-hidden="true"></div>
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <h1 id="about-intro" className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#1A1A1A] leading-tight mb-6 font-sans uppercase tracking-tight">
            The LaunchPath Standard
          </h1>
          <p className="text-sm sm:text-base lg:text-[18px] leading-relaxed text-[#555] max-w-[750px] mx-auto mb-10 font-medium">
            The LaunchPath Standard provides a systematic framework for documentation integrity and safety management systems, addressing the administrative gap between authority and federal oversight.
          </p>
          
          <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
             <p className="text-[#1E3A5F] text-sm sm:text-[16px] font-bold leading-relaxed italic">
               "The Four Pillars are the operational systems that determine whether a new carrier keeps its authority active."
             </p>
          </div>
        </div>
      </section>

      {/* REACTIVE VS ALIGNMENT */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="mb-12 sm:mb-16">
            <p className="text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">IMPLEMENTATION WINDOW</p>
            <p className="text-sm sm:text-base font-bold text-slate-500 uppercase leading-relaxed max-w-3xl">
              THE STANDARD IS ENGINEERED TO BE INSTALLED WITHIN THE FIRST 90 DAYS OF AUTHORITY. DESIGNED FOR EARLY IMPLEMENTATION, NOT LATER CORRECTION.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            {/* REACTIVE */}
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-2 border-l-4 border-slate-200 pl-6 sm:pl-8 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">REACTIVE CONDITIONS</p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] uppercase tracking-tight">Disjointed Documentation</h3>
              </div>
              <ul className="space-y-5 text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                <li className="flex items-start"><span className="mr-4 text-slate-300">—</span>Fixing files only after a mistake has already occurred.</li>
                <li className="flex items-start"><span className="mr-4 text-slate-300">—</span>Maintenance performed but not documented.</li>
                <li className="flex items-start"><span className="mr-4 text-slate-300">—</span>Audit prep starting after notification.</li>
                <li className="flex items-start"><span className="mr-4 text-slate-300">—</span>Insurance volatility driven by fragmented records.</li>
              </ul>
            </div>

            {/* ALIGNMENT */}
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-2 border-l-4 border-[#D4AF37] pl-6 sm:pl-8 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">STANDARD ALIGNMENT</p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] uppercase tracking-tight">Systematic Protection</h3>
              </div>
              <ul className="space-y-5 text-sm sm:text-base text-[#1E3A5F] font-bold leading-relaxed">
                <li className="flex items-start"><span className="mr-4 text-[#D4AF37]">•</span>Integrated safety systems installed before launch.</li>
                <li className="flex items-start"><span className="mr-4 text-[#D4AF37]">•</span>Federally aligned DQ and maintenance workflows.</li>
                <li className="flex items-start"><span className="mr-4 text-[#D4AF37]">•</span>Audit-ready posture maintained through discipline.</li>
                <li className="flex items-start"><span className="mr-4 text-[#D4AF37]">•</span>Insurer trust established through transparency.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GOVERNANCE */}
      <section className="bg-white py-20 lg:py-32 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 sm:gap-16 items-start">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 text-[#1E3A5F] mb-2 mx-auto lg:mx-0">
                <Scale size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Governance Ethic</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-tight uppercase tracking-tight">
                Foundational <br className="hidden sm:block"/><span className="text-[#D4AF37]">Operating Philosophy.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                We move carriers from Exposure to Refuge through documented compliance evidence. We view operating authority as an entrusted function that requires validation through discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {[
                { i: <Anchor />, t: "Entrusted Authority", d: "Federal authority as a stewardship function, rejecting absolute ownership for responsible custodianship." },
                { i: <ClipboardCheck />, t: "Integrity", d: "Documentation as a proxy for trust. Treating record-keeping with absolute precision." },
                { i: <ShieldCheck />, t: "Accountability", d: "Rejecting operational shortcuts even when they appear expedient or invisible to auditors." },
                { i: <TrendingDown className="rotate-180" />, t: "Restraint", d: "Stability and maturity are absolute prerequisites to commercial expansion." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]">{React.cloneElement(item.i as React.ReactElement, { size: 18 })}</div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#1E3A5F]">{item.t}</h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 sm:mt-20 p-8 sm:p-10 bg-[#1E3A5F] rounded-3xl sm:rounded-[2.5rem] relative overflow-hidden text-white">
            <p className="relative z-10 text-lg sm:text-2xl font-medium font-serif italic text-center max-w-3xl mx-auto leading-relaxed">
              "Systematic precision over the convenience of the moment."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CUSTODIANSHIP */}
      <section className="bg-[#1E3A5F] py-20 lg:py-32 text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-12 lg:gap-16 items-center">
            <div className="max-w-[360px] mx-auto lg:mx-0 w-full">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative border-4 border-white">
                <img src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" alt="Vince Lawrence" className="w-full h-auto grayscale block" />
                <div className="absolute bottom-0 left-0 w-full bg-[#1E3A5F]/90 backdrop-blur-sm py-2 text-center border-t border-white/10">
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">V. LAWRENCE | SYSTEM CUSTODIAN</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6 text-center lg:text-left">
              <span className="text-xs sm:text-sm text-[#D4AF37] font-semibold uppercase tracking-[0.1em]">Technical Stewardship</span>
              <h2 className="text-2xl sm:text-4xl font-bold">OSHA-Certified Systems Background</h2>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <InstitutionalBadge icon={Award} label="U.S. Navy Veteran" />
                <InstitutionalBadge icon={ShieldCheck} label="Certified Governance" />
              </div>

              <div className="space-y-6 text-sm sm:text-base leading-relaxed text-white/90 font-normal">
                <p>The Standard is maintained by Vince Lawrence, combining field-level operational leadership with the discipline required for federal audits.</p>
                <p className="border-l-4 border-[#D4AF37] pl-5 italic text-[#D4AF37] font-medium leading-relaxed text-left">
                  "Compliance is the byproduct of an operating standard that precedes momentum."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SCOPE SECTION */}
      <section className="bg-white py-20 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 text-center space-y-10 sm:space-y-12">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1A1A1A] uppercase tracking-tight">SCOPE OF THE STANDARD</h2>
          <p className="text-base sm:text-lg text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">
            LaunchPath is an educational entity. We do not provide legal or insurance advice. The standard is designed to assist carriers through discipline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6">
            {[
              { i: <Shield />, t: "TRUTH", d: "Rejecting speculative promises for regulatory accuracy." },
              { i: <Scale />, t: "BOUNDARIES", d: "Users are responsible for implementation and defense." },
              { i: <Target />, t: "STEWARDSHIP", d: "Operations as legacies entrusted to the steward." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-8 sm:p-10 shadow-sm text-left space-y-4">
                <div className="text-[#1E3A5F]">{React.cloneElement(item.i as React.ReactElement, { size: 24 })}</div>
                <h3 className="text-base font-black text-[#1E3A5F] uppercase">{item.t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="pt-16 sm:pt-32">
             <Link to="/pricing" className="inline-flex items-center justify-center bg-[#1E3A5F] text-white px-10 py-5 sm:px-20 sm:py-7 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-sm shadow-xl hover:bg-steel-blue transition-all active:scale-95">
               INITIATE ADMISSION
             </Link>
             <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mt-16 max-w-2xl mx-auto">
               END OF INSTITUTIONAL STATEMENT — SUBJECT TO PERIODIC REVIEW.
             </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#0D1B2E] py-8 border-t border-white/5 text-center text-white/40 text-[10px] sm:text-[12px]">
        <p>© {new Date().getFullYear()} LaunchPath. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
