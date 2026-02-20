import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldX, 
  ChevronDown, 
  X,
  Target,
  ShieldAlert,
  Terminal,
  Activity,
  AlertTriangle,
  Scale
} from 'lucide-react';

/**
 * EXPOSURE MATRIX PAGE
 * High-fidelity diagnostic map of the 16 Deadly Sins.
 */

interface SinItem {
  id: string;
  title: string;
  subtitle: string;
  result: string;
  category: string;
  cfr: string;
  reachQuestion: string;
  severity: 'TERMINAL' | 'CRITICAL' | 'HIGH RISK';
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
      items: [
        { id: "01", category: "Substance Governance", title: "Random Pool Enrollment", subtitle: "Drug and alcohol testing program not aligned with 49 CFR Part 382.", result: "AUDIT DEFAULT", cfr: "49 CFR § 382.305", reachQuestion: "Can an auditor verify that every driver in your fleet is currently on a selection list provided by a third-party consortium within 48 hours?", severity: "TERMINAL" },
        { id: "02", category: "Substance Governance", title: "Positive Driver Results", subtitle: "Failure to manage driver removal or return-to-duty (49 CFR § 382.501).", result: "AUTHORITY TERMINATION", cfr: "49 CFR § 382.501", reachQuestion: "In the event of a positive result today, do you have the written removal policy and SAP contact information ready for immediate execution?", severity: "TERMINAL" },
        { id: "03", category: "Substance Governance", title: "Clearinghouse Query Failure", subtitle: "Pre-employment and annual driver queries not completed (49 CFR § 382.701).", result: "OPERATING BAN", cfr: "49 CFR § 382.701", reachQuestion: "Does your administrative record contain a timestamped query result for every driver, dated within the last 365 days?", severity: "CRITICAL" },
        { id: "04", category: "Substance Governance", title: "Omission of Pre-Employment Test", subtitle: "Verified negative result not obtained prior to first dispatch (49 CFR § 382.301).", result: "CRIMINAL DEFAULT", cfr: "49 CFR § 382.301", reachQuestion: "Is there a verified negative lab result on file for every driver that predates their first load for your authority?", severity: "HIGH RISK" }
      ]
    },
    {
      domain: "Human Capital",
      id: "DOMAIN_02",
      items: [
        { id: "05", category: "Human Capital", title: "Revoked License Usage", subtitle: "Operating with expired or suspended CDL credentials (49 CFR § 383.51).", result: "OPERATING BAN", cfr: "49 CFR § 383.51", reachQuestion: "Can you prove you ran an MVR for every driver within the last 12 months, or are you operating on the assumption that they are valid?", severity: "TERMINAL" },
        { id: "06", category: "Human Capital", title: "Missing Med-Cert", subtitle: "Medical examiner certificates not current or verified (49 CFR § 391.41).", result: "AUDIT DEFAULT", cfr: "49 CFR § 391.41", reachQuestion: "Does every driver file contain a physical copy of the Medical Examiner's Certificate, and is it currently unexpired?", severity: "CRITICAL" },
        { id: "07", category: "Human Capital", title: "Fragmented DQ Files", subtitle: "Driver qualification records incomplete or non-sequential (49 CFR § 391.51).", result: "AUDIT DEFAULT", cfr: "49 CFR § 391.51", reachQuestion: "If an auditor pulls a driver file at random, can you produce all 12 required items in under 5 minutes?", severity: "HIGH RISK" },
        { id: "08", category: "Human Capital", title: "Omitted Background Inquiries", subtitle: "Safety performance history not requested or documented (49 CFR § 391.23).", result: "CRIMINAL DEFAULT", cfr: "49 CFR § 391.23", reachQuestion: "Do you have documented 'Good Faith Efforts' on file showing you contacted previous employers for safety performance history?", severity: "CRITICAL" }
      ]
    },
    {
      domain: "Operational Control",
      id: "DOMAIN_03",
      items: [
        { id: "09", category: "Operational Control", title: "Falsification of HOS", subtitle: "ELD records or duty status logs inaccurate or falsified (49 CFR § 395.8).", result: "CRIMINAL DEFAULT", cfr: "49 CFR § 395.8", reachQuestion: "Does your ELD dashboard currently have 'Unassigned Driving Time' that has not been reconciled and signed by a driver?", severity: "TERMINAL" },
        { id: "10", category: "Operational Control", title: "Dispatching OOS Vehicles", subtitle: "Equipment operated with known out-of-service defects (49 CFR § 396.9).", result: "AUTHORITY TERMINATION", cfr: "49 CFR § 396.9", reachQuestion: "Can you produce a closed-loop Driver Vehicle Inspection Report (DVIR) for every piece of equipment for the last 90 days?", severity: "TERMINAL" },
        { id: "11", category: "Operational Control", title: "Deficient Roadside History", subtitle: "Recurrent safety violations in roadside inspections (49 CFR Part 385).", result: "PREMIUM SPIKE", cfr: "49 CFR Part 385", reachQuestion: "Is your SMS profile updated with a plan to address recurrent violation categories?", severity: "HIGH RISK" },
        { id: "12", category: "Operational Control", title: "No Maintenance Log", subtitle: "Unable to prove inspections, repairs, or maintenance (49 CFR § 396.3).", result: "AUDIT DEFAULT", cfr: "49 CFR § 396.3", reachQuestion: "Does every truck in your fleet have a service ledger showing preventive maintenance intervals based on time or mileage?", severity: "CRITICAL" }
      ]
    },
    {
      domain: "Administrative",
      id: "DOMAIN_04",
      items: [
        { id: "13", category: "Administrative", title: "Insurance Coverage Lapse", subtitle: "Failure to maintain primary liability or cargo coverage (49 CFR Part 387).", result: "AUTHORITY TERMINATION", cfr: "49 CFR Part 387", reachQuestion: "Is your insurance filing status currently listed as 'Active' on the SAFER system, and do you have the next 60 days of premium funded?", severity: "TERMINAL" },
        { id: "14", category: "Administrative", title: "Failure to Update MCS-150", subtitle: "Biennial carrier identification reports not updated (49 CFR § 390.19).", result: "OPERATING BAN", cfr: "49 CFR § 390.19", reachQuestion: "Does your MCS-150 accurately reflect your current mileage and number of power units?", severity: "CRITICAL" },
        { id: "15", category: "Administrative", title: "BOC-3 Process Agent Omission", subtitle: "Lack of designated legal process agents in operating states (49 CFR Part 366).", result: "AUTHORITY TERMINATION", cfr: "49 CFR Part 366", reachQuestion: "Is your BOC-3 filing 'Blanket' coverage, or are you at risk of suspension for operating in states where you have no registered agent?", severity: "HIGH RISK" },
        { id: "16", category: "Administrative", title: "Late Accident Reporting", subtitle: "Failure to maintain accident register or reportable logs (49 CFR § 390.15).", result: "CRIMINAL DEFAULT", cfr: "49 CFR § 390.15", reachQuestion: "Do you have an active Accident Register listing all recordable accidents for the previous three years?", severity: "CRITICAL" }
      ]
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans animate-in fade-in duration-700 pb-32">
      {/* Header Section */}
      <section className="relative pt-24 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px:32px]"></div>
        <div className="max-w-[1400px] mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-red-600/10 border border-red-600/30 px-6 py-2.5 rounded-full mb-4">
             <ShieldX size={16} className="text-red-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Diagnostic Registry: LP-EXP-V3.0</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-serif uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
            THE 16 DEADLY SINS OF <br/><span className="text-red-600 italic">CARRIER FAILURE.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-bold max-w-4xl mx-auto border-l-4 border-red-600 pl-6 py-2 text-left uppercase tracking-tight">
            These are the sixteen failure patterns investigators look for when deciding whether a carrier survives an audit, keeps insurance coverage, or loses operating authority.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-20 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 gap-24">
          {riskDomains.map((domain, dIdx) => (
            <div key={dIdx} className="space-y-10 animate-reveal-up" style={{ animationDelay: `${dIdx * 0.1}s` }}>
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold border-b border-white/10 pb-4 flex items-center">
                <ChevronDown size={14} className="mr-3 opacity-40" /> {domain.domain}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {domain.items.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => setSelectedSin(item as SinItem)}
                    className="text-left bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] space-y-6 group hover:border-red-600/30 hover:-translate-y-1 transition-all duration-500"
                  >
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">FAULT-{item.id}</span>
                    <h4 className="text-lg font-black uppercase text-white group-hover:text-red-500 transition-colors leading-tight">{item.title}</h4>
                    <p className="text-xs font-bold text-slate-400 leading-relaxed italic">{item.subtitle}</p>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">RESULT</span>
                      <span className="text-[10px] font-black text-red-500 uppercase">{item.result}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Result Legend */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white/[0.02] rounded-[3rem] p-10 border border-white/5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-10 flex items-center">
            <ShieldAlert size={16} className="mr-3" /> Result Classification Legend
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {[
              { label: "Audit Default", desc: "Likely failure during compliance review" },
              { label: "Authority Termination", desc: "FMCSA revokes operating authority" },
              { label: "Operating Ban", desc: "Carrier prohibited from operating" },
              { label: "Premium Spike", desc: "Insurance non-renewal or rate increase" },
              { label: "Criminal Default", desc: "Civil or criminal exposure risk" }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-tight">{item.label}</p>
                <p className="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-tighter">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedSin && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative bg-[#0F172A] border border-white/10 rounded-[3rem] md:rounded-[4rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setSelectedSin(null)}
              className="absolute top-8 right-8 p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full group z-50"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>

            <div className="p-10 md:p-16 lg:p-20 space-y-12">
               <div className="space-y-6">
                  <span className="px-4 py-1.5 bg-red-600/10 border border-red-600/30 rounded-xl text-[10px] font-black text-red-500 uppercase tracking-widest">
                    SIN-{selectedSin.id} // {selectedSin.severity}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black font-serif text-white uppercase tracking-tighter leading-tight">
                    {selectedSin.title}
                  </h2>
                  <p className="text-xl font-bold text-slate-400 leading-relaxed italic border-l-4 border-red-600 pl-6">
                    {selectedSin.subtitle}
                  </p>
               </div>

               <div className="space-y-6 p-8 bg-black/40 rounded-[2rem] border border-white/5">
                  <div className="flex items-center space-x-3 text-red-500">
                    <Target size={20} />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">The AUTO Diagnostic™ Diagnostic</h4>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-white leading-relaxed italic">
                    "{selectedSin.reachQuestion}"
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">REGULATORY CITATION</p>
                    <p className="text-2xl font-black text-white font-mono">{selectedSin.cfr}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PRIMARY CONSEQUENCE</p>
                    <p className="text-2xl font-black text-red-500 uppercase tracking-tighter">{selectedSin.result}</p>
                  </div>
               </div>

               <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6">
                  <Link 
                    to="/readiness"
                    className="bg-red-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-red-700 transition-all text-center flex items-center justify-center group"
                  >
                    INITIATE FULL DIAGNOSIS <ChevronDown className="ml-2 group-hover:translate-y-0.5 transition-transform" size={14} />
                  </Link>
                  <button 
                    onClick={() => setSelectedSin(null)}
                    className="px-10 py-6 border-2 border-white/10 rounded-2xl font-black uppercase tracking-widest text-[11px] text-slate-400 hover:text-white hover:border-white/30 transition-all"
                  >
                    Return to Matrix
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
         <Link 
           to="/auto-diagnostic"
           className="bg-white text-[#002244] px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-b-8 border-slate-300 hover:bg-signal-gold transition-all active:scale-95"
         >
           GENERATE MY EXPOSURE REPORT
         </Link>
      </div>
    </div>
  );
};

export default ExposureMatrixPage;