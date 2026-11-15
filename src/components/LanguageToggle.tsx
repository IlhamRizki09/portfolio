import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function LanguageToggle() {
  const { lang, toggleLang, isDark } = usePortfolio();

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={toggleLang}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
        isDark
          ? 'border-white/10 bg-white/5 text-slate-200 hover:border-[#2c67ed]/45 hover:bg-[#2c67ed]/15 hover:text-white'
          : 'border-blue-100 bg-blue-50/70 text-[#2563eb] hover:border-blue-300 hover:bg-blue-100'
      }`}
      aria-label="Switch language"
      title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <Languages className="h-3.5 w-3.5" />
      <span>{lang === 'id' ? 'ID' : 'EN'}</span>
    </motion.button>
  );
}
