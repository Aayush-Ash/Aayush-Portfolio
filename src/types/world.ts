export type ZoneId = 'CENTRAL_HUB' | 'AI_LAB' | 'BUILD_BAY' | 'DATA_CORE' | 'HQ' | 'OBSERVATION_DECK' | 'DOCK';

export interface Vector2D {
  x: number;
  y: number;
}

export type InteractableType = 
  | 'project'
  | 'agent_core'
  | 'about'
  | 'resume'
  | 'contact'
  | 'easter_egg'
  | 'terminal'
  | 'companion';

export interface InteractableObject {
  id: string;
  name: string;
  subTitle: string;
  type: InteractableType;
  zone: ZoneId;
  position: Vector2D; // World coordinates
  radius: number;     // Interaction trigger distance
  projectId?: string; // Links to project data
  easterEggId?: string;
  iconName?: string;
  color?: string;
  hologramType?: 'cube' | 'nodes' | 'keyboard' | 'pipeline' | 'desk' | 'server';
}

export interface ZoneConfig {
  id: ZoneId;
  title: string;
  subTitle: string;
  tagline: string;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  center: Vector2D;
  themeColor: string;
  accentColor: string;
}

export interface EasterEggData {
  id: string;
  title: string;
  subtitle: string;
  type: 'blueprint' | 'whiteboard' | 'git_log' | 'coffee' | 'server_rack';
  content: string;
  metadata?: Record<string, string>;
}
