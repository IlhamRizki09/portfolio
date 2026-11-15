import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language, Translations } from '../translations';
import { translations } from '../translations';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface PortfolioContextType {
  isDark: boolean;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
  isRecruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  toggleRecruiterMode: () => void;
  isCvOpen: boolean;
  openCv: () => void;
  closeCv: () => void;
  isCardOpen: boolean;
  openCard: () => void;
  closeCard: () => void;
  isCmdOpen: boolean;
  openCmd: () => void;
  closeCmd: () => void;
  toggleCmd: () => void;
  isNotFoundOpen: boolean;
  openNotFound: () => void;
  closeNotFound: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mir-theme');
      if (saved) return saved === 'dark';
      return true;
    }
    return true;
  });

  // Language state
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mir-lang') as Language;
      if (saved === 'id' || saved === 'en') return saved;
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('id')) return 'id';
    }
    return 'id';
  });

  // Modals state
  const [isRecruiterMode, setRecruiterMode] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isNotFoundOpen, setIsNotFoundOpen] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('mir-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('mir-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('mir-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'id' ? 'en' : 'id'));
  }, []);

  const toggleRecruiterMode = useCallback(() => {
    setRecruiterMode((prev) => !prev);
  }, []);

  const openCv = useCallback(() => setIsCvOpen(true), []);
  const closeCv = useCallback(() => setIsCvOpen(false), []);

  const openCard = useCallback(() => setIsCardOpen(true), []);
  const closeCard = useCallback(() => setIsCardOpen(false), []);

  const openCmd = useCallback(() => setIsCmdOpen(true), []);
  const closeCmd = useCallback(() => setIsCmdOpen(false), []);
  const toggleCmd = useCallback(() => setIsCmdOpen((prev) => !prev), []);

  const openNotFound = useCallback(() => setIsNotFoundOpen(true), []);
  const closeNotFound = useCallback(() => setIsNotFoundOpen(false), []);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCmd();
      }
      if (e.key === 'Escape') {
        setIsCmdOpen(false);
        setIsCvOpen(false);
        setIsCardOpen(false);
        setIsNotFoundOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCmd]);

  const t = translations[lang];

  return (
    <PortfolioContext.Provider
      value={{
        isDark,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
        t,
        isRecruiterMode,
        setRecruiterMode,
        toggleRecruiterMode,
        isCvOpen,
        openCv,
        closeCv,
        isCardOpen,
        openCard,
        closeCard,
        isCmdOpen,
        openCmd,
        closeCmd,
        toggleCmd,
        isNotFoundOpen,
        openNotFound,
        closeNotFound,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
