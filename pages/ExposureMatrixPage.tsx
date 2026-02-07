
import React, { useEffect } from 'react';
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
  ShieldX,
  AlertTriangle,
  Info,
  Scale
} from 'lucide-react';

const ExposureMatrixPage: React.FC = () => {
  useEffect(() => {
    document.title = "Exposure Matrix | The 16 Deadly Sins of Carrier Operations";
  }, []);

  const domains = [
    {
      name: "Substance Governance",
      icon: <FileWarning className="text-red-600" />,
      items: [
        {
          title: "Random Pool Enrollment",
          exposure: "Operating without an active FMCSA-compliant random testing program. This is an automatic 'Unsatisfactory' finding in a New Entrant audit.",
          refuge: "Verified quarterly enrollment in a Third-Party Consortium (C/TPA) with automated selection notifications."
        },
        {
          title: "Positive Results Management",
          exposure: "Allowing a driver to operate after a positive test result without SAP intervention. Creates massive 'Negligent Entrustment' liability.",
          refuge: "Strict Return-to-Duty (RTD) sequence executed by a qualified Substance Abuse Professional (SAP) and documented follow-up testing."
        },
        {
          title: "Clearinghouse Queries",
          exposure: "Failure to conduct pre-employment or annual queries on CDL drivers. FMCSA uses this as a primary indicator of administrative negligence.",
          refuge: "Standardized query calendar with digital verification logs for every operator in the fleet."
        },
        {
          title: "Pre-Employment Testing",
          exposure: "Dispatching a driver before receiving a verified negative DOT drug test result. There is zero tolerance for this lapse in federal safety.",
          refuge: "Mandatory 'Negative Result' certificate uploaded to the Driver Qualification (DQ) file prior to the first load assignment."
        }
      ]
    },
    {
      name: "Human Capital Compliance",
      icon: <Fingerprint className="text-amber-600" />,
      items: [
        {
          title: "License Credentials",
          exposure: "Dispatching drivers with expired, suspended, or revoked CDL privileges. Results in immediate roadside out-of-service (OOS) and truck impoundment.",
          refuge: "Monthly MVR monitoring and automated expiration alerts set 60 days prior to license maturity."
        },
        {
          title: "Medical Certification",
          exposure: "Failure to verify valid medical cards. FMCSA systems automatically downgrade CDLs to 'Non-Certified' if the medical card expires.",
          refuge: "Digital tracking of Medical Examiner Certificates (MEC) with state DMV verification confirmation on file."
        },
        {
          title: "DQ File Architecture",
          exposure: "Fragmented, missing, or unorganized driver records. Auditors view messy files as evidence of a lack of systematic safety control.",
          refuge: "Implementation of the 'DQ File Factory'—a standardized documentation system ensuring zero-missing federal documents."
        },
        {
          title: "Background Inquiries",
          exposure: "Omission of safety performance history from previous employers. Violates 49 CFR Part 391.23 requirement for due diligence.",
          refuge: "Documented investigation of the previous 3 years of safety history with certified mail or electronic verification proof."
        }
      ]
    },
    {
      name: "Operational Control",
      icon: <Gavel className="text-slate-600" />,
      items: [
        {
          title: "HOS Integrity",
          exposure: "Deliberate or negligent ELD manipulation. Falsification of duty status is a federal criminal offense with personal carrier liability.",
          refuge: "Daily ELD auditing and unassigned mileage reconciliation protocols executed as part of the morning dispatch workflow."
        },
        {
          title: "OOS Vehicle Dispatch",
          exposure: "Operating equipment that has been red-tagged or placed out-of-service. This triggers immediate authority seizure and high-fines.",
          refuge: "Closed-loop Driver Vehicle Inspection Report (DVIR) system requiring mechanic sign-off before a vehicle is cleared for operation."
        },
        {
          title: "Roadside History (CSA)",
          exposure: "Accumulating points for visible vehicle defects. High CSA scores move your carrier to the top of the FMCSA audit priority list.",
          refuge: "Rigorous 15-minute pre-trip inspection discipline and immediate remediation of all light and tire defects."
        },
        {
          title: "Maintenance Ledger",
          exposure: "No documented history of equipment inspections or repairs. No maintenance logs = automatic liability in any civil incident.",
          refuge: "Systematic maintenance escrow funded by mileage and documented service logs for every VIN in the fleet."
        }
      ]
    },
    {
      name: "Administrative Stewardship",
      icon: <HardDrive className="text-blue-600" />,
      items: [
        {
          title: "Insurance Continuity",
          exposure: "Any lapse in primary liability coverage. Triggers immediate authority revocation and creates 'Uninsurable' status for up to 36 months.",
          refuge: "45-day renewal protocol and continuous primary coverage verification linked directly to the FMCSA SAFER system."
        },
        {
          title: "MCS-150 Updates",
          exposure: "Missing biennial updates. FMCSA deactivates DOT numbers automatically for failure to update the Motor Carrier Identification Report.",
          refuge: "Calendar-locked biennial filing triggers with digital confirmation receipts maintained in the governance archive."
        },
        {
          title: "BOC-3 Process Agents",
          exposure: "Lack of designated legal agents in operating states. Precludes the carrier from maintaining active interstate authority.",
          refuge: "Nationwide Blanket BOC-3 filing verified as active within the FMCSA portal during the first 30 days of operation."
        },
        {
          title: "Incident Reporting",
          exposure: "Failure to report recordable accidents within required windows. Inaccurate accident registers are major audit red flags.",
          refuge: "Standardized post-accident documentation kits stored in every vehicle to ensure clinical data capture during high-stress events."
        }
      ]
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-900 font-sans animate-in fade-in duration-700 pb-32 transition-colors">
      {/* 1. Header Section - Institutional Dark Navy */}
      <section className="bg-authority-blue text-white pt-24 pb-20 px-6 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px:32px]"></div>
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full mb-4">
             <Scale size={16} className="text-signal-gold" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Reference Tool: LP-EXP-V2.1</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black font-serif uppercase tracking-tight leading-[0.9]">
            THE EXPOSURE <span className="text-signal-gold italic">MATRIX.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed">
            A technical breakdown of the 16 primary failure vectors used by federal investigators to identify high-risk operations.
          </p>
        </div>
      </section>

      {/* 2. Orientation Note */}
      <section className="max-w-7xl mx-auto px-6 pt-16 flex flex-col md:flex-row gap-8 items-center justify-between opacity-70">
         <div className="flex items-center gap-4">
           <div className="p-3 bg-slate-200 rounded-xl text-slate-500">
             <Info size={20} />
           </div>
           <p className="text-xs font-black uppercase tracking-widest text-slate-500">
             Tool Objective: Identify active exposure points and map remediation.
           </p>
         </div>
         <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Critical Exposure</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Institutional Refuge</span>
         </div>
      </section>

      {/* 3. The Matrix Grid */}
      <section className="py-16 px-6 max-w-[1600px] mx-auto space-y-24">
        {domains.map((domain, dIdx) => (
          <div key={dIdx} className="space-y-12 animate-reveal-up" style={{ animationDelay: `${dIdx * 0.1}s` }}>
            <header className="flex items-center space-x-6 border-b border-slate-200 pb-8">
              <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                {React.cloneElement(domain.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-serif text-authority-blue">{domain.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Domain 0{dIdx + 1}</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {domain.items.map((item, iIdx) => (
                <article 
                  key={iIdx} 
                  className="bg-white border border-slate-200 p-10 rounded-[3rem] flex flex-col group hover:shadow-xl hover:border-authority-blue/20 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-authority-blue pointer-events-none group-hover:scale-150 transition-transform duration-700">
                    <Terminal size={120} />
                  </div>
                  
                  <header className="mb-8">
                    <span className="text-[10px] font-black text-slate-300 font-mono tracking-tighter mb-3 block">EXP_SIN_0{(dIdx * 4) + iIdx + 1}</span>
                    <h4 className="text-xl font-black text-authority-blue uppercase leading-tight tracking-tight group-hover:text-signal-gold transition-colors">{item.title}</h4>
                  </header>

                  <div className="space-y-10 flex-grow relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertTriangle size={14} className="shrink-0" />
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Exposure</h5>
                      </div>
                      <p className="text-[14px] font-bold text-slate-500 leading-relaxed italic border-l-2 border-red-100 pl-4">
                        {item.exposure}
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                      <div className="flex items-center space-x-2 text-emerald-600">
                        <ShieldCheck size={14} className="shrink-0" />
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Refuge</h5>
                      </div>
                      <p className="text-[14px] font-black text-slate-700 leading-relaxed pl-4">
                        {item.refuge}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-authority-blue rounded-[4rem] p-12 md:p-24 text-center shadow-2xl relative overflow-hidden border-t-8 border-signal-gold">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-white/5 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-3xl md:text-6xl font-black font-serif uppercase tracking-tight text-white leading-[0.9]">
              IDENTIFY YOUR <br/><span className="text-signal-gold italic">SURVIVAL SCORE.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
              The REACH Test™ evaluates your current entity against these 16 failure vectors. Move from administrative exposure to systematic refuge in under 5 minutes.
            </p>
            <div className="pt-6">
              <Link 
                to="/readiness" 
                className="inline-flex items-center space-x-5 bg-signal-gold text-authority-blue px-16 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-[14px] shadow-[0_30px_60px_-15px_rgba(198,146,42,0.4)] hover:bg-white hover:shadow-white/10 transition-all active:scale-95 group border-b-[12px] border-slate-900"
              >
                <span>TAKE THE READINESS ASSESSMENT</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Terminal Signature */}
      <footer className="py-20 border-t border-slate-200 text-center">
         <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-400 italic">
            REFERENCE ARCHIVE REGISTRY: LP-EXP-V2.1 — INSTITUTIONAL STANDARDS ACTIVE
         </p>
      </footer>
    </div>
  );
};

export default ExposureMatrixPage;
