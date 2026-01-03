
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Flag,
  Trophy
} from 'lucide-react';
import { ROADMAP_STEPS } from '../constants';

const DestinationPage = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-20 animate-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">The Owner-Operator Roadmap</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto">
            From "Just an Idea" to "Active & Compliant Carrier". Follow our verified path to navigate the complexities of FMCSA regulations.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 rounded-full hidden md:block"></div>

          <div className="space-y-16">
            {ROADMAP_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep === step.id;

              return (
                <div key={step.id} className="relative z-10">
                  <div className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Circle Indicator */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 border-4 border-authority-blue rounded-full flex items-center justify-center font-bold text-authority-blue z-20 shadow-md">
                      {step.id}
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div 
                        onClick={() => setActiveStep(step.id)}
                        className={`bg-white dark:bg-surface-dark p-8 rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                          isActive ? 'border-authority-blue ring-4 ring-authority-blue/5' : 'border-border-light dark:border-border-dark'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-2xl font-bold font-serif">{step.title}</h3>
                          {isActive ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                        </div>
                        <p className="text-text-muted dark:text-text-dark-muted mb-4">{step.description}</p>
                        
                        {isActive && (
                          <div className="space-y-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 animate-in fade-in duration-300">
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-widest text-steel-blue mb-4 flex items-center">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Critical Milestones
                              </h4>
                              <ul className="space-y-3">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="flex items-start text-sm">
                                    <div className="w-1.5 h-1.5 bg-authority-blue rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                              <h4 className="text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400 mb-3 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Common Pitfalls
                              </h4>
                              <ul className="space-y-2">
                                {step.mistakes.map((mistake, i) => (
                                  <li key={i} className="text-sm text-red-700 dark:text-red-300 italic">
                                    " {mistake} "
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Final Step */}
            <div className="relative z-10 flex justify-center mt-20">
              <div className="bg-authority-blue text-white p-10 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center shadow-2xl animate-pulse">
                <Trophy className="w-10 h-10 mb-2" />
                <span className="font-bold text-xs uppercase">Compliance Mastery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Thoughts */}
        <div className="mt-32 p-12 bg-white dark:bg-surface-dark rounded-[3rem] border border-border-light dark:border-border-dark text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">The Journey Never Truly Ends</h2>
          <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto leading-relaxed mb-10">
            Regulations change. FMCSA updates policies. New Entrant rules evolve. LaunchPath stays by your side with lifetime updates to our roadmap and resource library.
          </p>
          <button className="bg-authority-blue text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all">
            Download the PDF Checklist
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
