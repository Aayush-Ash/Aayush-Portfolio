import React, { useState, useRef, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { PROJECTS } from '../data/projects';
import { 
  queryAayushIntelligence, 
  INITIAL_PROMPT_CHIPS, 
  type AIMessage, 
  type AIActionButton 
} from '../data/aayushAiData';
import { sounds } from '../audio/soundEffects';
import { 
  Search, 
  Sparkles, 
  X, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Pause, 
  Compass, 
  FileText, 
  Mail, 
  Shuffle,
  ChevronRight
} from 'lucide-react';
import type { ProjectData } from '../types/project';
import './GoogleSearchHero.css';

interface Props {
  onOpenProject: (projectId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onSwitchToWorkshop: () => void;
  onOpenWork?: () => void;
}

export const GoogleSearchHero: React.FC<Props> = ({
  onOpenProject,
  onOpenResume,
  onOpenContact,
  onSwitchToWorkshop,
  onOpenWork
}) => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIMessage | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-play the video smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    }
  }, []);

  // Filter matching projects based on query
  const matchingProjects = useMemo<ProjectData[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    // Broad search matches all projects
    if (q === 'all' || q === 'projects' || q === 'work' || q === 'portfolio') {
      return PROJECTS;
    }

    return PROJECTS.filter(p => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.highlights.some(h => h.toLowerCase().includes(q)) ||
        p.techStack.some(t => t.items.some(item => item.toLowerCase().includes(q)))
      );
    });
  }, [query]);

  // Execute Search
  const handleExecuteSearch = (searchQuery = query) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    sounds.playClick();
    setQuery(trimmed);
    setHasSearched(true);
    setIsTyping(true);

    // AI synthesis response
    setTimeout(() => {
      sounds.playInteract();
      const res = queryAayushIntelligence(trimmed);
      setAiResponse(res);
      setIsTyping(false);
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 280);
  };

  // Keyboard handling on search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteSearch();
    } else if (e.key === 'Escape') {
      handleClearSearch();
    }
  };

  // Clear search input & results
  const handleClearSearch = () => {
    sounds.playClick();
    setQuery('');
    setHasSearched(false);
    setAiResponse(null);
    inputRef.current?.focus();
  };

  // "I'm Feeling Lucky" - randomly picks a project or flagship
  const handleFeelingLucky = () => {
    sounds.playInteract();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#00D2FF', '#A855F7']
      });
    } catch {
      // Ignore if confetti fails
    }

    const randomIndex = Math.floor(Math.random() * PROJECTS.length);
    const chosen = PROJECTS[randomIndex];
    onOpenProject(chosen.id);
  };

  // Handle Quick Chips
  const handleChipClick = (chipPrompt: string, directAction?: () => void) => {
    if (directAction) {
      sounds.playClick();
      directAction();
      return;
    }
    handleExecuteSearch(chipPrompt);
  };

  // Handle AI Action buttons
  const handleActionButton = (btn: AIActionButton) => {
    sounds.playClick();
    switch (btn.action) {
      case 'open_project':
        if (btn.payload) onOpenProject(btn.payload);
        break;
      case 'open_resume':
        onOpenResume();
        break;
      case 'open_contact':
        onOpenContact();
        break;
      case 'switch_to_workshop':
        onSwitchToWorkshop();
        break;
      default:
        break;
    }
  };

  // Replay animation video
  const handleReplayVideo = () => {
    sounds.playClick();
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Toggle video playback
  const handleTogglePlay = () => {
    sounds.playClick();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="google-hero-stage" id="google-hero-search">
      {/* Background Animated Video Canvas */}
      <video
        ref={videoRef}
        src="/hero_video.mp4"
        className="google-hero-video"
        playsInline
        muted
        loop
        preload="metadata"
        aria-hidden="true"
      />

      {/* Ambient Vignette & Deep Backdrop Glow for Contrast */}
      <div className="google-hero-vignette" />
      <div className="google-hero-grid-overlay" />

      {/* Main Centered Google Search Experience */}
      <div className="google-center-wrapper">
        {/* Clean, Futuristic Hero Header (Removed colorful Google Aayush logo) */}
        <div className="google-brand-header">
          <div className="hero-status-pill font-mono">
            <span className="status-dot-pulse online" style={{ display: 'inline-block', width: 6, height: 6, marginRight: 6 }} />
            <span>NEURAL INTELLIGENCE ENGINE // V2.6</span>
          </div>
          <h1 className="hero-futuristic-title font-mono">
            Systems Architecture &amp; Telemetry
          </h1>
          <p className="google-brand-subtitle font-mono">
            Autonomous Agents • Distributed Systems • Full-Stack Engineering
          </p>
        </div>

        {/* The Google Search Bar (In Middle of Screen) */}
        <div className={`google-search-bar ${hasSearched ? 'search-active' : ''}`}>
          <div className="search-icon-left" onClick={() => handleExecuteSearch()}>
            <Search size={19} className="text-cyan search-glass-icon" />
          </div>

          <input
            ref={inputRef}
            type="text"
            className="google-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, agentic DAGs, skills, or telemetry..."
            autoFocus
            aria-label="Search systems and projects"
          />

          <div className="search-bar-actions">
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClearSearch}
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="button"
              className="search-ai-btn"
              onClick={() => handleExecuteSearch(query || 'Agentic AI Work')}
              title="Aayush AI Synthesizer"
              aria-label="Search with AI"
            >
              <Sparkles size={18} className="text-amber-400 animate-pulse-glow" />
            </button>

            <button
              type="button"
              className="search-submit-btn"
              onClick={() => handleExecuteSearch()}
              title="Execute Search"
              aria-label="Submit search"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Buttons Under the Search Bar (Visible in Default State) */}
        {!hasSearched && (
          <div className="google-action-buttons">
            <button
              type="button"
              className="btn-google-action font-mono"
              onClick={() => handleExecuteSearch(query || 'Flagship Projects')}
            >
              Intelligence Search
            </button>

            <button
              type="button"
              className="btn-google-action btn-lucky font-mono"
              onClick={handleFeelingLucky}
              title="Open a surprise featured project"
            >
              <Shuffle size={13} className="text-amber-400" />
              <span>I&apos;m Feeling Lucky</span>
            </button>
          </div>
        )}

        {/* Clear Primary CTAs for Immediate Recruiter / Client Conversion */}
        {!hasSearched && (
          <div className="google-hero-cta-banner" role="navigation" aria-label="Quick Actions">
            <button
              type="button"
              className="hero-primary-cta btn-cta-work font-mono"
              onClick={() => {
                sounds.playClick();
                if (onOpenWork) onOpenWork();
                else handleExecuteSearch('Flagship Projects');
              }}
              aria-label="Explore featured engineering projects"
            >
              <Sparkles size={14} className="text-cyan animate-pulse" />
              <span>EXPLORE WORK</span>
            </button>

            <button
              type="button"
              className="hero-primary-cta btn-cta-resume font-mono"
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
              aria-label="View developer curriculum vitae"
            >
              <FileText size={14} className="text-cyan" />
              <span>VIEW RESUME</span>
            </button>

            <button
              type="button"
              className="hero-primary-cta btn-cta-contact font-mono"
              onClick={() => {
                sounds.playClick();
                onOpenContact();
              }}
              aria-label="Transmit direct message or discuss role"
            >
              <Mail size={14} className="text-emerald-400" />
              <span>CONTACT &amp; HIRE</span>
            </button>

            <button
              type="button"
              className="hero-primary-cta btn-cta-workshop font-mono"
              onClick={() => {
                sounds.playZoneTransition();
                onSwitchToWorkshop();
              }}
              aria-label="Enter interactive 2.5D space station workshop"
            >
              <Compass size={14} className="text-purple-400 animate-spin-slow" />
              <span>2.5D WORKSHOP</span>
            </button>
          </div>
        )}

        {/* Suggested Quick Search Chips */}
        {!hasSearched && (
          <div className="google-quick-chips">
            <button
              type="button"
              className="google-chip"
              onClick={() => handleChipClick('Agentic AI architectures and reasoning DAGs')}
            >
              <span>🧠 AI Agents</span>
            </button>

            <button
              type="button"
              className="google-chip"
              onClick={() => handleChipClick('SakuraKeys full stack typing platform')}
            >
              <span>💻 Full-Stack</span>
            </button>

            <button
              type="button"
              className="google-chip"
              onClick={() => handleChipClick('resume', onOpenResume)}
            >
              <FileText size={12} className="text-cyan" />
              <span>Resume &amp; CV</span>
            </button>

            <button
              type="button"
              className="google-chip"
              onClick={() => handleChipClick('contact', onOpenContact)}
            >
              <Mail size={12} className="text-emerald-400" />
              <span>Contact &amp; Hire</span>
            </button>

            <button
              type="button"
              className="google-chip"
              onClick={() => handleChipClick('workshop', onSwitchToWorkshop)}
            >
              <Compass size={12} className="text-purple-400 animate-spin-slow" />
              <span>2.5D Workshop</span>
            </button>
          </div>
        )}

        {/* --- GOOGLE-STYLE RESULTS PANEL (Directly Beneath Search Bar in Middle of Screen) --- */}
        {hasSearched && (
          <div ref={resultsRef} className="google-results-container">
            {/* Top Toolbar / Clear Action */}
            <div className="google-results-toolbar font-mono">
              <span className="results-count-text">
                Results for <strong className="text-cyan">&ldquo;{query}&rdquo;</strong>
              </span>

              <button
                type="button"
                className="btn-close-results"
                onClick={handleClearSearch}
              >
                <X size={14} />
                <span>CLOSE / RETURN TO SEARCH</span>
              </button>
            </div>

            {/* 1. Google AI Overview Box (Gemini / Generative Search Style) */}
            <div className="google-ai-overview-card">
              <div className="ai-overview-header">
                <div className="flex-row items-center gap-2">
                  <div className="ai-sparkle-pill">
                    <Sparkles size={13} className="text-cyan animate-pulse" />
                    <span className="font-mono text-xs font-bold text-cyan">AI OVERVIEW</span>
                  </div>
                  {aiResponse?.categoryBadge && (
                    <span className="ai-badge-category font-mono text-xs text-muted">
                      {aiResponse.categoryBadge}
                    </span>
                  )}
                </div>

                <span className="ai-status-tag font-mono text-xs">
                  {isTyping ? 'Synthesizing...' : 'AAYUSH SYNAPSE VERIFIED'}
                </span>
              </div>

              <div className="ai-overview-body">
                {isTyping ? (
                  <div className="ai-typing-indicator font-mono text-xs text-muted">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span>Cross-referencing Aayush&apos;s project repositories &amp; technical telemetry...</span>
                  </div>
                ) : (
                  <div className="ai-rendered-answer text-slate-200">
                    {aiResponse?.text ? (
                      aiResponse.text.split('\n').map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <div key={idx} style={{ height: '6px' }} />;

                        // Headings
                        if (trimmed.startsWith('### ')) {
                          return (
                            <h4 key={idx} className="ai-subheading font-mono text-cyan">
                              {trimmed.replace('### ', '')}
                            </h4>
                          );
                        }

                        // Bullet points
                        const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ');
                        const content = isBullet ? trimmed.replace(/^[•-]\s*/, '') : trimmed;

                        // Parse **bold** parts
                        const parts = content.split(/(\*\*.*?\*\*)/g);
                        const parsed = parts.map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={pIdx} className="text-white font-bold">
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        });

                        if (isBullet) {
                          return (
                            <div key={idx} className="ai-bullet-item">
                              <span className="text-cyan">•</span>
                              <span>{parsed}</span>
                            </div>
                          );
                        }

                        return (
                          <p key={idx} className="ai-paragraph">
                            {parsed}
                          </p>
                        );
                      })
                    ) : null}
                  </div>
                )}
              </div>

              {/* Action Buttons from AI Synthesis */}
              {aiResponse?.actionButtons && aiResponse.actionButtons.length > 0 && (
                <div className="ai-action-buttons-row">
                  {aiResponse.actionButtons.map((btn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="btn-ai-action-chip font-mono"
                      onClick={() => handleActionButton(btn)}
                    >
                      <span>{btn.label}</span>
                      <ArrowRight size={12} className="text-cyan" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Matched Project Result Cards */}
            {matchingProjects.length > 0 && (
              <div className="google-projects-results">
                <div className="results-section-header font-mono text-xs text-muted">
                  MATCHING REPOSITORIES &amp; SYSTEMS ({matchingProjects.length})
                </div>

                <div className="projects-result-list">
                  {matchingProjects.map((p) => (
                    <div 
                      key={p.id} 
                      className="project-result-card"
                      onClick={() => {
                        sounds.playClick();
                        onOpenProject(p.id);
                      }}
                    >
                      <div className="result-card-top">
                        <div>
                          <div className="result-url-path font-mono text-xs text-muted">
                            aayush.dev/projects/{p.id}
                          </div>
                          <h3 className="result-title text-cyan hover:underline">
                            {p.title}
                          </h3>
                        </div>

                        <span className="result-badge font-mono text-xs">
                          {p.badge}
                        </span>
                      </div>

                      <p className="result-snippet text-slate-300 text-sm">
                        {p.summary}
                      </p>

                      <div className="result-tags-row">
                        {p.techStack.flatMap(ts => ts.items).slice(0, 4).map((tech, i) => (
                          <span key={i} className="result-tech-tag font-mono text-xs">
                            {tech}
                          </span>
                        ))}

                        <button
                          type="button"
                          className="btn-inspect-result font-mono text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            sounds.playClick();
                            onOpenProject(p.id);
                          }}
                        >
                          <span>INSPECT DOSSIER</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Bottom Quick Navigation Strip */}
            <div className="google-results-footer-nav font-mono">
              <button
                type="button"
                className="results-nav-pill"
                onClick={() => {
                  sounds.playClick();
                  onOpenResume();
                }}
              >
                <FileText size={13} className="text-cyan" />
                <span>VIEW FULL RESUME</span>
              </button>

              <button
                type="button"
                className="results-nav-pill"
                onClick={() => {
                  sounds.playClick();
                  onOpenContact();
                }}
              >
                <Mail size={13} className="text-emerald-400" />
                <span>CONTACT AAYUSH</span>
              </button>

              <button
                type="button"
                className="results-nav-pill"
                onClick={() => {
                  sounds.playZoneTransition();
                  onSwitchToWorkshop();
                }}
              >
                <Compass size={13} className="text-purple-400" />
                <span>2.5D INTERACTIVE WORKSHOP</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Discreet Ambient Animation Media Controls (Tucked in Bottom-Right Corner) */}
      <div className={`google-hero-bottom-controls font-mono ${hasSearched ? 'hidden-on-search' : ''}`}>
        <button
          type="button"
          className="btn-mini-media"
          onClick={handleTogglePlay}
          title={isPlaying ? "Pause background animation" : "Play background animation"}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        <button
          type="button"
          className="btn-mini-media"
          onClick={handleReplayVideo}
          title="Replay intro dissolution"
          aria-label="Replay intro animation"
        >
          <RotateCcw size={12} />
          <span>REPLAY INTRO</span>
        </button>
      </div>
    </div>
  );
};
