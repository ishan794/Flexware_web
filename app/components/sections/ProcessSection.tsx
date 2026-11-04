import { Search, Palette, Code, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We analyze your requirements and define project scope',
    icon: Search,
  },
  {
    number: '02',
    title: 'Design',
    description: 'Creating wireframes, prototypes, and technical architecture',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Development',
    description: 'Agile development with regular updates and feedback',
    icon: Code,
  },
  {
    number: '04',
    title: 'Deployment',
    description: 'Testing, optimization, and successful launch',
    icon: Rocket,
  },
];

const BLOB_CLIP =
  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)';

const BG_IMAGE =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15';

export default function ProcessSection() {
  return (
    <section id="process" className="relative isolate overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <img
        alt=""
        src={`${BG_IMAGE}&blend-mode=screen`}
        className="absolute inset-0 -z-10 size-full object-cover object-right opacity-10 md:object-center dark:hidden"
      />
      <img
        alt=""
        src={`${BG_IMAGE}&blend-mode=multiply`}
        className="absolute inset-0 -z-10 hidden size-full object-cover object-right md:object-center dark:block"
      />
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div
          style={{ clipPath: BLOB_CLIP }}
          className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-15 dark:opacity-20"
        />
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0">
        <div
          style={{ clipPath: BLOB_CLIP }}
          className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-15 dark:opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">How We Work</p>
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
            Our Development Process
          </h2>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
            We follow a proven methodology to ensure your project is delivered on time, within budget, and exceeds expectations.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-x-4 rounded-xl bg-white/30 p-6 ring-1 ring-gray-900/5 backdrop-blur-sm dark:bg-white/5 dark:inset-ring dark:inset-ring-white/5"
            >
              <step.icon aria-hidden="true" className="h-7 w-5 flex-none text-indigo-600 dark:text-indigo-400" />
              <div className="text-base/7">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{step.number}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
