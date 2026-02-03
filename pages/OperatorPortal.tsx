
import React, { useState, useMemo } from 'react';
import RemediationProtocol from '../components/RemediationProtocol';
import { COURSE_MODULES } from '../constants';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Layout, 
  Shield, 
  Plus, 
  Trash2, 
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Clock,
  Activity,
  ArrowUpRight,
  Target
} from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const AnimatedCheckmark = ({ checked }: { checked: boolean }) => {
  return (
    <div className={`relative w-6 h-6 rounded-lg border-2 transition-all duration-500 flex items-center justify-center overflow-hidden shrink-0 ${
      checked 
        ? 'bg-green-500 border-green-500 scale-110 shadow-lg shadow-green-500/20' 
        : 'bg-transparent border-slate-200 dark:border-slate-700'
    }`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-3.5 h-3.5 text-white transition-all duration-500 ${
          checked ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <path
          d="M20 6L9 17L4 12"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: checked ? 0 : 40,
            transition: 'stroke-dashoffset 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
          }}
        />
      </svg>
    </div>
  );
};

const OperatorPortal: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Update MCS-150 form details', completed: true, priority: 'high' },
    { id: '2', text: 'Verify BOC-3 process agent filing', completed: false, priority: 'high' },
    { id: '3', text: 'Initialize clearinghouse pre-employment query', completed: false, priority: 'medium' },
    { id: '4', text: 'Audit HOS logs for previous cycle', completed: false, priority: 'medium' },
  ]);
  
  const [newTaskText, setNewTaskText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length;
    const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
    return { completed, total: tasks.length, progress };
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      priority: 'medium'
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const openDeleteConfirm = (id: string) => {
    setTaskToDelete(id);
    setIsModalOpen(true);
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(t => t.id !== taskToDelete));
      setIsModalOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      {/* Protocol Block at the Top */}
      <RemediationProtocol />

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Quick Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-border-dark shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Compliance Progress</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black text-authority-blue dark:text-white">{Math.round(stats.progress)}%</span>
              <Activity className="text-signal-gold mb-1" size={20} />
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-gray-800 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-authority-blue dark:bg-signal-gold transition-all duration-1000" style={{ width: `${stats.progress}%` }}></div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-border-dark shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Tasks</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black text-authority-blue dark:text-white">{stats.total - stats.completed}</span>
              <ClipboardList className="text-blue-500 mb-1" size={20} />
            </div>
            <p className="text-[9px] font-bold text-slate-500 mt-4 uppercase">Registry Items Pending</p>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-border-dark shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Audit Window</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black text-authority-blue dark:text-white">Day 14</span>
              <Clock className="text-amber-500 mb-1" size={20} />
            </div>
            <p className="text-[9px] font-bold text-slate-500 mt-4 uppercase">New Entrant Clock Active</p>
          </div>
          <div className="bg-authority-blue p-6 rounded-3xl shadow-xl flex flex-col justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Authority Status</p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-lg font-black text-white uppercase tracking-tight">Active & Guarded</span>
            </div>
            <Link to="/ai-advisor" className="text-[9px] font-black uppercase tracking-widest text-signal-gold mt-4 flex items-center">
              Consult Advisor <ArrowUpRight size={10} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 flex items-center">
                  <Target size={16} className="mr-3" /> Implementation Roadmap
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {COURSE_MODULES.map((module) => (
                  <Link 
                    key={module.id} 
                    to={`/modules/${module.id}`}
                    className="flex items-center justify-between p-8 bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-[2.5rem] hover:shadow-2xl hover:translate-x-2 transition-all group"
                  >
                    <div className="flex items-center space-x-8">
                      <div className="w-14 h-14 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-black text-authority-blue dark:text-signal-gold shadow-inner text-lg">
                        {module.id}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-authority-blue dark:text-white uppercase tracking-tight group-hover:text-signal-gold transition-colors font-serif">
                          {module.title}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{module.pillar}</span>
                          <span className="text-slate-200 dark:text-slate-700">•</span>
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{module.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-authority-blue group-hover:text-white transition-all shadow-sm">
                      <ChevronRight size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Registry Section */}
            <section className="bg-white dark:bg-surface-dark rounded-[3.5rem] p-10 md:p-14 border border-slate-100 dark:border-border-dark shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold flex items-center">
                    <ClipboardList size={18} className="mr-3" /> Compliance Registry
                  </h2>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-7">Sequential Execution Loop</p>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-300">
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span>{stats.completed}/{stats.total} Secured</span>
                </div>
              </div>

              <form onSubmit={addTask} className="mb-10 flex gap-4">
                <input 
                  type="text" 
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Registry new compliance item..."
                  className="flex-grow bg-slate-50 dark:bg-gray-900 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none rounded-2xl px-8 py-5 font-bold text-sm transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!newTaskText.trim()}
                  className="bg-authority-blue text-white px-8 rounded-2xl hover:bg-steel-blue transition-all active:scale-95 shadow-xl flex items-center disabled:opacity-30"
                >
                  <Plus size={24} />
                </button>
              </form>

              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-6 bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-border-dark rounded-3xl group transition-all duration-300 ${
                      task.completed ? 'opacity-60 bg-white/40' : 'hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex items-center space-x-6 flex-grow cursor-pointer" onClick={() => toggleTask(task.id)}>
                      <AnimatedCheckmark checked={task.completed} />
                      <div className="space-y-0.5">
                        <span className={`text-base font-bold transition-all duration-500 block ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                          {task.text}
                        </span>
                        {!task.completed && (
                          <div className="flex items-center space-x-2">
                             <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                               task.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                             }`}>Priority: {task.priority}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => openDeleteConfirm(task.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-slate-100 dark:border-border-dark rounded-[3rem]">
                    <ClipboardList size={48} className="mx-auto mb-4 text-slate-200" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Registry Neutral • No Tasks Active</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-authority-blue p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold font-serif mb-8 uppercase tracking-tight text-signal-gold">System Health</h3>
                <div className="space-y-8">
                  {[
                    { label: "BOC-3 Filing", status: "Verified", time: "Oct 24" },
                    { label: "UCR Registration", status: "Verified", time: "Oct 25" },
                    { label: "DQ File Framework", status: "In Progress", time: "Active" },
                    { label: "Drug Program", status: "Pending", time: "Required" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-5 last:border-0 last:pb-0">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</p>
                        <p className="text-[8px] font-bold text-white/30 uppercase mt-1">Status: {item.time}</p>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${
                        item.status === 'Verified' ? 'bg-green-500/20 text-green-400' : 
                        item.status === 'In Progress' ? 'bg-signal-gold/20 text-signal-gold' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 pt-10 border-t border-white/5">
                <p className="text-[11px] text-white/40 italic leading-relaxed text-center font-medium">
                  "Establishing order before seeking momentum."
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-10 rounded-[3rem] shadow-sm space-y-8">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold mb-6">Support Terminal</h3>
               <div className="space-y-4">
                  <Link to="/ai-advisor" className="flex items-center justify-between p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl hover:bg-authority-blue hover:text-white transition-all group border border-slate-100 dark:border-border-dark shadow-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest">Neural Advisor</p>
                      <p className="text-[8px] font-bold opacity-40 uppercase">24/7 Regulatory Support</p>
                    </div>
                    <ArrowUpRight size={16} className="opacity-30 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                  <Link to="/tools/tco-calculator" className="flex items-center justify-between p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl hover:bg-authority-blue hover:text-white transition-all group border border-slate-100 dark:border-border-dark shadow-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest">Economic Engine</p>
                      <p className="text-[8px] font-bold opacity-40 uppercase">Real-time CPM Analysis</p>
                    </div>
                    <ArrowUpRight size={16} className="opacity-30 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
               </div>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-gray-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-border-dark text-center">
               <AlertCircle className="mx-auto mb-4 text-slate-300" size={32} />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Registry Identification: NC-AUTH-LP-2025</p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteTask}
        title="Purge Task?"
        message="This action will permanently remove this compliance item from your operator registry. This action cannot be undone."
        confirmLabel="Purge Record"
      />
    </div>
  );
};

export default OperatorPortal;
