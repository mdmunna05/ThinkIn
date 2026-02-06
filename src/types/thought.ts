/**
 * Thought and interaction types
 */

export type ReactionType = 'relate' | 'curious' | 'disagree';

export interface ThoughtSpark {
  id: string;
  userId: string;
  anonymousId: string;
  content: string;
  mindCategory?: string;
  reactions: Record<ReactionType, number>;
  createdAt: number;
  isDaily?: boolean;
}

export interface UserReaction {
  userId: string;
  thoughtId: string;
  reactionType: ReactionType;
  createdAt: number;
}

export interface DailyPrompt {
  id: string;
  date: string;
  question: string;
  category: string;
  responses?: DailyPromptResponse[];
}

export interface DailyPromptResponse {
  userId: string;
  promptId: string;
  response: string;
  respondedAt: number;
}

export interface MindMapQuestion {
  id: string;
  order: number;
  question: string;
  type: 'opinion' | 'scenario' | 'ranking';
  options?: string[];
  traitWeights: Record<string, number>; // trait -> weight
}

export interface MindMapAnswer {
  userId: string;
  questionId: string;
  answer: string | string[] | number;
  respondedAt: number;
}
