import React from 'react';
import { FileText, X, Scale, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { sounds } from '../audio/soundEffects';

interface Props {
  onClose: () => void;
  onOpenPrivacy?: () => void;
}

export const TermsModal: React.FC<Props> = ({ onClose, onOpenPrivacy }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel legal-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-service-title"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <Scale size={20} className="text-cyan" />
            <div>
              <span className="modal-kicker font-mono text-cyan">LEGAL FRAMEWORK &amp; CODE LICENSES</span>
              <h2 id="terms-service-title" className="modal-title font-mono">
                TERMS OF SERVICE
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
            aria-label="Close Terms of Service"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body legal-modal-body font-sans">
          <div className="legal-status-banner font-mono">
            <span className="status-dot-pulse online" />
            <span>OPERATIONAL TERMS // VERSION 1.0 — OCTOBER 2026</span>
          </div>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">01.</span> Acceptance of Protocol
            </h3>
            <p className="legal-text">
              By accessing, browsing, or utilizing the interactive digital workshop, executive briefing portal, or interactive simulators created by <strong>Aayush Kumar</strong> ("Developer"), you affirm that you have read, understood, and agreed to be bound by these Terms of Service and the accompanying Privacy Policy.
            </p>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">02.</span> Permitted Usage &amp; Interactive Simulators
            </h3>
            <p className="legal-text">
              You are granted a revocable, non-exclusive license to explore this portfolio, test live interactive simulators (such as the SakuraKeys zero-latency audio engine and Sentilytics NLP classifier), and review technical specifications. You agree not to:
            </p>
            <ul className="legal-bullet-list">
              <li>Deploy automated denial-of-service or scraping attacks against this service or associated API endpoints.</li>
              <li>Attempt to reverse-engineer client keys or inject malicious payloads into the encrypted comms transmitter form.</li>
              <li>Misrepresent the identity of Aayush Kumar or claim ownership over custom software architectures presented herein.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">03.</span> Intellectual Property &amp; Open-Source Code
            </h3>
            <div className="legal-grid">
              <div className="legal-card">
                <div className="flex-row items-center gap-2 mb-2">
                  <Shield size={16} className="text-cyan" />
                  <span className="font-mono text-sm font-bold text-white">Open Source (MIT)</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Open-source repositories linked via GitHub are governed by their respective repository licenses (predominantly the permissive MIT License). You are encouraged to review, fork, and star the code.
                </p>
              </div>

              <div className="legal-card">
                <div className="flex-row items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-cyan" />
                  <span className="font-mono text-sm font-bold text-white">Artistic Homage Disclaimer</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  The visual crewmate themes and 2.5D station motifs are created as a non-commercial, transformative creative tribute and engineering proof-of-concept. All rights to original Among Us intellectual property belong to Innersloth LLC.
                </p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">04.</span> Autonomous AI Systems &amp; Benchmark Disclaimers
            </h3>
            <p className="legal-text">
              The Agentic AI pipelines, Directed Acyclic Graph (DAG) planners, and sentiment models described on this site represent real engineering architectures. Because large language models and autonomous tools are inherently probabilistic, code sandboxes and simulations are provided "AS IS" without express or implied warranty of fitness for a specific commercial purpose.
            </p>
          </section>

          <section className="legal-section">
            <h3 className="legal-section-title font-mono">
              <span className="text-cyan">05.</span> Limitation of Liability
            </h3>
            <p className="legal-text">
              In no event shall Aayush Kumar be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this site, reliance on technical dossiers, or external third-party links.
            </p>
          </section>
        </div>

        <div className="modal-footer">
          <div className="flex-row items-center gap-3">
            {onOpenPrivacy && (
              <button
                type="button"
                className="btn-modal-action btn-secondary"
                onClick={() => {
                  sounds.playClick();
                  onOpenPrivacy();
                }}
              >
                <FileText size={14} />
                <span>VIEW PRIVACY POLICY</span>
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
            <span>AGREE &amp; CLOSE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
