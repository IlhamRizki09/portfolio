import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - start) / 850) * 100));
      setProgress(next);
      if (next >= 100) window.clearInterval(interval);
    }, 30);

    const done = window.setTimeout(() => setLoading(false), 900);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#050510]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(44,103,237,0.35),rgba(5,5,16,0)_70%)] blur-[60px]"
          />

          <div className="relative z-10 flex w-[min(82vw,320px)] flex-col items-center">
            <div className="flex flex-col items-center text-center">
              <span className="text-lg font-extrabold uppercase tracking-[0.12em] text-white sm:text-xl">
                Muhammad Ilham Rizki
              </span>
              <span className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#60a5fa]">
                Portfolio
              </span>
            </div>

            <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2c67ed] via-[#38bdf8] to-[#818cf8] transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex w-full items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Initializing
              </span>
              <span className="font-mono text-[11px] font-bold tabular-nums text-slate-200">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
