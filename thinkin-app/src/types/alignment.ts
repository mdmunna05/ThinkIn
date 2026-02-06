/**
 * Alignment and matching types
 */

export interface Alignment {
  userId: string;
  alignedUserId: string;
  alignmentScore: number; // 0-100
  sharedTraits: string[];
  complementaryTraits: string[];
  createdAt: number;
  interactionCount: number;
}

export interface InteractionHistory {
  id: string;
  userId: string;
  otherUserId: string;
  type: 'thoughtReaction' | 'promptResponse' | 'thoughtPrompt';
  content: string;
  createdAt: number;
}

export interface Conversation {
  id: string;
  userId1: string;
  userId2: string;
  unlockedAt?: number; // null if not yet unlocked
  messages: ConversationMessage[];
  lastMessageAt?: number;
}

export interface ConversationMessage {
  id: string;
  senderId: string;
  content: string;
  sentAt: number;
  readAt?: number;
}

export interface ThoughtPrompt {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  context: string; // reference to reaction/thought
  sentAt: number;
  responseTo?: string;
}
