'use client';

import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Briefcase, Clock } from 'lucide-react';

const positions = [
  { slug: 'software-engineer-fullstack', title: 'Software Engineer (Fullstack)', dept: 'Engineering', type: 'Onsite', commitment: 'Full-time' },
  { slug: 'associate-software-engineer-fullstack', title: 'Associate Software Engineer (Fullstack)', dept: 'Engineering', type: 'Onsite', commitment: 'Full-time' },
  { slug: 'intern-software-engineer-fullstack', title: 'Intern Software Engineer (Fullstack)', dept: 'Engineering', type: 'Onsite', commitment: 'Internship' },
  { slug: 'intern-qa-engineer', title: 'Intern QA Engineer', dept: 'QA', type: 'Onsite', commitment: 'Internship' },
  { slug: 'intern-business-analyst', title: 'Intern Business Analyst', dept: 'Product', type: 'Onsite', commitment: 'Internship' },
];

export default function CareersPage() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Briefcase className="w-4 h-4" /> We&apos;re Hiring
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Build the Future With Us</h1>
        <p className="text-lg text-black max-w-2xl mx-auto mb-8">
          Join a team of passionate innovators dedicated to creating exceptional digital experiences. 
          At Flxware, your work matters.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
        <div className="space-y-4">
          {positions.map((p) => (
            <Link
              key={p.slug}
              href={`/careers/${p.slug}`}
              className="group glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 gradient-border"
            >
              <div>
                <h3 className="text-lg font-bold text-black group-hover:text-primary transition-colors">{p.title}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-black">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {p.type}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.commitment}</span>
                  <span className="flex items-center gap-1.5">{p.dept}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-primary shrink-0">
                View Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass-card rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl font-bold mb-4">Don&apos;t See the Right Role?</h2>
          <p className="text-black mb-8 max-w-lg mx-auto">
            We&apos;re always looking for talented individuals. Send us your resume and tell us how you can contribute.
          </p>
          <a href="mailto:careers@flxwaretech.com" className="btn btn-primary btn-lg group">
            <Mail className="w-4 h-4" />
            careers@flxwaretech.com
          </a>
        </div>
      </div>
    </div>
  );
}
