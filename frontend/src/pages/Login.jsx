import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckSquare, Loader2 } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      // Hard redirect to clear out memory/state and rebuild app tree with Auth
      window.location.href = '/dashboard'; 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex rounded-[2.5rem] overflow-hidden glass-panel shadow-2xl border border-brand-coral/20">
        
        {/* Left Side - Visual */}
        <div className="hidden lg:flex lg:w-1/2 bg-brand-bg/50 p-14 flex-col justify-between relative overflow-hidden border-r border-brand-text/5">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-coral/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-brand-gold/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-16">
              <div className="bg-gradient-to-br from-brand-coral to-brand-gold p-2 rounded-xl">
                <CheckSquare className="w-8 h-8 text-brand-bg" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-brand-text">TaskFlow</span>
            </div>
            <h1 className="text-6xl font-extrabold leading-[1.1] mb-8 tracking-tight text-brand-text">
              Manage your work.<br/>Master your time.
            </h1>
            <p className="text-brand-text/80 text-xl max-w-md font-light leading-relaxed">
              The creative and wellness project management portal designed to keep your team aligned and peaceful.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 lg:p-20 bg-brand-bg flex flex-col justify-center relative">
          <div className="max-w-sm w-full mx-auto">
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-brand-text mb-3 tracking-tight">Welcome Back</h2>
              <p className="text-brand-text/60 font-medium text-lg">Enter your credentials to access your account.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-brand-text/80 mb-2 tracking-wide uppercase">Username</label>
                <input 
                  type="text" 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-5 py-4 bg-brand-bg border border-brand-text/20 rounded-2xl focus:ring-2 focus:ring-brand-coral/50 focus:border-brand-coral outline-none text-brand-text transition-all placeholder:text-brand-text/30 font-medium"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-brand-text/80 tracking-wide uppercase">Password</label>
                </div>
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-5 py-4 bg-brand-bg border border-brand-text/20 rounded-2xl focus:ring-2 focus:ring-brand-coral/50 focus:border-brand-coral outline-none text-brand-text transition-all placeholder:text-brand-text/30 font-medium"
                  placeholder="Enter your password"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-[#ff5c1a] text-brand-bg py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_8px_20px_-6px_rgba(255,69,0,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(255,69,0,0.5)] hover:-translate-y-0.5 mt-8 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-12 text-center">
              <p className="text-brand-text/60 font-medium">
                New to TaskFlow?{' '}
                <Link to="/register" className="text-brand-gold hover:text-[#f3c550] font-bold transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
