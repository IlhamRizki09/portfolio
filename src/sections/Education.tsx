import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { educations } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface EducationProps {
  isDark: boolean;
}

export default function Education({ isDark }: EducationProps) {
  const { t } = usePortfolio();

  return (
    <section id="education" className="relative section-py pb-10 sm:pb-12">
      <div className="container-custom">
        <SectionHeading
          title={t.education.title}
          subtitle={t.education.subtitle}
          isDark={isDark}
          align="left"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {educations.map((edu, index) => (
            <motion.article
              key={edu.institution}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card flex gap-4 p-5"
            >
              <span
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border ${
                  isDark
                    ? 'border-[#3b82f6]/20 bg-[#25457b]/30 text-[#9ec5ff]'
                    : 'border-blue-100 bg-blue-50 text-[#2563eb]'
                }`}
              >
                <GraduationCap className="h-6 w-6" />
              </span>

              <div className="min-w-0">
                <h3
                  className={`text-[1rem] font-bold leading-snug sm:text-[1.08rem] ${
                    isDark ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {edu.institution}
                </h3>
                <p className="mt-0.5 text-[13px] font-semibold text-[#60a5fa]">{edu.major}</p>

                <div
                  className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <span className="inline-flex items-center gap-1 font-mono font-semibold text-[#82baff]">
                    <Calendar className="h-3 w-3" />
                    {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {edu.location}
                  </span>
                  <span
                    className={`inline-flex rounded-md border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${
                      isDark
                        ? 'border-white/10 bg-white/5 text-slate-400'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {edu.status}
                  </span>
                </div>

                <p
                  className={`mt-2.5 text-[12.5px] leading-relaxed ${
                    isDark ? 'text-[#aeb8cc]' : 'text-slate-600'
                  }`}
                >
                  {edu.description}
                </p>

                {edu.highlights.length > 0 && (
                  <ul className="mt-2.5 space-y-1">
                    {edu.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className={`flex items-start gap-1.5 text-[11.5px] leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#38bdf8]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
