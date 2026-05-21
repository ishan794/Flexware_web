import type { IntentConfig } from './types';

export const seo: IntentConfig = {
  id: 'seo',
  label: 'SEO & Growth',
  keywords: ['seo', 'search engine optimization', 'google ranking', 'search ranking', 'organic traffic', 'google search', 'rank higher', 'visibility', 'digital marketing'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:for|about|of|in)\s+(.+?)(?:\.|,|$)/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `SEO can be a powerful growth channel. What's your business or website about?`;
      },
      persuasion: `Google now ranks sites based on mobile performance first. If your mobile experience is slow, you're invisible in search results. We integrate SEO as a core part of development — semantic HTML, structured data, Core Web Vitals optimization — not as an afterthought.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 20 && !text.toLowerCase().includes('?')) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `What specific areas are you looking to improve? Technical SEO, content strategy, page speed optimization, or a full SEO audit?`;
      },
      persuasion: `Most of our clients see significant ranking improvements within 8-12 weeks of implementing technical SEO fixes combined with strategic content. The key is doing it right from the architecture level — crawlable structure, fast load times, and proper semantic markup.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `What budget do you have in mind for SEO work? This helps determine the scope — from a focused audit to ongoing optimization.`;
      },
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `SEO is a medium-term investment. What's your timeline for seeing results? Most technical optimizations show impact within 2-3 months.`;
      },
    },
  ],

  upsellSuggestions: [
    'SEO pairs naturally with content strategy — a blog or resource section built with SEO in mind compounds your visibility over time.',
    "If you're building a new site, we can architect it for SEO from day one — semantic HTML, structured data, and Core Web Vitals optimization built in.",
    "Analytics and search console integration gives you visibility into what's working so you can double down on what drives traffic.",
  ],
};
