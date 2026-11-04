'use client';

import { useRef, useState } from 'react';
import { MapPin, Mail, Phone, Loader2, Send } from 'lucide-react';
import Field, { describedBy } from '../forms/Field';
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
    <section id="contact-section" aria-labelledby="contact-section-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface/60" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">Contact</p>
          <h2 id="contact-section-title" className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Get in touch
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Ready to start your next project? Reach out and let&apos;s discuss how we can bring your vision to life.
          </p>
          <dl className="mt-10 space-y-5 text-base text-muted">
            <div className="flex items-center gap-x-4">
              <dt>
                <span className="sr-only">Locations</span>
                <MapPin aria-hidden="true" className="h-6 w-6 text-primary" />
              </dt>
              <dd>{site.locations}</dd>
            </div>
            <div className="flex items-center gap-x-4">
              <dt>
                <span className="sr-only">Phone</span>
                <Phone aria-hidden="true" className="h-6 w-6 text-primary" />
              </dt>
              <dd>
                <a href={site.phoneHref} className="link-underline transition-colors hover:text-foreground">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-x-4">
              <dt>
                <span className="sr-only">Email</span>
                <Mail aria-hidden="true" className="h-6 w-6 text-primary" />
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link-underline break-all transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={submitting}
          aria-labelledby="contact-section-title"
          className="glass-card rounded-3xl p-6 shadow-elevated-lg sm:p-10"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            {textField('firstName', 'First name', 'text', 'given-name')}
            {textField('lastName', 'Last name', 'text', 'family-name')}
            {textField('email', 'Email', 'email', 'email', true)}
            <Field id="phone-number" label="Phone number" className="sm:col-span-2">
              <input
                id="phone-number"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className="field-input"
              />
            </Field>
            <Field id={ids.message} label="Message" required error={errors.message} className="sm:col-span-2">
              <textarea
                id={ids.message}
                name="message"
                rows={4}
                onChange={onFieldChange}
                aria-invalid={!!errors.message}
                aria-describedby={describedBy(ids.message, { error: errors.message })}
                required
                className="field-input resize-y"
              />
            </Field>
          </div>
          <div className="mt-8 flex justify-end">
            <button type="submit" disabled={submitting} className="btn btn-primary w-full sm:w-auto">
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
