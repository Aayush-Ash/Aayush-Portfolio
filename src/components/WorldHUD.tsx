import React, { useState } from 'react';
import type { ZoneId, InteractableObject } from '../types/world';
import { ZONES } from '../data/worldMap';
import { sounds } from '../audio/soundEffects';
import {
  Compass,
  Volume2,
  VolumeX,
  Zap,
  Maximize2,
  Minimize2,
  Palette,
  X,
  Share2,
  HelpCircle,
  Mail,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  currentZone: ZoneId;
  nearestObj: InteractableObject | null;
  onInteract: () => void;
  onSwitchToExecutive: () => void;
  onTeleportToZone: (zoneId: ZoneId) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  isOverviewMode?: boolean;
  onToggleOverview?: () => void;
  crewmateColor?: string;
  onChangeCrewmateColor?: (color: string) => void;
  crewmateHat?: string;
  onChangeCrewmateHat?: (hat: string) => void;
  onOpenFAQ?: () => void;
  onOpenShare?: () => void;
  onOpenContact?: () => void;
}

const CREWMATE_COLORS = [
  { id: 'cyan', name: 'Cyan', hex: '#00D2FF' },
  { id: 'pink', name: 'Pink', hex: '#EC4899' },
  { id: 'red', name: 'Red', hex: '#EF4444' },
  { id: 'blue', name: 'Blue', hex: '#3B82F6' },
  { id: 'green', name: 'Green', hex: '#10B981' },
  { id: 'yellow', name: 'Yellow', hex: '#EAB308' },
  { id: 'orange', name: 'Orange', hex: '#F97316' },
  { id: 'white', name: 'White', hex: '#F8FAFC' },
  { id: 'black', name: 'Black', hex: '#334155' },
  { id: 'ghost', name: 'Ghost', hex: '#A5B4FC' }
];

const CREWMATE_HATS = [
  { id: 'none', name: 'No Hat' },
  { id: 'crown', name: 'Crown' },
  { id: 'sprout', name: 'Sprout' },
  { id: 'cap', name: 'Cap' },
  { id: 'tophat', name: 'Top Hat' },
  { id: 'headphones', name: 'Headphones' },
  { id: 'halo', name: 'Halo' },
  { id: 'bunny', name: 'Bunny Ears' },
  { id: 'goggles', name: 'Goggles' }
];

export const WorldHUD: React.FC<Props> = ({
  currentZone,
  nearestObj,
  onInteract,
  onSwitchToExecutive,
  onTeleportToZone,
  isMuted,
  onToggleSound,
  isOverviewMode = false,
  onToggleOverview,
  crewmateColor = 'cyan',
  onChangeCrewmateColor,
  crewmateHat = 'none',
  onChangeCrewmateHat,
  onOpenFAQ,
  onOpenShare,
  onOpenContact
}) => {
  const [showWardrobe, setShowWardrobe] = useState(false);
  const [minimapCollapsed, setMinimapCollapsed] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const currentZoneConfig = ZONES[currentZone] || ZONES.CENTRAL_HUB;

  const handleZoneClick = (zoneId: ZoneId) => {
    sounds.playZoneTransition();
    onTeleportToZone(zoneId);
  };

  return (
    <div className="world-hud-overlay pointer-events-none" role="region" aria-label="Space station cockpit telemetry overlay">
      {/* Top Left: 6-Sector Space Station Minimap */}
      <div className={`hud-minimap-card pointer-events-auto ${minimapCollapsed ? 'collapsed' : ''}`}>
        <div className="minimap-header">
          <div className="flex-row items-center gap-1.5">
            <Compass size={13} className="text-cyan animate-spin-slow" />
            <span className="font-mono text-xs text-white font-bold">STATION MINIMAP</span>
          </div>

          <div className="flex-row items-center gap-2">
            <span className="font-mono text-xs text-muted">6 SECTORS</span>
            <button
              type="button"
              className="minimap-collapse-toggle-btn"
              onClick={() => setMinimapCollapsed(prev => !prev)}
              title={minimapCollapsed ? "Expand minimap" : "Collapse minimap"}
              aria-label={minimapCollapsed ? "Expand minimap" : "Collapse minimap"}
            >
              {minimapCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </div>

        {!minimapCollapsed && (
          <div className="minimap-grid-6">
            {/* Top Row: AI LAB, BUILD BAY, HQ */}
            <div className="minimap-row">
              <button
                type="button"
                className={`minimap-zone-node ${currentZone === 'AI_LAB' ? 'active' : ''}`}
                onClick={() => handleZoneClick('AI_LAB')}
                title="Fast-travel to AI LAB (Sector 01)"
                style={{ borderColor: currentZone === 'AI_LAB' ? '#C084FC' : undefined }}
              >
                <span>🧠 AI LAB</span>
              </button>

              <button
                type="button"
                className={`minimap-zone-node ${currentZone === 'BUILD_BAY' ? 'active' : ''}`}
                onClick={() => handleZoneClick('BUILD_BAY')}
                title="Fast-travel to BUILD BAY (Sector 02)"
                style={{ borderColor: currentZone === 'BUILD_BAY' ? '#F472B6' : undefined }}
              >
                <span>💻 BUILD</span>
              </button>

              <button
                type="button"
                className={`minimap-zone-node ${currentZone === 'HQ' ? 'active' : ''}`}
                onClick={() => handleZoneClick('HQ')}
                title="Fast-travel to AAYUSH HQ (Sector 03)"
                style={{ borderColor: currentZone === 'HQ' ? '#F59E0B' : undefined }}
              >
                <span>⚡ HQ</span>
              </button>
            </div>

            {/* Central Concourse Connector */}
            <button
              type="button"
              className={`minimap-zone-node hub-wide ${currentZone === 'CENTRAL_HUB' ? 'active' : ''}`}
              onClick={() => handleZoneClick('CENTRAL_HUB')}
              title="Fast-travel to Central Concourse"
            >
              <span>🛰️ TRANSIT CONCOURSE // HUB</span>
            </button>

            {/* Bottom Row: DATA CORE, OBSERVATION DECK, DOCK */}
            <div className="minimap-row">
              <button
                type="button"
                className={`minimap-zone-node ${currentZone === 'DATA_CORE' ? 'active' : ''}`}
                onClick={() => handleZoneClick('DATA_CORE')}
                title="Fast-travel to DATA CORE (Sector 04)"
                style={{ borderColor: currentZone === 'DATA_CORE' ? '#10B981' : undefined }}
              >
                <span>📊 DATA</span>
              </button>

              <button
                type="button"
                className={`minimap-zone-node ${currentZone === 'OBSERVATION_DECK' ? 'active' : ''}`}
                onClick={() => handleZoneClick('OBSERVATION_DECK')}
                title="Fast-travel to OBSERVATION DECK (Sector 05)"
                style={{ borderColor: currentZone === 'OBSERVATION_DECK' ? '#38BDF8' : undefined }}
              >
                <span>🌌 OBSERV</span>
              </button>

              <button
                type="button"
                className={`minimap-zone-node ${currentZone === 'DOCK' ? 'active' : ''}`}
                onClick={() => handleZoneClick('DOCK')}
                title="Fast-travel to DOCK (Sector 06)"
                style={{ borderColor: currentZone === 'DOCK' ? '#F97316' : undefined }}
              >
                <span>🚀 DOCK</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Top Center: Active Zone Telemetry Banner */}
      <div className="hud-zone-banner">
        <div className="banner-inner">
          <div className="flex-row items-center justify-center gap-2">
            <div className="status-dot-pulse online" style={{ backgroundColor: currentZoneConfig.themeColor }} />
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
        {/* Contact Comms Uplink CTA */}
        {onOpenContact && (
          <button
            type="button"
            className="hud-action-btn hud-contact-btn font-mono"
            onClick={() => {
              sounds.playClick();
              onOpenContact();
            }}
            title="Open direct comms transmitter"
          >
            <Mail size={14} className="text-cyan" />
            <span className="text-xs">CONTACT</span>
          </button>
        )}

        {/* FAQ Quick Trigger */}
        {onOpenFAQ && (
          <button
            type="button"
            className="hud-action-btn font-mono"
            onClick={() => {
              sounds.playClick();
              onOpenFAQ();
            }}
            title="Open Frequently Asked Questions"
          >
            <HelpCircle size={14} className="text-cyan" />
            <span className="text-xs">FAQ</span>
          </button>
        )}

        {/* Social Share Trigger */}
        {onOpenShare && (
          <button
            type="button"
            className="hud-action-btn font-mono"
            onClick={() => {
              sounds.playClick();
              onOpenShare();
            }}
            title="Share portfolio"
            aria-label="Share this portfolio"
          >
            <Share2 size={14} className="text-cyan" />
            <span className="text-xs">SHARE</span>
          </button>
        )}

        {/* Full Station Collage View Toggle */}
        {onToggleOverview && (
          <button
            type="button"
            className={`hud-action-btn ${isOverviewMode ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick();
              onToggleOverview();
            }}
            title={isOverviewMode ? "Return to Crewmate walk mode" : "View Full Space Station Collage (M)"}
          >
            {isOverviewMode ? <Minimize2 size={14} className="text-cyan" /> : <Maximize2 size={14} className="text-cyan" />}
            <span className="font-mono text-xs">{isOverviewMode ? 'CLOSE' : 'STATION'}</span>
          </button>
        )}

        {/* Crewmate Wardrobe / Customizer */}
        <button
          type="button"
          className="hud-action-btn"
          onClick={() => {
            sounds.playClick();
            setShowWardrobe(prev => !prev);
          }}
          title="Customize Crewmate suit & hat"
        >
          <Palette size={14} className="text-pink-400" />
          <span className="font-mono text-xs">SUIT</span>
        </button>

        {/* Executive View */}
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
          <span className="font-mono text-xs exec-text">EXECUTIVE</span>
        </button>

        {/* Sound toggle */}
        <button
          type="button"
          className="hud-action-btn icon-only"
          onClick={onToggleSound}
          title={isMuted ? "Unmute audio" : "Mute audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* Crewmate Wardrobe Customizer Drawer */}
      {showWardrobe && (
        <div className="wardrobe-drawer pointer-events-auto" role="dialog" aria-modal="true" aria-label="Crewmate Wardrobe">
          <div className="wardrobe-header">
            <div className="flex-row items-center gap-2">
              <Palette size={16} className="text-pink-400" />
              <span className="font-bold text-sm text-white">CREWMATE WARDROBE</span>
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowWardrobe(false)}
              aria-label="Close Wardrobe"
            >
              <X size={16} />
            </button>
          </div>

          {/* Color Selector */}
          <div className="wardrobe-section">
            <span className="text-xs font-mono text-muted mb-2 block">SUIT COLOR:</span>
            <div className="color-swatches-grid">
              {CREWMATE_COLORS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  className={`color-swatch-btn ${crewmateColor === c.id ? 'active' : ''}`}
                  onClick={() => {
                    sounds.playClick();
                    if (onChangeCrewmateColor) onChangeCrewmateColor(c.id);
                  }}
                  title={c.name}
                  aria-label={`Select ${c.name} suit color`}
                  style={{ backgroundColor: c.hex }}
                >
                  {crewmateColor === c.id && <span className="swatch-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Hat Selector */}
          <div className="wardrobe-section mt-3">
            <span className="text-xs font-mono text-muted mb-2 block">HEADWEAR / ACCESSORY:</span>
            <div className="hat-chips-grid">
              {CREWMATE_HATS.map(h => (
                <button
                  key={h.id}
                  type="button"
                  className={`hat-chip-btn ${crewmateHat === h.id ? 'active' : ''}`}
                  onClick={() => {
                    sounds.playClick();
                    if (onChangeCrewmateHat) onChangeCrewmateHat(h.id);
                  }}
                >
                  {h.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Center: Proximity Action Prompt */}
      {nearestObj && (
        <div className="hud-bottom-interact pointer-events-auto">
          <button
            type="button"
            className="interact-action-card"
            onClick={onInteract}
            aria-label={`Interact with ${nearestObj.name}`}
          >
            <div className="interact-key-badge">
              <span>E</span>
            </div>
            <div className="interact-info">
              <span className="interact-title">{nearestObj.name}</span>
              <span className="interact-sub">{nearestObj.subTitle}</span>
            </div>
          </button>
        </div>
      )}

      {/* Bottom Left: Navigation Keys Legend */}
      <div className="hud-bottom-left-legend pointer-events-auto">
        <span className="legend-chip">WASD / ARROWS: Move</span>
        <span className="legend-chip">CLICK: Walk To</span>
        <span className="legend-chip">E: Interact</span>
        <span className="legend-chip">SPACE: AI Drone</span>
        <span className="legend-chip">M: Station View</span>
      </div>
    </div>
  );
};
