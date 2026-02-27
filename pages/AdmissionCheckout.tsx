import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Lock, Shield, Activity } from 'lucide-react';
import { useEnhancedAuth } from '../EnhancedAuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { checkCohortCapacity } from '../services/cohortService';
import type { Cohort } from '../types/cohort';

const AdmissionCheckout: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useEnhancedAuth();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [cohortAvailable, setCohortAvailable] = useState(true);
  const [cohortMessage, setCohortMessage] = useState('');
  const [availableCohort, setAvailableCohort] = useState<Cohort | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    checkAccess();
  }, [currentUser]);

  const checkAccess = async () => {
    try {
      if (!currentUser) {
        navigate('/ground-0');
        return;
      }

      // Check if user has completed Ground 0 with GO determination
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      const userData = userDoc.data();

      if (!userData?.ground0Completed || userData?.ground0Determination !== 'GO') {
        navigate('/ground-0');
        return;
      }

      // Check if already paid
      if (userData?.admissionConfirmed) {
        navigate('/operator-portal');
        return;
      }

      // Check cohort capacity
      const capacityCheck = await checkCohortCapacity();
      setCohortAvailable(capacityCheck.available);
      setCohortMessage(capacityCheck.message);
      setAvailableCohort(capacityCheck.cohort);

      if (!capacityCheck.available) {
        setHasAccess(false);
        return;
      }

      setHasAccess(true);
      setFormData({
        fullName: currentUser.displayName || '',
        email: currentUser.email || '',
        phone: userData?.phone || ''
      });
    } catch (error) {
      console.error('Access check error:', error);
      navigate('/ground-0');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please acknowledge the implementation agreement.');
      return;
    }

    setProcessing(true);

    try {
      // TODO: Integrate with Stripe
      // For now, redirect to a placeholder
      alert('Stripe integration coming soon. This will process the $2,500 payment.');
      
      // After successful payment, the webhook will:
      // 1. Set admissionConfirmed = true
      // 2. Grant operator portal access
      // 3. Send confirmation email
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-16 h-16 border-4 border-signal-gold/20 border-t-signal-gold rounded-full mx-auto"></div>
          <p className="text-white font-bold">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    // Show capacity message if cohorts are full
    if (!cohortAvailable) {
      return (
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white/[0.02] border border-white/10 rounded-3xl p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-amber-500/10 border-2 border-amber-500/30 rounded-full flex items-center justify-center mx-auto">
              <Lock size={40} className="text-amber-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-amber-500">
              COHORT AT CAPACITY
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {cohortMessage}
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-slate-400 mb-6">
                You will be notified when the next cohort opens for enrollment.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-signal-gold text-authority-blue font-black uppercase tracking-wider rounded-xl hover:bg-signal-gold/90 transition-colors"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-white/[0.02] backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="text-signal-gold" size={32} />
              <div>
                <h1 className="text-xl font-black uppercase tracking-tight">Admission Checkout</h1>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Secure Payment Terminal</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400">
              <Activity size={16} className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider">Encrypted</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        
        {/* Confirmation Banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl text-center space-y-4">
          <CheckCircle size={64} className="text-emerald-500 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-emerald-500">
            ✓ SYSTEM ADMISSION CONFIRMED
          </h2>
          <p className="text-xl text-slate-200">
            Lifetime Access to LaunchPath Operating Standard
          </p>
          <div className="pt-6 space-y-2 border-t border-emerald-500/20">
            <p className="text-sm text-slate-300 uppercase tracking-wide">
              <span className="font-black">Investment:</span> $2,500
            </p>
            <p className="text-sm text-slate-300 uppercase tracking-wide">
              <span className="font-black">Access:</span> Immediate upon payment
            </p>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Contact Information */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight">Contact Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-signal-gold/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-signal-gold/50 transition-colors"
                  placeholder="john@carrier.com"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-signal-gold/50 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <label className="flex items-start space-x-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-signal-gold checked:border-signal-gold focus:ring-2 focus:ring-signal-gold/50 transition-all"
              />
              <span className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                ☐ I acknowledge this is a 90-day implementation system and agree to complete modules in sequence.
              </span>
            </label>
          </div>

          {/* Payment Section */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black uppercase tracking-tight">Payment</h3>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Lock size={14} />
                <span className="font-bold uppercase tracking-wider">Stripe Secure</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <p className="text-slate-400 text-sm mb-4">Stripe Payment Element will be integrated here</p>
              <div className="text-4xl font-black text-signal-gold">$2,500</div>
              <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">One-Time Investment</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={processing || !agreed}
            className="w-full bg-signal-gold text-[#002244] py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_40px_80px_rgba(218,165,32,0.4)] hover:bg-[#D4B06A] transition-all active:scale-95 border-b-[12px] border-[#9D7A3E] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-4"
          >
            {processing ? (
              <>
                <div className="animate-spin w-6 h-6 border-4 border-[#002244]/20 border-t-[#002244] rounded-full"></div>
                <span>PROCESSING...</span>
              </>
            ) : (
              <>
                <CreditCard size={24} />
                <span>PROCESS PAYMENT – $2,500</span>
              </>
            )}
          </button>

          {/* Security Badge */}
          <div className="flex items-center justify-center space-x-3 opacity-40">
            <Shield size={20} className="text-signal-gold" />
            <p className="text-xs font-black uppercase tracking-[0.3em]">
              256-BIT ENCRYPTION // PCI COMPLIANT
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdmissionCheckout;
