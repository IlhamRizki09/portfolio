import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/Icons';
import SectionHeading from '../components/SectionHeading';
import { personalInfo } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { gmailComposeUrl } from '../utils/gmail';
import { sendContactMessage } from '../utils/contactService';

interface ContactProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
  const { t, showToast } = usePortfolio();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    setStatus('sending');
    const result = await sendContactMessage(payload);

    if (result.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      showToast(t.contact.successNotice, 'success');
      return;
    }

    setStatus('error');
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

  const fieldClass = 'form-field';

  return (
    <section id="contact" className="relative section-py">
      <div className="container-custom">
        <SectionHeading title={t.contact.heading} subtitle={t.contact.subtitle} isDark={isDark} />

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.22fr)] lg:items-stretch lg:gap-8">
          {/* Left: direct contact + socials */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            className="glass-card flex min-w-0 flex-col p-6 sm:p-7"
          >
            <span className="eyebrow">Hubungi</span>
            <h3
              className={`mt-2 text-[clamp(1.35rem,2.6vw,1.75rem)] font-extrabold leading-tight tracking-tight ${
                isDark ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {t.contact.infoTitle}
            </h3>
            <p
              className={`mt-2 text-[13px] leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {t.contact.subtitle}
            </p>

            <div className="mt-5 space-y-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex min-w-0 items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] hover:border-[#3b82f6]/45 hover:bg-[#2c67ed]/10'
                        : 'border-slate-200 bg-white/70 hover:border-blue-300 hover:bg-blue-50/70'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${
                        isDark
                          ? 'border-[#3b82f6]/25 bg-[#25457b]/30 text-[#9ec5ff]'
                          : 'border-blue-100 bg-blue-50 text-[#2563eb]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
                        {link.label}
                      </span>
                      <span
                        className={`block truncate text-[12.5px] font-semibold ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {link.text}
                      </span>
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              <button
                onClick={handleCopyEmail}
                className="btn-primary h-10 cursor-pointer px-4 text-xs"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? t.contact.emailCopied : t.contact.copyEmail}</span>
              </button>

              <a
                href={gmailComposeUrl('Inquiry via Portfolio', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-10 px-4 text-xs"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{t.contact.openGmail}</span>
              </a>
            </div>
          </motion.div>

          {/* Right: message form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="glass-card relative flex min-w-0 flex-col overflow-hidden p-6 sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/45 to-transparent"
            />

            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3b82f6]/25 bg-[#25457b]/25 text-[#7dd3fc]">
                <MessageSquare className="h-4 w-4" />
              </span>
              <h3
                className={`text-[15px] font-extrabold tracking-tight ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {t.contact.formTitle}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-1 flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={fieldClass}>
                  <label htmlFor="contact-name">{t.contact.nameLabel}</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400">{errors.name}</p>}
                </div>

                <div className={fieldClass}>
                  <label htmlFor="contact-email">{t.contact.emailLabel}</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
                </div>
              </div>

              <div className={fieldClass}>
                <label htmlFor="contact-subject">{t.contact.subjectLabel}</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.contact.subjectPlaceholder}
                />
                {errors.subject && <p className="text-[11px] text-rose-400">{errors.subject}</p>}
              </div>

              <div className={`${fieldClass} flex-1`}>
                <label htmlFor="contact-message">{t.contact.messageLabel}</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="resize-none"
                />
                {errors.message && <p className="text-[11px] text-rose-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary h-12 w-full flex-shrink-0 cursor-pointer text-sm disabled:cursor-wait disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>{status === 'sending' ? t.contact.sendingBtn : t.contact.sendBtn}</span>
              </button>

              {status === 'success' && (
                <div
                  className={`flex items-start gap-2 rounded-xl border p-3 text-[11.5px] leading-relaxed ${
                    isDark
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>{t.contact.successNotice}</p>
                </div>
              )}

              {status === 'error' && (
                <div
                  className={`rounded-xl border p-3 text-center text-[11.5px] leading-relaxed ${
                    isDark
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                      : 'border-rose-300 bg-rose-50 text-rose-700'
                  }`}
                >
                  <p>{t.contact.errorNotice}</p>
                  <a
                    href={gmailComposeUrl(
                      formData.subject || 'Portfolio Inquiry',
                      `${formData.message}\n\n— ${formData.name}\n${formData.email}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-1 inline-block font-bold underline ${
                      isDark ? 'text-white' : 'text-rose-900'
                    }`}
                  >
                    {t.contact.openGmail} &rarr;
                  </a>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
