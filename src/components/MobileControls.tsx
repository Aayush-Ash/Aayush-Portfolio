import React from 'react';
import { sounds } from '../audio/soundEffects';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Props {
  onMove: (dir: 'up' | 'down' | 'left' | 'right') => void;
  onInteract: () => void;
  hasInteractable: boolean;
}

export const MobileControls: React.FC<Props> = ({ onMove, onInteract, hasInteractable }) => {
  return (
    <div className="mobile-controls-root">
      {/* D-Pad on Left */}
      <div className="mobile-dpad">
        <button
          type="button"
          className="dpad-btn dpad-up"
          onTouchStart={() => onMove('up')}
          onClick={() => onMove('up')}
          aria-label="Move Up"
        >
          <ChevronUp size={20} />
        </button>
        <div className="dpad-middle">
          <button
            type="button"
            className="dpad-btn dpad-left"
            onTouchStart={() => onMove('left')}
            onClick={() => onMove('left')}
            aria-label="Move Left"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="dpad-center" />
          <button
            type="button"
            className="dpad-btn dpad-right"
            onTouchStart={() => onMove('right')}
            onClick={() => onMove('right')}
            aria-label="Move Right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          type="button"
          className="dpad-btn dpad-down"
          onTouchStart={() => onMove('down')}
          onClick={() => onMove('down')}
          aria-label="Move Down"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Action Button on Right */}
      <div className="mobile-action-wrap">
        <button
          type="button"
          className={`mobile-action-btn ${hasInteractable ? 'active' : ''}`}
          onClick={() => {
            sounds.playClick();
            onInteract();
          }}
          aria-label="Interact"
        >
          <span className="font-mono font-bold text-sm">INTERACT</span>
          <span className="font-mono text-xs text-cyan">[E]</span>
        </button>
      </div>
    </div>
  );
};
