import api from './axios';
import { Task, TaskFilter, SortOption } from '../types';

export const taskService = {
  async getTasks(filter?: TaskFilter, sort?: SortOption): Promise<Task[]> {
    // Build query params
    const params = new URLSearchParams();
    
    if (filter) {
      if (filter.isCompleted !== undefined) {
        params.append('isCompleted', String(filter.isCompleted));
      }
      if (filter.priority) {
        params.append('priority', filter.priority);
      }
      if (filter.searchTerm) {
        params.append('searchTerm', filter.searchTerm);
      }
    }
    
    if (sort) {
      params.append('sortBy', sort.field);
      params.append('sortDirection', sort.direction);
    }
    
    const response = await api.get<Task[]>('/tasks', { params });
    return response.data;
  },

  async getTask(id: string): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Task> {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async toggleComplete(id: string, isCompleted: boolean): Promise<Task> {
    const response = await api.patch<Task>(`/tasks/${id}/complete`, { isCompleted });
    return response.data;
  },
};

export default taskService;