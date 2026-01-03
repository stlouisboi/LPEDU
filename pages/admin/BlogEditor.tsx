
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  collection, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { db, storage, isFirebaseConfigured } from '../../firebase';
import ReactQuill from 'react-quill';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Globe,
  Tag,
  Eye
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../../types';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Compliance',
    excerpt: '',
    content: '',
    status: 'draft',
    image: '',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    author: 'Safety Specialist',
    publishedAt: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      if (!db) return;
      try {
        const snap = await getDoc(doc(db, "blogPosts", id));
        if (snap.exists()) {
          setFormData({ id: snap.id, ...snap.data() } as BlogPost);
        }
      } catch (err) {
        console.error("Fetch Blog Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleTitleChange = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, title: val, slug: id ? prev.slug : slug }));
  };

  const handleImageUpload = async (file: File) => {
    if (!storage) return;
    setSaving(true);
    try {
      const storageRef = ref(storage, `blogImages/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (statusOverride?: 'draft' | 'published') => {
    if (!db) return;
    if (!formData.title || !formData.slug) {
      alert("Title and Slug are required.");
      return;
    }
    
    setSaving(true);
    const finalData = {
      ...formData,
      status: statusOverride || formData.status,
      updatedAt: new Date().toISOString()
    };

    try {
      if (id) {
        await setDoc(doc(db, "blogPosts", id), finalData);
      } else {
        await addDoc(collection(db, "blogPosts"), finalData);
      }
      navigate('/admin/blog');
    } catch (err) {
      console.error("Save Error:", err);
      alert("Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-authority-blue" size={40} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/admin/blog')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-serif text-authority-blue dark:text-white">
              {id ? 'Edit Blog Post' : 'Create New Post'}
            </h1>
            <p className="text-xs text-text-muted font-bold tracking-widest uppercase mt-1">
              Knowledge Base Editor
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-6 py-2.5 bg-slate-100 dark:bg-gray-800 text-text-primary dark:text-white rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex items-center"
          >
            {saving ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Save size={14} className="mr-2" />} 
            Save Draft
          </button>
          <button 
            disabled={saving}
            onClick={() => handleSave('published')}
            className="px-6 py-2.5 bg-authority-blue text-white rounded-xl text-xs font-bold shadow-lg hover:bg-steel-blue transition-all flex items-center"
          >
            <CheckCircle size={14} className="mr-2" /> Publish Live
          </button>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="flex border-b border-border-light dark:border-border-dark mb-8">
        <button 
          onClick={() => setActiveTab('content')}
          className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
            activeTab === 'content' ? 'text-authority-blue' : 'text-text-muted opacity-50'
          }`}
        >
          Post Content
          {activeTab === 'content' && <div className="absolute bottom-0 left-0 w-full h-1 bg-authority-blue"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('seo')}
          className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
            activeTab === 'seo' ? 'text-authority-blue' : 'text-text-muted opacity-50'
          }`}
        >
          SEO & Meta
          {activeTab === 'seo' && <div className="absolute bottom-0 left-0 w-full h-1 bg-authority-blue"></div>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor Panel */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'content' ? (
            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark space-y-6 shadow-sm">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Article Title</label>
                <input 
                  value={formData.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="e.g. 5 Critical Fail Points in a New Entrant Audit"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue text-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">URL Slug</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                    <input 
                      value={formData.slug}
                      onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as BlogCategory })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none text-xs font-bold"
                  >
                    {['Compliance', 'Audit', 'Insurance', 'HOS', 'ELD', 'Maintenance', 'Authority'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Excerpt (Lead Summary)</label>
                <textarea 
                  rows={3}
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary for list views and social sharing..."
                  className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Main Body Content</label>
                <ReactQuill 
                  theme="snow"
                  value={formData.content}
                  onChange={val => setFormData({ ...formData, content: val })}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark space-y-6 shadow-sm animate-in fade-in duration-300">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">SEO Browser Title</label>
                <input 
                  value={formData.seoTitle}
                  onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Leave empty to use main title"
                  className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Meta Description</label>
                <textarea 
                  rows={4}
                  value={formData.seoDescription}
                  onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Search engine summary (approx 160 characters)"
                  className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                />
              </div>
              <div className="p-6 bg-slate-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-border-light">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">Google Search Preview</h4>
                 <p className="text-[#1a0dab] text-lg font-medium leading-none mb-1 truncate">{formData.seoTitle || formData.title || 'Post Title'}</p>
                 <p className="text-[#006621] text-sm mb-2">launchpath.com/blog/{formData.slug || 'slug'}</p>
                 <p className="text-[#545454] text-xs line-clamp-2">{formData.seoDescription || formData.excerpt || 'Article summary description goes here...'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Settings Panel */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-steel-blue border-b pb-4">Publishing Options</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-text-muted">Current Status:</span>
                <span className={`font-black uppercase tracking-tighter ${formData.status === 'published' ? 'text-green-600' : 'text-amber-500'}`}>
                  {formData.status}
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Publish Date</label>
                <input 
                  type="date"
                  value={formData.publishedAt}
                  onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Author Name</label>
                <input 
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-xs"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm space-y-6">
             <h3 className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-steel-blue border-b pb-4">Featured Image</h3>
             <div className="aspect-video bg-slate-50 dark:bg-gray-800 rounded-xl border border-dashed border-border-light flex flex-col items-center justify-center relative overflow-hidden group">
               {formData.image ? (
                 <>
                   <img src={formData.image} className="w-full h-full object-cover" alt="" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-3 bg-white rounded-full text-red-500" onClick={() => setFormData({ ...formData, image: '' })}>
                        <ImageIcon size={18} />
                      </button>
                   </div>
                 </>
               ) : (
                 <div className="text-center p-4">
                   <ImageIcon className="mx-auto mb-2 text-text-muted opacity-30" size={32} />
                   <p className="text-[10px] font-bold text-text-muted">Click below to upload</p>
                 </div>
               )}
             </div>
             <input 
              type="file" 
              accept="image/*"
              onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-authority-blue file:text-white"
            />
          </div>

          <div className="bg-authority-blue/5 border border-authority-blue/10 p-6 rounded-3xl space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue flex items-center">
              <Eye size={14} className="mr-2" /> Live Preview Tip
            </h4>
            <p className="text-[11px] leading-relaxed text-text-muted">
              Safety audits rely on precision. Ensure your headings (H2, H3) follow a logical structure and all regulatory citations are cross-linked to verified FMCSA sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
