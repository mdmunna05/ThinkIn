/**
 * User-related types
 */

export type MindTrait = 'curiosity' | 'creativity' | 'structure' | 'riskTolerance' | 'socialEnergy' | 'empathy' | 'analytical' | 'intuitive';

export interface MindSnapshot {
  traits: Record<MindTrait, number>; // 0-100 score
  generatedAt: number; // timestamp
  version: number; // for evolution tracking
}

export interface User {
  id: string;
  anonymousId: string; // UUID for anon-first
  displayName: string; // pseudo name
  avatarType: AvatarType;
  avatarIcon: string; // icon/shape identifier
  mindSnapshot: MindSnapshot;
  isAnonymous: boolean;
  revealedIdentity?: {
    realName: string;
    photoUrl?: string;
    socialLinks?: Record<string, string>;
  };
  createdAt: number;
  lastActive: number;
  onboardingCompleted: boolean;
}

export type AvatarType = 'geometric' | 'nature' | 'abstract' | 'symbol';

export interface UserBehavior {
  userId: string;
  responseTime: number; // ms
  depthScore: number; // based on answer quality
  promptCompletionRate: number; // 0-1
  reactionPatterns: Record<string, number>; // reaction type -> frequency
  lastUpdated: number;
}
