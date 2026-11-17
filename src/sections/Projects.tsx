import { FolderGit2, ArrowUpRight, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  const { t } = usePortfolio();

  const chipClass = `rounded-md border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] ${
    isDark
      ? 'border-white/10 bg-white/5 text-slate-400'
      : 'border-slate-200 bg-slate-50 text-slate-500'
  }`;

  const actionClass = `inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-all hover:-translate-y-0.5 ${
    isDark
      ? 'border-[#3077ff]/35 bg-[#030c1d]/50 text-[#64a5ff] hover:border-[#3077ff]/70 hover:bg-[#1b4d9d]/20'
      : 'border-blue-200 bg-white text-[#2563eb] hover:border-blue-400 hover:bg-blue-50'
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
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.07 }}
                className="glass-card flex h-full flex-col overflow-hidden"
              >
                {/* Typographic cover */}
                <div className="relative flex min-h-[126px] shrink-0 items-end overflow-hidden px-5 pb-4 pt-12">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(135deg,#12233f_0%,#0a1424_55%,#070b14_100%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#2c67ed]/25 blur-[42px]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-3 left-4 select-none font-mono text-[42px] font-black uppercase leading-none tracking-[-0.03em] text-white/[0.08]"
                  >
                    {project.coverText}
                  </span>
                  <div className="relative flex w-full items-center justify-between gap-3">
                    <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.24em] text-[#7dd3fc]">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] font-bold tabular-nums text-white/35">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className={`text-[1.02rem] font-extrabold leading-snug ${
                      isDark ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`mt-2 text-[12.5px] leading-relaxed ${
                      isDark ? 'text-[#aeb8cc]' : 'text-slate-600'
                    }`}
                  >
                    {project.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((item) => (
                      <li key={item} className={chipClass}>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-auto flex flex-wrap items-center gap-2 border-t pt-4 ${
                      isDark ? 'border-white/10' : 'border-slate-200'
                    }`}
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionClass}
                      >
                        <span>{t.projects.viewLive}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.designUrl && (
                      <a
                        href={project.designUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionClass}
                      >
                        <PenTool className="h-3.5 w-3.5" />
                        <span>{t.projects.viewDesign}</span>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionClass}
                      >
                        <span>{t.projects.sourceCode}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
