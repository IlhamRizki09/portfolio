import { FolderGit2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { projects, type ProjectCover } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectsProps {
  isDark: boolean;
}

function TypographicCover({ cover }: { cover: ProjectCover }) {
  const header = (
    <div className="relative flex items-center justify-between gap-3">
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#7dd3fc]">
        {cover.kicker}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
        {cover.signature}
      </span>
    </div>
  );

  if (cover.variant === 'editorial') {
    return (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[radial-gradient(125%_125%_at_12%_118%,#105e73_0%,#083646_46%,#04161f_100%)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-2 h-40 w-40 rounded-full bg-[#f59e0b]/20 blur-[52px]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-14 bottom-0 h-44 w-44 rounded-full bg-[#22d3ee]/20 blur-[50px]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-14 top-11 h-px w-24 -rotate-12 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0_4px,transparent_4px_10px)]"
        />

        <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
          {header}

          <div className="relative">
            <p className="bg-gradient-to-br from-white via-white to-[#a5f3fc] bg-clip-text font-serif text-[clamp(2.6rem,6.4vw,3.9rem)] font-semibold italic leading-[0.78] tracking-[-0.045em] text-transparent">
              {cover.headline[0]}
            </p>
            <p className="mt-0.5 font-serif text-[clamp(1.05rem,2.3vw,1.4rem)] font-semibold italic leading-none tracking-[-0.01em] text-[#fbbf24] [text-shadow:0_1px_18px_rgba(251,191,36,0.35)]">
              {cover.headline[1]}
            </p>
            <div className="mt-2.5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 shrink-0 bg-gradient-to-r from-[#fbbf24]/80 to-transparent sm:w-16"
              />
              <p className="font-mono text-[7.5px] uppercase leading-[1.6] tracking-[0.2em] text-white/45 sm:text-[8px]">
                {cover.footnote}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[linear-gradient(142deg,#182444_0%,#0a1226_56%,#04070f_100%)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-[#3b82f6]/30 blur-[54px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-2 select-none font-serif text-[6rem] font-black leading-none tracking-[-0.07em] text-white/[0.06] sm:text-[7.5rem]"
      >
        KN
      </span>

      <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
        {header}

        <p className="text-[clamp(1.1rem,2.5vw,1.45rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.025em] text-white">
          {cover.headline.map((line, index) => (
            <span
              key={line}
              className={`block ${index === cover.headline.length - 1 ? 'text-[#60a5fa]' : ''}`}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function Projects({ isDark }: ProjectsProps) {
  const { t } = usePortfolio();

  const actionClass = `inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:-translate-y-0.5 ${
    isDark
      ? 'border-white/15 bg-white/[0.03] text-slate-100 hover:border-[#3b82f6]/60 hover:bg-[#2c67ed]/15'
      : 'border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50'
  }`;

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
        ) : (
          <div className="grid items-stretch gap-4 md:auto-rows-fr md:grid-cols-2">
            {projects.map((project, index) => {
              const href = project.liveUrl || project.designUrl || project.repoUrl;

              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: (index % 2) * 0.07 }}
                  className="glass-card flex h-full flex-col overflow-hidden"
                >
                  <TypographicCover cover={project.cover} />

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5">
                    <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-[#6c9dff]' : 'text-[#2563eb]'}`}>
                      {project.category}
                    </p>

                    <h3
                      className={`mt-2.5 text-[1.1rem] font-extrabold leading-[1.26] sm:text-[1.2rem] ${
                        isDark ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`mt-2.5 line-clamp-4 text-[13.5px] leading-[1.75] ${
                        isDark ? 'text-[#aab4c6]' : 'text-slate-600'
                      }`}
                    >
                      {project.description}
                    </p>

                    <p
                      className={`mt-3.5 text-[12.5px] font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {project.tech.join(', ')}
                    </p>

                    <div className={`mt-auto border-t pt-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={actionClass}
                        >
                          <span>{t.projects.viewLive}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
