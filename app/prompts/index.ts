import type { IntentConfig } from './types';
import { ecommerce } from './ecommerce';
import { webdev } from './webdev';
import { mobile } from './mobile';
import { aiAutomation } from './ai-automation';
import { branding } from './branding';
import { enterprise } from './enterprise';
import { seo } from './seo';
import { consulting } from './consulting';

export const intents: IntentConfig[] = [
  ecommerce,
  webdev,
  mobile,
  aiAutomation,
  branding,
  enterprise,
  seo,
  consulting,
];

export function detectIntent(text: string): IntentConfig | null {
  const lower = text.toLowerCase();
  for (const intent of intents) {
    if (intent.keywords.some((kw) => lower.includes(kw))) {
      return intent;
    }
  }
  return null;
}

export type { IntentConfig, CollectedData, ConversationState, EngineResponse } from './types';
