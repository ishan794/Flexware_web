'use client';

import Link from 'next/link';
import { ArrowRight, Code2, Smartphone, Building2, Cloud, Globe, Wrench, Star, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Web Application Development',
    desc: 'Custom web applications built with modern frameworks like React, Vue, and Angular. Responsive, fast, and user-friendly interfaces that work seamlessly across all devices.',
    features: ['Responsive Design', 'Modern Frameworks', 'API Integration', 'Performance Optimization'],
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile App Development',
    desc: 'Native iOS and Android applications, as well as cross-platform solutions using React Native and Flutter. Delivering exceptional mobile experiences.',
    features: ['Native Development', 'Cross-Platform', 'App Store Deployment', 'Push Notifications'],
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Enterprise Solutions',
    desc: 'Scalable enterprise software solutions including CRM systems, inventory management, and business process automation tools.',
    features: ['Scalable Architecture', 'Business Process Automation', 'Data Analytics', 'Custom Integrations'],
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud Integration',
    desc: 'Seamless cloud migration and integration services using AWS, Google Cloud, and Azure. Ensuring your applications are scalable and reliable.',
    features: ['Cloud Migration', 'Serverless Architecture', 'Microservices', 'DevOps Integration'],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'API Development',
    desc: 'RESTful and GraphQL API development for seamless data exchange between applications. Secure, documented, and efficient APIs.',
    features: ['RESTful APIs', 'GraphQL', 'Documentation', 'Security Implementation'],
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Maintenance & Support',
    desc: 'Ongoing maintenance, updates, and technical support to ensure your applications continue to perform optimally and stay secure.',
    features: ['24/7 Support', 'Regular Updates', 'Security Patches', 'Performance Monitoring'],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Our Services</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          We offer comprehensive software development services to help your business thrive in the digital age.
        </p>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {services.map((s) => (
          <div key={s.title} className="glass-card rounded-2xl p-8 lg:p-10 gradient-border">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
              {s.icon}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{s.title}</h2>
            <p className="text-muted leading-relaxed mb-6">{s.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {s.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass-card rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your project requirements and find the right approach.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg group">
            Start a Project
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
