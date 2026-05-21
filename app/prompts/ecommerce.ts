import type { IntentConfig } from './types';

export const ecommerce: IntentConfig = {
  id: 'ecommerce',
  label: 'E-Commerce',
  keywords: ['ecommerce', 'e-commerce', 'e shop', 'online store', 'sell online', 'shopping cart', 'shopify', 'magento', 'woocommerce', 'products online'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:sell|make|manufacture|produce|distribute|supply)\s+(.+?)(?:\.|,|$)/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `That's exciting. An ecommerce platform can be a game-changer for your business. What kind of products are you planning to sell? Physical goods, digital products, or both?`;
      },
      persuasion: `A well-built ecommerce platform does more than sell — it builds a brand experience. We've helped businesses double their average order value simply by optimizing checkout flow and adding smart upsell triggers.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 25 && !text.toLowerCase().includes('?') && !text.match(/^(my name|i am|i'm|i run)/i)) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `Great choice! To give you the most accurate recommendation — what specific features are you looking for? Things like payment gateway integration, inventory management, delivery tracking, customer accounts, or an admin dashboard?`;
      },
      persuasion: `Most ecommerce teams underestimate logistics integration. Connecting your store with real-time inventory, shipping, and payment gateways early on prevents major bottlenecks later. We usually design around mobile-first performance since most customers now buy directly from their phones.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `Do you have a budget range in mind for the ecommerce platform? It helps me recommend the right approach — whether it's a focused MVP or a full-featured store.`;
      },
      persuasion: `We've built ecommerce solutions at various scales — from lean MVPs under $10k to enterprise platforms with custom integrations. The key is matching the investment to what actually drives revenue for your business.`,
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `What kind of timeline are you working towards? Some clients need a launch in 4-6 weeks, others prefer a more phased rollout.`;
      },
    },
  ],

  upsellSuggestions: [
    'Many of our ecommerce clients also add a custom analytics dashboard — real-time visibility into sales, customer behavior, and inventory helps make better decisions fast.',
    'We often recommend integrating email automation and abandoned cart recovery from day one — it alone can recover 10-15% of lost revenue.',
    'If you\'re planning to scale, a headless architecture gives you flexibility to add mobile apps, marketplaces, or POS systems later without rebuilding.',
  ],
};
