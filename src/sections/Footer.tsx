import { ArrowUp, Mail, MapPin, GraduationCap } from 'lucide-react';
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

  const linkClass = `text-[12.5px] font-medium transition-colors ${
    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#1d4ed8]'
  }`;

  const socialClass = `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:-translate-y-0.5 ${
    isDark
      ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-[#2c67ed]/50 hover:bg-[#2c67ed]/15 hover:text-white'
      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-[#2563eb]'
  }`;

  return (
    <footer
      className={`relative overflow-hidden border-t ${
        isDark ? 'border-white/10 bg-[#05070f]' : 'border-slate-200 bg-[#f7f9ff]'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-[#2c67ed]/10 blur-[80px]"
      />

      <div className="container-custom relative z-10 py-12 sm:py-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.15fr] lg:gap-10">
          {/* Brand / intro */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="inline-flex items-center gap-2"
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#60a5fa]">
                Portfolio
              </span>
            </a>

            <p
              className={`mt-3 text-[clamp(1.05rem,2vw,1.2rem)] font-extrabold leading-snug tracking-tight ${
                isDark ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {personalInfo.name}
            </p>

            <p
              className={`mt-2 max-w-xs text-[12.5px] leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              &ldquo;{personalInfo.tagline}&rdquo;
            </p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={socialClass}
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={socialClass}
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialClass}
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={gmailComposeUrl('Inquiry via Portfolio', '')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className={socialClass}
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">
              Navigation
            </p>
            <nav className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
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
                    className={linkClass}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Contact details */}
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">
              Contact
            </p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a
                  href={gmailComposeUrl('Inquiry via Portfolio', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-start gap-2 ${linkClass}`}
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                  <span className="break-all">{personalInfo.email}</span>
                </a>
              </li>
              <li
                className={`inline-flex items-start gap-2 text-[12.5px] ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <GraduationCap className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                <span>{personalInfo.university}</span>
              </li>
              <li
                className={`inline-flex items-start gap-2 text-[12.5px] ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                <span>{personalInfo.origin}</span>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="btn-secondary mt-4 h-9 cursor-pointer px-3 text-[11px]"
              aria-label={t.footer.backToTop}
              title={t.footer.backToTop}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>{t.footer.backToTop}</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-10 flex flex-col items-center justify-between gap-2 border-t pt-5 text-center sm:flex-row sm:text-left ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          <p
            className={`text-[11.5px] leading-relaxed ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}
          >
            &copy; 2026{' '}
            <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              MIR
            </span>{' '}
            &mdash; {personalInfo.name}. {t.footer.rightsReserved}
          </p>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
            {personalInfo.profession}
          </p>
        </div>
      </div>
    </footer>
  );
}
