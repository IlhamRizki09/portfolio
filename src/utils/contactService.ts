import { personalInfo } from '../data/portfolioData';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactResult = { ok: true } | { ok: false };

const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(personalInfo.email)}`;

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        _replyto: payload.email,
        _subject: `[Portfolio] ${payload.subject}`,
        _template: 'table',
        _captcha: 'false',
        message: `${payload.message}\n\n— ${payload.name} (${payload.email})`,
      }),
    });

    const data = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
    const delivered = data?.success === true || data?.success === 'true';

    return response.ok && delivered ? { ok: true } : { ok: false };
  } catch {
    return { ok: false };
  }
}
