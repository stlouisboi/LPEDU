import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, XCircle, Download, Share2 } from 'lucide-react';
import Ground0DecisionEngine, { Ground0Decision } from '../services/Ground0DecisionEngine';

const Ground0ResultPage = () => {
  const location = useLocation();
  const [decision, setDecision] = useState<Ground0Decision | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get assessment data from location state
    const assessment = location.state?.assessment;
    if (assessment) {
      const result = Ground0DecisionEngine.calculateDecision(assessment);
      setDecision(result);
    }
    setLoading(false);
  }, [location]);

  if (loading) {
    return (
      <div className="bg-[#020617] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="animate-spin">
            <div className="w-16 h-16 border-4 border-signal-gold/20 border-t-signal-gold rounded-full"></div>
          </div>
          <p className="text-lg font-bold">Calculating your Ground 0 decision...</p>
        </div>
      </div>
    );
  }

  if (!decision) {
    return (
      <div className="bg-[#020617] text-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl font-black uppercase">Error Loading Decision</h1>
          <p className="text-slate-300">Please return to Ground 0 and complete the assessment.</p>
          <Link to="/ground-0/module" className="inline-flex items-center space-x-2 text-signal-gold hover:text-white transition-colors">
            <span>Return to Ground 0</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  const getOutcomeColor = () => {
    switch (decision.outcome) {
      case 'GO':
        return { bg: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: CheckCircle };
      case 'WAIT':
        return { bg: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: Clock };
      case 'NO-GO':
        return { bg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30', text: 'text-red-500', icon: XCircle };
    }
  };

  const colors = getOutcomeColor();
  const OutcomeIcon = colors.icon;

  return (
    <div className="bg-[#020617] text-white min-h-screen overflow-x-hidden">
      {/* HERO SECTION WITH DECISION */}
      <section className={`relative py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-gradient-to-br ${colors.bg}`}>
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="flex justify-center">
              <OutcomeIcon size={64} className={colors.text} />
            </div>
            <h1 className={`text-6xl md:text-7xl font-black uppercase tracking-tight ${colors.text}`}>
              {decision.outcome}
            </h1>
            <p className="text-2xl font-bold text-slate-200">
              Your Ground 0 Readiness Score
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-center">
                <p className="text-6xl font-black text-signal-gold">{decision.overallScore}%</p>
                <p className="text-sm text-slate-400 uppercase tracking-widest mt-2">Overall Readiness</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <p className="text-lg leading-relaxed text-slate-200">
              {decision.reasoning}
            </p>
          </div>
        </div>
      </section>

      {/* PILLAR SCORES */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.8em] text-slate-400">READINESS ANALYSIS</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Your Pillar Scores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Authority Protection', score: decision.pillarScores.authority },
              { name: 'Insurance Continuity', score: decision.pillarScores.insurance },
              { name: 'Compliance Backbone', score: decision.pillarScores.compliance },
              { name: 'Cash-Flow Oxygen', score: decision.pillarScores.cashFlow }
            ].map((pillar, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black uppercase text-lg">{pillar.name}</h3>
                  <p className={`text-3xl font-black ${pillar.score >= 70 ? 'text-emerald-500' : pillar.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {pillar.score}%
                  </p>
                </div>
                <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${pillar.score >= 70 ? 'bg-emerald-500' : pillar.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${pillar.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.8em] text-slate-400">YOUR PATH FORWARD</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Next Steps</h2>
          </div>

          <div className="space-y-4">
            {decision.nextSteps.map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 hover:border-signal-gold/50 p-6 rounded-2xl flex items-start space-x-4 transition-all">
                <div className="flex-shrink-0 w-10 h-10 bg-signal-gold/20 rounded-full flex items-center justify-center">
                  <span className="font-black text-signal-gold">{i + 1}</span>
                </div>
                <p className="text-slate-200 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.8em] text-slate-400">INSTITUTIONAL GUIDANCE</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Recommendations</h2>
          </div>

          <div className="space-y-4">
            {decision.recommendations.map((rec, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-slate-200">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            {decision.outcome === 'GO' && (
              <>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                  Ready to Install the Operating System?
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  You have met the institutional thresholds. The full LaunchPath Operating System (Modules 1–7) is now available to you.
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center space-x-4 bg-signal-gold text-[#002244] px-12 py-6 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_40px_80px_rgba(218,165,32,0.4)] hover:bg-white transition-all active:scale-95 border-b-[8px] border-yellow-700 group"
                >
                  <span>View Operating System & Admission Protocol</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </>
            )}

            {decision.outcome === 'WAIT' && (
              <>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                  Build Your Path to GO
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  You are close. Use the action plan above to strengthen your position. Revisit Ground 0 in 3–6 months.
                </p>
                <Link
                  to="/resources"
                  className="inline-flex items-center space-x-4 bg-authority-blue text-white px-12 py-6 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_40px_80px_rgba(0,34,68,0.4)] hover:bg-slate-700 transition-all active:scale-95 border-b-[8px] border-slate-950 group"
                >
                  <span>Access Preparation Resources</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </>
            )}

            {decision.outcome === 'NO-GO' && (
              <>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                  Preserve Capital, Strengthen Position
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Now is not the time to launch. Use the next 12–24 months to build your capital reserves and revisit when your position has strengthened.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-4 bg-white/10 text-white px-12 py-6 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm border border-white/20 hover:border-white/50 transition-all active:scale-95 group"
                >
                  <span>Consult with an Advisor</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* EXPORT OPTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 border-t border-white/5">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all">
              <Download size={20} />
              <span className="font-bold uppercase tracking-wider">Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-signal-gold/50 transition-all">
              <Share2 size={20} />
              <span className="font-bold uppercase tracking-wider">Share Results</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ground0ResultPage;
