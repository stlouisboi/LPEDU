
import React, { useState } from 'react';
import RemediationProtocol from '../components/RemediationProtocol';
import { COURSE_MODULES } from '../constants';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Layout, 
  Shield, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square,
  ClipboardList
} from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const OperatorPortal: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Update MCS-150 form details', completed: true },
    { id: '2', text: 'Verify BOC-3 process agent filing', completed: false },
    { id: '3', text: 'Initialize clearinghouse pre-employment query', completed: false },
  ]);
  
  const [newTaskText, setNewTaskText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false
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
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen">
      {/* Protocol Block at the Top */}
      <RemediationProtocol />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-16 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Operator Dashboard</h1>
            <p className="text-text-muted mt-1 uppercase text-[10px] font-black tracking-widest">Registry ID: LP-AUTH-7729 // SECURE_UPLINK_STABLE</p>
          </div>
          <div className="flex items-center space-x-3 bg-white dark:bg-surface-dark px-5 py-3 border border-slate-100 dark:border-border-dark rounded-2xl shadow-sm">
            <Shield size={16} className="text-signal-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-white">Active Authority Standard</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Implementation Sequence */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 flex items-center">
                  <Layout size={16} className="mr-3" /> Implementation Sequence
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
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">{module.pillar} • {module.duration}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-authority-blue group-hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Task Registry Section */}
            <section className="bg-white dark:bg-surface-dark rounded-[3.5rem] p-10 md:p-14 border border-slate-100 dark:border-border-dark shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold flex items-center">
                  <ClipboardList size={18} className="mr-3" /> Task Registry
                </h2>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Operator Personalized</span>
              </div>

              <form onSubmit={addTask} className="mb-10 flex gap-4">
                <input 
                  type="text" 
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Input custom compliance task..."
                  className="flex-grow bg-slate-50 dark:bg-gray-900 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none rounded-2xl px-6 py-4 font-bold text-sm transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  className="bg-authority-blue text-white px-6 rounded-2xl hover:bg-steel-blue transition-all active:scale-95 shadow-lg flex items-center"
                >
                  <Plus size={20} />
                </button>
              </form>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between p-5 bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-border-dark rounded-2xl group transition-all hover:bg-white dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-4 flex-grow cursor-pointer" onClick={() => toggleTask(task.id)}>
                      {task.completed ? (
                        <CheckSquare className="text-green-500" size={20} />
                      ) : (
                        <Square className="text-slate-300" size={20} />
                      )}
                      <span className={`text-sm font-bold ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                        {task.text}
                      </span>
                    </div>
                    <button 
                      onClick={() => openDeleteConfirm(task.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center py-12 opacity-30">
                    <ClipboardList size={48} className="mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Registry Empty</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-authority-blue p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
              <h3 className="text-2xl font-bold font-serif mb-8 uppercase tracking-tight text-signal-gold">System Integrity</h3>
              <div className="space-y-8">
                {[
                  { label: "BOC-3 Filing", status: "Verified" },
                  { label: "UCR Registration", status: "Verified" },
                  { label: "DQ File Framework", status: "In Progress" },
                  { label: "MCS-150 Update", status: "Pending" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-5">
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-60">{item.label}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                      item.status === 'Verified' ? 'bg-green-500/20 text-green-400' : 
                      item.status === 'In Progress' ? 'bg-signal-gold/20 text-signal-gold' : 
                      'bg-white/10 text-white/40'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-10 border-t border-white/5">
                <p className="text-[11px] text-white/30 italic leading-relaxed">
                  “Lazy people want much but get little, but those who work hard will prosper.” — Proverbs 13:4
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-10 rounded-[3rem] shadow-sm">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold mb-6">Quick Links</h3>
               <div className="space-y-4">
                  <Link to="/ai-advisor" className="flex items-center justify-between p-5 bg-slate-50 dark:bg-gray-800 rounded-2xl hover:bg-authority-blue hover:text-white transition-all group">
                    <span className="text-[10px] font-black uppercase tracking-widest">Neural Advisor</span>
                    <ChevronRight size={14} className="opacity-30 group-hover:opacity-100" />
                  </Link>
                  <Link to="/tools/tco-calculator" className="flex items-center justify-between p-5 bg-slate-50 dark:bg-gray-800 rounded-2xl hover:bg-authority-blue hover:text-white transition-all group">
                    <span className="text-[10px] font-black uppercase tracking-widest">TCO Economic Engine</span>
                    <ChevronRight size={14} className="opacity-30 group-hover:opacity-100" />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteTask}
        title="Purge Task?"
        message="This action will permanently remove this item from your operator registry. This action cannot be undone."
        confirmLabel="Purge Record"
      />
    </div>
  );
};

export default OperatorPortal;
