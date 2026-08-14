import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePortfolio();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          let Icon = Info;
          let borderClass = 'border-sky-500/40 text-sky-200 bg-slate-950/90';

          if (toast.type === 'success') {
            Icon = CheckCircle;
            borderClass = 'border-emerald-500/40 text-emerald-200 bg-slate-950/90';
          } else if (toast.type === 'security') {
            Icon = ShieldCheck;
            borderClass = 'border-cyan-400 text-cyan-200 bg-slate-950/95 shadow-[0_0_20px_rgba(6,182,212,0.3)]';
          } else if (toast.type === 'error') {
            Icon = AlertTriangle;
            borderClass = 'border-rose-500/40 text-rose-200 bg-slate-950/90';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 border rounded-sm backdrop-blur-lg font-mono text-xs shadow-xl relative ${borderClass}`}
            >
              <Icon className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 pr-2 leading-relaxed break-words">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
