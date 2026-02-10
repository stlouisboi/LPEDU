import React, { useState, useEffect, useMemo } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  Timestamp,
  orderBy,
  writeBatch
} from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';
import { 
  Search, 
  Trash2, 
  Download, 
  Mail, 
  User, 
  Loader2, 
  Copy,
  CheckCircle2,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Square,
  CheckSquare,
  AlertTriangle,
  X
} from 'lucide-react';

interface LeadMagnet {
  id: string;
  firstName: string;
  email: string;
  downloadedAt: Timestamp | any; 
  source: string;
}

const LeadsManager = () => {
  const [leads, setLeads] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const pageSize = 20;

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "leadMagnets"), orderBy("downloadedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadMagnet));
      setLeads(data);
      setLoading(false);
    }, (error) => {
      console.error("Leads fetch failed:", error);
      setLoading(false);
    });
    return unsub;
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => 
      (l.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.source || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleLeadSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleAllOnPage = () => {
    const newSelected = new Set(selectedIds);
    const allOnPageSelected = paginatedLeads.every(l => selectedIds.has(l.id));
    
    if (allOnPageSelected) {
      paginatedLeads.forEach(l => newSelected.delete(l.id));
    } else {
      paginatedLeads.forEach(l => newSelected.add(l.id));
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Permanently purge ${selectedIds.size} records from the institutional registry?`)) return;
    
    setIsDeleting(true);
    try {
      const batch = writeBatch(db);
      selectedIds.forEach(id => {
        const ref = doc(db, "leadMagnets", id);
        batch.delete(ref);
      });
      await batch.commit();
      setSelectedIds(new Set());
    } catch (err) {
      console.error("Bulk Delete Fault:", err);
      alert("System could not finalize bulk purge. Verification failed.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "leadMagnets", id));
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatLeadDate = (lead: LeadMagnet) => {
    if (!lead.downloadedAt) return "N/A";
    const date = typeof lead.downloadedAt.toDate === 'function' 
      ? lead.downloadedAt.toDate() 
      : new Date(lead.downloadedAt);
    return date.toLocaleString();
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Downloaded At', 'Source'];
    const rows = leads.map(l => [
      l.firstName,
      l.email,
      formatLeadDate(l),
      l.source
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `launchpath-leads-${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const getSafeDate = (lead: LeadMagnet) => {
      if (!lead.downloadedAt) return null;
      if (typeof lead.downloadedAt.toDate === 'function') return lead.downloadedAt.toDate();
      return new Date(lead.downloadedAt);
    };

    return {
      total: leads.length,
      thisWeek: leads.filter(l => {
        const d = getSafeDate(l);
        return d && d >= oneWeekAgo;
      }).length,
      thisMonth: leads.filter(l => {
        const d = getSafeDate(l);
        return d && d >= firstOfMonth;
      }).length
    };
  }, [leads]);

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-authority-blue" size={40} />
      <p className="text-text-muted font-bold uppercase tracking-widest text-xs">Accessing Lead Records...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-32 relative">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white uppercase tracking-tight">Lead Submissions</h1>
          <p className="text-text-muted mt-1 font-medium">Monitor high-intent potential carrier leads from risk maps and orientation tools.</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95 group"
        >
          <Download size={18} className="mr-2 text-authority-blue group-hover:translate-y-0.5 transition-transform" />
          Export CSV
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Leads', val: stats.total, icon: <Users size={24} />, color: 'bg-blue-50 text-blue-600' },
          { label: 'This Week', val: stats.thisWeek, icon: <Calendar size={24} />, color: 'bg-green-50 text-green-600' },
          { label: 'This Month', val: stats.thisMonth, icon: <Clock size={24} />, color: 'bg-amber-50 text-amber-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{s.label}</p>
                <p className="text-3xl font-black font-serif text-authority-blue dark:text-white">{s.val}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name, email or source channel..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-authority-blue outline-none transition-all font-medium"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* BULK ACTION BAR */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl bg-authority-blue text-white p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/10 flex items-center justify-between animate-in slide-in-from-bottom-10 duration-500">
           <div className="flex items-center space-x-6 pl-4">
             <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black text-signal-gold border border-white/20">
               {selectedIds.size}
             </div>
             <div>
               <p className="text-xs font-black uppercase tracking-widest">Leads Selected</p>
               <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Staged for deletion</p>
             </div>
           </div>
           <div className="flex items-center space-x-3">
             <button 
               onClick={() => setSelectedIds(new Set())}
               className="p-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
             >
               <X size={20} />
             </button>
             <button 
               onClick={handleBulkDelete}
               disabled={isDeleting}
               className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center shadow-lg transition-all active:scale-95 disabled:opacity-50"
             >
               {isDeleting ? <Loader2 size={14} className="animate-spin mr-2" /> : <Trash2 size={14} className="mr-2" />}
               Mass Purge Records
             </button>
           </div>
        </div>
      )}

      {/* DATA TABLE (Desktop) */}
      <div className="hidden md:block bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light bg-slate-50/50">
                <th className="px-8 py-5 w-12">
                   <button 
                     onClick={toggleAllOnPage}
                     className="p-1 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                   >
                     {paginatedLeads.every(l => selectedIds.has(l.id)) && paginatedLeads.length > 0 ? (
                       <CheckSquare size={20} className="text-authority-blue" />
                     ) : (
                       <Square size={20} className="text-slate-300" />
                     )}
                   </button>
                </th>
                <th className="px-4 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Carrier Lead</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Time Captured</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Inbound Channel</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {paginatedLeads.map((lead) => (
                <tr key={lead.id} className={`group hover:bg-slate-50 dark:hover:bg-gray-800/20 transition-colors ${selectedIds.has(lead.id) ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleLeadSelection(lead.id)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                    >
                      {selectedIds.has(lead.id) ? (
                        <CheckSquare size={20} className="text-authority-blue" />
                      ) : (
                        <Square size={20} className="text-slate-300" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-authority-blue text-white rounded-xl flex items-center justify-center font-bold">
                        {lead.firstName?.[0] || 'C'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-primary dark:text-white">{lead.firstName}</h4>
                        <div className="flex items-center group/copy cursor-pointer" onClick={() => copyToClipboard(lead.email, lead.id)}>
                          <span className="text-[10px] text-text-muted font-medium hover:text-authority-blue transition-colors">{lead.email}</span>
                          {copiedId === lead.id ? (
                            <CheckCircle2 size={10} className="ml-1 text-green-500" />
                          ) : (
                            <Copy size={10} className="ml-1 text-text-muted opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-text-primary dark:text-white">
                      {formatLeadDate(lead)}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest text-text-muted">
                      {lead.source?.replace(/-/g, ' ') || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                      title="Purge Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-text-muted italic text-sm">
                    No lead records matched your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE LIST VIEW */}
      <div className="md:hidden space-y-4">
        {paginatedLeads.map((lead) => (
          <div key={lead.id} className={`bg-white dark:bg-surface-dark p-6 rounded-[2rem] border transition-all ${selectedIds.has(lead.id) ? 'border-authority-blue bg-blue-50/30' : 'border-border-light shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => toggleLeadSelection(lead.id)}
                  className="p-1"
                >
                  {selectedIds.has(lead.id) ? (
                    <CheckSquare size={24} className="text-authority-blue" />
                  ) : (
                    <Square size={24} className="text-slate-300" />
                  )}
                </button>
                <div className="w-10 h-10 bg-authority-blue text-white rounded-xl flex items-center justify-center font-bold shrink-0">
                  {lead.firstName?.[0] || 'C'}
                </div>
                <div>
                  <h4 className="font-bold text-text-primary dark:text-white">{lead.firstName}</h4>
                  <p className="text-xs text-text-muted" onClick={() => copyToClipboard(lead.email, lead.id)}>{lead.email}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(lead.id)} className="p-2 text-red-400"><Trash2 size={18} /></button>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-border-dark">
              <span className="text-[10px] font-black uppercase text-text-muted">{lead.source?.replace(/-/g, ' ')}</span>
              <span className="text-[10px] font-bold text-text-muted">{formatLeadDate(lead).split(',')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 pt-8">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-border-light disabled:opacity-30 transition-all hover:bg-slate-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-border-light disabled:opacity-30 transition-all hover:bg-slate-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;