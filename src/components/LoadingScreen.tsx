import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[110] bg-[#080D1C] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#386BFF]/30 to-[#28D6E8]/20 blur-[100px] pointer-events-none" />

          {/* MIR Logo Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 relative z-10"
          >
            <div className="w-16 h-16 rounded-2xl p-[1.5px] bg-gradient-to-tr from-[#386BFF] via-[#7855E8] to-[#28D6E8] shadow-[0_0_30px_rgba(56,107,255,0.4)]">
              <div className="w-full h-full bg-[#080D1C] rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black tracking-tight text-[#F5F7FF]">
                  MIR<span className="text-[#28D6E8]">.</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm font-bold tracking-widest text-[#F5F7FF] uppercase">
                Muhammad Ilham Rizki
              </span>
              <span className="text-[11px] font-medium tracking-wider text-[#28D6E8] uppercase">
                Digital Identity
              </span>
            </div>

            {/* Subtle loading pulse bar */}
            <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden mt-3">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1/2 h-full bg-gradient-to-r from-[#386BFF] to-[#28D6E8] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
