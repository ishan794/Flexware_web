'use client';

import React, { useEffect, useState, useCallback } from 'react';
import AssistantAvatar from './AssistantAvatar';
import VoiceButton from './VoiceButton';
import ConversationPanel from './ConversationPanel';
import { speak } from './tts';

export type Message = { id: string; role: 'user' | 'assistant'; text: string };

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [assistantState, setAssistantState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: String(Date.now()), role: 'assistant', text: 'Hi — welcome to Flxware. How can I help you today?' },
      ]);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (!text || text.trim() === '') return;
    const userMsg: Message = { id: String(Date.now()), role: 'user', text };
    setMessages((m) => [...m, userMsg]);

    try {
      setThinking(true);
      setAssistantState('thinking');
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      const reply: string = data?.reply ?? 'Sorry, I could not process that right now.';
      setMessages((m) => [...m, { id: String(Date.now() + 1), role: 'assistant', text: reply }]);
      setThinking(false);
      setAssistantState('speaking');
      speak(reply, () => setAssistantState('idle'));
    } catch {
      setMessages((m) => [...m, { id: String(Date.now() + 1), role: 'assistant', text: 'There was an error reaching the assistant.' }]);
      setThinking(false);
      setAssistantState('idle');
    }
  }, [messages]);

  const onTranscript = useCallback((text: string) => {
    setAssistantState('listening');
    handleSend(text);
  }, [handleSend]);

  return (
    <div>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          aria-label="Open assistant"
          onClick={() => setOpen((s) => !s)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg flex items-center justify-center text-white ring-4 ring-primary/10"
        >
          <AssistantAvatar state={assistantState} />
        </button>
      </div>

      {open && (
        <div className="fixed bottom-28 right-3 left-3 md:left-auto md:right-6 z-50 w-auto md:w-[420px] bg-surface/80 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-muted/10 flex items-center gap-3">
            <AssistantAvatar state={assistantState} size="md" />
            <div>
              <div className="text-sm font-semibold">Flxware Assistant</div>
              <div className="text-xs text-muted">Here to help — ask about services, pricing, timelines.</div>
            </div>
            <div className="ml-auto">
              <VoiceButton onTranscript={onTranscript} disabled={thinking} />
            </div>
          </div>

          <ConversationPanel messages={messages} onSend={handleSend} thinking={thinking} />
        </div>
      )}
    </div>
  );
}
