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
    <section id="about" className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          {/* Intro, mission and photo */}
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">About Us</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl dark:text-white">
              About Flxware Technologies
            </h2>
            <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-400">
              We&apos;re a dynamic team of software developers, designers, and innovators passionate about creating technology solutions that make a real difference in the world.
            </p>
            <h3 className="mt-10 text-lg font-semibold text-gray-900 dark:text-white">Our Mission</h3>
            <p className="mt-3 text-base/7 text-gray-600 dark:text-gray-400">
              Founded in 2020, Flxware Technologies was born from a simple belief: that great software should be accessible to businesses of all sizes. We bridge the gap between complex technical requirements and practical business solutions.
            </p>
            <p className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
              Our mission is to empower businesses through innovative software solutions that drive growth, improve efficiency, and create exceptional user experiences. We&apos;re committed to delivering high-quality, scalable solutions that stand the test of time.
            </p>
            <img
              alt="The Flxware team collaborating"
              loading="lazy"
              src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=1344&h=1104&q=80"
              className="mt-12 aspect-6/5 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 lg:aspect-auto lg:h-96 dark:outline-white/10"
            />
          </div>

          {/* Core values and stats */}
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Our Core Values</h3>
            <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
              These principles guide everything we do and help us maintain the highest standards in our work.
            </p>
            <ul role="list" className="mt-8 divide-y divide-gray-100 dark:divide-gray-800">
              {values.map((v) => (
                <li key={v.title} className="flex gap-x-5 py-6">
                  <span className="flex size-10 flex-none items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                    <v.icon aria-hidden="true" className="size-5 text-white" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{v.title}</p>
                    <p className="mt-1 text-base/7 text-gray-600 dark:text-gray-400">{v.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-4 grid grid-cols-1 gap-6 border-t border-gray-100 pt-8 sm:grid-cols-3 dark:border-gray-800">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="text-sm/6 font-semibold text-gray-900 dark:text-white">{stat.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-400">{stat.value}</dd>
                  <dd className="mt-1 text-xs/5 text-gray-600 dark:text-gray-400">{stat.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
