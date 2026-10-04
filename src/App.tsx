import React, { useState, useEffect, useCallback } from 'react';
import { OpeningScreen } from './components/OpeningScreen';
import { WorkshopWorld } from './components/WorkshopWorld';
import { WorldHUD } from './components/WorldHUD';
import { ProjectModal } from './components/ProjectModal';
import { AgentCoreModal } from './components/AgentCoreModal';
import { AboutModal } from './components/AboutModal';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { EasterEggModal } from './components/EasterEggModal';
import { CompanionDroneModal } from './components/CompanionDrone';
import { ExecutivePortfolio } from './components/ExecutivePortfolio';
import { MobileControls } from './components/MobileControls';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsModal } from './components/TermsModal';
import { FAQModal } from './components/FAQModal';
import { ShareModal } from './components/ShareModal';
import { CookieConsent } from './components/CookieConsent';
import type { ZoneId, InteractableObject, EasterEggData, Vector2D } from './types/world';
import type { ProjectData } from './types/project';
import { PROJECTS } from './data/projects';
import { ZONES, EASTER_EGGS } from './data/worldMap';
import { sounds } from './audio/soundEffects';
import { trackPageView, trackZoneTeleport, trackModalOpen, initGoogleAnalytics } from './utils/analytics';
import { AlertTriangle, Compass, Zap } from 'lucide-react';
import './App.css';

type ScreenState = 'opening' | 'workshop' | 'executive' | '404';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('opening');
  const [isMuted, setIsMuted] = useState(false);
  const [currentZone, setCurrentZone] = useState<ZoneId>('CENTRAL_HUB');

  // Modals state
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [showAgentCore, setShowAgentCore] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>(undefined);
  const [showCompanion, setShowCompanion] = useState(false);
  const [activeEasterEgg, setActiveEasterEgg] = useState<EasterEggData | null>(null);

  // Pre-launch Compliance & Info Modals
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [forceCookieSettings, setForceCookieSettings] = useState(false);

  // Teleportation target
  const [teleportTarget, setTeleportTarget] = useState<Vector2D | null>(null);

  // Full Station Overview Mode
  const [isOverviewMode, setIsOverviewMode] = useState(false);

  // Crewmate customizer state
  const [crewmateColor, setCrewmateColor] = useState('cyan');
  const [crewmateHat, setCrewmateHat] = useState('crown');

  // Nearest interactable tracked by HUD
  const [nearestObj, setNearestObj] = useState<InteractableObject | null>(null);

  // Initialize analytics on mount
  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  // Hash-based routing and deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#executive') {
        setScreen('executive');
        trackPageView('#executive', 'Executive Dossier');
      } else if (hash === '#workshop') {
        setScreen('workshop');
        trackPageView('#workshop', '2.5D Digital Workshop');
      } else if (hash === '#privacy') {
        setShowPrivacy(true);
        trackModalOpen('privacy_policy');
      } else if (hash === '#terms') {
        setShowTerms(true);
        trackModalOpen('terms_of_service');
      } else if (hash === '#faq') {
        setShowFAQ(true);
        trackModalOpen('faq');
      } else if (hash === '#contact') {
        setShowContact(true);
        trackModalOpen('contact_modal');
      } else if (hash === '#404') {
        setScreen('404');
        trackPageView('#404', '404 // Signal Lost');
      }
    };

    // Check initial hash on load
    if (window.location.hash) {
      handleHashChange();
    } else {
      trackPageView('/', 'Digital Workshop Gateway');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sound toggle
  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
  };

  // Teleport to a specific zone by ID
  const handleTeleportToZone = useCallback((zoneId: ZoneId) => {
    const targetZone = ZONES[zoneId];
    if (targetZone) {
      setTeleportTarget({ x: targetZone.center.x, y: targetZone.center.y });
      setCurrentZone(zoneId);
      setIsOverviewMode(false);
      trackZoneTeleport(zoneId);
    }
  }, []);

  // Open specific project by ID
  const handleOpenProjectById = useCallback((projectId: string) => {
    const proj = PROJECTS.find(p => p.id === projectId);
    if (proj) {
      setActiveProject(proj);
      trackModalOpen(`project_${projectId}`);
    }
  }, []);

  // Open contact with optional subject prefill
  const handleOpenContactWithSubject = (subject?: string) => {
    setContactSubject(subject);
    setShowContact(true);
    trackModalOpen('contact_modal');
  };

  // Handle interaction from either world proximity or HUD click
  const handleInteract = useCallback((obj: InteractableObject) => {
    if (obj.id === 'term_dock_launch') {
      sounds.playZoneTransition();
      setScreen('executive');
      trackPageView('#executive', 'Executive Dossier');
      return;
    }

    switch (obj.type) {
      case 'project':
        if (obj.projectId) {
          handleOpenProjectById(obj.projectId);
        }
        break;
      case 'agent_core':
        setShowAgentCore(true);
        trackModalOpen('agent_core');
        break;
      case 'about':
        setShowAbout(true);
        trackModalOpen('about_modal');
        break;
      case 'resume':
        setShowResume(true);
        trackModalOpen('resume_modal');
        break;
      case 'contact':
        setShowContact(true);
        trackModalOpen('contact_modal');
        break;
      case 'easter_egg':
        if (obj.easterEggId && EASTER_EGGS[obj.easterEggId]) {
          setActiveEasterEgg(EASTER_EGGS[obj.easterEggId]);
          trackModalOpen(`easter_egg_${obj.easterEggId}`);
        }
        break;
      case 'terminal':
      case 'companion':
        setShowCompanion(true);
        trackModalOpen('companion_drone');
        break;
      default:
        break;
    }
  }, [handleOpenProjectById]);

  // Mobile virtual dpad movement
  const handleMobileMove = (dir: 'up' | 'down' | 'left' | 'right') => {
    const step = 45;
    setTeleportTarget(prev => {
      const currentPos = prev || { x: 0, y: 0 };
      switch (dir) {
        case 'up': return { x: currentPos.x, y: currentPos.y - step };
        case 'down': return { x: currentPos.x, y: currentPos.y + step };
        case 'left': return { x: currentPos.x - step, y: currentPos.y };
        case 'right': return { x: currentPos.x + step, y: currentPos.y };
      }
    });
  };

  // Keyboard shortcut to close any open modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
        setShowAgentCore(false);
        setShowAbout(false);
        setShowResume(false);
        setShowContact(false);
        setShowCompanion(false);
        setActiveEasterEgg(null);
        setIsOverviewMode(false);
        setShowPrivacy(false);
        setShowTerms(false);
        setShowFAQ(false);
        setShowShare(false);
        setForceCookieSettings(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-root">
      {/* Skip to Main Content Link for Keyboard / Screen Reader Accessibility */}
      <a href="#main-content" className="skip-to-content-link font-mono text-xs">
        SKIP TO MAIN CONTENT [TAB]
      </a>

      {/* 1. Opening Screen Gateway */}
      {screen === 'opening' && (
        <OpeningScreen
          onEnterWorkshop={() => {
            setScreen('workshop');
            trackPageView('#workshop', '2.5D Digital Workshop');
          }}
          onSkipToExecutive={() => {
            setScreen('executive');
            trackPageView('#executive', 'Executive Dossier');
          }}
          onOpenContact={() => handleOpenContactWithSubject()}
          onOpenPrivacyPolicy={() => {
            setShowPrivacy(true);
            trackModalOpen('privacy_policy');
          }}
          onOpenTerms={() => {
            setShowTerms(true);
            trackModalOpen('terms_of_service');
          }}
          onOpenFAQ={() => {
            setShowFAQ(true);
            trackModalOpen('faq');
          }}
          onOpenShare={() => {
            setShowShare(true);
            trackModalOpen('share');
          }}
          isMuted={isMuted}
          onToggleSound={toggleSound}
        />
      )}

      {/* 2. Interactive 2.5D Workshop View */}
      {screen === 'workshop' && (
        <>
          <WorkshopWorld
            currentZone={currentZone}
            onZoneChange={(z) => {
              setCurrentZone(z);
              trackZoneTeleport(z);
            }}
            onInteract={handleInteract}
            onOpenCompanion={() => {
              setShowCompanion(true);
              trackModalOpen('companion_drone');
            }}
            teleportTarget={teleportTarget}
            onTeleportComplete={() => setTeleportTarget(null)}
            isOverviewMode={isOverviewMode}
            onToggleOverview={() => setIsOverviewMode(prev => !prev)}
            crewmateColor={crewmateColor}
            crewmateHat={crewmateHat}
            onNearestChange={setNearestObj}
          />

          <WorldHUD
            currentZone={currentZone}
            nearestObj={nearestObj}
            onInteract={() => {
              if (nearestObj) handleInteract(nearestObj);
            }}
            onOpenCompanion={() => {
              setShowCompanion(true);
              trackModalOpen('companion_drone');
            }}
            onSwitchToExecutive={() => {
              setScreen('executive');
              trackPageView('#executive', 'Executive Dossier');
            }}
            onTeleportToZone={handleTeleportToZone}
            isMuted={isMuted}
            onToggleSound={toggleSound}
            isOverviewMode={isOverviewMode}
            onToggleOverview={() => setIsOverviewMode(prev => !prev)}
            crewmateColor={crewmateColor}
            onChangeCrewmateColor={setCrewmateColor}
            crewmateHat={crewmateHat}
            onChangeCrewmateHat={setCrewmateHat}
            onOpenFAQ={() => {
              setShowFAQ(true);
              trackModalOpen('faq');
            }}
            onOpenShare={() => {
              setShowShare(true);
              trackModalOpen('share');
            }}
            onOpenContact={() => handleOpenContactWithSubject()}
          />

          {/* Mobile on-screen controls for touch devices */}
          <MobileControls
            onMove={handleMobileMove}
            onInteract={() => {
              if (nearestObj) handleInteract(nearestObj);
            }}
            hasInteractable={Boolean(nearestObj)}
          />
        </>
      )}

      {/* 3. Executive Recruiter Portfolio View */}
      {screen === 'executive' && (
        <ExecutivePortfolio
          onReturnToWorkshop={() => {
            setScreen('workshop');
            trackPageView('#workshop', '2.5D Digital Workshop');
          }}
          onOpenProject={handleOpenProjectById}
          onOpenResume={() => {
            setShowResume(true);
            trackModalOpen('resume_modal');
          }}
          onOpenContact={() => handleOpenContactWithSubject()}
          onOpenPrivacyPolicy={() => {
            setShowPrivacy(true);
            trackModalOpen('privacy_policy');
          }}
          onOpenTerms={() => {
            setShowTerms(true);
            trackModalOpen('terms_of_service');
          }}
          onOpenFAQ={() => {
            setShowFAQ(true);
            trackModalOpen('faq');
          }}
          onOpenShare={() => {
            setShowShare(true);
            trackModalOpen('share');
          }}
          onOpenCookieSettings={() => setForceCookieSettings(true)}
        />
      )}

      {/* 4. In-App Custom 404 Route */}
      {screen === '404' && (
        <div className="custom-404-inapp-root" role="main">
          <div className="card-404">
            <div className="radar-icon" aria-hidden="true">
              <div className="radar-circle" />
              <div className="radar-ping" />
              <div className="radar-core" />
            </div>

            <span className="code-badge">ERROR 404 // SECTOR OUT OF REACH</span>
            <h1 className="font-mono text-2xl text-white mt-2">COSMIC SIGNAL LOST</h1>
            <p className="text-muted text-sm my-4">
              The station corridor or telemetry coordinates you requested do not exist in the navigation matrix.
            </p>

            <div className="flex-row items-center justify-center gap-3 mt-4">
              <button
                type="button"
                className="btn-modal-action btn-accent"
                onClick={() => {
                  sounds.playZoneTransition();
                  setScreen('workshop');
                }}
              >
                <Compass size={15} />
                <span>RETURN TO WORKSHOP</span>
              </button>

              <button
                type="button"
                className="btn-modal-action btn-secondary"
                onClick={() => {
                  sounds.playClick();
                  setScreen('executive');
                }}
              >
                <Zap size={15} className="text-amber-400" />
                <span>EXECUTIVE BRIEF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DIALOGS --- */}

      {/* Project Terminal Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Agent Core Holographic Inspector Modal */}
      {showAgentCore && (
        <AgentCoreModal
          onClose={() => setShowAgentCore(false)}
          onOpenAiResearch={() => {
            setShowAgentCore(false);
            handleOpenProjectById('ai-research-agent');
          }}
          onOpenCodeReviewer={() => {
            setShowAgentCore(false);
            handleOpenProjectById('code-review-agent');
          }}
        />
      )}

      {/* Developer Profile Modal */}
      {showAbout && (
        <AboutModal
          onClose={() => setShowAbout(false)}
          onOpenResume={() => {
            setShowAbout(false);
            setShowResume(true);
          }}
          onOpenContact={() => {
            setShowAbout(false);
            handleOpenContactWithSubject();
          }}
        />
      )}

      {/* Resume / Curriculum Vitae Modal */}
      {showResume && (
        <ResumeModal
          onClose={() => setShowResume(false)}
          onOpenContact={() => {
            setShowResume(false);
            handleOpenContactWithSubject();
          }}
        />
      )}

      {/* Contact Comms Uplink Modal */}
      {showContact && (
        <ContactModal
          onClose={() => setShowContact(false)}
          prefillSubject={contactSubject}
        />
      )}

      {/* Workshop AI Companion Drone Chat Drawer */}
      <CompanionDroneModal
        isOpen={showCompanion}
        onClose={() => setShowCompanion(false)}
        onTeleport={(zId) => {
          handleTeleportToZone(zId as ZoneId);
          if (screen !== 'workshop') setScreen('workshop');
        }}
        onOpenProject={handleOpenProjectById}
        onOpenAbout={() => setShowAbout(true)}
        onOpenResume={() => setShowResume(true)}
        onOpenContact={() => handleOpenContactWithSubject()}
        onSwitchToExecutive={() => setScreen('executive')}
      />

      {/* Easter Egg Artifact Modal */}
      {activeEasterEgg && (
        <EasterEggModal
          data={activeEasterEgg}
          onClose={() => setActiveEasterEgg(null)}
        />
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <PrivacyPolicyModal
          onClose={() => setShowPrivacy(false)}
          onOpenTerms={() => {
            setShowPrivacy(false);
            setShowTerms(true);
          }}
        />
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <TermsModal
          onClose={() => setShowTerms(false)}
          onOpenPrivacy={() => {
            setShowTerms(false);
            setShowPrivacy(true);
          }}
        />
      )}

      {/* FAQ Modal */}
      {showFAQ && (
        <FAQModal
          onClose={() => setShowFAQ(false)}
          onOpenContact={() => {
            setShowFAQ(false);
            handleOpenContactWithSubject();
          }}
        />
      )}

      {/* Social Share Modal */}
      {showShare && (
        <ShareModal
          onClose={() => setShowShare(false)}
        />
      )}

      {/* Cookie & Telemetry Consent Banner & Drawer */}
      <CookieConsent
        forceOpen={forceCookieSettings}
        onCloseForce={() => setForceCookieSettings(false)}
        onOpenPrivacyPolicy={() => {
          setShowPrivacy(true);
          trackModalOpen('privacy_policy');
        }}
      />
    </div>
  );
};

export default App;
