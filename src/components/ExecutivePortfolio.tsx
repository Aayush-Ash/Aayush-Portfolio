import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { RESUME_DATA } from '../data/resumeData';
import { sounds } from '../audio/soundEffects';
import { 
  Compass, 
  Cpu, 
  FileText, 
  Mail, 
  Sparkles, 
  Layers, 
  Activity, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface Props {
  onReturnToWorkshop: () => void;
  onOpenProject: (projectId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const ExecutivePortfolio: React.FC<Props> = ({
  onReturnToWorkshop,
  onOpenProject,
  onOpenResume,
  onOpenContact
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'agentic_ai' | 'full_stack' | 'ml_data'>('all');

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const handleFilterClick = (cat: 'all' | 'agentic_ai' | 'full_stack' | 'ml_data') => {
    sounds.playClick();
    setSelectedCategory(cat);
  };

  return (
    <div className="executive-view-root">
      {/* Sticky Header Nav */}
      <header className="exec-nav-header">
        <div className="exec-nav-inner">
          <div className="flex-row items-center gap-3">
            <span className="font-mono font-bold text-white tracking-wider text-base">
              AAYUSH // PORTFOLIO
            </span>
            <span className="badge-tag text-xs font-mono text-cyan">EXECUTIVE BRIEF</span>
          </div>

          <div className="flex-row items-center gap-4">
            <nav className="exec-nav-links font-mono text-xs">
              <a href="#projects">PROJECTS</a>
              <a href="#architecture">ARCHITECTURE</a>
              <a href="#skills">SKILLS</a>
              <a href="#experience">EXPERIENCE</a>
              <a href="#contact">CONTACT</a>
            </nav>

            <button
              type="button"
              className="btn-return-workshop font-mono"
              onClick={() => {
                sounds.playZoneTransition();
                onReturnToWorkshop();
              }}
            >
              <Compass size={14} className="text-cyan animate-spin" />
              <span>RETURN TO 2.5D WORKSHOP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="exec-container">
        {/* Hero Section */}
        <section className="exec-hero-section">
          <div className="hero-status-pill font-mono">
            <span className="status-dot-pulse online" />
            <span>AGENT CORE: READY // OPEN TO OPPORTUNITIES</span>
          </div>

          <h1 className="exec-hero-title font-mono">
            Architecting <span className="text-gradient-cyan">Autonomous Agents</span> &amp; High-Frequency Web Systems.
          </h1>

          <p className="exec-hero-lead">
            {RESUME_DATA.summary}
          </p>

          <div className="exec-hero-actions">
            <a
              href="#projects"
              className="btn-modal-action btn-accent"
              onClick={() => sounds.playClick()}
            >
              <span>EXPLORE ALL SYSTEMS</span>
              <ArrowRight size={15} />
            </a>

            <button
              type="button"
              className="btn-modal-action btn-secondary"
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
            >
              <FileText size={15} />
              <span>VIEW RESUME &amp; CV</span>
            </button>

            <button
              type="button"
              className="btn-modal-action btn-secondary"
              onClick={() => {
                sounds.playClick();
                onOpenContact();
              }}
            >
              <Mail size={15} />
              <span>GET IN TOUCH</span>
            </button>
          </div>

          {/* Core Metrics Bar */}
          <div className="exec-metrics-bar">
            {RESUME_DATA.coreStats.map((stat, i) => (
              <div key={i} className="exec-stat-cell font-mono">
                <span className="stat-cell-val text-cyan">{stat.value}</span>
                <span className="stat-cell-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Agent Core Holographic Flow Highlight */}
        <section id="architecture" className="exec-section">
          <div className="section-head">
            <div className="flex-row items-center gap-2">
              <Cpu size={18} className="text-cyan" />
              <h2 className="section-title font-mono">AGENT ARCHITECTURE PARADIGM</h2>
            </div>
            <p className="section-lead">
              How Aayush structures multi-agent systems from raw user intent to verified, hallucination-free execution.
            </p>
          </div>

          <div className="agent-paradigm-card">
            <div className="paradigm-nodes-grid">
              {[
                { title: '01. INTENT & DAG PLAN', desc: 'Decomposes unstructured requests into parallel sub-goals with schema verification.' },
                { title: '02. TOOL REASONING', desc: 'Dynamic tool dispatching: live search, code execution sandboxes, and API adapters.' },
                { title: '03. HYBRID MEMORY', desc: 'Episodic buffer + dense vector embeddings with cross-encoder re-ranking.' },
                { title: '04. VERIFIED ACTION', desc: 'Self-correcting reflection loop cross-checking facts against primary sources.' }
              ].map((step, idx) => (
                <div key={idx} className="paradigm-step-box">
                  <div className="paradigm-num font-mono text-cyan">{step.title}</div>
                  <p className="paradigm-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section id="projects" className="exec-section">
          <div className="section-head">
            <div className="flex-row items-center gap-2">
              <Layers size={18} className="text-cyan" />
              <h2 className="section-title font-mono">FEATURED ENGINEERING SYSTEMS</h2>
            </div>
            <p className="section-lead">
              Production-grade systems demonstrating end-to-end architecture, tool use, and full-stack rigor.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="exec-filter-bar">
            {[
              { id: 'all', label: 'ALL SYSTEMS' },
              { id: 'agentic_ai', label: '🧠 AGENTIC AI' },
              { id: 'full_stack', label: '💻 FULL-STACK' },
              { id: 'ml_data', label: '📊 MACHINE LEARNING' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`filter-btn font-mono ${selectedCategory === tab.id ? 'active' : ''}`}
                onClick={() => handleFilterClick(tab.id as 'all' | 'agentic_ai' | 'full_stack' | 'ml_data')}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="projects-cards-grid">
            {filteredProjects.map(proj => (
              <div key={proj.id} className="exec-project-card">
                <div className="card-top-header">
                  <span className="card-badge font-mono">{proj.badge}</span>
                  <span className="card-sector font-mono text-muted">{proj.zone}</span>
                </div>

                <h3 className="card-title font-mono">{proj.title}</h3>
                <p className="card-summary">{proj.summary}</p>

                {/* Problem & Solution Mini */}
                <div className="card-mini-spec">
                  <div className="spec-item">
                    <span className="spec-kicker font-mono">PROBLEM:</span>
                    <span className="spec-text">{proj.problem}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-kicker font-mono text-cyan">SOLUTION:</span>
                    <span className="spec-text">{proj.solution}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="card-metrics-grid font-mono">
                  {proj.keyMetrics.map((m, mIdx) => (
                    <div key={mIdx} className="mini-metric">
                      <span className="val text-cyan">{m.value}</span>
                      <span className="lbl">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="card-tech-row">
                  {proj.techStack[0]?.items.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="badge-tag">{tech}</span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="card-actions-row">
                  <button
                    type="button"
                    className="btn-card-action btn-card-primary"
                    onClick={() => {
                      sounds.playClick();
                      onOpenProject(proj.id);
                    }}
                  >
                    <Activity size={14} />
                    <span>INSPECT SYSTEM &amp; DAG</span>
                  </button>

                  {proj.links.github && (
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-action btn-card-icon"
                      title="GitHub"
                      onClick={() => sounds.playClick()}
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Matrix */}
        <section id="skills" className="exec-section">
          <div className="section-head">
            <div className="flex-row items-center gap-2">
              <Sparkles size={18} className="text-cyan" />
              <h2 className="section-title font-mono">TECHNICAL SKILLS MATRIX</h2>
            </div>
            <p className="section-lead">
              Core technologies, specialized frameworks, and infrastructure tools.
            </p>
          </div>

          <div className="exec-skills-grid">
            {RESUME_DATA.skillCategories.map((cat, idx) => (
              <div key={idx} className="skill-cat-card">
                <h3 className="cat-card-title font-mono flex-row items-center gap-2">
                  <span className="text-cyan">◆</span>
                  <span>{cat.title}</span>
                </h3>
                <div className="skill-cat-body">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item-row">
                      <div className="skill-title-col">
                        <span className="skill-name font-medium">{skill.name}</span>
                        {skill.tags && (
                          <span className="skill-tags font-mono text-muted text-xs">
                            {skill.tags.join(' • ')}
                          </span>
                        )}
                      </div>
                      <span className="skill-level-badge font-mono text-xs">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section id="experience" className="exec-section">
          <div className="section-head">
            <div className="flex-row items-center gap-2">
              <Briefcase size={18} className="text-cyan" />
              <h2 className="section-title font-mono">ENGINEERING BACKGROUND</h2>
            </div>
          </div>

          <div className="exp-timeline-list">
            {RESUME_DATA.experiences.map((exp, idx) => (
              <div key={idx} className="timeline-node-card">
                <div className="timeline-node-head">
                  <div>
                    <h3 className="timeline-role font-mono">{exp.role}</h3>
                    <span className="timeline-company text-muted">{exp.company} // {exp.location}</span>
                  </div>
                  <span className="timeline-period font-mono text-cyan text-xs">{exp.period}</span>
                </div>
                <ul className="timeline-bullets">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
                <div className="timeline-tech-row">
                  {exp.technologies.map((t, tIdx) => (
                    <span key={tIdx} className="badge-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <section id="contact" className="exec-section exec-contact-section">
          <div className="contact-banner-card">
            <h2 className="font-mono text-2xl text-white mb-2">READY TO DEPLOY AGENTIC INTELLIGENCE?</h2>
            <p className="text-muted text-sm max-w-xl mx-auto mb-6">
              Whether you need autonomous research agents, high-frequency full-stack web platforms, or specialized LLM workflows—let's build something extraordinary together.
            </p>
            <div className="flex-row items-center justify-center gap-4">
              <button
                type="button"
                className="btn-modal-action btn-accent"
                onClick={() => {
                  sounds.playClick();
                  onOpenContact();
                }}
              >
                <Mail size={15} />
                <span>OPEN COMMS TRANSMITTER</span>
              </button>
              <button
                type="button"
                className="btn-modal-action btn-secondary"
                onClick={() => {
                  sounds.playZoneTransition();
                  onReturnToWorkshop();
                }}
              >
                <Compass size={15} />
                <span>EXPERIENCE 2.5D WORKSHOP</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
