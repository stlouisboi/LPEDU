import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle,
  CheckCircle2, 
  Lock, 
  ChevronDown,
  Video,
  AlertCircle,
  User,
  // Fix: Added missing 'Users' import for Tier 2 Mastery icon
  Users,
  Mail,
  ArrowRight,
  Target,
  Award,
  BookOpen,
  Scale,
  FileText
} from 'lucide-react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { useApp } from '../App';
import { COURSE_MODULES } from '../constants';
import { GeneratedVideo } from '../types';

/**
 * AccordionItem component for FAQ section
 */
const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border-light dark:border-border-dark rounded-2xl overflow-hidden bg-white dark:bg-surface-dark">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none"
      >
        <span className="font-bold text-lg pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="p-6 pt-0 text-text-muted dark:text-text-dark-muted leading-relaxed border-t border-gray-100 dark:border-gray-800">
          {answer}
        </p>
      </div>
    </div>
  );
};

const EnrollPage = () => {
  const { settings, addFormSubmission } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "generatedVideos"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedVideo));
      setVideos(data);
    }, (error) => {
      console.warn("EnrollPage: Video preview sync limited.", error);
    });
    return unsub;
  }, []);

  const validation = useMemo(() => {
    const errors = {
      name: formData.name.length < 2 ? 'Please enter your full name.' : null,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Please enter a valid professional email.' : null,
      password: formData.password.length < 8 ? 'Password must be at least 8 characters long.' : null
    };

    return {
      errors,
      isValid: !errors.name && !errors.email && !errors.password
    };
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid) return;

    addFormSubmission({ type: 'Course Enrollment', ...formData, date: new Date().toISOString() });
    alert("Enrollment request received. Please check your email for access instructions.");
    navigate('/'); 
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen">
      
      {/* Hero Section */}
      <section className="py-24 bg-white dark:bg-surface-dark/30 text-center relative overflow-hidden border-b border-border-light dark:border-border-dark">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 animate-reveal-up">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-authority-blue/10">
            <BookOpen className="w-3 h-3 text-signal-gold" />
            <span>Carrier Compliance Education Curriculum</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-serif mb-8 leading-[0.95] text-authority-blue dark:text-white tracking-tighter uppercase">
            Carrier Operations <br/><span className="text-signal-gold">Education.</span>
          </h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            A structured implementation framework for new motor carriers. We teach the technical discipline required to navigate your first 90 days of operation.
          </p>
          
          <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-border-light dark:border-border-dark max-w-xl mx-auto text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
              LaunchPath is an educational program. Information provided does not constitute legal, tax, financial, insurance, or regulatory advice. No outcomes or approvals are guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 stagger-parent">
            <h2 className="text-4xl md:text-6xl font-black font-serif mb-6 stagger-item text-authority-blue dark:text-white uppercase tracking-tight leading-none">Enrollment Options</h2>
            <p className="text-xl text-text-muted font-medium stagger-item italic">Choose the level of educational support your operation requires.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Tier 1: Self-Paced Fundamentals */}
            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-border-light dark:border-border-dark flex flex-col hover:shadow-2xl transition-all group h-full">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white">Self-Paced <br/>Fundamentals</h3>
                <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue">
                  <BookOpen size={24} />
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-6xl font-black tracking-tighter text-signal-gold">397</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">Lifetime Curriculum Access</p>
              </div>

              <ul className="space-y-4 mb-12 text-sm text-text-muted flex-grow font-bold">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Educational Implementation Modules</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Compliance Template Library</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Regulatory Filing Walkthroughs</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Ongoing Curriculum Updates</li>
              </ul>

              <button className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all active:scale-95 shadow-xl">Select Fundamentals</button>
            </div>

            {/* Tier 2: Implementation Mastery */}
            <div className="bg-authority-blue text-white p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(30,58,95,0.3)] flex flex-col relative transform lg:scale-105 z-10 border-4 border-signal-gold/20 h-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-widest shadow-xl">Capacity Based Access</div>
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Implementation <br/>Mastery</h3>
                <div className="p-3 bg-white/10 rounded-2xl text-signal-gold">
                  {/* Correctly using the Users icon which is now imported */}
                  <Users size={24} />
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-6xl font-black tracking-tighter text-white">797</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-2">Curriculum + Group Education</p>
              </div>

              <ul className="space-y-4 mb-12 text-sm opacity-90 flex-grow font-bold">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Everything in Self-Paced Tier</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Weekly Group Implementation Calls</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Peer Document Review Sessions</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Program Completion Certificate</li>
              </ul>

              <button className="w-full bg-signal-gold text-authority-blue py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 hover:bg-white transition-all">Start Implementation</button>
            </div>

            {/* Tier 3: Individualized Guided Review */}
            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-border-light dark:border-border-dark flex flex-col hover:shadow-2xl transition-all h-full group">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white">Individualized <br/>Guided Review</h3>
                <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue">
                  <Scale size={24} />
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-6xl font-black tracking-tighter text-authority-blue dark:text-white">1,497</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">High-Touch Individual Education</p>
              </div>

              <ul className="space-y-4 mb-12 text-sm text-text-muted flex-grow font-bold">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Everything in Mastery Tier</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Individual Process Review Sessions</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Student Document Educational Assessment</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Custom Implementation Milestones</li>
              </ul>

              <button className="w-full border-4 border-authority-blue py-5 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 hover:bg-authority-blue hover:text-white transition-all">Inquire For Review</button>
            </div>
          </div>

          <div className="mt-20 p-10 bg-slate-50 dark:bg-gray-800/30 rounded-[3rem] border-2 border-dashed border-border-light text-center">
            <p className="text-xs font-bold text-text-muted leading-relaxed uppercase tracking-widest">
              Educational Access Only. LaunchPath provides procedural training and technical frameworks. We do not provide legal services, insurance brokerage, or guaranteed regulatory approvals.
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-reveal-up">
            <h2 className="text-4xl font-black font-serif mb-4 uppercase tracking-tight">Secure Access Portal</h2>
            <p className="opacity-70 font-bold uppercase tracking-widest text-[11px]">Identity verification and curriculum provisioning</p>
          </div>
          <form onSubmit={handleEnroll} className="space-y-6 bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] text-text-primary dark:text-text-dark-primary animate-scale-in">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">Full Legal Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <User size={18} />
                </div>
                <input 
                  required 
                  name="name"
                  placeholder="John Doe" 
                  className={`w-full pl-12 pr-12 py-5 border-4 rounded-3xl outline-none focus:ring-0 bg-gray-50 dark:bg-gray-800 transition-all font-bold ${
                    touched.name 
                      ? validation.errors.name 
                        ? 'border-red-100' 
                        : 'border-green-50' 
                      : 'border-slate-50 dark:border-border-dark focus:border-authority-blue'
                  }`}
                  value={formData.name} 
                  onChange={handleInputChange} 
                  onBlur={() => handleBlur('name')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">Professional Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Mail size={18} />
                </div>
                <input 
                  required 
                  name="email"
                  type="email" 
                  placeholder="name@carrier.com" 
                  className={`w-full pl-12 pr-12 py-5 border-4 rounded-3xl outline-none focus:ring-0 bg-gray-50 dark:bg-gray-800 transition-all font-bold ${
                    touched.email 
                      ? validation.errors.email 
                        ? 'border-red-100' 
                        : 'border-green-50' 
                      : 'border-slate-50 dark:border-border-dark focus:border-authority-blue'
                  }`}
                  value={formData.email} 
                  onChange={handleInputChange} 
                  onBlur={() => handleBlur('email')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">Account Access Code</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Lock size={18} />
                </div>
                <input 
                  required 
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  className={`w-full pl-12 pr-12 py-5 border-4 rounded-3xl outline-none focus:ring-0 bg-gray-50 dark:bg-gray-800 transition-all font-bold ${
                    touched.password 
                      ? validation.errors.password 
                        ? 'border-red-100' 
                        : 'border-green-50' 
                      : 'border-slate-50 dark:border-border-dark focus:border-authority-blue'
                  }`}
                  value={formData.password} 
                  onChange={handleInputChange} 
                  onBlur={() => handleBlur('password')}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!validation.isValid}
              className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] shadow-2xl transition-all text-xs ${
                validation.isValid 
                  ? 'bg-signal-gold text-authority-blue hover:bg-authority-blue hover:text-white active:scale-[0.98]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale'
              }`}
            >
              Initialize Enrollment
            </button>

            <div className="flex flex-col items-center justify-center space-y-4 mt-8">
               <div className="flex items-center space-x-3 opacity-30">
                  <ShieldCheck size={16} />
                  <p className="text-[9px] uppercase tracking-widest font-black">Secure Endpoint Verified</p>
               </div>
               <p className="text-[8px] text-center uppercase tracking-tighter text-text-muted font-bold max-w-xs leading-relaxed">
                 By initializing enrollment, you acknowledge that LaunchPath is an educational program and not a professional advisory or legal service.
               </p>
            </div>
          </form>
        </div>
      </section>

      {/* Trust Signatures */}
      <section className="py-20 bg-white dark:bg-primary-dark">
         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale">
            <div className="flex items-center space-x-3">
               <Scale size={24} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Compliance Focused</span>
            </div>
            <div className="flex items-center space-x-3">
               <FileText size={24} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Technical Curriculum</span>
            </div>
            <div className="flex items-center space-x-3">
               <Target size={24} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Audit Framework</span>
            </div>
         </div>
      </section>

    </div>
  );
};

export default EnrollPage;