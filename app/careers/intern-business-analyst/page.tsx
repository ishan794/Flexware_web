'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Clock } from 'lucide-react';

export default function InternBAPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Onsite</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Internship</span>
          <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">Product</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Intern Business Analyst</h1>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Role</h2>
          <p className="text-muted leading-relaxed mb-4">
            Flxware is looking for an Intern Business Analyst to help bridge the gap between business needs and technical 
            solutions. You will work with our product team to analyze requirements, document processes, and support 
            data-driven decision-making.
          </p>
          <p className="text-muted leading-relaxed">
            This role involves gathering requirements from stakeholders, creating documentation, and helping to manage 
            project backlogs. It&apos;s an excellent opportunity for students with a business or management background 
            who are interested in the technology sector.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-3 text-muted">
            {[
              'Current Undergraduate pursuing a degree in Business Management, IS, or related field.',
              'Strong analytical skills with the ability to document complex processes clearly.',
              'Proficiency in productivity tools (Microsoft Office / Google Workspace).',
              'Excellent communication and interpersonal skills to interact with various stakeholders.',
              'Ability to translate rough business needs into structured technical requirements.',
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
            Subject as: <span className="text-primary font-medium">Intern Business Analyst - {"<"}First Name{">"} {"<"}Last Name{">"}</span>
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
