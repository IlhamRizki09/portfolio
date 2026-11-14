import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function LanguageToggle() {
  const { lang, toggleLang, isDark } = usePortfolio();

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={toggleLang}
      className={`h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl flex items-center gap-1.5 border transition-all duration-200 cursor-pointer ${
        isDark
          ? 'bg-[#0E162B] hover:bg-[#142B59] border-[#386BFF]/25 text-[#F5F7FF] hover:border-[#386BFF]/60'
          : 'bg-white hover:bg-blue-50 border-blue-200 text-[#080D1C] hover:border-blue-300 shadow-sm'
      }`}
      aria-label="Switch language"
      title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <Languages className="w-3.5 h-3.5 text-[#386BFF]" />
      <span className="text-xs font-bold uppercase tracking-wider">
        {lang === 'id' ? 'ID' : 'EN'}
      </span>
    </motion.button>
  );
}
