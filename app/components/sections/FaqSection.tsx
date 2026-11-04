'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer:
      "Project timelines vary based on complexity, but most projects range from 2-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer comprehensive maintenance and support packages to ensure your application continues to perform optimally after launch.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We specialize in React, React Native, Node.js, Python, and cloud platforms like AWS. We choose technologies based on your specific needs.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We provide regular updates through your preferred communication channels, including weekly progress reports and milestone reviews.",
  },
]

export default function FaqSection({ faqs: _faqs, email: _email }: { faqs?: any[]; email?: string } = {}) {
  return (
    <div id="faq" className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Frequently Asked Questions</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Quick answers to common questions about our services and process.
          </h2>
          <dl className="mt-16 divide-y divide-gray-900/10 dark:divide-white/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                    <span className="text-base/7 font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="size-6 text-indigo-600 group-data-open:hidden dark:text-indigo-400" />
                      <MinusSmallIcon aria-hidden="true" className="size-6 text-indigo-600 group-not-data-open:hidden dark:text-indigo-400" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
