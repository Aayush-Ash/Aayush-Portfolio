export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: string; // e.g. 'Advanced', 'Specialized', 'Proficient'
    tags?: string[];
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  details: string[];
}

export const RESUME_DATA = {
  name: 'Aayush Kumar',
  title: 'Agentic AI Developer & Full-Stack Engineer',
  tagline: 'Architecting autonomous multi-agent reasoning systems & high-performance distributed web applications.',
  email: 'kashyapaayush3331@gmail.com',
  github: 'https://github.com/Aayush-Ash',
  linkedin: 'https://www.linkedin.com/in/aayush-kumar-ash',
  location: 'Global / Remote Available',
  status: 'Ready to build next-generation agentic systems',
  summary: `I specialize in building intelligent, autonomous software systems. Rather than treating AI as a simple chatbot or wrapper, I engineer Agentic AI pipelines—systems that reason, decompose problems into Directed Acyclic Graphs (DAGs), interact with external APIs and sandboxes, verify facts, and self-correct. Paired with strong full-stack foundations (React, TypeScript, Node.js, FastAPI, PostgreSQL), I turn cutting-edge agentic research into resilient, production-grade applications that users love.`,
  
  coreStats: [
    { label: 'Core Focus', value: 'Agentic AI & Systems' },
    { label: 'Production Models & Demos', value: '6+ Systems' },
    { label: 'Fastest API P99 Latency', value: '< 25ms' },
    { label: 'Precision Benchmark', value: '92.4% (NLP)' }
  ],

  skillCategories: [
    {
      title: 'Agentic AI & LLMs',
      icon: 'Cpu',
      skills: [
        { name: 'LangGraph & Multi-Agent DAGs', level: 'Specialized', tags: ['Stateful Workflows', 'Cyclic Graphs'] },
        { name: 'Tool Calling & Function Execution', level: 'Specialized', tags: ['OpenAI', 'Claude Tool Use', 'Pydantic'] },
        { name: 'RAG 2.0 (Hybrid Search + Re-ranking)', level: 'Advanced', tags: ['Qdrant', 'BM25', 'RRF'] },
        { name: 'Self-Correction & Reflection Loops', level: 'Advanced', tags: ['Hallucination Verification'] },
        { name: 'Vector Databases', level: 'Advanced', tags: ['Qdrant', 'ChromaDB', 'Pinecone', 'Redis'] },
        { name: 'Prompt Engineering & ReAct Patterns', level: 'Specialized', tags: ['Zero-Shot', 'Chain-of-Thought'] }
      ]
    },
    {
      title: 'Full-Stack Engineering',
      icon: 'Laptop',
      skills: [
        { name: 'TypeScript & JavaScript', level: 'Specialized', tags: ['ESNext', 'Strict Type-Safety'] },
        { name: 'React 18 / Next.js', level: 'Specialized', tags: ['Custom Hooks', 'Virtual DOM', 'Canvas'] },
        { name: 'Node.js & Express', level: 'Advanced', tags: ['Async I/O', 'Event Loops', 'Cluster'] },
        { name: 'FastAPI & Python', level: 'Specialized', tags: ['Async Python', 'Pydantic v2', 'Uvicorn'] },
        { name: 'WebSockets & Real-time I/O', level: 'Advanced', tags: ['Socket.io', 'SSE', 'Sub-millisecond'] },
        { name: 'Modern CSS & Responsive Design', level: 'Advanced', tags: ['Custom Properties', 'Micro-interactions'] }
      ]
    },
    {
      title: 'Machine Learning & Data',
      icon: 'TrendingUp',
      skills: [
        { name: 'Scikit-learn & Predictive Modeling', level: 'Advanced', tags: ['Classification', 'Ensembles', 'SVM'] },
        { name: 'NLP & Text Vectorization', level: 'Advanced', tags: ['TF-IDF', 'NLTK', 'Embeddings'] },
        { name: 'Feature Attribution & Explainability', level: 'Proficient', tags: ['SHAP', 'Feature Weights'] },
        { name: 'Pandas & NumPy', level: 'Advanced', tags: ['Data Wrangling', 'Matrix Math'] }
      ]
    },
    {
      title: 'Cloud, Databases & DevOps',
      icon: 'Server',
      skills: [
        { name: 'PostgreSQL & Prisma ORM', level: 'Advanced', tags: ['Indexing', 'Transactions', 'Relational Schemas'] },
        { name: 'Redis', level: 'Advanced', tags: ['Caching', 'Sorted Sets', 'Pub/Sub'] },
        { name: 'Docker & Multi-Stage Builds', level: 'Advanced', tags: ['Containerization', 'Alpine Images'] },
        { name: 'AWS (ECS, S3, EC2)', level: 'Proficient', tags: ['Cloud Deployments', 'IAM'] },
        { name: 'Git & GitHub Actions CI/CD', level: 'Advanced', tags: ['Automated Testing', 'Pipelines'] }
      ]
    }
  ] as SkillCategory[],

  experiences: [
    {
      period: '2023 — Present',
      role: 'Agentic AI Developer & Full-Stack Engineer',
      company: 'Autonomous Systems & Digital Engineering',
      location: 'Remote',
      highlights: [
        'Architected and implemented multi-agent research pipelines using LangGraph and Python, reducing manual synthesis time by over 80%.',
        'Engineered SakuraKeys, a high-octane anime typing platform with zero-latency input engine, custom Web Audio synthesis, and Redis leaderboards.',
        'Developed Sentilytics Pro, an end-to-end NLP sentiment engine achieving 92.4% precision with explainable token weight attribution.',
        'Created containerized CI/CD automated deployment dashboards with live Server-Sent Events (SSE) log streaming.'
      ],
      technologies: ['Python', 'FastAPI', 'LangGraph', 'TypeScript', 'React', 'Docker', 'PostgreSQL', 'Redis']
    },
    {
      period: '2022 — 2023',
      role: 'Full-Stack Software Engineer',
      company: 'Web Systems & Distributed Applications',
      location: 'Remote',
      highlights: [
        'Built full-stack TypeScript web applications with resilient relational schemas, WebSocket multiplayer rooms, and responsive UI components.',
        'Implemented state-of-the-art vector similarity pipelines using Qdrant and hybrid search algorithms.',
        'Optimized client bundle sizes and sub-millisecond keyboard event loops on canvas.'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'WebSockets']
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      institution: 'Engineering University',
      period: '2020 — 2024',
      details: [
        'Focus on Distributed Systems, Artificial Intelligence, and Software Engineering.',
        'Dean\'s list academic performance; led engineering developer clubs and hackathon squads.'
      ]
    }
  ] as EducationItem[]
};
