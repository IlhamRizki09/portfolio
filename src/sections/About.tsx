import { useState } from 'react';
import {
  User,
  GraduationCap,
  MapPin,
  Layers,
  Sparkles,
  Copy,
  Check,
  CreditCard,
  Code2,
  Compass,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Card3DTilt from '../components/Card3DTilt';
import { personalInfo } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const { t, showToast, openCard } = usePortfolio();
  const [copied, setCopied] = useState(false);

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

  const bentoFacts = [
    {
      icon: User,
      label: 'Nama Lengkap',
      value: personalInfo.name,
      highlight: true,
    },
    {
      icon: GraduationCap,
      label: 'Institusi Pendidikan',
      value: `${personalInfo.university}`,
    },
    {
      icon: Layers,
      label: 'Program Studi & Status',
      value: `${personalInfo.major} (Semester ${personalInfo.semester})`,
    },
    {
      icon: MapPin,
      label: 'Asal Daerah',
      value: personalInfo.origin,
    },
    {
      icon: Code2,
      label: 'Fokus Bidang',
      value: 'Web Development & UI/UX Design',
    },
    {
      icon: Compass,
      label: 'Ketersediaan',
      value: 'Terbuka untuk Peluang Magang',
    },
  ];

  return (
    <section
      id="about"
      className={`section-py transition-colors duration-300 relative ${
        isDark ? 'bg-[#080D1C]' : 'bg-[#F5F7FF]'
      }`}
    >
      <div className="container-custom">
        <SectionHeading
          label={t.about.label}
          title={t.about.title}
          subtitle={t.about.subtitle}
          isDark={isDark}
        />

        {/* Bento Grid Architecture */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Card 1: Interactive 3D Real Portrait & Identity (Col 5) */}
          <div className="lg:col-span-5">
            <Card3DTilt isDark={isDark} className="p-6 flex flex-col justify-between">
              <div>
                {/* Real Photo Portrait Frame */}
                <div className="relative group mb-5">
                  {/* Subtle Electric Blue & Violet Ambient Aura Glow */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#386BFF]/30 via-[#7855E8]/20 to-[#28D6E8]/30 blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Main Portrait Frame with Glassmorphism Border */}
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#080D1C] border border-[#386BFF]/30 shadow-2xl">
                    <img
                      src={personalInfo.profileImagePath}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C]/90 via-transparent to-transparent pointer-events-none" />

                    {/* Identification Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#28D6E8]">
                        Verified Profile
                      </span>
                      <h3 className="text-lg font-black">{personalInfo.name}</h3>
                      <p className="text-xs text-[#9AA6C0]">{personalInfo.profession}</p>
                    </div>
                  </div>
                </div>

                {/* Academic Affiliation Pill */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-inherit bg-black/10">
                  <div className="w-9 h-9 rounded-lg bg-[#386BFF]/20 flex items-center justify-center text-[#386BFF] flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF]">
                      Universitas PGRI Semarang
                    </p>
                    <p className="text-xs font-semibold">
                      Program Studi Informatika &bull; Semester 5
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 mt-5 pt-4 border-t border-inherit">
                <button
                  onClick={handleCopyProfile}
                  className="flex-1 h-10 px-3 rounded-xl text-xs font-bold bg-[#386BFF]/15 hover:bg-[#386BFF]/25 text-[#28D6E8] border border-[#386BFF]/30 inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t.about.infoCopied : t.about.copyInfoBtn}</span>
                </button>

                <button
                  onClick={openCard}
                  className={`h-10 px-3 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isDark
                      ? 'border-white/10 hover:bg-white/5 text-[#F5F7FF]'
                      : 'border-gray-200 hover:bg-gray-100 text-[#080D1C]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#386BFF]" />
                  <span>{t.about.viewCardBtn}</span>
                </button>
              </div>
            </Card3DTilt>
          </div>

          {/* Bento Card 2: Narrative & Quick Facts Grid (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Story Card */}
            <Card3DTilt isDark={isDark} className="p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#28D6E8]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#386BFF]">
                  Profil Profesional
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#9AA6C0]">
                <p>{t.about.bio1}</p>
                <p>{t.about.bio2}</p>
                <p>{t.about.bio3}</p>
                <p>{t.about.bio4}</p>
              </div>
            </Card3DTilt>

            {/* Quick Fact Bento Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 flex-1">
              {bentoFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <Card3DTilt key={index} isDark={isDark} className="p-4 sm:p-4.5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#386BFF]/15 text-[#386BFF] border border-[#386BFF]/25 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-0.5">
                          {fact.label}
                        </p>
                        <p
                          className={`text-xs sm:text-sm font-bold leading-snug ${
                            isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                          }`}
                        >
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  </Card3DTilt>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
