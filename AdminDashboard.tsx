
import React, { useState } from 'react';
import { 
  Settings, 
  PenTool, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  BarChart3,
  Users,
  MessageSquare,
  Mail,
  Quote,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { useApp } from '../App';
import { useAuth } from '../AuthContext';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth, db } from '../firebase';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { BlogPost, Testimonial, SiteSettings } from '../types';

const AdminDashboard = () => {
  const { settings, updateSettings, blogs, addBlog, updateBlog, formSubmissions, testimonials, addTestimonial, deleteTestimonial } = useApp();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'settings' | 'blogs' | 'analytics' | 'submissions' | 'testimonials'>('settings');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Blog Form State
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: '',
    category: 'Authority',
    excerpt: '',
    content: '',
    author: 'Admin',
    image: 'https://picsum.photos/seed/new/800/400'
  });

  // Testimonial Form State
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    author: '',
    role: '',
    content: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    setAuthLoading(true);
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError('Invalid credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary-dark px-4">
        <form onSubmit={handleLogin} className="max-w-md w-full bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-2xl border border-border-light dark:border-border-dark">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-authority-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Settings className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold font-serif">Admin Portal</h1>
            <p className="text-text-muted mt-2">Access the LaunchPath control center</p>
          </div>
          {authError && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold">{authError}</div>}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email</label>
              <input 
                name="email"
                type="email" 
                required
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Password</label>
              <input 
                name="password"
                type="password" 
                required
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none transition-all" 
              />
            </div>
            <button 
              type="submit"
              disabled={authLoading}
              className="w-full bg-authority-blue text-white font-bold py-4 rounded-2xl hover:bg-steel-blue transition-all shadow-xl disabled:opacity-50 flex items-center justify-center"
            >
              {authLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updated: SiteSettings = {
      ...settings,
      siteName: formData.get('siteName') as string,
      heroTitle: formData.get('heroTitle') as string,
      heroSubtitle: formData.get('heroSubtitle') as string,
      contact: {
        ...settings.contact,
        email: formData.get('contactEmail') as string
      }
    };
    
    if (db) {
      await setDoc(doc(db, "settings", "general"), updated);
    }
    updateSettings(updated);
    alert('Settings saved successfully!');
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const blog: BlogPost = {
      ...newBlog as BlogPost,
      id: Date.now().toString(),
      slug: newBlog.title?.toLowerCase().replace(/\s+/g, '-') || 'new-post',
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'published',
      tags: []
    };
    addBlog(blog);
    setIsAddingBlog(false);
    setNewBlog({
      title: '',
      category: 'Authority',
      excerpt: '',
      content: '',
      author: 'Admin',
      image: 'https://picsum.photos/seed/new/800/400'
    });
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const t: Testimonial = {
      ...newTestimonial as Testimonial,
      id: Date.now().toString()
    };
    addTestimonial(t);
    setIsAddingTestimonial(false);
    setNewTestimonial({ author: '', role: '', content: '' });
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-surface-dark border-r border-border-light dark:border-border-dark hidden lg:block sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-8">Management</h2>
          <nav className="space-y-2">
            {[
              { id: 'settings', name: 'Site Settings', icon: <Settings className="w-5 h-5" /> },
              { id: 'blogs', name: 'Blog Content', icon: <PenTool className="w-5 h-5" /> },
              { id: 'submissions', name: 'Form Submissions', icon: <Mail className="w-5 h-5" /> },
              { id: 'testimonials', name: 'Testimonials', icon: <Quote className="w-5 h-5" /> },
              { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all relative overflow-hidden group ${
                  activeTab === tab.id 
                  ? 'bg-authority-blue text-white shadow-lg' 
                  : 'text-text-muted hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-signal-gold"></div>
                )}
                <div className={`${activeTab === tab.id ? 'text-white' : 'text-steel-blue'}`}>
                  {tab.icon}
                </div>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">
                {activeTab === 'settings' && 'Global Site Configuration'}
                {activeTab === 'blogs' && 'Manage Blog Content'}
                {activeTab === 'analytics' && 'Traffic & Performance'}
                {activeTab === 'submissions' && 'Recent Inquiries & Leads'}
                {activeTab === 'testimonials' && 'Student Testimonials'}
              </h1>
              <p className="text-text-muted">Control your brand and content from one place.</p>
            </div>
            {activeTab === 'blogs' && !isAddingBlog && (
              <button 
                onClick={() => setIsAddingBlog(true)}
                className="bg-authority-blue text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:shadow-none transition-all"
              >
                <Plus className="w-5 h-5 mr-2" /> New Post
              </button>
            )}
            {activeTab === 'testimonials' && !isAddingTestimonial && (
              <button 
                onClick={() => setIsAddingTestimonial(true)}
                className="bg-authority-blue text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:shadow-none transition-all"
              >
                <Plus className="w-5 h-5 mr-2" /> Add Testimonial
              </button>
            )}
          </div>

          {activeTab === 'submissions' && (
            <div className="bg-white dark:bg-surface-dark rounded-[2rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
               {formSubmissions.length > 0 ? (
                 <table className="w-full text-left">
                   <thead>
                     <tr className="border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-gray-800/50">
                       <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Type</th>
                       <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Contact</th>
                       <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Date</th>
                       <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border-light dark:divide-border-dark">
                     {formSubmissions.map((sub, i) => (
                       <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                         <td className="px-8 py-6">
                           <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                             sub.type === 'Enrollment' ? 'bg-green-100 text-green-700' : 
                             sub.type === 'Resource Lead' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                           }`}>
                             {sub.type}
                           </span>
                         </td>
                         <td className="px-8 py-6">
                           <div className="font-bold">{sub.name || `${sub.firstName} ${sub.lastName}`}</div>
                           <div className="text-xs text-text-muted">{sub.email}</div>
                         </td>
                         <td className="px-8 py-6 text-sm text-text-muted">
                           {new Date(sub.date).toLocaleDateString()}
                         </td>
                         <td className="px-8 py-6 text-right">
                           <button className="text-authority-blue font-bold text-xs hover:underline">View Detail</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               ) : (
                 <div className="p-20 text-center">
                    <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-6 opacity-30" />
                    <p className="text-text-muted">No form submissions recorded yet.</p>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-3">Site Name</label>
                  <input name="siteName" defaultValue={settings.siteName} className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-3">Hero Headline</label>
                  <input name="heroTitle" defaultValue={settings.heroTitle} className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-3">Hero Subtitle</label>
                  <textarea name="heroSubtitle" rows={4} defaultValue={settings.heroSubtitle} className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-3">Contact Email</label>
                  <input name="contactEmail" defaultValue={settings.contact.email} className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-3">Public Phone</label>
                  <input name="phoneNumber" defaultValue={settings.contact.phone} className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" />
                </div>
              </div>
              <div className="mt-12 flex justify-end">
                <button type="submit" className="bg-authority-blue text-white px-10 py-4 rounded-xl font-bold flex items-center">
                  <Save className="w-5 h-5 mr-2" /> Save Global Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-8">
              {isAddingBlog ? (
                <form onSubmit={handleCreateBlog} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-3">Title</label>
                      <input 
                        value={newBlog.title} 
                        onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                        className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3">Category</label>
                      <select 
                        value={newBlog.category}
                        onChange={e => setNewBlog({...newBlog, category: e.target.value as any})}
                        className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none"
                      >
                        <option>Authority</option>
                        <option>Audit</option>
                        <option>Insurance</option>
                        <option>HOS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3">Excerpt</label>
                      <textarea 
                        value={newBlog.excerpt}
                        onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})}
                        className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3">Full Content (HTML allowed)</label>
                      <textarea 
                        value={newBlog.content}
                        onChange={e => setNewBlog({...newBlog, content: e.target.value})}
                        rows={10} 
                        className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none font-mono text-sm" 
                      />
                    </div>
                  </div>
                  <div className="mt-12 flex justify-end space-x-4">
                    <button type="button" onClick={() => setIsAddingBlog(false)} className="px-6 py-3 font-bold text-text-muted">Cancel</button>
                    <button type="submit" className="bg-authority-blue text-white px-10 py-3 rounded-xl font-bold">Publish Post</button>
                  </div>
                </form>
              ) : (
                <div className="bg-white dark:bg-surface-dark rounded-[2rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-gray-800/50">
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Article</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Category</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Date</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light dark:divide-border-dark">
                      {blogs.map(blog => (
                        <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <img src={blog.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                              <div className="font-bold">{blog.title}</div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-2 py-1 bg-steel-blue/10 text-steel-blue text-xs font-bold rounded-full">{blog.category}</span>
                          </td>
                          <td className="px-8 py-6 text-sm text-text-muted">{blog.publishedAt}</td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end space-x-2">
                              <button className="p-2 hover:text-authority-blue"><Eye className="w-4 h-4" /></button>
                              <button className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              {isAddingTestimonial ? (
                <form onSubmit={handleCreateTestimonial} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-3">Author Name</label>
                      <input 
                        required
                        value={newTestimonial.author}
                        onChange={e => setNewTestimonial({...newTestimonial, author: e.target.value})}
                        className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3">Author Role/Subtitle</label>
                      <input 
                        required
                        value={newTestimonial.role}
                        onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})}
                        className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" 
                        placeholder="e.g. Active Carrier O/O"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-3">Testimonial Content</label>
                      <textarea 
                        required
                        value={newTestimonial.content}
                        onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})}
                        rows={4}
                        className="w-full px-5 py-3 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => setIsAddingTestimonial(false)} className="px-6 py-3 font-bold text-text-muted">Cancel</button>
                    <button type="submit" className="bg-authority-blue text-white px-10 py-3 rounded-xl font-bold">Save Testimonial</button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map(t => (
                    <div key={t.id} className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark relative group">
                      <button 
                        onClick={() => deleteTestimonial(t.id)}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Quote className="w-8 h-8 text-authority-blue/20 mb-4" />
                      <p className="text-text-muted italic mb-6 leading-relaxed">"{t.content}"</p>
                      <div>
                        <p className="font-bold text-lg">{t.author}</p>
                        <p className="text-xs uppercase tracking-widest font-bold text-steel-blue">{t.role}</p>
                      </div>
                    </div>
                  ))}
                  {testimonials.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-surface-dark rounded-3xl border border-dashed border-border-light dark:border-border-dark">
                      <Quote className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-30" />
                      <p className="text-text-muted">No testimonials added yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-authority-blue/10 text-authority-blue rounded-xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-green-500 font-bold text-sm">+12%</span>
                </div>
                <h4 className="text-3xl font-bold mb-1">2,482</h4>
                <p className="text-text-muted text-sm uppercase tracking-widest font-bold">Monthly Learners</p>
              </div>
              <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-steel-blue/10 text-steel-blue rounded-xl">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <span className="text-steel-blue font-bold text-sm">3 Active</span>
                </div>
                <h4 className="text-3xl font-bold mb-1">48</h4>
                <p className="text-text-muted text-sm uppercase tracking-widest font-bold">Total Guides</p>
              </div>
              <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-signal-gold/10 text-signal-gold rounded-xl">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <span className="text-green-500 font-bold text-sm">+5%</span>
                </div>
                <h4 className="text-3xl font-bold mb-1">15.2k</h4>
                <p className="text-text-muted text-sm uppercase tracking-widest font-bold">Page Views</p>
              </div>
              
              <div className="md:col-span-3 bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-text-muted" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Advanced Analytics Locked</h3>
                <p className="text-text-muted max-w-md mx-auto mb-8">Connect your Google Search Console and Analytics account to see more detailed insights about your audience.</p>
                <button className="bg-authority-blue text-white px-8 py-3 rounded-xl font-bold">Connect Accounts</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
