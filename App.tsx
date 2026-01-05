
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  LayoutDashboard, 
  LogOut, 
  LogIn,
  Settings,
  PenTool,
  MessageSquare,
  Award,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Music,
  ArrowRight,
  BookOpen,
  User as UserIcon,
  ShieldAlert,
  Star,
  Globe,
  Loader2,
  Video
} from 'lucide-react';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, User, UserRole, Testimonial } from './types';
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

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
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

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!currentUser) return <Navigate to="/admin/login" />;
  return <>{children}</>;
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
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-primary-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-10 w-auto object-contain" />
            ) : (
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:bg-logo-red transition-colors shadow-sm">
                <span className="text-white font-bold text-lg">{settings.siteName.charAt(0)}</span>
              </div>
            )}
            <span className="text-xl font-bold tracking-tight text-authority-blue dark:text-white uppercase font-serif">
              {settings.siteName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-colors hover:text-authority-blue ${
                  location.pathname === item.path ? 'text-authority-blue' : 'text-text-muted dark:text-text-dark-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 pl-4 border-l border-border-light dark:border-border-dark">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              
              <Link
                to="/enroll"
                className="bg-authority-blue text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Start Learning
              </Link>
            </div>
          </nav>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark px-4 py-8 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-bold text-text-primary dark:text-text-dark-primary hover:text-authority-blue"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
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
    <footer className="bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark pt-16 pb-24 lg:pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.siteName} className="h-8 w-auto" />
              ) : (
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{settings.siteName.charAt(0)}</span>
                </div>
              )}
              <span className="text-2xl font-bold tracking-tight text-authority-blue dark:text-white uppercase font-serif">
                {settings.siteName}
              </span>
            </Link>
            <p className="text-text-muted dark:text-text-dark-muted max-w-sm mb-6 leading-relaxed">
              {settings.metaDescription}
            </p>
            
            {settings.showVeteranBadge && (
              <div className="mb-8 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 inline-flex items-center space-x-3 shadow-sm group hover:border-authority-blue/20 transition-all">
                <div className="w-10 h-10 bg-authority-blue text-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Award size={20} className="text-signal-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold leading-none">Certified</p>
                  <p className="text-xs font-bold text-text-primary dark:text-white mt-1 uppercase">Service-Disabled Veteran Owned</p>
                </div>
              </div>
            )}

            <div className="flex space-x-4 mb-8">
              {socialItems.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-authority-blue hover:text-white transition-all"
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs opacity-50">Quick Links</h4>
            <ul className="space-y-4 text-text-muted dark:text-text-dark-muted text-sm font-medium">
              <li><Link to="/about" className="hover:text-authority-blue transition-colors">About Us</Link></li>
              <li><Link to="/learning-path" className="hover:text-authority-blue transition-colors">The Learning Path</Link></li>
              <li><Link to="/resources" className="hover:text-authority-blue transition-colors">Free Resources</Link></li>
              <li><Link to="/blog" className="hover:text-authority-blue transition-colors">Compliance Blog</Link></li>
              <li><Link to="/faq" className="hover:text-authority-blue transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs opacity-50">Contact & Hours</h4>
            <ul className="space-y-4 text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
              <li className="font-bold text-authority-blue dark:text-steel-blue">{settings.contact.email}</li>
              <li>{settings.contact.phone}</li>
              <li>{settings.contact.address}</li>
              <li className="pt-2 text-[10px] font-black uppercase tracking-tighter opacity-40">{settings.contact.hours}</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center text-sm text-text-muted dark:text-text-dark-muted space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/legal" className="hover:underline">Privacy Policy</Link>
            <Link to="/legal" className="hover:underline">Terms of Service</Link>
            <Link to="/legal" className="hover:underline">Disclaimer</Link>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-white/95 dark:bg-primary-dark/95 backdrop-blur-md border-t border-border-light dark:border-border-dark z-50">
        <Link 
          to="/enroll"
          className="block w-full bg-authority-blue text-white py-4 rounded-xl text-center font-bold text-lg shadow-md"
        >
          Get Started
        </Link>
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

  // Apply real-time settings and theme colors
  useEffect(() => {
    // FIX: Verify db is a valid object before calling SDK functions
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
        <Loader2 className="animate-spin text-authority-blue mb-4" size={48} />
        <p className="font-serif italic text-text-muted">Synchronizing Knowledge Base...</p>
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
          <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/learning-path" element={<LearningPathPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/advisor" element={<AIServicePage />} />
                <Route path="/enroll" element={<EnrollPage />} />
                
                {/* Admin Auth */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
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
