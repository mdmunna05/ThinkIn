/**
 * Mind mapping service
 */

import type { MindMapQuestion, MindMapAnswer, MindSnapshot, MindTrait } from '../types';

export const mindMapService = {
  /**
   * Get all mind mapping questions
   */
  getMindMapQuestions: async (): Promise<MindMapQuestion[]> => {
    return [
      {
        id: 'q1',
        order: 1,
        question: "When facing a new problem, what's your first instinct?",
        type: 'opinion',
        options: [
          'Explore multiple angles quickly',
          'Dive deep into one approach',
          'Talk it through with others',
          'Research before acting',
        ],
        traitWeights: {
          curiosity: 0.8,
          creativity: 0.5,
          socialEnergy: 0.3,
        },
      },
      {
        id: 'q2',
        order: 2,
        question: 'You notice someone makes a mistake. You:',
        type: 'scenario',
        options: [
          'Point it out immediately',
          'Wait for the right moment',
          'Suggest an alternative approach',
          'Observe and reflect first',
        ],
        traitWeights: {
          empathy: 0.7,
          analytical: 0.4,
          socialEnergy: 0.5,
        },
      },
      // Add 10-13 more questions...
    ];
  },

  /**
   * Calculate mind snapshot from answers
   */
  calculateMindSnapshot: async (
    answers: MindMapAnswer[]
  ): Promise<MindSnapshot> => {
    const traits: Record<MindTrait, number> = {
      curiosity: 0,
      creativity: 0,
      structure: 0,
      riskTolerance: 0,
      socialEnergy: 0,
      empathy: 0,
      analytical: 0,
      intuitive: 0,
    };

    // Fetch questions to get weights
    const questions = await mindMapService.getMindMapQuestions();

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        Object.entries(question.traitWeights).forEach(([trait, weight]) => {
          traits[trait as MindTrait] += weight * 10; // normalize
        });
      }
    });

    // Normalize to 0-100
    Object.keys(traits).forEach((key) => {
      const traitKey = key as MindTrait;
      traits[traitKey] = Math.min(100, Math.max(0, traits[traitKey]));
    });

    return {
      traits,
      generatedAt: Date.now(),
      version: 1,
    };
  },

  /**
   * Save user answers
   */
  saveMindMapAnswers: async (
    userId: string,
    answers: MindMapAnswer[]
  ): Promise<void> => {
    // Save to backend
    // await saveMindMapAnswersToFirestore(userId, answers);
  },
};
