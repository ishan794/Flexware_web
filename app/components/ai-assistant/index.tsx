'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import AssistantAvatar from './AssistantAvatar';
import VoiceButton from './VoiceButton';
import ConversationPanel from './ConversationPanel';
import { speak } from './tts';
import { OPEN_ASSISTANT_EVENT } from './events';
import { processMessage } from '../../lib/conversation-engine';

export type Message = { id: string; role: 'user' | 'assistant'; text: string };

export default function AiAssistant({ contactEmail }: { contactEmail: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [assistantState, setAssistantState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: String(Date.now()), role: 'assistant', text: 'Hi — welcome to Flxware. How can I help you today?' },
      ]);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Other components (banner, hero) can open the panel
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(OPEN_ASSISTANT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, handleOpen);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Escape closes the panel and returns focus to the launcher
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text || text.trim() === '') return;
      const userMsg: Message = { id: String(Date.now()), role: 'user', text };
      setMessages((m) => [...m, userMsg]);

      try {
        setThinking(true);
        setAssistantState('thinking');
        // The engine is rule-based and needs no server, so it runs here rather than
        // over /api/assistant. That keeps the assistant working in the static export.
        // The short pause stands in for the old network latency, so the "thinking"
        // state is still readable instead of flashing past.
        await new Promise((resolve) => setTimeout(resolve, 400));
        const result = processMessage(
          text,
          messages.map((m) => ({ role: m.role, text: m.text }))
        );
        const reply: string = result.reply ?? 'Sorry, I could not process that right now.';
        setMessages((m) => [...m, { id: String(Date.now() + 1), role: 'assistant', text: reply }]);
        setThinking(false);
        setAssistantState('speaking');
        speak(reply, () => setAssistantState('idle'));
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: String(Date.now() + 1),
            role: 'assistant',
            text: `I can't connect right now. Please try again in a moment, or email ${contactEmail} and the team will help.`,
          },
        ]);
        setThinking(false);
        setAssistantState('idle');
      }
    },
    [messages, contactEmail]
  );

  const onTranscript = useCallback(
    (text: string) => {
      setAssistantState('listening');
      handleSend(text);
    },
    [handleSend]
  );

  return (
    <div>
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <button
          ref={launcherRef}
          type="button"
          aria-label={open ? 'Close Flxware assistant' : 'Open Flxware assistant'}
          aria-expanded={open}
          aria-controls="ai-assistant-panel"
          onClick={() => (open ? close() : setOpen(true))}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-dark to-secondary-dark text-white shadow-elevated-lg ring-4 ring-primary/15 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <AssistantAvatar state={assistantState} />
        </button>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="ai-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-assistant-title"
          className="glass-strong fixed inset-x-3 bottom-24 z-50 overflow-hidden rounded-2xl shadow-elevated-lg animate-scale-in sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[420px]"
        >
          <div className="flex items-center gap-3 border-b border-edge p-4">
            <AssistantAvatar state={assistantState} size="md" />
            <div className="min-w-0">
              <h2 id="ai-assistant-title" className="text-sm font-semibold text-foreground">
                Flxware Assistant
              </h2>
              <p className="text-xs text-muted">Ask about services, pricing, timelines.</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <VoiceButton onTranscript={onTranscript} disabled={thinking} />
              <button type="button" onClick={close} className="icon-btn" aria-label="Close assistant">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <ConversationPanel messages={messages} onSend={handleSend} thinking={thinking} />
        </div>
      )}
    </div>
  );
}
