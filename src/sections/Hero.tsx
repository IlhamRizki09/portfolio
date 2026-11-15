import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Mail,
  CreditCard,
  Eye,
} from 'lucide-react';
import { personalInfo, heroTypingTexts } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { gmailComposeUrl } from '../utils/gmail';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/Icons';
import MagneticButton from '../components/MagneticButton';
import LanyardCard from '../components/LanyardCard';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const { lang, t, openCv, openCard } = usePortfolio();
  const typingList = heroTypingTexts[lang] || heroTypingTexts.id;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
          <LanyardCard isDark={isDark} idPrefix="mobile-lanyard" className="-mt-6 mb-4 lg:hidden" />

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

          <LanyardCard isDark={isDark} idPrefix="desktop-lanyard" className="hidden lg:flex lg:-translate-y-52 lg:justify-end lg:pr-4 xl:-translate-y-56 xl:pr-10" />
        </div>
      </div>
    </section>
  );
}

