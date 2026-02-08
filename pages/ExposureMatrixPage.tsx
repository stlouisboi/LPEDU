
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ShieldCheck, 
  XCircle, 
  Zap, 
  ArrowRight,
  FileWarning,
  Fingerprint,
  Gavel,
  HardDrive,
  Terminal,
  ChevronRight,
  ShieldX
} from 'lucide-react';

const ExposureMatrixPage: React.FC = () => {
  const [selectedSinId, setSelectedSinId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "The 16 Deadly Sins | LaunchPath Exposure Matrix";
  }, []);

  const riskDomains = [
    {
      domain: "Substance Governance",
      id: "DOMAIN_01",
      icon: <FileWarning className="text-red-500" />,
      items: [
        { id: "01", text: "Absence of random pool enrollment", violation: "Failing to enroll in a DOT-compliant random drug and alcohol testing consortium.", guard: "Active consortium enrollment with quarterly verified random selections." },
        { id: "02", text: "Positive driver results (Unmanaged)", violation: "No documented protocol for handling positive drug/alcohol test results.", guard: "Documented Return-to-Duty (RTD) sequence executed by a qualified SAP." },
        { id: "03", text: "Clearinghouse query failure", violation: "Not conducting required FMCSA Clearinghouse queries on drivers.", guard: "Pre-employment and annual automated query workflow with logging." },
        { id: "04", text: "Omission of pre-employment test", violation: "Allowing a driver to operate without a verified negative drug test.", guard: "Clinical negative result verification before equipment dispatch." }
      ]
    },
    {
      domain: "Human Capital Compliance",
      id: "DOMAIN_02",
      icon: <Fingerprint className="text-amber-500" />,
      items: [
        { id: "05", text: "Revoked/Expired license usage", violation: "Dispatching drivers with expired or suspended CDL credentials.", guard: "Periodic MVR monitoring and expiration alert systems." },
        { id: "06", text: "Missing Med-Cert verification", violation: "Failure to verify valid medical certificates on file.", guard: "Digital medical examiner certificate (MEC) verification and tracking." },
        { id: "07", text: "Fragmented DQ File framework", violation: "Disorganized or incomplete Driver Qualification files.", guard: "Sequential DQ File Factory architecture ensuring zero-missing documents." },
        { id: "08", text: "Omitted background inquiries", violation: "Failing to document required safety performance history.", guard: "Verified previous employer inquiries and investigation logs." }
      ]
    },
    {
      domain: "Operational Control",
      id: "DOMAIN_03",
      icon: <Gavel className="text-slate-500" />,
      items: [
        { id: "09", text: "Falsification of HOS records", violation: "Deliberate or negligent falsification of duty status.", guard: "Daily ELD auditing and unassigned mileage reconciliation protocols." },
        { id: "10", text: "Dispatching OOS vehicles", violation: "Operating equipment with existing out-of-service violations.", guard: "Closed-loop DVIR system requiring maintenance sign-off before dispatch." },
        { id: "11", text: "Deficient roadside history (CSA)", violation: "Pattern of violations that triggers CSA score inflation.", guard: "Systematic pre-trip inspection discipline and violation remediation." },
        { id: "12", text: "No systematic maintenance log", violation: "Missing evidence of a recurring equipment inspection program.", guard: "Documented maintenance ledger tied to specific VIN/Mileage intervals." }
      ]
    },
    {
      domain: "Administrative Stewardship",
      id: "DOMAIN_04",
      icon: <HardDrive className="text-blue-500" />,
      items: [
        { id: "13", text: "Insurance coverage lapse", violation: "Operating without continuous, primary liability coverage.", guard: "Renewal discipline and continuous coverage verification terminal." },
        { id: "14", text: "Failure to update MCS-150", violation: "Missing biennial updates to the motor carrier identification report.", guard: "Calendar-based filing triggers and administrative verification." },
        { id: "15", text: "BOC-3 Process Agent omission", violation: "Absence of legal process agents in operating states.", guard: "Federal process agent filing lock and continuous verification." },
        { id: "16", text: "Late incident/accident reporting", violation: "Failure to report recordable accidents within federal windows.", guard: "Immediate post-accident documentation kit and reporting workflow." }
      ]
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans animate-in fade-in duration-700">
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
            These are the specific exposure points that trigger federal audit failures, insurance cancellations, and authority revocations.
          </p>
        </div>
      </section>

      {/* 2. The Matrix Grid */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 gap-24">
          {riskDomains.map((domain, dIdx) => (
            <div key={dIdx} className="space-y-12 animate-reveal-up" style={{ animationDelay: `${dIdx * 0.1}s` }}>
              <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-10 gap-6">
                <div className="flex items-center space-x-8">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                    {React.cloneElement(domain.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight font-serif">{domain.domain}</h3>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mt-2">{domain.id} // SECURE_ARCHIVE</p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Level</p>
                   <p className="text-2xl font-black text-red-500 uppercase tracking-tighter italic">Critical Exposure</p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {domain.items.map((item) => (
                  <article 
                    key={item.id} 
                    onClick={() => setSelectedSinId(selectedSinId === item.id ? null : item.id)}
                    className={`bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] flex flex-col group hover:bg-white/[0.04] hover:border-signal-gold/30 transition-all duration-700 relative overflow-hidden shadow-sm cursor-pointer ${selectedSinId === item.id ? 'ring-4 ring-signal-gold/50 bg-white/[0.06]' : ''}`}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                      <Terminal size={80} />
                    </div>
                    
                    <header className="mb-10">
                      <span className="text-xs font-black text-slate-700 font-mono tracking-tighter mb-4 block group-hover:text-signal-gold transition-colors">{item.id}</span>
                      <h4 className="text-lg font-black text-white uppercase leading-tight tracking-tight group-hover:text-signal-gold transition-colors">{item.text}</h4>
                    </header>

                    <div className="space-y-8 flex-grow">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-red-500/80">
                          <XCircle size={14} />
                          <h5 className="text-[9px] font-black uppercase tracking-widest">Exposure Factor</h5>
                        </div>
                        <p className="text-sm font-bold text-slate-400 leading-relaxed italic border-l-2 border-red-500/20 pl-4">
                          {item.violation}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-center space-x-3 text-emerald-400/80">
                          <ShieldCheck size={14} />
                          <h5 className="text-[9px] font-black uppercase tracking-widest">Institutional Refuge</h5>
                        </div>
                        <p className="text-sm font-bold text-slate-300 leading-relaxed pl-4">
                          {item.guard}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-authority-blue rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 left-0 w-full h-2 bg-signal-gold"></div>
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10 space-y-12">
            <h2 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight">SEE WHERE YOU STAND.</h2>
            <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
              Identify which of these 16 exposure vectors are active within your carrier entity. Our REACH Test™ provides a structural diagnosis in under 5 minutes.
            </p>
            <div className="pt-6">
              <Link 
                to="/readiness" 
                className="inline-flex items-center space-x-4 bg-signal-gold text-authority-blue px-12 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-white transition-all active:scale-95 group border-b-8 border-slate-900"
              >
                <span>INITIATE REACH TEST™</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 pt-10">Standard Diagnostic Sequence LP-DIAG-01</p>
          </div>
        </div>
      </section>

      {/* 4. Mandatory System Signature */}
      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-[11px] font-black uppercase tracking-[0.85em] text-slate-600 italic">
            EXPOSURE TAXONOMY REGISTRY: LP-EXP-V2.1 — INSTITUTIONAL STANDARDS ACTIVE
         </p>
      </footer>
    </div>
  );
};

export default ExposureMatrixPage;
