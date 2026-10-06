export interface AIActionButton {
  label: string;
  action: 'open_project' | 'open_resume' | 'open_contact' | 'scroll_to_section' | 'switch_to_workshop';
  payload?: string;
}

export interface AIMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: AIActionButton[];
  categoryBadge?: string;
}

export interface PromptChip {
  id: string;
  label: string;
  prompt: string;
  icon?: string;
}

export const INITIAL_PROMPT_CHIPS: PromptChip[] = [
  {
    id: 'who_is_aayush',
    label: '⚡ Who is Aayush?',
    prompt: 'Who is Aayush Kumar and what is his engineering background?'
  },
  {
    id: 'agentic_systems',
    label: '🧠 Agentic AI Work',
    prompt: 'Tell me about your Agentic AI projects and architecture.'
  },
  {
    id: 'top_projects',
    label: '🌟 Flagship Projects',
    prompt: 'What are your top engineering projects and what problems do they solve?'
  },
  {
    id: 'tech_stack',
    label: '🛠️ Full Tech Stack',
    prompt: 'What is your core tech stack across AI, frontend, and backend?'
  },
  {
    id: 'hire_contact',
    label: '💼 Hire / Contact Aayush',
    prompt: 'How can I hire or contact Aayush for an engineering role?'
  },
  {
    id: 'fullstack_sakura',
    label: '💻 SakuraKeys & Full-Stack',
    prompt: 'Tell me about SakuraKeys and your full-stack engineering work.'
  }
];

export function queryAayushIntelligence(rawQuery: string): AIMessage {
  const q = rawQuery.toLowerCase().trim();
  const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date();
  const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 1. Who is Aayush / Bio / Background
  if (
    q.includes('who is') ||
    q.includes('about aayush') ||
    q.includes('about you') ||
    q.includes('bio') ||
    q.includes('background') ||
    q.includes('tell me about yourself') ||
    q.includes('philosophy')
  ) {
    return {
      id,
      sender: 'ai',
      categoryBadge: 'PROFILE // DOSSIER',
      text: `**Aayush Kumar** is an **Agentic AI Developer & Full-Stack Systems Architect**.

Rather than assembling superficial prompt wrappers or fragile chatbots, Aayush specializes in **true Agentic AI architectures**—multi-agent systems that autonomously decompose open-ended goals into Directed Acyclic Graphs (DAGs), interact with sandboxed tools, manage dual-tier episodic memory, and cross-verify facts using self-reflection.

**Engineering Philosophy:**
> *"If it's just a flashy prompt wrapper, don't build it. If it demonstrates how to architect, connect, test, and deploy resilient autonomous systems that solve hard real-world problems—build it with visual and engineering excellence."*

He pairs deep AI reasoning pipelines (LangGraph, Python, Qdrant) with battle-tested full-stack engineering (React 19, TypeScript, Node.js, FastAPI, PostgreSQL).`,
      timestamp,
      actionButtons: [
        { label: '📄 VIEW RESUME & CREDENTIALS', action: 'open_resume' },
        { label: '📬 GET IN TOUCH WITH AAYUSH', action: 'open_contact' },
        { label: '🔍 EXPLORE FEATURED PROJECTS', action: 'scroll_to_section', payload: '#projects' }
      ]
    };
  }

  // 2. Agentic AI & AI Research Agent
  if (
    q.includes('agentic') ||
    q.includes('agent') ||
    q.includes('llm') ||
    q.includes('langgraph') ||
    q.includes('rag') ||
    q.includes('research agent') ||
    q.includes('dag')
  ) {
    return {
      id,
      sender: 'ai',
      categoryBadge: 'AGENTIC ARCHITECTURE',
      text: `In Agentic AI, Aayush architects **production-grade multi-agent reasoning graphs**:

### Flagship: AI Research Agent
• **Directed Acyclic Graph (DAG) Planner**: Decomposes complex, multi-variable technical inquiries into parallel sub-goals with schema verification.
• **Dynamic Tool Execution**: Dispatches live web scraping (Puppeteer), academic queries (ArXiv API), search (Serper), and code execution (Python REPL sandbox).
• **Dual-Tier Memory**: Working scratchpad buffer (Redis) + persistent semantic vector database (Qdrant) with reciprocal rank fusion (RRF).
• **Self-Correction & Reflection**: Cross-checks extracted claims against original primary sources, eliminating hallucinations before generating cited executive dossiers.
• **Performance**: Achieves **6.4x research speedup** and **98.2% verified citation accuracy**.

### Autonomous Code Reviewer
• Combines **Tree-sitter AST parsing** with multi-turn LLM reasoning to evaluate PRs, spot anti-patterns, and auto-generate git diffs with an **87% developer acceptance rate**.`,
      timestamp,
      actionButtons: [
        { label: '🧠 INSPECT AI RESEARCH AGENT', action: 'open_project', payload: 'ai-research-agent' },
        { label: '⚡ INSPECT CODE REVIEW AGENT', action: 'open_project', payload: 'code-review-agent' },
        { label: '📐 VIEW ARCHITECTURE PARADIGM', action: 'scroll_to_section', payload: '#architecture' }
      ]
    };
  }

  // 3. Full-Stack Systems / SakuraKeys / DevFlow
  if (
    q.includes('fullstack') ||
    q.includes('full-stack') ||
    q.includes('sakura') ||
    q.includes('devflow') ||
    q.includes('typing') ||
    q.includes('react') ||
    q.includes('typescript') ||
    q.includes('frontend')
  ) {
    return {
      id,
      sender: 'ai',
      categoryBadge: 'FULL-STACK SYSTEMS',
      text: `Aayush builds high-frequency, responsive web platforms engineered for zero-latency interactions:

### SakuraKeys Typing Experience
• High-octane aesthetic typing platform featuring **custom synthesized Web Audio mechanical switches** (Cherry MX Blue/Brown/Red, Topre, Holy Panda) with zero external audio assets.
• Sub-5ms low latency input loop, 60fps canvas particle rendering, real-time WebSocket multiplayer racing lobbies, and Redis sorted-set leaderboards.

### DevFlow Cloud CI/CD
• Modern DevOps dashboard providing containerized Docker multi-stage builds, automated vulnerability scanning, and real-time Server-Sent Events (SSE) log streaming with sub-25ms P99 API latency.

Aayush writes strict TypeScript, leverages React 19 concurrent features, and designs scalable backends with FastAPI and Express.`,
      timestamp,
      actionButtons: [
        { label: '⌨️ LAUNCH SAKURAKEYS DEMO', action: 'open_project', payload: 'sakurakeys' },
        { label: '☁️ INSPECT DEVFLOW CLOUD', action: 'open_project', payload: 'devflow-cloud' },
        { label: '🛠️ VIEW FULL STACK DETAILS', action: 'scroll_to_section', payload: '#skills' }
      ]
    };
  }

  // 4. Data Science / Machine Learning / Sentilytics / CardioPredict
  if (
    q.includes('data') ||
    q.includes('ml') ||
    q.includes('machine learning') ||
    q.includes('sentilytics') ||
    q.includes('cardio') ||
    q.includes('sentiment')
  ) {
    return {
      id,
      sender: 'ai',
      categoryBadge: 'ML & DATA PIPELINES',
      text: `In Machine Learning & Data Pipelines, Aayush develops mathematically verified, explainable AI models:

### Sentilytics Pro (NLP Sentiment Engine)
• Movie review sentiment classifier achieving **92.4% precision** using TF-IDF sublinear scaling, calibrated ensemble models, and explainable token attribution (SHAP-inspired feature highlights).
• Features an interactive real-time tester with dynamic word impact visualization!

### CardioPredict ML Pipeline
• Clinical triage risk prediction pipeline utilizing Scikit-learn ensembles, patient telemetry normalization, and clinical feature importance analysis.`,
      timestamp,
      actionButtons: [
        { label: '📊 TEST SENTILYTICS PRO', action: 'open_project', payload: 'sentilytics-pro' },
        { label: '❤️ INSPECT CARDIOPREDICT ML', action: 'open_project', payload: 'cardiopredict-ai' }
      ]
    };
  }

  // 5. Tech Stack & Skills
  if (
    q.includes('tech stack') ||
    q.includes('stack') ||
    q.includes('skills') ||
    q.includes('python') ||
    q.includes('database') ||
    q.includes('tools') ||
    q.includes('technologies')
  ) {
    return {
      id,
      sender: 'ai',
      categoryBadge: 'ENGINEERING ARSENAL',
      text: `Aayush's core technical stack spans modern AI reasoning to cloud deployments:

• **Agentic AI & LLMs**: LangGraph, Python 3.11, OpenAI Function Calling, Anthropic Claude API, Qdrant Vector DB, ChromaDB, ReAct Prompting, BM25 Hybrid Search.
• **Frontend Engineering**: React 19 / 18, TypeScript, Vite, HTML5 Canvas, Web Audio API, WebSockets, Vanilla CSS design systems.
• **Backend & Distributed Systems**: FastAPI, Node.js, Express, Uvicorn, Asyncio, Redis, PostgreSQL, Prisma ORM, Celery.
• **Cloud & DevOps**: Docker, Multi-Stage Builds, AWS (ECS, S3, EC2), GitHub Actions CI/CD, Nginx.`,
      timestamp,
      actionButtons: [
        { label: '📄 VIEW SKILLS MATRIX', action: 'scroll_to_section', payload: '#skills' },
        { label: '📄 OPEN FULL RESUME', action: 'open_resume' }
      ]
    };
  }

  // 6. Hiring, Contact, Resume, Availability
  if (
    q.includes('hire') ||
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('reach') ||
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('available') ||
    q.includes('job') ||
    q.includes('github') ||
    q.includes('linkedin')
  ) {
    return {
      id,
      sender: 'ai',
      categoryBadge: 'COMMS & HIRING',
      text: `Aayush is **available for high-impact engineering roles, Agentic AI development, and contract systems architecture**.

### Direct Comms Telemetry:
• **Email**: [kashyapaayush3331@gmail.com](mailto:kashyapaayush3331@gmail.com)
• **LinkedIn**: [linkedin.com/in/aayush-kumar-ash](https://www.linkedin.com/in/aayush-kumar-ash)
• **GitHub**: [github.com/Aayush-Ash](https://github.com/Aayush-Ash)
• **Location**: Global / Remote Available

You can inspect his complete Curriculum Vitae or send an encrypted message right now via the Comms Uplink form.`,
      timestamp,
      actionButtons: [
        { label: '📡 OPEN COMMS UPLINK FORM', action: 'open_contact' },
        { label: '📄 OPEN RESUME & CV', action: 'open_resume' }
      ]
    };
  }

  // 7. General / All projects
  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('built')) {
    return {
      id,
      sender: 'ai',
      categoryBadge: 'PORTFOLIO INDEX',
      text: `Aayush has engineered **6 production-grade systems** across Agentic AI, Full-Stack, and ML:

1. **AI Research Agent** — Autonomous DAG research planner with live web/code tools & self-reflection.
2. **SakuraKeys** — High-octane mechanical typing platform with synthesized Web Audio switches & WebSockets.
3. **Sentilytics Pro** — 92.4% precision NLP sentiment engine with token attribution.
4. **Autonomous Code Reviewer** — Tree-sitter AST & multi-turn LLM agent generating git diffs.
5. **CardioPredict ML** — Clinical cardiovascular triage & risk prediction pipeline.
6. **DevFlow Cloud** — Containerized CI/CD orchestration with live SSE log streaming.

Which system would you like to inspect in detail?`,
      timestamp,
      actionButtons: [
        { label: '🧠 AI RESEARCH AGENT', action: 'open_project', payload: 'ai-research-agent' },
        { label: '⌨️ SAKURAKEYS', action: 'open_project', payload: 'sakurakeys' },
        { label: '📊 SENTILYTICS PRO', action: 'open_project', payload: 'sentilytics-pro' },
        { label: '↓ EXPLORE ALL ON PAGE', action: 'scroll_to_section', payload: '#projects' }
      ]
    };
  }

  // Default fallback answer
  return {
    id,
    sender: 'ai',
    categoryBadge: 'AAYUSH INTELLIGENCE CORE',
    text: `I have complete access to **Aayush Kumar's portfolio knowledge graph**, including:

• His **Agentic AI systems** (AI Research Agent, Autonomous Code Reviewer)
• His **Full-Stack platforms** (SakuraKeys typing platform, DevFlow Cloud)
• His **Machine Learning pipelines** (Sentilytics Pro, CardioPredict ML)
• His **core tech stack** (TypeScript, React 19, Python, FastAPI, LangGraph, Qdrant)
• His **curriculum vitae, background, and hiring availability**

Feel free to ask any specific question or select one of the suggested prompts below!`,
    timestamp,
    actionButtons: [
      { label: '⚡ WHO IS AAYUSH?', action: 'open_resume' },
      { label: '🧠 SHOW AI PROJECTS', action: 'open_project', payload: 'ai-research-agent' },
      { label: '📬 HIRE / CONTACT AAYUSH', action: 'open_contact' },
      { label: '🚀 VISIT 2.5D WORKSHOP', action: 'switch_to_workshop' }
    ]
  };
}
