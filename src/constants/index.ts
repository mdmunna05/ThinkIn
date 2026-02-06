/**
 * Mind mapping questions for onboarding
 */

import type { MindMapQuestion } from '../types';

export const MIND_MAP_QUESTIONS: MindMapQuestion[] = [
  {
    id: 'q1',
    order: 1,
    question: 'When facing a new problem, what's your first instinct?',
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
      structure: 0.2,
      riskTolerance: 0.6,
      empathy: 0.2,
      analytical: 0.4,
      intuitive: 0.3,
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
      structure: 0.3,
      curiosity: 0.2,
      intuitive: 0.4,
      creativity: 0.3,
      riskTolerance: 0.3,
    },
  },
  {
    id: 'q3',
    order: 3,
    question: 'How do you prefer to spend a free weekend?',
    type: 'opinion',
    options: [
      'Try something completely new',
      'Deepen a current interest',
      'Spend time with friends',
      'Rest and recharge',
    ],
    traitWeights: {
      riskTolerance: 0.7,
      creativity: 0.6,
      socialEnergy: 0.5,
      structure: 0.2,
      curiosity: 0.6,
      intuitive: 0.4,
      analytical: 0.2,
      empathy: 0.3,
    },
  },
  {
    id: 'q4',
    order: 4,
    question: 'What bothers you more?',
    type: 'ranking',
    options: ['Chaos and ambiguity', 'Too many rules and constraints'],
    traitWeights: {
      structure: 0.8,
      creativity: 0.4,
      riskTolerance: 0.5,
      curiosity: 0.3,
      analytical: 0.6,
      intuitive: 0.3,
      socialEnergy: 0.1,
      empathy: 0.2,
    },
  },
  {
    id: 'q5',
    order: 5,
    question: 'Your best ideas come when:',
    type: 'opinion',
    options: [
      'You're actively working on something',
      'You step away and relax',
      'You're in a group discussion',
      'You wake up thinking about it',
    ],
    traitWeights: {
      creativity: 0.7,
      intuitive: 0.6,
      structure: 0.3,
      socialEnergy: 0.4,
      curiosity: 0.5,
      analytical: 0.4,
      empathy: 0.2,
      riskTolerance: 0.3,
    },
  },
  // Add 10-15 more questions following the same pattern
  // Each with proper trait weights that sum meaningful values
];

export const DAILY_PROMPTS = [
  'What's one assumption you challenged today?',
  'What would you learn if you asked "why" one more time?',
  'Who taught you something this week?',
  'What makes you genuinely curious?',
  'How did you change your mind recently?',
  'What problem feels unsolvable but worth solving?',
  'What do you think about when no one's watching?',
  'What would younger you be proud of?',
  'What pattern did you notice in your thinking?',
  'What question scared you but you asked anyway?',
];
