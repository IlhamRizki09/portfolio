import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Mail,
  CreditCard,
  Eye,
  FileText,
  GraduationCap,
} from 'lucide-react';
import { personalInfo, heroTypingTexts } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { gmailComposeUrl } from '../utils/gmail';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/Icons';
import MagneticButton from '../components/MagneticButton';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const { lang, t, openCv, openCard } = usePortfolio();
  const typingList = heroTypingTexts[lang] || heroTypingTexts.id;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const currentFullText = typingList[currentTextIndex % typingList.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentFullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typingList.length);
      }, 300);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentFullText.substring(0, displayText.length - 1)
              : currentFullText.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, typingList]);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socialClass = `inline-flex h-9 w-9 items-center justify-center rounded-[11px] border transition-all duration-200 hover:-translate-y-0.5 ${
    isDark
      ? 'border-white/10 bg-white/[0.05] text-[#93c5fd] hover:border-[#2c67ed]/50 hover:bg-[#2c67ed]/20 hover:text-white'
      : 'border-slate-200 bg-white text-[#2563eb] shadow-sm hover:border-blue-300 hover:bg-blue-50'
  }`;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-20 lg:pt-28"
    >
      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-8">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <h1 className="hero-gradient-text m-0 text-[clamp(2.2rem,6vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">
              Welcome to
            </h1>
            <h1
              className={`m-0 text-[clamp(2.2rem,6vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.025em] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              My Portfolio
            </h1>

            {/* Typewriter row */}
            <div className="mt-3 flex h-[34px] items-center">
              <span
                className={`text-[clamp(1.1rem,2.5vw,1.35rem)] font-medium tracking-[0.02em] ${
                  isDark ? 'text-[#93c5fd]' : 'text-[#1d4ed8]'
                }`}
              >
                {displayText}
              </span>
              <span className="ml-1 inline-block h-[22px] w-[2px] rounded-sm bg-[#2c67ed] animate-cursor-blink" />
            </div>

            <p
              className={`mt-5 max-w-[560px] text-[clamp(0.95rem,1.8vw,1.06rem)] font-light leading-[1.7] ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {t.hero.description}
            </p>

            {/* Primary actions */}
            <div className="mt-8 grid w-full max-w-[24rem] grid-cols-1 gap-3 min-[360px]:grid-cols-2">
              <MagneticButton
                onClick={() => handleScrollTo('#about')}
                className="btn-primary h-12 w-full whitespace-nowrap px-2 text-[12.5px] sm:text-sm"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="h-4 w-4 flex-shrink-0" />
              </MagneticButton>

              <a
                href={personalInfo.cvPath}
                download={personalInfo.cvFileName}
                className="btn-secondary h-12 w-full whitespace-nowrap px-2 text-[12.5px] sm:text-sm"
                title="Download CV Langsung"
              >
                <Download className="h-4 w-4 flex-shrink-0" />
                <span>{t.hero.downloadCvBtn}</span>
              </a>
            </div>

            {/* Find me */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="eyebrow">Find me</span>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub"
                  className={socialClass}
                >
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  title="Instagram"
                  className={socialClass}
                >
                  <InstagramIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                  className={socialClass}
                >
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={gmailComposeUrl('Inquiry via Portfolio', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct Email"
                  title="Email"
                  className={socialClass}
                >
                  <Mail className="h-[18px] w-[18px]" />
                </a>

                <span
                  className={`mx-1 hidden h-6 w-px sm:block ${
                    isDark ? 'bg-white/12' : 'bg-slate-200'
                  }`}
                />

                <button
                  onClick={openCv}
                  aria-label="Preview CV"
                  title="Preview CV Online"
                  className={socialClass}
                >
                  <Eye className="h-[18px] w-[18px]" />
                </button>
                <button
                  onClick={openCard}
                  aria-label={t.hero.businessCardBtn}
                  title={t.hero.businessCardBtn}
                  className={socialClass}
                >
                  <CreditCard className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right column: interactive lanyard card */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative hidden justify-center lg:flex lg:justify-end lg:pr-4 xl:pr-10"
          >
            <div className="relative w-[292px] xl:w-[318px]">
              {/* Lanyard strap */}
              <div
                className={`absolute left-1/2 top-[-132px] flex h-[168px] w-11 -translate-x-1/2 items-start justify-center rounded-b-[10px] border shadow-xl ${
                  isDark
                    ? 'border-white/10 bg-gradient-to-b from-[#111827] to-[#05070d]'
                    : 'border-slate-300 bg-gradient-to-b from-slate-800 to-slate-900'
                }`}
              >
                <span className="mt-3 select-none text-[10px] font-bold uppercase tracking-[0.32em] text-slate-300 [writing-mode:vertical-rl]">
                  Ilham Rizki
                </span>
              </div>

              {/* Metal clip */}
              <div className="absolute left-1/2 top-[-22px] z-20 h-9 w-14 -translate-x-1/2 rounded-md border border-white/30 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 shadow-lg">
                <span className="absolute left-1/2 top-1/2 h-3.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/60 bg-slate-700/80" />
              </div>

              <motion.div
                animate={{ y: [0, -9, 0], rotate: [-4, -2.6, -4] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.025, rotate: -1 }}
                className={`relative rounded-[22px] border p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ${
                  isDark
                    ? 'border-white/20 bg-gradient-to-b from-[#151d2f] to-[#080c16]'
                    : 'border-slate-300 bg-gradient-to-b from-white to-slate-100'
                }`}
              >
                {/* Card header */}
                <div className="mb-2.5 flex items-center justify-between px-1">
                  <span
                    className={`font-mono text-[8px] font-bold uppercase tracking-[0.22em] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Student ID
                  </span>
                  <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#38bdf8]">
                    <GraduationCap className="h-3 w-3" />
                    UPGRIS
                  </span>
                </div>

                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15">
                  {!imgError ? (
                    <img
                      src={personalInfo.profileImagePath}
                      alt={personalInfo.name}
                      className="h-full w-full object-cover object-top"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#2c67ed]/20 font-mono text-2xl font-bold text-[#38bdf8]">
                      MIR
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.28em] text-[#60a5fa]">
                      Portfolio
                    </p>
                    <p className="mt-0.5 text-[15px] font-extrabold leading-tight text-white">
                      Muhammad Ilham Rizki
                    </p>
                    <p className="text-[10px] font-medium text-slate-300">
                      Informatika Â· Semester {personalInfo.semester}
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-2.5 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-[#38bdf8]" />
                    <span
                      className={`font-mono text-[8px] uppercase tracking-[0.16em] ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {personalInfo.university}
                    </span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

