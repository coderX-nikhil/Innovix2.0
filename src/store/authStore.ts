import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  
  login: (user) => set({ 
    user, 
    isAuthenticated: true,
    isAdmin: user.role === 'admin'
  }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
    isAdmin: false
  })
}));