import type { IntentConfig } from './types';

export const webdev: IntentConfig = {
  id: 'webdev',
  label: 'Web Development',
  keywords: ['website', 'web development', 'web dev', 'webpage', 'landing page', 'company site', 'business website', 'portfolio site', 'corporate site', 'redesign', 'rebuild'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:i (?:run|own|work for|manage|started|have)\s+(?:a|an|my)\s+(\w+(?:\s+\w+)?))/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `That's great to hear. A modern website is one of the best investments you can make. What kind of business or project is this for?`;
      },
      persuasion: `Your website is your most visible asset. Studies show users form an opinion about your business within 0.05 seconds of landing on your page. Speed and design aren't just aesthetics — they're trust signals that directly impact conversion.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 25 && !text.toLowerCase().includes('?') && !text.match(/^(my name|i am|i'm|i run)/i)) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `What kind of pages or functionality are you thinking about? A typical business site includes home, about, services, and contact — but many clients also want a blog, portfolio, or client portal.`;
      },
      persuasion: `A modern website should load in under 2 seconds, adapt to every screen size, and be built on a CMS you can actually manage yourself. We typically build with Next.js for performance and flexibility — the same stack used by companies like Netflix, TikTok, and Airbnb.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `Do you have a budget range in mind? It helps me tailor the recommendation — whether a focused launch or a more comprehensive build.`;
      },
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `What's your ideal timeline for having the site ready? We've delivered projects in as little as 2 weeks for tight deadlines.`;
      },
    },
  ],

  upsellSuggestions: [
    'Many clients also add a custom CMS dashboard so they can update content without touching code. Saves a lot of back-and-forth long term.',
    'SEO optimization during build — not after — gives you a significant head start in rankings. We structure every page for search visibility from day one.',
    'If you expect growth, we can architect the site to easily add ecommerce, a blog, or a client portal later without a rebuild.',
  ],
};
