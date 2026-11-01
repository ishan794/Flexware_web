import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ContactSection({ settings: _settings }: { settings?: any } = {}) {
  return (
    <div id="contact" className="relative isolate bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2 dark:bg-gray-900 dark:ring-white/10">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} className="fill-white dark:fill-gray-900" />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-800/20">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 hidden transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))] dark:block"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                  }}
                  className="aspect-1155/678 w-288.75 bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-10 dark:opacity-20"
                />
              </div>
            </div>

            <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Get In Touch</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Ready to start your next project?
            </h2>
            <p className="mt-4 text-lg/8 text-gray-600 dark:text-gray-300">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Contact Information</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Get in touch through any of these channels</p>
            </div>

            <dl className="mt-6 space-y-6 text-base/7 text-gray-600 dark:text-gray-300">
              {/* Email */}
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-indigo-600 dark:text-indigo-400" />
                </dt>
                <dd>
                  <p className="font-semibold text-gray-900 dark:text-white">Email Us</p>
                  <a href="mailto:hello@flxwaretech.com" className="text-indigo-600 hover:underline dark:text-indigo-400">
                    hello@flxwaretech.com
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Send us an email anytime</p>
                </dd>
              </div>

              {/* Phone */}
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-indigo-600 dark:text-indigo-400" />
                </dt>
                <dd>
                  <p className="font-semibold text-gray-900 dark:text-white">Call Us</p>
                  <a href="tel:+971507390610" className="text-indigo-600 hover:underline dark:text-indigo-400">
                    +971 50 739 0610
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Mon-Fri from 9am to 6pm</p>
                </dd>
              </div>

              {/* Location */}
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Locations</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-indigo-600 dark:text-indigo-400" />
                </dt>
                <dd>
                  <p className="font-semibold text-gray-900 dark:text-white">Locations</p>
                  <p>USA, Sri Lanka</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Global presence with local expertise</p>
                </dd>
              </div>

              {/* Office Hours */}
              <div className="flex gap-x-4 border-t border-gray-200/60 pt-4 dark:border-gray-800">
                <dt className="flex-none">
                  <span className="sr-only">Office Hours</span>
                  <ClockIcon aria-hidden="true" className="h-7 w-6 text-indigo-600 dark:text-indigo-400" />
                </dt>
                <dd className="text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white">Office Hours</p>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                  <p>Sunday: Closed</p>
                  <p className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    Emergency support available 24/7 for existing clients
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Send us a Message
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

            <form action="#" method="POST" className="mt-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="full-name" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Full Name <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="full-name"
                      name="full-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="John Doe"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email-address" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Email Address <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email-address"
                      name="email-address"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="john@example.com"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Subject <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Project Inquiry"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Message <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your project..."
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
