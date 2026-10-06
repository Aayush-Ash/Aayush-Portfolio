import React, { useRef, useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface Props {
  onMoveStart: (dir: 'up' | 'down' | 'left' | 'right') => void;
  onMoveEnd: () => void;
  onInteract: () => void;
  hasInteractable: boolean;
  nearestObjName?: string;
}

export const MobileControls: React.FC<Props> = ({
  onMoveStart,
  onMoveEnd,
  onInteract,
  hasInteractable,
  nearestObjName
}) => {
  const [activeDir, setActiveDir] = useState<string | null>(null);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerDown = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }
    setActiveDir(dir);
    onMoveStart(dir);
  };

  const handlePointerUp = () => {
    // Keep brief movement for 220ms if it was a quick tap so crewmate takes a visible step
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    tapTimeoutRef.current = setTimeout(() => {
      setActiveDir(null);
      onMoveEnd();
      tapTimeoutRef.current = null;
    }, 220);
  };

  const handlePointerCancel = () => {
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }
    setActiveDir(null);
    onMoveEnd();
  };

  return (
    <div className="mobile-controls-root" role="group" aria-label="Touch Navigation Controls">
      {/* Virtual D-Pad on Left */}
      <div className="mobile-dpad">
        <button
          type="button"
          className={`dpad-btn dpad-up ${activeDir === 'up' ? 'pressed' : ''}`}
          onPointerDown={(e) => {
            e.preventDefault();
            handlePointerDown('up');
          }}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerCancel}
          onPointerCancel={handlePointerCancel}
          aria-label="Move Up"
        >
          <ChevronUp size={22} />
        </button>

        <div className="dpad-middle">
          <button
            type="button"
            className={`dpad-btn dpad-left ${activeDir === 'left' ? 'pressed' : ''}`}
            onPointerDown={(e) => {
              e.preventDefault();
              handlePointerDown('left');
            }}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerCancel}
            onPointerCancel={handlePointerCancel}
            aria-label="Move Left"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="dpad-center" aria-hidden="true" />

          <button
            type="button"
            className={`dpad-btn dpad-right ${activeDir === 'right' ? 'pressed' : ''}`}
            onPointerDown={(e) => {
              e.preventDefault();
              handlePointerDown('right');
            }}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerCancel}
            onPointerCancel={handlePointerCancel}
            aria-label="Move Right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <button
          type="button"
          className={`dpad-btn dpad-down ${activeDir === 'down' ? 'pressed' : ''}`}
          onPointerDown={(e) => {
            e.preventDefault();
            handlePointerDown('down');
          }}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerCancel}
          onPointerCancel={handlePointerCancel}
          aria-label="Move Down"
        >
          <ChevronDown size={22} />
        </button>
      </div>

      {/* Action / Interact Button on Right */}
      <div className="mobile-action-wrap">
        <button
          type="button"
          className={`mobile-action-btn ${hasInteractable ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            sounds.playClick();
            onInteract();
          }}
          aria-label={hasInteractable ? `Interact with ${nearestObjName || 'console'}` : 'Interact button'}
        >
          <div className="flex-row items-center gap-1">
            <Zap size={14} className={hasInteractable ? 'text-amber-300 animate-pulse' : 'text-slate-400'} />
            <span className="font-mono font-bold text-xs">
              {hasInteractable ? 'INTERACT' : 'ACTION'}
            </span>
          </div>
          <span className="font-mono text-[10px] text-cyan tracking-wider">
            {hasInteractable && nearestObjName ? nearestObjName.slice(0, 16) : '[E]'}
          </span>
        </button>
      </div>
    </div>
  );
};

