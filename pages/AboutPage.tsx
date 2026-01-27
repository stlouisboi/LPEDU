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
  <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/20 px-5 py-3 rounded-xl shadow-sm" role="img" aria-label={label}>
    <Icon size={18} className="text-[#D4AF37]" fill={Icon === Award ? "currentColor" : "none"} aria-hidden="true" />
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">{label}</span>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-700">
      
      {/* SECTION 1: PURPOSE OF THE LAUNCHPATH STANDARD */}
      <section className="relative bg-[#F8F9FA] py-24 lg:py-32 border-b border-slate-200 overflow-hidden text-center" aria-labelledby="about-intro">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" aria-hidden="true"></div>
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <h1 id="about-intro" className="text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-tight mb-6 font-sans uppercase tracking-tight">
            Institutional Statement of the LaunchPath Standard
          </h1>
          <p className="text-base lg:text-[18px] leading-[1.7] text-[#555] max-w-[750px] mx-auto mb-10 font-medium">
            The LaunchPath Standard provides a systematic framework for documentation integrity and safety management systems. It is designed to address the critical administrative gap between the issuance of operating authority and the successful navigation of federal oversight.
          </p>
          
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
             <p className="text-[#1E3A5F] text-[16px] font-bold leading-relaxed italic">
               "The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen."
             </p>
          </div>
        </div>
      </section>

      {/* REACTIVE VS ALIGNMENT COMPARISON SECTION */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="mb-16">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">Implementation Window</p>
            <p className="text-base font-bold text-slate-500 uppercase leading-relaxed max-w-3xl">
              THE LAUNCHPATH STANDARD IS ENGINEERED TO BE INSTALLED WITHIN THE FIRST 90 DAYS OF AUTHORITY. THIS STANDARD IS DESIGNED FOR EARLY IMPLEMENTATION, NOT LATER CORRECTION.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Reactive side */}
            <div className="space-y-10">
              <div className="space-y-2 border-l-4 border-slate-200 pl-8 py-2">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">REACTIVE DEFICIENCIES</p>
                <h3 className="text-2xl font-bold text-[#1A1A1A] uppercase tracking-tight">Disjointed Documentation</h3>
              </div>
              <ul className="space-y-6 text-slate-500 font-medium leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-4 text-slate-300">—</span>
                  Fragmented safety records managed as post-facto tasks.
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-slate-300">—</span>
                  Undocumented maintenance cycles creating roadside exposure.
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-slate-300">—</span>
                  Reactive response to federal audit scheduling.
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-slate-300">—</span>
                  High volatility in insurance premium stability.
                </li>
              </ul>
            </div>

            {/* Alignment side */}
            <div className="space-y-10">
              <div className="space-y-2 border-l-4 border-[#D4AF37] pl-8 py-2">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">STANDARD ALIGNMENT</p>
                <h3 className="text-2xl font-bold text-[#1E3A5F] uppercase tracking-tight">Systematic Protection</h3>
              </div>
              <ul className="space-y-6 text-[#1E3A5F] font-bold leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-4 text-[#D4AF37]">•</span>
                  Integrated safety management systems installed at launch.
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-[#D4AF37]">•</span>
                  Federally-aligned DQ and maintenance workflows.
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-[#D4AF37]">•</span>
                  Audit-ready posture maintained through daily administrative discipline.
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-[#D4AF37]">•</span>
                  Enhanced insurer trust through transparent system records.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE GOVERNANCE ETHIC */}
      <section className="bg-white py-24 lg:py-32 border-b border-slate-100" aria-labelledby="philosophy-heading">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-[#1E3A5F] mb-2">
                <Scale size={24} aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Governance Ethic</span>
              </div>
              <h2 id="philosophy-heading" className="text-3xl font-bold text-[#1A1A1A] leading-tight uppercase tracking-tight">
                Foundational Operating <span className="text-[#D4AF37]">Philosophy.</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                The LaunchPath Standard is governed by a rigorous ethic of fiduciary responsibility. We move carriers from a state of Exposure to a state of Refuge through documented, verifiable compliance evidence. We view operating authority not as a right of ownership, but as an entrusted function that requires continuous validation through administrative discipline.
              </p>
              <p className="text-[10px] text-slate-400 italic uppercase tracking-[0.3em] font-black">
                “Pride leads to conflict; those who take advice are wise.” — Proverbs 13:10
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]" aria-hidden="true">
                  <Anchor size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Entrusted Authority</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  We frame federal authority as a stewardship function. The standard rejects the concept of absolute ownership in favor of responsible custodianship, where the carrier's existence is justified by its adherence to public safety standards.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]" aria-hidden="true">
                  <ClipboardCheck size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Integrity Under Inspection</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Documentation is treated as a proxy for trust. The standard mandates absolute precision in record-keeping, emphasizing that accountability exists regardless of whether an enforcement official is currently monitoring the data.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]" aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Accountability Beyond Enforcement</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Compliance is framed as a moral accountability protocol. We move beyond mere regulatory obligation to an internal standard of excellence that rejects operational shortcuts, even when they appear expedient or invisible to auditors.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]" aria-hidden="true">
                  <TrendingDown size={20} className="rotate-180" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Disciplined Restraint</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  The standard posits that administrative stability and system maturity are absolute prerequisites to commercial expansion. We prioritize the hardening of existing systems over the pursuit of rapid, un-tempered growth.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 p-10 bg-[#1E3A5F] rounded-[2.5rem] relative overflow-hidden text-white" role="complementary" aria-label="Operating Standard Quote">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" aria-hidden="true"></div>
            <p className="relative z-10 text-xl md:text-2xl font-medium font-serif italic text-center max-w-3xl mx-auto leading-relaxed">
              "The LaunchPath Standard exists to ensure that every decision is filtered through a framework of systematic precision, placing the integrity of the operation above the convenience of the moment."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEM CUSTODIANSHIP & TECHNICAL OVERSIGHT */}
      <section className="bg-[#1E3A5F] py-20 lg:py-32" aria-labelledby="custodian-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-16 items-start">
            
            <div className="flex flex-col items-center lg:items-start max-w-[410px] mx-auto lg:mx-0 w-full">
              <div className="bg-white p-0 rounded-[16px] shadow-xl overflow-hidden w-full relative group border-4 border-white">
                <img 
                  src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                  alt="Vince Lawrence, OSHA-Certified Safety Professional and Custodian of the LaunchPath Standard" 
                  className="w-full h-auto grayscale block"
                />
                <div className="absolute bottom-0 left-0 w-full bg-[#1E3A5F]/90 backdrop-blur-sm py-3 text-center border-t border-white/10">
                  <p className="text-[12px] font-bold text-white uppercase tracking-[0.02em]">V. LAWRENCE | SYSTEM CUSTODIAN</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <span className="text-[14px] text-[#D4AF37] font-semibold uppercase tracking-[0.1em] mb-4">Technical Stewardship</span>
              <h2 id="custodian-heading" className="text-[24px] lg:text-[32px] font-bold text-white mb-8">OSHA-Certified Safety Systems Background</h2>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <InstitutionalBadge icon={Award} label="U.S. Navy Veteran Owned" />
                <InstitutionalBadge icon={ShieldCheck} label="Governance Standards Active" />
              </div>

              <div className="space-y-6 text-[16px] leading-[1.7] text-white/90 font-normal">
                <p>
                  The LaunchPath Standard is maintained by Vince Lawrence, an OSHA-Certified Safety Professional with over 20 years of experience in the architecture and oversight of compliance systems for organizations supporting 1,200+ employees.
                </p>
                <p>
                  His background provides the technical foundation for the standard, combining field-level operational leadership with the rigorous administrative discipline required to satisfy federal safety audits and insurance underwriting scrutiny.
                </p>
                
                <p className="border-l-4 border-[#D4AF37] pl-5 italic text-[#D4AF37] text-[17px] my-8 font-medium leading-relaxed">
                  "Systematic compliance is not a reactive event; it is the byproduct of an installed operating standard that precedes momentum."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCOPE OF THE STANDARD SECTION */}
      <section className="bg-white py-24 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 text-center space-y-12">
          <h2 className="text-6xl lg:text-7xl font-black text-[#1A1A1A] uppercase tracking-tighter">SCOPE OF THE STANDARD</h2>
          
          <p className="text-lg text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">
            LaunchPath is a standards organization and educational entity. We do not provide legal, tax, financial, or insurance advice. The standard is designed to assist carriers in meeting federal regulatory expectations through systematic documentation and operational discipline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all space-y-6 text-left">
              <Shield className="text-[#1E3A5F]" size={28} />
              <h3 className="text-lg font-black text-[#1E3A5F] uppercase tracking-tight">TRUTH AND ACCURACY</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                The standard rejects speculative or hyper-promotional promises in favor of regulatory accuracy.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all space-y-6 text-left">
              <Scale className="text-[#1E3A5F]" size={28} />
              <h3 className="text-lg font-black text-[#1E3A5F] uppercase tracking-tight">COMPLIANCE BOUNDARIES</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Users are responsible for the individual implementation and defense of their compliance systems.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all space-y-6 text-left">
              <Target className="text-[#1E3A5F]" size={28} />
              <h3 className="text-lg font-black text-[#1E3A5F] uppercase tracking-tight">STEWARDSHIP</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Operations are viewed as legacies entrusted to the steward for maintenance and growth.
              </p>
            </div>
          </div>

          <div className="pt-20">
            <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-12 lg:p-20 space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 -translate-y-32 blur-3xl opacity-50"></div>
               <h3 className="text-2xl font-black text-[#1E3A5F] uppercase tracking-tight relative z-10">HOW THE LAUNCHPATH STANDARD IS DELIVERED TODAY</h3>
               <p className="text-base text-slate-500 font-medium max-w-2xl mx-auto relative z-10">
                 The standard is delivered through a structured 90-Day Compliance Operating Standard for new motor carriers seeking administrative resilience.
               </p>
               <div className="pt-6 relative z-10">
                 <Link to="/readiness" className="inline-flex items-center space-x-3 text-[#1E3A5F] font-black uppercase tracking-widest text-[11px] hover:underline group">
                    <span>VIEW ADMISSION PROTOCOL</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
            </div>
          </div>

          <div className="pt-32 space-y-8">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Technical or Partnership Inquiries</p>
            <div className="h-px w-full bg-slate-100"></div>
            
            <div className="py-12">
               <Link to="/pricing" className="inline-flex items-center justify-center bg-[#1E3A5F] text-white px-20 py-8 rounded-full font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-steel-blue transition-all active:scale-95">
                 INITIATE ADMISSION
               </Link>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-10">
                 ADMISSION IS SELECTIVE AND BASED ON STRUCTURAL READINESS VERIFICATION.
               </p>
            </div>
          </div>

          <div className="pt-32 pb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 max-w-2xl mx-auto leading-loose">
              END OF INSTITUTIONAL STATEMENT — THE LAUNCHPATH STANDARD IS MAINTAINED UNDER DOCUMENTED GOVERNANCE AND SUBJECT TO PERIODIC REVIEW.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="bg-[#0D1B2E] py-12 border-t border-white/5" role="contentinfo">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-white/50 text-[13px]">
          <p className="mb-6 font-medium">© {new Date().getFullYear()} LaunchPath Transportation EDU. All Rights Reserved. System Integrity Protocols Active.</p>
          <nav className="flex justify-center space-x-8 font-bold uppercase tracking-widest text-[10px]" aria-label="About Footer Navigation">
            <Link to="/learning-path" className="hover:text-white transition-colors">Operating Path</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Regulatory Disclaimer</Link>
            <Link to="/contact" className="hover:text-white transition-colors">System Support</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
};

export default AboutPage;