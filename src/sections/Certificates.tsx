import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  Calendar,
  Building2,
  Download,
  ExternalLink,
  X,
  FileText,
  Image as ImageIcon,
  Hash,
  ShieldCheck,
  BookOpen,
  Users,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';
import { certificates, type CertificateItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface CertificatesProps {
  isDark: boolean;
}

export default function Certificates({ isDark }: CertificatesProps) {
  const { t, lang } = usePortfolio();
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);
  const [viewMode, setViewMode] = useState<'image' | 'pdf'>('image');

  useEffect(() => {
    if (!activeCert) return;
    setViewMode(window.innerWidth < 1024 || !activeCert.pdfPath ? 'image' : 'pdf');
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeCert]);

  return (
    <section id="certificates" className="relative section-py">
      <div className="container-custom">
        <SectionHeading
          title={t.certificates.title}
          subtitle={t.certificates.subtitle}
          isDark={isDark}
        />

        {certificates.length === 0 ? (
          <EmptyState
            title={t.certificates.emptyTitle}
            description={t.certificates.emptyDesc}
            icon={Award}
            isDark={isDark}
          />
        ) : (
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {certificates.map((cert, index) => {
              const title = lang === 'id' ? cert.titleId : cert.title;
              const summary = lang === 'id' ? cert.summaryId : cert.summaryEn;
              const date = lang === 'id' ? cert.date : cert.dateEn;

              return (
                <motion.article
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="glass-card group flex flex-col overflow-hidden transition-colors duration-300 hover:border-[#3b82f6]/40"
                >
                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="relative block aspect-[1.45] w-full cursor-pointer overflow-hidden bg-[#0b1020]"
                    aria-label={`${t.certificates.viewCertificate}: ${title}`}
                  >
                    <img
                      src={cert.previewImage}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.045]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/70 via-[#05070d]/5 to-transparent" />

                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-[#38bdf8]/35 bg-[#05070d]/75 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc] backdrop-blur-md">
                      <BadgeCheck className="h-3 w-3" />
                      {cert.category}
                    </span>

                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-[#05070d]/80 px-2.5 py-1 text-[10px] font-semibold text-slate-200 backdrop-blur-sm">
                      <FileText className="h-3 w-3 text-[#38bdf8]" />
                      {t.certificates.viewCertificate}
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px] font-medium text-slate-300">
                      <Calendar className="h-3 w-3" />
                      {date}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <h3
                      className={`text-[0.95rem] font-bold leading-snug tracking-tight ${
                        isDark ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {title}
                    </h3>

                    <p className="mt-1.5 text-xs font-semibold text-[#60a5fa]">{cert.issuedBy}</p>

                    <p
                      className={`mt-2 line-clamp-3 text-[12px] leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {summary}
                    </p>

                    {cert.credentialId && (
                      <p
                        className={`mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] font-medium ${
                          isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        <Hash className="h-3 w-3 text-[#38bdf8]" />
                        {cert.credentialId}
                      </p>
                    )}

                    <div className="mt-auto flex items-center gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveCert(cert)}
                        className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2c67ed] px-4 text-xs font-semibold text-white shadow-[0_0_20px_rgba(44,103,237,0.3)] transition-colors hover:bg-[#1d4ed8]"
                      >
                        <span>{t.certificates.detailsTitle}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>

                      <a
                        href={cert.pdfPath ?? cert.previewImage}
                        download={
                          cert.pdfPath ? undefined : cert.previewImage.split('/').pop()
                        }
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                          isDark
                            ? 'border-white/10 text-slate-400 hover:border-[#2c67ed]/50 hover:bg-white/5 hover:text-white'
                            : 'border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-[#2563eb]'
                        }`}
                        title={cert.pdfPath ? t.certificates.downloadPdf : t.certificates.downloadImage}
                        aria-label={cert.pdfPath ? t.certificates.downloadPdf : t.certificates.downloadImage}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>

                      <a
                        href={cert.pdfPath ?? cert.previewImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                          isDark
                            ? 'border-white/10 text-slate-400 hover:border-[#2c67ed]/50 hover:bg-white/5 hover:text-white'
                            : 'border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-[#2563eb]'
                        }`}
                        title={t.certificates.openNewTab}
                        aria-label={t.certificates.openNewTab}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Certificate Detail & Document Viewer */}
        <AnimatePresence>
          {activeCert && (
            <div className="fixed inset-0 z-[115] flex items-center justify-center p-2 sm:p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCert(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.22 }}
                className={`relative z-10 flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border sm:h-[90vh] sm:rounded-3xl ${
                  isDark
                    ? 'border-white/10 bg-[#0a0f20] text-slate-100'
                    : 'border-blue-200 bg-white text-slate-900'
                }`}
              >
                {/* Header */}
                <div
                  className={`flex flex-shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-5 ${
                    isDark ? 'border-white/10 bg-black/20' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#2c67ed]/15 text-[#60a5fa]">
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold leading-tight sm:text-base">
                        {t.certificates.detailsTitle}
                      </h3>
                      <p className="truncate text-[11px] text-slate-400">
                        {activeCert.credentialId} &bull; {activeCert.issuedBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-2">
                    {activeCert.pdfPath && (
                      <div
                        className={`hidden items-center overflow-hidden rounded-lg border sm:flex ${
                          isDark ? 'border-white/10' : 'border-slate-200'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setViewMode('image')}
                          className={`inline-flex h-9 cursor-pointer items-center gap-1.5 px-3 text-xs font-semibold transition-colors ${
                            viewMode === 'image'
                              ? 'bg-[#2c67ed] text-white'
                              : 'text-slate-400 hover:text-[#60a5fa]'
                          }`}
                        >
                          <ImageIcon className="h-3.5 w-3.5" />
                          <span>Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('pdf')}
                          className={`inline-flex h-9 cursor-pointer items-center gap-1.5 px-3 text-xs font-semibold transition-colors ${
                            viewMode === 'pdf'
                              ? 'bg-[#2c67ed] text-white'
                              : 'text-slate-400 hover:text-[#60a5fa]'
                          }`}
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>PDF</span>
                        </button>
                      </div>
                    )}

                    <a
                      href={activeCert.pdfPath ?? activeCert.previewImage}
                      download={
                        activeCert.pdfPath
                          ? undefined
                          : activeCert.previewImage.split('/').pop()
                      }
                      className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-[#2c67ed] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
                      title={
                        activeCert.pdfPath
                          ? t.certificates.downloadPdf
                          : t.certificates.downloadImage
                      }
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden md:inline">
                        {activeCert.pdfPath
                          ? t.certificates.downloadPdf
                          : t.certificates.downloadImage}
                      </span>
                    </a>

                    <a
                      href={activeCert.pdfPath ?? activeCert.previewImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition-colors ${
                        isDark
                          ? 'border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      title={t.certificates.openNewTab}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveCert(null)}
                      className={`cursor-pointer rounded-lg border p-2 transition-colors ${
                        isDark
                          ? 'border-white/10 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400'
                          : 'border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-500'
                      }`}
                      aria-label={t.certificates.close}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="grid min-h-0 flex-1 grid-rows-[42%_1fr] overflow-hidden lg:grid-cols-[340px_1fr] lg:grid-rows-1">
                  {/* Details Column */}
                  <div
                    className={`order-2 min-h-0 space-y-5 overflow-y-auto p-5 lg:order-1 lg:border-r ${
                      isDark
                        ? 'border-white/10 bg-[#05070d]/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/25 bg-[#2c67ed]/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">
                        <BadgeCheck className="h-3 w-3" />
                        {activeCert.category}
                      </span>
                      <h4 className="mb-2 text-sm font-bold leading-snug sm:text-base">
                        {lang === 'id' ? activeCert.titleId : activeCert.title}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {lang === 'id' ? activeCert.summaryId : activeCert.summaryEn}
                      </p>
                    </div>

                    <dl className="space-y-2.5 text-xs">
                      <div>
                        <dt className="mb-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                          {t.certificates.issuer}
                        </dt>
                        <dd className="inline-flex items-start gap-1.5 font-semibold">
                          <Building2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                          <span>{activeCert.issuer}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="mb-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                          {t.certificates.issuedBy}
                        </dt>
                        <dd className="inline-flex items-start gap-1.5 font-semibold">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                          <span>{activeCert.issuedBy}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="mb-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                          {t.certificates.issuedDate}
                        </dt>
                        <dd className="inline-flex items-center gap-1.5 font-semibold">
                          <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
                          <span>{lang === 'id' ? activeCert.date : activeCert.dateEn}</span>
                        </dd>
                      </div>
                      {activeCert.credentialId && (
                        <div>
                          <dt className="mb-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                            {t.certificates.credentialId}
                          </dt>
                          <dd className="inline-flex items-center gap-1.5 break-all font-mono text-[11px] font-semibold">
                            <Hash className="h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                            <span>{activeCert.credentialId}</span>
                          </dd>
                        </div>
                      )}
                      {activeCert.location && (
                        <div>
                          <dt className="mb-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                            {t.certificates.location}
                          </dt>
                          <dd className="inline-flex items-start gap-1.5 font-semibold">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                            <span>{activeCert.location}</span>
                          </dd>
                        </div>
                      )}
                    </dl>

                    {(activeCert.topicsId?.length || 0) > 0 && (
                      <div>
                        <h5 className="mb-2 inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                          <BookOpen className="h-3.5 w-3.5 text-[#38bdf8]" />
                          {t.certificates.materialsTitle}
                        </h5>
                        <ul className="space-y-1.5">
                          {(lang === 'id' ? activeCert.topicsId : activeCert.topicsEn)?.map(
                            (topic) => (
                              <li
                                key={topic}
                                className={`flex items-start gap-1.5 text-[11px] leading-relaxed ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}
                              >
                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#38bdf8]" />
                                <span>{topic}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {(activeCert.signers?.length || 0) > 0 && (
                      <div>
                        <h5 className="mb-2 inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                          <Users className="h-3.5 w-3.5 text-[#38bdf8]" />
                          {t.certificates.signersTitle}
                        </h5>
                        <ul className="space-y-1.5">
                          {activeCert.signers?.map((signer) => (
                            <li
                              key={signer}
                              className={`text-[11px] leading-relaxed ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {signer}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p
                      className={`inline-flex items-start gap-1.5 border-t pt-3 text-[10px] leading-relaxed ${
                        isDark
                          ? 'border-white/10 text-slate-400'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#38bdf8]" />
                      <span>
                        <span className="font-bold text-[#60a5fa]">
                          {t.certificates.verification}:{' '}
                        </span>
                        {lang === 'id' ? activeCert.verifyNoteId : activeCert.verifyNoteEn}
                      </span>
                    </p>
                  </div>

                  {/* Document Column */}
                  <div className="relative order-1 min-h-0 overflow-hidden bg-[#05070d] lg:order-2">
                    {viewMode === 'pdf' && activeCert.pdfPath ? (
                      <div className="flex h-full w-full flex-col">
                        <iframe
                          src={`${activeCert.pdfPath}#toolbar=1&navpanes=0`}
                          title={activeCert.title}
                          className="min-h-0 w-full flex-1 border-0"
                        />
                        <div className="flex flex-shrink-0 items-center justify-between gap-2 border-t border-white/10 px-3 py-2">
                          <p className="text-[10px] leading-snug text-slate-400">
                            {t.certificates.pdfFallback}
                          </p>
                          <a
                            href={activeCert.pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-shrink-0 items-center gap-1 text-[10px] font-bold text-[#38bdf8] hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {t.certificates.openNewTab}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 items-start justify-center overflow-auto p-3 sm:p-4">
                          <img
                            src={activeCert.previewImage}
                            alt={activeCert.title}
                            className="h-auto max-w-full rounded-lg shadow-2xl"
                          />
                        </div>
                        <div className="flex flex-shrink-0 items-center justify-between gap-2 border-t border-white/10 px-3 py-2">
                          <p className="text-[10px] text-slate-400">
                            {activeCert.pdfPath
                              ? t.certificates.imageNote
                              : t.certificates.imageOnlyNote}
                          </p>
                          {activeCert.pdfPath && (
                            <button
                              type="button"
                              onClick={() => setViewMode('pdf')}
                              className="inline-flex flex-shrink-0 cursor-pointer items-center gap-1 text-[10px] font-bold text-[#38bdf8] hover:underline"
                            >
                              <FileText className="h-3 w-3" />
                              PDF
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
