import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Card3DTilt from '../components/Card3DTilt';
import { educations } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface EducationProps {
  isDark: boolean;
}

export default function Education({ isDark }: EducationProps) {
  const { t } = usePortfolio();

  return (
    <section
      id="education"
      className={`section-py transition-colors duration-300 ${
        isDark ? 'bg-[#0E162B]' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="container-custom">
        <SectionHeading
          label={t.education.label}
          title={t.education.title}
          subtitle={t.education.subtitle}
          isDark={isDark}
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Card3DTilt isDark={isDark} className="p-6 sm:p-7 flex flex-col justify-between h-full">
                <div>
                  {/* Top Badge & Period */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#386BFF]/15 text-[#28D6E8] border border-[#386BFF]/25 uppercase tracking-wider">
                      {edu.status}
                    </span>
                    <span className="text-xs font-semibold text-[#9AA6C0] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#386BFF]" />
                      {edu.period}
                    </span>
                  </div>

                  {/* Institution & Major */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#386BFF]/20 to-[#7855E8]/20 border border-[#386BFF]/30 flex items-center justify-center text-[#386BFF] flex-shrink-0 shadow-sm">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3
                        className={`text-lg sm:text-xl font-black tracking-tight ${
                          isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                        }`}
                      >
                        {edu.institution}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-[#386BFF]">
                        {edu.major}
                      </p>
                      <p className="text-xs text-[#9AA6C0] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#28D6E8]" />
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  {/* Academic Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'
                    }`}
                  >
                    {edu.description}
                  </p>
                </div>

                {/* Highlights */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="pt-3.5 border-t border-inherit space-y-1.5">
                    {edu.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#9AA6C0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#28D6E8] flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
