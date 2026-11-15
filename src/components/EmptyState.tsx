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
          ? 'bg-[#0a0f20]/60 border-[#2c67ed]/25 text-[#f5f7ff]'
          : 'bg-white border-blue-200 text-[#050510] shadow-sm'
      }`}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#38bdf8] shadow-lg shadow-[#2c67ed]/10">
        <Icon className="w-6 h-6" />
      </div>
      <h3
        className={`text-base sm:text-lg font-bold mb-2 tracking-tight ${
          isDark ? 'text-[#f5f7ff]' : 'text-[#050510]'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${
          isDark ? 'text-[#94a3b8]' : 'text-[#475569]'
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}

