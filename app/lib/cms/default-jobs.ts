import type { JobItem } from './types';

/** Default job postings: seed data for the database and offline fallback. Edit live content in /admin/careers. */
export const defaultJobs: JobItem[] = [
  {
    slug: 'software-engineer-fullstack-intern',
    title: 'Software Engineer (Fullstack)',
    dept: 'Engineering',
    type: 'Onsite',
    commitment: 'Internship',
    about: [
      "Kickstart your career in tech with Flxware's Fullstack Software Engineering Internship. You will join our engineering team onsite and gain hands-on experience building web applications that serve real clients.",
      'Working alongside experienced engineers, you will help design, code, test, and debug features across the stack, from responsive user interfaces in React and Next.js to backend services in Laravel, Node.js, and Java. You will take part in code reviews and sprint ceremonies, and gradually take ownership of features as your skills grow.',
    ],
    requirements: [
      'Current undergraduate or recent graduate in Computer Science, Software Engineering, or a related field.',
      'Foundational knowledge of programming languages such as Java, JavaScript, or PHP.',
      'Familiarity with web frameworks like React, Next.js, Laravel, or Node.js.',
      'Basic understanding of SQL databases and REST APIs.',
      'Exposure to Git, cloud platforms (AWS), or CI/CD is a plus.',
      'A fast learner with a genuine passion for building software.',
      'Available to work onsite for a minimum commitment of 6 months.',
    ],
  },
  {
    slug: 'ai-ml-engineer-intern',
    title: 'AI/ML Engineer',
    dept: 'Engineering',
    type: 'Onsite',
    commitment: 'Internship',
    about: [
      'Flxware is looking for an AI/ML Engineering Intern who is excited about applying machine learning to real business problems. You will work with our engineering team on AI-powered features, including conversational assistants, automation, and data-driven products for our clients.',
      'You will help prepare and analyze data, experiment with models, integrate large language models (LLMs) and AI APIs into applications, and evaluate how well they perform. This internship is a hands-on opportunity to take AI from prototype to production under the guidance of experienced engineers.',
    ],
    requirements: [
      'Current undergraduate or recent graduate in Computer Science, Data Science, AI, or a related field.',
      'Solid programming skills in Python.',
      'Understanding of core machine learning concepts (supervised learning, model evaluation, overfitting).',
      'Familiarity with libraries such as NumPy, pandas, scikit-learn, PyTorch, or TensorFlow.',
      'Interest in LLMs, prompt engineering, or retrieval-augmented generation (RAG) is a strong plus.',
      'Basic knowledge of SQL and working with APIs.',
      'Curiosity, strong analytical thinking, and a willingness to learn quickly.',
    ],
  },
  {
    slug: 'qa-ba-engineer-intern',
    title: 'QA/BA Engineer',
    dept: 'QA & Product',
    type: 'Onsite',
    commitment: 'Internship',
    about: [
      'Quality and clear requirements are at the heart of what we deliver. We are seeking a detail-oriented QA/BA Engineering Intern to work at the intersection of our quality assurance and product teams.',
      'On the QA side, you will design test cases and perform manual and automated testing to find and document bugs before they reach our clients. On the BA side, you will help gather requirements from stakeholders, write user stories and process documentation, and manage project backlogs. This role suits someone with an analytical mindset who enjoys both understanding how things should work and finding where they break.',
    ],
    requirements: [
      'Current undergraduate or recent graduate in Computer Science, Software Engineering, Information Systems, or a related field.',
      'Basic understanding of the software testing life cycle (STLC) and testing concepts.',
      'Ability to translate business needs into clear, structured requirements and user stories.',
      'Strong attention to detail and an analytical, problem-solving mindset.',
      'Familiarity with test automation tools, Jira, or similar tools is an advantage.',
      'Proficiency in productivity tools (Microsoft Office / Google Workspace).',
      'Excellent written and verbal communication skills.',
    ],
  },
  {
    slug: 'customer-success-sales-executive-intern',
    title: 'Customer Success & Sales Executive',
    dept: 'Sales',
    type: 'Onsite',
    commitment: 'Internship',
    about: [
      'Flxware is looking for a Customer Success & Sales Executive Intern to help us grow our client base and make sure every client gets lasting value from our solutions.',
      'You will support the sales team in finding and qualifying leads, preparing proposals and presentations, and following up with prospects. On the customer success side, you will help onboard new clients, gather their feedback, and work with our engineering and product teams to keep projects on track. This is a great opportunity for someone who enjoys building relationships and wants to learn how technology is sold and delivered.',
    ],
    requirements: [
      'Current undergraduate or recent graduate in Business Management, Marketing, IT, or a related field.',
      'Excellent verbal and written communication skills in English.',
      'Confident, friendly, and professional when speaking with clients.',
      'Interest in technology and software products.',
      'Strong organizational skills and the ability to manage follow-ups.',
      'Familiarity with CRM tools, LinkedIn, or Microsoft Office / Google Workspace is a plus.',
    ],
  },
];
