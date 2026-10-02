import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { Cpu, Terminal, ArrowRight, ShieldCheck, Zap, Volume2, VolumeX } from 'lucide-react';

interface Props {
  onEnterWorkshop: () => void;
  onSkipToExecutive: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const OpeningScreen: React.FC<Props> = ({
  onEnterWorkshop,
  onSkipToExecutive,
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
    <div className={`opening-screen-root ${isWarping ? 'warp-active' : ''}`}>
      {/* Background Graphic */}
      <div 
        className="opening-backdrop-image"
        style={{ backgroundImage: `url('/workshop_backdrop.jpg')` }}
      />
      <div className="opening-vignette" />
      <div className="opening-scanlines" />

      {/* Top Telemetry Header */}
      <div className="opening-top-bar">
        <div className="flex-row items-center gap-2">
          <div className="status-dot-pulse online" />
          <span className="font-mono text-xs text-cyan tracking-wider">
            FACILITY STATUS: <strong>OPERATIONAL</strong>
          </span>
        </div>

        <div className="flex-row items-center gap-4">
          <button
            type="button"
            className="opening-sound-btn"
            onClick={onToggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span className="font-mono text-xs">{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>

          <button
            type="button"
            className="opening-skip-btn"
            onClick={handleSkip}
          >
            <Zap size={14} className="text-amber-400" />
            <span>SKIP EXPLORATION // EXECUTIVE VIEW</span>
          </button>
        </div>
      </div>

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
        <h1 className="opening-name font-mono">AAYUSH</h1>

        <div className="opening-subtitles font-mono">
          <div className="sub-role text-cyan">AGENTIC AI DEVELOPER</div>
          <div className="sub-divider">•</div>
          <div className="sub-role text-slate-300">FULL-STACK ENGINEER</div>
        </div>

        {/* Enter Button */}
        <div className="opening-cta-wrap">
          <button
            type="button"
            className="btn-enter-workshop font-mono"
            onClick={handleEnter}
          >
            <span className="enter-bracket">[</span>
            <span className="enter-text">ENTER WORKSHOP</span>
            <span className="enter-bracket">]</span>
            <ArrowRight size={16} className="enter-arrow" />
          </button>
        </div>

        {/* Diagnostics Readout Block */}
        <div className="opening-diagnostics-box font-mono">
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
            <span className="diag-val text-muted">12ms // SECTOR 01-04</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="opening-bottom-bar font-mono text-xs text-muted">
        <span>TIP: USE W/A/S/D OR ARROWS TO EXPLORE • APPROACH TERMINALS &amp; PRESS [E]</span>
        <span>AAYUSH KUMAR © 2026 // ALL SYSTEMS SECURE</span>
      </div>
    </div>
  );
};
