
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, CheckCircle, MessageSquare, ArrowRight, Download, Star, Quote, ChevronDown, HelpCircle } from 'lucide-react';
import { useApp } from '../App';
import { FEATURES } from '../constants';

const HomePage = () => {
  const { settings, blogs, testimonials } = useApp();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const homeFaqs = [
    {
      q: "Is LaunchPath for interstate or intrastate carriers?",
      a: "Both. While federal rules primarily govern interstate commerce, many states have adopted FMCSA regulations for intrastate operations. Our guidance covers the core compliance systems required for both."
    },
    {
      q: "Do I get certificates for completing modules?",
      a: "Yes. Upon completion of our core curriculum, you receive signed certificates of completion that you can maintain in your safety records to demonstrate proactive education."
    },
    {
      q: "How does this compare to hiring a compliance consultant?",
      a: "Consultants often charge $2,500+ to do the work *for* you. We teach you how to do it yourself for a fraction of the cost, ensuring you actually understand your own systems during a roadside inspection."
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-steel-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-24 -translate-x-24 w-96 h-96 bg-authority-blue/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-steel-blue mb-4">
                Built on verified federal guidance — not hype, shortcuts, or social media myths.
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-authority-blue dark:text-white mb-8 font-serif leading-tight">
                {settings.heroTitle}
              </h1>
              <p className="text-xl text-text-muted dark:text-text-dark-muted mb-10 leading-relaxed max-w-lg">
                {settings.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
                <Link to="/enroll" className="w-full sm:w-auto bg-authority-blue text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-steel-blue transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                  Start Learning
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/learning-path" className="text-authority-blue dark:text-steel-blue font-bold flex items-center hover:underline group">
                  View the Learning Path
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="mt-12 pt-12 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center space-x-2 text-signal-gold mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-sm font-bold text-text-primary dark:text-white ml-2">Trustworthy Education</span>
                </div>
                <p className="text-sm text-text-muted dark:text-text-dark-muted">
                  Used by <span className="font-bold text-authority-blue dark:text-steel-blue">2,400+</span> aspiring owner-operators nationwide.
                </p>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="bg-gray-100 dark:bg-surface-dark p-2 rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800" 
                  alt="Professional Logistics" 
                  className="rounded-2xl w-full h-[550px] object-cover"
                />
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border-light dark:border-border-dark">
                  <div className="flex items-center space-x-2 mb-1">
                    <ShieldCheck className="text-authority-blue w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Compliance First</span>
                  </div>
                  <p className="text-[10px] text-text-muted dark:text-text-dark-muted">Verified FMCSA Methodology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Strip */}
      <section className="py-12 bg-authority-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-lg md:text-2xl font-medium max-w-4xl mx-auto leading-relaxed italic">
            "Most new carriers don’t fail because they can’t drive. They fail because they were never taught compliance correctly. LaunchPath exists to close that gap."
          </p>
        </div>
      </section>

      {/* What You'll Learn Grid */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">Master the Fundamentals of Compliance</h2>
            <p className="text-text-muted dark:text-text-dark-muted">
              Success in trucking isn't about miles; it's about systems. Learn how to operate legally and ethically from day one.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white dark:bg-primary-dark p-8 rounded-2xl border border-border-light dark:border-border-dark hover:border-steel-blue transition-all group shadow-sm hover:shadow-md">
                <div className="w-12 h-12 bg-steel-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-steel-blue/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-text-muted dark:text-text-dark-muted leading-relaxed text-sm">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section on Home Page */}
      <section className="py-24 bg-white dark:bg-primary-dark border-y border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-serif">Common Concerns</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Straight talk about what it takes to launch a carrier correctly.</p>
          </div>
          
          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => (
              <div key={idx} className="border border-border-light dark:border-border-dark rounded-2xl overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${openFAQ === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${openFAQ === idx ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="p-6 pt-0 text-text-muted dark:text-text-dark-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/faq" className="text-authority-blue font-bold flex items-center justify-center hover:underline">
              View All Frequently Asked Questions <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-serif">How LaunchPath Works</h2>
            <p className="text-text-muted max-w-2xl mx-auto">We provide the framework for a sustainable, compliant carrier business.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl relative overflow-hidden group shadow-sm border border-border-light dark:border-border-dark">
               <span className="absolute -right-4 -top-8 text-9xl font-black text-authority-blue/5 group-hover:text-authority-blue/10 transition-colors">1</span>
               <h4 className="text-2xl font-bold mb-4 font-serif relative z-10">Step 1 — Learn the Rules</h4>
               <p className="text-text-muted dark:text-text-dark-muted relative z-10">
                 We teach federal requirements clearly, using official FMCSA guidance — no guessing, no shortcuts.
               </p>
            </div>
            <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl relative overflow-hidden group shadow-sm border border-border-light dark:border-border-dark">
               <span className="absolute -right-4 -top-8 text-9xl font-black text-authority-blue/5 group-hover:text-authority-blue/10 transition-colors">2</span>
               <h4 className="text-2xl font-bold mb-4 font-serif relative z-10">Step 2 — Build Systems</h4>
               <p className="text-text-muted dark:text-text-dark-muted relative z-10">
                 You don’t just learn what the rules are. You learn how to apply them with checklists, templates, and structure.
               </p>
            </div>
            <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl relative overflow-hidden group shadow-sm border border-border-light dark:border-border-dark">
               <span className="absolute -right-4 -top-8 text-9xl font-black text-authority-blue/5 group-hover:text-authority-blue/10 transition-colors">3</span>
               <h4 className="text-2xl font-bold mb-4 font-serif relative z-10">Step 3 — Stay Compliant</h4>
               <p className="text-text-muted dark:text-text-dark-muted relative z-10">
                 With ongoing updates and support, you stay aligned as regulations change and your carrier scales.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Entrant Audit Highlight */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-surface-dark p-12 lg:p-20 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-signal-gold"></div>
            <div className="lg:w-3/5">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-serif leading-tight">New Entrant Audit Readiness: The Reality New Carriers Miss</h2>
              <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8 leading-relaxed">
                Most new authorities are audited within their first year of operation — and many fail due to missing systems, not bad intent. 
                <br /><br />
                LaunchPath helps you prepare before the audit notice shows up. We show you exactly what documents an auditor will ask for and how to have them filed and ready.
              </p>
              <div className="p-6 bg-signal-gold/5 border border-signal-gold/20 rounded-2xl flex items-start space-x-4">
                <ShieldCheck className="w-6 h-6 text-signal-gold flex-shrink-0 mt-1" />
                <p className="text-sm italic text-text-muted font-medium">
                  Educational guidance only. LaunchPath is an education provider and does not provide legal representation. Always verify requirements with official FMCSA manuals.
                </p>
              </div>
            </div>
            <div className="lg:w-2/5 flex justify-center">
              <div className="w-64 h-64 bg-authority-blue rounded-full flex items-center justify-center p-8 text-center shadow-xl">
                <span className="text-white font-bold text-xl font-serif">Audit-Proof Your Carrier Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold font-serif mb-4">Compliance Tools</h2>
              <p className="text-text-muted">Download our free high-quality carrier resources.</p>
            </div>
            <Link to="/resources" className="mt-6 md:mt-0 text-authority-blue font-bold flex items-center hover:underline">
              Browse All Resources <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "New Carrier Setup Checklist", type: "PDF Guide" },
              { title: "New Entrant Audit Prep Guide", type: "Full Manual" },
              { title: "Compliance Record Retention Chart", type: "Cheat Sheet" }
            ].map((res, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark flex flex-col items-center text-center group hover:border-steel-blue transition-all shadow-sm">
                <div className="w-16 h-16 bg-steel-blue/10 text-steel-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{res.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6">{res.type}</p>
                <Link to="/resources" className="text-sm font-bold text-authority-blue hover:text-steel-blue transition-colors">Download Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Dynamic Section */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30 border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold font-serif">Community Voices</h2>
             <p className="text-text-muted mt-2">What our learners are saying about LaunchPath.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white dark:bg-primary-dark p-10 rounded-3xl border border-border-light dark:border-border-dark shadow-sm italic text-text-muted leading-relaxed relative group">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-authority-blue/5 group-hover:text-authority-blue/10 transition-colors" />
                "{t.content}"
                <div className="mt-8 flex items-center space-x-4 not-italic">
                   <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-text-muted">
                     {t.author.charAt(0)}
                   </div>
                   <div>
                      <p className="font-bold text-text-primary dark:text-white">— {t.author}</p>
                      <p className="text-xs uppercase font-bold tracking-widest">{t.role}</p>
                   </div>
                </div>
              </div>
            ))}
            {testimonials.length === 0 && (
              <div className="col-span-full py-12 text-center text-text-muted">
                No testimonials yet.
              </div>
            )}
          </div>
          <p className="text-center text-[10px] uppercase font-bold tracking-tighter text-text-muted mt-12">
            Verified testimonials from active community participants.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-authority-blue rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center text-white shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif leading-tight">Compliance Beats Hustle — Every Time</h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                If you want shortcuts, this isn’t for you. <br />
                If you want clarity, structure, and longevity — you’re in the right place.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/enroll" className="bg-signal-gold text-authority-blue px-12 py-5 rounded-2xl text-xl font-bold hover:bg-white transition-all shadow-xl">
                  Start Learning Today
                </Link>
                <Link to="/contact" className="border-2 border-white/30 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all">
                  Contact Specialist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
