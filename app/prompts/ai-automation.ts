import type { IntentConfig } from './types';

export const aiAutomation: IntentConfig = {
  id: 'ai-automation',
  label: 'AI & Automation',
  keywords: ['ai', 'artificial intelligence', 'machine learning', 'automation', 'chatbot', 'gpt', 'llm', 'openai', 'workflow automation', 'process automation', 'ml', 'data science', 'predictive', 'computer vision', 'nlp'],

  qualificationSteps: [
    {
      field: 'business_type',
      detect: (text) => {
        const m = text.match(/(?:for|about|in|at)\s+(.+?)(?:\.|,|$)/i);
        return m?.[1]?.trim() ?? null;
      },
      ask: (name, data) => {
        if (data.business_type) return null;
        return `AI is transforming how businesses operate. What area of your business are you looking to improve with AI or automation?`;
      },
      persuasion: `Most businesses are sitting on data they never use. AI can turn that into predictive insights, automated workflows, and customer experiences that feel personal at scale. We've built AI pipelines that reduced manual data processing from 20 hours a week to near zero.`,
    },
    {
      field: 'requirements',
      detect: (text) => {
        if (text.length > 25 && !text.toLowerCase().includes('?') && !text.match(/^(my name|i am|i'm|i run)/i)) return text;
        return null;
      },
      ask: (name, data) => {
        if (data.requirements) return null;
        return `Can you describe what you're trying to solve? Common AI use cases include customer support automation, document processing, predictive analytics, content generation, or intelligent search.`;
      },
      persuasion: `AI isn't about replacing humans — it's about removing repetitive work so your team can focus on decisions that actually matter. The ROI on well-targeted automation is usually measured in weeks, not years. We typically start with a proof of concept using your real data to validate the approach before building the full system.`,
    },
    {
      field: 'budget',
      ask: (name, data) => {
        if (data.budget) return null;
        return `Do you have a budget range in mind for this AI initiative? A proof of concept can be relatively lean, while production systems vary based on data complexity.`;
      },
    },
    {
      field: 'timeline',
      ask: (name, data) => {
        if (data.timeline) return null;
        return `What's your timeline? AI projects often benefit from an initial discovery phase to validate feasibility before full build-out.`;
      },
    },
  ],

  upsellSuggestions: [
    'Many AI projects pair well with a custom dashboard for monitoring model performance, accuracy, and business impact in real time.',
    'If you have existing systems, we can integrate AI as a service layer — enhancing your current tools without replacing them.',
    'A well-structured data pipeline is the foundation of any successful AI system. We can audit your current data infrastructure as part of the initial phase.',
  ],
};
