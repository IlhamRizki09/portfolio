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

  const getSkillIcon = (iconName: string) => {
    const icons: Record<string, typeof Code2> = {
      code: Code2,
      users: Users,
      'check-circle': CheckCircle2,
      award: Award,
      sparkles: Sparkles,
      'edit-3': FileEdit,
      javascript: Code2,
      php: Server,
      python: Code2,
      html: Layout,
      css: Layout,
      react: Layers,
      tailwind: Layout,
      database: Server,
      nodejs: Server,
      git: Wrench,
      vscode: Code2,
      figma: Layout,
      vite: Wrench,
      network: Server,
      cpu: Server,
    };
    return icons[iconName] || Code2;
  };

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

  return (
    <section id="skills" className="relative section-py">
      <div className="container-custom overflow-x-clip">
        <SectionHeading
          title={t.skills.title}
          subtitle={t.skills.subtitle}
          isDark={isDark}
        />

        {/* Category Filter Tabs */}
        <div
          className={`mx-auto mb-10 grid w-full max-w-md grid-cols-2 gap-1.5 rounded-2xl border p-1.5 backdrop-blur-xl sm:flex sm:w-fit sm:max-w-full sm:flex-wrap sm:items-center sm:justify-center lg:flex-nowrap ${
            isDark ? 'border-white/10 bg-[#0a0f20]/60' : 'border-slate-200 bg-white/70'
          }`}
        >
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`tab-btn w-full cursor-pointer sm:w-auto ${
                  isActive ? 'tab-btn-active' : isDark ? '' : 'text-slate-600'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
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
          <motion.div layout className="flex flex-wrap justify-center gap-4">
            {displayedSkills.map((skill, index) => {
              const IconComp = getSkillIcon(skill.icon);
              return (
                <motion.div
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] md:w-[calc(25%-0.75rem)] xl:w-[calc(16.6667%-0.834rem)]"
                >
                  <div className="skill-card group h-full">
                    <div
                      className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 ${
                        isDark
                          ? 'border-[#3b82f6]/25 bg-gradient-to-tr from-[#2c67ed]/15 to-[#38bdf8]/10 text-[#7dd3fc]'
                          : 'border-blue-100 bg-gradient-to-tr from-blue-50 to-sky-50 text-[#2563eb]'
                      }`}
                    >
                      <IconComp className="h-6 w-6" />
                    </div>

                    <h3
                      className={`flex min-h-[2.5rem] items-center justify-center text-balance text-xs font-bold leading-snug tracking-tight sm:text-sm ${
                        isDark ? 'text-[#d8deeb]' : 'text-slate-800'
                      }`}
                    >
                      {skill.name}
                    </h3>

                    <span className="mt-auto pt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#818a9b]">
                      {categoryLabel(skill.category)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

