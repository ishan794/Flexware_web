'use client';

interface WelcomeMessageProps {
  onQuickAction: (message: string) => void;
}

const quickActions = [
  { label: '🌐 I need a website', message: 'I need a website for my business' },
  { label: '📱 Build a mobile app', message: 'I want to build a mobile application' },
  { label: '🤖 AI integration', message: "I'm interested in AI solutions for my company" },
  { label: '💰 Get a quote', message: 'I would like to get a price quote for a project' },
];

export default function WelcomeMessage({ onQuickAction }: WelcomeMessageProps) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-8 animate-fade-up">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-glow">
        <span className="text-white text-2xl font-extrabold">FX</span>
      </div>

      {/* Welcome text */}
      <h3 className="text-lg font-bold text-foreground mb-2">
        Hi! I&apos;m Flxware AI 👋
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-8 max-w-[280px]">
        I can help you explore our services, get project estimates, and
        answer any questions about what we do.
      </p>

      {/* Quick Actions */}
      <div className="w-full space-y-2">
        <p className="text-xs text-subtle font-medium uppercase tracking-wider mb-3">
          Quick Actions
        </p>
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onQuickAction(action.message)}
            className="w-full text-left px-4 py-3 rounded-xl text-sm text-muted bg-surface-light/50 border border-edge hover:border-primary/30 hover:text-foreground hover:bg-primary/5 transition-all duration-200"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
