import { useState } from 'react';
import {
  User,
  GraduationCap,
  MapPin,
  Layers,
  Code2,
  Copy,
  Check,
  CreditCard,
  Mail,
  ArrowUpRight,
  Sparkles,
  Compass,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { personalInfo } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const { t, showToast, openCard } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  const handleCopyProfile = async () => {
    const text = `Muhammad Ilham Rizki — Informatics Student & Aspiring Web Developer
Universitas PGRI Semarang (Fakultas Teknik dan Informatika, Semester 5)
Fokus: Web Development, UI/UX Design, Software Engineering
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(t.about.infoCopied, 'success');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      showToast('Gagal menyalin informasi profil', 'warning');
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const facts = [
    { icon: User, label: 'Nama Lengkap', value: personalInfo.name },
    { icon: GraduationCap, label: 'Institusi', value: personalInfo.university },
    {
      icon: Layers,
      label: 'Program Studi',
      value: `${personalInfo.major} · Semester ${personalInfo.semester}`,
    },
    { icon: MapPin, label: 'Asal', value: personalInfo.origin },
    { icon: Compass, label: 'Fokus', value: 'Web Development & UI/UX' },
    { icon: Sparkles, label: 'Ketersediaan', value: 'Terbuka untuk Magang' },
  ];

  return (
    <section id="about" className="relative section-py">
      <div className="container-custom">
        <SectionHeading title={t.about.title} subtitle={t.about.subtitle} isDark={isDark} />

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)_minmax(0,0.86fr)] lg:gap-12">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="text-center lg:text-left"
          >
            <h3 className="m-0 flex flex-col text-[clamp(2.4rem,5.6vw,4.1rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              <span className="text-blue-gradient">Hi, I&apos;m</span>
              <span className="text-shine">
                {firstName}
                <br />
                {lastName}
              </span>
            </h3>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#347bff] to-[#2456c9] px-5 text-sm font-bold text-[#eaf2ff] shadow-[0_10px_32px_rgba(35,92,205,0.25)] transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                <span>{t.hero.contactBtn}</span>
              </a>

              <button
                onClick={handleCopyProfile}
                aria-label={t.about.copyInfoBtn}
                title={t.about.copyInfoBtn}
                className="icon-btn cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>

              <button
                onClick={openCard}
                aria-label={t.about.viewCardBtn}
                title={t.about.viewCardBtn}
                className="icon-btn cursor-pointer"
              >
                <CreditCard className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex items-end justify-center"
          >
            <div className="absolute bottom-[6%] left-[6%] right-[6%] h-[55%] rounded-full bg-[radial-gradient(at_50%_35%,rgba(234,38,64,0.28),transparent_45%),radial-gradient(at_48%_68%,rgba(30,112,226,0.34),transparent_65%)] blur-[38px]" />
            <span className="absolute left-1/2 top-[10%] aspect-square w-[78%] -translate-x-1/2 rounded-full border border-[#6c97d7]/15" />
            <span className="absolute left-1/2 top-[22%] aspect-square w-[58%] -translate-x-1/2 rounded-full border border-[#e53d51]/15" />

            <div className="relative z-10 w-[230px] overflow-hidden rounded-[26px] border border-white/15 bg-[#0b1020] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:w-[260px] lg:w-[280px]">
              <div className="relative aspect-[3/4]">
                {!imgError ? (
                  <img
                    src={personalInfo.profileImagePath}
                    alt={personalInfo.name}
                    className="h-full w-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#2c67ed]/15 font-mono text-2xl font-bold text-[#38bdf8]">
                    MIR
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[#60a5fa]">
                    Verified Profile
                  </p>
                  <p className="mt-1 text-sm font-bold leading-tight text-white">
                    {personalInfo.name}
                  </p>
                  <p className="text-[11px] text-slate-300">{personalInfo.profession}</p>
                </div>
              </div>
            </div>

            <span className="absolute right-[16%] top-[58%] h-[7px] w-[7px] rounded-full bg-[#39e5d0] shadow-[0_0_14px_3px_rgba(57,229,208,0.45)]" />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className={`text-[0.95rem] font-normal leading-[1.75] lg:text-[1rem] ${
              isDark ? 'text-[#b8bfd3]' : 'text-slate-600'
            }`}
          >
            <div className="space-y-4">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
              <p>{t.about.bio3}</p>
              <p>{t.about.bio4}</p>
            </div>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#projects');
              }}
              className={`mt-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'border-[#3077ff]/35 bg-[#030c1d]/50 text-[#64a5ff] hover:border-[#3077ff]/70 hover:bg-[#1b4d9d]/20'
                  : 'border-blue-200 bg-white text-[#2563eb] hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>{t.about.viewProjectsBtn}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Quick facts */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card flex items-center gap-3 px-4 py-3.5"
              >
                <span
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border ${
                    isDark
                      ? 'border-[#3b82f6]/20 bg-[#25457b]/30 text-[#9ec5ff]'
                      : 'border-blue-100 bg-blue-50 text-[#2563eb]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                    {fact.label}
                  </p>
                  <p
                    className={`truncate text-[13px] font-semibold ${
                      isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    {fact.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
