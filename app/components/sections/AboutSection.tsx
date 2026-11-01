import { Lightbulb, Users, Award, Heart } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Projects', description: 'Successfully delivered across various industries' },
  { value: '4 Years', label: 'Experience', description: 'Of dedicated service and continuous growth' },
  { value: '100%', label: 'Satisfaction', description: 'Client satisfaction rate with ongoing support' },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay at the forefront of technology, continuously learning and adapting to deliver cutting-edge solutions.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in close partnership with our clients, working together to achieve shared goals and success.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Quality is never an accident. We maintain the highest standards in every aspect of our work.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do, and it shows in the dedication and enthusiasm we bring to every project.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main intro */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">About Us</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            About Flxware Technologies
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            We&apos;re a dynamic team of software developers, designers, and innovators passionate about creating technology solutions that make a real difference in the world.
          </p>
        </div>

        {/* Mission Card */}
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl bg-indigo-50/70 p-8 sm:p-12 dark:bg-gray-800/60 dark:ring-1 dark:ring-white/10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
          <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
            Founded in 2020, Flxware Technologies was born from a simple belief: that great software should be accessible to businesses of all sizes. We bridge the gap between complex technical requirements and practical business solutions.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
            Our mission is to empower businesses through innovative software solutions that drive growth, improve efficiency, and create exceptional user experiences. We&apos;re committed to delivering high-quality, scalable solutions that stand the test of time.
          </p>

          {/* Stats Grid inside Mission */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-indigo-200/60 pt-8 dark:border-gray-700">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-extrabold text-indigo-600 sm:text-4xl dark:text-indigo-400">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{stat.label}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Our Core Values</h3>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            These principles guide everything we do and help us maintain the highest standards in our work.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-800/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{v.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
