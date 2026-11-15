import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Command, Search } from 'lucide-react';
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
  const { isDark, toggleTheme, lang, t, toggleRecruiterMode, isRecruiterMode, openCmd } =
    usePortfolio();
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

  const activeItem = navItems.find((item) => item.id === activeSection);
  const activeLabel = activeItem
    ? lang === 'id'
      ? activeItem.labelId
      : activeItem.labelEn
    : lang === 'id'
    ? 'Home'
    : 'Home';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-300 ${
        isScrolled ? 'pt-2.5' : 'pt-4 sm:pt-5'
      }`}
    >
      <div
        className={`flex w-full max-w-[560px] items-center justify-between gap-1 rounded-full border px-2 py-2 backdrop-blur-2xl transition-all duration-300 lg:w-auto lg:max-w-none ${
          isDark
            ? 'border-white/10 bg-[#0a0f20]/78 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.07)]'
            : 'border-slate-200/80 bg-white/85 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.9)]'
        }`}
      >
        {/* Left: theme switch (desktop) / theme + active label (mobile) */}
        <div className="flex min-w-0 items-center gap-1">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

          <span
            className={`px-1 text-xs font-bold tracking-tight lg:hidden ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {activeLabel}
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-0.5 lg:flex">
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
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? isDark
                      ? 'text-white'
                      : 'text-slate-900'
                    : isDark
                    ? 'text-slate-300/90 hover:bg-white/10 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <span
                    className={`absolute inset-0 rounded-full border ${
                      isDark
                        ? 'border-white/15 bg-gradient-to-br from-white/[0.18] to-[#3b82f6]/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_18px_rgba(59,130,246,0.2)]'
                        : 'border-blue-200 bg-blue-50/90 shadow-[0_6px_16px_-12px_rgba(37,99,235,0.5)]'
                    }`}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
        </nav>

        {/* Divider */}
        <span
          className={`mx-1 hidden h-6 w-px lg:block ${isDark ? 'bg-white/15' : 'bg-slate-200'}`}
        />

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <span className="hidden lg:inline-flex">
            <LanguageToggle />
          </span>

          <button
            onClick={openCmd}
            className="icon-btn hidden xl:inline-flex"
            title="Open Command Palette (Ctrl + K)"
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={toggleRecruiterMode}
            className={`hidden h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 lg:inline-flex ${
              isRecruiterMode
                ? 'border-transparent bg-gradient-to-r from-[#2c67ed] to-[#38bdf8] text-white shadow-md shadow-[#2c67ed]/30'
                : isDark
                ? 'border-white/10 bg-white/5 text-slate-300 hover:border-[#2c67ed]/45 hover:bg-[#2c67ed]/15 hover:text-white'
                : 'border-blue-100 bg-blue-50/70 text-[#2563eb] hover:border-blue-300 hover:bg-blue-100'
            }`}
            title={t.nav.recruiterMode}
            aria-label={t.nav.recruiterMode}
          >
            <Sparkles className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="icon-btn lg:hidden"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed left-4 right-4 top-[76px] z-50 lg:hidden"
          >
            <div
              className={`overflow-hidden rounded-3xl border p-3 backdrop-blur-2xl ${
                isDark
                  ? 'border-white/10 bg-[#080c18]/95 shadow-2xl shadow-black/60'
                  : 'border-slate-200 bg-white/95 shadow-2xl shadow-slate-900/10'
              }`}
            >
              <nav className="grid max-h-[62vh] gap-1 overflow-y-auto">
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
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? isDark
                            ? 'bg-white/10 text-white'
                            : 'bg-blue-50 text-[#1d4ed8]'
                          : isDark
                          ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />}
                    </a>
                  );
                })}
              </nav>

              <div
                className={`mt-2 flex items-center gap-2 border-t px-1 pt-3 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                <LanguageToggle />
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    toggleRecruiterMode();
                  }}
                  className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                    isRecruiterMode
                      ? 'border-transparent bg-gradient-to-r from-[#2c67ed] to-[#38bdf8] text-white'
                      : isDark
                      ? 'border-white/10 bg-white/5 text-slate-300'
                      : 'border-blue-100 bg-blue-50 text-[#2563eb]'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t.nav.recruiterMode}</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    openCmd();
                  }}
                  className="icon-btn"
                  aria-label="Open command palette"
                >
                  <Command className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
