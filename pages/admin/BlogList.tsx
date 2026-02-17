
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Loader2, 
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Check,
  X,
  Type
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../../types';

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [editingSeoId, setEditingSeoId] = useState<string | null>(null);
  const [tempSeoTitle, setTempSeoTitle] = useState('');
  const [updatingSeo, setUpdatingSeo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirebaseConfigured || !db || !(db as any).app) {
      setLoading(false);
      return;
    }

    const blogQuery = query(collection(db, "blogPosts"), orderBy("publishedAt", "desc"));
    
    const unsubscribe = onSnapshot(blogQuery, (snapshot) => {
      const blogData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setBlogs(blogData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching blogs:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "blogPosts", id));
    } catch (err) {
      alert("Failed to delete blog post.");
    }
  };

  const handleSeoEditStart = (blog: BlogPost) => {
    setEditingSeoId(blog.id);
    setTempSeoTitle(blog.seoTitle || blog.title);
  };

  const handleSeoUpdate = async (id: string) => {
    if (!db) return;
    setUpdatingSeo(true);
    try {
      await updateDoc(doc(db, "blogPosts", id), {
        seoTitle: tempSeoTitle,
        updatedAt: new Date().toISOString()
      });
      setEditingSeoId(null);
    } catch (err) {
      console.error("Failed to update SEO title:", err);
      alert("Update failed. Check your connection.");
    } finally {
      setUpdatingSeo(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
        <p className="text-text-muted font-bold uppercase tracking-widest text-xs">Loading Knowledge Base...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Blog Management</h1>
          <p className="text-text-muted mt-1">Manage articles, compliance guides, and safety bulletins.</p>
        </div>
        <Link 
          to="/admin/blog/new" 
          className="bg-authority-blue text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:shadow-xl hover:bg-steel-blue transition-all"
        >
          <Plus size={18} className="mr-2" /> Create New Post
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search by title..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-authority-blue outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                statusFilter === status 
                ? 'bg-authority-blue text-white border-authority-blue' 
                : 'bg-white dark:bg-gray-800 text-text-muted border-border-light dark:border-border-dark'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">Post Info</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">SEO Title</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">Category</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                <tr key={blog.id} className="group hover:bg-slate-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        {blog.image ? (
                          <img src={blog.image} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-muted">
                            <Clock size={16} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm truncate max-w-xs">{blog.title}</h4>
                        <p className="text-[10px] text-text-muted font-mono truncate max-w-xs">/{blog.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {editingSeoId === blog.id ? (
                      <div className="flex items-center space-x-2 animate-in fade-in duration-200">
                        <input 
                          autoFocus
                          value={tempSeoTitle}
                          onChange={(e) => setTempSeoTitle(e.target.value)}
                          className="flex-grow min-w-[200px] px-3 py-1.5 text-xs bg-white dark:bg-gray-700 border border-authority-blue rounded-lg outline-none shadow-sm"
                          placeholder="Enter SEO title..."
                        />
                        <button 
                          onClick={() => handleSeoUpdate(blog.id)}
                          disabled={updatingSeo}
                          className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                          {updatingSeo ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        </button>
                        <button 
                          onClick={() => setEditingSeoId(null)}
                          disabled={updatingSeo}
                          className="p-1.5 bg-gray-100 dark:bg-gray-600 text-text-muted rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="flex items-center justify-between group/seo cursor-pointer max-w-[250px]"
                        onClick={() => handleSeoEditStart(blog)}
                      >
                        <span className={`text-xs font-medium truncate ${blog.seoTitle ? 'text-authority-blue dark:text-steel-blue' : 'text-text-muted italic'}`}>
                          {blog.seoTitle || "Using default title..."}
                        </span>
                        <Type size={12} className="text-text-muted opacity-0 group-hover/seo:opacity-100 transition-opacity ml-2 shrink-0" />
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-gray-800 text-[10px] font-bold text-steel-blue dark:text-steel-blue rounded-full">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      {blog.status === 'published' ? (
                        <div className="flex items-center text-green-600 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle2 size={12} className="mr-1.5" /> Published
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-500 text-[10px] font-black uppercase tracking-widest">
                          <Clock size={12} className="mr-1.5" /> Draft
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-text-muted font-medium">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                        className="p-2 text-steel-blue hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="Edit Post"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-text-muted">
                    <div className="flex flex-col items-center">
                      <AlertCircle size={40} className="mb-4 opacity-20" />
                      <p className="font-bold">No blog posts found</p>
                      <p className="text-xs">Start by creating your first safety bulletin.</p>
                    </div>
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

export default BlogList;
