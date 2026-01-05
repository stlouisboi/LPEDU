
import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Clock, Award, Star, Quote, ChevronLeft, ChevronRight, Target } from 'lucide-react';
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
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-4xl mx-auto leading-relaxed">
            LaunchPath™ exists to prepare new and aspiring owner-operators to operate legally, safely, and sustainably under FMCSA authority—before mistakes cost them their business.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Lead Instructor" className="rounded-[3rem] shadow-2xl" />
              <div className="absolute -bottom-10 -right-10 bg-authority-blue text-white p-8 rounded-3xl hidden md:block max-w-xs shadow-2xl border-4 border-signal-gold/20">
                <Target className="text-signal-gold mb-4" size={32} />
                <p className="font-bold text-lg leading-tight italic">"From 'trying to start' to 'operating a regulated company'."</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold font-serif mb-8">Our Identity</h2>
              <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8 leading-relaxed">
                Whether you're starting with a box truck, step van, or semi, LaunchPath provides the thinking framework, compliance systems, and operational clarity required to pass the new-entrant phase.
              </p>
              <p className="text-lg text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed">
                We don't teach "get-rich-quick" trucking or dispatching. We teach compliance-first education for owner-operators who want a foundation they can scale from, avoiding preventable shutdowns.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-authority-blue dark:text-steel-blue mb-2">100%</span>
                  <span className="text-sm text-text-muted uppercase font-bold tracking-widest">Vehicle Agnostic</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-authority-blue dark:text-steel-blue mb-2">2025</span>
                  <span className="text-sm text-text-muted uppercase font-bold tracking-widest">Updated Standards</span>
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
            <h2 className="text-3xl font-bold font-serif mb-4">The LaunchPath™ Pillars</h2>
            <div className="w-20 h-1.5 bg-signal-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
              <div className="w-16 h-16 bg-authority-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Audit Readiness</h3>
              <p className="text-text-muted">Understanding the 18-month new-entrant period and audit triggers before they happen.</p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
              <div className="w-16 h-16 bg-authority-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Compliance Systems</h3>
              <p className="text-text-muted">Not just rules, but how to structure files, maintain records, and stay professional.</p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
              <div className="w-16 h-16 bg-authority-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Mental Clarity</h3>
              <p className="text-text-muted">A clear model of the carrier lifecycle to eliminate confusion in decision-making.</p>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
