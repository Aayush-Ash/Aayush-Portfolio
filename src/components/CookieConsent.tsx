import React, { useState, useEffect } from 'react';
import { getSavedConsent, saveConsent } from '../utils/analytics';
import { sounds } from '../audio/soundEffects';
import { ShieldCheck, Settings, Check, X, Lock } from 'lucide-react';

interface Props {
  forceOpen?: boolean;
  onCloseForce?: () => void;
  onOpenPrivacyPolicy: () => void;
}

export const CookieConsent: React.FC<Props> = ({
  forceOpen = false,
  onCloseForce,
  onOpenPrivacyPolicy
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [preferencesEnabled, setPreferencesEnabled] = useState(true);

  useEffect(() => {
    const existing = getSavedConsent();
    if (!existing) {
      // Delay display slightly so it doesn't jarringly pop on immediate page render
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsEnabled(existing.analytics);
      setPreferencesEnabled(existing.preferences);
    }
  }, []);

  useEffect(() => {
    if (forceOpen) {
      setIsVisible(true);
      setShowConfig(true);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    sounds.playClick();
    saveConsent({ analytics: true, preferences: true });
    setIsVisible(false);
    setShowConfig(false);
    if (onCloseForce) onCloseForce();
  };

  const handleEssentialOnly = () => {
    sounds.playClick();
    saveConsent({ analytics: false, preferences: false });
    setIsVisible(false);
    setShowConfig(false);
    if (onCloseForce) onCloseForce();
  };

  const handleSaveCustom = () => {
    sounds.playClick();
    saveConsent({ analytics: analyticsEnabled, preferences: preferencesEnabled });
    setIsVisible(false);
    setShowConfig(false);
    if (onCloseForce) onCloseForce();
  };

  if (!isVisible) return null;

  return (
    <aside
      className="cookie-consent-overlay"
      aria-label="Privacy and telemetry cookie consent banner"
      role="region"
    >
      <div className="cookie-consent-card">
        {/* Header telemetry badge */}
        <div className="cookie-card-header">
          <div className="flex-row items-center gap-2">
            <ShieldCheck size={18} className="text-cyan" />
            <span className="font-mono text-xs text-white font-bold tracking-wider">
              TELEMETRY &amp; COOKIE PRIVACY // GDPR
            </span>
          </div>
          {forceOpen && (
            <button
              type="button"
              className="cookie-close-icon-btn"
              onClick={() => {
                setIsVisible(false);
                if (onCloseForce) onCloseForce();
              }}
              aria-label="Close cookie settings"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {!showConfig ? (
          <>
            <p className="cookie-text font-sans">
              This interactive facility utilizes essential storage (audio state, station position) and privacy-focused telemetry to monitor performance and interactions. We never sell your personal data.
            </p>

            <div className="cookie-links-row font-mono text-xs">
              <button
                type="button"
                className="cookie-text-link"
                onClick={() => {
                  sounds.playClick();
                  onOpenPrivacyPolicy();
                }}
              >
                Read Privacy Policy →
              </button>
            </div>

            <div className="cookie-actions-group font-mono">
              <button
                type="button"
                className="cookie-btn cookie-btn-accept"
                onClick={handleAcceptAll}
              >
                <Check size={14} />
                <span>ACCEPT ALL</span>
              </button>

              <button
                type="button"
                className="cookie-btn cookie-btn-essential"
                onClick={handleEssentialOnly}
              >
                <span>ESSENTIAL ONLY</span>
              </button>

              <button
                type="button"
                className="cookie-btn cookie-btn-config"
                onClick={() => {
                  sounds.playClick();
                  setShowConfig(true);
                }}
                title="Configure permissions"
              >
                <Settings size={14} />
                <span>CUSTOMIZE</span>
              </button>
            </div>
          </>
        ) : (
          <div className="cookie-config-panel">
            <p className="cookie-text mb-3">
              Configure telemetry categories below. Changes are saved locally on your device.
            </p>

            {/* Essential */}
            <div className="cookie-pref-item">
              <div className="cookie-pref-info">
                <div className="flex-row items-center gap-1.5">
                  <Lock size={13} className="text-muted" />
                  <span className="pref-title font-mono text-xs text-white">Essential Station Operation</span>
                </div>
                <span className="pref-desc text-muted text-xs">
                  Required for audio mute toggles, interactive canvas states, and crewmate position memory.
                </span>
              </div>
              <span className="badge-tag text-xs font-mono text-cyan">ALWAYS ACTIVE</span>
            </div>

            {/* Analytics */}
            <div className="cookie-pref-item">
              <div className="cookie-pref-info">
                <span className="pref-title font-mono text-xs text-white">Anonymous Telemetry &amp; Analytics</span>
                <span className="pref-desc text-muted text-xs">
                  Allows anonymous tracking of zone visits and project inspections to optimize portfolio load times.
                </span>
              </div>
              <label className="cookie-toggle-switch">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Preferences */}
            <div className="cookie-pref-item">
              <div className="cookie-pref-info">
                <span className="pref-title font-mono text-xs text-white">Customization Preferences</span>
                <span className="pref-desc text-muted text-xs">
                  Remembers your chosen crewmate suit colors, hats, and overview display settings.
                </span>
              </div>
              <label className="cookie-toggle-switch">
                <input
                  type="checkbox"
                  checked={preferencesEnabled}
                  onChange={(e) => setPreferencesEnabled(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="cookie-actions-group font-mono mt-4">
              <button
                type="button"
                className="cookie-btn cookie-btn-accept"
                onClick={handleSaveCustom}
              >
                <Check size={14} />
                <span>SAVE PREFERENCES</span>
              </button>

              <button
                type="button"
                className="cookie-btn cookie-btn-essential"
                onClick={() => setShowConfig(false)}
              >
                <span>BACK</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
