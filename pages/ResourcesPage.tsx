
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  increment 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';
import { Download, FileText, Database, CheckCircle, ArrowRight, X, Loader2, Mail, Lock } from 'lucide-react';
import { useApp } from '../App';
import { Resource } from '../types';

const ResourcesPage = () => {
  const { addFormSubmission } = useApp();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
      setResources(data);
      setLoading(false);
    }, (error) => {
      console.warn("LaunchPath: Resources public fetch failed (Likely API disabled).", error);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleDownloadClick = async (res: Resource) => {
    if (res.requiresEmail) {
      setActiveResource(res);
      setIsModalOpen(true);
    } else {
      triggerDownload(res);
    }
  };

  const triggerDownload = async (res: Resource) => {
    // Record download count
    if (db && (db as any).app) {
      try {
        await updateDoc(doc(db, "resources", res.id), {
          downloadCount: increment(1)
        });
      } catch (err) {
        console.warn("Could not increment download count.");
      }
    }

    // Trigger actual download
    const link = document.createElement('a');
    link.href = res.url;
    link.target = '_blank';
    link.download = res.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !activeResource || !db) return;
    
    // Save contact to firestore
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        resourceId: activeResource.id,
        resourceName: activeResource.name,
        timestamp: new Date().toISOString()
      });

      addFormSubmission({
        type: 'Resource Lead',
        resourceId: activeResource.id,
        name: name,
        email: email,
        date: new Date().toISOString()
      });

      setIsSubmitted(true);
      triggerDownload(activeResource);

      setTimeout(() => {
          setIsModalOpen(false);
          setIsSubmitted(false);
          setName('');
          setEmail('');
      }, 2000);
    } catch (err) {
      alert("Submission failed. You might be in offline/fallback mode.");
      triggerDownload(activeResource); // Still allow download if possible
    }
  };

  const categories = ['Checklists', 'Templates', 'Worksheets', 'Guides'];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
        <p className="text-text-muted font-bold uppercase tracking-widest text-xs">Accessing Knowledge Library...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Carrier Resource Library</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Free downloadable DOT compliance resources for new owner-operators. Build your authority backbone with verified checklists and templates.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm font-bold text-authority-blue">
             <CheckCircle className="w-5 h-5" />
             <span>FMCSA Standard Compliance Pack v2.4</span>
          </div>
        </div>

        <div className="space-y-24">
          {categories.map((cat, idx) => {
            const groupResources = resources.filter(r => r.category === cat);
            if (groupResources.length === 0) return null;

            return (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-10 flex items-center">
                  <div className="w-8 h-8 bg-authority-blue/10 text-authority-blue rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-4 h-4" />
                  </div>
                  {cat}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupResources.map((res, i) => (
                    <div key={i} className="bg-primary-light dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col hover:shadow-2xl transition-all group relative overflow-hidden">
                      {res.requiresEmail && (
                        <div className="absolute top-6 right-6 p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full" title="Requires Email">
                           <Lock size={14} />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm group-hover:bg-authority-blue group-hover:text-white transition-colors">
                          <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                          {res.type} • {res.size}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 font-serif leading-tight">{res.name}</h3>
                      <p className="text-sm text-text-muted dark:text-text-dark-muted mb-8 flex-grow leading-relaxed">
                        {res.description}
                      </p>
                      <button 
                        onClick={() => handleDownloadClick(res)}
                        className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark py-4 rounded-2xl font-bold hover:bg-authority-blue hover:text-white transition-all shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Now</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {resources.length === 0 && !loading && (
             <div className="text-center py-20 bg-gray-50 dark:bg-surface-dark rounded-3xl border-2 border-dashed border-border-light">
                <Database className="mx-auto mb-4 opacity-20" size={48} />
                <p className="text-text-muted font-bold">No resources found.</p>
                <p className="text-xs text-text-muted">Ensure your Cloud Firestore API is enabled if you have uploaded files.</p>
             </div>
          )}
        </div>

        {/* Lead Capture Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3rem] shadow-2xl border border-border-light dark:border-border-dark max-w-lg w-full relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                     <CheckCircle className="w-10 h-10" />
                   </div>
                   <h3 className="text-3xl font-bold font-serif mb-2">Ready to Go!</h3>
                   <p className="text-text-muted">Your download should start momentarily.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-serif leading-none">Unlock Access</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-1">Compliance Ledger Integration</p>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-4 font-serif">{activeResource?.name}</h4>
                  <p className="text-sm text-text-muted mb-8 leading-relaxed">Enter your information to download this resource instantly. We'll also send you weekly safety bulletins to keep you audit-ready.</p>
                  <form onSubmit={handleLeadCapture} className="space-y-4">
                    <input 
                      required
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <input 
                      required
                      type="email" 
                      placeholder="Professional Email Address" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <button className="w-full bg-authority-blue text-white font-bold py-5 rounded-2xl flex items-center justify-center group shadow-xl hover:shadow-2xl transition-all">
                      <span>Download Secure File</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[9px] text-center text-text-muted mt-6 uppercase tracking-widest font-black">
                      Zero Spam Policy • Regulatory Updates Only
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
