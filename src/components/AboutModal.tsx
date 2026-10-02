import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sounds } from '../audio/soundEffects';
import { Laptop, Cpu, Shield, Sparkles, Terminal, Award, ArrowRight } from 'lucide-react';

interface Props {
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<Props> = ({ onClose, onOpenResume, onOpenContact }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel about-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <div className="header-status-indicator" />
            <div>
              <span className="modal-kicker font-mono text-cyan">SECTOR 04 // COMMAND WORKSTATION</span>
              <h2 className="modal-title font-mono">DEVELOPER PROFILE // AAYUSH KUMAR</h2>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Hero Bio Banner */}
          <div className="about-hero-grid">
            <div className="about-avatar-card">
              <div className="avatar-frame">
                <div className="avatar-icon-ring">
                  <Cpu size={36} className="text-cyan animate-pulse" />
                </div>
                <div className="avatar-tag font-mono">AGENTIC DEVELOPER</div>
              </div>
              <div className="avatar-meta font-mono text-xs text-muted text-center mt-3">
                <div>LOCATION: GLOBAL / REMOTE</div>
                <div>STATUS: ● READY TO BUILD</div>
              </div>
            </div>

            <div className="about-bio-text">
              <h3 className="font-mono text-lg text-white mb-2">
                "Code is cheap. Architecture and execution that solves hard problems is rare."
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {RESUME_DATA.summary}
              </p>

              <div className="core-stats-chips">
                {RESUME_DATA.coreStats.map((stat, i) => (
                  <div key={i} className="stat-chip font-mono">
                    <span className="stat-chip-label">{stat.label}:</span>
                    <span className="stat-chip-val text-cyan">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Pillars of Engineering */}
          <div className="pillars-grid mt-6">
            <div className="pillar-box">
              <div className="pillar-header">
                <Cpu size={16} className="text-cyan" />
                <span className="font-mono text-sm font-bold text-white">01. Autonomous Agent Architectures</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                I design DAGs, self-correcting critique loops, and multi-agent coordination frameworks (LangGraph, ReAct). Agents decompose complex prompts into atomic tasks with deterministic schema validation.
              </p>
            </div>

            <div className="pillar-box">
              <div className="pillar-header">
                <Laptop size={16} className="text-cyan" />
                <span className="font-mono text-sm font-bold text-white">02. Resilient Full-Stack Systems</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Great AI needs great software engineering. I engineer type-safe frontends in React/TypeScript and rock-solid backend services in Node.js and FastAPI with Redis caching and PostgreSQL relational modeling.
              </p>
            </div>

            <div className="pillar-box">
              <div className="pillar-header">
                <Shield size={16} className="text-cyan" />
                <span className="font-mono text-sm font-bold text-white">03. Verified Production Quality</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Zero tolerance for hallucinations in production. I build robust citation verification, guardrail checks, automated CI/CD container tests, and sub-millisecond real-time WebSockets.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-action btn-secondary"
            onClick={() => {
              sounds.playClick();
              onOpenResume();
            }}
          >
            <span>VIEW COMPLETE RESUME &amp; CV</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            className="btn-modal-action btn-accent"
            onClick={() => {
              sounds.playClick();
              onOpenContact();
            }}
          >
            <span>TRANSMIT MESSAGE / CONTACT</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
