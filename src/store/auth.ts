import { create } from 'zustand';
import { AuthState, User } from '../types';
import authService from '../api/authService';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  
  login: async (email, password) => {
    try {
      const authState = await authService.login({ email, password });
      set(authState);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  register: async (username, email, password, confirmPassword) => {
    try {
      await authService.register({ username, email, password, confirmPassword });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  logout: () => {
    authService.logout();
    set({ isAuthenticated: false, user: null, token: null });
  },
  
  initialize: async () => {
    const { isAuthenticated, user, token } = authService.checkAuth();
    if (isAuthenticated && token) {
      try {
        const currentUser = await authService.getCurrentUser();
        set({ isAuthenticated: true, user: currentUser, token });
      } catch (error) {
        authService.logout();
        set({ isAuthenticated: false, user: null, token: null });
      }
    }
  },
}));