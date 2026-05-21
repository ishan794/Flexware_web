import type { IntentConfig } from './types';

export const mobile: IntentConfig = {
  id: 'mobile',
  label: 'Mobile Development',
  keywords: ['mobile app', 'ios app', 'android app', 'cross platform', 'react native', 'flutter', 'mobile application', 'app development', 'iphone app', 'play store'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:for|about|related to|in the)\s+(.+?)(?:\.|,|$)/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `A mobile app can open up a direct channel to your users. What's the main purpose of the app — customer-facing, internal tool, or something else?`;
      },
      persuasion: `Mobile apps have 3x higher engagement rates than mobile websites. If retention and repeat usage are your goal, a well-built native or cross-platform app is the right path. We've built for both — iOS, Android, and cross-platform with React Native.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 25 && !text.toLowerCase().includes('?') && !text.match(/^(my name|i am|i'm|i run)/i)) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `What features are most important to you? Things like user accounts, real-time chat, push notifications, payment processing, maps, or offline access?`;
      },
      persuasion: `Enterprise adoption of mobile apps has grown 90% in the last two years. Companies that invested early are seeing compounding returns in customer loyalty. We usually recommend starting with a focused MVP that covers the core experience, then iterating based on real user feedback.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `What budget range are you working with for the app? Mobile projects vary significantly based on complexity — a focused MVP is often the smartest starting point.`;
      },
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `What timeline are you aiming for? A focused MVP can ship in 8-12 weeks; more complex apps typically take 3-6 months.`;
      },
    },
  ],

  upsellSuggestions: [
    'Most mobile apps benefit from a companion admin dashboard — you can manage users, see analytics, and push updates without deploying a new version.',
    "If you're building for both platforms, React Native saves about 40% in development time compared to building two native apps separately.",
    'Push notification and analytics integration from the start helps you understand user behavior and improve retention immediately.',
  ],
};
