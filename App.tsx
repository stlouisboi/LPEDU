
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  Loader2,
  Linkedin,
  Facebook,
  Youtube,
  Twitter,
  ArrowRight,
  ShieldCheck,
  Award,
  ExternalLink,
  Shield,
  Anchor,
  CheckCircle,
  Lock
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
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourcesPage from './pages/ResourcesPage';
import FAQPage from './pages/FAQPage';
import ClarificationPage from './pages/ClarificationPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import LegalPage from './pages/LegalPage';
import AIServicePage from './pages/AIServicePage';
import EnrollPage from './pages/EnrollPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DownloadPage from './pages/DownloadPage';
import ReadinessPage from './pages/ReadinessPage';
import PortalInterstitial from './pages/PortalInterstitial';

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

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Clarification', path: '/clarification' },
    { name: 'Roadmap', path: '/learning-path' },
    { name: 'Resources', path: '/resources' }
  ];

  return (
    <header className="sticky top-0 z-[100] bg-white/90 dark:bg-primary-dark/90 backdrop-blur-2xl border-b border-slate-100 dark:border-border-dark transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          
          {/* LOGO - Scaled for firm aesthetic */}
          <Link to="/" className="flex items-center shrink-0 transition-opacity hover:opacity-80 active:scale-95 duration-300">
            <Logo className="h-8 sm:h-10 lg:h-12 w-auto" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.25em] transition-all relative group ${
                  location.pathname === item.path 
                  ? 'text-authority-blue dark:text-signal-gold' 
                  : 'text-text-muted dark:text-text-dark-muted hover:text-authority-blue'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-4 right-4 h-[1.5px] bg-signal-gold transition-transform duration-500 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
            
            <div className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700 mx-4 opacity-50" />

            <div className="flex items-center space-x-4">
              {/* Portal Access - Private Secondary Styling */}
              <Link 
                to="/portal" 
                className="border border-signal-gold text-signal-gold bg-transparent px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] flex items-center hover:bg-signal-gold/5 transition-all active:scale-95"
              >
                <Lock size={12} className="mr-2" />
                Portal Access
              </Link>

              {/* Admission - Primary Action Styling */}
              <Link 
                to="/readiness" 
                className="bg-authority-blue text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-steel-blue hover:shadow-lg transition-all active:scale-95 border border-white/10"
              >
                Admission
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800/40 text-authority-blue dark:text-signal-gold hover:scale-110 transition-all border border-slate-200 dark:border-slate-700"
                aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </nav>

          {/* MOBILE/TABLET CONTROLS */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-authority-blue dark:text-signal-gold border border-slate-200 dark:border-slate-700"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 bg-authority-blue text-white rounded-xl shadow-lg active:scale-90 transition-transform"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE/TABLET OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 sm:top-20 bg-white dark:bg-primary-dark z-[99] lg:hidden animate-in fade-in slide-in-from-top-4 duration-500 overflow-y-auto">
          <div className="flex flex-col p-8 sm:p-12 space-y-4">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`block p-6 rounded-[2rem] font-black text-2xl uppercase tracking-tighter transition-all ${
                location.pathname === '/' ? 'bg-authority-blue text-white shadow-xl' : 'text-slate-400'
              }`}
            >
              Home
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block p-6 rounded-[2rem] font-black text-2xl uppercase tracking-tighter transition-all ${
                  location.pathname === item.path ? 'bg-authority-blue text-white shadow-xl' : 'text-slate-800 dark:text-slate-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-8 space-y-4">
              <Link 
                to="/portal" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center border-2 border-signal-gold text-signal-gold py-6 rounded-[2rem] text-lg font-black uppercase tracking-[0.2em]"
              >
                <Lock size={18} className="inline mr-2 -mt-1" />
                Portal Access
              </Link>
              <Link 
                to="/readiness" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-authority-blue text-white py-8 rounded-[2.5rem] text-lg font-black uppercase tracking-[0.2em] shadow-2xl"
              >
                Admission Protocol
              </Link>
            </div>
            
            <div className="pt-20 pb-8 flex flex-col items-center space-y-8 opacity-30">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Institutional Standards Active</p>
              <div className="flex space-x-10">
                <Linkedin size={24} />
                <Twitter size={24} />
                <Youtube size={24} />
              </div>
            </div>
          </div>
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

const SDVOSBBadge = () => (
  <div className="flex flex-col items-center justify-center p-3 border-2 border-signal-gold bg-authority-blue rounded-xl w-[140px] shadow-lg">
    <div className="flex items-center space-x-1 mb-1">
      <Shield size={14} className="text-signal-gold" />
      <span className="text-[9px] font-black text-white uppercase tracking-widest text-center leading-none">SDVOSB</span>
    </div>
    <div className="h-px w-full bg-signal-gold/30 mb-1"></div>
    <span className="text-[8px] font-bold text-white/60 uppercase text-center leading-none">SERVICE-DISABLED VET</span>
  </div>
);

const KingdomBadge = () => (
  <div className="flex flex-col items-center justify-center p-3 border-2 border-signal-gold bg-authority-blue rounded-xl w-[140px] shadow-lg">
    <div className="flex items-center space-x-1 mb-1">
      <Anchor size={14} className="text-signal-gold" />
      <span className="text-[9px] font-black text-white uppercase tracking-widest text-center leading-none">KINGDOM BUSINESS</span>
    </div>
    <div className="h-px w-full bg-signal-gold/30 mb-1"></div>
    <span className="text-[8px] font-bold text-white/60 uppercase text-center leading-none">STEWARDSHIP FOCUSED</span>
  </div>
);

const OSHABadge = () => (
  <div className="flex flex-col items-center justify-center p-3 border-2 border-signal-gold bg-authority-blue rounded-xl w-[140px] shadow-lg">
    <div className="flex items-center space-x-1 mb-1">
      <ShieldCheck size={14} className="text-signal-gold" />
      <span className="text-[9px] font-black text-white uppercase tracking-widest text-center leading-none">OSHA-TRAINED</span>
    </div>
    <div className="h-px w-full bg-signal-gold/30 mb-1"></div>
    <span className="text-[8px] font-bold text-white/60 uppercase text-center leading-none">SAFETY SYSTEMS</span>
  </div>
);

const AuditReadyBadge = () => (
  <div className="flex flex-col items-center justify-center p-3 border-2 border-emerald-500 bg-white rounded-xl w-[140px] shadow-lg">
    <div className="flex items-center space-x-1 mb-1">
      <CheckCircle size={14} className="text-emerald-600" />
      <span className="text-[9px] font-black text-emerald-900 uppercase tracking-widest text-center leading-none">AUDIT READY</span>
    </div>
    <div className="h-px w-full bg-emerald-100 mb-1"></div>
    <span className="text-[8px] font-bold text-emerald-700/60 uppercase text-center leading-none">FMCSA COMPLIANT</span>
  </div>
);

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full font-sans">
      {/* SECTION 2: FOOTER NAVIGATION */}
      <section className="bg-authority-blue dark:bg-surface-dark py-12 md:py-20 border-t border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" aria-label="Footer Navigation">
            {/* FOUNDATION */}
            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">FOUNDATION</h3>
              <ul className="space-y-4">
                {[
                  { name: 'LaunchPath Home', path: '/' },
                  { name: 'About the Standard', path: '/about' },
                  { name: 'Contact Us', path: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[15px] text-white/80 hover:text-signal-gold hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SYSTEM */}
            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">SYSTEM</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Operating Roadmap', path: '/learning-path' },
                  { name: 'Admission Protocol', path: '/readiness' },
                  { name: 'The Four Pillars', path: '/#pillars' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[15px] text-white/80 hover:text-signal-gold hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">RESOURCES</h3>
              <ul className="space-y-4">
                {[
                  { name: 'FMCSA Safety Checklists', path: '/download/risk-map' },
                  { name: 'Educational Downloads', path: '/resources' },
                  { name: 'Truth & Clarification', path: '/clarification' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[15px] text-white/80 hover:text-signal-gold hover:underline transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="text-[13px] font-bold text-signal-gold uppercase tracking-[0.02em] mb-6">GOVERNANCE</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Privacy Policy', path: '/legal' },
                  { name: 'Terms of Service', path: '/legal' },
                  { name: 'Educational Disclaimer', path: '/legal' }
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

      {/* SECTION 3: BOTTOM BAR */}
      <section className="bg-authority-blue dark:bg-surface-dark border-t border-white/10 py-10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            
            {/* LEFT SIDE: Identity & Disclaimer */}
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <Logo light className="h-12 grayscale-0 brightness-0 invert" />
              </div>
              <p className="text-[14px] text-white/60 mb-1">
                © {new Date().getFullYear()} LaunchPath™ Transportation EDU. All Rights Reserved.
              </p>
              <p className="text-[14px] font-medium text-white/70 mb-6 uppercase tracking-widest text-[10px]">
                Veteran Owned & Operated. Dedicated to Operational Integrity.
              </p>
              <div className="max-w-[600px]">
                <p className="text-[13px] text-white/50 leading-relaxed italic">
                  LaunchPath is an educational platform providing informational training and resources for motor carrier operations. All materials are for educational purposes only and do not constitute legal, tax, financial, insurance, or regulatory advice. LaunchPath does not provide regulatory representation or individual compliance consulting. Users are encouraged to consult with licensed professionals regarding specific legal and insurance requirements.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: Badges & Social */}
            <div className="flex flex-col items-center lg:items-end shrink-0 w-full lg:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                <VeteranBadge />
                <SDVOSBBadge />
                <KingdomBadge />
                <OSHABadge />
                <AuditReadyBadge />
                <div className="flex flex-col items-center justify-center p-3 border-2 border-white/20 bg-white/5 rounded-xl w-[140px] shadow-lg">
                   <div className="flex items-center space-x-1 mb-1">
                     <Lock size={14} className="text-signal-gold" />
                     <span className="text-[9px] font-black text-white uppercase tracking-widest text-center leading-none">SECURE SSL</span>
                   </div>
                   <div className="h-px w-full bg-white/10 mb-1"></div>
                   <span className="text-[8px] font-bold text-white/40 uppercase text-center leading-none">256-BIT ENCRYPTED</span>
                </div>
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

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
    }, (error) => {
      console.warn("App: Settings listener failed. Using defaults.", error.message);
      setAppLoading(false);
    });
    
    return () => unsub();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
              <Route path="/clarification" element={<ClarificationPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/readiness" element={<ReadinessPage />} />
              <Route path="/portal" element={<PortalInterstitial />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
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
