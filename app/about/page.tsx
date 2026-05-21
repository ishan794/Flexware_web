'use client';

import { Rocket, Users, Award, Heart } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const values = [
  { icon: <Rocket className="w-6 h-6" />, title: 'Innovation', desc: 'We stay at the forefront of technology, continuously learning and adapting to deliver cutting-edge solutions.' },
  { icon: <Users className="w-6 h-6" />, title: 'Collaboration', desc: 'We believe in close partnership with our clients, working together to achieve shared goals and success.' },
  { icon: <Award className="w-6 h-6" />, title: 'Excellence', desc: 'Quality is never an accident. We maintain the highest standards in every aspect of our work.' },
  { icon: <Heart className="w-6 h-6" />, title: 'Passion', desc: 'We love what we do, and it shows in the dedication and enthusiasm we bring to every project.' },
];

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '4', label: 'Years of Service' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function AboutPage() {
  return (
    <div className="pt-12 pb-24">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About Flxware Technologies</h1>
            <p className="text-lg text-muted leading-relaxed mb-6">
              We&apos;re a dynamic team of software developers, designers, and innovators passionate about 
              creating technology solutions that make a real difference.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg group">
              Get in Touch
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold gradient-text mb-1">{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <div className="glass-card rounded-3xl p-10 md:p-14">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-muted leading-relaxed mb-4">
            Founded with a vision to bridge the gap between innovative ideas and practical software solutions, 
            Flxware Technologies specializes in creating robust, scalable applications that drive business success.
          </p>
          <p className="text-muted leading-relaxed">
            Our mission is to empower businesses through innovative software solutions that drive growth, 
            improve efficiency, and create exceptional user experiences. We&apos;re committed to delivering 
            high-quality, scalable solutions that stand the test of time.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="glass-card rounded-2xl p-8 text-center">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-5">{v.icon}</div>
              <h3 className="text-lg font-bold mb-3">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Journey */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass-card rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Founded in 2020, Flxware Technologies was born from a simple belief: that great software should 
            be accessible to businesses of all sizes. We bridge the gap between complex technical requirements 
            and practical business solutions.
          </p>
          <Link href="/portfolio" className="btn btn-primary btn-lg group">
            View Our Work
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
