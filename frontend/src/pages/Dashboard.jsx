import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, BarChart3, Clock, CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter && statusFilter !== 'All Tasks') {
        params.status = statusFilter;
      }
      if (searchQuery) {
        params.search = searchQuery;
      }

      // Fetch both tasks and stats concurrently
      const [tasksRes, statsRes] = await Promise.all([
        api.get('/tasks', { params }),
        api.get('/tasks/stats')
      ]);

      setTasks(tasksRes.data.tasks);

      // Parse MongoDB aggregation stats format into flat object
      const newStats = { total: 0, pending: 0, inProgress: 0, completed: 0 };
      if (statsRes.data.stats) {
        statsRes.data.stats.forEach(s => {
          newStats.total += s.count;
          if (s._id === 'Pending') newStats.pending = s.count;
          if (s._id === 'In Progress') newStats.inProgress = s.count;
          if (s._id === 'Completed') newStats.completed = s.count;
        });
      }
      setStats(newStats);
      
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter]); // Re-fetch only when clicking a status filter button

  const handleSearchKey = (e) => {
    if (e.key === 'Enter') {
      fetchDashboardData();
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: 'Completed' });
      fetchDashboardData(); // Refresh to update list and stats
    } catch (err) {
      console.error("Error marking completed:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to permanently delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchDashboardData(); // Refresh to update list and stats
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const statCards = [
    { label: 'Total Tasks', value: stats.total, icon: BarChart3, color: 'from-brand-text/40 to-brand-text/60', bg: 'bg-brand-text/10 text-brand-text' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'from-brand-orange/60 to-brand-orange', bg: 'bg-brand-orange/20 text-brand-orange' },
    { label: 'In Progress', value: stats.inProgress, icon: CircleDashed, color: 'from-brand-coral/60 to-brand-coral', bg: 'bg-brand-coral/20 text-brand-coral' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-brand-gold/60 to-brand-gold', bg: 'bg-brand-gold/20 text-brand-gold' }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 fade-in pb-12">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text mb-3 tracking-tight">
            Welcome back, <span className="gradient-text">{username}</span>
          </h1>
          <p className="text-brand-text/70 text-lg font-medium">Here's an overview of your projects today.</p>
        </div>
        <Link 
          to="/add-task" 
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-brand-bg transition-all duration-300 bg-brand-orange border border-transparent rounded-2xl hover:bg-[#ff5c1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-bg focus:ring-offset-brand-orange shadow-[0_8px_20px_-6px_rgba(255,69,0,0.5)] hover:-translate-y-1 hover:shadow-[0_12px_25px_-6px_rgba(255,69,0,0.6)]"
        >
          <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          <span>Create New Task</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-brand-text/10">
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`}></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`p-3.5 rounded-2xl ${stat.bg} shadow-sm border border-brand-text/10`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-extrabold text-brand-text mb-1 tracking-tight">{stat.value}</p>
              <h4 className="text-brand-text/50 font-semibold tracking-wide text-sm uppercase">{stat.label}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="glass-panel p-3 pl-5 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 mt-10 border border-brand-text/10 shadow-lg shadow-brand-bg/50">
        <div className="relative w-full md:w-1/3 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text/40" />
          <input 
            type="text" 
            placeholder="Search tasks by title (Press Enter)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
            className="w-full pl-10 pr-4 py-3 bg-transparent border-none focus:ring-0 outline-none text-brand-text placeholder:text-brand-text/40 font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar pr-2">
          {['All Tasks', 'Pending', 'In Progress', 'Completed'].map(filter => (
            <button 
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-bold tracking-wide transition-all duration-300 ${
                (statusFilter === filter || (filter === 'All Tasks' && !statusFilter))
                ? 'bg-brand-coral text-brand-bg shadow-lg shadow-brand-coral/20' 
                : 'text-brand-text/60 hover:bg-brand-text/5 hover:text-brand-text border border-transparent hover:border-brand-text/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-coral" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center flex flex-col items-center justify-center border-dashed border-2 border-brand-text/20">
          <CheckCircle2 className="w-16 h-16 text-brand-text/20 mb-4" />
          <h3 className="text-2xl font-bold text-brand-text mb-2">No tasks found</h3>
          <p className="text-brand-text/60 max-w-md mx-auto">Create a new task to get started, or clear your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-6">
          {tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
