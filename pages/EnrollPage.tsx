
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
  Mail,
  ArrowRight,
  Target,
  Award,
  BookOpen
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
    alert("Enrollment successful! Please check your email for access instructions.");
    navigate('/'); 
  };

  // Safe access to checkout URLs to prevent undefined property errors
  const urls = settings?.checkoutUrls || { selfPaced: '', mastery: '', elite: '' };

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen">
      
      {/* Hero Section */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 animate-reveal-up">
          <div className="inline-flex items-center space-x-2 bg-authority-blue text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-3 h-3" />
            <span>Official Carrier Mastery Curriculum</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-tight text-authority-blue dark:text-white tracking-tighter">The Carrier Mastery Program</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            From Authority Registration to Audit Readiness. Everything you need to build, protect, and scale your motor carrier in one structured system.
          </p>
          <a href="#pricing" className="bg-authority-blue text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:bg-steel-blue transition-all active:scale-95">
            Secure Your Spot →
          </a>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-24 border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 stagger-parent">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 stagger-item">Choose Your Level</h2>
            <p className="text-text-muted font-medium stagger-item">Investment in your business's long-term survival.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1: Self-Paced */}
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col hover:shadow-xl transition-all group">
              <h3 className="text-2xl font-bold mb-4">Self-Paced</h3>
              
              <div className="text-center mb-6">
                <div className="text-sm text-text-muted line-through mb-2">$597</div>
                <div className="text-5xl font-bold text-authority-blue dark:text-white">$397</div>
              </div>

              <ul className="space-y-4 mb-8 text-sm text-text-muted flex-grow font-medium">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Full Access to 8 Modules</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Audit-Ready Templates</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Lifetime Updates</li>
              </ul>

              <button className="w-full border-2 border-authority-blue py-4 rounded-xl font-bold hover:bg-authority-blue hover:text-white transition-all mt-8 active:scale-95">Select Self-Paced</button>
            </div>

            {/* Tier 2: Mastery Bundle */}
            <div className="bg-authority-blue text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col relative transform lg:scale-105 z-10 border-4 border-signal-gold/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              <h3 className="text-2xl font-bold mb-4">Mastery Bundle</h3>
              
              <div className="text-center mb-6">
                <div className="text-sm text-white/50 line-through mb-2">$1,197</div>
                <div className="text-5xl font-bold text-white">$797</div>
              </div>

              <ul className="space-y-4 mb-8 text-sm opacity-90 flex-grow font-medium">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Everything in Self-Paced</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Weekly Group Q&A Calls</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Audit Readiness Certificate</li>
              </ul>

              <button className="w-full bg-signal-gold text-authority-blue py-4 rounded-xl font-bold shadow-xl mt-8 active:scale-95 hover:bg-white transition-all">Start Mastery Now</button>
            </div>

            {/* Tier 3: Concierge Elite */}
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-4">Concierge Elite</h3>
              
              <div className="text-center mb-6">
                <div className="text-sm text-text-muted line-through mb-2">$1,997</div>
                <div className="text-5xl font-bold text-authority-blue dark:text-white">$1,497</div>
              </div>

              <ul className="space-y-4 mb-8 text-sm text-text-muted flex-grow font-medium">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Everything in Mastery</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> 1-on-1 Safety Consultation</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Custom Mock Safety Audit</li>
              </ul>

              <button className="w-full border-2 border-authority-blue py-4 rounded-xl font-bold mt-8 active:scale-95 hover:bg-authority-blue hover:text-white transition-all">Inquire About Elite</button>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-24 bg-authority-blue text-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12 animate-reveal-up">
            <h2 className="text-4xl font-bold font-serif mb-4">Secure Enrollment Portal</h2>
            <p className="opacity-70 font-medium">Verified by LaunchPath Safety Compliance Division</p>
          </div>
          <form onSubmit={handleEnroll} className="space-y-6 bg-white dark:bg-surface-dark p-12 rounded-[3rem] shadow-2xl text-text-primary dark:text-text-dark-primary animate-scale-in">
            
            {/* Full Name Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <User size={18} />
                </div>
                <input 
                  required 
                  name="name"
                  placeholder="Full Legal Name" 
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all font-bold ${
                    touched.name 
                      ? validation.errors.name 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-green-500 focus:ring-green-200' 
                      : 'border-border-light dark:border-border-dark focus:ring-authority-blue'
                  }`}
                  value={formData.name} 
                  onChange={handleInputChange} 
                  onBlur={() => handleBlur('name')}
                />
                {touched.name && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {validation.errors.name ? (
                      <AlertCircle className="text-red-500" size={18} />
                    ) : (
                      <CheckCircle2 className="text-green-500" size={18} />
                    )}
                  </div>
                )}
              </div>
              {touched.name && validation.errors.name && (
                <p className="text-xs text-red-500 font-bold ml-2 animate-in fade-in slide-in-from-top-1">{validation.errors.name}</p>
              )}
            </div>

            {/* Email Address Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Mail size={18} />
                </div>
                <input 
                  required 
                  name="email"
                  type="email" 
                  placeholder="Professional Email Address" 
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all font-bold ${
                    touched.email 
                      ? validation.errors.email 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-green-500 focus:ring-green-200' 
                      : 'border-border-light dark:border-border-dark focus:ring-authority-blue'
                  }`}
                  value={formData.email} 
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('email')}
                />
                {touched.email && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {validation.errors.email ? (
                      <AlertCircle className="text-red-500" size={18} />
                    ) : (
                      <CheckCircle2 className="text-green-500" size={18} />
                    )}
                  </div>
                )}
              </div>
              {touched.email && validation.errors.email && (
                <p className="text-xs text-red-500 font-bold ml-2 animate-in fade-in slide-in-from-top-1">{validation.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <Lock size={18} />
                </div>
                <input 
                  required 
                  name="password"
                  type="password" 
                  placeholder="Create Master Password" 
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all font-bold ${
                    touched.password 
                      ? validation.errors.password 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-green-500 focus:ring-green-200' 
                      : 'border-border-light dark:border-border-dark focus:ring-authority-blue'
                  }`}
                  value={formData.password} 
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('password')}
                />
                {touched.password && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {validation.errors.password ? (
                      <AlertCircle className="text-red-500" size={18} />
                    ) : (
                      <CheckCircle2 className="text-green-500" size={18} />
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center px-2">
                {touched.password && validation.errors.password ? (
                  <p className="text-xs text-red-500 font-bold animate-in fade-in slide-in-from-top-1">{validation.errors.password}</p>
                ) : (
                  <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Master access code</p>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!validation.isValid}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all ${
                validation.isValid 
                  ? 'bg-signal-gold text-authority-blue hover:bg-authority-blue hover:text-white active:scale-[0.98]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale'
              }`}
            >
              Complete Enrollment
            </button>

            <div className="flex items-center justify-center space-x-4 mt-8 opacity-40">
               <ShieldCheck size={16} />
               <p className="text-[10px] text-center uppercase tracking-widest font-black">256-bit SSL Encrypted • Compliance Verified</p>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
};

export default EnrollPage;
