'use client';

interface AssistantAvatarProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking';
  size?: 'sm' | 'md' | 'lg';
}

export default function AssistantAvatar({
  state = 'idle',
  size = 'md',
}: AssistantAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          state === 'speaking'
            ? 'bg-primary/20 scale-150 animate-pulse-soft'
            : state === 'listening'
            ? 'bg-rose/20 scale-130 animate-pulse-soft'
            : state === 'thinking'
            ? 'bg-secondary/20 scale-125 animate-pulse-soft'
            : 'bg-transparent scale-100'
        }`}
      />

      {/* Avatar circle */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center`}
      >
        {/* Inner icon / visual */}
        {state === 'thinking' ? (
          <ThinkingDots />
        ) : state === 'speaking' ? (
          <SpeakingWave />
        ) : state === 'listening' ? (
          <ListeningPulse />
        ) : (
          <span className="text-white font-bold text-xs">FX</span>
        )}
      </div>

      {/* Status indicator */}
      <span
        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface transition-colors ${
          state === 'idle'
            ? 'bg-emerald'
            : state === 'listening'
            ? 'bg-rose animate-pulse-soft'
            : state === 'speaking'
            ? 'bg-primary animate-pulse-soft'
            : 'bg-amber animate-pulse-soft'
        }`}
      />
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-white rounded-full"
          style={{
            animation: 'typing-dot 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function SpeakingWave() {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-0.5 bg-white rounded-full"
          style={{
            height: '8px',
            animation: 'wave 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

function ListeningPulse() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="w-2.5 h-2.5 bg-white rounded-full" />
      <span
        className="absolute w-2.5 h-2.5 bg-white/50 rounded-full"
        style={{ animation: 'ripple 1.5s ease-out infinite' }}
      />
    </div>
  );
}
