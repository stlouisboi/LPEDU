import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  CheckCircle,
  FileDown,
  ShieldAlert
} from 'lucide-react';

const DownloadPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const firstName = queryParams.get('name') || 'Carrier';

  const downloads = [
    {
      title: "The First 90 Days Risk Map™",
      description: "Identify compliance gaps before they become violations. This diagnostic tool reveals exactly what FMCSA auditors look for in new carriers.",
      icon: <FileText className="w-8 h-8" />,
      buttonText: "DOWNLOAD RISK MAP™",
      link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003",
      bonus: false
    },
    {
      title: "Owner-Operator Survival Blueprint",
      description: "Complete system for audit-proof operations. Learn what 75% of failed carriers wish they knew on day one.",
      icon: <ShieldCheck className="w-8 h-8" />,
      buttonText: "DOWNLOAD BLUEPRINT",
      link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPath_The_Owner-Operator_Survival_Blueprint%20(2).pdf?alt=media&token=2e42b7cb-e308-49f7-a12f-92dbd19edeca",
      bonus: true
    }
  ];

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-20 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-3xl mb-8 shadow-sm">
             <CheckCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-authority-blue dark:text-white tracking-tighter mb-4">
            Your Compliance Resources Are Ready, <span className="text-signal-gold">{firstName}</span>!
          </h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
            Download both guides below to protect your authority and build a sustainable business from day one.
          </p>
        </div>

        {/* DOWNLOAD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {downloads.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-signal-gold to-yellow-500 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark p-10 rounded-[2.5rem] shadow-xl flex flex-col h-full hover:translate-y-[-4px] transition-all duration-300">
                {item.bonus && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    🎁 BONUS RESOURCE
                  </div>
                )}
                
                <div className="w-16 h-16 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-black font-serif text-authority-blue dark:text-white uppercase mb-4 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-text-muted dark:text-text-dark-muted font-medium leading-relaxed mb-10 flex-grow">
                  {item.description}
                </p>
                
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-signal-gold text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center shadow-xl hover:bg-authority-blue transition-all active:scale-95 group/btn"
                >
                  <FileDown className="mr-3 w-5 h-5 group-hover/btn:translate-y-0.5 transition-transform" />
                  {item.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="bg-authority-blue rounded-[3.5rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight mb-6">
              Ready to Build Your <br/><span className="text-signal-gold italic">Complete Compliance System?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
              These guides show you the problems. LaunchPath gives you the solutions—step by step, system by system. Secure your authority today.
            </p>
            <Link 
              to="/enroll" 
              className="inline-flex items-center space-x-3 bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl active:scale-95 group"
            >
              <span>VIEW COURSE OPTIONS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* TRUST SIGNALS */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
          <div className="flex items-center space-x-3">
             <ShieldAlert size={24} />
             <span className="text-[10px] font-black uppercase tracking-widest">FMCSA VERIFIED</span>
          </div>
          <div className="flex items-center space-x-3">
             <ShieldCheck size={24} />
             <span className="text-[10px] font-black uppercase tracking-widest">AUDIT READY</span>
          </div>
          <div className="flex items-center space-x-3">
             <CheckCircle size={24} />
             <span className="text-[10px] font-black uppercase tracking-widest">CERTIFIED TRAINING</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DownloadPage;