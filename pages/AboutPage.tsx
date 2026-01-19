import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Scale, 
  BarChart3, 
  Globe, 
  Mail, 
  Calendar, 
  Download,
  BookOpen,
  Anchor,
  User,
  Star,
  Zap,
  TrendingDown,
  Quote,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const VeteranBadgeSmall = () => (
  <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/20 px-5 py-3 rounded-xl shadow-sm">
    <Award size={18} className="text-[#D4AF37]" fill="currentColor" />
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">Veteran Owned & Operated</span>
  </div>
);

const KingdomBadgeSmall = () => (
  <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/20 px-5 py-3 rounded-xl shadow-sm">
    <Anchor size={18} className="text-[#D4AF37]" />
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">Kingdom Operated</span>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-700">
      
      {/* SECTION 1: HERO - BUILT BY EXPERIENCE, NOT THEORY */}
      <section className="relative bg-[#F8F9FA] py-24 lg:py-32 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-[32px] lg:text-[42px] font-bold text-[#1A1A1A] leading-[1.2] mb-6 font-sans">
            Built by Experience, Not Theory
          </h1>
          <p className="text-base lg:text-[18px] leading-[1.7] text-[#555] max-w-[750px] mx-auto mb-6 font-medium">
            LaunchPath was created by Vince Lawrence, an OSHA-Certified Safety Coordinator 
            with 20+ years overseeing compliance systems for organizations supporting 1,200+ 
            employees. This isn't curriculum built from regulatory research—it's built from managing 
            real compliance operations at scale.
          </p>
          
          {/* Kingdom Business Clarity with subtle 3D institutional styling */}
          <p 
            className="text-base lg:text-[18px] leading-[1.7] text-[#1E3A5F] max-w-[750px] mx-auto mb-10 font-bold"
            style={{ textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.15), 1px 1px 0px rgba(0,0,0,0.1)' }}
          >
            LaunchPath is a Kingdom-operated business — expressed through stewardship, restraint, truth, and respect for lawful authority.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/pricing" className="w-full sm:w-auto bg-[#1E3A5F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#152945] transition-all shadow-lg active:scale-95 text-center">
              View the Training Programs
            </Link>
            <Link to="/learning-path" className="w-full sm:w-auto bg-transparent border-2 border-[#1E3A5F] text-[#1E3A5F] px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-all active:scale-95 text-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: MEET VINCE LAWRENCE */}
      <section className="bg-[#1E3A5F] py-20 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-16 items-start">
            
            {/* Left Column: Founder Photo - Scaled up by 30% per request (from 315px to 410px) */}
            <div className="flex flex-col items-center lg:items-start max-w-[410px] mx-auto lg:mx-0 w-full">
              <div className="bg-white p-0 rounded-[16px] shadow-xl overflow-hidden w-full relative group">
                <img 
                  src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                  alt="Vince Lawrence, Founder of LaunchPath" 
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 block"
                />
                <div className="absolute bottom-0 left-0 w-full bg-[#1E3A5F]/90 backdrop-blur-sm py-3 text-center">
                  <p className="text-[12px] font-bold text-white uppercase tracking-[0.02em]">VINCE LAWRENCE | FOUNDER</p>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col pt-4">
              <span className="text-[14px] text-[#D4AF37] font-semibold uppercase tracking-[0.015em] mb-4">Meet Vince Lawrence</span>
              <h2 className="text-[24px] lg:text-[32px] font-bold text-white mb-8">OSHA-Certified Safety Coordinator</h2>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <VeteranBadgeSmall />
                <KingdomBadgeSmall />
              </div>

              <div className="space-y-6 text-[16px] leading-[1.7] text-white/90 font-normal">
                <p>
                  Vince Lawrence is an OSHA-Certified Safety Coordinator with over 20 years of 
                  experience overseeing compliance systems for organizations supporting approximately 
                  1,200 employees across transportation, logistics, and safety-sensitive industries.
                </p>
                <p>
                  His background combines operational leadership with technical regulatory oversight. 
                  Having served as a supervisor and business unit manager, Vince understands the friction 
                  between getting the job done and maintaining a federal-grade safety culture.
                </p>
                
                <blockquote className="border-l-4 border-[#D4AF37] pl-5 italic text-[#D4AF37] text-[17px] my-8 font-medium leading-relaxed">
                  "I've seen what happens when regulatory systems aren't built with operational 
                  reality in mind—compliance becomes a box-checking exercise instead of a 
                  protective framework."
                </blockquote>
                
                <p className="text-[14px] text-white/80">— Vince Lawrence, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY VINCE'S BACKGROUND MATTERS */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-6">Why Vince's Background Matters to Your Success</h2>
            <p className="text-base lg:text-[17px] leading-[1.6] text-[#666] max-w-[900px] mx-auto">
              Vince isn't just someone who knows regulations—he's someone who has built and 
              audited compliance systems that stood up under pressure. Here's why that matters 
              when you're building your foundation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: <ShieldCheck size={32} className="text-[#1E3A5F]" />, 
                title: "Auditors Perspective", 
                body: "Vince doesn't just know what regulators want to see—he's been the person conducting audits and evaluating compliance systems." 
              },
              { 
                icon: <Building2 size={32} className="text-[#1E3A5F]" />, 
                title: "System Experience", 
                body: "20+ years building and refining compliance systems means Vince understands what actually works in operational environments." 
              },
              { 
                icon: <BarChart3 size={32} className="text-[#1E3A5F]" />, 
                title: "Enterprise Experience", 
                body: "Vince has overseen compliance at scale—managing systems supporting 1,200+ employees, understanding both individual compliance and systematic management." 
              },
              { 
                icon: <Scale size={32} className="text-[#1E3A5F]" />, 
                title: "Practical Values", 
                body: "Vince isn't teaching theory from textbooks—he's teaching what he had to build, maintain, and defend under audit." 
              }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-[#E5E5E5] rounded-[12px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                <div className="mb-6">{card.icon}</div>
                <h3 className="text-[20px] font-bold text-[#1E3A5F] mb-4">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#555]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE GAP IN TRANSPORTATION TRAINING */}
      <section className="bg-[#F8F9FA] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-6">The Gap in Transportation Training</h2>
          <p className="text-base lg:text-[17px] leading-[1.7] text-[#666] max-w-[1000px] mb-12 font-medium">
            After Vince helped develop compliance systems in several industries, he encountered 
            an urgent problem in the transportation sector: new owner-operators were launched 
            into business with driving and operational knowledge, but without understanding 
            federal compliance as a systematic business function.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Traditional Approach */}
            <div className="border-l-[3px] border-[#DDD] pl-8">
              <span className="text-[13px] text-[#888] font-medium uppercase tracking-[0.015em] mb-4 block">The Traditional Approach</span>
              <h3 className="text-[22px] font-bold text-[#1E3A5F] mb-6">Fragmented Training & Reactive Compliance</h3>
              <ul className="space-y-4 text-[15px] leading-[1.7] text-[#555] font-medium">
                <li className="flex items-start"><span className="mr-2 text-slate-400">•</span> Training focuses on driving skills, with regulatory compliance treated as an afterthought.</li>
                <li className="flex items-start"><span className="mr-2 text-slate-400">•</span> Compliance becomes an add-on task rather than a foundational system.</li>
                <li className="flex items-start"><span className="mr-2 text-slate-400">•</span> Operators react to audits after they arrive rather than preparing for them daily.</li>
                <li className="flex items-start"><span className="mr-2 text-slate-400">•</span> Systems are disjointed, leading to high risk of insurance cancellation.</li>
              </ul>
            </div>

            {/* LaunchPath Difference */}
            <div className="border-l-[3px] border-[#D4AF37] pl-8">
              <span className="text-[13px] text-[#888] font-medium uppercase tracking-[0.015em] mb-4 block">The LaunchPath Difference</span>
              <h3 className="text-[22px] font-bold text-[#1E3A5F] mb-6">Integrated Systems & Proactive Protection</h3>
              <ul className="space-y-4 text-[15px] leading-[1.7] text-[#555] font-medium">
                <li className="flex items-start"><span className="mr-2 text-[#D4AF37]">•</span> Compliance is integrated into every business decision from day one.</li>
                <li className="flex items-start"><span className="mr-2 text-[#D4AF37]">•</span> Focus on "stewardship" of the authority - keeping your legal right to operate.</li>
                <li className="flex items-start"><span className="mr-2 text-[#D4AF37]">•</span> Systematic DQ files, HOS logs, and maintenance records built to federal standards.</li>
                <li className="flex items-start"><span className="mr-2 text-[#D4AF37]">•</span> Audit-ready status is a byproduct of daily operational discipline.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: REAL-WORLD EXPERIENCE LISTS */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-12">Real-World Experience That Translates to Real Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <h4 className="text-[18px] font-bold text-[#1E3A5F] uppercase tracking-tight flex items-center">
                <Award className="mr-3" size={20} /> What 20+ Years Teaches You:
              </h4>
              <ul className="space-y-4 text-[15px] leading-[1.7] text-[#555] font-medium">
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#1E3A5F] shrink-0 mt-1" size={18} /> How to interpret ambiguous federal regulations into actionable policies.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#1E3A5F] shrink-0 mt-1" size={18} /> Identifying the "Red Flags" that trigger unscheduled federal investigations.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#1E3A5F] shrink-0 mt-1" size={18} /> Designing file management systems that pass the 48-hour audit window.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#1E3A5F] shrink-0 mt-1" size={18} /> The psychology of an auditor—what they look for vs. what they check.</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[18px] font-bold text-[#1E3A5F] uppercase tracking-tight flex items-center">
                <Zap className="mr-3" size={20} /> This Means This Difference for You:
              </h4>
              <ul className="space-y-4 text-[15px] leading-[1.7] text-[#555] font-medium">
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#D4AF37] shrink-0 mt-1" size={18} /> You save thousands in consulting fees by having the system correctly built initially.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#D4AF37] shrink-0 mt-1" size={18} /> You eliminate the "Audit Panic" that causes most first-year carriers to freeze.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#D4AF37] shrink-0 mt-1" size={18} /> You protect your high-value insurance policies from being revoked for non-compliance.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-3 text-[#D4AF37] shrink-0 mt-1" size={18} /> You build a carrier that is a valuable business asset, not just a job with a truck.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: EXPERIENCE AND OPERATIONAL EXPOSURE */}
      <section className="bg-[#1E3A5F] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-white text-center mb-16 uppercase tracking-tight">Experience and Operational Exposure</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "20+", label: "Years of Exposure", desc: "Background in operational safety and systems management within regulated industries." },
              { num: "1.2K+", label: "Personnel Supported", desc: "Experience managing safety workflows in prior leadership and supervisory roles." },
              { num: "Active", label: "Audit Process Participation", desc: "Participation in federal and state compliance reviews throughout a 20-year career history." },
              { num: "1,000s", label: "of Instructional Hours", desc: "Practical experience delivering safety-focused guidance and operational training." }
            ].map((stat, i) => (
              <div key={i} className="border-2 border-white/20 rounded-[12px] p-8 text-center group hover:border-[#D4AF37] transition-all">
                <div className="text-[48px] lg:text-[56px] font-bold text-[#D4AF37] leading-[1] mb-2">{stat.num}</div>
                <div className="text-[18px] font-semibold text-white mb-3">{stat.label}</div>
                <p className="text-[14px] leading-[1.6] text-white/70">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: MILITARY LEGACY & PRECISION */}
      <section className="bg-authority-blue py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 items-center">
            
            {/* The Badge Visual */}
            <div className="relative flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-signal-gold/30 flex items-center justify-center p-4 relative group">
                <div className="absolute inset-0 rounded-full border-2 border-signal-gold animate-[ping_3s_linear_infinite] opacity-20"></div>
                <div className="w-full h-full rounded-full border-8 border-signal-gold flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm shadow-2xl">
                  <Anchor size={80} className="text-signal-gold mb-4 group-hover:rotate-12 transition-transform duration-700" />
                  <div className="h-px w-24 bg-signal-gold/40 mb-4"></div>
                  <h3 className="text-white font-black uppercase tracking-[0.3em] text-xs text-center leading-tight">U.S. Navy Veteran<br/>Owned</h3>
                </div>
                {/* Orbital Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-authority-blue px-4 py-1 border border-signal-gold rounded-full text-[10px] font-black text-signal-gold uppercase tracking-widest">
                  Est. Precision
                </div>
              </div>
            </div>

            <div className="flex flex-col text-white">
              <div className="inline-flex items-center space-x-2 text-signal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                <Star size={12} fill="currentColor" />
                <span>Founded on Military Discipline</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black font-serif mb-8 leading-tight tracking-tighter uppercase">
                Precision in Every <span className="text-signal-gold">System.</span>
              </h2>
              <div className="space-y-6 text-lg text-white/80 leading-relaxed font-medium">
                <p>
                  As a Desert Storm Navy Veteran, Vince Lawrence understands that operational success is built on standard operating procedures and rigorous administrative discipline. In the military, preparation isn't optional—it's the difference between mission success and failure.
                </p>
                <p>
                  LaunchPath applies this level of institutional discipline to the trucking industry. Most carriers fail because they are "reacting" to the road. We teach you to "command" your operation by building a foundation that doesn't just meet regulations—it survives them.
                </p>
                <p className="border-l-4 border-signal-gold pl-6 italic text-signal-gold/90">
                  "When you understand the system, you no longer fear the regulator."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: THE PHILOSOPHY BEHIND LAUNCHPATH */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight">The Philosophy Behind LaunchPath</h2>
            <p className="text-base lg:text-[17px] leading-[1.6] text-[#666] max-w-[900px] mx-auto font-medium italic">
              The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <Scale size={28} className="text-[#D4AF37]" />, title: "Short-Term Foundations", body: "LaunchPath doesn't chase quick wins at the expense of long-term sustainability. We build the backbone first." },
              { icon: <Target size={28} className="text-[#D4AF37]" />, title: "Systematic Approach", body: "Every LaunchPath module is designed to build actual systems, not just check boxes. We teach you HOW to manage." },
              { icon: <BookOpen size={28} className="text-[#D4AF37]" />, title: "Real USDOT Application", body: "Vince doesn't teach theory—he teaches what federal auditors actually evaluate based on decades in the field." },
              { icon: <ShieldCheck size={28} className="text-[#D4AF37]" />, title: "Long-Term Protection", body: "LaunchPath programs don't just help you launch—they help you sustain your authority for years of profitable operations." }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-[#E5E5E5] rounded-[12px] p-8 hover:shadow-lg transition-all duration-300">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-[20px] font-bold text-[#1E3A5F] mb-4 uppercase tracking-tighter">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#555] font-medium">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: WHAT KINGDOM-OPERATED ACTUALLY MEANS */}
      <section className="bg-[#F8F9FA] py-24 lg:py-32">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] mb-8 uppercase tracking-tight">What Kingdom-Operated Actually Means</h2>
          
          <div className="space-y-6 text-[17px] leading-[1.7] text-[#555] font-medium mb-16">
            <p>
              LaunchPath is a Kingdom business. This doesn't mean we only work with believers—it means we 
              operate according to a specific set of biblical values: stewardship, truth, and excellence.
            </p>
            <p>
              In business, this translates to Radical Integrity. We don't use hype to sell, we don't hide 
              the risks of the industry, and we treat your investment in education with the respect it 
              deserves. We view your success as our stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { icon: "📖", title: "Truth Over Hype", desc: "No false promises. No manipulation. We tell you exactly what it takes to survive the audit." },
              { icon: "⚖️", title: "Stewardship", desc: "We don't see customers—we see people entrusted to us to help build their legacies." },
              { icon: "🎯", title: "Systems Over Shortcuts", desc: "Kingdom principles produce sustainable operations. We reject the 'easy way' for the right way." }
            ].map((col, i) => (
              <div key={i} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-3xl">{col.icon}</div>
                <h4 className="text-[18px] font-bold text-[#1E3A5F] uppercase tracking-tighter">{col.title}</h4>
                <p className="text-[14px] leading-[1.6] text-[#666]">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: READY TO BUILD YOUR FOUNDATION? */}
      <section className="bg-[#1E3A5F] py-24 lg:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <h2 className="text-[32px] lg:text-[40px] font-bold text-white mb-6 uppercase tracking-tight">Ready to Build Your Foundation?</h2>
          <p className="text-base lg:text-[18px] leading-[1.7] text-white/90 max-w-[800px] mx-auto mb-16 font-medium">
            You've been entrusted with this business. Build it with the wisdom, order, and integrity it deserves. 
            Vince and the LaunchPath system are ready to guide you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <GraduationCap size={32} className="text-[#1E3A5F]" />, title: "Training Programs", desc: "Review our compliance-first curriculum.", btn: "View Programs", link: "/pricing" },
              { icon: <Calendar size={32} className="text-[#1E3A5F]" />, title: "Consultation", desc: "Speak with us about your compliance needs.", btn: "Book a Call", link: "/contact" },
              { icon: <Download size={32} className="text-[#1E3A5F]" />, title: "Free Resources", desc: "Get access to orientation templates.", btn: "Get Resources", link: "/resources" }
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-[16px] p-8 text-center flex flex-col items-center shadow-2xl">
                <div className="mb-6 p-4 bg-slate-50 rounded-2xl">{card.icon}</div>
                <h4 className="text-[18px] font-bold text-[#1E3A5F] mb-3 uppercase tracking-tighter">{card.title}</h4>
                <p className="text-[14px] text-[#666] mb-8 flex-grow leading-relaxed font-medium">{card.desc}</p>
                <Link to={card.link} className="w-full bg-[#1E3A5F] text-white py-4 rounded-lg font-bold hover:bg-[#152945] transition-all text-xs uppercase tracking-widest active:scale-95 shadow-md">
                  {card.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="bg-[#0D1B2E] py-12 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-white/50 text-[13px]">
          <p className="mb-6 font-medium">© {new Date().getFullYear()} LaunchPath Transportation EDU. All Rights Reserved. Education over shortcuts.</p>
          <div className="flex justify-center space-x-8 font-bold uppercase tracking-widest text-[10px]">
            <Link to="/pricing" className="hover:text-white transition-colors">Programs</Link>
            <Link to="/learning-path" className="hover:text-white transition-colors">Roadmap</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Compliance Disclaimer</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AboutPage;