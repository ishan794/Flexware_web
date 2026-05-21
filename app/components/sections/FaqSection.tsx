'use client';

const faqs = [
  {
    q: 'What services does Flxware offer?',
    a: 'We specialize in web development (Next.js, React), mobile apps (iOS, Android, cross-platform), AI solutions (chatbots, automation, ML), cloud infrastructure, and UI/UX design.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timelines vary by scope. A focused MVP can ship in 4-8 weeks. More complex platforms typically take 3-6 months. We provide clear timelines during the discovery phase.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Absolutely. We partner with startups at every stage — from MVP validation to scaling for Series A and beyond. We also offer flexible engagement models for early-stage teams.',
  },
  {
    q: 'What technologies do you use?',
    a: 'Our core stack includes Next.js, React Native, Node.js, Laravel, Python, PostgreSQL, Docker, and cloud platforms like AWS and Vercel. We choose the best tech for each project.',
  },
  {
    q: 'Do you provide ongoing support?',
    a: 'Yes. We offer maintenance, monitoring, and optimization packages post-launch. Many clients stay with us for long-term product evolution and scaling support.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply reach out via our contact form or the AI assistant. We\'ll schedule a discovery call to understand your vision and provide a tailored proposal within days.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Frequently asked questions
        </h2>
        <p className="mt-6 max-w-2xl text-base/7 text-muted">
          Have a different question? Reach out to us at{' '}
          <a href="mailto:hello@flxware.com" className="font-semibold text-primary hover:text-primary-light">
            hello@flxware.com
          </a>
          {' '}and we&apos;ll get back to you as soon as we can.
        </p>
        <div className="mt-20">
          <dl className="space-y-8 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="text-base/7 font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-base/7 text-muted">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
