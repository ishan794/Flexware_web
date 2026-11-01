"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { BackgroundCubesGrid } from "@/components/ui/background-cubes-grid";
import { useTheme } from "@/app/lib/theme-context";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

function HeroContent() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  });

  return (
    <div className="pointer-events-none mx-auto flex max-w-[1080px] flex-col items-center text-center antialiased">
      <motion.div
        {...fadeUp(0.1)}
        className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 ring-1 ring-indigo-500/20 dark:text-indigo-400 dark:bg-indigo-950/70 dark:ring-indigo-500/30"
      >
        <span>Innovative Software Development</span>
      </motion.div>

      <motion.h1
        {...fadeUp(0.25)}
        className="max-w-[22ch] text-[clamp(34px,5vw,64px)] leading-[1.2] font-extrabold tracking-[-0.03em] text-balance text-gray-900 dark:text-white"
      >
        Building Tomorrow&apos;s Software Solutions
      </motion.h1>

      <motion.p
        {...fadeUp(0.4)}
        className="mt-6 max-w-[650px] text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-pretty text-gray-600 dark:text-gray-300"
      >
        We&apos;re a passionate team of developers creating innovative software that transforms businesses and empowers growth.
      </motion.p>

      <motion.div
        {...fadeUp(0.55)}
        className="pointer-events-auto mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <a
          href="#portfolio"
          className="inline-flex h-12 items-center rounded-xl px-7 text-[15px] font-semibold transition-all duration-300 hover:scale-105 active:scale-95 bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
        >
          View Our Work
        </a>
        <a
          href="#contact"
          className="inline-flex h-12 items-center rounded-xl px-7 text-[15px] font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-gray-900 border border-gray-300 bg-white/70 hover:bg-white hover:border-gray-400 backdrop-blur-sm dark:text-white dark:border-white/20 dark:bg-transparent dark:hover:bg-white/10 dark:hover:border-white/30"
        >
          Get Started
        </a>
      </motion.div>

      <motion.p {...fadeUp(0.7)} className="mt-6 text-[13px] text-gray-500 dark:text-gray-400">
        Web · Mobile · Cloud · Enterprise Solutions
      </motion.p>
    </div>
  );
}

export function BackgroundCubesGridDemo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      id="home"
      suppressHydrationWarning
      className="relative isolate flex min-h-[50rem] w-full items-center justify-center overflow-hidden px-5 py-24 sm:px-8 bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300"
    >
      <BackgroundCubesGrid
        key={theme}
        className="-z-10"
        topColor={isDark ? "#0f172a" : "#f8fafc"}
        leftColor={isDark ? "#090d16" : "#e2e8f0"}
        rightColor={isDark ? "#05070c" : "#cbd5e1"}
        glowColor={isDark ? "#6366f1" : "#6366f1"}
        glow={isDark ? 0.85 : 0.75}
        cellSize={140}
        amplitude={0.75}
      />
      <HeroContent />
    </div>
  );
}

export default function HeroSection({ hero: _hero }: { hero?: any } = {}) {
  return <BackgroundCubesGridDemo />;
}
