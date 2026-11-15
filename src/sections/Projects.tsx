import { FolderGit2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  const { t } = usePortfolio();

  return (
    <section id="projects" className="relative section-py">
      <div className="container-custom">
        <SectionHeading title={t.projects.title} subtitle={t.projects.subtitle} isDark={isDark} />

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="glass-card relative mx-auto max-w-3xl overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-16"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/45 to-transparent"
            />
            <span
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border ${
                isDark
                  ? 'border-[#3b82f6]/25 bg-[#25457b]/25 text-[#7dd3fc]'
                  : 'border-blue-100 bg-blue-50 text-[#2563eb]'
              }`}
            >
              <FolderGit2 className="h-7 w-7" />
            </span>

            <p className="eyebrow mt-6">Work in progress</p>

            <h3
              className={`mt-2 text-[clamp(1.25rem,3vw,1.7rem)] font-extrabold tracking-tight ${
                isDark ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {t.projects.emptyTitle}
            </h3>

            <p
              className={`mx-auto mt-3 max-w-md text-sm leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {t.projects.emptyDesc}
            </p>

            <a
              href="#contact"
              className={`mt-7 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'border-[#3077ff]/35 bg-[#030c1d]/50 text-[#64a5ff] hover:border-[#3077ff]/70 hover:bg-[#1b4d9d]/20'
                  : 'border-blue-200 bg-white text-[#2563eb] hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <span>{t.hero.contactBtn}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
