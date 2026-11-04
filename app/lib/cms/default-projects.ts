import type { ProjectItem } from './types';

// TODO(content): Expense Tracker lists Firebase on the card but Node.js + MongoDB in the overview — confirm.
/** Default projects: seed data for the database and offline fallback. Edit live content in /admin/portfolio. */
export const defaultProjects: ProjectItem[] = [
  {
    slug: 'expense-tracker',
    title: 'Expense Tracker',
    type: 'Mobile App',
    year: '2024',
    icon: 'Smartphone',
    summary:
      'A comprehensive personal finance management app that helps users track expenses, set budgets, and achieve financial goals.',
    cardTech: ['Flutter', 'Node.js', 'Firebase'],
    tagline:
      'Personal Finance Management Made Simple — A comprehensive mobile application for tracking expenses, budgets, and financial goals.',
    tech: ['Flutter', 'Node.js', 'Firebase', 'Push Notifications'],
    facts: [
      ['Category', 'Mobile Application'],
      ['Client', 'Personal Finance Startup'],
      ['Duration', '1 month'],
      ['Status', 'Completed'],
    ],
    overview:
      'The Expense Tracker app addresses the common challenge of personal financial management by providing users with a simple yet powerful tool to monitor their spending habits. Built with Flutter for cross-platform compatibility, the app features real-time expense categorization, intelligent budget suggestions, and detailed financial analytics. The backend utilizes Node.js and MongoDB to ensure secure data handling and fast performance.',
    features: [
      'Intuitive expense categorization',
      'Customizable budget planning',
      'Detailed financial reports',
      'Goal setting and progress monitoring',
      'Cloud backup and synchronization',
      'Offline mode functionality',
    ],
    challenges: [
      'Creating intuitive data visualization',
      'Ensuring cross-platform performance',
      'Building offline-first architecture',
    ],
    solutions: [
      'Industry-standard encryption for all financial data',
      'Custom chart components optimized for mobile',
      'Robust local storage with sync capabilities',
    ],
  },
  {
    slug: 'exercise-tracker',
    title: 'Exercise Tracker',
    type: 'Mobile App',
    year: '2024',
    icon: 'Smartphone',
    summary:
      'A fitness tracking application that monitors workouts, tracks progress, and provides personalized fitness recommendations.',
    cardTech: ['React Native', 'TypeScript', 'Firebase', 'Cloud Functions'],
    tagline:
      'Your Personal Fitness Journey Companion — A comprehensive fitness tracking app with AI-powered recommendations and social features.',
    tech: ['React Native', 'TypeScript', 'Firebase', 'Cloud Functions'],
    facts: [
      ['Category', 'Health & Fitness Mobile App'],
      ['Client', 'Fitness Technology Company'],
      ['Duration', '2 months'],
      ['Status', 'Completed'],
    ],
    overview:
      'The Exercise Tracker app was developed to address the need for a comprehensive fitness solution that goes beyond simple workout logging. Using React Native for a native-like experience on both platforms, the app integrates with various fitness devices and provides AI-powered workout recommendations. Firebase backend ensures real-time data synchronization and social features that keep users motivated.',
    features: [
      'Comprehensive workout logging',
      'AI-powered exercise recommendations',
      'Progress analytics with charts',
      'Custom workout routine builder',
      'Nutrition tracking',
      'Achievement system and badges',
    ],
    challenges: [
      'Building accurate progress analytics',
      'Creating engaging tracking features',
      'Optimizing battery usage during workouts',
    ],
    solutions: [
      'Advanced data processing algorithms',
      'Personalized motivational tracking',
      'Optimized background processing and sensor usage',
    ],
  },
  {
    slug: 'wayz',
    title: 'Wayz',
    type: 'Web & Mobile Platform',
    year: '2025',
    icon: 'Globe',
    summary:
      'A vehicle rental platform designed for tourists, offering seamless booking and local transportation solutions.',
    cardTech: ['Flutter', 'Dart', 'Firebase', 'NodeJS', 'AWS'],
    tagline:
      'Vehicle Rental Platform for Modern Travelers — A comprehensive rental platform with seamless booking, local insights, and integrated navigation.',
    tech: ['Flutter', 'Dart', 'Firebase', 'NodeJS', 'AWS', 'Push Notification'],
    facts: [
      ['Category', 'Travel & Transportation'],
      ['Client', 'Tourism Technology Startup'],
      ['Duration', '2 months'],
      ['Status', 'Completed'],
    ],
    overview:
      'Wayz revolutionizes the tourist transportation experience by combining vehicle rental with local tourism insights. Built as both web and mobile platforms using Flutter and Dart, the system connects travelers with local vehicle providers while offering integrated GPS navigation and tourist attraction recommendations. The platform utilizes AWS infrastructure for scalability and PostgreSQL for robust data management.',
    features: [
      'Multi-platform vehicle booking',
      'Tourist attraction recommendations',
      'Dynamic pricing based on demand',
      'Insurance integration',
      '24/7 customer support chat',
      'Real-time GPS navigation',
    ],
    challenges: [
      'Building scalable multi-tenant architecture',
      'Creating dynamic pricing algorithms',
      'Ensuring secure payment processing',
    ],
    solutions: [
      'Microservices architecture on AWS',
      'ML-powered pricing optimization',
      'PCI-compliant payment infrastructure',
    ],
  },
];
