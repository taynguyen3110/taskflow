import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import TaskCard from './TaskCard';
import Alert from '../ui/Alert';
import { useTaskStore } from '../../store/task';
import { Task } from '../../types';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const { tasks, isLoading, error, fetchTasks, deleteTask, toggleComplete } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse flex space-x-2">
          <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
          <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
          <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error" title="Error">
        <div className="flex items-center space-x-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center animate-fade-in">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No tasks found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          You don't have any tasks yet. Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {tasks.map((task) => (
        <div key={task.id} className="animate-slide-up" style={{ animationDelay: '50ms' }}>
          <TaskCard
            task={task}
            onEdit={onEditTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;