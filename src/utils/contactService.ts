import { personalInfo } from '../data/portfolioData';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactResult = { ok: true } | { ok: false };

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;
const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : null;
const FALLBACK_ENDPOINT = `https://formsubmit.co/ajax/${personalInfo.email}`;

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  const usingFormspree = FORMSPREE_ENDPOINT !== null;

  try {
    // Formspree rejects JSON bodies from static origins, so send urlencoded data.
    // It is a CORS "simple request", meaning no preflight and no blocked preflight.
    const body = usingFormspree
      ? new URLSearchParams({
          name: payload.name,
          email: payload.email,
          _subject: `[Portfolio] ${payload.subject}`,
          message: payload.message,
          _gotcha: '',
        })
      : JSON.stringify({
          name: payload.name,
          email: payload.email,
          _replyto: payload.email,
          _subject: `[Portfolio] ${payload.subject}`,
          _template: 'table',
          _captcha: 'false',
          message: `${payload.message}\n\n— ${payload.name} (${payload.email})`,
        });

    const response = await fetch(FORMSPREE_ENDPOINT ?? FALLBACK_ENDPOINT, {
      method: 'POST',
      headers: usingFormspree
        ? { Accept: 'application/json' }
        : { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
    });

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; success?: boolean | string }
      | null;

    if (usingFormspree) {
      return response.ok && data?.ok === true ? { ok: true } : { ok: false };
    }

    const delivered = data?.success === true || data?.success === 'true';
    return response.ok && delivered ? { ok: true } : { ok: false };
  } catch {
    return { ok: false };
  }
}
