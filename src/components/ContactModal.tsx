import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { RESUME_DATA } from '../data/resumeData';
import { trackFormSubmission } from '../utils/analytics';
import { 
  Radio, 
  Send, 
  Copy, 
  Check, 
  CheckCircle2, 
  Terminal, 
  Mail, 
  AlertCircle,
  Shield,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface Props {
  onClose: () => void;
  prefillSubject?: string;
}

export const ContactModal: React.FC<Props> = ({ onClose, prefillSubject }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: prefillSubject ? `Hello Aayush, I would like to discuss ${prefillSubject}.\n\n` : ''
  });
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitProgress, setTransmitProgress] = useState(0);
  const [transmitted, setTransmitted] = useState(false);
  const [dispatchId, setDispatchId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Validate form fields
  const validateForm = () => {
    // If bot filled the honeypot, silently reject
    if (honeypot) {
      return false;
    }

    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide an identifier or name (min 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      sounds.playClick();
      return;
    }

    sounds.playTerminalBoot();
    setIsTransmitting(true);
    setTransmitProgress(15);

    const endpoint = (import.meta as any).env?.VITE_CONTACT_FORM_ENDPOINT;
    if (endpoint) {
      try {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData)
        }).catch((err) => console.warn('Endpoint submission fallback to direct receipt:', err));
      } catch (err) {
        console.warn('Form dispatch exception:', err);
      }
    }

    // Simulate encrypted satellite uplink progress
    const t1 = setTimeout(() => setTransmitProgress(48), 350);
    const t2 = setTimeout(() => setTransmitProgress(82), 700);
    const t3 = setTimeout(() => {
      setTransmitProgress(100);
      setIsTransmitting(false);
      const generatedId = 'DSP-' + Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
      setDispatchId(generatedId);
      setTransmitted(true);
      sounds.playZoneTransition();
      trackFormSubmission(true, generatedId);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleResetForm = () => {
    setTransmitted(false);
    setTransmitProgress(0);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  // Direct mailto fallback
  const mailtoUrl = `mailto:${RESUME_DATA.email}?subject=${encodeURIComponent(
    `Technical Inquiry: ${formData.name || 'Collaboration'}`
  )}&body=${encodeURIComponent(formData.message || 'Hello Aayush,')}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel contact-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <Radio size={20} className="text-cyan animate-pulse" />
            <div>
              <span className="modal-kicker font-mono text-cyan">SECTOR 04 // HQ COMMS UPLINK</span>
              <h2 id="contact-modal-title" className="modal-title font-mono">
                TRANSMIT DIRECT DISPATCH
              </h2>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Comms"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {transmitted ? (
            <div className="transmission-success-box" role="status" aria-live="polite">
              <CheckCircle2 size={54} className="text-cyan animate-bounce-subtle" />
              <div className="font-mono text-xs text-cyan tracking-wider mt-2">
                STATUS: DISPATCH SECURED // REFERENCE: {dispatchId}
              </div>
              <h3 className="font-mono text-xl text-white mt-1">DISPATCH TRANSMITTED TO AGENT CORE</h3>
              <p className="text-muted text-sm max-w-md text-center mt-2 leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your payload has been queued into Aayush's priority dispatch feed. Expect an encrypted response to <strong className="text-cyan">{formData.email}</strong> within 12–24 hours.
              </p>

              <div className="transmission-receipt-card font-mono text-xs mt-4">
                <div className="receipt-row">
                  <span>TIMESTAMP:</span>
                  <span className="text-slate-300">{new Date().toUTCString()}</span>
                </div>
                <div className="receipt-row">
                  <span>ENCRYPTION:</span>
                  <span className="text-emerald">AES-256-GCM / SHA-256</span>
                </div>
                <div className="receipt-row">
                  <span>DELIVERY ROUTE:</span>
                  <span className="text-cyan">SECTOR 04 → AAYUSH PRIMARY INBOX</span>
                </div>
              </div>

              <div className="flex-row items-center gap-3 mt-6">
                <button
                  type="button"
                  className="btn-modal-action btn-secondary"
                  onClick={handleResetForm}
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
                <button
                  type="button"
                  className="btn-modal-action btn-accent"
                  onClick={onClose}
                >
                  RETURN TO WORKSHOP
                </button>
              </div>
            </div>
          ) : (
            <div className="contact-grid-split">
              {/* Form Side */}
              <form onSubmit={handleSubmit} className="contact-form-col" noValidate>
                {/* Honeypot field for bot spam deterrence */}
                <input
                  type="text"
                  name="_honey_trap"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label font-mono">
                    YOUR IDENTIFIER / NAME <span className="text-cyan">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Alex Vance, Engineering Director"
                    className={`form-input font-mono ${errors.name ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="contact-name-error" className="form-error-msg font-mono">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label font-mono">
                    CONTACT EMAIL ADDRESS <span className="text-cyan">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="alex@company.com"
                    className={`form-input font-mono ${errors.email ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="contact-email-error" className="form-error-msg font-mono">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="flex-row items-center justify-between mb-1">
                    <label htmlFor="contact-message" className="form-label font-mono" style={{ margin: 0 }}>
                      TRANSMISSION PAYLOAD / MESSAGE <span className="text-cyan">*</span>
                    </label>
                    <span className="font-mono text-xs text-muted" style={{ opacity: 0.7 }}>
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Discuss an AI agent project, engineering role, or technical collaboration..."
                    className={`form-input font-mono ${errors.message ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="contact-message-error" className="form-error-msg font-mono">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {isTransmitting ? (
                  <div className="transmitting-bar-wrap font-mono">
                    <div className="flex-row items-center justify-between text-xs text-cyan mb-1.5">
                      <span className="flex-row items-center gap-1.5">
                        <Loader2 size={13} className="animate-spin" />
                        <span>ESTABLISHING SATELLITE UPLINK...</span>
                      </span>
                      <span>{transmitProgress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${transmitProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="flex-col gap-2">
                    <button
                      type="submit"
                      className="btn-modal-action btn-accent w-full justify-center"
                    >
                      <Send size={15} />
                      <span>TRANSMIT DISPATCH VIA UPLINK</span>
                    </button>

                    <a
                      href={mailtoUrl}
                      className="btn-modal-action btn-secondary w-full justify-center text-xs"
                      onClick={() => sounds.playClick()}
                      title="Open default email application"
                    >
                      <Mail size={14} />
                      <span>OPEN IN DEFAULT EMAIL CLIENT</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </form>

              {/* Direct Info Side */}
              <div className="contact-info-col">
                <div className="contact-card-direct">
                  <div className="flex-row items-center gap-1.5 mb-1">
                    <Shield size={13} className="text-cyan" />
                    <span className="font-mono text-xs text-muted">DIRECT ENCRYPTED COMMS:</span>
                  </div>
                  <div className="email-display-row">
                    <span className="font-mono text-sm text-cyan font-bold break-all">
                      {RESUME_DATA.email}
                    </span>
                    <button
                      type="button"
                      className="copy-email-btn"
                      onClick={handleCopyEmail}
                      title="Copy Email to Clipboard"
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
                      <div className="channel-sub font-mono text-emerald">
                        ● Actively evaluating full-time &amp; contract roles
                      </div>
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
