'use client';

import { useState } from 'react';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Loader2, Send } from 'lucide-react';
import { showToast } from '../Toast';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email';
    if (!message.trim()) errs.message = 'Message is required';
    else if (message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${firstName} ${lastName}`, email, phone, message }),
      });
      if (!res.ok) throw new Error('Failed to send');
      showToast({ type: 'success', title: 'Message sent!', message: 'We\'ll be in touch soon.' });
      setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setMessage(''); setErrors({});
    } catch {
      showToast({ type: 'error', title: 'Something went wrong', message: 'Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `block w-full rounded-md bg-surface-light px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 placeholder:text-subtle focus:outline-2 focus:-outline-offset-2 transition-all ${
      errors[field] ? 'outline-rose/60 focus:outline-rose' : 'outline-edge focus:outline-primary'
    }`;

  return (
    <section id="contact-section" className="relative isolate">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden lg:w-1/2">
              <svg aria-hidden="true" className="absolute inset-0 size-full stroke-edge">
                <defs>
                  <pattern id="contact-grid" x="100%" y={-1} width={200} height={200} patternUnits="userSpaceOnUse">
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} className="fill-surface" />
                <svg x="100%" y={-1} className="overflow-visible fill-primary/5">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#contact-grid)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 block transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
              >
                <div
                  style={{
                    clipPath: 'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                  }}
                  className="aspect-1155/678 w-288.75 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-20"
                />
              </div>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
              Get in touch
            </h2>
            <p className="mt-6 text-lg/8 text-muted">
              Ready to start your next project? Reach out and let&apos;s discuss how 
              we can bring your vision to life.
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-muted">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>Digital Worldwide — Remote-First Studio</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Phone</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                    +1 (234) 567-890
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  <a href="mailto:hello@flxware.com" className="hover:text-foreground transition-colors">
                    hello@flxware.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48" noValidate>
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name-cs" className="block text-sm/6 font-semibold text-foreground">First name *</label>
                <div className="mt-2.5">
                  <input id="first-name-cs" name="first-name" type="text" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass('firstName')} />
                  {errors.firstName && <p className="mt-1 text-xs text-rose">{errors.firstName}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="last-name-cs" className="block text-sm/6 font-semibold text-foreground">Last name *</label>
                <div className="mt-2.5">
                  <input id="last-name-cs" name="last-name" type="text" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass('lastName')} />
                  {errors.lastName && <p className="mt-1 text-xs text-rose">{errors.lastName}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email-cs" className="block text-sm/6 font-semibold text-foreground">Email *</label>
                <div className="mt-2.5">
                  <input id="email-cs" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass('email')} />
                  {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-foreground">Phone number</label>
                <div className="mt-2.5">
                  <input id="phone-number" name="phone-number" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full rounded-md bg-surface-light px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-edge placeholder:text-subtle focus:outline-2 focus:-outline-offset-2 focus:outline-primary" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message-cs" className="block text-sm/6 font-semibold text-foreground">Message *</label>
                <div className="mt-2.5">
                  <textarea id="message-cs" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass('message')} resize-none`} />
                  {errors.message && <p className="mt-1 text-xs text-rose">{errors.message}</p>}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {submitting ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
