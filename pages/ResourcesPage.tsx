import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Play, 
  Lock, 
  ExternalLink, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Calendar, 
  AlertTriangle, 
  ClipboardList, 
  Search,
  Zap,
  Globe,
  Check,
  User,
  Activity,
  Smartphone,
  CheckCircle,
  FileSearch,
  BookOpen
} from 'lucide-react';
import { useApp } from '../App';

const ResourcesPage = () => {
  const { addFormSubmission } = useApp();
  const [featuredEmail, setFeaturedEmail] = useState('');
  const [premiumEmail, setPremiumEmail] = useState('');
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [featuredSubmitted, setFeaturedSubmitted] = useState(false);
  const [premiumSubmitted, setPremiumSubmitted] = useState(false);

  const handleFeaturedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!featuredEmail) return;
    setFeaturedLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1200));
    addFormSubmission({
      type: 'Resource Lead',
      name: 'First 90 Days Risk Map',
      email: featuredEmail,
      date: new Date().toISOString()
    });
    setFeaturedLoading(false);
    setFeaturedSubmitted(true);
  };

  const handlePremiumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!premiumEmail) return;
    setPremiumLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    addFormSubmission({
      type: 'Premium Library Unlock',
      email: premiumEmail,
      date: new Date().toISOString()
    });
    setPremiumLoading(false);
    setPremiumSubmitted(true);
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      
      {/* PAGE HEADER */}
      <section className="pt-24 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black font-serif text-authority-blue dark:text-white tracking-tighter mb-6">
            Free Compliance Tools & <br/><span className="text-signal-gold italic">Industry Resources</span>
          </h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
            Checklists, guides, and references to help you research, prepare, and operate with confidence.
          </p>
        </div>
      </section>

      {/* SECTION 1: FEATURED DOWNLOAD */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-signal-gold rounded-[3.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white dark:bg-surface-dark border-4 border-signal-gold rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 scale-150 pointer-events-none">
              <ShieldCheck size={200} className="text-authority-blue" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center space-x-2 bg-signal-gold/10 text-signal-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-signal-gold/20">
                  <Zap size={12} fill="currentColor" />
                  <span>🎯 MOST POPULAR RESOURCE</span>
                </span>
                <h2 className="text-3xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">
                  First 90 Days Risk Map™
                </h2>
                <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium leading-relaxed mb-8">
                  This diagnostic tool reveals the exact technical gaps FMCSA auditors look for in new entrant carriers. Identify your compliance vulnerabilities before they become violations.
                </p>
                <div className="flex items-center space-x-4 text-sm font-bold text-authority-blue dark:text-signal-gold">
                  <CheckCircle2 size={18} />
                  <span>Immediate Digital Delivery via LaunchPath Cloud</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-border-dark shadow-inner relative z-10">
                {featuredSubmitted ? (
                  <div className="text-center py-6 animate-scale-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-black font-serif text-authority-blue dark:text-white uppercase mb-2">Access Granted</h3>
                    <p className="text-sm text-text-muted font-bold">Check your inbox for the First 90 Days Risk Map™.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFeaturedSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">Authorized Link Destination</label>
                      <input 
                        required
                        type="email"
                        placeholder="professional@carrier.com"
                        className="w-full px-8 py-5 rounded-2xl bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark outline-none focus:ring-4 focus:ring-signal-gold/10 focus:border-signal-gold transition-all font-bold text-lg"
                        value={featuredEmail}
                        onChange={(e) => setFeaturedEmail(e.target.value)}
                      />
                    </div>
                    <button 
                      disabled={featuredLoading}
                      className="w-full bg-signal-gold text-authority-blue py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-authority-blue hover:text-white transition-all shadow-xl disabled:opacity-50 active:scale-95 flex items-center justify-center group"
                    >
                      {featuredLoading ? <Loader2 className="animate-spin" size={24} /> : (
                        <>
                          <span>GET FREE DOWNLOAD</span>
                          <Download size={18} className="ml-3 group-hover:translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-center text-text-muted uppercase tracking-widest font-black opacity-50 pt-2">
                      We respect your inbox. No spam, just compliance guidance.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FREE QUICK REFERENCE GUIDES */}
      <section className="py-24 bg-white dark:bg-surface-dark border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">Quick Reference Guides</h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium italic">No email required. Just download and use.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Pre-Authority Launch Checklist", desc: "Everything you need before activating your MC number", icon: <ClipboardList /> },
              { title: "DQ File Required Documents", desc: "The 9 documents every driver file must contain", icon: <FileText /> },
              { title: "Annual Filing Calendar 2025", desc: "UCR, MCS-150, 2290 - never miss a deadline", icon: <Calendar /> },
              { title: "Roadside Inspection Prep", desc: "What inspectors check and how to be ready", icon: <ShieldCheck /> },
              { title: "CSA Score Quick Guide", desc: "Understanding your safety measurement scores", icon: <Search /> },
              { title: "Audit Trigger Events", desc: "What makes FMCSA schedule an investigation", icon: <AlertTriangle /> },
            ].map((card, i) => (
              <div key={i} className="bg-slate-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark hover:shadow-xl transition-all group flex flex-col">
                <div className="w-14 h-14 bg-authority-blue text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {/* Fix: Explicitly cast ReactElement props to any to avoid property assignment errors during cloneElement */}
                  {React.cloneElement(card.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <h3 className="text-xl font-black font-serif uppercase tracking-tight mb-3 text-authority-blue dark:text-white leading-tight">{card.title}</h3>
                <p className="text-sm text-text-muted font-medium mb-8 flex-grow leading-relaxed">{card.desc}</p>
                <button className="w-full py-4 rounded-xl border-2 border-authority-blue text-authority-blue dark:text-steel-blue font-black uppercase text-[10px] tracking-widest hover:bg-authority-blue hover:text-white transition-all flex items-center justify-center group">
                  <Download size={14} className="mr-2 group-hover:translate-y-0.5 transition-transform" />
                  DOWNLOAD PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: COMPLIANCE CHECKLISTS */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3.5rem] p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <CheckCircle2 size={180} />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black font-serif uppercase tracking-tight mb-8 leading-none">Essential <br/><span className="text-signal-gold">Compliance Checklists</span></h2>
              <ul className="space-y-6">
                {[
                  "New Entrant Application Process (step-by-step)",
                  "Insurance Shopping Checklist (coverage requirements)",
                  "Clearinghouse Enrollment Steps",
                  "First Day of Operations Checklist",
                  "Mock Audit Self-Assessment"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-signal-gold text-authority-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="text-lg font-medium opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <button className="inline-flex items-center space-x-3 bg-white text-authority-blue px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-2xl active:scale-95 group">
                <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                <span>DOWNLOAD ALL CHECKLISTS (PDF PACK)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: VIDEO EXPLAINERS */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">Compliance Concepts Explained Simply</h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium italic">Short videos that break down complex regulations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "DOT Number vs MC Authority", dur: "2:30", desc: "Why you might need one, both, or neither", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" },
              { title: "What Is the Drug & Alcohol Clearinghouse?", dur: "3:15", desc: "Mandatory enrollment and query requirements", img: "https://images.unsplash.com/photo-1579165466511-70e21ad10418?auto=format&fit=crop&q=80&w=600" },
              { title: "Why 1 in 5 New Carriers Fail Their Audit", dur: "5:00", desc: "The most common violations and how to avoid them", img: "https://images.unsplash.com/photo-1454165833767-0270a3599603?auto=format&fit=crop&q=80&w=600" },
            ].map((video, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-border-light dark:border-border-dark group shadow-sm hover:shadow-2xl transition-all">
                <div className="relative aspect-video bg-authority-blue flex items-center justify-center overflow-hidden">
                  <img src={video.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-authority-blue/80 to-transparent"></div>
                  <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Play size={24} fill="currentColor" className="text-authority-blue ml-1" />
                  </div>
                  <div className="absolute bottom-4 left-6 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                    {video.dur}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-lg font-black uppercase tracking-tight text-authority-blue dark:text-white mb-3 leading-tight">{video.title}</h3>
                  <p className="text-sm text-text-muted font-medium mb-6 leading-relaxed">{video.desc}</p>
                  <button className="text-authority-blue dark:text-signal-gold font-black uppercase tracking-[0.2em] text-[10px] flex items-center hover:underline underline-offset-8">
                    WATCH NOW <ArrowRight size={14} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PREMIUM RESOURCE LIBRARY (Gated) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100 dark:bg-gray-800/50 rounded-[4rem] p-12 md:p-20 text-center border-2 border-dashed border-border-light">
            <div className="mb-12">
              <div className="w-20 h-20 bg-authority-blue text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Lock size={36} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">Advanced Implementation Packs</h2>
              <p className="text-xl text-text-muted dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
                Professional-grade templates and guides designed for active carrier operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
              {[
                { title: "Complete DQ File Template Pack", desc: "Every form, policy, and document for compliant driver files" },
                { title: "New Entrant Audit Response Kit", desc: "Scripts, document organization, and what to say to auditors" },
                { title: "Violation Severity Matrix", desc: "Which violations get you shut down vs. which ones don't" },
                { title: "7-Day Authority Prep Email Course", desc: "Daily lessons on launching your authority correctly" },
              ].map((p, i) => (
                <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark flex flex-col group hover:shadow-xl transition-all">
                  <div className="mb-6 text-text-muted opacity-20 group-hover:opacity-40 transition-opacity">
                    <Lock size={40} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-authority-blue dark:text-white mb-3 leading-tight">{p.title}</h4>
                  <p className="text-xs text-text-muted font-bold leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="max-w-xl mx-auto">
              {premiumSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-[2.5rem] border border-green-100 animate-scale-in">
                  <h3 className="text-2xl font-black font-serif text-green-700 uppercase mb-2">Access Unlocked</h3>
                  <p className="text-sm text-green-600 font-bold">Premium resources are being delivered to your dashboard credentials.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm font-black uppercase tracking-widest text-authority-blue dark:text-steel-blue">Enter your email to unlock all premium resources</p>
                  <form onSubmit={handlePremiumSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input 
                      required
                      type="email" 
                      placeholder="Enter your professional email"
                      className="flex-grow px-8 py-5 rounded-2xl bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-border-dark outline-none focus:border-authority-blue transition-all font-bold"
                      value={premiumEmail}
                      onChange={(e) => setPremiumEmail(e.target.value)}
                    />
                    <button 
                      disabled={premiumLoading}
                      className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-xl disabled:opacity-50 whitespace-nowrap flex items-center justify-center min-w-[160px]"
                    >
                      {premiumLoading ? <Loader2 className="animate-spin" size={20} /> : "GET ACCESS"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OFFICIAL FMCSA RESOURCES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-none">Direct Links to <br/><span className="text-signal-gold">Federal Systems</span></h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium mb-10 leading-relaxed">Bookmarkable links to official FMCSA tools you'll use daily to maintain your legal operating status.</p>
            <div className="space-y-4">
              {[
                { name: "FMCSA Portal (login/registration)", url: "https://portal.fmcsa.dot.gov/" },
                { name: "Drug & Alcohol Clearinghouse Login", url: "https://clearinghouse.fmcsa.dot.gov/" },
                { name: "Check Your SMS/CSA Scores", url: "https://ai.fmcsa.dot.gov/sms/" },
                { name: "DataQs (challenge violations)", url: "https://dataqs.fmcsa.dot.gov/" },
                { name: "SAFER System (carrier lookup)", url: "https://safer.fmcsa.dot.gov/" },
                { name: "National Registry of Medical Examiners", url: "https://nationalregistry.fmcsa.dot.gov/" }
              ].map((link, i) => (
                <a 
                  key={i}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-6 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl hover:border-authority-blue hover:shadow-lg transition-all group shadow-sm"
                >
                  <span className="font-bold text-text-primary dark:text-white group-hover:text-authority-blue transition-colors">{link.name}</span>
                  <ExternalLink size={18} className="text-text-muted group-hover:text-authority-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* SECTION 7: TRUSTED SERVICE PROVIDERS */}
          <div className="animate-reveal-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-none">Vetted Industry <br/><span className="text-signal-gold">Service Providers</span></h2>
            <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em] mb-10">Disclaimer: LaunchPath doesn't receive commissions. These are services we've researched and recommend based on reliability.</p>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue border-b border-border-light pb-4 mb-6 flex items-center">
                  <Globe size={14} className="mr-2" /> BOC-3 Process Agents
                </h4>
                <ul className="space-y-6">
                  {[
                    { name: "Process Agent Inc.", desc: "Fast 24-hour filing with nationwide coverage." },
                    { name: "Truckers Report BOC-3", desc: "Long-standing agency with simple pricing model." },
                    { name: "DAT BOC-3 Services", desc: "Integrated seamlessly with the DAT load board platform." }
                  ].map((p, i) => (
                    <li key={i}>
                      <a href="#" className="font-bold text-sm hover:text-authority-blue transition-colors flex items-center justify-between group">
                        <span>{p.name} <span className="block text-[11px] text-text-muted font-medium mt-1 uppercase tracking-tight">{p.desc}</span></span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue border-b border-border-light pb-4 mb-6 flex items-center">
                  <Activity size={14} className="mr-2" /> Drug Testing Consortiums
                </h4>
                <ul className="space-y-6">
                  {[
                    { name: "National Drug Screening", desc: "Large-scale consortium with clinics in every major city." },
                    { name: "DISA Global Solutions", desc: "Full-service compliance with expert reporting and audits." },
                    { name: "Labcorp Occupational Testing", desc: "Direct access to the largest diagnostic clinic network." }
                  ].map((p, i) => (
                    <li key={i}>
                      <a href="#" className="font-bold text-sm hover:text-authority-blue transition-colors flex items-center justify-between group">
                        <span>{p.name} <span className="block text-[11px] text-text-muted font-medium mt-1 uppercase tracking-tight">{p.desc}</span></span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue border-b border-border-light pb-4 mb-6 flex items-center">
                  <Smartphone size={14} className="mr-2" /> ELD Providers
                </h4>
                <ul className="space-y-6">
                  {[
                    { name: "Motive (formerly KeepTruckin)", desc: "Industry-leading software known for driver ease-of-use." },
                    { name: "Samsara", desc: "High-end visual telematics and fleet management integration." },
                    { name: "Geotab", desc: "Advanced vehicle tracking with deep mechanical diagnostics." }
                  ].map((p, i) => (
                    <li key={i}>
                      <a href="#" className="font-bold text-sm hover:text-authority-blue transition-colors flex items-center justify-between group">
                        <span>{p.name} <span className="block text-[11px] text-text-muted font-medium mt-1 uppercase tracking-tight">{p.desc}</span></span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-32 bg-authority-blue text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-authority-blue via-authority-blue to-steel-blue opacity-50"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-6 leading-none">
            Ready to Build Your <br/><span className="text-signal-gold italic">Compliance System?</span>
          </h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Free resources are helpful for research. Complete LaunchPath systems keep your authority alive through federal scrutiny.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/learning-path" className="bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl active:scale-95 flex items-center">
              VIEW COURSE CURRICULUM <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/pricing" className="bg-transparent text-white border-2 border-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-authority-blue transition-all active:scale-95">
              SEE INVESTMENT OPTIONS
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ResourcesPage;