import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Clock, 
  Users, 
  Scale,
  Shield,
  Gavel,
  Zap,
  ShieldX,
  Target,
  FileText,
  ShieldAlert,
  ChevronRight,
  Anchor,
  BookOpen,
  CheckCircle2,
  XCircle,
  Briefcase,
  Lock
} from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | LaunchPath Transportation Education";
    
    // Set Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Meet Vince Lawrence: 25+ years manufacturing leadership, OSHA-certified safety coordinator, U.S. Navy veteran. LaunchPath exists to prevent authority failure through disciplined compliance systems.');
  }, []);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans border-t border-white/5">
      
      {/* HERO SECTION - 60/40 EXECUTIVE ENTRANCE */}
      <section className="relative min-h-[95vh] flex flex-col lg:flex-row overflow-hidden border-b border-[#002244]/10">
        {/* LEFT COLUMN: THE NARRATIVE (60%) */}
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-6 sm:p-8 md:p-12 lg:p-24 xl:p-32 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C5A059] via-[#C5A059]/40 to-transparent"></div>
          
          <div className="relative z-10 max-w-2xl space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Institutional Heritage</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                WHY <br/>
                <span className="text-[#C5A059] italic">LAUNCHPATH</span> <br/>
                EXISTS.
              </h1>
            </div>

            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-[20px] text-white/80 font-medium leading-relaxed max-w-xl">
              <p>
                I spent 25 years in manufacturing leadership—serving as a supervisor and business unit manager—and 5 years as a certified OSHA safety coordinator. Before that, I served 7 years in the U.S. Navy. In those high-stakes environments, <span className="text-white font-black">systems weren't just paperwork; they were the difference between a productive shift and a catastrophic failure.</span>
              </p>
              <p>
                When I transitioned into the motor carrier space, I saw company drivers trying to make the leap to owner-operator. These were good men—hard workers with clean records—who lost their authority in 90 days. 
              </p>
              <p>
                Not because they couldn't drive, but because the industry sold them <span className="text-[#C5A059] font-black italic">"hustle"</span> while the FMCSA demanded <span className="text-[#C5A059] font-black">"compliance infrastructure."</span> LaunchPath exists because I refuse to reverse the order of wisdom.
              </p>
            </div>

            <div className="pt-8">
              <Link to="/reach-test" className="inline-flex items-center space-x-4 sm:space-x-6 bg-[#C5A059] text-[#002244] px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-8 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[11px] sm:text-[12px] shadow-[0_20px_50px_-15px_rgba(197,160,89,0.4)] hover:bg-white hover:text-[#002244] transition-all active:scale-95 group border-b-4 sm:border-b-6 md:border-b-8 border-[#8e7340]">
                <span>Verify Admission Readiness</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE PORTRAIT (40%) */}
        <div className="w-full lg:w-[40%] bg-slate-200 relative min-h-[400px] sm:min-h-[500px] lg:min-h-0">
          <img 
            src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
            alt="Founder Vince Lawrence" 
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12 text-center lg:text-left">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] mb-2 drop-shadow-lg">System Custodian</p>
            <p className="text-3xl font-black text-white uppercase tracking-tight font-serif drop-shadow-2xl">Vince Lawrence</p>
          </div>
        </div>
      </section>

      {/* CLARITY OF PURPOSE SECTION */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-56 bg-white dark:bg-primary-dark">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-32 space-y-8 animate-reveal-up">
            <p className="text-[11px] font-black uppercase tracking-[1em] text-white/70">OPERATIONAL PARAMETERS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-none">
              CLARITY OF <span className="text-[#C5A059] italic">PURPOSE.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed px-4">
              Precision definition of institutional boundaries. We build infrastructure; we do not provide legal or commercial services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 xl:gap-16">
            {[
              { 
                icon: <Gavel size={36} className="text-[#C5A059]" />, 
                title: "LEGAL BOUNDARIES", 
                subtitle: "Regulatory Architecture",
                body: "LaunchPath is an educational standard providing 49 CFR interpretation and technical compliance frameworks.",
                guard: "Prevents unauthorized practice through strict technical separation.",
                provide: [
                  "Technical safety file architecture",
                  "Federal regulation interpretation",
                  "Audit-readiness verification"
                ],
                exclude: [
                  "Legal representation/counsel",
                  "Attorney-client privilege",
                  "Courtroom defense services"
                ]
              },
              { 
                icon: <Briefcase size={36} className="text-[#C5A059]" />, 
                title: "OPERATIONAL BOUNDARIES", 
                subtitle: "Authority Governance",
                body: "We engineer the governance systems that protect your authority. We do not operate your fleet on a daily basis.",
                guard: "Protects carrier independence by maintaining administrative distance.",
                provide: [
                  "Authority protection protocols",
                  "Preferred carrier positioning",
                  "Systemic record governance"
                ],
                exclude: [
                  "Daily dispatch operations",
                  "Load procurement/negotiation",
                  "Direct shipper recruitment"
                ]
              },
              { 
                icon: <Shield size={36} className="text-[#C5A059]" />, 
                title: "INSURANCE BOUNDARIES", 
                subtitle: "Risk Mitigation",
                body: "We show you how to build a risk profile that underwriters value. We do not sell or issue insurance policies.",
                guard: "Eliminates conflicts of interest in coverage procurement.",
                provide: [
                  "Insurance continuity systems",
                  "Underwriter evidence packages",
                  "Risk profile optimization"
                ],
                exclude: [
                  "Policy binding or issuance",
                  "Underwriting final decisions",
                  "Premium financing or brokerage"
                ]
              }
            ].map((card, i) =>