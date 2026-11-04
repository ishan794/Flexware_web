import { showToast } from '../components/Toast';
import { defaultContent } from './cms/defaults';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
  if (!email.trim()) return 'Email is required';
  if (!EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email, like name@company.com';
  return undefined;
}

export function validateMessage(message: string) {
  if (!message.trim()) return 'Message is required';
  if (message.trim().length < 10) return 'Message must be at least 10 characters';
  return undefined;
}

/** Moves focus to the first invalid field so keyboard and screen-reader users land on the problem */
export function focusFirstError(form: HTMLFormElement | null, errors: Record<string, string | undefined>, ids: Record<string, string>) {
  const first = Object.keys(ids).find((key) => errors[key]);
  if (first && form) form.querySelector<HTMLElement>(`#${ids[first]}`)?.focus();
}

/**
 * Where the form posts. The server build keeps /api/contact, which stores the
 * message as an inquiry (Admin → Inquiries). The static build has no API routes,
 * so NEXT_PUBLIC_CONTACT_ENDPOINT points it at contact.php on the host instead.
 * Both accept the same JSON and answer { success: true } | { error }.
 */
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/api/contact';

/**
 * Posts the message to CONTACT_ENDPOINT.
 * If the request fails, the toast gives people a direct email fallback.
 */
export async function submitContact(payload: Record<string, string>, contactEmail = defaultContent.settings.email) {
  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to send');
    showToast({ type: 'success', title: 'Message sent', message: "Thanks! We'll get back to you within 24 hours." });
    return true;
  } catch {
    showToast({
      type: 'error',
      title: "We couldn't send your message",
      message: `Please try again, or email us directly at ${contactEmail}.`,
    });
    return false;
  }
}
