
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
  ClipboardCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InstitutionalBadge = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/20 px-5 py-3 rounded-xl shadow-sm">
    <Icon size={18} className="text-[#D4AF37]" fill={Icon === Award ? "currentColor" : "none"} />
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">{label}</span>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-700">
      
      {/* SECTION 1: PURPOSE OF THE LAUNCHPATH STANDARD */}
      <section className="relative bg-[#F8F9FA] py-24 lg:py-32 border-b border-slate-200 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          <h1 className="text-[32px] lg:text-[42px] font-bold text-[#1A1A1A] leading-[1.2] mb-6 font-sans uppercase tracking-tight">
            Institutional Statement of the LaunchPath Standard
          </h1>
          <p className="text-base lg:text-[18px] leading-[1.7] text-[#555] max-w-[750px] mx-auto mb-10 font-medium">
            The LaunchPath Standard provides a systematic framework for documentation integrity and safety management systems. It is designed to address the critical administrative gap between the issuance of operating authority and the successful navigation of federal oversight.
          </p>
          
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
             <p className="text-[#1E3A5F] text-[16px] font-bold leading-relaxed">
               Operating Governance: LaunchPath functions under a framework of stewardship, documentation precision, and institutional accountability to lawful regulatory authorities.
             </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE GOVERNANCE ETHIC */}
      <section className="bg-white py-24 lg:py-32 border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-[#1E3A5F] mb-2">
                <Scale size={24} />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Governance Ethic</span>
              </div>
              <h2 className="text-3xl font-bold text-[#1A1A1A] leading-tight uppercase tracking-tight">
                Foundational Operating <span className="text-[#D4AF37]">Philosophy.</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                The LaunchPath Standard is governed by a rigorous ethic of fiduciary responsibility. We move carriers from a state of Exposure to a state of Refuge through documented, verifiable compliance evidence. We view operating authority not as a right of ownership, but as an entrusted function that requires continuous validation through administrative discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]">
                  <Anchor size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Entrusted Authority</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  We frame federal authority as a stewardship function. The standard rejects the concept of absolute ownership in favor of responsible custodianship, where the carrier's existence is justified by its adherence to public safety standards.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]">
                  <ClipboardCheck size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Integrity Under Inspection</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Documentation is treated as a proxy for trust. The standard mandates absolute precision in record-keeping, emphasizing that accountability exists regardless of whether an enforcement official is currently monitoring the data.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Accountability Beyond Enforcement</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Compliance is framed as a moral accountability protocol. We move beyond mere regulatory obligation to an internal standard of excellence that rejects operational shortcuts, even when they appear expedient or invisible to auditors.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-fit text-[#1E3A5F]">
                  <TrendingDown size={20} className="rotate-180" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1E3A5F]">Disciplined Restraint</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  The standard posits that administrative stability and system maturity are absolute prerequisites to commercial expansion. We prioritize the hardening of existing systems over the pursuit of rapid, un-tempered growth.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 p-10 bg-[#1E3A5F] rounded-[2.5rem] relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <p className="relative z-10 text-xl md:text-2xl font-medium font-serif italic text-center max-w-3xl mx-auto leading-relaxed">
              "The LaunchPath Standard exists to ensure that every decision is filtered through a framework of systematic precision, placing the integrity of the operation above the convenience of the moment."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEM CUSTODIANSHIP & TECHNICAL OVERSIGHT */}
      <section className="bg-[#1E3A5F] py-20 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-16 items-start">
            
            <div className="flex flex-col items-center lg:items-start max-w-[410px] mx-auto lg:mx-0 w-full">
              <div className="bg-white p-0 rounded-[16px] shadow-xl overflow-hidden w-full relative group border-4 border-white">
                <img 
                  src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                  alt="Vince Lawrence, Custodian of the LaunchPath Standard" 
                  className="w-full h-auto grayscale block"
                />
                <div className="absolute bottom-0 left-0 w-full bg-[#1E3A5F]/90 backdrop-blur-sm py-3 text-center border-t border-white/10">
                  <p className="text-[12px] font-bold text-white uppercase tracking-[0.02em]">V. LAWRENCE | SYSTEM CUSTODIAN</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <span className="text-[14px] text-[#D4AF37] font-semibold uppercase tracking-[0.1em] mb-4">Technical Stewardship</span>
              <h2 className="text-[24px] lg:text-[32px] font-bold text-white mb-8">OSHA-Certified Safety Systems Background</h2>
              
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

      {/* SECTION 4: ENFORCEMENT REALITY & REGULATORY EXPOSURE */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight">The Enforcement Gap</h2>
            <p className="text-base lg:text-[17px] leading-[1.6] text-[#666] max-w-[900px] mx-auto font-medium">
              Data suggests that new motor carriers face the highest probability of operational failure within the initial 18-month New Entrant phase. This failure is often attributed to administrative erosion and the lack of a formalized safety management system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: <FileText size={32} className="text-[#1E3A5F]" />, 
                title: "Audit Exposure", 
                body: "LaunchPath identifies and mitigates 'The 16 Deadly Sins'—the primary documentation gaps that trigger FMCSA enforcement actions and safety rating downgrades." 
              },
              { 
                icon: <ShieldCheck size={32} className="text-[#1E3A5F]" />, 
                title: "Underwriting Scrutiny", 
                body: "The standard is aligned with the rigorous documentation requirements of primary liability and cargo insurers, aiming to prevent policy cancellations due to non-compliance." 
              },
              { 
                icon: <Activity size={32} className="text-[#1E3A5F]" />, 
                title: "Operational Integrity", 
                body: "By installing standard operating procedures for Driver Qualification (DQ) and Hours of Service (HOS), the system ensures that compliance is a continuous business function." 
              },
              { 
                icon: <Scale size={32} className="text-[#1E3A5F]" />, 
                title: "Regulatory Alignment", 
                body: "The standard functions as a bridge between federal CFR requirements and the practical execution of a small-fleet motor carrier operation." 
              }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-[#E5E5E5] rounded-[12px] p-8 shadow-sm hover:shadow-md transition-all">
                <div className="mb-6">{card.icon}</div>
                <h3 className="text-[20px] font-bold text-[#1E3A5F] mb-4 uppercase tracking-tighter">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#555] font-medium">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: DEFINING THE OPERATING STANDARD (FOUR PILLARS) */}
      <section className="bg-[#F8F9FA] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-8 uppercase tracking-tight">The LaunchPath Operating Standard</h2>
          <p className="text-base lg:text-[17px] leading-[1.7] text-[#666] max-w-[1000px] mb-8 font-medium italic">
            "The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen."
          </p>
          <p className="text-sm text-slate-500 font-bold mb-16 uppercase tracking-widest leading-relaxed">
            The LaunchPath standard is engineered to be installed within the first 90 days of authority. This standard is designed for early implementation, not later correction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-l-[3px] border-[#DDD] pl-8 space-y-6">
              <span className="text-[13px] text-[#888] font-bold uppercase tracking-[0.2em] block">Reactive Deficiencies</span>
              <h3 className="text-[22px] font-bold text-[#1E3A5F]">Disjointed Documentation</h3>
              <ul className="space-y-4 text-[15px] leading-[1.7] text-[#555] font-medium">
                <li>Fragmented safety records managed as post-facto tasks.</li>
                <li>Undocumented maintenance cycles creating roadside exposure.</li>
                <li>Reactive response to federal audit scheduling.</li>
                <li>High volatility in insurance premium stability.</li>
              </ul>
            </div>

            <div className="border-l-[3px] border-[#D4AF37] pl-8 space-y-6">
              <span className="text-[13px] text-[#888] font-bold uppercase tracking-[0.2em] block">Standard Alignment</span>
              <h3 className="text-[22px] font-bold text-[#1E3A5F]">Systematic Protection</h3>
              <ul className="space-y-4 text-[15px] leading-[1.7] text-[#555] font-medium">
                <li>Integrated safety management systems installed at launch.</li>
                <li>Federally-aligned DQ and maintenance workflows.</li>
                <li>Audit-ready posture maintained through daily administrative discipline.</li>
                <li>Enhanced insurer trust through transparent system records.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ETHICAL USE, SCOPE & LIMITATIONS */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-8 uppercase tracking-tight">Scope of the Standard</h2>
          
          <div className="space-y-6 text-[17px] leading-[1.7] text-[#555] font-medium mb-16">
            <p>
              LaunchPath is a standards organization and educational entity. We do not provide legal, tax, financial, or insurance advice. The standard is designed to assist carriers in meeting federal regulatory expectations through systematic documentation and operational discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20">
            {[
              { icon: <Shield size={24} />, title: "Truth and Accuracy", desc: "The standard rejects speculative or hyper-promotional promises in favor of regulatory accuracy." },
              { icon: <Scale size={24} />, title: "Compliance Boundaries", desc: "Users are responsible for the individual implementation and defense of their compliance systems." },
              { icon: <Target size={24} />, title: "Stewardship", desc: "Operations are viewed as legacies entrusted to the steward for maintenance and growth." }
            ].map((col, i) => (
              <div key={i} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-[#1E3A5F]">{col.icon}</div>
                <h4 className="text-[18px] font-bold text-[#1E3A5F] uppercase tracking-tighter">{col.title}</h4>
                <p className="text-[14px] leading-[1.6] text-[#666]">{col.desc}</p>
              </div>
            ))}
          </div>

          {/* Delivery Bridge */}
          <div className="max-w-2xl mx-auto p-12 bg-slate-50 border border-slate-200 rounded-[3rem] text-center">
            <h3 className="text-xl font-bold text-authority-blue uppercase tracking-tight mb-4">How the LaunchPath Standard Is Delivered Today</h3>
            <p className="text-sm text-slate-600 font-medium mb-8 leading-relaxed">
              The standard is delivered through a structured 90-Day Compliance Operating Standard for new motor carriers seeking administrative resilience.
            </p>
            <Link to="/pricing" className="inline-flex items-center text-authority-blue font-black uppercase tracking-widest text-[10px] hover:underline group">
              View Admission protocol <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-12">
            <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-authority-blue transition-colors">
              Technical or partnership inquiries
            </Link>
          </div>

          {/* Bottom CTA Refinement */}
          <div className="mt-24 pt-24 border-t border-slate-100 space-y-8 flex flex-col items-center">
            <Link 
              to="/pricing" 
              className="bg-authority-blue text-white px-16 py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center"
            >
              Initiate Admission
            </Link>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Admission is selective and based on structural readiness verification.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CLOSING MARKER */}
      <section className="bg-white py-16 border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 leading-relaxed">
            End of Institutional Statement — The LaunchPath Standard is maintained under documented governance and subject to periodic review.
          </p>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="bg-[#0D1B2E] py-12 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-white/50 text-[13px]">
          <p className="mb-6 font-medium">© {new Date().getFullYear()} LaunchPath Transportation EDU. All Rights Reserved. System Integrity Protocols Active.</p>
          <div className="flex justify-center space-x-8 font-bold uppercase tracking-widest text-[10px]">
            <Link to="/learning-path" className="hover:text-white transition-colors">Operating Path</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Regulatory Disclaimer</Link>
            <Link to="/contact" className="hover:text-white transition-colors">System Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AboutPage;
