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
          {/* Mobile lanyard card */}
          <motion.div
            initial={{ opacity: 0, y: -260 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 115, damping: 13, mass: 1.15, delay: 0.18 }}
            className="relative -mt-6 mb-4 flex flex-col items-center justify-center overflow-visible lg:hidden"
          >
            <motion.div
              drag
              dragSnapToOrigin
              dragConstraints={{ left: -55, right: 55, top: -12, bottom: 36 }}
              dragElastic={0.12}
              animate={{ rotate: [-2.2, 2.2, -2.2] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.15 }}
              style={{ transformOrigin: '50% 0%', touchAction: 'none' }}
              className="relative flex flex-col items-center"
            >
            {/* The whole hanging assembly falls in, then responds to the card's swing. */}
            <div
              aria-hidden="true"
              className="relative z-0 flex h-[178px] w-[76px] flex-col items-center"
            >
              {/* Woven polyester strap with stitched edges, ribbing, and a satin highlight */}
              <div className="relative h-[160px] w-[50px] overflow-hidden rounded-b-[9px] border-x border-white/15 bg-[linear-gradient(90deg,#080b12_0%,#283346_8%,#151c29_18%,#0a0e17_32%,#273348_50%,#111722_68%,#090c13_84%,#354155_94%,#111722_100%)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.34),inset_0_-12px_18px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-y-0 left-[5px] w-px bg-white/25 shadow-[1px_0_1px_rgba(0,0,0,0.7)]" />
                <div className="absolute inset-y-0 right-[5px] w-px bg-black/70 shadow-[1px_0_1px_rgba(255,255,255,0.18)]" />
                <div className="absolute inset-y-0 left-1/2 w-[25px] -translate-x-1/2 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_1px,transparent_1px,transparent_4px)] opacity-75" />
                <span className="absolute inset-0 flex items-center justify-center select-none font-mono text-[9px] font-black uppercase tracking-[0.28em] text-slate-200/90 [writing-mode:vertical-rl] [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                  Ilham Rizki
                </span>
              </div>
              {/* Reinforced stitched strap end */}
              <div className="relative z-10 -mt-px h-[13px] w-[58px] rounded-[3px] border border-white/30 bg-[linear-gradient(180deg,#465366,#1c2533_38%,#080b11_100%)] shadow-[0_4px_7px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-x-1 top-[3px] border-t border-dashed border-white/35" />
                <div className="absolute inset-x-1 bottom-[3px] border-t border-dashed border-black/70" />
              </div>
            </div>

            {/* Polished swivel clasp and connecting split ring */}
            <div aria-hidden="true" className="relative z-10 -mt-[7px] flex flex-col items-center">
              <div className="relative h-[30px] w-[56px] rounded-[7px] border border-white/55 bg-[linear-gradient(110deg,#566171_0%,#dbe2e8_14%,#697586_28%,#eef2f4_42%,#657080_56%,#d5dbe0_72%,#455061_100%)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),inset_0_-2px_3px_rgba(0,0,0,0.45),0_5px_9px_rgba(0,0,0,0.45)]">
                <div className="absolute left-1/2 top-1/2 h-[12px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500 bg-[linear-gradient(180deg,#111827,#334155_45%,#080b11)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]" />
                <div className="absolute inset-x-1 top-[2px] border-t border-white/70" />
              </div>
              <svg className="-mt-[2px] h-8 w-7 overflow-visible drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]" viewBox="0 0 28 34" fill="none">
                <path d="M14 2.5C8.4 2.5 5.5 6.5 5.5 12.5v7.2c0 6.4 3.2 11.2 8.5 11.2s8.5-4.8 8.5-11.2v-7.2c0-6-2.9-10-8.5-10Z" stroke="#3f4b5b" strokeWidth="5" />
                <path d="M14 2.5C8.4 2.5 5.5 6.5 5.5 12.5v7.2c0 6.4 3.2 11.2 8.5 11.2s8.5-4.8 8.5-11.2v-7.2c0-6-2.9-10-8.5-10Z" stroke="url(#lanyard-metal)" strokeWidth="2.4" />
                <defs>
                  <linearGradient id="lanyard-metal" x1="5" y1="2" x2="24" y2="31" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f8fafc" />
                    <stop offset=".25" stopColor="#7c8796" />
                    <stop offset=".52" stopColor="#f1f5f9" />
                    <stop offset=".78" stopColor="#707b8a" />
                    <stop offset="1" stopColor="#e2e8f0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Draggable HD ID Card */}
            <motion.div
              className={`relative z-20 -mt-3 w-[min(82vw,290px)] select-none rounded-[22px] border p-3.5 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)] ${
                isDark
                  ? 'border-white/20 bg-gradient-to-b from-[#162033] via-[#0d1424] to-[#070b14]'
                  : 'border-slate-300 bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)]'
              }`}
              aria-label="Kartu profil interaktif, sentuh dan geser kartu"
            >
              {/* Glossy specular highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-tr from-white/[0.03] via-transparent to-white/10" />

              {/* Lanyard punch hole slot */}
              <div className="mx-auto -mt-1.5 mb-2.5 h-2 w-8 rounded-full border border-white/20 bg-[#05070d]/80 shadow-inner" />

              {/* Card top banner */}
              <div className="mb-2.5 flex items-center justify-between px-0.5">
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-widest ${
                    isDark ? 'bg-white/10 text-slate-200' : 'bg-slate-900 text-white'
                  }`}
                >
                  DEVELOPER
                </span>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-[#38bdf8]" />
                  <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-[#38bdf8]">
                    UPGRIS
                  </span>
                </div>
              </div>

              {/* Big bold background text */}
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <div className="absolute inset-x-0 top-1 z-0 select-none text-center font-mono text-[28px] font-black uppercase tracking-[0.18em] text-white/[0.07]">
                  DEV·ENG
                </div>

                {/* Photo frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
                  {!imgError ? (
                    <img
                      src={personalInfo.profileImagePath}
                      alt={personalInfo.name}
                      className="h-full w-full object-cover object-top"
                      fetchPriority="high"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#2c67ed]/20 font-mono text-3xl font-bold text-[#38bdf8]">
                      MIR
                    </div>
                  )}

                  {/* Gradient overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/15 to-transparent" />

                  {/* Vertical side label (like reference) */}
                  <div className="absolute right-1.5 top-2 z-10 select-none [writing-mode:vertical-rl]">
                    <span className="font-mono text-[7.5px] font-bold uppercase tracking-[0.25em] text-white/70 drop-shadow-sm">
                      INFORMATIKA · S5
                    </span>
                  </div>

                  {/* Nameplate banner (like reference) */}
                  <div className="absolute inset-x-2 bottom-2 z-10 rounded-lg border border-white/20 bg-black/60 p-2 backdrop-blur-md">
                    <p className="font-mono text-[7.5px] font-bold uppercase tracking-[0.22em] text-[#60a5fa]">
                      Student ID Card
                    </p>
                    <p className="mt-0.5 truncate text-[13px] font-black uppercase tracking-wide text-white">
                      {personalInfo.name}
                    </p>
                    <p className="text-[9.5px] font-medium text-slate-300">
                      Web Developer & UI/UX
                    </p>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="mt-2.5 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  <span
                    className={`font-mono text-[8px] uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Semarang, ID
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#38bdf8]">
                  PORTFOLIO
                </span>
              </div>
            </motion.div>

            {/* Hint below card */}
            <p className="mt-2 text-center font-mono text-[10px] text-slate-400/80">
              • Tarik kartu untuk menggerakkan
            </p>
            </motion.div>
          </motion.div>

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

