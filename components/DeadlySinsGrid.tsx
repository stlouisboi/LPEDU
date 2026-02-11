import React from 'react';
import { ShieldX, ChevronDown } from 'lucide-react';

/**
 * The 16 Deadly Sins Grid Component
 * 
 * Displays the 16 most common federal compliance violations that destroy new motor carriers.
 * Organized into 4 domains with 4 faults each, showing violation descriptions and consequences.
 */

interface Fault {
  id: string;
  text: string;
  result: string;
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
        { id: "01", text: "Random Pool Enrollment", result: "AUDIT DEFAULT" },
        { id: "02", text: "Positive Driver Results", result: "IMMEDIATE REVOCATION" },
        { id: "03", text: "Clearinghouse Query Failure", result: "OPERATING BAN" },
        { id: "04", text: "Omission of Pre-Employment", result: "STRICT LIABILITY" }
      ]
    },
    {
      domain: "Human Capital",
      items: [
        { id: "05", text: "Revoked License Usage", result: "OOS EVENT" },
        { id: "06", text: "Missing Med-Cert", result: "DRIVER DOWN GRADE" },
        { id: "07", text: "Fragmented DQ Files", result: "AUDIT RED FLAG" },
        { id: "08", text: "Omitted Background Inq", result: "NEGLIGENT ENTRUSTMENT" }
      ]
    },
    {
      domain: "Operational Control",
      items: [
        { id: "09", text: "Falsification of HOS", result: "CRIMINAL DEFAULT" },
        { id: "10", text: "Dispatching OOS Vehicles", result: "AUTHORITY SEIZURE" },
        { id: "11", text: "Deficient Roadside History", result: "PREMIUM SPIKE" },
        { id: "12", text: "No Maintenance Log", result: "LIABILITY DEFAULT" }
      ]
    },
    {
      domain: "Administrative",
      items: [
        { id: "13", text: "Insurance Coverage Lapse", result: "AUTHORITY TERMINATION" },
        { id: "14", text: "Failure to Update MCS-150", result: "ADMIN REVOCATION" },
        { id: "15", text: "BOC-3 Process Agent", result: "FILING SUSPENSION" },
        { id: "16", text: "Late Accident Reporting", result: "LEGAL DEFAULT" }
      ]
    }
  ];

  return (
    <section className="py-32 px-10 md:px-20 bg-[#020617] relative">
      <div className="max-w-[1600px] mx-auto space-y-32">
        <header className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto border border-red-600/20">
            <ShieldX size={40} className="text-red-600" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black font-serif uppercase tracking-tighter text-white">
            THE 16 DEADLY SINS OF <br/>
            <span className="text-red-600 italic">CARRIER FAILURE.</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-500 italic">
            Identification of high-probability failure patterns used by investigators
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {riskDomains.map((domain, domainIndex) => (
            <div key={domainIndex} className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-signal-gold border-b border-white/10 pb-4 flex items-center">
                <ChevronDown size={14} className="mr-2" /> 
                {domain.domain}
              </h3>
              <div className="space-y-4">
                {domain.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4 group hover:border-red-600/30 transition-all cursor-default"
                  >
                    <span className="text-[9px] font-black text-slate-600">
                      FAULT-{item.id}
                    </span>
                    <h4 className="text-base font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors leading-tight">
                      {item.text}
                    </h4>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        Result
                      </span>
                      <span className="text-[10px] font-black text-red-500 uppercase">
                        {item.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeadlySinsGrid;