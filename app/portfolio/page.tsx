'use client';

import Link from 'next/link';
import { ArrowRight, Smartphone, Globe } from 'lucide-react';

const projects = [
  {
    slug: 'expense-tracker',
    title: 'Expense Tracker',
    type: 'Mobile App',
    year: '2024',
    desc: 'A comprehensive personal finance management app that helps users track expenses, set budgets, and achieve financial goals.',
    features: ['Expense Categorization', 'Budget Planning', 'Financial Reports', 'Goal Tracking'],
    tech: ['Flutter', 'Node.js', 'Firebase'],
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    slug: 'exercise-tracker',
    title: 'Exercise Tracker',
    type: 'Mobile App',
    year: '2024',
    desc: 'A fitness tracking application that monitors workouts, tracks progress, and provides personalized fitness recommendations.',
    features: ['Workout Logging', 'Progress Analytics', 'Custom Routines', 'Personalized Recommendations'],
    tech: ['React Native', 'TypeScript', 'Firebase', 'Cloud Functions'],
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    slug: 'wayz',
    title: 'Wayz',
    type: 'Web & Mobile Platform',
    year: '2025',
    desc: 'A vehicle rental platform designed for tourists, offering seamless booking and local transportation solutions.',
    features: ['Vehicle Booking', 'Tourist Guide Integration', 'Payment Processing', 'GPS Navigation'],
    tech: ['Flutter', 'Dart', 'Firebase', 'NodeJS', 'AWS'],
    icon: <Globe className="w-5 h-5" />,
  },
];

export default function PortfolioPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Our Portfolio</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Explore our recent projects and see how we&apos;ve helped businesses transform their ideas into successful digital solutions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group glass-card rounded-2xl p-8 gradient-border block">
            <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-wider mb-4">
              {p.icon}
              {p.type} — {p.year}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{p.title}</h2>
            <p className="text-sm text-muted leading-relaxed mb-6">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-md">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary-light transition-colors">
              View Project Details
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
