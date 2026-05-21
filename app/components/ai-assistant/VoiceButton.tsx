'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceButton({ onTranscript, disabled = false }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscript]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  if (!isSupported) return null;

  return (
    <button
      id="voice-input-button"
      onClick={toggleListening}
      disabled={disabled}
      className={`relative p-2.5 rounded-xl transition-all duration-300 ${
        isListening
          ? 'bg-rose/20 text-rose hover:bg-rose/30'
          : 'text-subtle hover:text-primary-light hover:bg-primary/10'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
      title={isListening ? 'Stop listening' : 'Speak your message'}
    >
      {isListening ? (
        <>
          <MicOff className="w-5 h-5" />
          <span className="absolute inset-0 rounded-xl border-2 border-rose/40" style={{ animation: 'ripple 1.5s ease-out infinite' }} />
        </>
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
}
