
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  Truck as TruckIcon, 
  Shield, 
  Zap, 
  Clock, 
  Navigation,
  Anchor,
  FileText,
  Activity,
  ClipboardCheck,
  Award
} from 'lucide-react';

interface PhaseData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  colorClass: string;
  accentClass: string;
  borderClass: string;
}

const PHASES: PhaseData[] = [
  {
    number: "01",
    title: "FOUNDATION",
    subtitle: "Business Setup & Authority Registration",
    description: "Establish your legal structure, obtain your operating authority, and understand your federal obligations.",
    duration: "Weeks 1-3",
    icon: <Anchor />,
    colorClass: "text-authority-blue",
    accentClass: "bg-authority-blue",
    borderClass: "border-authority-blue"
  },
  {
    number: "02",
    title: "PROTECTION",
    subtitle: "Insurance & Risk Management",
    description: "Secure proper coverage, understand policy requirements, and build your insurance file.",
    duration: "Weeks 4-6",
    icon: <Shield />,
    colorClass: "text-signal-gold",
    accentClass: "bg-signal-gold",
    borderClass: "border-signal-gold"
  },
  {
    number: "03",
    title: "DOCUMENTATION",
    subtitle: "Driver Qualification & Compliance Files",
    description: "Build audit-ready DQ files, drug and alcohol programs, and maintenance systems.",
    duration: "Weeks 6-10",
    icon: <FileText />,
    colorClass: "text-steel-blue",
    accentClass: "bg-steel-blue",
    borderClass: "border-steel-blue"
  },
  {
    number: "04",
    title: "VERIFICATION",
    subtitle: "Ongoing Compliance & Audit Readiness",
    description: "Implement verification workflows that keep your files current and inspection-ready.",
    duration: "Week 12+",
    icon: <CheckCircle2 />,
    colorClass: "text-green-600",
    accentClass: "bg-green-600",
    borderClass: "border-green-600"
  }
];

const CheckpointGate = ({ label }: { label: string }) => (
  <div className="relative flex flex-col items-center justify-center py-16 z-30">
    <div className="bg-authority-blue border border-white/10 text-white px-8 py-4 rounded-full shadow-xl flex items-center space-x-3">
      <Lock size={14} className="text-signal-gold" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
    </div>
  </div>
);

const LearningPathPage = () => {
  const [truckProgress, setTruckProgress] = useState(0);
  const roadmapRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!roadmapRef.current) return;
      const element = roadmapRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight / 2;
      const totalDist = rect.height;
      const currentDist = triggerPoint - rect.top;
      let progress = (currentDist / totalDist) * 100;
      progress = Math.max(0, Math.min(100, progress));
      setTruckProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-[#fafafa] dark:bg-primary-dark min-h-screen animate-in fade-in duration-700 font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-32 bg-authority-blue text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/10 shadow-2xl animate-reveal-up">
            <Navigation size={14} className="text-signal-gold mr-2" />
            <span className="text-white">The Program Roadmap</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black mb-8 font-serif uppercase tracking-tighter leading-tight animate-reveal-up">
            Path to <span className="text-signal-gold italic">Active</span> Authority
          </h1>
          <div className="flex flex-col items-center animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <div className="h-px w-24 bg-signal-gold mb-6"></div>
            <p className="text-lg sm:text-2xl font-black tracking-[0.4em] text-signal-gold uppercase">
              4 PHASES · 90 DAYS · AUDIT-READY
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section ref={roadmapRef} className="py-24 max-w-6xl mx-auto px-6 relative overflow-hidden">
        {/* Progress Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800 -translate-x-1/2 z-0 rounded-full">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-authority-blue via-signal-gold to-green-600 transition-all duration-700 rounded-full" style={{ height: `${truckProgress}%` }} />
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 z-40 flex-col items-center transition-all duration-300 ease-out" style={{ top: `${truckProgress}%` }}>
            <div className="bg-authority-blue dark:bg-surface-dark text-signal-gold p-3 rounded-xl shadow-2xl border border-signal-gold/30">
              <TruckIcon size={20} fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="space-y-12 relative z-10">
          {PHASES.map((phase, idx) => (
            <React.Fragment key={phase.number}>
              <div className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Dot marker on line */}
                <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-surface-dark border-2 ${phase.borderClass} rounded-full z-20 shadow-sm`}></div>
                
                <div className="hidden md:block md:w-[45%]"></div>
                
                <div className="w-full md:w-[48%] pl-20 md:pl-0 animate-reveal-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className={`group bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[2.5rem] border-t-8 ${phase.borderClass} shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden`}>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-4xl md:text-5xl font-black ${phase.colorClass} opacity-20 font-serif`}>{phase.number}</span>
                      <div className="flex items-center space-x-2 text-slate-400 font-black uppercase text-[10px] tracking-widest bg-slate-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
                        <Clock size={12} /><span>{phase.duration}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className={`text-2xl md:text-3xl font-black font-serif mb-1 uppercase ${phase.colorClass} tracking-tight`}>{phase.title}</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{phase.subtitle}</p>
                    </div>
                    
                    <p className="text-base text-slate-600 dark:text-text-dark-muted font-medium leading-relaxed mb-8">
                      {phase.description}
                    </p>
                    
                    <Link to="/pricing" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold hover:translate-x-1 transition-transform">
                      View Phase Details <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
              {idx < PHASES.length - 1 && <CheckpointGate label="System Validation" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* OUTCOME SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">AFTER 90 DAYS</p>
            <h2 className="text-4xl sm:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-none">
              WHAT YOU'LL <span className="text-signal-gold italic">HAVE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Complete DQ Files", desc: "Digital and physical system for driver qualifications." },
              { title: "Drug & Alcohol Program", desc: "Full Clearinghouse enrollment and random testing setup." },
              { title: "Maintenance System", desc: "Audit-ready equipment inspection and record tracking." },
              { title: "Underwriter File", desc: "Documentation infrastructure that satisfies insurers." }
            ].map((outcome, i) => (
              <div key={i} className="bg-white dark:bg-primary-dark p-8 rounded-3xl border border-slate-100 dark:border-border-dark flex items-start space-x-5 group hover:shadow-lg transition-all">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-authority-blue dark:text-white uppercase tracking-tight text-sm mb-1">{outcome.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{outcome.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300 italic">
              "Infrastructure that protects your authority — installed, verified, operational."
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-48 text-center bg-white dark:bg-primary-dark transition-colors relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="w-24 h-24 bg-authority-blue/5 rounded-[2.5rem] border-2 border-authority-blue/10 flex items-center justify-center mx-auto mb-12 shadow-inner">
              <ShieldCheck size={48} className="text-authority-blue dark:text-signal-gold" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-8">Ready to <span className="text-signal-gold italic">Begin?</span></h2>
            <p className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-16 max-w-2xl mx-auto leading-relaxed">
              Initiate the diagnostic sequence and secure your authority against federal exposure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/readiness" className="w-full sm:w-auto bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-steel-blue transition-all shadow-2xl active:scale-95 flex items-center justify-center group border-b-4 border-slate-900">
                TAKE THE REACH TEST™ <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto bg-white dark:bg-gray-800 border-2 border-authority-blue/10 dark:border-white/10 text-authority-blue dark:text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center shadow-sm">
                VIEW ADMISSION PROTOCOL
              </Link>
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700 mt-24">
              VETERAN OWNED & OPERATED · ACCURACY OVER HYPE.™
            </p>
        </div>
      </section>
    </div>
  );
};

export default LearningPathPage;
