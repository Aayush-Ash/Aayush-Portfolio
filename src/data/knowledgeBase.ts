import type { ChatMessage, QuickPrompt } from '../types/chat';

export const QUICK_PROMPTS: QuickPrompt[] = [
  { id: 'ai_projects', label: '🧠 SHOW AI PROJECTS', prompt: 'Show me your Agentic AI projects and explain the architecture.' },
  { id: 'fullstack', label: '💻 SHOW FULL-STACK WORK', prompt: 'Tell me about SakuraKeys and your full-stack engineering stack.' },
  { id: 'data_ml', label: '📊 SHOW DATA SCIENCE & ML', prompt: 'What machine learning pipelines have you built?' },
  { id: 'about', label: '⚡ ABOUT AAYUSH', prompt: 'Who is Aayush and what is his engineering philosophy?' },
  { id: 'stack', label: '🛠️ TECHNICAL STACK', prompt: 'What is your core tech stack across AI, frontend, and backend?' },
  { id: 'contact', label: '📡 HOW TO REACH OUT', prompt: 'How can I contact or hire Aayush for an engineering role?' }
];

export function queryWorkshopAI(query: string): ChatMessage {
  const q = query.toLowerCase();
  const id = 'msg_' + Date.now();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Teleportation / Navigation queries
  if (q.includes('teleport') || q.includes('take me to') || q.includes('go to')) {
    if (q.includes('ai') || q.includes('lab') || q.includes('agent')) {
      return {
        id,
        sender: 'ai',
        text: 'Initiating sector jump: Coordinates locked onto Sector 01: AI LAB. Preparing holographic displays.',
        timestamp,
        actionButtons: [{ label: '🚀 JUMP TO AI LAB', action: 'teleport', payload: 'AI_LAB' }]
      };
    }
    if (q.includes('build') || q.includes('bay') || q.includes('stack') || q.includes('sakura')) {
      return {
        id,
        sender: 'ai',
        text: 'Initiating sector jump: Coordinates locked onto Sector 02: BUILD BAY. Mechanical switches online.',
        timestamp,
        actionButtons: [{ label: '🚀 JUMP TO BUILD BAY', action: 'teleport', payload: 'BUILD_BAY' }]
      };
    }
    if (q.includes('data') || q.includes('core') || q.includes('ml') || q.includes('sentilytics')) {
      return {
        id,
        sender: 'ai',
        text: 'Initiating sector jump: Coordinates locked onto Sector 03: DATA CORE. Server clusters active.',
        timestamp,
        actionButtons: [{ label: '🚀 JUMP TO DATA CORE', action: 'teleport', payload: 'DATA_CORE' }]
      };
    }
    if (q.includes('hq') || q.includes('about') || q.includes('resume') || q.includes('contact')) {
      return {
        id,
        sender: 'ai',
        text: 'Initiating sector jump: Coordinates locked onto Sector 04: AAYUSH HQ. Command workstation standing by.',
        timestamp,
        actionButtons: [{ label: '🚀 JUMP TO HQ', action: 'teleport', payload: 'HQ' }]
      };
    }
  }

  // 2. AI Projects / Agent queries
  if (q.includes('ai') || q.includes('agent') || q.includes('llm') || q.includes('rag') || q.includes('research')) {
    return {
      id,
      sender: 'ai',
      text: `In the AI LAB (Sector 01), Aayush architects true Agentic systems—not basic prompt wrappers. 

Key systems:
1. **AI Research Agent**: Uses a stateful DAG planner to decompose open-ended inquiries into sub-goals, calls live search & python sandboxes, uses dual-tier memory (Qdrant vector + Redis scratchpad), and executes self-reflection to eliminate hallucinations.
2. **Autonomous Code Reviewer**: Integrates Tree-sitter AST parsing with multi-turn LLM reasoning to generate actionable git diffs with 87% acceptance.

Would you like to inspect the architecture node diagram?`,
      timestamp,
      actionButtons: [
        { label: '🔍 INSPECT AI RESEARCH AGENT', action: 'open_project', payload: 'ai-research-agent' },
        { label: '🚀 TELEPORT TO AI LAB', action: 'teleport', payload: 'AI_LAB' }
      ],
      relatedProjects: ['ai-research-agent', 'code-review-agent']
    };
  }

  // 3. Full-Stack / SakuraKeys / Web queries
  if (q.includes('fullstack') || q.includes('full stack') || q.includes('sakura') || q.includes('web') || q.includes('react') || q.includes('keyboard')) {
    return {
      id,
      sender: 'ai',
      text: `In BUILD BAY (Sector 02), Aayush builds high-performance, full-stack software systems:

• **SakuraKeys**: High-octane anime typing platform with custom Web Audio synthesized mechanical switches (Cherry MX, Topre, Holy Panda), sub-5ms low-latency input loop, real-time WebSocket multiplayer lobbies, and Redis sorted-set leaderboards.
• **DevFlow Cloud CI/CD**: Containerized orchestration dashboard with multi-stage Docker builds and live Server-Sent Events (SSE) log streaming.

Aayush writes strict TypeScript, builds custom canvas rendering loops, and designs bulletproof backend microservices.`,
      timestamp,
      actionButtons: [
        { label: '⌨️ LAUNCH SAKURAKEYS STATION', action: 'open_project', payload: 'sakurakeys' },
        { label: '🚀 TELEPORT TO BUILD BAY', action: 'teleport', payload: 'BUILD_BAY' }
      ],
      relatedProjects: ['sakurakeys', 'devflow-cloud']
    };
  }

  // 4. Data Science / Machine Learning queries
  if (q.includes('data') || q.includes('ml') || q.includes('sentiment') || q.includes('sentilytics') || q.includes('health')) {
    return {
      id,
      sender: 'ai',
      text: `In the DATA CORE (Sector 03), Aayush engineers machine learning and data pipelines:

• **Sentilytics Pro**: Movie review sentiment classifier achieving 92.4% precision using TF-IDF sublinear scaling and calibrated ensembles with explainable token attribution (SHAP). There is a live interactive tester right here in the workshop!
• **HealthMate AI**: Clinical triage risk classifier utilizing XGBoost and few-shot clinical LLM prompting for patient urgency tiering.`,
      timestamp,
      actionButtons: [
        { label: '📊 TEST SENTILYTICS LIVE', action: 'open_project', payload: 'sentilytics-pro' },
        { label: '🚀 TELEPORT TO DATA CORE', action: 'teleport', payload: 'DATA_CORE' }
      ],
      relatedProjects: ['sentilytics-pro', 'healthmate-ai']
    };
  }

  // 5. About Aayush / Philosophy
  if (q.includes('about') || q.includes('who is') || q.includes('background') || q.includes('philosophy')) {
    return {
      id,
      sender: 'ai',
      text: `Aayush Kumar is an **Agentic AI Developer & Full-Stack Engineer**.

His north-star philosophy:
"If it's just a flashy prompt wrapper, don't build it. If it demonstrates how you architect, connect, test, and deploy resilient autonomous systems that solve hard problems—build it with visual excellence."

He bridges the gap between state-of-the-art agentic reasoning (LangGraph, tool calling, RAG) and robust distributed web applications (React, TypeScript, Node.js, FastAPI, PostgreSQL).`,
      timestamp,
      actionButtons: [
        { label: '⚡ OPEN DEVELOPER DOSSIER', action: 'open_about' },
        { label: '📄 VIEW RESUME & CREDENTIALS', action: 'open_resume' }
      ]
    };
  }

  // 6. Technical Stack queries
  if (q.includes('stack') || q.includes('skills') || q.includes('python') || q.includes('typescript') || q.includes('technologies')) {
    return {
      id,
      sender: 'ai',
      text: `Here is Aayush's primary engineering stack:

• **Agentic AI**: LangGraph, Python 3.11, OpenAI Function Calling, Claude Tool Use, ReAct DAGs, Qdrant Vector DB, BM25 Hybrid RAG.
• **Frontend**: React 18, TypeScript, Vite, HTML5 Canvas, Web Audio API, Vanilla CSS design systems.
• **Backend & Distributed**: Node.js, FastAPI, Express, WebSockets, Redis, PostgreSQL, Prisma ORM.
• **Cloud & DevOps**: Docker, AWS (ECS, S3, EC2), GitHub Actions CI/CD, Nginx reverse proxy.`,
      timestamp,
      actionButtons: [
        { label: '📄 VIEW FULL SKILLS MATRIX', action: 'open_resume' },
        { label: '⚡ OPEN EXECUTIVE VIEW', action: 'switch_to_executive' }
      ]
    };
  }

  // 7. Resume / Hiring / Contact queries
  if (q.includes('resume') || q.includes('cv') || q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('github')) {
    return {
      id,
      sender: 'ai',
      text: `Aayush is open to innovative engineering roles, agentic AI development, and distributed full-stack challenges.

You can inspect his credentials, verify project architectures, or transmit a direct message through the Comms Uplink Console.`,
      timestamp,
      actionButtons: [
        { label: '📄 OPEN RESUME & DOWNLOAD PDF', action: 'open_resume' },
        { label: '📡 OPEN COMMS UPLINK', action: 'open_contact' }
      ]
    };
  }

  // Default response
  return {
    id,
    sender: 'ai',
    text: `Diagnostic acknowledgment: Query received. As your Workshop AI, I can guide you through Aayush's Agentic AI architectures, demonstrate full-stack projects like SakuraKeys, explain the ML pipelines in Data Core, or teleport you anywhere in the facility.

What would you like to explore?`,
    timestamp,
    actionButtons: [
      { label: '🧠 EXPLORE AGENTIC AI', action: 'teleport', payload: 'AI_LAB' },
      { label: '💻 EXPLORE FULL-STACK', action: 'teleport', payload: 'BUILD_BAY' },
      { label: '📄 VIEW RESUME', action: 'open_resume' }
    ]
  };
}
