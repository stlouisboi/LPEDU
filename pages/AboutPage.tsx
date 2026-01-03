
import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Clock, Award, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../constants';

const AboutPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = INITIAL_TESTIMONIALS;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-white dark:bg-primary-dark">
      {/* Hero */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">Built on Integrity, Driven by Compliance</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-3xl mx-auto leading-relaxed">
            LaunchPath™ was founded by DOT compliance veterans who saw too many promising carriers fail—not from lack of work, but lack of proper compliance preparation.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Lead Instructor teaching DOT compliance concepts" className="rounded-[3rem] shadow-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-serif mb-8">Our Mission</h2>
              <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8 leading-relaxed">
                We believe that the trucking industry is the backbone of the global economy. Small carriers and owner-operators are the most vital part of that backbone. 
              </p>
              <p className="text-lg text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed">
                Our goal is to professionalize the "box truck" niche by providing university-level education at an accessible price point, ensuring every new entrant has the tools to succeed. Accuracy Over Hype is our core philosophy.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-authority-blue dark:text-steel-blue mb-2">15+ Years</span>
                  <span className="text-sm text-text-muted uppercase font-bold tracking-widest">Industry Experience</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-authority-blue dark:text-steel-blue mb-2">200+ Audits</span>
                  <span className="text-sm text-text-muted uppercase font-bold tracking-widest">Analyzed & Studied</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50 dark:bg-surface-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif mb-4">The LaunchPath™ Principles</h2>
            <div className="w-20 h-1.5 bg-signal-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
              <div className="w-16 h-16 bg-authority-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Compliance > Hustle</h3>
              <p className="text-text-muted">We prioritize safety and legal systems over short-term financial gains.</p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
              <div className="w-16 h-16 bg-authority-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Verified Sources</h3>
              <p className="text-text-muted">All our materials are cross-referenced with official FMCSA Part 390-399 regulations.</p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
              <div className="w-16 h-16 bg-authority-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Long-Term Vision</h3>
              <p className="text-text-muted">We build businesses meant to last for decades, not just a few load cycles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-32 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-authority-blue rounded-[4rem] p-12 md:p-24 text-white shadow-2xl border-4 border-signal-gold/20">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Quote size={200} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-12 text-signal-gold">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <span className="text-xs font-bold uppercase tracking-widest ml-4 text-white/60">Verified Graduate Success</span>
              </div>

              <div className="min-h-[200px] animate-in fade-in slide-in-from-right-4 duration-700 ease-out" key={currentTestimonial}>
                <p className="text-2xl md:text-4xl font-serif italic mb-12 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold font-serif">{testimonials[currentTestimonial].author}</h4>
                    <p className="text-signal-gold font-bold text-sm uppercase tracking-widest">{testimonials[currentTestimonial].role}</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      onClick={prevTestimonial}
                      className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex space-x-2">
                {testimonials.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-1.5 transition-all rounded-full ${currentTestimonial === i ? 'w-12 bg-signal-gold' : 'w-4 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
           <Award className="w-16 h-16 text-authority-blue mx-auto mb-8 opacity-20" />
           <p className="text-2xl font-serif italic text-text-muted leading-relaxed">
             "Our reputation is built on the success of our students. We don't consider our job done until your carrier passes its new entrant audit with zero critical violations."
           </p>
           <div className="mt-8">
             <p className="font-bold text-authority-blue">Lead Instructor & Founder</p>
             <p className="text-xs uppercase tracking-widest text-text-muted mt-1">Certified DOT Compliance Auditor (Retired)</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
