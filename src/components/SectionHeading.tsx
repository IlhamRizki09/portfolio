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
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`${isCenter ? 'text-center' : 'text-left'} ${
        isCenter ? 'mb-10 sm:mb-14' : 'mb-6 sm:mb-8'
      }`}
    >
      {label && (
        <span className={`eyebrow mb-3 block ${isCenter ? 'text-center' : 'text-left'}`}>
          {label}
        </span>
      )}

      <h2
        className={
          isCenter
            ? 'display-title'
            : `font-extrabold tracking-tight leading-tight text-[clamp(1.3rem,2.4vw,1.65rem)] ${
                isDark ? 'text-slate-50' : 'text-slate-900'
              }`
        }
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 text-[0.95rem] font-light leading-relaxed sm:text-base ${
            isCenter ? 'mx-auto max-w-[640px] text-center' : 'max-w-[640px]'
          } ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
