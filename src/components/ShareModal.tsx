import React, { useState } from 'react';
import { Share2, Copy, Check, X, ExternalLink } from 'lucide-react';
import { sounds } from '../audio/soundEffects';
import { trackSocialShare } from '../utils/analytics';
import { LinkedinIcon } from './Icons';

interface Props {
  onClose: () => void;
}

export const ShareModal: React.FC<Props> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aayush-portfolio.vercel.app';
  const shareTitle = 'Aayush Kumar — Agentic AI Developer & Full-Stack Systems Architect';
  const shareSummary = 'Explore Aayush Kumar’s interactive 2.5D engineering lab showcasing Agentic AI architectures, autonomous multi-agent DAGs, and full-stack software systems.';

  const handleCopy = () => {
    sounds.playClick();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    trackSocialShare('clipboard');
    setTimeout(() => setCopied(false), 2200);
  };

  const handleNativeShare = async () => {
    sounds.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareSummary,
          url: shareUrl
        });
        trackSocialShare('native_share');
      } catch {}
    }
  };

  const shareToLinkedIn = () => {
    sounds.playClick();
    trackSocialShare('linkedin');
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToTwitter = () => {
    sounds.playClick();
    trackSocialShare('twitter');
    const text = `Explore @Aayush's digital workshop: interactive Agentic AI architectures, LangGraph DAGs, and full-stack systems!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToWhatsApp = () => {
    sounds.playClick();
    trackSocialShare('whatsapp');
    const text = `${shareTitle} — ${shareUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel share-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <Share2 size={20} className="text-cyan animate-pulse" />
            <div>
              <span className="modal-kicker font-mono text-cyan">TELEMETRY BROADCAST // SOCIAL SHARE</span>
              <h2 id="share-modal-title" className="modal-title font-mono">
                SHARE DIGITAL WORKSHOP
              </h2>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close Share Dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="text-muted text-sm mb-4">
            Broadcast Aayush's engineering portfolio to your technical network, engineering peers, or hiring leads.
          </p>

          {/* Quick Copy Link Box */}
          <div className="share-link-box">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="share-link-input font-mono"
            />
            <button
              type="button"
              className="btn-modal-action btn-accent btn-copy-link"
              onClick={handleCopy}
            >
              {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              <span className="font-mono">{copied ? 'COPIED!' : 'COPY LINK'}</span>
            </button>
          </div>

          {/* Social Channels Grid */}
          <div className="share-channels-grid mt-4">
            <button
              type="button"
              className="share-channel-btn share-linkedin"
              onClick={shareToLinkedIn}
            >
              <LinkedinIcon size={18} className="text-cyan" />
              <div className="channel-labels">
                <span className="channel-name font-mono">LinkedIn</span>
                <span className="channel-sub font-mono">Share to professional feed</span>
              </div>
              <ExternalLink size={14} className="channel-external" />
            </button>

            <button
              type="button"
              className="share-channel-btn share-twitter"
              onClick={shareToTwitter}
            >
              <span className="font-mono font-bold text-base text-white">𝕏</span>
              <div className="channel-labels">
                <span className="channel-name font-mono">X (Twitter)</span>
                <span className="channel-sub font-mono">Post dispatch to timeline</span>
              </div>
              <ExternalLink size={14} className="channel-external" />
            </button>

            <button
              type="button"
              className="share-channel-btn share-whatsapp"
              onClick={shareToWhatsApp}
            >
              <span className="text-emerald font-bold text-lg">●</span>
              <div className="channel-labels">
                <span className="channel-name font-mono">WhatsApp</span>
                <span className="channel-sub font-mono">Send directly to chat</span>
              </div>
              <ExternalLink size={14} className="channel-external" />
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                className="share-channel-btn share-native"
                onClick={handleNativeShare}
              >
                <Share2 size={16} className="text-pink-400" />
                <div className="channel-labels">
                  <span className="channel-name font-mono">Device Share Sheet</span>
                  <span className="channel-sub font-mono">System share sheet &amp; AirDrop</span>
                </div>
                <ExternalLink size={14} className="channel-external" />
              </button>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-left-info">
            <span className="text-xs text-muted font-mono">CANONICAL: https://aayush-portfolio.vercel.app</span>
          </div>
          <button
            type="button"
            className="btn-modal-action btn-secondary"
            onClick={onClose}
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
