/**
 * Home feed service
 */

import type { ThoughtSpark, DailyPrompt, UserReaction, ReactionType } from '../types';

export const feedService = {
  /**
   * Fetch thought sparks for user
   */
  getThoughtSparks: async (userId: string, limit: number = 10): Promise<ThoughtSpark[]> => {
    // Fetch from backend
    // const sparks = await fetchThoughtSparksFromFirestore(limit);
    // return sparks.filter(s => s.userId !== userId); // exclude own thoughts
    return [];
  },

  /**
   * Get today's daily prompt
   */
  getDailyPrompt: async (date: string): Promise<DailyPrompt | null> => {
    // Fetch from backend
    // return await fetchDailyPromptFromFirestore(date);
    return null;
  },

  /**
   * React to a thought spark
   */
  reactToThought: async (
    userId: string,
    thoughtId: string,
    reactionType: ReactionType
  ): Promise<void> => {
    const reaction: UserReaction = {
      userId,
      thoughtId,
      reactionType,
      createdAt: Date.now(),
    };

    // Save to backend
    // await saveReactionToFirestore(reaction);
    
    // Track behavioral signal
    // await recordBehavioralSignal(userId, 'reaction', reactionType);
  },

  /**
   * Post a daily prompt response
   */
  respondToPrompt: async (
    userId: string,
    promptId: string,
    response: string
  ): Promise<void> => {
    // Save to backend
    // await saveDailyResponseToFirestore({
    //   userId,
    //   promptId,
    //   response,
    //   respondedAt: Date.now(),
    // });

    // Track behavioral signal
    // await recordBehavioralSignal(userId, 'promptCompletion', true);
  },
};
