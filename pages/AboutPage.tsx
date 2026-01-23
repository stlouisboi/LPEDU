import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Target, 
  CheckCircle2, 
  Building2, 
  Scale, 
  BarChart3, 
  Download,
  BookOpen,
  Anchor,
  Star,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-700">
      
      <section className="relative bg-[#F8F9FA] py-24 lg:py-32 border-b border-slate-200 overflow-hidden text-center">
        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          <h1 className="text-[32px] lg:text-[42px] font-bold text-[#1A1A1A] leading-[1.2] mb-6 font-sans">
            Built by Experience, Not Theory
          </h1>
          <p className="text-base lg:text-[18px] leading-[1.7] text-[#555] max-w-[750px] mx-auto mb-10 font-medium">
            LaunchPath was created by Vince Lawrence to translate institutional compliance oversight into a systematic operating standard for motor carriers. This is not curriculum—it's an implementation system.
          </p>
          <div className="flex justify-center">
            <Link to="/readiness" className="bg-[#1E3A5F] text-white px-12 py-5 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-[#152945] transition-all shadow-lg active:scale-95">
              Begin Implementation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#1E3A5F] py-20 lg:py-32 text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-16 items-start">
          <div className="max-w-[410px] mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden shadow-2xl grayscale">
            <img src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" alt="Vince Lawrence" className="w-full h-auto" />
          </div>
          <div className="space-y-8">
            <h2 className="text-[24px] lg:text-[32px] font-bold">OSHA-Certified Safety Coordinator</h2>
            <p className="text-lg leading-relaxed opacity-90">
              Vince Lawrence oversaw compliance for organizations supporting 1,200+ employees. LaunchPath applies this institutional discipline to the trucking industry.
            </p>
            <blockquote className="border-l-4 border-signal-gold pl-5 italic text-signal-gold text-[17px] font-medium leading-relaxed">
              "Regulatory systems must be built with operational reality in mind—or compliance becomes a box-checking exercise instead of protection."
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 uppercase">
            <h2 className="text-[28px] lg:text-[36px] font-black text-[#1A1A1A] mb-6">The LaunchPath Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: "Auditors Perspective", body: "Built from decades of conducting audits and evaluating systematic logic." },
              { icon: <Building2 size={32} />, title: "System Experience", body: "Refined in operational environments supporting over 1,200 personnel." },
              { icon: <Scale size={32} />, title: "Stewardship", body: "Focused on protecting the authority—your legal right to operate." },
              { icon: <Target size={32} />, title: "Audit Ready", body: "Daily discipline produces audit readiness as a byproduct." }
            ].map((card, i) => (
              <div key={i} className="border border-[#E5E5E5] rounded-[12px] p-8 hover:-translate-y-1 transition-all">
                <div className="mb-6 text-[#1E3A5F]">{card.icon}</div>
                <h3 className="text-[20px] font-bold text-[#1E3A5F] mb-4 uppercase tracking-tighter">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#555] font-medium">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;