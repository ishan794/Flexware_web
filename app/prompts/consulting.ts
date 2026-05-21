import type { IntentConfig } from './types';

export const consulting: IntentConfig = {
  id: 'consulting',
  label: 'Tech Consulting',
  keywords: ['consulting', 'consultant', 'strategy', 'technical advice', 'architecture review', 'code review', 'technology stack', 'tech stack', 'digital transformation', 'mvp', 'proof of concept', 'poc', 'fractional cto'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:for|at|about|within)\s+(.+?)(?:\.|,|$)/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `Happy to help with strategic guidance. What's the project or business you need consulting for?`;
      },
      persuasion: `Our consulting practice combines decades of hands-on engineering experience with product strategy. We've helped teams avoid costly architectural mistakes, choose the right tech stack, and go from idea to launch with clarity and speed.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 25 && !text.toLowerCase().includes('?')) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `What kind of guidance are you looking for? Common areas include tech stack selection, architecture design, team structure, MVP scoping, or digital transformation strategy.`;
      },
      persuasion: `The difference between a successful digital product and a failed one is usually decided before a single line of code is written. Good strategy upfront saves months of wasted development. We typically start with a discovery workshop to align on goals, constraints, and the right approach.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `Do you have a budget range for consulting? Engagements range from focused 2-week sprints to ongoing advisory partnerships.`;
      },
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `What's your timeline? Consulting can be structured to fit your schedule — from intensive workshops to weekly strategic sessions.`;
      },
    },
  ],

  upsellSuggestions: [
    'Many clients start with consulting and then engage us for execution — we can transition seamlessly from strategy to build.',
    'A technical audit of your current systems often reveals quick wins that improve performance, security, and developer velocity.',
    "If you're preparing for funding, a well-documented architecture and roadmap adds credibility with investors.",
  ],
};
