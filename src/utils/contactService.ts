export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'request-failed' };

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  if (!ACCESS_KEY) {
    return { ok: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `[Portfolio] ${payload.subject}`,
        from_name: payload.name,
        email: payload.email,
        replyto: payload.email,
        message: `Nama: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
      }),
    });

    const data = (await response.json().catch(() => null)) as { success?: boolean } | null;

    return response.ok && data?.success
      ? { ok: true }
      : { ok: false, reason: 'request-failed' };
  } catch {
    return { ok: false, reason: 'request-failed' };
  }
}
