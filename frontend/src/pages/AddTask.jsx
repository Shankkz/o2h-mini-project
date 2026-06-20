import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import api from '../services/api';

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.title.trim() === '') {
      return setError('Task Title is required');
    }
    if (formData.description.trim().length < 20) {
      return setError('Description must be at least 20 characters');
    }

    setLoading(true);
    try {
      await api.post('/tasks', formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500 fade-in py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-brand-text/60 hover:text-brand-coral font-semibold transition-colors mb-8 group">
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span>Back to Dashboard</span>
      </Link>
      
      <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] shadow-xl border border-brand-coral/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold"></div>
        
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-brand-text tracking-tight mb-2">Create New Task</h2>
          <p className="text-brand-text/60 text-lg">Fill out the details below to add a new task to your board.</p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-brand-text/80 mb-3 tracking-wide uppercase">Task Title *</label>
            <input 
              type="text" 
              className="w-full px-6 py-4 bg-brand-bg border border-brand-text/20 rounded-2xl focus:ring-2 focus:ring-brand-coral/50 focus:border-brand-coral outline-none text-brand-text transition-all placeholder:text-brand-text/30 font-medium text-lg"
              placeholder="e.g. Brainstorm marketing assets"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-bold text-brand-text/80 tracking-wide uppercase">Description *</label>
              {formData.description.length < 20 && (
                <span className="text-xs font-bold text-brand-gold">
                  {formData.description.length} / 20 min chars
                </span>
              )}
            </div>
            <textarea 
              rows="5"
              className="w-full px-6 py-4 bg-brand-bg border border-brand-text/20 rounded-2xl focus:ring-2 focus:ring-brand-coral/50 focus:border-brand-coral outline-none text-brand-text transition-all resize-none placeholder:text-brand-text/30 font-medium leading-relaxed"
              placeholder="Detailed explanation of what needs to be done... (Minimum 20 characters)"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text/80 mb-3 tracking-wide uppercase">Initial Status</label>
            <div className="relative">
              <select 
                className="w-full px-6 py-4 bg-brand-bg border border-brand-text/20 rounded-2xl focus:ring-2 focus:ring-brand-coral/50 focus:border-brand-coral outline-none text-brand-text transition-all font-medium appearance-none cursor-pointer"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
              <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-brand-text/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-brand-text/10 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-brand-orange hover:bg-[#ff5c1a] text-brand-bg px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_8px_20px_-6px_rgba(255,69,0,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(255,69,0,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  <Save className="w-6 h-6" />
                  <span>Save New Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
