import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Maximize2, Minimize2, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export default function CVViewerModal() {
  const { isCvOpen, closeCv, isDark, t } = usePortfolio();
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isCvOpen) return null;

  const cvPath = personalInfo.cvPath;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[115] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCv}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col z-10 ${
            isFullscreen ? 'h-full max-w-full' : 'max-w-5xl h-[88vh]'
          } ${
            isDark
              ? 'bg-[#0a0f20] border-[#2c67ed]/30 text-[#f5f7ff]'
              : 'bg-white border-[#2c67ed]/35 text-[#050510]'
          }`}
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 border-b border-inherit flex items-center justify-between bg-black/20 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2c67ed]/20 text-[#2c67ed] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold leading-tight">
                  {t.cvViewer.title}
                </h3>
                <p className="text-[11px] text-[#94a3b8]">
                  {personalInfo.name} &bull; {personalInfo.cvFileName}
                </p>
              </div>
            </div>

            {/* Actions: Download, Open in new tab, Fullscreen, Close */}
            <div className="flex items-center gap-2">
              <a
                href={cvPath}
                download={personalInfo.cvFileName}
                className="h-8 sm:h-9 px-3 rounded-lg text-xs font-semibold bg-[#2c67ed] hover:bg-[#2E5BE5] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title={t.cvViewer.download}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.cvViewer.download}</span>
              </a>

              <a
                href={cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/10 flex items-center gap-1.5 transition-colors text-[#94a3b8] hover:text-white"
                title={t.cvViewer.openNewTab}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.cvViewer.openNewTab}</span>
              </a>

              <button
                onClick={() => setIsFullscreen((prev) => !prev)}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={closeCv}
                className="p-2 rounded-lg border border-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-[#94a3b8] transition-colors cursor-pointer"
                aria-label="Close CV Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 w-full h-full relative bg-[#050510] overflow-hidden">
            <iframe
              src={`${cvPath}#toolbar=1&navpanes=0`}
              title="Curriculum Vitae Muhammad Ilham Rizki"
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

