import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Mail,
  GraduationCap,
  Sparkles,
  MapPin,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo, experiences } from '../data/portfolioData';
import { LinkedinIcon } from './Icons';

export default function RecruiterModeModal() {
  const { isRecruiterMode, setRecruiterMode, isDark, t, openCv } = usePortfolio();

  if (!isRecruiterMode) return null;

  const coreSkills = [
    'Teamwork & Collaboration',
    'Quality Control & Inspection',
    'Leadership & Team Management',
    'Kreativitas & Problem Solving',
    'Menulis Kreatif & Dokumentasi',
    'Pemrograman Web (React, JS, PHP, Python)',
    'Database Management (MySQL / SQL)',
    'Computer Networking (LAN/WAN - TKJ)',
    'Hardware Diagnostic & Troubleshooting',
    'UI/UX Design Prototyping (Figma)',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[105] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setRecruiterMode(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`relative w-full max-w-4xl my-auto rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-2xl z-10 ${
            isDark
              ? 'bg-[#0E162B]/95 border-[#386BFF]/35 text-[#F5F7FF] shadow-black'
              : 'bg-white/95 border-[#386BFF]/40 text-[#080D1C] shadow-2xl'
          }`}
        >
          {/* Header Banner */}
          <div className="px-6 py-5 border-b border-inherit flex items-center justify-between bg-gradient-to-r from-[#386BFF]/10 via-[#7855E8]/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#386BFF] to-[#28D6E8] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black tracking-tight">
                    {t.recruiter.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {t.recruiter.statusBadge}
                  </span>
                </div>
                <p className="text-xs text-[#9AA6C0]">{t.recruiter.subtitle}</p>
              </div>
            </div>

            <button
              onClick={() => setRecruiterMode(false)}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-[#9AA6C0] hover:text-white"
              aria-label="Close Recruiter Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Candidate Identity Card with Real Photo */}
            <div
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#142B59]/30 border-[#386BFF]/25' : 'bg-blue-50/60 border-blue-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Real Photo Thumbnail */}
                  <div className="w-16 h-20 rounded-2xl overflow-hidden bg-[#080D1C] border border-[#386BFF]/40 flex-shrink-0 shadow-md">
                    <img
                      src={personalInfo.profileImagePath}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#386BFF]">
                      {t.recruiter.candidateProfile}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black">{personalInfo.name}</h3>
                    <p className="text-sm font-semibold text-[#28D6E8] mt-0.5">
                      {personalInfo.profession}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#9AA6C0]">
                      <span className="inline-flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-[#386BFF]" />
                        Universitas PGRI Semarang &bull; Informatika (Smtr 5)
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#28D6E8]" />
                        {personalInfo.origin}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap sm:flex-col gap-2.5">
                  <a
                    href={personalInfo.cvPath}
                    download={personalInfo.cvFileName}
                    className="h-10 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#386BFF] to-[#7855E8] text-white shadow-md hover:opacity-90 inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.recruiter.ctaDownloadCv}</span>
                  </a>

                  <button
                    onClick={openCv}
                    className={`h-10 px-4 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'border-[#386BFF]/40 bg-[#0E162B] text-white hover:bg-white/5'
                        : 'border-blue-300 bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-[#28D6E8]" />
                    <span>Preview CV</span>
                  </button>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-10 px-4 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'border-[#386BFF]/40 bg-[#0E162B] text-white hover:bg-white/5'
                        : 'border-blue-300 bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#386BFF]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setRecruiterMode(false)}
                    className={`h-10 px-4 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'border-[#386BFF]/40 bg-[#0E162B] text-white hover:bg-white/5'
                        : 'border-blue-300 bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-[#28D6E8]" />
                    <span>{t.recruiter.ctaContact}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Target Role & Value Proposition Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#080D1C]/50 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#386BFF] mb-2">
                  {t.recruiter.targetRole}
                </h4>
                <p className="text-sm font-semibold">{t.recruiter.targetRoleDesc}</p>
                <p className="text-xs text-[#9AA6C0] mt-2 leading-relaxed">
                  Terbuka untuk posisi magang teknis, frontend engineering, UI/UX, maupun IT operational support.
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#080D1C]/50 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#28D6E8] mb-2">
                  {t.recruiter.whyHireTitle}
                </h4>
                <p className="text-xs leading-relaxed text-[#9AA6C0]">
                  {t.recruiter.whyHireDesc}
                </p>
              </div>
            </div>

            {/* Core Competencies Badges */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9AA6C0] mb-3">
                {t.recruiter.coreCompetencies}
              </h4>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      isDark
                        ? 'bg-[#142B59]/40 border-[#386BFF]/30 text-[#F5F7FF]'
                        : 'bg-white border-blue-200 text-[#080D1C] shadow-sm'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28D6E8]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Track Record Highlights */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9AA6C0] mb-3">
                {t.experience.title} Highlights
              </h4>
              <div className="space-y-3">
                {experiences.slice(0, 4).map((exp, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
                      isDark ? 'bg-[#080D1C]/40 border-white/10' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-bold ${isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'}`}>{exp.title}</p>
                      <p className="text-xs text-[#386BFF] font-medium">{exp.organization}</p>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#386BFF]/15 text-[#28D6E8] border border-[#386BFF]/25 w-fit">
                      {exp.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-inherit flex items-center justify-between text-xs text-[#9AA6C0] bg-black/10">
            <span>Fast recruitment scan &bull; Verified student credentials</span>
            <button
              onClick={() => setRecruiterMode(false)}
              className="text-xs font-semibold text-[#386BFF] hover:underline cursor-pointer"
            >
              {t.recruiter.exitMode}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
