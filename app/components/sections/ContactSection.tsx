'use client';

import { useRef, useState } from 'react';
import { MapPin, Mail, Phone, Loader2, Send } from 'lucide-react';
import Field, { describedBy } from '../forms/Field';
import Reveal from '../Reveal';
import { focusFirstError, submitContact, validateEmail, validateMessage } from '../../lib/contact';
import type { SiteSettings } from '../../lib/cms/types';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const ids = { firstName: 'first-name-cs', lastName: 'last-name-cs', email: 'email-cs', message: 'message-cs' };

export default function ContactSection({ settings: site }: { settings: SiteSettings }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Inputs are uncontrolled so text typed before hydration is never lost; values are read from the form
  const read = () => {
    const fd = new FormData(formRef.current ?? undefined);
    const get = (k: string) => String(fd.get(k) ?? '');
    return { firstName: get('firstName'), lastName: get('lastName'), email: get('email'), phone: get('phone'), message: get('message') };
  };
  type Values = ReturnType<typeof read>;

  const validate = (v: Values): FormErrors => ({
    firstName: v.firstName.trim() ? undefined : 'First name is required',
    lastName: v.lastName.trim() ? undefined : 'Last name is required',
    email: validateEmail(v.email),
    message: validateMessage(v.message),
  });

  const onFieldChange = () => {
    if (attempted) setErrors(validate(read()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setAttempted(true);
    const values = read();
    const v = validate(values);
    setErrors(v);
    if (Object.values(v).some(Boolean)) {
      focusFirstError(formRef.current, { ...v }, ids);
      return;
    }

    setSubmitting(true);
    const ok = await submitContact({
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      message: values.message,
      source: 'home',
    }, site.email);
    setSubmitting(false);
    if (ok) {
      formRef.current?.reset();
      setErrors({});
      setAttempted(false);
    }
  };

  const textField = (key: keyof FormErrors, label: string, type: string, autoComplete: string, span = false) => (
    <Field id={ids[key]} label={label} required error={errors[key]} className={span ? 'sm:col-span-2' : ''}>
      <input
        id={ids[key]}
        name={key}
        type={type}
        autoComplete={autoComplete}
        onChange={onFieldChange}
        aria-invalid={!!errors[key]}
        aria-describedby={describedBy(ids[key], { error: errors[key] })}
        required
        className="field-input"
      />
    </Field>
  );

  return (
    <section id="contact-section" aria-labelledby="contact-section-title" className="section-padding">
      <Reveal className="mx-auto grid max-w-[76rem] overflow-hidden rounded-[2rem] border border-edge bg-surface shadow-elevated-lg lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Brand panel — fixed navy in both themes */}
        <div className="relative overflow-hidden bg-[#0b1f3a] p-8 text-white sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(184,232,192,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(184,232,192,0.07) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'linear-gradient(to bottom, #000, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent 85%)',
            }}
          />
          <div className="relative flex h-full flex-col">
            <p className="mb-4 inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[#b8e8c0]">
              <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-[#b8e8c0]" />
              Contact
            </p>
            <h2 id="contact-section-title" className="text-h2 text-white">
              Let&apos;s build something together
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#c9d6e8] sm:text-lg">
              Tell us about your idea. We reply to every message within 24 hours.
            </p>
            <ul className="mt-10 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10">
                  <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-[#b8e8c0]" />
                  <span className="min-w-0">
                    <span className="block text-xs text-[#9fb2cc]">Email</span>
                    <span className="block truncate font-medium">{site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10">
                  <Phone aria-hidden="true" className="h-5 w-5 shrink-0 text-[#b8e8c0]" />
                  <span>
                    <span className="block text-xs text-[#9fb2cc]">Phone</span>
                    <span className="block font-medium">{site.phone}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-white/10 p-4">
                <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#b8e8c0]" />
                <span>
                  <span className="block text-xs text-[#9fb2cc]">Locations</span>
                  <span className="block font-medium">{site.locations} · Remote-first</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={submitting}
          aria-labelledby="contact-section-title"
          className="p-6 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            {textField('firstName', 'First name', 'text', 'given-name')}
            {textField('lastName', 'Last name', 'text', 'family-name')}
            {textField('email', 'Email', 'email', 'email')}
            <Field id="phone-number" label="Phone number">
              <input id="phone-number" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field-input" />
            </Field>
            <Field id={ids.message} label="Message" required error={errors.message} className="sm:col-span-2">
              <textarea
                id={ids.message}
                name="message"
                rows={5}
                onChange={onFieldChange}
                placeholder="What are you building, and what does success look like?"
                aria-invalid={!!errors.message}
                aria-describedby={describedBy(ids.message, { error: errors.message })}
                required
                className="field-input resize-y"
              />
            </Field>
          </div>
          <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-subtle">
              Fields marked <span className="text-error" aria-hidden="true">*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>
            <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full sm:w-auto">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
