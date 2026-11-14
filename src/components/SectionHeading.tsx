import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  isDark: boolean;
  align?: 'center' | 'left';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  isDark,
  align = 'center',
}: SectionHeadingProps) {
  const words = title.split(' ');
  const lastWord = words.pop()!;
  const restWords = words.join(' ');

  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className={`mb-12 sm:mb-16 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-block text-[11px] font-bold tracking-[0.22em] uppercase text-[#386BFF] mb-2.5">
          {label}
        </span>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 ${
          isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
        }`}
      >
        {restWords ? `${restWords} ` : ''}
        <span className="bg-gradient-to-r from-[#386BFF] via-[#7855E8] to-[#28D6E8] bg-clip-text text-transparent">
          {lastWord}
        </span>
      </h2>

      {subtitle && (
        <p
          className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${
            isCenter ? 'mx-auto' : ''
          } ${isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'}`}
        >
          {subtitle}
        </p>
      )}

      <div
        className={`mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#386BFF] via-[#7855E8] to-[#28D6E8] ${
          isCenter ? 'mx-auto' : ''
        }`}
      />
    </motion.div>
  );
}
