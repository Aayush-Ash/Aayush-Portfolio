import type { ProjectData } from '../types/project';

export const PROJECTS: ProjectData[] = [
  {
    id: 'ai-research-agent',
    title: 'AI Research Agent',
    badge: 'FLAGSHIP AGENTIC SYSTEM',
    category: 'agentic_ai',
    zone: 'AI_LAB',
    summary: 'Autonomous multi-step research agent that decomposes complex technical inquiries, queries live tools, verifies sources, and synthesizes cited executive briefs.',
    problem: 'Researching complex technical topics manually requires dozens of fragmented browser searches, cross-referencing papers, filtering hallucinations, and days of manual synthesis.',
    solution: 'Designed an autonomous multi-agent pipeline using a directed acyclic graph (DAG) planner. The planner breaks inquiries into parallel sub-goals, delegates to web & vector retrieval tools, maintains working memory with citation tracking, and executes a self-reflection synthesis step to eliminate hallucinations.',
    architectureNodes: [
      {
        id: 'user_in',
        name: 'User Request',
        role: 'Query Ingestion',
        description: 'Receives open-ended research queries with depth constraints and citation requirements.',
        inputs: ['Raw query prompt'],
        outputs: ['Structured research intent']
      },
      {
        id: 'planner',
        name: 'Planner Agent',
        role: 'DAG Decomposition',
        description: 'Breaks complex goals into executable, verifiable sub-tasks and dependency graphs.',
        tech: ['LangGraph', 'GPT-4o / Claude 3.5 Sonnet', 'ReAct Prompting'],
        subTasks: ['Query Decomposition', 'Sub-hypothesis Formation', 'Tool Routing Plan'],
        inputs: ['Research intent'],
        outputs: ['Execution Task Queue']
      },
      {
        id: 'researcher',
        name: 'Research Agent',
        role: 'Tool Execution Loop',
        description: 'Autonomous worker executing parallel searches, scraping dense technical sources, and evaluating information quality.',
        tech: ['Asyncio', 'Python', 'FastAPI'],
        inputs: ['Sub-task specifications'],
        outputs: ['Raw extracted evidence']
      },
      {
        id: 'tools',
        name: 'Agentic Tools',
        role: 'Environmental Interfacing',
        description: 'Suite of external tool adapters: Google/Serper search, ArXiv API, Puppeteer web scraper, and Python REPL sandbox.',
        tech: ['Serper API', 'Puppeteer', 'Python Sandbox', 'REST APIs'],
        inputs: ['Search parameters & code payloads'],
        outputs: ['Structured HTML/JSON data']
      },
      {
        id: 'memory',
        name: 'Memory System',
        role: 'Context & Vector Store',
        description: 'Dual-tier memory system: short-term scratchpad buffer + long-term semantic vector database with MMR re-ranking.',
        tech: ['Qdrant', 'OpenAI Text-Embedding-3', 'Redis Cache'],
        inputs: ['Document chunks'],
        outputs: ['Ranked context snippets']
      },
      {
        id: 'synthesizer',
        name: 'Synthesis & Verifier',
        role: 'Citation & Fact Checking',
        description: 'Cross-verifies claims against retrieved sources, identifies contradictions, and formats cited executive briefs.',
        tech: ['Self-Correction Loop', 'Structured JSON Output'],
        inputs: ['Ranked findings & memory'],
        outputs: ['Verified final executive dossier']
      }
    ],
    techStack: [
      {
        category: 'Core AI & Agents',
        items: ['Python 3.11', 'LangGraph', 'LangChain', 'OpenAI Function Calling', 'Anthropic Claude API']
      },
      {
        category: 'Knowledge & Vector DB',
        items: ['Qdrant Vector DB', 'ChromaDB', 'Redis', 'BM25 Hybrid Search']
      },
      {
        category: 'Backend & Tooling',
        items: ['FastAPI', 'Docker', 'Asyncio', 'Playwright / Puppeteer', 'Celery']
      }
    ],
    keyMetrics: [
      {
        label: 'Research Speedup',
        value: '6.4x',
        description: 'Faster than manual multi-source documentation gathering'
      },
      {
        label: 'Source Accuracy',
        value: '98.2%',
        description: 'Verified citations with zero undetected hallucinations in benchmarks'
      },
      {
        label: 'Parallel Tools',
        value: '8 Tools',
        description: 'Search, ArXiv, GitHub API, Python sandbox, PDF parser'
      }
    ],
    highlights: [
      'Built with LangGraph stateful multi-agent DAG architecture',
      'Dynamic fallback mechanisms when primary search providers hit rate limits',
      'Autonomous citation verification matrix matching every paragraph to raw source tokens',
      'FastAPI streaming response endpoint for real-time thought-process visualization'
    ],
    links: {
      liveDemo: '#',
      github: 'https://github.com'
    },
    demoType: 'agent_runner'
  },
  {
    id: 'sakurakeys',
    title: 'SakuraKeys',
    badge: 'FULL-STACK PLATFORM',
    category: 'full_stack',
    zone: 'BUILD_BAY',
    summary: 'High-octane, anime-inspired typing speed platform with real-time multiplayer lobbies, sub-millisecond input telemetry, custom mechanical switch audio, and global rankings.',
    problem: 'Most typing platforms are sterile, lack tactile keyboard immersion, have noticeable keystroke input latency, and lack engaging social mechanics for enthusiasts.',
    solution: 'Engineered a full-stack platform featuring custom Web Audio API synthesized mechanical keyboard acoustics (Cherry MX Blue, Red, Topre, Holy Panda), sub-5ms low-latency input loop, real-time WebSocket race rooms, and PostgreSQL schema optimized for leaderboard percentiles.',
    architectureNodes: [
      {
        id: 'sk_ui',
        name: 'Client App (React + TS)',
        role: 'Zero-Latency Typing Engine',
        description: 'Custom canvas-assisted cursor renderer, per-keystroke timestamping, and sound engine.',
        tech: ['React 18', 'TypeScript', 'Web Audio API', 'Vite'],
        inputs: ['Raw keydown events'],
        outputs: ['Render frame, WPM stats']
      },
      {
        id: 'sk_ws',
        name: 'WebSocket Hub',
        role: 'Multiplayer Synchronization',
        description: 'Broadcasts player race positions and keystroke bursts in 30Hz tick rate room channels.',
        tech: ['Node.js', 'Socket.io', 'Redis Pub/Sub'],
        inputs: ['Client race telemetry'],
        outputs: ['Broadcasted lobby positions']
      },
      {
        id: 'sk_api',
        name: 'API & Auth Service',
        role: 'REST Backend',
        description: 'JWT session management, anti-cheat keystroke interval validation, and user profile management.',
        tech: ['Express.js / Node', 'Zod validation', 'Bcrypt'],
        inputs: ['API calls, finished race receipts'],
        outputs: ['Authenticated tokens, stats']
      },
      {
        id: 'sk_db',
        name: 'PostgreSQL + Redis',
        role: 'Leaderboard & Analytics',
        description: 'Stores user accounts, test histories, and Redis sorted sets (ZSET) for lightning-fast global leaderboard ranks.',
        tech: ['PostgreSQL', 'Prisma ORM', 'Redis Sorted Sets'],
        inputs: ['Verified test scores'],
        outputs: ['Rank percentiles, history']
      }
    ],
    techStack: [
      {
        category: 'Frontend & Audio',
        items: ['React 18', 'TypeScript', 'Web Audio API', 'Canvas API', 'CSS Variables']
      },
      {
        category: 'Backend & Sockets',
        items: ['Node.js', 'Express', 'Socket.io', 'JWT Authentication', 'Zod']
      },
      {
        category: 'Database & Caching',
        items: ['PostgreSQL', 'Prisma ORM', 'Redis (Leaderboards & Pub/Sub)', 'Docker']
      }
    ],
    keyMetrics: [
      {
        label: 'Input Latency',
        value: '< 4ms',
        description: 'Zero visual stutter on 144Hz and 240Hz monitors'
      },
      {
        label: 'Typing Tests Logged',
        value: '15,000+',
        description: 'Benchmark runs calculated without server race conditions'
      },
      {
        label: 'Leaderboard Lookup',
        value: '1.2ms',
        description: 'Redis ZREVRANK instant percentile lookup'
      }
    ],
    highlights: [
      'Interactive mechanical switch soundboard with 5 switch profiles synthesized in browser',
      'Robust anti-cheat algorithm analyzing standard deviation of inter-keystroke intervals (IKIs)',
      'Anime-inspired dark aesthetic with customizable neon themes (Sakura, Cyberpunk, EVA-01)',
      'Comprehensive performance analytics (WPM, accuracy, consistency, error heatmaps)'
    ],
    links: {
      liveDemo: '#',
      github: 'https://github.com'
    },
    demoType: 'keyboard'
  },
  {
    id: 'sentilytics-pro',
    title: 'Sentilytics Pro',
    badge: 'NLP & MACHINE LEARNING',
    category: 'ml_data',
    zone: 'DATA_CORE',
    summary: 'End-to-end Machine Learning sentiment intelligence pipeline for movie reviews and customer feedback, achieving 92% precision with explainable feature weights.',
    problem: 'Raw text reviews contain colloquial slang, sarcasm, and nuanced phrasing that simple dictionary lookups fail to classify accurately.',
    solution: 'Built an end-to-end NLP pipeline leveraging custom text normalization, N-gram TF-IDF vectorization with sublinear term frequency scaling, and an ensemble classifier calibrated for sentiment polarity with interactive token attribution.',
    architectureNodes: [
      {
        id: 'sp_text',
        name: 'Input Stream',
        role: 'Text Feed',
        description: 'Accepts unstructured multi-paragraph customer reviews and movie critiques.',
        inputs: ['Raw unstructured text'],
        outputs: ['String payload']
      },
      {
        id: 'sp_clean',
        name: 'Preprocessing Pipeline',
        role: 'NLP Cleaning',
        description: 'Regex tokenization, lowercasing, contraction expansion, stopword filtering, and lemmatization.',
        tech: ['Python', 'NLTK', 'RegEx'],
        inputs: ['Raw string'],
        outputs: ['Cleaned token array']
      },
      {
        id: 'sp_tfidf',
        name: 'TF-IDF Vectorizer',
        role: 'Feature Extraction',
        description: 'Transforms tokens into high-dimensional numerical vectors using 1-gram and 2-gram frequency weighting.',
        tech: ['Scikit-Learn', 'Sparse Matrices'],
        inputs: ['Cleaned tokens'],
        outputs: ['Sparse vector (dim: 10,000)']
      },
      {
        id: 'sp_clf',
        name: 'Calibrated Classifier',
        role: 'Predictive Model',
        description: 'Logistic Regression / Linear SVM ensemble with L2 regularization and probability calibration.',
        tech: ['Scikit-Learn', 'Joblib', 'NumPy'],
        inputs: ['TF-IDF features'],
        outputs: ['Probability distribution']
      },
      {
        id: 'sp_out',
        name: 'Sentiment & Attribution',
        role: 'Explainability Engine',
        description: 'Generates final sentiment tag (Positive/Negative) with confidence scores and top influential tokens.',
        tech: ['SHAP / Feature weights', 'FastAPI'],
        inputs: ['Model output'],
        outputs: ['JSON report with token weights']
      }
    ],
    techStack: [
      {
        category: 'Machine Learning',
        items: ['Python', 'Scikit-Learn', 'NLTK', 'NumPy', 'Pandas', 'Joblib']
      },
      {
        category: 'Model Serving',
        items: ['FastAPI', 'Docker', 'Uvicorn', 'REST API']
      },
      {
        category: 'Data & Testing',
        items: ['IMDb 50k Dataset', 'Pytest', 'Matplotlib / Seaborn']
      }
    ],
    keyMetrics: [
      {
        label: 'Model Precision',
        value: '92.4%',
        description: 'Evaluated across 10,000 unseen test review samples'
      },
      {
        label: 'Inference Latency',
        value: '18ms',
        description: 'Lightweight CPU inference without requiring heavy GPUs'
      },
      {
        label: 'F1 Score',
        value: '0.918',
        description: 'Balanced precision and recall across positive and negative sentiment'
      }
    ],
    highlights: [
      'Interactive pipeline simulator directly embedded in the portfolio station',
      'Explainable AI feature: highlights which exact words swayed the model polarity',
      'Sublinear term frequency scaling to prevent long-tail word count distortion',
      'Production-ready containerized microservice deployed with automated health checks'
    ],
    links: {
      liveDemo: '#',
      github: 'https://github.com'
    },
    demoType: 'pipeline'
  },
  {
    id: 'healthmate-ai',
    title: 'HealthMate AI',
    badge: 'HEALTHCARE ML SYSTEM',
    category: 'ml_data',
    zone: 'DATA_CORE',
    summary: 'Clinical triage assistance and symptom severity classification system designed with physician-in-the-loop validation and HIPAA-compliant data pipelines.',
    problem: 'Patients often misinterpret critical symptoms before seeing doctors, overwhelming emergency rooms with non-urgent queries while critical cases face triage delays.',
    solution: 'Trained XGBoost and Random Forest predictive models coupled with clinical LLM triage guidelines to provide non-diagnostic preliminary risk stratification and next-step recommendations.',
    architectureNodes: [
      {
        id: 'hm_input',
        name: 'Patient Intake',
        role: 'Structured & Free-Text',
        description: 'Collects vitals, duration, pain scale (1-10), and free-text symptom notes.',
        inputs: ['Patient report'],
        outputs: ['Sanitized intake schema']
      },
      {
        id: 'hm_model',
        name: 'Risk Stratification Engine',
        role: 'Predictive Classifier',
        description: 'Ensemble model classifying urgency level (Emergency, Urgent Care, Primary Care, Home Care).',
        tech: ['XGBoost', 'Scikit-Learn', 'Pandas'],
        inputs: ['Feature vector'],
        outputs: ['Risk tier & confidence']
      },
      {
        id: 'hm_guidance',
        name: 'Clinical Reasoning LLM',
        role: 'Explainable Advice',
        description: 'Generates clarifying questions and patient-friendly preparation tips for clinician appointments.',
        tech: ['Llama-3-70B', 'Few-Shot Clinical Prompting'],
        inputs: ['Risk tier + symptoms'],
        outputs: ['Guidance brief']
      }
    ],
    techStack: [
      {
        category: 'Data Science & ML',
        items: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP Explainability', 'Pandas']
      },
      {
        category: 'Application & API',
        items: ['FastAPI', 'Streamlit', 'Pydantic', 'Docker']
      }
    ],
    keyMetrics: [
      {
        label: 'Triage Accuracy',
        value: '94.1%',
        description: 'Validated on synthetic benchmark clinical triage datasets'
      },
      {
        label: 'Critical Flag Rate',
        value: '99.5%',
        description: 'Zero false negatives on emergency red-flag conditions'
      }
    ],
    highlights: [
      'SHAP value integration to visually explain key biomarker risk contributors',
      'Automated medical disclaimer enforcement and red-flag escalation triggers',
      'Exportable clinical summary PDF for presenting directly to treating physicians'
    ],
    links: {
      liveDemo: '#',
      github: 'https://github.com'
    }
  },
  {
    id: 'devflow-cloud',
    title: 'DevFlow Cloud CI/CD',
    badge: 'DEVOPS & CLOUD ARCHITECTURE',
    category: 'full_stack',
    zone: 'BUILD_BAY',
    summary: 'Containerized microservices orchestration console with automated GitHub webhooks, multi-stage Docker builds, and live streaming build logs.',
    problem: 'Managing deployments across multiple client microservices required tedious manual SSH sessions, fragmented log tracking, and lacked automated rollback safety.',
    solution: 'Constructed an automated CI/CD pipeline manager with real-time SSE log streaming, Docker container health monitors, automated blue/green zero-downtime cutovers, and instant rollback triggers.',
    architectureNodes: [
      {
        id: 'df_hook',
        name: 'GitHub Webhook Ingestion',
        role: 'Event Listener',
        description: 'Captures git push & pull-request events with HMAC signature verification.',
        tech: ['Node.js', 'TypeScript', 'Crypto'],
        inputs: ['Webhook payload'],
        outputs: ['Build job trigger']
      },
      {
        id: 'df_build',
        name: 'Docker Build Runner',
        role: 'Container Builder',
        description: 'Executes isolated multi-stage Docker builds with buildkit caching and security vulnerability linting.',
        tech: ['Docker Engine API', 'Trivy Scanner'],
        inputs: ['Repository commit'],
        outputs: ['Scanned container image']
      },
      {
        id: 'df_deploy',
        name: 'Deployment Controller',
        role: 'Orchestrator',
        description: 'Deploys containers with health probes, zero-downtime routing swaps, and memory cap guardrails.',
        tech: ['AWS ECS / Nginx', 'Reverse Proxy', 'Redis'],
        inputs: ['Tagged image'],
        outputs: ['Live active traffic']
      }
    ],
    techStack: [
      {
        category: 'Cloud & Infrastructure',
        items: ['Docker', 'AWS ECS', 'Nginx', 'GitHub Actions API', 'Redis']
      },
      {
        category: 'Backend & Control Plane',
        items: ['Node.js', 'TypeScript', 'Server-Sent Events (SSE)', 'Express']
      }
    ],
    keyMetrics: [
      {
        label: 'Deploy Time',
        value: '42s',
        description: 'Average automated pipeline turnaround with layer caching'
      },
      {
        label: 'Downtime',
        value: '0 ms',
        description: 'Graceful socket draining and blue/green traffic handover'
      }
    ],
    highlights: [
      'Real-time streaming terminal output in browser using Server-Sent Events',
      'Built-in security scanner inspecting Docker layers for high-severity CVEs',
      'Automated rollback if application health probe fails within 30 seconds'
    ],
    links: {
      liveDemo: '#',
      github: 'https://github.com'
    }
  },
  {
    id: 'code-review-agent',
    title: 'Autonomous Code Reviewer',
    badge: 'AGENTIC CODE ANALYSIS',
    category: 'agentic_ai',
    zone: 'AI_LAB',
    summary: 'Autonomous PR review agent that parses AST diffs, checks architectural patterns, runs static security rules, and comments with precise patch diffs.',
    problem: 'Human code reviews often get bottlenecked on repetitive stylistic nits, missed edge-case null checks, and overlooked security sanitization in pull requests.',
    solution: 'Designed a multi-stage code analysis agent combining Tree-sitter AST parsing with an LLM reviewer prompted with repository conventions, delivering actionable unified diff suggestions directly to PR threads.',
    architectureNodes: [
      {
        id: 'cr_ast',
        name: 'AST Diff Parser',
        role: 'Structural Code Analysis',
        description: 'Extracts modified function scopes, import modifications, and type signature shifts.',
        tech: ['Tree-sitter', 'Python / TS'],
        inputs: ['Git diff patch'],
        outputs: ['Syntactic change graph']
      },
      {
        id: 'cr_rules',
        name: 'Deterministic Linter Rules',
        role: 'Static Checks',
        description: 'Scans for hardcoded secrets, SQL injection risks, and unhandled promise rejections.',
        tech: ['Semgrep', 'Custom AST rules'],
        inputs: ['AST graph'],
        outputs: ['Flagged violation locations']
      },
      {
        id: 'cr_llm',
        name: 'LLM Senior Engineer Judge',
        role: 'Contextual Reviewer',
        description: 'Evaluates architectural clarity, algorithmic complexity, and proposes clean refactored diff blocks.',
        tech: ['Claude 3.5 Sonnet', 'JSON Mode'],
        inputs: ['AST + Rule flags + Code context'],
        outputs: ['Actionable inline review comments']
      }
    ],
    techStack: [
      {
        category: 'AI & Code Parsing',
        items: ['Python', 'Tree-sitter', 'Anthropic Claude 3.5 Sonnet', 'Semgrep']
      },
      {
        category: 'Integrations',
        items: ['GitHub Octokit API', 'FastAPI', 'Docker']
      }
    ],
    keyMetrics: [
      {
        label: 'Review Turnaround',
        value: '14s',
        description: 'Full analysis across PR diffs up to 1,500 lines'
      },
      {
        label: 'Developer Acceptance',
        value: '87%',
        description: 'Suggested diff patches merged without manual modification'
      }
    ],
    highlights: [
      'Zero comment spam: groups related issues into consolidated architectural advisories',
      'AST-aware scope detection ensures only relevant surrounding context is sent to the LLM',
      'Suggests copy-pasteable unified git diffs ready for one-click commit on GitHub'
    ],
    links: {
      liveDemo: '#',
      github: 'https://github.com'
    }
  }
];
