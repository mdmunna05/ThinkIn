import { create } from 'zustand';
import type { ThoughtSpark, DailyPrompt, Alignment } from '../types';

interface HomeStore {
  thoughtSparks: ThoughtSpark[];
  setThoughtSparks: (sparks: ThoughtSpark[]) => void;
  
  alignments: Alignment[];
  setAlignments: (alignments: Alignment[]) => void;
  
  dailyPrompt: DailyPrompt | null;
  setDailyPrompt: (prompt: DailyPrompt) => void;
  
  isLoadingThoughts: boolean;
  setLoadingThoughts: (loading: boolean) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  thoughtSparks: [],
  setThoughtSparks: (sparks) => set({ thoughtSparks: sparks }),
  
  alignments: [],
  setAlignments: (alignments) => set({ alignments }),
  
  dailyPrompt: null,
  setDailyPrompt: (prompt) => set({ dailyPrompt: prompt }),
  
  isLoadingThoughts: false,
  setLoadingThoughts: (loading) => set({ isLoadingThoughts: loading }),
}));
