import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  User,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  FolderGit2,
  Mail,
  FileText,
  CreditCard,
  SunMoon,
  Languages,
  Sparkles,
  CornerDownLeft,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function CommandPalette() {
  const {
    isDark,
    toggleTheme,
    toggleLang,
    isCmdOpen,
    closeCmd,
    openCv,
    openCard,
    toggleRecruiterMode,
    t,
  } = usePortfolio();

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCmdOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCmdOpen]);

  const scrollToSection = (id: string) => {
    closeCmd();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const commands = [
    // Sections
    {
      id: 'home',
      group: t.cmdPalette.navigation,
      title: 'Home',
      icon: Home,
      action: () => scrollToSection('#home'),
    },
    {
      id: 'about',
      group: t.cmdPalette.navigation,
      title: 'About Me',
      icon: User,
      action: () => scrollToSection('#about'),
    },
    {
      id: 'skills',
      group: t.cmdPalette.navigation,
      title: 'Skills & Technologies',
      icon: Cpu,
      action: () => scrollToSection('#skills'),
    },
    {
      id: 'experience',
      group: t.cmdPalette.navigation,
      title: 'Experience & Track Record',
      icon: Briefcase,
      action: () => scrollToSection('#experience'),
    },
    {
      id: 'education',
      group: t.cmdPalette.navigation,
      title: 'Education',
      icon: GraduationCap,
      action: () => scrollToSection('#education'),
    },
    {
      id: 'certificates',
      group: t.cmdPalette.navigation,
      title: 'Certificates & Credentials',
      icon: Award,
      action: () => scrollToSection('#certificates'),
    },
    {
      id: 'projects',
      group: t.cmdPalette.navigation,
      title: 'Projects Showcase',
      icon: FolderGit2,
      action: () => scrollToSection('#projects'),
    },
    {
      id: 'contact',
      group: t.cmdPalette.navigation,
      title: 'Contact & Inquiries',
      icon: Mail,
      action: () => scrollToSection('#contact'),
    },
    // Quick Actions
    {
      id: 'recruiter',
      group: t.cmdPalette.quickActions,
      title: t.cmdPalette.recruiterToggle,
      icon: Sparkles,
      action: () => {
        closeCmd();
        toggleRecruiterMode();
      },
    },
    {
      id: 'cv',
      group: t.cmdPalette.quickActions,
      title: t.cmdPalette.openCv,
      icon: FileText,
      action: () => {
        closeCmd();
        openCv();
      },
    },
    {
      id: 'card',
      group: t.cmdPalette.quickActions,
      title: t.cmdPalette.openCard,
      icon: CreditCard,
      action: () => {
        closeCmd();
        openCard();
      },
    },
    {
      id: 'theme',
      group: t.cmdPalette.quickActions,
      title: t.cmdPalette.themeToggle,
      icon: SunMoon,
      action: () => {
        closeCmd();
        toggleTheme();
      },
    },
    {
      id: 'lang',
      group: t.cmdPalette.quickActions,
      title: t.cmdPalette.langToggle,
      icon: Languages,
      action: () => {
        closeCmd();
        toggleLang();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.group.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isCmdOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCmd}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-2xl z-10 ${
              isDark
                ? 'bg-[#0a0f20]/95 border-[#2c67ed]/30 text-[#f5f7ff] shadow-black/80'
                : 'bg-white/95 border-[#2c67ed]/35 text-[#050510] shadow-2xl'
            }`}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-inherit">
              <Search className="w-5 h-5 text-[#2c67ed]" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={t.cmdPalette.placeholder}
                className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-[#94a3b8]"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-white/10 text-[#94a3b8] border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#94a3b8]">
                  {t.cmdPalette.noResults}
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-[#2c67ed]/20 text-[#38bdf8]'
                            : 'bg-[#2c67ed]/15 text-[#2c67ed]'
                          : isDark
                          ? 'text-[#f5f7ff] hover:bg-white/5'
                          : 'text-[#050510] hover:bg-black/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#2c67ed] text-white shadow-sm shadow-[#2c67ed]'
                              : isDark
                              ? 'bg-[#142B59]/60 text-[#94a3b8]'
                              : 'bg-blue-50 text-[#2c67ed]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold">{cmd.title}</p>
                          <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">
                            {cmd.group}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <CornerDownLeft className="w-4 h-4 text-[#38bdf8]" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hint */}
            <div
              className={`px-4 py-2.5 text-[11px] border-t flex items-center justify-between text-[#94a3b8] ${
                isDark ? 'border-white/5 bg-[#050510]/50' : 'border-black/5 bg-gray-50'
              }`}
            >
              <span>{t.cmdPalette.hint}</span>
              <span className="font-mono text-[10px]">MIR. CMD</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

