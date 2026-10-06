import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import type { ProjectData } from '../types/project';
import { sounds } from '../audio/soundEffects';
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Terminal, 
  Layers, 
  CheckCircle,
  Cpu
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface Props {
  onClose: () => void;
  onOpenProject: (projectId: string) => void;
  onOpenContact: () => void;
}

export const WorkModal: React.FC<Props> = ({ onClose, onOpenProject, onOpenContact }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL WORK' },
    { id: 'agentic_ai', label: 'AGENTIC AI' },
    { id: 'fullstack', label: 'FULL-STACK SYSTEMS' },
    { id: 'data_core', label: 'ML & DATA' }
  ];

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel work-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
      >
        {/* Terminal Header Bar */}
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <div className="header-status-indicator" />
            <div>
              <span className="modal-kicker font-mono text-cyan">FLAGSHIP PORTFOLIO // VERIFIED SYSTEMS</span>
              <h2 id="work-modal-title" className="modal-title font-mono">FEATURED ENGINEERING &amp; AGENTIC WORK</h2>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close Work Modal"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Category Filter Pills */}
          <div className="work-filter-bar font-mono">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`work-filter-pill ${filter === cat.id ? 'active' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  setFilter(cat.id);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="work-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="work-card">
                <div className="work-card-header">
                  <div className="work-card-badge font-mono">{project.badge}</div>
                  <span className="work-card-sector font-mono text-xs text-muted">
                    ZONE // {project.zone}
                  </span>
                </div>

                <h3 className="work-card-title font-mono">{project.title}</h3>
                <p className="work-card-summary text-muted text-sm">{project.summary}</p>

                {/* Key Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="work-card-highlights">
                    {project.highlights.slice(0, 2).map((hl, hIdx) => (
                      <div key={hIdx} className="work-highlight-item text-xs text-slate-300">
                        <CheckCircle size={12} className="text-cyan inline-shrink" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="work-card-tech">
                  {project.techStack.flatMap(ts => ts.items).slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="tech-tag-pill font-mono text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="work-card-actions">
                  <button
                    type="button"
                    className="btn-work-explore font-mono"
                    onClick={() => {
                      sounds.playClick();
                      onClose();
                      onOpenProject(project.id);
                    }}
                  >
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowRight size={13} className="text-cyan" />
                  </button>

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-work-github"
                      title="View GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon size={14} className="text-slate-300 hover:text-white" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="work-footer-cta font-mono">
            <span>Looking for custom agentic architectures or production engineering?</span>
            <button
              type="button"
              className="btn-nav-cta font-mono"
              onClick={() => {
                sounds.playClick();
                onClose();
                onOpenContact();
              }}
            >
              <Sparkles size={13} className="text-cyan animate-pulse" />
              <span>DISCUSS AN ENGINEERING ROLE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
