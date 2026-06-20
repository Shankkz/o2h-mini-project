import { Trash2, CheckCircle2, Clock, AlignLeft } from 'lucide-react';

const TaskCard = ({ task, onComplete, onDelete }) => {
  const statusConfig = {
    'Pending': { 
      badge: 'bg-brand-gold/10 text-brand-gold border-brand-gold/30',
      dot: 'bg-brand-gold',
      glow: 'group-hover:shadow-[0_8px_30px_rgba(218,165,32,0.15)]'
    },
    'In Progress': { 
      badge: 'bg-brand-coral/10 text-brand-coral border-brand-coral/30',
      dot: 'bg-brand-coral',
      glow: 'group-hover:shadow-[0_8px_30px_rgba(255,111,97,0.15)]'
    },
    'Completed': { 
      badge: 'bg-brand-orange/10 text-brand-orange border-brand-orange/30',
      dot: 'bg-brand-orange',
      glow: 'group-hover:shadow-[0_8px_30px_rgba(255,69,0,0.15)]'
    }
  };

  const config = statusConfig[task.status] || statusConfig['Pending'];

  return (
    <div className={`group glass-panel rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${config.glow} flex flex-col h-full border border-brand-coral/10`}>
      <div className="flex-1">
        <div className="flex justify-between items-start gap-4 mb-5">
          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase ${config.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}></span>
            {task.status}
          </div>
          
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {task.status !== 'Completed' && (
              <button onClick={() => onComplete?.(task._id)} className="p-2 text-brand-text/40 hover:text-brand-orange hover:bg-brand-orange/10 rounded-full transition-colors" title="Mark Completed">
                <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => onDelete?.(task._id)} className="p-2 text-brand-text/40 hover:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-colors" title="Delete Task">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-brand-text mb-3 line-clamp-2 leading-tight">
          {task.title}
        </h3>
        
        <div className="flex items-start gap-2 text-brand-text/70 mb-6">
          <AlignLeft className="w-4 h-4 mt-1 shrink-0" />
          <p className="text-sm line-clamp-3 leading-relaxed">
            {task.description}
          </p>
        </div>
      </div>
      
      <div className="pt-5 border-t border-brand-text/5 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-brand-text/50">
          <Clock className="w-4 h-4" />
          <span>{new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        
        <div className="w-8 h-8 rounded-full border-2 border-brand-bg bg-gradient-to-tr from-brand-coral to-brand-orange flex items-center justify-center text-[10px] font-bold text-brand-bg shadow-sm">
          SJ
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
