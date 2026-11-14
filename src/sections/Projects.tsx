import { FolderGit2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';
import { projects } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  const { t } = usePortfolio();

  return (
    <section
      id="projects"
      className={`section-py transition-colors duration-300 ${
        isDark ? 'bg-[#0E162B]' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="container-custom">
        <SectionHeading
          label={t.projects.label}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
          isDark={isDark}
        />

        {projects.length === 0 ? (
          <EmptyState
            title={t.projects.emptyTitle}
            description={t.projects.emptyDesc}
            icon={FolderGit2}
            isDark={isDark}
          />
        ) : null}
      </div>
    </section>
  );
}
