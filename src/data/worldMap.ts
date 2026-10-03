import type { ZoneConfig, InteractableObject, EasterEggData } from '../types/world';

export const ZONES: Record<string, ZoneConfig> = {
  AI_LAB: {
    id: 'AI_LAB',
    title: '🧠 AI LAB // AGENT CORE',
    subTitle: 'Sector 01 — Autonomous Systems & LLMs',
    tagline: 'Holographic agent core, multi-agent orchestration, DAG planning, and tool calling.',
    bounds: { minX: -1100, maxX: -540, minY: -740, maxY: -100 },
    center: { x: -820, y: -420 },
    themeColor: '#C084FC',
    accentColor: '#A855F7'
  },
  BUILD_BAY: {
    id: 'BUILD_BAY',
    title: '💻 BUILD BAY // SOFTWARE GARAGE',
    subTitle: 'Sector 02 — Full-Stack Systems & Web Apps',
    tagline: 'Sakura mechanical keyboards, Mt. Fuji viewport, React, TypeScript, and cloud CI/CD.',
    bounds: { minX: -280, maxX: 280, minY: -740, maxY: -100 },
    center: { x: 0, y: -420 },
    themeColor: '#F472B6',
    accentColor: '#EC4899'
  },
  HQ: {
    id: 'HQ',
    title: '⚡ AAYUSH HQ // COMMAND DECK',
    subTitle: 'Sector 03 — Profile, Experience & Contact',
    tagline: 'Developer command workstation, curriculum vitae, comms uplink, and engineering mindset.',
    bounds: { minX: 540, maxX: 1100, minY: -740, maxY: -100 },
    center: { x: 820, y: -420 },
    themeColor: '#F59E0B',
    accentColor: '#FBBF24'
  },
  DATA_CORE: {
    id: 'DATA_CORE',
    title: '📊 DATA CORE // ML & PIPELINES',
    subTitle: 'Sector 04 — Machine Learning & Analytics',
    tagline: 'High-density server racks, NLP sentiment engines, biomarker predictors, and cloud inference.',
    bounds: { minX: -1100, maxX: -540, minY: 100, maxY: 740 },
    center: { x: -820, y: 420 },
    themeColor: '#10B981',
    accentColor: '#059669'
  },
  OBSERVATION_DECK: {
    id: 'OBSERVATION_DECK',
    title: '🌌 OBSERVATION DECK // DEEP SPACE',
    subTitle: 'Sector 05 — Space Viewport & Future Horizons',
    tagline: 'Panoramic Earth viewport, deep space telescope, cosmic navigation, and long-term vision.',
    bounds: { minX: -280, maxX: 280, minY: 100, maxY: 740 },
    center: { x: 0, y: 420 },
    themeColor: '#38BDF8',
    accentColor: '#0284C7'
  },
  DOCK: {
    id: 'DOCK',
    title: '🚀 HANGAR DOCK // DEPLOYMENT BAY',
    subTitle: 'Sector 06 — Starship Launch & Production',
    tagline: 'Exploration starship, gantry catwalks, containerized deployments, and executive portfolio warp.',
    bounds: { minX: 540, maxX: 1100, minY: 100, maxY: 740 },
    center: { x: 820, y: 420 },
    themeColor: '#F97316',
    accentColor: '#EA580C'
  },
  CENTRAL_HUB: {
    id: 'CENTRAL_HUB',
    title: '🛰️ TRANSIT CONCOURSE // CENTRAL HUB',
    subTitle: 'Space Station Junction & Wayfinding',
    tagline: 'All 6 sectors converge here. Follow the glowing floor conduits to explore.',
    bounds: { minX: -950, maxX: 950, minY: -100, maxY: 100 },
    center: { x: 0, y: 0 },
    themeColor: '#00D2FF',
    accentColor: '#38BDF8'
  }
};

export const INTERACTABLES: InteractableObject[] = [
  // --- CENTRAL CONCOURSE / TRANSIT HUB ---
  {
    id: 'hub_directory_kiosk',
    name: 'Sector Directory',
    subTitle: 'Interactive Space Station Guide & Wayfinding',
    type: 'terminal',
    zone: 'CENTRAL_HUB',
    position: { x: 0, y: 0 },
    radius: 70,
    iconName: 'Compass',
    color: '#00D2FF',
    hologramType: 'cube'
  },

  // --- SECTOR 01: AI LAB (TOP-LEFT) ---
  {
    id: 'agent_core_holo',
    name: 'Holographic Agent Core',
    subTitle: 'Interactive Architecture: PLAN → TOOL → MEMORY → ACTION',
    type: 'agent_core',
    zone: 'AI_LAB',
    position: { x: -820, y: -450 },
    radius: 95,
    iconName: 'Cpu',
    color: '#C084FC',
    hologramType: 'nodes'
  },
  {
    id: 'term_ai_research',
    name: 'AI Research Agent Terminal',
    subTitle: 'Autonomous Multi-Step Technical Researcher',
    type: 'project',
    projectId: 'ai-research-agent',
    zone: 'AI_LAB',
    position: { x: -940, y: -500 },
    radius: 75,
    iconName: 'Bot',
    color: '#C084FC',
    hologramType: 'nodes'
  },
  {
    id: 'term_code_reviewer',
    name: 'Autonomous Code Reviewer',
    subTitle: 'AST & LLM Multi-Stage Pull Request Auditor',
    type: 'project',
    projectId: 'code-review-agent',
    zone: 'AI_LAB',
    position: { x: -700, y: -500 },
    radius: 75,
    iconName: 'Code',
    color: '#818CF8',
    hologramType: 'cube'
  },
  {
    id: 'egg_blueprint',
    name: 'Wall Blueprint: SYSTEMS ARCHITECTURE',
    subTitle: 'Master schematic of distributed agent systems',
    type: 'easter_egg',
    easterEggId: 'egg_blueprint',
    zone: 'AI_LAB',
    position: { x: -820, y: -580 },
    radius: 65,
    iconName: 'FileCode',
    color: '#38BDF8'
  },

  // --- SECTOR 02: BUILD BAY (TOP-CENTER) ---
  {
    id: 'station_sakurakeys',
    name: 'SakuraKeys Terminal',
    subTitle: 'Anime-Inspired Typing Platform & Mechanical Soundboard',
    type: 'project',
    projectId: 'sakurakeys',
    zone: 'BUILD_BAY',
    position: { x: 120, y: -450 },
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
    position: { x: -120, y: -450 },
    radius: 75,
    iconName: 'Layers',
    color: '#38BDF8',
    hologramType: 'cube'
  },
  {
    id: 'egg_whiteboard',
    name: 'Workshop Whiteboard',
    subTitle: 'IDEA → DESIGN → BUILD → TEST → DEPLOY',
    type: 'easter_egg',
    easterEggId: 'egg_whiteboard',
    zone: 'BUILD_BAY',
    position: { x: 0, y: -560 },
    radius: 65,
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
    position: { x: 160, y: -340 },
    radius: 60,
    iconName: 'Terminal',
    color: '#34D399'
  },
  {
    id: 'egg_sakura_tree',
    name: 'Glowing Sakura Bonsai',
    subTitle: 'Interactive Zen Garden & Petal Emitter',
    type: 'easter_egg',
    easterEggId: 'egg_sakura_tree',
    zone: 'BUILD_BAY',
    position: { x: -160, y: -350 },
    radius: 65,
    iconName: 'Flower2',
    color: '#F472B6'
  },

  // --- SECTOR 03: AAYUSH HQ (TOP-RIGHT) ---
  {
    id: 'hq_laptop',
    name: "Aayush's Workstation",
    subTitle: 'Developer Story, Mindset & Engineering Philosophy',
    type: 'about',
    zone: 'HQ',
    position: { x: 820, y: -510 },
    radius: 80,
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
    position: { x: 720, y: -390 },
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
    position: { x: 920, y: -390 },
    radius: 75,
    iconName: 'Radio',
    color: '#00D2FF',
    hologramType: 'cube'
  },
  {
    id: 'egg_coffee',
    name: 'Hydro-Caffeine & Pizza Station',
    subTitle: 'Developer Biological Fuel Supply (Level: 98%)',
    type: 'easter_egg',
    easterEggId: 'egg_coffee',
    zone: 'HQ',
    position: { x: 820, y: -310 },
    radius: 60,
    iconName: 'Coffee',
    color: '#F59E0B'
  },

  // --- SECTOR 04: DATA CORE (BOTTOM-LEFT) ---
  {
    id: 'term_sentilytics',
    name: 'Sentilytics Pro Terminal',
    subTitle: 'Movie Review Sentiment Analysis (92% Precision)',
    type: 'project',
    projectId: 'sentilytics-pro',
    zone: 'DATA_CORE',
    position: { x: -940, y: 440 },
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
    position: { x: -700, y: 440 },
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
    position: { x: -860, y: 340 },
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
    position: { x: -780, y: 340 },
    radius: 65,
    iconName: 'Server',
    color: '#10B981',
    hologramType: 'server'
  },

  // --- SECTOR 05: OBSERVATION DECK (BOTTOM-CENTER) ---
  {
    id: 'term_observation_deck',
    name: 'Stellar Navigation Console',
    subTitle: 'Panoramic Deep Space View & Sector Coordinates',
    type: 'terminal',
    zone: 'OBSERVATION_DECK',
    position: { x: -120, y: 440 },
    radius: 75,
    iconName: 'Compass',
    color: '#38BDF8',
    hologramType: 'cube'
  },
  {
    id: 'egg_telescope',
    name: 'Deep Space Optical Telescope',
    subTitle: "Aayush's Future Roadmap & Tech Frontiers (2026-2030)",
    type: 'easter_egg',
    easterEggId: 'egg_telescope',
    zone: 'OBSERVATION_DECK',
    position: { x: 140, y: 440 },
    radius: 65,
    iconName: 'Telescope',
    color: '#38BDF8'
  },
  {
    id: 'egg_crew_lounge',
    name: 'Crewmate Lounge Station',
    subTitle: 'Relaxation Pod, Music & Developer Chill Zone',
    type: 'easter_egg',
    easterEggId: 'egg_crew_lounge',
    zone: 'OBSERVATION_DECK',
    position: { x: 0, y: 530 },
    radius: 65,
    iconName: 'Armchair',
    color: '#60A5FA'
  },

  // --- SECTOR 06: DOCK / HANGAR BAY (BOTTOM-RIGHT) ---
  {
    id: 'term_dock_launch',
    name: 'Starship Flight Computer',
    subTitle: 'Launch to Executive Portfolio & Live Project Deployments',
    type: 'terminal',
    zone: 'DOCK',
    position: { x: 820, y: 460 },
    radius: 85,
    iconName: 'Rocket',
    color: '#F97316',
    hologramType: 'cube'
  },
  {
    id: 'egg_starship',
    name: 'Starship Hangar Gantry',
    subTitle: 'Production Deployment & Cloud Infrastructure Blueprint',
    type: 'easter_egg',
    easterEggId: 'egg_starship',
    zone: 'DOCK',
    position: { x: 720, y: 350 },
    radius: 75,
    iconName: 'Layers',
    color: '#FBBF24'
  },
  {
    id: 'egg_cargo_bay',
    name: 'Engineering Cargo Bay',
    subTitle: 'Tooling Manifest: Docker, Kubernetes, Vite, Next.js',
    type: 'easter_egg',
    easterEggId: 'egg_cargo_bay',
    zone: 'DOCK',
    position: { x: 920, y: 350 },
    radius: 70,
    iconName: 'Wrench',
    color: '#EA580C'
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
* 8f4c21a (HEAD -> main) deploy: launch 2.5D interactive Among Us space station portfolio
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
  egg_sakura_tree: {
    id: 'egg_sakura_tree',
    title: 'ZEN BIO-DOME // SAKURA BONSAI',
    subtitle: 'Biophilic Engineering & Design Harmony',
    type: 'whiteboard',
    content: `
===================================================================
              SAKURA BIO-DOME — SYSTEM STATUS: BLOSSOMING
===================================================================

"Technology without aesthetics is sterile; aesthetics without 
engineering is fragile. The sweet spot is where high-speed code meets
soulful, delightful interaction."

• Species: Prunus serrulata (Digital Cyber-Variant)
• Petal Emission Rate: 12 petals/second
• Ambient Humidity: 54%
• Recommended Activity: Take a deep breath, appreciate the craftsmanship, 
  and explore the mechanical keyboard station next door.
===================================================================
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
    title: 'HYDRO-CAFFEINE & PIZZA DISPENSER',
    subtitle: 'Primary Biological Fuel Injector',
    type: 'coffee',
    content: `
[MACHINE DIAGNOSTICS]
• Reservoir: Dark Roast Espresso (Origin: Ethiopian Yirgacheffe)
• Pressure: 9.2 Bar
• Current Developer Caffeine Saturation: 98%
• Pepperoni Pizza Reserve: 1 Fresh Slice
• Code lines generated per fluid ounce: ~85 lines
• Status: READY FOR NEXT SPRINT
    `
  },
  egg_telescope: {
    id: 'egg_telescope',
    title: 'DEEP SPACE TELESCOPE // FUTURE ROADMAP',
    subtitle: "Aayush's Long-Term Engineering Vision (2026 - 2030)",
    type: 'blueprint',
    content: `
===================================================================
       OBSERVATION VECTOR: AUTONOMOUS SOFTWARE FRONTIER
===================================================================

[HORIZON 1: COMPOUND AI SYSTEMS]
  • Moving past single prompts into self-steering multi-agent workflows
  • Verification-driven code generation that runs its own test suites
  • Real-world tool calling with sandboxed safety boundaries

[HORIZON 2: EDGE AI & LOCAL INFERENCE]
  • Small Language Models (SLMs) running directly on-device in WebAssembly
  • Zero-latency client-side embeddings and local semantic search

[HORIZON 3: DELIGHT-DRIVEN USER EXPERIENCES]
  • Bridging the gap between hardcore backend architecture and joyful,
    gamified, responsive web interfaces that respect user attention.
===================================================================
    `
  },
  egg_crew_lounge: {
    id: 'egg_crew_lounge',
    title: 'CREWMATE LOUNGE // REFUEL & CHILL',
    subtitle: 'Where developers rest between major deployments',
    type: 'whiteboard',
    content: `
===================================================================
               CREWMATE RECREATION & LOUNGE LOG
===================================================================
• Station Music: Lofi Cyberpunk Radio (128 kbps stream)
• Favorite Games: Among Us, Portal 2, Cyberpunk 2077, Hades
• Philosophy: Great software requires intense focus, but the best 
  architectural insights happen during downtime and quiet reflection.
• Grab a warm drink, sit by the panoramic window, and watch the stars.
===================================================================
    `
  },
  egg_starship: {
    id: 'egg_starship',
    title: 'STARSHIP SPECIFICATION // PRODUCTION DEPLOYMENT',
    subtitle: 'Containerized Infrastructure & Cloud Fleet',
    type: 'blueprint',
    content: `
===================================================================
       VESSEL CLASS: EXPLORER MK-IV // PRODUCTION ARCHITECTURE
===================================================================
• Hull Rating: Docker Multi-Stage Builds (Minimal Alpine footprint)
• Propulsion: AWS ECS Fargate + Elastic Load Balancer
• Navigation: Cloudflare DNS with automatic DDoS protection & edge SSL
• Telemetry: OpenTelemetry + Prometheus + Grafana dashboards
• Warp Drive: Instant CI/CD deploy on merge to main (< 90s build time)
• Destination: Scalable, high-impact software engineering teams worldwide.
===================================================================
    `
  },
  egg_cargo_bay: {
    id: 'egg_cargo_bay',
    title: 'ENGINEERING CARGO // TECH STACK MANIFEST',
    subtitle: 'The tools and technologies in Aayush\'s daily toolkit',
    type: 'server_rack',
    content: `
[CARGO CRATE INVENTORY]
• Languages: TypeScript, JavaScript, Python, Go, SQL, HTML/CSS
• Frontend: React 19, Next.js, Tailwind CSS, Vite, HTML5 Canvas, WebSockets
• Backend: Node.js, Express, FastAPI, Python Asyncio, REST, GraphQL
• Databases: PostgreSQL, MongoDB, Redis, Qdrant, Pinecone
• AI / ML: LangChain, LangGraph, OpenAI API, Anthropic API, Transformers, PyTorch
• DevOps & Cloud: Docker, Kubernetes, AWS (S3, ECS, Lambda), Git, GitHub Actions
    `
  }
};
