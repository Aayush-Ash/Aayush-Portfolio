import React from 'react';
import type { EasterEggData } from '../types/world';
import { sounds } from '../audio/soundEffects';
import { X, Terminal, FileCode, PenTool, Coffee, Server, Copy, Check } from 'lucide-react';

interface Props {
  data: EasterEggData;
  onClose: () => void;
}

export const EasterEggModal: React.FC<Props> = ({ data, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    sounds.playClick();
    navigator.clipboard.writeText(data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    switch (data.type) {
      case 'blueprint': return <FileCode size={20} className="text-cyan" />;
      case 'whiteboard': return <PenTool size={20} className="text-amber-400" />;
      case 'git_log': return <Terminal size={20} className="text-emerald" />;
      case 'coffee': return <Coffee size={20} className="text-amber-500" />;
      case 'server_rack': return <Server size={20} className="text-cyan" />;
      default: return <Terminal size={20} className="text-cyan" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel easter-egg-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            {getIcon()}
            <div>
              <span className="modal-kicker font-mono text-cyan">WORKSHOP ARTIFACT // {data.type.toUpperCase()}</span>
              <h2 className="modal-title font-mono">{data.title}</h2>
            </div>
          </div>

          <div className="flex-row items-center gap-2">
            <button
              type="button"
              className="modal-secondary-btn"
              onClick={handleCopy}
              title="Copy Content"
            >
              {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className={`artifact-content-display ${data.type}`}>
            <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {data.content}
            </pre>
          </div>
        </div>

        <div className="modal-footer">
          <span className="text-xs text-muted font-mono">
            PRESS [ESC] OR CLICK OUTSIDE TO RETURN TO THE WORKSHOP FLOOR
          </span>
        </div>
      </div>
    </div>
  );
};
