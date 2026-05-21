import type { IntentConfig } from './types';

export const enterprise: IntentConfig = {
  id: 'enterprise',
  label: 'Enterprise Solutions',
  keywords: ['enterprise', 'b2b', 'saas', 'platform', 'dashboard', 'admin panel', 'backend', 'api', 'microservices', 'scalable', 'internal tool', 'crm', 'erp', 'cloud infrastructure'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:for|at|in|within)\s+(.+?)(?:\.|,|$)/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `Enterprise systems need to be built for scale from day one. What kind of business or team is this for?`;
      },
      persuasion: `Enterprise systems need to scale without breaking. We architect for growth from day one — modular services, clean APIs, and infrastructure that handles 10x without rework. Security and compliance aren't afterthoughts; we integrate auth, audit logging, and data governance as core architecture decisions.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 25 && !text.toLowerCase().includes('?')) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `What's the core problem you're solving? Typical enterprise projects include internal dashboards, workflow automation, customer portals, or data integration platforms.`;
      },
      persuasion: `We've delivered for startups raising Series A as well as established brands modernizing legacy infrastructure. The right architecture saves millions in maintenance over time — we prioritize modular design, comprehensive testing, and clear documentation from the start.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `What investment level are you considering for this platform? Enterprise projects vary widely, and we can tailor the scope to your budget.`;
      },
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `What's the timeline for this initiative? We typically phase enterprise projects to deliver value incrementally.`;
      },
    },
  ],

  upsellSuggestions: [
    'A well-designed admin dashboard gives your team real-time visibility into operations without needing engineering support.',
    'API-first architecture means you can connect your platform to existing tools (CRMs, ERPs, marketing platforms) without custom work each time.',
    'Automated deployment pipelines and infrastructure-as-code ensure your platform stays reliable as you scale.',
  ],
};
