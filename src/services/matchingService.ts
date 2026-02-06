/**
 * Matching and alignment service
 */

import type { User, Alignment, UserBehavior, MindTrait } from '../types';

interface MatchingConfig {
  traitSimilarityWeight: number;
  complementaryTraitWeight: number;
  behaviorPatternWeight: number;
  minAlignmentScore: number;
}

const DEFAULT_CONFIG: MatchingConfig = {
  traitSimilarityWeight: 0.4,
  complementaryTraitWeight: 0.35,
  behaviorPatternWeight: 0.25,
  minAlignmentScore: 50,
};

export const matchingService = {
  /**
   * Calculate trait similarity (avoid 100% matches)
   */
  calculateTraitSimilarity: (
    userTraits: Record<MindTrait, number>,
    candidateTraits: Record<MindTrait, number>
  ): number => {
    let totalDifference = 0;
    const traitCount = Object.keys(userTraits).length;

    Object.keys(userTraits).forEach((trait) => {
      const diff = Math.abs(
        userTraits[trait as MindTrait] - candidateTraits[trait as MindTrait]
      );
      totalDifference += diff;
    });

    const averageDifference = totalDifference / traitCount;
    // Convert to similarity score: 0-100, where 0 = complete opposite, 100 = identical
    // Penalize perfect matches
    const similarity = 100 - averageDifference;
    return Math.max(0, Math.min(90, similarity)); // Cap at 90 to avoid perfect matches
  },

  /**
   * Identify complementary traits
   */
  findComplementaryTraits: (
    userTraits: Record<MindTrait, number>,
    candidateTraits: Record<MindTrait, number>
  ): string[] => {
    const complementary: string[] = [];
    const traitPairs = [
      ['structure', 'creativity'],
      ['analytical', 'intuitive'],
      ['socialEnergy', 'introspection'],
      ['riskTolerance', 'cautiousness'],
    ];

    traitPairs.forEach(([trait1, trait2]) => {
      const user1 = userTraits[trait1 as MindTrait] || 0;
      const user2 = userTraits[trait2 as MindTrait] || 0;
      const candidate1 = candidateTraits[trait1 as MindTrait] || 0;
      const candidate2 = candidateTraits[trait2 as MindTrait] || 0;

      // If user is high in trait1 and candidate is high in trait2
      if (user1 > 60 && candidate2 > 60 && Math.abs(user1 - candidate1) > 30) {
        complementary.push(`${trait1} + ${trait2}`);
      }
    });

    return complementary;
  },

  /**
   * Calculate behavioral compatibility
   */
  calculateBehaviorCompatibility: (
    userBehavior: UserBehavior,
    candidateBehavior: UserBehavior
  ): number => {
    // Similar response times = better for conversation depth
    const responseTimeDiff = Math.abs(
      userBehavior.responseTime - candidateBehavior.responseTime
    );
    const responseTimeScore = Math.max(0, 100 - responseTimeDiff / 100);

    // Similar depth preferences
    const depthDiff = Math.abs(
      userBehavior.depthScore - candidateBehavior.depthScore
    );
    const depthScore = Math.max(0, 100 - depthDiff);

    // Similar engagement level
    const engagementDiff = Math.abs(
      userBehavior.promptCompletionRate -
        candidateBehavior.promptCompletionRate
    );
    const engagementScore = (1 - engagementDiff) * 100;

    return (responseTimeScore + depthScore + engagementScore) / 3;
  },

  /**
   * Main matching algorithm
   */
  calculateAlignment: async (
    user: User,
    candidate: User,
    userBehavior?: UserBehavior,
    candidateBehavior?: UserBehavior,
    config = DEFAULT_CONFIG
  ): Promise<Alignment> => {
    const traitSimilarity = matchingService.calculateTraitSimilarity(
      user.mindSnapshot.traits,
      candidate.mindSnapshot.traits
    );

    const complementaryTraits = matchingService.findComplementaryTraits(
      user.mindSnapshot.traits,
      candidate.mindSnapshot.traits
    );

    let behaviorScore = 50; // neutral default
    if (userBehavior && candidateBehavior) {
      behaviorScore = matchingService.calculateBehaviorCompatibility(
        userBehavior,
        candidateBehavior
      );
    }

    const alignmentScore = Math.round(
      traitSimilarity * config.traitSimilarityWeight +
        complementaryTraits.length * 5 * config.complementaryTraitWeight +
        behaviorScore * config.behaviorPatternWeight
    );

    return {
      userId: user.id,
      alignedUserId: candidate.id,
      alignmentScore: Math.min(100, alignmentScore),
      sharedTraits: Object.keys(user.mindSnapshot.traits).filter(
        (trait) =>
          Math.abs(
            user.mindSnapshot.traits[trait as MindTrait] -
              candidate.mindSnapshot.traits[trait as MindTrait]
          ) < 20
      ),
      complementaryTraits,
      createdAt: Date.now(),
      interactionCount: 0,
    };
  },

  /**
   * Find aligned minds for a user
   */
  findAlignedMinds: async (
    userId: string,
    limit: number = 3
  ): Promise<Alignment[]> => {
    // Fetch from backend
    // const alignments = await fetchAlignmentsFromFirestore(userId);
    // return alignments.slice(0, limit);
    return [];
  },
};
