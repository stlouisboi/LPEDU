
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';
import { 
  Search, 
  Trash2, 
  Download, 
  Mail, 
  User, 
  Eye, 
  X, 
  Loader2, 
  Filter
} from 'lucide-react';

interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  message: string;
  type: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: any;
}

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSub, setSelectedSub] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  useEffect(() => {
    if (!isFirebaseConfigured || !db || !(db as any).app) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "formSubmissions"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
      const sorted = data.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      setSubmissions(sorted);
      setLoading(false);
    }, (error) => {
      console.warn("LaunchPath: Submissions fetch failed.", error);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleStatusUpdate = async (id: string, status: ContactSubmission['status']) => {
    if (!db || !(db as any).app) return;
    try {
      await updateDoc(doc(db, "formSubmissions", id), { status });
      if (selectedSub?.id === id) {
        setSelectedSub(prev => prev ? {...prev, status} : null);
      }
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    try {
      await deleteDoc(doc(db, "formSubmissions", id));
      setSelectedSub(null);
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      (sub.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (sub.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || sub.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-authority-blue" size={40} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Form Submissions</h1>
          <p className="text-text-muted mt-1">Manage all inquiries from the contact and support pages.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-4 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-text-muted" />
          <div className="flex bg-slate-100 dark:bg-gray-800 p-1 rounded-xl">
            {(['all', 'unread', 'read', 'replied'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-white dark:bg-gray-700 shadow-sm text-authority-blue' : 'text-text-muted'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Contact Info</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Message Preview</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredSubmissions.map((sub) => (
                <tr 
                  key={sub.id} 
                  className={`group hover:bg-slate-50 transition-colors cursor-pointer ${sub.status === 'unread' ? 'bg-blue-50/30' : ''}`}
                  onClick={() => { setSelectedSub(sub); if (sub.status === 'unread') handleStatusUpdate(sub.id, 'read'); }}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                       <div className={`p-2 rounded-full ${sub.status === 'unread' ? 'bg-authority-blue text-white' : 'bg-slate-100 text-text-muted'}`}>
                          <User size={16} />
                       </div>
                       <div>
                          <h4 className={`text-sm font-bold ${sub.status === 'unread' ? 'text-authority-blue' : ''}`}>
                            {sub.fullName || 'Anonymous User'}
                          </h4>
                          <p className="text-[10px] text-text-muted">{sub.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-text-muted line-clamp-1 max-w-xs">{sub.message}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                      sub.status === 'unread' ? 'bg-blue-100 text-blue-700' : 
                      sub.status === 'read' ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs text-text-muted font-mono">
                    {sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString() : new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                       <button className="p-2 text-text-muted hover:text-authority-blue"><Eye size={16} /></button>
                       <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }} 
                        className="p-2 text-red-400 hover:text-red-600"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSub && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3rem] shadow-2xl border border-border-light dark:border-border-dark max-w-2xl w-full relative">
            <button 
              onClick={() => setSelectedSub(null)}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center space-x-4 mb-8">
               <div className="w-16 h-16 bg-authority-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <User size={32} />
               </div>
               <div>
                  <h3 className="text-3xl font-bold font-serif leading-none">{selectedSub.fullName || 'Anonymous User'}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-text-muted">
                     <span className="flex items-center"><Mail size={14} className="mr-1.5" /> {selectedSub.email}</span>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl border border-border-light">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">Message Content ({selectedSub.type})</p>
                  <p className="text-lg leading-relaxed">{selectedSub.message}</p>
               </div>

               <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href={`mailto:${selectedSub.email}?subject=Reply to your LaunchPath inquiry`}
                    onClick={() => handleStatusUpdate(selectedSub.id, 'replied')}
                    className="flex-grow bg-authority-blue text-white py-4 rounded-xl font-bold flex items-center justify-center shadow-lg hover:bg-steel-blue transition-all"
                  >
                    <Mail size={18} className="mr-2" /> Quick Reply via Email
                  </a>
                  <button 
                    onClick={() => handleDelete(selectedSub.id)}
                    className="p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;
