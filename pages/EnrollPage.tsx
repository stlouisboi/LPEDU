
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  CreditCard, 
  ShieldAlert, 
  FileText, 
  ArrowRight,
  UserCheck,
  AlertCircle,
  Users,
  Target
} from 'lucide-react';
import { useApp } from '../App';

const EnrollPage = () => {
  const { login, addFormSubmission } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value) error = 'Full name is required';
      else if (value.length < 2) error = 'Name must be at least 2 characters';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = 'Email address is required';
      else if (!emailRegex.test(value)) error = 'Please enter a valid email address';
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 8) error = 'Password must be at least 8 characters';
    }
    return error;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validate(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field as keyof typeof touched]) {
      const error = validate(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const isFormValid = !errors.name && !errors.email && !errors.password && 
                      formData.name && formData.email && formData.password;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check
    const nameErr = validate('name', formData.name);
    const emailErr = validate('email', formData.email);
    const passErr = validate('password', formData.password);

    if (nameErr || emailErr || passErr) {
      setErrors({ name: nameErr, email: emailErr, password: passErr });
      setTouched({ name: true, email: true, password: true });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addFormSubmission({
        type: 'Enrollment',
        date: new Date().toISOString(),
        ...formData
      });
      login();
      navigate('/admin'); 
    }, 1500);
  };

  const getInputClass = (field: string) => {
    const base = "w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-gray-800 border rounded-2xl outline-none transition-all";
    if (touched[field as keyof typeof touched] && errors[field as keyof typeof errors]) {
      return `${base} border-red-500 ring-4 ring-red-500/10 focus:border-red-500`;
    }
    if (touched[field as keyof typeof touched] && !errors[field as keyof typeof errors]) {
      return `${base} border-green-500 focus:border-green-500 focus:ring-4 focus:ring-green-500/10`;
    }
    return `${base} border-border-light dark:border-border-dark focus:ring-4 focus:ring-authority-blue/10 focus:border-authority-blue`;
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen pt-12 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bridge Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue dark:text-steel-blue px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Lock className="w-3 h-3" />
            <span>Secure Registration</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">Professional Carrier Enrollment</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-3xl mx-auto leading-relaxed">
            Take the first step toward building a compliant, resilient trucking business. Our curriculum is designed to move you from uncertainty to mastery.
          </p>
        </div>

        {/* Deep Dive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm">
            <h2 className="text-xl font-bold font-serif mb-6 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-authority-blue" />
              What LaunchPath Is
            </h2>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Compliance-first education built on verified FMCSA Part 390-399 guidance.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                <span>A structured library of checklists, templates, and record-keeping systems.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Ongoing regulatory updates so your business stays current.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm">
            <h2 className="text-xl font-bold font-serif mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-steel-blue" />
              Who This Program Is For
            </h2>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue flex-shrink-0 mt-0.5" />
                <span>New box truck operators starting their journey.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue flex-shrink-0 mt-0.5" />
                <span>New authorities (MC/DOT) within their first 12 months.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue flex-shrink-0 mt-0.5" />
                <span>Owner-operators seeking compliance clarity and structure.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue flex-shrink-0 mt-0.5" />
                <span>Fleet managers building a safety-first culture.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm">
            <h2 className="text-xl font-bold font-serif mb-6 flex items-center">
              <ShieldAlert className="w-6 h-6 mr-3 text-signal-gold" />
              Who This Is NOT For
            </h2>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-start">
                <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Shortcut seekers looking to bypass federal safety rules.</span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Individuals with an "operate now, fix later" mindset.</span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Anyone unwilling to maintain professional record-keeping.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Enrollment Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-surface-dark p-12 rounded-[3rem] border border-border-light dark:border-border-dark shadow-2xl relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-serif mb-2">Final Step: Create Your Account</h2>
              <p className="text-text-muted">Access your modules and templates instantly.</p>
            </div>
            
            <form onSubmit={handleEnroll} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <div className="relative">
                   <UserCheck className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.name && errors.name ? 'text-red-500' : 'text-text-muted'}`} />
                   <input 
                     required
                     type="text" 
                     className={getInputClass('name')}
                     placeholder="John Doe"
                     value={formData.name}
                     onBlur={() => handleBlur('name')}
                     onChange={e => handleChange('name', e.target.value)}
                   />
                </div>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs font-bold flex items-center pt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3 mr-1" /> {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <div className="relative">
                   <FileText className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.email && errors.email ? 'text-red-500' : 'text-text-muted'}`} />
                   <input 
                     required
                     type="email" 
                     className={getInputClass('email')}
                     placeholder="john@carrier.com"
                     value={formData.email}
                     onBlur={() => handleBlur('email')}
                     onChange={e => handleChange('email', e.target.value)}
                   />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs font-bold flex items-center pt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3 mr-1" /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold mb-2">Create Password</label>
                <div className="relative">
                   <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.password && errors.password ? 'text-red-500' : 'text-text-muted'}`} />
                   <input 
                     required
                     type="password" 
                     className={getInputClass('password')}
                     placeholder="••••••••"
                     value={formData.password}
                     onBlur={() => handleBlur('password')}
                     onChange={e => handleChange('password', e.target.value)}
                   />
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs font-bold flex items-center pt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3 mr-1" /> {errors.password}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-bold mb-4 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Details
                </label>
                <div className="p-5 bg-gray-100 dark:bg-gray-800/50 border border-dashed border-border-light dark:border-border-dark rounded-2xl text-center">
                   <p className="text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Enrollment Fee: $497</p>
                   <p className="text-[10px] text-text-muted">Test Mode: Payment processing placeholder</p>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || (Object.values(touched).some(t => t) && !isFormValid)}
                className="w-full bg-authority-blue text-white font-bold py-5 rounded-2xl flex items-center justify-center space-x-2 hover:bg-steel-blue transition-all shadow-xl hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <span>Enroll in LaunchPath</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            
            <p className="mt-8 text-[10px] text-center text-text-muted leading-relaxed uppercase tracking-tighter">
              By enrolling, you agree to our Terms of Service. LaunchPath is for educational use only and does not guarantee audit success or provide legal/dispatching services.
            </p>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="flex items-center space-x-6 grayscale opacity-40">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_the_United_States_Department_of_Transportation.svg/1024px-Logo_of_the_United_States_Department_of_Transportation.svg.png" alt="DOT" className="h-8" />
             <span className="font-bold text-xs uppercase tracking-widest">Compliant with FMCSA Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;
