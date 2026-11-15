import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface LanyardCardProps {
  isDark: boolean;
  idPrefix?: string;
  className?: string;
}

export default function LanyardCard({ isDark, idPrefix = 'lanyard', className = '' }: LanyardCardProps) {
  const [imgError, setImgError] = useState(false);
  const metalGradId = `${idPrefix}-metal-gradient`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -280 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 115, damping: 13, mass: 1.15, delay: 0.18 }}
      className={`relative flex flex-col items-center justify-center overflow-visible select-none ${className}`}
    >
      {/* Swinging pendulum assembly */}
      <motion.div
        drag
        dragSnapToOrigin
        dragConstraints={{ left: -65, right: 65, top: -16, bottom: 42 }}
        dragElastic={0.12}
        animate={{ rotate: [-2.2, 2.2, -2.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.15 }}
        style={{ transformOrigin: '50% 0%', touchAction: 'none' }}
        whileDrag={{ scale: 1.035, cursor: 'grabbing' }}
        whileTap={{ cursor: 'grabbing' }}
        className="relative flex cursor-grab flex-col items-center active:cursor-grabbing"
      >
        {/* Woven strap with stitched borders, ribbed texture, and satin luster */}
        <div
          aria-hidden="true"
          className="relative z-0 flex h-[168px] w-[76px] flex-col items-center lg:h-[184px] lg:w-[82px]"
        >
          <div className="relative h-[152px] w-[50px] overflow-hidden rounded-b-[9px] border-x border-white/15 bg-[linear-gradient(90deg,#080b12_0%,#283346_8%,#151c29_18%,#0a0e17_32%,#273348_50%,#111722_68%,#090c13_84%,#354155_94%,#111722_100%)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.34),inset_0_-12px_18px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.4)] lg:h-[168px] lg:w-[54px]">
            {/* Stitching lines */}
            <div className="absolute inset-y-0 left-[5px] w-px bg-white/25 shadow-[1px_0_1px_rgba(0,0,0,0.7)]" />
            <div className="absolute inset-y-0 right-[5px] w-px bg-black/70 shadow-[1px_0_1px_rgba(255,255,255,0.18)]" />
            {/* Ribbed fabric pattern */}
            <div className="absolute inset-y-0 left-1/2 w-[26px] -translate-x-1/2 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_1px,transparent_1px,transparent_4px)] opacity-75" />
            {/* Typography */}
            <span className="absolute inset-0 flex items-center justify-center select-none font-mono text-[9px] font-black uppercase tracking-[0.28em] text-slate-200/90 [writing-mode:vertical-rl] [text-shadow:0_1px_2px_rgba(0,0,0,0.9)] lg:text-[10px]">
              Ilham Rizki
            </span>
          </div>

          {/* Reinforced stitched strap end */}
          <div className="relative z-10 -mt-px h-[13px] w-[58px] rounded-[3px] border border-white/30 bg-[linear-gradient(180deg,#465366,#1c2533_38%,#080b11_100%)] shadow-[0_4px_7px_rgba(0,0,0,0.5)] lg:w-[62px]">
            <div className="absolute inset-x-1 top-[3px] border-t border-dashed border-white/35" />
            <div className="absolute inset-x-1 bottom-[3px] border-t border-dashed border-black/70" />
          </div>
        </div>

        {/* Polished metal swivel clasp and ring */}
        <div aria-hidden="true" className="relative z-10 -mt-[7px] flex flex-col items-center">
          <div className="relative h-[30px] w-[56px] rounded-[7px] border border-white/55 bg-[linear-gradient(110deg,#566171_0%,#dbe2e8_14%,#697586_28%,#eef2f4_42%,#657080_56%,#d5dbe0_72%,#455061_100%)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),inset_0_-2px_3px_rgba(0,0,0,0.45),0_5px_9px_rgba(0,0,0,0.45)] lg:h-[32px] lg:w-[60px]">
            <div className="absolute left-1/2 top-1/2 h-[12px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500 bg-[linear-gradient(180deg,#111827,#334155_45%,#080b11)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] lg:w-[32px]" />
            <div className="absolute inset-x-1 top-[2px] border-t border-white/70" />
          </div>
          <svg className="-mt-[2px] h-8 w-7 overflow-visible drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] lg:h-9 lg:w-8" viewBox="0 0 28 34" fill="none">
            <path d="M14 2.5C8.4 2.5 5.5 6.5 5.5 12.5v7.2c0 6.4 3.2 11.2 8.5 11.2s8.5-4.8 8.5-11.2v-7.2c0-6-2.9-10-8.5-10Z" stroke="#3f4b5b" strokeWidth="5" />
            <path d="M14 2.5C8.4 2.5 5.5 6.5 5.5 12.5v7.2c0 6.4 3.2 11.2 8.5 11.2s8.5-4.8 8.5-11.2v-7.2c0-6-2.9-10-8.5-10Z" stroke={`url(#${metalGradId})`} strokeWidth="2.4" />
            <defs>
              <linearGradient id={metalGradId} x1="5" y1="2" x2="24" y2="31" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f8fafc" />
                <stop offset=".25" stopColor="#7c8796" />
                <stop offset=".52" stopColor="#f1f5f9" />
                <stop offset=".78" stopColor="#707b8a" />
                <stop offset="1" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* HD ID Card */}
        <div
          className={`relative z-20 -mt-3 w-[min(82vw,290px)] select-none rounded-[22px] border p-3.5 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)] lg:w-[305px] xl:w-[325px] ${
            isDark
              ? 'border-white/20 bg-gradient-to-b from-[#162033] via-[#0d1424] to-[#070b14]'
              : 'border-slate-300 bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)]'
          }`}
          aria-label="Kartu profil interaktif, sentuh dan geser kartu"
        >
          {/* Specular gloss highlight */}
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

          {/* Bold background graphics & photo frame */}
          <div className="relative overflow-hidden rounded-xl border border-white/10">
            <div className="absolute inset-x-0 top-1 z-0 select-none text-center font-mono text-[28px] font-black uppercase tracking-[0.18em] text-white/[0.07] lg:text-[32px]">
              DEV·ENG
            </div>

            {/* Photo */}
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

              {/* Gradient overlays for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/15 to-transparent" />

              {/* Vertical side label */}
              <div className="absolute right-1.5 top-2 z-10 select-none [writing-mode:vertical-rl]">
                <span className="font-mono text-[7.5px] font-bold uppercase tracking-[0.25em] text-white/70 drop-shadow-sm lg:text-[8px]">
                  INFORMATIKA · S5
                </span>
              </div>

              {/* Nameplate banner */}
              <div className="absolute inset-x-2 bottom-2 z-10 rounded-lg border border-white/20 bg-black/60 p-2 backdrop-blur-md lg:p-2.5">
                <p className="font-mono text-[7.5px] font-bold uppercase tracking-[0.22em] text-[#60a5fa] lg:text-[8px]">
                  Student ID Card
                </p>
                <p className="mt-0.5 truncate text-[13px] font-black uppercase tracking-wide text-white lg:text-[14px]">
                  {personalInfo.name}
                </p>
                <p className="text-[9.5px] font-medium text-slate-300 lg:text-[10px]">
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
                className={`font-mono text-[8px] uppercase tracking-wider lg:text-[8.5px] ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Semarang, ID
              </span>
            </div>
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#38bdf8] lg:text-[8.5px]">
              PORTFOLIO
            </span>
          </div>
        </div>

        {/* Interactive hint */}
        <p className="mt-2 text-center font-mono text-[10px] text-slate-400/80">
          • Tarik kartu untuk menggerakkan
        </p>
      </motion.div>
    </motion.div>
  );
}
