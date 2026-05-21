'use client';

import { useEffect } from 'react';
import { useScrollAnimation, useCountUp } from '@/app/lib/animations';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  icon?: React.ReactNode;
}

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  label,
  duration = 2500,
  icon,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { count, start } = useCountUp(end, duration);

  useEffect(() => {
    if (isVisible) start();
  }, [isVisible, start]);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {icon && (
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      )}
      <div className="text-4xl md:text-5xl font-extrabold gradient-text-blue mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
