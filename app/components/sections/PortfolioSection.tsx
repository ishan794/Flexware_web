import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Expense Tracker',
    id: 'tier-expense-tracker',
    href: '/portfolio/expense-tracker',
    category: 'Mobile App',
    year: '2024',
    description: 'A comprehensive personal finance management app that helps users track expenses, set budgets, and achieve financial goals.',
    features: [
      'Expense Categorization',
      'Budget Planning',
      'Financial Reports',
      'Goal Tracking',
    ],
    technologies: ['Flutter', 'Node.js', 'Firebase'],
    mostPopular: false,
  },
  {
    name: 'Exercise Tracker',
    id: 'tier-exercise-tracker',
    href: '/portfolio/exercise-tracker',
    category: 'Mobile App',
    year: '2024',
    description: 'A fitness tracking application that monitors workouts, tracks progress, and provides personalized fitness recommendations.',
    features: [
      'Workout Logging',
      'Progress Analytics',
      'Custom Routines',
      'Personalized Recommendations',
    ],
    technologies: ['React Native', 'Firebase', 'Dart', 'Cloud Functions'],
    mostPopular: true,
  },
  {
    name: 'Wayz',
    id: 'tier-wayz',
    href: '/portfolio/wayz',
    category: 'Web & Mobile Platform',
    year: '2025',
    description: 'A vehicle rental platform designed specifically for tourists, offering seamless booking and local transportation solutions.',
    features: [
      'Vehicle Booking',
      'Tourist Guide Integration',
      'Payment Processing',
      'GPS Navigation',
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'NodeJS', 'AWS'],
    mostPopular: false,
  },
]

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PortfolioSection() {
  return (
    <div id="portfolio" className="bg-white py-24 sm:py-32 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Featured Work</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
            Our Portfolio
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
          Explore our recent projects and see how we&apos;ve helped businesses transform their ideas into successful digital solutions.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                tierIdx === 0 ? '-mr-px lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? '-ml-px lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white p-8 inset-ring inset-ring-gray-200 xl:p-10 dark:bg-gray-800/50 dark:inset-ring-gray-700',
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white',
                      'text-lg/8 font-semibold',
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm/6 text-gray-600 dark:text-gray-300">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {tier.category}
                  </span>
                  <span className="text-sm/6 font-semibold text-gray-600 dark:text-gray-400">· {tier.year}</span>
                </p>
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                    Key Features:
                  </p>
                  <ul role="list" className="space-y-3 text-sm/6 text-gray-600 dark:text-gray-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.technologies && tier.technologies.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/60">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                      Technologies:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700/60 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400'
                    : 'text-indigo-600 inset-ring inset-ring-indigo-200 hover:inset-ring-indigo-300 dark:bg-white/10 dark:text-white dark:inset-ring-white/5 dark:hover:bg-white/20 dark:hover:inset-ring-white/5 dark:focus-visible:outline-white/75',
                  'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500',
                )}
              >
                View Project Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
