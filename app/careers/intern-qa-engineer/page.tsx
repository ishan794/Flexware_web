'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Clock } from 'lucide-react';

export default function InternQAPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Onsite</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Internship</span>
          <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">QA</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Intern QA Engineer</h1>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Role</h2>
          <p className="text-muted leading-relaxed">
            Quality is at the heart of what we do. We are seeking a detail-oriented Intern QA Engineer to join our 
            Quality Assurance team. In this role, you will help ensure that our software products meet the highest 
            standards of reliability and performance. You will work alongside developers and QAs to perform manual 
            and automated testing, identify bugs, and document issues. This role is perfect for someone with an 
            analytical mindset who enjoys breaking things to make them better.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-3 text-muted">
            {[
              'Current Undergraduate pursuing a degree in Computer Science, Software Engineering, or related field.',
              'Strong attention to detail and an analytical, problem-solving mindset.',
              'Basic understanding of software testing life cycle (STLC) and testing concepts.',
              'Familiarity with test automation tools or scripting is an advantage.',
              'Excellent written and verbal communication skills for effective bug reporting.',
            ].map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
          <p className="text-muted mb-2">Send your resume and cover letter to our careers email.</p>
          <p className="text-sm text-muted mb-6">
            Subject as: <span className="text-primary font-medium">Intern QA Engineer - {"<"}First Name{">"} {"<"}Last Name{">"}</span>
          </p>
          <a href="mailto:careers@flxwaretech.com" className="btn btn-primary group">
            <Mail className="w-4 h-4" /> careers@flxwaretech.com
          </a>
        </section>

        <div className="text-center">
          <Link href="/careers" className="btn btn-outline">
            <ArrowLeft className="w-4 h-4" /> View All Positions
          </Link>
        </div>
      </div>
    </div>
  );
}
