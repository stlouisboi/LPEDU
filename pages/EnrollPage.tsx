
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle,
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
  Video,
  AlertCircle,
  User,
  Mail
} from 'lucide-react';
import { collection, query, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-authority-blue text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-3 h-3" />
            <span>Official Carrier Mastery Curriculum</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-tight text-authority-blue dark:text-white">The Carrier Mastery Program</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            From Authority Registration to Audit Readiness. Everything you need to build, protect, and scale your motor carrier in one structured system. Works for box trucks, step vans, and semis.
          </p>
          <a href="#pricing" className="bg-authority-blue text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:bg-steel-blue transition-all">
            Secure Your Spot →
          </a>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-24 border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Choose Your Level</h2>
            <p className="text-text-muted">Investment in your business's long-term survival.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1: Self-Paced */}
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-4">Self-Paced</h3>
              
              <div className="text-center mb-6">
                <div className="text-sm text-text-muted line-through mb-2">$597</div>
                <div className="text-5xl font-bold text-authority-blue dark:text-white">$397</div>
                <div className="text-xs font-bold text-signal-gold uppercase tracking-widest mt-2">
                  Launch Special
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-sm text-text-muted flex-grow">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Full Access to 8 Modules</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Audit-Ready Templates</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Lifetime Updates</li>
              </ul>

              <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
                  Perfect For:
                </h4>
                <ul className="space-y-2 text-sm text-text-muted dark:text-text-dark-muted">
                  <li className="flex items-start">
                    <span className="mr-2">→</span>
                    <span>Self-motivated owner-operators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">→</span>
                    <span>Those with basic compliance knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">→</span>
                    <span>Budget-conscious new carriers</span>
                  </li>
                </ul>
              </div>

              {urls.selfPaced ? (
                <a href={urls.selfPaced} target="_blank" rel="noopener noreferrer" className="w-full text-center border-2 border-authority-blue py-4 rounded-xl font-bold hover:bg-authority-blue hover:text-white transition-all mt-8">Select Self-Paced</a>
              ) : (
                <button className="w-full border-2 border-authority-blue py-4 rounded-xl font-bold hover:bg-authority-blue hover:text-white transition-all mt-8">Select Self-Paced</button>
              )}
            </div>

            {/* Tier 2: Mastery Bundle */}
            <div className="bg-authority-blue text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col relative transform lg:scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              <h3 className="text-2xl font-bold mb-4">Mastery Bundle</h3>
              
              <div className="text-center mb-6">
                <div className="text-sm text-white/50 line-through mb-2">$1,197</div>
                <div className="text-5xl font-bold text-white">$797</div>
                <div className="text-xs font-bold text-signal-gold uppercase tracking-widest mt-2">
                  Save $400
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-sm opacity-90 flex-grow">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Everything in Self-Paced</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Weekly Group Q&A Calls</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Audit Readiness Certificate</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-signal-gold" /> Private Community Access</li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-signal-gold mb-3">
                  Perfect For:
                </h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start">
                    <span className="mr-2">→</span>
                    <span>Carriers preparing for their first audit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">→</span>
                    <span>Those who want expert guidance & support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">→</span>
                    <span>Operators serious about long-term compliance</span>
                  </li>
                </ul>
              </div>

              {urls.mastery ? (
                <a href={urls.mastery} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-signal-gold text-authority-blue py-4 rounded-xl font-bold shadow-xl mt-8">Start Mastery Now</a>
              ) : (
                <button className="w-full bg-signal-gold text-authority-blue py-4 rounded-xl font-bold shadow-xl mt-8">Start Mastery Now</button>
              )}
            </div>

            {/* Tier 3: Concierge Elite */}
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-4">Concierge Elite</h3>
              
              <div className="text-center mb-6">
                <div className="text-sm text-text-muted line-through mb-2">$1,997</div>
                <div className="text-5xl font-bold text-authority-blue dark:text-white">$1,497</div>
                <div className="text-xs font-bold text-signal-gold uppercase tracking-widest mt-2">
                  Save $500
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-sm text-text-muted flex-grow">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Everything in Mastery</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> 1-on-1 Safety Consultation</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Custom Mock Safety Audit</li>
              </ul>

              {urls.elite ? (
                <a href={urls.elite} target="_blank" rel="noopener noreferrer" className="w-full text-center border-2 border-authority-blue py-4 rounded-xl font-bold mt-8">Inquire About Elite</a>
              ) : (
                <button className="w-full border-2 border-authority-blue py-4 rounded-xl font-bold mt-8">Inquire About Elite</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">Compare Plans</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-authority-blue">
                  <th className="text-left py-4 px-6 font-bold text-lg">Feature</th>
                  <th className="text-center py-4 px-6 font-bold">Self-Paced</th>
                  <th className="text-center py-4 px-6 font-bold bg-authority-blue/5 dark:bg-authority-blue/10">Mastery</th>
                  <th className="text-center py-4 px-6 font-bold">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {[
                  { feature: "8 Modules (46 Lessons)", self: true, mastery: true, elite: true },
                  { feature: "Audit-Ready Templates", self: true, mastery: true, elite: true },
                  { feature: "Lifetime Course Updates", self: true, mastery: true, elite: true },
                  { feature: "Weekly Live Q&A Calls", self: false, mastery: true, elite: true },
                  { feature: "Audit Readiness Certificate", self: false, mastery: true, elite: true },
                  { feature: "1-on-1 Safety Consultation", self: false, mastery: false, elite: true },
                  { feature: "Custom Mock Safety Audit", self: false, mastery: false, elite: true }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-sm">{row.feature}</td>
                    <td className="text-center py-4 px-6">{row.self ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : "—"}</td>
                    <td className="text-center py-4 px-6 bg-authority-blue/5 dark:bg-authority-blue/10">{row.mastery ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : "—"}</td>
                    <td className="text-center py-4 px-6">{row.elite ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30 border-b border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is this for CDL only?",
                a: "No. LaunchPath works whether you need a CDL or not. The course teaches compliance systems that apply to all motor carriers—we just call out where CDL vs non-CDL regulations differ. Module 0 helps you decide which path makes sense for your situation."
              },
              {
                q: "How long does the course take?",
                a: "Most students complete the core modules in 2-4 weeks working part-time. You get lifetime access, so you can move at your own pace and return as regulations change. The goal isn't speed—it's audit readiness before you file for authority."
              },
              {
                q: "What type of vehicle do I need to take this course?",
                a: "None yet. This course works whether you're considering a box truck, step van, or semi. LaunchPath teaches you how to evaluate your options and understand the compliance differences before you invest in equipment."
              },
              {
                q: "Will this help me find loads or teach me dispatch?",
                a: "No. LaunchPath focuses on compliance, audit readiness, and new-entrant survival—the things that get carriers shut down in their first 18 months. We teach you how to operate legally and sustainably."
              },
              {
                q: "Can I upgrade to a higher tier later?",
                a: "Yes! You can upgrade anytime by paying the difference between your current plan and the new one. Your progress is saved automatically."
              },
              {
                q: "When can I start the course?",
                a: "Immediately after enrollment! You'll receive instant access to Module 0 and all course materials via email within 60 seconds of purchase."
              }
            ].map((faq, idx) => (
              <AccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-24 bg-authority-blue text-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif mb-4">Start Your Journey Today</h2>
            <p className="opacity-70">Complete the form below to secure your enrollment.</p>
          </div>
          <form onSubmit={handleEnroll} className="space-y-6 bg-white dark:bg-surface-dark p-12 rounded-[3rem] shadow-2xl text-text-primary dark:text-text-dark-primary">
            
            {/* Full Name Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <User size={18} />
                </div>
                <input 
                  required 
                  name="name"
                  placeholder="Full Name" 
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all ${
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
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all ${
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
                  placeholder="Create Secure Password" 
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all ${
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
                  <p className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Min. 8 characters recommended</p>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!validation.isValid}
              className={`w-full py-5 rounded-2xl font-bold shadow-xl transition-all ${
                validation.isValid 
                  ? 'bg-signal-gold text-authority-blue hover:bg-white active:scale-[0.98]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed grayscale'
              }`}
            >
              Complete Enrollment & Start Module 0
            </button>

            <div className="flex items-center justify-center space-x-4 mt-8 opacity-50">
               <ShieldCheck size={16} />
               <p className="text-[10px] text-center uppercase tracking-widest font-bold">Secure SSL Encryption • Verified Course Provider</p>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
};

export default EnrollPage;
