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
import type { ZoneId, InteractableObject, EasterEggData, Vector2D } from './types/world';
import type { ProjectData } from './types/project';
import { PROJECTS } from './data/projects';
import { ZONES, EASTER_EGGS } from './data/worldMap';
import { sounds } from './audio/soundEffects';
import './App.css';

type ScreenState = 'opening' | 'workshop' | 'executive';

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
  const [showCompanion, setShowCompanion] = useState(false);
  const [activeEasterEgg, setActiveEasterEgg] = useState<EasterEggData | null>(null);

  // Teleportation target
  const [teleportTarget, setTeleportTarget] = useState<Vector2D | null>(null);

  // Full Station Overview Mode
  const [isOverviewMode, setIsOverviewMode] = useState(false);

  // Crewmate customizer state
  const [crewmateColor, setCrewmateColor] = useState('cyan');
  const [crewmateHat, setCrewmateHat] = useState('crown');

  // Nearest interactable tracked by HUD
  const [nearestObj, setNearestObj] = useState<InteractableObject | null>(null);

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
    }
  }, []);

  // Open specific project by ID
  const handleOpenProjectById = useCallback((projectId: string) => {
    const proj = PROJECTS.find(p => p.id === projectId);
    if (proj) {
      setActiveProject(proj);
    }
  }, []);

  // Handle interaction from either world proximity or HUD click
  const handleInteract = useCallback((obj: InteractableObject) => {
    if (obj.id === 'term_dock_launch') {
      sounds.playZoneTransition();
      setScreen('executive');
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
        break;
      case 'about':
        setShowAbout(true);
        break;
      case 'resume':
        setShowResume(true);
        break;
      case 'contact':
        setShowContact(true);
        break;
      case 'easter_egg':
        if (obj.easterEggId && EASTER_EGGS[obj.easterEggId]) {
          setActiveEasterEgg(EASTER_EGGS[obj.easterEggId]);
        }
        break;
      case 'terminal':
      case 'companion':
        setShowCompanion(true);
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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-root">
      {/* 1. Opening Screen Gateway */}
      {screen === 'opening' && (
        <OpeningScreen
          onEnterWorkshop={() => setScreen('workshop')}
          onSkipToExecutive={() => setScreen('executive')}
          isMuted={isMuted}
          onToggleSound={toggleSound}
        />
      )}

      {/* 2. Interactive 2.5D Workshop View */}
      {screen === 'workshop' && (
        <>
          <WorkshopWorld
            currentZone={currentZone}
            onZoneChange={setCurrentZone}
            onInteract={handleInteract}
            onOpenCompanion={() => setShowCompanion(true)}
            teleportTarget={teleportTarget}
            onTeleportComplete={() => setTeleportTarget(null)}
            isOverviewMode={isOverviewMode}
            onToggleOverview={() => setIsOverviewMode(prev => !prev)}
            crewmateColor={crewmateColor}
            crewmateHat={crewmateHat}
          />

          <WorldHUD
            currentZone={currentZone}
            nearestObj={nearestObj}
            onInteract={() => {
              if (nearestObj) handleInteract(nearestObj);
            }}
            onOpenCompanion={() => setShowCompanion(true)}
            onSwitchToExecutive={() => setScreen('executive')}
            onTeleportToZone={handleTeleportToZone}
            isMuted={isMuted}
            onToggleSound={toggleSound}
            isOverviewMode={isOverviewMode}
            onToggleOverview={() => setIsOverviewMode(prev => !prev)}
            crewmateColor={crewmateColor}
            onChangeCrewmateColor={setCrewmateColor}
            crewmateHat={crewmateHat}
            onChangeCrewmateHat={setCrewmateHat}
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
          onReturnToWorkshop={() => setScreen('workshop')}
          onOpenProject={handleOpenProjectById}
          onOpenResume={() => setShowResume(true)}
          onOpenContact={() => setShowContact(true)}
        />
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
            setShowContact(true);
          }}
        />
      )}

      {/* Resume / Curriculum Vitae Modal */}
      {showResume && (
        <ResumeModal
          onClose={() => setShowResume(false)}
          onOpenContact={() => {
            setShowResume(false);
            setShowContact(true);
          }}
        />
      )}

      {/* Contact Comms Uplink Modal */}
      {showContact && (
        <ContactModal
          onClose={() => setShowContact(false)}
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
        onOpenContact={() => setShowContact(true)}
        onSwitchToExecutive={() => setScreen('executive')}
      />

      {/* Easter Egg Artifact Modal */}
      {activeEasterEgg && (
        <EasterEggModal
          data={activeEasterEgg}
          onClose={() => setActiveEasterEgg(null)}
        />
      )}
    </div>
  );
};

export default App;
