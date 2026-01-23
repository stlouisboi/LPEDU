
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Scale,
  FileText,
  ShieldAlert,
  Lock,
  Info,
  Check,
  X,
  Calendar,
  Activity,
  UserCheck,
  ClipboardCheck,
  AlertCircle,
  Building2
} from 'lucide-react';

const InstitutionalHeader = () => (
  <section className="relative py-20 bg-white border-b border-slate-200 overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
      <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 px-5 py-2 rounded-full mb-8">
        <ShieldCheck size={14} className="text-authority-blue" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-authority-blue">Admission Protocol v3.1</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1A1A1A] uppercase tracking-tight mb-6">
        System <span className="text-authority-blue">Admission</span> & Alignment
      </h1>
      <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
        Admission to the LaunchPath Standard is a formal alignment process. It is designed to verify that participating motor carriers possess the structural prerequisites required to install and maintain federally aligned safety management systems.
      </p>
    </div>
  </section>
);

const PurposeOfAdmission = () => (
  <section className="py-20 bg-[#F8F9FA] border-b border-slate-200">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue mb-4">01. Purpose of Admission</h2>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight">Institutional Alignment</h3>
          <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
            <p>
              The LaunchPath Standard requires a specific level of administrative discipline and operational readiness. Admission serves as a filter to ensure that resources are allocated to carriers capable of meeting the Standard's documentation and procedural requirements.
            </p>
            <p>
              This process protects the integrity of the Operating Standard and ensures that participating entities are positioned to benefit from systematic compliance protocols rather than struggling with basic structural deficiencies.
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
           <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
              <ClipboardCheck className="text-authority-blue" size={24} />
              <span className="text-sm font-black uppercase tracking-widest text-authority-blue">Standard Objectives</span>
           </div>
           <ul className="space-y-4">
              {[
                "Verification of carrier identity and authority status",
                "Alignment with federal safety management frameworks",
                "Installation of auditable documentation systems",
                "Standardization of DQ and HOS workflows"
              ].map((item, i) => (
                <li key={i} className="flex items-start text-xs font-bold text-slate-500 uppercase tracking-tight">
                  <Check size={14} className="text-authority-blue mr-3 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
           </ul>
        </div>
      </div>
    </div>
  </section>
);

const EligibilitySection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue mb-12 text-center">02. Eligibility & Criteria</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ELIGIBLE */}
        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
              <UserCheck size={20} />
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-700">Qualified Entities</h4>
          </div>
          <ul className="space-y-5">
            {[
              "Owner-operators in the pre-filing or 90-day window",
              "Carriers committed to institutional-grade documentation",
              "Individuals with secured startup capital and reserves",
              "Operators seeking a systematic operating standard"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-sm font-bold text-slate-600">
                <CheckCircle2 size={18} className="text-green-600 mr-3 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* NOT ELIGIBLE */}
        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-red-100 text-red-700 rounded-lg">
              <ShieldAlert size={20} />
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-700">Exclusionary Criteria</h4>
          </div>
          <ul className="space-y-5">
            {[
              "Entities seeking dispatching or load-finding services",
              "Applicants with insufficient operational capital",
              "Requests for legal, tax, or insurance representation",
              "Carriers unwilling to follow a sequenced protocol"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-sm font-bold text-slate-400">
                <XCircle size={18} className="text-red-400 mr-3 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const ExpectationsSection = () => (
  <section className="py-20 bg-[#F8F9FA] border-y border-slate-200">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue mb-12 text-center">03. Expectations Under the Standard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Administrative Discipline", 
            icon: <FileText size={24} />, 
            desc: "Participants must maintain precise, contemporaneous records of all safety-sensitive functions as defined by CFR Title 49." 
          },
          { 
            title: "Systematic Sequence", 
            icon: <Activity size={24} />, 
            desc: "The Standard must be implemented in the mandated order (Ground 0 through Module 6) to ensure logical system cohesion." 
          },
          { 
            title: "Individual Responsibility", 
            icon: <Scale size={24} />, 
            desc: "LaunchPath provides the framework; the carrier is solely responsible for the legal implementation and defense of their data." 
          }
        ].map((box, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-authority-blue mb-6">{box.icon}</div>
            <h4 className="text-sm font-black uppercase tracking-widest text-authority-blue mb-4">{box.title}</h4>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">{box.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AdmissionProcess = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div className="max-w-xl">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue mb-4">04. Admission Process</h2>
          <h3 className="text-2xl font-bold text-[#1A1A1A] uppercase tracking-tight">Registry Verification</h3>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Registry Active</span>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        {[
          { id: "Step 1", t: "Eligibility Assessment", d: "Completion of the Readiness Assessment to identify structural gaps." },
          { id: "Step 2", t: "System Provisioning", d: "One-time implementation investment to activate system access." },
          { id: "Step 3", t: "Standard Alignment", d: "Immediate issuance of Ground 0 onboarding and Phase 1 protocols." }
        ].map((step, i) => (
          <div key={i} className="flex items-start space-x-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-authority-blue transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-authority-blue pt-1">{step.id}</span>
            <div>
              <h4 className="text-base font-bold text-slate-800 uppercase mb-2">{step.t}</h4>
              <p className="text-sm text-slate-500 font-medium">{step.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const InvestmentNotice = () => (
  <section className="py-20 bg-authority-blue text-white overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold mb-8">Administrative Investment</h2>
        <div className="flex flex-col items-center mb-10">
           <div className="flex items-baseline">
             <span className="text-2xl font-bold mr-2 text-white/50">$</span>
             <span className="text-[6rem] md:text-[8rem] font-black tracking-tighter leading-none">1,500</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mt-4">One-Time Implementation Access Fee</p>
        </div>
        <div className="max-w-md mx-auto space-y-6">
          <p className="text-sm text-white/60 font-medium leading-relaxed italic">
            "The investment reflects the technical maturity of the Standard and the operational seriousness required for federal compliance."
          </p>
          <div className="h-px bg-white/10 w-full"></div>
          <button 
            onClick={() => window.location.href = '/#/contact?topic=System+Admission'}
            className="w-full bg-white text-authority-blue py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold hover:text-white transition-all active:scale-95 shadow-2xl"
          >
            Initiate Admission Request
          </button>
        </div>
      </div>
    </div>
  </section>
);

const GoverningPolicy = () => (
  <section className="py-20 bg-white">
    <div className="max-w-3xl mx-auto px-6">
      <div className="p-8 border-l-4 border-authority-blue bg-slate-50 rounded-r-3xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue mb-6 flex items-center">
          <Lock size={14} className="mr-2" /> Governing Policy
        </h4>
        <div className="space-y-4 text-xs font-bold text-slate-500 uppercase leading-relaxed tracking-wide">
          <p>LaunchPath functions as a standards organization. We do not provide individualized consulting, legal representation, or financial advising.</p>
          <p>Admission does not imply a guarantee of audit passage or operational profitability. All participants are subject to the 7-day review period after which access to the Standard is considered final.</p>
          <p className="text-authority-blue">System credentials are strictly for the use of the admitted carrier and are non-transferable.</p>
        </div>
      </div>
    </div>
  </section>
);

const EnrollPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-700">
      <InstitutionalHeader />
      <PurposeOfAdmission />
      <EligibilitySection />
      <ExpectationsSection />
      <AdmissionProcess />
      <InvestmentNotice />
      <GoverningPolicy />
      
      {/* Institutional Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">
          LaunchPath Operating Standard // Office of Admissions // System Integrity Priority
        </p>
      </footer>
    </div>
  );
};

export default EnrollPage;
