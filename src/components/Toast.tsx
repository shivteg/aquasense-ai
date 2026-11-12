import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto rounded-2xl p-4 shadow-2xl border backdrop-blur-xl flex items-start gap-3 ${
              t.type === 'success'
                ? 'bg-[#0a251c]/90 border-emerald-500/40 text-emerald-100'
                : t.type === 'warning'
                ? 'bg-[#261c08]/90 border-amber-500/40 text-amber-100'
                : 'bg-[#091b2e]/90 border-cyan-500/40 text-cyan-100'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {t.type === 'success' ? (
                <CheckCircle2 size={18} className="text-emerald-400" />
              ) : t.type === 'warning' ? (
                <AlertTriangle size={18} className="text-amber-400" />
              ) : (
                <Info size={18} className="text-cyan-400" />
              )}
            </div>

            <div className="flex-1 pr-2">
              <h5 className="text-xs font-bold uppercase tracking-wider">{t.title}</h5>
              <p className="text-xs opacity-90 leading-snug mt-0.5">{t.message}</p>
            </div>

            <button
              onClick={() => onDismiss(t.id)}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
