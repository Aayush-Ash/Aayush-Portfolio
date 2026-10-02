import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { RESUME_DATA } from '../data/resumeData';
import { Radio, Send, Copy, Check, CheckCircle2, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface Props {
  onClose: () => void;
}

export const ContactModal: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playInteract();
    setTransmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel contact-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <Radio size={20} className="text-cyan animate-pulse" />
            <div>
              <span className="modal-kicker font-mono text-cyan">SECTOR 04 // HQ COMMS UPLINK</span>
              <h2 className="modal-title font-mono">TRANSMIT DIRECT DISPATCH</h2>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {transmitted ? (
            <div className="transmission-success-box">
              <CheckCircle2 size={48} className="text-cyan" />
              <h3 className="font-mono text-lg text-white">DISPATCH TRANSMITTED TO AGENT CORE</h3>
              <p className="text-muted text-sm max-w-md text-center">
                Thank you, <strong>{formData.name}</strong>. Your message has been encrypted and routed directly to Aayush's priority queue.
              </p>
              <button
                type="button"
                className="btn-modal-action btn-accent mt-4"
                onClick={onClose}
              >
                RETURN TO WORKSHOP
              </button>
            </div>
          ) : (
            <div className="contact-grid-split">
              {/* Form Side */}
              <form onSubmit={handleSubmit} className="contact-form-col">
                <div className="form-group">
                  <label className="form-label font-mono">YOUR IDENTIFIER / NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance, Engineering Lead"
                    className="form-input font-mono"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">CONTACT EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="form-input font-mono"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">TRANSMISSION PAYLOAD</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, team, or problem you want an Agentic AI solution for..."
                    className="form-input font-mono"
                  />
                </div>

                <button type="submit" className="btn-modal-action btn-accent w-full justify-center">
                  <Send size={15} />
                  <span>TRANSMIT DISPATCH VIA UPLINK</span>
                </button>
              </form>

              {/* Direct Info Side */}
              <div className="contact-info-col">
                <div className="contact-card-direct">
                  <span className="font-mono text-xs text-muted">DIRECT ENCRYPTED COMMS:</span>
                  <div className="email-display-row">
                    <span className="font-mono text-sm text-cyan font-bold">{RESUME_DATA.email}</span>
                    <button
                      type="button"
                      className="copy-email-btn"
                      onClick={handleCopyEmail}
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                      <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                <div className="contact-socials-list">
                  <a
                    href={RESUME_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-item"
                    onClick={() => sounds.playClick()}
                  >
                    <GithubIcon size={16} className="text-cyan" />
                    <div>
                      <div className="channel-title font-mono">GitHub Profile</div>
                      <div className="channel-sub font-mono">Open-source repositories &amp; agent code</div>
                    </div>
                  </a>

                  <a
                    href={RESUME_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-item"
                    onClick={() => sounds.playClick()}
                  >
                    <LinkedinIcon size={16} className="text-cyan" />
                    <div>
                      <div className="channel-title font-mono">LinkedIn Network</div>
                      <div className="channel-sub font-mono">Professional connections &amp; endorsements</div>
                    </div>
                  </a>

                  <div className="contact-channel-item status-item">
                    <Terminal size={16} className="text-emerald" />
                    <div>
                      <div className="channel-title font-mono">Availability Status</div>
                      <div className="channel-sub font-mono text-emerald">● Actively evaluating full-time &amp; contract roles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
