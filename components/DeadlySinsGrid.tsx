import React from 'react';
import { ShieldX, ChevronDown, ShieldAlert } from 'lucide-react';

/**
 * THE 16 DEADLY SINS OF CARRIER FAILURE
 * Institutional failure-pattern map for motor carrier risk analysis.
 * Governed by the LaunchPath Executive Standard.
 */

interface Fault {
  id: string;
  title: string;
  subtitle: string;
  result: 'AUDIT DEFAULT' | 'AUTHORITY TERMINATION' | 'OPERATING BAN' | 'PREMIUM SPIKE' | 'CRIMINAL DEFAULT';
}

interface RiskDomain {
  domain: string;
  items: Fault[];
}

const DeadlySinsGrid: React.FC = () => {
  const riskDomains: RiskDomain[] = [
    {
      domain: "Substance Governance",
      items: [
        { id: "01", title: "Random Pool Enrollment", subtitle: "Drug and alcohol testing program not aligned with 49 CFR Part 382.", result: "AUDIT DEFAULT" },
        { id: "02", title: "Positive Driver Results", subtitle: "Failure to manage driver removal or return-to-duty (49 CFR § 382.501).", result: "AUTHORITY TERMINATION" },
        { id: "03", title: "Clearinghouse Query Failure", subtitle: "Required driver queries not completed or documented (49 CFR § 382.701).", result: "OPERATING BAN" },
        { id: "04", title: "Omission of Pre-Employment Test", subtitle: "Verified negative result not obtained prior to first dispatch (49 CFR § 382.301).", result: "CRIMINAL DEFAULT" }
      ]
    },
    {
      domain: "Human Capital",
      items: [
        { id: "05", title: "Revoked License Usage", subtitle: "Operating with expired or suspended CDL credentials (49 CFR § 383.51).", result: "OPERATING BAN" },
        { id: "06", title: "Missing Med-Cert", subtitle: "Medical examiner certificates not current or verified (49 CFR § 391.41).", result: "AUDIT DEFAULT" },
        { id: "07", title: "Fragmented DQ Files", subtitle: "Driver qualification records incomplete or non-sequential (49 CFR § 391.51).", result: "AUDIT DEFAULT" },
        { id: "08", title: "Omitted Background Inquiries", subtitle: "Safety performance history not requested or documented (49 CFR § 391.23).", result: "CRIMINAL DEFAULT" }
      ]
    },
    {
      domain: "Operational Control",
      items: [
        { id: "09", title: "Falsification of HOS", subtitle: "ELD records or duty status logs inaccurate or falsified (49 CFR § 395.8).", result: "CRIMINAL DEFAULT" },
        { id: "10", title: "Dispatching OOS Vehicles", subtitle: "Equipment operated with known out-of-service defects (49 CFR § 396.9).", result: "AUTHORITY TERMINATION" },
        { id: "11", title: "Deficient Roadside History", subtitle: "Recurrent safety violations in roadside inspections (49 CFR Part 385).", result: "PREMIUM SPIKE" },
        { id: "12", title: "No Maintenance Log", subtitle: "Unable to prove inspections, repairs, or maintenance (49 CFR § 396.3).", result: "AUDIT DEFAULT" }
      ]
    },
    {
      domain: "Administrative",
      items: [
        { id: "13", title: "Insurance Coverage Lapse", subtitle: "Failure to maintain primary liability or cargo coverage (49 CFR Part 387).", result: "AUTHORITY TERMINATION" },
        { id: "14", title: "Failure to Update MCS-150", subtitle: "Biennial carrier identification reports not updated (49 CFR § 390.19).", result: "OPERATING BAN" },
        { id: "15", title: "BOC-3 Process Agent Omission", subtitle: "Lack of designated legal process agents in operating states (49 CFR Part 366).", result: "AUTHORITY TERMINATION" },
        { id: "16", title: "Late Accident Reporting", subtitle: "Failure to maintain accident register or reportable logs (49 CFR § 390.15).", result: "CRIMINAL DEFAULT" }
      ]
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#020617] relative font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        <header className="space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <ShieldX size={32} className="text-red-600 shrink-0" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-serif uppercase tracking-tighter text-white">
              THE 16 DEADLY SINS OF CARRIER FAILURE.
            </h2>
          </div>
          <p className="text-lg md:text-xl text-slate-400 font-bold max-w-4xl border-l-4 border-red-600 pl-6 py-2">
            These are the sixteen failure patterns investigators look for when deciding whether a carrier survives an audit, keeps insurance coverage, or loses operating authority.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {riskDomains.map((domain, dIndex) => (
            <div key={dIndex} className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-signal-gold border-b border-white/10 pb-3 flex items-center">
                <ChevronDown size={14} className="mr-2 opacity-50" /> 
                {domain.domain}
              </h3>
              <div className="space-y-4">
                {domain.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl space-y-5 group hover:border-red-600/30 transition-all cursor-default relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600/20 group-hover:bg-red-600 transition-colors"></div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                        FAULT-{item.id}
                      </span>
                      <h4 className="text-lg font-black uppercase tracking-tight text-white leading-tight group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                      {item.subtitle}
                    </p>
                    <div className="pt-4 border-t border-white/5 flex flex-col gap-1">
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                        RESULT
                      </span>
                      <span className="text-xs font-black text-red-500 uppercase tracking-tight">
                        {item.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RESULT LEGEND */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="bg-white/[0.02] rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center space-x-3 mb-8">
              <ShieldAlert size={14} className="text-slate-500" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                Result Classification Legend
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { label: "Audit Default", desc: "Likely failure during compliance review" },
                { label: "Authority Termination", desc: "FMCSA revokes operating authority" },
                { label: "Operating Ban", desc: "Carrier prohibited from operating" },
                { label: "Premium Spike", desc: "Insurance non-renewal or rate increase" },
                { label: "Criminal Default", desc: "Civil or criminal exposure risk" }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-tight">{item.label}</p>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-tighter">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center opacity-20 pt-10">
          <p className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-500 italic">
            EXPOSURE TAXONOMY REGISTRY: LP-EXP-V3.0 — INSTITUTIONAL STANDARDS ACTIVE
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeadlySinsGrid;
