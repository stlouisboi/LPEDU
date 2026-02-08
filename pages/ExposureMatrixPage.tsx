
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  FileWarning,
  Fingerprint,
  Gavel,
  HardDrive,
  Terminal,
  ChevronRight,
  ShieldX,
  X,
  Lock,
  Target
} from 'lucide-react';

interface SinItem {
  id: string;
  text: string;
  violation: string;
  guard: string;
  remediation: string;
  buttonLabel: string;
  category: string;
}

const ExposureMatrixPage: React.FC = () => {
  const [selectedSin, setSelectedSin] = useState<SinItem | null>(null);

  useEffect(() => {
    document.title = "The 16 Deadly Sins | LaunchPath Exposure Matrix";
  }, []);

  const riskDomains = [
    {
      domain: "Substance Governance",
      id: "DOMAIN_01",
      icon: <FileWarning className="text-red-500" />,
      items: [
        { id: "01", category: "Substance Governance", text: "Absence of random pool enrollment", violation: "Failing to enroll in a DOT-compliant random drug and alcohol testing consortium.", guard: "Active consortium enrollment with quarterly verified random selections.", remediation: "The LaunchPath Substance Protocol installs a verified linkage to a nationally recognized consortium. We automate the random pool enrollment to ensure compliance is a background process, not a manual risk.", buttonLabel: "IMPLEMENT BACKBONE GUARD" },
        { id: "02", category: "Substance Governance", text: "Positive driver results (Unmanaged)", violation: "No documented protocol for handling positive drug/alcohol test results.", guard: "Documented Return-to-Duty (RTD) sequence executed by a qualified SAP.", remediation: "Our Results Management System provides a clinical workflow for immediate driver removal and Return-to-Duty sequencing. This eliminates the risk of negligent entrustment during roadside inspections.", buttonLabel: "ELIMINATE EXPOSURE" },
        { id: "03", category: "Substance Governance", text: "Clearinghouse query failure", violation: "Not conducting required FMCSA Clearinghouse queries on drivers.", guard: "Pre-employment and annual automated query workflow with logging.", remediation: "We build a mandatory Clearinghouse Query Terminal into your administrative flow. This ensures no driver operates equipment without a clinical record check from federal repositories.", buttonLabel: "IMPLEMENT BACKBONE GUARD" },
        { id: "04", category: "Substance Governance", text: "Omission of pre-employment test", violation: "Allowing a driver to operate without a verified negative drug test.", guard: "Clinical negative result verification before equipment dispatch.", remediation: "The LaunchPath Screening Lock prevents dispatch until a verified negative drug test is logged in the permanent DQ file. This is a non-negotiable federal requirement.", buttonLabel: "ELIMINATE EXPOSURE" }
      ]
    },
    {
      domain: "Human Capital Compliance",
      id: "DOMAIN_02",
      icon: <Fingerprint className="text-amber-500" />,
      items: [
        { id: "05", category: "Human Capital", text: "Revoked/Expired license usage", violation: "Dispatching drivers with expired or suspended CDL credentials.", guard: "Periodic MVR monitoring and expiration alert systems.", remediation: "Our MVR Monitoring System automates license status verification. You receive terminal alerts 30 days prior to expiration, preventing OOS events before they manifest.", buttonLabel: "SECURE AUTHORITY STATUS" },
        { id: "06", category: "Human Capital", text: "Missing Med-Cert verification", violation: "Failure to verify valid medical certificates on file.", guard: "Digital medical examiner certificate (MEC) verification and tracking.", remediation: "The MEC Tracking Protocol ensures every driver has a valid physical. We install a digital verification loop that cross-references medical registries with your local driver files.", buttonLabel: "IMPLEMENT BACKBONE GUARD" },
        { id: "07", category: "Human Capital", text: "Fragmented DQ File framework", violation: "Disorganized or incomplete Driver Qualification files.", guard: "Sequential DQ File Factory architecture ensuring zero-missing documents.", remediation: "The DQ File Factory is an engineered document sequence. It ensures that every required federal document is present, signed, and clinical before a driver touches the wheel.", buttonLabel: "SECURE AUTHORITY STATUS" },
        { id: "08", category: "Human Capital", text: "Omitted background inquiries", violation: "Failing to document required safety performance history.", guard: "Verified previous employer inquiries and investigation logs.", remediation: "Our Background Inquiry Protocol automates the retrieval of safety performance history. We provide the certified inquiry templates required to satisfy Part 391.23.", buttonLabel: "IMPLEMENT BACKBONE GUARD" }
      ]
    },
    {
      domain: "Operational Control",
      id: "DOMAIN_03",
      icon: <Gavel className="text-slate-500" />,
      items: [
        { id: "09", category: "Operational Control", text: "Falsification of HOS records", violation: "Deliberate or negligent falsification of duty status.", guard: "Daily ELD auditing and unassigned mileage reconciliation protocols.", remediation: "The LaunchPath HOS Audit System installs a daily review protocol for ELD records. We solve the 'Unassigned Mileage' trap that triggers 80% of log-related audit failures.", buttonLabel: "ELIMINATE EXPOSURE" },
        { id: "10", category: "Operational Control", text: "Dispatching OOS vehicles", violation: "Operating equipment with existing out-of-service violations.", guard: "Closed-loop DVIR system requiring maintenance sign-off before dispatch.", remediation: "Our Inspection Lock requires a verified maintenance sign-off before any defect-flagged equipment can be assigned a load. This prevents criminal liability in accident scenarios.", buttonLabel: "IMPLEMENT BACKBONE GUARD" },
        { id: "11", category: "Operational Control", text: "Deficient roadside history (CSA)", violation: "Pattern of violations that triggers CSA score inflation.", guard: "Systematic pre-trip inspection discipline and violation remediation.", remediation: "The CSA Score Remediation Program analyzes roadside data to identify violation patterns. We then deploy targeted training to drivers to stop score bleed immediately.", buttonLabel: "ELIMINATE EXPOSURE" },
        { id: "12", category: "Operational Control", text: "No systematic maintenance log", violation: "Missing evidence of a recurring equipment inspection program.", guard: "Documented maintenance ledger tied to specific VIN/Mileage intervals.", remediation: "We build a Clinical Maintenance Ledger for every asset in your fleet. This proves to federal investigators that you follow a systematic inspection program, not just reactive repairs.", buttonLabel: "IMPLEMENT BACKBONE GUARD" }
      ]
    },
    {
      domain: "Administrative Stewardship",
      id: "DOMAIN_04",
      icon: <HardDrive className="text-blue-500" />,
      items: [
        { id: "13", category: "Administrative", text: "Insurance coverage lapse", violation: "Operating without continuous, primary liability coverage.", guard: "Renewal discipline and continuous coverage verification terminal.", remediation: "Our Insurance Continuity System creates a 60-day renewal buffer. We automate the compilation of evidence packages that underwriters require to offer the lowest market rates.", buttonLabel: "SECURE AUTHORITY STATUS" },
        { id: "14", category: "Administrative", text: "Failure to update MCS-150", violation: "Missing biennial updates to the motor carrier identification report.", guard: "Calendar-based filing triggers and administrative verification.", remediation: "The LaunchPath Registry Monitor tracks your biennial update windows automatically. We ensure your federal identification record matches your actual operational reality.", buttonLabel: "SECURE AUTHORITY STATUS" },
        { id: "15", category: "Administrative", text: "BOC-3 Process Agent omission", violation: "Absence of legal process agents in operating states.", guard: "Federal process agent filing lock and continuous verification.", remediation: "We install a permanent BOC-3 process agent blanket coverage. This ensures you have legal representation for service of process in all 50 states, satisfying Part 366.", buttonLabel: "ELIMINATE EXPOSURE" },
        { id: "16", category: "Administrative", text: "Late incident/accident reporting", violation: "Failure to report recordable accidents within federal windows.", guard: "Immediate post-accident documentation kit and reporting workflow.", remediation: "The LaunchPath Incident Response Kit is kept in every cab. It provides drivers with a clinical step-by-step documentation flow to capture evidence required for federal reporting.", buttonLabel: "SECURE AUTHORITY STATUS" }
      ]
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans animate-in fade-in duration-700 pb-32">
      {/* 1. Header Section */}
      <section className="relative pt-24 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px:32px]"></div>
        <div className="max-w-[1400px] mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-red-600/10 border border-red-600/30 px-6 py-2.5 rounded-full mb-4">
             <ShieldX size={16} className="text-red-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Classification: Restricted Risk Map</span>
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black font-serif uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
            THE 16 DEADLY SINS OF <br/><span className="text-signal-gold italic">CARRIER FAILURE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed">
            Specific exposure vectors that trigger federal audit failures and authority revocations. <br/>
            <span className="text-red-500/80 text-sm font-black uppercase tracking-widest mt-4 block">Tap any card to initiate institutional diagnosis.</span>
          </p>
        </div>
      </section>

      {/* 2. The Matrix Grid */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 gap-24 lg:gap-32">
          {riskDomains.map((domain, dIdx) => (
            <div key={dIdx} className="space-y-12 animate-reveal-up" style={{ animationDelay: `${dIdx * 0.1}s` }}>
              <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-10 gap-6">
                <div className="flex items-center space-x-6 md:space-x-8">
                  <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 shadow-inner shrink-0">
                    {React.cloneElement(domain.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight font-serif">{domain.domain}</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{domain.id} // SECURE_ARCHIVE</p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Level</p>
                   <p className="text-xl md:text-2xl font-black text-red-500 uppercase tracking-tighter italic">Critical Exposure</p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {domain.items.map((item) => (
                  <article 
                    key={item.id} 
                    onClick={() => setSelectedSin(item as SinItem)}
                    className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[3rem] flex flex-col group hover:bg-white/[0.04] hover:border-[#C5A059]/40 transition-all duration-700 relative overflow-hidden shadow-sm cursor-pointer min-h-[400px] lg:min-h-[450px]"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                      <Terminal size={80} />
                    </div>
                    
                    <header className="mb-6 md:mb-8">
                      <span className="text-xs font-black text-slate-700 font-mono tracking-tighter mb-4 block group-hover:text-[#C5A059] transition-colors">{item.id}</span>
                      <h4 className="text-[18px] md:text-[20px] font-black text-white uppercase leading-tight tracking-tight group-hover:text-[#C5A059] transition-colors">{item.text}</h4>
                    </header>

                    <div className="space-y-6 flex-grow">
                      <p className="text-[15px] font-bold text-slate-400 leading-relaxed italic border-l-2 border-red-500/20 pl-4">
                        {item.violation}
                      </p>
                    </div>

                    {/* Trigger Button - Gold Bottom-Right */}
                    <div className="mt-8 flex justify-end">
                      <div className="bg-[#C5A059] text-[#002244] px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] flex items-center gap-2 group-hover:scale-105 transition-all shadow-[0_10px_20px_rgba(197,160,89,0.2)] active:scale-95">
                        INITIATE DIAGNOSIS <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Detail Modal Overlay - Scaling 80% with Cab Readability */}
      {selectedSin && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 lg:p-12 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl"
            onClick={() => setSelectedSin(null)}
          />
          
          <div className="relative bg-[#0F172A] border border-white/10 rounded-[3rem] md:rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] w-full lg:w-[85%] max-w-7xl max-h-[92vh] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">
            {/* Modal Header/Sidebar */}
            <div className="w-full lg:w-[35%] bg-authority-blue p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative">
              <div className="space-y-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-[#C5A059] shadow-inner">
                   <ShieldAlert size={32} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-4">Diagnostic Identifier</p>
                   <h3 className="text-4xl md:text-5xl font-black font-serif text-white uppercase tracking-tighter leading-none mb-4">{selectedSin.id}</h3>
                   <p className="text-xs font-black text-white/40 uppercase tracking-widest">{selectedSin.category}</p>
                </div>
              </div>

              <div className="hidden lg:block pt-16">
                 <div className="p-8 bg-black/20 border border-white/5 rounded-3xl italic text-sm text-white/50 leading-relaxed uppercase tracking-tighter font-bold">
                   "A single exposure point in this domain is sufficient to trigger a terminal federal safety investigation."
                 </div>
              </div>
              
              <button 
                onClick={() => setSelectedSin(null)}
                className="lg:hidden absolute top-8 right-8 p-3 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Main Content - 20px Legibility Baseline */}
            <div className="flex-grow p-8 md:p-14 lg:p-20 overflow-y-auto custom-scrollbar relative">
              <button 
                onClick={() => setSelectedSin(null)}
                className="hidden lg:flex absolute top-12 right-12 p-4 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full group"
              >
                <X size={28} className="group-hover:rotate-90 transition-transform" />
              </button>

              <div className="space-y-12 md:space-y-16">
                {/* Legibility Lock: 20px Base for Detail Text */}
                <div className="space-y-6">
                  <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Terminal Exposure Risk</h4>
                  <p className="text-[24px] md:text-[32px] font-black text-white leading-tight uppercase tracking-tight font-serif">
                    {selectedSin.text}
                  </p>
                  <p className="text-[20px] font-bold text-slate-400 leading-relaxed">
                    {selectedSin.violation}
                  </p>
                </div>

                <div className="space-y-8 p-8 md:p-10 bg-white/[0.03] rounded-[3rem] border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <ShieldCheck size={120} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-3 text-emerald-400">
                       <ShieldCheck size={20} />
                       <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Systemic Guard Protocol</h4>
                    </div>
                    {/* 20px Polish Text */}
                    <p className="text-[20px] font-black text-white leading-relaxed uppercase tracking-tight">
                      {selectedSin.remediation}
                    </p>
                    <div className="flex items-center space-x-4 text-[#C5A059] pt-6 border-t border-white/5">
                       <Zap size={14} className="fill-current" />
                       <p className="text-[10px] font-black uppercase tracking-[0.2em]">Eliminates Roadside Out-of-Service Exposure</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-6">
                   <Link 
                     to="/readiness"
                     className="bg-[#C5A059] text-[#002244] px-12 py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[13px] shadow-2xl hover:bg-white transition-all active:scale-95 flex items-center justify-center group border-b-[8px] border-slate-900"
                   >
                     {selectedSin.buttonLabel} <ArrowRight className="ml-3 group-hover:translate-x-1" size={20} />
                   </Link>
                   <button 
                     onClick={() => setSelectedSin(null)}
                     className="px-10 py-7 border-4 border-white/10 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[13px] text-white/40 hover:text-white hover:border-white/30 transition-all active:scale-95"
                   >
                     Return to Matrix
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-authority-blue rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#C5A059]"></div>
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10 space-y-12">
            <h2 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight leading-none">SEE WHERE YOU STAND.</h2>
            <p className="text-lg md:text-xl text-white/70 font-bold leading-relaxed max-w-2xl mx-auto uppercase">
              Identify which of these 16 exposure vectors are active within your entity. The REACH Test™ provides a structural diagnosis in under 5 minutes.
            </p>
            <div className="pt-6">
              <Link 
                to="/readiness" 
                className="inline-flex items-center space-x-4 bg-[#C5A059] text-[#002244] px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[14px] shadow-2xl hover:bg-white transition-all active:scale-95 group border-b-8 border-slate-900"
              >
                <span>INITIATE REACH TEST™</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 pt-10">Standard Diagnostic Sequence LP-DIAG-01 // REGISTRY ACTIVE</p>
          </div>
        </div>
      </section>

      {/* 5. Mandatory System Signature */}
      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-[11px] font-black uppercase tracking-[0.85em] text-slate-600 italic">
            EXPOSURE TAXONOMY REGISTRY: LP-EXP-V2.5 — INSTITUTIONAL STANDARDS ACTIVE
         </p>
      </footer>
    </div>
  );
};

export default ExposureMatrixPage;
