import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import Reveal from '@/app/components/Reveal';
import ContactForm from './ContactForm';
import { getContent } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('contact');

export default async function ContactPage() {
  const site = await getContent('settings');
  const contactInfo = [
  { icon: Mail, label: 'Email us', value: site.email, sub: 'Send us an email anytime', href: `mailto:${site.email}` },
  { icon: Phone, label: 'Call us', value: site.phone, sub: 'Mon–Fri from 9 AM to 6 PM', href: site.phoneHref },
  { icon: MapPin, label: 'Locations', value: site.locations, sub: 'Global presence with local expertise' },
  { icon: Clock, label: 'Office hours', value: site.hours, sub: 'Emergency support 24/7 for existing clients' },
  ];

  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <SectionHeading
        as="h1"
        label="Contact"
        title="Get in touch"
        description="Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-5">
        <ul className="space-y-4 lg:col-span-2" aria-label="Contact details">
          {contactInfo.map((item, i) => {
            const Icon = item.icon;
            const body = (
              <>
                <span className="shrink-0 rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                  <span className="mt-0.5 block break-words text-sm text-primary-light">{item.value}</span>
                  <span className="mt-1 block text-sm text-muted">{item.sub}</span>
                </span>
              </>
            );
            return (
              <Reveal as="li" key={item.label} index={i}>
                {item.href ? (
                  <a href={item.href} className="glass-card card-interactive flex items-start gap-4 rounded-2xl p-5 sm:p-6">
                    {body}
                  </a>
                ) : (
                  <div className="glass-card flex items-start gap-4 rounded-2xl p-5 sm:p-6">{body}</div>
                )}
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="glass-card rounded-2xl p-6 sm:p-8 lg:col-span-3 lg:p-10" index={1}>
          <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
          <p className="mb-8 mt-2 text-sm text-muted">
            Fields marked <span className="text-error" aria-hidden="true">*</span>
            <span className="sr-only">with an asterisk</span> are required. We&apos;ll get back to you within 24 hours.
          </p>
          <ContactForm contactEmail={site.email} />
        </Reveal>
      </div>
    </div>
  );
}
