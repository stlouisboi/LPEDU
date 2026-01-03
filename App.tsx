
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
  Linkedin,
  Music,
  ArrowRight,
  BookOpen,
  User as UserIcon,
  ShieldAlert,
  Star
} from 'lucide-react';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, User, UserRole, Testimonial } from './types';

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
import AdminDashboard from './pages/AdminDashboard';
import AIServicePage from './pages/AIServicePage';
import EnrollPage from './pages/EnrollPage';

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
  user: User;
  login: () => void;
  logout: () => void;
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
  const { theme, toggleTheme, user, logout, settings } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            <div className="w-10 h-10 bg-authority-blue rounded-xl flex items-center justify-center group-hover:bg-steel-blue transition-colors shadow-sm">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-authority-blue dark:text-white uppercase font-serif">
              {settings.siteName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-colors hover:text-steel-blue ${
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
              
              {user.isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-2 text-sm font-bold text-authority-blue dark:text-steel-blue hover:underline"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button onClick={logout} className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/enroll"
                  className="bg-authority-blue text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-steel-blue transition-all shadow-md hover:shadow-lg"
                >
                  Start Learning
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Nav */}
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
          {user.isLoggedIn && (
             <Link
               to="/admin"
               onClick={() => setIsMenuOpen(false)}
               className="block text-xl font-bold text-steel-blue"
             >
               Admin Dashboard
             </Link>
          )}
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const { settings, user } = useApp();
  
  const socialLinks = [
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, url: 'https://youtube.com/@launchpath' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com/launchpath' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com/launchpath' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/company/launchpath' },
    { name: 'TikTok', icon: <Music className="w-5 h-5" />, url: 'https://tiktok.com/@launchpath' },
  ];

  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark pt-16 pb-24 lg:pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-authority-blue rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-authority-blue dark:text-white uppercase font-serif">
                {settings.siteName}
              </span>
            </Link>
            <p className="text-text-muted dark:text-text-dark-muted max-w-sm mb-6 leading-relaxed">
              Leading the way in professional carrier compliance education. We help you build robust systems today so you can stay in business tomorrow.
            </p>
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-steel-blue hover:text-white transition-all"
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-border-light dark:border-border-dark w-fit group">
                <div className="p-3 bg-signal-gold/10 rounded-xl group-hover:bg-signal-gold/20 transition-colors">
                  <Award className="w-6 h-6 text-signal-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Certified Business</p>
                  <p className="text-sm font-bold text-authority-blue dark:text-white leading-none">SDVOSB Enterprise</p>
                  <p className="text-[10px] text-text-muted mt-1">Service-Disabled Veteran-Owned</p>
                </div>
              </div>

              {!user.isLoggedIn && (
                <Link 
                  to="/enroll"
                  className="bg-authority-blue text-white px-8 py-4 rounded-2xl font-bold flex items-center hover:bg-steel-blue transition-all shadow-sm hover:shadow-md group"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-text-muted dark:text-text-dark-muted">
              <li><Link to="/about" className="hover:text-authority-blue">About Us</Link></li>
              <li><Link to="/learning-path" className="hover:text-authority-blue">The Learning Path</Link></li>
              <li><Link to="/resources" className="hover:text-authority-blue">Free Resources</Link></li>
              <li><Link to="/blog" className="hover:text-authority-blue">Compliance Blog</Link></li>
              <li><Link to="/faq" className="hover:text-authority-blue">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-text-muted dark:text-text-dark-muted">
              <li>{settings.contactEmail}</li>
              <li>{settings.phoneNumber}</li>
              <li><Link to="/contact" className="text-authority-blue font-semibold">Send a Message</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center text-sm text-text-muted dark:text-text-dark-muted space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} LaunchPath. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/legal" className="hover:underline">Privacy Policy</Link>
            <Link to="/legal" className="hover:underline">Terms of Service</Link>
            <Link to="/legal" className="hover:underline">Compliance Disclaimer</Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      {!user.isLoggedIn && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-white/95 dark:bg-primary-dark/95 backdrop-blur-md border-t border-border-light dark:border-border-dark z-50">
          <Link 
            to="/enroll"
            className="block w-full bg-authority-blue text-white py-4 rounded-xl text-center font-bold text-lg shadow-md"
          >
            Start Learning
          </Link>
        </div>
      )}
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [user, setUser] = useState<User>({ role: UserRole.GUEST, isLoggedIn: false });
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    }
    
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));

    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));

    const savedSubs = localStorage.getItem('formSubmissions');
    if (savedSubs) setFormSubmissions(JSON.parse(savedSubs));

    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
    else {
      // Default placeholders
      const defaults = [
        { id: '1', author: 'Example Owner-Operator', role: 'Active Carrier', content: "LaunchPath helped me understand compliance in plain English before I made costly mistakes. I went from feeling overwhelmed to having a clear step-by-step system." },
        { id: '2', author: 'Aspiring Fleet Owner', role: 'Business Student', content: "The resources provided are better than the paid consultants I've spoken to. It's refreshing to see a platform focused on ethics and longevity rather than just load hustle." }
      ];
      setTestimonials(defaults);
      localStorage.setItem('testimonials', JSON.stringify(defaults));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const updateSettings = (s: SiteSettings) => {
    setSettings(s);
    localStorage.setItem('siteSettings', JSON.stringify(s));
  };

  const addBlog = (b: BlogPost) => {
    const newBlogs = [b, ...blogs];
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs));
  };

  const updateBlog = (updatedBlog: BlogPost) => {
    const newBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b);
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs));
  };

  const addTestimonial = (t: Testimonial) => {
    const newList = [t, ...testimonials];
    setTestimonials(newList);
    localStorage.setItem('testimonials', JSON.stringify(newList));
  };

  const deleteTestimonial = (id: string) => {
    const newList = testimonials.filter(t => t.id !== id);
    setTestimonials(newList);
    localStorage.setItem('testimonials', JSON.stringify(newList));
  };

  const addFormSubmission = (sub: any) => {
    const newSubs = [sub, ...formSubmissions];
    setFormSubmissions(newSubs);
    localStorage.setItem('formSubmissions', JSON.stringify(newSubs));
  };

  const login = () => setUser({ role: UserRole.ADMIN, isLoggedIn: true });
  const logout = () => setUser({ role: UserRole.GUEST, isLoggedIn: false });

  return (
    <AppContext.Provider value={{
      theme, toggleTheme, settings, updateSettings, blogs, addBlog, updateBlog, user, login, logout,
      formSubmissions, addFormSubmission, testimonials, addTestimonial, deleteTestimonial
    }}>
      <Router>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/advisor" element={<AIServicePage />} />
              <Route path="/enroll" element={<EnrollPage />} />
              {/* Redirect legacy path */}
              <Route path="/destination" element={<LearningPathPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}
