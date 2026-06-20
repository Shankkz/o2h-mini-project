import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, CheckSquare, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Theme logic
  const [darkMode, setDarkMode] = useState(() => {
    // Default to dark mode to keep that cozy vibe initially
    const saved = localStorage.getItem('theme');
    return saved !== null ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Minimal navbar for Auth pages just containing the Theme Toggle
  if (isAuthPage) return (
    <nav className="absolute top-0 w-full z-50 p-6 flex justify-end">
       <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-xl bg-brand-text/5 text-brand-text/70 hover:bg-brand-text/10 hover:text-brand-text transition-colors shadow-sm glass-panel !border-none"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
       </button>
    </nav>
  ); 

  // Full navbar for Dashboard and App pages
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0 border-b border-brand-coral/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center max-w-7xl">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-brand-coral to-brand-gold p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-brand-gold/20">
            <CheckSquare className="w-6 h-6 text-brand-bg" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-brand-text">
            Task<span className="text-brand-coral">Flow</span>
          </span>
        </Link>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-brand-text/5 text-brand-text/70 hover:bg-brand-text/10 hover:text-brand-text transition-colors shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-colors font-semibold text-sm tracking-wide"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          ) : (
            <Link to="/login" className="px-6 py-2.5 rounded-xl bg-brand-orange text-brand-bg font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-brand-orange/20 tracking-wide">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
