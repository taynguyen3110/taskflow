import api from './axios';
import { AuthState, User } from '../types';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(data: LoginData): Promise<AuthState> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { isAuthenticated: true, user, token };
  },

  async register(data: RegisterData): Promise<void> {
    await api.post('/auth/register', data);
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/current-user');
    return response.data;
  },

  checkAuth(): AuthState {
    const token = localStorage.getItem('token');
    if (!token) {
      return { isAuthenticated: false, user: null, token: null };
    }
    try {
      // Parse the JWT to get user information
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = {
        id: payload.sub,
        username: payload.name,
        email: payload.email,
      };
      return { isAuthenticated: true, user, token };
    } catch (error) {
      localStorage.removeItem('token');
      return { isAuthenticated: false, user: null, token: null };
    }
  },
};

export default authService;