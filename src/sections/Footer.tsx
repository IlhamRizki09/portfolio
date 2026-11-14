import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/Icons';
import { personalInfo, navItems } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { gmailComposeUrl } from '../utils/gmail';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const { lang, t } = usePortfolio();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`py-12 sm:py-16 border-t relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#080D1C] border-[#386BFF]/20' : 'bg-[#F5F7FF] border-blue-200'
      }`}
    >
      {/* Subtle Bottom Ambient Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-t from-[#386BFF]/10 to-transparent blur-2xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-[#386BFF] via-[#7855E8] to-[#28D6E8] shadow-md shadow-[#386BFF]/30">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center font-black text-sm ${
                  isDark ? 'bg-[#080D1C] text-[#F5F7FF]' : 'bg-white text-[#080D1C]'
                }`}
              >
                MIR<span className="text-[#28D6E8]">.</span>
              </div>
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight">
              <span className={isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'}>
                MUHAMMAD ILHAM RIZKI
              </span>
            </span>
          </a>

          <p className="text-xs sm:text-sm text-[#9AA6C0] max-w-md">
            "{personalInfo.tagline}"
          </p>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-2">
            {navItems.map((item) => {
              const label = lang === 'id' ? item.labelId : item.labelEn;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors hover:text-[#28D6E8] ${
                    isDark ? 'text-[#9AA6C0]' : 'text-[#4B556D]'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:border-[#386BFF] hover:text-[#386BFF] ${
                isDark
                  ? 'border-white/10 bg-[#0E162B] text-[#9AA6C0]'
                  : 'border-gray-200 bg-white text-[#4B556D]'
              }`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:border-[#386BFF] hover:text-[#386BFF] ${
                isDark
                  ? 'border-white/10 bg-[#0E162B] text-[#9AA6C0]'
                  : 'border-gray-200 bg-white text-[#4B556D]'
              }`}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:border-[#386BFF] hover:text-[#386BFF] ${
                isDark
                  ? 'border-white/10 bg-[#0E162B] text-[#9AA6C0]'
                  : 'border-gray-200 bg-white text-[#4B556D]'
              }`}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={gmailComposeUrl('Inquiry via Portfolio', '')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:border-[#386BFF] hover:text-[#386BFF] ${
                isDark
                  ? 'border-white/10 bg-[#0E162B] text-[#9AA6C0]'
                  : 'border-gray-200 bg-white text-[#4B556D]'
              }`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label={t.footer.backToTop}
              title={t.footer.backToTop}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:border-[#28D6E8] hover:text-[#28D6E8] cursor-pointer ${
                isDark
                  ? 'border-[#386BFF]/30 bg-[#0E162B] text-[#9AA6C0]'
                  : 'border-blue-200 bg-white text-[#4B556D]'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Copyright strictly matching prompt format */}
          <div className="text-xs text-[#9AA6C0] border-t border-inherit pt-4 w-full max-w-xl">
            <p className="font-medium">
              &copy; 2026 <span className="font-bold text-[#F5F7FF]">MIR</span> &mdash; Muhammad Ilham Rizki. {t.footer.rightsReserved}
            </p>
            <p className="text-[11px] text-[#386BFF] mt-1 font-semibold">
              {personalInfo.profession} &bull; Universitas PGRI Semarang
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
