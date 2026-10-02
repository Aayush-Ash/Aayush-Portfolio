import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { Cpu, X, ArrowDown, Sparkles, Terminal, CheckCircle2, Database, Wrench, Brain, Layers } from 'lucide-react';

interface Props {
  onClose: () => void;
  onOpenAiResearch: () => void;
  onOpenCodeReviewer: () => void;
}

export const AgentCoreModal: React.FC<Props> = ({ onClose, onOpenAiResearch, onOpenCodeReviewer }) => {
  const [selectedPillar, setSelectedPillar] = useState<'plan' | 'tool' | 'memory' | 'action'>('plan');

  const pillars = {
    plan: {
      title: '01. PLAN (DAG DECOMPOSITION)',
      subtitle: 'Deterministic Sub-Goal Planning & Cyclic Graph Execution',
      icon: <Brain size={20} className="text-cyan" />,
      description: 'Breaks arbitrary complex user inquiries into directed acyclic graphs (DAGs) with explicit dependency ordering, parallel branch dispatch, and dynamic fallback routes.',
      points: [
        'LangGraph stateful workflow schemas with cyclic conditional edges',
        'ReAct pattern: Reason → Act → Observe → Refine loop',
        'Dynamic sub-task decomposition preventing context overflow',
        'Confidence scoring before triggering heavy compute steps'
      ],
      codeSnippet: `class AgentState(TypedDict):
    query: str
    plan: List[SubGoal]
    evidence: Annotated[List[EvidenceItem], operator.add]
    critique_notes: str
    iteration: int`
    },
    tool: {
      title: '02. TOOL (FUNCTION CALLING & SANDBOXES)',
      subtitle: 'Deterministic Environmental Interfacing & Type-Safe Execution',
      icon: <Wrench size={20} className="text-cyan" />,
      description: 'Agents interface with the external world through strict Pydantic tool schemas, sandboxed code execution environments, and rate-limited API gateways.',
      points: [
        'OpenAI Function Calling & Anthropic Tool Use with Pydantic v2 schemas',
        'Isolated Python REPL sandboxes for deterministic mathematical calculations',
        'Web scraping & search adapters (Serper, ArXiv API, Playwright)',
        'Resilient error retry mechanisms when external APIs encounter 429/500 errors'
      ],
      codeSnippet: `@tool
def execute_python_sandbox(script: str) -> str:
    """Executes validated computational scripts inside an isolated container."""
    return container_runtime.run(script, timeout_sec=5)`
    },
    memory: {
      title: '03. MEMORY (EPISODIC & VECTOR RETRIEVAL)',
      subtitle: 'Multi-Tier Context Retention with Hybrid Re-Ranking',
      icon: <Database size={20} className="text-cyan" />,
      description: 'Maintains both immediate short-term working context and long-term vector embeddings, ensuring zero token waste while retaining critical facts across long trajectories.',
      points: [
        'Hybrid Search combining BM25 sparse keyword scoring + dense vector embeddings',
        'Reciprocal Rank Fusion (RRF) and cross-encoder re-ranking for needle-in-haystack accuracy',
        'Episodic scratchpads summarizing prior agent steps to conserve token budgets',
        'Qdrant & ChromaDB vector databases with metadata filtering'
      ],
      codeSnippet: `async def retrieve_context(query: str, top_k: int = 5):
    dense_vecs = await embedding_model.embed(query)
    qdrant_results = await qdrant.search(dense_vecs, limit=top_k)
    return reranker.rank(query, qdrant_results)`
    },
    action: {
      title: '04. ACTION (SYNTHESIS & SELF-CORRECTION)',
      subtitle: 'Hallucination Verification & Deterministic Delivery',
      icon: <Cpu size={20} className="text-cyan" />,
      description: 'Autonomous agents must never hallucinate in production. Before returning output to the user, an automated critic pass verifies every claim against retrieved source citations.',
      points: [
        'Self-Correction Loop: Draft → Verification → Critic → Targeted Refinement',
        'Per-paragraph source citation validation matching tokens to raw evidence',
        'Structured JSON output guarantees preventing broken downstream UI parsing',
        'Final executive dossier generation formatted with interactive metrics'
      ],
      codeSnippet: `if critique.has_hallucinations:
    return Command(goto="refine_draft", update={"critique": critique.notes})
else:
    return Command(goto="finalize_output")`
    }
  };

  const current = pillars[selectedPillar];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel agent-core-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <Cpu size={20} className="text-cyan animate-pulse" />
            <div>
              <span className="modal-kicker font-mono text-cyan">SECTOR 01 // HOLOGRAPHIC LAB</span>
              <h2 className="modal-title font-mono">AGENT CORE ARCHITECTURE SPECIFICATION</h2>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Hologram Tree Diagram */}
          <div className="holo-tree-container">
            <div className="holo-root-node">
              <div className="holo-sphere" />
              <span className="font-mono text-xs font-bold text-white tracking-widest">AGENT CORE</span>
            </div>

            {/* Tree branches */}
            <div className="holo-branches-row">
              {(['plan', 'tool', 'memory', 'action'] as const).map((key) => {
                const isSelected = selectedPillar === key;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`holo-branch-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedPillar(key);
                    }}
                  >
                    <span className="branch-key font-mono text-xs uppercase">{key}</span>
                    <span className="branch-label font-mono text-xs">
                      {key === 'plan' ? 'Planner DAG' : key === 'tool' ? 'Tool Sandbox' : key === 'memory' ? 'Vector RAG' : 'Self-Critic'}
                    </span>
                    {isSelected && <div className="branch-active-beam" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector for Selected Pillar */}
          <div className="agent-pillar-inspector">
            <div className="pillar-inspect-header">
              <div className="flex-row items-center gap-2">
                {current.icon}
                <div>
                  <h3 className="font-mono text-base text-white">{current.title}</h3>
                  <span className="font-mono text-xs text-cyan">{current.subtitle}</span>
                </div>
              </div>
            </div>

            <p className="pillar-inspect-desc">{current.description}</p>

            <div className="pillar-inspect-split">
              <div className="pillar-points-box">
                <span className="box-kicker font-mono text-xs text-muted">ARCHITECTURAL PRINCIPLES:</span>
                <ul className="pillar-points-list">
                  {current.points.map((pt, i) => (
                    <li key={i}>
                      <CheckCircle2 size={13} className="text-cyan inline-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pillar-code-box">
                <div className="code-box-header font-mono text-xs text-muted flex-row items-center gap-1.5">
                  <Terminal size={12} className="text-cyan" />
                  <span>IMPLEMENTATION PATTERN</span>
                </div>
                <pre className="pillar-code-block font-mono text-xs">
                  {current.codeSnippet}
                </pre>
              </div>
            </div>
          </div>

          {/* Attached Agent Projects in Lab */}
          <div className="agent-projects-dock">
            <span className="dock-title font-mono text-xs text-muted">SECTOR 01 AGENTIC ARTIFACTS:</span>
            <div className="dock-cards-row">
              <button
                type="button"
                className="dock-card"
                onClick={() => {
                  sounds.playClick();
                  onOpenAiResearch();
                }}
              >
                <div>
                  <span className="dock-badge font-mono text-xs text-cyan">FLAGSHIP SYSTEM</span>
                  <h4 className="dock-name font-mono">AI Research Agent</h4>
                  <p className="dock-desc">Autonomous multi-step DAG researcher with live search and fact synthesizer.</p>
                </div>
                <span className="dock-link font-mono text-xs text-cyan">Inspect Architecture →</span>
              </button>

              <button
                type="button"
                className="dock-card"
                onClick={() => {
                  sounds.playClick();
                  onOpenCodeReviewer();
                }}
              >
                <div>
                  <span className="dock-badge font-mono text-xs text-cyan">ANALYSIS SYSTEM</span>
                  <h4 className="dock-name font-mono">Autonomous Code Reviewer</h4>
                  <p className="dock-desc">Tree-sitter AST parser coupled with LLM reviewer for automated PR patches.</p>
                </div>
                <span className="dock-link font-mono text-xs text-cyan">Inspect Architecture →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
