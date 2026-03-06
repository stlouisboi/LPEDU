import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Activity,
  UserCheck
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-[#002244] text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h1 className="text-[32px] md:text-[44px] font-black uppercase tracking-tight leading-tight mb-8">
          50% of New Carriers Fail Within 18 Months
        </h1>
        <p className="text-[22px] md:text-[26px] font-bold text-slate-300 mb-8 max-w-4xl mx-auto leading-snug">
          Most authorities are not revoked for driving mistakes — they are revoked because paperwork, insurance compliance, and regulatory requirements collapse under pressure.
        </p>
        <p className="text-[16px] md:text-[18px] text-slate-400 max-w-3xl mx-auto leading-relaxed">
          New motor carriers rarely fail because they cannot drive. They fail because their systems cannot withstand auditors, insurers, or cash-flow strain. LaunchPath installs the compliance operating structure that keeps new authorities alive through the first 90 days of operation.
        </p>
      </section>

      {/* 2. CREDIBILITY BRIDGE */}
      <section className="bg-[#001833] py-12 md:py-20 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-80 bg-slate-800 rounded-2xl overflow-hidden border-2 border-[#C5A059]/30 relative grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder for Headshot image of Vince Lawrence */}
              <div className="absolute inset-0 flex items-center justify-center text-[#C5A059]/20 font-black text-2xl uppercase tracking-widest text-center px-4">
                Vince Lawrence
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <ul className="space-y-4 text-[18px] font-bold text-slate-200">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                U.S. Navy Veteran
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                20+ Years Manufacturing Management & Leadership
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                OSHA Safety Certified
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                Founder, LaunchPath Transportation EDU
              </li>
            </ul>
            <div className="pt-6 border-t border-white/10">
              <p className="text-[22px] font-black uppercase tracking-tight text-[#C5A059]">
                This is not a motivational course.
              </p>
              <p className="text-[22px] font-black uppercase tracking-tight text-white">
                This is an operating standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE MATH OF AUTHORITY LOSS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-[28px] md:text-[36px] font-black uppercase tracking-tight text-center mb-16">
          The Math of Authority Loss
        </h2>
        <div className="bg-[#001833] border-2 border-[#C5A059]/20 rounded-3xl overflow-hidden mb-16">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#002244] border-b-2 border-[#C5A059]">
                <th className="px-8 py-6 text-[14px] font-black uppercase tracking-widest text-[#C5A059]">Violation Type</th>
                <th className="px-8 py-6 text-[14px] font-black uppercase tracking-widest text-[#C5A059]">Immediate Penalty</th>
                <th className="px-8 py-6 text-[14px] font-black uppercase tracking-widest text-[#C5A059]">Long-Term Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[16px]">
              <tr>
                <td className="px-8 py-6 font-bold">Unqualified Driver</td>
                <td className="px-8 py-6 text-red-400">$16,000+ Fine</td>
                <td className="px-8 py-6">Insurance Non-Renewal</td>
              </tr>
              <tr>
                <td className="px-8 py-6 font-bold">DQ File Failure</td>
                <td className="px-8 py-6 text-red-400">Out of Service</td>
                <td className="px-8 py-6">Broker Blacklist</td>
              </tr>
              <tr>
                <td className="px-8 py-6 font-bold">Drug/Alcohol Violation</td>
                <td className="px-8 py-6 text-red-400">Authority Revoked</td>
                <td className="px-8 py-6">Permanent Loss of Asset</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <p className="text-5xl font-black text-[#C5A059]">49</p>
            <p className="text-[14px] font-black uppercase tracking-widest text-slate-500">Critical Audit Failure Points</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-black text-[#C5A059]">96.4</p>
            <p className="text-[14px] font-black uppercase tracking-widest text-slate-500">Average Insurance Increase %</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-black text-[#C5A059]">10+</p>
            <p className="text-[14px] font-black uppercase tracking-widest text-slate-500">Regulatory Filings Required</p>
          </div>
        </div>
        
        <div className="mt-16 text-center pt-12 border-t border-white/10">
          <p className="text-[22px] font-black uppercase tracking-tight text-white">
            This is not a compliance lecture.
          </p>
          <p className="text-[22px] font-black uppercase tracking-tight text-[#C5A059]">
            This is loss prevention.
          </p>
        </div>
      </section>

      {/* 4. CTA #1 (LOW COMMITMENT) */}
      <section className="bg-[#0A1628] py-20 md:py-32 px-6 md:px-12 text-center border-y border-white/5">
        <Link 
          to="/readiness" 
          className="inline-block bg-[#C5A059] text-[#002244] px-12 py-6 rounded-xl text-[18px] md:text-[20px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl"
        >
          See If You Qualify
        </Link>
        <div className="mt-8 space-y-2">
          <p className="text-[16px] font-bold text-white uppercase tracking-widest">Admission is not automatic.</p>
          <p className="text-[14px] text-slate-500 uppercase tracking-widest max-w-xl mx-auto">
            The program is structured for carriers in their first 90 days of operating authority.
          </p>
        </div>
      </section>

      {/* 5. HOW THE PROGRAM WORKS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h3 className="text-[22px] font-black uppercase tracking-tight text-[#C5A059]">Ground 0</h3>
            <p className="text-[16px] text-slate-300 leading-relaxed">
              Before anything else, your operating authority is either protected or exposed.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-[22px] font-black uppercase tracking-tight text-[#C5A059]">8 Modules / 60 Lessons</h3>
            <p className="text-[16px] text-slate-300 leading-relaxed">
              Every FMCSA requirement mapped, sequenced, and explained in plain language.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-[22px] font-black uppercase tracking-tight text-[#C5A059]">75 Operational Tools</h3>
            <p className="text-[16px] text-slate-300 leading-relaxed">
              Templates, checklists, and filing guides you deploy on day one.
            </p>
          </div>
        </div>
      </section>

      {/* 6. THE REACH STANDARD */}
      <section className="bg-[#001833] py-20 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-black uppercase tracking-tight mb-4">
            The REACH Standard
          </h2>
          <h3 className="text-[22px] md:text-[26px] font-bold text-[#C5A059] mb-12 uppercase tracking-tight">
            Around. Under. Through. Over. — The AUTO Guarding Standard
          </h3>
          <p className="text-[18px] text-slate-300 mb-12 leading-relaxed">
            The REACH Standard evaluates whether a new authority is structurally protected before operational pressure begins. The assessment reviews four structural domains:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {['Insurance Continuity', 'Cash-Flow Oxygen', 'Authority Protection', 'Compliance Backbone'].map((domain) => (
              <div key={domain} className="bg-[#002244] border border-[#C5A059]/30 p-4 rounded-xl flex items-center justify-center text-center">
                <span className="text-[12px] font-black uppercase tracking-widest">{domain}</span>
              </div>
            ))}
          </div>
          <p className="text-[16px] text-slate-400 italic">
            This evaluation determines whether an authority is prepared to operate or structurally exposed to failure. It is an operational assessment.
          </p>
        </div>
      </section>

      {/* 7. CTA #2 (MEDIUM COMMITMENT) */}
      <section className="py-20 px-6 md:px-12 text-center">
        <Link 
          to="/learning-path" 
          className="inline-block bg-white/5 border-2 border-[#C5A059] text-[#C5A059] px-12 py-6 rounded-xl text-[18px] md:text-[20px] font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#002244] transition-all active:scale-95"
        >
          Review the Program
        </Link>
      </section>

      {/* 8. 3-STEP ADMISSION PROCESS */}
      <section className="bg-[#0A1628] py-20 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-black uppercase tracking-tight text-center mb-20">
            3-Step Admission Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-[#C5A059] text-[#002244] rounded-full flex items-center justify-center font-black text-xl">1</div>
              <h3 className="text-[22px] font-black uppercase tracking-tight">Ground 0 Briefing</h3>
              <p className="text-[16px] text-slate-400 leading-relaxed">
                A structured orientation that establishes whether your authority is protected or exposed before capital is committed.
              </p>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-[#C5A059] text-[#002244] rounded-full flex items-center justify-center font-black text-xl">2</div>
              <h3 className="text-[22px] font-black uppercase tracking-tight">REACH Standard Assessment</h3>
              <p className="text-[16px] text-slate-400 leading-relaxed">
                Your authority is evaluated through the REACH framework to determine structural readiness.
              </p>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-[#C5A059] text-[#002244] rounded-full flex items-center justify-center font-black text-xl">3</div>
              <h3 className="text-[22px] font-black uppercase tracking-tight">LaunchPath Admission</h3>
              <p className="text-[16px] text-slate-400 leading-relaxed">
                If your authority meets the operating standard, enrollment opens and the Ground 0 module is installed immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. COMPLETE COMPLIANCE SYSTEM INSTALLED */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-[28px] md:text-[36px] font-black uppercase tracking-tight text-center mb-16">
          Complete Compliance System Installed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            'Driver Qualification File System',
            'ELD & Hours-of-Service Documentation',
            'Insurance Compliance Structure',
            'Maintenance Record System',
            'DOT Registration Management',
            'Audit-Ready Filing Procedures'
          ].map((system) => (
            <div key={system} className="flex items-center gap-4 bg-[#001833] p-6 rounded-2xl border border-white/5">
              <CheckCircle2 className="text-[#C5A059] shrink-0" size={24} />
              <span className="text-[16px] md:text-[18px] font-bold text-slate-200">{system}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 10. WHAT NON-COMPLIANCE ACTUALLY COSTS */}
      <section className="bg-[#001833] py-20 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-black uppercase tracking-tight text-center mb-16">
            What Non-Compliance Actually Costs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 bg-[#002244] p-8 rounded-3xl border border-green-500/20">
              <h3 className="text-[22px] font-black uppercase tracking-tight text-green-500 flex items-center gap-3">
                <Shield size={24} />
                Structured Compliance
              </h3>
              <ul className="space-y-4 text-[16px] text-slate-300">
                <li>• Predictable insurance renewals</li>
                <li>• Clean roadside inspection history</li>
                <li>• Expedited broker onboarding</li>
                <li>• Protected operating authority</li>
              </ul>
            </div>
            <div className="space-y-6 bg-[#002244] p-8 rounded-3xl border border-red-500/20">
              <h3 className="text-[22px] font-black uppercase tracking-tight text-red-500 flex items-center gap-3">
                <AlertTriangle size={24} />
                Operating Without Systems
              </h3>
              <ul className="space-y-4 text-[16px] text-slate-300">
                <li>• $10k+ unexpected legal fines</li>
                <li>• 50-100% insurance premium hikes</li>
                <li>• Forced out-of-service orders</li>
                <li>• Total authority revocation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA / ENROLLMENT */}
      <section className="py-32 px-6 md:px-12 text-center bg-[#0A1628]">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link 
            to="/readiness" 
            className="inline-block bg-[#C5A059] text-[#002244] px-16 py-8 rounded-xl text-[20px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl"
          >
            Begin Enrollment
          </Link>
          <div className="space-y-6">
            <p className="text-[18px] font-bold text-white max-w-2xl mx-auto leading-relaxed">
              LaunchPath is structured for new motor carriers in their first 90 days. Enrollment opens the Ground 0 module immediately.
            </p>
            <div className="pt-8 border-t border-white/10">
              <p className="text-[14px] text-slate-500 uppercase tracking-widest font-black">
                Current as of March 2026. Verified against ecfr.gov.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
