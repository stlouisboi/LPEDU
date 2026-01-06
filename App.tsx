
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  LogOut, 
  ArrowRight,
  Loader2,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, Testimonial } from './types';
import { AuthProvider, useAuth } from './AuthContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearningPathPage from './pages/LearningPathPage'; 
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourcesPage from './pages/ResourcesPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import AIServicePage from './pages/AIServicePage';
import EnrollPage from './pages/EnrollPage';
import ModuleDetailPage from './pages/ModuleDetailPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; // monolithic tabbed view in pages folder
import AdminLayout from './pages/admin/AdminLayout'; // modular layout
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import PageList from './pages/admin/PageList';
import HomePageEditor from './pages/admin/HomePageEditor';
import BlogList from './pages/admin/BlogList';
import BlogEditor from './pages/admin/BlogEditor';
import ResourceManager from './pages/admin/ResourceManager';
import FormManagement from './pages/admin/FormManagement';
import SubmissionsList from './pages/admin/SubmissionsList';
import SettingsManager from './pages/admin/SettingsManager';
import VideoLab from './pages/admin/VideoLab';

// Security
import ProtectedRoute from './components/admin/ProtectedRoute';

// Contexts
interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  settings: SiteSettings;
  updateSettings: (s: SiteSettings) => void;
  blogs: BlogPost[];
  addBlog: (b: BlogPost) => void;
  updateBlog: (b: BlogPost) => void;
  testimonials: Testimonial[];
  addTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  formSubmissions: any[];
  addFormSubmission: (sub: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div 
        className="h-full bg-signal-gold transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

const Header = () => {
  const { theme, toggleTheme, settings } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Learning Path', path: '/learning-path' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'AI Advisor', path: '/advisor' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-primary-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark transition-all duration-300">
      <ProgressBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-10 w-auto object-contain transform group-hover:scale-105 transition-transform" />
            ) : (
              <div className="w-10 h-10 bg-black dark:bg-authority-blue rounded-xl flex items-center justify-center group-hover:bg-logo-red transition-colors shadow-sm">
                <span className="text-white font-black text-lg">{settings.siteName.charAt(0)}</span>
              </div>
            )}
            <span className="text-xl font-black tracking-tighter text-authority-blue dark:text-white uppercase font-serif group-hover:opacity-80 transition-opacity">
              {settings.siteName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold transition-all hover:text-authority-blue relative group ${
                  location.pathname === item.path ? 'text-authority-blue dark:text-signal-gold' : 'text-text-muted dark:text-text-dark-muted'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-authority-blue transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 pl-4 border-l border-border-light dark:border-border-dark">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5 text-authority-blue" /> : <Sun className="w-5 h-5 text-signal-gold" />}
              </button>
              
              <Link
                to="/enroll"
                className="bg-authority-blue text-white px-7 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-steel-blue transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Enroll Now
              </Link>
            </div>
          </nav>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl active:scale-90">
              {theme === 'light' ? <Moon className="w-5 h-5 text-authority-blue" /> : <Sun className="w-5 h-5 text-signal-gold" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 active:scale-90 transition-all">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark px-4 py-8 space-y-4 shadow-2xl transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-xl font-black rounded-2xl transition-colors ${
                location.pathname === item.path ? 'bg-authority-blue/5 text-authority-blue dark:text-signal-gold' : 'text-text-primary dark:text-text-dark-primary hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const { settings } = useApp();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;
  
  const socialItems = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: settings.social.facebook },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: settings.social.twitter },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: settings.social.instagram },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: settings.social.linkedin },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, url: settings.social.youtube },
  ].filter(s => s.url);

  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark pt-20 pb-24 lg:pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-authority-blue/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.siteName} className="h-10 w-auto" />
              ) : (
                <div className="w-10 h-10 bg-black dark:bg-authority-blue rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="text-white font-black">{settings.siteName.charAt(0)}</span>
                </div>
              )}
              <span className="text-3xl font-black tracking-tighter text-authority-blue dark:text-white uppercase font-serif">
                {settings.siteName}
              </span>
            </Link>
            <p className="text-text-muted dark:text-text-dark-muted max-w-sm mb-10 leading-relaxed font-medium">
              {settings.metaDescription}
            </p>
            
            {settings.showVeteranBadge && (
              <div className="mb-10 p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 inline-flex items-center space-x-4 shadow-sm group hover:border-signal-gold transition-all cursor-default">
                <div className="w-12 h-12 bg-authority-blue text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all">
                  <Award size={24} className="text-signal-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-authority-blue dark:text-signal-gold leading-none">SDVOB Certified</p>
                  <p className="text-sm font-black text-text-primary dark:text-white mt-1 uppercase tracking-tight">Veteran Owned Business</p>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {socialItems.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-authority-blue dark:text-text-dark-muted flex items-center justify-center hover:bg-authority-blue hover:text-white dark:hover:text-white transition-all transform hover:-translate-y-1 active:scale-90"
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-black mb-8 uppercase tracking-widest text-xs text-text-muted opacity-80">Quick Links</h4>
            <ul className="space-y-5 text-text-muted dark:text-text-dark-muted text-sm font-bold">
              <li><Link to="/about" className="hover:text-authority-blue hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link to="/learning-path" className="hover:text-authority-blue hover:translate-x-1 inline-block transition-all">The Learning Path</Link></li>
              <li><Link to="/blog" className="hover:text-authority-blue hover:translate-x-1 inline-block transition-all">Compliance Blog</Link></li>
              <li><Link to="/faq" className="hover:text-authority-blue hover:translate-x-1 inline-block transition-all">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase tracking-widest text-xs text-text-muted opacity-80">Contact Hub</h4>
            <ul className="space-y-6 text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
              <li className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-text-muted/60 mb-1">Direct Email</span>
                <span className="font-black text-authority-blue dark:text-signal-gold break-all">{settings.contact.email}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-text-muted/60 mb-1">Corporate Line</span>
                <span className="font-bold text-text-primary dark:text-white">{settings.contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-border-light dark:border-border-dark flex flex-col lg:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-widest text-text-muted dark:text-text-dark-muted space-y-6 lg:space-y-0">
          <p>© {new Date().getFullYear()} {settings.siteName}. Compliance First Methodology.</p>
          <div className="flex space-x-10">
            <Link to="/legal" className="hover:text-authority-blue transition-colors">Privacy</Link>
            <Link to="/legal" className="hover:text-authority-blue transition-colors">Terms</Link>
            <Link to="/legal" className="hover:text-authority-blue transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !db || typeof db !== 'object') {
      setAppLoading(false);
      return;
    }

    try {
      const unsub = onSnapshot(doc(db, "settings", "general"), (snap) => {
        if (snap.exists()) {
          const data = snap.data() as SiteSettings;
          setSettings(data);
          
          const root = document.documentElement;
          root.style.setProperty('--authority-blue', data.primaryColor || '#1e3a5f');
          root.style.setProperty('--signal-gold', data.secondaryColor || '#d4af37');
          
          const pageTitle = document.title.split('|')[0].trim() || 'Home';
          document.title = (data.seo?.titleFormat || INITIAL_SETTINGS.seo.titleFormat).replace('{{pageTitle}}', pageTitle);
          
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', data.metaDescription);
          
          if (data.faviconUrl) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'icon';
            link.href = data.faviconUrl;
            if (!document.head.contains(link)) document.head.appendChild(link);
          }
        }
        setAppLoading(false);
      }, (err: any) => {
        console.warn("LaunchPath: Settings Sync Error (Using Defaults):", err);
        setSettings(INITIAL_SETTINGS);
        setAppLoading(false);
      });

      return () => unsub();
    } catch (e) {
      console.error("LaunchPath: Snapshot setup failed", e);
      setAppLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const updateSettings = (s: SiteSettings) => setSettings(s);
  const addBlog = (b: BlogPost) => setBlogs([b, ...blogs]);
  const updateBlog = (u: BlogPost) => setBlogs(blogs.map(b => b.id === u.id ? u : b));
  const addTestimonial = (t: Testimonial) => setTestimonials([t, ...testimonials]);
  const deleteTestimonial = (id: string) => setTestimonials(testimonials.filter(t => t.id !== id));
  const addFormSubmission = (sub: any) => setFormSubmissions([sub, ...formSubmissions]);

  if (appLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-primary-light">
        <Loader2 className="animate-spin text-authority-blue mb-6" size={56} />
        <p className="font-black uppercase tracking-[0.3em] text-authority-blue/40 text-xs">Synchronizing Knowledge Base</p>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{
      theme, toggleTheme, settings, updateSettings, blogs, addBlog, updateBlog,
      formSubmissions, addFormSubmission, testimonials, addTestimonial, deleteTestimonial
    }}>
      <AuthProvider>
        <Router>
          <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${theme === 'dark' ? 'dark' : ''}`}>
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/learning-path" element={<LearningPathPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/advisor" element={<AIServicePage />} />
                <Route path="/enroll" element={<EnrollPage />} />
                <Route path="/modules/:id" element={<ModuleDetailPage />} />
                
                {/* Admin Auth */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Primary Admin Dashboard View */}
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

                {/* Modular Admin (Layout-based sub-routes) */}
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboardHome />} />
                  <Route path="pages" element={<PageList />} />
                  <Route path="pages/home" element={<HomePageEditor />} />
                  <Route path="blog" element={<BlogList />} />
                  <Route path="blog/new" element={<BlogEditor />} />
                  <Route path="blog/edit/:id" element={<BlogEditor />} />
                  <Route path="resources" element={<ResourceManager />} />
                  <Route path="forms" element={<FormManagement />} />
                  <Route path="forms/submissions" element={<SubmissionsList />} />
                  <Route path="settings" element={<SettingsManager />} />
                  <Route path="video-lab" element={<VideoLab />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </AppContext.Provider>
  );
}
