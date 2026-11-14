import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onToggle}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
        isDark
          ? 'bg-[#0E162B] hover:bg-[#142B59] border-[#386BFF]/25 text-[#28D6E8] hover:border-[#386BFF]/60 shadow-sm'
          : 'bg-white hover:bg-blue-50 border-blue-200 text-[#386BFF] hover:border-blue-300 shadow-sm'
      }`}
      aria-label="Toggle theme"
      title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
    >
      {isDark ? <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
    </motion.button>
  );
}
