'use client';

import { useRef, useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import Field, { describedBy } from '@/app/components/forms/Field';
import { focusFirstError, submitContact, validateEmail, validateMessage } from '@/app/lib/contact';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ids = { name: 'contact-name', email: 'contact-email', message: 'contact-message' };

export default function ContactForm({ contactEmail }: { contactEmail: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Inputs are uncontrolled so text typed before hydration is never lost; values are read from the form
  const read = () => {
    const fd = new FormData(formRef.current ?? undefined);
    const get = (k: string) => String(fd.get(k) ?? '');
    return { name: get('name'), email: get('email'), subject: get('subject'), message: get('message') };
  };

  const validate = (values: { name: string; email: string; message: string }): FormErrors => ({
    name: values.name.trim() ? undefined : 'Full name is required',
    email: validateEmail(values.email),
    message: validateMessage(values.message),
  });

  // After the first submit attempt, re-validate as the user types so errors clear immediately
  const onFieldChange = () => {
    if (sent) setSent(false);
    if (attempted) setErrors(validate(read()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setAttempted(true);
    const values = read();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) {
      focusFirstError(formRef.current, { ...validationErrors }, ids);
      return;
    }

    setSubmitting(true);
    const ok = await submitContact({ ...values, source: 'contact-page' }, contactEmail);
    setSubmitting(false);
    if (ok) {
      formRef.current?.reset();
      setErrors({});
      setAttempted(false);
      setSent(true);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={submitting}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id={ids.name} label="Full name" required error={errors.name}>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            onChange={onFieldChange}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy(ids.name, { error: errors.name })}
            required
            className="field-input"
          />
        </Field>
        <Field id={ids.email} label="Email address" required error={errors.email}>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="jane@company.com"
            onChange={onFieldChange}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy(ids.email, { error: errors.email })}
            required
            className="field-input"
          />
        </Field>
      </div>

      <Field id="contact-subject" label="Subject" required>
        <select
          id="contact-subject"
          name="subject"
          defaultValue="Project inquiry"
          className="field-input"
        >
          <option>Project inquiry</option>
          <option>General question</option>
          <option>Partnership</option>
          <option>Careers</option>
        </select>
      </Field>

      <Field
        id={ids.message}
        label="Message"
        required
        error={errors.message}
        hint="Share your goals, timeline, and budget if you have one."
      >
        <textarea
          id={ids.message}
          name="message"
          rows={5}
          placeholder="Tell us about your project…"
          onChange={onFieldChange}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy(ids.message, {
            error: errors.message,
            hint: 'Share your goals, timeline, and budget if you have one.',
          })}
          required
          className="field-input resize-y"
        />
      </Field>

      <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full">
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {submitting ? 'Sending…' : 'Send Message'}
      </button>

      <p role="status" className="min-h-5 text-center text-sm text-success">
        {sent && (
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4" aria-hidden="true" /> Your message was sent. We&apos;ll reply within 24 hours.
          </span>
        )}
      </p>
    </form>
  );
}
