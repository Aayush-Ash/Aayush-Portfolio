import React, { useState } from 'react';
import type { ProjectData } from '../types/project';
import { ArchitectureViewer } from './ArchitectureViewer';
import { SentilyticsDemo } from './SentilyticsDemo';
import { SakuraKeysDemo } from './SakuraKeysDemo';
import { sounds } from '../audio/soundEffects';
import { 
  X, 
  Layers, 
  Terminal, 
  Activity, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Play
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface Props {
  project: ProjectData;
  onClose: () => void;
}

export const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'demo'>('overview');

  const handleTabChange = (tab: 'overview' | 'architecture' | 'demo') => {
    sounds.playClick();
    setActiveTab(tab);
  };

  const handleClose = () => {
    sounds.playClick();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        className="modal-panel project-modal-panel" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Terminal Header Bar */}
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <div className="header-status-indicator" />
            <div>
              <span className="modal-kicker font-mono text-cyan">{project.badge} // SECTOR {project.zone}</span>
              <h2 className="modal-title font-mono">{project.title}</h2>
            </div>
          </div>

          <div className="flex-row items-center gap-2">
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleClose}
              title="Close Terminal (ESC)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="modal-tabs-bar">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <Terminal size={14} />
            <span>SPECIFICATION &amp; PROBLEM</span>
          </button>

          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => handleTabChange('architecture')}
          >
            <Layers size={14} />
            <span>ARCHITECTURE &amp; DAG</span>
          </button>

          {(project.demoType || project.id === 'sentilytics-pro' || project.id === 'sakurakeys') && (
            <button
              type="button"
              className={`modal-tab-btn highlight-tab ${activeTab === 'demo' ? 'active' : ''}`}
              onClick={() => handleTabChange('demo')}
            >
              <Play size={14} />
              <span>LIVE INTERACTIVE SIMULATOR</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {activeTab === 'overview' && (
            <div className="project-overview-content">
              {/* Summary Lead */}
              <p className="project-summary-lead">{project.summary}</p>

              {/* Problem vs Solution Split */}
              <div className="problem-solution-grid">
                <div className="spec-card problem-card">
                  <div className="spec-card-header">
                    <AlertCircle size={15} className="text-amber-400" />
                    <span>THE ENGINEERING PROBLEM</span>
                  </div>
                  <p className="spec-card-body">{project.problem}</p>
                </div>

                <div className="spec-card solution-card">
                  <div className="spec-card-header">
                    <CheckCircle size={15} className="text-cyan" />
                    <span>THE ARCHITECTURAL SOLUTION</span>
                  </div>
                  <p className="spec-card-body">{project.solution}</p>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="project-metrics-row">
                {project.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="metric-box">
                    <span className="metric-val font-mono">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-desc">{metric.description}</span>
                  </div>
                ))}
              </div>

              {/* Architecture Quick Pipeline flow preview */}
              <div className="quick-arch-box">
                <div className="quick-arch-header">
                  <span className="font-mono text-xs text-muted">PIPELINE TOPOLOGY:</span>
                  <button 
                    type="button" 
                    className="quick-arch-link" 
                    onClick={() => handleTabChange('architecture')}
                  >
                    <span>Inspect DAG Details →</span>
                  </button>
                </div>
                <div className="pipeline-pill-track">
                  {project.architectureNodes.map((n, i) => (
                    <React.Fragment key={n.id}>
                      <span className="pipeline-mini-pill">{n.name}</span>
                      {i < project.architectureNodes.length - 1 && (
                        <span className="text-muted text-xs font-mono">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Tech Stack Breakdown */}
              <div className="project-tech-section">
                <h3 className="section-subtitle font-mono">TECHNOLOGY MATRIX</h3>
                <div className="tech-category-grid">
                  {project.techStack.map((cat, i) => (
                    <div key={i} className="tech-cat-box">
                      <span className="tech-cat-title">{cat.category}</span>
                      <div className="tech-cat-tags">
                        {cat.items.map((tech, j) => (
                          <span key={j} className="badge-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="highlights-section">
                <h3 className="section-subtitle font-mono">CORE SYSTEM INNOVATIONS</h3>
                <ul className="highlights-list">
                  {project.highlights.map((h, i) => (
                    <li key={i}>
                      <Sparkles size={13} className="text-cyan inline-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="project-arch-content">
              <ArchitectureViewer nodes={project.architectureNodes} systemTitle={project.title} />
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="project-demo-content">
              {project.id === 'sentilytics-pro' ? (
                <SentilyticsDemo />
              ) : project.id === 'sakurakeys' ? (
                <SakuraKeysDemo />
              ) : (
                <ArchitectureViewer nodes={project.architectureNodes} systemTitle={project.title} />
              )}
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="modal-footer">
          <div className="footer-left-info">
            <span className="text-xs text-muted font-mono">ID: {project.id} // STATUS: PRODUCTION-TESTED</span>
          </div>

          <div className="modal-actions-group">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-action btn-secondary"
                onClick={() => sounds.playClick()}
              >
                <GithubIcon size={15} />
                <span>VIEW GITHUB REPO</span>
              </a>
            )}

            <button
              type="button"
              className="btn-modal-action btn-accent"
              onClick={() => {
                if (project.id === 'sentilytics-pro' || project.id === 'sakurakeys') {
                  handleTabChange('demo');
                } else {
                  handleTabChange('architecture');
                }
              }}
            >
              <Activity size={15} />
              <span>
                {activeTab === 'demo' ? 'EXPLORE ARCHITECTURE' : 'INTERACTIVE WALKTHROUGH'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
