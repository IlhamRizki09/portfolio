import { motion, AnimatePresence } from 'framer-motion';
import { Home, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function NotFoundModal() {
  const { isNotFoundOpen, closeNotFound, isDark, t } = usePortfolio();

  if (!isNotFoundOpen) return null;

  const handleBackHome = () => {
    closeNotFound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[125] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeNotFound}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl text-center z-10 ${
            isDark
              ? 'bg-[#0a0f20] border-[#2c67ed]/35 text-[#f5f7ff]'
              : 'bg-white border-[#2c67ed]/40 text-[#050510]'
          }`}
        >
          <button
            onClick={closeNotFound}
            className="absolute top-4 right-4 p-2 rounded-xl text-[#94a3b8] hover:text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 3D Abstract Glow */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-[#2c67ed] via-[#818cf8] to-[#38bdf8] p-[2px] shadow-2xl shadow-[#2c67ed]/40 flex items-center justify-center">
            <div className="w-full h-full bg-[#050510] rounded-[22px] flex items-center justify-center">
              <span className="text-3xl font-black text-[#38bdf8]">404</span>
            </div>
          </div>

          <h3 className="text-2xl font-black mb-2">{t.notFound.title}</h3>
          <p className="text-sm text-[#94a3b8] mb-6 leading-relaxed">
            {t.notFound.desc}
          </p>

          <button
            onClick={handleBackHome}
            className="w-full h-12 rounded-xl text-sm font-bold bg-[#2c67ed] hover:bg-[#2E5BE5] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#2c67ed]/30 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{t.notFound.backHome}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

