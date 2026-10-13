import { Project, SkillCategory, ExperienceItem, AchievementItem, EducationItem } from '../types';
import heroWorkspaceImg from '../assets/images/hero_developer_workspace_1791867304273.jpg';
import mentroMobilityImg from '../assets/images/project_mentro_mobility_1791867305455.jpg';
import fitTrackImg from '../assets/images/project_fittrack_ai_1791867305773.jpg';

export const PERSONAL_INFO = {
  name: "Mohamed Arsath H",
  role: "Python Full Stack Developer",
  specializations: ["Python", "JavaScript", "Full Stack Development", "AI & Generative AI"],
  tagline: "Python · JavaScript · Full Stack Development · AI & Generative AI",
  location: "Tambaram, Chennai, Tamil Nadu, India",
  phone: "9566382457",
  phoneDisplay: "+91 9566382457",
  email: "arsathmdofficial54@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  summary:
    "Software developer with 2+ years of hands-on experience in UI development, full-stack application development, AI, Generative AI, and prompt engineering. Skilled in building responsive web interfaces, connecting frontend applications to backend services and APIs, and working with databases. Strong interest in real-time applications, learning new technologies, and solving programming problems.",
  heroImage: heroWorkspaceImg,
  strengths: [
    "Problem Solving",
    "Communication",
    "Adaptability",
    "Quick Learning",
    "Continuous Learning"
  ],
  languagesSpoken: ["Tamil (Native)", "English (Fluent)"],
  interests: [
    "Reading",
    "Learning new technologies",
    "Building software projects",
    "Exploring Generative AI"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "mentro-mobility",
    title: "Mentro Mobility AI",
    role: "Customer Platform & Ride Booking",
    category: "ai",
    developmentStatus: "Concept & Working Prototype",
    shortDesc: "Customer-facing mobility web application concept with responsive UI, live booking workflows, and AI assistance.",
    longDesc: "A forward-looking mobility application built to streamline rider commute booking, route estimation, and user journey management. Explored prompt engineering and Generative AI to provide route recommendations and conversational ride assistance.",
    bulletPoints: [
      "Built a customer-facing mobility web application concept with clear, usable interfaces using HTML, CSS, and JavaScript.",
      "Connected application components through backend and API concepts with persistent database connectivity.",
      "Explored Generative AI and prompt engineering patterns to enhance rider interactions and automated trip insights.",
      "Implemented responsive layouts and client-side state handling for booking workflows and ride estimations."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "REST APIs", "Generative AI", "Prompt Engineering"],
    image: mentroMobilityImg,
    hasInteractiveDemo: true,
    demoType: "mentro",
    metrics: "Real-Time Booking State Machine",
    githubUrl: "https://github.com",
    architectureHighlights: [
      "Client-side booking state machine handling fare calculations and simulated driver matching",
      "Modular API communication layer connecting dispatch services and user sessions",
      "Prompt orchestration experiments for context-aware customer route summaries"
    ]
  },
  {
    id: "mentro-partner",
    title: "Mentro AI Partner",
    role: "Driver & Support Platform",
    category: "fullstack",
    developmentStatus: "Driver Workflow & API Architecture",
    shortDesc: "Partner-side application architected around driver workflows, ticket queues, and full-stack API-database pipelines.",
    longDesc: "Engineered specifically for driver-partners and support staff to manage trip acceptances, earnings tracking, and support resolutions. Implemented robust RESTful routes using Node.js and Express with MongoDB Mongoose schemas.",
    bulletPoints: [
      "Designed a partner-side application around driver and support-team workflows, with practical UI screens and interactions.",
      "Developed backend and API workflows using Node.js, Express.js, and Mongoose for structured request lifecycles.",
      "Applied MongoDB and SQL for data storage, CRUD operations, and retrieval across an end-to-end frontend-API-database flow.",
      "Structured error handling, input validation middleware, and query optimization for high-volume status updates."
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose ODM", "SQL", "REST APIs", "JavaScript"],
    image: mentroMobilityImg,
    hasInteractiveDemo: true,
    demoType: "mentro_partner",
    metrics: "End-to-End Mongoose & REST API",
    githubUrl: "https://github.com",
    architectureHighlights: [
      "RESTful API design with Express controllers, validation middleware, and error interceptors",
      "Mongoose schema modelling with references for drivers, vehicles, and ride logs",
      "SQL query experiments for reporting metrics and transactional audits"
    ]
  },
  {
    id: "fittrack-ai",
    title: "FitTrack AI",
    role: "Fitness Application & Macro Planner",
    category: "ai",
    developmentStatus: "Interactive AI Application Concept",
    shortDesc: "AI-oriented fitness application combining dynamic UI interfaces, Python data processing, and generative training routines.",
    longDesc: "Combines interactive client interfaces with Python-powered data processing workflows. Generates personalized workout and nutrition recommendations through prompt engineering and algorithmic profile analysis.",
    bulletPoints: [
      "Created an AI-oriented fitness application combining UI development and application logic.",
      "Used HTML, CSS, and JavaScript for user interactions and Python for workflows and data processing.",
      "Explored Generative AI and prompt engineering to structure customized workout splits and recovery schedules.",
      "Designed clean metric displays for calories, target muscle groups, and daily adherence tracking."
    ],
    techStack: ["Python", "JavaScript", "HTML5", "CSS3", "Generative AI", "Prompt Engineering"],
    image: fitTrackImg,
    hasInteractiveDemo: true,
    demoType: "fittrack",
    metrics: "Custom Workout & Macro Generator",
    githubUrl: "https://github.com",
    architectureHighlights: [
      "Algorithmic workout routine generator factoring target goal, experience, and weekly splits",
      "Macro-nutrient calculator with client-side adherence visualizers",
      "Engineered prompt templates for AI fitness coaching advice"
    ]
  },
  {
    id: "calculator-app",
    title: "Calculator Application",
    role: "Core Arithmetic Engine & Validation",
    category: "games",
    developmentStatus: "Interactive Browser Application",
    shortDesc: "Interactive calculator with arithmetic operations, event handling, strict input validation, and history tape.",
    longDesc: "Demonstrates meticulous input validation, operator precedence evaluation, floating-point rounding precision, expression history stack, and graceful division-by-zero error handling.",
    bulletPoints: [
      "Built an interactive calculator with arithmetic operations, event handling, input validation, and debugging.",
      "Handled complex edge cases: decimal repetition, consecutive operators, negative values, and zero division.",
      "Integrated history memory tape allowing recall of previous calculation results.",
      "Added full keyboard listener support for instantaneous numeric and operator entry."
    ],
    techStack: ["JavaScript", "DOM Manipulation", "Input Validation", "Error Handling", "CSS3"],
    image: heroWorkspaceImg,
    hasInteractiveDemo: true,
    demoType: "calculator",
    metrics: "Zero-Error Arithmetic Engine",
    githubUrl: "https://github.com",
    architectureHighlights: [
      "Tokenized string parser with operator precedence and clean validation guards",
      "Immediate visual history tape and recallable memory registers",
      "Keyboard shortcut map with preventDefault guards for seamless typing"
    ]
  },
  {
    id: "snake-game",
    title: "Snake Game",
    role: "Game Logic & Event Handling",
    category: "games",
    developmentStatus: "Playable 2D Browser Game",
    shortDesc: "Fully interactive browser-based Snake arcade game implementing coordinate grid mechanics, collision algorithms, and state persistence.",
    longDesc: "Built as part of an interactive games suite exploring JavaScript DOM manipulation, animation intervals, keyboard event listeners, boundary detection, and local high score tracking.",
    bulletPoints: [
      "Implemented classic 2D grid matrix mechanics with fluid frame loops and collision detection.",
      "Engineered responsive controls supporting keyboard arrow keys, WASD, and touch-screen D-pad.",
      "Handled edge cases: self-collision, boundary wraps, dynamic speed scaling, and persistent score caching.",
      "Practiced clean modular game state patterns without external game engines."
    ],
    techStack: ["JavaScript", "HTML5 Canvas", "DOM API", "Game Loop Algorithms", "CSS3"],
    image: heroWorkspaceImg,
    hasInteractiveDemo: true,
    demoType: "snake",
    metrics: "Playable 60fps Canvas Loop",
    githubUrl: "https://github.com",
    architectureHighlights: [
      "Single-canvas renderer with delta time updates and cell coordinate snapping",
      "Dynamic food placement algorithm avoiding active snake body segments",
      "Clean event listeners with immediate key-buffer prevention of reverse suicide turns"
    ]
  },
  {
    id: "carrom-game",
    title: "Carrom Game",
    role: "Physics Simulation & Event Handling",
    category: "games",
    developmentStatus: "Playable 2D Physics Mini-Game",
    shortDesc: "Browser-based Carrom board simulation featuring 2D striker physics, collision angles, corner pockets, and turn mechanics.",
    longDesc: "Engineered browser-based Carrom mini-game demonstrating vector calculations, friction deceleration, rebound reflection angles, pocket sink radii, and turn-based scoring.",
    bulletPoints: [
      "Modeled 2D board physics with friction coefficients, kinetic impulses, and rebound vectors.",
      "Created interactive striker baseline positioning, trajectory aiming line, and variable release power gauge.",
      "Implemented pocket sink triggers for carrom men (white, black) and center Queen piece.",
      "Applied real-time canvas rendering and clean input handling across mouse and touch."
    ],
    techStack: ["JavaScript", "HTML5 Canvas", "2D Vector Physics", "Event Handling"],
    image: heroWorkspaceImg,
    hasInteractiveDemo: true,
    demoType: "carrom",
    metrics: "Vector Kinematics & Collision Logic",
    githubUrl: "https://github.com",
    architectureHighlights: [
      "Elastic circle-to-circle collision resolution between striker and carrom pieces",
      "Damped friction model gradually decelerating discs to stationary rest state",
      "Turn and penalty rules engine with score tracking"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    categoryKey: "frontend",
    skills: [
      { name: "HTML5", category: "Frontend", highlight: "Semantic structure, web accessibility, forms, clean metadata" },
      { name: "CSS3", category: "Frontend", highlight: "Flexbox, CSS Grid, responsive styling, modern layout techniques" },
      { name: "JavaScript", category: "Frontend", highlight: "ES6+, DOM manipulation, asynchronous programming, event handling" },
      { name: "Responsive UI", category: "Frontend", highlight: "Mobile-first design, fluid containers, accessible user interfaces" }
    ]
  },
  {
    title: "Backend",
    categoryKey: "backend",
    skills: [
      { name: "Python", category: "Backend", highlight: "Application logic, data processing routines, script workflows" },
      { name: "Node.js", category: "Backend", highlight: "Runtime environment, asynchronous event loops, server modules" },
      { name: "Express.js", category: "Backend", highlight: "REST API route architecture, middleware validation, controllers" },
      { name: "REST APIs", category: "Backend", highlight: "CRUD operations, HTTP status codes, structured JSON request cycles" }
    ]
  },
  {
    title: "Database",
    categoryKey: "database",
    skills: [
      { name: "MongoDB", category: "Database", highlight: "Document-oriented database, collections, indexing, NoSQL schemas" },
      { name: "SQL", category: "Database", highlight: "Relational queries, joins, table normalization, data integrity" },
      { name: "Mongoose", category: "Database", highlight: "Schema validation, model relationships, data aggregation pipelines" }
    ]
  },
  {
    title: "AI & Generative AI",
    categoryKey: "ai",
    skills: [
      { name: "Generative AI", category: "AI", highlight: "LLM integration patterns, multi-modal workflows, prompt chaining" },
      { name: "Prompt Engineering", category: "AI", highlight: "System instructions, structured output framing, context curation" }
    ]
  },
  {
    title: "Development Tools",
    categoryKey: "tools",
    skills: [
      { name: "Git", category: "Tools", highlight: "Version control, branching strategies, commit hygiene" },
      { name: "GitHub", category: "Tools", highlight: "Repository management, collaboration, code hosting" },
      { name: "VS Code", category: "Tools", highlight: "Integrated development, debugging, extension configuration" },
      { name: "Postman", category: "Tools", highlight: "API testing, payload verification, endpoint validation" }
    ]
  }
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    role: "Full-Stack Software Development",
    type: "Hands-on Practice & Project Development",
    period: "2+ Years (2024 — Present)",
    summary:
      "Dedicated hands-on software development focusing on responsive frontend engineering, backend API services, relational and NoSQL database connectivity, and Generative AI workflows.",
    bullets: [
      "Built responsive, accessible user interfaces using HTML, CSS, and modern JavaScript.",
      "Developed end-to-end application logic and structured data processing routines in Python.",
      "Created backend services and REST API workflows with Node.js and Express.js.",
      "Used Mongoose with MongoDB, and SQL databases, for CRUD operations, queries, and joins.",
      "Integrated frontend and backend through APIs and database connectivity, applying strict validation, debugging, and error handling.",
      "Explored Generative AI and prompt engineering through practical applications like FitTrack AI and Mentro Mobility."
    ],
    technologies: [
      "Python",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "SQL",
      "HTML5",
      "CSS3",
      "Generative AI"
    ]
  }
];

export const CERTIFICATES_DATA = [
  {
    id: "cert-guru-nanak",
    title: "Inter-Collegiate Technical Symposium",
    college: "Guru Nanak College",
    location: "Meenambakkam, Chennai",
    category: "Technical Events",
    disciplines: ["Debugging", "Problem Solving", "Digital Tooling"],
    description: "Awarded Certificate of Achievement and Participation in competitive technical rounds including code debugging and algorithmic problem solving.",
    verificationBadge: "Verified Participation & Achievement"
  },
  {
    id: "cert-srm",
    title: "Inter-Collegiate Technical Meet",
    college: "SRM College",
    location: "Chennai",
    category: "Design & Logic",
    disciplines: ["UI Designing", "PPT Presentation"],
    description: "Participated in user interface design prototyping and technical paper presentations with focus on modern usability principles.",
    verificationBadge: "Verified Participation Certificate"
  },
  {
    id: "cert-new-college",
    title: "Collegiate Computing Symposium",
    college: "The New College",
    location: "Royapettah, Chennai",
    category: "Programming & Logic",
    disciplines: ["Code Debugging", "Hackathons"],
    description: "Competed in high-intensity live debugging and hackathon problem statements focusing on error-free code execution.",
    verificationBadge: "Verified Merit & Participation"
  },
  {
    id: "cert-hindustan",
    title: "National Technical Fest",
    college: "Hindustan College of Arts & Science",
    location: "Padur, Chennai",
    category: "Innovation & Design",
    disciplines: ["Poster Designing", "PPT Presentation", "Problem Solving"],
    description: "Presented technical concepts and participated in visual communication challenges for emerging software architectures.",
    verificationBadge: "Verified Event Certificate"
  },
  {
    id: "cert-bhavani",
    title: "Inter-College Tech Fest",
    college: "New Prince Shri Bhavani College",
    location: "Medavakkam, Chennai",
    category: "Creative Technology",
    disciplines: ["Digital Tooling", "Meme Designing", "Technical Quiz"],
    description: "Engaged in creative digital tooling and conceptual tech showcases, earning official recognition and participation honors.",
    verificationBadge: "Verified Participation Certificate"
  }
];

export const ACHIEVEMENTS: AchievementItem = {
  title: "Inter-Collegiate Technical Competitions & Hackathons",
  colleges: [
    "Guru Nanak College (Meenambakkam)",
    "SRM College",
    "The New College (Royapettah)",
    "Hindustan College (Padur)",
    "New Prince Shri Bhavani College (Medavakkam)"
  ],
  events: [
    "Hackathons & Problem Solving",
    "UI Designing & Digital Tooling",
    "Code Debugging Competitions",
    "PPT Presentation & Technical Talks",
    "Poster Designing & Creative Meme Designing"
  ],
  description:
    "Actively represented college in competitive inter-collegiate symposiums and hackathons across Chennai, achieving merit and participation certificates in technical debugging, problem solving, and UI designing.",
  certificates: CERTIFICATES_DATA
};

export const EDUCATION: EducationItem = {
  degree: "Bachelor of Computer Applications (BCA)",
  status: "Expected 2027",
  institution: "Mohamed Sathak College of Arts and Science",
  location: "Sholinganallur / Chennai, Tamil Nadu",
  period: "2024 — 2027",
  details: [
    "Core curriculum in Data Structures, Object-Oriented Programming, Database Management Systems, and Software Engineering.",
    "Active participant in department technical symposiums, hackathons, and coding clubs.",
    "Specialized coursework and personal exploration in Web Technologies, Python Programming, and Artificial Intelligence."
  ]
};
