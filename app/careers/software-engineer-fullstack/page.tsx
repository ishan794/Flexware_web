'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Mail, MapPin, Clock } from 'lucide-react';

export default function SEPage() {
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

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Software Engineer (Fullstack)</h1>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Role</h2>
          <p className="text-muted leading-relaxed mb-4">
            Flxware Technologies is seeking a talented and driven Fullstack Software Engineer to become a core part of 
            our engineering team. In this role, you will be instrumental in designing, developing, and deploying robust 
            web applications that serve our global client base.
          </p>
          <p className="text-muted leading-relaxed">
            You will work across the entire technology stack, from crafting responsive and intuitive user interfaces with 
            React and Next.js to architecting scalable backend services using Laravel, Node.js, and Java. We value clean 
            code, innovative problem-solving, and a collaborative spirit.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-3 text-muted">
            {[
              'BSc degree in Computer Science, Software Engineering, or related field.',
              '1+ years of professional experience in full-stack software development.',
              'Strong proficiency in backend technologies: Laravel (PHP), Node.js, and Java.',
              'Solid experience with frontend frameworks: React.js or Next.js.',
              'In-depth knowledge of SQL, database design, and optimization.',
              'Experience with cloud services (AWS) and CI/CD pipelines (e.g., GitHub Actions, Jenkins).',
              'Demonstrated ability to write clean, maintainable, and efficient code.',
              'Strong problem-solving skills and ability to work in an agile environment.',
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
            Subject as: <span className="text-primary font-medium">Software Engineer (Fullstack) - {"<"}First Name{">"} {"<"}Last Name{">"}</span>
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
