import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface Lesson {
  id: string;
  number: string;
  title: string;
  description: string;
  estimatedTime: string;
  content: string;
  isCompleted: boolean;
}

const Ground0ModulePage = () => {
  const navigate = useNavigate();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons: Lesson[] = [
    {
      id: '0.1',
      number: '0.1',
      title: 'Welcome to Ground 0',
      description: 'What LaunchPath is, what it is not, and who it is for.',
      estimatedTime: '12 min',
      content: `
        <div class="space-y-6">
          <h2 class="text-3xl font-black uppercase">Welcome to Ground 0</h2>
          <p class="text-lg text-slate-300">
            Ground 0 is not a course. It is not motivational. It is not a sales pitch.
          </p>
          <p class="text-lg text-slate-300">
            Ground 0 is a 90-minute institutional decision engine that determines whether launching a motor carrier authority now is sound, or whether you should WAIT or decline entirely.
          </p>
          
          <div class="bg-signal-gold/10 border border-signal-gold/30 p-6 rounded-2xl mt-8">
            <h3 class="font-black text-signal-gold uppercase mb-4">What LaunchPath IS:</h3>
            <ul class="space-y-3 text-slate-300">
              <li>✓ A system for installing institutional order in the first 90 days</li>
              <li>✓ Built on the Four Pillars: Authority, Insurance, Compliance, Cash-Flow</li>
              <li>✓ Designed for disciplined executives, not for shortcuts</li>
              <li>✓ Grounded in federal statute and real operating data</li>
            </ul>
          </div>

          <div class="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl mt-8">
            <h3 class="font-black text-red-500 uppercase mb-4">What LaunchPath IS NOT:</h3>
            <ul class="space-y-3 text-slate-300">
              <li>✗ A guarantee that you will succeed</li>
              <li>✗ A shortcut to compliance</li>
              <li>✗ A motivational program</li>
              <li>✗ A sales pitch disguised as education</li>
            </ul>
          </div>

          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl mt-8">
            <h3 class="font-black uppercase mb-4">Who Ground 0 is For:</h3>
            <p class="text-slate-300 mb-4">
              Ground 0 is for individuals who are seriously considering launching a motor carrier authority and want institutional clarity before committing capital.
            </p>
            <p class="text-slate-300">
              If you are looking for hype or motivation, you are in the wrong place. If you want precision and institutional order, continue.
            </p>
          </div>
        </div>
      `,
      isCompleted: false
    },
    {
      id: '0.2',
      number: '0.2',
      title: 'The Four Pillars of Survival',
      description: 'Understanding the interlocking system that keeps a carrier alive.',
      estimatedTime: '15 min',
      content: `
        <div class="space-y-6">
          <h2 class="text-3xl font-black uppercase">The Four Pillars of Survival</h2>
          <p class="text-lg text-slate-300">
            A motor carrier is not a single business. It is a system of four interlocking pillars. Failure in one cascades to the others.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black text-signal-gold uppercase mb-3">1. Authority Protection</h3>
              <p class="text-slate-300">The legal right to operate. Your DOT number and MC number are the asset at the center of everything.</p>
              <p class="text-xs text-slate-400 mt-4">Risk: Loss of authority = total business failure</p>
            </div>

            <div class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black text-signal-gold uppercase mb-3">2. Insurance Continuity</h3>
              <p class="text-slate-300">The financial shield. Without active coverage, you cannot move freight and you expose your personal assets.</p>
              <p class="text-xs text-slate-400 mt-4">Risk: Coverage lapse = personal liability</p>
            </div>

            <div class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black text-signal-gold uppercase mb-3">3. Compliance Backbone</h3>
              <p class="text-slate-300">The documentary evidence of safety. Federal auditors do not care about intent; they care about evidence.</p>
              <p class="text-xs text-slate-400 mt-4">Risk: Missing evidence = audit failure</p>
            </div>

            <div class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black text-signal-gold uppercase mb-3">4. Cash-Flow Oxygen</h3>
              <p class="text-slate-300">The capital required to keep the other three alive. Without reserves, you are forced into reactive decisions.</p>
              <p class="text-xs text-slate-400 mt-4">Risk: No reserves = desperation decisions</p>
            </div>
          </div>

          <div class="bg-signal-gold/10 border border-signal-gold/30 p-6 rounded-2xl mt-8">
            <h3 class="font-black text-signal-gold uppercase mb-4">The Interdependence</h3>
            <p class="text-slate-300">
              These four pillars are not separate tasks. They form a single system. A lapse in Compliance Backbone triggers a failed audit, which triggers insurance cancellation, which suffocates Cash-Flow Oxygen. This is not theory; this is the documented pattern of carrier failure.
            </p>
          </div>
        </div>
      `,
      isCompleted: false
    },
    {
      id: '0.3',
      number: '0.3',
      title: 'Lane Selection: Box vs. Semi',
      description: 'Evaluating your operational model and capital requirements.',
      estimatedTime: '18 min',
      content: `
        <div class="space-y-6">
          <h2 class="text-3xl font-black uppercase">Lane Selection: Box vs. Semi</h2>
          <p class="text-lg text-slate-300">
            Your choice of equipment (box truck vs. semi-truck) determines your capital requirements, operating costs, and risk profile.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black uppercase mb-4">Box Truck (Straight Truck)</h3>
              <div class="space-y-3 text-slate-300 text-sm">
                <div>
                  <p class="font-bold text-signal-gold">Initial Capital</p>
                  <p>$25K - $50K</p>
                </div>
                <div>
                  <p class="font-bold text-signal-gold">Monthly Operating Cost</p>
                  <p>$4K - $8K</p>
                </div>
                <div>
                  <p class="font-bold text-signal-gold">Insurance (Annual)</p>
                  <p>$3K - $6K</p>
                </div>
                <div>
                  <p class="font-bold text-signal-gold">90-Day Reserve Required</p>
                  <p>$12K - $24K</p>
                </div>
              </div>
            </div>

            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black uppercase mb-4">Semi-Truck (Tractor-Trailer)</h3>
              <div class="space-y-3 text-slate-300 text-sm">
                <div>
                  <p class="font-bold text-signal-gold">Initial Capital</p>
                  <p>$60K - $120K</p>
                </div>
                <div>
                  <p class="font-bold text-signal-gold">Monthly Operating Cost</p>
                  <p>$8K - $15K</p>
                </div>
                <div>
                  <p class="font-bold text-signal-gold">Insurance (Annual)</p>
                  <p>$6K - $12K</p>
                </div>
                <div>
                  <p class="font-bold text-signal-gold">90-Day Reserve Required</p>
                  <p>$24K - $45K</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl mt-8">
            <h3 class="font-black text-yellow-500 uppercase mb-4">Critical Question</h3>
            <p class="text-slate-300">
              Do you have the capital reserves required for your chosen lane PLUS an additional 90-day operating buffer? If not, your lane selection is not viable.
            </p>
          </div>
        </div>
      `,
      isCompleted: false
    },
    {
      id: '0.4',
      number: '0.4',
      title: 'Personal Readiness Check',
      description: 'Evaluating your institutional readiness across all four pillars.',
      estimatedTime: '20 min',
      content: `
        <div class="space-y-6">
          <h2 class="text-3xl font-black uppercase">Personal Readiness Check</h2>
          <p class="text-lg text-slate-300">
            This section will guide you through a quantitative evaluation of your readiness across the Four Pillars.
          </p>

          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl mt-8">
            <h3 class="font-black uppercase mb-4">Authority Protection Readiness</h3>
            <div class="space-y-4">
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have identified my target market and lane model</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I understand the DOT and MC number application process</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have budgeted for filing and legal fees</span>
              </label>
            </div>
          </div>

          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl mt-6">
            <h3 class="font-black uppercase mb-4">Insurance Continuity Readiness</h3>
            <div class="space-y-4">
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have contacted insurance brokers and obtained quotes</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I understand the premium structure and payment schedule</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have budgeted for 12 months of premium in advance</span>
              </label>
            </div>
          </div>

          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl mt-6">
            <h3 class="font-black uppercase mb-4">Compliance Backbone Readiness</h3>
            <div class="space-y-4">
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I understand the 12 required Driver Qualification file items</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have a system for maintaining drug test and medical records</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have a maintenance and inspection tracking system</span>
              </label>
            </div>
          </div>

          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl mt-6">
            <h3 class="font-black uppercase mb-4">Cash-Flow Oxygen Readiness</h3>
            <div class="space-y-4">
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have calculated my true monthly operating costs</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have 90 days of operating reserves in liquid capital</span>
              </label>
              <label class="flex items-start space-x-3">
                <input type="checkbox" class="mt-1" />
                <span class="text-slate-300">I have defined my break-even CPM and stop-loss line</span>
              </label>
            </div>
          </div>
        </div>
      `,
      isCompleted: false
    },
    {
      id: '0.5',
      number: '0.5',
      title: 'Risk Tolerance & Stop-Loss',
      description: 'Establishing the hard lines where operations must cease.',
      estimatedTime: '15 min',
      content: `
        <div class="space-y-6">
          <h2 class="text-3xl font-black uppercase">Risk Tolerance & Stop-Loss</h2>
          <p class="text-lg text-slate-300">
            Before you launch, you must define the hard lines where you will stop operations to preserve capital.
          </p>

          <div class="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl mt-8">
            <h3 class="font-black text-red-500 uppercase mb-4">The Stop-Loss Decision</h3>
            <p class="text-slate-300">
              A stop-loss is not failure. It is discipline. It is the decision to preserve capital when the operation is not meeting institutional thresholds.
            </p>
          </div>

          <div class="space-y-6 mt-8">
            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black uppercase mb-3">Capital Preservation Line</h3>
              <p class="text-slate-300 mb-4">
                Define the minimum capital level at which you will cease operations and preserve the remaining capital.
              </p>
              <input type="number" placeholder="Enter minimum capital threshold ($)" class="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white" />
            </div>

            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black uppercase mb-3">Monthly Loss Limit</h3>
              <p class="text-slate-300 mb-4">
                Define the maximum monthly loss you will tolerate before ceasing operations.
              </p>
              <input type="number" placeholder="Enter maximum monthly loss ($)" class="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white" />
            </div>

            <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 class="font-black uppercase mb-3">Operational Timeline</h3>
              <p class="text-slate-300 mb-4">
                Define the maximum time you will operate at a loss before ceasing operations.
              </p>
              <input type="number" placeholder="Enter maximum months of operation at loss" class="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white" />
            </div>
          </div>

          <div class="bg-signal-gold/10 border border-signal-gold/30 p-6 rounded-2xl mt-8">
            <h3 class="font-black text-signal-gold uppercase mb-4">The Institutional Truth</h3>
            <p class="text-slate-300">
              The carriers who survive are not the ones who push hardest. They are the ones who know when to stop. Define your stop-loss now, before emotion clouds your judgment.
            </p>
          </div>
        </div>
      `,
      isCompleted: false
    },
    {
      id: '0.6',
      number: '0.6',
      title: 'The GO / WAIT / NO-GO Decision',
      description: 'Your institutional readiness outcome.',
      estimatedTime: '10 min',
      content: `
        <div class="space-y-6">
          <h2 class="text-3xl font-black uppercase">Your Ground 0 Decision</h2>
          <p class="text-lg text-slate-300">
            Based on your responses across the Five Pillars, Ground 0 will classify your institutional readiness as GO, WAIT, or NO-GO.
          </p>

          <div class="bg-white/5 border border-white/10 p-8 rounded-2xl mt-8 text-center">
            <p class="text-slate-300 mb-6">
              Click the button below to calculate your Ground 0 decision and see your personalized pathway forward.
            </p>
            <button class="bg-signal-gold text-[#002244] px-12 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:bg-white transition-all">
              Calculate My Decision
            </button>
          </div>

          <div class="bg-slate-900/50 border border-white/10 p-6 rounded-2xl mt-8">
            <h3 class="font-black uppercase mb-4">What Happens Next</h3>
            <p class="text-slate-300 mb-4">
              Your decision will determine your next steps:
            </p>
            <ul class="space-y-3 text-slate-300">
              <li><span class="text-emerald-500 font-black">GO:</span> Invitation to the full Operating System (Modules 1–7)</li>
              <li><span class="text-yellow-500 font-black">WAIT:</span> Actionable checklist to prepare for a future GO decision</li>
              <li><span class="text-red-500 font-black">NO-GO:</span> Guidance on capital preservation and alternative paths</li>
            </ul>
          </div>
        </div>
      `,
      isCompleted: false
    }
  ];

  const currentLesson = lessons[currentLessonIndex];
  const progressPercentage = ((completedLessons.length + 1) / lessons.length) * 100;

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen overflow-x-hidden">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-[#020617]/95 backdrop-blur border-b border-white/5 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">GROUND 0 MODULE</p>
              <h1 className="text-2xl font-black uppercase mt-2">Lesson {currentLesson.number}</h1>
            </div>
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">Progress</p>
              <p className="text-2xl font-black text-signal-gold">{Math.round(progressPercentage)}%</p>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div
              className="bg-signal-gold h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16">
        {/* LESSON CONTENT */}
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-signal-gold/10 border border-signal-gold/30 px-4 py-2 rounded-full">
              <Clock size={16} className="text-signal-gold" />
              <span className="text-xs font-black uppercase tracking-widest text-signal-gold">{currentLesson.estimatedTime}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{currentLesson.title}</h2>
            <p className="text-xl text-slate-300">{currentLesson.description}</p>
          </div>

          {/* LESSON BODY */}
          <div
            className="prose prose-invert max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
          />
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-between mt-20 pt-12 border-t border-white/5">
          <button
            onClick={handlePreviousLesson}
            disabled={currentLessonIndex === 0}
            className="flex items-center space-x-3 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-signal-gold/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft size={20} />
            <span className="font-black uppercase tracking-wider">Previous</span>
          </button>

          <button
            onClick={handleCompleteLesson}
            className="flex items-center space-x-3 px-8 py-3 rounded-lg bg-signal-gold text-[#002244] hover:bg-white font-black uppercase tracking-wider transition-all"
          >
            <span>{currentLessonIndex === lessons.length - 1 ? 'Complete Ground 0' : 'Next Lesson'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* SIDEBAR - LESSON LIST */}
      <div className="fixed right-0 top-0 h-screen w-80 bg-white/5 border-l border-white/10 overflow-y-auto hidden lg:block">
        <div className="p-6 space-y-4 sticky top-0 bg-[#020617]/95 backdrop-blur border-b border-white/10">
          <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">Lessons</p>
          <h3 className="text-xl font-black">Ground 0 Module</h3>
        </div>

        <div className="p-6 space-y-3">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentLessonIndex(index)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                index === currentLessonIndex
                  ? 'bg-signal-gold/20 border border-signal-gold/50'
                  : 'bg-white/5 border border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-black text-signal-gold uppercase mb-1">Lesson {lesson.number}</p>
                  <p className="font-bold text-sm">{lesson.title}</p>
                </div>
                {completedLessons.includes(lesson.id) && <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ground0ModulePage;
