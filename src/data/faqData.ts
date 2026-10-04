export interface FAQItem {
  id: string;
  category: 'agentic_ai' | 'full_stack' | 'collaboration' | 'tech_stack';
  question: string;
  answer: string;
  tags: string[];
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'agentic-vs-standard',
    category: 'agentic_ai',
    question: 'What distinguishes an Agentic AI Developer from a traditional AI/ML engineer or prompt wrapper?',
    answer: 'Standard AI wrappers simply send single prompt-response calls to an LLM. As an Agentic AI Developer, I engineer autonomous multi-step cognitive loops. These systems decompose non-deterministic human intent into structured Directed Acyclic Graphs (DAGs), route execution dynamically through live tools (code interpreters, vector databases, web scrapers), evaluate intermediate results, and perform self-reflection loops to correct errors before producing verifiable, hallucination-free outputs.',
    tags: ['Agentic AI', 'LangGraph', 'Architecture', 'DAG']
  },
  {
    id: 'hallucination-prevention',
    category: 'agentic_ai',
    question: 'How do you guarantee accuracy and eliminate hallucinations in production agent pipelines?',
    answer: 'I use a triple-layer verification architecture: (1) Deterministic JSON schema enforcement via Pydantic/Zod for strict tool input/output contracts; (2) Grounded citation tracking where every synthesized claim must trace back to raw source token spans in the retrieved vector context; and (3) Independent Verifier Agents that cross-examine findings against original primary sources before final response delivery.',
    tags: ['Verification', 'Citations', 'Reliability', 'Guardrails']
  },
  {
    id: 'primary-tech-stack',
    category: 'tech_stack',
    question: 'What technologies, frameworks, and models do you work with on a daily basis?',
    answer: 'On the AI & Agent layer: Python 3.11, LangGraph, Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o/o1, Qdrant Vector DB, ChromaDB, and Ollama for local inference. On the Full-Stack layer: TypeScript, React 19, Next.js, Node.js, FastAPI, PostgreSQL, Prisma, Redis, Docker, and WebSockets. I prioritize type safety, sub-millisecond event loops, and modular maintainability across all layers.',
    tags: ['Python', 'TypeScript', 'LangGraph', 'FastAPI', 'React 19']
  },
  {
    id: 'availability-roles',
    category: 'collaboration',
    question: 'Are you available for full-time employment, contract engagements, or consulting?',
    answer: 'Yes! I am actively evaluating full-time software engineering roles, high-impact contract projects, and specialized AI advisory consulting. I work seamlessly with remote distributed teams across global time zones (US, Europe, APAC) and can onboard rapidly to accelerate your AI roadmap.',
    tags: ['Hiring', 'Remote', 'Full-time', 'Contract']
  },
  {
    id: 'workshop-architecture',
    category: 'full_stack',
    question: 'How was this 2.5D interactive Among Us space station portfolio built?',
    answer: 'This entire experience was engineered from scratch using React 19, TypeScript, and HTML5 Canvas. Rather than loading heavy 3D game engines (like Three.js or Unity) which take seconds to load and drain mobile battery, I architected a custom lightweight 2.5D orthographic tile and sprite compositor with AABB collision detection, custom Web Audio synthesis, and 60fps hardware-accelerated rendering. It loads in under 1.5 seconds and runs at 60 FPS even on low-powered mobile devices.',
    tags: ['Canvas 2D', 'React 19', 'Performance', 'Web Audio']
  },
  {
    id: 'custom-agent-development',
    category: 'collaboration',
    question: 'Can you design a custom multi-agent workflow or tool suite for our organization?',
    answer: 'Absolutely. I collaborate with teams to identify manual bottlenecks (e.g. market research synthesis, multi-repository code reviews, compliance audits, customer query triaging) and build end-to-end autonomous agent solutions with custom tool integrations, latency monitoring, and intuitive web dashboards.',
    tags: ['Custom Solutions', 'Enterprise', 'Integrations']
  },
  {
    id: 'response-time',
    category: 'collaboration',
    question: 'What is the fastest way to get in touch and what is your turnaround time?',
    answer: 'You can transmit a direct dispatch using the Sector 04 Comms form on this site, or email directly at kashyapaayush3331@gmail.com. I review inquiries daily and typically respond within 12 to 24 hours with scheduling links or preliminary technical feedback.',
    tags: ['Contact', 'Speed', 'Communication']
  }
];
