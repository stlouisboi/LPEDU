import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Download, 
  ArrowUpRight, 
  Zap, 
  FileEdit, 
  PlusCircle, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ExternalLink, 
  ChevronRight, 
  Users,
  Settings,
  Globe,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';
import { useEnhancedAuth } from '../../EnhancedAuthContext';
import SettingsManager from './SettingsManager';

const AdminDashboardHome = () => {
  const { currentUser } = useEnhancedAuth();
  const [dbStatus, setDbStatus] = useState<'checking' | 'active' | 'api-disabled' | 'not-found' | 'error'>('checking');

  useEffect(() => {
    const checkHealth = async () => {
      if (!isFirebaseConfigured || !db || typeof db !== 'object') {
        setDbStatus('error');
        return;
      }
      try {
        const snap = await getDoc(doc(db, "settings", "general"));
        setDbStatus(snap.exists() ? 'active' : 'active'); // If we got a response, it's active
      } catch (err: any) {
        console.error("Dashboard Health Check Error:", err);
        if (err.code === 'permission-denied') setDbStatus('api-disabled');
        else if (err.code === 'not-found' || err.message?.includes('database (default) does not exist')) setDbStatus('not-found');
        else setDbStatus('error');
      }
    };
    checkHealth();
  }, []);

  const stats = [
    { label: 'Page Views', value: '1,284', icon: <BarChart3 className="text-blue-500" />, trend: '+12%' },
    { label: 'Form Leads', value: '24', icon: <MessageSquare className="text-green-500" />, trend: '+5%' },
    { label: 'Resources', value: '156', icon: <Download className="text-amber-500" />, trend: 'Stable' },
  ];

  const quickActions = [
    { name: 'Edit Homepage', path: '/admin/pages/home', icon: <FileEdit size={18} /> },
    { name: 'New Blog Post', path: '/admin/blog/new', icon: <PlusCircle size={18} /> },
    { name: 'Ground 0 Manager', path: '/admin/ground0', icon: <BookOpen size={18} /> },
    { name: 'Manage Leads', path: '/admin/leads', icon: <Users size={18} /> },
    { name: 'Upload Resource', path: '/admin/resources', icon: <Zap size={18} /> },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Admin Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back. Monitoring LaunchPath systems.</p>
        </div>
        
        <div className="bg-white dark:bg-surface-dark px-4 py-2 rounded-xl border border-border-light dark:border-border-dark flex items-center space-x-3 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Cloud Health:</span>
          {dbStatus === 'checking' && <Loader2 size={14} className="animate-spin text-authority-blue" />}
          {dbStatus === 'active' && <CheckCircle2 size={14} className="text-green-500" />}
          {(dbStatus === 'api-disabled' || dbStatus === 'not-found') && <AlertCircle size={14} className="text-red-500" />}
          <span className={`text-xs font-bold ${dbStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
            {dbStatus === 'checking' ? 'Connecting...' : dbStatus === 'active' ? 'Operational' : 'Action Required'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl">{stat.icon}</div>
              <span className="text-xs font-bold text-green-500 flex items-center">{stat.trend} <ArrowUpRight size={12} className="ml-1" /></span>
            </div>
            <p className="text-3xl font-black font-serif text-authority-blue dark:text-white">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm">
          <h3 className="text-xl font-bold font-serif mb-6 text-authority-blue dark:text-white">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, i) => (
              <Link 
                key={i} 
                to={action.path}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl hover:bg-authority-blue hover:text-white transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm group-hover:text-authority-blue">{action.icon}</div>
                  <span className="font-bold text-sm">{action.name}</span>
                </div>
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-authority-blue p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-signal-gold opacity-10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <Globe className="mb-6 text-signal-gold" size={32} />
          <h3 className="text-2xl font-bold font-serif mb-4">Site Settings Hub</h3>
          <p className="opacity-70 leading-relaxed font-medium mb-8">Manage global brand identity, SEO, and contact parameters from one clinical terminal.</p>
          <Link to="/admin/settings" className="inline-flex items-center space-x-3 bg-white text-authority-blue px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all">
            <span>Open System Settings</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
