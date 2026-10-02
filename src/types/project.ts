export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  description: string;
  tech?: string[];
  subTasks?: string[];
  inputs?: string[];
  outputs?: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  badge: string;
  category: 'agentic_ai' | 'full_stack' | 'ml_data' | 'featured';
  zone: 'AI_LAB' | 'BUILD_BAY' | 'DATA_CORE' | 'HQ';
  summary: string;
  problem: string;
  solution: string;
  architectureNodes: ArchitectureNode[];
  techStack: {
    category: string;
    items: string[];
  }[];
  keyMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
  highlights: string[];
  links: {
    liveDemo?: string;
    github?: string;
    paper?: string;
  };
  demoType?: 'pipeline' | 'keyboard' | 'agent_runner' | 'standard';
}
