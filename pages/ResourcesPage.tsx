
import React, { useState } from 'react';
import { Download, FileText, Layout, PenTool, Database, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../App';

const ResourcesPage = () => {
  const { addFormSubmission } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resourceGroups = [
    {
      title: "Essential Checklists",
      resources: [
        { name: "New Entrant Audit Checklist", type: "PDF", size: "1.2 MB", desc: "Every document requested in a standard safety audit." },
        { name: "Daily Driver Vehicle Inspection Report", type: "XLS", size: "450 KB", desc: "Customizable template for pre and post trip inspections." },
        { name: "DQ File Mandatory Contents", type: "DOC", size: "200 KB", desc: "The exact order your driver files should be in." }
      ]
    },
    {
      title: "Business Planning",
      resources: [
        { name: "Carrier Operating Cost Calculator", type: "XLS", size: "1.5 MB", desc: "Calculate your true cost-per-mile including fixed and variable expenses." },
        { name: "Authority Setup Worksheet", type: "PDF", size: "800 KB", desc: "Track your MC/DOT numbers and state registration deadlines." }
      ]
    }
  ];

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    addFormSubmission({
      type: 'Resource Lead',
      name: name,
      email: email,
      date: new Date().toISOString()
    });
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lead Capture Hero */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Carrier Resource Library</h1>
            <p className="text-xl text-text-muted dark:text-text-dark-muted mb-8 leading-relaxed">
              Professional, free high-quality tools to help you build your compliance backbone. Verified against current federal standards.
            </p>
            <div className="flex items-center space-x-4 text-sm font-bold text-authority-blue">
               <CheckCircle className="w-5 h-5" />
               <span>Updated for 2024 Safety Audits</span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-8 animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Check Your Inbox!</h3>
                <p className="text-text-muted">We've sent the Master Compliance Pack to {email}.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-authority-blue font-bold hover:underline">Download another?</button>
              </div>
            ) : (
              <form onSubmit={handleLeadCapture}>
                <h3 className="text-2xl font-bold mb-4 font-serif">Get the Free Master Pack</h3>
                <p className="text-sm text-text-muted mb-8">Download all checklists and templates in one high-resolution bundle.</p>
                <div className="space-y-4">
                  <input 
                    required
                    type="text" 
                    placeholder="First Name" 
                    className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <button className="w-full bg-authority-blue text-white font-bold py-5 rounded-2xl flex items-center justify-center group">
                    <span>Send Me the Master Pack</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="text-[10px] text-center text-text-muted mt-6 uppercase tracking-widest font-bold">Privacy-first. No spam, only guidance.</p>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-24">
          {resourceGroups.map((group, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold mb-10 flex items-center">
                <div className="w-8 h-8 bg-authority-blue/10 text-authority-blue rounded-lg flex items-center justify-center mr-4">
                  <Database className="w-4 h-4" />
                </div>
                {group.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.resources.map((res, i) => (
                  <div key={i} className="bg-primary-light dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark flex flex-col hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <FileText className="w-6 h-6 text-steel-blue" />
                      </div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                        {res.type} • {res.size}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{res.name}</h3>
                    <p className="text-sm text-text-muted dark:text-text-dark-muted mb-8 flex-grow">
                      {res.desc}
                    </p>
                    <button 
                      onClick={handleLeadCapture}
                      className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark py-3 rounded-xl font-bold hover:bg-authority-blue hover:text-white transition-all group-hover:border-authority-blue"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Resource</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 bg-authority-blue rounded-[3rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4 font-serif">Need a specific template?</h2>
            <p className="text-white/70">Our team creates new compliance resources every month based on user feedback. Let us know what you're missing.</p>
          </div>
          <button className="bg-signal-gold text-authority-blue px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all whitespace-nowrap">
            Request a Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
