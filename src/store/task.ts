import { create } from 'zustand';
import { Task, TaskFilter, SortOption, Priority } from '../types';
import taskService from '../api/taskService';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filter: TaskFilter;
  sort: SortOption;
  selectedTask: Task | null;
  
  setFilter: (filter: TaskFilter) => void;
  setSort: (sort: SortOption) => void;
  fetchTasks: () => Promise<void>;
  getTask: (id: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  resetSelectedTask: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  filter: {},
  sort: { field: 'dueDate', direction: 'asc' },
  selectedTask: null,
  
  setFilter: (filter) => {
    set({ filter: { ...get().filter, ...filter } });
    get().fetchTasks();
  },
  
  setSort: (sort) => {
    set({ sort });
    get().fetchTasks();
  },
  
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getTasks(get().filter, get().sort);
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
      console.error('Error fetching tasks:', error);
    }
  },
  
  getTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const task = await taskService.getTask(id);
      set({ selectedTask: task, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch task', isLoading: false });
      console.error('Error fetching task:', error);
    }
  },
  
  addTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await taskService.createTask(task);
      set({ tasks: [...get().tasks, newTask], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to add task', isLoading: false });
      console.error('Error adding task:', error);
      throw error;
    }
  },
  
  updateTask: async (id, taskData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      set({
        tasks: get().tasks.map(task => task.id === id ? updatedTask : task),
        selectedTask: null,
        isLoading: false
      });
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
      console.error('Error updating task:', error);
      throw error;
    }
  },
  
  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await taskService.deleteTask(id);
      set({
        tasks: get().tasks.filter(task => task.id !== id),
        isLoading: false
      });
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false });
      console.error('Error deleting task:', error);
    }
  },
  
  toggleComplete: async (id) => {
    const task = get().tasks.find(task => task.id === id);
    if (!task) return;
    
    try {
      // Optimistic update
      set({
        tasks: get().tasks.map(t => 
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      });
      
      await taskService.toggleComplete(id, !task.isCompleted);
    } catch (error) {
      // Revert on error
      set({
        tasks: get().tasks.map(t => 
          t.id === id ? { ...t, isCompleted: task.isCompleted } : t
        ),
        error: 'Failed to update task status'
      });
      console.error('Error toggling task completion:', error);
    }
  },
  
  resetSelectedTask: () => set({ selectedTask: null })
}));