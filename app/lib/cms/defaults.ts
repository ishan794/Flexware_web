import type { ContentDocs, ServiceItem } from './types';
import { defaultJobs } from './default-jobs';
import { defaultProjects } from './default-projects';

/*
 * Default content = the website's current, real copy.
 * Used to seed the database (prisma/seed.ts) and as a safe fallback when the
 * database is unreachable. Live content is edited in /admin.
 */

export const defaultContent: ContentDocs = {
  settings: {
    name: 'Flxware',
    tagline: 'Digital Innovation Studio',
    description:
      'Flxware crafts cutting-edge web applications, mobile solutions, and AI-powered systems that transform businesses. Your vision, our technology.',
    email: 'hello@flxwaretech.com',
    careersEmail: 'careers@flxwaretech.com',
    phone: '+971 50 739 0610',
    phoneHref: 'tel:+971507390610',
    locations: 'USA, Sri Lanka',
    hours: 'Mon–Fri, 9 AM–6 PM PST',
    banner: {
      enabled: true,
      title: 'Flxware Launch',
      text: 'New AI Business Assistant experience — live now. Try the voice-powered demo.',
      ctaLabel: 'Try the assistant',
    },
  },
  homepage: {
    hero: {
      badge: 'Announcing our AI Business Assistant.',
      title: "Build Tomorrow's Digital Products",
      subtitle:
        'Flxware crafts cutting-edge web applications, mobile solutions, and AI-powered systems that transform businesses and delight users.',
      primaryCtaLabel: 'Get started',
      secondaryCtaLabel: 'Learn more',
    },
    highlights: [
      {
        icon: 'Code2',
        title: 'Web Development',
        description: 'Custom web applications built with Next.js, React, and modern frameworks. Scalable, fast, and beautiful.',
        href: '/services#web',
        tone: 'primary',
      },
      {
        icon: 'Smartphone',
        title: 'Mobile Apps',
        description:
          'Native and cross-platform mobile experiences for iOS and Android. Intuitive design meets powerful functionality.',
        href: '/services#mobile',
        tone: 'accent',
      },
      {
        icon: 'Brain',
        title: 'AI Solutions',
        description:
          'Intelligent chatbots, automation, and machine learning integrations that give your business a competitive edge.',
        href: '/services',
        tone: 'secondary',
      },
      {
        icon: 'Cloud',
        title: 'Cloud & DevOps',
        description:
          'Scalable infrastructure, CI/CD pipelines, Docker, and cloud architecture for reliable, high-performance systems.',
        href: '/services#cloud',
        tone: 'emerald',
      },
    ],
    cta: {
      title: 'Ready to Transform Your Business?',
      text: "Let's discuss your project and explore how we can bring your vision to life with cutting-edge technology.",
    },
    faqs: [
      {
        q: 'What services does Flxware offer?',
        a: 'We specialize in web development (Next.js, React), mobile apps (iOS, Android, cross-platform), AI solutions (chatbots, automation, ML), cloud infrastructure, and UI/UX design.',
      },
      {
        q: 'How long does a typical project take?',
        a: 'Timelines vary by scope. A focused MVP can ship in 4-8 weeks. More complex platforms typically take 3-6 months. We provide clear timelines during the discovery phase.',
      },
      {
        q: 'Do you work with startups?',
        a: 'Absolutely. We partner with startups at every stage — from MVP validation to scaling for Series A and beyond. We also offer flexible engagement models for early-stage teams.',
      },
      {
        q: 'What technologies do you use?',
        a: 'Our core stack includes Next.js, React Native, Node.js, Laravel, Python, PostgreSQL, Docker, and cloud platforms like AWS and Vercel. We choose the best tech for each project.',
      },
      {
        q: 'Do you provide ongoing support?',
        a: 'Yes. We offer maintenance, monitoring, and optimization packages post-launch. Many clients stay with us for long-term product evolution and scaling support.',
      },
      {
        q: 'How do I get started?',
        a: "Simply reach out via our contact form or the AI assistant. We'll schedule a discovery call to understand your vision and provide a tailored proposal within days.",
      },
    ],
  },
  about: {
    label: 'About Flxware',
    title: 'Your vision, our technology',
    intro:
      'Flxware crafts cutting-edge web applications, mobile solutions, and AI-powered systems that transform businesses. Your vision, our technology.',
  },
  seo: {
    pages: {
      home: {
        title: '',
        description: '',
      },
      services: {
        title: 'Services',
        description:
          'Web and mobile app development, enterprise solutions, cloud integration, API development, and ongoing maintenance from Flxware.',
      },
      about: {
        title: 'About',
        description:
          'Flxware is a remote-first digital innovation studio building web applications, mobile solutions, and AI-powered systems.',
      },
      portfolio: {
        title: 'Portfolio',
        description:
          'Explore recent Flxware projects — mobile apps and web platforms built for finance, fitness, and travel businesses.',
      },
      careers: {
        title: 'Careers',
        description: 'Join Flxware. Explore open engineering, QA, and product roles, including internships.',
      },
      contact: {
        title: 'Contact',
        description: 'Start your next project with Flxware. Send us a message and we will get back to you within 24 hours.',
      },
    },
  },
};

export const defaultServices: ServiceItem[] = [
  {
    slug: 'web',
    icon: 'Code2',
    title: 'Web Application Development',
    description:
      'Custom web applications built with modern frameworks like React, Vue, and Angular. Responsive, fast, and user-friendly interfaces that work seamlessly across all devices.',
    features: ['Responsive Design', 'Modern Frameworks', 'API Integration', 'Performance Optimization'],
  },
  {
    slug: 'mobile',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description:
      'Native iOS and Android applications, as well as cross-platform solutions using React Native and Flutter. Delivering exceptional mobile experiences.',
    features: ['Native Development', 'Cross-Platform', 'App Store Deployment', 'Push Notifications'],
  },
  {
    slug: 'enterprise',
    icon: 'Building2',
    title: 'Enterprise Solutions',
    description:
      'Scalable enterprise software solutions including CRM systems, inventory management, and business process automation tools.',
    features: ['Scalable Architecture', 'Business Process Automation', 'Data Analytics', 'Custom Integrations'],
  },
  {
    slug: 'cloud',
    icon: 'Cloud',
    title: 'Cloud Integration',
    description:
      'Seamless cloud migration and integration services using AWS, Google Cloud, and Azure. Ensuring your applications are scalable and reliable.',
    features: ['Cloud Migration', 'Serverless Architecture', 'Microservices', 'DevOps Integration'],
  },
  {
    slug: 'api',
    icon: 'Globe',
    title: 'API Development',
    description:
      'RESTful and GraphQL API development for seamless data exchange between applications. Secure, documented, and efficient APIs.',
    features: ['RESTful APIs', 'GraphQL', 'Documentation', 'Security Implementation'],
  },
  {
    slug: 'support',
    icon: 'Wrench',
    title: 'Maintenance & Support',
    description:
      'Ongoing maintenance, updates, and technical support to ensure your applications continue to perform optimally and stay secure.',
    features: ['24/7 Support', 'Regular Updates', 'Security Patches', 'Performance Monitoring'],
  },
];

export { defaultJobs, defaultProjects };
