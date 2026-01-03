
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Flag,
  Trophy,
  Clock,
  Zap,
  Briefcase,
  ShieldCheck,
  Download
} from 'lucide-react';
import { ROADMAP_STEPS } from '../constants';

const LearningPathPage = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Foundation': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'Moderate': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Advanced': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen pb-32 animate-in fade-in duration-700">
      {/* Premium Header */}
      <section className="relative py-24 bg-authority-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-steel-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
            <Zap className="w-3 h-3 text-signal-gold" />
            <span>Structured Career Journey</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight">The Carrier Success Roadmap</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 font-medium">
            Trucking isn't a "get rich quick" scheme—it's a professional regulated industry. 
            This roadmap is your curriculum for building a company that survives the first year and beyond.
          </p>
          <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
            In an industry governed by thousands of pages of federal regulations, a haphazard approach to safety isn't just risky—it's a business-ender. This structured roadmap deconstructs complex FMCSA requirements into actionable, time-bound phases. By following this sequence, you aren't just checking boxes; you're installing a robust operational shield that protects your authority, reduces your insurance risk, and ensures you stay moving while others are sidelined by audits.
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <Clock className="w-5 h-5 text-signal-gold" />
              <span className="text-sm font-semibold">12 Month Comprehensive Path</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-signal-gold" />
              <span className="text-sm font-semibold">FMCSA Verified Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Roadmap */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-signal-gold via-steel-blue to-authority-blue -translate-x-1/2 rounded-full hidden md:block opacity-30"></div>

          <div className="space-y-20">
            {ROADMAP_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep === step.id;

              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Node */}
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl z-20 shadow-xl border-4 transition-all duration-500 ${
                    isActive 
                    ? 'bg-white dark:bg-surface-dark border-signal-gold text-authority-blue scale-110' 
                    : 'bg-gray-100 dark:bg-gray-800 border-border-light dark:border-border-dark text-text-muted'
                  }`}>
                    {step.id}
                  </div>

                  {/* Left/Right Card Spacer for Desktop */}
                  <div className="hidden md:block md:w-[45%]"></div>

                  {/* The actual Card */}
                  <div className="w-full md:w-[45%] pl-16 md:pl-0">
                    <div 
                      onClick={() => setActiveStep(step.id)}
                      className={`group bg-white dark:bg-surface-dark p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl relative overflow-hidden ${
                        isActive 
                        ? 'border-authority-blue ring-4 ring-authority-blue/5 translate-y-[-4px]' 
                        : 'border-border-light dark:border-border-dark grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      {/* Highlight Bar for Active Step */}
                      {isActive && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-authority-blue to-steel-blue"></div>}

                      <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-blue mb-2 block">{step.phase}</span>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-2xl md:text-3xl font-bold font-serif leading-tight">{step.title}</h3>
                          <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-authority-blue text-white' : 'bg-gray-50 dark:bg-gray-800 text-text-muted'}`}>
                            {isActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>

                      <p className="text-text-muted dark:text-text-dark-muted mb-6 leading-relaxed text-base">{step.description}</p>
                      
                      {/* Preview Stats */}
                      <div className="flex flex-wrap gap-4 mb-2">
                        <div className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${getDifficultyColor(step.difficulty)}`}>
                          <Zap className="w-3 h-3 mr-1.5" />
                          {step.difficulty}
                        </div>
                        <div className="flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-gray-800 text-text-muted">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {step.timeline}
                        </div>
                      </div>

                      {isActive && (
                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
                          {/* Details Section */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-authority-blue dark:text-steel-blue flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Key Requirements
                            </h4>
                            <ul className="grid grid-cols-1 gap-3">
                              {step.details.map((detail, i) => (
                                <li key={i} className="flex items-start text-sm group/item">
                                  <div className="w-1.5 h-1.5 bg-signal-gold rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                                  <span className="text-text-muted dark:text-text-dark-muted">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tools Section */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-steel-blue flex items-center">
                              <Briefcase className="w-4 h-4 mr-2" />
                              Required Toolset
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {step.tools.map((tool, i) => (
                                <span key={i} className="px-3 py-1.5 bg-authority-blue/5 text-authority-blue dark:text-steel-blue text-[10px] font-bold uppercase rounded-lg border border-authority-blue/10">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Pitfalls Section */}
                          <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400 mb-4 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Fatal Mistakes to Avoid
                            </h4>
                            <ul className="space-y-3">
                              {step.mistakes.map((mistake, i) => (
                                <li key={i} className="text-xs text-red-700/80 dark:text-red-300/80 italic flex items-start">
                                  <span className="mr-2">"</span>
                                  {mistake}
                                  <span className="ml-1">"</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <button className="w-full bg-authority-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-steel-blue transition-all">
                             <Download className="w-5 h-5" />
                             <span>Download Phase {step.id} Pack</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Final Mastery Step */}
            <div className="relative z-10 flex flex-col items-center mt-32 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-signal-gold rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="bg-authority-blue text-white w-48 h-48 rounded-[3rem] flex flex-col items-center justify-center shadow-2xl relative z-10 border-4 border-signal-gold/30">
                  <Trophy className="w-12 h-12 mb-2 text-signal-gold" />
                  <span className="font-bold text-sm uppercase tracking-widest">Compliant Carrier</span>
                </div>
              </div>
              <div className="mt-8 max-w-sm">
                <h3 className="text-2xl font-bold font-serif mb-2">Sustainable Success</h3>
                <p className="text-text-muted text-sm">You are now part of the top 5% of carriers who treat compliance as a competitive advantage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Action Card */}
        <div className="mt-32 p-12 lg:p-20 bg-white dark:bg-surface-dark rounded-[4rem] border border-border-light dark:border-border-dark text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-steel-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-authority-blue/5 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-serif leading-tight">Your Career Path Starts with Action</h2>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto leading-relaxed mb-12">
            Don't navigate this maze alone. Download our complete Carrier Mastery PDF and get a physical copy of every checklist mentioned in this roadmap.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-authority-blue text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-steel-blue transition-all shadow-xl hover:shadow-2xl flex items-center group">
              Get the Roadmap PDF
              <Download className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <a href="#/contact" className="text-authority-blue dark:text-steel-blue font-bold text-lg hover:underline decoration-2 underline-offset-8">
              Consult with a Specialist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage;
