export type ChatRole = 'user' | 'model';

export type ChatEngineMode = 'gemini' | 'demo' | 'checking';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  mode?: 'gemini' | 'demo';
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  prompt: string;
  languageLabel: string;
}

export interface ChatApiStatusResponse {
  configured: boolean;
  mode: 'gemini' | 'demo';
}

export interface ChatApiReplyResponse {
  reply: string;
  mode: 'gemini' | 'demo';
  notice?: string;
}
