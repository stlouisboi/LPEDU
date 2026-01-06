
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Shield, 
  Download, 
  ArrowRight, 
  ClipboardList, 
  Files, 
  Target, 
  X, 
  Mail, 
  Loader2, 
  CheckCircle, 
  Star,
  BookOpen,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { COURSE_MODULES } from '../constants';

const PHASES = [
  { number: 1, title: "Legal Setup & Authority", duration: "Weeks 1-4", priority: "CRITICAL", icon: <ClipboardList />, color: "#1e3a5f", moduleIds: [0, 1] },
  { number: 2, title: "Insurance & Fiscal", duration: "Weeks 4-6", priority: "CRITICAL", icon: <Shield />, color: "#475569", moduleIds: [2] }
];

const LearningPathPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePhase, setActivePhase] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', newsletter: true });

  const handleDownloadClick = (phase: any) => {
    setActivePhase(phase);
    setModalOpen(true);
    setSuccess(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (db) {
        await addDoc(collection(db, "leads"), { ...formData, phase: activePhase?.number, timestamp: serverTimestamp() });
      }
      setSuccess(true);
      setTimeout(() => setModalOpen(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen">
      <section className="pt-24 pb-32 bg-authority-blue text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-8">Carrier Success Pathway</h1>
        <p className="text-xl max-w-3xl mx-auto px-4 opacity-80">Milestones to move from registration to audit-ready status.</p>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4">
        {PHASES.map((phase) => (
          <div key={phase.number} className="mb-12 p-8 bg-white dark:bg-surface-dark rounded-3xl border shadow-sm">
            <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
            <button onClick={() => handleDownloadClick(phase)} className="bg-authority-blue text-white px-6 py-3 rounded-xl font-bold">Download Phase {phase.number} Pack</button>
          </div>
        ))}
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-surface-dark p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 p-2"><X /></button>
            {success ? <h3 className="text-2xl font-bold text-center">Access Granted!</h3> : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input required placeholder="Email" className="w-full p-4 border rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <button disabled={loading} className="w-full bg-authority-blue text-white py-4 rounded-xl font-bold">{loading ? 'Processing...' : 'Download Now'}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
