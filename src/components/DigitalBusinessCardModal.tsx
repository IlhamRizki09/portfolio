import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import {
  X,
  Copy,
  Share2,
  Download,
  Mail,
  GraduationCap,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';
import { LinkedinIcon } from './Icons';

export default function DigitalBusinessCardModal() {
  const { isCardOpen, closeCard, isDark, t, showToast } = usePortfolio();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const portfolioUrl = typeof window !== 'undefined' ? window.location.href : 'https://mir-portfolio.local';

  useEffect(() => {
    if (isCardOpen) {
      QRCode.toDataURL(
        portfolioUrl,
        {
          width: 280,
          margin: 1.5,
          color: {
            dark: '#050510',
            light: '#FFFFFF',
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrDataUrl(url);
          }
        }
      );
    }
  }, [isCardOpen, portfolioUrl]);

  if (!isCardOpen) return null;

  const handleCopyContact = async () => {
    const contactText = `MIR. â€” Muhammad Ilham Rizki
Informatics Student & Aspiring Web Developer
Universitas PGRI Semarang
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
Instagram: ${personalInfo.instagram}
LinkedIn: ${personalInfo.linkedin}
Portfolio: ${portfolioUrl}`;

    try {
      await navigator.clipboard.writeText(contactText);
      setCopied(true);
      showToast(t.businessCard.contactCopied, 'success');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      showToast('Gagal menyalin kontak', 'warning');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MIR. â€” Muhammad Ilham Rizki Portfolio',
          text: 'Informatics Student & Aspiring Web Developer Portfolio',
          url: portfolioUrl,
        });
        showToast('Tautan berhasil dibagikan!', 'success');
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyContact();
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `mir-portfolio-qr.png`;
    a.click();
    showToast('QR Code berhasil diunduh!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[115] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCard}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`relative w-full max-w-lg my-auto rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-2xl z-10 ${
            isDark
              ? 'bg-[#0a0f20] border-[#2c67ed]/35 text-[#f5f7ff] shadow-black'
              : 'bg-white border-[#2c67ed]/40 text-[#050510] shadow-2xl'
          }`}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-inherit flex items-center justify-between bg-black/15">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
              <h3 className="text-sm font-bold tracking-tight">{t.businessCard.title}</h3>
            </div>
            <button
              onClick={closeCard}
              className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Holographic Card Preview with Real Photo */}
            <div
              ref={cardRef}
              className="relative rounded-2xl p-6 sm:p-7 overflow-hidden border border-[#2c67ed]/30 shadow-xl bg-gradient-to-br from-[#050510] via-[#0a0f20] to-[#142B59] text-white"
            >
              {/* Dynamic Aura Accent */}
              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#2c67ed]/25 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-[#38bdf8]/20 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Brand Logo & Real Photo Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl p-[1.5px] bg-gradient-to-tr from-[#2c67ed] via-[#818cf8] to-[#38bdf8] shadow-lg shadow-[#2c67ed]/30">
                      <div className="w-full h-full bg-[#050510] rounded-[9px] flex items-center justify-center font-black text-sm text-[#f5f7ff]">
                        MIR<span className="text-[#38bdf8]">.</span>
                      </div>
                    </div>

                    <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#38bdf8]/40 shadow-sm">
                      <img
                        src={personalInfo.profileImagePath}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#38bdf8] uppercase tracking-widest">
                    Digital Card
                  </span>
                </div>

                {/* Name & Title */}
                <h4 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                  {personalInfo.name}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-[#38bdf8] mb-3">
                  {personalInfo.profession}
                </p>

                <div className="space-y-1.5 text-xs text-[#94a3b8] border-t border-white/10 pt-3">
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#2c67ed]" />
                    <span>Universitas PGRI Semarang &bull; Informatika (Smtr 5)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#818cf8]" />
                    <span>{personalInfo.origin}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{personalInfo.email}</span>
                  </p>
                  <p className="flex items-center gap-2 min-w-0">
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#2c67ed] flex-shrink-0" />
                    <span className="truncate">linkedin.com/in/{personalInfo.linkedinHandle}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl border border-inherit bg-black/10">
              <div className="w-32 h-32 rounded-xl bg-white p-2 flex items-center justify-center shadow-md flex-shrink-0">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="MIR Portfolio QR Code" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full animate-pulse bg-gray-200 rounded" />
                )}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#2c67ed]">
                  {t.businessCard.scanQr}
                </p>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {t.businessCard.scanQrHint}
                </p>
                <button
                  onClick={handleDownloadQr}
                  className="text-xs font-semibold text-[#38bdf8] hover:underline inline-flex items-center gap-1.5 cursor-pointer mt-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.businessCard.downloadQr}</span>
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleCopyContact}
                className="flex-1 h-11 px-4 rounded-xl text-xs font-bold bg-[#2c67ed] hover:bg-[#2E5BE5] text-white flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.businessCard.contactCopied : t.businessCard.copyContact}</span>
              </button>

              <button
                onClick={handleShare}
                className={`h-11 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isDark
                    ? 'border-[#2c67ed]/30 hover:bg-white/5 text-white'
                    : 'border-blue-200 hover:bg-blue-50 text-blue-900'
                }`}
              >
                <Share2 className="w-4 h-4 text-[#38bdf8]" />
                <span>{t.businessCard.shareCard}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

