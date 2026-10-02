import type { ZoneConfig, InteractableObject, EasterEggData } from '../types/world';

export const ZONES: Record<string, ZoneConfig> = {
  CENTRAL_HUB: {
    id: 'CENTRAL_HUB',
    title: 'CENTRAL ROTUNDA',
    subTitle: 'System Navigation Hub',
    tagline: 'All sectors converge here. Follow the glowing floor conduits to explore.',
    bounds: { minX: -220, maxX: 220, minY: -220, maxY: 220 },
    center: { x: 0, y: 0 },
    themeColor: '#00D2FF',
    accentColor: '#38BDF8'
  },
  AI_LAB: {
    id: 'AI_LAB',
    title: '🧠 AI LAB // AGENT CORE',
    subTitle: 'Sector 01 — Autonomous Systems & LLMs',
    tagline: 'Multi-agent orchestration, DAG planning, tool calling, and RAG architectures.',
    bounds: { minX: -260, maxX: 260, minY: -620, maxY: -220 },
    center: { x: 0, y: -420 },
    themeColor: '#00D2FF',
    accentColor: '#818CF8'
  },
  BUILD_BAY: {
    id: 'BUILD_BAY',
    title: '💻 BUILD BAY // SOFTWARE GARAGE',
    subTitle: 'Sector 02 — Full-Stack Systems & Web Apps',
    tagline: 'React, TypeScript, Node.js, distributed databases, and high-frequency real-time websockets.',
    bounds: { minX: -660, maxX: -220, minY: -240, maxY: 240 },
    center: { x: -440, y: 0 },
    themeColor: '#38BDF8',
    accentColor: '#34D399'
  },
  DATA_CORE: {
    id: 'DATA_CORE',
    title: '📊 DATA CORE // ML & PIPELINES',
    subTitle: 'Sector 03 — Machine Learning & Analytics',
    tagline: 'NLP feature extraction, predictive models, TF-IDF vectorizers, and cloud inference.',
    bounds: { minX: -260, maxX: 260, minY: 220, maxY: 620 },
    center: { x: 0, y: 420 },
    themeColor: '#10B981',
    accentColor: '#059669'
  },
  HQ: {
    id: 'HQ',
    title: '⚡ AAYUSH HQ // COMMAND DECK',
    subTitle: 'Sector 04 — Profile, Experience & Contact',
    tagline: 'The developer behind the code: background, philosophy, resume, and communications.',
    bounds: { minX: 220, maxX: 660, minY: -240, maxY: 240 },
    center: { x: 440, y: 0 },
    themeColor: '#F59E0B',
    accentColor: '#FBBF24'
  }
};

export const INTERACTABLES: InteractableObject[] = [
  // --- CENTRAL HUB ---
  {
    id: 'hub_directory_kiosk',
    name: 'Sector Directory',
    subTitle: 'Interactive Sector Guide & Wayfinding',
    type: 'terminal',
    zone: 'CENTRAL_HUB',
    position: { x: 0, y: -40 },
    radius: 70,
    iconName: 'Compass',
    color: '#00D2FF',
    hologramType: 'cube'
  },

  // --- AI LAB (NORTH) ---
  {
    id: 'agent_core_holo',
    name: 'Holographic Agent Core',
    subTitle: 'Interactive Architecture: PLAN → TOOL → MEMORY → ACTION',
    type: 'agent_core',
    zone: 'AI_LAB',
    position: { x: 0, y: -420 },
    radius: 95,
    iconName: 'Cpu',
    color: '#00D2FF',
    hologramType: 'nodes'
  },
  {
    id: 'term_ai_research',
    name: 'AI Research Agent Terminal',
    subTitle: 'Autonomous Multi-Step Technical Researcher',
    type: 'project',
    projectId: 'ai-research-agent',
    zone: 'AI_LAB',
    position: { x: -140, y: -480 },
    radius: 75,
    iconName: 'Bot',
    color: '#00D2FF',
    hologramType: 'nodes'
  },
  {
    id: 'term_code_reviewer',
    name: 'Autonomous Code Reviewer',
    subTitle: 'AST & LLM Multi-Stage Pull Request Auditor',
    type: 'project',
    projectId: 'code-review-agent',
    zone: 'AI_LAB',
    position: { x: 140, y: -480 },
    radius: 75,
    iconName: 'Code',
    color: '#818CF8',
    hologramType: 'cube'
  },

  // --- BUILD BAY (WEST) ---
  {
    id: 'station_sakurakeys',
    name: 'SakuraKeys Terminal',
    subTitle: 'Anime-Inspired Typing Platform & Mechanical Soundboard',
    type: 'project',
    projectId: 'sakurakeys',
    zone: 'BUILD_BAY',
    position: { x: -440, y: -100 },
    radius: 80,
    iconName: 'Keyboard',
    color: '#F472B6',
    hologramType: 'keyboard'
  },
  {
    id: 'term_devflow',
    name: 'DevFlow Cloud CI/CD Console',
    subTitle: 'Containerized Deployment & Stream Orchestrator',
    type: 'project',
    projectId: 'devflow-cloud',
    zone: 'BUILD_BAY',
    position: { x: -440, y: 100 },
    radius: 75,
    iconName: 'Layers',
    color: '#38BDF8',
    hologramType: 'cube'
  },

  // --- DATA CORE (SOUTH) ---
  {
    id: 'term_sentilytics',
    name: 'Sentilytics Pro Terminal',
    subTitle: 'Movie Review Sentiment Analysis (92% Precision)',
    type: 'project',
    projectId: 'sentilytics-pro',
    zone: 'DATA_CORE',
    position: { x: -140, y: 440 },
    radius: 75,
    iconName: 'TrendingUp',
    color: '#10B981',
    hologramType: 'pipeline'
  },
  {
    id: 'term_healthmate',
    name: 'HealthMate AI Console',
    subTitle: 'Clinical Triage & Biomarker Predictor',
    type: 'project',
    projectId: 'healthmate-ai',
    zone: 'DATA_CORE',
    position: { x: 140, y: 440 },
    radius: 75,
    iconName: 'Activity',
    color: '#34D399',
    hologramType: 'cube'
  },
  {
    id: 'server_rack_ai',
    name: 'Server Rack // AAYUSH-AI',
    subTitle: 'Cluster Telemetry & GPU Inference Monitor',
    type: 'easter_egg',
    easterEggId: 'egg_server_ai',
    zone: 'DATA_CORE',
    position: { x: -70, y: 530 },
    radius: 65,
    iconName: 'Server',
    color: '#00D2FF',
    hologramType: 'server'
  },
  {
    id: 'server_rack_fullstack',
    name: 'Server Rack // FULLSTACK-CORE',
    subTitle: 'Edge Nodes, Reverse Proxies & In-Memory Redis',
    type: 'easter_egg',
    easterEggId: 'egg_server_fs',
    zone: 'DATA_CORE',
    position: { x: 70, y: 530 },
    radius: 65,
    iconName: 'Server',
    color: '#10B981',
    hologramType: 'server'
  },

  // --- HQ (EAST) ---
  {
    id: 'hq_laptop',
    name: "Aayush's Workstation",
    subTitle: 'Developer Story, Mindset & Engineering Philosophy',
    type: 'about',
    zone: 'HQ',
    position: { x: 440, y: -80 },
    radius: 75,
    iconName: 'Laptop',
    color: '#F59E0B',
    hologramType: 'desk'
  },
  {
    id: 'hq_resume_pedestal',
    name: 'Resume Holo-Pedestal',
    subTitle: 'Experience, Education, Skills & One-Click PDF',
    type: 'resume',
    zone: 'HQ',
    position: { x: 440, y: 80 },
    radius: 75,
    iconName: 'FileText',
    color: '#FBBF24',
    hologramType: 'cube'
  },
  {
    id: 'hq_contact_console',
    name: 'Comms Uplink Console',
    subTitle: 'Direct Transmission, Email & Social Channels',
    type: 'contact',
    zone: 'HQ',
    position: { x: 550, y: 0 },
    radius: 75,
    iconName: 'Radio',
    color: '#00D2FF',
    hologramType: 'cube'
  },

  // --- EASTER EGGS ---
  {
    id: 'egg_blueprint',
    name: 'Wall Blueprint: SYSTEMS ARCHITECTURE',
    subTitle: 'Master schematic of distributed agent systems',
    type: 'easter_egg',
    easterEggId: 'egg_blueprint',
    zone: 'AI_LAB',
    position: { x: 0, y: -590 },
    radius: 60,
    iconName: 'FileCode',
    color: '#38BDF8'
  },
  {
    id: 'egg_whiteboard',
    name: 'Workshop Whiteboard',
    subTitle: 'IDEA → DESIGN → BUILD → TEST → DEPLOY',
    type: 'easter_egg',
    easterEggId: 'egg_whiteboard',
    zone: 'BUILD_BAY',
    position: { x: -620, y: 0 },
    radius: 60,
    iconName: 'PenTool',
    color: '#F59E0B'
  },
  {
    id: 'egg_git_log',
    name: 'Terminal: $ git log',
    subTitle: 'Real-world commits: building... breaking... deploying...',
    type: 'easter_egg',
    easterEggId: 'egg_git_log',
    zone: 'BUILD_BAY',
    position: { x: -330, y: -190 },
    radius: 60,
    iconName: 'Terminal',
    color: '#34D399'
  },
  {
    id: 'egg_coffee',
    name: 'Caffeine Fuel Station',
    subTitle: 'Agent Refuel Station (Level: 98%)',
    type: 'easter_egg',
    easterEggId: 'egg_coffee',
    zone: 'HQ',
    position: { x: 330, y: -190 },
    radius: 55,
    iconName: 'Coffee',
    color: '#F59E0B'
  }
];

export const EASTER_EGGS: Record<string, EasterEggData> = {
  egg_blueprint: {
    id: 'egg_blueprint',
    title: 'SCHEMATIC // SYSTEMS I HAVE BUILT',
    subtitle: 'The Architectural Blueprints of Aayush Kumar',
    type: 'blueprint',
    content: `
===================================================================
      AAYUSH KUMAR — CORE SYSTEM ARCHITECTURAL SPECIFICATION
===================================================================

[LAYER 01: PERCEPTION & INGESTION]
  • Multi-modal input streaming (Web, Text, Audio, Code ASTs)
  • Token-level stream sanitization & rate-limited backpressure queues
  • Semantic chunking with context-aware boundary detection

[LAYER 02: REASONING & DECISION (AGENT CORE)]
  • Stateful DAG planners (LangGraph / Custom state machines)
  • Self-Correction loops: Output -> Verification -> Critic -> Refine
  • Autonomous tool dispatching with type-safe schema enforcement

[LAYER 03: MEMORY & RETRIEVAL (RAG 2.0)]
  • Tier 1: In-context scratchpad (ephemeral working memory)
  • Tier 2: Redis LRU session cache (latency < 2ms)
  • Tier 3: Dense vector embeddings + BM25 sparse hybrid search (Qdrant)
  • Tier 4: Cross-encoder re-ranking for needle-in-haystack accuracy

[LAYER 04: EXECUTION & SERVING]
  • High-performance async microservices (FastAPI / Node.js)
  • Zero-downtime blue/green deployments via Docker & AWS ECS
  • Sub-10ms WebSocket real-time broadcast channels
===================================================================
    `
  },
  egg_whiteboard: {
    id: 'egg_whiteboard',
    title: 'WORKSHOP WHITEBOARD',
    subtitle: 'The Non-Negotiable Engineering Cycle',
    type: 'whiteboard',
    content: `
                ┌──────────────┐
                │    IDEA      │
                │ What pain are│
                │ we solving?  │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │    DESIGN    │
                │ Architecture,│
                │ Schemas, DAGs│
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │    BUILD     │
                │  Clean, Type-│
                │  safe, Tested│
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │    TEST      │
                │ Edge cases,  │
                │ Benchmark,   │
                │ Stress-test  │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │   DEPLOY     │
                │ Observable,  │
                │ Zero-downtime│
                └──────────────┘

"If it works on my machine, we package the machine."
— Aayush
    `
  },
  egg_git_log: {
    id: 'egg_git_log',
    title: 'TERMINAL: $ git log --graph --oneline',
    subtitle: 'A Developer\'s Unfiltered Timeline',
    type: 'git_log',
    content: `
* 8f4c21a (HEAD -> main) deploy: launch 2.5D interactive portfolio workshop
* 6b1d98e feat(ai-agent): implement self-correction loop for hallucination prevention
* e40c31b fix(websockets): resolve race condition in typing room socket broadcast
* 9a38f72 perf(rag): add reciprocal rank fusion (RRF) between BM25 and vector search
* 7f21a44 feat(sentilytics): reach 92.4% test precision on IMDb sentiment benchmark
* 518b093 refactor: remove technical debt from 3 AM coding marathon
* 4a9d811 chore: add coffee to developer bloodstream
* 3c7e099 test: write 48 integration tests (they all pass, miraculously)
* 2f1a601 feat(sakurakeys): synthesize custom mechanical keyboard switch audio
* 1b88e10 init: commit initial idea to change the way developers present their work
    `
  },
  egg_server_ai: {
    id: 'egg_server_ai',
    title: 'SERVER CLUSTER // AAYUSH-AI',
    subtitle: 'Agent Telemetry & Inference Node',
    type: 'server_rack',
    content: `
[CLUSTER STATUS: OPTIMAL]
• Uptime: 99.98%
• Active Agents: 4 worker nodes (Planner, Researcher, Critic, Synthesizer)
• LLM Token Throughput: 142 tokens/sec
• Latency to Vector Store: 3.4ms
• Memory Cache Hit Ratio: 89.2%
• Active Model Guardrails: Active (Pydantic Schema Validation)
• Current Goal: Helping engineering teams ship autonomous agents that solve real problems.
    `
  },
  egg_server_fs: {
    id: 'egg_server_fs',
    title: 'SERVER CLUSTER // FULLSTACK-CORE',
    subtitle: 'Application Edge & Database Engine',
    type: 'server_rack',
    content: `
[CLUSTER STATUS: HEALTHY]
• Edge Proxy: Nginx Reverse Proxy (SSL terminated)
• Database: PostgreSQL 16 (Connection pool: 24 active)
• In-Memory Broker: Redis 7.2 (ZSET Leaderboards & Pub/Sub)
• WebSocket Rooms: 12 active race instances
• Average API Response: 24ms
• Automated Backup: Snapshots synced to AWS S3 every 6 hours
    `
  },
  egg_coffee: {
    id: 'egg_coffee',
    title: 'HYDRO-CAFFEINE DISPENSER',
    subtitle: 'Primary Biological Fuel Injector',
    type: 'coffee',
    content: `
[MACHINE DIAGNOSTICS]
• Reservoir: Dark Roast Espresso (Origin: Ethiopian Yirgacheffe)
• Pressure: 9.2 Bar
• Current Developer Caffeine Saturation: 98%
• Code lines generated per fluid ounce: ~85 lines
• Status: READY FOR NEXT SPRINT
    `
  }
};
