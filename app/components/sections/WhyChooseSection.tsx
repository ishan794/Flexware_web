import { Code2, Smartphone, Cloud, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'Tailored software solutions built to your exact specifications and business needs.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Excellence',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Scalable cloud solutions that grow with your business and ensure optimal performance.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Ongoing maintenance and support to keep your applications running smoothly.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="relative bg-white dark:bg-gray-900">
      <div className="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-2/5">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
        <svg
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute -bottom-24 left-24 w-231.5 transform-gpu blur-[118px]"
        >
          <path
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            fill="url(#why-choose-gradient)"
            fillOpacity=".4"
          />
          <defs>
            <linearGradient
              id="why-choose-gradient"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative mx-auto max-w-7xl py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-12 lg:w-3/5 lg:pr-0 lg:pl-16 xl:pl-20">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Our Advantages</h2>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Why Choose Flxware?
          </p>
          <p className="mt-4 max-w-xl text-base/7 text-gray-600 dark:text-gray-300">
            We combine cutting-edge technology with proven methodologies to deliver software that exceeds expectations.
          </p>
          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                    <reason.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {reason.title}
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">{reason.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
