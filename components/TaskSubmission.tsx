/**
 * Task Submission Component
 * Round 2 Build 2A: Implementation Task Submission Interface
 * 
 * Displays task details and handles file uploads, checklists, and form submissions
 * Following Portal Brief voice standard: institutional, not playful
 */

import React, { useState } from 'react';
import { Upload, FileText, CheckSquare, AlertCircle } from 'lucide-react';
import { taskService } from '../services/taskService';
import type { ImplementationTask, CarrierTaskStatus } from '../types/cohort';

interface TaskSubmissionProps {
  task: ImplementationTask;
  carrierId: string;
  status: CarrierTaskStatus | null;
  onSubmitted: () => void;
}

export const TaskSubmission: React.FC<TaskSubmissionProps> = ({
  task,
  carrierId,
  status,
  onSubmitted
}) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [checklistData, setChecklistData] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  // Determine current status
  const currentStatus = status?.status || 'not_started';

  // Status display configuration (Portal Brief voice standard)
  const statusConfig = {
    not_started: { label: 'NOT STARTED', color: 'text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
    in_progress: { label: 'IN PROGRESS', color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800' },
    submitted: { label: 'SUBMITTED', color: 'text-signal-gold', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    needs_changes: { label: 'NEEDS CHANGES', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    verified: { label: 'VERIFIED', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' }
  };

  const currentStatusConfig = statusConfig[currentStatus];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleStartTask = async () => {
    try {
      await taskService.startTask(carrierId, task.taskId);
      onSubmitted();
    } catch (err) {
      setError('Failed to start task. Please try again.');
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Upload file to Firebase Storage
      const fileUrl = await taskService.uploadTaskFile(carrierId, task.taskId, selectedFile);

      // Submit task with file reference
      await taskService.submitTask(carrierId, task.taskId, {
        type: 'file',
        fileUrl,
        fileName: selectedFile.name
      });

      onSubmitted();
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('File upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleChecklistSubmit = async () => {
    setUploading(true);
    setError(null);

    try {
      await taskService.submitTask(carrierId, task.taskId, {
        type: 'checklist',
        checklistData
      });

      onSubmitted();
    } catch (err) {
      setError('Submission failed. Please try again.');
      console.error('Checklist submission error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-border-dark rounded-2xl p-8 space-y-6">
      {/* Task Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary mb-2">
            {task.title}
          </h3>
          <p className="text-sm text-text-muted">
            Week {task.cohortWeek} • {task.pillar.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-xl ${currentStatusConfig.bg}`}>
          <span className={`text-xs font-black uppercase tracking-wider ${currentStatusConfig.color}`}>
            {currentStatusConfig.label}
          </span>
        </div>
      </div>

      {/* Task Description */}
      <div className="prose dark:prose-invert max-w-none">
        <div 
          className="text-text-secondary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />
      </div>

      {/* Status-specific content */}
      {currentStatus === 'not_started' && (
        <div className="pt-6 border-t border-slate-200 dark:border-border-dark">
          <button
            onClick={handleStartTask}
            className="px-6 py-3 bg-authority-blue text-white font-black uppercase tracking-wider rounded-xl hover:bg-authority-blue/90 transition-colors"
          >
            Begin Task
          </button>
        </div>
      )}

      {currentStatus === 'in_progress' && (
        <div className="pt-6 border-t border-slate-200 dark:border-border-dark space-y-6">
          {task.taskType === 'upload' && (
            <>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Upload Document
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-authority-blue dark:hover:border-signal-gold transition-colors">
                    <Upload size={20} className="mr-3 text-slate-400" />
                    <span className="text-sm font-bold text-text-secondary">
                      {selectedFile ? selectedFile.name : 'Select file to upload'}
                    </span>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>

              {selectedFile && (
                <button
                  onClick={handleFileSubmit}
                  disabled={uploading}
                  className="px-6 py-3 bg-signal-gold text-authority-blue font-black uppercase tracking-wider rounded-xl hover:bg-signal-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Submit for Review'}
                </button>
              )}
            </>
          )}

          {task.taskType === 'checklist' && (
            <>
              <div className="space-y-3">
                {/* Placeholder checklist items - would be dynamic in production */}
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checklistData['item1'] || false}
                    onChange={(e) => setChecklistData({ ...checklistData, item1: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    Checklist item placeholder
                  </span>
                </label>
              </div>

              <button
                onClick={handleChecklistSubmit}
                disabled={uploading}
                className="px-6 py-3 bg-signal-gold text-authority-blue font-black uppercase tracking-wider rounded-xl hover:bg-signal-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Submitting...' : 'Submit for Review'}
              </button>
            </>
          )}
        </div>
      )}

      {currentStatus === 'submitted' && (
        <div className="pt-6 border-t border-slate-200 dark:border-border-dark">
          <div className="flex items-start space-x-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-xl">
            <FileText size={20} className="text-signal-gold mt-0.5" />
            <div>
              <p className="text-sm font-bold text-text-primary">Pending Coach Review</p>
              <p className="text-xs text-text-muted mt-1">
                Submitted {status?.submittedAt ? new Date(status.submittedAt).toLocaleDateString() : 'recently'}
              </p>
            </div>
          </div>
        </div>
      )}

      {currentStatus === 'needs_changes' && (
        <div className="pt-6 border-t border-slate-200 dark:border-border-dark space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-xl">
            <AlertCircle size={20} className="text-amber-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-text-primary mb-2">Coach Note:</p>
              <p className="text-sm text-text-secondary">{status?.coachNote}</p>
            </div>
          </div>
          {/* Allow resubmission - show upload interface again */}
          <button
            onClick={handleStartTask}
            className="px-6 py-3 bg-authority-blue text-white font-black uppercase tracking-wider rounded-xl hover:bg-authority-blue/90 transition-colors"
          >
            Resubmit Task
          </button>
        </div>
      )}

      {currentStatus === 'verified' && (
        <div className="pt-6 border-t border-slate-200 dark:border-border-dark">
          <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40 rounded-xl">
            <CheckSquare size={20} className="text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-text-primary">Verified</p>
              <p className="text-xs text-text-muted mt-1">
                {status?.verifiedAt ? new Date(status.verifiedAt).toLocaleDateString() : 'Completed'}
              </p>
              {status?.coachNote && (
                <p className="text-sm text-text-secondary mt-2">{status.coachNote}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-xl">
          <AlertCircle size={20} className="text-red-600 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};
