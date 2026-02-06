import { create } from 'zustand';
import type { User, MindSnapshot } from '../types';

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  updateMindSnapshot: (snapshot: MindSnapshot) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  updateMindSnapshot: (snapshot) =>
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, mindSnapshot: snapshot }
        : null,
    })),
  
  updateUser: (updates) =>
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, ...updates }
        : null,
    })),
  
  clearUser: () => set({ currentUser: null }),
  
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
