export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface TaskFilter {
  isCompleted?: boolean;
  priority?: Priority;
  searchTerm?: string;
}

export interface SortOption {
  field: keyof Task;
  direction: 'asc' | 'desc';
}