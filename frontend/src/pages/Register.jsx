import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, CheckSquare, Loader2 } from 'lucide-react';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // 1. Register User
      await api.post('/auth/register', formData);
      
      // 2. Auto-login immediately after
      const loginRes = await api.post('/auth/login', formData);
      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('username', loginRes.data.username);
      
      // 3. Redirect
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try a different username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex rounded-[2.5rem] overflow-hidden glass-panel shadow-2xl border border-brand-gold/20">
        
        {/* Left Side - Visual */}
        <div className="hidden lg:flex lg:w-1/2 bg-brand-bg/50 p-14 flex-col justify-between relative overflow-hidden border-r border-brand-text/5">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-brand-orange/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-16">
              <div className="bg-gradient-to-br from-brand-gold to-brand-orange p-2 rounded-xl">
                <CheckSquare className="w-8 h-8 text-brand-bg" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-brand-text">TaskFlow</span>
            </div>
            <h1 className="text-6xl font-extrabold leading-[1.1] mb-8 tracking-tight text-brand-text">
              Start your journey to better focus.
            </h1>
            <p className="text-brand-text/80 text-xl max-w-md font-light leading-relaxed">
              Join thousands of creatives and professionals who organize their daily work with absolute clarity.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 lg:p-20 bg-brand-bg flex flex-col justify-center relative">
          <div className="max-w-sm w-full mx-auto">
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-brand-text mb-3 tracking-tight">Create Account</h2>
              <p className="text-brand-text/60 font-medium text-lg">Sign up to start organizing tasks.</p>
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
                  className="w-full px-5 py-4 bg-brand-bg border border-brand-text/20 rounded-2xl focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none text-brand-text transition-all placeholder:text-brand-text/30 font-medium"
                  placeholder="Choose a username"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-text/80 mb-2 tracking-wide uppercase">Password</label>
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-5 py-4 bg-brand-bg border border-brand-text/20 rounded-2xl focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none text-brand-text transition-all placeholder:text-brand-text/30 font-medium"
                  placeholder="Create a password (min 6 chars)"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-[#e0b238] text-brand-bg py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_8px_20px_-6px_rgba(218,165,32,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(218,165,32,0.5)] hover:-translate-y-0.5 mt-8 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    <UserPlus className="w-6 h-6" />
                    <span>Register Account</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-12 text-center">
              <p className="text-brand-text/60 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-coral hover:text-[#ff8e83] font-bold transition-colors">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
