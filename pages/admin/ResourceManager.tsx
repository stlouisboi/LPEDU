
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from '../../firebase';
// Added ExternalLink to imports
import { 
  Plus, 
  Download, 
  FileText, 
  Trash2, 
  Edit, 
  Search, 
  Loader2, 
  Upload, 
  X,
  CheckCircle,
  Eye,
  Mail,
  HardDrive,
  Save,
  Globe,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Resource } from '../../types';

const ResourceManager = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<boolean>(false);

  const [formData, setFormData] = useState<Partial<Resource>>({
    name: '',
    description: '',
    category: 'Checklists',
    requiresEmail: false,
    url: '',
    type: 'PDF',
    size: '0 KB',
    downloadCount: 0
  });

  useEffect(() => {
    if (!isFirebaseConfigured || !db || !(db as any).app) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
      setResources(data);
      setLoading(false);
      setApiError(false);
    }, (error: any) => {
      console.error("LaunchPath Admin: Resource sync failed.", error);
      if (error.code === 'permission-denied') {
        setApiError(true);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!storage) return;
    setSaving(true);
    try {
      const storageRef = ref(storage, `resources/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      const extension = file.name.split('.').pop()?.toUpperCase();
      const type = (['PDF', 'XLSX', 'DOCX'].includes(extension || '') ? extension : 'PDF') as any;
      const size = (file.size / 1024).toFixed(1) + ' KB';
      
      setFormData(prev => ({ ...prev, url, type, size }));
    } catch (err) {
      alert("Upload failed. Verify Storage is enabled in your Firebase console.");
    } finally {
      setSaving(false);
    }
  };

  const handleDriveLink = (link: string) => {
    const driveIdMatch = link.match(/[-\w]{25,}/);
    if (driveIdMatch) {
      const driveId = driveIdMatch[0];
      setFormData(prev => ({ 
        ...prev, 
        url: link, 
        driveId, 
        type: 'External',
        size: 'Cloud'
      }));
    } else {
      setFormData(prev => ({ ...prev, url: link, type: 'External', size: 'Link' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;
    
    setSaving(true);
    try {
      const data = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await updateDoc(doc(db, "resources", editingId), data);
      } else {
        await addDoc(collection(db, "resources"), data);
      }
      
      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', description: '', category: 'Checklists', requiresEmail: false, url: '', type: 'PDF', size: '0 KB', downloadCount: 0 });
    } catch (err) {
      alert("Failed to save. Check your Firestore API status.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this resource?")) return;
    try {
      await deleteDoc(doc(db, "resources", id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filteredResources = resources.filter(res => 
    res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-authority-blue" size={40} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Resource Management</h1>
          <p className="text-text-muted mt-1">Manage all downloadable assets and compliance checklists.</p>
        </div>
        <button 
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          className="bg-authority-blue text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Add Resource
        </button>
      </div>

      {apiError && (
        <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-3xl border border-red-200 dark:border-red-900/50 flex items-center justify-between shadow-sm">
           <div className="flex items-center space-x-4">
             <AlertCircle className="text-red-600" size={24} />
             <div>
               <p className="font-bold text-red-800 dark:text-red-400">Cloud Firestore API Disabled</p>
               <p className="text-xs text-red-700 dark:text-red-300">You must enable the Firestore API in your Google Cloud Console for project lpedu-d9bb2.</p>
             </div>
           </div>
           <a href="https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=lpedu-d9bb2" target="_blank" rel="noreferrer" className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-all flex items-center shadow-md">
             Enable Now <ExternalLink size={12} className="ml-1.5" />
           </a>
        </div>
      )}

      {/* Editor Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-border-light dark:border-border-dark max-w-2xl w-full relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 p-3 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-all">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold font-serif mb-8 text-authority-blue dark:text-white">{editingId ? 'Edit Resource' : 'New Resource'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Resource Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                    placeholder="e.g. DQ File Checklist"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                  >
                    {['Checklists', 'Templates', 'Worksheets', 'Guides'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Short Description</label>
                <textarea 
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                  placeholder="What is this resource for?"
                />
              </div>

              <div className="p-6 bg-slate-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-border-light space-y-4 shadow-inner">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">File Source</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-authority-blue dark:text-steel-blue uppercase tracking-widest">Option A: Direct Upload</p>
                    <div className="relative">
                      <input 
                        type="file"
                        className="hidden"
                        id="resource-file"
                        onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      />
                      <label 
                        htmlFor="resource-file"
                        className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700 transition-all text-sm font-bold shadow-sm"
                      >
                        <Upload size={18} className="mr-2" /> Select File
                      </label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-authority-blue dark:text-steel-blue uppercase tracking-widest">Option B: Drive Link</p>
                    <div className="relative">
                      <HardDrive className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                      <input 
                        type="text"
                        placeholder="Paste Google Drive link"
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none text-xs"
                        onChange={e => handleDriveLink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {formData.url && (
                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-900/30 animate-in slide-in-from-top-2">
                    <CheckCircle size={16} />
                    <span className="text-[10px] font-bold uppercase truncate max-w-xs">{formData.url}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-green-200 dark:bg-green-800 rounded uppercase">{formData.type} ({formData.size})</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 bg-slate-50 dark:bg-gray-800 p-4 rounded-xl border border-border-light dark:border-border-dark">
                 <input 
                  type="checkbox"
                  id="email-gate"
                  checked={formData.requiresEmail}
                  onChange={e => setFormData({ ...formData, requiresEmail: e.target.checked })}
                  className="w-5 h-5 accent-authority-blue cursor-pointer"
                 />
                 <label htmlFor="email-gate" className="text-xs font-bold uppercase tracking-widest cursor-pointer text-text-primary dark:text-white">Require Email to Download (Email Gate)</label>
              </div>

              <button 
                type="submit"
                disabled={saving}
                className="w-full bg-authority-blue text-white py-4 rounded-xl font-bold flex items-center justify-center shadow-xl hover:bg-steel-blue transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                {editingId ? 'Update Resource' : 'Save Resource'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark flex items-center mb-8 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text"
            placeholder="Search by name or category..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none transition-all focus:ring-2 focus:ring-authority-blue"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Asset Info</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Category</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Gate</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Downloads</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredResources.map(res => (
                <tr key={res.id} className="group hover:bg-slate-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-slate-100 dark:bg-gray-700 rounded-lg text-authority-blue dark:text-steel-blue">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-text-primary dark:text-white">{res.name}</h4>
                        <div className="flex items-center space-x-2 text-[10px] text-text-muted font-mono uppercase">
                           <span className="font-bold">{res.type}</span>
                           <span>•</span>
                           <span>{res.size}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-gray-800 rounded-full text-[10px] font-bold text-steel-blue uppercase border border-slate-200 dark:border-slate-700">
                      {res.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {res.requiresEmail ? (
                      <div className="flex items-center text-amber-600 text-[10px] font-black uppercase tracking-widest">
                        <Mail size={12} className="mr-1.5" /> Gated
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600 text-[10px] font-black uppercase tracking-widest">
                        <Globe size={12} className="mr-1.5" /> Public
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 font-mono text-xs">
                       <Download size={12} className="text-text-muted" />
                       <span className="font-bold text-text-primary dark:text-white">{res.downloadCount || 0}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                       <a href={res.url} target="_blank" rel="noreferrer" className="p-2 text-text-muted hover:text-authority-blue transition-colors">
                         <Eye size={16} />
                       </a>
                       <button onClick={() => { setFormData(res); setEditingId(res.id); setIsAdding(true); }} className="p-2 text-steel-blue hover:text-authority-blue transition-colors">
                         <Edit size={16} />
                       </button>
                       <button onClick={() => handleDelete(res.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredResources.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-text-muted italic text-sm">
                    No resources found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceManager;
