
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Scale,
  FileText,
  ShieldAlert,
  Lock,
  Info,
  Check,
  X,
  Calendar,
  Activity,
  UserCheck,
  ClipboardCheck,
  AlertCircle,
  Building2,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const EnrollPage = () => {
  const [formData, setFormData] = useState({
    carrierStatus: '',
    legalName: '',
    email: '',
    dotNumber: '',
    mcNumber: '',
    capitalStatus: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (db) {
        await addDoc(collection(db, "admissionInquiries"), {
          ...formData,
          submittedAt: serverTimestamp(),
          classification: formData.carrierStatus
        });
      }
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('System verification error. Please check your data or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-700">
      {/* 1. INSTITUTIONAL HEADER */}
      <section className="relative py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 px-5 py-2 rounded-full mb-8">
            <ShieldCheck size={14} className="text-authority-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-authority-blue">Eligibility & Classification Protocol v4.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1A1A1A] uppercase tracking-tight mb-6 leading-none">
            Admission <span className="text-authority-blue">Inquiry</span> & Alignment
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Admission to the LaunchPath Standard is a formal classification process. It verifies that a motor carrier possesses the structural prerequisites required for implementation of Technical Safety Files.
          </p>
        </div>
      </section>

      {/* 2. CLASSIFICATION GATE / FORM */}
      <section className="py-24 bg-[#F8F9FA] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          {isSubmitted ? (
            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-200 text-center animate-scale-in">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <Check size={40} />
              </div>
              <h2 className="text-3xl font-black font-serif uppercase mb-6 text-authority-blue">Inquiry Classified</h2>
              <p className="text-slate-500 font-medium leading-relaxed max-w-md mx-auto mb-10">
                Your credentials have been submitted for verification. A compliance officer will contact you within 24 hours regarding system access.
              </p>
              <Link to="/" className="inline-block bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">Return to Registry</Link>
            </div>
          ) : (
            <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(30,58,95,0.05)] border border-slate-100">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue mb-10">Admission Inquiry Form</h3>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center"><AlertCircle size={16} className="mr-2" /> {error}</div>}

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-4 block">Carrier Operating Status</label>
                  <div className="relative">
                    <select 
                      required
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm appearance-none cursor-pointer"
                      value={formData.carrierStatus}
                      onChange={e => setFormData({...formData, carrierStatus: e.target.value})}
                    >
                      <option value="">Select Status</option>
                      <option value="Existing Carrier">Existing Motor Carrier (Active Authority)</option>
                      <option value="Pre-Authority">Pre-Authority (Planning to File)</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-4 block">Legal Entity Name</label>
                    <input 
                      required 
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm"
                      value={formData.legalName}
                      onChange={e => setFormData({...formData, legalName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-4 block">Professional Email</label>
                    <input 
                      required 
                      type="email"
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {formData.carrierStatus === 'Existing Carrier' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-4 block">USDOT Number</label>
                      <input 
                        required 
                        placeholder="Required for Active Carriers"
                        className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm"
                        value={formData.dotNumber}
                        onChange={e => setFormData({...formData, dotNumber: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-4 block">MC Number</label>
                      <input 
                        required 
                        placeholder="Required for Active Carriers"
                        className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm"
                        value={formData.mcNumber}
                        onChange={e => setFormData({...formData, mcNumber: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-4 block">Initial Startup Capital Liquidity</label>
                  <div className="relative">
                    <select 
                      required
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm appearance-none cursor-pointer"
                      value={formData.capitalStatus}
                      onChange={e => setFormData({...formData, capitalStatus: e.target.value})}
                    >
                      <option value="">Select Level</option>
                      <option value="Under 10k">Less than $10,000</option>
                      <option value="10k-20k">$10,000 - $20,000</option>
                      <option value="Above 20k">More than $20,000</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-steel-blue transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-3" size={18} /> : <Lock className="mr-3" size={14} />}
                  Submit Admission Inquiry
                </button>
                
                <p className="text-[9px] text-center text-slate-400 uppercase tracking-widest font-bold leading-relaxed">
                  Inquiry submission initiates institutional review. Verification of prerequisites is required before system access is granted.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 3. EXPECTATIONS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue mb-12 text-center">Standard Expectations & Responsibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Administrative Discipline", 
                icon: <FileText size={24} />, 
                desc: "Carriers must maintain precise, Contemporaneous records of safety-sensitive functions as mandated by 49 CFR." 
              },
              { 
                title: "Operating Sequence", 
                icon: <Activity size={24} />, 
                desc: "Implementation must follow the defined Phase 0 through Phase 6 protocol to maintain system logical cohesion." 
              },
              { 
                title: "Individual Liability", 
                icon: <Scale size={24} />, 
                desc: "LaunchPath provides the documentation infrastructure; the carrier is solely responsible for implementation integrity." 
              }
            ].map((box, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="text-authority-blue mb-6">{box.icon}</div>
                <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue mb-4">{box.title}</h4>
                <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GOVERNING POLICY */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 border-l-4 border-authority-blue bg-slate-50 rounded-r-3xl">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue mb-6 flex items-center">
              <Lock size={14} className="mr-2" /> Institutional Policy
            </h4>
            <div className="space-y-4 text-xs font-bold text-slate-500 uppercase leading-relaxed tracking-wide">
              <p>LaunchPath is an educational standards organization. We do not provide Individualized Consulting, Legal Representation, or Insurance Brokerage.</p>
              <p>Admission results from verification of structural readiness. All participants are subject to the 7-day administrative review window.</p>
              <p className="text-authority-blue">System credentials are issued to the individual entity and are strictly non-transferable.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">
          LaunchPath Operating Standard // Admissions Registry // High-Trust Protocol Active
        </p>
      </footer>
    </div>
  );
};

export default EnrollPage;
