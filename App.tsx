import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import AdminDashboard from './pages/admin/AdminDashboard';
import { doc, onSnapshot } from 'firebase/firestore';

// Core Config & Context
import { db, auth } from './firebase';

// OR if you exported isFirebaseConfigured from firebase.ts:
// import { db, auth, isFirebaseConfigured } from './config/firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, Testimonial } from './types';
import { AuthProvider, useAuth } from './AuthContext';

// Components
import ScrollToTop from './components/ScrollToTop';
import AIChatWidget from './components/AIChatWidget';
import Logo from './components/Logo';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearningPathPage from './pages/LearningPathPage'; 
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourcesPage from './pages/ResourcesPage';
import ReferenceBriefPage from './pages/ReferenceBriefPage';
import FAQPage from './pages/FAQPage';
import ClarificationPage from './pages/ClarificationPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import LegalPage from './pages/LegalPage';
import AIServicePage from './pages/AIServicePage';
import RequestAdmission from './pages/RequestAdmission';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DownloadPage from './pages/DownloadPage';
import ReadinessPage from './pages/ReadinessPage';
import AuthorityAccess from './pages/AuthorityAccess';
import EnrollmentPendingPage from './pages/EnrollmentPendingPage';
import ReachTestPage from './pages/ReachTestPage';
import TCOCalculatorPage from './pages/TCOCalculatorPage';
import TCOPreviewPage from './pages/TCOPreviewPage';
import OperatorPortal from './pages/OperatorPortal';
import ExposureMatrixPage from './pages/ExposureMatrixPage';

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

// Context Definition
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

// Sub-components (Header/Footer)
const Header = () => {
  const { theme, toggleTheme } = useApp();
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const hideHeaderRoutes = ['/admin', '/portal', '/enrollment-pending'];
  if (hideHeaderRoutes.some(route => location.pathname.startsWith(route))) return null;

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Program', path: '/learning-path' },
    { name: 'Matrix', path: '/exposure-matrix' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <header className="sticky top-0 z-[100] bg-authority-blue border-b border-white/10 text-signal-gold h-24 sm:h-32 flex items-center">
      <div className="max-w-[1800px] mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/"><Logo light={true} className="h-10 sm:h-14 w-auto" /></Link>
        <nav className="hidden xl:flex items-center space-x-6">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className="px-4 py-2 text-[11px] font-black uppercase tracking-widest hover:text-white transition-all">
              {item.name}
            </Link>
          ))}
          <Link to="/pricing" className="bg-signal-gold text-authority-blue px-8 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg">
            Admission Protocol
          </Link>
          <button onClick={toggleTheme} className="p-3 bg-white/5 rounded-xl text-signal-gold">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  const location = useLocation();
  const hideFooterRoutes = ['/admin', '/portal', '/enrollment-pending'];
  if (hideFooterRoutes.some(route => location.pathname.startsWith(route))) return null;

  return (
    <footer className="bg-authority-blue py-12 border-t border-white/5 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
        CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
      </p>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
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
    if (!isFirebaseConfigured || !db) { setAppLoading(false); return; }
    const settingsRef = doc(db, "settings", "general");
    const unsub = onSnapshot(settingsRef, (snap) => {
      if (snap.exists()) setSettings(snap.data() as SiteSettings);
      setAppLoading(false);
    }, () => setAppLoading(false));
    return () => unsub();
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const contextValue: AppContextType = {
    theme, toggleTheme, settings, updateSettings: setSettings, 
    blogs, addBlog: (b) => setBlogs([b, ...blogs]), 
    updateBlog: (u) => setBlogs(blogs.map(b => b.id === u.id ? u : b)),
    formSubmissions, addFormSubmission: (s) => setFormSubmissions([s, ...formSubmissions]), 
    testimonials, addTestimonial: (t) => setTestimonials([t, ...testimonials]), 
    deleteTestimonial: (id) => setTestimonials(testimonials.filter(t => t.id !== id))
  };

  return (
    <AppContext.Provider value={contextValue}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          {appLoading ? (
            <div className="min-h-screen flex items-center justify-center bg-authority-blue text-signal-gold uppercase font-black tracking-widest">
              Initializing Secure Standard...
            </div>
          ) : (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/exposure-matrix" element={<ExposureMatrixPage />} />
                <Route path="/learning-path" element={<LearningPathPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/reach-test" element={<ReachTestPage />} />
                <Route path="/portal" element={<AuthorityAccess />} />
                <Route path="/enrollment-pending" element={<EnrollmentPendingPage />} />
                <Route path="/operator-portal" element={<ProtectedRoute><OperatorPortal /></ProtectedRoute>} />
                <Route path="/pricing" element={<RequestAdmission />} />
                
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboardHome />} />
                  <Route path="pages" element={<PageList />} />
                  <Route path="leads" element={<LeadsManager />} />
                  <Route path="settings" element={<SettingsManager />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
              <AIChatWidget />
            </>
          )}
        </Router>
      </AuthProvider>
    </AppContext.Provider>
  );
}
