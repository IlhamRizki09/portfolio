import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  isDark: boolean;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, isDark, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-2xl p-5 sm:p-6 transition-all duration-300 border relative overflow-hidden backdrop-blur-sm',
        isDark
          ? 'bg-[#1B1230]/75 border-[#302044] hover:border-[#8B5CF6]/40 text-[#F5F3FF] hover:shadow-[0_4px_24px_-4px_rgba(139,92,246,0.15)]'
          : 'bg-white border-[#E2DCED] hover:border-[#8B5CF6]/40 text-[#120D20] shadow-sm hover:shadow-md',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
