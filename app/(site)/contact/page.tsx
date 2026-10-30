import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import PageHeader from '@/app/components/PageHeader';
import Reveal from '@/app/components/Reveal';
import ContactForm from './ContactForm';
import { getContent } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('contact');

export default async function ContactPage() {
  const site = await getContent('settings');
  const contactInfo = [
    { icon: Mail, label: 'Email', value: site.email, sub: 'Send us an email anytime', href: `mailto:${site.email}` },
    { icon: Phone, label: 'Phone', value: site.phone, sub: 'Mon–Fri, 9 AM to 6 PM', href: site.phoneHref },
    { icon: MapPin, label: 'Locations', value: site.locations, sub: 'Remote-first, with local expertise' },
    { icon: Clock, label: 'Office hours', value: site.hours, sub: 'Emergency support 24/7 for existing clients' },
  ];

  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's talk about your project"
        description="Ready to start your next project? Send us a message and we'll respond within 24 hours."
      />

      <div className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Reveal className="mx-auto grid max-w-[76rem] overflow-hidden rounded-[2rem] border border-edge bg-surface shadow-elevated-lg lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Brand panel — fixed navy in both themes */}
          <aside aria-label="Contact details" className="relative overflow-hidden bg-[#0b1f3a] p-8 text-white sm:p-10 lg:p-12">
            <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#b8e8c0]/15 blur-3xl" />
            <h2 className="text-h3 relative text-white">Reach us directly</h2>
            <ul className="relative mt-8 space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const body = (
                  <>
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#b8e8c0]" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs text-[#9fb2cc]">{item.label}</span>
                      <span className="block break-words font-medium">{item.value}</span>
                      <span className="mt-0.5 block text-sm text-[#9fb2cc]">{item.sub}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-2xl border border-white/10 p-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>

          <section aria-labelledby="send-message" className="p-6 sm:p-10 lg:p-12">
            <h2 id="send-message" className="text-h3 text-foreground">
              Send us a message
            </h2>
            <p className="mb-8 mt-2 text-sm text-muted">
              Fields marked <span className="text-error" aria-hidden="true">*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>
            <ContactForm contactEmail={site.email} />
          </section>
        </Reveal>
      </div>
    </>
  );
}
