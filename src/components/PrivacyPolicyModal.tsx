import React from 'react';
import { ShieldCheck, X, Lock, Eye, Database, FileText, CheckCircle2 } from 'lucide-react';
import { sounds } from '../audio/soundEffects';

interface Props {
  onClose: () => void;
  onOpenTerms?: () => void;
}

export const PrivacyPolicyModal: React.FC<Props> = ({ onClose, onOpenTerms }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel legal-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <ShieldCheck size={20} className="text-cyan" />
            <div>
              <span className="modal-kicker font-mono text-cyan">SECURITY &amp; COMPLIANCE PROTOCOL</span>
              <h2 id="privacy-policy-title" className="modal-title font-mono">
                PRIVACY POLICY
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
            aria-label="Close Privacy Policy"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body legal-modal-body font-sans">
          <div className="legal-status-banner font-mono">
            <span className="status-dot-pulse online" />
            <span>EFFECTIVE DATE: OCTOBER 2026 // COMPLIANT WITH GDPR &amp; CCPA</span>
          </div>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">01.</span> Data Controller &amp; Scope
            </h3>
            <p className="legal-text">
              This Privacy Policy describes how <strong>Aayush Kumar</strong> ("Developer", "we", "us") collects, uses, and safeguards information through this portfolio website and interactive digital workshop application (the "Service"). As an independent software engineer and AI architect, your personal privacy and digital autonomy are treated as first-class architectural requirements.
            </p>
            <p className="legal-text">
              Direct Contact &amp; Inquiries: <a href="mailto:kashyapaayush3331@gmail.com" className="text-cyan underline">kashyapaayush3331@gmail.com</a>
            </p>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">02.</span> Information We Collect
            </h3>
            <div className="legal-grid">
              <div className="legal-card">
                <div className="flex-row items-center gap-2 mb-2">
                  <Database size={16} className="text-cyan" />
                  <span className="font-mono text-sm font-bold text-white">Direct Transmissions</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  When you transmit a message via the Sector 04 Comms Uplink / Contact form, we collect your identifier (name), email address, and message payload solely to respond to your technical inquiry or hiring opportunity.
                </p>
              </div>

              <div className="legal-card">
                <div className="flex-row items-center gap-2 mb-2">
                  <Eye size={16} className="text-cyan" />
                  <span className="font-mono text-sm font-bold text-white">Operational Telemetry</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Anonymized diagnostic telemetry: screen resolution, device viewport, visited workshop zones, and interactive DAG clicks. No sensitive personally identifiable information is harvested or combined with third-party trackers.
                </p>
              </div>

              <div className="legal-card">
                <div className="flex-row items-center gap-2 mb-2">
                  <Lock size={16} className="text-cyan" />
                  <span className="font-mono text-sm font-bold text-white">Client Storage (localStorage)</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  We use your browser's local storage strictly for local preferences: audio mute states, selected suit colors/hats, and your cookie consent preference. This data never leaves your client device.
                </p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">03.</span> Purpose of Processing &amp; Legal Basis
            </h3>
            <p className="legal-text">
              Under the European Union General Data Protection Regulation (GDPR), the legal bases for processing include:
            </p>
            <ul className="legal-bullet-list">
              <li>
                <strong>Consent (Art. 6(1)(a) GDPR):</strong> For optional performance telemetry and interactive sound toggles.
              </li>
              <li>
                <strong>Legitimate Interest (Art. 6(1)(f) GDPR):</strong> For securing the service against denial-of-service, abuse, and responding to direct recruiter or client communications initiated by you.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">04.</span> Zero Data Brokering Policy
            </h3>
            <p className="legal-text">
              We do not sell, rent, monetize, or disclose your personal contact information to any data brokers, ad networks, or marketing affiliates. Any email sent to Aayush Kumar is strictly confidential between the sender and recipient.
            </p>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">05.</span> Your Rights (GDPR &amp; CCPA)
            </h3>
            <p className="legal-text">
              Depending on your jurisdiction, you have statutory rights regarding your personal information:
            </p>
            <ul className="legal-bullet-list">
              <li><strong>Right of Access:</strong> Request a copy of any correspondence data stored about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate information.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request immediate permanent deletion of your messages from our email archive.</li>
              <li><strong>Right to Withdraw Consent:</strong> Clear cookies or modify telemetry preferences anytime using the Cookie Settings interface.</li>
            </ul>
          </section>
        </div>

        <div className="modal-footer">
          <div className="flex-row items-center gap-3">
            {onOpenTerms && (
              <button
                type="button"
                className="btn-modal-action btn-secondary"
                onClick={() => {
                  sounds.playClick();
                  onOpenTerms();
                }}
              >
                <FileText size={14} />
                <span>VIEW TERMS OF SERVICE</span>
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn-modal-action btn-accent"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
          >
            <CheckCircle2 size={14} />
            <span>ACKNOWLEDGE &amp; CLOSE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
