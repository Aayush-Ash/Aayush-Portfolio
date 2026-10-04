import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { ArrowRight, Zap, Volume2, VolumeX, Mail, HelpCircle, ShieldCheck, Share2 } from 'lucide-react';

interface Props {
  onEnterWorkshop: () => void;
  onSkipToExecutive: () => void;
  onOpenContact: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onOpenFAQ: () => void;
  onOpenShare: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const OpeningScreen: React.FC<Props> = ({
  onEnterWorkshop,
  onSkipToExecutive,
  onOpenContact,
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenFAQ,
  onOpenShare,
  isMuted,
  onToggleSound
}) => {
  const [isWarping, setIsWarping] = useState(false);

  const handleEnter = () => {
    sounds.playZoneTransition();
    sounds.startAmbientHum();
    setIsWarping(true);
    setTimeout(() => {
      onEnterWorkshop();
    }, 900);
  };

  const handleSkip = () => {
    sounds.playClick();
    onSkipToExecutive();
  };

  return (
    <div className={`opening-screen-root ${isWarping ? 'warp-active' : ''}`} role="main">
      {/* Background Graphic with descriptive accessible role */}
      <div 
        className="opening-backdrop-image"
        style={{ backgroundImage: `url('/workshop_backdrop.jpg')` }}
        role="img"
        aria-label="High-tech space station engineering laboratory backdrop with glowing terminals and servers"
      />
      <div className="opening-vignette" aria-hidden="true" />
      <div className="opening-scanlines" aria-hidden="true" />

      {/* Top Telemetry Header */}
      <header className="opening-top-bar">
        <div className="flex-row items-center gap-2">
          <div className="status-dot-pulse online" />
          <span className="font-mono text-xs text-cyan tracking-wider">
            FACILITY STATUS: <strong>OPERATIONAL</strong>
          </span>
        </div>

        <div className="flex-row items-center gap-3">
          <button
            type="button"
            className="opening-aux-btn font-mono text-xs"
            onClick={() => {
              sounds.playClick();
              onOpenShare();
            }}
            title="Share portfolio"
            aria-label="Share this portfolio"
          >
            <Share2 size={13} className="text-cyan" />
            <span className="hidden-mobile">SHARE</span>
          </button>

          <button
            type="button"
            className="opening-aux-btn font-mono text-xs"
            onClick={() => {
              sounds.playClick();
              onOpenFAQ();
            }}
            title="Open FAQ"
          >
            <HelpCircle size={13} className="text-cyan" />
            <span className="hidden-mobile">FAQ</span>
          </button>

          <button
            type="button"
            className="opening-sound-btn"
            onClick={onToggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span className="font-mono text-xs">{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>

          <button
            type="button"
            className="opening-skip-btn font-mono"
            onClick={handleSkip}
            title="Jump directly to recruiter executive briefing"
          >
            <Zap size={14} className="text-amber-400" />
            <span>EXECUTIVE VIEW</span>
          </button>
        </div>
      </header>

      {/* Center Cinematic Gateway */}
      <div className="opening-center-content">
        {/* Workshop Insignia */}
        <div className="opening-insignia">
          <div className="insignia-line" />
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            AUTONOMOUS ENGINEERING FACILITY // LAB 01
          </span>
          <div className="insignia-line" />
        </div>

        {/* Name & Titles */}
        <h1 className="opening-name font-mono">AAYUSH KUMAR</h1>

        <div className="opening-subtitles font-mono">
          <div className="sub-role text-cyan">AGENTIC AI DEVELOPER</div>
          <div className="sub-divider">•</div>
          <div className="sub-role text-slate-300">FULL-STACK SYSTEMS ARCHITECT</div>
        </div>

        {/* Primary Clear CTAs Wrap */}
        <div className="opening-cta-wrap">
          <button
            type="button"
            className="btn-enter-workshop font-mono"
            onClick={handleEnter}
            aria-label="Enter 2.5D interactive space station workshop"
          >
            <span className="enter-bracket">[</span>
            <span className="enter-text">ENTER 2.5D WORKSHOP</span>
            <span className="enter-bracket">]</span>
            <ArrowRight size={16} className="enter-arrow" />
          </button>

          <button
            type="button"
            className="btn-opening-contact font-mono"
            onClick={() => {
              sounds.playClick();
              onOpenContact();
            }}
          >
            <Mail size={15} />
            <span>GET IN TOUCH // TRANSMIT DISPATCH</span>
          </button>
        </div>

        {/* Diagnostics Readout Block */}
        <div className="opening-diagnostics-box font-mono" aria-label="System diagnostic telemetry">
          <div className="diag-row">
            <span className="diag-label">SYSTEM STATUS:</span>
            <span className="diag-val online">● ONLINE</span>
          </div>
          <div className="diag-row">
            <span className="diag-label">AGENT CORE:</span>
            <span className="diag-val ready">● READY</span>
          </div>
          <div className="diag-row">
            <span className="diag-label">BUILD SYSTEM:</span>
            <span className="diag-val online">● ONLINE</span>
          </div>
          <div className="diag-row">
            <span className="diag-label">LATENCY:</span>
            <span className="diag-val text-muted">12ms // SECTOR 01-06</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note with Legal and Navigation Links */}
      <footer className="opening-bottom-bar font-mono text-xs">
        <div className="opening-tip-text text-muted">
          <span>TIP: USE W/A/S/D OR ARROWS TO EXPLORE • APPROACH CONSOLES &amp; PRESS [E]</span>
        </div>

        <div className="opening-legal-links flex-row items-center gap-3">
          <button
            type="button"
            className="opening-footer-link"
            onClick={() => {
              sounds.playClick();
              onOpenPrivacyPolicy();
            }}
          >
            <ShieldCheck size={12} className="text-cyan inline mr-1" />
            <span>PRIVACY</span>
          </button>

          <span>•</span>

          <button
            type="button"
            className="opening-footer-link"
            onClick={() => {
              sounds.playClick();
              onOpenTerms();
            }}
          >
            <span>TERMS</span>
          </button>

          <span>•</span>

          <button
            type="button"
            className="opening-footer-link"
            onClick={() => {
              sounds.playClick();
              onOpenFAQ();
            }}
          >
            <span>FAQ</span>
          </button>

          <span>•</span>

          <span className="text-muted">© 2026 AAYUSH KUMAR</span>
        </div>
      </footer>
    </div>
  );
};
