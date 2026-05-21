'use client';

import React, { useRef, useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, thinking]);

  return (
    <div className="flex flex-col h-80 max-h-[50vh]">
      <div ref={listRef} className="p-3 space-y-2 overflow-auto flex-1">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2.5 rounded-xl ${m.role === 'user' ? 'bg-primary text-white' : 'bg-surface/60 text-foreground'}`}>
              <div className="text-sm">{m.text}</div>
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="bg-surface/60 text-foreground max-w-[80%] p-3 rounded-xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!value.trim()) return;
          onSend(value.trim());
          setValue('');
        }}
        className="p-3 border-t border-muted/10 flex gap-2 items-center"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <button type="submit" className="btn btn-primary btn-sm" disabled={thinking}>
          Send
        </button>
      </form>
    </div>
  );
}
