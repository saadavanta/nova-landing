// CodeNova Academy — Central configuration
export const ACADEMY = {
  name: 'CodeNova Academy',
  tagline: 'Learn Today. Build Tomorrow. Launch Your Tech Career.',
  phone: '+923044444138',
  phoneDisplay: '+92 304 4444138',
  whatsapp: '923044444138',
  email: 'codenovaacademy076@gmail.com',
  facebook: 'https://www.facebook.com/codenovaacademy/',
  linkedin: 'https://www.linkedin.com/in/muhammad-saad138/',
  country: 'Pakistan',
};

export const whatsappLink = (message) =>
  `https://wa.me/${ACADEMY.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const COURSES = [
  {
    title: 'Full Stack Web Development',
    slug: 'full-stack-web-development',
    short_description: 'Master the complete stack from front to back. Build real-world web applications with modern technologies.',
    duration: '4 Months',
    fee: 10000,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
    curriculum: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git & GitHub', 'Real Projects'],
    learning_outcomes: ['Build full-stack web apps', 'Deploy to production', 'Master modern frameworks', 'Create a portfolio'],
  },
  {
    title: 'Frontend Development',
    slug: 'frontend-development',
    short_description: 'Become a frontend pro. Design and build stunning, responsive user interfaces with modern tools.',
    duration: '2 Months',
    fee: 5000,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop',
    curriculum: ['HTML5', 'CSS3 & Flexbox', 'JavaScript', 'Responsive Design', 'React Basics', 'Projects'],
    learning_outcomes: ['Build responsive websites', 'Master modern CSS', 'Learn JavaScript fundamentals', 'Create UI components'],
  },
  {
    title: 'Backend Development',
    slug: 'backend-development',
    short_description: 'Power the web. Learn server-side programming, APIs, databases, and deployment from scratch.',
    duration: '2 Months',
    fee: 5000,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    curriculum: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Authentication', 'Deployment'],
    learning_outcomes: ['Build REST APIs', 'Work with databases', 'Implement authentication', 'Deploy backend apps'],
  },
  {
    title: 'Social Media Marketing + Canva',
    slug: 'social-media-marketing-canva',
    short_description: 'Master digital marketing and stunning design. Grow brands and create professional visuals.',
    duration: '2 Months',
    fee: 5000,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop',
    curriculum: ['Social Media Strategy', 'Content Creation', 'Canva Design', 'Facebook & Instagram Ads', 'Analytics', 'Branding'],
    learning_outcomes: ['Create marketing campaigns', 'Design professional graphics', 'Run social media ads', 'Build brand presence'],
  },
  {
    title: 'IT Basics',
    slug: 'it-basics',
    short_description: 'Build a strong foundation in IT. Perfect for absolute beginners starting their tech journey.',
    duration: '3 Months',
    fee: 8000,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    curriculum: ['Computer Fundamentals', 'MS Office', 'Internet & Email', 'Typing Skills', 'Basic Troubleshooting', 'Introduction to Programming'],
    learning_outcomes: ['Master computer basics', 'Use MS Office proficiently', 'Understand internet tools', 'Build digital literacy'],
  },
];

export const TRUST_BADGES = [
  { title: 'Live Classes', icon: 'Video' },
  { title: 'Real Projects', icon: 'FolderGit2' },
  { title: 'Beginner Friendly', icon: 'Sparkles' },
  { title: 'Career Focused', icon: 'Target' },
  { title: 'Affordable Fees', icon: 'Wallet' },
  { title: 'Certificate', icon: 'Award' },
  { title: 'Mentor Support', icon: 'Users' },
];

export const WHY_CHOOSE = [
  { title: 'Live Interactive Classes', description: 'Learn in real-time with expert instructors. Ask questions, get instant feedback, and never feel lost.', icon: 'Video' },
  { title: 'Practical Projects', description: 'Build real-world projects that you can showcase in your portfolio and job interviews.', icon: 'FolderGit2' },
  { title: 'Career Guidance', description: 'Get personalized career advice and direction to help you land your dream tech role.', icon: 'Compass' },
  { title: 'Resume Building', description: 'Learn to craft a professional resume that stands out to recruiters and hiring managers.', icon: 'FileText' },
  { title: 'Interview Preparation', description: 'Practice with mock interviews and gain the confidence to ace any technical interview.', icon: 'MessageSquare' },
  { title: 'Affordable Fees', description: 'Quality tech education at fees that make sense. Invest in your future without breaking the bank.', icon: 'Wallet' },
  { title: 'Small Batch Learning', description: 'Limited seats per batch means you get the personal attention you deserve to succeed.', icon: 'Users' },
  { title: 'Modern Curriculum', description: 'Stay ahead with a curriculum updated to match the latest industry standards and tools.', icon: 'Rocket' },
  { title: 'Continuous Support', description: 'Get help even after class hours. Our mentors are always just a message away.', icon: 'Headphones' },
];

export const HOW_IT_WORKS = [
  { step: 1, title: 'Choose Your Course', icon: 'BookOpen' },
  { step: 2, title: 'Register Online', icon: 'UserPlus' },
  { step: 3, title: 'Complete Payment', icon: 'CreditCard' },
  { step: 4, title: 'Account Approval', icon: 'ShieldCheck' },
  { step: 5, title: 'Join Live Classes', icon: 'Video' },
  { step: 6, title: 'Complete Projects', icon: 'Code2' },
  { step: 7, title: 'Receive Certificate', icon: 'Award' },
  { step: 8, title: 'Build Your Career', icon: 'Rocket' },
];

export const LEARNING_EXPERIENCE = [
  { title: 'Live Classes', description: 'Interactive sessions with real-time Q&A', icon: 'Video' },
  { title: 'Recorded Resources', description: 'Future-ready recorded lessons for revision', icon: 'PlayCircle' },
  { title: 'Practical Coding', description: 'Hands-on coding exercises every session', icon: 'Code2' },
  { title: 'Career Mentoring', description: 'One-on-one guidance from industry experts', icon: 'Compass' },
  { title: 'Resume Support', description: 'Professional resume building assistance', icon: 'FileText' },
  { title: 'Portfolio Guidance', description: 'Build a standout portfolio of projects', icon: 'Briefcase' },
  { title: 'Internship Preparation', description: 'Get ready for real-world internship opportunities', icon: 'Building2' },
];

export const STATS = [
  { value: 500, suffix: '+', label: 'Students Trained' },
  { value: 5, suffix: '+', label: 'Professional Courses' },
  { value: 100, suffix: '+', label: 'Projects Completed' },
  { value: 95, suffix: '%', label: 'Student Satisfaction' },
];

export const PAYMENT_METHODS = {
  jazzcash: { name: 'JazzCash', number: '+923044444138', accountName: 'CodeNova Academy' },
  easypaisa: { name: 'Easypaisa', number: '+923044444138', accountName: 'CodeNova Academy' },
};