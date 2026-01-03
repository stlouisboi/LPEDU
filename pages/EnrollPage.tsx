
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  CreditCard, 
  ArrowRight, 
  Target,
  Award,
  BookOpen,
  HelpCircle,
  Users,
  ShieldAlert,
  ChevronDown,
  Video
} from 'lucide-react';
import { collection, query, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';
import { useApp } from '../App';
import { COURSE_MODULES } from '../constants';
import { GeneratedVideo } from '../types';

const EnrollPage = () => {
  const { login, addFormSubmission } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [openCurriculum, setOpenCurriculum] = useState<number | null>(0);
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "generatedVideos"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedVideo));
      setVideos(data);
    });
    return unsub;
  }, []);

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    addFormSubmission({ type: 'Course Enrollment', ...formData, date: new Date().toISOString() });
    login();
    navigate('/admin'); 
  };

  const getVideosForModule = (moduleId: number) => {
    return videos.filter(v => v.moduleId === moduleId);
  };

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen">
      
      {/* 1. Hero */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-authority-blue text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-3 h-3" />
            <span>Official Carrier Mastery Curriculum</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-tight text-authority-blue dark:text-white">The Carrier Mastery Program</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            From Authority Registration to Audit Readiness. Everything you need to build, protect, and scale your motor carrier in one structured system.
          </p>
          <a href="#pricing" className="bg-authority-blue text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:bg-steel-blue transition-all">
            Secure Your Spot →
          </a>
        </div>
      </section>

      {/* 2. What You'll Learn (8 Modules Overview) */}
      <section className="py-24 border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">What You'll Learn</h2>
            <p className="text-text-muted">A university-level approach to DOT safety and compliance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COURSE_MODULES.map((m) => (
              <div key={m.id} className="p-8 bg-gray-50 dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark flex flex-col hover:border-authority-blue/30 transition-colors">
                <span className="text-[10px] font-bold text-authority-blue mb-4 uppercase tracking-[0.2em]">Module {m.id}</span>
                <h3 className="text-xl font-bold mb-4 font-serif">{m.title}</h3>
                <p className="text-sm text-text-muted mb-6 flex-grow">{m.description}</p>
                <div className="flex items-center justify-between mt-auto">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{m.lessons} Detailed Lessons</div>
                   {getVideosForModule(m.id).length > 0 && <Video className="w-3.5 h-3.5 text-authority-blue opacity-50" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Full Curriculum (Accordion) */}
      <section className="py-24 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center font-serif">Deep Dive Curriculum</h2>
          <div className="space-y-4">
             {COURSE_MODULES.map((m) => {
               const moduleVideos = getVideosForModule(m.id);
               return (
                 <div key={m.id} className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
                   <button 
                    onClick={() => setOpenCurriculum(openCurriculum === m.id ? null : m.id)}
                    className="w-full p-6 flex items-center justify-between text-left font-bold hover:bg-slate-50 transition-colors"
                   >
                     <div className="flex items-center">
                       <span className="mr-3 text-authority-blue opacity-30">#0{m.id}</span>
                       <span>{m.title}</span>
                     </div>
                     <ChevronDown className={`w-5 h-5 transition-transform ${openCurriculum === m.id ? 'rotate-180' : ''}`} />
                   </button>
                   {openCurriculum === m.id && (
                     <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2">
                       <p className="text-sm text-text-muted italic mb-6 mt-4">{m.description}</p>
                       
                       {moduleVideos.length > 0 && (
                          <div className="mb-8 space-y-3">
                             <h5 className="text-[10px] font-black uppercase tracking-widest text-authority-blue">Dynamic Preview Clip</h5>
                             <div className="rounded-2xl overflow-hidden border border-border-light bg-black aspect-video">
                                <video src={moduleVideos[0].url} className="w-full h-full object-cover" controls />
                             </div>
                          </div>
                       )}

                       <ul className="space-y-3">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Key Learning Objectives</h5>
                          {[1,2,3,4].map(l => (
                            <li key={l} className="flex items-center text-sm text-text-muted">
                              <BookOpen className="w-3.5 h-3.5 mr-3 text-authority-blue/50" />
                              Section {m.id}.{l}: Comprehensive Regulatory Framework Breakdown
                            </li>
                          ))}
                       </ul>
                     </div>
                   )}
                 </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* 4. Pricing Tiers */}
      <section id="pricing" className="py-24 border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Choose Your Level</h2>
            <p className="text-text-muted">Investment in your business's long-term survival.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Self-Paced</h3>
              <p className="text-4xl font-black mb-8">$397</p>
              <ul className="space-y-4 mb-12 text-sm text-text-muted flex-grow">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Full Access to 8 Modules</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Audit-Ready Templates</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Lifetime Updates</li>
              </ul>
              <button className="w-full border-2 border-authority-blue py-4 rounded-xl font-bold hover:bg-authority-blue hover:text-white transition-all">Select Self-Paced</button>
            </div>
            {/* Tier 2 (Featured) */}
            <div className="bg-authority-blue text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              <h3 className="text-2xl font-bold mb-4">Mastery Bundle</h3>
              <p className="text-4xl font-black mb-8">$797</p>
              <ul className="space-y-4 mb-12 text-sm opacity-80 flex-grow">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Everything in Self-Paced</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Weekly Group Q&A Calls</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Audit Readiness Certificate</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Private Community Access</li>
              </ul>
              <button className="w-full bg-signal-gold text-authority-blue py-4 rounded-xl font-bold shadow-xl">Start Mastery Now</button>
            </div>
            {/* Tier 3 */}
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Concierge Elite</h3>
              <p className="text-4xl font-black mb-8">$1,497</p>
              <ul className="space-y-4 mb-12 text-sm text-text-muted flex-grow">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Everything in Mastery</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> 1-on-1 Safety Consultation</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Custom Mock Safety Audit</li>
              </ul>
              <button className="w-full border-2 border-authority-blue py-4 rounded-xl font-bold">Inquire About Elite</button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What's Included */}
      <section className="py-24 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-5xl font-bold font-serif mb-8">What's Truly Included</h2>
               <p className="text-lg text-text-muted mb-12">We don't just give you videos. We provide the physical framework for your business success.</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="flex items-start space-x-4">
                   <CheckCircle2 className="w-6 h-6 text-authority-blue" />
                   <div>
                     <h4 className="font-bold">Checklists</h4>
                     <p className="text-xs text-text-muted">40+ pages of downloadable checklists.</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-4">
                   <CheckCircle2 className="w-6 h-6 text-authority-blue" />
                   <div>
                     <h4 className="font-bold">Templates</h4>
                     <p className="text-xs text-text-muted">Custom DVIRs and DQ file layouts.</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="relative">
                <img src="https://picsum.photos/seed/curriculum/600/600" alt="LaunchPath Curriculum Overview" className="rounded-[3rem] shadow-2xl border-8 border-white dark:border-gray-800" />
             </div>
           </div>
        </div>
      </section>

      {/* 6. Guarantee */}
      <section className="py-24 border-y border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-signal-gold mx-auto mb-8" />
          <h2 className="text-3xl font-bold font-serif mb-6">30-Day Money-Back Guarantee</h2>
          <p className="text-xl text-text-muted leading-relaxed">
            If you don't find the curriculum more valuable than any "consultant" you've hired, we'll refund your full enrollment fee. No questions asked. We're confident because our methodology works.
          </p>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
           <h2 className="text-3xl font-bold mb-12 text-center font-serif">Enrollment FAQ</h2>
           <div className="space-y-6">
              {[
                {q: "When can I start?", a: "Immediately. Access is granted as soon as payment is confirmed."},
                {q: "Is there a monthly fee?", a: "No. Enrollment is a one-time fee for lifetime access."},
                {q: "Can I use this for CDL operations too?", a: "Yes. While we focus on non-CDL box trucks, the federal compliance requirements (HOS, DQ, Maintenance) are nearly identical."}
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 dark:bg-surface-dark p-6 rounded-2xl">
                  <h4 className="font-bold mb-2">{faq.q}</h4>
                  <p className="text-sm text-text-muted">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 8. Final CTA (Enrollment Form) */}
      <section className="py-24 bg-authority-blue text-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif mb-4">Start Your Journey Today</h2>
            <p className="opacity-70">Complete the form below to secure your enrollment.</p>
          </div>
          <form onSubmit={handleEnroll} className="space-y-6 bg-white dark:bg-surface-dark p-12 rounded-[3rem] shadow-2xl text-text-primary dark:text-text-dark-primary">
            <input required placeholder="Full Name" className="w-full px-5 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Email Address" className="w-full px-5 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input required type="password" placeholder="Create Password" className="w-full px-5 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            <button type="submit" className="w-full bg-signal-gold text-authority-blue py-5 rounded-2xl font-bold shadow-xl">Complete Enrollment & Start Module 0</button>
            <p className="text-[10px] text-center text-text-muted mt-6 uppercase tracking-widest font-bold">Secure Stripe Payment Processing • Encrypted Access</p>
          </form>
        </div>
      </section>

    </div>
  );
};

export default EnrollPage;
