import type { ProjectItem } from './types';

// TODO(content): Worksuite's client and TenderHub's client/duration/status are business facts,
// not code facts — confirm them with the team before this goes live.
/** Default projects: seed data for the database and offline fallback. Edit live content in /admin/portfolio. */
export const defaultProjects: ProjectItem[] = [
  {
    slug: 'worksuite',
    title: 'Worksuite',
    type: 'Business Platform',
    year: '2026',
    icon: 'Layers',
    summary:
      'One self-hosted platform that replaces a stack of separate SaaS tools — files, mail, chat, projects, people, money and stock, all behind a single login.',
    cardTech: ['PHP 8.3', 'CodeIgniter 4', 'React 19', 'TypeScript', 'Electron', 'MySQL 8'],
    tagline:
      'One Platform the Organisation Owns — 40 business modules delivered as a web app, a Windows and macOS desktop app and a public website, running on the client’s own servers.',
    tech: [
      'PHP 8.3',
      'CodeIgniter 4',
      'MySQL 8',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Electron',
      'Next.js',
      'LiveKit / WebRTC',
      'Docker',
    ],
    facts: [
      ['Category', 'Integrated Business Platform'],
      ['Client', 'Enterprise Client (Self-Hosted)'],
      ['Duration', '3 months (ongoing)'],
      ['Status', 'In Development'],
    ],
    overview:
      'Most growing companies end up paying for a dozen separate tools: one for files, one for mail, one for chat, another for invoices, another for HR. Each comes with its own user list, its own permissions and its own monthly bill, and the data sits with someone else.\n\nWorksuite puts all of it in one place. Forty modules share a single login, one set of permissions and one search across everything, and the whole platform runs on servers the client owns. Each module can be switched on or off per team or per person, so an organisation only sees what it actually uses.\n\nFlxware built every part in-house: the product design, the backend, the React web app, the Electron desktop app for Windows and macOS, the public website, the outside integrations and the server setup.',
    features: [
      'One login across all 40 modules',
      'Roles and permissions managed in one place',
      'File storage with versions, sharing links and recovery',
      'Word, Excel, PowerPoint and PDF editing in the browser',
      'Email, chat and video meetings built in',
      'CRM, invoicing, expenses, inventory and HR',
      'Desktop app for Windows and macOS with folder sync',
      'Two-factor sign-in and a full activity log',
      'Lost devices can be blocked or wiped remotely',
      'Search across files, mail, contacts and tasks',
      'Runs on the client’s own servers, with no per-seat fees',
    ],
    challenges: [
      'Keeping 40 modules separate without splitting up logins and search',
      'One backend serving a web app, a desktop app and a website',
      'Company files sitting on staff laptops',
      'Growing past one server without rebuilding everything',
    ],
    solutions: [
      'A shared core holding one user list, one permission model and one search',
      'A single API and one shared design system behind all three',
      'Devices must be approved, and can be blocked or wiped remotely',
      'Storage and messaging sit behind swappable drivers',
    ],
  },
  {
    slug: 'tenderhub',
    title: 'TenderHub',
    type: 'Web Platform',
    year: '2026',
    icon: 'Building2',
    summary:
      'One place to find every tender and auction notice in Sri Lanka, plus an online workspace that lets a buyer run a tender from first notice to final award.',
    cardTech: ['CodeIgniter 4', 'PHP 8.3', 'Next.js', 'React 19', 'TypeScript', 'MySQL'],
    tagline:
      'National Tender & Auction Platform — every notice published in Sri Lanka in one searchable place, and an online workspace that replaces the sealed box in reception.',
    tech: [
      'CodeIgniter 4',
      'PHP 8.3',
      'Next.js',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'MySQL',
      'JWT Authentication',
      'Server-Side Rendering',
    ],
    facts: [
      ['Category', 'Procurement & Marketplace Platform'],
      ['Client', 'Internal Product — Flxware Technologies'],
      ['Duration', '3 months (ongoing)'],
      ['Status', 'In Development'],
    ],
    overview:
      'Tender notices in Sri Lanka are scattered across newspapers, hundreds of institutional websites, the weekly Gazette and a government system that only covers the agencies required to use it. A contractor who finds a notice three days late has already lost the job. Smaller buyers have the opposite problem: no affordable way to run a tender online at all.\n\nTenderHub covers both halves. A CodeIgniter 4 API holds the notices, the subscriptions and the procurement data, and a Next.js front end serves the public catalogue along with three private areas — one for bidders, one for buying organisations and one for the platform team.\n\nTwo things shaped the build. Almost everyone arrives from a search engine, so every notice page is rendered on the server and can be indexed. And most of them are on low-end phones over mobile data, so searching and filtering work without waiting for JavaScript to load.',
    features: [
      'Search every notice by category, region, buyer and deadline',
      'Covers government, private, Gazette, press and bank auctions',
      'Separate areas for bidders, buyers and the platform team',
      'Sealed bids, committee evaluation and award, all online',
      'Deadlines shown in Sri Lanka time and counted from server time',
      'Filters live in the web address, so results are easy to share',
      'Every notice page is built to be found by search engines',
    ],
    challenges: [
      'Paid details must stay hidden from users, but still reach Google',
      'Keeping logins safe across four separate parts of the product',
      'Bid deadlines decide contracts, and phone clocks are often wrong',
      'Most users are on low-end phones and slow mobile data',
    ],
    solutions: [
      'The server simply never sends a field the viewer has not paid for',
      'Logins are held on the server, never in the browser',
      'Countdowns run on server time, always shown in Sri Lanka time',
      'Search and filtering are handled by the server, so they work instantly',
    ],
  },
  {
    slug: 'wayz',
    title: 'Wayz',
    type: 'Web & Mobile Platform',
    year: '2025',
    icon: 'Globe',
    summary:
      'A vehicle rental platform built for tourists, pairing easy booking with local travel tips and navigation.',
    cardTech: ['Flutter', 'Dart', 'Firebase', 'NodeJS', 'AWS'],
    tagline:
      'Vehicle Rental for Modern Travellers — booking, local recommendations and navigation in one app, on web and mobile.',
    tech: ['Flutter', 'Dart', 'Firebase', 'NodeJS', 'AWS', 'Push Notifications'],
    facts: [
      ['Category', 'Travel & Transportation'],
      ['Client', 'Tourism Technology Startup'],
      ['Duration', '2 months'],
      ['Status', 'Completed'],
    ],
    overview:
      'Wayz connects travellers with local vehicle providers and adds the things a visitor actually needs around the rental itself: directions, nearby attractions and someone to ask when something goes wrong.\n\nBuilt with Flutter for web and mobile from one codebase, with a Node.js backend on AWS. Bookings, pricing, insurance and payments are handled in the app, and navigation and recommendations are built in rather than left to a second app.',
    features: [
      'Book a vehicle from web or mobile',
      'Nearby attractions and travel recommendations',
      'Prices that adjust to demand',
      'Insurance added at booking',
      'Customer support chat, around the clock',
      'Live GPS navigation',
    ],
    challenges: [
      'Many rental providers sharing one system',
      'Prices that need to follow demand',
      'Taking card payments safely',
    ],
    solutions: [
      'Separate services on AWS that scale on their own',
      'A pricing model trained on real booking demand',
      'A PCI-compliant payment provider, with no card details stored',
    ],
  },
];
