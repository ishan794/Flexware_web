'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Clock } from 'lucide-react';

export default function InternSEPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm text-black mb-4">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Onsite</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Internship</span>
          <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">Engineering</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Intern Software Engineer (Fullstack)</h1>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Role</h2>
          <p className="text-black leading-relaxed mb-4">
            Kickstart your journey in the tech industry with Flxware&apos;s Software Engineering Internship. We provide 
            an immersive learning environment where you will gain hands-on experience in full-stack development.
          </p>
          <p className="text-black leading-relaxed">
            Under the guidance of experienced engineers, you will assist in coding, testing, and debugging applications. 
            You will be exposed to industry-standard practices and tools, giving you a solid foundation for your future 
            career. This internship is designed for students who are passionate about technology and ready to apply 
            their academic knowledge to practical challenges.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-3 text-black">
            {[
              'Current Undergraduate pursuing a degree in Computer Science, Software Engineering, or related field.',
              'Foundational knowledge of programming languages such as Java, JavaScript, or PHP.',
              'Strong interest in web development frameworks like React and Laravel.',
              'A fast learner with a genuine passion for technology and software development.',
              'Available for a minimum commitment of 6 months.',
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
          <p className="text-black mb-2">Send your resume and cover letter to our careers email.</p>
          <p className="text-sm text-black mb-6">
            Subject as: <span className="text-primary font-medium">Intern Software Engineer (Fullstack) - {"<"}First Name{">"} {"<"}Last Name{">"}</span>
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
