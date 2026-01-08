import React, { useState, useEffect, useMemo } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  Timestamp,
  orderBy
} from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';
import { 
  Search, 
  Trash2, 
  Download, 
  Mail, 
  User, 
  X, 
  Loader2, 
  Filter,
  Copy,
  CheckCircle2,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowUpDown
} from 'lucide-react';

interface LeadMagnet {
  id: string;
  firstName: string;
  email: string;
  downloadedAt: Timestamp;
  source: string;
}

const LeadsManager = () => {
  const [leads, setLeads] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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

  const stats = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: leads.length,
      thisWeek: leads.filter(l => l.downloadedAt.toDate() >= oneWeekAgo).length,
      thisMonth: leads.filter(l => l.downloadedAt.toDate() >= firstOfMonth).length
    };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => 
      l.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.source?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "leadMagnets", id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Downloaded At', 'Source'];
    const rows = leads.map(l => [
      l.firstName,
      l.email,
      l.downloadedAt.toDate().toLocaleString(),
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

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-authority-blue" size={40} />
      <p className="text-text-muted font-bold uppercase tracking-widest text-xs">Accessing Lead Records...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Lead Submissions</h1>
          <p className="text-text-muted mt-1">Monitor high-intent potential carrier leads.</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95 group"
        >
          <Download size={18} className="mr-2 text-authority-blue group-hover:translate-y-0.5 transition-transform" />
          Export to CSV
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

      {/* SEARCH & FILTERS */}
      <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark flex flex-col md:flex-row gap-4 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name, email or source..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-authority-blue outline-none transition-all"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* DATA TABLE (Desktop) */}
      <div className="hidden md:block bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Carrier Contact</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Downloaded At</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Source Channel</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {paginatedLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-slate-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-authority-blue/5 text-authority-blue rounded-xl flex items-center justify-center font-bold">
                        {lead.firstName?.[0] || 'L'}
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
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text-primary dark:text-white">
                        {lead.downloadedAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">
                        {lead.downloadedAt.toDate().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest text-text-muted">
                      {lead.source.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-text-muted italic text-sm">
                    No matching leads found.
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
          <div key={lead.id} className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-authority-blue text-white rounded-xl flex items-center justify-center font-bold">
                  {lead.firstName?.[0]}
                </div>
                <div>
                  <h4 className="font-bold text-text-primary dark:text-white">{lead.firstName}</h4>
                  <p className="text-xs text-text-muted" onClick={() => copyToClipboard(lead.email, lead.id)}>{lead.email}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(lead.id)} className="p-2 text-red-400"><Trash2 size={18} /></button>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-border-dark">
              <span className="text-[10px] font-black uppercase text-text-muted">{lead.source.replace(/-/g, ' ')}</span>
              <span className="text-[10px] font-bold text-text-muted">{lead.downloadedAt.toDate().toLocaleDateString()}</span>
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