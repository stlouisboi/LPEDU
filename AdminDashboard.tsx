import React, { useState } from 'react';
import { 
  Settings, 
  PenTool, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Video,
  BookOpen,
  Mail,
  Loader2,
  Globe,
  Palette,
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from './App';
import { useAuth } from './AuthContext';

// Specialized Sub-components
import SettingsManager from './pages/admin/SettingsManager';
import BlogList from './pages/admin/BlogList';
import VideoLab from './pages/admin/VideoLab';

const AdminDashboard = () => {
  const { settings, updateSettings, blogs } = useApp();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'settings' | 'blogs' | 'videos' | 'modules'>('settings');

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary-dark px-4">
        <div className="max-w-md w-full bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-2xl border border-border-light dark:border-border-dark text-center">
          <Settings className="w-16 h-16 text-authority-blue mx-auto mb-6" />
          <h1 className="text-3xl font-bold font-serif mb-4">Access Denied</h1>
          <p className="text-text-muted mb-8">You must be logged in as an administrator to view this command center.</p>
          <Link to="/admin/login" className="bg-authority-blue text-white px-8 py-3 rounded-xl font-bold inline-block">Go to Login</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'settings', label: 'Site Settings', icon: <Settings size={18} /> },
    { id: 'blogs', label: 'Blog Management', icon: <PenTool size={18} /> },
    { id: 'videos', label: 'Video Library', icon: <Video size={18} /> },
    { id: 'modules', label: 'Course Modules', icon: <BookOpen size={18} /> },
  ];

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Command Center</h1>
            <p className="text-text-muted font-bold text-xs uppercase tracking-widest mt-1 opacity-70">Fleet Logistics & Operations Hub</p>
          </div>
          <div className="flex items-center space-x-3 bg-white dark:bg-surface-dark px-4 py-2 rounded-2xl border border-border-light shadow-sm">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest">Admin Online: {currentUser.email}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark p-2 rounded-3xl shadow-xl mb-12 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-grow flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${
                activeTab === tab.id 
                ? 'bg-authority-blue text-white shadow-lg' 
                : 'text-text-muted hover:bg-slate-50 dark:hover:bg-gray-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Panel */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'settings' && (
            <div className="space-y-12">
               <SettingsManager />
               <div className="bg-authority-blue p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                  <Globe className="mb-6 text-signal-gold" size={32} />
                  <h3 className="text-2xl font-bold font-serif mb-4">Homepage Interface Editor</h3>
                  <p className="opacity-70 max-w-xl mb-8 leading-relaxed font-medium">Control the headline, mission statement, and hero visuals seen by all visitors. Powered by high-fidelity neural image synthesis.</p>
                  <Link to="/admin/pages/home" className="inline-flex items-center space-x-3 bg-white text-authority-blue px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all">
                    <span>Open Visual Editor</span>
                    <ChevronRight size={16} />
                  </Link>
               </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <BlogList />
          )}

          {activeTab === 'videos' && (
            <VideoLab />
          )}

          {activeTab === 'modules' && (
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-sm text-center">
               <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-authority-blue">
                 <BookOpen size={40} />
               </div>
               <h3 className="text-2xl font-bold font-serif mb-4">Course Architect</h3>
               <p className="text-text-muted max-w-md mx-auto mb-10 font-medium">Structure your curriculum, add lesson plans, and link instructional video assets to specific modules.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl border border-border-light hover:border-authority-blue transition-colors cursor-pointer group">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">Module {i}</p>
                       <h4 className="font-bold text-sm mb-4">Lesson Framework</h4>
                       <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-green-600 uppercase">Live</span>
                          <ChevronRight size={14} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;