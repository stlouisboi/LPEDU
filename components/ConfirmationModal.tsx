
import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm Delete",
  cancelLabel = "Cancel",
  isProcessing = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-surface-dark rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 border border-white/10 shadow-2xl max-w-md w-full relative animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-authority-blue dark:hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-950/20 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-red-100 dark:border-red-900/30">
            <AlertTriangle size={36} className="text-red-600 dark:text-red-500" />
          </div>

          <div className="space-y-2">
            <h3 id="modal-title" className="text-2xl font-black text-authority-blue dark:text-white uppercase leading-tight font-serif tracking-tight">
              {title}
            </h3>
            <div className="h-px w-12 bg-red-600/20 mx-auto"></div>
          </div>

          <p className="text-sm sm:text-base text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed">
            {message}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-grow order-2 sm:order-1 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-text-dark-muted font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 dark:hover:bg-gray-700 transition-all active:scale-95 disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={isProcessing}
              className="flex-grow order-1 sm:order-2 py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
