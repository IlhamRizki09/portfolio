import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
}

export default function Navbar({ activeSection, isScrolled }: NavbarProps) {
  const { isDark, toggleTheme, lang, t, toggleRecruiterMode, isRecruiterMode, openCmd } = usePortfolio();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#080D1C]/85 backdrop-blur-xl border-b border-[#386BFF]/20 shadow-lg shadow-black/50'
            : 'bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm'
          : isDark
          ? 'bg-[#080D1C]/60 backdrop-blur-md border-b border-transparent'
          : 'bg-white/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand: MIR. */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-[#386BFF] via-[#7855E8] to-[#28D6E8] shadow-md shadow-[#386BFF]/25 group-hover:shadow-[#28D6E8]/40 transition-all duration-300">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center font-black text-sm tracking-tight transition-colors ${
                  isDark ? 'bg-[#080D1C] text-[#F5F7FF]' : 'bg-white text-[#080D1C]'
                }`}
              >
                MIR<span className="text-[#28D6E8]">.</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-black tracking-tight">
                <span className={isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'}>
                  MUHAMMAD ILHAM RIZKI
                </span>
              </span>
              <span className="text-[10px] font-bold text-[#386BFF] tracking-wider uppercase">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const label = lang === 'id' ? item.labelId : item.labelEn;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-normal border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-[#386BFF]/20 border-[#386BFF]/50 text-[#28D6E8] shadow-sm shadow-[#386BFF]/20'
                        : 'bg-[#386BFF]/10 border-[#386BFF]/40 text-[#2E5BE5]'
                      : isDark
                      ? 'bg-transparent border-transparent text-[#9AA6C0] hover:text-[#F5F7FF] hover:bg-white/5'
                      : 'bg-transparent border-transparent text-[#4B556D] hover:text-[#080D1C] hover:bg-black/5'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Action Center: Recruiter Mode, Cmd, Lang, Theme, Mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Recruiter Mode Toggle Button */}
            <button
              onClick={toggleRecruiterMode}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                isRecruiterMode
                  ? 'bg-gradient-to-r from-[#386BFF] to-[#28D6E8] text-white border-transparent shadow-md shadow-[#386BFF]/30'
                  : isDark
                  ? 'bg-[#142B59]/40 border-[#386BFF]/30 text-[#28D6E8] hover:bg-[#142B59]/70'
                  : 'bg-blue-50 border-blue-200 text-[#2E5BE5] hover:bg-blue-100'
              }`}
              title="Fast Candidate Summary for Recruiters"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.recruiterMode}</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={openCmd}
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer ${
                isDark
                  ? 'bg-[#0E162B] border-white/10 text-[#9AA6C0] hover:text-white hover:border-[#386BFF]/40'
                  : 'bg-gray-100 border-gray-200 text-[#4B556D] hover:text-black'
              }`}
              title="Open Command Palette (Ctrl + K)"
            >
              <Command className="w-3.5 h-3.5 text-[#386BFF]" />
              <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-black/20 text-[#9AA6C0]">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher */}
            <LanguageToggle />

            {/* Theme Switcher */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {/* Hamburger Button for Mobile/Tablet */}
            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className={`xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                isDark
                  ? 'bg-[#0E162B] hover:bg-[#142B59] border-[#386BFF]/25 text-[#F5F7FF]'
                  : 'bg-white hover:bg-blue-50 border-blue-200 text-[#080D1C]'
              }`}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`xl:hidden overflow-hidden border-b ${
              isDark
                ? 'bg-[#080D1C]/98 backdrop-blur-2xl border-[#386BFF]/20 shadow-2xl'
                : 'bg-white/98 backdrop-blur-2xl border-blue-100 shadow-xl'
            }`}
          >
            <div className="container-custom py-4 space-y-1.5">
              {/* Recruiter button in mobile drawer */}
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  toggleRecruiterMode();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#386BFF]/20 to-[#28D6E8]/20 border border-[#386BFF]/40 text-[#28D6E8] mb-2"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.nav.recruiterMode}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-[#386BFF]/30">
                  Priority
                </span>
              </button>

              {navItems.map((item) => {
                const label = lang === 'id' ? item.labelId : item.labelEn;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      isActive
                        ? isDark
                          ? 'bg-[#386BFF]/20 border-[#386BFF]/40 text-[#28D6E8]'
                          : 'bg-[#386BFF]/10 border-[#386BFF]/30 text-[#2E5BE5]'
                        : isDark
                        ? 'bg-transparent border-transparent text-[#9AA6C0] hover:text-[#F5F7FF] hover:bg-white/5'
                        : 'bg-transparent border-transparent text-[#4B556D] hover:text-[#080D1C] hover:bg-black/5'
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
