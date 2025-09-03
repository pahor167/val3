import { create } from 'zustand';
import type { User, LoginFormData } from '../types/user';

interface AuthStore {
  user: User | null;
  login: (formData: LoginFormData) => void;
  logout: () => void;
  updatePoints: (points: number) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (formData: LoginFormData) => {
    const user: User = {
      id: `user_${formData.username}_${Date.now()}`,
      username: formData.username,
      age: formData.age,
      hairColor: formData.hairColor,
      points: 0,
      isLoggedIn: true,
    };
    set({ user });
  },
  logout: () => set({ user: null }),
  updatePoints: (points: number) =>
    set((state) => ({
      user: state.user ? { ...state.user, points: state.user.points + points } : null,
    })),
}));
