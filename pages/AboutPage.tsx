
import React from 'react';
import { Shield, BookOpen, Clock, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-primary-dark">
      {/* Hero */}
      <section className="py-24 bg-primary-light dark:bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">Built on Integrity, Driven by Compliance</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-3xl mx-auto leading-relaxed">
            LaunchPath was founded by industry veterans who saw too many promising carriers shut down not for lack of work, but for lack of preparation.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <img src="https://picsum.photos/seed/about-1/800/600" alt="Founder" className="rounded-[3rem] shadow-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-serif mb-8">Our Mission</h2>
              <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8 leading-relaxed">
                We believe that the trucking industry is the backbone of the global economy. Small carriers and owner-operators are the most vital part of that backbone. 
              </p>
              <p className="text-lg text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed">
                Our goal is to professionalize the "box truck" niche by providing university-level education at an accessible price point, ensuring every new entrant has the tools to succeed.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-authority-blue mb-2">98%</span>
                  <span className="text-sm text-text-muted uppercase font-bold tracking-widest">Audit Success Rate</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-steel-blue mb-2">2.4k</span>
                  <span className="text-sm text-text-muted uppercase font-bold tracking-widest">Students Trained</span>
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
            <h2 className="text-3xl font-bold font-serif mb-4">The LaunchPath Principles</h2>
            <div className="w-20 h-1.5 bg-signal-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Compliance &gt; Hustle</h3>
              <p className="text-text-muted">We prioritize safety and legal systems over short-term financial gains.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Verified Sources</h3>
              <p className="text-text-muted">All our materials are cross-referenced with FMCSA Part 390-399 regulations.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-8 h-8 text-authority-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Long-Term Vision</h3>
              <p className="text-text-muted">We build businesses meant to last for decades, not just a few load cycles.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
