import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Loader2,
  Linkedin,
  Facebook,
  Youtube,
  Twitter,
  ShieldCheck,
  Award
} from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, Testimonial } from './types';
import { AuthProvider, useAuth } from './AuthContext';
import ScrollToTop from './components/ScrollToTop';
import AIChatWidget from './components/AIChatWidget';
import Logo from './components/Logo';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearningPathPage from './pages/LearningPathPage'; 
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import LegalPage from './pages/LegalPage';
import EnrollPage from './pages/EnrollPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DownloadPage from './pages/DownloadPage';
import ReadinessPage from './pages/ReadinessPage';

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
import LeadsManager from './pages/admin/LeadsManager';
import SettingsManager from './pages/admin/SettingsManager';
import VideoLab from './pages/admin/VideoLab';
import InitializeDataPage from './pages/admin/InitializeDataPage';

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

const Header = () => {
  const { theme, toggleTheme } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname.startsWith('/admin')) return null;

  // GOVERNANCE: Approved Menu Only
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Roadmap', path: '/learning-path' },
    { name: 'Resources', path: '/resources' },
    { name: 'Admission', path: '/readiness' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-primary-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32 sm:h-44">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-black uppercase tracking-widest transition-all hover:text-authority-blue ${
                  location.pathname === item.path ? 'text-authority-blue dark:text-signal-gold underline underline-offset-8 decoration-2' : 'text-text-muted dark:text-text-dark-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-6 pl-6 border-l border-border-light dark:border-border-dark">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-7 h-7 text-authority-blue" /> : <Sun className="w-7 h-7 text-signal-gold" />}
              </button>
            </div>
          </nav>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-authority-blue dark:text-white">
              {isMenuOpen ? <X size={40} /> : <Menu size={40} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-8 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block p-6 rounded-2xl font-black text-2xl uppercase tracking-widest ${
                  location.pathname === item.path ? 'bg-authority-blue text-white shadow-lg' : 'text-text-muted hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const VeteranBadge = () => (
  <div className="flex flex-col items-center justify-center p-3 border-2 border-signal-gold bg-authority-blue rounded-xl w-[140px] shadow-lg">
    <div className="flex items-center space-x-1 mb-1">
      <Award size={14} className="text-signal-gold" fill="currentColor" />
      <span className="text-[9px] font-black text-white uppercase tracking-widest text-center">VETERAN OWNED</span>
    </div>
    <div className="h-px w-full bg-signal-gold/30 mb-1"></div>
    <span className="text-[8px] font-bold text-white/60 uppercase text-center">U.S. VETERAN OWNED</span>
  </div>
);

const OSHABadge = () => (
  <div className="flex flex-col items-center justify-center p-3 border-2 border-signal-gold bg-authority-blue rounded-xl w-[140px] shadow-lg">
    <div className="flex items-center space-x-1 mb-1">
      <ShieldCheck size={14} className="text-signal-gold" />
      <span className="text-[9px] font-black text-white uppercase tracking-widest text-center leading-none">OSHA-TRAINED</span>
    </div>
    <div className="h-px w-full bg-signal-gold/30 mb-1"></div>
    <span className="text-[8px] font-bold text-white/60 uppercase text-center leading-none">SAFETY SYSTEMS BACKGROUND</span>
  </div>
);

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full font-sans">
      <section className="bg-authority-blue dark:bg-surface-dark py-12 md:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" aria-label="Footer Navigation">
            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">FOUNDATION</h3>
              <ul className="space-y-4">
                {[
                  { name: 'LaunchPath Home', path: '/' },
                  { name: 'About the Standard', path: '/about' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[15px] text-white/80 hover:text-signal-gold hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">SYSTEM</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Operating Roadmap', path: '/learning-path' },
                  { name: 'Admission Protocol', path: '/readiness' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[15px] text-white/80 hover:text-signal-gold hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">RESOURCES</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Safety Checklists', path: '/download/risk-map' },
                  { name: 'System Assets', path: '/resources' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[15px] text-white/80 hover:text-signal-gold hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">GOVERNANCE</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Privacy Policy', path: '/legal' },
                  { name: 'Terms of Service', path: '/legal' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[15px] text-white/80 hover:text-signal-gold hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      <section className="bg-authority-blue dark:bg-surface-dark border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <Logo light className="h-12" />
              </div>
              <p className="text-[14px] text-white/60 mb-1">
                © {new Date().getFullYear()} LaunchPath™ Transportation EDU. All Rights Reserved.
              </p>
              <p className="text-[14px] font-medium text-white/70 mb-6 uppercase tracking-widest text-[10px]">
                Veteran Owned & Operated. Dedicated to Operational Integrity.
              </p>
              <div className="max-w-[600px]">
                <p className="text-[13px] text-white/50 leading-relaxed italic">
                  LaunchPath is an implementation standard providing informational training for motor carrier operations. Materials are for informational purposes only and do not constitute legal, tax, financial, insurance, or regulatory advice. LaunchPath does not provide regulatory representation.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end shrink-0 w-full lg:w-auto">
              <div className="flex flex-wrap justify-center lg:justify-end gap-6 mb-10">
                <VeteranBadge />
                <OSHABadge />
              </div>
              <div className="flex items-center gap-8">
                {[
                  { icon: <Linkedin size={24} />, label: "LinkedIn", href: "#" },
                  { icon: <Facebook size={24} />, label: "Facebook", href: "#" },
                  { icon: <Youtube size={24} />, label: "YouTube", href: "#" },
                  { icon: <Twitter size={24} />, label: "Twitter", href: "#" }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    aria-label={`Follow LaunchPath on ${social.label}`}
                    className="text-white/60 hover:text-signal-gold transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
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
    if (!isFirebaseConfigured || !db) {
      setAppLoading(false);
      return;
    }
    const settingsRef = doc(db, "settings", "general");
    const unsub = onSnapshot(settingsRef, (snap) => {
      if (snap.exists()) {
        setSettings(snap.data() as SiteSettings);
      }
      setAppLoading(false);
    }, () => setAppLoading(false));
    return () => unsub();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  if (appLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary-dark">
      <Loader2 className="animate-spin text-authority-blue" size={32} />
    </div>
  );

  return (
    <AppContext.Provider value={{
      theme, toggleTheme, settings, updateSettings: setSettings, blogs, addBlog: (b) => setBlogs([b, ...blogs]), updateBlog: (u) => setBlogs(blogs.map(b => b.id === u.id ? u : b)),
      formSubmissions, addFormSubmission: (s) => setFormSubmissions([s, ...formSubmissions]), testimonials, addTestimonial: (t) => setTestimonials([t, ...testimonials]), deleteTestimonial: (id) => setTestimonials(testimonials.filter(t => t.id !== id))
    }}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/readiness" element={<ReadinessPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/pricing" element={<EnrollPage />} />
              <Route path="/modules/:id" element={<ModuleDetailPage />} />
              <Route path="/download/risk-map" element={<DownloadPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
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
                <Route path="leads" element={<LeadsManager />} />
                <Route path="settings" element={<SettingsManager />} />
                <Route path="video-lab" element={<VideoLab />} />
                <Route path="initialize-data" element={<InitializeDataPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <AIChatWidget />
        </Router>
      </AuthProvider>
    </AppContext.Provider>
  );
}
