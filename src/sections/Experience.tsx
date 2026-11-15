import { motion } from 'framer-motion';
import { Briefcase, Award, Users, CheckCircle2, Code2, Layers } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import {
  experiences,
  projects,
  certificates,
  skillCategories,
} from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ExperienceProps {
  isDark: boolean;
}

export default function Experience({ isDark }: ExperienceProps) {
  const { t, lang } = usePortfolio();

  const uniqueSkills = new Set(
    skillCategories.flatMap((cat) => cat.skills.map((skill) => skill.name.toLowerCase()))
  ).size;

  const stats = [
    {
      icon: Code2,
      value: projects.length,
      label: t.nav.projects,
      description: lang === 'id' ? 'Karya yang dibuat' : 'Works created',
      target: '#projects',
    },
    {
      icon: Award,
      value: certificates.length,
      label: t.nav.certificates,
      description: lang === 'id' ? 'Skill yang divalidasi' : 'Validated skills',
      target: '#certificates',
    },
    {
      icon: Layers,
      value: uniqueSkills,
      label: t.nav.skills,
      description: lang === 'id' ? 'Teknologi dikuasai' : 'Technologies mastered',
      target: '#skills',
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="experience" className="relative section-py pt-8 sm:pt-10">
      <div className="container-custom">
        <SectionHeading
          title={t.experience.title}
          subtitle={t.experience.subtitle}
          isDark={isDark}
          align="left"
        />

        <div className="grid items-stretch gap-4 md:auto-rows-fr md:grid-cols-2">
          {experiences.map((exp, index) => {
            const Icon =
              exp.roleType === 'committee'
                ? Award
                : exp.roleType === 'organization'
                ? Users
                : Briefcase;

            return (
              <motion.article
                key={`${exp.title}-${exp.organization}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (index % 2) * 0.06 }}
                className="glass-card flex h-full min-w-0 gap-4 p-4 sm:p-5"
              >
                <span
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${
                    isDark
                      ? 'border-[#3b82f6]/20 bg-[#25457b]/30 text-[#9ec5ff]'
                      : 'border-blue-100 bg-blue-50 text-[#2563eb]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3
                      className={`text-[0.98rem] font-bold leading-snug sm:text-[1.05rem] ${
                        isDark ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {exp.title}
                    </h3>
                    {exp.period && (
                      <span className="font-mono text-[10px] font-semibold text-[#82baff]">
                        {exp.period}
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-[13px] font-semibold text-[#60a5fa]">
                    {exp.organization}
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-md border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${
                      isDark
                        ? 'border-white/10 bg-white/5 text-slate-400'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {exp.type}
                  </span>

                  <p
                    className={`mt-2 text-[12.5px] leading-relaxed ${
                      isDark ? 'text-[#aeb8cc]' : 'text-slate-600'
                    }`}
                  >
                    {exp.description}
                  </p>

                  {exp.responsibilities.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          className={`flex items-start gap-1.5 text-[11.5px] leading-relaxed ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#38bdf8]" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.a
                key={stat.label}
                href={stat.target}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(stat.target);
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="glass-card group relative min-h-[168px] cursor-pointer overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3b82f6]/40"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-[54px] w-[54px] items-center justify-center rounded-[14px] border ${
                      isDark
                        ? 'border-[#3b82f6]/20 bg-[#25457b]/30 text-[#9ec5ff]'
                        : 'border-blue-100 bg-blue-50 text-[#2563eb]'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <strong
                    className={`text-[clamp(2.5rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.06em] ${
                      isDark ? 'text-[#f4f5ff]' : 'text-slate-900'
                    }`}
                  >
                    {stat.value}
                  </strong>
                </div>
                <h3
                  className={`mt-5 text-[0.84rem] font-extrabold uppercase tracking-[0.09em] ${
                    isDark ? 'text-[#e7ecfa]' : 'text-slate-800'
                  }`}
                >
                  {stat.label}
                </h3>
                <p className={`mt-1 text-sm ${isDark ? 'text-[#a4aec1]' : 'text-slate-500'}`}>
                  {stat.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
