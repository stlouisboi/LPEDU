import React, { useState } from 'react';
import { ShieldX, ChevronDown, ExternalLink } from 'lucide-react';

/**
 * Enhanced 16 Deadly Sins Grid Component
 */

interface Fault {
  id: string;
  text: string;
  result: string;
  description?: string;
  cfr?: string;
  moduleLink?: string;
}

interface RiskDomain {
  domain: string;
  items: Fault[];
}

const DeadlySinsGridEnhanced: React.FC = () => {
  const [selectedFault, setSelectedFault] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const riskDomains: RiskDomain[] = [
    {
      domain: "Substance Governance",
      items: [
        { 
          id: "01", 
          text: "Random Pool Enrollment", 
          result: "AUDIT DEFAULT",
          description: "Carriers must maintain active enrollment in a FMCSA-registered random testing consortium. Failure to enroll means the carrier cannot demonstrate compliance with 49 CFR Part 382.",
          cfr: "49 CFR 382.305",
          moduleLink: "/modules/3"
        },
        { 
          id: "02", 
          text: "Positive Driver Results", 
          result: "IMMEDIATE REVOCATION",
          description: "Operating a commercial motor vehicle after a positive drug test is a federal crime under the Drug-Free Workplace Act. Authority can be suspended within 48 hours.",
          cfr: "49 CFR 382.501",
          moduleLink: "/modules/3"
        },
        { 
          id: "03", 
          text: "Clearinghouse Query Failure", 
          result: "OPERATING BAN",
          description: "Carriers must query the FMCSA Drug & Alcohol Clearinghouse before hiring and annually for current drivers. Failure creates negligent hiring liability.",
          cfr: "49 CFR 382.701",
          moduleLink: "/modules/3"
        },
        { 
          id: "04", 
          text: "Omission of Pre-Employment", 
          result: "STRICT LIABILITY",
          description: "Pre-employment drug testing is mandatory. Without proof of testing, carriers are automatically liable in accidents regardless of fault.",
          cfr: "49 CFR 382.301",
          moduleLink: "/modules/3"
        }
      ]
    },
    {
      domain: "Human Capital",
      items: [
        { id: "05", text: "Revoked License Usage", result: "OOS EVENT", description: "Operating with a suspended license results in immediate driver removal.", cfr: "49 CFR 383.51", moduleLink: "/modules/3" },
        { id: "06", text: "Missing Med-Cert", result: "DRIVER DOWN GRADE", description: "CDL automatically downgrades to non-commercial if medical certificate expires.", cfr: "49 CFR 391.45", moduleLink: "/modules/3" },
        { id: "07", text: "Fragmented DQ Files", result: "AUDIT RED FLAG", description: "Incomplete driver qualification files suggest lack of operational control.", cfr: "49 CFR 391.51", moduleLink: "/modules/3" },
        { id: "08", text: "Omitted Background Inq", result: "NEGLIGENT ENTRUSTMENT", description: "Carriers must obtain employment history from previous employers.", cfr: "49 CFR 391.23", moduleLink: "/modules/3" }
      ]
    },
    {
      domain: "Operational Control",
      items: [
        { id: "09", text: "Falsification of HOS", result: "CRIMINAL DEFAULT", description: "Knowingly falsifying ELD records is a federal crime.", cfr: "49 CFR 395.8", moduleLink: "/modules/3" },
        { id: "10", text: "Dispatching OOS Vehicles", result: "AUTHORITY SEIZURE", description: "Willful disregard for OOS orders leads to emergency revocation.", cfr: "49 CFR 396.9", moduleLink: "/modules/3" },
        { id: "11", text: "Deficient Roadside History", result: "PREMIUM SPIKE", description: " Patterns of violations signal high risk to underwriters.", cfr: "49 CFR 385", moduleLink: "/modules/3" },
        { id: "12", text: "No Maintenance Log", result: "LIABILITY DEFAULT", description: "Missing records result in strict liability for equipment failure.", cfr: "49 CFR 396.3", moduleLink: "/modules/3" }
      ]
    },
    {
      domain: "Administrative",
      items: [
        { id: "13", text: "Insurance Coverage Lapse", result: "AUTHORITY TERMINATION", description: "Any lapse triggers automatic revocation of operating authority.", cfr: "49 CFR 387", moduleLink: "/modules/2" },
        { id: "14", text: "Failure to Update MCS-150", result: "ADMIN REVOCATION", description: "Carriers must update biennial reports to keep authority active.", cfr: "49 CFR 390.19", moduleLink: "/modules/1" },
        { id: "15", text: "BOC-3 Process Agent", result: "FILING SUSPENSION", description: "Designated process agents are required in all 50 states.", cfr: "49 CFR 366.4", moduleLink: "/modules/1" },
        { id: "16", text: "Late Accident Reporting", result: "LEGAL DEFAULT", description: "Late reporting suggests concealment, leading to enhanced penalties.", cfr: "49 CFR 390.15", moduleLink: "/modules/1" }
      ]
    }
  ];

  const searchFilteredDomains = riskDomains.filter(d => 
    activeFilter === 'all' || d.domain.toLowerCase().includes(activeFilter.toLowerCase())
  ).map(domain => ({
    ...domain,
    items: domain.items.filter(item => 
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.result.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(domain => domain.items.length > 0);

  return (
    <section className="py-32 px-10 md:px-20 bg-[#020617] relative">
      <div className="max-w-[1600px] mx-auto space-y-16">
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

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {['all', 'substance', 'human', 'operational', 'administrative'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${activeFilter === f ? 'bg-signal-gold text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search faults..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 font-medium text-sm focus:outline-none focus:border-signal-gold/50 transition-all w-full md:w-64"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {searchFilteredDomains.map((domain, domainIndex) => (
            <div key={domainIndex} className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-signal-gold border-b border-white/10 pb-4 flex items-center">
                <ChevronDown size={14} className="mr-2" /> {domain.domain}
              </h3>
              <div className="space-y-4">
                {domain.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4 group hover:border-red-600/30 transition-all cursor-pointer"
                    onClick={() => setSelectedFault(selectedFault === item.id ? null : item.id)}
                  >
                    <span className="text-[9px] font-black text-slate-600">FAULT-{item.id}</span>
                    <h4 className="text-base font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors leading-tight">{item.text}</h4>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Result</span>
                      <span className="text-[10px] font-black text-red-500 uppercase">{item.result}</span>
                    </div>
                    {selectedFault === item.id && (
                      <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
                        {item.description && <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>}
                        {item.cfr && <div className="flex items-center gap-2"><span className="text-[8px] font-black text-slate-500 uppercase">Citation:</span><span className="text-xs font-bold text-signal-gold">{item.cfr}</span></div>}
                        {item.moduleLink && (
                          <a href={item.moduleLink} className="inline-flex items-center gap-2 text-xs font-black text-signal-gold hover:text-white transition-colors uppercase tracking-wider">
                            Learn Prevention Steps <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    )}
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

export default DeadlySinsGridEnhanced;