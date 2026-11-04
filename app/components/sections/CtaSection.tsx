export default function CtaSection() {
  return (
    <div className="bg-indigo-50/60 dark:bg-indigo-950/40 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Let&apos;s discuss how we can help bring your software vision to life. Contact us today for a free consultation.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-0 lg:shrink-0">
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-xl bg-indigo-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-indigo-500/25 dark:hover:bg-indigo-400 dark:hover:shadow-indigo-400/40 dark:focus-visible:outline-indigo-500 animate-pulse-soft"
          >
            Get Free Consultation
          </a>
          <a
            href="#services"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:border-indigo-600 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-100 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
          >
            <span>Our Services</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
