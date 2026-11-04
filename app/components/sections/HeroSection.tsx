"use client";

import { MotionConfig, motion } from "motion/react";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const BLOB_CLIP =
  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&q=80&sat=-100&exp=15";

export default function HeroSection({ hero: _hero }: { hero?: any } = {}) {
  // Plays once on page load / refresh: fade up with a short stagger
  // (MotionConfig drops the movement for reduced-motion users)
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  });

  return (
    <MotionConfig reducedMotion="user">
    <div id="home" className="bg-white transition-colors duration-300 dark:bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14">
        <img
          alt=""
          src={`${BG_IMAGE}&blend=111827&blend-mode=multiply`}
          className="absolute inset-0 -z-10 hidden size-full object-cover dark:block"
        />
        <img
          alt=""
          src={`${BG_IMAGE}&blend=fff&blend-mode=overlay`}
          className="absolute inset-0 -z-10 size-full object-cover opacity-10 dark:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{ clipPath: BLOB_CLIP }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <motion.div {...fadeUp(0.1)} className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
                Web · Mobile · Cloud · Enterprise Solutions.{" "}
                <a href="#services" className="font-semibold text-indigo-600 dark:text-indigo-400">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Explore <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </motion.div>
            <div className="text-center">
              <motion.h1 {...fadeUp(0.25)} className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
                Building Tomorrow&apos;s Software Solutions
              </motion.h1>
              <motion.p {...fadeUp(0.4)} className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
                We&apos;re a passionate team of developers creating innovative software that transforms businesses and
                empowers growth.
              </motion.p>
              <motion.div {...fadeUp(0.55)} className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#contact"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  Get started
                </a>
                <a href="#portfolio" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  View our work <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{ clipPath: BLOB_CLIP }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
