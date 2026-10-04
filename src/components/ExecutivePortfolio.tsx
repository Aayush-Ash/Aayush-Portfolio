import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { RESUME_DATA } from '../data/resumeData';
import { FAQ_DATA } from '../data/faqData';
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
  Briefcase,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  ShieldCheck,
  Scale,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface Props {
  onReturnToWorkshop: () => void;
  onOpenProject: (projectId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onOpenFAQ: () => void;
  onOpenShare: () => void;
  onOpenCookieSettings: () => void;
}

export const ExecutivePortfolio: React.FC<Props> = ({
  onReturnToWorkshop,
  onOpenProject,
  onOpenResume,
  onOpenContact,
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenFAQ,
  onOpenShare,
  onOpenCookieSettings
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'agentic_ai' | 'full_stack' | 'ml_data'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('agentic-vs-standard');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const handleFilterClick = (cat: 'all' | 'agentic_ai' | 'full_stack' | 'ml_data') => {
    sounds.playClick();
    setSelectedCategory(cat);
  };

  const toggleFaq = (id: string) => {
    sounds.playClick();
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="executive-view-root" id="main-content">
      {/* Sticky Header Nav */}
      <header className="exec-nav-header">
        <div className="exec-nav-inner">
          <div className="flex-row items-center gap-3">
            <span className="font-mono font-bold text-white tracking-wider text-base">
              AAYUSH // PORTFOLIO
            </span>
            <span className="badge-tag text-xs font-mono text-cyan">EXECUTIVE BRIEF</span>
          </div>

          <div className="flex-row items-center gap-3">
            <nav className="exec-nav-links font-mono text-xs" aria-label="Executive sections">
              <a href="#projects">PROJECTS</a>
              <a href="#architecture">ARCHITECTURE</a>
              <a href="#skills">SKILLS</a>
              <a href="#experience">EXPERIENCE</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">CONTACT</a>
            </nav>

            {/* Social Share Trigger */}
            <button
              type="button"
              className="exec-nav-icon-btn font-mono"
              onClick={() => {
                sounds.playClick();
                onOpenShare();
              }}
              title="Share portfolio"
              aria-label="Share this portfolio"
            >
              <Share2 size={14} className="text-cyan" />
              <span className="hidden-mobile">SHARE</span>
            </button>

            {/* Clear Primary CTA in Nav */}
            <button
              type="button"
              className="btn-nav-cta font-mono"
              onClick={() => {
                sounds.playClick();
                onOpenContact();
              }}
            >
              <Mail size={13} />
              <span>GET IN TOUCH</span>
            </button>

            {/* Return to 2.5D Workshop Mode */}
            <button
              type="button"
              className="btn-return-workshop font-mono"
              onClick={() => {
                sounds.playZoneTransition();
                onReturnToWorkshop();
              }}
            >
              <Compass size={14} className="text-cyan animate-spin-slow" />
              <span>2.5D WORKSHOP</span>
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
            <span>AGENT CORE: READY // OPEN TO FULL-TIME &amp; CONTRACT OPPORTUNITIES</span>
          </div>

          <h1 className="exec-hero-title font-mono">
            Architecting <span className="text-gradient-cyan">Autonomous Agents</span> &amp; High-Frequency Web Systems.
          </h1>

          <p className="exec-hero-lead">
            {RESUME_DATA.summary}
          </p>

          <div className="exec-hero-actions">
            <button
              type="button"
              className="btn-modal-action btn-accent btn-hero-primary"
              onClick={() => {
                sounds.playClick();
                onOpenContact();
              }}
            >
              <Mail size={16} />
              <span>TRANSMIT DISPATCH / HIRE AAYUSH</span>
              <ArrowRight size={15} />
            </button>

            <a
              href="#projects"
              className="btn-modal-action btn-secondary"
              onClick={() => sounds.playClick()}
            >
              <Layers size={15} />
              <span>EXPLORE ALL SYSTEMS</span>
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
                sounds.playZoneTransition();
                onReturnToWorkshop();
              }}
            >
              <Compass size={15} className="text-cyan" />
              <span>ENTER 2.5D WORKSHOP</span>
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
          <div className="exec-filter-bar" role="tablist" aria-label="Filter engineering systems">
            {[
              { id: 'all', label: 'ALL SYSTEMS' },
              { id: 'agentic_ai', label: '🧠 AGENTIC AI' },
              { id: 'full_stack', label: '💻 FULL-STACK' },
              { id: 'ml_data', label: '📊 MACHINE LEARNING' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === tab.id}
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
                      title="GitHub Repository"
                      aria-label={`${proj.title} GitHub repository`}
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

        {/* FAQ Section */}
        <section id="faq" className="exec-section">
          <div className="section-head">
            <div className="flex-row items-center gap-2">
              <HelpCircle size={18} className="text-cyan" />
              <h2 className="section-title font-mono">FREQUENTLY ASKED QUESTIONS</h2>
            </div>
            <p className="section-lead">
              Direct insights on engineering methodologies, multi-agent architectures, and team collaboration.
            </p>
          </div>

          <div className="exec-faq-container">
            <div className="faq-accordion-list">
              {FAQ_DATA.slice(0, 5).map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn font-mono"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`exec-faq-${item.id}`}
                    >
                      <span className="faq-q-text">{item.question}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? <ChevronUp size={16} className="text-cyan" /> : <ChevronDown size={16} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div id={`exec-faq-${item.id}`} className="faq-answer-pane">
                        <p className="faq-a-text font-sans">{item.answer}</p>
                        <div className="faq-tags-row font-mono">
                          {item.tags.map((t, tIdx) => (
                            <span key={tIdx} className="badge-tag text-xs">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="faq-view-all-row mt-4">
              <button
                type="button"
                className="btn-modal-action btn-secondary font-mono"
                onClick={() => {
                  sounds.playClick();
                  onOpenFAQ();
                }}
              >
                <HelpCircle size={14} />
                <span>EXPLORE ALL {FAQ_DATA.length} FAQS &amp; KNOWLEDGE ARCHIVE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Contact Banner & Clear High-Conversion CTA */}
        <section id="contact" className="exec-section exec-contact-section">
          <div className="contact-banner-card">
            <div className="hero-status-pill font-mono mb-4 inline-flex">
              <span className="status-dot-pulse online" />
              <span>DIRECT UPLINK // ZERO LATENCY</span>
            </div>

            <h2 className="font-mono text-2xl text-white mb-2">READY TO DEPLOY AGENTIC INTELLIGENCE?</h2>
            <p className="text-muted text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Whether you need autonomous research agents, self-correcting LLM reasoning graphs, or high-performance full-stack web platforms—let's engineer something extraordinary together.
            </p>

            <div className="flex-row items-center justify-center flex-wrap gap-4 mb-6">
              <button
                type="button"
                className="btn-modal-action btn-accent btn-hero-primary"
                onClick={() => {
                  sounds.playClick();
                  onOpenContact();
                }}
              >
                <Mail size={16} />
                <span>OPEN COMMS TRANSMITTER</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="btn-modal-action btn-secondary"
                onClick={handleCopyEmail}
                title="Copy Aayush's email"
              >
                {copiedEmail ? <Check size={15} className="text-emerald" /> : <Copy size={15} />}
                <span>{copiedEmail ? 'EMAIL COPIED!' : 'COPY EMAIL ADDRESS'}</span>
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

            <div className="direct-email-sub font-mono text-xs text-muted">
              DIRECT DISPATCH: <strong className="text-cyan">{RESUME_DATA.email}</strong> // TYPICAL RESPONSE &lt; 24H
            </div>
          </div>
        </section>
      </main>

      {/* Comprehensive Executive Footer */}
      <footer className="exec-footer-root">
        <div className="exec-footer-inner">
          <div className="footer-top-grid">
            {/* Col 1: Brand & Status */}
            <div className="footer-col">
              <div className="font-mono font-bold text-white text-base tracking-wider mb-2">
                AAYUSH KUMAR
              </div>
              <p className="text-muted text-xs leading-relaxed max-w-sm mb-3">
                Agentic AI Developer &amp; Full-Stack Systems Architect. Engineering autonomous cognitive architectures and high-throughput web applications.
              </p>
              <div className="flex-row items-center gap-2 font-mono text-xs text-cyan">
                <span className="status-dot-pulse online" />
                <span>FACILITY 01 // OPERATIONAL</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="footer-col font-mono text-xs">
              <div className="footer-heading text-white font-bold mb-3">NAVIGATION</div>
              <ul className="footer-links-list">
                <li><a href="#projects">Engineering Systems</a></li>
                <li><a href="#architecture">Architecture DAGs</a></li>
                <li><a href="#skills">Skills Matrix</a></li>
                <li><a href="#experience">Background &amp; Track Record</a></li>
                <li><a href="#faq">Frequently Asked Questions</a></li>
                <li><a href="#contact">Contact Uplink</a></li>
              </ul>
            </div>

            {/* Col 3: Compliance & Legal (Privacy Policy, Terms, Cookies) */}
            <div className="footer-col font-mono text-xs">
              <div className="footer-heading text-white font-bold mb-3">LEGAL &amp; COMPLIANCE</div>
              <ul className="footer-links-list">
                <li>
                  <button
                    type="button"
                    className="footer-btn-link"
                    onClick={() => {
                      sounds.playClick();
                      onOpenPrivacyPolicy();
                    }}
                  >
                    <ShieldCheck size={13} className="text-cyan" />
                    <span>Privacy Policy (GDPR / CCPA)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-btn-link"
                    onClick={() => {
                      sounds.playClick();
                      onOpenTerms();
                    }}
                  >
                    <Scale size={13} className="text-cyan" />
                    <span>Terms of Service</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-btn-link"
                    onClick={() => {
                      sounds.playClick();
                      onOpenCookieSettings();
                    }}
                  >
                    <span>Cookie Settings &amp; Telemetry</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-btn-link"
                    onClick={() => {
                      sounds.playClick();
                      onOpenShare();
                    }}
                  >
                    <Share2 size={13} className="text-cyan" />
                    <span>Share Portfolio</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Channels */}
            <div className="footer-col font-mono text-xs">
              <div className="footer-heading text-white font-bold mb-3">CHANNELS &amp; REPOSITORIES</div>
              <ul className="footer-links-list">
                <li>
                  <a
                    href={RESUME_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-row items-center gap-1.5"
                  >
                    <GithubIcon size={14} className="text-cyan" />
                    <span>GitHub Profile</span>
                    <ExternalLink size={10} className="text-muted" />
                  </a>
                </li>
                <li>
                  <a
                    href={RESUME_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-row items-center gap-1.5"
                  >
                    <LinkedinIcon size={14} className="text-cyan" />
                    <span>LinkedIn Network</span>
                    <ExternalLink size={10} className="text-muted" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${RESUME_DATA.email}`}
                    className="flex-row items-center gap-1.5"
                  >
                    <Mail size={14} className="text-cyan" />
                    <span>{RESUME_DATA.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar font-mono text-xs text-muted">
            <div>
              © 2026 AAYUSH KUMAR. ALL ARCHITECTURAL RIGHTS RESERVED.
            </div>
            <div className="flex-row items-center gap-3">
              <span>LATENCY: 12ms</span>
              <span>•</span>
              <span>CANONICAL: https://aayush-portfolio.vercel.app</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
