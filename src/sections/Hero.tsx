import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Sparkles, CreditCard } from 'lucide-react';
import { personalInfo, heroTypingTexts } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
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
      className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden"
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
            {/* Small Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border ${
                isDark
                  ? 'bg-[#142B59]/50 border-[#386BFF]/35 text-[#28D6E8] shadow-sm shadow-[#386BFF]/20'
                  : 'bg-blue-50 border-blue-200 text-[#2E5BE5]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#28D6E8] animate-pulse" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Greeting */}
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] uppercase text-[#386BFF] mb-1.5">
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
            <div className="h-7 sm:h-8 flex items-center mb-3">
              <span
                className={`text-base sm:text-lg md:text-xl font-semibold ${
                  isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'
                }`}
              >
                {displayText}
              </span>
              <span className="animate-pulse ml-1 text-[#28D6E8] font-black text-xl">|</span>
            </div>

            {/* Headline Tagline */}
            <p className="text-sm sm:text-base font-semibold text-[#28D6E8] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#386BFF] flex-shrink-0" />
              <span>"{personalInfo.tagline}"</span>
            </p>

            {/* Short Narrative Description */}
            <p
              className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-5 text-center lg:text-left ${
                isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'
              }`}
            >
              {t.hero.description}
            </p>

            {/* Internship Status Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold mb-6 border ${
                isDark
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{t.hero.status}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full mb-6">
              <MagneticButton
                onClick={() => handleScrollTo('#about')}
                className="h-11 sm:h-12 px-6 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#386BFF] to-[#7855E8] hover:from-[#2E5BE5] hover:to-[#6A44DD] text-white shadow-lg shadow-[#386BFF]/30 hover:shadow-[#386BFF]/50 inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowDown className="w-4 h-4" />
              </MagneticButton>

              <div className="flex items-center gap-1.5">
                <a
                  href={personalInfo.cvPath}
                  download={personalInfo.cvFileName}
                  className={`h-11 sm:h-12 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all inline-flex items-center gap-2 cursor-pointer ${
                    isDark
                      ? 'bg-[#0E162B] hover:bg-[#142B59] border-[#386BFF]/30 text-[#F5F7FF] hover:border-[#28D6E8]/60 shadow-md'
                      : 'bg-white hover:bg-blue-50 border-blue-200 text-[#080D1C] shadow-sm'
                  }`}
                  title="Download CV Langsung"
                >
                  <Download className="w-4 h-4 text-[#386BFF]" />
                  <span>{t.hero.downloadCvBtn}</span>
                </a>

                <button
                  onClick={openCv}
                  className={`h-11 sm:h-12 px-3 rounded-xl font-bold text-xs border transition-all inline-flex items-center cursor-pointer ${
                    isDark
                      ? 'bg-[#0E162B] hover:bg-[#142B59] border-[#386BFF]/30 text-[#28D6E8]'
                      : 'bg-white hover:bg-blue-50 border-blue-200 text-[#386BFF]'
                  }`}
                  title="Preview CV Online"
                >
                  <span>Preview</span>
                </button>
              </div>

              <button
                onClick={() => handleScrollTo('#contact')}
                className={`h-11 sm:h-12 px-5 rounded-xl font-bold text-xs sm:text-sm border transition-all inline-flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#0E162B] hover:bg-[#142B59] border-[#386BFF]/30 text-[#F5F7FF] hover:border-[#28D6E8]/60 shadow-md'
                    : 'bg-white hover:bg-blue-50 border-blue-200 text-[#080D1C] shadow-sm'
                }`}
              >
                <Mail className="w-4 h-4 text-[#28D6E8]" />
                <span>{t.hero.contactBtn}</span>
              </button>

              <button
                onClick={openCard}
                className={`h-11 sm:h-12 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'bg-transparent hover:bg-white/5 border-white/10 text-[#9AA6C0] hover:text-white'
                    : 'bg-transparent hover:bg-black/5 border-gray-200 text-[#4B556D] hover:text-black'
                }`}
                title={t.hero.businessCardBtn}
              >
                <CreditCard className="w-4 h-4 text-[#386BFF]" />
                <span className="hidden sm:inline">{t.hero.businessCardBtn}</span>
              </button>
            </div>

            {/* Social Media Quick Links */}
            <div className="flex items-center gap-3">
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
                href={`mailto:${personalInfo.email}`}
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
            <div className="w-full relative rounded-3xl overflow-hidden border border-[#386BFF]/25 bg-gradient-to-b from-[#0E162B]/60 to-[#080D1C]/80 backdrop-blur-md shadow-2xl shadow-[#386BFF]/10">
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
