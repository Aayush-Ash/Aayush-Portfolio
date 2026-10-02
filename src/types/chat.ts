export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: {
    label: string;
    action: string;
    payload?: string;
  }[];
  relatedProjects?: string[];
}

export interface QuickPrompt {
  id: string;
  label: string;
  icon?: string;
  prompt: string;
}
