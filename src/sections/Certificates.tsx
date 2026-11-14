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
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Card3DTilt from '../components/Card3DTilt';
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
    <section
      id="certificates"
      className={`section-py transition-colors duration-300 ${
        isDark ? 'bg-[#080D1C]' : 'bg-[#F5F7FF]'
      }`}
    >
      <div className="container-custom">
        <SectionHeading
          label={t.certificates.label}
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
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {certificates.map((cert, index) => {
              const title = lang === 'id' ? cert.titleId : cert.title;
              const summary = lang === 'id' ? cert.summaryId : cert.summaryEn;
              const date = lang === 'id' ? cert.date : cert.dateEn;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Card3DTilt
                    isDark={isDark}
                    className="flex flex-col h-full [&>div]:flex [&>div]:flex-col"
                  >
                    {/* Certificate Document Preview */}
                    <button
                      type="button"
                      onClick={() => setActiveCert(cert)}
                      className="relative block w-full aspect-[1.4] overflow-hidden bg-[#F5F7FF] group cursor-pointer"
                      aria-label={`${t.certificates.viewCertificate}: ${title}`}
                    >
                      <img
                        src={cert.previewImage}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-3 py-2 bg-[#080D1C]/90 backdrop-blur-sm text-[11px] font-bold text-white">
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#28D6E8]" />
                          {t.certificates.viewCertificate}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[#9AA6C0]">
                          <Calendar className="w-3.5 h-3.5" />
                          {date}
                        </span>
                      </div>

                      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#080D1C]/80 backdrop-blur-md border border-[#28D6E8]/40 text-[#28D6E8]">
                        <BadgeCheck className="w-3 h-3" />
                        {cert.category}
                      </span>
                    </button>

                    {/* Certificate Meta */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3
                        className={`text-sm sm:text-base font-black leading-snug tracking-tight mb-2 ${
                          isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                        }`}
                      >
                        {title}
                      </h3>

                      <p className="text-xs font-semibold text-[#386BFF] mb-2">
                        {cert.issuedBy}
                      </p>

                      <p className="text-[11px] sm:text-xs leading-relaxed text-[#9AA6C0] mb-4 line-clamp-3">
                        {summary}
                      </p>

                      {cert.credentialId && (
                        <p className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[#9AA6C0] mb-4">
                          <Hash className="w-3 h-3 text-[#28D6E8]" />
                          {cert.credentialId}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveCert(cert)}
                          className="flex-1 h-10 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#386BFF] to-[#7855E8] text-white shadow-md shadow-[#386BFF]/25 hover:opacity-95 inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{t.certificates.viewCertificate}</span>
                        </button>

                        <a
                          href={cert.pdfPath ?? cert.previewImage}
                          download={
                            cert.pdfPath ? undefined : cert.previewImage.split('/').pop()
                          }
                          className={`h-10 px-3 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            isDark
                              ? 'border-[#386BFF]/30 text-[#9AA6C0] hover:text-white hover:bg-white/5'
                              : 'border-blue-200 text-[#4B556D] hover:text-[#080D1C] hover:bg-blue-50'
                          }`}
                          title={cert.pdfPath ? t.certificates.downloadPdf : t.certificates.downloadImage}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={cert.pdfPath ?? cert.previewImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`h-10 px-3 rounded-xl text-xs font-bold border inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            isDark
                              ? 'border-[#386BFF]/30 text-[#9AA6C0] hover:text-white hover:bg-white/5'
                              : 'border-blue-200 text-[#4B556D] hover:text-[#080D1C] hover:bg-blue-50'
                          }`}
                          title={t.certificates.openNewTab}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </Card3DTilt>
                </motion.div>
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
                className={`relative w-full max-w-6xl h-[92vh] sm:h-[90vh] rounded-2xl sm:rounded-3xl border overflow-hidden flex flex-col z-10 ${
                  isDark
                    ? 'bg-[#0E162B] border-[#386BFF]/30 text-[#F5F7FF]'
                    : 'bg-white border-[#386BFF]/35 text-[#080D1C]'
                }`}
              >
                {/* Header */}
                <div className="px-4 sm:px-5 py-3 border-b border-inherit flex items-center justify-between gap-3 bg-black/20 flex-shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#386BFF]/20 text-[#386BFF] flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold leading-tight truncate">
                        {t.certificates.detailsTitle}
                      </h3>
                      <p className="text-[11px] text-[#9AA6C0] truncate">
                        {activeCert.credentialId} &bull; {activeCert.issuedBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {activeCert.pdfPath && (
                      <div
                        className={`hidden sm:flex items-center rounded-lg border overflow-hidden ${
                          isDark ? 'border-white/10' : 'border-blue-200'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setViewMode('image')}
                          className={`h-9 px-3 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                            viewMode === 'image'
                              ? 'bg-[#386BFF] text-white'
                              : 'text-[#9AA6C0] hover:text-[#386BFF]'
                          }`}
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('pdf')}
                          className={`h-9 px-3 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                            viewMode === 'pdf'
                              ? 'bg-[#386BFF] text-white'
                              : 'text-[#9AA6C0] hover:text-[#386BFF]'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
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
                      className="h-9 px-3 rounded-lg text-xs font-semibold bg-[#386BFF] hover:bg-[#2E5BE5] text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      title={
                        activeCert.pdfPath
                          ? t.certificates.downloadPdf
                          : t.certificates.downloadImage
                      }
                    >
                      <Download className="w-3.5 h-3.5" />
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
                      className={`h-9 px-2.5 rounded-lg border inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                        isDark
                          ? 'border-white/10 text-[#9AA6C0] hover:text-white hover:bg-white/10'
                          : 'border-blue-200 text-[#4B556D] hover:text-[#080D1C] hover:bg-blue-50'
                      }`}
                      title={t.certificates.openNewTab}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveCert(null)}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'border-white/10 text-[#9AA6C0] hover:text-rose-400 hover:bg-rose-500/20'
                          : 'border-blue-200 text-[#4B556D] hover:text-rose-500 hover:bg-rose-50'
                      }`}
                      aria-label={t.certificates.close}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 min-h-0 grid lg:grid-cols-[340px_1fr] grid-rows-[42%_1fr] lg:grid-rows-1 overflow-hidden">
                  {/* Details Column */}
                  <div
                    className={`order-2 lg:order-1 overflow-y-auto min-h-0 p-5 space-y-5 border-t lg:border-t-0 lg:border-r border-inherit ${
                      isDark ? 'bg-[#080D1C]/40' : 'bg-[#F5F7FF]'
                    }`}
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#386BFF]/15 border border-[#386BFF]/25 text-[#28D6E8] mb-3">
                        <BadgeCheck className="w-3 h-3" />
                        {activeCert.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-black leading-snug mb-2">
                        {lang === 'id' ? activeCert.titleId : activeCert.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-[#9AA6C0]">
                        {lang === 'id' ? activeCert.summaryId : activeCert.summaryEn}
                      </p>
                    </div>

                    <dl className="space-y-2.5 text-xs">
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-0.5">
                          {t.certificates.issuer}
                        </dt>
                        <dd className="font-semibold inline-flex items-start gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#28D6E8] mt-0.5 flex-shrink-0" />
                          <span>{activeCert.issuer}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-0.5">
                          {t.certificates.issuedBy}
                        </dt>
                        <dd className="font-semibold inline-flex items-start gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#28D6E8] mt-0.5 flex-shrink-0" />
                          <span>{activeCert.issuedBy}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-0.5">
                          {t.certificates.issuedDate}
                        </dt>
                        <dd className="font-semibold inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#28D6E8]" />
                          <span>{lang === 'id' ? activeCert.date : activeCert.dateEn}</span>
                        </dd>
                      </div>
                      {activeCert.credentialId && (
                        <div>
                          <dt className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-0.5">
                            {t.certificates.credentialId}
                          </dt>
                          <dd className="font-mono text-[11px] font-semibold inline-flex items-center gap-1.5 break-all">
                            <Hash className="w-3.5 h-3.5 text-[#28D6E8] flex-shrink-0" />
                            <span>{activeCert.credentialId}</span>
                          </dd>
                        </div>
                      )}
                      {activeCert.location && (
                        <div>
                          <dt className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-0.5">
                            {t.certificates.location}
                          </dt>
                          <dd className="font-semibold inline-flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#28D6E8] mt-0.5 flex-shrink-0" />
                            <span>{activeCert.location}</span>
                          </dd>
                        </div>
                      )}
                    </dl>

                    {(activeCert.topicsId?.length || 0) > 0 && (
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-2 inline-flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#28D6E8]" />
                          {t.certificates.materialsTitle}
                        </h5>
                        <ul className="space-y-1.5">
                          {(lang === 'id' ? activeCert.topicsId : activeCert.topicsEn)?.map(
                            (topic) => (
                              <li
                                key={topic}
                                className="text-[11px] leading-relaxed text-[#9AA6C0] flex items-start gap-1.5"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#28D6E8] mt-1.5 flex-shrink-0" />
                                <span>{topic}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {(activeCert.signers?.length || 0) > 0 && (
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF] mb-2 inline-flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#28D6E8]" />
                          {t.certificates.signersTitle}
                        </h5>
                        <ul className="space-y-1.5">
                          {activeCert.signers?.map((signer) => (
                            <li
                              key={signer}
                              className="text-[11px] leading-relaxed text-[#9AA6C0]"
                            >
                              {signer}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="text-[10px] leading-relaxed text-[#9AA6C0] border-t border-inherit pt-3 inline-flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#28D6E8] flex-shrink-0 mt-0.5" />
                      <span>
                        <span className="font-bold text-[#386BFF]">
                          {t.certificates.verification}:{' '}
                        </span>
                        {lang === 'id' ? activeCert.verifyNoteId : activeCert.verifyNoteEn}
                      </span>
                    </p>
                  </div>

                  {/* Document Column */}
                  <div className="order-1 lg:order-2 relative bg-[#080D1C] overflow-hidden min-h-0">
                    {viewMode === 'pdf' && activeCert.pdfPath ? (
                      <div className="w-full h-full flex flex-col">
                        <iframe
                          src={`${activeCert.pdfPath}#toolbar=1&navpanes=0`}
                          title={activeCert.title}
                          className="flex-1 w-full min-h-0 border-0"
                        />
                        <div className="px-3 py-2 border-t border-white/10 flex items-center justify-between gap-2 flex-shrink-0">
                          <p className="text-[10px] leading-snug text-[#9AA6C0]">
                            {t.certificates.pdfFallback}
                          </p>
                          <a
                            href={activeCert.pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-[#28D6E8] hover:underline inline-flex items-center gap-1 flex-shrink-0"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {t.certificates.openNewTab}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col">
                        <div className="flex-1 overflow-auto p-3 sm:p-4 flex items-start justify-center">
                          <img
                            src={activeCert.previewImage}
                            alt={activeCert.title}
                            className="max-w-full h-auto rounded-lg shadow-2xl"
                          />
                        </div>
                        <div className="px-3 py-2 border-t border-white/10 flex items-center justify-between gap-2 flex-shrink-0">
                          <p className="text-[10px] text-[#9AA6C0]">
                            {activeCert.pdfPath
                              ? t.certificates.imageNote
                              : t.certificates.imageOnlyNote}
                          </p>
                          {activeCert.pdfPath && (
                            <button
                              type="button"
                              onClick={() => setViewMode('pdf')}
                              className="text-[10px] font-bold text-[#28D6E8] hover:underline inline-flex items-center gap-1 cursor-pointer flex-shrink-0"
                            >
                              <FileText className="w-3 h-3" />
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
