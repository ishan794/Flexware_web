'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { showToast } from '../components/Toast';

const contactInfo = [
  { icon: <Mail className="w-5 h-5" />, label: 'Email Us', value: 'hello@flxwaretech.com', sub: 'Send us an email anytime', href: 'mailto:hello@flxwaretech.com' },
  { icon: <Phone className="w-5 h-5" />, label: 'Call Us', value: '+971 50 739 0610', sub: 'Mon-Fri from 9am to 6pm', href: 'tel:+971507390610' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Locations', value: 'USA, Sri Lanka', sub: 'Global presence with local expertise' },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Office Hours',
    value: 'Mon-Fri: 9AM-6PM PST',
    sub: 'Emergency support 24/7 for existing clients',
  },
];

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Project inquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email';
    if (!message.trim()) errs.message = 'Message is required';
    else if (message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error('Failed to send');
      showToast({ type: 'success', title: 'Message sent!', message: 'We\'ll get back to you within 24 hours.' });
      setName(''); setEmail(''); setSubject('Project inquiry'); setMessage(''); setErrors({});
    } catch {
      showToast({ type: 'error', title: 'Something went wrong', message: 'Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl bg-surface-light border text-foreground placeholder:text-subtle focus:outline-none focus:ring-1 transition-all ${
      errors[field] ? 'border-rose/60 focus:border-rose focus:ring-rose/20' : 'border-edge focus:border-primary/50 focus:ring-primary/20'
    }`;

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Get In Touch</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Ready to start your next project? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {contactInfo.map((item) => {
            const Wrapper = item.href ? 'a' : 'div';
            const wrapperProps = item.href ? { href: item.href, className: 'glass-card rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors cursor-pointer' } : { className: 'glass-card rounded-2xl p-6 flex items-start gap-4' };
            return (
              <Wrapper key={item.label} {...wrapperProps}>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-sm text-primary mt-0.5">{item.value}</div>
                  <div className="text-xs text-muted mt-1">{item.sub}</div>
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className="lg:col-span-3 glass-card rounded-2xl p-8 lg:p-10">
          <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
          <p className="text-sm text-muted mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className={inputClass('name')} />
                {errors.name && <p className="mt-1.5 text-xs text-rose">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass('email')} />
                {errors.email && <p className="mt-1.5 text-xs text-rose">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass('subject')}>
                <option>Project inquiry</option>
                <option>General question</option>
                <option>Partnership</option>
                <option>Careers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
              <textarea rows={5} placeholder="Tell us about your project, timeline, budget, and any specific requirements..." value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass('message')} resize-none`} />
              {errors.message && <p className="mt-1.5 text-xs text-rose">{errors.message}</p>}
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full group disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
