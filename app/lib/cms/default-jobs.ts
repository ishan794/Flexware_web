import type { JobItem } from './types';

/** Default job postings: seed data for the database and offline fallback. Edit live content in /admin/careers. */
export const defaultJobs: JobItem[] = [
  {
    slug: 'software-engineer-fullstack',
    title: 'Software Engineer (Fullstack)',
    dept: 'Engineering',
    type: 'Onsite',
    commitment: 'Full-time',
    about: [
      'Flxware Technologies is seeking a talented and driven Fullstack Software Engineer to become a core part of our engineering team. In this role, you will be instrumental in designing, developing, and deploying robust web applications that serve our global client base.',
      'You will work across the entire technology stack, from crafting responsive and intuitive user interfaces with React and Next.js to architecting scalable backend services using Laravel, Node.js, and Java. We value clean code, innovative problem-solving, and a collaborative spirit.',
    ],
    requirements: [
      'BSc degree in Computer Science, Software Engineering, or related field.',
      '1+ years of professional experience in full-stack software development.',
      'Strong proficiency in backend technologies: Laravel (PHP), Node.js, and Java.',
      'Solid experience with frontend frameworks: React.js or Next.js.',
      'In-depth knowledge of SQL, database design, and optimization.',
      'Experience with cloud services (AWS) and CI/CD pipelines (e.g., GitHub Actions, Jenkins).',
      'Demonstrated ability to write clean, maintainable, and efficient code.',
      'Strong problem-solving skills and ability to work in an agile environment.',
    ],
  },
  {
    slug: 'associate-software-engineer-fullstack',
    title: 'Associate Software Engineer (Fullstack)',
    dept: 'Engineering',
    type: 'Onsite',
    commitment: 'Full-time',
    about: [
      'Start your career with impact as an Associate Software Engineer at Flxware. We are looking for promising developers who are eager to learn and ready to contribute to real-world projects.',
      'As an Associate Engineer, you will work closely with senior mentors and cross-functional teams to build and maintain software solutions. You will participate in code reviews, help debug complex issues, and gradually take ownership of features. This position offers a unique opportunity to refine your skills while working with a modern tech stack including Laravel, Node.js, and React.',
    ],
    requirements: [
      'BSc degree in Computer Science, Software Engineering, or related field.',
      'Completed a recognized software engineering internship or have relevant project experience.',
      'Solid understanding of core programming concepts and OOP principles.',
      'Basic proficiency in Laravel, Node.js, and Java.',
      'Familiarity with frontend development using React, Next.js, and SQL databases.',
      'Exposure to cloud platforms (AWS) and CI/CD concepts is a strong plus.',
      'A proactive attitude with a strong eagerness to learn and adapt to new technologies.',
      'Excellent communication skills and the ability to collaborate effectively within a team.',
    ],
  },
  {
    slug: 'intern-software-engineer-fullstack',
    title: 'Intern Software Engineer (Fullstack)',
    dept: 'Engineering',
    type: 'Onsite',
    commitment: 'Internship',
    about: [
      "Kickstart your journey in the tech industry with Flxware's Software Engineering Internship. We provide an immersive learning environment where you will gain hands-on experience in full-stack development.",
      'Under the guidance of experienced engineers, you will assist in coding, testing, and debugging applications. You will be exposed to industry-standard practices and tools, giving you a solid foundation for your future career. This internship is designed for students who are passionate about technology and ready to apply their academic knowledge to practical challenges.',
    ],
    requirements: [
      'Current Undergraduate pursuing a degree in Computer Science, Software Engineering, or related field.',
      'Foundational knowledge of programming languages such as Java, JavaScript, or PHP.',
      'Strong interest in web development frameworks like React and Laravel.',
      'A fast learner with a genuine passion for technology and software development.',
      'Available for a minimum commitment of 6 months.',
    ],
  },
  {
    slug: 'intern-qa-engineer',
    title: 'Intern QA Engineer',
    dept: 'QA',
    type: 'Onsite',
    commitment: 'Internship',
    about: [
      'Quality is at the heart of what we do. We are seeking a detail-oriented Intern QA Engineer to join our Quality Assurance team. In this role, you will help ensure that our software products meet the highest standards of reliability and performance. You will work alongside developers and QAs to perform manual and automated testing, identify bugs, and document issues. This role is perfect for someone with an analytical mindset who enjoys breaking things to make them better.',
    ],
    requirements: [
      'Current Undergraduate pursuing a degree in Computer Science, Software Engineering, or related field.',
      'Strong attention to detail and an analytical, problem-solving mindset.',
      'Basic understanding of software testing life cycle (STLC) and testing concepts.',
      'Familiarity with test automation tools or scripting is an advantage.',
      'Excellent written and verbal communication skills for effective bug reporting.',
    ],
  },
  {
    slug: 'intern-business-analyst',
    title: 'Intern Business Analyst',
    dept: 'Product',
    type: 'Onsite',
    commitment: 'Internship',
    about: [
      'Flxware is looking for an Intern Business Analyst to help bridge the gap between business needs and technical solutions. You will work with our product team to analyze requirements, document processes, and support data-driven decision-making.',
      "This role involves gathering requirements from stakeholders, creating documentation, and helping to manage project backlogs. It's an excellent opportunity for students with a business or management background who are interested in the technology sector.",
    ],
    requirements: [
      'Current Undergraduate pursuing a degree in Business Management, IS, or related field.',
      'Strong analytical skills with the ability to document complex processes clearly.',
      'Proficiency in productivity tools (Microsoft Office / Google Workspace).',
      'Excellent communication and interpersonal skills to interact with various stakeholders.',
      'Ability to translate rough business needs into structured technical requirements.',
    ],
  },
];
