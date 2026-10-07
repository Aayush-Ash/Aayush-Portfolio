import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Vector2D, InteractableObject, ZoneId } from '../types/world';
import { INTERACTABLES } from '../data/worldMap';
import { sounds } from '../audio/soundEffects';

interface Props {
  onInteract: (obj: InteractableObject) => void;
  currentZone: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
  teleportTarget: Vector2D | null;
  onTeleportComplete: () => void;
  isOverviewMode?: boolean;
  onToggleOverview?: () => void;
  crewmateColor?: string;
  crewmateHat?: string;
  onNearestChange?: (obj: InteractableObject | null) => void;
  mobileMoveDirection?: 'up' | 'down' | 'left' | 'right' | null;
}

// Room visual specifications
interface RoomVisualConfig {
  id: ZoneId;
  title: string;
  nameShort: string;
  imageSrc: string;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  themeColor: string;
  glowColor: string;
}

const ROOM_CONFIGS: Record<string, RoomVisualConfig> = {
  AI_LAB: {
    id: 'AI_LAB',
    title: 'AI LAB',
    nameShort: 'SECTOR 01',
    imageSrc: '/among_us_map/rooms/room_ai_lab.png',
    centerX: -820,
    centerY: -420,
    width: 680,
    height: 575,
    themeColor: '#C084FC',
    glowColor: 'rgba(192, 132, 252, 0.35)'
  },
  BUILD_BAY: {
    id: 'BUILD_BAY',
    title: 'BUILD BAY',
    nameShort: 'SECTOR 02',
    imageSrc: '/among_us_map/rooms/room_build_bay.png',
    centerX: 0,
    centerY: -420,
    width: 680,
    height: 575,
    themeColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.35)'
  },
  HQ: {
    id: 'HQ',
    title: 'AAYUSH HQ',
    nameShort: 'SECTOR 03',
    imageSrc: '/among_us_map/rooms/room_hq.png',
    centerX: 820,
    centerY: -420,
    width: 680,
    height: 575,
    themeColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)'
  },
  DATA_CORE: {
    id: 'DATA_CORE',
    title: 'DATA CORE',
    nameShort: 'SECTOR 04',
    imageSrc: '/among_us_map/rooms/room_data_core.png',
    centerX: -820,
    centerY: 420,
    width: 680,
    height: 575,
    themeColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)'
  },
  OBSERVATION_DECK: {
    id: 'OBSERVATION_DECK',
    title: 'OBSERVATION DECK',
    nameShort: 'SECTOR 05',
    imageSrc: '/among_us_map/rooms/room_observation.png',
    centerX: 0,
    centerY: 420,
    width: 680,
    height: 575,
    themeColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)'
  },
  DOCK: {
    id: 'DOCK',
    title: 'DOCK',
    nameShort: 'SECTOR 06',
    imageSrc: '/among_us_map/rooms/room_dock.png',
    centerX: 820,
    centerY: 420,
    width: 680,
    height: 575,
    themeColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.35)'
  }
};

// Sakura petal particle
interface SakuraPetal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  alpha: number;
}

// Star particle for space parallax
interface SpaceStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
}

export const WorkshopWorld: React.FC<Props> = ({
  onInteract,
  currentZone,
  onZoneChange,
  teleportTarget,
  onTeleportComplete,
  isOverviewMode = false,
  onToggleOverview,
  crewmateColor = 'cyan',
  crewmateHat = 'none',
  onNearestChange,
  mobileMoveDirection = null
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Player state in world coordinates
  const playerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 4.2,
    facing: 'right' as 'left' | 'right',
    isMoving: false,
    animTick: 0
  });

  // Smooth camera position
  const cameraRef = useRef({
    x: 0,
    y: 0,
    zoom: 1,
    targetZoom: 1
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

  // Asset image cache
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [, setAssetsLoaded] = useState(false);

  // Sakura petals particle system
  const sakuraPetalsRef = useRef<SakuraPetal[]>([]);

  // Parallax stars
  const spaceStarsRef = useRef<SpaceStar[]>([]);

  // Initialize particles
  useEffect(() => {
    // Generate 35 sakura petals in Build Bay
    const petals: SakuraPetal[] = [];
    for (let i = 0; i < 35; i++) {
      petals.push({
        x: -250 + Math.random() * 500,
        y: -650 + Math.random() * 450,
        vx: 0.3 + Math.random() * 0.7,
        vy: 0.6 + Math.random() * 1.0,
        size: 3 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.05,
        alpha: 0.4 + Math.random() * 0.5
      });
    }
    sakuraPetalsRef.current = petals;

    // Generate space stars
    const stars: SpaceStar[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 3200,
        y: (Math.random() - 0.5) * 2400,
        size: Math.random() < 0.2 ? 2.2 : Math.random() < 0.6 ? 1.5 : 0.9,
        alpha: 0.2 + Math.random() * 0.7,
        speed: 0.2 + Math.random() * 0.8
      });
    }
    spaceStarsRef.current = stars;
  }, []);

  // Preload all space station images, crewmates, hats, and icons
  useEffect(() => {
    const assetUrls = [
      // 6 Rooms
      '/among_us_map/rooms/room_ai_lab.png',
      '/among_us_map/rooms/room_build_bay.png',
      '/among_us_map/rooms/room_hq.png',
      '/among_us_map/rooms/room_data_core.png',
      '/among_us_map/rooms/room_observation.png',
      '/among_us_map/rooms/room_dock.png',
      // Master Collage
      '/among_us_map/Neon%20Among%20Us%20Space%20Station%20Collage.png',
      // Crewmates
      '/among_us_map/sprites/crewmate_cyan.png',
      '/among_us_map/sprites/crewmate_red.png',
      '/among_us_map/sprites/crewmate_pink.png',
      '/among_us_map/sprites/crewmate_blue.png',
      '/among_us_map/sprites/crewmate_green.png',
      '/among_us_map/sprites/crewmate_yellow.png',
      '/among_us_map/sprites/crewmate_orange.png',
      '/among_us_map/sprites/crewmate_white.png',
      '/among_us_map/sprites/crewmate_black.png',
      '/among_us_map/sprites/crewmate_ghost.png',
      // Hats
      '/among_us_map/hats/hat_crown.png',
      '/among_us_map/hats/hat_sprout.png',
      '/among_us_map/hats/hat_cap.png',
      '/among_us_map/hats/hat_tophat.png',
      '/among_us_map/hats/hat_headphones.png',
      '/among_us_map/hats/hat_halo.png',
      '/among_us_map/hats/hat_bunny.png',
      '/among_us_map/hats/hat_goggles.png',
      // Icons
      '/among_us_map/icons/icon_brain.png',
      '/among_us_map/icons/icon_code.png',
      '/among_us_map/icons/icon_database.png',
      '/among_us_map/icons/icon_analytics.png',
      '/among_us_map/icons/icon_telescope.png',
      '/among_us_map/icons/icon_wrench.png',
      '/among_us_map/icons/icon_coffee.png',
      '/among_us_map/icons/icon_hq.png',
      // Props & tiles
      '/among_us_map/props/prop_holo_brain.png',
      '/among_us_map/props/prop_sakura_tree.png',
      '/among_us_map/props/prop_planet_earth.png',
      '/among_us_map/tiles/tile_floor.png',
      '/among_us_map/tiles/tile_conduit_cyan.png',
      '/among_us_map/tiles/tile_conduit_orange.png'
    ];

    let loadedCount = 0;
    const totalCount = assetUrls.length;

    assetUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imagesRef.current.set(url, img);
        loadedCount++;
        if (loadedCount >= totalCount) {
          setAssetsLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback progress so app continues even if a single optional sprite fails
        loadedCount++;
        if (loadedCount >= totalCount) {
          setAssetsLoaded(true);
        }
      };
    });
  }, []);

  // Teleport handler
  useEffect(() => {
    if (teleportTarget) {
      playerRef.current.x = teleportTarget.x;
      playerRef.current.y = teleportTarget.y;
      playerRef.current.vx = 0;
      playerRef.current.vy = 0;
      targetDestRef.current = null;
      cameraRef.current.x = teleportTarget.x;
      cameraRef.current.y = teleportTarget.y;
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
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      keysRef.current[e.key.toLowerCase()] = true;

      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        triggerInteraction();
      }

      if (e.key === 'm' || e.key === 'M') {
        if (onToggleOverview) {
          e.preventDefault();
          sounds.playClick();
          onToggleOverview();
        }
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
  }, [triggerInteraction, onToggleOverview]);

  // Canvas render & animation loop
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
      const images = imagesRef.current;

      // 1. Process movement inputs
      let dx = 0;
      let dy = 0;

      if (keys['w'] || keys['arrowup'] || mobileMoveDirection === 'up') dy -= 1;
      if (keys['s'] || keys['arrowdown'] || mobileMoveDirection === 'down') dy += 1;
      if (keys['a'] || keys['arrowleft'] || mobileMoveDirection === 'left') dx -= 1;
      if (keys['d'] || keys['arrowright'] || mobileMoveDirection === 'right') dx += 1;

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

      // If keyboard keys or mobile dpad active, cancel click-to-move destination
      if (
        keys['w'] || keys['s'] || keys['a'] || keys['d'] ||
        keys['arrowup'] || keys['arrowdown'] || keys['arrowleft'] || keys['arrowright'] ||
        mobileMoveDirection
      ) {
        targetDestRef.current = null;
      }

      // Normalize diagonal velocity
      const mag = Math.hypot(dx, dy);
      if (mag > 0 && !isOverviewMode) {
        player.vx = (dx / mag) * player.speed;
        player.vy = (dy / mag) * player.speed;
        player.isMoving = true;
        player.animTick += dt * 10;

        if (dx !== 0) {
          player.facing = dx > 0 ? 'right' : 'left';
        }

        // Footstep sounds
        if (time - lastFootstepRef.current > 290) {
          sounds.playFootstep();
          lastFootstepRef.current = time;
        }
      } else {
        player.vx = 0;
        player.vy = 0;
        player.isMoving = false;
      }

      // 2. Space Station Walkable Clamping
      // Allow walking inside the 6 rooms AND the central transit hallway & vertical airlocks
      const nextX = player.x + player.vx;
      const nextY = player.y + player.vy;

      // Check if position is inside any room
      let inAnyRoom = false;
      Object.values(ROOM_CONFIGS).forEach(r => {
        const halfW = r.width * 0.44;
        const halfH = r.height * 0.44;
        if (Math.abs(nextX - r.centerX) < halfW && Math.abs(nextY - r.centerY) < halfH) {
          inAnyRoom = true;
        }
      });

      // Check if inside central transit concourse
      const inConcourse = Math.abs(nextX) < 1120 && Math.abs(nextY) < 110;

      // Check if inside vertical connecting airlocks (corridors between rooms and concourse)
      const inNorthAirlock = (Math.abs(nextX - (-820)) < 70 || Math.abs(nextX) < 70 || Math.abs(nextX - 820) < 70) && (nextY >= -450 && nextY <= 0);
      const inSouthAirlock = (Math.abs(nextX - (-820)) < 70 || Math.abs(nextX) < 70 || Math.abs(nextX - 820) < 70) && (nextY >= 0 && nextY <= 450);

      // Check if inside side airlocks (between top rooms or between bottom rooms)
      const inTopSideAirlock = (Math.abs(nextY - (-420)) < 60) && (Math.abs(nextX) < 1120);
      const inBottomSideAirlock = (Math.abs(nextY - 420) < 60) && (Math.abs(nextX) < 1120);

      if (inAnyRoom || inConcourse || inNorthAirlock || inSouthAirlock || inTopSideAirlock || inBottomSideAirlock) {
        player.x = nextX;
        player.y = nextY;
      } else {
        // Soft fallback clamp within station envelope
        player.x = Math.max(-1120, Math.min(1120, nextX));
        player.y = Math.max(-680, Math.min(680, nextY));
      }

      // Detect current zone
      let detectedZone: ZoneId = 'CENTRAL_HUB';
      if (player.y < -120) {
        if (player.x < -410) detectedZone = 'AI_LAB';
        else if (player.x > 410) detectedZone = 'HQ';
        else detectedZone = 'BUILD_BAY';
      } else if (player.y > 120) {
        if (player.x < -410) detectedZone = 'DATA_CORE';
        else if (player.x > 410) detectedZone = 'DOCK';
        else detectedZone = 'OBSERVATION_DECK';
      } else {
        detectedZone = 'CENTRAL_HUB';
      }

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
        if (closest && !nearestObjRef.current) {
          sounds.playInteract();
        }
        nearestObjRef.current = closest;
        setNearestObj(closest);
        if (onNearestChange) {
          onNearestChange(closest);
        }
      }

      // Smooth camera interpolation
      const targetCamX = isOverviewMode ? 0 : player.x;
      const targetCamY = isOverviewMode ? 0 : player.y;
      const targetCamZoom = isOverviewMode ? Math.min(width / 2450, height / 1550) : 1;

      cameraRef.current.x += (targetCamX - cameraRef.current.x) * 0.08;
      cameraRef.current.y += (targetCamY - cameraRef.current.y) * 0.08;
      cameraRef.current.zoom += (targetCamZoom - cameraRef.current.zoom) * 0.08;

      const camX = width / 2 - cameraRef.current.x * cameraRef.current.zoom;
      const camY = height / 2 - cameraRef.current.y * cameraRef.current.zoom;
      const zoom = cameraRef.current.zoom;

      // 3. Clear Screen with deep cosmic slate base
      ctx.fillStyle = '#06080E';
      ctx.fillRect(0, 0, width, height);

      // --- DRAW PARALLAX STARFIELD & NEBULA ---
      ctx.save();
      spaceStarsRef.current.forEach(star => {
        const starScreenX = ((star.x - cameraRef.current.x * 0.15) % width + width) % width;
        const starScreenY = ((star.y - cameraRef.current.y * 0.15) % height + height) % height;
        const twinkle = 0.5 + Math.sin(time * 0.003 * star.speed + star.x) * 0.45;
        ctx.fillStyle = `rgba(220, 235, 255, ${star.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(starScreenX, starScreenY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // --- WORLD CAMERA TRANSFORM ---
      ctx.save();
      ctx.translate(camX, camY);
      ctx.scale(zoom, zoom);

      // --- A. DRAW TRANSIT CONCOURSE & CONNECTING AIRLOCK CORRIDORS ---
      // Floor corridor base
      ctx.fillStyle = '#0B0F17';
      // Main horizontal hallway
      ctx.fillRect(-1150, -85, 2300, 170);
      // Vertical connecting halls
      [-820, 0, 820].forEach(cx => {
        ctx.fillRect(cx - 75, -450, 150, 900);
      });
      // Side connecting halls
      ctx.fillRect(-1150, -455, 2300, 70);
      ctx.fillRect(-1150, 385, 2300, 70);

      // Outer corridor borders
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 2;
      ctx.strokeRect(-1150, -85, 2300, 170);

      // Glowing Neon Floor Conduits (connecting all sectors to Central Hub)
      const conduitPulse = (Math.sin(time * 0.005) + 1) * 0.5;

      const drawLaserConduit = (x1: number, y1: number, x2: number, y2: number, color: string) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.25 + conduitPulse * 0.35;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.strokeStyle = '#FFFFFF';
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      };

      // Conduits from Central Hub (0,0) to all sectors
      drawLaserConduit(-820, 0, -820, -180, '#C084FC'); // To AI LAB
      drawLaserConduit(0, 0, 0, -180, '#F472B6');       // To BUILD BAY
      drawLaserConduit(820, 0, 820, -180, '#F59E0B');   // To HQ
      drawLaserConduit(-820, 0, -820, 180, '#10B981');  // To DATA CORE
      drawLaserConduit(0, 0, 0, 180, '#38BDF8');        // To OBSERVATION DECK
      drawLaserConduit(820, 0, 820, 180, '#F97316');    // To DOCK
      // Horizontal bus
      drawLaserConduit(-820, 0, 820, 0, '#00D2FF');

      // Central Concourse Floor Medallion & Compass
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.fillStyle = '#0F1522';
      ctx.fill();
      ctx.strokeStyle = '#00D2FF';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.strokeStyle = '#1E293B';
      ctx.stroke();

      // Wayfinding markings on floor
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▲ SECTOR 02 // BUILD BAY', 0, -95);
      ctx.fillText('▼ SECTOR 05 // OBSERVATION DECK', 0, 105);
      ctx.fillText('◄ SECTORS 01 & 04 (AI LAB / DATA CORE)', -360, 4);
      ctx.fillText('SECTORS 03 & 06 (HQ / DOCK) ►', 360, 4);

      // --- B. DRAW THE 6 AMONG US ROOMS ---
      Object.values(ROOM_CONFIGS).forEach(r => {
        const isCurrent = detectedZone === r.id;
        const roomImg = images.get(r.imageSrc);

        const x = r.centerX - r.width / 2;
        const y = r.centerY - r.height / 2;

        // Ambient room glow shadow
        ctx.save();
        ctx.shadowColor = r.themeColor;
        ctx.shadowBlur = isCurrent ? 35 : 15;

        // Draw Room Artwork (from the authentic Among Us collage extract!)
        if (roomImg && roomImg.complete && roomImg.naturalWidth > 0) {
          ctx.drawImage(roomImg, x, y, r.width, r.height);
        } else {
          // Graceful fallback while images finish loading
          ctx.fillStyle = isCurrent ? '#111726' : '#0B0F17';
          ctx.fillRect(x, y, r.width, r.height);
          ctx.strokeStyle = r.themeColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, r.width, r.height);
        }
        ctx.restore();

        // Neon border highlight around current room
        ctx.save();
        ctx.strokeStyle = isCurrent ? r.themeColor : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = isCurrent ? 2.5 : 1;
        ctx.strokeRect(x, y, r.width, r.height);

        // Neon Room Header Tag
        const badgeWidth = 140;
        const badgeHeight = 26;
        ctx.fillStyle = 'rgba(8, 12, 20, 0.9)';
        ctx.fillRect(r.centerX - badgeWidth / 2, y - 14, badgeWidth, badgeHeight);
        ctx.strokeStyle = r.themeColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(r.centerX - badgeWidth / 2, y - 14, badgeWidth, badgeHeight);

        ctx.fillStyle = isCurrent ? '#FFFFFF' : r.themeColor;
        ctx.font = 'bold 10px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`— ${r.title} —`, r.centerX, y + 3);
        ctx.restore();
      });

      // --- C. DYNAMIC ROOM VISUAL FX ---

      // 1. AI LAB: Glowing Brain Holographic Ring & Digital Sparkles
      ctx.save();
      const brainX = -820;
      const brainY = -450;
      const brainRot = time * 0.0018;

      // Rotating holographic rings around brain pedestal
      ctx.strokeStyle = '#C084FC';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(brainX, brainY, 52, 22, brainRot, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#38BDF8';
      ctx.beginPath();
      ctx.ellipse(brainX, brainY, 38, 16, -brainRot * 1.4, 0, Math.PI * 2);
      ctx.stroke();

      // Brain pulse core glow
      const brainPulse = 18 + Math.sin(time * 0.007) * 4;
      const brainGrad = ctx.createRadialGradient(brainX, brainY - 10, 2, brainX, brainY - 10, brainPulse);
      brainGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      brainGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.6)');
      brainGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = brainGrad;
      ctx.beginPath();
      ctx.arc(brainX, brainY - 10, brainPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. BUILD BAY: Falling Sakura Blossom Petals
      ctx.save();
      sakuraPetalsRef.current.forEach(p => {
        p.x += p.vx + Math.sin(time * 0.003 + p.y * 0.02) * 0.4;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap within Build Bay room boundaries
        if (p.y > -160) {
          p.y = -640;
          p.x = -240 + Math.random() * 480;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `rgba(244, 114, 182, ${p.alpha})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      // 3. DATA CORE: Blinking Server LEDs & Fluid Bubble Particles
      ctx.save();
      for (let s = 0; s < 4; s++) {
        const sx = -910 + s * 60;
        for (let row = 0; row < 6; row++) {
          const sy = 260 + row * 16;
          const blink = Math.sin(time * 0.012 + s * 3 + row) > 0.1;
          ctx.fillStyle = blink ? '#10B981' : '#00D2FF';
          ctx.beginPath();
          ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. OBSERVATION DECK: Viewport Cosmic Reflections
      ctx.save();
      const obsPulse = (Math.sin(time * 0.003) + 1) * 0.5;
      const obsGrad = ctx.createLinearGradient(0, 240, 0, 380);
      obsGrad.addColorStop(0, `rgba(56, 189, 248, ${0.15 + obsPulse * 0.1})`);
      obsGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = obsGrad;
      ctx.fillRect(-220, 240, 440, 140);
      ctx.restore();

      // 5. DOCK: Starship Engine Thruster Glow & Strobe
      ctx.save();
      const dockPulse = (Math.sin(time * 0.009) + 1) * 0.5;
      const engineGrad = ctx.createRadialGradient(720, 420, 4, 720, 420, 35 + dockPulse * 15);
      engineGrad.addColorStop(0, 'rgba(255, 230, 180, 0.9)');
      engineGrad.addColorStop(0.4, 'rgba(249, 115, 22, 0.6)');
      engineGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = engineGrad;
      ctx.beginPath();
      ctx.arc(720, 420, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- D. RENDER INTERACTABLE OBJECTS ---
      INTERACTABLES.forEach(obj => {
        const isHovered = nearestObj?.id === obj.id;
        const px = obj.position.x;
        const py = obj.position.y;

        // Proximity target ring on floor
        ctx.save();
        if (isHovered) {
          ctx.strokeStyle = obj.color || '#00D2FF';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 4]);
          ctx.beginPath();
          ctx.arc(px, py, 36 + Math.sin(time * 0.008) * 4, 0, Math.PI * 2);
          ctx.stroke();

          // Expanding wave ring
          const ringPulse = (time * 0.02) % 30;
          ctx.strokeStyle = obj.color || '#00D2FF';
          ctx.globalAlpha = Math.max(0, 1 - ringPulse / 30);
          ctx.beginPath();
          ctx.arc(px, py, 30 + ringPulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Base tech pedestal on floor
        ctx.fillStyle = isHovered ? 'rgba(0, 210, 255, 0.25)' : 'rgba(15, 23, 42, 0.7)';
        ctx.beginPath();
        ctx.ellipse(px, py, 22, 11, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isHovered ? (obj.color || '#00D2FF') : 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Object floating beacon
        const beaconY = py - 20 + Math.sin(time * 0.004 + px * 0.01) * 4;
        ctx.fillStyle = obj.color || '#00D2FF';
        ctx.beginPath();
        ctx.arc(px, beaconY, 6.5, 0, Math.PI * 2);
        ctx.fill();

        // Glowing outer beacon halo
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(px, beaconY, 9, 0, Math.PI * 2);
        ctx.stroke();

        // Terminal label
        ctx.fillStyle = isHovered ? '#FFFFFF' : '#CBD5E1';
        ctx.font = 'bold 10px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(obj.name, px, py - 35);

        // Interaction key prompt
        if (isHovered) {
          ctx.fillStyle = 'rgba(16, 20, 28, 0.9)';
          ctx.fillRect(px - 44, py - 60, 88, 18);
          ctx.strokeStyle = '#00D2FF';
          ctx.lineWidth = 1;
          ctx.strokeRect(px - 44, py - 60, 88, 18);

          ctx.fillStyle = '#00D2FF';
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          ctx.fillText('[ E ] INTERACT', px, py - 47);
        }
        ctx.restore();
      });

      // --- E. CLICK DESTINATION INDICATOR ---
      if (targetDestRef.current) {
        ctx.save();
        ctx.strokeStyle = '#00D2FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(targetDestRef.current.x, targetDestRef.current.y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // --- F. RENDER AMONG US CREWMATE CHARACTER ---
      ctx.save();
      const pX = player.x;
      const pY = player.y;

      // Soft shadow on floor
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.ellipse(pX, pY + 12, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Floor lighting reflection matching current zone
      const curZoneConfig = ROOM_CONFIGS[detectedZone] || ROOM_CONFIGS.AI_LAB;
      ctx.fillStyle = curZoneConfig.glowColor;
      ctx.beginPath();
      ctx.ellipse(pX, pY + 12, 26, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Crewmate sprite walk bob & wobble
      const walkWobble = player.isMoving ? Math.sin(player.animTick * 1.1) * 0.08 : 0;
      const walkBounce = player.isMoving ? Math.abs(Math.sin(player.animTick * 1.1)) * 3.5 : 0;

      ctx.translate(pX, pY - walkBounce);
      ctx.rotate(walkWobble);

      // Facing direction: flip horizontally when facing left
      if (player.facing === 'left') {
        ctx.scale(-1, 1);
      }

      // Retrieve crewmate sprite from cache
      const spritePath = `/among_us_map/sprites/crewmate_${crewmateColor}.png`;
      const crewmateSprite = images.get(spritePath) || images.get('/among_us_map/sprites/crewmate_cyan.png');

      const charW = 44;
      const charH = 56;

      if (crewmateSprite && crewmateSprite.complete && crewmateSprite.naturalWidth > 0) {
        // Draw high-resolution transparent Among Us crewmate
        ctx.drawImage(crewmateSprite, -charW / 2, -charH + 10, charW, charH);
      } else {
        // Fallback procedural crewmate if sprite loading
        ctx.fillStyle = '#00D2FF';
        ctx.beginPath();
        ctx.ellipse(0, -22, 14, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#E2E8F0';
        ctx.beginPath();
        ctx.ellipse(6, -24, 7, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Equipped Hat
      if (crewmateHat && crewmateHat !== 'none') {
        const hatPath = `/among_us_map/hats/hat_${crewmateHat}.png`;
        const hatSprite = images.get(hatPath);
        if (hatSprite && hatSprite.complete && hatSprite.naturalWidth > 0) {
          const hatW = 34;
          const hatH = 34;
          ctx.drawImage(hatSprite, -hatW / 2 + 2, -charH - 12, hatW, hatH);
        }
      }
      ctx.restore();

      // --- H. OVERVIEW MODE CARDS (When user zooms out to view full station collage) ---
      if (isOverviewMode) {
        Object.values(ROOM_CONFIGS).forEach(r => {
          ctx.save();
          const cardX = r.centerX;
          const cardY = r.centerY + r.height / 2 + 35;

          ctx.fillStyle = 'rgba(11, 15, 23, 0.95)';
          ctx.fillRect(cardX - 110, cardY - 20, 220, 42);
          ctx.strokeStyle = r.themeColor;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cardX - 110, cardY - 20, 220, 42);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px "Space Grotesk", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`WARP TO ${r.title}`, cardX, cardY - 2);

          ctx.fillStyle = r.themeColor;
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillText('CLICK TO ENTER SECTOR', cardX, cardY + 12);
          ctx.restore();
        });
      }

      ctx.restore(); // Restore camera translation

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentZone, nearestObj, onZoneChange, isOverviewMode, crewmateColor, crewmateHat]);

  // Click on canvas to move player / interact / select sector in overview mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickScreenX = e.clientX - rect.left;
    const clickScreenY = e.clientY - rect.top;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const zoom = cameraRef.current.zoom;
    const camX = width / 2 - cameraRef.current.x * zoom;
    const camY = height / 2 - cameraRef.current.y * zoom;

    // Convert screen coordinates to world coordinates
    const clickWorldX = (clickScreenX - camX) / zoom;
    const clickWorldY = (clickScreenY - camY) / zoom;

    // If in overview mode, clicking a room teleports into it and exits overview mode
    if (isOverviewMode) {
      for (const r of Object.values(ROOM_CONFIGS)) {
        if (
          Math.abs(clickWorldX - r.centerX) < r.width / 2 &&
          Math.abs(clickWorldY - r.centerY) < r.height / 2 + 50
        ) {
          sounds.playZoneTransition();
          playerRef.current.x = r.centerX;
          playerRef.current.y = r.centerY + 50;
          onZoneChange(r.id);
          if (onToggleOverview) onToggleOverview();
          return;
        }
      }
    }

    // Check if clicked directly on an interactable
    for (const obj of INTERACTABLES) {
      const d = Math.hypot(obj.position.x - clickWorldX, obj.position.y - clickWorldY);
      if (d <= 45) {
        sounds.playClick();
        onInteract(obj);
        return;
      }
    }

    // Otherwise, move player to clicked destination
    sounds.playClick();
    targetDestRef.current = { x: clickWorldX, y: clickWorldY };
  };

  const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickScreenX = touch.clientX - rect.left;
      const clickScreenY = touch.clientY - rect.top;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const zoom = cameraRef.current.zoom;
      const camX = width / 2 - cameraRef.current.x * zoom;
      const camY = height / 2 - cameraRef.current.y * zoom;

      const clickWorldX = (clickScreenX - camX) / zoom;
      const clickWorldY = (clickScreenY - camY) / zoom;

      if (isOverviewMode) {
        for (const r of Object.values(ROOM_CONFIGS)) {
          if (
            Math.abs(clickWorldX - r.centerX) < r.width / 2 &&
            Math.abs(clickWorldY - r.centerY) < r.height / 2 + 50
          ) {
            sounds.playZoneTransition();
            playerRef.current.x = r.centerX;
            playerRef.current.y = r.centerY + 50;
            onZoneChange(r.id);
            if (onToggleOverview) onToggleOverview();
            return;
          }
        }
      }

      for (const obj of INTERACTABLES) {
        const d = Math.hypot(obj.position.x - clickWorldX, obj.position.y - clickWorldY);
        if (d <= 55) {
          sounds.playClick();
          onInteract(obj);
          return;
        }
      }

      sounds.playClick();
      targetDestRef.current = { x: clickWorldX, y: clickWorldY };
    }
  };

  return (
    <div className="workshop-world-container">
      <canvas
        ref={canvasRef}
        className="workshop-canvas"
        role="img"
        aria-label="Interactive 2.5D engineering lab space station viewport — Navigate with WASD or touch D-pad to inspect Agent Core, Build Bay, and Comms Uplink"
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasTouch}
        style={{ touchAction: 'none' }}
      >
        Interactive 2.5D space station digital workshop navigation viewport. Switch to Executive View in the HUD if you prefer a standard portfolio format.
      </canvas>
    </div>
  );
};
