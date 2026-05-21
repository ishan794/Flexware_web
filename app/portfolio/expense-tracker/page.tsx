'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function ExpenseTrackerPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Expense Tracker</h1>
        <p className="text-lg text-muted mb-8 max-w-2xl">
          Personal Finance Management Made Simple — A comprehensive mobile application for tracking expenses, budgets, and financial goals.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {['Flutter', 'Node.js', 'Firebase', 'Push Notifications'].map((t) => (
            <span key={t} className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg">{t}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[['Category', 'Mobile Application'], ['Client', 'Personal Finance Startup'], ['Duration', '1 month'], ['Status', 'Completed']].map(([k, v]) => (
            <div key={k} className="glass-card rounded-xl p-4">
              <div className="text-xs text-muted mb-1">{k}</div>
              <div className="text-sm font-semibold">{v}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-muted leading-relaxed mb-6">
            The Expense Tracker app addresses the common challenge of personal financial management by providing users 
            with a simple yet powerful tool to monitor their spending habits. Built with React Native for cross-platform 
            compatibility, the app features real-time expense categorization, intelligent budget suggestions, and 
            detailed financial analytics. The backend utilizes Node.js and MongoDB to ensure secure data handling and fast performance.
          </p>
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {['Intuitive expense categorization', 'Customizable budget planning', 'Detailed financial reports', 'Goal setting and progress monitoring', 'Cloud backup and synchronization', 'Offline mode functionality'].map((f) => (
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
                <li className="flex items-start gap-2">• Creating intuitive data visualization</li>
                <li className="flex items-start gap-2">• Ensuring cross-platform performance</li>
                <li className="flex items-start gap-2">• Building offline-first architecture</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald mb-3">Solutions Implemented</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">• Industry-standard encryption for all financial data</li>
                <li className="flex items-start gap-2">• Custom chart components optimized for mobile</li>
                <li className="flex items-start gap-2">• Robust local storage with sync capabilities</li>
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
