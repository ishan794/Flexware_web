'use client';

import React, { useRef, useEffect, useState } from 'react';
import { SendHorizontal } from 'lucide-react';

type Message = { id: string; role: 'user' | 'assistant'; text: string };

export default function ConversationPanel({
  messages,
  onSend,
  thinking = false,
}: {
  messages: Message[];
  onSend: (text: string) => void;
  thinking?: boolean;
}) {
  const [value, setValue] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus the input when the panel opens so keyboard users can type immediately
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, thinking]);

  const canSend = value.trim().length > 0 && !thinking;

  return (
    <div className="flex h-96 max-h-[60vh] flex-col">
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
      >
        {messages.length === 0 && !thinking && (
          <p className="py-8 text-center text-sm text-subtle">Ask a question to get started.</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex animate-fade-in ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'rounded-br-md bg-primary-dark text-white'
                  : 'rounded-bl-md border border-edge bg-surface-light text-foreground'
              }`}
            >
              <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Assistant: '}</span>
              <span className="whitespace-pre-wrap break-words">{m.text}</span>
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-edge bg-surface-light px-4 py-3">
              <span className="sr-only">Assistant is typing…</span>
              <div className="flex gap-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-subtle"
                    style={{ animation: 'typing-dot 1.4s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSend) return;
          onSend(value.trim());
          setValue('');
        }}
        className="flex items-center gap-2 border-t border-edge p-3"
      >
        <label htmlFor="assistant-input" className="sr-only">
          Message the assistant
        </label>
        <input
          ref={inputRef}
          id="assistant-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message…"
          autoComplete="off"
          className="field-input min-h-10 flex-1 py-2"
        />
        <button type="submit" className="btn btn-primary btn-sm px-3" disabled={!canSend} aria-label="Send message">
          <SendHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
