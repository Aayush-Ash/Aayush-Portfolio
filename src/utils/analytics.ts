// ===================================================================
// AAYUSH WORKSHOP // TELEMETRY & ANALYTICS CLIENT
// ===================================================================

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const CONSENT_STORAGE_KEY = 'aayush_cookie_consent_v1';
const BASE_TITLE = 'Aayush Kumar — Agentic AI Developer & Full-Stack Systems Architect';
const BASE_CANONICAL = 'https://aayush-portfolio.vercel.app/';

export interface ConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  preferences: boolean;
  timestamp: string;
}

export function getSavedConsent(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function saveConsent(preferences: { analytics: boolean; preferences: boolean }): void {
  const consent: ConsentPreferences = {
    essential: true,
    analytics: preferences.analytics,
    preferences: preferences.preferences,
    timestamp: new Date().toISOString()
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch (e) {
    console.warn('Storage unavailable', e);
  }

  if (consent.analytics) {
    initGoogleAnalytics();
  }
}

// Injects Google Analytics 4 tag if ID exists and consent is granted
export function initGoogleAnalytics(): void {
  const consent = getSavedConsent();
  if (!consent?.analytics) {
    return;
  }

  const gaId = (import.meta as any).env?.VITE_GA_ID || '';
  if (!gaId || document.getElementById('ga-script')) {
    return;
  }

  try {
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      anonymize_ip: true,
      send_page_view: false
    });
  } catch (err) {
    console.debug('Analytics init failed:', err);
  }
}

// Injects Cloudflare Web Analytics beacon if token exists
export function initCloudflareAnalytics(): void {
  const cfToken = (import.meta as any).env?.VITE_CF_BEACON_TOKEN || '';
  if (!cfToken || document.getElementById('cf-beacon-script')) {
    return;
  }

  try {
    const script = document.createElement('script');
    script.id = 'cf-beacon-script';
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken }));
    document.head.appendChild(script);
    console.debug('[Telemetry] Cloudflare Web Analytics beacon initialized');
  } catch (err) {
    console.debug('Cloudflare Analytics init failed:', err);
  }
}

// Track Screen & View transitions with dynamic Title and Canonical update
export function trackPageView(pagePath: string, pageTitle?: string): void {
  const fullTitle = pageTitle ? `${pageTitle} — Aayush Kumar` : BASE_TITLE;
  document.title = fullTitle;

  // Determine active base origin for Cloudflare or production domain
  const activeBase = typeof window !== 'undefined' && !window.location.hostname.includes('localhost')
    ? `${window.location.origin}/`
    : BASE_CANONICAL;

  // Update canonical tag dynamically
  try {
    const canonicalEl = document.getElementById('canonical-url') as HTMLLinkElement | null;
    if (canonicalEl) {
      const cleanHash = pagePath.startsWith('#') ? pagePath : `#${pagePath}`;
      canonicalEl.href = pagePath === '/' || !pagePath ? activeBase : `${activeBase}${cleanHash}`;
    }
  } catch {}

  const consent = getSavedConsent();
  if (consent?.analytics && typeof window.gtag === 'function') {
    const gaId = (import.meta as any).env?.VITE_GA_ID;
    if (gaId) {
      window.gtag('config', gaId, {
        page_path: pagePath,
        page_title: fullTitle
      });
    }
  }

  // Developer Telemetry Log
  console.debug(`[Telemetry] PageView: ${pagePath} | Title: ${fullTitle}`);
}

// Generic event tracker
export function trackEvent(action: string, category: string, label?: string, value?: number): void {
  const consent = getSavedConsent();
  if (consent?.analytics && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
  console.debug(`[Telemetry] Event: [${category}] ${action} ${label ? `(${label})` : ''}`);
}

// Specific telemetry helpers
export function trackZoneTeleport(zoneId: string): void {
  trackEvent('teleport', 'navigation', zoneId);
}

export function trackModalOpen(modalName: string): void {
  trackEvent('modal_open', 'interaction', modalName);
}

export function trackProjectInspect(projectId: string): void {
  trackEvent('project_inspect', 'portfolio', projectId);
}

export function trackFormSubmission(success: boolean, dispatchId?: string): void {
  trackEvent('form_submit', 'comms', success ? `success_${dispatchId}` : 'failed');
}

export function trackAudioToggle(muted: boolean): void {
  trackEvent('toggle_audio', 'settings', muted ? 'muted' : 'unmuted');
}

export function trackSocialShare(platform: string): void {
  trackEvent('share', 'social', platform);
}
