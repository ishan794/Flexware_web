'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function ExerciseTrackerPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Exercise Tracker</h1>
        <p className="text-lg text-muted mb-8 max-w-2xl">
          Your Personal Fitness Journey Companion — A comprehensive fitness tracking app with AI-powered recommendations and social features.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {['React Native', 'TypeScript', 'Firebase', 'Cloud Functions'].map((t) => (
            <span key={t} className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg">{t}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[['Category', 'Health & Fitness Mobile App'], ['Client', 'Fitness Technology Company'], ['Duration', '2 months'], ['Status', 'Completed']].map(([k, v]) => (
            <div key={k} className="glass-card rounded-xl p-4">
              <div className="text-xs text-muted mb-1">{k}</div>
              <div className="text-sm font-semibold">{v}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-muted leading-relaxed mb-6">
            The Exercise Tracker app was developed to address the need for a comprehensive fitness solution that goes 
            beyond simple workout logging. Using React Native for a native-like experience on both platforms, the app 
            integrates with various fitness devices and provides AI-powered workout recommendations. Firebase backend 
            ensures real-time data synchronization and social features that keep users motivated.
          </p>
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {['Comprehensive workout logging', 'AI-powered exercise recommendations', 'Progress analytics with charts', 'Custom workout routine builder', 'Nutrition tracking', 'Achievement system and badges'].map((f) => (
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
                <li className="flex items-start gap-2">• Building accurate progress analytics</li>
                <li className="flex items-start gap-2">• Creating engaging tracking features</li>
                <li className="flex items-start gap-2">• Optimizing battery usage during workouts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald mb-3">Solutions Implemented</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">• Advanced data processing algorithms</li>
                <li className="flex items-start gap-2">• Personalized motivational tracking</li>
                <li className="flex items-start gap-2">• Optimized background processing and sensor usage</li>
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
