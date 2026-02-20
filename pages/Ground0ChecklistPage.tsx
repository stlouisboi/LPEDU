import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  ArrowRight,
  Shield,
  FileText,
  Truck,
  Clock,
  Wrench,
  Users,
  Database,
  DollarSign,
  Target,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';
import { generateGround0PDF } from '../utils/pdfExport';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Section {
  id: number;
  title: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
  expanded: boolean;
}

const CHECKLIST_SECTIONS = [
  {
    id: 1,
    title: 'Authority and Identity',
    icon: <Shield size={24} />,
    items: [
      { id: '1-1', text: 'DOT and MC numbers active and correct', checked: false },
      { id: '1-2', text: 'Legal business name, DBA, and tax ID consistent across FMCSA, insurance, and bank', checked: false },
      { id: '1-3', text: 'Correct operation classification (for-hire/private, interstate/intrastate) on file', checked: false },
      { id: '1-4', text: 'Process agent (BOC-3) filed and current', checked: false }
    ]
  },
  {
    id: 2,
    title: 'Insurance and Risk',
    icon: <Shield size={24} />,
    items: [
      { id: '2-1', text: 'Liability and cargo limits match freight type and customer requirements', checked: false },
      { id: '2-2', text: 'No gaps in coverage from activation date', checked: false },
      { id: '2-3', text: 'Loss-run and MVR pull process defined (who checks, how often)', checked: false },
      { id: '2-4', text: 'Certificate handling process in place (who requests, who tracks)', checked: false }
    ]
  },
  {
    id: 3,
    title: 'Driver Qualification Files',
    icon: <Users size={24} />,
    items: [
      { id: '3-1', text: 'Valid CDL(s) with required endorsements', checked: false },
      { id: '3-2', text: 'Completed application(s) and prior employer checks on file', checked: false },
      { id: '3-3', text: 'MVR on file at hire and within last 12 months', checked: false },
      { id: '3-4', text: 'Medical card and clearinghouse query documented', checked: false },
      { id: '3-5', text: 'Drug/alcohol program active with consortium enrollment proof', checked: false }
    ]
  },
  {
    id: 4,
    title: 'Hours of Service and ELD',
    icon: <Clock size={24} />,
    items: [
      { id: '4-1', text: 'ELD compliant, set up to correct carrier and time zone', checked: false },
      { id: '4-2', text: 'Written HOS policy (on-duty, off-duty, personal use, yard moves)', checked: false },
      { id: '4-3', text: 'Log review process: who checks, how often, what gets corrected', checked: false },
      { id: '4-4', text: 'Personal conveyance and yard-move rules defined in writing', checked: false }
    ]
  },
  {
    id: 5,
    title: 'Vehicle and Maintenance',
    icon: <Truck size={24} />,
    items: [
      { id: '5-1', text: 'Unit list with VIN, plate, and asset ID', checked: false },
      { id: '5-2', text: 'Proof of ownership/lease and registration for each unit', checked: false },
      { id: '5-3', text: 'Maintenance file per unit: inspections, repairs, and service intervals', checked: false },
      { id: '5-4', text: 'Pre-trip / post-trip inspection process documented and in use', checked: false },
      { id: '5-5', text: 'Annual DOT inspection current', checked: false }
    ]
  },
  {
    id: 6,
    title: 'Safety Program and Training',
    icon: <Shield size={24} />,
    items: [
      { id: '6-1', text: 'Named safety officer (even if it\'s the owner) with clear responsibilities', checked: false },
      { id: '6-2', text: 'Written safety policy signed and dated', checked: false },
      { id: '6-3', text: 'Orientation checklist for any new driver', checked: false },
      { id: '6-4', text: 'Incident/accident reporting process: who to call, what to document, what forms to complete', checked: false }
    ]
  },
  {
    id: 7,
    title: 'Compliance Paperwork and Recordkeeping',
    icon: <FileText size={24} />,
    items: [
      { id: '7-1', text: 'Central place (physical or digital) where all safety and compliance records live', checked: false },
      { id: '7-2', text: 'File structure that matches FMCSA audit categories', checked: false },
      { id: '7-3', text: 'Backup plan: what happens if laptop/phone goes down', checked: false }
    ]
  },
  {
    id: 8,
    title: 'Financial and Cash-Flow Readiness',
    icon: <DollarSign size={24} />,
    items: [
      { id: '8-1', text: '90-day basic cash-flow plan: fuel, insurance, truck note, maintenance, driver pay, owner pay', checked: false },
      { id: '8-2', text: 'Factoring/receivables plan or clear direct-pay terms with brokers/shippers', checked: false },
      { id: '8-3', text: 'Process for setting and checking minimum profitable rate per mile', checked: false }
    ]
  },
  {
    id: 9,
    title: 'Operational Discipline',
    icon: <Target size={24} />,
    items: [
      { id: '9-1', text: 'Written dispatch and load-acceptance rules (no cheap freight that breaks safety)', checked: false },
      { id: '9-2', text: 'Clear policy on out-of-service defects: who grounds the unit and who authorizes return', checked: false },
      { id: '9-3', text: 'Simple corrective-action process after violations or incidents', checked: false }
    ]
  },
  {
    id: 10,
    title: 'Governance and Review',
    icon: <BarChart3 size={24} />,
    items: [
      { id: '10-1', text: 'Monthly safety and compliance review scheduled (date, time, who attends)', checked: false },
      { id: '10-2', text: 'AUTO Diagnostic results stored and referenced as your baseline risk map', checked: false },
      { id: '10-3', text: 'Ground 0 corrective items tracked with due dates until closed', checked: false }
    ]
  }
];

const Ground0ChecklistPage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>(
    CHECKLIST_SECTIONS.map(s => ({ ...s, expanded: false, items: s.items.map(i => ({ ...i })) }))
  );
  const [email, setEmail] = useState('');
  const [carrierName, setCarrierName] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSection = (sectionId: number) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, expanded: !s.expanded } : s
    ));
  };

  const toggleItem = (sectionId: number, itemId: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map(i => 
            i.id === itemId ? { ...i, checked: !i.checked } : i
          )
        };
      }
      return s;
    }));
  };

  const calculateSectionScore = (section: Section) => {
    const total = section.items.length;
    const checked = section.items.filter(i => i.checked).length;
    const percentage = (checked / total) * 100;
    
    if (percentage === 100) return 'pass';
    if (percentage >= 70) return 'needs-work';
    return 'fail';
  };

  const calculateOverallScore = () => {
    const sectionScores = sections.map(s => calculateSectionScore(s));
    const passCount = sectionScores.filter(s => s === 'pass').length;
    const failCount = sectionScores.filter(s => s === 'fail').length;
    
    if (failCount > 2) return 'not-ready';
    if (passCount >= 8 && failCount === 0) return 'ready';
    return 'needs-work';
  };

  const getTotalProgress = () => {
    const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
    const checkedItems = sections.reduce((acc, s) => 
      acc + s.items.filter(i => i.checked).length, 0
    );
    return Math.round((checkedItems / totalItems) * 100);
  };

  const handleSubmit = async () => {
    setShowEmailCapture(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calculate scores
      const overallScore = calculateOverallScore();
      const sectionScores = sections.map(s => ({
        section: s.title,
        score: calculateSectionScore(s),
        completedItems: s.items.filter(i => i.checked).length,
        totalItems: s.items.length
      }));

      // Save to Firestore
      await addDoc(collection(db, 'ground0_evaluations'), {
        email,
        carrierName,
        overallScore,
        sectionScores,
        totalProgress: getTotalProgress(),
        sections: sections.map(s => ({
          title: s.title,
          items: s.items
        })),
        createdAt: serverTimestamp()
      });

      // Sync to MailerLite
      await syncToMailerLite(email, {
        fields: {
          name: carrierName,
          ground_0_score: overallScore,
          ground_0_progress: getTotalProgress().toString()
        },
        groups: [overallScore === 'ready' ? 'ground-0-ready' : 'ground-0-needs-work']
      });

      setShowResults(true);
    } catch (error) {
      console.error('Error submitting checklist:', error);
      alert('Error submitting evaluation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const overallScore = calculateOverallScore();
  const progress = getTotalProgress();

  if (showResults) {
    return (
      <div className="min-h-screen bg-primary-dark text-white py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
              overallScore === 'ready' ? 'bg-emerald-500/20' : 
              overallScore === 'needs-work' ? 'bg-yellow-500/20' : 'bg-red-500/20'
            }`}>
              {overallScore === 'ready' ? <CheckCircle size={64} className="text-emerald-500" /> :
               overallScore === 'needs-work' ? <AlertTriangle size={64} className="text-yellow-500" /> :
               <XCircle size={64} className="text-red-500" />}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-serif">
              {overallScore === 'ready' ? 'READY FOR ADMISSION' :
               overallScore === 'needs-work' ? 'CORRECTIVE ITEMS REQUIRED' :
               'NOT READY - STRUCTURAL DEFICIENCIES'}
            </h1>
            
            <p className="text-2xl text-white/70 font-medium">
              {overallScore === 'ready' 
                ? 'Your operation meets the minimum structural standard.'
                : 'Your operation requires corrective action before admission can be considered.'}
            </p>
          </div>

          <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-10 space-y-8">
            <h2 className="text-3xl font-black uppercase text-signal-gold">Section Scores</h2>
            <div className="space-y-4">
              {sections.map(section => {
                const score = calculateSectionScore(section);
                return (
                  <div key={section.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="text-signal-gold">{section.icon}</div>
                      <span className="font-bold text-lg">{section.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-black uppercase tracking-widest text-white/60">
                        {section.items.filter(i => i.checked).length}/{section.items.length}
                      </span>
                      {score === 'pass' ? <CheckCircle size={24} className="text-emerald-500" /> :
                       score === 'needs-work' ? <AlertTriangle size={24} className="text-yellow-500" /> :
                       <XCircle size={24} className="text-red-500" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => generateGround0PDF({
                carrierName,
                email,
                overallScore,
                totalProgress: progress,
                sections: sections.map(s => ({
                  id: s.id,
                  title: s.title,
                  items: s.items
                })),
                sectionScores: sections.map(s => ({
                  section: s.title,
                  score: calculateSectionScore(s),
                  completedItems: s.items.filter(i => i.checked).length,
                  totalItems: s.items.length
                }))
              })}
              className="inline-flex items-center justify-center space-x-3 bg-white/10 border-2 border-white/20 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all"
            >
              <Download size={20} />
              <span>Download Report (PDF)</span>
            </button>
            
            {overallScore === 'ready' ? (
              <Link 
                to="/pricing"
                className="inline-flex items-center justify-center space-x-3 bg-signal-gold text-primary-dark px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl border-b-4 border-[#8e7340]"
              >
                <span>Request Admission</span>
                <ArrowRight size={20} />
              </Link>
            ) : (
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center space-x-3 bg-signal-gold text-primary-dark px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl border-b-4 border-[#8e7340]"
              >
                <span>Get Corrective Plan</span>
                <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showEmailCapture) {
    return (
      <div className="min-h-screen bg-primary-dark text-white flex items-center justify-center py-32 px-6">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-serif">
              GENERATE YOUR <span className="text-signal-gold">READINESS REPORT</span>
            </h2>
            <p className="text-xl text-white/70 font-medium">
              Enter your information to receive your Ground 0 evaluation results.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="bg-white/5 border-2 border-white/10 rounded-3xl p-10 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-white/60">Carrier Name</label>
              <input
                required
                type="text"
                value={carrierName}
                onChange={e => setCarrierName(e.target.value)}
                placeholder="Your Carrier Name"
                className="w-full bg-white/10 border-2 border-white/20 px-6 py-4 rounded-2xl text-lg font-medium outline-none focus:border-signal-gold transition-all placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-white/60">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/10 border-2 border-white/20 px-6 py-4 rounded-2xl text-lg font-medium outline-none focus:border-signal-gold transition-all placeholder:text-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-signal-gold text-primary-dark py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl border-b-4 border-[#8e7340] disabled:opacity-50 flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Generate Report</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white py-32 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">ENFORCEMENT_FRAMEWORK</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight font-serif leading-none">
            GROUND 0 <br/><span className="text-signal-gold italic">CHECKLIST.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium max-w-3xl mx-auto leading-relaxed">
            This is the <strong className="text-white">minimum structural standard</strong>. The <strong className="text-signal-gold">measuring rod</strong>. The gate that determines admission readiness.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-black uppercase tracking-widest text-white/60">Overall Progress</span>
            <span className="text-3xl font-black text-signal-gold">{progress}%</span>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-signal-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map(section => {
            const score = calculateSectionScore(section);
            const checkedCount = section.items.filter(i => i.checked).length;
            
            return (
              <div key={section.id} className="bg-white/5 border-2 border-white/10 rounded-3xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-signal-gold/20 rounded-2xl flex items-center justify-center text-signal-gold">
                      {section.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-black uppercase tracking-tight">{section.title}</h3>
                      <p className="text-sm font-bold text-white/60 mt-1">
                        {checkedCount}/{section.items.length} Complete
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {score === 'pass' ? <CheckCircle size={32} className="text-emerald-500" /> :
                     score === 'needs-work' ? <AlertTriangle size={32} className="text-yellow-500" /> :
                     <XCircle size={32} className="text-red-500" />}
                    {section.expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>

                {section.expanded && (
                  <div className="border-t border-white/10 p-8 space-y-4">
                    {section.items.map(item => (
                      <label
                        key={item.id}
                        className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(section.id, item.id)}
                          className="w-6 h-6 mt-1 rounded-lg border-2 border-white/20 bg-white/10 checked:bg-signal-gold checked:border-signal-gold cursor-pointer"
                        />
                        <span className={`text-lg font-medium leading-relaxed ${
                          item.checked ? 'text-white/50 line-through' : 'text-white/90'
                        }`}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={progress < 100}
            className="inline-flex items-center justify-center space-x-3 bg-signal-gold text-primary-dark px-16 py-8 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-white transition-all shadow-2xl border-b-8 border-[#8e7340] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Complete Evaluation</span>
            <ArrowRight size={24} />
          </button>
          {progress < 100 && (
            <p className="text-sm text-white/60 font-medium mt-4">
              Complete all sections to generate your readiness report
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ground0ChecklistPage;
