import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Loader2,
  Shield,
  Clock,
  Target,
  CheckCircle2,
  Activity,
  UserCheck,
  ShieldAlert,
  FileText
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "risk-assessment-hero"
        });
      }
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    } catch (error) {
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-white dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center w-full bg-authority-blue overflow-hidden border-none py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-[13px] font-bold tracking-wide text-white dark:text-signal-gold mb-8 shadow-sm">
                <span>⚖️ INTEGRITY FIRST • SYSTEMS DRIVEN</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black tracking-tight text-white leading-[1.0] mb-8 font-serif">
                Protect Your Operating <br/><span className="text-signal-gold">Authority</span> — With <br className="lg:hidden" /> Structure and Discipline.
              </h1>
              
              <div className="text-xl lg:text-[22px] text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                <p>LaunchPath is a compliance-first operating standard for new motor carriers. We help carriers build the systems FMCSA expects to see — before enforcement forces the issue.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link 
                  to="/readiness"
                  className="group bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-sm hover:bg-white/5 hover:border-white transition-all flex items-center active:scale-95 uppercase tracking-[0.2em]"
                >
                  Request Admission
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent text-white/50 hover:text-white px-10 py-5 rounded-2xl font-black text-sm transition-all flex items-center active:scale-95 uppercase tracking-widest"
                >
                  System Logic
                </button>
              </div>
            </div>
            
            <div id="risk-assessment" className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[4rem] border border-slate-200 dark:border-border-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] animate-in zoom-in duration-700">
                <h2 className="text-2xl md:text-[28px] font-bold text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-none font-serif">
                  First 90 Days <br/><span className="text-signal-gold">Risk Map™</span>
                </h2>
                <p className="text-sm text-text-muted dark:text-text-dark-muted mb-10 font-medium italic leading-relaxed">
                  Identify and align your business with the Four Pillars. Gain the visibility required for disciplined stewardship of your authority.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted mb-2 ml-4">Legal Name</label>
                    <input 
                      type="text" required
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue rounded-2xl outline-none transition-all font-bold text-text-primary dark:text-white"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted mb-2 ml-4">Professional Email</label>
                    <input 
                      type="email" required
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue rounded-2xl outline-none transition-all font-bold text-text-primary dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={loading} type="submit"
                    className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.35em] text-[10px] shadow-lg hover:bg-steel-blue transition-all flex items-center justify-center active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="animate-spin mr-3" size={20} /> : <CheckCircle2 className="mr-3" size={18} />}
                    Create My Risk Map
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: SYSTEM PREVIEW */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center space-x-3">
                <ShieldAlert className="text-red-600" size={24} />
                <p className="text-red-600 font-black uppercase tracking-[0.4em] text-[11px]">Procedural Protection</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-[1.1]">
                Systems Presence <br/><span className="text-red-600">Prevents</span> <br/>Enforcement Failure.
              </h2>
              <div className="space-y-6 text-lg text-text-muted dark:text-text-dark-muted font-medium leading-relaxed max-w-xl">
                <p>Most enforcement failures are not caused by lack of effort — they are caused by missing systems. During the first 90 days, regulators and insurers monitor your data for documentation gaps.</p>
                <p>LaunchPath builds the necessary operational infrastructure before these gaps become violations. It is a unified implementation standard.</p>
              </div>
            </div>
            
            <div className="lg:col-span-6 bg-slate-50 dark:bg-surface-dark p-10 md:p-12 rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-sm">
              <h3 className="text-2xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">The Four Pillars</h3>
              <ul className="space-y-4 mb-10">
                {[
                  { label: "Drug & Alcohol", icon: <Activity size={18} /> },
                  { label: "Driver Qualification", icon: <UserCheck size={18} /> },
                  { label: "Insurance & Finance", icon: <Shield size={18} /> },
                  { label: "Maintenance & Hours", icon: <Clock size={18} /> }
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-signal-gold">{item.icon}</div>
                    <span className="font-black uppercase tracking-widest text-xs text-authority-blue dark:text-white">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-authority-blue/5 rounded-2xl border-l-4 border-signal-gold italic text-authority-blue font-medium">
                “FMCSA audits are procedural. Exposure exists where systems are absent.”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: PRICING (REFINED INSTITUTIONAL POSTURE) */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">One Standard. One System.</h2>
          <p className="text-xl text-text-muted dark:text-text-dark-muted font-medium leading-relaxed mb-12">
            Pricing reflects the seriousness of the work and the standard required to operate compliantly.
          </p>
          
          <div className="bg-white dark:bg-surface-dark p-10 md:p-16 rounded-[4rem] border-4 border-slate-200 dark:border-border-dark shadow-2xl relative overflow-hidden mb-16">
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-6">Complete 90-Day Implementation</h3>
              
              <div className="flex items-baseline mb-8">
                <span className="text-2xl font-bold text-slate-400 mr-1">$</span>
                <span className="text-7xl font-black tracking-tighter text-authority-blue dark:text-white">1,500</span>
                <span className="text-lg font-bold text-text-muted ml-2">/ One-Time</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-left w-full max-w-2xl mb-12">
                {[
                  "Audit readiness protocol",
                  "Documentation implementation",
                  "System logic & walkthroughs",
                  "Guided implementation sequence",
                  "Financial oversight tools",
                  "Technical safety files",
                  "Refuge Checklists",
                  "Standardized assets"
                ].map((f, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Shield className="text-authority-blue dark:text-steel-blue shrink-0" size={16} />
                    <span className="font-bold text-text-primary dark:text-text-dark-muted">{f}</span>
                  </div>
                ))}
              </div>

              <Link to="/pricing" className="bg-authority-blue text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-sm hover:bg-[#152a44] transition-colors shadow-lg">
                ENTER THE SYSTEM
              </Link>
              
              <p className="mt-12 text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-80 max-w-md mx-auto leading-relaxed">
                This is the current entry point. <br/>
                The system operates under one standard, which will increase as it matures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALM CLOSE */}
      <section className="py-32 bg-authority-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black font-serif mb-8 leading-tight tracking-tight uppercase">
            Build Your Foundation.
          </h2>
          <p className="text-xl opacity-80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            LaunchPath is built on stewardship and systematic thinking. Build your carrier on a foundation that lasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/readiness" className="inline-flex items-center space-x-3 bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-xl active:scale-95">
              <span>Request Admission</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;