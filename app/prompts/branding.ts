import type { IntentConfig } from './types';

export const branding: IntentConfig = {
  id: 'branding',
  label: 'Branding & Design',
  keywords: ['branding', 'brand', 'logo', 'design', 'rebrand', 'visual identity', 'ui design', 'ux design', 'user experience', 'user interface', 'creative direction'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:for|about|of|in)\s+(.+?)(?:\.|,|$)/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `Branding shapes how people perceive your business. What kind of business or project needs the branding?`;
      },
      persuasion: `Brand consistency across every touchpoint increases revenue by up to 23%. Your visual identity isn't just a logo — it's how customers remember and recommend you. We approach branding as a system, not a single design — colors, typography, tone, and interaction patterns all work together to build recognition.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 20 && !text.toLowerCase().includes('?')) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `What's the scope you're thinking about? A full brand identity includes logo, color palette, typography, and brand guidelines. Some clients also want web and mobile design applied to their brand.`;
      },
      persuasion: `We've built brands for startups and established companies alike. The best brand systems are flexible — they work just as well on a business card as they do on a responsive website or mobile app.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `Do you have a budget range for the branding work? This helps me scope the right level of deliverables.`;
      },
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `What timeline are you looking at? Branding projects typically take 4-8 weeks depending on the scope.`;
      },
    },
  ],

  upsellSuggestions: [
    'A brand style guide ensures consistency across every touchpoint — from your website to social media to pitch decks.',
    'Many clients combine branding with a web design phase — the brand system feeds directly into the site, creating a cohesive experience.',
    "If you're launching soon, we can prioritize logo and core palette first, then expand to full guidelines post-launch.",
  ],
};
