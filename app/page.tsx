'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Brain,
  Cloud,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  HeartHandshake,
} from 'lucide-react';
import SectionHeading from './components/SectionHeading';
import { useScrollAnimation, staggerStyle } from './lib/animations';
import Banner from './components/sections/Banner';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import StatsSection from './components/sections/StatsSection';
import LogoCloud from './components/sections/LogoCloud';
import TeamSection from './components/sections/TeamSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import FaqSection from './components/sections/FaqSection';
import ContactSection from './components/sections/ContactSection';

const services = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Web Development',
    description: 'Custom web applications built with Next.js, React, and modern frameworks. Scalable, fast, and beautiful.',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences for iOS and Android. Intuitive design meets powerful functionality.',
    iconBg: 'bg-accent/10 text-accent',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Solutions',
    description: 'Intelligent chatbots, automation, and machine learning integrations that give your business a competitive edge.',
    iconBg: 'bg-secondary/10 text-secondary',
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud & DevOps',
    description: 'Scalable infrastructure, CI/CD pipelines, Docker, and cloud architecture for reliable, high-performance systems.',
    iconBg: 'bg-emerald/10 text-emerald',
  },
];

const processSteps = [
  { icon: <Sparkles className="w-5 h-5" />, title: 'Discovery', desc: 'We understand your vision, goals, and technical requirements.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Design & Build', desc: 'Our team crafts pixel-perfect designs and robust architecture.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Test & Launch', desc: 'Rigorous QA testing followed by seamless deployment.' },
  { icon: <HeartHandshake className="w-5 h-5" />, title: 'Support & Grow', desc: 'Ongoing maintenance, optimization, and scaling.' },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`group relative glass-card rounded-2xl p-8 gradient-border transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={staggerStyle(index, 150)}
    >
      <div className={`inline-flex p-3 rounded-xl ${service.iconBg} mb-6 transition-transform group-hover:scale-110`}>
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-6">{service.description}</p>
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground transition-colors group/link"
      >
        Learn more
        <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
      </Link>
    </div>
  );
}

function ProcessStep({ step, index }: { step: (typeof processSteps)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center text-center transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={staggerStyle(index, 150)}
    >
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary border border-primary/20">
          {step.icon}
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
      <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Banner />
      <HeroSection />
      <LogoCloud />

      {/* Services */}
      <section id="services-preview" className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="What We Do"
            title="Solutions That Drive Growth"
            description="We combine cutting-edge technology with strategic thinking to deliver digital solutions that make a real impact."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <StatsSection />

      {/* Process */}
      <section id="process" className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="How We Work"
            title="From Vision to Reality"
            description="Our proven process ensures every project is delivered on time, on budget, and beyond expectations."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <TestimonialsSection />
      {/* Technologies */}
      <section id="technologies" className="section-padding relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Tech Stack"
            title="Technologies We Use"
            description="We leverage cutting-edge technologies and frameworks to build robust, scalable solutions."
          />
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Node.js', 'MongoDB', 'AWS', 'Flutter', 'TypeScript'].map((tech, i) => (
              <TechCard key={tech} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
      <ContactSection />

      {/* CTA */}
      <section id="cta" className="section-padding relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto">
          <div className="relative glass-card rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-balance">
                Ready to{' '}
                <span className="gradient-text">Transform</span> Your Business?
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto mb-10">
                Let&apos;s discuss your project and explore how we can bring your
                vision to life with cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn btn-primary btn-lg group">
                  Get a Free Consultation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/services" className="btn btn-outline btn-lg">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TechCard({ tech, index }: { tech: string; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`group px-8 py-5 rounded-2xl glass-card border border-edge hover:border-primary/30 hover:bg-primary/5 hover:scale-105 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={staggerStyle(index, 100)}
    >
      <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
        {tech}
      </span>
    </div>
  );
}

