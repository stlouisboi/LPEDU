/**
 * Coach Dashboard Page
 * Round 3 Build 3A: Coach-facing management environment
 * 
 * Displays assigned cohorts, carrier statuses, and submission queues
 * Following Portal Brief: "Professional document review tool, not a grading system"
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Activity, 
  Calendar,
  ChevronRight,
  Search,
  Filter,
  ShieldAlert
} from 'lucide-react';
import { useEnhancedAuth } from '../EnhancedAuthContext';
import { cohortService } from '../services/cohortService';
import { carrierService } from '../services/carrierService';
import { taskService } from '../services/taskService';
import type { Cohort, Carrier, CarrierTaskStatus, RiskLevel } from '../types/cohort';

const CoachDashboard: React.FC = () => {
  const { currentUser } = useEnhancedAuth();
  const [loading, setLoading] = useState(true);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [selectedCohortId, setSelectedCohortId] = useState<string | 'all'>('all');
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [submissions, setSubmissions] = useState<CarrierTaskStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (currentUser) {
      loadCoachData();
    }
  }, [currentUser]);

  const loadCoachData = async () => {
    try {
      setLoading(true);
      // In a real implementation, we'd filter cohorts by coach assignment
      // For now, get all active cohorts
      const allCohorts = await cohortService.getAllCohorts();
      setCohorts(allCohorts);

      // Load carriers and submissions
      await refreshView();
    } catch (error) {
      console.error('Failed to load coach data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshView = async () => {
    try {
      setLoading(true);
      // Load pending submissions
      const pendingSubmissions = await taskService.getAllSubmissions('submitted');
      setSubmissions(pendingSubmissions);

      // Load carriers (in a real app, filter by cohort if selectedCohortId !== 'all')
      const allCarriers = await carrierService.getCarriersByCohort(selectedCohortId === 'all' ? '' : selectedCohortId);
      setCarriers(allCarriers);
    } catch (error) {
      console.error('Refresh view error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'red': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/40';
      case 'yellow': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/40';
      case 'green': return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/40';
      default: return 'text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-16 h-16 border-4 border-signal-gold/20 border-t-signal-gold rounded-full mx-auto"></div>
          <p className="text-white font-bold uppercase tracking-widest">Loading Coach Environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-signal-gold" size={32} />
            Coach Dashboard
          </h1>
          <p className="text-slate-400 uppercase tracking-widest text-xs mt-2">
            Institutional Oversight & Verification Terminal
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search carriers or MC#..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-signal-gold/50 transition-colors w-64"
            />
          </div>
          <select 
            value={selectedCohortId}
            onChange={(e) => setSelectedCohortId(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-signal-gold/50 transition-colors"
          >
            <option value="all">All Cohorts</option>
            {cohorts.map(c => (
              <option key={c.cohortId} value={c.cohortId}>{c.cohortName}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & At-Risk */}
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <Users className="text-signal-gold mb-3" size={24} />
              <p className="text-3xl font-black">24</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Total Carriers</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <FileText className="text-signal-gold mb-3" size={24} />
              <p className="text-3xl font-black">12</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Pending Reviews</p>
            </div>
          </div>

          {/* At-Risk Carriers */}
          <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={18} />
                At-Risk Carriers
              </h2>
              <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-1 rounded-md font-black">4 URGENT</span>
            </div>
            <div className="divide-y divide-white/5">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black">
                      {i === 0 ? 'R' : 'Y'}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Carrier {i + 1} Logistics</p>
                      <p className="text-[10px] text-slate-500 uppercase">MC# 123456 • Week 4</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-signal-gold transition-colors" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Center/Right Column: Submission Queue & Carrier Table */}
        <div className="lg:col-span-2 space-y-8">
          {/* Submission Queue */}
          <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Activity className="text-signal-gold" size={18} />
                Unreviewed Submissions
              </h2>
              <button className="text-[10px] uppercase tracking-widest font-black text-signal-gold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                    <th className="px-6 py-4 font-black">Carrier</th>
                    <th className="px-6 py-4 font-black">Implementation Task</th>
                    <th className="px-6 py-4 font-black">Submitted</th>
                    <th className="px-6 py-4 font-black text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3, 4].map((_, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold">Fast Lane Transport</p>
                        <p className="text-[10px] text-slate-500">MC# 987654</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">DQ File - Driver 1</p>
                        <p className="text-[10px] text-slate-500 uppercase">Week 3 • Authority Protection</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar size={14} />
                          <span className="text-xs">2h ago</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-4 py-2 bg-signal-gold text-authority-blue text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-signal-gold/90 transition-colors">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Carrier Monitoring Table */}
          <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Users className="text-signal-gold" size={18} />
                Carrier Registry
              </h2>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors">
                  <Filter size={16} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                    <th className="px-6 py-4 font-black">Carrier</th>
                    <th className="px-6 py-4 font-black">Cohort Week</th>
                    <th className="px-6 py-4 font-black">Risk Level</th>
                    <th className="px-6 py-4 font-black">Last Activity</th>
                    <th className="px-6 py-4 font-black text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold">Carrier {i + 10} LLC</p>
                        <p className="text-[10px] text-slate-500">MC# 456{i}89</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium">Week {i + 1}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black border ${getRiskColor(i % 3 === 0 ? 'red' : i % 2 === 0 ? 'yellow' : 'green')}`}>
                          {i % 3 === 0 ? 'RED' : i % 2 === 0 ? 'YELLOW' : 'GREEN'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-400">Mar {i + 1}, 2026</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight size={16} className="text-slate-600 group-hover:text-signal-gold transition-colors ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CoachDashboard;
