import React, { useState, useRef } from 'react';
import { GoogleSearchHero } from './GoogleSearchHero';
import { WorkModal } from './WorkModal';
import { RESUME_DATA } from '../data/resumeData';
import { sounds } from '../audio/soundEffects';
import { 
  Compass, 
  Menu, 
  X, 
  ShieldCheck, 
  Scale, 
  HelpCircle 
} from 'lucide-react';
import './ExecutivePortfolio.css';

interface Props {
  onReturnToWorkshop: () => void;
  onOpenProject: (projectId: string) => void;
  onOpenResume: (initialSection?: 'skills' | 'experience' | 'overview') => void;
  onOpenContact: () => void;
  onOpenAbout?: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onOpenFAQ: () => void;
  onOpenShare: () => void;
  onOpenCookieSettings: () => void;
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export const ExecutivePortfolio: React.FC<Props> = ({
  onReturnToWorkshop,
  onOpenProject,
  onOpenResume,
  onOpenContact,
  onOpenAbout,
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenFAQ,
  onOpenShare,
  onOpenCookieSettings,
  isMuted = false,
  onToggleSound
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    action();
  };

  const handleToggleSound = () => {
    sounds.playClick();
    if (onToggleSound) {
      onToggleSound();
    } else {
      sounds.setMuted(!isMuted);
    }
  };

  return (
    <div ref={rootRef} className="executive-view-root" id="main-content">
      {/* Sleek, Futuristic Navbar (Styled precisely after Image 2 & Image 3) */}
      <header className="exec-nav-header">
        <div className="exec-nav-inner">
          {/* Brand Left: Glowing Stylized 'A' Logo (Image 3) + AAYUSH KUMAR */}
          <button 
            type="button"
            className="exec-brand-link" 
            onClick={() => handleNavClick(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            })}
            title="Aayush Kumar — Home"
          >
            <div className="exec-brand-logo-wrap">
              <img
                src="/brand-logo-hires.png"
                alt="Aayush Kumar — Agentic AI Developer &amp; Systems Architect Monogram Logo"
                className="exec-brand-logo-img"
                loading="eager"
                decoding="async"
              />
            </div>
            <span className="exec-brand-title">
              AAYUSH KUMAR
            </span>
          </button>

          {/* Right Navigation Group: WORK, SKILLS, EXPERIENCE, ABOUT, CONTACT, 2.5D WORKSHOP & EQUALIZER */}
          <div className="exec-nav-right">
            <nav className="exec-nav-links-list" aria-label="Main Navigation">
              {/* 1. WORK */}
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => setShowWorkModal(true))}
                title="View flagship systems & engineering work"
              >
                WORK
              </button>

              {/* 2. SKILLS */}
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => onOpenResume('skills'))}
                title="View technical competencies and skills matrix"
              >
                SKILLS
              </button>

              {/* 3. EXPERIENCE */}
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => onOpenResume('experience'))}
                title="View engineering experience & trajectory"
              >
                EXPERIENCE
              </button>

              {/* 4. ABOUT */}
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => {
                  if (onOpenAbout) onOpenAbout();
                })}
                title="View engineering profile & philosophy"
              >
                ABOUT
              </button>

              {/* 5. CONTACT */}
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(onOpenContact)}
                title="Initiate direct contact & inquiries"
              >
                CONTACT
              </button>

              {/* 6. 2.5D WORKSHOP (Access to interactive station) */}
              <button
                type="button"
                className="btn-nav-workshop font-mono"
                onClick={() => handleNavClick(() => {
                  sounds.playZoneTransition();
                  onReturnToWorkshop();
                })}
                title="Enter 2.5D Digital Workshop World"
              >
                <Compass size={13} className="animate-spin-slow" />
                <span>2.5D WORKSHOP</span>
              </button>
            </nav>

            {/* 7. Sound Equalizer Visualizer Toggle (Image 2 style vertical audio bars) */}
            <button
              type="button"
              className={`nav-equalizer-btn ${isMuted ? 'muted' : 'playing'}`}
              onClick={handleToggleSound}
              title={isMuted ? 'Sound muted — Click to enable sci-fi audio' : 'Sound active — Click to mute'}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              <span className="equalizer-bar bar-1" />
              <span className="equalizer-bar bar-2" />
              <span className="equalizer-bar bar-3" />
              <span className="equalizer-bar bar-4" />
              <span className="equalizer-bar bar-5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(prev => !prev);
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <>
            <div
              className="nav-mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="nav-mobile-drawer" role="navigation" aria-label="Mobile Navigation Drawer">
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => setShowWorkModal(true))}
              >
                WORK
              </button>
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => onOpenResume('skills'))}
              >
                SKILLS
              </button>
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => onOpenResume('experience'))}
              >
                EXPERIENCE
              </button>
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(() => {
                  if (onOpenAbout) onOpenAbout();
                })}
              >
                ABOUT
              </button>
              <button
                type="button"
                className="exec-nav-item"
                onClick={() => handleNavClick(onOpenContact)}
              >
                CONTACT
              </button>
              <button
                type="button"
                className="btn-nav-workshop font-mono"
                onClick={() => handleNavClick(() => {
                  sounds.playZoneTransition();
                  onReturnToWorkshop();
                })}
              >
                <Compass size={13} className="animate-spin-slow" />
                <span>2.5D WORKSHOP</span>
              </button>
            </div>
          </>
        )}
      </header>

      {/* Main Neural Search & Telemetry Console */}
      <GoogleSearchHero
        onOpenProject={onOpenProject}
        onOpenResume={() => onOpenResume('overview')}
        onOpenContact={onOpenContact}
        onSwitchToWorkshop={onReturnToWorkshop}
        onOpenWork={() => setShowWorkModal(true)}
      />

      {/* Flagship Work Showcase Modal (Triggered by WORK in Navbar) */}
      {showWorkModal && (
        <WorkModal
          onClose={() => setShowWorkModal(false)}
          onOpenProject={onOpenProject}
          onOpenContact={onOpenContact}
        />
      )}

      {/* Subtle Minimalist Footer Bar */}
      <footer className="google-homepage-footer font-mono">
        <div className="google-footer-left">
          <span>INDIA</span>
          <span className="text-muted">•</span>
          <span>AUTONOMOUS AGENTS &amp; FULL-STACK SYSTEMS</span>
        </div>

        <div className="google-footer-right">
          <button type="button" onClick={onOpenFAQ} className="footer-link-btn">
            <HelpCircle size={11} />
            <span>FAQ</span>
          </button>
          <button type="button" onClick={onOpenPrivacyPolicy} className="footer-link-btn">
            <ShieldCheck size={11} />
            <span>PRIVACY</span>
          </button>
          <button type="button" onClick={onOpenTerms} className="footer-link-btn">
            <Scale size={11} />
            <span>TERMS</span>
          </button>
          <button type="button" onClick={onOpenCookieSettings} className="footer-link-btn">
            <span>SETTINGS</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
