'use client';

import AssistantAvatar from './AssistantAvatar';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBubbleProps {
  message: ChatMessage;
  isLatest?: boolean;
}

export default function ChatBubble({ message, isLatest = false }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${
        isLatest ? 'animate-fade-up' : ''
      }`}
    >
      {/* Avatar (assistant only) */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <AssistantAvatar state="idle" size="sm" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-primary/20 text-foreground rounded-br-md'
            : 'bg-surface-lighter text-foreground rounded-bl-md'
        }`}
      >
        {/* Message content */}
        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* Timestamp */}
        <p
          className={`text-[10px] mt-2 ${
            isUser ? 'text-primary-light/50 text-right' : 'text-subtle'
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

/**
 * Typing indicator shown while AI is generating a response.
 */
export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 mt-1">
        <AssistantAvatar state="thinking" size="sm" />
      </div>
      <div className="bg-surface-lighter rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-muted rounded-full"
              style={{
                animation: 'typing-dot 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export type { ChatMessage };
