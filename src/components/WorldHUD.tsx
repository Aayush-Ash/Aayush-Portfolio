import React from 'react';
import type { ZoneId, InteractableObject } from '../types/world';
import { ZONES } from '../data/worldMap';
import { sounds } from '../audio/soundEffects';
import { 
  Bot, 
  Compass, 
  Volume2, 
  VolumeX, 
  Zap, 
  ChevronRight
} from 'lucide-react';

interface Props {
  currentZone: ZoneId;
  nearestObj: InteractableObject | null;
  onInteract: () => void;
  onOpenCompanion: () => void;
  onSwitchToExecutive: () => void;
  onTeleportToZone: (zoneId: ZoneId) => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const WorldHUD: React.FC<Props> = ({
  currentZone,
  nearestObj,
  onInteract,
  onOpenCompanion,
  onSwitchToExecutive,
  onTeleportToZone,
  isMuted,
  onToggleSound
}) => {
  const currentZoneConfig = ZONES[currentZone] || ZONES.CENTRAL_HUB;

  const handleZoneClick = (zoneId: ZoneId) => {
    sounds.playZoneTransition();
    onTeleportToZone(zoneId);
  };

  return (
    <div className="world-hud-overlay pointer-events-none">
      {/* Top Left: Interactive Tactical Minimap */}
      <div className="hud-minimap-card pointer-events-auto">
        <div className="minimap-header">
          <div className="flex-row items-center gap-1.5">
            <Compass size={13} className="text-cyan animate-spin-slow" />
            <span className="font-mono text-xs text-white font-bold">SECTOR MINIMAP</span>
          </div>
          <span className="font-mono text-xs text-muted">FAST-TRAVEL</span>
        </div>

        {/* 2D Schematic Quadrant Grid */}
        <div className="minimap-grid">
          {/* North: AI LAB */}
          <button
            type="button"
            className={`minimap-zone-node north ${currentZone === 'AI_LAB' ? 'active' : ''}`}
            onClick={() => handleZoneClick('AI_LAB')}
            title="Fast-travel to AI LAB"
          >
            <span>🧠 AI LAB</span>
          </button>

          <div className="minimap-middle-row">
            {/* West: BUILD BAY */}
            <button
              type="button"
              className={`minimap-zone-node west ${currentZone === 'BUILD_BAY' ? 'active' : ''}`}
              onClick={() => handleZoneClick('BUILD_BAY')}
              title="Fast-travel to BUILD BAY"
            >
              <span>💻 BUILD</span>
            </button>

            {/* Center: HUB */}
            <button
              type="button"
              className={`minimap-zone-node hub ${currentZone === 'CENTRAL_HUB' ? 'active' : ''}`}
              onClick={() => handleZoneClick('CENTRAL_HUB')}
              title="Fast-travel to CENTRAL ROTUNDA"
            >
              <span>HUB</span>
            </button>

            {/* East: HQ */}
            <button
              type="button"
              className={`minimap-zone-node east ${currentZone === 'HQ' ? 'active' : ''}`}
              onClick={() => handleZoneClick('HQ')}
              title="Fast-travel to AAYUSH HQ"
            >
              <span>⚡ HQ</span>
            </button>
          </div>

          {/* South: DATA CORE */}
          <button
            type="button"
            className={`minimap-zone-node south ${currentZone === 'DATA_CORE' ? 'active' : ''}`}
            onClick={() => handleZoneClick('DATA_CORE')}
            title="Fast-travel to DATA CORE"
          >
            <span>📊 DATA</span>
          </button>
        </div>
      </div>

      {/* Top Center: Active Zone Telemetry Banner */}
      <div className="hud-zone-banner">
        <div className="banner-inner">
          <div className="flex-row items-center justify-center gap-2">
            <div className="status-dot-pulse online" />
            <span className="font-mono font-bold text-sm tracking-wider" style={{ color: currentZoneConfig.themeColor }}>
              {currentZoneConfig.title}
            </span>
          </div>
          <p className="font-mono text-xs text-muted text-center mt-0.5">
            {currentZoneConfig.tagline}
          </p>
        </div>
      </div>

      {/* Top Right: System Quick Controls */}
      <div className="hud-top-right-group pointer-events-auto">
        <button
          type="button"
          className="hud-action-btn companion-btn"
          onClick={() => {
            sounds.playClick();
            onOpenCompanion();
          }}
          title="Open Workshop AI Companion"
        >
          <Bot size={15} className="text-cyan animate-bounce-subtle" />
          <span className="font-mono text-xs">WORKSHOP AI</span>
        </button>

        <button
          type="button"
          className="hud-action-btn exec-toggle-btn"
          onClick={() => {
            sounds.playClick();
            onSwitchToExecutive();
          }}
          title="Switch to conventional executive portfolio view"
        >
          <Zap size={14} className="text-amber-400" />
          <span className="font-mono text-xs">EXECUTIVE VIEW</span>
        </button>

        <button
          type="button"
          className="hud-action-btn icon-only"
          onClick={onToggleSound}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* Bottom Center: Proximity Interact Prompt */}
      {nearestObj && (
        <div className="hud-interact-prompt pointer-events-auto animate-fade-in">
          <button
            type="button"
            className="interact-key-pill"
            onClick={onInteract}
          >
            <span className="key-cap font-mono">E</span>
            <div className="interact-labels">
              <span className="interact-action font-mono">INTERACT WITH TERMINAL</span>
              <span className="interact-target font-mono text-white">{nearestObj.name}</span>
            </div>
            <ChevronRight size={16} className="interact-arrow" />
          </button>
        </div>
      )}

      {/* Bottom Left: Desktop Controls Guide */}
      <div className="hud-controls-helper font-mono text-xs text-muted">
        <span>WASD / ARROWS: Move</span>
        <span>•</span>
        <span>CLICK FLOOR: Walk</span>
        <span>•</span>
        <span>E: Interact</span>
        <span>•</span>
        <span>SPACE: Workshop AI</span>
      </div>
    </div>
  );
};
