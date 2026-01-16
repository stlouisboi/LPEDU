import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ArrowRight, BookOpen, UserCheck, CreditCard, ShieldCheck, Target } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      title: "Program Details",
      icon: <BookOpen className="w-5 h-5" />,
      questions: [
        {
          q: "How long does LaunchPath take to complete?",
          a: "Most students get through the core curriculum in about 3-4 weeks if they're working a few hours a week. However, the roadmap is designed to follow your 90-day implementation phase, so you'll be using it as a reference while you actually build your business systems."
        },
        {
          q: "What's included in the course?",
          a: "You get the 6-module NOSCE framework, every compliance template I've developed (DQ files, maintenance logs, accident registers), and step-by-step video tutorials. I also provide a vetted list of industry providers to help you avoid the scams I've seen over the years."
        },
        {
          q: "Do I get lifetime access?",
          a: "Yes. Regulations change and FMCSA updates their rules constantly. When I update the course or the templates to reflect new laws, you get those updates at no extra cost for the life of the program. You can see the full roadmap here: /learning-path."
        },
        {
          q: "Is there a money-back guarantee?",
          a: "I offer a 14-day 'Accuracy Guarantee.' If you log in and feel the technical depth isn't what I promised, or if you find the systems aren't applicable to your carrier, just let me know. I ain't in the business of keeping money from folks who don't find value in my work."
        }
      ]
    },
    {
      title: "Eligibility & Requirements",
      icon: <UserCheck className="w-5 h-5" />,
      questions: [
        {
          q: "Do I need a CDL to enroll?",
          a: "No. Whether you're driving a box truck that doesn't require a CDL or planning to hire CDL drivers for a semi-fleet, the compliance systems remain largely the same. I'll point out exactly where the rules differ so you're covered either way."
        },
        {
          q: "Do I need to have my authority already?",
          a: "Actually, it's better if you don't. Module 0 and 1 are designed to help you make the 'Go/No-Go' decision before you spend a dime on registration fees. I want you to have your systems built before you file, so you aren't playing catch-up with the federal clock."
        },
        {
          q: "Is this only for box trucks or all vehicle types?",
          a: "While I have a soft spot for box truck owner-operators, these systems apply to any interstate motor carrier. If you're hauling for hire across state lines in a cargo van, a box truck, or a semi, the FMCSA expects the same backbone of compliance."
        },
        {
          q: "Can I enroll if I'm outside the US?",
          a: "You can, but please keep in mind that LaunchPath is strictly based on US Federal (FMCSA) regulations. If you plan to operate a carrier within the United States, this is for you; if you're looking for guidance on Canadian or international laws, this won't be the right fit."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          q: "What's the difference between the $797 and $1,497 tiers?",
          a: "The $797 Mastery Bundle includes the curriculum and group support via weekly calls. The $1,497 Elite tier is where I get personally involved—I'll perform a mock audit of your files and give you 1-on-1 time to ensure your specific operation is bulletproof. Check the details on my /enroll page."
        },
        {
          q: "Do you offer payment plans?",
          a: "I do. I use third-party processors like Affirm or Afterpay at checkout to allow you to spread the investment out over several months. Building a business is expensive, and I want to make sure the education isn't the thing that breaks your bank."
        },
        {
          q: "Are there any hidden fees?",
          a: "None from me. You'll still have to pay the government their filing fees (like the $300 for your MC authority) and your insurance premiums to other companies. I don't take commissions from the providers I recommend, so my advice stays objective."
        }
      ]
    },
    {
      title: "Support & Coaching",
      icon: <ShieldCheck className="w-5 h-5" />,
      questions: [
        {
          q: "How do live coaching calls work?",
          a: "We meet once a week on Zoom. It's an open-floor format where you can bring your specific compliance hurdles, and I'll walk through them with you in front of the group so everyone learns. If you can't make it, I post the recordings in the student portal."
        },
        {
          q: "Can I get 1-on-1 help?",
          a: "That is reserved for my Elite students. Because it's just me running the show right now, my time is limited. I prioritize 1-on-1 sessions for those in the top tier to ensure they get the deep-dive audit preparation they need."
        },
        {
          q: "What if I have questions between calls?",
          a: "All students have access to a private email support line. If you're stuck on a specific form or regulation, just shoot me a message. I usually get back to folks within 24 business hours."
        }
      ]
    },
    {
      title: "Results & Outcomes",
      icon: <Target className="w-5 h-5" />,
      questions: [
        {
          q: "Will this guarantee I pass my New Entrant Audit?",
          a: "I can't guarantee how an individual DOT officer will behave on a given day, so I won't make that promise. However, I can guarantee that if you implement the systems exactly as I teach them, you will have every single document and process that the law requires to pass."
        },
        {
          q: "What if I fail my audit after completing LaunchPath?",
          a: "If you implemented my systems and still failed, I'll work with you 1-on-1 to review the auditor's findings and help you file a Corrective Action Plan (CAP) at no additional cost. I'm with you until the job is done."
        },
        {
          q: "What's your success rate?",
          a: "I don't track a 'vanity metric' for success because every student is at a different stage of their journey. What I can tell you is that I have never had a student who actually built their DQ files and maintenance logs using my templates fail their audit. Compliance isn't luck; it's a systems problem."
        }
      ]
    }
  ];

  // Flatten for simple indexing
  const allQuestions = faqCategories.flatMap(cat => cat.questions);

  return (
    <div className="bg-[#fafaf9] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-authority-blue text-signal-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 font-serif text-authority-blue tracking-tighter uppercase leading-none">The Compliance <span className="text-signal-gold italic">Answers</span></h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            I believe in honest answers, not sales pitches. Here is everything you need to know about how I help carriers survive.
          </p>
        </div>

        <div className="space-y-16">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
                <div className="p-2 bg-authority-blue/5 text-authority-blue rounded-xl">
                  {category.icon}
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue">{category.title}</h2>
              </div>
              
              <div className="space-y-3">
                {category.questions.map((faq, qIdx) => {
                  // Calculate global index for state
                  const globalIdx = faqCategories.slice(0, catIdx).reduce((acc, c) => acc + c.questions.length, 0) + qIdx;
                  const isOpen = openIndex === globalIdx;
                  
                  return (
                    <div 
                      key={qIdx} 
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen 
                        ? 'border-authority-blue bg-white shadow-xl ring-1 ring-authority-blue/5' 
                        : 'border-slate-200 bg-white hover:border-authority-blue/30'
                      }`}
                    >
                      <h3>
                        <button 
                          onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none group"
                        >
                          <span className={`text-lg font-black tracking-tight transition-colors ${isOpen ? 'text-authority-blue' : 'text-slate-700'}`}>
                            {faq.q}
                          </span>
                          <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-authority-blue text-white rotate-180 shadow-lg' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </button>
                      </h3>
                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-6 pt-0 text-slate-500 font-medium leading-relaxed border-t border-slate-50 mt-2">
                          <p className="text-base">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-authority-blue rounded-[3.5rem] shadow-2xl relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Still Have a Technical Question?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Regulatory compliance can be complex. I'm here to simplify it so you can focus on building your fleet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact" 
                className="bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-xl active:scale-95"
              >
                Email Vince Directly
              </Link>
              <Link 
                to="/advisor" 
                className="text-signal-gold font-black uppercase tracking-widest text-xs flex items-center hover:underline group"
              >
                Ask Our AI Compliance Advisor 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;