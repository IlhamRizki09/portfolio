import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, CreditCard, Eye } from 'lucide-react';
import { personalInfo, heroTypingTexts } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { gmailComposeUrl } from '../utils/gmail';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/Icons';
import ThreeHeroScene from '../components/ThreeHeroScene';
import MagneticButton from '../components/MagneticButton';
import Card3DTilt from '../components/Card3DTilt';

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

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 overflow-hidden"
    >
      {/* Dynamic Ambient Glow Meshes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 right-1/4 w-[480px] h-[480px] rounded-full blur-[160px] opacity-[0.20] bg-[#386BFF]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.14] bg-[#7855E8]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full blur-[140px] opacity-[0.08] bg-[#28D6E8]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Greeting */}
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] uppercase text-[#386BFF] mb-2">
              {t.hero.greeting}
            </p>

            {/* Name: MUHAMMAD ILHAM RIZKI */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-black tracking-tight leading-[1.12] mb-3 ${
                isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
              }`}
            >
              MUHAMMAD{' '}
              <span className="bg-gradient-to-r from-[#386BFF] via-[#7855E8] to-[#28D6E8] bg-clip-text text-transparent">
                ILHAM RIZKI
              </span>
            </h1>

            {/* Role Typing Text */}
            <div className="h-7 sm:h-8 flex items-center mb-4">
              <span
                className={`text-base sm:text-lg md:text-xl font-semibold ${
                  isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'
                }`}
              >
                {displayText}
              </span>
              <span className="animate-pulse ml-1 text-[#28D6E8] font-black text-xl">|</span>
            </div>

            {/* Internship Status Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7 border ${
                isDark
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{t.hero.status}</span>
            </div>

            {/* Primary Actions */}
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5 sm:gap-3 w-full sm:max-w-[22rem] mb-3">
              <MagneticButton
                onClick={() => handleScrollTo('#about')}
                className="h-12 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#386BFF] to-[#7855E8] hover:from-[#2E5BE5] hover:to-[#6A44DD] text-white shadow-lg shadow-[#386BFF]/30 hover:shadow-[#386BFF]/50 inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowDown className="w-4 h-4" />
              </MagneticButton>

              <a
                href={personalInfo.cvPath}
                download={personalInfo.cvFileName}
                className={`h-12 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#0E162B] hover:bg-[#142B59] border-[#386BFF]/30 text-[#F5F7FF] hover:border-[#28D6E8]/60 shadow-md'
                    : 'bg-white hover:bg-blue-50 border-blue-200 text-[#080D1C] shadow-sm'
                }`}
                title="Download CV Langsung"
              >
                <Download className="w-4 h-4 text-[#386BFF]" />
                <span>{t.hero.downloadCvBtn}</span>
              </a>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-center lg:justify-start gap-2 w-full">
              <button
                onClick={openCv}
                className={`h-10 flex-1 sm:flex-none px-1.5 min-[360px]:px-2 sm:px-4 rounded-lg font-bold text-[10px] min-[360px]:text-[11px] sm:text-xs border transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-[#9AA6C0] hover:text-white'
                    : 'bg-white hover:bg-blue-50 border-gray-200 text-[#4B556D] hover:border-blue-300 hover:text-[#080D1C]'
                }`}
                title="Preview CV Online"
              >
                <Eye className="hidden sm:block w-3.5 h-3.5 text-[#386BFF]" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => handleScrollTo('#contact')}
                className={`h-10 flex-1 sm:flex-none px-1.5 min-[360px]:px-2 sm:px-4 rounded-lg font-bold text-[10px] min-[360px]:text-[11px] sm:text-xs border transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-[#9AA6C0] hover:text-white'
                    : 'bg-white hover:bg-blue-50 border-gray-200 text-[#4B556D] hover:border-blue-300 hover:text-[#080D1C]'
                }`}
              >
                <Mail className="hidden sm:block w-3.5 h-3.5 text-[#28D6E8]" />
                <span>{t.hero.contactBtn}</span>
              </button>

              <button
                onClick={openCard}
                className={`h-10 flex-1 sm:flex-none px-1.5 min-[360px]:px-2 sm:px-4 rounded-lg font-bold text-[10px] min-[360px]:text-[11px] sm:text-xs border transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-[#9AA6C0] hover:text-white'
                    : 'bg-white hover:bg-blue-50 border-gray-200 text-[#4B556D] hover:border-blue-300 hover:text-[#080D1C]'
                }`}
                title={t.hero.businessCardBtn}
              >
                <CreditCard className="hidden sm:block w-3.5 h-3.5 text-[#7855E8]" />
                <span>{t.hero.businessCardBtn}</span>
              </button>
            </div>

            {/* Social Media Quick Links */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs font-semibold text-[#9AA6C0]">Connect:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  isDark
                    ? 'bg-[#0E162B] border-white/10 text-[#9AA6C0] hover:text-white hover:border-[#386BFF]'
                    : 'bg-white border-gray-200 text-[#4B556D] hover:text-black hover:border-blue-400'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  isDark
                    ? 'bg-[#0E162B] border-white/10 text-[#9AA6C0] hover:text-white hover:border-[#386BFF]'
                    : 'bg-white border-gray-200 text-[#4B556D] hover:text-black hover:border-blue-400'
                }`}
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  isDark
                    ? 'bg-[#0E162B] border-white/10 text-[#9AA6C0] hover:text-white hover:border-[#386BFF]'
                    : 'bg-white border-gray-200 text-[#4B556D] hover:text-black hover:border-blue-400'
                }`}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={gmailComposeUrl('Inquiry via Portfolio', '')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct Email"
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  isDark
                    ? 'bg-[#0E162B] border-white/10 text-[#9AA6C0] hover:text-white hover:border-[#386BFF]'
                    : 'bg-white border-gray-200 text-[#4B556D] hover:text-black hover:border-blue-400'
                }`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Scene & Real Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* 3D Canvas Container */}
            <div className="w-full relative rounded-3xl overflow-hidden border border-[#386BFF]/25 bg-gradient-to-b from-[#0E162B] to-[#080D1C] shadow-2xl shadow-[#386BFF]/10">
              {/* Interactive 3D Canvas */}
              <ThreeHeroScene isDark={isDark} />

              {/* Floating Real Photo Frame Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <Card3DTilt isDark={isDark} className="p-3 sm:p-3.5 backdrop-blur-2xl !bg-[#080D1C]/90 !border-[#386BFF]/40 shadow-2xl">
                  <div className="flex items-center gap-3.5">
                    {/* Real Profile Photo in Rounded Frame */}
                    <div className="relative w-14 h-16 sm:w-16 sm:h-18 rounded-2xl overflow-hidden bg-[#080D1C] border border-[#28D6E8]/40 flex-shrink-0 shadow-md">
                      {!imgError ? (
                        <img
                          src={personalInfo.profileImagePath}
                          alt="Muhammad Ilham Rizki"
                          className="w-full h-full object-cover object-top"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#386BFF]/20 text-[#28D6E8] font-black text-sm">
                          MIR.
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs sm:text-sm font-black text-[#F5F7FF] truncate">
                          {personalInfo.name}
                        </p>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                      </div>
                      <p className="text-[11px] font-semibold text-[#28D6E8] truncate">
                        Informatika &bull; Semester 5
                      </p>
                      <p className="text-[10px] text-[#9AA6C0] truncate">
                        Universitas PGRI Semarang
                      </p>
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
