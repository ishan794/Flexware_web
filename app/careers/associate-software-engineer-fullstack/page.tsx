'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Clock } from 'lucide-react';

export default function AssociateSEPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Onsite</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Full-time</span>
          <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">Engineering</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Associate Software Engineer (Fullstack)</h1>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Role</h2>
          <p className="text-muted leading-relaxed mb-4">
            Start your career with impact as an Associate Software Engineer at Flxware. We are looking for promising 
            developers who are eager to learn and ready to contribute to real-world projects.
          </p>
          <p className="text-muted leading-relaxed">
            As an Associate Engineer, you will work closely with senior mentors and cross-functional teams to build and 
            maintain software solutions. You will participate in code reviews, help debug complex issues, and gradually 
            take ownership of features. This position offers a unique opportunity to refine your skills while working 
            with a modern tech stack including Laravel, Node.js, and React.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-3 text-muted">
            {[
              'BSc degree in Computer Science, Software Engineering, or related field.',
              'Completed a recognized software engineering internship or have relevant project experience.',
              'Solid understanding of core programming concepts and OOP principles.',
              'Basic proficiency in Laravel, Node.js, and Java.',
              'Familiarity with frontend development using React, Next.js, and SQL databases.',
              'Exposure to cloud platforms (AWS) and CI/CD concepts is a strong plus.',
              'A proactive attitude with a strong eagerness to learn and adapt to new technologies.',
              'Excellent communication skills and the ability to collaborate effectively within a team.',
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
            Subject as: <span className="text-primary font-medium">Associate Software Engineer (Fullstack) - {"<"}First Name{">"} {"<"}Last Name{">"}</span>
          </p>
          <a href="mailto:careers@flxwaretech.com" className="btn btn-primary group">
            <Mail className="w-4 h-4" /> careers@flxwaretech.com
          </a>
        </section>

        <div className="text-center">
          <Link href="/careers" className="btn btn-outline group">
            <ArrowLeft className="w-4 h-4" /> View All Positions
          </Link>
        </div>
      </div>
    </div>
  );
}

