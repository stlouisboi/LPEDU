/**
 * Task List Component
 * Round 2 Build 2A: Display implementation tasks grouped by status
 * 
 * Following Portal Brief voice standard:
 * - "Implementation task" not "Assignment"
 * - Status labels are institutional, not playful
 * - No celebration language
 */

import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, AlertTriangle, Upload } from 'lucide-react';
import { taskService } from '../services/taskService';
import type { ImplementationTask, CarrierTaskStatus } from '../types/cohort';

interface TaskListProps {
  cohortWeekId: string;
  carrierId: string;
  onTaskSelect?: (task: ImplementationTask, status: CarrierTaskStatus | null) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  cohortWeekId,
  carrierId,
  onTaskSelect
}) => {
  const [tasks, setTasks] = useState<ImplementationTask[]>([]);
  const [statuses, setStatuses] = useState<Map<string, CarrierTaskStatus>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'not_started' | 'in_progress' | 'submitted' | 'needs_changes' | 'verified'>('all');

  useEffect(() => {
    loadTasks();
  }, [cohortWeekId, carrierId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      
      // Load tasks for this week
      const weekTasks = await taskService.getWeekTasks(cohortWeekId);
      setTasks(weekTasks);

      // Load carrier's statuses for all tasks
      const allStatuses = await taskService.getCarrierAllTaskStatuses(carrierId);
      const statusMap = new Map<string, CarrierTaskStatus>();
      allStatuses.forEach(status => {
        statusMap.set(status.taskId, status);
      });
      setStatuses(statusMap);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTaskStatus = (taskId: string): string => {
    const status = statuses.get(taskId);
    return status?.status || 'not_started';
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return getTaskStatus(task.taskId) === filter;
  });

  // Status configuration (Portal Brief voice standard)
  const statusConfig = {
    not_started: { 
      label: 'NOT STARTED', 
      icon: Clock, 
      color: 'text-slate-400',
      bg: 'bg-slate-50 dark:bg-slate-900/50',
      border: 'border-slate-200 dark:border-slate-800'
    },
    in_progress: { 
      label: 'IN PROGRESS', 
      icon: Upload, 
      color: 'text-authority-blue',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-900/40'
    },
    submitted: { 
      label: 'SUBMITTED', 
      icon: FileText, 
      color: 'text-signal-gold',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-900/40'
    },
    needs_changes: { 
      label: 'NEEDS CHANGES', 
      icon: AlertTriangle, 
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-900/40'
    },
    verified: { 
      label: 'VERIFIED', 
      icon: CheckCircle, 
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-900/40'
    }
  };

  // Count tasks by status
  const statusCounts = {
    all: tasks.length,
    not_started: tasks.filter(t => getTaskStatus(t.taskId) === 'not_started').length,
    in_progress: tasks.filter(t => getTaskStatus(t.taskId) === 'in_progress').length,
    submitted: tasks.filter(t => getTaskStatus(t.taskId) === 'submitted').length,
    needs_changes: tasks.filter(t => getTaskStatus(t.taskId) === 'needs_changes').length,
    verified: tasks.filter(t => getTaskStatus(t.taskId) === 'verified').length
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-signal-gold/20 border-t-signal-gold rounded-full mx-auto"></div>
        <p className="text-sm text-text-muted mt-4 font-bold">Loading implementation tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
            filter === 'all'
              ? 'bg-authority-blue text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All ({statusCounts.all})
        </button>
        <button
          onClick={() => setFilter('not_started')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
            filter === 'not_started'
              ? 'bg-authority-blue text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Not Started ({statusCounts.not_started})
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
            filter === 'in_progress'
              ? 'bg-authority-blue text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          In Progress ({statusCounts.in_progress})
        </button>
        <button
          onClick={() => setFilter('needs_changes')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
            filter === 'needs_changes'
              ? 'bg-authority-blue text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Needs Changes ({statusCounts.needs_changes})
        </button>
        <button
          onClick={() => setFilter('verified')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
            filter === 'verified'
              ? 'bg-authority-blue text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Verified ({statusCounts.verified})
        </button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 px-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-border-dark rounded-2xl">
          <FileText size={48} className="text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <p className="text-sm font-bold text-text-muted">
            No tasks in this category
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const taskStatus = getTaskStatus(task.taskId);
            const config = statusConfig[taskStatus as keyof typeof statusConfig];
            const Icon = config.icon;
            const status = statuses.get(task.taskId);

            return (
              <div
                key={task.taskId}
                onClick={() => onTaskSelect?.(task, status || null)}
                className={`p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${config.bg} ${config.border} hover:shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon size={20} className={config.color} />
                      <h4 className="font-black uppercase tracking-tight text-text-primary text-sm">
                        {task.title}
                      </h4>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2">
                      {task.description.replace(/<[^>]*>/g, '')}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-[10px] uppercase tracking-wider text-text-muted">
                        {task.pillar.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-text-muted">
                        {task.estimatedMinutes} min
                      </span>
                      {task.requiredForMilestone && (
                        <span className="text-[10px] uppercase tracking-wider text-signal-gold">
                          ★ Milestone
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg ${config.bg}`}>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
