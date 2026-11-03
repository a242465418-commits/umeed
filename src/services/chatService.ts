import { generateDemoUmeedReply, SimpleTurn } from '../data/umeedAiKnowledge';
import {
  ChatApiReplyResponse,
  ChatApiStatusResponse,
  ChatConversation,
  ChatMessage,
} from '../types/chat';

const CHAT_STORAGE_KEY = 'umeed_ai_conversations_v1';

export function generateChatId(prefix = 'chat'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function createNewConversation(): ChatConversation {
  const now = new Date().toISOString();
  return {
    id: generateChatId('conv'),
    title: 'New Conversation',
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function deriveConversationTitle(firstUserPrompt: string): string {
  const cleaned = firstUserPrompt.replace(/\s+/g, ' ').trim();
  if (!cleaned) return 'New Conversation';
  return cleaned.length > 42 ? `${cleaned.slice(0, 42)}…` : cleaned;
}

export function loadStoredConversations(): ChatConversation[] {
  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ChatConversation =>
        Boolean(item && typeof item.id === 'string' && Array.isArray(item.messages))
    );
  } catch {
    return [];
  }
}

export function saveStoredConversations(conversations: ChatConversation[]): void {
  try {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    // Graceful no-op when storage quota or privacy mode restricts writes
  }
}

export async function fetchChatBackendStatus(): Promise<ChatApiStatusResponse> {
  try {
    const response = await fetch('/api/chat/status', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      return { configured: false, mode: 'demo' };
    }
    const data = (await response.json()) as Partial<ChatApiStatusResponse>;
    return {
      configured: Boolean(data.configured),
      mode: data.mode === 'gemini' ? 'gemini' : 'demo',
    };
  } catch {
    return { configured: false, mode: 'demo' };
  }
}

export async function sendUmeedChatTurn(
  messages: ChatMessage[]
): Promise<ChatApiReplyResponse> {
  const payloadTurns: SimpleTurn[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: payloadTurns }),
    });

    if (response.ok) {
      const data = (await response.json()) as Partial<ChatApiReplyResponse>;
      if (typeof data.reply === 'string' && data.reply.trim().length > 0) {
        return {
          reply: data.reply,
          mode: data.mode === 'gemini' ? 'gemini' : 'demo',
          notice: data.notice,
        };
      }
    }
  } catch {
    // Fall through to client-side Demo Mode responder if backend route is unavailable
  }

  await new Promise((resolve) => setTimeout(resolve, 260));
  return {
    reply: generateDemoUmeedReply(payloadTurns),
    mode: 'demo',
  };
}
