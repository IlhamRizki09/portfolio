import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  isDark: boolean;
  icon?: LucideIcon;
}

export default function EmptyState({
  title,
  description,
  isDark,
  icon: Icon = Sparkles,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`text-center py-14 px-6 rounded-3xl border border-dashed max-w-lg mx-auto ${
        isDark
          ? 'bg-[#0E162B]/60 border-[#386BFF]/25 text-[#F5F7FF]'
          : 'bg-white border-blue-200 text-[#080D1C] shadow-sm'
      }`}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-[#386BFF]/15 border border-[#386BFF]/30 text-[#28D6E8] shadow-lg shadow-[#386BFF]/10">
        <Icon className="w-6 h-6" />
      </div>
      <h3
        className={`text-base sm:text-lg font-bold mb-2 tracking-tight ${
          isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${
          isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}
