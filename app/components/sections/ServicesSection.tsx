import { Globe, Smartphone, Building2, Cloud, Network, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Application Development',
    description:
      'Custom web applications built with modern frameworks like React, Vue, and Angular. Responsive, fast, and user-friendly interfaces that work seamlessly across all devices.',
    features: ['Responsive Design', 'Modern Frameworks', 'API Integration', 'Performance Optimization'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native iOS and Android applications, as well as cross-platform solutions using React Native and Flutter. Delivering exceptional mobile experiences.',
    features: ['Native Development', 'Cross-Platform', 'App Store Deployment', 'Push Notifications'],
  },
  {
    icon: Building2,
    title: 'Enterprise Solutions',
    description:
      'Scalable enterprise software solutions including CRM systems, inventory management, and business process automation tools.',
    features: ['Scalable Architecture', 'Business Process Automation', 'Data Analytics', 'Custom Integrations'],
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description:
      'Seamless cloud migration and integration services using AWS, Google Cloud, and Azure. Ensuring your applications are scalable and reliable.',
    features: ['Cloud Migration', 'Serverless Architecture', 'Microservices', 'DevOps Integration'],
  },
  {
    icon: Network,
    title: 'API Development',
    description:
      'RESTful and GraphQL API development for seamless data exchange between applications. Secure, documented, and efficient APIs.',
    features: ['RESTful APIs', 'GraphQL', 'Documentation', 'Security Implementation'],
  },
  {
    icon: ShieldCheck,
    title: 'Maintenance & Support',
    description:
      'Ongoing maintenance, updates, and technical support to ensure your applications continue to perform optimally and stay secure.',
    features: ['24/7 Support', 'Regular Updates', 'Security Patches', 'Performance Monitoring'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">What We Offer</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Our Services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            We offer comprehensive software development services to help your business thrive in the digital age.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-gray-50/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white hover:shadow-lg dark:border-gray-800 dark:bg-gray-800/40 dark:hover:border-indigo-500/40 dark:hover:bg-gray-800"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs dark:bg-indigo-500">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-gray-900/60 dark:text-gray-300 dark:ring-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
