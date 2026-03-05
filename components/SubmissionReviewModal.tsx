/**
 * Submission Review Modal
 * Round 3 Build 3B: Coach review interface
 * 
 * Allows coaches to review artifacts, provide feedback, and verify tasks
 * Following Portal Brief: "Professional document review tool, not a grading system"
 */

import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  ExternalLink,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { taskService } from '../services/taskService';
import type { CarrierTaskStatus, ImplementationTask, Carrier } from '../types/cohort';

interface SubmissionReviewModalProps {
  submission: CarrierTaskStatus;
  task: ImplementationTask;
  carrier: Carrier;
  coachUserId: string;
  onClose: () => void;
  onActionComplete: () => void;
}

export const SubmissionReviewModal: React.FC<SubmissionReviewModalProps> = ({
  submission,
  task,
  carrier,
  coachUserId,
  onClose,
  onActionComplete
}) => {
  const [coachNote, setCoachNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: 'verify' | 'requestChanges' | 'flag') => {
    if ((action === 'requestChanges' || action === 'flag') && !coachNote.trim()) {
      setError('A coach note is required for this action.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      switch (action) {
        case 'verify':
          await taskService.verifyTask(carrier.id, task.taskId, coachUserId, coachNote);
          break;
        case 'requestChanges':
          await taskService.requestChanges(carrier.id, task.taskId, coachUserId, coachNote);
          break;
        case 'flag':
          await taskService.flagTask(carrier.id, task.taskId, coachUserId, coachNote);
          break;
      }
      onActionComplete();
      onClose();
    } catch (err) {
      setError('Failed to process action. Please try again.');
      console.error('Review action error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Review Submission</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
              {carrier.legalName} • MC# {carrier.mcNumber}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <XCircle size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Submission Details */}
          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-signal-gold mb-4">Task Information</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-2">{task.title}</h4>
                <div 
                  className="text-sm text-slate-400 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: task.description }}
                />
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-signal-gold mb-4">Artifact Submission</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-signal-gold/10 border border-signal-gold/20 flex items-center justify-center text-signal-gold">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{submission.submissionData?.fileName || 'Submitted Document'}</p>
                    <p className="text-[10px] text-slate-500 uppercase">Uploaded {new Date(submission.submittedAt!).toLocaleDateString()}</p>
                  </div>
                </div>
                {submission.submissionData?.fileUrl && (
                  <a 
                    href={submission.submissionData.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-signal-gold hover:underline"
                  >
                    View File <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </section>
          </div>

          {/* Right Side: Coach Actions */}
          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-signal-gold mb-4">Coach Feedback</h3>
              <div className="space-y-4">
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-500" size={18} />
                  <textarea 
                    value={coachNote}
                    onChange={(e) => setCoachNote(e.target.value)}
                    placeholder="Provide specific, institutional feedback..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white min-h-[160px] outline-none focus:border-signal-gold/50 transition-colors resize-none"
                  />
                </div>
                {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-signal-gold mb-4">Verification Actions</h3>
              
              <button 
                onClick={() => handleAction('verify')}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle size={20} />
                Verify Implementation
              </button>

              <button 
                onClick={() => handleAction('requestChanges')}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-amber-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                <AlertTriangle size={20} />
                Request Changes
              </button>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleAction('flag')}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600/10 border border-red-600/30 text-red-500 font-black uppercase tracking-wider rounded-xl hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
                >
                  <ShieldAlert size={20} />
                  Flag Compliance Risk
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-3 uppercase tracking-widest">
                  Flagging sets carrier risk level to RED and notifies admin
                </p>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
};
