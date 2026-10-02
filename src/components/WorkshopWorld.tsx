import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Vector2D, InteractableObject, ZoneId } from '../types/world';
import { ZONES, INTERACTABLES } from '../data/worldMap';
import { sounds } from '../audio/soundEffects';

interface Props {
  onInteract: (obj: InteractableObject) => void;
  onOpenCompanion: () => void;
  currentZone: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
  teleportTarget: Vector2D | null;
  onTeleportComplete: () => void;
}

export const WorkshopWorld: React.FC<Props> = ({
  onInteract,
  onOpenCompanion,
  currentZone,
  onZoneChange,
  teleportTarget,
  onTeleportComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Player state in world coordinates
  const playerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 3.8,
    facing: 'down' as 'down' | 'up' | 'left' | 'right',
    isMoving: false,
    animTick: 0
  });

  // Companion drone position (smooth trailing behind player)
  const droneRef = useRef({
    x: -30,
    y: -30,
    hoverOffset: 0
  });

  // Target destination when player clicks/taps on floor
  const targetDestRef = useRef<Vector2D | null>(null);

  // Currently focused / nearest interactable
  const [nearestObj, setNearestObj] = useState<InteractableObject | null>(null);
  const nearestObjRef = useRef<InteractableObject | null>(null);

  // Key states
  const keysRef = useRef<{ [key: string]: boolean }>({});

  // Footstep audio throttle
  const lastFootstepRef = useRef(0);

  // Teleport handler
  useEffect(() => {
    if (teleportTarget) {
      playerRef.current.x = teleportTarget.x;
      playerRef.current.y = teleportTarget.y;
      playerRef.current.vx = 0;
      playerRef.current.vy = 0;
      targetDestRef.current = null;
      droneRef.current.x = teleportTarget.x - 30;
      droneRef.current.y = teleportTarget.y - 30;
      sounds.playZoneTransition();
      onTeleportComplete();
    }
  }, [teleportTarget, onTeleportComplete]);

  // Handle interaction trigger
  const triggerInteraction = useCallback(() => {
    const obj = nearestObjRef.current;
    if (obj) {
      sounds.playInteract();
      onInteract(obj);
    }
  }, [onInteract]);

  // Setup keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      keysRef.current[e.key.toLowerCase()] = true;

      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        e.preventDefault();
        triggerInteraction();
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        sounds.playClick();
        onOpenCompanion();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerInteraction, onOpenCompanion]);

  // Canvas render & physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const renderLoop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const player = playerRef.current;
      const keys = keysRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 1. Process movement inputs
      let dx = 0;
      let dy = 0;

      if (keys['w'] || keys['arrowup']) dy -= 1;
      if (keys['s'] || keys['arrowdown']) dy += 1;
      if (keys['a'] || keys['arrowleft']) dx -= 1;
      if (keys['d'] || keys['arrowright']) dx += 1;

      // Click/tap to move destination
      if (targetDestRef.current && (dx === 0 && dy === 0)) {
        const toX = targetDestRef.current.x - player.x;
        const toY = targetDestRef.current.y - player.y;
        const dist = Math.hypot(toX, toY);
        if (dist > 8) {
          dx = toX / dist;
          dy = toY / dist;
        } else {
          targetDestRef.current = null;
        }
      }

      // If keyboard keys pressed, cancel click-to-move destination
      if (keys['w'] || keys['s'] || keys['a'] || keys['d'] || keys['arrowup'] || keys['arrowdown'] || keys['arrowleft'] || keys['arrowright']) {
        targetDestRef.current = null;
      }

      // Normalize diagonal velocity
      const mag = Math.hypot(dx, dy);
      if (mag > 0) {
        player.vx = (dx / mag) * player.speed;
        player.vy = (dy / mag) * player.speed;
        player.isMoving = true;
        player.animTick += dt * 9;

        if (Math.abs(dx) > Math.abs(dy)) {
          player.facing = dx > 0 ? 'right' : 'left';
        } else {
          player.facing = dy > 0 ? 'down' : 'up';
        }

        // Footstep sounds
        if (time - lastFootstepRef.current > 320) {
          sounds.playFootstep();
          lastFootstepRef.current = time;
        }
      } else {
        player.vx = 0;
        player.vy = 0;
        player.isMoving = false;
      }

      // World boundaries collision clamping
      player.x = Math.max(-650, Math.min(650, player.x + player.vx));
      player.y = Math.max(-610, Math.min(610, player.y + player.vy));

      // Drone follower lag
      const drone = droneRef.current;
      const targetDroneX = player.x + (player.facing === 'left' ? 36 : -36);
      const targetDroneY = player.y - 38 + Math.sin(time * 0.004) * 6;
      drone.x += (targetDroneX - drone.x) * 0.08;
      drone.y += (targetDroneY - drone.y) * 0.08;
      drone.hoverOffset = Math.sin(time * 0.005) * 4;

      // Check current zone
      let detectedZone: ZoneId = 'CENTRAL_HUB';
      if (player.y < -220) detectedZone = 'AI_LAB';
      else if (player.x < -220) detectedZone = 'BUILD_BAY';
      else if (player.y > 220) detectedZone = 'DATA_CORE';
      else if (player.x > 220) detectedZone = 'HQ';

      if (detectedZone !== currentZone) {
        onZoneChange(detectedZone);
      }

      // Find nearest interactable
      let closest: InteractableObject | null = null;
      let minDistance = Infinity;

      for (const obj of INTERACTABLES) {
        const d = Math.hypot(obj.position.x - player.x, obj.position.y - player.y);
        if (d <= obj.radius && d < minDistance) {
          minDistance = d;
          closest = obj;
        }
      }

      if (closest !== nearestObjRef.current) {
        nearestObjRef.current = closest;
        setNearestObj(closest);
      }

      // 2. Camera tracking
      // Isometric 2.5D viewport offset
      const camX = width / 2 - player.x;
      const camY = height / 2 - player.y;

      // 3. Clear Screen with deep slate base
      ctx.fillStyle = '#080A0F';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(camX, camY);

      // --- DRAW 2.5D WORLD ENVIRONMENT ---

      // A. Floor grid plates
      const tileSize = 60;
      const startX = -720;
      const endX = 720;
      const startY = -680;
      const endY = 680;

      ctx.strokeStyle = '#121824';
      ctx.lineWidth = 1;

      for (let x = startX; x <= endX; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }
      for (let y = startY; y <= endY; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      }

      // B. Zone floor outlines & metallic platforms
      Object.values(ZONES).forEach(zone => {
        const b = zone.bounds;
        const isCurrent = detectedZone === zone.id;

        // Platform base
        ctx.fillStyle = isCurrent ? '#0E131C' : '#0B0F17';
        ctx.fillRect(b.minX, b.minY, b.maxX - b.minX, b.maxY - b.minY);

        // Border conduit
        ctx.strokeStyle = isCurrent ? zone.themeColor : '#1C2433';
        ctx.lineWidth = isCurrent ? 2 : 1;
        ctx.strokeRect(b.minX, b.minY, b.maxX - b.minX, b.maxY - b.minY);

        // Zone header label on floor
        ctx.fillStyle = isCurrent ? zone.themeColor : '#334155';
        ctx.font = 'bold 12px "Space Grotesk", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(zone.title, zone.center.x, b.minY + 24);
      });

      // C. Glowing Conduits (connecting corridors from Hub)
      const conduitPulse = (Math.sin(time * 0.005) + 1) * 0.5;

      const drawConduit = (x1: number, y1: number, x2: number, y2: number, color: string) => {
        // Outer glow
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.2 + conduitPulse * 0.3;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Inner laser core
        ctx.strokeStyle = '#FFFFFF';
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      };

      // North to AI LAB
      drawConduit(0, -60, 0, -320, '#00D2FF');
      // West to BUILD BAY
      drawConduit(-60, 0, -320, 0, '#38BDF8');
      // South to DATA CORE
      drawConduit(0, 60, 0, 320, '#10B981');
      // East to HQ
      drawConduit(60, 0, 320, 0, '#F59E0B');

      // D. Central Hub Floor Medallion & Compass
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fillStyle = '#0F1522';
      ctx.fill();
      ctx.strokeStyle = '#00D2FF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.strokeStyle = '#1E293B';
      ctx.stroke();

      // Floor Wayfinding markings
      ctx.fillStyle = '#64748B';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▲ AI LAB (SECTOR 01)', 0, -95);
      ctx.fillText('◄ BUILD BAY (SECTOR 02)', -140, 4);
      ctx.fillText('▼ DATA CORE (SECTOR 03)', 0, 105);
      ctx.fillText('HQ (SECTOR 04) ►', 140, 4);

      // E. Draw Special Machinery & Architectural Centers
      // AI LAB: Central Holographic Core
      const holoRotation = time * 0.0015;
      ctx.save();
      ctx.translate(0, -420);
      
      // Outer rotating ring
      ctx.strokeStyle = '#00D2FF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 45, holoRotation, holoRotation + Math.PI * 1.5);
      ctx.stroke();

      // Inner counter-rotating ring
      ctx.strokeStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(0, 0, 30, -holoRotation * 1.5, -holoRotation * 1.5 + Math.PI);
      ctx.stroke();

      // Pulsing Holographic Core Sphere
      const pulseSize = 12 + Math.sin(time * 0.008) * 3;
      const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, pulseSize);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.5, '#00D2FF');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Holographic text banner
      ctx.fillStyle = '#E2E8F0';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillText('AGENT CORE // PLAN-ACT', 0, 52);
      ctx.restore();

      // BUILD BAY: Giant mechanical keyboard outline
      ctx.save();
      ctx.translate(-440, -100);
      ctx.fillStyle = '#1A1D26';
      ctx.fillRect(-45, -20, 90, 40);
      ctx.strokeStyle = '#F472B6';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-45, -20, 90, 40);
      // Keycaps rows
      ctx.fillStyle = '#2B313F';
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 5; c++) {
          ctx.fillRect(-38 + c * 16, -14 + r * 11, 12, 8);
        }
      }
      ctx.restore();

      // DATA CORE: Server racks with blinking LEDs
      const drawServerRack = (x: number, y: number, label: string) => {
        ctx.fillStyle = '#111622';
        ctx.fillRect(x - 25, y - 35, 50, 70);
        ctx.strokeStyle = '#1E293B';
        ctx.strokeRect(x - 25, y - 35, 50, 70);

        // Server rack units
        for (let u = 0; u < 5; u++) {
          ctx.fillStyle = '#1A2234';
          ctx.fillRect(x - 21, y - 30 + u * 12, 42, 9);

          // Blinking status LEDs
          const blink = Math.sin(time * 0.01 + u * 1.5) > 0;
          ctx.fillStyle = blink ? '#10B981' : '#065F46';
          ctx.beginPath();
          ctx.arc(x - 15, y - 26 + u * 12, 1.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#00D2FF';
          ctx.beginPath();
          ctx.arc(x - 9, y - 26 + u * 12, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = '#64748B';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + 46);
      };

      drawServerRack(-70, 530, 'AAYUSH-AI');
      drawServerRack(70, 530, 'FULLSTACK-CORE');

      // HQ: Command desk with laptop
      ctx.save();
      ctx.translate(440, -80);
      // Desk
      ctx.fillStyle = '#1E2430';
      ctx.fillRect(-35, -18, 70, 36);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(-35, -18, 70, 36);
      // Laptop base & glowing screen
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(-12, -8, 24, 16);
      ctx.fillStyle = '#00D2FF';
      ctx.globalAlpha = 0.8;
      ctx.fillRect(-10, -6, 20, 12);
      ctx.globalAlpha = 1;
      ctx.restore();

      // F. Render All Interactable Objects
      INTERACTABLES.forEach(obj => {
        const isHovered = nearestObj?.id === obj.id;
        const px = obj.position.x;
        const py = obj.position.y;

        // Proximity target ring on floor
        if (isHovered) {
          ctx.save();
          ctx.strokeStyle = obj.color || '#00D2FF';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(px, py, 32 + Math.sin(time * 0.008) * 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Base pedestal
        ctx.fillStyle = '#161D2A';
        ctx.beginPath();
        ctx.arc(px, py, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isHovered ? (obj.color || '#00D2FF') : '#252F42';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Object floating icon / holographic beacon
        const beaconY = py - 18 + Math.sin(time * 0.004 + px * 0.01) * 3;
        ctx.fillStyle = obj.color || '#00D2FF';
        ctx.beginPath();
        ctx.arc(px, beaconY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Label above terminal
        ctx.fillStyle = isHovered ? '#FFFFFF' : '#94A3B8';
        ctx.font = '500 10px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(obj.name, px, py - 32);

        // Interaction key prompt
        if (isHovered) {
          ctx.fillStyle = '#00D2FF';
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          ctx.fillText('[ E ] INTERACT', px, py - 46);
        }
      });

      // G. Click destination indicator
      if (targetDestRef.current) {
        ctx.save();
        ctx.strokeStyle = '#00D2FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(targetDestRef.current.x, targetDestRef.current.y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // H. Render Player Character
      // Soft shadow
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(player.x, player.y + 14, 16, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cyan ground lighting reflection
      ctx.fillStyle = 'rgba(0, 210, 255, 0.12)';
      ctx.beginPath();
      ctx.ellipse(player.x, player.y + 14, 22, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Player torso (Dark tech jacket)
      const walkBob = player.isMoving ? Math.sin(player.animTick) * 2 : 0;
      const legSwing = player.isMoving ? Math.sin(player.animTick) * 5 : 0;

      // Legs / boots
      ctx.fillStyle = '#1A202C';
      // Left leg
      ctx.fillRect(player.x - 7, player.y + 4 + (player.isMoving ? legSwing : 0), 5, 10);
      // Right leg
      ctx.fillRect(player.x + 2, player.y + 4 - (player.isMoving ? legSwing : 0), 5, 10);

      // Body (Sleek tech jacket with cyan zipper line)
      ctx.fillStyle = '#111827';
      ctx.fillRect(player.x - 10, player.y - 14 + walkBob, 20, 20);

      // Backpack / satchel
      if (player.facing === 'up' || player.facing === 'left' || player.facing === 'right') {
        ctx.fillStyle = '#1F2937';
        ctx.fillRect(player.x - 7, player.y - 12 + walkBob, 14, 14);
      }

      // Neon cyan accent seams on jacket
      ctx.fillStyle = '#00D2FF';
      ctx.fillRect(player.x - 1, player.y - 12 + walkBob, 2, 16);

      // Developer Head
      ctx.fillStyle = '#374151';
      ctx.beginPath();
      ctx.arc(player.x, player.y - 22 + walkBob, 9, 0, Math.PI * 2);
      ctx.fill();

      // Stylized visor / cyber hair
      ctx.fillStyle = '#111827';
      ctx.beginPath();
      ctx.arc(player.x, player.y - 24 + walkBob, 9.5, Math.PI, Math.PI * 2);
      ctx.fill();

      // Visor eye glint depending on facing direction
      ctx.fillStyle = '#00D2FF';
      if (player.facing === 'down') {
        ctx.fillRect(player.x - 4, player.y - 22 + walkBob, 8, 2.5);
      } else if (player.facing === 'left') {
        ctx.fillRect(player.x - 7, player.y - 22 + walkBob, 4, 2.5);
      } else if (player.facing === 'right') {
        ctx.fillRect(player.x + 3, player.y - 22 + walkBob, 4, 2.5);
      }

      ctx.restore();

      // I. Render Companion Drone ("WORKSHOP AI")
      ctx.save();
      const dX = drone.x;
      const dY = drone.y + drone.hoverOffset;

      // Drone shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.beginPath();
      ctx.ellipse(dX, player.y + 12, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Drone body
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = '#00D2FF';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(dX, dY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glowing drone optic eye
      ctx.fillStyle = '#00D2FF';
      ctx.beginPath();
      ctx.arc(dX, dY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Small antenna / hover rings
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(dX, dY + 6, 5, 0, Math.PI);
      ctx.stroke();

      // Companion label
      ctx.fillStyle = '#38BDF8';
      ctx.font = 'bold 8px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('WORKSHOP AI', dX, dY - 12);
      ctx.restore();

      ctx.restore(); // Restore camera translation

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentZone, nearestObj, onZoneChange]);

  // Click on canvas to move player / interact
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickScreenX = e.clientX - rect.left;
    const clickScreenY = e.clientY - rect.top;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camX = width / 2 - playerRef.current.x;
    const camY = height / 2 - playerRef.current.y;

    // Convert screen coordinates to world coordinates
    const clickWorldX = clickScreenX - camX;
    const clickWorldY = clickScreenY - camY;

    // Check if clicked directly on an interactable
    for (const obj of INTERACTABLES) {
      const d = Math.hypot(obj.position.x - clickWorldX, obj.position.y - clickWorldY);
      if (d <= 35) {
        sounds.playClick();
        onInteract(obj);
        return;
      }
    }

    // Otherwise, move player to clicked destination
    sounds.playClick();
    targetDestRef.current = { x: clickWorldX, y: clickWorldY };
  };

  return (
    <div className="workshop-world-container">
      <canvas
        ref={canvasRef}
        className="workshop-canvas"
        onClick={handleCanvasClick}
      />
    </div>
  );
};
