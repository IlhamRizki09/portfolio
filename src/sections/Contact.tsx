import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/Icons';
import SectionHeading from '../components/SectionHeading';
import Card3DTilt from '../components/Card3DTilt';
import { personalInfo } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { gmailComposeUrl } from '../utils/gmail';

interface ContactProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
  const { t, showToast } = usePortfolio();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'notice'>('idle');
  const [copied, setCopied] = useState(false);


  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = t.contact.validationName;
    if (!formData.email.trim()) errs.email = t.contact.validationEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = t.contact.validationEmailFormat;
    if (!formData.subject.trim()) errs.subject = t.contact.validationSubject;
    if (!formData.message.trim()) errs.message = t.contact.validationMessage;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = `${formData.message.trim()}\n\n— ${formData.name.trim()}\n${formData.email.trim()}`;
    window.open(gmailComposeUrl(formData.subject.trim(), body), '_blank', 'noopener,noreferrer');
    setStatus('notice');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      showToast(t.contact.emailCopied, 'success');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      showToast('Gagal menyalin email', 'warning');
    }
  };

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email Langsung',
      href: gmailComposeUrl('Inquiry via Portfolio', ''),
      text: personalInfo.email,
    },
    {
      icon: GithubIcon,
      label: 'GitHub Profil',
      href: personalInfo.github,
      text: 'github.com/IlhamRizki09',
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn Profil',
      href: personalInfo.linkedin,
      text: personalInfo.linkedinHandle,
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      href: personalInfo.instagram,
      text: '@ilhammrzz',
    },
  ];

  return (
    <section
      id="contact"
      className={`section-py transition-colors duration-300 ${
        isDark ? 'bg-[#080D1C]' : 'bg-[#F5F7FF]'
      }`}
    >
      <div className="container-custom">
        <SectionHeading
          label={t.contact.label}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <h3
              className={`text-base sm:text-lg font-black tracking-tight mb-1 ${
                isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
              }`}
            >
              {t.contact.infoTitle}
            </h3>

            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 group cursor-pointer ${
                    isDark
                      ? 'bg-[#0E162B]/80 border-[#386BFF]/25 hover:border-[#28D6E8]/60 text-[#F5F7FF]'
                      : 'bg-white border-blue-200 hover:border-blue-400 text-[#080D1C] shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#386BFF]/15 group-hover:bg-[#386BFF]/25 text-[#28D6E8] transition-colors flex-shrink-0">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#386BFF]">
                      {link.label}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold truncate">{link.text}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#28D6E8] flex-shrink-0" />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <button
                onClick={handleCopyEmail}
                className="h-11 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#386BFF] hover:bg-[#2E5BE5] text-white flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.contact.emailCopied : t.contact.copyEmail}</span>
              </button>

              <a
                href={gmailComposeUrl('Inquiry via Portfolio', '')}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-11 px-4 rounded-xl text-xs sm:text-sm font-bold border flex items-center gap-2 transition-colors cursor-pointer ${
                  isDark
                    ? 'border-[#386BFF]/30 hover:bg-white/5 text-white'
                    : 'border-blue-200 hover:bg-blue-50 text-blue-900'
                }`}
              >
                <Mail className="w-4 h-4 text-[#28D6E8]" />
                <span>{t.contact.openGmail}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <Card3DTilt isDark={isDark} glow={false} className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                        isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                      }`}
                    >
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#386BFF] ${
                        isDark
                          ? 'bg-[#080D1C] border-[#386BFF]/25 text-[#F5F7FF] focus:border-[#28D6E8]'
                          : 'bg-white border-blue-200 text-[#080D1C] focus:border-[#386BFF]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                        isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                      }`}
                    >
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#386BFF] ${
                        isDark
                          ? 'bg-[#080D1C] border-[#386BFF]/25 text-[#F5F7FF] focus:border-[#28D6E8]'
                          : 'bg-white border-blue-200 text-[#080D1C] focus:border-[#386BFF]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                    }`}
                  >
                    {t.contact.subjectLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.contact.subjectPlaceholder}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#386BFF] ${
                      isDark
                        ? 'bg-[#080D1C] border-[#386BFF]/25 text-[#F5F7FF] focus:border-[#28D6E8]'
                        : 'bg-white border-blue-200 text-[#080D1C] focus:border-[#386BFF]'
                    }`}
                  />
                  {errors.subject && <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label
                    className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-[#F5F7FF]' : 'text-[#080D1C]'
                    }`}
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#386BFF] resize-none ${
                      isDark
                        ? 'bg-[#080D1C] border-[#386BFF]/25 text-[#F5F7FF] focus:border-[#28D6E8]'
                        : 'bg-white border-blue-200 text-[#080D1C] focus:border-[#386BFF]'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-[#386BFF] via-[#7855E8] to-[#28D6E8] text-white shadow-lg shadow-[#386BFF]/30 flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.sendBtn}</span>
                </button>

                {status === 'notice' && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs text-center leading-relaxed mt-3 ${
                      isDark
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                        : 'border-amber-300 bg-amber-50 text-amber-800'
                    }`}
                  >
                    <p>{t.contact.gmailOpenedNotice}</p>
                    <a
                      href={gmailComposeUrl(
                        formData.subject || 'Portfolio Inquiry',
                        `${formData.message}\n\n— ${formData.name}\n${formData.email}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline font-bold mt-1 inline-block ${
                        isDark ? 'text-white' : 'text-amber-900'
                      }`}
                    >
                      {t.contact.openGmail} &rarr;
                    </a>
                  </div>
                )}
              </form>
            </Card3DTilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
