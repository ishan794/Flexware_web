'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function WayzPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Wayz</h1>
        <p className="text-lg text-muted mb-8 max-w-2xl">
          Vehicle Rental Platform for Modern Travelers — A comprehensive rental platform with seamless booking, local insights, and integrated navigation.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {['Flutter', 'Dart', 'Firebase', 'NodeJS', 'AWS', 'Push Notification'].map((t) => (
            <span key={t} className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg">{t}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[['Category', 'Travel & Transportation'], ['Client', 'Tourism Technology Startup'], ['Duration', '2 months'], ['Status', 'Completed']].map(([k, v]) => (
            <div key={k} className="glass-card rounded-xl p-4">
              <div className="text-xs text-muted mb-1">{k}</div>
              <div className="text-sm font-semibold">{v}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-muted leading-relaxed mb-6">
            Wayz revolutionizes the tourist transportation experience by combining vehicle rental with local tourism insights. 
            Built as both web and mobile platforms using Flutter and Dart, the system connects travelers with local 
            vehicle providers while offering integrated GPS navigation and tourist attraction recommendations. The platform 
            utilizes AWS infrastructure for scalability and PostgreSQL for robust data management.
          </p>
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {['Multi-platform vehicle booking', 'Tourist attraction recommendations', 'Dynamic pricing based on demand', 'Insurance integration', '24/7 customer support chat', 'Real-time GPS navigation'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-muted">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-rose mb-3">Challenges Faced</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">• Building scalable multi-tenant architecture</li>
                <li className="flex items-start gap-2">• Creating dynamic pricing algorithms</li>
                <li className="flex items-start gap-2">• Ensuring secure payment processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald mb-3">Solutions Implemented</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">• Microservices architecture on AWS</li>
                <li className="flex items-start gap-2">• ML-powered pricing optimization</li>
                <li className="flex items-start gap-2">• PCI-compliant payment infrastructure</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn btn-primary btn-lg group">
            Start a Similar Project
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
