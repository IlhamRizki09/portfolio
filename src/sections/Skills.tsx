import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Wrench,
  Layers,
  Sparkles,
  Users,
  Award,
  CheckCircle2,
  FileEdit,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Card3DTilt from '../components/Card3DTilt';
import EmptyState from '../components/EmptyState';
import type { SkillItem } from '../data/portfolioData';
import { skillCategories } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface SkillsProps {
  isDark: boolean;
}

export default function Skills({ isDark }: SkillsProps) {
  const { t } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: t.skills.allFilter, icon: Layers },
    { id: 'core-cv', label: 'Keahlian Inti (CV)', icon: Sparkles },
    { id: 'languages', label: 'Programming', icon: Code2 },
    { id: 'frontend', label: 'Frontend', icon: Layout },
    { id: 'backend-db', label: 'Backend & DB', icon: Server },
    { id: 'tools', label: 'Tools & Networking', icon: Wrench },
  ];

  // Aggregate or filter skills (deduplicated so shared stack items appear once)
  const seen = new Set<string>();
  const allSkills: SkillItem[] = skillCategories
    .flatMap((cat) => cat.skills)
    .filter((skill) => {
      const key = skill.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const displayedSkills =
    activeCategory === 'all'
      ? allSkills
      : skillCategories.find((cat) => cat.id === activeCategory)?.skills || [];

  const categoryLabel = (category: string) => {
    if (category === 'core-cv') return 'Verified CV';
    const labels: Record<string, string> = {
      languages: 'Programming',
      frontend: 'Frontend',
      'backend-db': 'Backend & DB',
      tools: 'Tools',
    };
    return labels[category] ?? category;
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return Users;
      case 'award':
        return Award;
      case 'check-circle':
        return CheckCircle2;
      case 'edit-3':
        return FileEdit;
      case 'code':
        return Code2;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="skills"
      className={`section-py transition-colors duration-300 ${
        isDark ? 'bg-[#0E162B]' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="container-custom overflow-x-clip">
        <SectionHeading
          label={t.skills.label}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
          isDark={isDark}
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#386BFF] to-[#7855E8] border-transparent text-white shadow-md shadow-[#386BFF]/25'
                    : isDark
                    ? 'bg-[#142B59]/30 border-[#386BFF]/20 text-[#9AA6C0] hover:text-[#F5F7FF] hover:border-[#386BFF]/40'
                    : 'bg-gray-50 border-gray-200 text-[#4B556D] hover:text-black hover:border-blue-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        {displayedSkills.length === 0 ? (
          <EmptyState
            title="Skill Category Empty"
            description={t.skills.emptyNote}
            isDark={isDark}
          />
        ) : (
          <motion.div
            layout
            className="flex flex-wrap justify-center gap-4"
          >
            {displayedSkills.map((skill, index) => {
              const IconComp = getSkillIcon(skill.icon);
              return (
                <motion.div
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] md:w-[calc(25%-0.75rem)] xl:w-[calc(16.6667%-0.834rem)]"
                >
                  <Card3DTilt isDark={isDark} className="p-4 h-full text-center flex flex-col items-center group">
                    {/* Skill Tech Icon / Monogram */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-tr from-[#386BFF]/15 to-[#28D6E8]/10 border border-[#386BFF]/25 text-[#28D6E8] group-hover:border-[#28D6E8]/60 group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <IconComp className="w-5 h-5 text-[#386BFF] group-hover:text-[#28D6E8]" />
                    </div>

                    <h3
                      className={`text-xs sm:text-sm font-bold tracking-tight leading-snug min-h-[2.5rem] flex items-center justify-center text-balance ${
                        isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                      }`}
                    >
                      {skill.name}
                    </h3>

                    <span className="mt-auto pt-1 text-[10px] font-semibold text-[#9AA6C0] uppercase tracking-wider">
                      {categoryLabel(skill.category)}
                    </span>
                  </Card3DTilt>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
