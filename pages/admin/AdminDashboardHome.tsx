
import React, { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, Download, ArrowUpRight, Zap, FileEdit, PlusCircle, AlertCircle, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';

const AdminDashboardHome = () => {
  const [dbStatus, setDbStatus] = useState<'checking' | 'active' | 'api-disabled' | 'not-found' | 'error'>('checking');

  useEffect(() => {
    const checkHealth = async () => {
      if (!isFirebaseConfigured || !db || typeof db !== 'object') {
        setDbStatus('error');
        return;
      }
      try {
        // Light check - attempt to fetch a non-existent doc to trigger a connection
        await getDoc(doc(db, "_health_check_", "ping"));
        setDbStatus('active');
      } catch (err: any) {
        console.error("Dashboard Health Check Error:", err);
        if (err.code === 'permission-denied') {
          setDbStatus('api-disabled');
        } else if (err.code === 'not-found' || err.message?.includes('database (default) does not exist')) {
          setDbStatus('not-found');
        } else {
          setDbStatus('error');
        }
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
    { name: 'Upload Resource', path: '/admin/resources', icon: <Zap size={18} /> },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Admin Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back. Monitoring LaunchPath systems.</p>
        </div>
        
        {/* API Health Check Status */}
        <div className="bg-white dark:bg-surface-dark px-4 py-2 rounded-xl border border-border-light dark:border-border-dark flex items-center space-x-3 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Cloud Health:</span>
          {dbStatus === 'checking' && <Loader2 size={14} className="animate-spin text-authority-blue" />}
          {dbStatus === 'active' && <CheckCircle2 size={14} className="text-green-500" />}
          {(dbStatus === 'api-disabled' || dbStatus === 'not-found') && <AlertCircle size={14} className="text-red-500" />}
          {dbStatus === 'error' && <AlertCircle size={14} className="text-amber-500" />}
          <span className={`text-xs font-bold ${
            dbStatus === 'active' ? 'text-green-600' : 
            (dbStatus === 'api-disabled' || dbStatus === 'not-found') ? 'text-red-600' : 'text-text-muted'
          }`}>
            {dbStatus === 'checking' ? 'Connecting...' : 
             dbStatus === 'active' ? 'Operational' : 
             dbStatus === 'not-found' ? 'Database Not Found' :
             dbStatus === 'api-disabled' ? 'API Disabled' : 'Configuration Required'}
          </span>
        </div>
      </div>

      {dbStatus === 'not-found' && (
        <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-[2.5rem] border border-red-200 dark:border-red-900/50 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500 shadow-xl">
          <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-3xl text-red-600">
            <AlertCircle size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 font-serif">Firestore Database Missing</h3>
            <p className="text-red-700/80 dark:text-red-300/80 mt-2 max-w-xl mx-auto leading-relaxed">
              Your Firebase project <strong>lpedu-d9bb2</strong> exists, but the Cloud Firestore database instance has not been created yet. You must initialize it in the Google Cloud console.
            </p>
          </div>
          <a 
            href="https://console.cloud.google.com/datastore/setup?project=lpedu-d9bb2" 
            target="_blank" 
            rel="noreferrer" 
            className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            Create Firestore Database Now <ExternalLink size={18} className="ml-2" />
          </a>
        </div>
      )}

      {dbStatus === 'api-disabled' && (
        <div className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-[2.5rem] border border-amber-200 dark:border-amber-900/50 flex flex-col md:flex-row items-center justify-between gap-6 animate-in zoom-in-95 duration-300 shadow-lg">
          <div className="flex items-center space-x-5">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/40 rounded-3xl text-amber-600">
              <AlertCircle size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-400 font-serif">Cloud Firestore API Disabled</h3>
              <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mt-1">The API is not enabled for project <span className="font-mono bg-white/50 px-1 rounded">lpedu-d9bb2</span>.</p>
            </div>
          </div>
          <a 
            href="https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=lpedu-d9bb2" 
            target="_blank" 
            rel="noreferrer" 
            className="whitespace-nowrap bg-amber-600 text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-amber-700 transition-all shadow-md"
          >
            Enable API Now <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-green-500 flex items-center">
                {stat.trend} <ArrowUpRight size={12} className="ml-1" />
              </span>
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
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm group-hover:text-authority-blue">
                    {action.icon}
                  </div>
                  <span className="font-bold text-sm">{action.name}</span>
                </div>
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-authority-blue p-8 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-center shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-signal-gold opacity-10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-serif mb-4 leading-tight">System Status: <br/>{dbStatus === 'active' ? 'Operational' : (dbStatus === 'not-found' || dbStatus === 'api-disabled') ? 'Action Required' : 'Checking...'}</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {dbStatus === 'not-found' 
                ? "The database instance for project lpedu-d9bb2 hasn't been created yet. Follow the instructional alerts above to finalize setup." 
                : dbStatus === 'api-disabled'
                ? "Connectivity is blocked because the required Google APIs are not enabled for your project."
                : "Secure Cloud, Storage, and Authentication systems are reporting optimal health for the LaunchPath infrastructure."}
            </p>
            <Link to="/admin/settings" className="inline-flex items-center space-x-2 text-signal-gold font-bold hover:underline group">
              <span>System Settings</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default AdminDashboardHome;
