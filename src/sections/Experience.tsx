import { motion } from 'framer-motion';
import { Briefcase, Award, Users, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Card3DTilt from '../components/Card3DTilt';
import { experiences } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ExperienceProps {
  isDark: boolean;
}

export default function Experience({ isDark }: ExperienceProps) {
  const { t } = usePortfolio();

  return (
    <section
      id="experience"
      className={`section-py transition-colors duration-300 ${
        isDark ? 'bg-[#080D1C]' : 'bg-[#F5F7FF]'
      }`}
    >
      <div className="container-custom">
        <SectionHeading
          label={t.experience.label}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
          isDark={isDark}
        />

        {/* Vertical Timeline Architecture */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#386BFF] via-[#7855E8] to-[#28D6E8] -translate-x-1/2 opacity-30 pointer-events-none" />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const Icon =
                exp.roleType === 'committee'
                  ? Award
                  : exp.roleType === 'organization'
                  ? Users
                  : Briefcase;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative flex flex-col sm:flex-row items-start"
                >
                  {/* Timeline Central Marker Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-5 z-20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#080D1C] border-2 border-[#386BFF] flex items-center justify-center shadow-lg shadow-[#386BFF]/40">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28D6E8]" />
                    </div>
                  </div>

                  {/* Card Container (Offsetting alternating sides on desktop) */}
                  <div
                    className={`w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0 ${
                      isEven ? 'sm:mr-auto sm:pr-2' : 'sm:ml-auto sm:pl-8'
                    }`}
                  >
                    <Card3DTilt isDark={isDark} className="p-5 sm:p-6 border-l-4 border-l-[#386BFF]">
                      {/* Header with Type Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#386BFF]/15 text-[#28D6E8] border border-[#386BFF]/25 uppercase tracking-wider">
                          {exp.type}
                        </span>
                        {exp.period && (
                          <span className="text-[11px] font-semibold text-[#9AA6C0]">
                            {exp.period}
                          </span>
                        )}
                      </div>

                      {/* Title & Organization */}
                      <h3
                        className={`text-base sm:text-lg font-black tracking-tight ${
                          isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                        }`}
                      >
                        {exp.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#386BFF] mb-3 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{exp.organization}</span>
                      </p>

                      {/* Description */}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-3.5 ${
                          isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'
                        }`}
                      >
                        {exp.description}
                      </p>

                      {/* Responsibilities list if available */}
                      {exp.responsibilities.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-inherit">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2 text-xs text-[#9AA6C0]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#28D6E8] flex-shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card3DTilt>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
