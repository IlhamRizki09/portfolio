import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ToastContainer() {
  const { toasts, removeToast } = usePortfolio();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl border backdrop-blur-xl bg-[#0E162B]/95 text-[#F5F7FF] border-[#386BFF]/35 shadow-2xl shadow-black/60"
          >
            {toast.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#28D6E8] flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            )}

            <p className="text-xs sm:text-sm font-medium flex-1">{toast.message}</p>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-[#9AA6C0] hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
