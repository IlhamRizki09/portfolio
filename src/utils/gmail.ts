import { personalInfo } from '../data/portfolioData';

export function gmailComposeUrl(subject = 'Inquiry via Portfolio', body = ''): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: personalInfo.email,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}
