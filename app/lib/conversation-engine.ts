import { detectIntent, intents } from '../prompts';
import { persuasion } from '../prompts/persuasion';
import type { CollectedData, ConversationState, EngineResponse } from '../prompts/types';

function freshState(): ConversationState {
  return {
    intent: null,
    intentId: null,
    data: {
      name: null,
      business_type: null,
      requirements: null,
      budget: null,
      timeline: null,
      email: null,
      phone: null,
      industry: null,
    },
    stage: 'greeting',
    askedFields: new Set(),
    upsellIndex: 0,
  };
}

function extractEntities(text: string, data: CollectedData): CollectedData {
  const next = { ...data };

  if (!next.name) {
    const m = text.match(/(?:my name is|i am|i'm|called|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (m) next.name = m[1];
  }

  if (!next.email) {
    const m = text.match(/\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/);
    if (m) next.email = m[1];
  }

  if (!next.budget) {
    const m = text.match(
      /(?:budget|spend|cost|price|invest|looking to spend)\s*(?:of\s*)?(?:around\s*)?(?:usd?\s*)?\$?([\d,]+(?:k|K|,?\d{3})?(?:\s*-\s*\$?[\d,]+(?:k|K|,?\d{3})?)?)/i
    );
    if (m) next.budget = m[1];
  }

  if (!next.timeline) {
    const m = text.match(
      /(?:timeline|deadline|timeframe|need it by|finished by|completed by|needed by|when\s*(?:do|should|would))\s*(.{3,45}?)(?:\.|,|$)/i
    );
    if (m && m[1].trim().length < 45) next.timeline = m[1].trim();
  }

  if (!next.business_type) {
    const m = text.match(
      /(?:i (?:run|own|have|work for|manage|started|sell)\s+(?:a|an|my)\s+(\w+(?:\s+\w+)?))/i
    );
    if (m) next.business_type = m[1];
  }

  if (!next.industry) {
    const m = text.match(
      /(?:in the\s+(\w+(?:\s+\w+)?)\s+industry|sector|field)/i
    );
    if (m) next.industry = m[1];
  }

  if (!next.phone) {
    const m = text.match(
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/
    );
    if (m) next.phone = m[0];
  }

  return next;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickPersuasion(tags: string[]): string {
  for (const tag of tags) {
    const pool = (persuasion as any)[tag];
    if (pool && pool.length > 0) return pickRandom(pool);
  }
  return '';
}

function buildGreeting(name: string | null, intentLabel: string): string {
  const greetings = [
    `That's exciting. A great ${intentLabel.toLowerCase()} solution can have a massive impact on your business growth.`,
    `Interesting choice. A well-executed ${intentLabel.toLowerCase()} strategy can be a real differentiator in today's market.`,
    `Great direction. We've helped many businesses succeed with tailored ${intentLabel.toLowerCase()} solutions.`,
  ];
  const namePart = name ? `Thanks, ${name}. ` : '';
  return `${namePart}${pickRandom(greetings)}`;
}

function generateResponse(
  message: string,
  prevState: ConversationState
): EngineResponse {
  const state: ConversationState = {
    intent: prevState.intent,
    intentId: prevState.intentId,
    data: extractEntities(message, prevState.data),
    stage: prevState.stage,
    askedFields: new Set(prevState.askedFields),
    upsellIndex: prevState.upsellIndex,
  };

  // —— Intent detection ——
  if (!state.intent) {
    const detected = detectIntent(message);
    if (detected) {
      state.intent = detected;
      state.intentId = detected.id;
      state.stage = 'qualifying';
      const greeting = buildGreeting(state.data.name, detected.label);
      return {
        reply: `${greeting} ${pickPersuasion(['credibility', detected.id])}`,
        state,
        complete: false,
      };
    }

    // No intent detected — collect name first
    if (!state.data.name) {
      return {
        reply: `Thanks for reaching out! I'd love to help. Could you start by telling me your name and what you're looking for?`,
        state,
        complete: false,
      };
    }

    // Have name but no clear intent — ask what they need
    return {
      reply: pickRandom([
        `Good to hear from you, ${state.data.name}! What kind of project are you looking to build? We work on web platforms, mobile apps, AI systems, branding, and more.`,
        `Great to meet you, ${state.data.name}. What type of solution are you exploring? I can help with websites, ecommerce, mobile apps, AI, and digital strategy.`,
      ]),
      state,
      complete: false,
    };
  }

  const intent = state.intent;
  const allEmpty = Object.values(state.data).every((v) => v === null);
  const justDetected = allEmpty && state.stage === 'qualifying';

  // —— Qualification flow ——
  if (state.stage === 'qualifying' || state.stage === 'greeting') {
    state.stage = 'qualifying';

    for (const step of intent.qualificationSteps) {
      const currentValue = state.data[step.field as keyof CollectedData];

      // Try to detect from the current message
      if (!currentValue && step.detect) {
        const detected = step.detect(message);
        if (detected) {
          state.data[step.field as keyof CollectedData] = detected;
        }
      }

      const value = state.data[step.field as keyof CollectedData];
      if (!value && !state.askedFields.has(step.field as string)) {
        state.askedFields.add(step.field as string);
        const question = step.ask(state.data.name, state.data);
        if (question) {
          const pers = !justDetected && step.persuasion ? `\n\n${step.persuasion}` : '';
          return {
            reply: `${pers ? pers + '\n\n' : ''}${question}`,
            state,
            complete: false,
          };
        }
      }
    }

    // All fields filled — move to upselling or complete
    state.stage = 'upselling';
  }

  // —— Upsell stage ——
  if (state.stage === 'upselling') {
    if (intent.upsellSuggestions.length > 0 && state.upsellIndex < intent.upsellSuggestions.length) {
      const suggestion = intent.upsellSuggestions[state.upsellIndex];
      state.upsellIndex++;
      const name = state.data.name ?? '';
      return {
        reply: `${name ? `Thanks, ${name}. ` : ''}Here's a thought: ${suggestion}\n\nAlso, could you share your email so I can send you some relevant case studies and information?`,
        state,
        complete: false,
      };
    }

    if (!state.data.email) {
      return {
        reply: `One last thing — could you share your email so our team can follow up with a tailored proposal?`,
        state,
        complete: false,
      };
    }

    state.stage = 'complete';
  }

  // —— Complete ——
  const label = intent.label;
  return {
    reply: `Perfect! Here's a summary of what I've gathered:\n\n` +
      Object.entries(state.data)
        .filter(([, v]) => v !== null)
        .map(([k, v]) => `• **${k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}:** ${v}`)
        .join('\n') +
      `\n\n**Service:** ${label}\n\nOur team will review your requirements and reach out shortly with a tailored proposal. Is there anything else you'd like to discuss?`,
    state,
    complete: true,
  };
}

export function processMessage(
  message: string,
  history: { role: string; text: string }[]
): EngineResponse {
  let state = freshState();

  // Replay history to reconstruct state
  for (const msg of history) {
    if (msg.role === 'user') {
      const result = generateResponse(msg.text, state);
      state = result.state;
    }
  }

  // Process current message
  return generateResponse(message, state);
}
