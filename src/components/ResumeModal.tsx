import React, { useState } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sounds } from '../audio/soundEffects';
import { FileText, Download, Printer, Copy, Check, Briefcase, GraduationCap, Cpu, Layers } from 'lucide-react';

interface Props {
  onClose: () => void;
  onOpenContact: () => void;
}

export const ResumeModal: React.FC<Props> = ({ onClose, onOpenContact }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleCopyMarkdown = () => {
    sounds.playClick();
    const md = `
# ${RESUME_DATA.name}
**${RESUME_DATA.title}**
Email: ${RESUME_DATA.email} | GitHub: ${RESUME_DATA.github} | LinkedIn: ${RESUME_DATA.linkedin}

## Professional Summary
${RESUME_DATA.summary}

## Core Competencies
${RESUME_DATA.skillCategories.map(cat => `- **${cat.title}**: ${cat.skills.map(s => s.name).join(', ')}`).join('\n')}

## Engineering Experience
${RESUME_DATA.experiences.map(exp => `
### ${exp.role} — ${exp.company} (${exp.period})
${exp.highlights.map(h => `- ${h}`).join('\n')}
*Technologies:* ${exp.technologies.join(', ')}
`).join('\n')}

## Education
${RESUME_DATA.education.map(edu => `
### ${edu.degree} in ${edu.field}
${edu.institution} (${edu.period})
${edu.details.map(d => `- ${d}`).join('\n')}
`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel resume-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <FileText size={20} className="text-cyan" />
            <div>
              <span className="modal-kicker font-mono text-cyan">SECTOR 04 // HOLO-PEDESTAL</span>
              <h2 id="resume-modal-title" className="modal-title font-mono">{RESUME_DATA.name} // CURRICULUM VITAE</h2>
            </div>
          </div>

          <div className="flex-row items-center gap-2">
            <button
              type="button"
              className="modal-secondary-btn"
              onClick={handleCopyMarkdown}
              title="Copy as Markdown"
            >
              {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED MD' : 'COPY MARKDOWN'}</span>
            </button>
            <button
              type="button"
              className="modal-secondary-btn"
              onClick={handlePrint}
              title="Print / Save PDF"
            >
              <Printer size={14} />
              <span>PRINT / PDF</span>
            </button>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Resume"
            >
              ×
            </button>
          </div>
        </div>

        <div className="modal-body printable-resume">
          {/* Header Block */}
          <div className="resume-doc-header">
            <h1 className="resume-name font-mono">{RESUME_DATA.name}</h1>
            <p className="resume-title font-mono text-cyan">{RESUME_DATA.title}</p>
            <div className="resume-contacts font-mono text-xs text-muted">
              <span>{RESUME_DATA.email}</span>
              <span>•</span>
              <a href={RESUME_DATA.github} target="_blank" rel="noopener noreferrer" className="text-cyan">GitHub</a>
              <span>•</span>
              <a href={RESUME_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan">LinkedIn</a>
              <span>•</span>
              <span>{RESUME_DATA.location}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="resume-section">
            <h3 className="resume-section-title font-mono">
              <Cpu size={14} className="text-cyan inline-icon" />
              <span>PROFESSIONAL SUMMARY</span>
            </h3>
            <p className="resume-summary-body">{RESUME_DATA.summary}</p>
          </div>

          {/* Technical Skills Breakdown */}
          <div className="resume-section">
            <h3 className="resume-section-title font-mono">
              <Layers size={14} className="text-cyan inline-icon" />
              <span>TECHNICAL COMPETENCIES MATRIX</span>
            </h3>
            <div className="resume-skills-grid">
              {RESUME_DATA.skillCategories.map((cat, idx) => (
                <div key={idx} className="resume-skill-cat">
                  <h4 className="skill-cat-head font-mono">{cat.title}</h4>
                  <ul className="skill-cat-items">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="skill-item-line">
                        <span className="skill-item-name font-medium">{skill.name}</span>
                        {skill.tags && (
                          <span className="skill-item-sub font-mono text-muted text-xs">
                            ({skill.tags.join(', ')})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="resume-section">
            <h3 className="resume-section-title font-mono">
              <Briefcase size={14} className="text-cyan inline-icon" />
              <span>ENGINEERING EXPERIENCE &amp; PROJECTS</span>
            </h3>
            <div className="resume-exp-list">
              {RESUME_DATA.experiences.map((exp, idx) => (
                <div key={idx} className="resume-exp-card">
                  <div className="exp-card-header">
                    <div>
                      <h4 className="exp-role font-mono">{exp.role}</h4>
                      <span className="exp-company text-muted">{exp.company}</span>
                    </div>
                    <span className="exp-period font-mono text-cyan text-xs">{exp.period}</span>
                  </div>
                  <ul className="exp-highlights-list">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                  <div className="exp-tech-tags">
                    {exp.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="badge-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="resume-section">
            <h3 className="resume-section-title font-mono">
              <GraduationCap size={14} className="text-cyan inline-icon" />
              <span>EDUCATION &amp; FOUNDATIONS</span>
            </h3>
            <div className="resume-edu-list">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="resume-edu-card">
                  <div className="exp-card-header">
                    <div>
                      <h4 className="exp-role font-mono">{edu.degree} in {edu.field}</h4>
                      <span className="exp-company text-muted">{edu.institution}</span>
                    </div>
                    <span className="exp-period font-mono text-cyan text-xs">{edu.period}</span>
                  </div>
                  <ul className="exp-highlights-list">
                    {edu.details.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-action btn-secondary"
            onClick={handlePrint}
          >
            <Download size={14} />
            <span>SAVE AS PDF</span>
          </button>
          <button
            type="button"
            className="btn-modal-action btn-accent"
            onClick={() => {
              sounds.playClick();
              onOpenContact();
            }}
          >
            <span>DISPATCH TRANSMISSION / HIRE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
